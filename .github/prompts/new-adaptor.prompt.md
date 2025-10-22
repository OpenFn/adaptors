---
mode: 'agent'
description: 'Scaffold a new OpenFn adaptor package with code + tests (no PRs)'
---

You are assisting with a new OpenFn adaptor. **Do not create branches or PRs.** Output:
1) File tree diff  2) Full file contents  3) Test commands  4) Assumptions/TODOs with wiki links.

Follow:
- Build a new adaptor → https://github.com/OpenFn/adaptors/wiki/Build-a-new-Adaptor
- Best practices → https://github.com/OpenFn/adaptors/wiki/Adaptor-Writing-Best-Practice-%26-Common-Patterns
- Unit tests → https://github.com/OpenFn/adaptors/wiki/Unit-Testing-Guide

Task:
- Create `./packages/<ADAPTOR_NAME>/` with `package.json`, `src/index.ts`, `src/client.ts` (Undici agent factory), one operation in `src/operations/`, `test/*.test.ts` using `MockAgent`, and a `README.md` with examples.
- Mirror naming & layout from the most recently updated adaptor in `./packages/*`.
- Tests must mock HTTP only.

When ready, ask me for `<ADAPTOR_NAME>` and any API spec details if missing.
