# @openfn/language-rapidpro

## 1.0.2

### Patch Changes

- Updated dependencies [111807f]
  - @openfn/language-common@1.9.0

## 1.0.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 1.0.0

### Major Changes

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

## 0.5.6

### Patch Changes

- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 0.5.5

### Patch Changes

- ef828e7: update old urls in readme
- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 0.5.4

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.5.3

### Patch Changes

- f2aed32: add examples

## 0.5.2

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 0.5.1

### Patch Changes

- cbb8968: Fix axios Inefficient Regular Expression Complexity vulnerability

## 0.5.0

### Minor Changes

- 11f83ff: Migrate RapidPro

### Patch Changes

- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5
