v0.4.0

## 1.10.0

### Minor Changes

- aad9549: Ensure that standard OAuth2 credentials with snake-cased
  "access_token" keys can be used for OAuth2-reliant adaptors

## 1.9.0

### Minor Changes

- 111807f: Add support for `parseCsv` in common

## 1.8.1

### Patch Changes

- Update lock files

## 1.8.0

### Minor Changes

- 2c1d603: Remove parameter reassignment to ensure proper functioning inside an
  `each` block; add eslint

  The packages receiving a major bump here exposed functions that didn't work as
  expected inside `each` blocks. Users were previously wrapping these functions
  inside their own custom `fn` blocks, and this change will ensure that they can
  be used inside a standard each.

  See https://github.com/OpenFn/adaptors/issues/275 for more details.

## 1.7.7

### Patch Changes

- 929bca6: Export metadata helper function

## 1.7.6

### Patch Changes

- 2b4c61a: mark execute private and ast build

## 1.7.5

### Patch Changes

- f2a91a4: Update package exports

## 1.7.4

### Patch Changes

- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- b5eb665: Adjusted docs for common and built to markdown
- # ecf5d30: remove sinon since it was not being used

Bumped all package versions to their latest.

# v0.0.4

- Added `arrayToString` helper.  
  Allowing you to join an array of string'able primitives (strings and integers)
  into a string.
- Added `toArray` helper.  
  This can be used to coerce certain types of data into an array, this can be
  useful when the source data has an ambiguous format. For example a given key
  in the data may have an object as it's value (when there is only one item),
  and an array of objects when there is more than one. `toArray` can be used to
  reconcile this inconsistency.
