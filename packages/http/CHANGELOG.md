# @openfn/language-http

## 6.1.0

### Minor Changes

- cfe1ccb: Add callback support for parseXML

## 6.0.0

### Major Changes

- f741086: The axios library has been removed and the operation API simplified.

### New features

- Error mapping. Provide custom errors to response status codes, eg, Eg:
  `{errors: {404: "You don't have access"}}`
- parseAs option. Overrides the default response type. Eg: `{parseAs: "json"}`
- Request logging. All requests are now logged to stdout.
- tls options. Pass SSL certificates using the `tls` option on any request.

### Breaking changes

- Removed `axios` export
- Axios options on `get`, `post`, `put`, `patch`, and `del` are no longer
  supported (unless otherwise stated). This includes `gzip`,`qs`, `formData`,
  `successCodes`, `transformResponse`, `data` and other options.
- `keepCookie` has been removed
- Option params `json` and `agentOptions` have been deprecated. They still work,
  but you should use `body` and `tls` instead (the behaviour should be the same)

### Migration Guide

- Use `query` instead of `params` or `qs` parameters to a request.
- Convert succcessCodes to the `errorMap`. Ie, `successCodes: [200, 404]`
  becomes `errorMap: { 404: false }`
- Instead of `transformResponse`, use the callback parameter.
- Convert `agentOptions` to `tls`.The values should be the same.
- Convert `responseType` to `parseAs`. Note that this is really only useful for
  JSON, and only needed if the server does not include a content-type response
  header.
- Convert `formData` to `form`.The values should be the same.
- The `authentication` or `auth` property is no longer needed, use
  `state.configuration`.
- The `data` parameter is now `body`.

### Patch Changes

- Updated dependencies [7f52699]
  - @openfn/language-common@1.12.0

## 5.1.1

### Patch Changes

- a8d655e: Update `parseXML` to use `expandReferences`

## 5.1.0

### Minor Changes

- 8e2b79c: Clean up `state.response.request` by returning only
  `{ method, path, host, protocol, _headers }`

## 5.0.4

### Patch Changes

- Updated dependencies [c19efbe]
  - @openfn/language-common@1.11.1

## 5.0.3

### Patch Changes

- Updated dependencies [85c35b8]
  - @openfn/language-common@1.11.0

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
