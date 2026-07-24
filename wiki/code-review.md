# Adaptor Code Review Rubric

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

When these documents disagree with this rubric, the detailed source document
wins — update this rubric to match.

## How to use this rubric

- Review **only the diff** and the files it touches. Do not demand changes to
  unrelated code.
- For each finding, cite the specific rule below and, where possible, the source
  wiki page.
- Classify each finding as **Blocking** (must fix before merge), **Recommended**
  (should fix), or **Nit** (optional/style).
- Be concise and specific. Prefer a concrete suggested change over a general
  observation.
- If the PR is small or purely internal (e.g. a dev-only change), scale the
  review down accordingly — not every section applies to every PR.

---

## 1. Structure & file invariants

- [ ] Operations (the functions used in job code) live in `src/Adaptor.js` (or
      other namespaced source files), **not** in `src/Utils.js`.
- [ ] `src/Utils.js` contains **infrastructure/helpers only** — no operations.
- [ ] HTTP access uses common's `request` (`src/util/http.js`) where possible,
      rather than importing third-party HTTP libraries or native node HTTP. If
      `request` genuinely can't be used, `undici` is preferred in new adaptors.
- [ ] Namespacing is correct: functions not in `Adaptor.js` are namespaced by
      filename unless overridden with `@namespace` (`@namespace global` to
      remove a namespace). Namespaced public functions are exported from
      `index.ts`/`index.js` where required (see `common`).
- [ ] `configuration-schema.json` is valid JSON Schema draft-07 and reflects any
      new/changed config. (`pnpm validate:schemas` must pass.)

## 2. API design

- [ ] Operations are factory functions of the shape
      `(args) => (state) => Promise<State> | State`. Operations sit at the top
      level and are not called inside a promise/callback.
- [ ] "Get one vs get many" uses clear semantics — prefer `getThing(id)` +
      `listThings(options)` over overloading a single function with an optional
      id, or near-identical `getThing`/`getThings` names. Prefer `list` (or
      consistently `search`) across the adaptor.
- [ ] Function signatures are minimal: required values are positional
      parameters; everything else goes into a single `options`/config object.
- [ ] Naming and semantics match the layer: low-level HTTP helpers use HTTP
      language (method, url, query); higher-level operations mask HTTP and use
      domain language (e.g. `getUser` should not expose `method`/`url`).
- [ ] New public operations are consistent with existing operations in the same
      adaptor (and, where reasonable, across adaptors).

## 3. State handling

- [ ] Results the user may want are returned to `state.data` (not returned
      directly from the operation).
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

- [ ] Failures throw an error (written by the runtime to `state.errors`) rather
      than silently swallowing problems.
- [ ] Errors are meaningful and do not leak sensitive data.

## 7. Documentation & JSDoc

- [ ] Every public operation is annotated with `@public` and `@function` so it
      appears in generated docs.
- [ ] Every public operation has at least one example. Examples are concise,
      realistic, tell a single story, and generally read data from state rather
      than defining it inline.
- [ ] Docs use the right register: HTTP helpers use HTTP language; higher-level
      operations use backend/domain language. Low-level endpoint wrappers link
      to external docs instead of re-explaining the backend.
- [ ] `options` (control adaptor behaviour) vs `params`/`parameters` (passed to
      the backing service) are used correctly.
- [ ] Types follow conventions: primitives lowercase (`string`, `boolean`,
      `number`, `function`); complex types uppercase (`Array`, `Operation`,
      `State`, `RequestOptions`). Non-standard types (`Options`, `Response`)
      have a `@typedef`. Multi-property objects use a `@typedef` rather than
      many `options.foo` lines. Externally owned types link out.
- [ ] American English, sentences end with a full stop.

## 8. Testing

- [ ] Every new or changed function has unit tests. Bug fixes include a test
      that reproduces the bug.
- [ ] HTTP is mocked with **undici** `MockAgent` — **no live network calls**.
- [ ] Library clients are mocked via a setter or injected argument, not real
      connections.
- [ ] Tests are focused: each test tells one story ("given A, B should happen")
      and should fail only when that one behaviour changes. Watch for tests with
      scattered/irrelevant assertions or that don't actually exercise the
      function.
- [ ] Test names describe the behaviour under test, not implementation trivia.
- [ ] Meaningful paths/branches are covered (not just line coverage).

## 9. Changeset & release hygiene

- [ ] A changeset exists when there is a user-facing change (new adaptor, API or
      behavioural change). Dev-only/internal changes don't need one.
- [ ] The changeset bump level is correct — **breaking changes are `major`**.
- [ ] The changeset is written for **users**, not developers: concise, factual,
      focused on API/behavioural changes, and it calls out breaking changes with
      any migration/workaround. No selling or internal implementation detail.
- [ ] For breaking changes, the PR considers whether production jobs need
      updating and whether the release is safe.

## 10. Build & CI

- [ ] `pnpm build`, `pnpm test`, `pnpm run test:git`, and `pnpm validate:schemas`
      are expected to pass (these run in CI).
- [ ] No stray build output, `tmp/` artifacts, credentials, or `state.json`
      committed.

---

## Reviewer output format (suggested)

```
## Summary
<1–2 sentences: what the PR does and overall assessment>

## Blocking
- <finding> — <rule / wiki reference>

## Recommended
- <finding> — <rule / wiki reference>

## Nits
- <finding>
```
