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

- Use `describe()` instead of `describeAll()`.
- Use `fnIf(true, upsert())` instead of `upsertIf()`
- Use `fnIf(true, create())` instead of `createIf()`
- Use `bulk(operation, sObjectName, records, options )` instead of
  `bulk(operation, sObject, options, records)`

### Migration Guide

- Replace `describeAll()` with `describe()`.
- Replace `upsertIf()` with `fnIf(true, upsert())`.
- Replace `createIf()` with `fnIf(true, create())`.
- Replace `bulk(operation, sObject, options, records)` with
  `bulk(operation, sObjectName, records, options)`.
