# @openfn/language-http

## 6.0.0

### Overview

This release marks a major milestone in the development of the HTTP Adaptor. The
codebase has undergone a comprehensive rewrite, resulting in significant
improvements. This changelog highlights the major changes and new features
introduced in this version.

### Major Changes

The HTTP Adaptor has been rewritten to use the new helper functions from
`common`. The code is now more modular, efficient, and maintainable.

1. **Error Map Support:**

   We have added support for `errors` option param. You can pass an error map
   which will allow custom messaging to be added to errors. Eg:
   `{errors: {404: "You don't have access"}}`

2. **TLS Support:**

   We have added support for `tls` option param. The `tls` option params is a
   replacement of `agentOptions` param. This option is used for client
   certificate authentication. Eg: `{tls: {ca: state.configuration.cert}}`

3. **Parse-As Support:**

   We have added support for `parseAs` option param. This option is used for
   overriding the default response type. Eg: `{parseAs: "json"}`

4. **Set timeout Option:**

   We have added support for the `timeout` option param. This option is used for
   setting the timeout after which a request will time out, in milliseconds. Eg:
   `{timeout: 300e3}`

5. **HTTP Logging:**

   Improve logging with better insights about the HTTP request

6. **Form Data Handling:**

   We have improved the API for `form` option param.

### Deprecations and Removals

1. **Obsolete APIs:**

   Several outdated and redundant Options and features have been removed to
   streamline the codebase and improve maintainability.

   - Removed `axios` export and `axios` APIs
   - Removed `form-data` dependency
   - Removed `tough-cookie` dependency and `handleCookies` function
   - Removed `request` dependency
   - Removed `fast-safe-stringify` dependency and `assembleError` function
   - Removed support for `gzip`,`qs`, `formData`, `successCodes` and
     `keepCookie` option params

2. **Legacy Option Params:**

   Legacy options have been deprecated, and users are encouraged to update their
   jobs to the new format.

   - Deprecated `json` and `agentOptions` option params

### Upgrade Considerations

- Users of the previous version will need to update their jobs to align with the
  new `options` parameters.
- Ensure that your job does not use or depend on any of the removed `options`
  params

## 5.0.2

### Patch Changes

- Updated dependencies [df09270]
  - @openfn/language-common@1.10.3

## 5.0.1

### Patch Changes

- Updated dependencies [26a303e]
  - @openfn/language-common@1.10.2

## 5.0.0

### Major Changes

- 0b6f20b: use parseCsv from common

### Patch Changes

- Updated dependencies [8c32eb3]
  - @openfn/language-common@1.10.1

## 4.3.3

### Patch Changes

- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0

## 4.3.2

### Patch Changes

- Updated dependencies [111807f]
  - @openfn/language-common@1.9.0

## 4.3.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 4.3.0

### Minor Changes

- 2c1d603: Remove parameter reassignment to ensure proper functioning inside an
  `each` block; add eslint

  The packages receiving a major bump here exposed functions that didn't work as
  expected inside `each` blocks. Users were previously wrapping these functions
  inside their own custom `fn` blocks, and this change will ensure that they can
  be used inside a standard each.

  See https://github.com/OpenFn/adaptors/issues/275 for more details.

### Patch Changes

- Updated dependencies [2c1d603]
  - @openfn/language-common@1.8.0

## 4.2.8

### Patch Changes

- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 4.2.7

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 4.2.6

### Patch Changes

- f7ebd3c: remove sample configuration

## 4.2.5

### Patch Changes

- f2aed32: add examples

## 4.2.4

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 4.2.3

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 4.2.2

### Patch Changes

- 9a2755e: Update dependency on language-common
- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-common@1.7.4

## 4.2.1

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions

## 4.2.0

### Minor Changes

- f670bf8: Added credential schema to enable new ui

## 4.1.0

### Minor Changes

- 8e1b86d: update http to new format

## 4.0.1

### Patch Changes

- 4671e89: Migrate language-http
