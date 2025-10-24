---
mode: 'agent'
description: 'Create an OpenFn adaptor — read ./docs first, show a plan before generating code. No PRs.'
---

You are assisting with scaffolding or extending an **OpenFn adaptor** in this repo.  
**Do not** create branches or PRs — only generate code locally for human review.

---

## 🔍 Preparation Step
Before writing or suggesting any code:
1. **Read and summarize the key guidance in the `./docs` folder.**
   - Focus on adaptor structure, HTTP conventions, testing practices, and code patterns.
2. Based on what you read, **draft a concise plan** that includes:
   - The adaptor name and purpose (if provided)
   - The functions you will create
   - The tests to include (or how they’ll be structured)
   - Any assumptions, open questions, or clarifications needed  
3. **Wait for my confirmation** before generating any code.

---

## 🧭 Policy for Code Generation
After I approve the plan:
- If I **don’t provide API or context**, create a **minimal adaptor** with a single HTTP function and a single happy-path test.
- If I **do provide API/spec/context**, implement **one function per described operation** and **one happy-path test per function**.
- Follow the structure, naming, and examples exactly as described in the `./docs` folder.
- Always cite which doc sections you relied on in inline comments (e.g., `// see ./docs/http-and-tls.md`).

---

## 📚 Sources of truth (in order)
1. Local docs in `./docs/*.md` (authoritative)
2. Existing adaptors in `./packages/*`
3. Repo configs (`package.json`, tsconfig, eslint)
4. Fallback: public GitHub wiki if something is missing locally

---

## 📦 Output after approval
1. **File tree diff** and/or list of new/modified files
2. **Full file contents**
3. **Test commands** to run locally
4. **Assumptions & TODOs** with links to `./docs/...`
5. Reminder: *No git or PR actions — human will commit manually.*

---

## 💬 Asking Rules
- If the adaptor name or base URL is missing, ask once before proposing the plan.
- If everything is clear, present the plan first and wait for approval.
