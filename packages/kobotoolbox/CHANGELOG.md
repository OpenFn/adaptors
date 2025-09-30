# @openfn/language-kobotoolbox

## 4.2.4 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 4.2.3 - 01 September 2025

### Patch Changes

- df258c5: Update `http.request` option docs to use `data` instead of `body` in
  requests
- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 4.2.2 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 4.2.1 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 4.2.0 - 10 July 2025

### Minor Changes

- 19f2d7e: Exported `as()` function from common.

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 4.1.1 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 4.1.0 - 06 June 2025

### Minor Changes

- 2123876: Add support for `sort` and `start` option in `getSubmissions`
  function

## 4.0.0 - 30 May 2025

### Major Changes

- fe5b899: Add automatic pagination to `getSubmissions()`.

  `getSubmissions()` will now download all submissions, up to the requested
  limit, over multiple requests. Note that by default, a maximum of 30,000 items
  will be downloaded (pass a higher number of `Infinity` to download more).

  ### Changes

  - Updated `getSubmission` pagination behavior:

    - Removed `paginate` option
    - Added new pagination options:
      - `limit`: Controls number of results returned
      - `pageSize`: Number of items per page

  - Remove export of `http` methods from `@openfn/language-common`

  - Add support for `maxRedirections` option in `HTTPRequestOptions`

  ### Migration Guide

  1. Pagination Changes:

     - Replace `paginate: true/false` with `limit` and `pageSize` options
     - Default limit is `30000` unless otherwise specified

     ```js
     // Fetch submissions with default limit (30000)
     getSubmission('form-id');

     // Fetch all submissions (no limit)
     getSubmission('form-id', { limit: Infinity });

     // Fetch submissions with max results
     getSubmission('form-id', { limit: 500 }); // Returns up to 500 submissions
     ```

  2. HTTP Changes:

  - Support for `maxRedirections` option in `HTTPRequestOptions`
    ```js
    // Auto follow redirects
    http.get('assets/aXecHjmbATuF6iGFmvBLBX/data', { maxRedirections: 5 });
    ```

## 3.0.5 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 3.0.4 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 3.0.3 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 3.0.2 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 3.0.1 - 16 February 2025

### Patch Changes

- a8b91d2: Fix results handling for getSubmissions

## 3.0.0 - 13 February 2025

### Major Changes

- b01d4f0: Update all functions in the main API (remove callbacks and clean up
  signatures, see the Migration Guide)
- 882ce29: Rewrite onto common http helpers (using undici)

### Minor Changes

- 6d536b2: Renaming `baseURL` to `baseUrl` to match all other adaptors, and
  logging a warning if `baseURL` is used
- 311d3b2: Add http namespace with `get()`, `post()`, `put()`

## Migration guide

- callbacks have removed from all functions. You can use `.then()` or `fn()` to
  access the data returned by a function, ie, `getForms().then(state => state)`
- `getForms(params, callback)` is now `getForms()`, and will now only download
  assets of type survey. Use `http.get('assets/')` to retrieve other assets (and
  add query parameters)
- `getSubmissions(params, callback)` is now `getSubmissions(formId, { query })`.
- `getDeploymentInfo(params, callback)` is now `getDeploymentInfo(formId)`

## 2.4.3 - 15 October 2024

### Patch Changes

- Security fix: update jsonpath-plus version

## 2.4.2 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json

## 2.4.1 - 25 July 2024

### Patch Changes

- 73d0a02: Make documentation public
- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 2.4.0 - 19 June 2024

### Minor Changes

- 5fb82f07: Export `group` operation from common

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 2.3.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 2.2.0 - 12 April 2024

### Minor Changes

- bae5d3b6: Add the cursor() function from common. See the job writing guide for
  more information.

### Patch Changes

- Updated dependencies \[1ad86651]
  - @openfn/language-common@1.13.0

## 2.1.0 - 13 September 2023

### Minor Changes

- c85abf3: Removed the API version enum values in the credential configuration
  json schema and added a placeholder

## 2.0.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 2.0.0

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

## 1.3.3 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 1.3.2 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 1.3.1 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 1.3.0 - 13 January 2023

### Minor Changes

- e48c30c: add getDeploymentInfo function

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 1.2.0 - 18 November 2022

### Minor Changes

- 7b5ca3e: add fn and fix adaptors export

### Patch Changes

- 4067c28: build ast file
- f2a91a4: Update package exports
- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5

## 1.1.0 - 04 November 2022

### Minor Changes

- 7fc47d8: Migrate kobotoolbox

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies \[8566b26]
- Updated dependencies \[b3d45ff]
- Updated dependencies \[b5eb665]
- Updated dependencies \[ecf5d30]
  - @openfn/language-common@1.7.4
