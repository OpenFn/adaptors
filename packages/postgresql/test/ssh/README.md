# SSH tunnel test harness (test only)

A postgres container that can **only** be reached through an SSH tunnel.

- `keys/` holds a throwaway ed25519 keypair. It is committed on purpose and protects nothing.
- `Dockerfile`: postgres 16 + sshd. Postgres listens on 127.0.0.1 inside the container; sshd accepts only `keys/test_key.pub` (user `tunnel`, no passwords).
- Only sshd is published (host `2222` -> container `22`). Postgres is never published.
- `init.sql` creates a `users` table with 2 rows. DB `testdb`, user `testuser`, password `testpass`.

```sh
cd packages/postgresql/test/ssh
docker compose up -d --build

node scripts/direct.js   # no tunnel: both attempts fail (ECONNREFUSED)
node scripts/tunnel.js   # ssh2 tunnel + pg: prints the 2 users

# the adaptor itself, via the CLI (build the adaptor first: pnpm build)
./cli/run.sh

docker compose down
```

## Adaptor config

Passing `ssh_key` (the private key contents) turns the tunnel on:

| key              | meaning                                                     |
| ---------------- | ----------------------------------------------------------- |
| `ssh_key`        | private key contents. Enables the tunnel                    |
| `ssh_host`       | ssh server (defaults to `host`)                             |
| `ssh_port`       | ssh port (defaults to 22)                                   |
| `ssh_user`       | ssh username                                                |
| `ssh_passphrase` | optional, if the key is encrypted                           |
| `host`, `port`   | postgres, **as seen from the ssh server**                   |
