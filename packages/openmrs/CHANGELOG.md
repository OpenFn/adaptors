# @openfn/language-openmrs

## 5.3.2 - 18 September 2025

### Patch Changes

- Updated dependencies \[e2bc436]
  - @openfn/language-common@3.1.0

## 5.3.1 - 01 September 2025

### Patch Changes

- Updated dependencies \[1d60531]
  - @openfn/language-common@3.0.3

## 5.3.0 - 25 July 2025

### Minor Changes

- 5c12ab4: - Add `http.put()` helper function
  - Fix docs on `http.request()`

## 5.2.2 - 14 July 2025

### Patch Changes

- Updated dependencies \[9b5a4f8]
  - @openfn/language-common@3.0.2

## 5.2.1 - 10 July 2025

### Patch Changes

- Updated dependencies \[cf9c09f]
  - @openfn/language-common@3.0.1

## 5.2.0 - 10 July 2025

### Minor Changes

- 19f2d7e: Exported `as()` function from common
- 8d78db4: Export `map()` function from common

### Patch Changes

- Updated dependencies \[ea85695]
- Updated dependencies \[3fce58f]
- Updated dependencies \[19f2d7e]
- Updated dependencies \[f26bd2b]
- Updated dependencies \[19f2d7e]
  - @openfn/language-common@3.0.0

## 5.1.0

### Minor Changes

- 3a97556: Add support for `language` option

## 5.0.4 - 20 June 2025

### Patch Changes

- Updated dependencies \[28c2e8b]
  - @openfn/language-common@2.5.0

## 5.0.3 - 14 June 2025

### Patch Changes

- be854ec: Fix an issue where upsert will wrongly trigger creation of an
  existing item
- 59251d5: Fix an issue where upsert will create to the wrong URL if there is no
  UUID in the path

## 5.0.2 - 22 April 2025

### Patch Changes

- 99e4b48: - Better handling of HTML content in http requests
  - When logging HTTP requests, include query parameters
- Updated dependencies \[99e4b48]
- Updated dependencies \[13bf08f]
  - @openfn/language-common@2.4.0

## 5.0.1 - 16 April 2025

### Patch Changes

- Updated dependencies \[b089c56]
  - @openfn/language-common@2.3.3

## 5.0.0 - 11 April 2025

Major re-write of the OpenMRS API. Cleaned up the main namespace with a shorter,
cleaner API and automatic pagination on `get()`.

### Major Changes

- Signatures changed for `get()`, `update()`, `upsert()`, and `create()`
- Removed `getEncounter()`, `getEncounters()`, `getPatient()`, `searchPatient()`
  and `post()` and `searchPerson()`
- Added automatic pagination to `get()`
- Removed `response` (and http semantics generally) from `get()`,
- Remove all callbacks

### Minor Changes

- Added new `destroy()` function (for delete)
- Documentation improvements

### Patch Changes

- Updated dependencies \[d7105c0]
  - @openfn/language-common@2.3.2

### Migration Guide

Signatures have all changed for the main OpenMRS rest functions `get()`,
`update()`, `upsert()`, and `create()`. Generally they take the form
`verb(path, [data], [options])`.

All removed getters (ie, `getPatient()`) are replaced by the
`get(path, options)` function introduced in `4.10.0`. Just pass a path to the
resource you need, and add a `{ query }` options object to search.

For example:

- Instead of `getEncounters()` , do `get('encounters')`
- Instead of `getEncounter('1234')`, do `get('encounters/1234')`
- Instead of `searchPatient({ query: 'sarah' })`, do
  `get('patient', { query: 'sarah' })`
- Instead of callback arguments, you can either use `.then()`:

```js
get('encounter/1234', state => {
  // the fetched resource is on state.data
  return state;
});
```

Or use an fn block:

```js
get('encounter/1234');
fn(state => {
  // the fetched resource is on state.data
  return state;
});
```

## 4.4.0 - 14 March 2025

### Minor Changes

- 23ccb01: Allow errors to be passed to the http helpers. This overrides the
  behaviour to throw if an error code is returned

### Patch Changes

- Updated dependencies \[23ccb01]
  - @openfn/language-common@2.3.1

## 4.3.0 - 28 January 2025

### Minor Changes

- 909d81f: Added `http.post()`, `http.delete()` and `http.get()`.

  removed the undocumented callback in `http.request()`.

## 4.2.0 - 20 January 2025

### Minor Changes

- 5d6839e: Implement namespaced http.request() function. The function makes a
  call against the `instanceUrl` and the path provided, while allowing
  manipulation to the API call as needed.

## 4.1.6 - 16 January 2025

### Patch Changes

- Updated dependencies \[b3d7f59]
- Updated dependencies \[2d709ff]
- Updated dependencies \[41e8cc3]
  - @openfn/language-common@2.3.0

## 4.1.5 - 16 January 2025

### Patch Changes

- Updated dependencies \[6dffdbd]
  - @openfn/language-common@2.2.1

## 4.1.4 - 09 January 2025

### Patch Changes

- Updated dependencies \[a47d8d5]
- Updated dependencies \[9240428]
  - @openfn/language-common@2.2.0

## 4.1.3 - 28 October 2024

### Patch Changes

- Updated docs for each()
- Updated dependencies
  - @openfn/language-common@2.1.1

## 4.1.2 - 18 October 2024

### Patch Changes

- Updated dependencies \[03a1a74]
  - @openfn/language-common@2.1.0

## 4.1.1 - 15 October 2024

### Patch Changes

- Fixed security vulnerability in jsonpath-plus \[33973a2]
  - @openfn/language-common@2.0.3

## 4.1.0 - 09 October 2024

### Minor Changes

- 1227829: Add `fhir.get()` function

## 4.0.2 - 03 October 2024

### Patch Changes

- b1c48c7: improve upsert operation

## 4.0.1 - 24 September 2024

### Patch Changes

- Updated dependencies \[77a690f]
  - @openfn/language-common@2.0.2

## 4.0.0 - 12 September 2024

### Major Changes

- Remove `createEncounter` and `createPatient` functions
- Add pagination support on request helper function

### Minor Changes

- c8dbd21: Add cursor and dateFns helper functions

### Migration Guide

The `createEncounter` and `createPatient` functions have been removed from the
OpenMRS adaptor. Use the `create` function with the appropriate resource type.

To create a new encounter, you can use the following code:

```js
create('encounter', $.encounter);
```

To create a new patient, you can use the following code:

```js
create('patient', $.patient);
```

## 3.1.4 - 16 August 2024

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies \[8146c23]
  - @openfn/language-common@2.0.1

## 3.1.3 - 01 August 2024

### Patch Changes

- Updated dependencies \[4fe527c]
  - @openfn/language-common@2.0.0

## 3.1.2 - 25 July 2024

### Patch Changes

- 73d0a02: Make documentation public
- Updated dependencies \[4c08444]
- Updated dependencies \[73d0a02]
  - @openfn/language-common@1.15.1

## 3.1.1 - 19 June 2024

### Patch Changes

- Updated dependencies \[5fb82f07]
  - @openfn/language-common@1.15.0

## 3.1.0 - 13 June 2024

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies \[106ecf6d]
  - @openfn/language-common@1.14.0

## 3.0.6 - 11 June 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.5

## 3.0.5 - 21 May 2024

### Patch Changes

- Updated dependencies \[12f02ed5]
  - @openfn/language-common@1.13.4

## 3.0.4 - 08 May 2024

### Patch Changes

- Updated dependencies \[88f99a8f]
  - @openfn/language-common@1.13.3

## 3.0.3 - 08 May 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.2

## 3.0.2 - 12 April 2024

### Patch Changes

- Updated dependencies
  - @openfn/language-common@1.13.1

## 3.0.1 - 12 April 2024

### Patch Changes

- Updated dependencies \[1ad86651]
  - @openfn/language-common@1.13.0

## 3.0.0 - 03 April 2024

### Major Changes

- cadff13b: - Remove superagent dependency.
  - Rebase on new common http request helper.
  - Remove login function as no longer needed.
  - Update log output

## 2.0.8 - 20 September 2023

### Patch Changes

- Updated dependencies \[c19efbe]
  - @openfn/language-common@1.11.1

## 2.0.7 - 08 September 2023

### Patch Changes

- Updated dependencies \[85c35b8]
  - @openfn/language-common@1.11.0

## 2.0.6 - 14 August 2023

### Patch Changes

- Updated dependencies \[df09270]
  - @openfn/language-common@1.10.3

## 2.0.5 - 14 July 2023

### Patch Changes

- Updated dependencies \[26a303e]
  - @openfn/language-common@1.10.2

## 2.0.4 - 14 July 2023

### Patch Changes

- Updated dependencies \[8c32eb3]
  - @openfn/language-common@1.10.1

## 2.0.3 - 30 June 2023

### Patch Changes

- Updated dependencies \[aad9549]
  - @openfn/language-common@1.10.0

## 2.0.2 - 23 June 2023

### Patch Changes

- Updated dependencies \[111807f]
  - @openfn/language-common@1.9.0

## 2.0.1 - 19 June 2023

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 2.0.0

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

## 1.1.1 - 15 June 2023

### Patch Changes

- 2390129: - replace throw new Error with console.log
  - improve Log function

## 1.1.0 - 10 June 2023

### Minor Changes

- d124f67: - Add create, update and upsert function
  - Add callback support and improve examples for
    - get()
    - post()
    - getPatient()
    - searchPerson()
    - getEncounter()
    - searchPatient()
    - createPatient()
    - getEncounters()
    - createEncounter()

## 1.0.1 - 31 May 2023

### Patch Changes

- 97cc7ce: - Fix checking for empty response
  - Style logs output

## 1.0.0 - 30 May 2023

### Major Changes

- b6478c0: - Removed `request` in favour of `superagent`
  - Improve error handling
  - Moved `login` to execute function
  - Added
    - `createPatient`
    - `searchPatient`
    - `searchPerson`
    - `getEncounters`
    - `getEncounter`
    - `get`
    - `post`

## 0.10.5 - 31 March 2023

### Patch Changes

- Updated dependencies \[929bca6]
  - @openfn/language-common@1.7.7

## 0.10.4 - 30 March 2023

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies \[2b4c61a]
  - @openfn/language-common@1.7.6

## 0.10.3 - 15 February 2023

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.10.2 - 15 February 2023

### Patch Changes

- f2aed32: add examples

## 0.10.1 - 13 January 2023

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*\_ @module Adaptor \_/

## 0.10.0 - 25 November 2022

### Minor Changes

- 6786949: Migrate OpenMRS
