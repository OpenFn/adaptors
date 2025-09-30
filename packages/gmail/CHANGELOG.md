# @openfn/language-gmail

## 2.0.3 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 2.0.2 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 2.0.1 - 29 August 2025

### Patch Changes

- 0d7611c: Enhanced documentation in README.md

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

## 1.3.5 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 1.3.4 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 1.3.3 - 10 July 2025

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 1.3.2 - 03 July 2025

### Patch Changes

- ead4e42: Added support for sending emails with or without attachments in the
  `sendMessage` function

## 1.3.1 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 1.3.0 - 30 May 2025

### Minor Changes

- 1205796: Enhance `sendMessage()` to accept an array of configuration objects,
  allowing multiple messages to be send in a single command.

## 1.2.0 - 22 April 2025

### Minor Changes

- 7d6d513: Added support for sending messages. Upgraded zip library to support
  creating archives as well as reading archives.

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 1.1.4 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 1.1.3 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 1.1.2 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 1.1.1 - 05 February 2025

### Patch Changes

- 658971a: Fixed bug which prevented multiple content of the same "type" and now
  correctly works to prevent multiple of the same "name".

## 1.1.0 - 23 January 2025

### Minor Changes

- 8203e90: Added options.maxResults field to limit excessive data transfer.

## 1.0.1 - 18 January 2025

### Patch Changes

- 01b4aa9: This patch includes breaking changes to the API - but since the
  adpator has only been released a couple of days we don't anticipate this
  affecting any users.

  - Removed the `userId` parameter from `getContentsFromMessages()`. Pass
    `options.email` instead.
  - Renamed `options.desiredContents` to `options.contents`
  - Revised documentation for clarity and accuracy

## 1.0.0 - 16 January 2025

Initial release.
