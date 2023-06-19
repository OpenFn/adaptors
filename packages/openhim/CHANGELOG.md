# @openfn/language-openhim

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

- Updated dependencies [2c1d603]
  - @openfn/language-common@1.8.0

## 0.1.4

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 0.1.3

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.1.2

### Patch Changes

- f2aed32: add examples

## 0.1.1

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 0.1.0

### Minor Changes

- 1fd9b3b: Migrate OpenHIM

### Patch Changes

- e4ebcb6: Fix Large gzip Denial of Service in superagent
- e81561f: Updated ast and package.json
