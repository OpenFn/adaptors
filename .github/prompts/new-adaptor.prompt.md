# OpenFn Adaptors — Copilot Repository Instructions

**Default rule:**  
If the user does not enumerate operations, implement **EXACTLY ONE** HTTP function and **ONE** happy-path test.  
Do not infer or add endpoints.

---

## 🚦 Plan & One-Function Gates (must pass before code)

**PLAN GATE (required):**
- Start every run with a PLAN block and **wait for a reply starting with `APPROVED:`** before generating code.
- The PLAN must include:
  - Adaptor name
  - Endpoint(s) to touch
  - **Function count** and **Test count**
  - Naming invariants acknowledgment
  - Assumptions & docs consulted (`./docs/...`)

**ONE-FUNCTION DEFAULT:**
- If the user **did not** enumerate operations, the PLAN **must** say `Function count: 1` and `Test count: 1`.
- Do **not** infer or add endpoints.

**Compliance checklist (include before code):**
- ONE-FUNCTION DEFAULT respected? yes/no  
- Context operations explicitly listed? yes/no  
- Docs consulted: list `./docs/...` files  
- **Naming invariants respected (`Utils.js` → `request`, `Adaptors.js` → `request`)**? yes/no

---

## 🧩 Naming Invariants (do NOT break)

- **`Utils.js`**: exported HTTP function **must remain** `request`.  
  Do not rename, remove, change signature, or observable behavior. Use wrappers if needed.

- **`Adaptors.js`**: exported function **must remain** `request`.  
  Do not rename, remove, change signature, or observable behavior. Use wrappers if needed.

Include in the PLAN:  
“**Naming invariants acknowledged:** `Utils.js → request`; `Adaptors.js → request` (will not be renamed or modified).”

---

## 📚 What to Prioritize (in order)
1) Local docs in `./docs/*.md` (authoritative)  
2) Recent adaptors in `./packages/*` (layout, naming, tests)  
3) Repo configs: `package.json`, `tsconfig`, `eslint`  
4) Fallback: public GitHub wiki if a topic is missing locally

---

## ⚙️ Rules of Practice
- **Doc-first**: read `./docs/*.md` before generating anything.
- **Plan-first**: output the PLAN and wait for `APPROVED:` before code.
- **One-function default** unless operations are explicitly listed.
- **No git/PR actions**: generate local files/diffs only.
- Mirror existing structure; keep changes minimal and tested.
- Tests are mandatory; mock HTTP with Undici **MockAgent** (no live network).
- Cross-reference design choices via relative links to `./docs/...`.
- Follow TLS/Undici patterns; pass `origin` on redirecting requests.
- Respect naming invariants for `Utils.js` and `Adaptors.js`.

---

## 🧪 Quick Commands
```bash
pnpm i && pnpm lint && pnpm test && pnpm build
