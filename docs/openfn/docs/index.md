<dl>
<dt>
    <a href="#get">get(path, options)</a></dt>
<dt>
    <a href="#post">post(path, data, options)</a></dt>
<dt>
    <a href="#request">request(method, path, options)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#beta">beta</a>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### get

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request to OpenFn API. Requires authentication first.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (relative to /api/). |
| options | [<code>RequestOptions</code>](#requestoptions) | Query, Headers and Authentication parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenFn API, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** GET request with query parameters
```js
get('jobs', {
  query: { limit: 10, offset: 0 },
});
```

* * *

### post

<p><code>post(path, data, options) ⇒ operation</code></p>

Make a POST request to OpenFn API. Requires authentication first.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (relative to /api/). |
| data | <code>object</code> | Body data to append to the request. JSON will be converted to a string. |
| options | [<code>RequestOptions</code>](#requestoptions) | Query, Headers and Authentication parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenFn API, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** POST a new job
```js
post('jobs', {
  name: 'test job',
  body: 'fn(state => state)'
});
```
**Example:** POST with custom headers
```js
post('jobs', {
  name: 'test job',
  body: 'fn(state => state)'
}, {
  headers: { 'x-custom': 'value' },
});
```

* * *

### request

<p><code>request(method, path, options) ⇒ Operation</code></p>

Make a HTTP request to OpenFn API. Requires authentication first.


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The HTTP method to use. |
| path | <code>string</code> | Path to resource (relative to /api/). |
| options | [<code>RequestOptions</code>](#requestoptions) | Body, Query, Headers and Authentication parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenFn API, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Make a GET request
```js
request('GET', 'jobs', {
  query: { limit: 10 },
});
```
**Example:** Make a POST request with a body
```js
request('POST', 'jobs', {
  body: {
    name: 'test job',
    expression: 'fn(state => state)'
  },
});
```

* * *


##  Interfaces

### RequestOptions

Options provided to the OpenFn API request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| body | <code>object</code> \| <code>string</code> | body data to append to the request. JSON will be converted to a string. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |


* * *

