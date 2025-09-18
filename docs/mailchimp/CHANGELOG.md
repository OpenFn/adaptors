# @openfn/language-mailchimp

## 1.0.21 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 1.0.20 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 1.0.19 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 1.0.18 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 1.0.17 - 10 July 2025

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 1.0.16 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 1.0.15 - 22 April 2025

### Patch Changes

- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 1.0.14 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 1.0.13 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 1.0.12 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 1.0.11 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 1.0.10 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 1.0.9 - 09 January 2025

### Patch Changes

- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 1.0.8 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 1.0.7 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 1.0.6 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 1.0.5 - 09 October 2024

### Patch Changes

- 3fd13c2: Update axios to 1.7.7

## 1.0.4 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 1.0.3 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 1.0.2 - 01 August 2024

### Patch Changes

- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 1.0.1 - 25 July 2024

### Patch Changes

- 73d0a02: Make documentation public
- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 1.0.0 - 25 June 2024

### Major Changes

- 60dec15: This update contains changes to the HTTP helpers (`get`, `post` etc):

  - Properly handle 204 responses (ie, success with no body)
  - On error, throw the mailchimp JSON body, which is full of useful info
  - Slightly change the shape of the returned state
  - Better log output

  This update contains one breaking change on the http helpers:

  - state.response is now `{ headers, statusCode, body }` (it used to just be
    `body`)

## 0.8.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 0.7.4 - 08 May 2024

### Patch Changes

- Security updates (lodash,undici)
- Updated dependencies
  - @openfn/language-common@1.13.2

## 0.7.3 - 24 January 2024

### Patch Changes

- 6afba70: Fix updateMember()

## 0.7.2 - 16 December 2023

### Patch Changes

- 1131c34: Remove regex pattern for validation and changed minLength to 1

## 0.7.1 - 13 September 2023

### Patch Changes

- 1f856c4: Update configuration schema
- 48394f5: - fix ast docs warnings
  - add status code log on request

## 0.7.0 - 24 August 2023

### Minor Changes

- 58fcea9: - Add chunk from common
  - Improve error logs
  - Return `state` in request finalState

## 0.6.0 - 18 August 2023

### Minor Changes

- 1582873: Add request, get and post functions

## 0.5.0 - 01 August 2023

### Minor Changes

- 8e39ee1: Add new functions

  - addMember()
  - listMembers()
  - deleteMember()
  - listAudiences()
  - archiveMember()
  - updateMemberTags()
  - listAudienceInfo()

## 0.4.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 0.4.0

### Minor Changes

- 2c1d603: Remove parameter reassignment to ensure proper functioning inside an
  `each` block; add eslint

  The packages receiving a major bump here exposed functions that didn't work as
  expected inside `each` blocks. Users were previously wrapping these functions
  inside their own custom `fn` blocks, and this change will ensure that they can
  be used inside a standard each.

  See https://github.com/OpenFn/adaptors/issues/275 for more details.

### Patch Changes

- Updated dependencies \[2c1d603]
  - @openfn/language-common@1.8.0

## 0.3.5 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 0.3.4 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.3.3 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 0.3.2 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 0.3.1 - 25 November 2022

### Patch Changes

- cbb8968: Fix axios Inefficient Regular Expression Complexity vulnerability
- e81561f: Updated ast and package.json

## 0.3.0 - 18 November 2022

### Minor Changes

- 88fa3b5: migrate mailchimp

### Patch Changes

- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5
