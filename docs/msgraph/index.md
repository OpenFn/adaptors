## Functions

<dl>
<dt>
    <a href="#create">create(resource, data, callback)</a></dt>
<dt>
    <a href="#get">get(path, query, callback)</a></dt>
</dl>

## create

create(resource, data, callback) ⇒ <code>Operation</code>
Create some resource in msgraph

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | The type of entity that will be created |
| data | <code>object</code> | The data to create the new resource |
| callback | <code>function</code> | An optional callback function |

**Example**  
```js
create("applications", {"displayName": "My App"})
```

* * *

## get

get(path, query, callback) ⇒ <code>Operation</code>
Make a GET request to msgraph resource

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| query | <code>object</code> | Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
get('sites/root/lists')
```

* * *

## request

request ⇒
This is an asynchronous function that sends a request to a specified URL with optional parameters
and headers, and returns the response data in JSON format.

**Kind**: global constant  
**Returns**: The `request` function is returning the parsed JSON data from the response of the HTTP
request made to the specified `url` with the given `params` and `method`. If there is an error in
the response, the function will throw an error.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The URL of the API endpoint that the request is being made to. |
| [params] | <code>object</code> |  | An object containing any additional parameters to be sent with the request, such as query parameters or request body data. It is an optional parameter and defaults to an empty object if not provided. |
| [method] | <code>string</code> | <code>&quot;GET&quot;</code> | The HTTP method to be used for the request. It defaults to 'GET' if not specified. |


* * *

