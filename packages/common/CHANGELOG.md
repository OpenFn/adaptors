v0.4.0

## 1.13.5

### Patch Changes

- http helpers: Fix an issue where query parameters in the URL did not get sent
  to the server

## 1.13.4

### Patch Changes

- 12f02ed5: http helpers: Ensure redirects append base url

## 1.13.3

### Patch Changes

- 88f99a8f: cursor: support format option

## 1.13.2

### Patch Changes

- Security updates (lodash,undici)

## 1.13.1

### Patch Changes

- Fix jsdoc link

## 1.13.0

### Minor Changes

- 1ad86651: Added cursor() helper

## 1.12.0

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

## 1.11.1

### Patch Changes

- c19efbe: don't attempt to expand references for a buffer

## 1.11.0

### Minor Changes

- 85c35b8: Add validate function to validate data against a JSON schema

## 1.10.3

### Patch Changes

- df09270: Fix streaming interface to parseCSV

## 1.10.2

### Patch Changes

- 26a303e: add expandReferences for csvData and parsingOptions

## 1.10.1

### Patch Changes

- 8c32eb3: - update parseCsv to await callback
  - Added documentation for splitKeys

## 1.10.0

### Minor Changes

- aad9549: Ensure that standard OAuth2 credentials with snake-cased
  "access_token" keys can be used for OAuth2-reliant adaptors

## 1.9.0

### Minor Changes

- 111807f: Add support for `parseCsv` in common

## 1.8.1

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

## 1.7.7

### Patch Changes

- 929bca6: Export metadata helper function

## 1.7.6

### Patch Changes

- 2b4c61a: mark execute private and ast build

## 1.7.5

### Patch Changes

- f2a91a4: Update package exports

## 1.7.4

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- b5eb665: Adjusted docs for common and built to markdown
- # ecf5d30: remove sinon since it was not being used

Bumped all package versions to their latest.

# v0.0.4

- Added `arrayToString` helper.  
  Allowing you to join an array of string'able primitives (strings and integers)
  into a string.
- Added `toArray` helper.  
  This can be used to coerce certain types of data into an array, this can be
  useful when the source data has an ambiguous format. For example a given key
  in the data may have an object as it's value (when there is only one item),
  and an array of objects when there is more than one. `toArray` can be used to
  reconcile this inconsistency.
