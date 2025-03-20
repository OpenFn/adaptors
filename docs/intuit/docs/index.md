
This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_get">http.get(path, [options])</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, data, [options])</a>
</dt>
</dl>



## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(path, [options]) ⇒ Operation</code></p>

Make a GET request to any intuit endpoint


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | Path to resource |
| [options] | [<code>IntuitOptions</code>](#intuitoptions) | <code>{}</code> | An object containing query and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Quickbook(intuit) server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Get intuit user company information.
```js
http.get("/v3/company/9341453908059456/companyinfo/9341453908059456");
```

* * *


### http.post {#http_post}

<p><code>post(path, data, [options]) ⇒ Operation</code></p>

Make a POST request to any Intuit endpoint


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | Path to resource |
| data | <code>object</code> |  | The request body (as JSON) |
| [options] | [<code>IntuitOptions</code>](#intuitoptions) | <code>{}</code> | An object containing query, and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Quickbook(intuit) server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Create an account on intuit.
```js
http.post("/v3/company/9341453908059456/account",
 {
      "Name": "MyJobs_testing",
      "AccountType": "Accounts Receivable"
 },
 {
 query: {
   minorversion: 40,
  },
})
```

* * *


##  Interfaces

### IntuitOptions

Options object

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>object</code> |  | An object of query parameters to be encoded into the URL |
| headers | <code>object</code> |  | An object of all request headers |
| [parseAs] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | The response format to parse (e.g., 'json', 'text', or 'stream') |


* * *

### IntuitState

State object

**Properties**

| Name | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Quickbook(intuit) server (excluding the body) |
| references | An array of all previous data objects used in the Job |


* * *

