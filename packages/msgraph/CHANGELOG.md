# @openfn/language-msgraph

## 0.7.6

### Patch Changes

- Updated dependencies [03a1a74]
  - @openfn/language-common@2.1.0

## 0.7.5

### Patch Changes

- Fixed security vulnerability in jsonpath-plus [33973a2]
  - @openfn/language-common@2.0.3

## 0.7.4

### Patch Changes

- Updated dependencies [77a690f]
  - @openfn/language-common@2.0.2

## 0.7.3

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies [8146c23]
  - @openfn/language-common@2.0.1

## 0.7.2

### Patch Changes

- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 0.7.1

### Patch Changes

- Updated dependencies [4c08444]
- Updated dependencies [73d0a02]
  - @openfn/language-common@1.15.1

## 0.7.0

### Minor Changes

- 1d2a641: Normalize configuration keys for oauth. `access_token` and
  `accessToken` are now both supported (`access_token` is preferred)

## 0.6.1

### Patch Changes

- Updated dependencies [5fb82f07]
  - @openfn/language-common@1.15.0

## 0.6.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 0.5.5

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 0.5.4

### Patch Changes

- Updated dependencies [12f02ed5]
  - @openfn/language-common@1.13.4

## 0.5.3

### Patch Changes

- Updated dependencies [88f99a8f]
  - @openfn/language-common@1.13.3

## 0.5.2

### Patch Changes

- Security updates (lodash,undici)
- Updated dependencies
  - @openfn/language-common@1.13.2

## 0.5.1

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 0.5.0

### Minor Changes

- bae5d3b6: Add the cursor() function from common. See the job writing guide for
  more information.

### Patch Changes

- Updated dependencies [1ad86651]
  - @openfn/language-common@1.13.0

## 0.4.0

### Minor Changes

- 4cd6587: Add `uploadFile` and `sheetToBuffer` function

### Patch Changes

- Updated dependencies [c19efbe]
  - @openfn/language-common@1.11.1

## 0.3.5

### Patch Changes

- Updated dependencies [85c35b8]
  - @openfn/language-common@1.11.0

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
