# @openfn/language-dhis2

## 6.0.1

### Patch Changes

- ab94b7c: Fix links in docs examples

## 6.0.0

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

## 5.0.8

### Patch Changes

- 94be282: Fix an issue where the path argument of update does not accept a
  function value

## 5.0.7

### Patch Changes

- 6cb5377: Removed support for DHIS2 v42

## 5.0.6

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 5.0.5

### Patch Changes

- Updated dependencies [03a1a74]
  - @openfn/language-common@2.1.0

## 5.0.4

### Patch Changes

- Fixed security vulnerability in jsonpath-plus [33973a2]
  - @openfn/language-common@2.0.3

## 5.0.3

### Patch Changes

- 3fd13c2: Update axios to 1.7.7

## 5.0.2

### Patch Changes

- Updated dependencies [77a690f]
  - @openfn/language-common@2.0.2

## 5.0.1

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies [8146c23]
  - @openfn/language-common@2.0.1

## 5.0.0

### Major Changes

- Export new common http helpers (http namespace)

## 4.2.1

### Patch Changes

- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 4.2.0

### Minor Changes

- 5fb82f07: Export `group` operation from common

### Patch Changes

- Updated dependencies [5fb82f07]
  - @openfn/language-common@1.15.0

## 4.1.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 4.0.5

### Patch Changes

- Fix attribute metadata

## 4.0.4

### Patch Changes

- Security updates (lodash,undici)
- Updated dependencies
  - @openfn/language-common@1.13.2

## 4.0.3

### Patch Changes

- 222184d: remove Class Log and replaced

  - `Log.success` with `console.log`
  - `Log.warn` with `console.warn`
  - `Log.error` with `console.error`

## 4.0.2

### Patch Changes

- 1bd612e: improve error logs response

## 4.0.1

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

- Updated dependencies [2c1d603]
  - @openfn/language-common@1.8.0

## 3.2.12

### Patch Changes

- 57742d1: improve logs output

## 3.2.11

### Patch Changes

- 705caab: Remove tools as devdependencies

## 3.2.10

### Patch Changes

- 929bca6: Use metadata helper function from common
- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 3.2.9

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 3.2.8

### Patch Changes

- Fix metadata function export

## 3.2.7

### Patch Changes

- c09b821: Add @magic annotations

## 3.2.6

### Patch Changes

- df6098d: replace sample state with configuration

## 3.2.5

### Patch Changes

- f2aed32: add examples

## 3.2.4

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 3.2.3

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 3.2.2

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
  - @openfn/buildtools@1.0.2

## 3.2.1

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions

## 3.2.0

### Minor Changes

- f670bf8: Added credential schema to enable new ui

## 3.1.0

### Minor Changes

- 8d6e8ce: Migrate dhis2 into repo

### Patch Changes

- Updated dependencies [4671e89]
- Updated dependencies [8d6e8ce]
  - @openfn/buildtools@1.0.1
