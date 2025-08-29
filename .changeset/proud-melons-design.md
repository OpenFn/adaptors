---
'@openfn/language-salesforce': major
---

- Add `bulk1` functions for bulk insert, update, upsert, and destroy
- Removed `bulk()` function in favor of explicit `bulk1` and `bulk2` APIs
- Removed `bulkQuery()` function in favor of `bulk1.query()` and `bulk2.query()`

# Migration Guide

The legacy `bulk()` and `bulkQuery()` functions have been replaced with `bulk1`
and `bulk2` APIs that provide better control and clarity:

## Bulk Operations

**Before:**

````javascript
bulk('Account', 'insert', records, options);
bulk('Account', 'update', records, options);
bulk('Account', 'upsert', records, { extIdField: 'Id__c' });
bulk('Account', 'delete', records, options);
```
**After:**

```javascript
// Bulk API 1.0 - More reliable, supports failOnError
bulk1.insert('Account', records, { failOnError: true });
bulk1.update('Account', records, { batchSize: 5000 });
bulk1.upsert('Account', 'Id__c', records);
bulk1.destroy('Account', records);

// Bulk API 2.0 - Faster performance, simplified error handling
bulk2.insert('Account', records);
bulk2.update('Account', records);
bulk2.upsert('Account', 'Id__c', records);
bulk2.destroy('Account', records);
````

### Bulk Queries

**Before**

```js
bulkQuery('select Id, Name from Account');
```

**After**

```js
bulk1.query('select Id, Name from Account');
// or
bulk2.query('select Id, Name from Account');
```
