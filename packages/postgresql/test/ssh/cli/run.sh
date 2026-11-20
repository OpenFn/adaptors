#!/usr/bin/env bash
# Run job.js through the OpenFn CLI against the ssh-only postgres container.
# Needs: jq, `docker compose up -d --build` (in ../) and a built adaptor (`pnpm build` in packages/postgresql).
set -euo pipefail
cd "$(dirname "$0")"

# host/port are as seen from the ssh server (i.e. inside the container).
state=$(jq -nc --rawfile key ../keys/test_key '{
  configuration: {
    host: "127.0.0.1", port: 5432,
    user: "testuser", password: "testpass", database: "testdb",
    sshHost: "localhost", sshPort: 2222, sshUsername: "tunnel",
    sshPrivateKey: $key
  }
}')

openfn job.js -a postgresql="$(cd ../../.. && pwd)" -S "$state" --log info -O
