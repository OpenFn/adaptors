<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.list](#module_Adaptor.list)
        * [new exports.list(dirPath)](#new_module_Adaptor.list_new)
    * [.getCSV](#module_Adaptor.getCSV)
        * [new exports.getCSV(filePath)](#new_module_Adaptor.getCSV_new)
    * [.putCSV](#module_Adaptor.putCSV)
        * [new exports.putCSV(localFilePath, remoteFilePath, parsingOptions)](#new_module_Adaptor.putCSV_new)
    * [.getJSON](#module_Adaptor.getJSON)
        * [new exports.getJSON(filePath, encoding)](#new_module_Adaptor.getJSON_new)
    * [.normalizeCSVarray](#module_Adaptor.normalizeCSVarray)
        * [new exports.normalizeCSVarray(options, callback)](#new_module_Adaptor.normalizeCSVarray_new)
    * [.execute(operations)](#module_Adaptor.execute) ⇒ <code>Operation</code>

<a name="module_Adaptor.list"></a>

### Adaptor.list
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.list_new"></a>

#### new exports.list(dirPath)
List files present in a directory


| Param | Type | Description |
| --- | --- | --- |
| dirPath | <code>string</code> | Path to resource |

**Example**  
```js
list('/some/path/')
```
<a name="module_Adaptor.getCSV"></a>

### Adaptor.getCSV
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.getCSV_new"></a>

#### new exports.getCSV(filePath)
Get a CSV and return a JSON array of strings for each item separated by the delimiter


| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path to resource |

**Example**  
```js
getCSV(
  '/some/path/to_file.csv'
);
```
<a name="module_Adaptor.putCSV"></a>

### Adaptor.putCSV
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.putCSV_new"></a>

#### new exports.putCSV(localFilePath, remoteFilePath, parsingOptions)
Convert JSON to CSV and upload to an FTP server


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
<a name="module_Adaptor.getJSON"></a>

### Adaptor.getJSON
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.getJSON_new"></a>

#### new exports.getJSON(filePath, encoding)
Fetch a json file from an FTP server


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
<a name="module_Adaptor.normalizeCSVarray"></a>

### Adaptor.normalizeCSVarray
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.normalizeCSVarray_new"></a>

#### new exports.normalizeCSVarray(options, callback)
Convert JSON array of strings into a normalized object


| Param | Type | Description |
| --- | --- | --- |
| options | <code>options</code> | Options passed to csvtojson parser |
| callback | <code>callback</code> | Options passed to csvtojson parser |

**Example**  
```js
normalizeCSVarray({ delimiter: ';', noheader: true });
```
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
