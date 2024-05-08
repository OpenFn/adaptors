# @openfn/language-dynamics

## 0.4.11

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 0.4.10

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 0.4.9

### Patch Changes

- Updated dependencies [1ad86651]
  - @openfn/language-common@1.13.0

## 0.4.8

### Patch Changes

- Updated dependencies [c19efbe]
  - @openfn/language-common@1.11.1

## 0.4.7

### Patch Changes

- Updated dependencies [85c35b8]
  - @openfn/language-common@1.11.0

## 0.4.6

### Patch Changes

- Updated dependencies [df09270]
  - @openfn/language-common@1.10.3

## 0.4.5

### Patch Changes

- Updated dependencies [26a303e]
  - @openfn/language-common@1.10.2

## 0.4.4

### Patch Changes

- Updated dependencies [8c32eb3]
  - @openfn/language-common@1.10.1

## 0.4.3

### Patch Changes

- aad9549: Ensure that standard OAuth2 credentials with snake-cased
  "access_token" keys can be used for OAuth2-reliant adaptors
- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0

## 0.4.2

### Patch Changes

- Updated dependencies [111807f]
  - @openfn/language-common@1.9.0

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

## 0.3.5

### Patch Changes

- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 0.3.4

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

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

- b032b9c: Migrate Dynamics

### Patch Changes

- e81561f: Updated ast and package.json
