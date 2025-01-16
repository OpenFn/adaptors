# @openfn/language-salesforce

## 5.0.4

### Patch Changes

- Updated dependencies [b3d7f59]
- Updated dependencies [2d709ff]
- Updated dependencies [41e8cc3]
  - @openfn/language-common@2.3.0

## 5.0.3

### Patch Changes

- Updated dependencies [6dffdbd]
  - @openfn/language-common@2.2.1

## 5.0.2

Major modernization of the Salesforce adaptor, focusing on standardized state
handling (ie,`state.data` over on `state.references`) and a cleaner API.

This version introduces multiple breaking changes and workflows WILL require
changes to be compatible - see the Migration Guide.

### Migration Guide

- Operations now "return" their results to `state.data`. Use `state.data`
  instead of `state.references`. For example:

```js
❌  retrieve('Patient__c', $.patientId);
    fn((state) => {
      state.patients = state.references.at(-1)
      return state
    });

✅  retrieve('Patient__c', $.patientId);
    fn((state) => {
      state.patients = state.data;
      return state
    });
```

- All callback functions have been removed. Use `fn()` blocks or `.then()`
  functions instead. For example:

```js
❌  query($.query, {}, (state) => {
      state.patients = state.references.at(-1)
      return state
    });

✅  query($.query).then((state) => {
      state.patients = state.data;
      return state
    });

✅  query($.query)
    fn((state) => {
     state.patients = state.data
     return state
    });
```

- The `axios` object has been removed. For HTTP requests outside salesforce, use
  a different step with the http adaptor
- Replace `describeAll()` with `describe()`.
- Replace `upsertIf(...)` with `fnIf(true, upsert(...))`
- Replace `createIf(...)` with `fnIf(true, create(...))`
- Replace `toUTF8(...)` with `util.UTF8(...)`
- The `bulk()` signature has been re-ordered: replace
  `bulk(operation, sObject, options, records)` with
  `bulk(operation, sObjectName, records, options)`

### Major Changes

- 59721be: New API design for salesforce, including use of `composeNextState`
  and removing old code.
- Remove `axios` dependency
- Remove old/unused functions. `relationship`, `upsertIf`, `createIf`,
  `reference`, `steps`, `beta`, `describeAll()`
- Standardize state mutation in all operations
- Change `bulk` signature to `bulk(operation, sObjectName, records, options)`
- Remove callback support
- a2cf9c7: Move `toUTF8()` to `util.UTF8()`. `toUTF8` is not an operation and
  cannot be called at the top level. Moving into the utils namespace should help
  make the usage of the function a little clearer
- ca09ade: - Restructured response format for `bulk`, `create`,`update` and
  `destroy` functions into standardized result structure:
  ```
  {
    success: boolean,
    completed: [id],
    errors: [{ id message }],
  }
  ```
- b1227a2: - add `query` option in `request` function

### Minor Changes

- b4a9c42: - Create `get()` and `post()` functions for all http requests against
  Salesforce
- Update `describe()` to fetch all available sObjects metadata
- update function examples and improve options documentation
- Enforce that `upsert`, `create` and `update` do not accept dot-notated
  relationships. Relationships should be nested instead. Eg, do this:
  ```
  create('Project', {
   "Project__r": {
     "Metrics_ID__c": "value"
   }
  })
  ```
  Not this:
  ```
  create('Project', {
   "Project__r.Metrics_ID__c": "value"
  })
  ```
- Add support for nested relationships in `bulk` (the adaptor will flatten them
  to dot-notation for you)

### Patch Changes

- b4a9c42: - Change internal `cleanupState` to `removeConnection` and tagged it
  as private function
  - Rename `attrs` to `records` in docs
- Update `@openfn/language-common` to `workspace:*`
- Add integration tests

Note: due to a conflict in the npm registry this 5.0.0 build has been released
with version number 5.0.2.

## 4.8.6

### Patch Changes

- Security fix: update jsonpath-plus version

## 4.8.5

### Patch Changes

- 3fd13c2: Update axios to 1.7.7

## 4.8.4

### Patch Changes

- 8d866e4: Update tough-cookie dependency

## 4.8.3

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies [8146c23]
  - @openfn/language-common@2.0.1

## 4.8.2

### Patch Changes

- ce08e7f: Fix `autoFetch` behaviour in `query()` function. All records are
  merged into a single `records` array, and pushed to `[0]` in
  `state.references`.

  For jobs which use `references[0][0]` to read query results, this is a
  breaking fix.

## 4.8.1

### Patch Changes

- Updated dependencies [4c08444]
- Updated dependencies [73d0a02]
  - @openfn/language-common@1.15.1

## 4.8.0

### Minor Changes

- 5fb82f07: Export `group` operation from common
- b5e0c266: ### Added

  - `insert()` function as an alias for `create()`.

  ### Improved

  - JSDocs for `query`, `bulk`, `describe`, `create`, and `upsert`.

  ### Deprecated

  - `upsertIf()` and `createIf()` functions are now deprecated. Use
    `fnIf(condition, upsert())` instead.

### Patch Changes

- Updated dependencies [5fb82f07]
  - @openfn/language-common@1.15.0

## 4.7.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 4.6.11

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 4.6.10

### Patch Changes

- 90f44c62: Include the Salesforce query response in the result, even if no
  records are found.

## 4.6.9

### Patch Changes

- Fix any-ascii load and add more tests

## 4.6.8

### Patch Changes

- Properly ensure any-ascii is loaded before executing, resolving a critical
  race that we are losing in production

## 4.6.7

### Patch Changes

- 332225ec: - Set default API version to `47.0`
  - In `bulkQuery` throw errors if API version is less than `47.0`
  - Update `bulkQuery` jsdocs with a link to `Bulk API 2.0 Query`

## 4.6.6

### Patch Changes

- Updated dependencies [12f02ed5]
  - @openfn/language-common@1.13.4

## 4.6.5

### Patch Changes

- b1c915b0: Add documentation about Salesforce API limits to query and bulkQuery

## 4.6.4

### Patch Changes

- Updated dependencies [88f99a8f]
  - @openfn/language-common@1.13.3

## 4.6.3

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 4.6.2

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 4.6.1

### Patch Changes

- Updated dependencies [1ad86651]
  - @openfn/language-common@1.13.0

## 4.6.0

### Minor Changes

- cfe1ccb: Add options and callback params in query function

## 4.5.2

### Patch Changes

- 2006e88: fix an issue with bulk jobs not closing

## 4.5.1

### Patch Changes

- fa3e28fe: refactor bulk() to use newExpandReferences

## 4.5.0

### Minor Changes

- 0d2b478: Remove `instance_url` under `other_params` and put it at the root
  level of the configuration schema

## 4.4.0

Deprecated because it does not work with Lightning

### Minor Changes

- 632b585: Add `OAuth` support
- a12f434: Add `request(path, opts, cb)` function

## 4.3.1

### Patch Changes

- 1131c34: Remove regex pattern for validation and changed minLength to 1

## 4.3.0

### Minor Changes

- 1d5b62f: Add `toUTF8` function

## 4.2.2

### Patch Changes

- Updated dependencies [c19efbe]
  - @openfn/language-common@1.11.1

## 4.2.1

### Patch Changes

- 07debe9: Update bulkQuery to use bulkv2

## 4.2.0

### Minor Changes

- fc58f1c: add options in bulkQuery

## 4.1.0

### Minor Changes

- 1e3a083: add bulkQuery function

## 4.0.8

### Patch Changes

- Updated dependencies [85c35b8]
  - @openfn/language-common@1.11.0

## 4.0.7

### Patch Changes

- Updated dependencies [df09270]
  - @openfn/language-common@1.10.3

## 4.0.6

### Patch Changes

- aceedd2: update jsforce and remove unused packages

## 4.0.5

### Patch Changes

- Updated dependencies [26a303e]
  - @openfn/language-common@1.10.2

## 4.0.4

### Patch Changes

- Updated dependencies [8c32eb3]
  - @openfn/language-common@1.10.1

## 4.0.3

### Patch Changes

- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0

## 4.0.2

### Patch Changes

- Updated dependencies [111807f]
  - @openfn/language-common@1.9.0

## 4.0.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 4.0.0

### Major Changes

- 2c1d603: Remove parameter reassignment to ensure proper functioning inside an
  `each` block; add eslint

  The packages receiving a major bump here exposed functions that didn't work as
  expected inside `each` blocks. Users were previously wrapping these functions
  inside their own custom `fn` blocks, and this change will ensure that they can
  be used inside a standard each.

  See https://github.com/OpenFn/adaptors/issues/275 for more details.

### Patch Changes

- Updated dependencies [2c1d603]
  - @openfn/language-common@1.8.0

## 3.0.7

### Patch Changes

- 7cc8efc: remove FakeAdaptor references

## 3.0.6

### Patch Changes

- 705caab: Remove tools as devdependencies

## 3.0.5

### Patch Changes

- 929bca6: Use metadata helper function from common
- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 3.0.4

### Patch Changes

- ef828e7: update old urls in readme
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 3.0.3

### Patch Changes

- 06aced8: Fix dependencies

## 3.0.2

### Patch Changes

- aed7e0b: fix required field in configuration schema

## 3.0.1

### Patch Changes

- c09b821: Add @magic annotations

## 3.0.0

### Major Changes

- 190f667: Remove curry from salesforce

## 2.12.3

### Patch Changes

- f7ebd3c: remove sample configuration

## 2.12.2

### Patch Changes

- f2aed32: add examples

## 2.12.1

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 2.12.0

### Minor Changes

- 5c883c6: Allow expansion for describe(), add describeAll()

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 2.11.1

### Patch Changes

- e7bf865: chore(deps): update dependency sinon to v14
- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-common@1.7.4

## 2.11.0

### Minor Changes

- edff578: Migrate salesforce
