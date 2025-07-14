# @openfn/language-twilio

## 0.5.5 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 0.5.4 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 0.5.3 - 10 July 2025

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 0.5.2 - 15 October 2024

### Patch Changes

- Security fix: update jsonpath-plus version

## 0.5.1 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 0.5.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 0.4.2 - 24 January 2024

### Patch Changes

- 6afba70: Fix sendSMS

## 0.4.1 - 19 June 2023

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

- Updated dependencies \[2c1d603]
  - @openfn/language-common@1.8.0

## 0.3.4 - 06 April 2023

### Patch Changes

- a22daa6: rename credential-schema to configuration-schemawq

## 0.3.3 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 0.3.2 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.3.1 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 0.3.0 - 18 November 2022

### Minor Changes

- a36a072: ymigrated twilio to monorepo

### Patch Changes

- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5
