# @openfn/language-bigquery

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
