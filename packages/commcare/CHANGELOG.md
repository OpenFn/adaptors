# @openfn/language-commcare

## 4.0.3 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 4.0.2 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 4.0.1 - 28 August 2025

### Patch Changes

- b7af59a: - Update `package.json` description to be LLM-readable

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

## 3.3.2 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 3.3.1 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 3.3.0 - 10 July 2025

### Minor Changes

- 19f2d7e: Exported `as()` function from common.
- 8d78db4: Export `map()` function from common

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 3.2.14 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 3.2.13 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 3.2.12 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 3.2.11 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 3.2.10 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 3.2.9 - 16 January 2025

### Patch Changes

- 3b166c9: Update commcare request docs to read query parameters instead of
  options, and fix the empty body response received when specific requests are
  made.

## 3.2.8 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 3.2.7 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 3.2.6 - 09 January 2025

### Patch Changes

- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 3.2.5 - 04 November 2024

### Patch Changes

- 2fc7d82: Update example docs and configuration

## 3.2.4 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 3.2.3 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 3.2.2 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 3.2.1 - 03 October 2024

### Patch Changes

- 8d85bb4: Implement resolved body and resolved params in bulk

## 3.2.0 - 02 October 2024

### Minor Changes

- c800948: Implement a generic request funciton for generic HTTP calls
- cff886e: Implement bulk function for lookup-table and case-data bulk uploads

## 3.1.2 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 3.1.1 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 3.1.0 - 07 August 2024

### Minor Changes

- Add `cursor()` function from common
- Add `dateFns` helper from common

### Patch Changes

- 90d74c7: Revise documentation

## 3.0.0 - 01 August 2024

### Major Changes

- Export new common http helpers (http namespace)

## 2.3.2

### Patch Changes

- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 2.3.1 - 25 July 2024

### Patch Changes

- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 2.3.0 - 24 July 2024

### Minor Changes

- ac4b4a0: `get()` will now automatically paginate responses (unless an offset
  is passed)

## 2.2.1 - 19 June 2024

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 2.2.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 2.1.0 - 11 June 2024

### Minor Changes

- 0719de00: Implement better error handling and make post a public function

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 2.0.0 - 21 May 2024

Rebase the commcare adaptor on the new HTTP helpers.

### Major Changes

- Remove superagents and language-http dependencies
- configuration schema: change applicationName to domain to match commcare's
  configuration.
- remove the `clientPost` function

### Minor Changes

- Implemented a get function for all get requests in commcare
- Create a generic post function that allows for posting JSON data
- Standardize auth to use either basic or APIKey across all operations
- configuration schema: add apiKey
- configuration schema: demote username and appId are optional

### Patch Changes

- Updated dependencies \[12f02ed5]
  - @openfn/language-common@1.13.4

## 1.6.14 - 08 May 2024

### Patch Changes

- Updated dependencies \[88f99a8f]
  - @openfn/language-common@1.13.3

## 1.6.13 - 08 May 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 1.6.12 - 12 April 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 1.6.11 - 12 April 2024

### Patch Changes

- Updated dependencies \[1ad86651]
  - @openfn/language-common@1.13.0

## 1.6.10 - 20 September 2023

### Patch Changes

- Updated dependencies \[c19efbe]
  - @openfn/language-common@1.11.1
  - @openfn/language-http@5.0.4

## 1.6.9 - 08 September 2023

### Patch Changes

- Updated dependencies \[85c35b8]
  - @openfn/language-common@1.11.0
  - @openfn/language-http@5.0.3

## 1.6.8 - 14 August 2023

### Patch Changes

- Updated dependencies \[df09270]
  - @openfn/language-common@1.10.3
  - @openfn/language-http@5.0.2

## 1.6.7 - 03 August 2023

### Patch Changes

- 52c02c8: update xlsx package

## 1.6.6 - 21 July 2023

### Patch Changes

- 8205673: update superagent

## 1.6.5 - 14 July 2023

### Patch Changes

- Updated dependencies \[26a303e]
  - @openfn/language-common@1.10.2
  - @openfn/language-http@5.0.1

## 1.6.4 - 14 July 2023

### Patch Changes

- Updated dependencies \[0b6f20b]
- Updated dependencies \[8c32eb3]
  - @openfn/language-http@5.0.0
  - @openfn/language-common@1.10.1

## 1.6.3 - 30 June 2023

### Patch Changes

- Updated dependencies \[aad9549]
  - @openfn/language-common@1.10.0
  - @openfn/language-http@4.3.3

## 1.6.2 - 23 June 2023

### Patch Changes

- Updated dependencies \[111807f]
  - @openfn/language-common@1.9.0
  - @openfn/language-http@4.3.2

## 1.6.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1
  - @openfn/language-http@4.3.1

## 1.6.0

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
  - @openfn/language-http@4.3.0

## 1.5.6 - 12 May 2023

### Patch Changes

- e0406fa: update dependencies

## 1.5.5 - 31 March 2023

### Patch Changes

- Updated dependencies \[929bca6]
  - @openfn/language-common@1.7.7
  - @openfn/language-http@4.2.8

## 1.5.4 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
- Updated dependencies \[14f481e]
  - @openfn/language-common@1.7.6
  - @openfn/language-http@4.2.7

## 1.5.3 - 15 February 2023

### Patch Changes

- f2aed32: add examples
- Updated dependencies \[f2aed32]
  - @openfn/language-http@4.2.5

## 1.5.2 - 15 December 2022

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/
- 57f3513: Fix exports in index.js
- Updated dependencies \[6d8de03]
  - @openfn/language-http@4.2.4

## 1.5.1 - 11 November 2022

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5
  - @openfn/language-http@4.2.3

## 1.5.0 - 04 November 2022

### Minor Changes

- 5c050ed: Migrate CommCare

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- 94076b9: update dependency xlsx to ^0.18.0
- ecf5d30: remove sinon since it was not being used
- Updated dependencies \[9a2755e]
- Updated dependencies \[8566b26]
- Updated dependencies \[b3d45ff]
- Updated dependencies \[b5eb665]
- Updated dependencies \[ecf5d30]
  - @openfn/language-http@4.2.2
  - @openfn/language-common@1.7.4
