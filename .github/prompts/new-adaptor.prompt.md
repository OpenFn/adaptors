---
mode: 'agent'
description: 'Doc-first adaptor builder. Read ./docs, propose a plan, then generate. Default: exactly 1 HTTP function + 1 test. No PRs.'
---

You are assisting with an **OpenFn adaptor**. **Do not** create branches/PRs. Generate local files only.

## Guardrails (must follow)
- **ONE-FUNCTION DEFAULT:** If the user only provides a base URL (e.g., `https://v2.jokeapi.dev/joke/`) and no operations, create **exactly one** HTTP function and **exactly one** happy-path test.
- **NO INFERENCE:** Do **not** add endpoints or functions beyond what the user explicitly lists.
- **CONTEXT MODE:** If (and only if) the user lists operations, implement **one function per listed operation**, each with **one** happy-path test.
- **CONFIRMATION GATE:** First show a **PLAN** and wait for the user to reply `APPROVED:` before writing any code.
- **DOC-FIRST:** Read `./docs/*.md` and follow structure, naming, HTTP/TLS, and testing patterns from the local docs. Link to the exact docs you used in inline comments.

## Sources of truth (in order)
1) `./docs/*.md` (authoritative)
2) `./packages/*` (copy patterns)
3) Repo configs (package.json, tsconfig, eslint)
4) Fallback: public wiki if something is missing locally

## PLAN (required before code)
Output a short plan with:
- Adaptor name (or ask once if missing)
- Chosen endpoint(s)
- List of functions (count them) and tests (count them)
- Any assumptions / questions
**Stop here and wait for `APPROVED:`**

## After approval, output in this order
1) File tree diff (paths)
2) Full file contents
3) Test commands
4) Assumptions & TODOs with `./docs/...` links
5) Reminder: no git/PR actions
