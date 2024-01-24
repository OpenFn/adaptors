## Functions

<dl>
<dt>
    <a href="#downloadblob">downloadBlob(blobName, [options])</a></dt>
<dt>
    <a href="#getblobproperties">getBlobProperties(blobName, options)</a></dt>
<dt>
    <a href="#uploadblob">uploadBlob(blobName, content, uploadOptions, [options])</a></dt>
</dl>


## downloadBlob

downloadBlob(blobName, [options]) ⇒ <code>Operation</code>

Download a blob from Azure Blob Storage.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| blobName | <code>string</code> |  | Name of the blob to download. |
| [options] | <code>Object</code> | <code>{}</code> | Additional options for the download process. |

**Example**  
```js
downloadBlob('mycontainer', 'myblob.txt', { downloadAs: 'string' })
```

* * *

## getBlobProperties

getBlobProperties(blobName, options) ⇒ <code>Operation</code>

Get properties of a blob in Azure Blob Storage.


| Param | Type | Description |
| --- | --- | --- |
| blobName | <code>string</code> | Name of the blob to get properties for. |
| options | <code>string</code> | Additional options for the getBlobProperties process. |

**Example**  
```js
getBlobProperties('mycontainer', 'myblob.txt')
```

* * *

## uploadBlob

uploadBlob(blobName, content, uploadOptions, [options]) ⇒ <code>Operation</code>

Upload content to Azure Blob Storage.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| blobName | <code>string</code> |  | Name of the blob to create or replace. |
| content | <code>string</code> |  | Content to upload. |
| uploadOptions | <code>object</code> |  | See BlockBlobUploadOptions in Azure Blob Storage docs |
| [options] | <code>Object</code> | <code>{}</code> | Additional options for the upload process. |
| [options.createContainer] | <code>boolean</code> | <code>false</code> | Whether to create the container if it doesn't exist. |
| [options.overwrite] | <code>boolean</code> | <code>false</code> | Whether to overwrite an existing blob with the same name. |
| [options.containerName] | <code>string</code> |  | Container name. Overrides state.configuration. |

**Example**  
```js
uploadBlob('mycontainer', 'myblob.txt', {foo:"bar"}, { blobHTTPHeaders: { blobContentType: 'application/json' } })
```

* * *

