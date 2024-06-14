# @openfn/language-fhir

## 4.0.0

### Major Changes

- a42ffeb9: - All HTTP methods now write `{ data, response }` to state, where
  data is the response body and response is the raw response
  - All HTTP methods now support a `throwOnError` param, which defaults to true.
    If false, the adaptor will not throw if the HTTP status is <=400
  - request: return { data, response } directly
  - request: fix an issue where default headers would override user headers
  - request: if the body contains application/json content, parse it as JSON

## 3.2.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 3.1.2

### Patch Changes

- 2b283549: - Update `create()` example
  - Update required properties in configuration schema

## 3.1.1

### Patch Changes

- Security updates (lodash,undici)
- Updated dependencies
  - @openfn/language-common@1.13.2

## 3.1.0

### Minor Changes

- d94e9ee: Migrate from axios to using `fetch` from `undici` and add uniti tests

## 3.0.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 3.0.0

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

## 2.0.0

### Major Changes

- d4b4094: - Update configuration schema,
  - Add `get()` function
  - Fix `create()` axios config
  - Remove unused code
  - Improve error handling
  - Improve response handling

## 1.1.5

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 1.1.4

### Patch Changes

- f7ebd3c: remove sample configuration

## 1.1.3

### Patch Changes

- f2aed32: add examples

## 1.1.2

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 1.1.1

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 1.1.0

### Minor Changes

- fee607e: Migrate FHIR, update package export

### Patch Changes

- cb5d0ed: Updated to @openfn/simple-ast v0.4.1
- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-common@1.7.4
