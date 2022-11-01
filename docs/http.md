<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute](#module_Adaptor.execute)
        * [new exports.execute(operations)](#new_module_Adaptor.execute_new)
    * [.get](#module_Adaptor.get)
        * [new exports.get(path, params, callback)](#new_module_Adaptor.get_new)
    * [.post](#module_Adaptor.post)
        * [new exports.post(path, params, callback)](#new_module_Adaptor.post_new)
    * [.put](#module_Adaptor.put)
        * [new exports.put(path, params, callback)](#new_module_Adaptor.put_new)
    * [.patch](#module_Adaptor.patch)
        * [new exports.patch(path, params, callback)](#new_module_Adaptor.patch_new)
    * [.del](#module_Adaptor.del)
        * [new exports.del(path, params, callback)](#new_module_Adaptor.del_new)
    * [.parseXML](#module_Adaptor.parseXML)
        * [new exports.parseXML(body, script)](#new_module_Adaptor.parseXML_new)
    * [.parseCSV](#module_Adaptor.parseCSV)
        * [new exports.parseCSV(target, config)](#new_module_Adaptor.parseCSV_new)
    * [.request](#module_Adaptor.request)
        * [new exports.request(params)](#new_module_Adaptor.request_new)

<a name="module_Adaptor.execute"></a>

### Adaptor.execute
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.execute_new"></a>

#### new exports.execute(operations)
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.


| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
execute(
  create('foo'),
  delete('bar')
)(state)
```
<a name="module_Adaptor.get"></a>

### Adaptor.get
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.get_new"></a>

#### new exports.get(path, params, callback)
Make a GET request


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
<a name="module_Adaptor.post"></a>

### Adaptor.post
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.post_new"></a>

#### new exports.post(path, params, callback)
Make a POST request


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
<a name="module_Adaptor.put"></a>

### Adaptor.put
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.put_new"></a>

#### new exports.put(path, params, callback)
Make a PUT request


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
<a name="module_Adaptor.patch"></a>

### Adaptor.patch
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.patch_new"></a>

#### new exports.patch(path, params, callback)
Make a PATCH request


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
<a name="module_Adaptor.del"></a>

### Adaptor.del
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.del_new"></a>

#### new exports.del(path, params, callback)
Make a DELETE request


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
<a name="module_Adaptor.parseXML"></a>

### Adaptor.parseXML
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.parseXML_new"></a>

#### new exports.parseXML(body, script)
Parse XML with the Cheerio parser


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
<a name="module_Adaptor.parseCSV"></a>

### Adaptor.parseCSV
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.parseCSV_new"></a>

#### new exports.parseCSV(target, config)
CSV-Parse for CSV conversion to JSON


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
<a name="module_Adaptor.request"></a>

### Adaptor.request
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.request_new"></a>

#### new exports.request(params)
Make a request using the 'request' node module. This module is deprecated.


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Query, Headers and Authentication parameters |

**Example**  
```js
request(params);
```
