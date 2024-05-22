---
'@openfn/language-salesforce': patch
---

- Set default API version to `47.0`
- In `bulkQuery` throw errors if API version is less than `47.0`
- Update `bulkQuery` jsdocs with a link to `Bulk API 2.0 Query`
