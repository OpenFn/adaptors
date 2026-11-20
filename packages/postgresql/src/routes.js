import net from 'node:net';
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
 * Connect straight to postgres over TCP.
 * @private
 * @returns {Route}
 */
export const directRoute = () => ({
  stream: () => new net.Socket(),
  close: async () => {},
});

const openSsh = ({
  sshHost,
  sshPort = 22,
  sshUsername,
  sshPrivateKey,
  sshPassphrase,
}) =>
  new Promise((resolve, reject) => {
    const ssh = new SSHClient();
    ssh
      .once('error', reject)
      .once('ready', () => resolve(ssh))
      .connect({
        host: sshHost,
        port: sshPort,
        username: sshUsername,
        privateKey: sshPrivateKey,
        passphrase: sshPassphrase,
        keepaliveInterval: 10000,
      });
  });

// pg drives its stream like a net.Socket: it calls setNoDelay and connect, then
// waits for 'connect'. An ssh channel is already open, so those are no-ops.
const asSocket = channel =>
  Object.assign(channel, {
    connect() {
      process.nextTick(() => channel.emit('connect'));
      return channel;
    },
    setNoDelay: () => channel,
  });

/**
 * Reach postgres through an SSH server. `host` and `port` are resolved from
 * the SSH server's point of view, and pg's bytes travel over one ssh channel,
 * so nothing listens locally.
 * @private
 * @param {object} configuration - the ssh* fields of the adaptor configuration
 * @param {object} destination
 * @param {string} destination.host
 * @param {number} destination.port
 * @returns {Promise<Route>}
 */
export const sshRoute = async (configuration, { host, port }) => {
  const ssh = await openSsh(configuration);
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
      return closed;
    },
  };
};
