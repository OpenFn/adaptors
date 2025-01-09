# @openfn/language-medicmobile

## 0.5.8

### Patch Changes

- Updated dependencies [a47d8d5]
- Updated dependencies [9240428]
  - @openfn/language-common@2.2.0

## 0.5.7

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 0.5.6

### Patch Changes

- Updated dependencies [03a1a74]
  - @openfn/language-common@2.1.0

## 0.5.5

### Patch Changes

- Fixed security vulnerability in jsonpath-plus [33973a2]
  - @openfn/language-common@2.0.3

## 0.5.4

### Patch Changes

- 8d866e4: Update tough-cookie dependency

## 0.5.3

### Patch Changes

- Updated dependencies [77a690f]
  - @openfn/language-common@2.0.2

## 0.5.2

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies [8146c23]
  - @openfn/language-common@2.0.1

## 0.5.1

### Patch Changes

- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 0.5.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 0.4.2

### Patch Changes

- 421fad3: Bump query-string

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

## 0.3.3

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 0.3.2

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.3.1

### Patch Changes

- f2aed32: add examples

## 0.3.0

### Minor Changes

- 2cd3236: migrate medicmobile

### Patch Changes

- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5
