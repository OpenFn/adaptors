# @openfn/language-asana

## 5.0.3 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 5.0.2 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 5.0.1 - 26 August 2025

### Patch Changes

- 05aae5f: Default `resource_subtype` to `default_task` in `searchTask()`

## 5.0.0 - 11 August 2025

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

## 4.3.0 - 22 July 2025

### Minor Changes

- 3fae9d2: Add `searchTask` function

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

## 4.1.0 - 17 June 2025

### Minor Changes

- d1edd7c: #### Add Auto Pagination to `getTasks` and `upsertTask` Functions

  ##### `getTasks` Function:

  - **Example without limit** (returns all tasks):

    ```js
    getTasks('1206933955023739', {
      opt_fields: 'name,notes,assignee',
    });
    ```

  - **Limit the number of tasks returned**:

    ```js
    getTasks('1206933955023739', {
      opt_fields: 'name,notes,assignee',
      limit: 100,
    });
    ```

  ##### `upsertTask` Function:

  - Now automatically fetches all tasks to find a matching task before updating
    or creating a new one.

## 4.0.12 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 4.0.11 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 4.0.10 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 4.0.9 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 4.0.8 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 4.0.7 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 4.0.6 - 09 January 2025

### Patch Changes

- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 4.0.5 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 4.0.4 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 4.0.3 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 4.0.2 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 4.0.1 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 4.0.0 - 01 August 2024

### Major Changes

- Export new common http helpers (http namespace)

## 3.3.1

### Patch Changes

- 510354a: Don't allow HTTP helpers to call out to different domains. This can
  cause a security violation where credentials are sent to external servers. Use
  generic HTTP helpers like `http.get` or `fetch` instead.
- 510354a: Fix an issue where not passing a params argument would trigger an
  exception
- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 3.3.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 3.2.0 - 12 April 2024

### Minor Changes

- bae5d3b6: Add the cursor() function from common. See the job writing guide for
  more information.

### Patch Changes

- Updated dependencies \[1ad86651]
  - @openfn/language-common@1.13.0

## 3.1.0 - 03 April 2024

### Minor Changes

- 673e41e8: - Add `createTaskStory()` function
  - Replaced common `http` with a more efficient implementation from
    `common/util` http

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

## 2.1.6 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 2.1.5 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 2.1.4 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 2.1.3 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 2.1.2 - 11 November 2022

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5

## 2.1.1 - 04 November 2022

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies \[8566b26]
- Updated dependencies \[b3d45ff]
- Updated dependencies \[b5eb665]
- Updated dependencies \[ecf5d30]
  - @openfn/language-common@1.7.4

## 2.1.0 - 21 October 2022

### Minor Changes

- 5f40dcf: Migrated language-asana

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions
