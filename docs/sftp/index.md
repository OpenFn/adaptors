## Functions

<dl>
<dt>
    <a href="#">getCSV(filePath, [parsingOptions])</a></dt>
<dt>
    <a href="#">getJSON(filePath, encoding)</a></dt>
<dt>
    <a href="#">list(dirPath, filter, [callback])</a></dt>
<dt>
    <a href="#">normalizeCSVarray(options, callback)</a></dt>
<dt>
    <a href="#">putCSV(localFilePath, remoteFilePath, parsingOptions)</a></dt>
</dl>


## getCSV

getCSV(filePath, [parsingOptions]) ⇒ <code>Operation</code>
Get a CSV and return a JSON array of strings for each item separated by the delimiter

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path to resource |
| [parsingOptions] | <code>Object</code> | Optional. `parsingOptions` Parsing options which can be passed to convert csv to json See more [on csvtojson docs](https://github.com/Keyang/node-csvtojson#parameters) |

**Example**  
```js
getCSV(
  '/some/path/to_file.csv',
  {delimiter: ";", flatKeys: true }
);
```

* * *

## getJSON

getJSON(filePath, encoding) ⇒ <code>Operation</code>
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

* * *

## list

list(dirPath, filter, [callback]) ⇒ <code>Operation</code>
List files present in a directory

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| dirPath | <code>string</code> | Path to remote directory |
| filter | <code>function</code> | a filter function used to select return entries |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example** *(basic files listing)*  
```js
list('/some/path/')
```
**Example** *(list files with filters)*  
```js
list('/some/path/', file=> {
 return /foo.\.txt/.test(file.name);
})
```
**Example** *(list files with filters and use callback)*  
```js
list(
  "/some/path/",
  (file) => /foo.\.txt/.test(file.name),
  (state) => {
    const latestFile = state.data.filter(
      (file) => file.modifyTime <= new Date()
    );
    return { ...state, latestFile };
  }
);
```

* * *

## normalizeCSVarray

normalizeCSVarray(options, callback) ⇒ <code>Operation</code>
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

* * *

## putCSV

putCSV(localFilePath, remoteFilePath, parsingOptions) ⇒ <code>Operation</code>
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

* * *
