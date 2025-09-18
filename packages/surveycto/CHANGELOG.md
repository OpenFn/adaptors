# @openfn/language-surveycto

## 2.3.3 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 2.3.2 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 2.3.1 - 28 August 2025

### Patch Changes

- b7af59a: - Update `package.json` description to be LLM-readable

## 2.3.0 - 14 August 2025

### Minor Changes

- af530fd: - Added `contentType` to `request()`
  - Added `jsonToCSVBuffer`

## 2.2.7 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 2.2.6 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 2.2.5 - 10 July 2025

### Patch Changes

- c4625fa: - Migrate from the deprecated `expandReferences` in `common` to the
  new `expandReferences` from common.util
  - Use `workspace:*` common version.
- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 2.2.4 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 2.2.3 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 2.2.2 - 06 August 2024

### Patch Changes

- d54ab59: Fix an issue assembling surveyCTO urls (which manifested as
  `TypeError: Cannot read properties of undefined (reading 'toString'`)

## 2.2.1 - 01 August 2024

### Patch Changes

- f51c5d0: Enforce that absolute urls must not be passed to HTTP functions
- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 2.2.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 2.1.1 - 17 May 2024

### Patch Changes

- 6c588212: Fix `servername` typo in the `configuration-schema`

## 2.1.0 - 08 May 2024

### Minor Changes

- b67f81be: Add a `cursor()` function which adds support for the surveyCTO
  string format dates.

  The date option in `fetchSubmissions` can now accept a surveyCTO date, an
  epoch or unix timestamp, or basically anything you can pass into new Date().

  Internally, any date you pass into `cursor` will be converted into a
  human-readable surveyCTO format in UTC time.

### Patch Changes

- Updated dependencies \[88f99a8f]
  - @openfn/language-common@1.13.3

## 2.0.0 - 23 April 2024

### Major Changes

- 59ae7b50: - Refactor `fetchSubmissions()` function
  - Update `instanceName` to `servername` in `configuration-schema.json`
  - Add `apiVersion` in `configuration-schema.json`. Defaults to `v1`
  - Add `request()` function for surveyCTO API requests

## 1.2.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 1.2.0

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

## 1.1.4 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 1.1.3 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 1.1.2 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 1.1.1 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 1.1.0 - 18 November 2022

### Minor Changes

- 776bb13: migrate surveycto

### Patch Changes

- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5
