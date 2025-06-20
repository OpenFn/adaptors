# @openfn/language-gmail

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
