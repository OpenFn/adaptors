<dl>
<dt>
    <a href="#get">get(params)</a></dt>
<dt>
    <a href="#list">list(params)</a></dt>
<dt>
    <a href="#put">put(params)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
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
    <a href="/adaptors/packages/common-docs#group">group()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#map">map()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#scrubemojis">scrubEmojis()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>

## Functions
### get

<p><code>get(params) ⇒ Operation</code></p>

Get an object from S3.

Attempts to parse JSON objects automatically into `state.data`. For binary
objects the adaptor returns base64 in `state.data.base64`.

**Returns**: <code>Operation</code> - - A function that takes the state and performs the get operation.  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>S3Params</code>](#s3params) | The S3 operation parameters (bucket, key). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| state | On success sets `state.data` to the parsed body (or `{ base64: '...' }`) and `state.response` to the raw response metadata. |

**Example**
```js
get({ bucket: 'my-bucket', key: 'path/to/file.txt' });
```

* * *

### list

<p><code>list(params) ⇒ Operation</code></p>

List objects in a bucket (by prefix).

**Returns**: <code>Operation</code> - - A function that takes the state and performs the list operation.  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>S3Params</code>](#s3params) | The S3 operation parameters (bucket, prefix, etc.) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| state | On success sets `state.data` to the list of objects and `state.response` to the raw S3 response metadata. |

**Example**
```js
list({ bucket: 'my-bucket', prefix: 'path/to/' });
```

* * *

### put

<p><code>put(params) ⇒ Operation</code></p>

Put an object into S3.

**Returns**: <code>Operation</code> - - A function that takes the state and performs the put operation.  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>S3Params</code>](#s3params) | The S3 operation parameters (bucket. key, body, contentType, etc.) |


**Example**
```js
put({ bucket: 'my-bucket', key: 'path/to/file.txt', body: 'hello' });
```

* * *


##  Interfaces

### S3Params

S3 operation input params used by `put`, `get`, and `list`.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Object key for `put`/`get` (required for those ops) |
| [body] | <code>any</code> | Body for `put` (string, Buffer, or stream) |
| [bucket] | <code>string</code> | S3 bucket name (overrides configuration value) |
| [contentType] | <code>string</code> | Optional content type for `put` |
| [prefix] | <code>string</code> | Prefix for `list` operation |
| [maxKeys] | <code>number</code> | Max keys for `list` |
| [continuationToken] | <code>string</code> | Continuation token for `list` pagination |


* * *

