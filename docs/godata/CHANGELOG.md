# @openfn/language-godata

## 3.5.2

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies [8146c23]
  - @openfn/language-common@2.0.1

## 3.5.1

### Patch Changes

- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 3.5.0

### Minor Changes

- 3d9d564c: Add `fn` and `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 3.4.0

### Minor Changes

- df4cfca: Switch from `'writeOnly: true'` to `'format: email'` in the godata
  configuration schema.

## 3.3.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 3.3.0

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

## 3.2.4

### Patch Changes

- ef828e7: update old urls in readme
- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 3.2.3

### Patch Changes

- f7ebd3c: remove sample configuration

## 3.2.2

### Patch Changes

- f2aed32: add examples

## 3.2.1

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 3.2.0

### Minor Changes

- 8e7a79e: Migrate Godata

### Patch Changes

- cbb8968: Fix axios Inefficient Regular Expression Complexity vulnerability
- e81561f: Updated ast and package.json
