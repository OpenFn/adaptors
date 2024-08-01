# @openfn/language-nexmo

## 0.5.3

### Patch Changes

- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 0.5.2

### Patch Changes

- Updated dependencies [4c08444]
- Updated dependencies [73d0a02]
  - @openfn/language-common@1.15.1

## 0.5.1

### Patch Changes

- Updated dependencies [5fb82f07]
  - @openfn/language-common@1.15.0

## 0.5.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 0.4.9

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 0.4.8

### Patch Changes

- Updated dependencies [12f02ed5]
  - @openfn/language-common@1.13.4

## 0.4.7

### Patch Changes

- Updated dependencies [88f99a8f]
  - @openfn/language-common@1.13.3

## 0.4.6

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 0.4.5

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 0.4.4

### Patch Changes

- Updated dependencies [1ad86651]
  - @openfn/language-common@1.13.0

## 0.4.3

### Patch Changes

- Updated dependencies [c19efbe]
  - @openfn/language-common@1.11.1

## 0.4.2

### Patch Changes

- Updated dependencies [85c35b8]
  - @openfn/language-common@1.11.0

## 0.4.1

### Patch Changes

- Updated dependencies [df09270]
  - @openfn/language-common@1.10.3

## 0.4.0

### Minor Changes

- 8591b67: - update nexmo to `v2.9.1``
  - expandReferences on sendSMS

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

- f2aed32: add examples

## 0.2.0

### Minor Changes

- f0f2495: migrate nexmo
