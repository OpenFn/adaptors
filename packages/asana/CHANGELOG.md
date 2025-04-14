# @openfn/language-asana

## 4.0.10 2025 April 11

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 4.0.9 2025 March 14

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 4.0.8 2025 January 16

### Patch Changes

* Updated dependencies \[b3d7f59]
* Updated dependencies \[2d709ff]
* Updated dependencies \[41e8cc3]
  * @openfn/language-common@2.3.0

## 4.0.7 2025 January 16

### Patch Changes

* Updated dependencies \[6dffdbd]
  * @openfn/language-common@2.2.1

## 4.0.6 2025 January 9

### Patch Changes

* Updated dependencies \[a47d8d5]
* Updated dependencies \[9240428]
  * @openfn/language-common@2.2.0

## 4.0.5 2024 October 28

### Patch Changes

* Updated docs for each()
* Updated dependencies
  * @openfn/language-common@2.1.1

## 4.0.4 2024 October 18

### Patch Changes

* Updated dependencies \[03a1a74]
  * @openfn/language-common@2.1.0

## 4.0.3 2024 October 15

### Patch Changes

* Fixed security vulnerability in jsonpath-plus \[33973a2]
  * @openfn/language-common@2.0.3

## 4.0.2 2024 September 24

### Patch Changes

* Updated dependencies \[77a690f]
  * @openfn/language-common@2.0.2

## 4.0.1 2024 August 16

### Patch Changes

* 8146c23: Fix typings in package.json
* Updated dependencies \[8146c23]
  * @openfn/language-common@2.0.1

## 4.0.0 2024 August 1

### Major Changes

* Export new common http helpers (http namespace)

## 3.3.1

### Patch Changes

* 510354a: Don't allow HTTP helpers to call out to different domains. This can
  cause a security violation where credentials are sent to external servers. Use
  generic HTTP helpers like `http.get` or `fetch` instead.
* 510354a: Fix an issue where not passing a params argument would trigger an
  exception
* Updated dependencies \[4fe527c]
  * @openfn/language-common@2.0.0

## 3.3.0 2024 June 13

### Minor Changes

* 73433c20: Add `fnIf` operation

### Patch Changes

* Updated dependencies \[106ecf6d]
  * @openfn/language-common@1.14.0

## 3.2.0 2024 April 12

### Minor Changes

* bae5d3b6: Add the cursor() function from common. See the job writing guide for
  more information.

### Patch Changes

* Updated dependencies \[1ad86651]
  * @openfn/language-common@1.13.0

## 3.1.0 2024 April 3

### Minor Changes

* 673e41e8: - Add `createTaskStory()` function
  * Replaced common `http` with a more efficient implementation from
    `common/util` http

## 3.0.1 2023 June 19

### Patch Changes

* Update lock files
* Updated dependencies
  * @openfn/language-common@1.8.1

## 3.0.0

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

## 2.1.6 2023 March 30

### Patch Changes

* 14f481e: mark execute as private
* Updated dependencies \[2b4c61a]
  * @openfn/language-common@1.7.6

## 2.1.5 2023 February 15

### Patch Changes

* f7ebd3c: remove sample configuration

## 2.1.4 2023 February 15

### Patch Changes

* f2aed32: add examples

## 2.1.3 2023 January 13

### Patch Changes

* 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 2.1.2 2022 November 11

### Patch Changes

* f2a91a4: Update package exports
* Updated dependencies \[f2a91a4]
  * @openfn/language-common@1.7.5

## 2.1.1 2022 November 4

### Patch Changes

* 8566b26: Fix typings
* b3d45ff: Fix CJS export of npm package.
* ecf5d30: remove sinon since it was not being used
* Updated dependencies \[8566b26]
* Updated dependencies \[b3d45ff]
* Updated dependencies \[b5eb665]
* Updated dependencies \[ecf5d30]
  * @openfn/language-common@1.7.4

## 2.1.0 2022 October 21

### Minor Changes

* 5f40dcf: Migrated language-asana

### Patch Changes

* e04aa28: Rename credential-schema to configuration-schema, update descriptions
