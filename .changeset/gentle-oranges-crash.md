---
'@openfn/language-salesforce': major
---

New API design for salesforce, including adding composeNextState and removing
old code.

### Major Changes

- Remove axios dependency
- Remove old/unused functions. `relationship`, `upsertIf`, `createIf`,
  `reference`, `steps`, `beta`
- Standardize state mutation in all operation
- Change `bulk` signature to `bulk(operation, sObjectName, records, options)`
- Remove callback support

### Minor Changes

- Create a get and post function for all http requests in salesforce

### Patch Changes

- Change `cleanupState` to `removeConnection` and tagged it as private function
- Rename `attrs` to `records`
