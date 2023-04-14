## Functions

<dl>
<dt><a href="#load">load(dirPath, projectId, datasetId, tableId, loadOptions, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Load files to BigQuery</p>
</dd>
<dt><a href="#parseCSV">parseCSV(target, config)</a> ⇒ <code>Operation</code></dt>
<dd><p>CSV-Parse for CSV conversion to JSON</p>
</dd>
</dl>

<a name="load"></a>

## load(dirPath, projectId, datasetId, tableId, loadOptions, callback) ⇒ <code>Operation</code>
Load files to BigQuery

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>dirPath</td><td><code>string</code></td><td><p>the path to your local directory</p>
</td>
    </tr><tr>
    <td>projectId</td><td><code>string</code></td><td><p>your bigquery project id</p>
</td>
    </tr><tr>
    <td>datasetId</td><td><code>string</code></td><td><p>your bigquery dataset id</p>
</td>
    </tr><tr>
    <td>tableId</td><td><code>string</code></td><td><p>the name of the table you&#39;d like to load</p>
</td>
    </tr><tr>
    <td>loadOptions</td><td><code>object</code></td><td><p>options to pass to the bigquery.load() API</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>and optional callback</p>
</td>
    </tr>  </tbody>
</table>

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

<a name="parseCSV"></a>

## parseCSV(target, config) ⇒ <code>Operation</code>
CSV-Parse for CSV conversion to JSON

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>target</td><td><code>String</code></td><td><p>string or local file with CSV data</p>
</td>
    </tr><tr>
    <td>config</td><td><code>Object</code></td><td><p>csv-parse config object</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
parseCSV("/home/user/someData.csv", {
	  quoteChar: '"',
	  header: false,
	});
```

* * *

