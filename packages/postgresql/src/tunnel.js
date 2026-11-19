import net from 'node:net';
import { Client as SSHClient } from 'ssh2';

/**
 * Open an SSH tunnel to a postgres database.
 *
 * Starts a local TCP server on a random port. Each connection to it is
 * forwarded through the SSH connection to `dstHost:dstPort`, which is resolved
 * from the SSH server's point of view.
 *
 * @private
 * @param {object} options
 * @param {string} options.sshHost - the ssh (bastion) server
 * @param {number} [options.sshPort=22]
 * @param {string} options.sshUser
 * @param {string} options.privateKey - private key contents
 * @param {string} [options.passphrase]
 * @param {string} options.dstHost - postgres host, as seen from the ssh server
 * @param {number} options.dstPort - postgres port, as seen from the ssh server
 * @returns {Promise<{ host: string, port: number, close: Function }>}
 */
export const createTunnel = async ({
  sshHost,
  sshPort = 22,
  sshUser,
  privateKey,
  passphrase,
  dstHost,
  dstPort,
}) => {
  const ssh = new SSHClient();

  await new Promise((resolve, reject) => {
    ssh
      .once('ready', resolve)
      .once('error', reject)
      .connect({
        host: sshHost,
        port: sshPort,
        username: sshUser,
        privateKey,
        passphrase,
      });
  });

  const server = net.createServer(socket => {
    ssh.forwardOut('127.0.0.1', 0, dstHost, dstPort, (err, stream) => {
      if (err) {
        socket.destroy(err);
        return;
      }
      socket.pipe(stream).pipe(socket);
      stream.on('close', () => socket.destroy());
      socket.on('close', () => stream.destroy());
    });
  });

  try {
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
  } catch (e) {
    ssh.end();
    throw e;
  }

  const { port } = server.address();

  return {
    host: '127.0.0.1',
    port,
    close: () =>
      new Promise(resolve => {
        ssh.end();
        server.close(() => resolve());
        // server.close waits for open sockets; don't hang on a lingering one
        server.closeAllConnections?.();
      }),
  };
};
