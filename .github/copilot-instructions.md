# OpenFn Adaptors — Copilot Repository Instructions

**Default rule:** If the user does not enumerate operations, implement EXACTLY ONE HTTP function and ONE happy-path test. Do not infer or add endpoints.


## What to prioritize (in order)
1) Local docs in `./docs/*.md` (authoritative)
2) Recent adaptors in `./packages/*` (layout, naming, tests)
3) Repo configs: `package.json`, tsconfig, eslint
4) Fallback: public GitHub wiki if a topic is missing locally

## Rules of practice
- Do **not** create branches or PRs. Generate local files/diffs only.
- Mirror existing adaptor structure; keep changes small and tested.
- Tests are mandatory; mock all HTTP with Undici `MockAgent` (no live network).
- Cross-reference choices with relative links to `./docs/...`.
- Follow TLS/Undici patterns; pass `origin` on redirecting requests.

## Quick commands
`pnpm i && pnpm lint && pnpm test && pnpm build`
