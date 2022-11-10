<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute(operations)](#module_Adaptor.execute) ⇒ <code>Operation</code>
    * [.load(dirPath, projectId, datasetId, tableId, loadOptions, callback)](#module_Adaptor.load) ⇒ <code>Operation</code>
    * [.parseCSV(target, config)](#module_Adaptor.parseCSV) ⇒ <code>Operation</code>

<a name="module_Adaptor.execute"></a>

### Adaptor.execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  

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
<a name="module_Adaptor.load"></a>

### Adaptor.load(dirPath, projectId, datasetId, tableId, loadOptions, callback) ⇒ <code>Operation</code>
Load files to BigQuery

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.parseCSV"></a>

### Adaptor.parseCSV(target, config) ⇒ <code>Operation</code>
CSV-Parse for CSV conversion to JSON

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
