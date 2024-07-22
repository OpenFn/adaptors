<dl>
<dt>
    <a href="#get">get(path, options, [callback])</a></dt>
<dt>
    <a href="#post">post(path, body, [callback])</a></dt>
<dt>
    <a href="#put">put(path, body, [callback])</a></dt>
<dt>
    <a href="#request">request(method, path, body, options, [callback])</a></dt>
</dl>

The following functions are exported from the common adaptor:
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

<p><code>get(path, options, [callback]) ⇒ Operation</code></p>

Make a GET request in OpenLMIS


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (relative to the base URL defined in configuration) |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Get all supplyLines
```js
get("/supplyLines");
```

* * *

### post

<p><code>post(path, body, [callback]) ⇒ Operation</code></p>

Make a POST request in OpenLMIS


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (relative to the base URL defined in configuration) |
| body | <code>object</code> | Object which will be attached to the POST body |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Creates new program
```js
post("/programs", { name: "Bukayo", code: "abc" });
```

* * *

### put

<p><code>put(path, body, [callback]) ⇒ Operation</code></p>

Make a PUT request in OpenLMIS


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (relative to the base URL defined in configuration) |
| body | <code>object</code> | Object which will be attached to the PUT body |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Update existing program
```js
put("/programs/123", { name: "DigTalent", code: "123" });
```

* * *

### request

<p><code>request(method, path, body, options, [callback]) ⇒ Operation</code></p>

Make a general HTTP request in OpenLMIS


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource (relative to the base URL defined in configuration) |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
request("POST", "/programs", { name: "WSH", code: "123" });
```

* * *

##  Interfaces

### RequestOptions

Options provided to the HTTP request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | body data to append to the request. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |


* * *

