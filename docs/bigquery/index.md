## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#load">load(dirPath, projectId, datasetId, tableId, loadOptions, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Load files to BigQuery</p>
</dd>
<dt><a href="#parseCSV">parseCSV(target, config)</a> ⇒ <code>Operation</code></dt>
<dd><p>CSV-Parse for CSV conversion to JSON</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
execute(
  create('foo'),
  delete('bar')
)(state)
```
<a name="load"></a>

## load(dirPath, projectId, datasetId, tableId, loadOptions, callback) ⇒ <code>Operation</code>
Load files to BigQuery

**Kind**: global function  
**Access**: public  

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
<a name="parseCSV"></a>

## parseCSV(target, config) ⇒ <code>Operation</code>
CSV-Parse for CSV conversion to JSON

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>String</code> | string or local file with CSV data |
| config | <code>Object</code> | csv-parse config object |

**Example**  
```js
parseCSV("/home/user/someData.csv", {
	  quoteChar: '"',
	  header: false,
	});
```
