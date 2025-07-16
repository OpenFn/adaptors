# @openfn/language-dhis2

## 7.1.2 - 14 July 2025

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

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 7.0.2 - 01 July 2025

### Patch Changes

- aa2f46b: - Adjust logging in create to not include item details.
  - Fix issues in docs.

## 7.0.1 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 7.0.0 - 04 June 2025

This release of DHSI2 contains major breaking changes.

This release includes a major re-think of the main adaptor API, introducing new
namespaces (tracker, http, util) to help organize functionality. Note that the
main namespace contains `get()` and `create()`, which do not surface HTTP
semantics, and `http.get()` and `http.post()`.

The intention is that most users can use the `get()`, `create()` and `tracker.*`
APIs, with a HTTP abstraction as a fallback.

It also removes a dependency on the axios library (preferring undici, as used by
other adaptors).

### Major Changes

- Remove axios.
- Re-worked signatures for `get()`, `create()`, `update()` and `upsert()`.
- The `discover()` function has been removed.
- Many non-operation functions have moved to the `util.` namespace, including.
  `attr`, `dv`, `findAttributeValue`, and `findAttributeValueById`.
- HTTP helper functions (like `post()`, `patch()`) have been moved into a clean
  new http namespace.

### Minor Changes

- dfe53ef: - Implement a new `tracker` namespace for `tracker.import()` and
  `tracker.export()` functions.

  - Throw an error when `create('tracker')` is called.

- 5b73844: - Add importStrategy to query params for `create` and `update`

### Migration Guide

#### get ()

The `get` function has a new signature of `get(path, params)`. Note that the old
options object and callback have been removed. If you need to set headers on
your request, use `http.get()` instead.

For `path`, you can pass a resource type, like `"enrollments"`, or a path to a
specific resource, like `tracker/trackedEntities/F8yKM85NbxW`.

If using the new tracker API, we recommend using the new tracker namespace.

#### create

The `create` function has a new signature of `create(path, data, params)`. Note
that the old options object and callback have been removed. If you need to set
headers on your request, use `http.post()` instead.

#### update

Callbacks have been removed from the update signature.

#### upsert

Callbacks have been removed from the upsert signature.

#### Utils

Some helper functions, which are not operations and cannot be called at the top
level, have been moved to a `util` namespace.

Instead of this:

```
fn((state) => {
  const value = findAttributeValue(state.data, 'first name')
  return state;
})
```

Do this:

```
fn((state) => {
  const value = util.findAttributeValue(state.data, 'first name')
  return state;
})
```

## 6.3.4 - 22 April 2025

### Patch Changes

- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 6.3.3 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 6.3.2 - 11 April 2025

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

## 6.3.1 - 14 March 2025

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 6.3.0 - 30 January 2025

### Minor Changes

- Added a 'findAttributeValueById' function; GHS points out that this is more
  durable than the display names used by 'findAttributeValue'

## 6.2.0 - 28 January 2025

### Minor Changes

- 0156632: Add `asBase64` option in dhis2 `get()` function

## 6.1.0 - 16 January 2025

### Minor Changes

- c19d561: Added support for personal access tokens in dhis2

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 6.0.3 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 6.0.2 - 09 January 2025

### Patch Changes

- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 6.0.1 - 04 December 2024

### Patch Changes

- ab94b7c: Fix links in docs examples

## 6.0.0 - 28 November 2024

### Major Changes

- b44a3b1: Migrates the adaptor to the new Tracker API (v36+) for
  `trackedEntities`, `enrollments`, `events` and `relationships`. Note that
  `trackedEntities` is no longer used.

  This release is designed for compatibility with DHIS2 v42, which drops support
  for a number of endpoints.

  The `create`, `update`, `upsert` and `destroy` functions will automatically
  map affected resources to the new tracker API endpoint.

  If you have an existing workflow which uses these functions with
  `trackedEntities`, `enrollments`, `events` or `relationships`, the data and
  options you pass may be incompatible with the new tracker API. You should
  review your code carefully against the
  [DHIS2 Tracker Migration Guide](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker-deprecated.html#webapi_tracker_migration)
  to see what's changed.

  For example, if you used to do:

  ```js
  create('trackedEntityInstances', {
    /*...*/
  });
  ```

  You should now do:

  ```js
  create('trackedEntities', {
    /*...*/
  });
  ```

  The payloads have also changed shape, so for example if you used to:

  ```js
  create('events', {
    trackedEntityInstance: 'eBAyeGv0exc',
    eventDate: '2024-01-01',
    /* ... */
  });
  ```

  You should now do:

  ```js
  create('events', {
    trackedEntity: 'eBAyeGv0exc',
    occurredAt: '2024-01-01',
    /* ... */
  });
  ```

  The HTTP APIs `get()`, `patch()`, and `post()` do not automatically map to the
  new tracker: they continue to call the URL you provide with the data you send.
  You can use this to continue to call the old tracker API directly.

### Minor Changes

- d30f39f: Added new post() operation

## 5.0.8 - 26 November 2024

### Patch Changes

- 94be282: Fix an issue where the path argument of update does not accept a
  function value

## 5.0.7 - 08 November 2024

### Patch Changes

- 6cb5377: Removed support for DHIS2 v42

## 5.0.6 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 5.0.5 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 5.0.4 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 5.0.3 - 09 October 2024

### Patch Changes

- 3fd13c2: Update axios to 1.7.7

## 5.0.2 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 5.0.1 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 5.0.0 - 01 August 2024

### Major Changes

- Export new common http helpers (http namespace)

## 4.2.1

### Patch Changes

- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 4.2.0 - 19 June 2024

### Minor Changes

- 5fb82f07: Export `group` operation from common

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 4.1.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 4.0.5 - 14 May 2024

### Patch Changes

- Fix attribute metadata

## 4.0.4 - 08 May 2024

### Patch Changes

- Security updates (lodash,undici)
- Updated dependencies
  - @openfn/language-common@1.13.2

## 4.0.3 - 24 October 2023

### Patch Changes

- 222184d: remove Class Log and replaced

  - `Log.success` with `console.log`
  - `Log.warn` with `console.warn`
  - `Log.error` with `console.error`

## 4.0.2 - 21 July 2023

### Patch Changes

- 1bd612e: improve error logs response

## 4.0.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 4.0.0

### Major Changes

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

## 3.2.12 - 31 May 2023

### Patch Changes

- 57742d1: improve logs output

## 3.2.11 - 31 March 2023

### Patch Changes

- 705caab: Remove tools as devdependencies

## 3.2.10 - 31 March 2023

### Patch Changes

- 929bca6: Use metadata helper function from common
- Updated dependencies \[929bca6]
  - @openfn/language-common@1.7.7

## 3.2.9 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 3.2.8 - 24 March 2023

### Patch Changes

- Fix metadata function export

## 3.2.7 - 10 March 2023

### Patch Changes

- c09b821: Add @magic annotations

## 3.2.6 - 16 February 2023

### Patch Changes

- df6098d: replace sample state with configuration

## 3.2.5 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 3.2.4 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 3.2.3 - 11 November 2022

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies \[f2a91a4]
  - @openfn/language-common@1.7.5

## 3.2.2 - 04 November 2022

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
  - @openfn/buildtools@1.0.2

## 3.2.1 - 21 October 2022

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions

## 3.2.0 - 19 October 2022

### Minor Changes

- f670bf8: Added credential schema to enable new ui

## 3.1.0 - 18 October 2022

### Minor Changes

- 8d6e8ce: Migrate dhis2 into repo

### Patch Changes

- Updated dependencies \[4671e89]
- Updated dependencies \[8d6e8ce]
  - @openfn/buildtools@1.0.1
