## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#list">list(dirPath)</a> ⇒ <code>Operation</code></dt>
<dd><p>List files present in a directory</p>
</dd>
<dt><a href="#getCSV">getCSV(filePath)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get a CSV and return a JSON array of strings for each item separated by the delimiter</p>
</dd>
<dt><a href="#putCSV">putCSV(localFilePath, remoteFilePath, parsingOptions)</a> ⇒ <code>Operation</code></dt>
<dd><p>Convert JSON to CSV and upload to an FTP server</p>
</dd>
<dt><a href="#getJSON">getJSON(filePath, encoding)</a> ⇒ <code>Operation</code></dt>
<dd><p>Fetch a json file from an FTP server</p>
</dd>
<dt><a href="#normalizeCSVarray">normalizeCSVarray(options, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Convert JSON array of strings into a normalized object</p>
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
<a name="list"></a>

## list(dirPath) ⇒ <code>Operation</code>
List files present in a directory

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| dirPath | <code>string</code> | Path to resource |

**Example**  
```js
list('/some/path/')
```
<a name="getCSV"></a>

## getCSV(filePath) ⇒ <code>Operation</code>
Get a CSV and return a JSON array of strings for each item separated by the delimiter

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path to resource |

**Example**  
```js
getCSV(
  '/some/path/to_file.csv'
);
```
<a name="putCSV"></a>

## putCSV(localFilePath, remoteFilePath, parsingOptions) ⇒ <code>Operation</code>
Convert JSON to CSV and upload to an FTP server

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| localFilePath | <code>string</code> | Data source for data to copy to the remote server. |
| remoteFilePath | <code>string</code> | Path to the remote file to be created on the server. |
| parsingOptions | <code>object</code> | Options which can be passed to adjust the read and write stream used in sending the data to the remote server |

**Example**  
```js
putCSV(
  '/some/path/to_local_file.csv',
  '/some/path/to_remove_file.csv',
  { delimiter: ';', noheader: true }
);
```
<a name="getJSON"></a>

## getJSON(filePath, encoding) ⇒ <code>Operation</code>
Fetch a json file from an FTP server

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path to resource |
| encoding | <code>string</code> | Character encoding for the json |

**Example**  
```js
getJSON(
  '/path/To/File',
  'utf8',
);
```
<a name="normalizeCSVarray"></a>

## normalizeCSVarray(options, callback) ⇒ <code>Operation</code>
Convert JSON array of strings into a normalized object

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>options</code> | Options passed to csvtojson parser |
| callback | <code>callback</code> | Options passed to csvtojson parser |

**Example**  
```js
normalizeCSVarray({ delimiter: ';', noheader: true });
```
