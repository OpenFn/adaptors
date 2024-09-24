# @openfn/language-telerivet

## 0.3.3

### Patch Changes

- Updated dependencies [77a690f]
  - @openfn/language-common@2.0.2

## 0.3.2

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies [8146c23]
  - @openfn/language-common@2.0.1

## 0.3.1

### Patch Changes

- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 0.3.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 0.2.1

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

- e4ebcb6: Fix Large gzip Denial of Service in superagent

## 0.1.0

### Minor Changes

- 83ede44: migrate telerivet

### Patch Changes

- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5
