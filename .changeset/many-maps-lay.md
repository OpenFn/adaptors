---
'@openfn/language-salesforce': minor
---

### Added

- `insert()` function as an alias for `create()`.

### Improved

- JSDocs for `query`, `bulk`, `describe`, `create`, and `upsert`.

### Deprecated

- `upsertIf()` and `createIf()` functions are now deprecated. Use
  `fnIf(condition, upsert())` instead.
