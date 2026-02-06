# @openfn/language-googledrive

## 3.0.0

The 3.0.0 version ensures that the `list()` command can access all folders
shared with the credential - but demands that a single folderId be provided, to
prevent accidental data leaks.

### Breaking Changes

- 7971401: `list()` now requires a `folderId` argument

If you used `list()` from v2.1.0, you must now provide a folderId as an
argument:

```
list() -> list('21345', { limit: 10 })
```

If you used folderId as an option, it must now be an argument

```
list({ folderId; '21345', limit: 10 }) -> list('21345', { limit: 10 })
```

## 2.1.1 (deprecated)

### Patch Changes

- aa56385: Set supportsAllDrives on list()
- Updated dependencies [8ad6b98]
- Updated dependencies [8ad6b98]
  - @openfn/language-common@3.2.2

## 2.1.0

### Minor Changes

- 15dc2e4: add list method for listing files in a directory

## 2.0.8

### Patch Changes

- f076142: Set `supportsAllDrives` flag to allow credentials to access shared
  drives

## 2.0.7 - 02 December 2025

### Patch Changes

- e8f7f2d: Security update

## 2.0.6 - 28 November 2025

### Patch Changes

- Updated dependencies \[cfc66df]
  - @openfn/language-common@3.2.1

## 2.0.5 - 12 November 2025

### Patch Changes

- Updated dependencies \[4d7a833]
  - @openfn/language-common@3.2.0

## 2.0.4 - 04 November 2025

### Patch Changes

- Updated dependencies
  - @openfn/language-common@3.1.2

## 2.0.3

### Patch Changes

- Updated dependencies \[408a3a2]
  - @openfn/language-common@3.1.1

## 2.0.2 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 2.0.1 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 2.0.0 - 11 August 2025

### Major Changes

- a5cea4e: removed `http` export from `@openfn/language-common`

  ### Migration Guide

  The `http` export has been removed from `@openfn/language-common`. If you were
  using it, you should remove it from your code and create a new step that uses
  `http` adaptor. See example below.

  **Before**

  **Step 1: Fetch and post data using postgresql adaptor**

  ```js
  sql('select * from foo');
  http.post('/example', { body: $.data }),
  ```

  **Now**

  **Step 1: Fetch data using postgresql adaptor**

  ```js
  sql('select * from foo');
  ```

  **Step 2: Post data using http adaptor**

  ```js
  post('/example', { body: $.data });
  ```

## 1.1.0 - 22 July 2025

### Minor Changes

- bfcfab9: - Update `get()` to fetch file using fileId or fileName
  - Export `dateFns`,`as`, `chunk`, `arrayToString` and `parseCsv` from `common`

## 1.0.5 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 1.0.4 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 1.0.3 - 10 July 2025

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 1.0.2 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 1.0.1 - 22 April 2025

### Patch Changes

- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 1.0.0 - 17 April 2025

Initial release.
