---
'@openfn/language-salesforce': major
---

New API design for salesforce, including adding composeNextState and removing
old code.

- Remove axios dependency
- Remove old/unused functions. `relationship`, `upsertIf`, `createIf`,
  `reference`, `steps`, `beta`, `describeAll()`
- Standardize state mutation in all operation
- Change `bulk` signature to `bulk(operation, sObjectName, records, options)`
- Remove callback support

### Migration Guide

- Replace `describeAll()` with `describe()`.
- Replace `upsertIf()` with `fnIf(true, upsert())`.
- Replace `createIf()` with `fnIf(true, create())`.
- Replace `bulk(operation, sObject, options, records)` with
  `bulk(operation, sObjectName, records, options)`.
