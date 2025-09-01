# @openfn/language-salesforce

## 7.2.1 - 28 August 2025

### Patch Changes

- [b7af59a](https://github.com/OpenFn/adaptors/commit/b7af59a): - Update `package.json` description to be LLM-readable

## 7.2.0 - 04 August 2025

### Minor Changes

- [dc89780](https://github.com/OpenFn/adaptors/commit/dc89780): ## Added Salesforce Bulk API 2.0 Operations

  - Added `bulk2.query()` - Execute SOQL queries using Bulk API 2.0
  - Added `bulk2.insert()` - Bulk insert records
  - Added `bulk2.update()` - Bulk update records
  - Added `bulk2.upsert()` - Bulk `upsert` records with external ID matching
  - Added `bulk2.destroy()` - Bulk delete records

  All operations support custom options for polling interval and timeout.

## 7.1.2 - 14 July 2025

### Patch Changes

- Updated dependencies [9b5a4f8](https://github.com/OpenFn/adaptors/commit/9b5a4f8)
  - @openfn/language-common@3.0.2

## 7.1.1 - 10 July 2025

### Patch Changes

- Updated dependencies [cf9c09f](https://github.com/OpenFn/adaptors/commit/cf9c09f)
  - @openfn/language-common@3.0.1

## 7.1.0 - 10 July 2025

### Minor Changes

- [19f2d7e](https://github.com/OpenFn/adaptors/commit/19f2d7e): Exported `as()` function from common.
- [8d78db4](https://github.com/OpenFn/adaptors/commit/8d78db4): Export `map()` function from common

### Patch Changes

- [c4625fa](https://github.com/OpenFn/adaptors/commit/c4625fa): - Migrate from the deprecated `expandReferences` in `common` to the
  new `expandReferences` from common.util
  - Use `workspace:*` common version.
- Updated dependencies [ea85695](https://github.com/OpenFn/adaptors/commit/ea85695)
- Updated dependencies [3fce58f](https://github.com/OpenFn/adaptors/commit/3fce58f)
- Updated dependencies [19f2d7e](https://github.com/OpenFn/adaptors/commit/19f2d7e)
- Updated dependencies [f26bd2b](https://github.com/OpenFn/adaptors/commit/f26bd2b)
- Updated dependencies [19f2d7e](https://github.com/OpenFn/adaptors/commit/19f2d7e)
  - @openfn/language-common@3.0.0

## 7.0.1 - 20 June 2025

### Patch Changes

- Updated dependencies [28c2e8b](https://github.com/OpenFn/adaptors/commit/28c2e8b)
  - @openfn/language-common@2.5.0

## 7.0.0 - 01 May 2025

### Major Changes

- [8dd65a1](https://github.com/OpenFn/adaptors/commit/8dd65a1): - Modernize `query()` implementation using jsforce v3

  - Remove `autoFetch` option from `query()` function
  - Add `limit` option to `query()` function
  - Change query result structure:
    - `state.data` now contains only the array of records
    - Query metadata (`done`, `totalSize`, `nextRecordsUrl`) moved to
      `state.response`

- [3686988](https://github.com/OpenFn/adaptors/commit/3686988): remove map() function

### Migration Guide

The `autoFetch` option has been removed from the `query()` function. Previously,
this option would automatically fetch all records when set to `true`.

The query result structure has been updated:

- Previously: `state.data` contained
  `{ done, totalSize, records: [], nextRecordsUrl }`
- Now:
  - `state.data` contains only the array of records
  - `state.response` contains `{ done, totalSize }` and `nextRecordsUrl` when
    there are more records to fetch (`done: false`)

**Before**

```js
// Old way - using autoFetch
query('select name from account', { autoFetch: true });
// Result: state.data = { done, totalSize, records: [] }
```

**After**

To fetch all records now, use the `limit: Infinity` option:

```js
// New way - using limit: Infinity
query('select name from account', { limit: Infinity });
// Result:
// state.data = [] // Array of records
// state.response = { done, totalSize }
```

## 6.0.3 - 24 April 2025

### Patch Changes

- [99e4b48](https://github.com/OpenFn/adaptors/commit/99e4b48): - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies [99e4b48](https://github.com/OpenFn/adaptors/commit/99e4b48)
- Updated dependencies [13bf08f](https://github.com/OpenFn/adaptors/commit/13bf08f)
  - @openfn/language-common@2.4.0

## 6.0.2 - 16 April 2025

### Patch Changes

- Updated dependencies [b089c56](https://github.com/OpenFn/adaptors/commit/b089c56)
  - @openfn/language-common@2.3.3

## 6.0.1 - 11 April 2025

### Patch Changes

- Updated dependencies [d7105c0](https://github.com/OpenFn/adaptors/commit/d7105c0)
  - @openfn/language-common@2.3.2

## 6.0.0 - 02 April 2025

### Major Changes

- [8ce97838](https://github.com/OpenFn/adaptors/commit/8ce97838): Add `http` function in salesforce (#1070)
- [1fbfdc18](https://github.com/OpenFn/adaptors/commit/1fbfdc18): Update salesforce to use `connection` client (#1063)
- [38de07ed](https://github.com/OpenFn/adaptors/commit/38de07ed): update jsforce to v3 (#1060)

### Migration Guide

#### Removed general-purpose HTTP functions

Previously, `http.get()`, `http.post()`, etc. could be used to make HTTP
requests to any external system. These functions have been removed and replaced
with Salesforce API endpoints only.

##### Before:

This used to work for any external API

```js
http.get('https://external-api.com/data');
http.post('https://another-service.com/endpoint', data);
```

##### Now:

Only Salesforce API operations are supported

```js
http.get('Account', { query: { start: '2025-03-03' } });
http.post('Contact', { Name: 'test' });
```

##### For non-Salesforce HTTP requests:

- Move these operations to a different adaptor (like `@openfn/language-http`)
- Or use `@openfn/language-common` for generic HTTP operations

## 5.0.5 - 14 March 2025

### Patch Changes

- Updated dependencies [23ccb01](https://github.com/OpenFn/adaptors/commit/23ccb01)
  - @openfn/language-common@2.3.1

## 5.0.4 - 16 January 2025

### Patch Changes

- Updated dependencies [b3d7f59](https://github.com/OpenFn/adaptors/commit/b3d7f59)
- Updated dependencies [2d709ff](https://github.com/OpenFn/adaptors/commit/2d709ff)
- Updated dependencies [41e8cc3](https://github.com/OpenFn/adaptors/commit/41e8cc3)
  - @openfn/language-common@2.3.0

## 5.0.3 - 16 January 2025

### Patch Changes

- Updated dependencies [6dffdbd](https://github.com/OpenFn/adaptors/commit/6dffdbd)
  - @openfn/language-common@2.2.1

## 5.0.2 - 14 January 2025

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

- [59721be](https://github.com/OpenFn/adaptors/commit/59721be): New API design for salesforce, including use of `composeNextState`
  and removing old code.
- Remove `axios` dependency
- Remove old/unused functions. `relationship`, `upsertIf`, `createIf`,
  `reference`, `steps`, `beta`, `describeAll()`
- Standardize state mutation in all operations
- Change `bulk` signature to `bulk(operation, sObjectName, records, options)`
- Remove callback support
- [a2cf9c7](https://github.com/OpenFn/adaptors/commit/a2cf9c7): Move `toUTF8()` to `util.UTF8()`. `toUTF8` is not an operation and
  cannot be called at the top level. Moving into the utils namespace should help
  make the usage of the function a little clearer
- [ca09ade](https://github.com/OpenFn/adaptors/commit/ca09ade): - Restructured response format for `bulk`, `create`,`update` and
  `destroy` functions into standardized result structure:
  ```
  {
    success: boolean,
    completed: [id],
    errors: [{ id message }],
  }
  ```
- [b1227a2](https://github.com/OpenFn/adaptors/commit/b1227a2): - add `query` option in `request` function

### Minor Changes

- [b4a9c42](https://github.com/OpenFn/adaptors/commit/b4a9c42): - Create `get()` and `post()` functions for all http requests against
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

- [b4a9c42](https://github.com/OpenFn/adaptors/commit/b4a9c42): - Change internal `cleanupState` to `removeConnection` and tagged it
  as private function
  - Rename `attrs` to `records` in docs
- Update `@openfn/language-common` to `workspace:*`
- Add integration tests

Note: due to a conflict in the npm registry this 5.0.0 build has been released
with version number 5.0.2.

## 4.8.6 - 15 October 2024

### Patch Changes

- Security fix: update jsonpath-plus version

## 4.8.5 - 09 October 2024

### Patch Changes

- [3fd13c2](https://github.com/OpenFn/adaptors/commit/3fd13c2): Update axios to 1.7.7

## 4.8.4 - 09 October 2024

### Patch Changes

- [8d866e4](https://github.com/OpenFn/adaptors/commit/8d866e4): Update tough-cookie dependency

## 4.8.3 - 16 August 2024

### Patch Changes

- [8146c23](https://github.com/OpenFn/adaptors/commit/8146c23): Fix typings in package.json
- Updated dependencies [8146c23](https://github.com/OpenFn/adaptors/commit/8146c23)
  - @openfn/language-common@2.0.1

## 4.8.2 - 31 July 2024

### Patch Changes

- [ce08e7f](https://github.com/OpenFn/adaptors/commit/ce08e7f): Fix `autoFetch` behaviour in `query()` function. All records are
  merged into a single `records` array, and pushed to `[0]` in
  `state.references`.

  For jobs which use `references[0][0]` to read query results, this is a
  breaking fix.

## 4.8.1 - 25 July 2024

### Patch Changes

- Updated dependencies [4c08444](https://github.com/OpenFn/adaptors/commit/4c08444)
- Updated dependencies [73d0a02](https://github.com/OpenFn/adaptors/commit/73d0a02)
  - @openfn/language-common@1.15.1

## 4.8.0 - 19 June 2024

### Minor Changes

- [5fb82f07](https://github.com/OpenFn/adaptors/commit/5fb82f07): Export `group` operation from common
- [b5e0c266](https://github.com/OpenFn/adaptors/commit/b5e0c266): ### Added

  - `insert()` function as an alias for `create()`.

  ### Improved

  - JSDocs for `query`, `bulk`, `describe`, `create`, and `upsert`.

  ### Deprecated

  - `upsertIf()` and `createIf()` functions are now deprecated. Use
    `fnIf(condition, upsert())` instead.

### Patch Changes

- Updated dependencies [5fb82f07](https://github.com/OpenFn/adaptors/commit/5fb82f07)
  - @openfn/language-common@1.15.0

## 4.7.0 - 13 June 2024

### Minor Changes

- [73433c20](https://github.com/OpenFn/adaptors/commit/73433c20): Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d](https://github.com/OpenFn/adaptors/commit/106ecf6d)
  - @openfn/language-common@1.14.0

## 4.6.11 - 11 June 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 4.6.10 - 03 June 2024

### Patch Changes

- [90f44c62](https://github.com/OpenFn/adaptors/commit/90f44c62): Include the Salesforce query response in the result, even if no
  records are found.

## 4.6.9 - 28 May 2024

### Patch Changes

- Fix any-ascii load and add more tests

## 4.6.8 - 27 May 2024

### Patch Changes

- Properly ensure any-ascii is loaded before executing, resolving a critical
  race that we are losing in production

## 4.6.7 - 23 May 2024

### Patch Changes

- [332225ec](https://github.com/OpenFn/adaptors/commit/332225ec): - Set default API version to `47.0`
  - In `bulkQuery` throw errors if API version is less than `47.0`
  - Update `bulkQuery` jsdocs with a link to `Bulk API 2.0 Query`

## 4.6.6 - 21 May 2024

### Patch Changes

- Updated dependencies [12f02ed5](https://github.com/OpenFn/adaptors/commit/12f02ed5)
  - @openfn/language-common@1.13.4

## 4.6.5 - 08 May 2024

### Patch Changes

- [b1c915b0](https://github.com/OpenFn/adaptors/commit/b1c915b0): Add documentation about Salesforce API limits to query and bulkQuery

## 4.6.4 - 08 May 2024

### Patch Changes

- Updated dependencies [88f99a8f](https://github.com/OpenFn/adaptors/commit/88f99a8f)
  - @openfn/language-common@1.13.3

## 4.6.3 - 08 May 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 4.6.2 - 12 April 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 4.6.1 - 12 April 2024

### Patch Changes

- Updated dependencies [1ad86651](https://github.com/OpenFn/adaptors/commit/1ad86651)
  - @openfn/language-common@1.13.0

## 4.6.0 - 19 March 2024

### Minor Changes

- [cfe1ccb](https://github.com/OpenFn/adaptors/commit/cfe1ccb): Add options and callback params in query function

## 4.5.2 - 19 March 2024

### Patch Changes

- [2006e88](https://github.com/OpenFn/adaptors/commit/2006e88): fix an issue with bulk jobs not closing

## 4.5.1 - 05 March 2024

### Patch Changes

- [fa3e28fe](https://github.com/OpenFn/adaptors/commit/fa3e28fe): refactor bulk() to use newExpandReferences

## 4.5.0 - 02 February 2024

### Minor Changes

- [0d2b478](https://github.com/OpenFn/adaptors/commit/0d2b478): Remove `instance_url` under `other_params` and put it at the root
  level of the configuration schema

## 4.4.0 - 31 January 2024

Deprecated because it does not work with Lightning

### Minor Changes

- [632b585](https://github.com/OpenFn/adaptors/commit/632b585): Add `OAuth` support
- [a12f434](https://github.com/OpenFn/adaptors/commit/a12f434): Add `request(path, opts, cb)` function

## 4.3.1 - 16 December 2023

### Patch Changes

- [1131c34](https://github.com/OpenFn/adaptors/commit/1131c34): Remove regex pattern for validation and changed minLength to 1

## 4.3.0 - 01 December 2023

### Minor Changes

- [1d5b62f](https://github.com/OpenFn/adaptors/commit/1d5b62f): Add `toUTF8` function

## 4.2.2 - 20 September 2023

### Patch Changes

- Updated dependencies [c19efbe](https://github.com/OpenFn/adaptors/commit/c19efbe)
  - @openfn/language-common@1.11.1

## 4.2.1 - 18 September 2023

### Patch Changes

- [07debe9](https://github.com/OpenFn/adaptors/commit/07debe9): Update bulkQuery to use bulkv2

## 4.2.0 - 14 September 2023

### Minor Changes

- [fc58f1c](https://github.com/OpenFn/adaptors/commit/fc58f1c): add options in bulkQuery

## 4.1.0 - 13 September 2023

### Minor Changes

- [1e3a083](https://github.com/OpenFn/adaptors/commit/1e3a083): add bulkQuery function

## 4.0.8 - 08 September 2023

### Patch Changes

- Updated dependencies [85c35b8](https://github.com/OpenFn/adaptors/commit/85c35b8)
  - @openfn/language-common@1.11.0

## 4.0.7 - 14 August 2023

### Patch Changes

- Updated dependencies [df09270](https://github.com/OpenFn/adaptors/commit/df09270)
  - @openfn/language-common@1.10.3

## 4.0.6 - 03 August 2023

### Patch Changes

- [aceedd2](https://github.com/OpenFn/adaptors/commit/aceedd2): update jsforce and remove unused packages

## 4.0.5 - 14 July 2023

### Patch Changes

- Updated dependencies [26a303e](https://github.com/OpenFn/adaptors/commit/26a303e)
  - @openfn/language-common@1.10.2

## 4.0.4 - 14 July 2023

### Patch Changes

- Updated dependencies [8c32eb3](https://github.com/OpenFn/adaptors/commit/8c32eb3)
  - @openfn/language-common@1.10.1

## 4.0.3 - 30 June 2023

### Patch Changes

- Updated dependencies [aad9549](https://github.com/OpenFn/adaptors/commit/aad9549)
  - @openfn/language-common@1.10.0

## 4.0.2 - 23 June 2023

### Patch Changes

- Updated dependencies [111807f](https://github.com/OpenFn/adaptors/commit/111807f)
  - @openfn/language-common@1.9.0

## 4.0.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 4.0.0

### Major Changes

- [2c1d603](https://github.com/OpenFn/adaptors/commit/2c1d603): Remove parameter reassignment to ensure proper functioning inside an
  `each` block; add eslint

  The packages receiving a major bump here exposed functions that didn't work as
  expected inside `each` blocks. Users were previously wrapping these functions
  inside their own custom `fn` blocks, and this change will ensure that they can
  be used inside a standard each.

  See https://github.com/OpenFn/adaptors/issues/275 for more details.

### Patch Changes

- Updated dependencies [2c1d603](https://github.com/OpenFn/adaptors/commit/2c1d603)
  - @openfn/language-common@1.8.0

## 3.0.7 - 20 April 2023

### Patch Changes

- [7cc8efc](https://github.com/OpenFn/adaptors/commit/7cc8efc): remove FakeAdaptor references

## 3.0.6 - 31 March 2023

### Patch Changes

- [705caab](https://github.com/OpenFn/adaptors/commit/705caab): Remove tools as devdependencies

## 3.0.5 - 31 March 2023

### Patch Changes

- [929bca6](https://github.com/OpenFn/adaptors/commit/929bca6): Use metadata helper function from common
- Updated dependencies [929bca6](https://github.com/OpenFn/adaptors/commit/929bca6)
  - @openfn/language-common@1.7.7

## 3.0.4 - 30 March 2023

### Patch Changes

- [ef828e7](https://github.com/OpenFn/adaptors/commit/ef828e7): update old urls in readme
- Updated dependencies [2b4c61a](https://github.com/OpenFn/adaptors/commit/2b4c61a)
  - @openfn/language-common@1.7.6

## 3.0.3 - 21 March 2023

### Patch Changes

- [06aced8](https://github.com/OpenFn/adaptors/commit/06aced8): Fix dependencies

## 3.0.2 - 17 March 2023

### Patch Changes

- [aed7e0b](https://github.com/OpenFn/adaptors/commit/aed7e0b): fix required field in configuration schema

## 3.0.1 - 10 March 2023

### Patch Changes

- [c09b821](https://github.com/OpenFn/adaptors/commit/c09b821): Add @magic annotations

## 3.0.0 - 03 March 2023

### Major Changes

- [190f667](https://github.com/OpenFn/adaptors/commit/190f667): Remove curry from salesforce

## 2.12.3 - 15 February 2023

### Patch Changes

- [f7ebd3c](https://github.com/OpenFn/adaptors/commit/f7ebd3c): remove sample configuration

## 2.12.2 - 15 February 2023

### Patch Changes

- [f2aed32](https://github.com/OpenFn/adaptors/commit/f2aed32): add examples

## 2.12.1 - 13 January 2023

### Patch Changes

- [6d8de03](https://github.com/OpenFn/adaptors/commit/6d8de03): change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 2.12.0 - 18 November 2022

### Minor Changes

- [5c883c6](https://github.com/OpenFn/adaptors/commit/5c883c6): Allow expansion for describe(), add describeAll()

### Patch Changes

- [f2a91a4](https://github.com/OpenFn/adaptors/commit/f2a91a4): Update package exports
- Updated dependencies [f2a91a4](https://github.com/OpenFn/adaptors/commit/f2a91a4)
  - @openfn/language-common@1.7.5

## 2.11.1 - 04 November 2022

### Patch Changes

- [e7bf865](https://github.com/OpenFn/adaptors/commit/e7bf865): chore(deps): update dependency sinon to v14
- [8566b26](https://github.com/OpenFn/adaptors/commit/8566b26): Fix typings
- [b3d45ff](https://github.com/OpenFn/adaptors/commit/b3d45ff): Fix CJS export of npm package.
- Updated dependencies [8566b26](https://github.com/OpenFn/adaptors/commit/8566b26)
- Updated dependencies [b3d45ff](https://github.com/OpenFn/adaptors/commit/b3d45ff)
- Updated dependencies [b5eb665](https://github.com/OpenFn/adaptors/commit/b5eb665)
- Updated dependencies [ecf5d30](https://github.com/OpenFn/adaptors/commit/ecf5d30)
  - @openfn/language-common@1.7.4

## 2.11.0 - 25 October 2022

### Minor Changes

- [edff578](https://github.com/OpenFn/adaptors/commit/edff578): Migrate salesforce
