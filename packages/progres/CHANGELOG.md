# @openfn/language-progres

## 2.0.4 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 2.0.3 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 2.0.2 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 2.0.1 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 2.0.0 - 10 July 2025

### Major Changes

- 87b4f2e: - Migrate from `common.http` to `common.request`.
  - Remove `axios` and `nock` from progres.
  - Remove exportation of `http` from `common`, and the exportation of `axios`.

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 1.4.6 - 15 October 2024

### Patch Changes

- Security fix: update jsonpath-plus version

## 1.4.5 - 09 October 2024

### Patch Changes

- 3fd13c2: Update axios to 1.7.7

## 1.4.4 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 1.4.3 - 01 August 2024

### Patch Changes

- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 1.4.2 - 25 July 2024

### Patch Changes

- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 1.4.1 - 19 June 2024

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 1.4.0 - 13 June 2024

### Minor Changes

- 3d9d564c: Add `fn` and `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 1.3.14 - 11 June 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 1.3.13 - 21 May 2024

### Patch Changes

- Updated dependencies \[12f02ed5]
  - @openfn/language-common@1.13.4

## 1.3.12 - 08 May 2024

### Patch Changes

- Updated dependencies \[88f99a8f]
  - @openfn/language-common@1.13.3

## 1.3.11 - 08 May 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 1.3.10 - 12 April 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 1.3.9 - 12 April 2024

### Patch Changes

- Updated dependencies \[1ad86651]
  - @openfn/language-common@1.13.0

## 1.3.8 - 20 September 2023

### Patch Changes

- Updated dependencies \[c19efbe]
  - @openfn/language-common@1.11.1

## 1.3.7 - 08 September 2023

### Patch Changes

- Updated dependencies \[85c35b8]
  - @openfn/language-common@1.11.0

## 1.3.6 - 14 August 2023

### Patch Changes

- Updated dependencies \[df09270]
  - @openfn/language-common@1.10.3

## 1.3.5 - 14 July 2023

### Patch Changes

- Updated dependencies \[26a303e]
  - @openfn/language-common@1.10.2

## 1.3.4 - 14 July 2023

### Patch Changes

- Updated dependencies \[8c32eb3]
  - @openfn/language-common@1.10.1

## 1.3.3 - 30 June 2023

### Patch Changes

- Updated dependencies \[aad9549]
  - @openfn/language-common@1.10.0

## 1.3.2 - 23 June 2023

### Patch Changes

- Updated dependencies \[111807f]
  - @openfn/language-common@1.9.0

## 1.3.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 1.3.0

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

## 1.2.5 - 31 March 2023

### Patch Changes

- Updated dependencies \[929bca6]
  - @openfn/language-common@1.7.7

## 1.2.4 - 30 March 2023

### Patch Changes

- ef828e7: update old urls in readme
- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 1.2.3 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 1.2.2 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 1.2.1 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 1.2.0 - 18 November 2022

### Minor Changes

- 039ca0b: Migrate Progres

### Patch Changes

- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5
