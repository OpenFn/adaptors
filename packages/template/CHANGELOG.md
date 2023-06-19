# @openfn/language-template

## 3.0.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 3.0.0

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

## 2.0.0

### Major Changes

- 779596f: Use native fetch (undici) in template and add icons in openfn

### Minor Changes

- 1af9cd5: Better docs and resource names

## 1.7.8

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 1.7.7

### Patch Changes

- f7ebd3c: remove sample configuration

## 1.7.6

### Patch Changes

- f2aed32: add examples

## 1.7.5

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 1.7.4

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 1.7.3

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- b5eb665: Adjusted docs for common and built to markdown
- ecf5d30: remove sinon since it was not being used
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-common@1.7.4

## 1.7.2

### Patch Changes

- f4b3dd6: remove travis build url

## 1.7.1

### Patch Changes

- Fixed package.json for template adaptor

## 1.7.0

### Minor Changes

- 554e905: Migrated to monorepo
