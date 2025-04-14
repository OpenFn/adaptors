# @openfn/language-gmail

## 1.1.3 2025 April 11

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 1.1.2 2025 March 14

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 1.1.1 2025 February 5

### Patch Changes

* 658971a: Fixed bug which prevented multiple content of the same "type" and now
  correctly works to prevent multiple of the same "name".

## 1.1.0 2025 January 23

### Minor Changes

* 8203e90: Added options.maxResults field to limit excessive data transfer.

## 1.0.1 2025 January 18

### Patch Changes

* 01b4aa9: This patch includes breaking changes to the API - but since the
  adpator has only been released a couple of days we don't anticipate this
  affecting any users.

  * Removed the `userId` parameter from `getContentsFromMessages()`. Pass
    `options.email` instead.
  * Renamed `options.desiredContents` to `options.contents`
  * Revised documentation for clarity and accuracy

## 1.0.0 2025 January 16

Initial release.
