# @openfn/language-kobotoolbox

## 2.4.1

### Patch Changes

- 73d0a02: Make documentation public
- Updated dependencies [4c08444]
- Updated dependencies [73d0a02]
  - @openfn/language-common@1.15.1

## 2.4.0

### Minor Changes

- 5fb82f07: Export `group` operation from common

### Patch Changes

- Updated dependencies [5fb82f07]
  - @openfn/language-common@1.15.0

## 2.3.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 2.2.0

### Minor Changes

- bae5d3b6: Add the cursor() function from common. See the job writing guide for
  more information.

### Patch Changes

- Updated dependencies [1ad86651]
  - @openfn/language-common@1.13.0

## 2.1.0

### Minor Changes

- c85abf3: Removed the API version enum values in the credential configuration
  json schema and added a placeholder

## 2.0.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 2.0.0

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

## 1.3.3

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 1.3.2

### Patch Changes

- f7ebd3c: remove sample configuration

## 1.3.1

### Patch Changes

- f2aed32: add examples

## 1.3.0

### Minor Changes

- e48c30c: add getDeploymentInfo function

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 1.2.0

### Minor Changes

- 7b5ca3e: add fn and fix adaptors export

### Patch Changes

- 4067c28: build ast file
- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 1.1.0

### Minor Changes

- 7fc47d8: Migrate kobotoolbox

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-common@1.7.4
