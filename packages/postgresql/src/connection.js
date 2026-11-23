import net from 'node:net';
import tls from 'node:tls';
import pg from 'pg';
import { directRoute, sshRoute } from './routes.js';

// https://node-postgres.com/features/ssl
const sslOptions = ({ ssl, host, ca, cert, key, allowSelfSignedCert }) => {
  if (!ssl) return false;
  const options = { rejectUnauthorized: !allowSelfSignedCert, ca, cert, key };
  // pg sends no servername for an IP, so Node would check the certificate
  // against "localhost" instead of the address we connected to.
  if (net.isIP(host)) {
    options.checkServerIdentity = (_, peerCert) =>
      tls.checkServerIdentity(host, peerCert);
  }
  return options;
};

/**
 * Connect to postgres, optionally through an SSH server. When `sshHost` is
 * set, `host` and `port` are resolved from the SSH server's point of view.
 * @private
 * @param {object} configuration - the adaptor configuration
 * @param {object} [timeouts]
 * @param {number} [timeouts.connectionTimeout=30000] - milliseconds to wait for postgres to accept the login
 * @returns {Promise<{ client: pg.Client, close: Function }>}
 */
export async function connect(
  configuration = {},
  { connectionTimeout = 30000 } = {}
) {
  const { sshHost, port, user, password, database } = configuration;
  const host = configuration.host ?? (sshHost ? 'localhost' : undefined);

  const route = sshHost
    ? await sshRoute(configuration, { host, port: port ?? 5432 })
    : directRoute();

  const client = new pg.Client({
    host,
    port,
    user,
    password,
    database,
    ssl: sslOptions(configuration),
    stream: route.stream,
    connectionTimeoutMillis: connectionTimeout,
  });
  client.on('error', e =>
    console.error(`Postgres connection error: ${e.message}`)
  );

  try {
    await client.connect();
  } catch (e) {
    await route.close();
    throw e;
  }

  return {
    client,
    close: () => client.end().finally(route.close),
  };
}
