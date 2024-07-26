# @openfn/language-openfn

## 2.0.0

### Major Changes

- Export new common http helpers (http namespace)

## 1.4.3

### Patch Changes

- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 1.4.2

### Patch Changes

- Updated dependencies [4c08444]
- Updated dependencies [73d0a02]
  - @openfn/language-common@1.15.1

## 1.4.1

### Patch Changes

- Updated dependencies [5fb82f07]
  - @openfn/language-common@1.15.0

## 1.4.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 1.3.14

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 1.3.13

### Patch Changes

- Updated dependencies [12f02ed5]
  - @openfn/language-common@1.13.4

## 1.3.12

### Patch Changes

- Updated dependencies [88f99a8f]
  - @openfn/language-common@1.13.3

## 1.3.11

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 1.3.10

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 1.3.9

### Patch Changes

- Updated dependencies [1ad86651]
  - @openfn/language-common@1.13.0

## 1.3.8

### Patch Changes

- Updated dependencies [c19efbe]
  - @openfn/language-common@1.11.1

## 1.3.7

### Patch Changes

- Updated dependencies [85c35b8]
  - @openfn/language-common@1.11.0

## 1.3.6

### Patch Changes

- Updated dependencies [df09270]
  - @openfn/language-common@1.10.3

## 1.3.5

### Patch Changes

- Updated dependencies [26a303e]
  - @openfn/language-common@1.10.2

## 1.3.4

### Patch Changes

- Updated dependencies [8c32eb3]
  - @openfn/language-common@1.10.1

## 1.3.3

### Patch Changes

- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0

## 1.3.2

### Patch Changes

- Updated dependencies [111807f]
  - @openfn/language-common@1.9.0

## 1.3.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 1.3.0

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

## 1.2.6

### Patch Changes

- 779596f: Use native fetch (undici) in template and add icons in openfn

## 1.2.5

### Patch Changes

- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 1.2.4

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 1.2.3

### Patch Changes

- f7ebd3c: remove sample configuration

## 1.2.2

### Patch Changes

- f2aed32: add examples

## 1.2.1

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 1.2.0

### Minor Changes

- be9d3c6: Migrate OpenFn
