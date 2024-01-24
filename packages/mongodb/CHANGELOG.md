# @openfn/language-mongodb

## 2.0.1

### Patch Changes

- 6afba70: Fix findDocuments

## 2.0.0

### Major Changes

- Update configuration schema for MongoDB adaptor:
  - Rename `clusterUrl` to `clusterHostname`
  - Change `clusterHostname` format from `uri` to `hostname`
  - Update `Adaptor.js` and tests to use new name

## 1.1.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 1.1.0

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

## 1.0.6

### Patch Changes

- f7ebd3c: remove sample configuration

## 1.0.5

### Patch Changes

- f2aed32: add examples
