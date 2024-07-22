<dl>
<dt>
    <a href="#del">del(path, params, callback)</a></dt>
<dt>
    <a href="#get">get(path, params, callback)</a></dt>
<dt>
    <a href="#parsexml">parseXML(body, script, callback)</a></dt>
<dt>
    <a href="#patch">patch(path, params, callback)</a></dt>
<dt>
    <a href="#post">post(path, params, callback)</a></dt>
<dt>
    <a href="#put">put(path, params, callback)</a></dt>
<dt>
    <a href="#request">request(method, path, params, callback)</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#arraytostring">arrayToString()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#chunk">chunk()</a>
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
    <a href="/adaptors/packages/common-docs#datefns">dateFns()</a>
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
    <a href="/adaptors/packages/common-docs#humanproper">humanProper()</a>
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
    <a href="/adaptors/packages/common-docs#scrubemojis">scrubEmojis()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#splitkeys">splitKeys()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#toarray">toArray()</a>
</dt></dl>

## Functions
### del

<p><code>del(path, params, callback) ⇒ Operation</code></p>

Make a DELETE request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Body, Query, Headers and Auth parameters |
| callback | <code>function</code> | (Optional) Callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
del(`/myendpoint/${state => state.data.id}`, {
   headers: {'content-type': 'application/json'}
 })
```

* * *

### get

<p><code>get(path, params, callback) ⇒ Operation</code></p>

Make a GET request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
get('/myEndpoint', {
  query: {foo: 'bar', a: 1},
  headers: {'content-type': 'application/json'},
})
```

* * *

### parseXML

<p><code>parseXML(body, script, callback) ⇒ Operation</code></p>

Parse XML with the Cheerio parser


| Param | Type | Description |
| --- | --- | --- |
| body | <code>String</code> | data string to be parsed |
| script | <code>function</code> | script for extracting data |
| callback | <code>function</code> | (Optional) Callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed XML as a JSON object |
| references | an array of all previous data objects used in the Job |
**Example**
```js
parseXML(
  (state) => state.response,
  ($) => {
    return $("table[class=your_table]").parsetable(true, true, true);
  }
);
```
**Example:** Using parseXML with a callback
```js
 parseXML(
  (state) => state.response,
  ($) => {
    return $("table[class=your_table]").parsetable(true, true, true);
  },
  (next) => ({ ...next, results: next.data.body })
);
```

* * *

### patch

<p><code>patch(path, params, callback) ⇒ Operation</code></p>

Make a PATCH request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Body, Query, Headers and Auth parameters |
| callback | <code>function</code> | (Optional) Callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
patch('/myEndpoint', {
   body: {'foo': 'bar'},
   headers: {'content-type': 'application/json'},
 })
```

* * *

### post

<p><code>post(path, params, callback) ⇒ operation</code></p>

Make a POST request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Body, Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
post('/myEndpoint', {
   body: {'foo': 'bar'},
   headers: {'content-type': 'application/json'},
 })
```

* * *

### put

<p><code>put(path, params, callback) ⇒ Operation</code></p>

Make a PUT request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Body, Query, Headers and Auth parameters |
| callback | <code>function</code> | (Optional) Callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
put('/myEndpoint', {
   body: {'foo': 'bar'},
   headers: {'content-type': 'application/json'},
 })
```

* * *

### request

<p><code>request(method, path, params, callback) ⇒ Operation</code></p>

Make a HTTP request


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The HTTP method to use |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
request(
  'GET',
  '/myEndpoint',
   {
     query: {foo: 'bar', a: 1},
     headers: {'content-type': 'application/json'},
   }
)
```

* * *

##  Interfaces

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

