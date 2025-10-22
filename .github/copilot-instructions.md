# OpenFn Adaptors — Copilot Repository Instructions

## What to prioritize (in order)
1) OpenFn adaptor wiki (authoritative): 
   - Build a new adaptor: https://github.com/OpenFn/adaptors/wiki/Build-a-new-Adaptor
   - Best practices & patterns: https://github.com/OpenFn/adaptors/wiki/Adaptor-Writing-Best-Practice-%26-Common-Patterns
   - Unit tests: https://github.com/OpenFn/adaptors/wiki/Unit-Testing-Guide
2) Recent adaptors in `./packages/*` (copy layout, naming, tests)
3) Repo configs: `package.json`, eslint, tsconfig

## Rules of practice
- Do **not** create branches or PRs. Generate files/edits locally and present diffs for a human to review & commit.
- Mirror existing adaptor structure; keep changes small and well-tested.
- Tests are mandatory; mock all HTTP with Undici `MockAgent` (no live network).
- Cross-reference decisions with wiki links in code comments.
- Follow TLS/Undici patterns used in this repo; pass `origin` on redirecting requests.

## Quick commands
- `pnpm i && pnpm test && pnpm build`
