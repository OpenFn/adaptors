# airqo: scope down to generic HTTP helpers + core measurement operations

## Summary

Per maintainer feedback (`@mtuchi`) on the PR, this scopes the new
`@openfn/language-airqo` adaptor down from a broad set of resource-specific
functions to a minimal, generic starting surface:

- Generic HTTP operations — `get`, `post`, `request` (also grouped under a
  `http.get` / `http.post` / `http.request` convenience alias) — for calling
  any AirQo endpoint directly.
- `getRecentMeasurements(entityType, entityId, params)` and
  `getHistoricalMeasurements(entityType, entityId, params)` — the two
  highest-value, resource-specific operations for fetching air quality
  readings by site, device, grid, or cohort.

All other resource-specific functions (and their now-unused helpers) from the
original draft have been removed. Resource-specific helpers can be promoted
individually later, once real usage patterns justify them.

## Changes

- **`src/Adaptor.js`**
  - Removed 10 resource-specific functions and their unused helpers, keeping
    only `getRecentMeasurements` and `getHistoricalMeasurements`.
  - Added `get`, `post`, and `request` as real, individually-documented
    top-level operations (each with full `@public` JSDoc), plus
    `http = { get, post, request }` as a plain convenience namespace alias.
  - Fixed a bug where `request` was re-exported directly from `Utils.js`
    (the raw infra helper, wrong signature/behavior for a job operation) —
    it's now a proper Adaptor-level operation with correct `expandReferences`
    handling and validation.
- **`test/Adaptor.test.js`** — rewritten test suite (34 tests) covering
  `getRecentMeasurements`, `getHistoricalMeasurements`, and `get`/`post`/
  `request` (including their `http.*` aliases), using Undici `MockAgent`
  with no live network calls.
- **`README.md`** — updated usage docs to match the reduced scope and the
  corrected `get`/`post`/`request` API surface.
- **`CHANGELOG.md`** — updated initial-release notes to match the final
  scope.
- **`ast.json`** — regenerated; now correctly lists `get`, `post`, `request`,
  `getRecentMeasurements`, and `getHistoricalMeasurements` as documented
  operations.

## Validation

- `pnpm test` — 34/34 passing
- `pnpm lint` — clean
- `pnpm build` — completes successfully (docs, types, and `ast.json`
  regenerated with no functional warnings)
