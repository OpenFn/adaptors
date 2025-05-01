<dl>
<dt>
    <a href="#create">create(resource, data, callback)</a></dt>
<dt>
    <a href="#get">get(path, query, callback)</a></dt>
<dt>
    <a href="#getdrive">getDrive(specifier, name, [callback])</a></dt>
<dt>
    <a href="#getfile">getFile(pathOrId, options, [callback])</a></dt>
<dt>
    <a href="#getfolder">getFolder(pathOrId, options, [callback])</a></dt>
<dt>
    <a href="#uploadfile">uploadFile(resource, data, callback)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#Utils_sheetToBuffer">Utils.sheetToBuffer(rows, options)</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
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
### create

<p><code>create(resource, data, callback) ⇒ Operation</code></p>

Create some resource in msgraph


| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | The type of entity that will be created |
| data | <code>object</code> | The data to create the new resource |
| callback | <code>function</code> | An optional callback function |

**Example**
```js
create("applications", {"displayName": "My App"})
```

* * *

### get

<p><code>get(path, query, callback) ⇒ Operation</code></p>

Make a GET request to msgraph resource


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| query | <code>object</code> | Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**
```js
get('sites/root/lists')
```

* * *

### getDrive

<p><code>getDrive(specifier, name, [callback]) ⇒ Operation</code></p>

Get a Drive or SharePoint document library. The drive metadata will be written
to state.drives, where it can be used by other adaptor functions.
Pass { id } to get a drive by id or { id, owner } to get default drive for
some parent resource, like a group


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| specifier | <code>Object</code> |  | A definition of the drive to retrieve    - id {string} - The ID of the resource or owner.    - owner {string} - The type of drive owner (e.g. sites, groups). |
| name | <code>string</code> |  | The local name of the drive used to write to state.drives, ie, state.drives[name] |
| [callback] | <code>function</code> | <code>s &#x3D;&gt; s</code> | (Optional) Callback function |

**Example:** Get a drive by ID
```js
getDrive({ id: "YXzpkoLwR06bxC8tNdg71m" })
```
**Example:** Get the default drive for a site
```js
getDrive({ id: "openfn.sharepoint.com", owner: "sites" })
```

* * *

### getFile

<p><code>getFile(pathOrId, options, [callback]) ⇒ Operation</code></p>

Get file metadata or file content.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pathOrId | <code>string</code> |  | A path to a file or file id |
| options | <code>object</code> |  | (Optional) Query parameters |
| [callback] | <code>function</code> | <code>s &#x3D;&gt; s</code> | (Optional) Callback function |

**Example:** Get a file by ID
```js
getFile('01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW')
```
**Example:** Get a file for a named drive by id
```js
getFile("01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW",{ driveName: "mydrive"})
```

* * *

### getFolder

<p><code>getFolder(pathOrId, options, [callback]) ⇒ Operation</code></p>

Get the contents or metadata of a folder.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pathOrId | <code>string</code> |  | A path to a folder or folder id |
| options | <code>object</code> |  | (Optional) Query parameters |
| [callback] | <code>function</code> | <code>s &#x3D;&gt; s</code> | (Optional) Callback function |

**Example:** Get a folder by ID
```js
getFolder('01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3')
```
**Example:** Get a folder for a named drive by id
```js
getFolder("01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3",{ driveName: "mydrive"})
```

* * *

### uploadFile

<p><code>uploadFile(resource, data, callback) ⇒ Operation</code></p>

Upload a file to a drive


| Param | Type | Description |
| --- | --- | --- |
| resource | <code>Object</code> | Resource Object |
| [resource.driveId] | <code>String</code> | Drive Id |
| [resource.driveId] | <code>String</code> | Site Id |
| [resource.folderId] | <code>String</code> | Parent folder id |
| [resource.contentType] | <code>String</code> | Resource content-type |
| [resource.onConflict] | <code>String</code> | Specify conflict behavior if file with the same name exists. Can be "rename | fail | replace" |
| data | <code>Object</code> | A buffer containing the file. |
| callback | <code>function</code> | Optional callback function |

**Example:** Upload Excel file to a drive using `driveId` and `parantItemId`
```js
uploadFile(
  state => ({
    driveId: state.driveId,
    folderId: state.folderId,
    fileName: `Tracker.xlsx`,
  }),
  state => state.buffer
);
```
**Example:** Upload Excel file to a SharePoint drive using `siteId` and `parantItemId`
```js
uploadFile(
  state => ({
    siteId: state.siteId,
    folderId: state.folderId,
    fileName: `Report.xlsx`,
  }),
  state => state.buffer
);
```

* * *


## Utils

These functions belong to the Utils namespace.
### Utils.sheetToBuffer {#Utils_sheetToBuffer}

<p><code>sheetToBuffer(rows, options) ⇒</code></p>

The function `sheetToBuffer` takes in rows, options and optional callback, It creates a workbook
and worksheet using the rows, appends the worksheet to the workbook, and returns the workbook as a
buffer.

**Returns**: a buffer containing the Excel file in `state.buffer`.  

| Param | Type | Description |
| --- | --- | --- |
| rows |  | The `rows` parameter is an array of objects representing the data to be written to the Excel sheet. Each object in the array represents a row in the sheet, and the keys of the object represent the column headers. The values of the object represent the data in each cell of the row. |
| options |  | The `options` parameter is an object that contains additional configuration options |
| [options.wsName] | <code>String</code> | Worksheet name i.e 32 Characters |
| [options.bookType] | <code>String</code> | File format of the exported file, Default is 'xlsx'. See [here](https://docs.sheetjs.com/docs/api/write-options/#supported-output-formats) for the function. It can have the following properties: |

**Example:** Create a buffer containing excel file with `xlsx` output format  
```js
sheetToBuffer('$.data[*]', {
 wsName: 'Invalid Grant Codes',
 bookType: 'xlsx',
});
```

* * *


