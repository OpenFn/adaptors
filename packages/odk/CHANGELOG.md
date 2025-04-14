# @openfn/language-odk

## 3.0.13 2025 April 11

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 3.0.12 2025 March 14

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 3.0.11 2025 January 16

### Patch Changes

* Updated dependencies \[b3d7f59]
* Updated dependencies \[2d709ff]
* Updated dependencies \[41e8cc3]
  * @openfn/language-common@2.3.0

## 3.0.10 2025 January 16

### Patch Changes

* Updated dependencies \[6dffdbd]
  * @openfn/language-common@2.2.1

## 3.0.9 2025 January 9

### Patch Changes

* Updated dependencies \[a47d8d5]
* Updated dependencies \[9240428]
  * @openfn/language-common@2.2.0

## 3.0.8 2025 January 4

### Patch Changes

* 6c9affd: Fix typo in error message

## 3.0.7 2024 October 28

### Patch Changes

* Updated docs for each()
* Updated dependencies
  * @openfn/language-common@2.1.1

## 3.0.6 2024 October 18

### Patch Changes

* Updated dependencies \[03a1a74]
  * @openfn/language-common@2.1.0

## 3.0.5 2024 October 15

### Patch Changes

* Fixed security vulnerability in jsonpath-plus \[33973a2]
  * @openfn/language-common@2.0.3

## 3.0.4 2024 September 24

### Patch Changes

* Updated dependencies \[77a690f]
  * @openfn/language-common@2.0.2

## 3.0.3 2024 August 16

### Patch Changes

* 8146c23: Fix typings in package.json
* Updated dependencies \[8146c23]
  * @openfn/language-common@2.0.1

## 3.0.2 2024 August 1

### Patch Changes

* f51c5d0: Enforce that absolute urls must not be passed to HTTP functions
* Updated dependencies \[4fe527c]
  * @openfn/language-common@2.0.0

## 3.0.1 2024 July 25

### Patch Changes

* Updated dependencies \[4c08444]
* Updated dependencies \[73d0a02]
  * @openfn/language-common@1.15.1

## 3.0.0 2024 July 2

### Major Changes

* 0b81f06: - `getSubmissions()` now returns submission data (not metadata)
  * `getSubmissions()` arguments can be references (functions)
  * `getSubmissions()` supports query parameters
  * HTTP helper APIs have been slightly streamlined and fixed
  * Documentation overhaul
  * All callback functions have been removed (use an fn() block instead)

## 2.0.0 2024 June 25

### Major Changes

* 9234f83: - configuration-schema: rename `username` to `email`
  * Improve logging when authentication fails
  * Improve error reporting when requests fail

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

## 1.0.1 2024 June 11

### Patch Changes

* Updated dependencies
  * @openfn/language-common@1.13.5

## 1.0.0 2024 June 6

Initial release for odk adaptor with `get`, `post`, `getForms` and
`getSubmissions`
