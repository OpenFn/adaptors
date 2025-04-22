<dl>
<dt>
    <a href="#del">del(path, options)</a></dt>
<dt>
    <a href="#get">get(path, options)</a></dt>
<dt>
    <a href="#parsexml">parseXML(data, script)</a></dt>
<dt>
    <a href="#patch">patch(path, data, options)</a></dt>
<dt>
    <a href="#post">post(path, data, options)</a></dt>
<dt>
    <a href="#put">put(path, data, options-)</a></dt>
<dt>
    <a href="#request">request(method, path, options)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#util_decode">util.decode(base64Data)</a>
</dt>

<dt>
    <a href="#util_encode">util.encode(data)</a>
</dt>

<dt>
    <a href="#util_uuid">util.uuid()</a>
</dt>
</dl>


## Functions
### del

<p><code>del(path, options) ⇒ Operation</code></p>

Make a DELETE request. If `configuration.baseUrl` is set, paths must be relative.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`. |
| options | [<code>RequestOptions</code>](#requestoptions) | Query, Headers and Auth parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** DELETE a resource by ID
```js
del(`/myendpoint/${$.data.id}`);
```

* * *

### get

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request. If `configuration.baseUrl` is set, paths must be relative.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`. |
| options | [<code>RequestOptions</code>](#requestoptions) | Body, Query, Headers and Authentication parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** GET request with query parameters and custom headers
```js
get('/patient', {
  query: { foo: 'bar', a: 1 },
});
```

* * *

### parseXML

<p><code>parseXML(data, script) ⇒ Operation</code></p>

Parse XML with the Cheerio parser


| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | Body string to be parsed |
| script | <code>function</code> | script for extracting data |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed XML as a JSON object |
| references | an array of all previous data objects used in the Job |
**Example:** Parse XML from state.response
```js
 parseXML(
  (state) => state.response,
  ($) => {
    return $("table[class=your_table]").parsetable(true, true, true);
  }
);
```
**Example:** Using parseXML with a callback to extract data
```js
parseXML(
  (state) => state.response,
  ($) => $("table[class=your_table]").parsetable(true, true, true)
).then((next) => ({ ...next, results: next.data.data }));
```

* * *

### patch

<p><code>patch(path, data, options) ⇒ Operation</code></p>

Make a PATCH request. If `configuration.baseUrl` is set, paths must be relative.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`. |
| data | <code>object</code> | Body data to append to the request. JSON will be converted to a string. |
| options | [<code>RequestOptions</code>](#requestoptions) | Query, Headers and Auth parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** PATCH a resource from state
```js
patch('/patient', $.data);
```
**Example:** PATCH a resource with custom headers
```js
patch('/patient', $.data, {
  headers: { 'content-type': 'application/fhir+json' },
});
```

* * *

### post

<p><code>post(path, data, options) ⇒ operation</code></p>

Make a POST request. If `configuration.baseUrl` is set, paths must be relative.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`. |
| data | <code>object</code> | Body data to append to the request. JSON will be converted to a string. |
| options | [<code>RequestOptions</code>](#requestoptions) | Query, Headers and Authentication parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** POST a resource with from state
```js
post('/patient', $.data);
```
**Example:** POST a resource with custom headers
```js
post('/patient', $.data, {
  headers: { 'content-type': 'application/fhir+json' },
});
```

* * *

### put

<p><code>put(path, data, options-) ⇒ Operation</code></p>

Make a PUT request. If `configuration.baseUrl` is set, paths must be relative.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`. |
| data | <code>object</code> | Body data to append to the request. JSON will be converted to a string. |
| options- | [<code>RequestOptions</code>](#requestoptions) | Query, Headers and Auth parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** PUT a resource from state
```js
put('/patient', $.data);
```
**Example:** PUT a resource with custom headers
```js
put('/patient', $.data, {
  headers: { 'content-type': 'application/fhir+json' },
})
```

* * *

### request

<p><code>request(method, path, options) ⇒ Operation</code></p>

Make a HTTP request. If `configuration.baseUrl` is set, paths must be relative.


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The HTTP method to use. |
| path | <code>string</code> | Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`. |
| options | [<code>RequestOptions</code>](#requestoptions) | Body, Query, Headers and Authentication parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Make a GET request
```js
request('GET', '/patient', {
  query: { foo: 'bar', a: 1 },
});
```
**Example:** Make a POST request with a body
```js
request('POST', '/todos', {
  body:{
    "userId": 1,
    "title": "delectus aut autem",
    "completed": false
  },
});
```

* * *


## util

These functions belong to the util namespace.
### util.decode {#util_decode}

<p><code>decode(base64Data) ⇒ string</code></p>

Decodes a Base64 encoded string back to its original format.

**Returns**: <code>string</code> - - The decoded string.  

| Param | Type | Description |
| --- | --- | --- |
| base64Data | <code>string</code> | The Base64 encoded string. |

**Example:** Decode a Base64 string
```js
const decoded = util.decode('SGVsbG8gV29ybGQ=');
console.log(decoded); // Output: Hello World
```

* * *


### util.encode {#util_encode}

<p><code>encode(data) ⇒ string</code></p>

Encodes a given string into Base64 format.

**Returns**: <code>string</code> - - The Base64 encoded string.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The string to be encoded. |

**Example:** Encode a string
```js
const encoded = util.encode('Hello World');
console.log(encoded); // Output: SGVsbG8gV29ybGQ=
```

* * *


### util.uuid {#util_uuid}

<p><code>uuid() ⇒ string</code></p>

Generates a UUID (Universally Unique Identifier).

**Returns**: <code>string</code> - - A newly generated UUID.  
**Example:** Generate a UUID
```js
const id = util.uuid();
console.log(id); // Output:'3f4e254e-8f6f-4f8b-9651-1c1c262cc83f'
```

* * *


##  Interfaces

### RequestOptions

Options provided to the HTTP request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| contentType | <code>string</code> | Sets the `Content-Type` header on the request. Defaults to `json`. Supported values: `json`, `xml`, `string`, and `form` (for FormData). |
| body | <code>object</code> \| <code>string</code> | body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).This is only applicable to the request function |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |
| tls | <code>object</code> | TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions |


* * *

