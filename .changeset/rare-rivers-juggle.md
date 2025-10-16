---
'@openfn/language-salesforce': major
---

- Add `failOnError` option in bulk2 functions
- Default `failOnError` to `true` in bulk1 functions
- Fix `v8.0.0` migration guide typos
- Remove `BulkOptions` and `BulkQueryOptions` typedefs

### Migration Guide

If you want to keep the old behavior, you can pass `failOnError: false` in the
options:

**For Example: Bulk upsert continue on error**

before:

```js
bulk1.upsert('Account', [{ External_Id__c: 'EXT001', Name: 'Upserted Name' }], {
  extIdField: 'External_Id__c',
  pollInterval: 3000,
});
```

now:

```js
bulk1.upsert('Account', [{ External_Id__c: 'EXT001', Name: 'Upserted Name' }], {
  extIdField: 'External_Id__c',
  pollInterval: 3000,
  failOnError: false,
});
```

> Note: The `failOnError` option is available in `bulk1` and `bulk2` functions.
