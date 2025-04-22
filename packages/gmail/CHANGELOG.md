# @openfn/language-gmail

## 1.1.1

### Patch Changes

- 658971a: Fixed bug which prevented multiple content of the same "type" and now
  correctly works to prevent multiple of the same "name".

## 1.1.0

### Minor Changes

- 8203e90: Added options.maxResults field to limit excessive data transfer.

## 1.0.1

### Patch Changes

- 01b4aa9: This patch includes breaking changes to the API - but since the
  adpator has only been released a couple of days we don't anticipate this
  affecting any users.

  - Removed the `userId` parameter from `getContentsFromMessages()`. Pass
    `options.email` instead.
  - Renamed `options.desiredContents` to `options.contents`
  - Revised documentation for clarity and accuracy

## 1.0.0

Initial release.
