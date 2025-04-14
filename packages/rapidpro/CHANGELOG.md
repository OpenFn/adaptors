# @openfn/language-rapidpro

## 1.1.5 2024 October 15

### Patch Changes

* Security fix: update jsonpath-plus version

## 1.1.4 2024 October 9

### Patch Changes

* 3fd13c2: Update axios to 1.7.7

## 1.1.3 2024 August 16

### Patch Changes

* 8146c23: Fix typings in package.json
* Updated dependencies \[8146c23]
  * @openfn/language-common@2.0.1

## 1.1.2 2024 July 25

### Patch Changes

* Updated dependencies \[4c08444]
* Updated dependencies \[73d0a02]
  * @openfn/language-common@1.15.1

## 1.1.1 2024 June 19

### Patch Changes

* Updated dependencies \[5fb82f07]
  * @openfn/language-common@1.15.0

## 1.1.0 2024 June 13

### Minor Changes

* 73433c20: Add `fnIf` operation

### Patch Changes

* Updated dependencies \[106ecf6d]
  * @openfn/language-common@1.14.0

## 1.0.14 2024 June 11

### Patch Changes

* Updated dependencies
  * @openfn/language-common@1.13.5

## 1.0.13 2024 May 21

### Patch Changes

* Updated dependencies \[12f02ed5]
  * @openfn/language-common@1.13.4

## 1.0.12 2024 May 8

### Patch Changes

* Updated dependencies \[88f99a8f]
  * @openfn/language-common@1.13.3

## 1.0.11 2024 May 8

### Patch Changes

* Updated dependencies
  * @openfn/language-common@1.13.2

## 1.0.10 2024 April 12

### Patch Changes

* Updated dependencies
  * @openfn/language-common@1.13.1

## 1.0.9 2024 April 12

### Patch Changes

* Updated dependencies \[1ad86651]
  * @openfn/language-common@1.13.0

## 1.0.8 2023 September 20

### Patch Changes

* Updated dependencies \[c19efbe]
  * @openfn/language-common@1.11.1

## 1.0.7 2023 September 8

### Patch Changes

* Updated dependencies \[85c35b8]
  * @openfn/language-common@1.11.0

## 1.0.6 2023 August 14

### Patch Changes

* Updated dependencies \[df09270]
  * @openfn/language-common@1.10.3

## 1.0.5 2023 July 14

### Patch Changes

* Updated dependencies \[26a303e]
  * @openfn/language-common@1.10.2

## 1.0.4 2023 July 14

### Patch Changes

* Updated dependencies \[8c32eb3]
  * @openfn/language-common@1.10.1

## 1.0.3 2023 June 30

### Patch Changes

* Updated dependencies \[aad9549]
  * @openfn/language-common@1.10.0

## 1.0.2 2023 June 23

### Patch Changes

* Updated dependencies \[111807f]
  * @openfn/language-common@1.9.0

## 1.0.1 2023 June 19

### Patch Changes

* Update lock files
* Updated dependencies
  * @openfn/language-common@1.8.1

## 1.0.0

### Major Changes

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

## 0.5.6 2023 March 31

### Patch Changes

* Updated dependencies \[929bca6]
  * @openfn/language-common@1.7.7

## 0.5.5 2023 March 30

### Patch Changes

* ef828e7: update old urls in readme
* 14f481e: mark execute as private
* Updated dependencies \[2b4c61a]
  * @openfn/language-common@1.7.6

## 0.5.4 2023 February 15

### Patch Changes

* f7ebd3c: remove sample configuration

## 0.5.3 2023 February 15

### Patch Changes

* f2aed32: add examples

## 0.5.2 2023 January 13

### Patch Changes

* 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 0.5.1 2022 November 25

### Patch Changes

* cbb8968: Fix axios Inefficient Regular Expression Complexity vulnerability

## 0.5.0 2022 November 18

### Minor Changes

* 11f83ff: Migrate RapidPro

### Patch Changes

* Updated dependencies \[f2a91a4]
  * @openfn/language-common@1.7.5
