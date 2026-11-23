import fs from 'node:fs';
import net from 'node:net';
import tls from 'node:tls';
import ssh2 from 'ssh2';

const { Server, utils } = ssh2;

// ssh2 occasionally generates an ed25519 key that it then cannot parse.
export const generateKey = () => {
  const key = utils.generateKeyPairSync('ed25519');
  return utils.parseKey(key.private) instanceof Error ? generateKey() : key;
};

const listen = server =>
  new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

/**
 * Start a TCP server on a random local port, tracking its open connections.
 * @param {(socket: net.Socket) => void} onConnection
 * @returns {Promise<{ port: number, connections: Set<net.Socket>, close: () => Promise<void> }>}
 */
export const startTcpServer = async onConnection => {
  const connections = new Set();
  const server = net.createServer(socket => {
    connections.add(socket);
    socket.on('close', () => connections.delete(socket));
    socket.on('error', () => {});
    onConnection(socket);
  });
  await listen(server);

  return {
    port: server.address().port,
    connections,
    close: () =>
      new Promise(resolve => {
        server.close(() => resolve());
        connections.forEach(socket => socket.destroy());
      }),
  };
};

/**
 * Start an in-process SSH server which accepts one public key and forwards
 * direct-tcpip channels to wherever the client asks.
 * @param {object} options
 * @param {string} options.allowedPublicKey - the only key allowed to log in
 * @param {Record<string, string>} [options.hosts] - destination names to rewrite before connecting, like /etc/hosts
 * @returns {Promise<{ port: number, hostPublicKey: string, clients: Set<object>, authAttempts: number, close: () => Promise<void> }>}
 */
export const startSshServer = async ({ allowedPublicKey, hosts = {} }) => {
  const allowed = utils.parseKey(allowedPublicKey);
  const hostKey = generateKey();
  const clients = new Set();
  let authAttempts = 0;

  const isAllowed = ctx =>
    ctx.method === 'publickey' &&
    ctx.key.algo === allowed.type &&
    ctx.key.data.equals(allowed.getPublicSSH()) &&
    // ssh2 asks twice: first whether the key is acceptable, then with a signature
    (!ctx.signature ||
      allowed.verify(ctx.blob, ctx.signature, ctx.hashAlgo) === true);

  const server = new Server({ hostKeys: [hostKey.private] }, client => {
    clients.add(client);
    client.on('close', () => clients.delete(client));
    client.on('error', () => {});
    client.on('authentication', ctx => {
      authAttempts++;
      isAllowed(ctx) ? ctx.accept() : ctx.reject(['publickey']);
    });
    client.on('ready', () => {
      client.on('tcpip', (accept, reject, { destIP, destPort }) => {
        const upstream = net.connect(destPort, hosts[destIP] ?? destIP);
        upstream.once('error', () => reject());
        upstream.once('connect', () => {
          const channel = accept();
          channel.on('error', () => {});
          upstream.on('error', () => {});
          channel.on('close', () => upstream.destroy());
          upstream.on('close', () => channel.destroy());
          channel.pipe(upstream).pipe(channel);
        });
      });
    });
  });
  await listen(server);

  return {
    port: server.address().port,
    hostPublicKey: hostKey.public,
    clients,
    get authAttempts() {
      return authAttempts;
    },
    close: () =>
      new Promise(resolve => {
        server.close(() => resolve());
        clients.forEach(client => client.end());
      }),
  };
};

/**
 * Forward TCP connections to a local port, but never pass on either side
 * hanging up, so the client waits for a close that does not come.
 * @param {number} port - where to forward to
 * @returns {Promise<{ port: number, close: () => Promise<void> }>}
 */
export const startStubbornProxy = async port => {
  const sockets = new Set();
  const track = socket => {
    sockets.add(socket);
    socket.on('error', () => {});
    socket.on('close', () => sockets.delete(socket));
    return socket;
  };
  const server = net.createServer({ allowHalfOpen: true }, client => {
    track(client);
    const upstream = track(net.connect({ port, allowHalfOpen: true }));
    client.pipe(upstream, { end: false });
    upstream.pipe(client, { end: false });
  });
  await listen(server);

  return {
    port: server.address().port,
    close: () =>
      new Promise(resolve => {
        server.close(() => resolve());
        sockets.forEach(socket => socket.destroy());
      }),
  };
};

/**
 * Reserve a local port and release it, so nothing is listening there.
 * @returns {Promise<number>}
 */
export const closedPort = async () => {
  const server = net.createServer();
  await listen(server);
  const { port } = server.address();
  await new Promise(resolve => server.close(resolve));
  return port;
};

/** Postgres replies for a successful login: AuthenticationOk then ReadyForQuery. */
export const LOGIN_OK = Buffer.from([
  0x52, 0, 0, 0, 8, 0, 0, 0, 0, 0x5a, 0, 0, 0, 5, 0x49,
]);

/**
 * Read a file from test/fixtures/tls.
 * @param {string} name
 * @returns {string}
 */
export const tlsFixture = name =>
  fs.readFileSync(new URL(`../fixtures/tls/${name}`, import.meta.url), 'utf8');

/**
 * Answer the startup packet with a canned reply. It cannot run queries.
 * @param {Buffer} reply
 */
export const startFakePostgres = reply =>
  startTcpServer(socket => {
    socket.once('data', () => socket.write(reply));
  });

/**
 * Accept the SSLRequest, upgrade to TLS with the named fixture certificate,
 * then answer the startup packet.
 * @param {string} name - fixture certificate, e.g. 'server'
 * @param {(servername: string | false) => void} [onServername] - called with the SNI name the client sent
 */
export const startFakeTlsPostgres = (name, onServername = () => {}) =>
  startTcpServer(socket => {
    socket.once('data', () => {
      socket.write('S');
      const secure = new tls.TLSSocket(socket, {
        isServer: true,
        cert: tlsFixture(`${name}.crt`),
        key: tlsFixture(`${name}.key`),
      });
      secure.on('error', () => {});
      secure.once('secure', () => onServername(secure.servername));
      secure.once('data', () => secure.write(LOGIN_OK));
    });
  });

let restores = [];

/**
 * Replace a console method with a recorder. Call `restoreConsole` in afterEach.
 * @param {'log' | 'error'} method
 * @returns {string[]} the lines logged so far
 */
export const captureConsole = method => {
  const original = console[method];
  const logged = [];
  console[method] = (...args) => logged.push(args.join(' '));
  restores.push(() => (console[method] = original));
  return logged;
};

export const restoreConsole = () => {
  restores.forEach(restore => restore());
  restores = [];
};
