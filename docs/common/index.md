## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Promise</code></dt>
<dd><p>Execute a sequence of operations.
Main outer API for executing expressions.</p>
</dd>
<dt><a href="#alterState">alterState(func)</a> ⇒ <code>Operation</code></dt>
<dd><p>alias for &quot;fn()&quot;</p>
</dd>
<dt><a href="#fn">fn(func)</a> ⇒ <code>Operation</code></dt>
<dd><p>Creates a custom step (or operation) for more flexible job writing.</p>
</dd>
<dt><a href="#jsonValue">jsonValue(obj, path)</a> ⇒ <code>Operation</code></dt>
<dd><p>Picks out a single value from a JSON object.
If a JSONPath returns more than one value for the reference, the first
item will be returned.</p>
</dd>
<dt><a href="#sourceValue">sourceValue(path)</a> ⇒ <code>Operation</code></dt>
<dd><p>Picks out a single value from source data.
If a JSONPath returns more than one value for the reference, the first
item will be returned.</p>
</dd>
<dt><a href="#source">source(path)</a> ⇒ <code>Array.&lt;(String|Object)&gt;</code></dt>
<dd><p>Picks out a value from source data.
Will return whatever JSONPath returns, which will always be an array.
If you need a single value use <code>sourceValue</code> instead.</p>
</dd>
<dt><a href="#dataPath">dataPath(path)</a> ⇒ <code>string</code></dt>
<dd><p>Ensures a path points at the data.</p>
</dd>
<dt><a href="#dataValue">dataValue(path)</a> ⇒ <code>Operation</code></dt>
<dd><p>Picks out a single value from the source data object—usually <code>state.data</code>.
If a JSONPath returns more than one value for the reference, the first
item will be returned.</p>
</dd>
<dt><a href="#referencePath">referencePath(path)</a> ⇒ <code>string</code></dt>
<dd><p>Ensures a path points at references.</p>
</dd>
<dt><a href="#lastReferenceValue">lastReferenceValue(path)</a> ⇒ <code>Operation</code></dt>
<dd><p>Picks out the last reference value from source data.</p>
</dd>
<dt><a href="#map">map(path, operation, state)</a> ⇒ <code>State</code></dt>
<dd><p>Scopes an array of data based on a JSONPath.
Useful when the source data has <code>n</code> items you would like to map to
an operation.
The operation will receive a slice of the data based of each item
of the JSONPath provided.</p>
</dd>
<dt><a href="#asData">asData(data, state)</a> ⇒ <code>array</code></dt>
<dd><p>Simple switcher allowing other expressions to use either a JSONPath or
object literals as a data source.</p>
<ul>
<li>JSONPath referencing a point in <code>state</code></li>
<li>Object Literal of the data itself.</li>
<li>Function to be called with state.</li>
</ul>
</dd>
<dt><a href="#each">each(dataSource, operation)</a> ⇒ <code>Operation</code></dt>
<dd><p>Scopes an array of data based on a JSONPath.
Useful when the source data has <code>n</code> items you would like to map to
an operation.
The operation will receive a slice of the data based of each item
of the JSONPath provided.</p>
<p>It also ensures the results of an operation make their way back into
the state&#39;s references.</p>
</dd>
<dt><a href="#combine">combine(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Combines two operations into one</p>
</dd>
<dt><a href="#join">join(targetPath, sourcePath, targetKey)</a> ⇒ <code>Operation</code></dt>
<dd><p>Adds data from a target object</p>
</dd>
<dt><a href="#expandReferences">expandReferences(value, [skipFilter])</a> ⇒ <code>Operation</code></dt>
<dd><p>Recursively resolves objects that have resolvable values (functions).</p>
</dd>
<dt><a href="#field">field(key, value)</a> ⇒ <code>Field</code></dt>
<dd><p>Returns a key, value pair in an array.</p>
</dd>
<dt><a href="#fields">fields(fields)</a> ⇒ <code>Object</code></dt>
<dd><p>Zips key value pairs into an object.</p>
</dd>
<dt><a href="#merge">merge(dataSource, fields)</a> ⇒ <code>DataSource</code></dt>
<dd><p>Merges fields into each item in an array.</p>
</dd>
<dt><a href="#index">index()</a> ⇒ <code>DataSource</code></dt>
<dd><p>Returns the index of the current array being iterated.
To be used with <code>each</code> as a data source.</p>
</dd>
<dt><a href="#arrayToString">arrayToString(arr, separator)</a> ⇒ <code>string</code></dt>
<dd><p>Turns an array into a string, separated by X.</p>
</dd>
<dt><a href="#toArray">toArray(arg)</a> ⇒ <code>array</code></dt>
<dd><p>Ensures primitive data types are wrapped in an array.
Does not affect array objects.</p>
</dd>
<dt><a href="#composeNextState">composeNextState(state, response)</a> ⇒ <code>State</code></dt>
<dd><p>Prepares next state</p>
</dd>
<dt><a href="#humanProper">humanProper(str)</a> ⇒ <code>string</code></dt>
<dd><p>Substitutes underscores for spaces and proper-cases a string</p>
</dd>
<dt><a href="#scrubEmojis">scrubEmojis(text, replacementChars)</a> ⇒ <code>string</code></dt>
<dd><p>Replaces emojis in a string.</p>
</dd>
<dt><a href="#chunk">chunk(array, chunkSize)</a> ⇒ <code>Object</code></dt>
<dd><p>Chunks an array into an array of arrays, each with no more than a certain size.</p>
</dd>
<dt><a href="#each">each(dataSource, operation)</a> ⇒ <code>Operation</code></dt>
<dd><p>Scopes an array of data based on a JSONPath.
Useful when the source data has <code>n</code> items you would like to map to
an operation.
The operation will receive a slice of the data based of each item
of the JSONPath provided.</p>
<p>It also ensures the results of an operation make their way back into
the state&#39;s references.</p>
</dd>
<dt><a href="#expandRequestReferences">expandRequestReferences(value)</a> ⇒ <code>Operation</code></dt>
<dd><p>Recursively resolves objects that have resolvable values (functions), but
omits HTTP request specific modules like <code>FormData</code>.</p>
</dd>
<dt><a href="#withAgent">withAgent(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Creates an https agent for axios from the agentOptions key passed in params.</p>
</dd>
<dt><a href="#get">get(requestParams)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a GET request</p>
</dd>
<dt><a href="#post">post(requestParams)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a POST request</p>
</dd>
<dt><a href="#del">del(requestParams)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a DELETE request</p>
</dd>
<dt><a href="#head">head(requestParams)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a HEAD request</p>
</dd>
<dt><a href="#put">put(requestParams)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a PUT request</p>
</dd>
<dt><a href="#patch">patch(requestParams)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a PATCH request</p>
</dd>
<dt><a href="#options">options(requestParams)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a OPTIONS request</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Promise</code>
Execute a sequence of operations.
Main outer API for executing expressions.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
execute(
   create('foo'),
   delete('bar')
 )
```
<a name="alterState"></a>

## alterState(func) ⇒ <code>Operation</code>
alias for "fn()"

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | is the function |

<a name="fn"></a>

## fn(func) ⇒ <code>Operation</code>
Creates a custom step (or operation) for more flexible job writing.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | is the function |

**Example**  
```js
fn(state => {
  // do some things to state
  return state;
});
```
<a name="jsonValue"></a>

## jsonValue(obj, path) ⇒ <code>Operation</code>
Picks out a single value from a JSON object.
If a JSONPath returns more than one value for the reference, the first
item will be returned.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | A valid JSON object. |
| path | <code>String</code> | JSONPath referencing a point in given JSON object. |

**Example**  
```js
jsonValue({ a:1 }, 'a')
```
<a name="sourceValue"></a>

## sourceValue(path) ⇒ <code>Operation</code>
Picks out a single value from source data.
If a JSONPath returns more than one value for the reference, the first
item will be returned.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | JSONPath referencing a point in `state`. |

**Example**  
```js
sourceValue('$.key')
```
<a name="source"></a>

## source(path) ⇒ <code>Array.&lt;(String\|Object)&gt;</code>
Picks out a value from source data.
Will return whatever JSONPath returns, which will always be an array.
If you need a single value use `sourceValue` instead.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | JSONPath referencing a point in `state`. |

**Example**  
```js
source('$.key')
```
<a name="dataPath"></a>

## dataPath(path) ⇒ <code>string</code>
Ensures a path points at the data.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | JSONPath referencing a point in `data`. |

**Example**  
```js
dataPath('key')
```
<a name="dataValue"></a>

## dataValue(path) ⇒ <code>Operation</code>
Picks out a single value from the source data object—usually `state.data`.
If a JSONPath returns more than one value for the reference, the first
item will be returned.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | JSONPath referencing a point in `data`. |

**Example**  
```js
dataValue('key')
```
<a name="referencePath"></a>

## referencePath(path) ⇒ <code>string</code>
Ensures a path points at references.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | JSONPath referencing a point in `references`. |

**Example**  
```js
referencePath('key')
```
<a name="lastReferenceValue"></a>

## lastReferenceValue(path) ⇒ <code>Operation</code>
Picks out the last reference value from source data.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | JSONPath referencing a point in `references`. |

**Example**  
```js
lastReferenceValue('key')
```
<a name="map"></a>

## map(path, operation, state) ⇒ <code>State</code>
Scopes an array of data based on a JSONPath.
Useful when the source data has `n` items you would like to map to
an operation.
The operation will receive a slice of the data based of each item
of the JSONPath provided.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | JSONPath referencing a point in `state.data`. |
| operation | <code>function</code> | The operation needed to be repeated. |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
map("$.[*]",
  create("SObject",
    field("FirstName", sourceValue("$.firstName"))
  )
)
```
<a name="asData"></a>

## asData(data, state) ⇒ <code>array</code>
Simple switcher allowing other expressions to use either a JSONPath or
object literals as a data source.
- JSONPath referencing a point in `state`
- Object Literal of the data itself.
- Function to be called with state.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> \| <code>object</code> \| <code>function</code> |  |
| state | <code>object</code> | The current state. |

**Example**  
```js
asData('$.key'| key | callback)
```
<a name="each"></a>

## each(dataSource, operation) ⇒ <code>Operation</code>
Scopes an array of data based on a JSONPath.
Useful when the source data has `n` items you would like to map to
an operation.
The operation will receive a slice of the data based of each item
of the JSONPath provided.

It also ensures the results of an operation make their way back into
the state's references.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| dataSource | <code>DataSource</code> | JSONPath referencing a point in `state`. |
| operation | <code>Operation</code> | The operation needed to be repeated. |

**Example**  
```js
each("$.[*]",
  create("SObject",
    field("FirstName", sourceValue("$.firstName"))
  )
)
```
<a name="combine"></a>

## combine(operations) ⇒ <code>Operation</code>
Combines two operations into one

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
combine(
  create('foo'),
  delete('bar')
)
```
<a name="join"></a>

## join(targetPath, sourcePath, targetKey) ⇒ <code>Operation</code>
Adds data from a target object

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| targetPath | <code>String</code> | Target path |
| sourcePath | <code>String</code> | Source path |
| targetKey | <code>String</code> | Target Key |

**Example**  
```js
join('$.key','$.data','newKey')
```
<a name="expandReferences"></a>

## expandReferences(value, [skipFilter]) ⇒ <code>Operation</code>
Recursively resolves objects that have resolvable values (functions).

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> | data |
| [skipFilter] | <code>function</code> | a function which returns true if a value should be skipped |

<a name="field"></a>

## field(key, value) ⇒ <code>Field</code>
Returns a key, value pair in an array.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Name of the field |
| value | <code>Value</code> | The value itself or a sourceable operation. |

**Example**  
```js
field('destination_field_name__c', 'value')
```
<a name="fields"></a>

## fields(fields) ⇒ <code>Object</code>
Zips key value pairs into an object.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| fields | <code>Fields</code> | a list of fields |

**Example**  
```js
fields(list_of_fields)
```
<a name="merge"></a>

## merge(dataSource, fields) ⇒ <code>DataSource</code>
Merges fields into each item in an array.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| dataSource | <code>DataSource</code> |  |
| fields | <code>Object</code> | Group of fields to merge in. |

**Example**  
```js
merge(
  "$.books[*]",
  fields(
    field( "publisher", sourceValue("$.publisher") )
  )
)
```
<a name="index"></a>

## index() ⇒ <code>DataSource</code>
Returns the index of the current array being iterated.
To be used with `each` as a data source.

**Kind**: global function  
**Access**: public  
**Example**  
```js
index()
```
<a name="arrayToString"></a>

## arrayToString(arr, separator) ⇒ <code>string</code>
Turns an array into a string, separated by X.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | Array of toString'able primatives. |
| separator | <code>string</code> | Separator string. |

**Example**  
```js
field("destination_string__c", function(state) {
  return arrayToString(dataValue("path_of_array")(state), ', ')
})
```
<a name="toArray"></a>

## toArray(arg) ⇒ <code>array</code>
Ensures primitive data types are wrapped in an array.
Does not affect array objects.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>any</code> | Data required to be in an array |

**Example**  
```js
each(function(state) {
  return toArray( dataValue("path_of_array")(state) )
}, ...)
```
<a name="composeNextState"></a>

## composeNextState(state, response) ⇒ <code>State</code>
Prepares next state

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | state |
| response | <code>Object</code> | Response to be added |

**Example**  
```js
composeNextState(state, response)
```
<a name="humanProper"></a>

## humanProper(str) ⇒ <code>string</code>
Substitutes underscores for spaces and proper-cases a string

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String that needs converting |

**Example**  
```js
field("destination_string__c", humanProper(state.data.path_to_string))
```
<a name="scrubEmojis"></a>

## scrubEmojis(text, replacementChars) ⇒ <code>string</code>
Replaces emojis in a string.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | String that needs to be cleaned |
| replacementChars | <code>string</code> | Characters that replace the emojis |

**Example**  
```js
scrubEmojis('Dove🕊️⭐ 29')
```
<a name="chunk"></a>

## chunk(array, chunkSize) ⇒ <code>Object</code>
Chunks an array into an array of arrays, each with no more than a certain size.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Object</code> | Array to be chunked |
| chunkSize | <code>Integer</code> | The maxiumum size of each chunks |

**Example**  
```js
chunk([1,2,3,4,5], 2)
```
<a name="each"></a>

## each(dataSource, operation) ⇒ <code>Operation</code>
Scopes an array of data based on a JSONPath.
Useful when the source data has `n` items you would like to map to
an operation.
The operation will receive a slice of the data based of each item
of the JSONPath provided.

It also ensures the results of an operation make their way back into
the state's references.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| dataSource | <code>DataSource</code> | JSONPath referencing a point in `state`. |
| operation | <code>Operation</code> | The operation needed to be repeated. |

**Example**  
```js
each("$.[*]",
   create("SObject",
   field("FirstName", sourceValue("$.firstName")))
 )
```
<a name="expandRequestReferences"></a>

## expandRequestReferences(value) ⇒ <code>Operation</code>
Recursively resolves objects that have resolvable values (functions), but
omits HTTP request specific modules like `FormData`.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> | data |

<a name="withAgent"></a>

## withAgent(params) ⇒ <code>Operation</code>
Creates an https agent for axios from the agentOptions key passed in params.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data |

<a name="get"></a>

## get(requestParams) ⇒ <code>Operation</code>
Make a GET request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| requestParams | <code>object</code> | Supports the exact parameters as Axios. See [here](https://github.com/axios/axios#axios-api) |

**Example** *(Get an item with a specified id from state)*  
```js
 get({
     url: state => `https://www.example.com/api/items/${state.id},
     headers: {"content-type": "application/json"}
});
```
<a name="post"></a>

## post(requestParams) ⇒ <code>Operation</code>
Make a POST request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| requestParams | <code>object</code> | Supports the exact parameters as Axios. See [here](https://github.com/axios/axios#axios-api) |

**Example** *(Sending a payload with data that comes from state)*  
```js
post({
  url: "https://example.com",
  data: (state) => state.data
});
```
**Example** *( Capturing the response for later use in state )*  
```js
alterState((state) => {
  return post({
    url: "https://example.com",
    data: (state) => state.data
  })(state).then(({response}) => {
   state.responseData = response.data
  })
});
```
<a name="del"></a>

## del(requestParams) ⇒ <code>Operation</code>
Make a DELETE request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| requestParams | <code>object</code> | Supports the exact parameters as Axios. See [here](https://github.com/axios/axios#axios-api) |

**Example** *(Deleting a record with data that comes from state)*  
```js
delete({
   url: state => `https://www.example.com/api/items/${state.id}`,
 })(state);
```
<a name="head"></a>

## head(requestParams) ⇒ <code>Operation</code>
Make a HEAD request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| requestParams | <code>object</code> | Supports the exact parameters as Axios. See [here](https://github.com/axios/axios#axios-api) |

**Example** *(Gets the headers that would be returned if the HEAD request&#x27;s URL was instead requested with the HTTP GET method)*  
```js
head({
  url: 'https://www.example.com/api/items',
});
```
<a name="put"></a>

## put(requestParams) ⇒ <code>Operation</code>
Make a PUT request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| requestParams | <code>object</code> | Supports the exact parameters as Axios. See [here](https://github.com/axios/axios#axios-api) |

**Example** *(Creates a new resource or replaces a representation of the target resource with the request payload, with data from state.)*  
```js
put({
  url: state => `https://www.example.com/api/items/${state.id}`,
  data: state => state.data
});
```
<a name="patch"></a>

## patch(requestParams) ⇒ <code>Operation</code>
Make a PATCH request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| requestParams | <code>object</code> | Supports the exact parameters as Axios. See [here](https://github.com/axios/axios#axios-api) |

**Example** *(Applies partial modifications to a resource, with data from state.)*  
```js
patch({
  url: state => `https://www.example.com/api/items/${state.id}`,
  data: state => state.data
});
```
<a name="options"></a>

## options(requestParams) ⇒ <code>Operation</code>
Make a OPTIONS request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| requestParams | <code>object</code> | Supports the exact parameters as Axios. See [here](https://github.com/axios/axios#axios-api) |

**Example** *(Requests permitted communication options for a given URL or server, with data from state.)*  
```js
options({
  url: 'https://www.example.com/api/items',
});
```
