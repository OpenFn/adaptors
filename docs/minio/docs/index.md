<dl>
<dt>
    <a href="#createbucket">createBucket(bucketName, [region], [options])</a></dt>
<dt>
    <a href="#getobject">getObject(bucketName, objectName, [options])</a></dt>
<dt>
    <a href="#getobjecttags">getObjectTags(bucketName, objectName)</a></dt>
<dt>
    <a href="#listobjects">listObjects(bucketName, [options])</a></dt>
<dt>
    <a href="#putobject">putObject(bucketName, objectName, data, [options])</a></dt>
<dt>
    <a href="#setobjecttags">setObjectTags(bucketName, objectName, tags, [putOpts])</a></dt>
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
    <a href="/adaptors/packages/common-docs#parsecsv">parseCsv()</a>
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
### createBucket

<p><code>createBucket(bucketName, [region], [options]) ⇒ Operation</code></p>

Create a new bucket


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| bucketName | <code>string</code> |  | Name of the bucket to create |
| [region] | <code>string</code> | <code>&quot;\&quot;us-east-1\&quot;&quot;</code> | Bucket region |
| [options] | <code>object</code> | <code>{}</code> | Options to create a bucket |
| [options.ObjectLocking] | <code>boolean</code> | <code>false</code> | Enable object locking on the bucket |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:**  Create a bucket
```js
createBucket("my-new-bucket");
```
**Example:** Create a bucket with object locking enabled
```js
createBucket("my-new-bucket", "us-east-1", { ObjectLocking: true });
```

* * *

### getObject

<p><code>getObject(bucketName, objectName, [options]) ⇒ Operation</code></p>

Get an object from a bucket


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| bucketName | <code>string</code> |  | Bucket containing the object |
| objectName | <code>string</code> |  | Name/path of the object to retrieve |
| [options] | <code>object</code> | <code>{}</code> | Optional MinIO getObject options |
| [options.format] | <code>string</code> | <code>&quot;\&quot;raw\&quot;&quot;</code> | Format to parse the object as. One of "raw", "json", "ndjson", or "csv". "raw" will return a Buffer, while the others will return the parsed result. |
| [options.destination] | <code>string</code> |  | Path to write the parsed result to in the state object. If not provided, the parsed result will be written to `state.data`. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:**  Get an object and write to response
```js
getObject("dlite",'f0dd6f01-a60c-5558-b53e-188eaf62a8de', { destination: 'response' });
```
**Example:**  Get an object and parse it as JSON
```js
getObject("dlite",'f0dd6f01-a60c-5558-b53e-188eaf62a8de', { format: 'json' });
```

* * *

### getObjectTags

<p><code>getObjectTags(bucketName, objectName) ⇒ Operation</code></p>

Get tags on an existing object in a MinIO bucket


| Param | Type | Description |
| --- | --- | --- |
| bucketName | <code>string</code> | Bucket containing the object |
| objectName | <code>string</code> | Name/path of the object |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getObjectTags("my-bucket", "records/patient-001.json");
```

* * *

### listObjects

<p><code>listObjects(bucketName, [options]) ⇒ Operation</code></p>

List objects in a bucket


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| bucketName | <code>string</code> |  | Bucket to list objects from |
| [options] | <code>object</code> | <code>{}</code> | Optional list filters |
| [options.prefix] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Prefix used to filter object names |
| [options.recursive] | <code>boolean</code> | <code>true</code> | Whether to list objects recursively. Defaults to true |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** List objects in a bucket
```js
listObjects("my-bucket", { prefix: "openmrs/2025-04/", recursive: true });
```

* * *

### putObject

<p><code>putObject(bucketName, objectName, data, [options]) ⇒ Operation</code></p>

Upload an object to a MinIO bucket


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| bucketName | <code>string</code> |  | Destination bucket |
| objectName | <code>string</code> |  | Name/path of the object to create or overwrite |
| data | <code>string</code> \| <code>object</code> \| <code>Buffer</code> |  | Data to upload. Serialized according to `options.format` |
| [options] | <code>object</code> | <code>{}</code> | Upload options |
| [options.format] | <code>string</code> | <code>&quot;\&quot;json\&quot;&quot;</code> | Serialization format: "json", "ndjson", "csv", or "raw" |
| [options.contentType] | <code>string</code> |  | MIME type. Auto-inferred from format if not provided |
| [options.metadata] | <code>object</code> | <code>{}</code> | User-defined metadata headers (e.g. `{ "x-amz-meta-source": "openmrs" }`) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Upload a JSON object
```js
putObject("my-bucket", "records/patient-001.json", state.data);
```
**Example:** Upload CSV data with custom metadata
```js
putObject("my-bucket", "exports/report.csv", state.rows, { format: "csv", metadata: { "x-amz-meta-source": "openmrs" } });
```

* * *

### setObjectTags

<p><code>setObjectTags(bucketName, objectName, tags, [putOpts]) ⇒ Operation</code></p>

Set tags on an existing object in a MinIO bucket


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| bucketName | <code>string</code> |  | Bucket containing the object |
| objectName | <code>string</code> |  | Name/path of the object to tag |
| tags | <code>object</code> |  | Key-value pairs to apply as tags. Overwrites any existing tags. |
| [putOpts] | <code>object</code> | <code>{}</code> | Extra put options (e.g. `{ versionId: "my-version-id" }`) |


**Example**
```js
setObjectTags("my-bucket", "records/patient-001.json", {
  source: "openmrs",
  status: "raw"
});
```
**Example:** Target a specific version
```js
setObjectTags("my-bucket", "records/patient-001.json", { status: "processed" }, { versionId: "my-version-id" });
```

* * *


##  Interfaces

### HttpState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

