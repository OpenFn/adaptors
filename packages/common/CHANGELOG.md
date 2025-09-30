## 3.0.1 - 11 July 2025

## 3.1.0 - 18 September 2025

### Minor Changes

- e2bc436: Switch from `undici` Client to Agent to allow cross-redirection for
  domains

## 3.0.3 - 01 September 2025

### Patch Changes

- 1d60531: Update `fnIf` function docs

## 3.0.2 - 14 July 2025

### Patch Changes

- 9b5a4f8: More robust handling of empty response bodies in http helpers

### Patch Changes

- cf9c09f: Fix an issue where JSON responses without a content-type header could
  return undefined

## 3.0.0 - 10 July 2025

The 3.0 release of the common adaptor restructures some key internal
functionality and re-writes the `map()` function to feel more modern.

It also and adds exports for the lodash utility library (`_`) an a new `as()`
convenience function.

### Major Changes

- 3fce58f: - Re-write `map()` to work more like JavaScript's `Array.map()`.

### Minor Changes

- f26bd2b: Export for lodash
- 19f2d7e: Implement `as()` function for saving the result of an operation to a
  custom key in state instead of overwriting state.data.

### Migration Guide

The behaviour of the `map()` function has changed subtly but significantly.

Existing workflows should replace `map()` with `each()`, which has the same
functionality.

So if you used to do this:

```js
map('$.[*]', create('SObject', field('FirstName', sourceValue('$.firstName'))));
```

You must do this instead:

```js
each(
  '$.[*]',
  create('SObject', field('FirstName', sourceValue('$.firstName')))
);
```

## 2.5.0 - 20 June 2025

### Minor Changes

- 28c2e8b: - Updated internal `logResponse` API
- Update request to response to include `query` parameters

## 2.4.0 - 22 April 2025

### Minor Changes

- 13bf08f: Add `log()` and `debug()` functions

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters

## 2.3.3 - 16 April 2025

### Patch Changes

- b089c56: Implement support for `parseAs:'base64'` for binary data.

## 2.3.2 - 11 April 2025

### Patch Changes

- d7105c0: Improved handling of response bodies with no content

## 2.3.1 - 14 March 2025

### Patch Changes

- 23ccb01: Allow the errorMap passed into the request helper to be false, which
  suppresses all errors

## 2.3.0 - 16 January 2025

### Minor Changes

- b3d7f59: Common util functions `encode` and `decode` can now take a JavaScript
  object and stringify
- 41e8cc3: Added an 'assert' function that throws an error when an expression or
  function resolves to false

### Patch Changes

- 2d709ff: Ensure that RegExp objects can be safely passed as references

## 2.2.1 - 16 January 2025

### Patch Changes

- 6dffdbd: Fixed an issue in the HTTP helpers where responses without a body can
  cause an error to be thrown.

## 2.2.0 - 09 January 2025

### Minor Changes

- a47d8d5: `decode`, `encode` and `uuid` are now correctly documented as being
  in the `util` namespace

### Patch Changes

- 9240428: security: Update dependencies

## 2.1.1 - 28 October 2024

### Patch Changes

- Updated docs for each()

## 2.1.0 - 18 October 2024

### Minor Changes

- 03a1a74: Add `encode`, `decode` and `uuid` helpers

## 2.0.3 - 15 October 2024

### Patch Changes

- 33973a2: Fix a critical security issue in jsonpath-plus

## 2.0.2 - 24 September 2024

### Patch Changes

- 77a690f: improve cursor setup message

## 2.0.1 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json

## 2.0.0 - 01 August 2024

The 2.0 version of common removes axios and re-writes the `http` namespace.

You can now use `http.request()` from any adaptor that exports it:

```
http.request(
  'GET',
  'https://jsonplaceholder.typicode.com/todos',
  http.options().basic('user', 'pass')
)
```

`http.get()` and `http.post()` are also available.

These functions behave just like the HTTP adaptor's operations (except that they
don't handle auth for you).

Use the `http.options()` helper functiosn to set basic auth headers and set the
content type to JSON.

### Major Changes

- Replace axios-based http operations with cleaner, undici-based ones
- Removed axios export

### Minor Changes

- Add options helpers to http namespace

### Patch Changes

- 4c08444: document `date-fns` functions

## 1.15.0 - 19 June 2024

### Minor Changes

- 5fb82f07: - Add `group()` operation
  - Initialize `state.references` in `composeNextState()`

## 1.14.0 - 13 June 2024

### Minor Changes

- 106ecf6d: Add `fnIf` operation

## 1.13.5 - 11 June 2024

### Patch Changes

- http helpers: Fix an issue where query parameters in the URL did not get sent
  to the server

## 1.13.4 - 21 May 2024

### Patch Changes

- 12f02ed5: http helpers: Ensure redirects append base url

## 1.13.3 - 08 May 2024

### Patch Changes

- 88f99a8f: cursor: support format option

## 1.13.2 - 08 May 2024

### Patch Changes

- Security updates (lodash,undici)

## 1.13.1 - 12 April 2024

### Patch Changes

- Fix jsdoc link

## 1.13.0 - 12 April 2024

### Minor Changes

- 1ad86651: Added cursor() helper

## 1.12.0 - 24 January 2024

### Minor Changes

- 7f52699: New HTTP helper functions have been added to common in
  `src/util/http.js`

  These are based on the `undici` library. They are functions, not operations,
  so they do not get and return state, and do not expand references.

  They are designed to be used by other adaptors to make HTTP requests easier.

  ## Usage

  ```
  // Import the helper function
  import { get } from '@openfn/language-common/util'

  // This is an example operation
  export function get(id, callback) {
    return async (state) => {
      const [resolvedId] = expandReferences(
        state,
        id,
      );

      // Call the new common helper to fetch some json
      const response = await get(`www.example.com/resource/{$resolvedId}`, { parseAs: 'json' });

      // Return the response body as data, and also include the response object as a convenience
      return {
        ...state,
        response,
        data: response.body
      }
    }
  }
  ```

  See the http adaptor for a reference implementation.

  ## Deprecation notice

  The existing http operations in `src/http.js` have been deprecated, and
  adaptors should migrate to the new helpers.

## 1.11.1 - 20 September 2023

### Patch Changes

- c19efbe: don't attempt to expand references for a buffer

## 1.11.0 - 08 September 2023

### Minor Changes

- 85c35b8: Add validate function to validate data against a JSON schema

## 1.10.3 - 14 August 2023

### Patch Changes

- df09270: Fix streaming interface to parseCSV

## 1.10.2 - 14 July 2023

### Patch Changes

- 26a303e: add expandReferences for csvData and parsingOptions

## 1.10.1 - 14 July 2023

### Patch Changes

- 8c32eb3: - update parseCsv to await callback
  - Added documentation for splitKeys

## 1.10.0 - 30 June 2023

### Minor Changes

- aad9549: Ensure that standard OAuth2 credentials with snake-cased
  "access\_token" keys can be used for OAuth2-reliant adaptors

## 1.9.0 - 23 June 2023

### Minor Changes

- 111807f: Add support for `parseCsv` in common

## 1.8.1 - 19 June 2023

### Patch Changes

- Update lock files

## 1.8.0

### Minor Changes

- 2c1d603: Remove parameter reassignment to ensure proper functioning inside an
  `each` block; add eslint

  The packages receiving a major bump here exposed functions that didn't work as
  expected inside `each` blocks. Users were previously wrapping these functions
  inside their own custom `fn` blocks, and this change will ensure that they can
  be used inside a standard each.

  See https://github.com/OpenFn/adaptors/issues/275 for more details.

## 1.7.7 - 31 March 2023

### Patch Changes

- 929bca6: Export metadata helper function

## 1.7.6 - 30 March 2023

### Patch Changes

- 2b4c61a: mark execute private and ast build

## 1.7.5 - 11 November 2022

### Patch Changes

- f2a91a4: Update package exports

## 1.7.4 - 04 November 2022

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- b5eb665: Adjusted docs for common and built to markdown
- # ecf5d30: remove sinon since it was not being used

Bumped all package versions to their latest.

# v0.0.4

- Added `arrayToString` helper.\
  Allowing you to join an array of string'able primitives (strings and integers)
  into a string.
- Added `toArray` helper.\
  This can be used to coerce certain types of data into an array, this can be useful
  when the source data has an ambiguous format. For example a given key in the data
  may have an object as it's value (when there is only one item), and an array of
  objects when there is more than one. `toArray` can be used to reconcile this inconsistency.
