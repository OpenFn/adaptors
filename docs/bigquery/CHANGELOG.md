# @openfn/language-bigquery

## 2.1.1

### Patch Changes

- Updated dependencies [5fb82f07]
  - @openfn/language-common@1.15.0

## 2.1.0

### Minor Changes

- 3d9d564c: Add `fn` and `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 2.0.10

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 2.0.9

### Patch Changes

- Updated dependencies [12f02ed5]
  - @openfn/language-common@1.13.4

## 2.0.8

### Patch Changes

- Updated dependencies [88f99a8f]
  - @openfn/language-common@1.13.3

## 2.0.7

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 2.0.6

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 2.0.5

### Patch Changes

- Updated dependencies [1ad86651]
  - @openfn/language-common@1.13.0

## 2.0.4

### Patch Changes

- Updated dependencies [c19efbe]
  - @openfn/language-common@1.11.1

## 2.0.3

### Patch Changes

- Updated dependencies [85c35b8]
  - @openfn/language-common@1.11.0

## 2.0.2

### Patch Changes

- Updated dependencies [df09270]
  - @openfn/language-common@1.10.3

## 2.0.1

### Patch Changes

- Updated dependencies [26a303e]
  - @openfn/language-common@1.10.2

## 2.0.0

### Major Changes

- 0b6f20b: use parseCsv from common

### Patch Changes

- Updated dependencies [8c32eb3]
  - @openfn/language-common@1.10.1

## 1.2.3

### Patch Changes

- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0

## 1.2.2

### Patch Changes

- Updated dependencies [111807f]
  - @openfn/language-common@1.9.0

## 1.2.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 1.2.0

### Minor Changes

- 2c1d603: Remove parameter reassignment to ensure proper functioning inside an
  `each` block; add eslint

  The packages receiving a major bump here exposed functions that didn't work as
  expected inside `each` blocks. Users were previously wrapping these functions
  inside their own custom `fn` blocks, and this change will ensure that they can
  be used inside a standard each.

  See https://github.com/OpenFn/adaptors/issues/275 for more details.

### Patch Changes

- Updated dependencies [2c1d603]
  - @openfn/language-common@1.8.0

## 1.1.5

### Patch Changes

- 5895eb9: update dependencies

## 1.1.4

### Patch Changes

- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 1.1.3

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 1.1.2

### Patch Changes

- f2aed32: add examples

## 1.1.1

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/
- 57f3513: Fix exports in index.js

## 1.1.0

### Minor Changes

- e4c6114: bigquery migration and build

### Patch Changes

- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5
