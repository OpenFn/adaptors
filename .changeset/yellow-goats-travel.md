---
'@openfn/language-fhir': major
---

### Added

- Improved type definitions for `request()` and `get()`

### Changed

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

### Removed

- Removed `parseAs` from the options.
