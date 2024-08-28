# @openfn/language-redis

## 1.2.0

### Minor Changes

- c1e3221: - Add `mGet()` function
  - Remove console.log in `hget()`
  - Add logging to `scan()`

## 1.1.2

### Patch Changes

- 8146c23: Fix typings in package.json
- Updated dependencies [8146c23]
  - @openfn/language-common@2.0.1

## 1.1.1

### Patch Changes

- 2b8ec34: - Update host type configuration-schema

## 1.1.0

### Minor Changes

- Add `jGet()` function
- Add `jSet()` function
- `scan()` now iterates the whole database
  - Removed `cursor` option from `scan`
  - Removed default value for `type` option
  - Mapped `json` data type to the redis internal type

## 1.0.0

First release. Designed as a low-level wrapper around npm redis client.

- get(key)
- hget(key, field)
- hGetAll(key)
- hset(key, value)
- scan(pattern,options)
- set(key, field)
