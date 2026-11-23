# CLAUDE.MD — OpenFn Adaptors

Build OpenFn adaptors following docs-first workflow. Generate code for human
review only—no automatic commits or PRs.

---

## Workflow

1. **Read `./wiki/` first**
2. **Output PLAN** → wait for `APPROVED:`
3. **Generate code** with doc references in comments

---

## Scoping Rules

**No operations specified?** → Create 1 function + 1 test (default)  
**Operations listed?** → Create 1 function + 1 test per operation

---

## File Invariants (CRITICAL)

These are rules for you to follow when generating code. They are constant across the whole repo.

**DO NOT write them into the generated files.** No `INVARIANT:` comments, no "Docs:" or "API:" header blocks, no file-level banner comments restating these rules. Generated files should contain only normal code and JSDoc for the functions themselves.

- `Utils.js`
  - Must export a function named `request`
  - Infrastructure/helpers ONLY; NO operational functions
  - To extend: wrap it (e.g., `requestWithRetry`)
- `Adaptors.js`
  - Must export a function named `request`
  - ALL operational functions go here

---

## Testing

- Every function needs a unit test using **Undici MockAgent**
- No live network calls
- Follow patterns in `./wiki/unit-test-guide.md`

---

## Plan Template

Output this EXACTLY, then STOP:

```
<<<PLAN>>>
Adaptor: <name>
Endpoint(s): <list>
Functions: <N>
Tests: <N>

Invariants:
✓ Utils.js: request only
✓ Adaptors.js: request + operational functions

Assumptions:
- <bullets>

Docs consulted:
- ./docs/build-a-new-adaptor.md
- ./docs/unit-testing-guide.md

Questions: <bullets or "None">
<<<END PLAN>>>
```

Wait for `APPROVED:` before generating code.

---

## Build Output (after approval)

Generate in order:

1. **File tree diff**

```
packages/<name>/
├── src/Adaptor.js    [NEW]
├── src/Utils.js      [NEW]
└── test/index.test.js [NEW]
```

2. **Full file contents** with:

   - JSDoc annotations on exported functions
   - No invariant comments, doc-reference headers or other file-level banner comments

3. **Test commands**

```bash
cd packages/<name>
pnpm install  # Installs dependencies from package.json
pnpm test     # Runs test suite with Mocha
```

4. **TODOs** referencing specific doc sections

5. **Reminder:** Review locally, commit manually

---

## Example

**Human:** Create adaptor for https://v2.jokeapi.dev/joke/

**Claude:**

```
<<<PLAN>>>
Adaptor: jokeapi
Endpoint(s): GET https://v2.jokeapi.dev/joke/Any?type=single
Functions: 1 (getJoke)
Tests: 1

Invariants:
✓ Utils.js: request only
✓ Adaptors.js: request + getJoke

Assumptions:
- No auth
- Response: {joke: string}

Docs consulted:
- ./docs/build-a-new-adaptor.md
- ./docs/unit-testing-guide.md

Questions: None
<<<END PLAN>>>
```

**Human:** APPROVED: proceed

**Claude:** _[generates files]_

### Generating QA Tests

**User:** "Generate QA job code for this adaptor"

**Claude:** [Reads `.github/prompts/qa-job-generation.md` first]
```
<<<QA PLAN>>>
Adaptor: @openfn/example-api
Functions: getData
Test coverage: 5 tests (2 positive, 2 negative, 1 edge case)
Seed data: test-item-001, test-item-002
Configuration needed: { baseUrl, apiKey }
Output file: qa-example-api.js (root directory)
<<<END QA PLAN>>>
```

**User:** "APPROVED: proceed"

**Claude:** [Generates `qa-example-api.js` in root directory using template from qa-job-generation.md]

---

## Critical Reminders

- Always read `./docs/*.md` before generating adaptor code
- Always read `.github/prompts/qa-job-generation.md` before generating QA code
- Wait for APPROVED: before generating any code
- Unit tests use MockAgent (no live network)
- QA tests run on app.openfn.org (live system)
- QA files use promise chaining syntax: `.then().catch()`
- QA files saved to root directory: `qa-<adaptor-name>.js`
- Never rename `request` functions in Utils.js or Adaptors.js
- One function + one test is default unless operations specified
---

## Reference: doc generation

How JSDoc becomes `docs/index.md` / `docs.json` (build pipeline, custom tags,
templates, debugging): see [`.claude/docgen.md`](.claude/docgen.md).
Read it before changing anything under `tools/build` or `tools/adaptor-apis`.

### Documenting non-function exports (`@kind namespace`)

Some exports are not functions (eg lodash's `_` in common). If you tag them
`@function` they are listed under **Functions** with a bogus `name()` signature.
Instead, declare them as a namespace doclet:

```js
/**
 * Lodash utility library.
 * @see https://lodash.com/docs/
 * @public
 * @kind namespace
 * @name _
 * @example ...
 */
export { _ };
```

- `@kind namespace` sets the doclet's `kind` to `namespace`. Do NOT also add
  `@function`, and use `@name` to give it its documented name.
- `@public` is still required, or the item is filtered out.
- No signature is generated (only `kind: function` gets one), and it is not
  rendered under Functions.
- `docs-template.hbs` renders `kind="namespace"` globals twice: an index list
  ("exports the following utility namespaces") and a `## Namespaces` section
  with the description, `@see` and examples.
- Don't confuse this with the repo's custom `@namespace foo` tag, which means
  "this function belongs to namespace `foo`" (it sets `scope`, as with
  `http.get`). It does not declare a namespace item.

Details: [`.claude/docgen.md`](.claude/docgen.md).
