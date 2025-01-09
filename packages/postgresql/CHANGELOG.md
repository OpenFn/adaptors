# @openfn/language-postgresql

## 6.0.6

### Patch Changes

- Updated dependencies [a47d8d5]
- Updated dependencies [9240428]
  - @openfn/language-common@2.2.0

## 6.0.5

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 6.0.4

### Patch Changes

- Updated dependencies [03a1a74]
  - @openfn/language-common@2.1.0

## 6.0.3

### Patch Changes

- Fixed security vulnerability in jsonpath-plus [33973a2]
  - @openfn/language-common@2.0.3

## 6.0.2

### Patch Changes

- Updated dependencies [77a690f]
  - @openfn/language-common@2.0.2

## 6.0.1

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies [8146c23]
  - @openfn/language-common@2.0.1

## 6.0.0

### Major Changes

- Export new common http helpers (http namespace)

## 5.0.2

### Patch Changes

- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 5.0.1

### Patch Changes

- Updated dependencies [4c08444]
- Updated dependencies [73d0a02]
  - @openfn/language-common@1.15.1

## 5.0.0

### Major Changes

- 6a4081b8: - Update all operations to use util `expandReferences`
  - Add `findValue` result to state

### Minor Changes

- 5fb82f07: Export `group` operation from common

### Patch Changes

- Updated dependencies [5fb82f07]
  - @openfn/language-common@1.15.0

## 4.2.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 4.1.15

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 4.1.14

### Patch Changes

- Updated dependencies [12f02ed5]
  - @openfn/language-common@1.13.4

## 4.1.13

### Patch Changes

- Updated dependencies [88f99a8f]
  - @openfn/language-common@1.13.3

## 4.1.12

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 4.1.11

### Patch Changes

- 02ab7a89: - Change `host` format from `uri or ipv4` to `string` in
  `configuration-schema.json`
  - Update required list to include `user`, `password` and `database`

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

## 4.0.0

### Major Changes

- ecd0b53: add optional callback in sql and update response structure

## 3.4.6

### Patch Changes

- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 3.4.5

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 3.4.4

### Patch Changes

- f2aed32: add examples

## 3.4.3

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 3.4.2

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 3.4.1

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-common@1.7.4

## 3.4.0

### Minor Changes

- 44ae341: Migrate postgresql

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions
