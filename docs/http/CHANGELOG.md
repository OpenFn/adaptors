# @openfn/language-http

## 4.3.3

### Patch Changes

- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0

## 4.3.2

### Patch Changes

- Updated dependencies [111807f]
  - @openfn/language-common@1.9.0

## 4.3.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 4.3.0

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

## 4.2.8

### Patch Changes

- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 4.2.7

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 4.2.6

### Patch Changes

- f7ebd3c: remove sample configuration

## 4.2.5

### Patch Changes

- f2aed32: add examples

## 4.2.4

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 4.2.3

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 4.2.2

### Patch Changes

- 9a2755e: Update dependency on language-common
- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-common@1.7.4

## 4.2.1

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions

## 4.2.0

### Minor Changes

- f670bf8: Added credential schema to enable new ui

## 4.1.0

### Minor Changes

- 8e1b86d: update http to new format

## 4.0.1

### Patch Changes

- 4671e89: Migrate language-http
