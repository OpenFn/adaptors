# SSH tunnel test harness (test only)

A postgres container that can **only** be reached through an SSH tunnel.

- `keys/` holds a throwaway ed25519 keypair. It is committed on purpose and
  protects nothing.
- `Dockerfile`: postgres 16 + sshd. Postgres listens on 127.0.0.1 inside the
  container; sshd accepts only `keys/test_key.pub` (user `tunnel`, no
  passwords).
- Only sshd is published (host `2222` -> container `22`). Postgres is never
  published.
- `init.sql` creates a `users` table with 2 rows. DB `testdb`, user `testuser`,
  password `testpass`.

```sh
cd packages/postgresql/test/ssh
docker compose up -d --build

node scripts/direct.js   # no tunnel: both attempts fail (timeout or ECONNREFUSED)

# the adaptor itself, via the CLI (build the adaptor first: pnpm build)
./cli/run.sh

docker compose down
```

## Adaptor config

Setting `sshHost` turns the tunnel on. Postgres traffic runs over the SSH
connection itself, so the adaptor opens no local port.

| key             | meaning                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sshHost`       | ssh server. Enables the tunnel                                                                                                                                  |
| `sshPort`       | ssh port (defaults to 22)                                                                                                                                       |
| `sshUsername`   | ssh username                                                                                                                                                    |
| `sshPrivateKey` | private key contents                                                                                                                                            |
| `sshPassphrase` | optional, if the key is encrypted                                                                                                                               |
| `sshHostKey`    | optional, expected host key fingerprint (`SHA256:...`; the prefix and trailing `=` are optional). Unset: any host key is accepted and its fingerprint is logged |
| `host`, `port`  | postgres, **as seen from the ssh server**. `port` defaults to 5432                                                                                              |

Get the fingerprint with
`ssh-keyscan -p 2222 -t ed25519 localhost | ssh-keygen -lf -`, or copy it from
the log line the adaptor prints when `sshHostKey` is unset. A server has one key
per type (ed25519, ecdsa, rsa) and the adaptor checks only the one it
negotiates, so pin the type named in the log line or mismatch error.
