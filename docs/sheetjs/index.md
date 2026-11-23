<dl>
<dt>
    <a href="#jsontosheet">jsonToSheet(data, options)</a></dt>
<dt>
    <a href="#sheettocsv">sheetToCsv(content, options)</a></dt>
<dt>
    <a href="#sheettojson">sheetToJson(content, options)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#static_exports">static.exports</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
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
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
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
    <a href="/adaptors/packages/common-docs#group">group()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#map">map()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#scrubemojis">scrubEmojis()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>

## Functions
### jsonToSheet

<p><code>jsonToSheet(data, options) ⇒ Operation</code></p>


Build a spreadsheet file from an array of objects.

Writes `{ buffer, bookType, sheetName }` to `state.data`, or
`{ base64, bookType, sheetName }` with `output: 'base64'`.

Column headers come from the keys of the data. Pass `header` to fix their
order.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> | An array of objects, one per row |
| options | [<code>JsonToSheetOptions</code>](#jsontosheetoptions) | Optional write options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | an object with the file as `buffer` (or `base64` with `output: 'base64'`), plus `bookType` and `sheetName` |

**Example:** Build an xlsx buffer from records on state
```js
jsonToSheet($.data.records, { sheetName: 'Export' });
```
**Example:** Build a base64 xlsx file, ready to upload
```js
jsonToSheet($.data.records, { sheetName: 'Export', output: 'base64' });
```
**Example:** Write a CSV file with a fixed column order
```js
jsonToSheet($.data.records, {
  bookType: 'csv',
  header: ['id', 'name', 'dateOfBirth'],
});
```

* * *

### sheetToCsv

<p><code>sheetToCsv(content, options) ⇒ Operation</code></p>


Convert a worksheet into a CSV string and write it to `state.data`.

Reads the first sheet unless `sheetName` or `sheetIndex` says otherwise.
The content type is detected automatically. Pass `type` to override it.


| Param | Type | Description |
| --- | --- | --- |
| content | [<code>FileContent</code>](#filecontent) | The file content to convert |
| options | [<code>SheetToCsvOptions</code>](#sheettocsvoptions) | Optional conversion options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the CSV string |

**Example:** Convert an uploaded xlsx file straight to CSV
```js
sheetToCsv($.data.fileContent);
```
**Example:** Convert a named sheet
```js
sheetToCsv($.data.fileContent, { sheetName: 'Orders' });
```
**Example:** Use a semi-colon as the field separator
```js
sheetToCsv($.data.fileContent, { FS: ';' });
```

* * *

### sheetToJson

<p><code>sheetToJson(content, options) ⇒ Operation</code></p>


Convert a worksheet into an array of objects, one per row, and write it to
`state.data`.

Reads the first sheet unless `sheetName` or `sheetIndex` says otherwise.
The content type is detected automatically. Pass `type` to override it.


| Param | Type | Description |
| --- | --- | --- |
| content | [<code>FileContent</code>](#filecontent) | The file content to convert |
| options | [<code>SheetToJsonOptions</code>](#sheettojsonoptions) | Optional conversion options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | an array of row objects, or arrays of cell values with `header: 1` |

**Example:** Convert the first sheet of a file to JSON
```js
sheetToJson($.data.fileContent);
```
**Example:** Convert a named sheet
```js
sheetToJson($.data.fileContent, { sheetName: 'Orders' });
```
**Example:** Return dates as Date objects rather than Excel serial numbers
```js
sheetToJson($.data.fileContent, { cellDates: true });
```

* * *


## static

These functions belong to the static namespace.
### static.exports {#static_exports}

<p><code>module.exports</code></p>


The full [SheetJS library](https://docs.sheetjs.com/docs/api), for
anything the operations above don't cover. Its functions are not
operations, so call them inside `fn()`, not at the top level of a job.


**Example:** Read a workbook and convert a named sheet yourself
```js
fn(state => {
  const workbook = xlsx.read(state.data.fileContent, { type: 'base64' });
  state.rows = xlsx.utils.sheet_to_json(workbook.Sheets['Sheet1'], {
    header: 1,
    raw: false,
  });
  return state;
});
```

* * *


##  Interfaces

### FileContent

File content to read. Accepts a Buffer, a base64 string, a base64 data
URL, or the raw text of a CSV file.



* * *

### JsonToSheetOptions

Options for building a spreadsheet file from JSON. Accepts any
[SheetJS array of objects input option](https://docs.sheetjs.com/docs/api/utilities/array#array-of-objects-input)
and any [SheetJS write option](https://docs.sheetjs.com/docs/api/write-options#writing-options)
except `type` - use `output` instead.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Name of the worksheet. Default: `'Sheet1'`. |
| output | <code>&#x27;buffer&#x27;</code> \| <code>&#x27;base64&#x27;</code> | Return the file as a Buffer or a base64 string. Default: `'buffer'`. |


* * *

### SheetToCsvOptions

Options for converting a worksheet to CSV. Accepts any
[SheetJS CSV output option](https://docs.sheetjs.com/docs/api/utilities/csv#delimiter-separated-output)
and any [SheetJS parse option](https://docs.sheetjs.com/docs/api/parse-options#parsing-options).
`FS` appears in both lists, and applies to the CSV output.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Name of the sheet to convert. Defaults to the first sheet. |
| sheetIndex | <code>number</code> | Zero-based index of the sheet to convert. Ignored if `sheetName` is set. |
| rawNumbers | <code>boolean</code> | Write numbers as raw values rather than formatted text. |


* * *

### SheetToJsonOptions

Options for converting a worksheet to JSON. Accepts any
[SheetJS array output option](https://docs.sheetjs.com/docs/api/utilities/array#array-output)
and any [SheetJS parse option](https://docs.sheetjs.com/docs/api/parse-options#parsing-options).
`raw` and `UTC` appear in both lists, and apply to the conversion.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Name of the sheet to convert. Defaults to the first sheet. |
| sheetIndex | <code>number</code> | Zero-based index of the sheet to convert. Ignored if `sheetName` is set. |


* * *

