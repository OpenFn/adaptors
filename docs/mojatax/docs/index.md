<dl>
<dt>
    <a href="#post">post(path, data, options, [callback])</a></dt>
<dt>
    <a href="#request">request(method, path, data, options, [callback])</a></dt>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### post

<p><code>post(path, data, options, [callback]) ⇒ Operation</code></p>

Make a POST request to any Mojatax endpoint.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object which will be attached to the request body |
| options | [<code>MojataxRequestOptions</code>](#mojataxrequestoptions) | Optional request options |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Mojatax server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Make a POST request to create an invoice
```js
post("CreateInvoice", {
invoice_id: 'PID092',
customerId: '102',
items: [],
});
```

* * *

### request

<p><code>request(method, path, data, options, [callback]) ⇒ Operation</code></p>

Make a general HTTP request against the Mojatax server.


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>MojataxRequestOptions</code>](#mojataxrequestoptions) | Optional request options |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Mojatax server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Make a POST request to create an invoice
```js
request("POST", "/client/CreateInvoice", {
invoice_id: 'PID092',
customerId: '102',
items: [],
});
```

* * *


##  Interfaces

### MojataxRequestOptions

Options provided to Mojatax HTTP request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> \| <code>string</code> | body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request). |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |
| tls | <code>object</code> | TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions |


* * *

