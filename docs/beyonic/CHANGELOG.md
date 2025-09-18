# @openfn/language-beyonic

## 0.3.20 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 0.3.19 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 0.3.18 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 0.3.17 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 0.3.16 - 10 July 2025

### Patch Changes

- c4625fa: - Migrate from the deprecated `expandReferences` in `common` to the
  new `expandReferences` from common.util
  - Use `workspace:*` common version.
- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 0.3.15 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 0.3.14 - 22 April 2025

### Patch Changes

- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 0.3.13 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 0.3.12 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 0.3.11 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 0.3.10 - 10 March 2025

### Patch Changes

- 8a8c28d: - cleanup examples wrapped with `execute()` function
  - Add example caption and add sample payload

## 0.3.9 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 0.3.8 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 0.3.7 - 09 January 2025

### Patch Changes

- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 0.3.6 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 0.3.5 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 0.3.4 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 0.3.3 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 0.3.2 - 01 August 2024

### Patch Changes

- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 0.3.1 - 25 July 2024

### Patch Changes

- 73d0a02: Make documentation public
- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

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

## 0.1.9 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 0.1.8 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.1.7 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 0.1.6 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 0.1.5 - 11 November 2022

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5

## 0.1.4 - 04 November 2022

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies \[8566b26]
- Updated dependencies \[b3d45ff]
- Updated dependencies \[b5eb665]
- Updated dependencies \[ecf5d30]
  - @openfn/language-common@1.7.4

## 0.1.3 - 25 October 2022

### Patch Changes

- 63080d0: Update common for build

## 0.1.2 - 25 October 2022

### Patch Changes

- 0d358b6: Add ast.json for beyonic

## 0.1.1 - 25 October 2022

### Patch Changes

- 06ff25f: Update superagent to v8

## 0.1.0 - 21 October 2022

### Minor Changes

- 28ceb1f: Moving language-beyonic to adaptors/packages/beyonic

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions
