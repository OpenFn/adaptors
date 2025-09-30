# @openfn/language-fhir

## 5.0.9 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 5.0.8 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 5.0.7 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 5.0.6 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 5.0.5 - 10 July 2025

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 5.0.4 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 5.0.3 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 5.0.2 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 5.0.1 - 01 August 2024

### Patch Changes

- 940996b: Use common helper code to handle invalid absolute URLs
- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 5.0.0 - 19 July 2024

#### Added

- Improved type definitions for `request()` and `get()`

#### Changed

- Updated `request` function to the new signature:

  ```js
  export const request =
    async (method, path, options = {}, callback) =>
    state => ({
      ...state,
      data,
      response,
    });
  ```

- Updated `post` function to the new signature:

  ```js
  export const post = (path, data, options, callback) => state => ({
    ...state,
    data,
    response,
  });
  ```

- Updated `get` function to the new signature:

  ```js
  export const get = (path, params, options, callback) => state => ({
    ...state,
    data,
    response,
  });
  ```

- Updated `create` function to the new signature:

  ```js
  export const create = (resource, resource, params, callback) => state => ({
    ...state,
    data,
    response,
  });
  ```

- Updated `createTransactionBundle` function:

  ```js
  export const createTransactionBundle = (entries, callback) => state => ({
    ...state,
    data,
  });
  ```

- Updated `getClaim` function to the new signature:

  ```js
  export const getClaim =
    (claimId, params, callback = s => s) =>
    state => ({
      ...state,
      data,
    });
  ```

- Updated `configuration-schema.json`
  - Removed `authType`
  - Rename `token` to `access_token`
  - Add `username` and `password`

#### Removed

- Removed `parseAs` from the options.

## 4.0.0 - 14 June 2024

### Major Changes

- a42ffeb9: - All HTTP methods now write `{ data, response }` to state, where
  data is the response body and response is the raw response
  - All HTTP methods now support a `throwOnError` param, which defaults to true.
    If false, the adaptor will not throw if the HTTP status is an error code
  - request: return `{ data, response }` directly
  - request: fix an issue where default headers would override user headers
  - request: if the body contains application/json content, parse it as JSON

## 3.2.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 3.1.2 - 17 May 2024

### Patch Changes

- 2b283549: - Update `create()` example
  - Update required properties in configuration schema

## 3.1.1 - 08 May 2024

### Patch Changes

- Security updates (lodash,undici)
- Updated dependencies
  - @openfn/language-common@1.13.2

## 3.1.0 - 28 July 2023

### Minor Changes

- d94e9ee: Migrate from axios to using `fetch` from `undici` and add uniti tests

## 3.0.1 - 19 June 2023

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

- Updated dependencies \[2c1d603]
  - @openfn/language-common@1.8.0

## 2.0.0 - 06 June 2023

### Major Changes

- d4b4094: - Update configuration schema,
  - Add `get()` function
  - Fix `create()` axios config
  - Remove unused code
  - Improve error handling
  - Improve response handling

## 1.1.5 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 1.1.4 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 1.1.3 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 1.1.2 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 1.1.1 - 11 November 2022

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5

## 1.1.0 - 04 November 2022

### Minor Changes

- fee607e: Migrate FHIR, update package export

### Patch Changes

- cb5d0ed: Updated to @openfn/simple-ast v0.4.1
- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies \[8566b26]
- Updated dependencies \[b3d45ff]
- Updated dependencies \[b5eb665]
- Updated dependencies \[ecf5d30]
  - @openfn/language-common@1.7.4
