# @openfn/language-odoo

## 2.1.3 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 2.1.2 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 2.1.1 - 28 August 2025

### Patch Changes

- b7af59a: - Update `package.json` description to be LLM-readable

## 2.1.0 - 14 August 2025

### Minor Changes

- 282f9f3: Add `search()` and `searchReadRecord()` functions.
  - `search()` Only returns the record IDs.
  - `searchReadRecord()` returns the records with the specified criteria or the
    full record if none is given.

## 2.0.0 - 11 August 2025

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

## 1.0.10 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 1.0.9 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 1.0.8 - 10 July 2025

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 1.0.7 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 1.0.6 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 1.0.5 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 1.0.4 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 1.0.3 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 1.0.2 - 12 March 2025

### Patch Changes

- cde1ead: Add a `downloadNewRecord: true` option to `create` to enable
  downloading of the whole record in the response.

  ```js
  create('res.partner', { name: 'Kool Keith' }, { downloadNewRecord: true });
  fn(state => {
    const record = state.data; // whole record is here
    return state;
  });
  ```

## 1.0.1 - 24 February 2025

### Patch Changes

- 2f58a71: Default `create()` options to `{}` to ensure that the options
  argument is optional.
- e26fbd5: Simplified logging across the adaptor without displaying user data
- 2db9f8d: Update the third argument in `read()` examples and documentation to
  explicitly indicate that it accepts an array of strings.

## 1.0.0 - 18 February 2025

Initial release.
