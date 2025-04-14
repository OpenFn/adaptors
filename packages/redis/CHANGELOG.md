# @openfn/language-redis

## 1.3.1 2025 April 11

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 1.3.0 2025 March 20

### Minor Changes

* f713bc5: add mSet() function on redis adaptor

### Patch Changes

* f713bc5: use `util.throwError` for throwing errors

## 1.2.8 2025 March 14

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 1.2.7 2025 January 16

### Patch Changes

* Updated dependencies \[b3d7f59]
* Updated dependencies \[2d709ff]
* Updated dependencies \[41e8cc3]
  * @openfn/language-common@2.3.0

## 1.2.6 2025 January 16

### Patch Changes

* Updated dependencies \[6dffdbd]
  * @openfn/language-common@2.2.1

## 1.2.5 2025 January 9

### Patch Changes

* Updated dependencies \[a47d8d5]
* Updated dependencies \[9240428]
  * @openfn/language-common@2.2.0

## 1.2.4 2024 October 28

### Patch Changes

* Updated docs for each()
* Updated dependencies
  * @openfn/language-common@2.1.1

## 1.2.3 2024 October 18

### Patch Changes

* Updated dependencies \[03a1a74]
  * @openfn/language-common@2.1.0

## 1.2.2 2024 October 15

### Patch Changes

* Fixed security vulnerability in jsonpath-plus \[33973a2]
  * @openfn/language-common@2.0.3

## 1.2.1 2024 September 24

### Patch Changes

* Updated dependencies \[77a690f]
  * @openfn/language-common@2.0.2

## 1.2.0 2024 August 28

### Minor Changes

* c1e3221: - Add `mGet()` function
  * Remove console.log in `hget()`
  * Add logging to `scan()`

## 1.1.2 2024 August 16

### Patch Changes

* 8146c23: Fix typings in package.json
* Updated dependencies \[8146c23]
  * @openfn/language-common@2.0.1

## 1.1.1 2024 August 15

### Patch Changes

* 2b8ec34: - Update host type configuration-schema

## 1.1.0 2024 August 9

### Minor Changes

* Add `jGet()` function
* Add `jSet()` function
* `scan()` now iterates the whole database
  * Removed `cursor` option from `scan`
  * Removed default value for `type` option
  * Mapped `json` data type to the redis internal type

## 1.0.0 2024 August 6

First release. Designed as a low-level wrapper around npm redis client.

* get(key)
* hget(key, field)
* hGetAll(key)
* hset(key, value)
* scan(pattern,options)
* set(key, field)
