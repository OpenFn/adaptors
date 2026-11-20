import { expect } from 'chai';
import { connect } from '../src/connection.js';
import {
  captureConsole,
  generateKey,
  restoreConsole,
  startFakeTlsPostgres,
  startSshServer,
  tlsFixture,
} from './helpers/fakes.js';

// All signed by ca.crt and valid until 2126. server: DNS:db.test and
// IP:10.1.2.3; ip: IP:127.0.0.1; localhost: DNS:localhost.
const CA = tlsFixture('ca.crt');

describe('ssl through an ssh tunnel', () => {
  let userKey;
  let sshServer;
  let postgres;
  let servername;

  const connectTo = (host, options = {}) =>
    connect({
      host,
      port: postgres.port,
      user: 'tester',
      database: 'test',
      ssl: true,
      ca: CA,
      sshHost: '127.0.0.1',
      sshPort: sshServer.port,
      sshUsername: 'tester',
      sshPrivateKey: userKey.private,
      ...options,
    });

  before(async () => {
    userKey = generateKey();
    sshServer = await startSshServer({
      allowedPublicKey: userKey.public,
      hosts: {
        'db.test': '127.0.0.1',
        'other.test': '127.0.0.1',
        '10.1.2.3': '127.0.0.1',
        '10.9.9.9': '127.0.0.1',
      },
    });
    postgres = await startFakeTlsPostgres(
      'server',
      name => (servername = name)
    );
  });

  // The tunnel logs the ssh host key, and pg's failed handshakes are logged too
  beforeEach(() => {
    servername = undefined;
    captureConsole('log');
    captureConsole('error');
  });

  afterEach(restoreConsole);

  after(async () => {
    await postgres.close();
    await sshServer.close();
  });

  it('verifies the certificate against the database hostname', async () => {
    const { close } = await connectTo('db.test');
    await close();

    expect(servername).to.eql('db.test');
  });

  it('verifies the certificate against the database ip address', async () => {
    const { close } = await connectTo('10.1.2.3');
    await close();

    expect(servername).to.eql(false);
  });

  it('rejects a certificate issued for a different hostname', async () => {
    const error = await connectTo('other.test').catch(e => e);

    expect(error.code).to.eql('ERR_TLS_CERT_ALTNAME_INVALID');
    expect(error.message).to.include('other.test');
  });

  it('rejects a certificate issued for a different ip address', async () => {
    const error = await connectTo('10.9.9.9').catch(e => e);

    expect(error.code).to.eql('ERR_TLS_CERT_ALTNAME_INVALID');
    expect(error.message).to.include('10.9.9.9');
  });

  it('accepts a mismatched certificate when self signed certs are allowed', async () => {
    const { client, close } = await connectTo('other.test', {
      allowSelfSignedCert: true,
    });
    await close();

    expect(client).to.be.an('object');
    expect(servername).to.eql('other.test');
  });
});

describe('ssl on a direct connection', () => {
  let ipPostgres;
  let localhostPostgres;
  let servername;

  const connectTo = (postgres, host, options = {}) =>
    connect({
      host,
      port: postgres.port,
      user: 'tester',
      database: 'test',
      ssl: true,
      ca: CA,
      ...options,
    });

  before(async () => {
    ipPostgres = await startFakeTlsPostgres('ip');
    localhostPostgres = await startFakeTlsPostgres(
      'localhost',
      name => (servername = name)
    );
  });

  // pg's failed handshakes are logged
  beforeEach(() => {
    servername = undefined;
    captureConsole('error');
  });

  afterEach(restoreConsole);

  after(async () => {
    await ipPostgres.close();
    await localhostPostgres.close();
  });

  it('accepts a certificate issued for the ip address it connects to', async () => {
    const { client, close } = await connectTo(ipPostgres, '127.0.0.1');
    await close();

    expect(client).to.be.an('object');
  });

  it('rejects a certificate for localhost when connecting to an ip address', async () => {
    const error = await connectTo(localhostPostgres, '127.0.0.1').catch(e => e);

    expect(error.code).to.eql('ERR_TLS_CERT_ALTNAME_INVALID');
    expect(error.message).to.include('127.0.0.1');
  });

  it('verifies the certificate against the hostname it connects to', async () => {
    const { close } = await connectTo(localhostPostgres, 'localhost');
    await close();

    expect(servername).to.eql('localhost');
  });

  it('rejects a certificate for an ip address when connecting to a hostname', async () => {
    const error = await connectTo(ipPostgres, 'localhost').catch(e => e);

    expect(error.code).to.eql('ERR_TLS_CERT_ALTNAME_INVALID');
    expect(error.message).to.include('localhost');
  });

  it('accepts a mismatched certificate when self signed certs are allowed', async () => {
    const { client, close } = await connectTo(localhostPostgres, '127.0.0.1', {
      allowSelfSignedCert: true,
    });
    await close();

    expect(client).to.be.an('object');
    expect(servername).to.eql(false);
  });
});
