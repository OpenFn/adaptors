# @openfn/language-openhim

## 2.0.2 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 2.0.1 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 2.0.0 - 11 August 2025

### Major Changes

- abfce90: Change `registerClient()` to `createClient()`. Remove
  `updateClient()`

## 1.0.0 - 14 July 2025

### Major Changes

- 08b6f7b: - Implement `http` namespace with `GET`, `POST`, `PUT`, and `DELETE`
  - Add `client, tasks, transactions, and channels` functions

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 0.3.16 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 0.3.15 - 10 July 2025

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 0.3.14 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 0.3.13 - 22 April 2025

### Patch Changes

- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 0.3.12 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 0.3.11 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 0.3.10 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 0.3.9 - 10 March 2025

### Patch Changes

- 8a8c28d: - cleanup examples wrapped with `execute()` function
  - Add example caption and add sample payload

## 0.3.8 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 0.3.7 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 0.3.6 - 09 January 2025

### Patch Changes

- cb9b3c5: Security update
- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 0.3.5 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 0.3.4 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 0.3.3 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 0.3.2 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 0.3.1 - 01 August 2024

### Patch Changes

- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 0.3.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 0.2.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 0.2.0

### Minor Changes

- 2c1d603: Remove parameter reassignment to ensure proper functioning inside an
  `each` block; add eslint

  The packages receiving a major bump here exposed functions that didn't work as
  expected inside `each` blocks. Users were previously wrapping these functions
  inside their own custom `fn` blocks, and this change will ensure that they can
  be used inside a standard each.

  See https://github.com/OpenFn/adaptors/issues/275 for more details.

### Patch Changes

- Updated dependencies \[2c1d603]
  - @openfn/language-common@1.8.0

## 0.1.4 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 0.1.3 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.1.2 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 0.1.1 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 0.1.0 - 25 November 2022

### Minor Changes

- 1fd9b3b: Migrate OpenHIM

### Patch Changes

- e4ebcb6: Fix Large gzip Denial of Service in superagent
- e81561f: Updated ast and package.json
