# @openfn/language-collections

## 0.5.2

### Patch Changes

- Fix an issue where sometimes the JSON stream would skip tokens and result in a
  smaller payload being returned

## 0.5.1

### Patch Changes

- set() will now upsert items in batches of 1000

## 0.5.0

### Minor Changes

- b73b063: - Added pagination support
  - Removed `updated_*` time filters

## 0.4.0

### Minor Changes

- Fixed support for delete

## 0.3.0

### Minor Changes

- 1e472ed: Update new GET request structure Fix streaming API

### Patch Changes

- 32e5a03: Fix an issue where the query object isn't getting sent to the server

## 0.2.0

### Minor Changes

- f4deb81: Updates to latest spec

## 0.1.0

Initial experiemntal release, with `collections.get`, `collections.each`,
`collections.remove` and `collections.set`
