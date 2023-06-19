# @openfn/language-commcare

## 1.6.0

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
  - @openfn/language-http@4.3.0

## 1.5.6

### Patch Changes

- e0406fa: update dependencies

## 1.5.5

### Patch Changes

- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7
  - @openfn/language-http@4.2.8

## 1.5.4

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
- Updated dependencies [14f481e]
  - @openfn/language-common@1.7.6
  - @openfn/language-http@4.2.7

## 1.5.3

### Patch Changes

- f2aed32: add examples
- Updated dependencies [f2aed32]
  - @openfn/language-http@4.2.5

## 1.5.2

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/
- 57f3513: Fix exports in index.js
- Updated dependencies [6d8de03]
  - @openfn/language-http@4.2.4

## 1.5.1

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5
  - @openfn/language-http@4.2.3

## 1.5.0

### Minor Changes

- 5c050ed: Migrate CommCare

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- 94076b9: update dependency xlsx to ^0.18.0
- ecf5d30: remove sinon since it was not being used
- Updated dependencies [9a2755e]
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-http@4.2.2
  - @openfn/language-common@1.7.4
