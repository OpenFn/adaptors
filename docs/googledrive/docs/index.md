<dl>
<dt>
    <a href="#create">create(content, fileName, options)</a></dt>
<dt>
    <a href="#get">get(fileId)</a></dt>
<dt>
    <a href="#update">update(fileId, content, options)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
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
    <a href="/adaptors/packages/common-docs#http">http</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>

## Functions
### create

<p><code>create(content, fileName, options) ⇒ function</code></p>

Uploads a file to Google Drive.

**Returns**: <code>function</code> - An operation that uploads the file.  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Base64 encoded file content. |
| fileName | <code>string</code> | Name for the uploaded file. |
| options | <code>Object</code> | File upload parameters. |
| options.folderId | <code>string</code> | ID of the parent folder. |


**Example:** Upload a file to a root folder
```js
create("SGVsbG8gV29ybGQ=", "hello-world.txt");
```
**Example:** Upload a file to a specificfolder
```js
create("SGVsbG8gV29ybGQ=", "hello-world.txt", {
  folderId: "15tLwRj0lmr4mGIslEm5QEAS8YJ1EAXep",
});
```

* * *

### get

<p><code>get(fileId) ⇒ function</code></p>

Downloads a file from Google Drive.

**Returns**: <code>function</code> - An operation that retrieves the file as a base64 string.  

| Param | Type | Description |
| --- | --- | --- |
| fileId | <code>string</code> | ID of the file to download. |


**Example:** Download a file
```js
get('1B1dHwY2uLgm_-U96LNl9zFsRYq8953jL')
```

* * *

### update

<p><code>update(fileId, content, options) ⇒ function</code></p>

Updates an existing file in Google Drive.

**Returns**: <code>function</code> - An operation that updates the file.  

| Param | Type | Description |
| --- | --- | --- |
| fileId | <code>string</code> | ID of the file to update. |
| content | <code>string</code> | Base64 encoded new content. |
| options | <code>Object</code> | File update options. |


**Example:** Update a file
```js
update('1B1dHwY2uLgm_-U96LNl9zFsRYq8953jL', 'SGVsbG8gTWlrZQ==');
```

* * *


