# @openfn/language-primero

## 4.0.2 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 4.0.1 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 4.0.0 - 11 August 2025

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

## 3.2.2 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 3.2.1 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 3.2.0 - 10 July 2025

### Minor Changes

- 19f2d7e: Exported `as()` function from common.

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 3.1.4 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 3.1.3 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 3.1.2 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 3.1.1 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 3.1.0 - 31 March 2025

### Minor Changes

- 7fecd5b: - Added a new http namespace, containing HTTP helpers for `get()`,
  `post()` and `patch()`.

  - These functions will allow the users to make any requests with the `POST`,
    `PATCH`, and `GET` methods to `primero`.
  - With these new updates, you can now do this:

  ```

  http.get('cases', {
      query:{ remote: true }
  })

  ```

## 3.0.10 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 3.0.9 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 3.0.8 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 3.0.7 - 09 January 2025

### Patch Changes

- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 3.0.6 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 3.0.5 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 3.0.4 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 3.0.3 - 09 October 2024

### Patch Changes

- 8d866e4: Update tough-cookie dependency

## 3.0.2 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 3.0.1 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 3.0.0 - 01 August 2024

### Major Changes

- Export new common http helpers (http namespace)

## 2.12.4

### Patch Changes

- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 2.12.3 - 25 July 2024

### Patch Changes

- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 2.12.2 - 18 July 2024

### Patch Changes

- 3ad9122: - Improve `getCases()` withReferrals docs
  - Add logs when fetching case referrals

## 2.12.1 - 19 June 2024

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 2.12.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 2.11.14 - 11 June 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 2.11.13 - 21 May 2024

### Patch Changes

- Updated dependencies \[12f02ed5]
  - @openfn/language-common@1.13.4

## 2.11.12 - 08 May 2024

### Patch Changes

- Updated dependencies \[88f99a8f]
  - @openfn/language-common@1.13.3

## 2.11.11 - 08 May 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 2.11.10 - 12 April 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 2.11.9 - 12 April 2024

### Patch Changes

- Updated dependencies \[1ad86651]
  - @openfn/language-common@1.13.0

## 2.11.8 - 20 September 2023

### Patch Changes

- Updated dependencies \[c19efbe]
  - @openfn/language-common@1.11.1

## 2.11.7 - 08 September 2023

### Patch Changes

- Updated dependencies \[85c35b8]
  - @openfn/language-common@1.11.0

## 2.11.6 - 14 August 2023

### Patch Changes

- Updated dependencies \[df09270]
  - @openfn/language-common@1.10.3

## 2.11.5 - 14 July 2023

### Patch Changes

- Updated dependencies \[26a303e]
  - @openfn/language-common@1.10.2

## 2.11.4 - 14 July 2023

### Patch Changes

- Updated dependencies \[8c32eb3]
  - @openfn/language-common@1.10.1

## 2.11.3 - 30 June 2023

### Patch Changes

- Updated dependencies \[aad9549]
  - @openfn/language-common@1.10.0

## 2.11.2 - 23 June 2023

### Patch Changes

- Updated dependencies \[111807f]
  - @openfn/language-common@1.9.0

## 2.11.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 2.11.0

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

## 2.10.6 - 31 March 2023

### Patch Changes

- Updated dependencies \[929bca6]
  - @openfn/language-common@1.7.7

## 2.10.5 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 2.10.4 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 2.10.3 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/
- 059c956: added examples in docstring

## 2.10.2 - 11 November 2022

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5

## 2.10.1 - 04 November 2022

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies \[8566b26]
- Updated dependencies \[b3d45ff]
- Updated dependencies \[b5eb665]
- Updated dependencies \[ecf5d30]
  - @openfn/language-common@1.7.4

## 2.10.0 - 25 October 2022

### Minor Changes

- 33742bf: Modify `composeNextState` so that `getCases` can pass it a third
  argument: the metadata from Primero's response.

  `getCases` will now not only return an array of `cases` in `state.data`, but
  metadata related to pagination in `state.metadata`.

### Patch Changes

- 2014694: remove travis url in readme
- bb764db: Conditionally check for 'withReferrals' in case no options are
  provided"

## 2.9.2 - 21 October 2022

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions

## 2.9.1 - 19 October 2022

### Patch Changes

- d4ac748: Skipped failing test until we have a new strat (it's working)

## 2.9.0 - 19 October 2022

### Minor Changes

- b37a4ad: add language primero into monorepo

### Patch Changes

- adb97a0: Fixed issue where upsertCase always took state.data for main params
