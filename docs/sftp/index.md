## Functions

<dl>
<dt>
    <a href="#getCSV">getCSV(filePath)</a></dt>
<dt>
    <a href="#getJSON">getJSON(filePath, encoding)</a></dt>
<dt>
    <a href="#list">list(dirPath)</a></dt>
<dt>
    <a href="#normalizeCSVarray">normalizeCSVarray(options, callback)</a></dt>
<dt>
    <a href="#putCSV">putCSV(localFilePath, remoteFilePath, parsingOptions)</a></dt>
</dl>

## getCSV

getCSV(filePath) ⇒ <code>Operation</code>
Get a CSV and return a JSON array of strings for each item separated by the delimiter

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
    <td>filePath</td><td><code>string</code></td><td><p>Path to resource</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getCSV(
  '/some/path/to_file.csv'
);
```

* * *

## getJSON

getJSON(filePath, encoding) ⇒ <code>Operation</code>
Fetch a json file from an FTP server

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
    <td>filePath</td><td><code>string</code></td><td><p>Path to resource</p>
</td>
    </tr><tr>
    <td>encoding</td><td><code>string</code></td><td><p>Character encoding for the json</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getJSON(
  '/path/To/File',
  'utf8',
);
```

* * *

## list

list(dirPath) ⇒ <code>Operation</code>
List files present in a directory

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
    <td>dirPath</td><td><code>string</code></td><td><p>Path to resource</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
list('/some/path/')
```

* * *

## normalizeCSVarray

normalizeCSVarray(options, callback) ⇒ <code>Operation</code>
Convert JSON array of strings into a normalized object

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
    <td>options</td><td><code>options</code></td><td><p>Options passed to csvtojson parser</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>callback</code></td><td><p>Options passed to csvtojson parser</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
normalizeCSVarray({ delimiter: ';', noheader: true });
```

* * *

## putCSV

putCSV(localFilePath, remoteFilePath, parsingOptions) ⇒ <code>Operation</code>
Convert JSON to CSV and upload to an FTP server

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
    <td>localFilePath</td><td><code>string</code></td><td><p>Data source for data to copy to the remote server.</p>
</td>
    </tr><tr>
    <td>remoteFilePath</td><td><code>string</code></td><td><p>Path to the remote file to be created on the server.</p>
</td>
    </tr><tr>
    <td>parsingOptions</td><td><code>object</code></td><td><p>Options which can be passed to adjust the read and write stream used in sending the data to the remote server</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
putCSV(
  '/some/path/to_local_file.csv',
  '/some/path/to_remove_file.csv',
  { delimiter: ';', noheader: true }
);
```

* * *

