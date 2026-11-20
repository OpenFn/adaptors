import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { expect } from 'chai';
import { sshRoute } from '../src/routes.js';
import { connect } from '../src/connection.js';
import {
  LOGIN_OK,
  captureConsole,
  closedPort,
  generateKey,
  restoreConsole,
  startFakePostgres,
  startSshServer,
  startTcpServer,
} from './helpers/fakes.js';

const errorResponse = fields => {
  const body = Buffer.concat([
    ...Object.entries(fields).map(([type, value]) =>
      Buffer.from(`${type}${value}\0`)
    ),
    Buffer.from([0]),
  ]);
  const header = Buffer.alloc(5);
  header.write('E');
  header.writeInt32BE(body.length + 4, 1);
  return Buffer.concat([header, body]);
};

const AUTHENTICATION_FAILED = errorResponse({
  S: 'FATAL',
  V: 'FATAL',
  C: '28P01',
  M: 'password authentication failed for user "tester"',
});

// What `ssh-keygen -lf` prints for an OpenSSH public key line.
const opensshFingerprint = publicKey => {
  const blob = Buffer.from(publicKey.split(' ')[1], 'base64');
  const digest = createHash('sha256').update(blob).digest('base64');
  return `SHA256:${digest.replace(/=+$/, '')}`;
};

const listeningServers = () =>
  process
    .getActiveResourcesInfo()
    .filter(resource => resource === 'TCPServerWrap').length;

const until = async condition => {
  while (!condition()) {
    await new Promise(resolve => setTimeout(resolve, 5));
  }
};

// Uses the route's stream the way pg does: connect, wait, then talk.
const roundTrip = async (route, message) => {
  const socket = route.stream();
  socket.setNoDelay(true);
  socket.connect();
  await once(socket, 'connect');
  socket.write(message);
  const [reply] = await once(socket, 'data');
  return reply.toString();
};

describe('ssh route', () => {
  let userKey;
  let sshServer;
  let echoServer;
  let hostFingerprint;
  let route;

  const routeTo = (port, overrides = {}) =>
    sshRoute(
      {
        sshHost: '127.0.0.1',
        sshPort: sshServer.port,
        sshUsername: 'tester',
        sshPrivateKey: userKey.private,
        sshHostKey: hostFingerprint,
        ...overrides,
      },
      { host: '127.0.0.1', port }
    );

  before(async () => {
    userKey = generateKey();
    sshServer = await startSshServer({
      allowedPublicKey: userKey.public,
      hosts: { 'db.internal': '127.0.0.1' },
    });
    hostFingerprint = opensshFingerprint(sshServer.hostPublicKey);
    echoServer = await startTcpServer(socket => socket.pipe(socket));
  });

  afterEach(async () => {
    restoreConsole();
    await route?.close();
    route = undefined;
  });

  after(async () => {
    await echoServer.close();
    await sshServer.close();
  });

  describe('sshRoute', () => {
    it('carries bytes to the destination and back', async () => {
      route = await routeTo(echoServer.port);

      expect(await roundTrip(route, 'hello')).to.eql('hello');
    });

    it('rejects when the ssh server refuses the key', async () => {
      const error = await routeTo(echoServer.port, {
        sshPrivateKey: generateKey().private,
      }).catch(e => e);

      expect(error).to.be.an('error');
      expect(error.message).to.match(/authentication methods failed/i);
      await until(() => sshServer.clients.size === 0);
    });

    it('rejects when the ssh server cannot reach the destination', async () => {
      const port = await closedPort();

      const error = await routeTo(port).catch(e => e);

      expect(error).to.be.an('error');
      expect(error.message).to.include(
        `SSH server could not reach 127.0.0.1:${port}`
      );
      await until(() => sshServer.clients.size === 0);
    });

    describe('host key', () => {
      const otherFingerprint = () => opensshFingerprint(generateKey().public);

      it('accepts the fingerprint without its prefix and with whitespace', async () => {
        route = await routeTo(echoServer.port, {
          sshHostKey: `  ${hostFingerprint.replace('SHA256:', '')}\n`,
        });

        expect(await roundTrip(route, 'hello')).to.eql('hello');
      });

      it('accepts the fingerprint with its trailing padding', async () => {
        route = await routeTo(echoServer.port, {
          sshHostKey: `${hostFingerprint}=`,
        });

        expect(await roundTrip(route, 'hello')).to.eql('hello');
      });

      it('accepts a lowercase sha256 prefix', async () => {
        route = await routeTo(echoServer.port, {
          sshHostKey: hostFingerprint.replace('SHA256:', 'sha256:'),
        });

        expect(await roundTrip(route, 'hello')).to.eql('hello');
      });

      it('rejects a mismatched host key before authenticating and leaves nothing open', async () => {
        const expected = otherFingerprint();
        const serversBefore = listeningServers();
        const authAttemptsBefore = sshServer.authAttempts;

        const error = await routeTo(echoServer.port, {
          sshHostKey: expected,
        }).catch(e => e);

        expect(error).to.be.an('error');
        expect(error.message).to.eql(
          `SSH host key mismatch for 127.0.0.1: expected ${expected}, got ${hostFingerprint} (ssh-ed25519)`
        );
        expect(sshServer.authAttempts).to.eql(authAttemptsBefore);
        await until(() => sshServer.clients.size === 0);
        expect(listeningServers()).to.eql(serversBefore);
      });

      it('compares a fingerprint given as a non-string', async () => {
        const error = await routeTo(echoServer.port, {
          sshHostKey: 12345,
        }).catch(e => e);

        expect(error).to.be.an('error');
        expect(error.message).to.eql(
          `SSH host key mismatch for 127.0.0.1: expected SHA256:12345, got ${hostFingerprint} (ssh-ed25519)`
        );
      });

      it('logs the presented fingerprint once when none is set', async () => {
        const logged = captureConsole('log');

        route = await routeTo(echoServer.port, {
          sshHostKey: undefined,
        });

        expect(await roundTrip(route, 'hello')).to.eql('hello');
        expect(logged).to.eql([
          `SSH host key for 127.0.0.1: ${hostFingerprint} (ssh-ed25519). Set sshHostKey to verify it`,
        ]);
      });
    });

    it('opens no listening port', async () => {
      const serversBefore = listeningServers();

      route = await routeTo(echoServer.port);
      await roundTrip(route, 'hello');

      expect(listeningServers()).to.eql(serversBefore);
    });

    it('disconnects from the ssh server on close', async () => {
      route = await routeTo(echoServer.port);
      await roundTrip(route, 'hello');

      await route.close();
      route = undefined;

      await until(
        () => sshServer.clients.size === 0 && echoServer.connections.size === 0
      );
    });
  });

  describe('connect', () => {
    let postgres;

    const configFor = (port, host = '127.0.0.1') => ({
      host,
      port,
      user: 'tester',
      database: 'test',
      sshHost: '127.0.0.1',
      sshPort: sshServer.port,
      sshUsername: 'tester',
      sshPrivateKey: userKey.private,
      sshHostKey: hostFingerprint,
    });

    afterEach(async () => {
      await postgres?.close();
      postgres = undefined;
    });

    it('reaches postgres by a name only the ssh server can resolve, and cleans up on close', async () => {
      postgres = await startFakePostgres(LOGIN_OK);
      const serversBefore = listeningServers();

      const { close } = await connect(configFor(postgres.port, 'db.internal'));

      expect(listeningServers()).to.eql(serversBefore);
      expect(postgres.connections.size).to.eql(1);
      expect(sshServer.clients.size).to.eql(1);

      await close();

      await until(
        () => postgres.connections.size === 0 && sshServer.clients.size === 0
      );
    });

    it('rejects and closes the ssh connection when postgres is unreachable', async () => {
      const port = await closedPort();

      const error = await connect(configFor(port)).catch(e => e);

      expect(error).to.be.an('error');
      expect(error.message).to.include(
        `SSH server could not reach 127.0.0.1:${port}`
      );
      await until(() => sshServer.clients.size === 0);
    });

    it('rejects and closes the ssh connection when postgres refuses the login', async () => {
      const logged = captureConsole('error');
      postgres = await startFakePostgres(AUTHENTICATION_FAILED);

      const error = await connect(configFor(postgres.port)).catch(e => e);

      expect(error).to.be.an('error');
      expect(error.message).to.eql(
        'password authentication failed for user "tester"'
      );
      expect(error.code).to.eql('28P01');
      expect(logged).to.eql([]);
      await until(
        () => postgres.connections.size === 0 && sshServer.clients.size === 0
      );
    });
  });
});
