## Functions

<dl>
<dt>
    <a href="#del">del(path, params, callback)</a></dt>
<dt>
    <a href="#get">get(path, params, callback)</a></dt>
<dt>
    <a href="#parseCSV">parseCSV(target, config)</a></dt>
<dt>
    <a href="#parseXML">parseXML(body, script)</a></dt>
<dt>
    <a href="#patch">patch(path, params, callback)</a></dt>
<dt>
    <a href="#post">post(path, params, callback)</a></dt>
<dt>
    <a href="#put">put(path, params, callback)</a></dt>
<dt>
    <a href="#request">request(params)</a></dt>
</dl>

## del

del(path, params, callback) ⇒ <code>Operation</code>
Make a DELETE request

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>object</code> | Body, Query, Headers and Auth parameters |
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
| params | <code>object</code> | Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
get('/myEndpoint', {
   query: {foo: 'bar', a: 1},
   headers: {'content-type': 'application/json'},
   authentication: {username: 'user', password: 'pass'}
 })
```

* * *

## parseCSV

parseCSV(target, config) ⇒ <code>Operation</code>
CSV-Parse for CSV conversion to JSON

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>String</code> | string or local file with CSV data |
| config | <code>Object</code> | csv-parse config object |

**Example**  
```js
parseCSV("/home/user/someData.csv", {
	  quoteChar: '"',
	  header: false,
	});
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
| params | <code>object</code> | Body, Query, Headers and Auth parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
patch('/myEndpoint', {
   body: {'foo': 'bar'},
   headers: {'content-type': 'application/json'},
   authentication: {username: 'user', password: 'pass'}
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
| params | <code>object</code> | Body, Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
post('/myEndpoint', {
   body: {'foo': 'bar'},
   headers: {'content-type': 'application/json'},
   authentication: {username: 'user', password: 'pass'}
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
| params | <code>object</code> | Body, Query, Headers and Auth parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
put('/myEndpoint', {
   body: {'foo': 'bar'},
   headers: {'content-type': 'application/json'},
   authentication: {username: 'user', password: 'pass'}
 })
```

* * *

## request

request(params) ⇒ <code>Operation</code>
Make a request using the 'request' node module. This module is deprecated.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Query, Headers and Authentication parameters |

**Example**  
```js
request(params);
```

* * *

