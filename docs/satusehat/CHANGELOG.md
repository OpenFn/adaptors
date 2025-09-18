# @openfn/language-satusehat

## 3.0.3 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 3.0.2 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 3.0.1 - 28 August 2025

### Patch Changes

- b7af59a: - Update `package.json` description to be LLM-readable

## 3.0.0 - 11 August 2025

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

## 2.1.2 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 2.1.1 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 2.1.0 - 10 July 2025

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

## 2.0.15 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 2.0.14 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 2.0.13 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 2.0.12 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 2.0.11 - 04 April 2025

### Patch Changes

- cfaba6d: Export `util.uuid` from `common`

## 2.0.10 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 2.0.9 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 2.0.8 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 2.0.7 - 09 January 2025

### Patch Changes

- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 2.0.6 - 04 November 2024

### Patch Changes

- 7c528d3: Update docs with examples

## 2.0.5 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 2.0.4 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 2.0.3 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 2.0.2 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 2.0.1 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 2.0.0 - 01 August 2024

### Major Changes

- Export new common http helpers (http namespace)

## 1.1.4

### Patch Changes

- f51c5d0: Enforce that absolute urls must not be passed to HTTP functions
- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 1.1.3 - 25 July 2024

### Patch Changes

- 73d0a02: Make documentation public
- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 1.1.2 - 01 July 2024

### Patch Changes

- 218a582: Added extra logging around errors

## 1.1.1 - 19 June 2024

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 1.1.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 1.0.1 - 11 June 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 1.0.0 - 29 May 2024

Initial release.
