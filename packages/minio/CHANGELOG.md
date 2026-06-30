# @openfn/language-minio

## 1.1.2

### Patch Changes

- c5f8728: Update undici dependency
- Updated dependencies [c5f8728]
  - @openfn/language-common@3.3.4

## 1.1.1 - 27 May 2026

### Patch Changes

- Updated dependencies \[5276a86]
  - @openfn/language-common@3.3.3

## 1.1.0 - 21 May 2026

### Minor Changes

- bf26881: export `log` function from common

## 1.0.3 - 20 May 2026

### Patch Changes

- Updated dependencies \[9d1e1ae]
  - @openfn/language-common@3.3.2

## 1.0.2 - 06 May 2026

### Patch Changes

- Move `minio` SDK from `devDependency` to `dependency` in `package.json`

## 1.0.1 - 29 April 2026

### Patch Changes

- 7672894: Make `port` configuration optional

## 1.0.0 - 27 April 2026

Implemented MinIO adaptor operations for object upload, retrieval, listing, and
tag management (`putObject`, `getObject`, `listObjects`, `setObjectTags`, and
`getObjectTags`)
