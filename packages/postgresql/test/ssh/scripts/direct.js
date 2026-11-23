// Try to reach postgres WITHOUT the tunnel. This is EXPECTED TO FAIL.
//
// Two attempts, both bypassing ssh:
//  1. the container's bridge IP on 5432 (postgres only listens on 127.0.0.1 inside the container)
//  2. localhost:5433 (nothing is published for postgres)
// (We avoid localhost:5432 because a dev machine may run its own postgres there.)
import { execSync } from 'node:child_process';
import pg from 'pg';

const containerIp = execSync(
  `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' openfn-postgres-ssh`
)
  .toString()
  .trim();

let failed = 0;
for (const [host, port] of [[containerIp, 5432], ['localhost', 5433]]) {
  const client = new pg.Client({
    host,
    port,
    user: 'testuser',
    password: 'testpass',
    database: 'testdb',
    connectionTimeoutMillis: 3000,
  });
  try {
    await client.connect();
    console.error(`UNEXPECTED: direct connection to ${host}:${port} succeeded`);
    await client.end();
  } catch (e) {
    failed++;
    console.log(`${host}:${port} failed, as expected: ${e.code ?? e.message}`);
  }
}
process.exit(failed === 2 ? 0 : 1);
