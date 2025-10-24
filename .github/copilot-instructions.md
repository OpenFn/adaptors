# OpenFn Adaptors — Copilot Repository Instructions

**Default rule:** If the user does not enumerate operations, implement EXACTLY ONE HTTP function and ONE happy-path test. Do not infer or add endpoints.

**One-Function Gate (must pass before code):**
- Start with a `PLAN:` section.
- Include `Function count:` and `Test count:` numbers.
- If operations were NOT enumerated by the user, these numbers MUST be `1` and `1`.
- WAIT for a reply starting with `APPROVED:` before generating code.

**Compliance checklist (include before code):**
- ONE-FUNCTION DEFAULT respected? yes/no
- Context operations explicitly listed? yes/no
- Docs consulted: list the `./docs/...` files

## What to prioritize (in order)
1) Local docs in `./docs/*.md` (authoritative)
2) Recent adaptors in `./packages/*` (layout, naming, tests)
3) Repo configs: `package.json`, tsconfig, eslint
4) Fallback: public GitHub wiki if a topic is missing locally

## Rules of practice
- Do **not** create branches or PRs. Generate local files/diffs only.
- Keep changes minimal; tests mandatory with Undici `MockAgent`.
- Cross-reference choices with relative links to `./docs/...`.
- Follow TLS/Undici patterns; pass `origin` on redirects.

## Quick commands
`pnpm i && pnpm lint && pnpm test && pnpm build`
