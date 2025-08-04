---
'@openfn/language-salesforce': minor
---

## Added Salesforce Bulk API 2.0 Operations

- Added `bulk2.query()` - Execute SOQL queries using Bulk API 2.0
- Added `bulk2.insert()` - Bulk insert records
- Added `bulk2.update()` - Bulk update records
- Added `bulk2.upsert()` - Bulk `upsert` records with external ID matching
- Added `bulk2.destroy()` - Bulk delete records

All operations support custom options for polling interval and timeout.
