<dl>
<dt>
    <a href="#appendvalues">appendValues(spreadsheetId, range, values, [options])</a></dt>
<dt>
    <a href="#batchupdatevalues">batchUpdateValues(spreadsheetId, data, [options])</a></dt>
<dt>
    <a href="#getvalues">getValues(spreadsheetId, range)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#cursor">cursor()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#each">each()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#field">field()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fields">fields()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fn">fn()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fnif">fnIf()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#log">log()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### appendValues

<p><code>appendValues(spreadsheetId, range, values, [options]) ⇒ Operation</code></p>

Append one or more rows to a spreadsheet range.
https://developers.google.com/sheets/api/samples/writing#append_values


| Param | Type | Description |
| --- | --- | --- |
| spreadsheetId | <code>string</code> | The spreadsheet ID. |
| range | <code>string</code> | The sheet range. |
| values | <code>array</code> | The values to append. |
| [options] | <code>Object</code> | Optional settings. |
| [options.valueInputOption] | <code>string</code> | Defaults to 'USER_ENTERED'. |


**Example**
```js
appendValues(
  '1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos',
  'Sheet1!A1:E1',
  [['From expression', '$15', '2', '3/15/2016'], ['Really now!', '$100', '1', '3/20/2016']]
)
```

* * *

### batchUpdateValues

<p><code>batchUpdateValues(spreadsheetId, data, [options]) ⇒ Operation</code></p>

Batch update values in a Spreadsheet.

**Returns**: <code>Operation</code> - spreadsheet information  

| Param | Type | Description |
| --- | --- | --- |
| spreadsheetId | <code>string</code> | The spreadsheet ID. |
| data | <code>Array.&lt;{range: string, values: array}&gt;</code> | Array of range/values objects to update. |
| [options] | <code>Object</code> | Optional settings. |
| [options.valueInputOption] | <code>string</code> | Defaults to 'USER_ENTERED'. |


**Example:** Update multiple separate ranges
```js
batchUpdateValues(
  '1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos',
  [
    { range: 'Sheet1!A1', values: [['value1']] },
    { range: 'Sheet1!B5', values: [['value2']] },
    { range: 'Sheet1!D10:E11', values: [['a', 'b'], ['c', 'd']] },
  ],
  { valueInputOption: 'RAW' }
)
```

* * *

### getValues

<p><code>getValues(spreadsheetId, range) ⇒ Operation</code></p>

Gets cell values from a Spreadsheet.

**Returns**: <code>Operation</code> - spreadsheet information  

| Param | Type | Description |
| --- | --- | --- |
| spreadsheetId | <code>string</code> | The spreadsheet ID. |
| range | <code>string</code> | The sheet range. |


**Example**
```js
getValues('1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos','Sheet1!A1:E1')
```

* * *


