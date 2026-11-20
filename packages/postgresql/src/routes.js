import net from 'node:net';
import { createHash } from 'node:crypto';
import { Client as SSHClient } from 'ssh2';

/**
 * How bytes reach postgres: `stream` makes the socket pg talks through, and
 * `close` releases whatever the route opened once pg is done with it.
 * @typedef {Object} Route
 * @property {Function} stream - returns the socket for pg's `stream` option
 * @property {Function} close - returns a Promise which resolves once the route is closed
 * @private
 */

/**
 * The OpenSSH-style fingerprint of a host key, as `ssh-keygen -lf` prints it,
 * followed by the key type.
 * @private
 * @param {Buffer} key - the host key in SSH wire format
 * @returns {{ fingerprint: string, type: string }}
 */
const describeHostKey = key => ({
  fingerprint: `SHA256:${createHash('sha256')
    .update(key)
    .digest('base64')
    .replace(/=+$/, '')}`,
  type: key.toString('ascii', 4, 4 + key.readUInt32BE(0)),
});

/**
 * Connect straight to postgres over TCP.
 * @private
 * @returns {Route}
 */
export const directRoute = () => ({
  stream: () => new net.Socket(),
  close: async () => {},
});

const openSsh = (
  {
    sshHost,
    sshPort = 22,
    sshUsername,
    sshPrivateKey,
    sshPassphrase,
    sshHostKey,
  },
  readyTimeout
) => {
  const expected =
    sshHostKey &&
    `SHA256:${String(sshHostKey)
      .trim()
      .replace(/^SHA256:/i, '')
      .replace(/=+$/, '')}`;
  let presented;
  let mismatch;

  const ssh = new SSHClient();
  // ssh2's own destroy() does nothing once end() has run, so keep the socket
  // to drop a server that never hangs up.
  const socket = net.connect({ host: sshHost, port: sshPort });

  return new Promise((resolve, reject) => {
    // ssh2 can emit more than one error while connecting, and reports a refused
    // host key only as "Host denied (verification failed)".
    ssh
      .on('error', e =>
        reject(
          mismatch ??
            new Error(
              `SSH connection to ${sshHost}:${sshPort} failed: ${
                e.message || e.code
              }`
            )
        )
      )
      .once('ready', () => {
        if (!expected) {
          console.log(
            `SSH host key for ${sshHost}: ${presented.fingerprint} (${presented.type}). Set sshHostKey to verify it`
          );
        }
        resolve({ ssh, socket });
      })
      .connect({
        sock: socket,
        username: sshUsername,
        privateKey: sshPrivateKey,
        passphrase: sshPassphrase,
        keepaliveInterval: 10000,
        readyTimeout,
        hostVerifier: key => {
          presented = describeHostKey(key);
          if (expected && presented.fingerprint !== expected) {
            mismatch = new Error(
              `SSH host key mismatch for ${sshHost}: expected ${expected}, got ${presented.fingerprint} (${presented.type})`
            );
            return false;
          }
          return true;
        },
      });
  });
};

// pg drives its stream like a net.Socket: it calls setNoDelay and connect, then
// waits for 'connect'. An ssh channel is already open, so those are no-ops.
// pg also destroys the stream with its reason for giving up, which an ssh
// channel would drop, leaving pg to report only that the connection closed.
const asSocket = channel => {
  const destroy = channel.destroy.bind(channel);
  return Object.assign(channel, {
    connect() {
      process.nextTick(() => channel.emit('connect'));
      return channel;
    },
    setNoDelay: () => channel,
    destroy(reason) {
      if (reason) channel.emit('error', reason);
      return destroy();
    },
  });
};

/**
 * Reach postgres through an SSH server. `host` and `port` are resolved from
 * the SSH server's point of view, and pg's bytes travel over one ssh channel,
 * so nothing listens locally.
 * @private
 * @param {object} configuration - the ssh* fields of the adaptor configuration
 * @param {object} destination
 * @param {string} destination.host
 * @param {number} destination.port
 * @param {object} [timeouts]
 * @param {number} [timeouts.readyTimeout=20000] - milliseconds to wait for the SSH handshake
 * @param {number} [timeouts.closeTimeout=5000] - milliseconds to wait for the SSH server to hang up before dropping the connection
 * @returns {Promise<Route>}
 */
export const sshRoute = async (
  configuration,
  { host, port },
  { readyTimeout = 20000, closeTimeout = 5000 } = {}
) => {
  const { ssh, socket } = await openSsh(configuration, readyTimeout);
  ssh.on('error', e => console.error(`SSH tunnel error: ${e.message}`));
  const closed = new Promise(resolve => ssh.once('close', resolve));

  const channel = await new Promise((resolve, reject) =>
    ssh.forwardOut('127.0.0.1', 0, host, port, (err, stream) =>
      err ? reject(err) : resolve(stream)
    )
  ).catch(e => {
    ssh.end();
    throw new Error(`SSH server could not reach ${host}:${port}: ${e.message}`);
  });

  const stream = asSocket(channel);
  return {
    stream: () => stream,
    close: () => {
      ssh.end();
      const timer = setTimeout(() => socket.destroy(), closeTimeout);
      return closed.finally(() => clearTimeout(timer));
    },
  };
};
