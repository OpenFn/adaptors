# @openfn/language-mailchimp

## 1.0.0

### Major Changes

- 60dec15: This update contains changes to the HTTP helpers (`get`, `post` etc):

  - Properly handle 204 responses (ie, success with no body)
  - On error, throw the mailchimp JSON body, which is full of useful info
  - Slightly change the shape of the returned state
  - Better log output

  This update contains one breaking change on the http helpers:

  - state.response is now `{ headers, statusCode, body }` (it used to just be
    `body`)

## 0.8.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 0.7.4

### Patch Changes

- Security updates (lodash,undici)
- Updated dependencies
  - @openfn/language-common@1.13.2

## 0.7.3

### Patch Changes

- 6afba70: Fix updateMember()

## 0.7.2

### Patch Changes

- 1131c34: Remove regex pattern for validation and changed minLength to 1

## 0.7.1

### Patch Changes

- 1f856c4: Update configuration schema
- 48394f5: - fix ast docs warnings
  - add status code log on request

## 0.7.0

### Minor Changes

- 58fcea9: - Add chunk from common
  - Improve error logs
  - Return `state` in request finalState

## 0.6.0

### Minor Changes

- 1582873: Add request, get and post functions

## 0.5.0

### Minor Changes

- 8e39ee1: Add new functions

  - addMember()
  - listMembers()
  - deleteMember()
  - listAudiences()
  - archiveMember()
  - updateMemberTags()
  - listAudienceInfo()

## 0.4.1

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

- Updated dependencies [2c1d603]
  - @openfn/language-common@1.8.0

## 0.3.5

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 0.3.4

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.3.3

### Patch Changes

- f2aed32: add examples

## 0.3.2

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 0.3.1

### Patch Changes

- cbb8968: Fix axios Inefficient Regular Expression Complexity vulnerability
- e81561f: Updated ast and package.json

## 0.3.0

### Minor Changes

- 88fa3b5: migrate mailchimp

### Patch Changes

- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5
