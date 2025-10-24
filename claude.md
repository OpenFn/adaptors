# CLAUDE CONTEXT — OpenFn Adaptors

> Primary guide for **Claude Code** when helping contributors build or extend OpenFn adaptors.  
> Mirrors `.github/copilot-instructions.md` and `.github/prompts/new-adaptor.prompt.md`.

---

## Overview

- **Purpose:** Assist developers in creating new OpenFn adaptors in a consistent, compliant way.  
- **Goal:** Generate clear, testable code for human review — **no automatic PRs** or branch creation.  
- **Core principle:** Always reference and follow the `./docs` folder first.
- When responding in VS Code, **read this file and all `./docs/*.md` files before proposing or generating code**.


---

## Rules of Practice

1. **Doc-first:**  
   Read all relevant `./docs/*.md` files before generating code. They are the authoritative source for:
   - Adaptor structure  
   - Naming conventions  
   - HTTP/TLS & Undici agent patterns  
   - Testing guidelines  
   - Publishing and documentation

2. **Plan-first:**  
   Always present a **PLAN block** before writing any code.  
   The PLAN must summarize what will be created and **wait for human approval** (`APPROVED:`) before code generation.

3. **One-Function Default:**  
   If the user does **not** specify operations, create **exactly one** HTTP function and **one** happy-path test.  
   Do not infer additional endpoints.

4. **Context Mode:**  
   If the user provides API context or enumerates operations, create **one function per operation**, each with **one** happy-path test.

5. **No PR Automation:**  
   Generate files and diffs locally for human review only. Do not push commits, open PRs, or modify branches.

6. **Tests Mandatory:**  
   Every operation must have a corresponding unit test using **Undici MockAgent**.  
   No live network calls.

7. **Naming & File Placement Invariants:**
   - `Utils.js`:  
     - Exported function **must remain named** `request`.  
     - **Do not** rename, remove, or alter this function’s signature or observable behavior.  
     - **Do not** add operational functions here. It is for infra/helpers only.  
     - To extend, create a wrapper (e.g., `requestWithRetry`) that calls `request`.
   - `Adaptors.js`:  
     - Exported function **must remain named** `request`.  
     - **All operational functions belong here**, not in `Utils.js`.  
     - Do not rename, remove, or modify the existing `request` function signature.

8. **Cross-reference:**  
   When generating code, include inline comments linking to the relevant `./docs/...` files used as references.

---

## Sources of Truth (priority order)

1. `./docs/*.md` — authoritative (e.g., `build-a-new-adaptor.md`, `unit-testing-guide.md`, `http-and-tls.md`)  
2. Existing adaptors in `./packages/*`  
3. Repo configurations (`package.json`, `tsconfig`, `eslint`)  
4. Fallback: GitHub wiki if something is missing locally

---

## Plan Phase Template (must always come first)

Claude must output this **PLAN block** first, between the given markers, then stop until approved.

- Output **only the PLAN block** first and stop. No extra text before or after.


### PLAN

<<<PLAN>>>
- Adaptor: <name or ASK>
- Endpoint(s): <list>
- Function count: <N>
- Test count: <N>
- Naming & placement acknowledged: Utils.js → request only (no operational functions); Adaptors.js → request + all operational functions
- Assumptions: <bullets>
- Docs used: <./docs/... pages>
- Questions (if any): <bullets>

<<<END PLAN>>>

**Wait for human reply starting with `APPROVED:`** before any code generation.


---

## Build Phase (after approval)

After receiving `APPROVED:`, generate the following, in order:

1. **File tree diff** — show paths to be created/modified.  
2. **Full file contents** for each file.  
3. **Test commands** to run locally (e.g., `pnpm test`).  
4. **Assumptions & TODOs** — reference relevant `./docs/...` sections.  
5. Reminder: *Human must commit manually (no PR actions).*

---

## Expected Compliance Checklist

Every generated output should include or acknowledge:

- [ ] ONE-FUNCTION DEFAULT respected  
- [ ] Context operations explicitly listed (if any)  
- [ ] Docs consulted (list of `./docs/...` files)  
- [ ] Naming invariants respected (`Utils.js`, `Adaptors.js`)  
- [ ] No operational code written to `Utils.js`  
- [ ] Tests use `MockAgent` (no live network)  
- [ ] Links to docs are included in comments  

---

## Example Interactions

### Minimal Adaptor
**User:**  
> Create a new adaptor for https://v2.jokeapi.dev/joke/.  
> No operations listed — apply ONE-FUNCTION DEFAULT.  
> Show PLAN first and wait for approval.

**Claude PLAN output:**  

<<<PLAN>>>
Adaptor: jokeapi
Endpoint(s): GET https://v2.jokeapi.dev/joke/Any?type=single

Function count: 1
Test count: 1
Naming & placement acknowledged: Utils.js → request only (no operational functions); Adaptors.js → request + all operational functions
Assumptions:

No auth required

Response shape: { joke: string }
Docs used:

./docs/build-a-new-adaptor.md

./docs/unit-testing-guide.md

./docs/http-and-tls.md
Questions: none
<<<END PLAN>>>



**User:**  
> APPROVED: proceed.

**Claude then generates:**  
- File tree diff  
- Implementation in `Adaptors.js`  
- Matching test file  
- Assumptions/TODOs referencing docs  

---

## 🔒 Enforcement via Code Comments

Make sure these headers exist in your source files to reinforce the invariants:

**`Utils.js`**
```js
/**
 * DO NOT RENAME OR MODIFY OBSERVABLE BEHAVIOR
 * Invariant: exported function must remain `request`.
 * No operational functions allowed here. For new operations, modify Adaptors.js.
 */
export function request(/* args */) { ... }

```


**`Adaptors.js`**

```js
/**
 * DO NOT RENAME OR MODIFY OBSERVABLE BEHAVIOR
 * Invariant: exported function must remain `request`.
 * All operational functions belong in this file.
 */
export function request(/* args */) { ... }

```