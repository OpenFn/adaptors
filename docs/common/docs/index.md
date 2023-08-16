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
    <a href="#expandReferences">expandReferences()</a></dt>
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
    <a href="#parseCsv">parseCsv(csvData, [parsingOptions], [callback])</a></dt>
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
    <a href="#splitKeys">splitKeys(obj, keys)</a></dt>
<dt>
    <a href="#toArray">toArray(arg)</a></dt>
<dt>
    <a href="#withAgent">withAgent(params)</a></dt>
</dl>

## alterState

alterState(func) ⇒ <code>Operation</code>
alias for "fn()"

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | is the function |


* * *

## arrayToString

arrayToString(arr, separator) ⇒ <code>string</code>
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

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> \| <code>object</code> \| <code>function</code> |  |
| state | <code>object</code> | The current state. |

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

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Object</code> | Array to be chunked |
| chunkSize | <code>Integer</code> | The maxiumum size of each chunks |

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

* * *

## composeNextState

composeNextState(state, response) ⇒ <code>State</code>
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

* * *

## dataPath

dataPath(path) ⇒ <code>string</code>
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

* * *

## dataValue

dataValue(path) ⇒ <code>Operation</code>
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

* * *

## del

del(requestParams) ⇒ <code>Operation</code>
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

* * *

## expandReferences

expandReferences(value, [skipFilter]) ⇒ <code>Operation</code>
Recursively resolves objects that have resolvable values (functions).

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> | data |
| [skipFilter] | <code>function</code> | a function which returns true if a value should be skipped |


* * *

## expandReferences

expandReferences()
General-purpose utility functions

These are designed more for use in adaptor code than job code
(but we could choose to export util from common)

None of these functions are operation factories

**Kind**: global function  

* * *

## expandRequestReferences

expandRequestReferences(value) ⇒ <code>Operation</code>
Recursively resolves objects that have resolvable values (functions), but
omits HTTP request specific modules like `FormData`.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> | data |


* * *

## field

field(key, value) ⇒ <code>Field</code>
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

* * *

## fields

fields(fields) ⇒ <code>Object</code>
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

* * *

## fn

fn(func) ⇒ <code>Operation</code>
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

* * *

## get

get(requestParams) ⇒ <code>Operation</code>
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

* * *

## head

head(requestParams) ⇒ <code>Operation</code>
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

* * *

## humanProper

humanProper(str) ⇒ <code>string</code>
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

| Param | Type | Description |
| --- | --- | --- |
| targetPath | <code>String</code> | Target path |
| sourcePath | <code>String</code> | Source path |
| targetKey | <code>String</code> | Target Key |

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

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | A valid JSON object. |
| path | <code>String</code> | JSONPath referencing a point in given JSON object. |

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

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | JSONPath referencing a point in `references`. |

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

* * *

## merge

merge(dataSource, fields) ⇒ <code>DataSource</code>
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

* * *

## options

options(requestParams) ⇒ <code>Operation</code>
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

* * *

## parseCsv

parseCsv(csvData, [parsingOptions], [callback]) ⇒ <code>Operation</code>
Takes a CSV file string or stream and parsing options as input, and returns a promise that
resolves to the parsed CSV data as an array of objects.
Options for `parsingOptions` include:
- `delimiter` {string/Buffer/[string/Buffer]} - Defines the character(s) used to delineate the fields inside a record. Default: `','`
- `quote` {string/Buffer/[string/Buffer]} - Defines the characters used to surround a field. Default: `'"'`
- `escape` {Buffer/string/null/boolean} - Set the escape character as one character/byte only. Default: `"`
- `columns` {boolean / array / function} - Generates record in the form of object literals. Default: `true`
- `bom` {boolean} - Strips the [byte order mark (BOM)](https://en.wikipedia.org/wiki/Byte_order_mark) from the input string or buffer. Default: `true`
- `trim` {boolean} - Ignore whitespace characters immediately around the `delimiter`. Default: `true`
- `ltrim` {boolean} - Ignore whitespace characters from the left side of a CSV field. Default: `true`
- `rtrim` {boolean} - Ignore whitespace characters from the right side of a CSV field. Default: `true`
- `chunkSize` {number} - The size of each chunk of CSV data. Default: `Infinity`
- `skip_empty_lines` {boolean} - Ignore empty lines in the CSV file. Default: `true`

**Kind**: global function  
**Returns**: <code>Operation</code> - The function returns a Promise that resolves to the result of parsing a CSV `stringOrStream`.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| csvData | <code>String</code> \| <code>Stream</code> | A CSV string or a readable stream |
| [parsingOptions] | <code>Object</code> | Optional. Parsing options for converting CSV to JSON. |
| [callback] | <code>function</code> | (Optional) callback function. If used it will be called state and an array of rows. |


* * *

## patch

patch(requestParams) ⇒ <code>Operation</code>
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

* * *

## post

post(requestParams) ⇒ <code>Operation</code>
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

* * *

## put

put(requestParams) ⇒ <code>Operation</code>
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

* * *

## referencePath

referencePath(path) ⇒ <code>string</code>
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

* * *

## scrubEmojis

scrubEmojis(text, replacementChars) ⇒ <code>string</code>
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

* * *

## source

source(path) ⇒ <code>Array.&lt;(String\|Object)&gt;</code>
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

* * *

## sourceValue

sourceValue(path) ⇒ <code>Operation</code>
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

* * *

## splitKeys

splitKeys(obj, keys) ⇒ <code>Array.&lt;Object&gt;</code>
Splits an object into two objects based on a list of keys.
The first object contains the keys that are not in the list,
and the second contains the keys that are.

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - - Tuple of objects, first object contains keys not in list, second contains keys that are.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to split. |
| keys | <code>Array.&lt;string&gt;</code> | List of keys to split on. |


* * *

## toArray

toArray(arg) ⇒ <code>array</code>
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

* * *

## withAgent

withAgent(params) ⇒ <code>Operation</code>
Creates an https agent for axios from the agentOptions key passed in params.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data |


* * *

