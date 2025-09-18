# @openfn/language-http

## 7.2.2 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 7.2.1 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 7.2.0 - 14 July 2025

### Minor Changes

- c381879: Add support for `tls` object options in state.configuration

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 7.1.1 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 7.1.0 - 10 July 2025

### Minor Changes

- 19f2d7e: Exported `as()` function from common.
- 8d78db4: Export `map()` function from common

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 7.0.7 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 7.0.6 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- 99e4b48: Fix parseAs option in all operations
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 7.0.5 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 7.0.4 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 7.0.3 - 04 April 2025

### Patch Changes

- 2073994: - Add a `POST` example to the `request()` function

## 7.0.2 - 20 March 2025

### Patch Changes

- 7174293: improve function examples

## 7.0.1 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 7.0.0 - 05 March 2025

### Major Changes

- 8b28b87: - Remove all callback functions
- 57a2a63: - Add `contentType` option to requests. This defaults to `json`
- ba84591: - Add a `data` argument to `put()`, `patch()` and `post()`
- Remove the deprecated `json` property on `RequestOptions`

### Patch Changes

- b1ce36f: - Remove duplicated body response from `http`.

### Migration Guide

#### Content Types

The HTTP adaptor now assumes that all requests are JSON, unless otherwise
specified.

You can set the `contentType` option or pass a `'Content-Type'` header to
manually set the content type. For example, to upload a form:

```js
post($.url, $.data, { contentType: 'form' });
```

#### Updated put, patch and post signatures

`put()`, `patch()` and `post()` have had their signatures changed from
`post(path, options, callback)` to `post(path, data, options)`.

The payload attached to the body, which in 6.0 was passed on the options object
as `body`, is now the second argument to the function.

So if you used to do this:

```js
post('/patient', { body: $.patient });
```

You must edit your code to do this:

```js
post('/patient', $.patient);
```

You can still pass options to the request via the third argument:

```js
post('/patient', $.patient, { query: $.query, headers: $.headers });
```

Callbacks have now been removed, use `.then()` instead.

So if you used to do this:

```js
post('/patient', { body: $.patient }, next => {
  state.results.push(next.response.body);
  return next;
});
```

You must edit your code to do this:

```js
post('/patient', $.patient).then(next => {
  state.results.push(next.response.body);
  return next;
});
```

## 6.5.4 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 6.5.3 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 6.5.2 - 09 January 2025

### Patch Changes

- 4b9a5b9: - Fix typo in util functions examples
  - Remove export for `addAuth()` helper
- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 6.5.1 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 6.5.0 - 18 October 2024

### Minor Changes

- b433d7f: Add `util.encode`, `util.decode` and `util.uuid` helpers

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 6.4.6 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 6.4.5 - 09 October 2024

### Patch Changes

- e01d7b3: - Fix an issue where an error is thrown if `state.configuration` is
  `null`
  - better error when `baseUrl` is not set and the passed url is a relative url.
  - better error when `baseUrl` is not set and no url is provided.

## 6.4.4 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 6.4.3 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 6.4.2 - 01 August 2024

### Patch Changes

- c803bab: In all functions, if baseUrl if set, path MUST be relative.
- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 6.4.1 - 25 July 2024

### Patch Changes

- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 6.4.0 - 19 June 2024

### Minor Changes

- 5fb82f07: Export `group` operation from common

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 6.3.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 6.2.3 - 11 June 2024

### Patch Changes

- Fix an issue where query parameters in the URL did not get sent to the server

## 6.2.2 - 24 May 2024

### Patch Changes

- Automatically apply api/oauth tokens from config

## 6.2.1 - 07 May 2024

### Patch Changes

- Fixed an issue where the Authorization header could be overwritten if username
  and password are set on config
- Configuration schema: demoted `username` and `password` to optional
- Configuration schema: Added `token`. This is not automated and must be
  manually add to the HTTP headers.

## 6.2.0 - 12 April 2024

### Minor Changes

- Add cursor() function

## 6.1.0 - 19 March 2024

### Minor Changes

- cfe1ccb: Add callback support for parseXML

## 6.0.0 - 24 January 2024

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

- Updated dependencies \[7f52699]
  - @openfn/language-common@1.12.0

## 5.1.1 - 11 December 2023

### Patch Changes

- a8d655e: Update `parseXML` to use `expandReferences`

## 5.1.0 - 16 November 2023

### Minor Changes

- 8e2b79c: Clean up `state.response.request` by returning only
  `{ method, path, host, protocol, _headers }`

## 5.0.4 - 20 September 2023

### Patch Changes

- Updated dependencies \[c19efbe]
  - @openfn/language-common@1.11.1

## 5.0.3 - 08 September 2023

### Patch Changes

- Updated dependencies \[85c35b8]
  - @openfn/language-common@1.11.0

## 5.0.2 - 14 August 2023

### Patch Changes

- Updated dependencies \[df09270]
  - @openfn/language-common@1.10.3

## 5.0.1 - 14 July 2023

### Patch Changes

- Updated dependencies \[26a303e]
  - @openfn/language-common@1.10.2

## 5.0.0 - 14 July 2023

### Major Changes

- 0b6f20b: use parseCsv from common

### Patch Changes

- Updated dependencies \[8c32eb3]
  - @openfn/language-common@1.10.1

## 4.3.3 - 30 June 2023

### Patch Changes

- Updated dependencies \[aad9549]
  - @openfn/language-common@1.10.0

## 4.3.2 - 23 June 2023

### Patch Changes

- Updated dependencies \[111807f]
  - @openfn/language-common@1.9.0

## 4.3.1 - 19 June 2023

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

- Updated dependencies \[2c1d603]
  - @openfn/language-common@1.8.0

## 4.2.8 - 31 March 2023

### Patch Changes

- Updated dependencies \[929bca6]
  - @openfn/language-common@1.7.7

## 4.2.7 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 4.2.6 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 4.2.5 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 4.2.4 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 4.2.3 - 11 November 2022

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5

## 4.2.2 - 04 November 2022

### Patch Changes

- 9a2755e: Update dependency on language-common
- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies \[8566b26]
- Updated dependencies \[b3d45ff]
- Updated dependencies \[b5eb665]
- Updated dependencies \[ecf5d30]
  - @openfn/language-common@1.7.4

## 4.2.1 - 21 October 2022

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions

## 4.2.0 - 19 October 2022

### Minor Changes

- f670bf8: Added credential schema to enable new ui

## 4.1.0 - 18 October 2022

### Minor Changes

- 8e1b86d: update http to new format

## 4.0.1 - 13 October 2022

### Patch Changes

- 4671e89: Migrate language-http
