v0.1.6

## 0.5.1

### Patch Changes

- 73d0a02: Make documentation public
- Updated dependencies [4c08444]
- Updated dependencies [73d0a02]
  - @openfn/language-common@1.15.1

## 0.5.0

### Minor Changes

- 3d9d564c: Add `fn` and `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 0.4.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 0.4.0

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

## 0.3.4

### Patch Changes

- 7cc8efc: remove FakeAdaptor references

## 0.3.3

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.3.2

### Patch Changes

- f2aed32: add examples

## 0.3.1

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 0.3.0

### Minor Changes

- # c6056e8: migrate mogli

* State gets cleaned up after the operations are finished. This means that the
  final state is serializable.

  The JSForce connection object is provided by `createConnection`, and in turn
  `execute` ensures it is run before the user's operations.

  The `cleanupState` reducer simply deletes the connection key from state.

# v0.1.3

- Bumped language-common dependency to v0.0.4.
