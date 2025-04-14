# @openfn/language-magpi

## 1.2.4 2024 October 28

### Patch Changes

* Updated docs for each()
* Updated dependencies
  * @openfn/language-common@2.1.1

## 1.2.3 2024 October 9

### Patch Changes

* 8d866e4: Update tough-cookie dependency

## 1.2.2 2024 August 16

### Patch Changes

* 8146c23: Fix typings in package.json
* Updated dependencies \[8146c23]
  * @openfn/language-common@2.0.1

## 1.2.1 2024 August 1

### Patch Changes

* Updated dependencies \[4fe527c]
  * @openfn/language-common@2.0.0

## 1.2.0 2024 June 13

### Minor Changes

* 73433c20: Add `fnIf` operation

### Patch Changes

* Updated dependencies \[106ecf6d]
  * @openfn/language-common@1.14.0

## 1.1.2 2024 January 24

### Patch Changes

* 6afba70: Fix variable reference in submitRecord

## 1.1.1 2023 June 19

### Patch Changes

* Update lock files
* Updated dependencies
  * @openfn/language-common@1.8.1

## 1.1.0

### Minor Changes

* 2c1d603: Remove parameter reassignment to ensure proper functioning inside an
  `each` block; add eslint

  The packages receiving a major bump here exposed functions that didn't work as
  expected inside `each` blocks. Users were previously wrapping these functions
  inside their own custom `fn` blocks, and this change will ensure that they can
  be used inside a standard each.

  See https://github.com/OpenFn/adaptors/issues/275 for more details.

### Patch Changes

* Updated dependencies \[2c1d603]
  * @openfn/language-common@1.8.0

## 1.0.5 2023 April 20

### Patch Changes

* 86fb813: dependencies update

## 1.0.4 2023 March 30

### Patch Changes

* 14f481e: mark execute as private
* Updated dependencies \[2b4c61a]
  * @openfn/language-common@1.7.6

## 1.0.3 2023 February 15

### Patch Changes

* f7ebd3c: remove sample configuration

## 1.0.2 2023 February 15

### Patch Changes

* f2aed32: add examples

## 1.0.1 2023 January 13

### Patch Changes

* 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 1.0.0 2022 November 25

### Major Changes

* e6c2b4a: Update xml2js parser

### Minor Changes

* df5dd2e: migrate magpi
