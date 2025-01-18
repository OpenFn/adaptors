# @openfn/language-gmail

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
