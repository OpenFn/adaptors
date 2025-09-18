# @openfn/language-odk

## 3.0.21 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 3.0.20 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 3.0.19 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 3.0.18 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 3.0.17 - 10 July 2025

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 3.0.16 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 3.0.15 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 3.0.14 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 3.0.13 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 3.0.12 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 3.0.11 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 3.0.10 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 3.0.9 - 09 January 2025

### Patch Changes

- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 3.0.8 - 04 January 2025

### Patch Changes

- 6c9affd: Fix typo in error message

## 3.0.7 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 3.0.6 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 3.0.5 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 3.0.4 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 3.0.3 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 3.0.2 - 01 August 2024

### Patch Changes

- f51c5d0: Enforce that absolute urls must not be passed to HTTP functions
- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 3.0.1 - 25 July 2024

### Patch Changes

- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 3.0.0 - 02 July 2024

### Major Changes

- 0b81f06: - `getSubmissions()` now returns submission data (not metadata)
  - `getSubmissions()` arguments can be references (functions)
  - `getSubmissions()` supports query parameters
  - HTTP helper APIs have been slightly streamlined and fixed
  - Documentation overhaul
  - All callback functions have been removed (use an fn() block instead)

## 2.0.0 - 25 June 2024

### Major Changes

- 9234f83: - configuration-schema: rename `username` to `email`
  - Improve logging when authentication fails
  - Improve error reporting when requests fail

## 1.1.1 - 19 June 2024

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 1.1.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 1.0.1 - 11 June 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 1.0.0 - 06 June 2024

Initial release for odk adaptor with `get`, `post`, `getForms` and
`getSubmissions`
