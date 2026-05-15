---
'@openfn/language-googlesheets': major
---

Updated `appendValues()`, `batchUpdateValues()`, and `getValues()` to use positional arguments instead of a single params object.

### Migration Guide

**`appendValues`**

```js
// Before
appendValues({
  spreadsheetId: '1abc...',
  range: 'Sheet1!A1:E1',
  values: [['a', 'b']],
});

// Now
appendValues(
  '1abc...',
  { range: 'Sheet1!A1:E1', values: [['a', 'b']] },
);
```

**`batchUpdateValues`**

```js
// Before
batchUpdateValues({
  spreadsheetId: '1abc...',
  range: 'Sheet1!A1',
  values: [['a']],
  valueInputOption: 'RAW',
});

// Now
batchUpdateValues(
  '1abc...',
  [{ range: 'Sheet1!A1', values: [['a']] }],
  { valueInputOption: 'RAW' }
);
```

Callback parameter has been removed from `appendValues()`, `batchUpdateValues()`, and `getValues()` in favor of a promise-based API.

