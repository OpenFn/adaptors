# @openfn/language-mssql

## 4.3.2

### Patch Changes

- bb5436c: Add title and description for `port` configuration

## 4.3.1

### Patch Changes

- Updated dependencies [5fb82f07]
  - @openfn/language-common@1.15.0

## 4.3.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 4.2.4

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 4.2.3

### Patch Changes

- Updated dependencies [12f02ed5]
  - @openfn/language-common@1.13.4

## 4.2.2

### Patch Changes

- Updated dependencies [88f99a8f]
  - @openfn/language-common@1.13.3

## 4.2.1

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 4.2.0

### Minor Changes

- 2964fc8d: - Add `cursor()` function
  - Update `configuration-schema.json`

## 4.1.10

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 4.1.9

### Patch Changes

- Updated dependencies [1ad86651]
  - @openfn/language-common@1.13.0

## 4.1.8

### Patch Changes

- Updated dependencies [c19efbe]
  - @openfn/language-common@1.11.1

## 4.1.7

### Patch Changes

- Updated dependencies [85c35b8]
  - @openfn/language-common@1.11.0

## 4.1.6

### Patch Changes

- Updated dependencies [df09270]
  - @openfn/language-common@1.10.3

## 4.1.5

### Patch Changes

- Updated dependencies [26a303e]
  - @openfn/language-common@1.10.2

## 4.1.4

### Patch Changes

- Updated dependencies [8c32eb3]
  - @openfn/language-common@1.10.1

## 4.1.3

### Patch Changes

- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0

## 4.1.2

### Patch Changes

- Updated dependencies [111807f]
  - @openfn/language-common@1.9.0

## 4.1.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 4.1.0

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

## 4.0.8

### Patch Changes

- 57742d1: remove request dependency

## 4.0.7

### Patch Changes

- 04ed74f: update dependencies

## 4.0.6

### Patch Changes

- 43c3669: patch versions

## 4.0.5

### Patch Changes

- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 4.0.4

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 4.0.3

### Patch Changes

- f7ebd3c: remove sample configuration

## 4.0.2

### Patch Changes

- f2aed32: add examples

## 4.0.1

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 4.0.0

### Major Changes

- 3878624: Modify composeNextState function, to flattern all rows into an array
  of rows with their corresponding column names

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 3.1.1

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-common@1.7.4

## 3.1.0

### Minor Changes

- c9b7ed7: Add language-mssql in monorepo

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions
