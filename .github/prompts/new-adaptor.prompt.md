---
mode: 'agent'
description: 'Doc-first adaptor builder. Read ./docs first, show a PLAN, wait for APPROVED:. Default = 1 function + 1 test. Respect Utils.js naming invariant. No PRs.'
---

You are assisting with scaffolding or extending an **OpenFn adaptor** in this repo.
**Do not** create branches or PRs — generate local files/diffs only for human review.

---

## 🔍 Preparation (Doc-first)
Before proposing or generating any code:
1. **Read the `./docs/*.md` files** to understand adaptor structure, HTTP/TLS patterns, and testing practices.
2. Produce a short **PLAN** that includes:
   - Adaptor name and purpose (ask once if missing)
   - Endpoint(s) you will touch
   - **Function count** and **Test count**
   - Naming invariants acknowledged (see below)
   - Assumptions & questions
3. **Stop and wait** for a reply starting with **`APPROVED:`** before writing code.

---

## 🚧 Guardrails (must follow)
- **ONE-FUNCTION DEFAULT:** If the user did **not** enumerate operations, plan **exactly 1** HTTP function and **exactly 1** happy-path test. Do **not** infer or add endpoints.
- **CONTEXT MODE:** If the user enumerates operations, implement **one function per operation**, each with **one** happy-path test.
- **NAMING INVARIANT:** In `Utils.js`, the exported HTTP function name is **`request`**. Do **not** rename or change this export. If you need new behavior, create a wrapper (e.g., `requestWithRetry`) that calls `request` internally.
- **DOC-FIRST:** Follow structure, naming, HTTP/TLS, and testing patterns from local docs; add inline comments citing the exact `./docs/...` pages used.
- **NO GIT/PR ACTIONS:** Never create branches or PRs; output local files/diffs only.

---

## 📚 Sources of truth (in order)
1. Local docs in `./docs/*.md` (authoritative)
2. Existing adaptors in `./packages/*` (copy patterns)
3. Repo configs (`package.json`, `tsconfig`, `eslint`)
4. (Fallback) Public GitHub wiki if something is missing locally

---

## ✅ Output (after approval)
1. **File tree diff** / list of new & modified files
2. **Full file contents** for each created/updated file
3. **Test commands** to run locally
4. **Assumptions & TODOs** (brief; link `./docs/...`)
5. Reminder: *No git or PR actions — human will commit manually.*

---

## 💬 Asking Rules
- If `<ADAPTOR_NAME>` or base URL is missing, ask **once** before producing the PLAN.
- If everything is clear, present the PLAN and wait for `APPROVED:` before code.

---

## 📝 PLAN template (what you should output first)
### PLAN:
- Adaptor: <name>
- Endpoint(s): <list>
- Function count: <N> // If no operations were listed, N MUST be 1
- Test count: <N> // If no operations were listed, N MUST be 1
- Naming invariants acknowledged: Utils.js → request (will not be renamed)
- Assumptions: <bullets>
- Docs used: <./docs/... pages>
- Questions (if any): <bullets>
