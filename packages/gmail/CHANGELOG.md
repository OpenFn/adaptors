# @openfn/language-gmail

## 1.1.6 - 17 April 2025

### Patch Changes

* Add query parameters to URL request logs

## 1.1.5 - 17 April 2025

### Patch Changes

* Updated dependencies \[454497a]
  * @openfn/language-common@2.3.4

## 1.1.4 - 16 April 2025

### Patch Changes

* Updated dependencies \[b089c56]
  * @openfn/language-common@2.3.3

## 1.1.3 - 11 April 2025

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 1.1.2 - 14 March 2025

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 1.1.1 - 05 February 2025

### Patch Changes

* 658971a: Fixed bug which prevented multiple content of the same "type" and now
  correctly works to prevent multiple of the same "name".

## 1.1.0 - 23 January 2025

### Minor Changes

* 8203e90: Added options.maxResults field to limit excessive data transfer.

## 1.0.1 - 18 January 2025

### Patch Changes

* 01b4aa9: This patch includes breaking changes to the API - but since the
  adpator has only been released a couple of days we don't anticipate this
  affecting any users.

  * Removed the `userId` parameter from `getContentsFromMessages()`. Pass
    `options.email` instead.
  * Renamed `options.desiredContents` to `options.contents`
  * Revised documentation for clarity and accuracy

## 1.0.0 - 16 January 2025

Initial release.
