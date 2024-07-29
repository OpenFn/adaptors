# @openfn/language-surveycto

## 2.2.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 2.1.1

### Patch Changes

- 6c588212: Fix `servername` typo in the `configuration-schema`

## 2.1.0

### Minor Changes

- b67f81be: Add a `cursor()` function which adds support for the surveyCTO
  string format dates.

  The date option in `fetchSubmissions` can now accept a surveyCTO date, an
  epoch or unix timestamp, or basically anything you can pass into new Date().

  Internally, any date you pass into `cursor` will be converted into a
  human-readable surveyCTO format in UTC time.

### Patch Changes

- Updated dependencies [88f99a8f]
  - @openfn/language-common@1.13.3

## 2.0.0

### Major Changes

- 59ae7b50: - Refactor `fetchSubmissions()` function
  - Update `instanceName` to `servername` in `configuration-schema.json`
  - Add `apiVersion` in `configuration-schema.json`. Defaults to `v1`
  - Add `request()` function for surveyCTO API requests

## 1.2.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 1.2.0

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

## 1.1.4

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 1.1.3

### Patch Changes

- f7ebd3c: remove sample configuration

## 1.1.2

### Patch Changes

- f2aed32: add examples

## 1.1.1

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 1.1.0

### Minor Changes

- 776bb13: migrate surveycto

### Patch Changes

- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5
