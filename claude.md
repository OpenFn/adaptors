# CLAUDE CONTEXT — OpenFn Adaptors

> Single source of truth for Claude Code in VS Code when helping contributors build **new OpenFn adaptors** in this repo.

## 0) What this is
- **Goal:** Help a developer scaffold/extend an adaptor **locally**, with code + tests ready for review.
- **Do _not_ open PRs or push branches.** Generate files/diffs in the workspace and present them for a human to commit and PR.

---

## 1) Rules of Practice

1. **No PR automation.** Never create branches or PRs. Output code files and a short “changeset” summary. Ask the developer to run tests and commit.
2. **Source of truth (in order):**
   1. `./docs/*.md`  ← primary (in-repo docs)
   2. Existing adaptors in `./packages/*` (copy patterns)
   3. Tests in `./packages/*/test`
   4. `package.json`, tsconfig, eslint
   5. (Fallback) Public wiki pages on GitHub if something is missing

3. **Always cross-reference**—when you make a design choice, add an inline comment with a link to the relevant wiki section.
4. **Consistency > novelty.** Match file layout, naming, error model, logging, and testing from the most recently updated adaptor.
5. **Security/correctness first.** Validate inputs, handle TLS/Undici per guidance, and mock all network in tests.
6. **Document as you go.** Add JSDoc for public APIs; update the new adaptor’s `README.md` with examples.
7. **Tests are mandatory.** Positive + negative tests for every operation; use Undici `MockAgent` and disable net connect.
8. **If specs are ambiguous,** add an **Assumptions** block in the PR description draft (output it as markdown with TODOs).

---

## 2) Context Map (authoritative wiki pages)

- **Build a new adaptor** → https://github.com/OpenFn/adaptors/wiki/Build-a-new-Adaptor  
- **Best practices & common patterns** → https://github.com/OpenFn/adaptors/wiki/Adaptor-Writing-Best-Practice-%26-Common-Patterns  :contentReference[oaicite:0]{index=0}
- **Unit testing guide** → https://github.com/OpenFn/adaptors/wiki/Unit-Testing-Guide  :contentReference[oaicite:1]{index=1}
- **Set up your environment** → https://github.com/OpenFn/adaptors/wiki/Set-Up-Your-Environment
- **How to get code assist in VSC** → https://github.com/OpenFn/adaptors/wiki/How-to-get-code-assist-for-adaptors-in-VSC
- **Documentation guide** → https://github.com/OpenFn/adaptors/wiki/Documentation-Guide

> The wiki is actively updated (see timestamps on pages). If anything conflicts, **prefer the wiki** and leave a note in your output. The home page lists all sections and emphasizes it’s a living guide. :contentReference[oaicite:2]{index=2}

---

## 3) Standard scaffold for a **new adaptor**

Create `./packages/<adaptor-name>/` mirroring a recent adaptor.

**Required files**
- `package.json` (name, main, types, scripts: build/lint/test/docs)
- `src/index.ts` (public API exports)
- `src/client.ts` (Undici dispatcher/agent factory; TLS + redirect policy)
- `src/operations/*.ts` (one file per API domain)
- `src/types.ts` (types/Zod as needed)
- `README.md` (usage, examples, state semantics)
- `test/*.test.ts` (Mocha/Chai/Sinon; `MockAgent`)

**Example scripts**
```json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "lint": "eslint .",
    "test": "mocha --timeout 10000 'test/**/*.test.ts' -r ts-node/register",
    "docs": "node scripts/generate-docs.mjs"
  }
}
