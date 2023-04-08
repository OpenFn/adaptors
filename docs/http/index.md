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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>path</td><td><code>string</code></td><td><p>Path to resource</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>Body, Query, Headers and Auth parameters</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>path</td><td><code>string</code></td><td><p>Path to resource</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>Query, Headers and Authentication parameters</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>target</td><td><code>String</code></td><td><p>string or local file with CSV data</p>
</td>
    </tr><tr>
    <td>config</td><td><code>Object</code></td><td><p>csv-parse config object</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>body</td><td><code>String</code></td><td><p>data string to be parsed</p>
</td>
    </tr><tr>
    <td>script</td><td><code>function</code></td><td><p>script for extracting data</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>path</td><td><code>string</code></td><td><p>Path to resource</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>Body, Query, Headers and Auth parameters</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>path</td><td><code>string</code></td><td><p>Path to resource</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>Body, Query, Headers and Authentication parameters</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>path</td><td><code>string</code></td><td><p>Path to resource</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>Body, Query, Headers and Auth parameters</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>Query, Headers and Authentication parameters</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
request(params);
```

* * *

