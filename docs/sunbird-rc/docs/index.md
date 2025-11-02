<dl>
<dt>
    <a href="#del">del(path, options)</a></dt>
<dt>
    <a href="#downloadcredential">downloadCredential(id, options)</a></dt>
<dt>
    <a href="#get">get(path, options)</a></dt>
<dt>
    <a href="#getcredential">getCredential(id, options)</a></dt>
<dt>
    <a href="#issuecredential">issueCredential(body, options)</a></dt>
<dt>
    <a href="#post">post(path, body, options)</a></dt>
<dt>
    <a href="#put">put(path, body, options)</a></dt>
<dt>
    <a href="#request">request(method, path, body, options)</a></dt>
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
### del

<p><code>del(path, options) ⇒ Operation</code></p>

Make a DELETE request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
del("credentials/did:rcw:123abc");
```

* * *

### downloadCredential

<p><code>downloadCredential(id, options) ⇒ Operation</code></p>

Download a Verifiable Credential as PDF (base64 encoded)


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The credential ID to download |
| options | <code>object</code> | Optional request options. Can include templateId which will be added to headers |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
downloadCredential('did:rcw:123abc');
```
**Example**
```js
downloadCredential('did:rcw:123abc', { templateId: 'template-001' });
```

* * *

### get

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
get("patients");
```

* * *

### getCredential

<p><code>getCredential(id, options) ⇒ Operation</code></p>

Get a Verifiable Credential by ID


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The credential ID to retrieve |
| options | <code>object</code> | Optional request options. Can include templateId which will be added to headers |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getCredential('did:rcw:123abc');
```
**Example**
```js
getCredential('did:rcw:123abc', { templateId: 'template-001' });
```

* * *

### issueCredential

<p><code>issueCredential(body, options) ⇒ Operation</code></p>

Issue a Verifiable Credential


| Param | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | Credential issuance payload containing credential, credentialSchemaId, credentialSchemaVersion, and tags |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
issueCredential({
  credential: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential', 'ProofOfAcademicEvaluationCredential'],
    issuer: 'did:web:example.com:identifier:xxx',
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: 'did:schema:xxx',
      name: 'John Doe',
      grade: 'A'
    }
  },
  credentialSchemaId: 'did:schema:xxx',
  credentialSchemaVersion: '1.0.0',
  tags: ['demo', 'education']
});
```

* * *

### post

<p><code>post(path, body, options) ⇒ Operation</code></p>

Make a POST request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
post("patient", { "name": "Bukayo" });
```

* * *

### put

<p><code>put(path, body, options) ⇒ Operation</code></p>

Make a PUT request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the PUT body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
put("template/cmhbkgjqo000ems0jvbeayn1h", {
  "template": "some handlebars template..."
});
```

* * *

### request

<p><code>request(method, path, body, options) ⇒ Operation</code></p>

Make a general HTTP request


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
request("POST", "patient", { "name": "Bukayo" });
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

### RequestOptions

Options provided to the HTTP request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> \| <code>string</code> | body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request). |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| form | <code>object</code> | Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |
| tls | <code>object</code> | TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions |


* * *

