---
'@openfn/language-redis': minor
---

- `scan` now iterate the whole database
- Removed `cursor` option from `scan`.
- Removed default value for `type` option
- Mapped `json` data type to the redis internal type
