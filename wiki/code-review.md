# Adaptor Code Review Guidelines

This is the canonical checklist for reviewing changes to OpenFn adaptors. It is
written to be used by **both humans and AI reviewers** (interactive `/review`,
automated PR review, Copilot, Claude Code). Whatever prompt an AI reviewer runs,
it should be pointed at this document.

It distills the rules that live in more detail in:

- [Best Practice](best-practice.md)
- [Unit Test Guide](unit-test-guide.md)
- [Documentation Guide](docs.md)
- [Build a New Adaptor](build-a-new-adaptor.md)
- [Magic Functions](magic-functions.md)

When these documents disagree with this document, the detailed source document
wins — update this document to match.

## Review guidelines

- Review **only the diff** and the files it touches. Do not demand changes to
  unrelated code.
- For each finding, cite the section it comes from (e.g. Section 7) and quote or
  paraphrase the specific rule, plus the source wiki page where possible.
- Classify each finding as **Blocking** (must fix before merge), **Recommended**
  (should fix), or **NitPicks** (optional/style). Use the default severities
  below, adjusting up or down when the specific case clearly warrants it (e.g. a
  missing test on a trivial internal helper may drop from Blocking to
  Recommended).
  - **Blocking** — correctness and safety: security/logging of secrets or PII
    (Section 5), file/structure invariants (Section 1), broken state handling
    (Section 3), incorrect changeset bump for a breaking change (Section 9),
    committed secrets/artifacts (Section 10).
  - **Recommended** — API design and consistency (Section 2), client/lifecycle
    patterns (Section 4), error handling (Section 6), missing/weak docs or
    examples (Section 7), missing tests (Section 8), changeset wording
    (Section 9).
  - **NitPicks** — style, phrasing, spelling/grammar, and non-behavioural
    naming preferences.
- Be concise and specific. Prefer a concrete suggested change over a general
  observation.
- If the PR is small or purely internal (e.g. a dev-only change), scale the
  review down accordingly — not every section applies to every PR.
- Focus where it matters. In order: does it break existing user code
  (Section 9)? Do the tests actually test anything (Section 8)? Are the public
  docs and changeset short and accurate (Sections 7 and 9)? Most PRs only need
  these three.
- Prefer a question that leads to the problem ("If you comment out X, does
  this test still pass?") plus a concrete snippet of the fix. Explain why from
  the job writer's point of view.
- For a repeated issue, flag it once and say "check this pattern across the
  file" rather than commenting on every instance.
- Out-of-scope ideas belong in a follow-up issue, not this PR.

---

## 1. Structure & file invariants

- [ ] `src/Utils.js` contains **infrastructure/helpers only** — no operations.
      Operations (the functions used in job code) live in `src/Adaptor.js` or
      other namespaced source files.
- [ ] HTTP access uses common's `request` (`src/util/http.js`) where possible,
      rather than importing third-party HTTP libraries or native node HTTP. If
      `request` genuinely can't be used, `undici` is preferred in new adaptors.
- [ ] Namespacing invariants (namespacing itself is implied by filename — see
      [best-practice.md](best-practice.md); these are the observable checks):
  - [ ] `@namespace` is only set when the desired namespace differs from the
        implied one (the filename).
  - [ ] Namespaced functions are exported from `index.js`/`index.ts` where
        required (see `common`).
  - [ ] Unit tests exercise the namespaced name (`http.get`, not bare `get`).
  - [ ] Unit tests for public functions import from `index.js`, not directly
        from the file under test.
- [ ] `configuration-schema.json` reflects any new/changed config the code
      actually uses (new fields added, descriptions accurate, secrets marked as
      such). Schema *validity* is enforced by CI (`pnpm validate:schemas`) — the
      review focus is whether the schema matches the code.

## 2. API design

- [ ] Each exported operation is written as a function that returns another
      function. The outer function takes the user's arguments; the inner
      function takes `state` and returns `state`. In short:
      `(args) => (state) => state`. The operation should not do its work
      immediately or return a plain value — the work happens inside the inner
      function when it receives `state`.
- [ ] "Get one vs get many" uses clear, distinct operations rather than one
      function whose behaviour flips based on an optional argument (often a path
      or resource type, sometimes an id). Prefer separate operations with
      obviously different names — e.g. `getThing`/`listThings` — over
      near-identical `getThing`/`getThings`. Prefer `list` (or consistently
      `search`) across the adaptor.
- [ ] Function signatures are minimal: required values are positional
      parameters; everything else goes into a single `options` object.
- [ ] Naming and semantics match the layer: low-level HTTP helpers use HTTP
      language (method, url, query); higher-level operations mask HTTP and use
      domain language (e.g. `getUser` should not expose `method`/`url`).
- [ ] New public operations are consistent with existing operations in the same
      adaptor (and, where reasonable, across adaptors).
- [ ] Pagination follows [best-practice.md](best-practice.md#pagination):
      `limit` is the total number of records, not the page size; offsets
      advance by what actually came back; paging stops on an empty page.
      Treating `limit` as page size, or stopping on a "short" page, is
      **Blocking** because it silently drops records.
- [ ] Options which control the adaptor (`limit`, `pageSize`) are kept apart
      from values passed through to the API. One option per concept.
- [ ] No internal knobs are exposed as options (throttling, parse modes). Once
      public, we maintain them. The API version is the exception: for a
      versioned API it is settable via `configuration.apiVersion`, defaults in
      code to the version the adaptor was built against, and is overridable
      per call with `options.apiVersion`.
- [ ] Functions, including helpers in `Utils.js`, are named with a verb for
      what they do (`createContact`), not a noun named after the endpoint they
      call (`contacts`). See [best-practice.md](best-practice.md#naming).
- [ ] Options with a unit say it in the name (`timeoutMs`,
      `queryTimeoutSeconds`). No two options share a name but differ in unit.
- [ ] `request`/`http.*` helpers do exactly what they're told: paths relative
      to `baseUrl`, no absolute URLs, no URL magic, raw response returned.
- [ ] The API stays small. Question new functions that `request`/`get` already
      cover, a function per endpoint, or mirroring the vendor SDK.
- [ ] Defaults follow the upstream API unless there's a reason. Question
      unusually low limits and `required` config fields that aren't needed.
- [ ] The adaptor stays generic: it doesn't read hard-coded bits of state,
      encode one workflow's business logic, or patch around upstream bugs.
- [ ] No callbacks in new APIs.

## 3. State handling

- [ ] Results the user may want are returned to `state.data` (not returned
      directly from the operation).
- [ ] Only HTTP helpers write `state.response`. Domain operations write a
      clean result to `state.data` (no `data.data` nesting, no fake HTTP
      shapes).
- [ ] Established state conventions are respected where used: `state.references`,
      `state.response` (HTTP metadata), `state.cursor`.
- [ ] Any mutation of the state object is documented with the `@state` JSDoc
      annotation.
- [ ] Arguments are wrapped in `expandReferences(state, ...)` so they can be
      lazily evaluated against state.

## 4. Clients & lifecycle

- [ ] Client instances are held in a closure variable, **not** written to
      `state.client` (which users can accidentally clobber).
- [ ] Setup/teardown is handled via a custom `execute` override (connect /
      disconnect) where a client needs managing.

## 5. Security

- [ ] No values are passed straight from state into raw SQL. Prefer SQL-builder
      functions; if building strings, keep them structured and avoid arbitrary
      passthrough (injection risk).
- [ ] Third-party client objects are wrapped rather than exposed/exported
      directly if logging or returning them could leak credentials or PII.
- [ ] Sensitive headers/credentials are not exposed in error handling or logs.
- [ ] The adaptor does not log raw data/PII. Logs summarize ("fetched 1
      object", "Query completed with N records") rather than dumping payloads.
      Job code — not the adaptor — decides when actual data is logged.

## 6. Error handling

- [ ] Errors are thrown, not logged and ignored. If something fails, the
      operation should throw so the workflow stops — unless continuing is
      clearly intended.
- [ ] Error messages are meaningful and help the user understand what went
      wrong.
- [ ] Errors do not leak sensitive data (credentials, tokens, PII).
- [ ] No catch-log-rethrow and no `return err`. Let the error propagate, or
      enrich `e.message` rather than replacing the error.
- [ ] No debug `console.log`s left in. Logs report results ("Fetched 27
      records"), not process ("Attempting…"), and don't duplicate what
      common's `request` already logs.

## 7. Documentation & JSDoc

- [ ] Every public operation is annotated with `@public` and `@function` so it
      appears in generated docs.
- [ ] Every public operation has at least one example. Examples are concise,
      realistic, tell a single story, and generally read data from state rather
      than defining it inline.
- [ ] Docs are short. Red flags: notes about vendor point releases, upstream
      PR links, workaround notes, "under the hood" explanations, second person
      ("your"). Overlong docs are **Blocking** on a new adaptor.
- [ ] Examples: one operation each, simplest first, matching the actual
      signature. Namespaced calls show the namespace (`http.get`). Examples are
      generic, never the client workflow that prompted the adaptor, and an
      example caption must not hide behaviour (e.g. a `limit` that quietly
      truncates results).
- [ ] Higher-level operations use domain language ("Create a patient"), not
      HTTP language ("Make a POST request").
- [ ] `@state` says what lands in `state.data`. Defaults are only documented if
      the code sets them.
- [ ] No AI directives, banner comments, comments that restate code, or
      commented-out code.
- [ ] Docs link out to the API's own documentation rather than re-explaining
      how it works.
- [ ] `options` (control adaptor behaviour) vs `params`/`parameters` (passed to
      the backing service) are used correctly.
- [ ] Types are documented properly in accordance with JSDoc conventions.
- [ ] Documentation is written in American English.

## 8. Testing

- [ ] **Bug fixes should add a regression test** — one that fails before the
      change and passes after. New features and refactors should add tests where
      practical. Tests are strongly encouraged but not a hard gate; missing
      tests are Recommended, not Blocking.
- [ ] **No live network in unit tests.** HTTP must be mocked with **undici**
      `MockAgent`. Integration tests may hit real endpoints; unit tests may not.
- [ ] **Clients are mocked, not connected.** Library clients (DB, SDK, etc.)
      are injected or set via a setter — unit tests never open real connections.
- [ ] **Tests are meaningful, not padding.** Prefer a few tests that genuinely
      exercise the code over many verbose, heavily-mocked tests. Flag tests that
      assert on mock internals, don't call the function under test, or would pass
      even if the function were broken.
- [ ] **One behaviour per test.** Each test tells one story ("given A, B
      happens") and fails only when that behaviour changes.
- [ ] **Names describe behaviour**, not implementation trivia.
- [ ] **Important branches are covered** — the paths that matter, not raw line
      coverage.
- [ ] **Would the test fail if the feature were removed?** Mocks must check
      what was sent (path, query, body, headers), not just return a canned
      reply. A test that still passes with the feature commented out is
      **Blocking**.
- [ ] **Pagination tests really paginate**: several mocked pages, including a
      last page that doesn't divide evenly by the page size. A single-page
      mock can't catch `limit` being treated as page size.
- [ ] **Tests go through the public export** (`http.get`, `listThings`), not
      internal helpers in `Utils.js`.
- [ ] **Whole results are asserted** with `deep.equal`, not just `data[0]` or a
      length.
- [ ] **No `.only`, no newly skipped tests, and no tests edited to work around a
      code bug.** These are **Blocking**.

## 9. Changeset & release hygiene

- [ ] A changeset exists when there is a user-facing change (new adaptor, API or
      behavioural change). Dev-only/internal changes don't need one.
- [ ] The changeset bump level is correct — **breaking changes are `major`**.
      Removing or renaming an export, changing a signature, changing a default
      value, or changing the shape written to `state.data` are all breaking.
      Prefer deprecation (warn once per job) plus a minor release over a major.
      Fixing already-broken behaviour can be a patch.
- [ ] One changeset per change, covering every affected package and no others.
- [ ] No changeset for a new adaptor's first release.
- [ ] The changeset is written for **users**, not developers, and is short —
      usually a single sentence describing the delta. Flag changesets that read
      like a full feature write-up or explanation. It should be factual, focused
      on the API/behavioural change, and call out any breaking change with a
      migration/workaround. Avoid marketing language and internal implementation
      details.
- [ ] For breaking changes, the PR considers whether production jobs need
      updating and whether the release is safe.

## 10. Build & CI

CI already runs `pnpm build`, `pnpm test`, `pnpm run test:git`, and
`pnpm validate:schemas`, and `.gitignore` keeps build output, `tmp/`, and
`state.json` out of commits — **don't re-check any of that**. The only thing
worth a human/AI eye here:

- [ ] No credentials, tokens, or real config/secrets committed in the diff
      (e.g. a live key pasted into a fixture).
- [ ] `pnpm-lock.yaml` only changes for the packages in the PR. Widespread
      churn usually means the wrong pnpm version was used.

## 11. PR hygiene

- [ ] Every diff relates to the PR title. Unrelated changes go in another PR.
- [ ] The title and description match the diff, including behaviour changes
      in a "docs" PR. AI use is disclosed.
- [ ] AI-generated code that is verbose or "comprehensive" gets a closer look,
      not less.

## Don't flag

- Anything CI already checks (see Section 10).
- Missing tests where there's nothing meaningful to test (thin SDK wrappers,
  DB adaptors).
- Pre-existing problems outside the diff. Suggest a follow-up issue instead.
- Spelling variants, full stops in sentences, rigid type rules.
- Mixing public and private functions in one file.
- Polish on a first release. It doesn't have to be perfect.
- Vulnerabilities in devDependencies.

---

## Reviewer output format (suggested)

```
## Summary
<1–2 sentences: what the PR does and overall assessment>

## Blocking
- <finding> — <rule / wiki reference>

## Recommended
- <finding> — <rule / wiki reference>

## NitPicks
- <finding>
```
