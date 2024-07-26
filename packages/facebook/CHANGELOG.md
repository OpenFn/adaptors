# @openfn/language-facebook

## 0.4.1

### Patch Changes

- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 0.4.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 0.3.3

### Patch Changes

- d5a326f5: Add example `access_token` in the `configuration-schema`

## 0.3.2

### Patch Changes

- aad9549: Ensure that standard OAuth2 credentials with snake-cased
  "access_token" keys can be used for OAuth2-reliant adaptors
- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0

## 0.3.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 0.3.0

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

## 0.2.3

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 0.2.2

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.2.1

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 0.2.0

### Minor Changes

- f7669d2: migrate facebook
