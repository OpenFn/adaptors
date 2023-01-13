# @openfn/language-primero

## 2.10.3

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/
- 059c956: added examples in docstring

## 2.10.2

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 2.10.1

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-common@1.7.4

## 2.10.0

### Minor Changes

- 33742bf: Modify `composeNextState` so that `getCases` can pass it a third
  argument: the metadata from Primero's response.

  `getCases` will now not only return an array of `cases` in `state.data`, but
  metadata related to pagination in `state.metadata`.

### Patch Changes

- 2014694: remove travis url in readme
- bb764db: Conditionally check for 'withReferrals' in case no options are
  provided"

## 2.9.2

### Patch Changes

- e04aa28: Rename credential-schema to configuration-schema, update descriptions

## 2.9.1

### Patch Changes

- d4ac748: Skipped failing test until we have a new strat (it's working)

## 2.9.0

### Minor Changes

- b37a4ad: add language primero into monorepo

### Patch Changes

- adb97a0: Fixed issue where upsertCase always took state.data for main params
