<dl>
<dt>
    <a href="#get">get(path, options)</a></dt>
<dt>
    <a href="#post">post(path, body, options)</a></dt>
<dt>
    <a href="#request">request(method, path, options)</a></dt>
</dl>


## Functions
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
**Example:** Get products
```js
get("products", { query: { max: 10 }});
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
post("products", 
   {
      "id": "ff80818163e2de8d0163eba1b1e90002",
      "productCode": null,
      "name": "New product",
      "category": {
          "id": "ff80818163e2de8d0163eb93c5a00001",
          "name": "New category"
        },
      "description": null,
      "dateCreated": "2018-06-10T21:37:12Z",
      "lastUpdated": "2018-06-10T21:37:12Z"
  });
```

* * *

### request

<p><code>request(method, path, options) ⇒ Operation</code></p>

Make a general HTTP request


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Update stock movement
```js
request("POST", "/stockMovements/ff808181642fc9c101642fcccc420004", 
 {
     body: {
        "name": "new stock movement",
        "description": "new stock movement",
        "origin.id": "1",
        "destination.id": "2",
        "requestedBy.id": "1",
        "dateRequested": "06/23/2018"
      }
  });
  
```
**Example:** Update a product
```js
request('POST', '/products/ff808181812576850182aee36930040b', { body: { name: 'Coffee', description: 'Arabica coffee from the highlands of Ethiopia' } });
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
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |


* * *

