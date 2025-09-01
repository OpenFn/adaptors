# @openfn/language-collections

## 0.7.13 - 28 August 2025

### Patch Changes

- [b7af59a](https://github.com/OpenFn/adaptors/commit/b7af59a): - Update `package.json` description to be LLM-readable

## 0.7.12 - 14 July 2025

### Patch Changes

- Updated dependencies [9b5a4f8](https://github.com/OpenFn/adaptors/commit/9b5a4f8)
  - @openfn/language-common@3.0.2

## 0.7.11 - 10 July 2025

### Patch Changes

- Updated dependencies [cf9c09f](https://github.com/OpenFn/adaptors/commit/cf9c09f)
  - @openfn/language-common@3.0.1

## 0.7.10 - 10 July 2025

### Patch Changes

- Updated dependencies [ea85695](https://github.com/OpenFn/adaptors/commit/ea85695)
- Updated dependencies [3fce58f](https://github.com/OpenFn/adaptors/commit/3fce58f)
- Updated dependencies [19f2d7e](https://github.com/OpenFn/adaptors/commit/19f2d7e)
- Updated dependencies [f26bd2b](https://github.com/OpenFn/adaptors/commit/f26bd2b)
- Updated dependencies [19f2d7e](https://github.com/OpenFn/adaptors/commit/19f2d7e)
  - @openfn/language-common@3.0.0

## 0.7.9 - 20 June 2025

### Patch Changes

- Updated dependencies [28c2e8b](https://github.com/OpenFn/adaptors/commit/28c2e8b)
  - @openfn/language-common@2.5.0

## 0.7.8 - 22 April 2025

### Patch Changes

- Updated dependencies [99e4b48](https://github.com/OpenFn/adaptors/commit/99e4b48)
- Updated dependencies [13bf08f](https://github.com/OpenFn/adaptors/commit/13bf08f)
  - @openfn/language-common@2.4.0

## 0.7.7 - 16 April 2025

### Patch Changes

- Updated dependencies [b089c56](https://github.com/OpenFn/adaptors/commit/b089c56)
  - @openfn/language-common@2.3.3

## 0.7.6 - 11 April 2025

### Patch Changes

- Updated dependencies [d7105c0](https://github.com/OpenFn/adaptors/commit/d7105c0)
  - @openfn/language-common@2.3.2

## 0.7.5 - 14 March 2025

### Patch Changes

- Updated dependencies [23ccb01](https://github.com/OpenFn/adaptors/commit/23ccb01)
  - @openfn/language-common@2.3.1

## 0.7.4 - 16 January 2025

### Patch Changes

- Updated dependencies [b3d7f59](https://github.com/OpenFn/adaptors/commit/b3d7f59)
- Updated dependencies [2d709ff](https://github.com/OpenFn/adaptors/commit/2d709ff)
- Updated dependencies [41e8cc3](https://github.com/OpenFn/adaptors/commit/41e8cc3)
  - @openfn/language-common@2.3.0

## 0.7.3 - 16 January 2025

### Patch Changes

- Updated dependencies [6dffdbd](https://github.com/OpenFn/adaptors/commit/6dffdbd)
  - @openfn/language-common@2.2.1

## 0.7.2 - 09 January 2025

### Patch Changes

- Updated dependencies [a47d8d5](https://github.com/OpenFn/adaptors/commit/a47d8d5)
- Updated dependencies [9240428](https://github.com/OpenFn/adaptors/commit/9240428)
  - @openfn/language-common@2.2.0

## 0.7.1 - 16 December 2024

### Patch Changes

- Fixed some small issues in the docs

## 0.7.0 - 11 December 2024

### Minor Changes

- [c95ccba](https://github.com/OpenFn/adaptors/commit/c95ccba): BREAKING: Pass state into the keygen function on `set()`. This allows
  state to be used to calculate keys.

  When calling `collections.set(collection, keygen, values)`, the keygen
  function signature has changed from `(value, index) => key` to
  `(value, state, index) => key`.

### Patch Changes

- [cdb01db](https://github.com/OpenFn/adaptors/commit/cdb01db): Better error handling if the keygen function is invalid

## 0.6.2 - 07 December 2024

### Patch Changes

- Expose mock agent for unit tests

## 0.6.1 - 05 December 2024

### Patch Changes

- [12d634c](https://github.com/OpenFn/adaptors/commit/12d634c): Fix an issue where reference values for setting a single item were
  not resolved, eg:

  ```js
  collections.set('my-collection', 'some-key', state => state.data);
  ```

## 0.6.0 - 03 December 2024

### Minor Changes

- Various stability fixes

### Patch Changes

- [39fb894](https://github.com/OpenFn/adaptors/commit/39fb894): Allow a single key to be set to an array value
- [ad9fca2](https://github.com/OpenFn/adaptors/commit/ad9fca2): Throw if insufficient arguments passed to set()
- [29a6ce0](https://github.com/OpenFn/adaptors/commit/29a6ce0): Throw a nice error if the collection does not exist
- [26aa57c](https://github.com/OpenFn/adaptors/commit/26aa57c): Fix an issue where requesting a single key that does not exist throws
  an error, as in:

  ```
  collections.get('my-collection', 'some-item')
  ```

  Note that this requires Lightning v2.10.5+

## 0.5.2 - 21 November 2024

### Patch Changes

- Fix an issue where sometimes the JSON stream would skip tokens and result in a
  smaller payload being returned

## 0.5.1 - 15 November 2024

### Patch Changes

- set() will now upsert items in batches of 1000

## 0.5.0 - 07 November 2024

### Minor Changes

- [b73b063](https://github.com/OpenFn/adaptors/commit/b73b063): - Added pagination support
  - Removed `updated_*` time filters

## 0.4.0 - 01 November 2024

### Minor Changes

- Fixed support for delete

## 0.3.0 - 01 November 2024

### Minor Changes

- [1e472ed](https://github.com/OpenFn/adaptors/commit/1e472ed): Update new GET request structure Fix streaming API

### Patch Changes

- [32e5a03](https://github.com/OpenFn/adaptors/commit/32e5a03): Fix an issue where the query object isn't getting sent to the server

## 0.2.0 - 30 October 2024

### Minor Changes

- [f4deb81](https://github.com/OpenFn/adaptors/commit/f4deb81): Updates to latest spec

## 0.1.0 - 23 October 2024

Initial experiemntal release, with `collections.get`, `collections.each`,
`collections.remove` and `collections.set`
