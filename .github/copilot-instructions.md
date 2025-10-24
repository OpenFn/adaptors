# OpenFn Adaptors — Copilot Repository Instructions

**Default rule:**  
If the user does not enumerate operations, implement **EXACTLY ONE** HTTP function and **ONE** happy-path test.  
Do not infer or add endpoints.

---

## 🚧 One-Function & Plan Gates

**One-Function Gate (must pass before code):**
- Start every run with a `PLAN:` section.
- Include `Function count:` and `Test count:` numbers.
- If operations were **not** enumerated by the user, these numbers MUST be `1` and `1`.
- WAIT for a reply starting with `APPROVED:` before generating code.

**Compliance checklist (include before code):**
- ONE-FUNCTION DEFAULT respected? yes/no  
- Context operations explicitly listed? yes/no  
- Docs consulted: list `./docs/...` files  
- **Naming invariants respected (`Utils.js` → `request`, `Adaptors.js` → `request`)**? yes/no  

---

## 🧩 Naming Invariants (Do NOT break)

- In **`Utils.js`**, the exported HTTP function **must remain named** `request`.  
  - Do **not** rename, remove, or change its export name or signature.
  - Do **not** alter its observable behavior.  
  - If new behavior is needed, create a wrapper (e.g., `requestWithRetry`) that delegates to `request`.

- In **`Adaptors.js`**, the exported function **must remain named** `request`.  
  - Do **not** rename, remove, or change its export name or signature.
  - Do **not** alter its observable behavior.  
  - If you must extend behavior, create a separate function that calls `request` internally.

Include in your PLAN:  
“**Naming invariants acknowledged:** `Utils.js → request` and `Adaptors.js → request` (will not be renamed or modified)”.

---

## 📚 What to Prioritize (in order)
1. Local docs in `./docs/*.md` (authoritative)
2. Recent adaptors in `./packages/*` (layout, naming, tests)
3. Repo configs: `package.json`, `tsconfig`, `eslint`
4. Fallback: public GitHub wiki if a topic is missing locally

---

## ⚙️ Rules of Practice
- **Doc-first:** Always read `./docs/*.md` before generating code.  
- **Plan-first:** Output a clear `PLAN:` and wait for `APPROVED:` before writing code.  
- **One-function default:** Only create one HTTP function and one test unless multiple operations are explicitly listed.  
- **Never create branches or PRs.** Generate local files/diffs only.  
- **Mirror** existing adaptor structure; keep changes minimal and tested.  
- **Tests are mandatory** and must mock HTTP using Undici `MockAgent` (no live network).  
- **Cross-reference** all design choices with relative links to `./docs/...`.  
- **Follow** TLS/Undici patterns; always pass `origin` on redirecting requests.  
- **Respect naming invariants** in `Utils.js` and `Adaptors.js` (see above).  

---

## 🧪 Quick Commands
```bash
pnpm i && pnpm lint && pnpm test && pnpm build
