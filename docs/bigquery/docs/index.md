
The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
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
    <a href="/adaptors/packages/common-docs#http">http()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#parsecsv">parseCsv()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## load

load(dirPath, projectId, datasetId, tableId, loadOptions, callback) ⇒ <code>Operation</code>

Load files to BigQuery


| Param | Type | Description |
| --- | --- | --- |
| dirPath | <code>string</code> | the path to your local directory |
| projectId | <code>string</code> | your bigquery project id |
| datasetId | <code>string</code> | your bigquery dataset id |
| tableId | <code>string</code> | the name of the table you'd like to load |
| loadOptions | <code>object</code> | options to pass to the bigquery.load() API |
| callback | <code>function</code> | and optional callback |

**Example**  
```js
load(
  './tmp/files',
  'my-bg-project',
  'test01',
  'product-codes',
  {
    schema: 'FREQ:STRING,DATATYPE:STRING,PRODUCTCODE:STRING,PARTNER:STRING',
    writeDisposition: 'WRITE_APPEND',
    skipLeadingRows: 1,
    schemaUpdateOptions: ['ALLOW_FIELD_ADDITION'],
    createDisposition: 'CREATE_IF_NEEDED',
  }
)
```

* * *

