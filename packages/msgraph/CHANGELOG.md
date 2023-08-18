# @openfn/language-msgraph

## 0.3.4

### Patch Changes

- 1c183e9: Fix getFile unit tests

## 0.3.3

### Patch Changes

- b90e8a2: Add support for stream
- Updated dependencies [df09270]
  - @openfn/language-common@1.10.3

## 0.3.2

### Patch Changes

- 9cc4952: fix url in request util

## 0.3.1

### Patch Changes

- f45f477: Clean-up state before throwing an error

## 0.3.0

### Minor Changes

- 9366e53: - Switch from `nodejs` default `fetch` to `undici` `fetch`
  - Added the following `sharepoint` functions
    - `getDrive()`
    - `getFolder()`
    - `getFile()`

## 0.2.0

### Minor Changes

- d33c0ee: export parseCsv from common

### Patch Changes

- Updated dependencies [8c32eb3]
  - @openfn/language-common@1.10.1

## 0.1.1

### Patch Changes

- aad9549: Ensure that standard OAuth2 credentials with snake-cased
  "access_token" keys can be used for OAuth2-reliant adaptors
- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0

## 0.1.0

### Minor Changes

- 93d82a8: Add msgraph adaptor with get() and create() functions

### Patch Changes

- Updated dependencies [111807f]
  - @openfn/language-common@1.9.0
