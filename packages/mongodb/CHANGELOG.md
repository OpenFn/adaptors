# @openfn/language-mongodb

## 2.1.12 2025 April 11

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 2.1.11 2025 March 14

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 2.1.10 2025 January 16

### Patch Changes

* Updated dependencies \[b3d7f59]
* Updated dependencies \[2d709ff]
* Updated dependencies \[41e8cc3]
  * @openfn/language-common@2.3.0

## 2.1.9 2025 January 16

### Patch Changes

* Updated dependencies \[6dffdbd]
  * @openfn/language-common@2.2.1

## 2.1.8 2025 January 9

### Patch Changes

* Updated dependencies \[a47d8d5]
* Updated dependencies \[9240428]
  * @openfn/language-common@2.2.0

## 2.1.7 2024 October 28

### Patch Changes

* Updated docs for each()
* Updated dependencies
  * @openfn/language-common@2.1.1

## 2.1.6 2024 October 18

### Patch Changes

* Updated dependencies \[03a1a74]
  * @openfn/language-common@2.1.0

## 2.1.5 2024 October 15

### Patch Changes

* Fixed security vulnerability in jsonpath-plus \[33973a2]
  * @openfn/language-common@2.0.3

## 2.1.4 2024 September 24

### Patch Changes

* Updated dependencies \[77a690f]
  * @openfn/language-common@2.0.2

## 2.1.3 2024 August 16

### Patch Changes

* 8146c23: Fix typings in package.json
* Updated dependencies \[8146c23]
  * @openfn/language-common@2.0.1

## 2.1.2 2024 August 1

### Patch Changes

* Updated dependencies \[4fe527c]
  * @openfn/language-common@2.0.0

## 2.1.1 2024 July 25

### Patch Changes

* 73d0a02: Make documentation public
* Updated dependencies \[4c08444]
* Updated dependencies \[73d0a02]
  * @openfn/language-common@1.15.1

## 2.1.0 2024 June 13

### Minor Changes

* 73433c20: Add `fnIf` operation

### Patch Changes

* Updated dependencies \[106ecf6d]
  * @openfn/language-common@1.14.0

## 2.0.2 2024 April 24

### Patch Changes

* 38b3e8e0: Change `clusterHostname` format from `hostname` to `string` in
  `configuration-schema.json`

## 2.0.1 2024 January 24

### Patch Changes

* 6afba70: Fix findDocuments

## 2.0.0 2023 August 22

### Major Changes

* Update configuration schema for MongoDB adaptor:
  * Rename `clusterUrl` to `clusterHostname`
  * Change `clusterHostname` format from `uri` to `hostname`
  * Update `Adaptor.js` and tests to use new name

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

## 1.0.6 2023 February 15

### Patch Changes

* f7ebd3c: remove sample configuration

## 1.0.5 2023 February 15

### Patch Changes

* f2aed32: add examples
