<dl>
<dt>
    <a href="#appendvalues">appendValues(params, callback)</a></dt>
<dt>
    <a href="#batchupdatevalues">batchUpdateValues(params, callback)</a></dt>
<dt>
    <a href="#getvalues">getValues(spreadsheetId, range, callback)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
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
    <a href="/adaptors/packages/common-docs#http">http</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### appendValues

<p><code>appendValues(params, callback) ⇒ Operation</code></p>

Add an array of rows to the spreadsheet.
https://developers.google.com/sheets/api/samples/writing#append_values


| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Data object to add to the spreadsheet. |
| [params.spreadsheetId] | <code>string</code> | The spreadsheet ID. |
| [params.range] | <code>string</code> | The range of values to update. |
| [params.values] | <code>array</code> | A 2d array of values to update. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**
```js
appendValues({
  spreadsheetId: '1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos',
  range: 'Sheet1!A1:E1',
  values: [
    ['From expression', '$15', '2', '3/15/2016'],
    ['Really now!', '$100', '1', '3/20/2016'],
  ],
})
```

* * *

### batchUpdateValues

<p><code>batchUpdateValues(params, callback) ⇒ Operation</code></p>

Batch update values in a Spreadsheet.

**Returns**: <code>Operation</code> - spreadsheet information  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Data object to add to the spreadsheet. |
| [params.spreadsheetId] | <code>string</code> | The spreadsheet ID. |
| [params.range] | <code>string</code> | The range of values to update. |
| [params.valueInputOption] | <code>string</code> | (Optional) Value update options. Defaults to 'USER_ENTERED' |
| [params.values] | <code>array</code> | A 2d array of values to update. |
| callback | <code>function</code> | (Optional) callback function |

**Example**
```js
batchUpdateValues({
  spreadsheetId: '1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos',
  range: 'Sheet1!A1:E1',
  values: [
    ['From expression', '$15', '2', '3/15/2016'],
    ['Really now!', '$100', '1', '3/20/2016'],
  ],
})
```

* * *

### getValues

<p><code>getValues(spreadsheetId, range, callback) ⇒ Operation</code></p>

Gets cell values from a Spreadsheet.

**Returns**: <code>Operation</code> - spreadsheet information  

| Param | Type | Description |
| --- | --- | --- |
| spreadsheetId | <code>string</code> | The spreadsheet ID. |
| range | <code>string</code> | The sheet range. |
| callback | <code>function</code> | (Optional) callback function |

**Example**
```js
getValues('1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos','Sheet1!A1:E1')
```

* * *


