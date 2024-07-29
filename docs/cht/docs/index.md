<dl>
<dt>
    <a href="#get">get(path, options, [callback])</a></dt>
<dt>
    <a href="#post">post(path, body, options, [callback])</a></dt>
<dt>
    <a href="#put">put(path, options, [callback])</a></dt>
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
### get

<p><code>get(path, options, [callback]) ⇒ Operation</code></p>

Make a GET request against the base URL.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Options to configure the HTTP request |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the CHT HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Get a list of contacts
```js
get("/api/v2/export/contacts");
```
**Example:** Filter contacts given a name
```js
get("/api/v2/export/contacts", {
  query: {"filters": {
    "search": "jim"
  }}
});
```

* * *

### post

<p><code>post(path, body, options, [callback]) ⇒ Operation</code></p>

Make a POST request against the base url


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the CHT HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Create a new person
```js
post("/api/v1/people", {  
  "name": "Hannah",
  "phone": "+254712345678",
  "type": "contact",
  "contact_type": "patient", });
```

* * *

### put

<p><code>put(path, options, [callback]) ⇒ Operation</code></p>

Make a PUT request against the base url


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Options to configure the HTTP request |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the CHT HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Update settings
```js
put("/api/v1/settings",{query:{overwrite:true}});
```

* * *

### request

<p><code>request(method, path, data, options, [callback]) ⇒ Operation</code></p>

Make a general HTTP request to CHT


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the CHT HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
request("POST","/api/v1/people", {  
  "name": "Hannah",
  "phone": "+254712345678",
  "type": "contact",
  "contact_type": "patient", });
```

* * *


