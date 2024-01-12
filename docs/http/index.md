## Functions

<dl>
<dt>
    <a href="#">del(path, params, callback)</a></dt>
<dt>
    <a href="#">get(path, params, callback)</a></dt>
<dt>
    <a href="#">parseXML(body, script)</a></dt>
<dt>
    <a href="#">patch(path, params, callback)</a></dt>
<dt>
    <a href="#">post(path, params, callback)</a></dt>
<dt>
    <a href="#">put(path, params, callback)</a></dt>
<dt>
    <a href="#">request(method, path, params, callback)</a></dt>
</dl>


## del

del(path, params, callback) ⇒ <code>Operation</code>
Make a DELETE request

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#RequestOptions) | Body, Query, Headers and Auth parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
del(`/myendpoint/${state => state.data.id}`, {
   headers: {'content-type': 'application/json'}
 })
```

* * *

## get

get(path, params, callback) ⇒ <code>Operation</code>
Make a GET request

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#RequestOptions) | Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
get('/myEndpoint', {
  query: {foo: 'bar', a: 1},
  headers: {'content-type': 'application/json'},
})
```

* * *

## parseXML

parseXML(body, script) ⇒ <code>Operation</code>
Parse XML with the Cheerio parser

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>String</code> | data string to be parsed |
| script | <code>function</code> | script for extracting data |

**Example**  
```js
parseXML(body, function($){
   return $("table[class=your_table]").parsetable(true, true, true);
 })
```

* * *

## patch

patch(path, params, callback) ⇒ <code>Operation</code>
Make a PATCH request

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#RequestOptions) | Body, Query, Headers and Auth parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
patch('/myEndpoint', {
   body: {'foo': 'bar'},
   headers: {'content-type': 'application/json'},
 })
```

* * *

## post

post(path, params, callback) ⇒ <code>operation</code>
Make a POST request

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#RequestOptions) | Body, Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
post('/myEndpoint', {
   body: {'foo': 'bar'},
   headers: {'content-type': 'application/json'},
 })
```

* * *

## put

put(path, params, callback) ⇒ <code>Operation</code>
Make a PUT request

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#RequestOptions) | Body, Query, Headers and Auth parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
put('/myEndpoint', {
   body: {'foo': 'bar'},
   headers: {'content-type': 'application/json'},
 })
```

* * *

## request

request(method, path, params, callback) ⇒ <code>Operation</code>
Make a HTTP request

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The HTTP method to use |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#RequestOptions) | Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
get('/myEndpoint', {
  query: {foo: 'bar', a: 1},
  headers: {'content-type': 'application/json'},
})
```

* * *

## RequestOptions

RequestOptions : <code>Object</code>
Options provided to the HTTP request

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> \| <code>string</code> | body data to append to the request |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Use a falsy message value to suppress errors for thiscode. |
| query | <code>object</code> | an object of query parameters. Will be encoded into the URL. |
| headers | <code>object</code> | an object of headers to append to the request |
| parseAs | <code>string</code> | parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |
| tls | <code>object</code> | TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions |


* * *

