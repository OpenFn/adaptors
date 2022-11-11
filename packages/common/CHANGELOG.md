v0.4.0

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
