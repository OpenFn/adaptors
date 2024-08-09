# @openfn/language-redis

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
