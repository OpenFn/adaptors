# @openfn/language-odk

## 3.0.3

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies [8146c23]
  - @openfn/language-common@2.0.1

## 3.0.2

### Patch Changes

- f51c5d0: Enforce that absolute urls must not be passed to HTTP functions
- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 3.0.1

### Patch Changes

- Updated dependencies [4c08444]
- Updated dependencies [73d0a02]
  - @openfn/language-common@1.15.1

## 3.0.0

### Major Changes

- 0b81f06: - `getSubmissions()` now returns submission data (not metadata)
  - `getSubmissions()` arguments can be references (functions)
  - `getSubmissions()` supports query parameters
  - HTTP helper APIs have been slightly streamlined and fixed
  - Documentation overhaul
  - All callback functions have been removed (use an fn() block instead)

## 2.0.0

### Major Changes

- 9234f83: - configuration-schema: rename `username` to `email`
  - Improve logging when authentication fails
  - Improve error reporting when requests fail

## 1.1.1

### Patch Changes

- Updated dependencies [5fb82f07]
  - @openfn/language-common@1.15.0

## 1.1.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 1.0.1

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 1.0.0

Initial release for odk adaptor with `get`, `post`, `getForms` and
`getSubmissions`
