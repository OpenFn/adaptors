# @openfn/language-odoo

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
