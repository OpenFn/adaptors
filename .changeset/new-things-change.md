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
appendValues('1abc...', { range: 'Sheet1!A1:E1', values: [['a', 'b']] });
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

// Now — accepts an array of range/values objects
batchUpdateValues(
  '1abc...',
  [{ range: 'Sheet1!A1', values: [['a']] }],
  { valueInputOption: 'RAW' }
);
```

**`getValues`**

Signature unchanged. Callback parameter has been removed; use `fn()` to transform the response instead.

