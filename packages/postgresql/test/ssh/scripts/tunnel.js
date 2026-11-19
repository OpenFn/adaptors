// Open an SSH tunnel with ssh2, then query postgres through it.
import fs from 'node:fs';
import net from 'node:net';
import { Client as SSH } from 'ssh2';
import pg from 'pg';

const privateKey = fs.readFileSync(new URL('../keys/test_key', import.meta.url));

const ssh = new SSH();
await new Promise((resolve, reject) => {
  ssh.on('ready', resolve).on('error', reject).connect({
    host: 'localhost',
    port: 2222,
    username: 'tunnel',
    privateKey,
  });
});

// local server: every connection is forwarded over ssh to postgres *inside* the container
const server = net.createServer(sock => {
  ssh.forwardOut('127.0.0.1', 0, '127.0.0.1', 5432, (err, stream) => {
    if (err) return sock.destroy(err);
    sock.pipe(stream).pipe(sock);
  });
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const { port } = server.address();
console.log(`tunnel open on 127.0.0.1:${port}`);

const client = new pg.Client({
  host: '127.0.0.1',
  port,
  user: 'testuser',
  password: 'testpass',
  database: 'testdb',
});
await client.connect();
console.log((await client.query('select * from users')).rows);
await client.end();
server.close();
ssh.end();
