v0.1.6

## 0.5.13 - 11 April 2025

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 0.5.12 - 14 March 2025

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 0.5.11 - 16 January 2025

### Patch Changes

* Updated dependencies \[b3d7f59]
* Updated dependencies \[2d709ff]
* Updated dependencies \[41e8cc3]
  * @openfn/language-common@2.3.0

## 0.5.10 - 16 January 2025

### Patch Changes

* Updated dependencies \[6dffdbd]
  * @openfn/language-common@2.2.1

## 0.5.9 - 09 January 2025

### Patch Changes

* Updated dependencies \[a47d8d5]
* Updated dependencies \[9240428]
  * @openfn/language-common@2.2.0

## 0.5.8 - 28 October 2024

### Patch Changes

* Updated docs for each()
* Updated dependencies
  * @openfn/language-common@2.1.1

## 0.5.7 - 18 October 2024

### Patch Changes

* Updated dependencies \[03a1a74]
  * @openfn/language-common@2.1.0

## 0.5.6 - 15 October 2024

### Patch Changes

* Fixed security vulnerability in jsonpath-plus \[33973a2]
  * @openfn/language-common@2.0.3

## 0.5.5 - 09 October 2024

### Patch Changes

* 8d866e4: Update tough-cookie dependency

## 0.5.4 - 24 September 2024

### Patch Changes

* Updated dependencies \[77a690f]
  * @openfn/language-common@2.0.2

## 0.5.3 - 16 August 2024

### Patch Changes

* 8146c23: Fix typings in package.json
* Updated dependencies \[8146c23]
  * @openfn/language-common@2.0.1

## 0.5.2 - 01 August 2024

### Patch Changes

* Updated dependencies \[4fe527c]
  * @openfn/language-common@2.0.0

## 0.5.1 - 25 July 2024

### Patch Changes

* 73d0a02: Make documentation public
* Updated dependencies \[4c08444]
* Updated dependencies \[73d0a02]
  * @openfn/language-common@1.15.1

## 0.5.0 - 13 June 2024

### Minor Changes

* 3d9d564c: Add `fn` and `fnIf` operation

### Patch Changes

* Updated dependencies \[106ecf6d]
  * @openfn/language-common@1.14.0

## 0.4.1 - 19 June 2023

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

## 0.3.4 - 20 April 2023

### Patch Changes

* 7cc8efc: remove FakeAdaptor references

## 0.3.3 - 15 February 2023

### Patch Changes

* f7ebd3c: remove sample configuration

## 0.3.2 - 15 February 2023

### Patch Changes

* f2aed32: add examples

## 0.3.1 - 13 January 2023

### Patch Changes

* 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 0.3.0 - 25 November 2022

### Minor Changes

* # c6056e8: migrate mogli

- State gets cleaned up after the operations are finished. This means that the
  final state is serializable.

  The JSForce connection object is provided by `createConnection`, and in turn
  `execute` ensures it is run before the user's operations.

  The `cleanupState` reducer simply deletes the connection key from state.

# v0.1.3

* Bumped language-common dependency to v0.0.4.
