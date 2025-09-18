# @openfn/language-msgraph

## 0.8.4 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 0.8.3 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 0.8.2 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 0.8.1 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 0.8.0 - 10 July 2025

### Minor Changes

- 19f2d7e: Exported `as()` function from common.

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 0.7.15 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 0.7.14 - 22 April 2025

### Patch Changes

- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 0.7.13 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 0.7.12 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 0.7.11 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 0.7.10 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 0.7.9 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 0.7.8 - 09 January 2025

### Patch Changes

- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 0.7.7 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 0.7.6 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 0.7.5 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 0.7.4 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 0.7.3 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 0.7.2 - 01 August 2024

### Patch Changes

- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 0.7.1 - 25 July 2024

### Patch Changes

- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 0.7.0 - 12 July 2024

### Minor Changes

- 1d2a641: Normalize configuration keys for oauth. `access_token` and
  `accessToken` are now both supported (`access_token` is preferred)

## 0.6.1 - 19 June 2024

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 0.6.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 0.5.5 - 11 June 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 0.5.4 - 21 May 2024

### Patch Changes

- Updated dependencies \[12f02ed5]
  - @openfn/language-common@1.13.4

## 0.5.3 - 08 May 2024

### Patch Changes

- Updated dependencies \[88f99a8f]
  - @openfn/language-common@1.13.3

## 0.5.2 - 08 May 2024

### Patch Changes

- Security updates (lodash,undici)
- Updated dependencies
  - @openfn/language-common@1.13.2

## 0.5.1 - 12 April 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 0.5.0 - 12 April 2024

### Minor Changes

- bae5d3b6: Add the cursor() function from common. See the job writing guide for
  more information.

### Patch Changes

- Updated dependencies \[1ad86651]
  - @openfn/language-common@1.13.0

## 0.4.0 - 20 September 2023

### Minor Changes

- 4cd6587: Add `uploadFile` and `sheetToBuffer` function

### Patch Changes

- Updated dependencies \[c19efbe]
  - @openfn/language-common@1.11.1

## 0.3.5 - 08 September 2023

### Patch Changes

- Updated dependencies \[85c35b8]
  - @openfn/language-common@1.11.0

## 0.3.4 - 18 August 2023

### Patch Changes

- 1c183e9: Fix getFile unit tests

## 0.3.3 - 14 August 2023

### Patch Changes

- b90e8a2: Add support for stream
- Updated dependencies \[df09270]
  - @openfn/language-common@1.10.3

## 0.3.2 - 28 July 2023

### Patch Changes

- 9cc4952: fix url in request util

## 0.3.1 - 27 July 2023

### Patch Changes

- f45f477: Clean-up state before throwing an error

## 0.3.0 - 26 July 2023

### Minor Changes

- 9366e53: - Switch from `nodejs` default `fetch` to `undici` `fetch`
  - Added the following `sharepoint` functions
    - `getDrive()`
    - `getFolder()`
    - `getFile()`

## 0.2.0 - 14 July 2023

### Minor Changes

- d33c0ee: export parseCsv from common

### Patch Changes

- Updated dependencies \[8c32eb3]
  - @openfn/language-common@1.10.1

## 0.1.1 - 30 June 2023

### Patch Changes

- aad9549: Ensure that standard OAuth2 credentials with snake-cased
  "access\_token" keys can be used for OAuth2-reliant adaptors
- Updated dependencies \[aad9549]
  - @openfn/language-common@1.10.0

## 0.1.0 - 23 June 2023

### Minor Changes

- 93d82a8: Add msgraph adaptor with get() and create() functions

### Patch Changes

- Updated dependencies \[111807f]
  - @openfn/language-common@1.9.0
