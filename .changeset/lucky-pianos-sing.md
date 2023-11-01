---
'@openfn/language-common': major
---

### Changes

- Added version locking to adaptors that uses `openfn/language-common`
  dependency to ensure consistent and predictable behavior across different
  environments.
- Removed `http` on `common` to improve compatibility and reduce potential
  security vulnerabilities.
- Removed unused dependencies `axios`, `csv2json` and `nock`
