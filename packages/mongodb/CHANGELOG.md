# @openfn/language-mongodb

## 1.2.0

### Minor Changes

- Update configuration schema for MongoDB adaptor:
  - Rename `clusterUrl` to `clusterHostname`
  - Change `clusterHostname` format from `uri` to `hostname`
  - Update `Adaptor.js` and tests to use new name

  The MongoDB adaptor configuration expects a hostname, not a strict
  URI. The existing configuration prevented a user from saving a 
  "correct" configuration in Lightning, due to the JSON schema verification
  failing. Changing the format of this configuration property to `hostname`
  resolves this issue and justifies a name change of the property.

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
