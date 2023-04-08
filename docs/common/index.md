## Functions

<dl>
<dt>
    <a href="#alterState">alterState(func)</a></dt>
<dt>
    <a href="#arrayToString">arrayToString(arr, separator)</a></dt>
<dt>
    <a href="#asData">asData(data, state)</a></dt>
<dt>
    <a href="#chunk">chunk(array, chunkSize)</a></dt>
<dt>
    <a href="#combine">combine(operations)</a></dt>
<dt>
    <a href="#composeNextState">composeNextState(state, response)</a></dt>
<dt>
    <a href="#dataPath">dataPath(path)</a></dt>
<dt>
    <a href="#dataValue">dataValue(path)</a></dt>
<dt>
    <a href="#del">del(requestParams)</a></dt>
<dt>
    <a href="#each">each(dataSource, operation)</a></dt>
<dt>
    <a href="#each">each(dataSource, operation)</a></dt>
<dt>
    <a href="#expandReferences">expandReferences(value, [skipFilter])</a></dt>
<dt>
    <a href="#expandRequestReferences">expandRequestReferences(value)</a></dt>
<dt>
    <a href="#field">field(key, value)</a></dt>
<dt>
    <a href="#fields">fields(fields)</a></dt>
<dt>
    <a href="#fn">fn(func)</a></dt>
<dt>
    <a href="#get">get(requestParams)</a></dt>
<dt>
    <a href="#head">head(requestParams)</a></dt>
<dt>
    <a href="#humanProper">humanProper(str)</a></dt>
<dt>
    <a href="#index">index()</a></dt>
<dt>
    <a href="#join">join(targetPath, sourcePath, targetKey)</a></dt>
<dt>
    <a href="#jsonValue">jsonValue(obj, path)</a></dt>
<dt>
    <a href="#lastReferenceValue">lastReferenceValue(path)</a></dt>
<dt>
    <a href="#map">map(path, operation, state)</a></dt>
<dt>
    <a href="#merge">merge(dataSource, fields)</a></dt>
<dt>
    <a href="#options">options(requestParams)</a></dt>
<dt>
    <a href="#patch">patch(requestParams)</a></dt>
<dt>
    <a href="#post">post(requestParams)</a></dt>
<dt>
    <a href="#put">put(requestParams)</a></dt>
<dt>
    <a href="#referencePath">referencePath(path)</a></dt>
<dt>
    <a href="#scrubEmojis">scrubEmojis(text, replacementChars)</a></dt>
<dt>
    <a href="#source">source(path)</a></dt>
<dt>
    <a href="#sourceValue">sourceValue(path)</a></dt>
<dt>
    <a href="#toArray">toArray(arg)</a></dt>
<dt>
    <a href="#withAgent">withAgent(params)</a></dt>
</dl>

## alterState

alterState(func) ⇒ <code>Operation</code>
alias for "fn()"

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>func</td><td><code>function</code></td><td><p>is the function</p>
</td>
    </tr>  </tbody>
</table>


* * *

## arrayToString

arrayToString(arr, separator) ⇒ <code>string</code>
Turns an array into a string, separated by X.

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
    <td>arr</td><td><code>array</code></td><td><p>Array of toString&#39;able primatives.</p>
</td>
    </tr><tr>
    <td>separator</td><td><code>string</code></td><td><p>Separator string.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
field("destination_string__c", function(state) {
  return arrayToString(dataValue("path_of_array")(state), ', ')
})
```

* * *

## asData

asData(data, state) ⇒ <code>array</code>
Simple switcher allowing other expressions to use either a JSONPath or
object literals as a data source.
- JSONPath referencing a point in `state`
- Object Literal of the data itself.
- Function to be called with state.

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
    <td>data</td><td><code>String</code> | <code>object</code> | <code>function</code></td><td></td>
    </tr><tr>
    <td>state</td><td><code>object</code></td><td><p>The current state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
asData('$.key'| key | callback)
```

* * *

## chunk

chunk(array, chunkSize) ⇒ <code>Object</code>
Chunks an array into an array of arrays, each with no more than a certain size.

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
    <td>array</td><td><code>Object</code></td><td><p>Array to be chunked</p>
</td>
    </tr><tr>
    <td>chunkSize</td><td><code>Integer</code></td><td><p>The maxiumum size of each chunks</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
chunk([1,2,3,4,5], 2)
```

* * *

## combine

combine(operations) ⇒ <code>Operation</code>
Combines two operations into one

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
    <td>operations</td><td><code>Operations</code></td><td><p>Operations to be performed.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
combine(
  create('foo'),
  delete('bar')
)
```

* * *

## composeNextState

composeNextState(state, response) ⇒ <code>State</code>
Prepares next state

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
    <td>state</td><td><code>State</code></td><td><p>state</p>
</td>
    </tr><tr>
    <td>response</td><td><code>Object</code></td><td><p>Response to be added</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
composeNextState(state, response)
```

* * *

## dataPath

dataPath(path) ⇒ <code>string</code>
Ensures a path points at the data.

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
    <td>path</td><td><code>string</code></td><td><p>JSONPath referencing a point in <code>data</code>.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
dataPath('key')
```

* * *

## dataValue

dataValue(path) ⇒ <code>Operation</code>
Picks out a single value from the source data object—usually `state.data`.
If a JSONPath returns more than one value for the reference, the first
item will be returned.

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
    <td>path</td><td><code>String</code></td><td><p>JSONPath referencing a point in <code>data</code>.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
dataValue('key')
```

* * *

## del

del(requestParams) ⇒ <code>Operation</code>
Make a DELETE request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>requestParams</td><td><code>object</code></td><td><p>Supports the exact parameters as Axios. See <a href="https://github.com/axios/axios#axios-api">here</a></p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Deleting a record with data that comes from state)*  
```js
delete({
   url: state => `https://www.example.com/api/items/${state.id}`,
 })(state);
```

* * *

## each

each(dataSource, operation) ⇒ <code>Operation</code>
Scopes an array of data based on a JSONPath.
Useful when the source data has `n` items you would like to map to
an operation.
The operation will receive a slice of the data based of each item
of the JSONPath provided.

It also ensures the results of an operation make their way back into
the state's references.

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
    <td>dataSource</td><td><code>DataSource</code></td><td><p>JSONPath referencing a point in <code>state</code>.</p>
</td>
    </tr><tr>
    <td>operation</td><td><code>Operation</code></td><td><p>The operation needed to be repeated.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
each("$.[*]",
  create("SObject",
    field("FirstName", sourceValue("$.firstName"))
  )
)
```

* * *

## each

each(dataSource, operation) ⇒ <code>Operation</code>
Scopes an array of data based on a JSONPath.
Useful when the source data has `n` items you would like to map to
an operation.
The operation will receive a slice of the data based of each item
of the JSONPath provided.

It also ensures the results of an operation make their way back into
the state's references.

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
    <td>dataSource</td><td><code>DataSource</code></td><td><p>JSONPath referencing a point in <code>state</code>.</p>
</td>
    </tr><tr>
    <td>operation</td><td><code>Operation</code></td><td><p>The operation needed to be repeated.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
each("$.[*]",
   create("SObject",
   field("FirstName", sourceValue("$.firstName")))
 )
```

* * *

## expandReferences

expandReferences(value, [skipFilter]) ⇒ <code>Operation</code>
Recursively resolves objects that have resolvable values (functions).

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
    <td>value</td><td><code>object</code></td><td><p>data</p>
</td>
    </tr><tr>
    <td>[skipFilter]</td><td><code>function</code></td><td><p>a function which returns true if a value should be skipped</p>
</td>
    </tr>  </tbody>
</table>


* * *

## expandRequestReferences

expandRequestReferences(value) ⇒ <code>Operation</code>
Recursively resolves objects that have resolvable values (functions), but
omits HTTP request specific modules like `FormData`.

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
    <td>value</td><td><code>object</code></td><td><p>data</p>
</td>
    </tr>  </tbody>
</table>


* * *

## field

field(key, value) ⇒ <code>Field</code>
Returns a key, value pair in an array.

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
    <td>key</td><td><code>string</code></td><td><p>Name of the field</p>
</td>
    </tr><tr>
    <td>value</td><td><code>Value</code></td><td><p>The value itself or a sourceable operation.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
field('destination_field_name__c', 'value')
```

* * *

## fields

fields(fields) ⇒ <code>Object</code>
Zips key value pairs into an object.

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
    <td>fields</td><td><code>Fields</code></td><td><p>a list of fields</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
fields(list_of_fields)
```

* * *

## fn

fn(func) ⇒ <code>Operation</code>
Creates a custom step (or operation) for more flexible job writing.

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
    <td>func</td><td><code>function</code></td><td><p>is the function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
fn(state => {
  // do some things to state
  return state;
});
```

* * *

## get

get(requestParams) ⇒ <code>Operation</code>
Make a GET request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>requestParams</td><td><code>object</code></td><td><p>Supports the exact parameters as Axios. See <a href="https://github.com/axios/axios#axios-api">here</a></p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Get an item with a specified id from state)*  
```js
 get({
     url: state => `https://www.example.com/api/items/${state.id},
     headers: {"content-type": "application/json"}
});
```

* * *

## head

head(requestParams) ⇒ <code>Operation</code>
Make a HEAD request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>requestParams</td><td><code>object</code></td><td><p>Supports the exact parameters as Axios. See <a href="https://github.com/axios/axios#axios-api">here</a></p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Gets the headers that would be returned if the HEAD request&#x27;s URL was instead requested with the HTTP GET method)*  
```js
head({
  url: 'https://www.example.com/api/items',
});
```

* * *

## humanProper

humanProper(str) ⇒ <code>string</code>
Substitutes underscores for spaces and proper-cases a string

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
    <td>str</td><td><code>string</code></td><td><p>String that needs converting</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
field("destination_string__c", humanProper(state.data.path_to_string))
```

* * *

## index

index() ⇒ <code>DataSource</code>
Returns the index of the current array being iterated.
To be used with `each` as a data source.

**Kind**: global function  
**Access**: public  
**Example**  
```js
index()
```

* * *

## join

join(targetPath, sourcePath, targetKey) ⇒ <code>Operation</code>
Adds data from a target object

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
    <td>targetPath</td><td><code>String</code></td><td><p>Target path</p>
</td>
    </tr><tr>
    <td>sourcePath</td><td><code>String</code></td><td><p>Source path</p>
</td>
    </tr><tr>
    <td>targetKey</td><td><code>String</code></td><td><p>Target Key</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
join('$.key','$.data','newKey')
```

* * *

## jsonValue

jsonValue(obj, path) ⇒ <code>Operation</code>
Picks out a single value from a JSON object.
If a JSONPath returns more than one value for the reference, the first
item will be returned.

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
    <td>obj</td><td><code>object</code></td><td><p>A valid JSON object.</p>
</td>
    </tr><tr>
    <td>path</td><td><code>String</code></td><td><p>JSONPath referencing a point in given JSON object.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
jsonValue({ a:1 }, 'a')
```

* * *

## lastReferenceValue

lastReferenceValue(path) ⇒ <code>Operation</code>
Picks out the last reference value from source data.

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
    <td>path</td><td><code>String</code></td><td><p>JSONPath referencing a point in <code>references</code>.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
lastReferenceValue('key')
```

* * *

## map

map(path, operation, state) ⇒ <code>State</code>
Scopes an array of data based on a JSONPath.
Useful when the source data has `n` items you would like to map to
an operation.
The operation will receive a slice of the data based of each item
of the JSONPath provided.

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
    <td>path</td><td><code>string</code></td><td><p>JSONPath referencing a point in <code>state.data</code>.</p>
</td>
    </tr><tr>
    <td>operation</td><td><code>function</code></td><td><p>The operation needed to be repeated.</p>
</td>
    </tr><tr>
    <td>state</td><td><code>State</code></td><td><p>Runtime state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
map("$.[*]",
  create("SObject",
    field("FirstName", sourceValue("$.firstName"))
  )
)
```

* * *

## merge

merge(dataSource, fields) ⇒ <code>DataSource</code>
Merges fields into each item in an array.

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
    <td>dataSource</td><td><code>DataSource</code></td><td></td>
    </tr><tr>
    <td>fields</td><td><code>Object</code></td><td><p>Group of fields to merge in.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
merge(
  "$.books[*]",
  fields(
    field( "publisher", sourceValue("$.publisher") )
  )
)
```

* * *

## options

options(requestParams) ⇒ <code>Operation</code>
Make a OPTIONS request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>requestParams</td><td><code>object</code></td><td><p>Supports the exact parameters as Axios. See <a href="https://github.com/axios/axios#axios-api">here</a></p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Requests permitted communication options for a given URL or server, with data from state.)*  
```js
options({
  url: 'https://www.example.com/api/items',
});
```

* * *

## patch

patch(requestParams) ⇒ <code>Operation</code>
Make a PATCH request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>requestParams</td><td><code>object</code></td><td><p>Supports the exact parameters as Axios. See <a href="https://github.com/axios/axios#axios-api">here</a></p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Applies partial modifications to a resource, with data from state.)*  
```js
patch({
  url: state => `https://www.example.com/api/items/${state.id}`,
  data: state => state.data
});
```

* * *

## post

post(requestParams) ⇒ <code>Operation</code>
Make a POST request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>requestParams</td><td><code>object</code></td><td><p>Supports the exact parameters as Axios. See <a href="https://github.com/axios/axios#axios-api">here</a></p>
</td>
    </tr>  </tbody>
</table>

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

* * *

## put

put(requestParams) ⇒ <code>Operation</code>
Make a PUT request

**Kind**: global function  
**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>requestParams</td><td><code>object</code></td><td><p>Supports the exact parameters as Axios. See <a href="https://github.com/axios/axios#axios-api">here</a></p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Creates a new resource or replaces a representation of the target resource with the request payload, with data from state.)*  
```js
put({
  url: state => `https://www.example.com/api/items/${state.id}`,
  data: state => state.data
});
```

* * *

## referencePath

referencePath(path) ⇒ <code>string</code>
Ensures a path points at references.

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
    <td>path</td><td><code>string</code></td><td><p>JSONPath referencing a point in <code>references</code>.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
referencePath('key')
```

* * *

## scrubEmojis

scrubEmojis(text, replacementChars) ⇒ <code>string</code>
Replaces emojis in a string.

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
    <td>text</td><td><code>string</code></td><td><p>String that needs to be cleaned</p>
</td>
    </tr><tr>
    <td>replacementChars</td><td><code>string</code></td><td><p>Characters that replace the emojis</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
scrubEmojis('Dove🕊️⭐ 29')
```

* * *

## source

source(path) ⇒ <code>Array.&lt;(String\|Object)&gt;</code>
Picks out a value from source data.
Will return whatever JSONPath returns, which will always be an array.
If you need a single value use `sourceValue` instead.

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
    <td>path</td><td><code>String</code></td><td><p>JSONPath referencing a point in <code>state</code>.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
source('$.key')
```

* * *

## sourceValue

sourceValue(path) ⇒ <code>Operation</code>
Picks out a single value from source data.
If a JSONPath returns more than one value for the reference, the first
item will be returned.

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
    <td>path</td><td><code>String</code></td><td><p>JSONPath referencing a point in <code>state</code>.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
sourceValue('$.key')
```

* * *

## toArray

toArray(arg) ⇒ <code>array</code>
Ensures primitive data types are wrapped in an array.
Does not affect array objects.

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
    <td>arg</td><td><code>any</code></td><td><p>Data required to be in an array</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
each(function(state) {
  return toArray( dataValue("path_of_array")(state) )
}, ...)
```

* * *

## withAgent

withAgent(params) ⇒ <code>Operation</code>
Creates an https agent for axios from the agentOptions key passed in params.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>data</p>
</td>
    </tr>  </tbody>
</table>


* * *

