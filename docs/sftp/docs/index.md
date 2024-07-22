<dl>
<dt>
    <a href="#getcsv">getCSV(filePath, [parsingOptions])</a></dt>
<dt>
    <a href="#getjson">getJSON(filePath, encoding)</a></dt>
<dt>
    <a href="#list">list(dirPath, filter, [callback])</a></dt>
<dt>
    <a href="#normalizecsvarray">normalizeCSVarray(options, callback)</a></dt>
<dt>
    <a href="#putcsv">putCSV(localFilePath, remoteFilePath, parsingOptions)</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#chunk">chunk()</a>
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

## Functions
### getCSV

<p><code>getCSV(filePath, [parsingOptions]) ⇒ Operation</code></p>

Get a CSV and return a JSON array of strings for each item separated by the delimiter


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

### getJSON

<p><code>getJSON(filePath, encoding) ⇒ Operation</code></p>

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

* * *

### list

<p><code>list(dirPath, filter, [callback]) ⇒ Operation</code></p>

List files present in a directory


| Param | Type | Description |
| --- | --- | --- |
| dirPath | <code>string</code> | Path to remote directory |
| filter | <code>function</code> | a filter function used to select return entries |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example:** basic files listing
```js
list('/some/path/')
```
**Example:** list files with filters
```js
list('/some/path/', file=> {
 return /foo.\.txt/.test(file.name);
})
```
**Example:** list files with filters and use callback
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

### normalizeCSVarray

<p><code>normalizeCSVarray(options, callback) ⇒ Operation</code></p>

Convert JSON array of strings into a normalized object


| Param | Type | Description |
| --- | --- | --- |
| options | <code>options</code> | Options passed to csvtojson parser |
| callback | <code>callback</code> | Options passed to csvtojson parser |

**Example**
```js
normalizeCSVarray({ delimiter: ';', noheader: true });
```

* * *

### putCSV

<p><code>putCSV(localFilePath, remoteFilePath, parsingOptions) ⇒ Operation</code></p>

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

* * *

