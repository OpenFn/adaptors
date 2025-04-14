# @openfn/language-sftp

## 2.0.10 2025 April 11

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 2.0.9 2025 March 14

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 2.0.8 2025 January 16

### Patch Changes

* Updated dependencies \[b3d7f59]
* Updated dependencies \[2d709ff]
* Updated dependencies \[41e8cc3]
  * @openfn/language-common@2.3.0

## 2.0.7 2025 January 16

### Patch Changes

* Updated dependencies \[6dffdbd]
  * @openfn/language-common@2.2.1

## 2.0.6 2025 January 9

### Patch Changes

* Updated dependencies \[a47d8d5]
* Updated dependencies \[9240428]
  * @openfn/language-common@2.2.0

## 2.0.5 2024 October 28

### Patch Changes

* Updated docs for each()
* Updated dependencies
  * @openfn/language-common@2.1.1

## 2.0.4 2024 October 18

### Patch Changes

* Updated dependencies \[03a1a74]
  * @openfn/language-common@2.1.0

## 2.0.3 2024 October 15

### Patch Changes

* Fixed security vulnerability in jsonpath-plus \[33973a2]
  * @openfn/language-common@2.0.3

## 2.0.2 2024 September 24

### Patch Changes

* Updated dependencies \[77a690f]
  * @openfn/language-common@2.0.2

## 2.0.1 2024 August 16

### Patch Changes

* 8146c23: Fix typings in package.json
* Updated dependencies \[8146c23]
  * @openfn/language-common@2.0.1

## 2.0.0 2024 August 1

### Major Changes

* Export new common http helpers (http namespace)

## 1.1.3

### Patch Changes

* Updated dependencies \[4fe527c]
  * @openfn/language-common@2.0.0

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

## 1.0.8 2024 June 11

### Patch Changes

* Updated dependencies
  * @openfn/language-common@1.13.5

## 1.0.7 2024 May 21

### Patch Changes

* Updated dependencies \[12f02ed5]
  * @openfn/language-common@1.13.4

## 1.0.6 2024 May 8

### Patch Changes

* Updated dependencies \[88f99a8f]
  * @openfn/language-common@1.13.3

## 1.0.5 2024 May 8

### Patch Changes

* Security updates (lodash,undici)
* Updated dependencies
  * @openfn/language-common@1.13.2

## 1.0.4 2024 April 12

### Patch Changes

* Updated dependencies
  * @openfn/language-common@1.13.1

## 1.0.3 2024 April 12

### Patch Changes

* Updated dependencies \[1ad86651]
  * @openfn/language-common@1.13.0

## 1.0.2 2023 October 27

### Patch Changes

* a666a63: On error disconnect then throw

## 1.0.1 2023 October 24

### Patch Changes

* 771c814: - Properly disconnect on error
  * Improve operation logs

## 1.0.0 2023 October 2

### Major Changes

* e52ba66: add `filter` option in `list()` function

## 0.8.8 2023 September 20

### Patch Changes

* Updated dependencies \[c19efbe]
  * @openfn/language-common@1.11.1

## 0.8.7 2023 September 8

### Patch Changes

* Updated dependencies \[85c35b8]
  * @openfn/language-common@1.11.0

## 0.8.6 2023 August 14

### Patch Changes

* Updated dependencies \[df09270]
  * @openfn/language-common@1.10.3

## 0.8.5 2023 July 14

### Patch Changes

* Updated dependencies \[26a303e]
  * @openfn/language-common@1.10.2

## 0.8.4 2023 July 14

### Patch Changes

* Updated dependencies \[8c32eb3]
  * @openfn/language-common@1.10.1

## 0.8.3 2023 June 30

### Patch Changes

* Updated dependencies \[aad9549]
  * @openfn/language-common@1.10.0

## 0.8.2 2023 June 23

### Patch Changes

* d2c980e: Use `parseCsv` from language-common
* c5d3ce1: improve connection handling
* Updated dependencies \[111807f]
  * @openfn/language-common@1.9.0

## 0.8.1 2023 June 19

### Patch Changes

* Update lock files
* Updated dependencies
  * @openfn/language-common@1.8.1

## 0.8.0

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

## 0.7.3 2023 May 24

### Patch Changes

* 432dd0a: fix sftp connection wqautoclose

## 0.7.2 2023 May 23

### Patch Changes

* 205b806: remove asObjects key before parsing

## 0.7.1 2023 May 23

### Patch Changes

* 827c627: error handling

## 0.7.0 2023 May 22

### Minor Changes

* fa58216: Add csvtojson convertion option

## 0.6.9 2023 March 31

### Patch Changes

* Updated dependencies \[929bca6]
  * @openfn/language-common@1.7.7

## 0.6.8 2023 March 30

### Patch Changes

* 14f481e: mark execute as private
* Updated dependencies \[2b4c61a]
  * @openfn/language-common@1.7.6

## 0.6.7 2023 February 15

### Patch Changes

* f7ebd3c: remove sample configuration

## 0.6.6 2023 February 15

### Patch Changes

* f2aed32: add examples

## 0.6.5 2023 January 13

### Patch Changes

* 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 0.6.4 2022 November 11

### Patch Changes

* f2a91a4: Update package exports
* Updated dependencies \[f2a91a4]
  * @openfn/language-common@1.7.5

## 0.6.3 2022 November 4

### Patch Changes

* 8566b26: Fix typings
* b3d45ff: Fix CJS export of npm package.
* 4126a62: Fix built bundle
* ecf5d30: remove sinon since it was not being used
* Updated dependencies \[8566b26]
* Updated dependencies \[b3d45ff]
* Updated dependencies \[b5eb665]
* Updated dependencies \[ecf5d30]
  * @openfn/language-common@1.7.4

## 0.6.2 2022 October 21

### Patch Changes

* e04aa28: Rename credential-schema to configuration-schema, update descriptions

## 0.6.1 2022 October 19

### Patch Changes

* 28dfbfa: add todo, fix build pack

## 0.6.0 2022 October 19

### Minor Changes

* f294a62: Added credential-schema.json for new ui

## 0.5.0 2022 October 18

### Minor Changes

* 2c04894: added sftp package
