# @openfn/language-dynamics

## 0.5.14 2025 April 11

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 0.5.13 2025 March 14

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 0.5.12 2025 January 16

### Patch Changes

* Updated dependencies \[b3d7f59]
* Updated dependencies \[2d709ff]
* Updated dependencies \[41e8cc3]
  * @openfn/language-common@2.3.0

## 0.5.11 2025 January 16

### Patch Changes

* Updated dependencies \[6dffdbd]
  * @openfn/language-common@2.2.1

## 0.5.10 2025 January 9

### Patch Changes

* Updated dependencies \[a47d8d5]
* Updated dependencies \[9240428]
  * @openfn/language-common@2.2.0

## 0.5.9 2024 October 28

### Patch Changes

* Updated docs for each()
* Updated dependencies
  * @openfn/language-common@2.1.1

## 0.5.8 2024 October 18

### Patch Changes

* Updated dependencies \[03a1a74]
  * @openfn/language-common@2.1.0

## 0.5.7 2024 October 15

### Patch Changes

* Fixed security vulnerability in jsonpath-plus \[33973a2]
  * @openfn/language-common@2.0.3

## 0.5.6 2024 October 9

### Patch Changes

* 8d866e4: Update tough-cookie dependency

## 0.5.5 2024 September 24

### Patch Changes

* Updated dependencies \[77a690f]
  * @openfn/language-common@2.0.2

## 0.5.4 2024 August 16

### Patch Changes

* 8146c23: Fix typings in package.json
* Updated dependencies \[8146c23]
  * @openfn/language-common@2.0.1

## 0.5.3 2024 August 1

### Patch Changes

* Updated dependencies \[4fe527c]
  * @openfn/language-common@2.0.0

## 0.5.2 2024 July 25

### Patch Changes

* Updated dependencies \[4c08444]
* Updated dependencies \[73d0a02]
  * @openfn/language-common@1.15.1

## 0.5.1 2024 June 19

### Patch Changes

* Updated dependencies \[5fb82f07]
  * @openfn/language-common@1.15.0

## 0.5.0 2024 June 13

### Minor Changes

* 73433c20: Add `fnIf` operation

### Patch Changes

* Updated dependencies \[106ecf6d]
  * @openfn/language-common@1.14.0

## 0.4.14 2024 June 11

### Patch Changes

* Updated dependencies
  * @openfn/language-common@1.13.5

## 0.4.13 2024 May 21

### Patch Changes

* Updated dependencies \[12f02ed5]
  * @openfn/language-common@1.13.4

## 0.4.12 2024 May 8

### Patch Changes

* Updated dependencies \[88f99a8f]
  * @openfn/language-common@1.13.3

## 0.4.11 2024 May 8

### Patch Changes

* Updated dependencies
  * @openfn/language-common@1.13.2

## 0.4.10 2024 April 12

### Patch Changes

* Updated dependencies
  * @openfn/language-common@1.13.1

## 0.4.9 2024 April 12

### Patch Changes

* Updated dependencies \[1ad86651]
  * @openfn/language-common@1.13.0

## 0.4.8 2023 September 20

### Patch Changes

* Updated dependencies \[c19efbe]
  * @openfn/language-common@1.11.1

## 0.4.7 2023 September 8

### Patch Changes

* Updated dependencies \[85c35b8]
  * @openfn/language-common@1.11.0

## 0.4.6 2023 August 14

### Patch Changes

* Updated dependencies \[df09270]
  * @openfn/language-common@1.10.3

## 0.4.5 2023 July 14

### Patch Changes

* Updated dependencies \[26a303e]
  * @openfn/language-common@1.10.2

## 0.4.4 2023 July 14

### Patch Changes

* Updated dependencies \[8c32eb3]
  * @openfn/language-common@1.10.1

## 0.4.3 2023 June 30

### Patch Changes

* aad9549: Ensure that standard OAuth2 credentials with snake-cased
  "access\_token" keys can be used for OAuth2-reliant adaptors
* Updated dependencies \[aad9549]
  * @openfn/language-common@1.10.0

## 0.4.2 2023 June 23

### Patch Changes

* Updated dependencies \[111807f]
  * @openfn/language-common@1.9.0

## 0.4.1 2023 June 19

### Patch Changes

* Update lock files
* Updated dependencies
  * @openfn/language-common@1.8.1

## 0.4.0

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

## 0.3.5 2023 March 31

### Patch Changes

* Updated dependencies \[929bca6]
  * @openfn/language-common@1.7.7

## 0.3.4 2023 March 30

### Patch Changes

* 14f481e: mark execute as private
* Updated dependencies \[2b4c61a]
  * @openfn/language-common@1.7.6

## 0.3.3 2023 February 15

### Patch Changes

* f7ebd3c: remove sample configuration

## 0.3.2 2023 February 15

### Patch Changes

* f2aed32: add examples

## 0.3.1 2023 January 13

### Patch Changes

* 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 0.3.0 2022 November 25

### Minor Changes

* b032b9c: Migrate Dynamics

### Patch Changes

* e81561f: Updated ast and package.json
