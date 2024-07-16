---
'@openfn/language-fhir': major
---

### Added

- Introduced a new `RequestOptions` for the HTTP request:

  - `headers`: An object of headers to append to the request.
  - `body`: JSON payload to attach to the request.
  - `query`: Query parameters for the request, encoded into the URL.
  - `errors`: Map of errorCodes -> error messages, ie,
    `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this
    code.
  - `timeout`: Request timeout in ms. Default: 300 seconds.

- Introduced a new `GetOptions` for the GET HTTP request:

  - `headers`: An object of headers to append to the request.
  - `errors`: Map of errorCodes -> error messages, ie,
    `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this
    code.
  - `timeout`: Request timeout in ms. Default: 300 seconds.

- Introduced a new `FHIRHttpState` for the State object:
  - `data`: The parsed response body
  - `response`: The response from the FHIR HTTP server (with the body removed)
  - `references`: An array of all the previous data values

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

- Updated `createTransactionBundle` function to the new signature:

  ```js
  export const createTransactionBundle =
    (entries, params, callback) => state => ({
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

### Removed

- Removed `parseAs` from the options, assuming everything is JSON by default.
