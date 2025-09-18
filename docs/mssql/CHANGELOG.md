# @openfn/language-mssql

## 6.0.3 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 6.0.2 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 6.0.1 - 26 August 2025

### Patch Changes

- d737f89: Optimize query handling by:

  - Revert to using `tedious.Request's callback` signature
  - Remove `rowCollectionOnRequestCompletion` option from configuration
  - Improve error messaging for `AggregateError` errors

## 6.0.0 - 11 August 2025

### Major Changes

- a5cea4e: removed `http` export from `@openfn/language-common`

  ### Migration Guide

  The `http` export has been removed from `@openfn/language-common`. If you were
  using it, you should remove it from your code and create a new step that uses
  `http` adaptor. See example below.

  **Before**

  **Step 1: Fetch and post data using postgresql adaptor**

  ```js
  sql('select * from foo');
  http.post('/example', { body: $.data }),
  ```

  **Now**

  **Step 1: Fetch data using postgresql adaptor**

  ```js
  sql('select * from foo');
  ```

  **Step 2: Post data using http adaptor**

  ```js
  post('/example', { body: $.data });
  ```

## 5.2.3 - 07 August 2025

### Patch Changes

- 5e97559: Fix `findValue` and `queryHandler` to return rows

## 5.2.2 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 5.2.1 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 5.2.0 - 10 July 2025

### Minor Changes

- 19f2d7e: Exported `as()` function from common.

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 5.1.0 - 20 June 2025

### Minor Changes

- 49cd197: - Automatically excape incoming query parameters to protect against
  SQL attacks
  - Add `escape()` util function

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 5.0.14 - 22 April 2025

### Patch Changes

- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 5.0.13 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 5.0.12 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 5.0.11 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 5.0.10 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 5.0.9 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 5.0.8 - 09 January 2025

### Patch Changes

- de03bea: Update tedious to 1.18.0. This should have no impact on the adaptor,
  but note this version will only run in node versions 18.x and 20+ (this should
  be fully compatible with all `@openfn/cli` and `@openfn/ws-worker` releases)
- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 5.0.7 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 5.0.7 - 28 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 5.0.6 - 18 October 2024

### Patch Changes

- d8d84d3: improve logging error message

## 5.0.5 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 5.0.4 - 26 September 2024

### Patch Changes

- d3ac969: use reject instead of throw

## 5.0.3 - 26 September 2024

### Patch Changes

- 6d38a48: Removed process.exit(1) to prevent workflow crashes on errors

## 5.0.2 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 5.0.1 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 5.0.0 - 01 August 2024

### Major Changes

- Export new common http helpers (http namespace)

## 4.3.4

### Patch Changes

- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 4.3.3 - 25 July 2024

### Patch Changes

- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 4.3.2 - 05 July 2024

### Patch Changes

- bb5436c: Add title and description for `port` configuration

## 4.3.1 - 19 June 2024

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 4.3.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 4.2.4 - 11 June 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 4.2.3 - 21 May 2024

### Patch Changes

- Updated dependencies \[12f02ed5]
  - @openfn/language-common@1.13.4

## 4.2.2 - 08 May 2024

### Patch Changes

- Updated dependencies \[88f99a8f]
  - @openfn/language-common@1.13.3

## 4.2.1 - 08 May 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 4.2.0 - 16 April 2024

### Minor Changes

- 2964fc8d: - Add `cursor()` function
  - Update `configuration-schema.json`

## 4.1.10 - 12 April 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 4.1.9 - 12 April 2024

### Patch Changes

- Updated dependencies \[1ad86651]
  - @openfn/language-common@1.13.0

## 4.1.8 - 20 September 2023

### Patch Changes

- Updated dependencies \[c19efbe]
  - @openfn/language-common@1.11.1

## 4.1.7 - 08 September 2023

### Patch Changes

- Updated dependencies \[85c35b8]
  - @openfn/language-common@1.11.0

## 4.1.6 - 14 August 2023

### Patch Changes

- Updated dependencies \[df09270]
  - @openfn/language-common@1.10.3

## 4.1.5 - 14 July 2023

### Patch Changes

- Updated dependencies \[26a303e]
  - @openfn/language-common@1.10.2

## 4.1.4 - 14 July 2023

### Patch Changes

- Updated dependencies \[8c32eb3]
  - @openfn/language-common@1.10.1

## 4.1.3 - 30 June 2023

### Patch Changes

- Updated dependencies \[aad9549]
  - @openfn/language-common@1.10.0

## 4.1.2 - 23 June 2023

### Patch Changes

- Updated dependencies \[111807f]
  - @openfn/language-common@1.9.0

## 4.1.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 4.1.0

### Minor Changes

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

## 4.0.8 - 31 May 2023

### Patch Changes

- 57742d1: remove request dependency

## 4.0.7 - 20 April 2023

### Patch Changes

- 04ed74f: update dependencies

## 4.0.6 - 06 April 2023

### Patch Changes

- 43c3669: patch versions

## 4.0.5 - 31 March 2023

### Patch Changes

- Updated dependencies \[929bca6]
  - @openfn/language-common@1.7.7

## 4.0.4 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 4.0.3 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 4.0.2 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 4.0.1 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 4.0.0 - 18 November 2022

### Major Changes

- 3878624: Modify composeNextState function, to flattern all rows into an array
  of rows with their corresponding column names

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5

## 3.1.1 - 04 November 2022

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies \[8566b26]
- Updated dependencies \[b3d45ff]
- Updated dependencies \[b5eb665]
- Updated dependencies \[ecf5d30]
  - @openfn/language-common@1.7.4

## 3.1.0 - 21 October 2022

### Minor Changes

- c9b7ed7: Add language-mssql in monorepo

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions
