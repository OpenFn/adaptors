# CLAUDE.MD — OpenFn Adaptors

Build OpenFn adaptors following docs-first workflow. Generate code for human
review only—no automatic commits or PRs.

---

## Workflow

1. **Read `./wiki/` first**
2. **Output PLAN** → wait for `APPROVED:`
3. **Generate code**
4. **Self-review** the diff against `./wiki/code-review.md` and fix what it
   finds before handing back

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
  - Infrastructure/helpers ONLY (`request`, `prepareNextState`, pagination
    helpers); NO operational functions
  - The auto-pagination loop lives here; `list*` operations in `Adaptor.js`
    call it rather than paging inline
  - To extend: wrap it (e.g., `requestWithRetry`)
- `Adaptor.js`
  - Must export a function named `request`
  - ALL operational functions go here
- `index.js`
  - The package's public surface: every public function, including namespaced
    ones from other files, is exported here. Tests and consumers import from
    `index.js`, never from `Adaptor.js` directly

---

## Design Rules

These come up in almost every review of a generated adaptor. Details are in
`./wiki/best-practice.md`.

- Required arguments are positional; everything optional goes in a trailing
  `options` object
- Only `request` (and `http.*` helpers) write `state.response`. Domain
  operations like `upsertLead` or `listActivities` write a clean result to
  `state.data` and nothing else
- List operations follow the pagination rules in `./wiki/best-practice.md`:
  `limit` is the total, `pageSize` is per request
- When the API is versioned, the version is user-settable: `apiVersion` in
  `configuration-schema.json`, defaulting in code to the version the adaptor
  was built against (see `asana`), and overridable per call with
  `options.apiVersion` (see `dhis2`). Other internal knobs (throttling, parse
  modes) stay out of options
- Upstream errors propagate as-is. Common's `request` throws with the status
  in `e.message` and the API's response on `e.body`; to add context, append to
  `e.message` and rethrow the same error
- Let the API validate inputs. Skip client-side validation of arguments so the
  API's own error reaches the user
- Name functions, including helpers in `Utils.js`, with a verb for what they
  do (`createContact`), not a noun named after the endpoint they call
  (`contacts`)
- Options with a unit say it in the name (`timeoutMs`, `queryTimeoutSeconds`).
  Never have two options with the same name in different units
- Examples are generic and read from `$.data`. Never copy the workflow, Zap or
  client use case from the prompt into public docs
- `README.md` links to the vendor's API documentation; JSDoc on low-level
  functions links to the specific endpoint's docs
- Ship live code only: delete unused code rather than commenting it out

---

## Testing

- At least one unit test per function exported from `index.js`, `request`
  included, using **Undici MockAgent**
- No live network calls
- Follow patterns in `./wiki/unit-test-guide.md`
- Test through the public export (`../src/index.js`), not internal helpers in
  `Utils.js`

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
✓ Utils.js: request + helpers only
✓ Adaptor.js: request + operational functions
✓ index.js: exports every public function

Assumptions:
- <bullets>

Docs consulted:
- ./wiki/build-a-new-adaptor.md
- ./wiki/best-practice.md
- ./wiki/docs.md
- ./wiki/unit-test-guide.md

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
├── README.md         [NEW]
├── src/Adaptor.js    [NEW]
├── src/Utils.js      [NEW]
├── src/index.js      [NEW]
└── test/Adaptor.test.js [NEW]
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

5. **Lockfile check:** `git diff pnpm-lock.yaml` should only add the new
   package. If other entries changed, your pnpm version differs from the repo's
   (see `packageManager` in `package.json`); revert and reinstall with the right
   version

6. **Reminder:** Review locally, commit manually

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
✓ Utils.js: request + helpers only
✓ Adaptor.js: request + getJoke

Assumptions:
- No auth
- Response: {joke: string}

Docs consulted:
- ./wiki/build-a-new-adaptor.md
- ./wiki/best-practice.md
- ./wiki/docs.md
- ./wiki/unit-test-guide.md

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

- Always read `./wiki/*.md` before generating adaptor code
- Always read `.github/prompts/qa-job-generation.md` before generating QA code
- Wait for APPROVED: before generating any code
- Unit tests use MockAgent (no live network)
- QA tests run on app.openfn.org (live system)
- QA files use promise chaining syntax: `.then().catch()`
- QA files saved to root directory: `qa-<adaptor-name>.js`
- Never rename `request` functions in Utils.js or Adaptor.js
- One function + one test is default unless operations specified