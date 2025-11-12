# @openfn/language-erpnext

## 1.0.1 - 12 November 2025

### Patch Changes

- Updated dependencies \[4d7a833]
  - @openfn/language-common@3.2.0

## 1.0.0 - 04 November 2025

### Major Changes

Initial adaptor release with CRUD and list operations for ERPNext/Frappe.

- `create` - Create documents in ERPNext
- `read` - Read documents by name
- `update` - Update existing documents
- `deleteRecord` - Delete documents
- `getList` - List documents with filters, pagination, and field selection
- `getCount` - Count documents matching filters

Authentication via API Key/Secret with token-based auth.
