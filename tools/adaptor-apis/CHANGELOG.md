# @openfn/adaptor-apis

## 0.2.3

### Patch Changes

- Log errors

## 0.2.2

### Patch Changes

- 8ad6b98: fix: compatibility with Windows for build tools and documentation
  generation fix(common): resolve invalid URL scheme error on Windows

  Note: Use `pathToFileURL` for dynamic imports to avoid
  `ERR_UNSUPPORTED_ESM_URL_SCHEME` on Windows; build tooling entry paths were
  normalized and now handle missing `build.config.js` gracefully.

  ```

  ---
  "@openfn/language-common": patch
  "@openfn/adaptor-apis": patch
  ---

  fix: compatibility with Windows for build tools and documentation generation
  fix(common): resolve invalid URL scheme error on Windows
  ```

## 0.2.1

### Patch Changes

- 8e17255: Improve error handling for adaptor versions that can't be retrieved

## 0.2.0

### Minor Changes

- 1b1b5cf: Include signature field in generated docs
