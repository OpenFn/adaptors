---
'@openfn/language-common': major
---

### Changes

- Added version locking to adaptors that uses `openfn/language-common`
  dependency to ensure consistent and predictable behavior across different
  environments.
- Removed `http` on `common` to improve compatibility and reduce potential
  security vulnerabilities.

### Deprecated

- Deprecated the use of _http.method()_ Eg: `http.post()` as it is no longer a
  part of the `@openfn/language-common`.

### Known Issues

- None at the moment.
