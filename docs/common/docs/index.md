## Functions

<dl>
<dt>
    <a href="#alterstate">alterState(func)</a></dt>
<dt>
    <a href="#arraytostring">arrayToString(arr, separator)</a></dt>
<dt>
    <a href="#asdata">asData(data, state)</a></dt>
<dt>
    <a href="#chunk">chunk(array, chunkSize)</a></dt>
<dt>
    <a href="#combine">combine(operations)</a></dt>
<dt>
    <a href="#composenextstate">composeNextState(state, response)</a></dt>
<dt>
    <a href="#cursor">cursor(value, options)</a></dt>
<dt>
    <a href="#datapath">dataPath(path)</a></dt>
<dt>
    <a href="#datavalue">dataValue(path)</a></dt>
<dt>
    <a href="#del">del(requestParams)</a></dt>
<dt>
    <a href="#each">each(dataSource, operation)</a></dt>
<dt>
    <a href="#each">each(dataSource, operation)</a></dt>
<dt>
    <a href="#expandreferences">expandReferences(value, [skipFilter])</a></dt>
<dt>
    <a href="#expandrequestreferences">expandRequestReferences(value)</a></dt>
<dt>
    <a href="#field">field(key, value)</a></dt>
<dt>
    <a href="#fields">fields(fields)</a></dt>
<dt>
    <a href="#fn">fn(func)</a></dt>
<dt>
    <a href="#fnif">fnIf(condition, operation)</a></dt>
<dt>
    <a href="#get">get(requestParams)</a></dt>
<dt>
    <a href="#group">group(arrayOfObjects, keyPath, callback)</a></dt>
<dt>
    <a href="#head">head(requestParams)</a></dt>
<dt>
    <a href="#humanproper">humanProper(str)</a></dt>
<dt>
    <a href="#index">index()</a></dt>
<dt>
    <a href="#join">join(targetPath, sourcePath, targetKey)</a></dt>
<dt>
    <a href="#jsonvalue">jsonValue(obj, path)</a></dt>
<dt>
    <a href="#lastreferencevalue">lastReferenceValue(path)</a></dt>
<dt>
    <a href="#map">map(path, operation, state)</a></dt>
<dt>
    <a href="#merge">merge(dataSource, fields)</a></dt>
<dt>
    <a href="#options">options(requestParams)</a></dt>
<dt>
    <a href="#parsecsv">parseCsv(csvData, [parsingOptions], [callback])</a></dt>
<dt>
    <a href="#patch">patch(requestParams)</a></dt>
<dt>
    <a href="#post">post(requestParams)</a></dt>
<dt>
    <a href="#put">put(requestParams)</a></dt>
<dt>
    <a href="#referencepath">referencePath(path)</a></dt>
<dt>
    <a href="#request">request(method, fullUrlOrPath, [options])</a></dt>
<dt>
    <a href="#scrubemojis">scrubEmojis(text, replacementChars)</a></dt>
<dt>
    <a href="#source">source(path)</a></dt>
<dt>
    <a href="#sourcevalue">sourceValue(path)</a></dt>
<dt>
    <a href="#splitkeys">splitKeys(obj, keys)</a></dt>
<dt>
    <a href="#toarray">toArray(arg)</a></dt>
<dt>
    <a href="#validate">validate(schema, data)</a></dt>
<dt>
    <a href="#withagent">withAgent(params)</a></dt>
</dl>

## alterState

alterState(func) ⇒ <code>Operation</code>

alias for "fn()"


| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | is the function |


* * *

## arrayToString

arrayToString(arr, separator) ⇒ <code>string</code>

Turns an array into a string, separated by X.


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


| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | state |
| response | <code>Object</code> | Response to be added |

**Example**  
```js
composeNextState(state, response)
```

* * *

## cursor

cursor(value, options) ⇒ <code>Operation</code>

Sets a cursor property on state.
Supports natural language dates like `now`, `today`, `yesterday`, `n hours ago`, `n days ago`, and `start`,
which will be converted relative to the environment (ie, the Lightning or CLI locale). Custom timezones
are not yet supported.
You can provide a formatter to customise the final cursor value, which is useful for normalising
different inputs. The custom formatter runs after natural language date conversion.
See the usage guide at [https://docs.openfn.org/documentation/jobs/job-writing-guide#using-cursors](https://docs.openfn.org/documentation/jobs/job-writing-guide#using-cursors)


| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | the cursor value. Usually an ISO date, natural language date, or page number |
| options | <code>object</code> | options to control the cursor. |
| options.key | <code>string</code> | set the cursor key. Will persist through the whole run. |
| options.defaultValue | <code>any</code> | the value to use if value is falsy |
| options.format | <code>function</code> | custom formatter for the final cursor value |

**Example** *(Use a cursor from state if present, or else use the default value)*  
```js
cursor($.cursor, { defaultValue: 'today' })
```
**Example** *(Use a pagination cursor)*  
```js
cursor(22)
```

* * *

## dataPath

dataPath(path) ⇒ <code>string</code>

Ensures a path points at the data.


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

**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  

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


| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> | data |
| [skipFilter] | <code>function</code> | a function which returns true if a value should be skipped |


* * *

## expandRequestReferences

expandRequestReferences(value) ⇒ <code>Operation</code>

Recursively resolves objects that have resolvable values (functions), but
omits HTTP request specific modules like `FormData`.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> | data |


* * *

## field

field(key, value) ⇒ <code>Field</code>

Returns a key, value pair in an array.


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

## fnIf

fnIf(condition, operation) ⇒ <code>Operation</code>

A custom operation that will only execute the function if the condition returns true


| Param | Type | Description |
| --- | --- | --- |
| condition | <code>Boolean</code> | The condition that returns true |
| operation | <code>Operation</code> | The operation needed to be executed. |

**Example**  
```js
fnIf((state) => state?.data?.name, get("https://example.com"));
```

* * *

## get

get(requestParams) ⇒ <code>Operation</code>

Make a GET request

**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  

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

## group

group(arrayOfObjects, keyPath, callback) ⇒ <code>Operation</code>

Groups an array of objects by a specified key path.


| Param | Type | Description |
| --- | --- | --- |
| arrayOfObjects | <code>Array.&lt;Object&gt;</code> | The array of objects to be grouped. |
| keyPath | <code>string</code> | The key path to group by. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
const users = [
  { name: 'Alice', age: 25, city: 'New York' },
  { name: 'Bob', age: 30, city: 'San Francisco' },
  { name: 'Charlie', age: 25, city: 'New York' },
  { name: 'David', age: 30, city: 'San Francisco' }
];
group(users, 'city');
// state is { data: { 'New York': [/Alice, Charlie/], 'San Francisco': [ /Bob, David / ] }
```

* * *

## head

head(requestParams) ⇒ <code>Operation</code>

Make a HEAD request

**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  

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

**Example**  
```js
index()
```

* * *

## join

join(targetPath, sourcePath, targetKey) ⇒ <code>Operation</code>

Adds data from a target object


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

**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  

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

**Returns**: <code>Operation</code> - The function returns a Promise that resolves to the result of parsing a CSV `stringOrStream`.  

| Param | Type | Description |
| --- | --- | --- |
| csvData | <code>String</code> \| <code>Stream</code> | A CSV string or a readable stream |
| [parsingOptions] | <code>Object</code> | Optional. Parsing options for converting CSV to JSON. |
| [callback] | <code>function</code> | (Optional) callback function. If used it will be called state and an array of rows. |


* * *

## patch

patch(requestParams) ⇒ <code>Operation</code>

Make a PATCH request

**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  

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

**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  

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

**Returns**: <code>Operation</code> - - Function which takes state and returns a Promise  

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


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | JSONPath referencing a point in `references`. |

**Example**  
```js
referencePath('key')
```

* * *

## request

request(method, fullUrlOrPath, [options]) ⇒

`request` is a helper function that sends HTTP requests and returns the response
body, headers, and status code.
Use the error map to provide custom error messages or get hold of the response in case of errors.

**Returns**: an object with the following properties:
- method: the request method
- url: the request url
- code: the status code of the response
- headers: the headers of the response
- body: the body of the response
- message: the status text of the response
- duration: the response time  

| Param | Description |
| --- | --- |
| method | The HTTP method to use for the request (e.g., "GET", "POST", "PUT", "DELETE", etc.). |
| fullUrlOrPath | The full or partial URL for the request. |
| [options] | The `options` parameter is an object that contains additional configuration options for the request. |


* * *

## scrubEmojis

scrubEmojis(text, replacementChars) ⇒ <code>string</code>

Replaces emojis in a string.


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

**Returns**: <code>Array.&lt;Object&gt;</code> - - Tuple of objects, first object contains keys not in list, second contains keys that are.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to split. |
| keys | <code>Array.&lt;string&gt;</code> | List of keys to split on. |


* * *

## toArray

toArray(arg) ⇒ <code>array</code>

Ensures primitive data types are wrapped in an array.
Does not affect array objects.


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

## validate

validate(schema, data) ⇒ <code>Operation</code>

Validate against a JSON schema. Any erors are written to an array at `state.validationErrors`.
Schema can be passed directly, loaded as a JSON path from state, or loaded from a URL
Data can be passed directly or loaded as a JSON path from state.
By default, schema is loaded from `state.schema` and data from `state.data`.


| Param | Type | Description |
| --- | --- | --- |
| schema | <code>string</code> \| <code>object</code> | The schema, path or URL to validate against |
| data | <code>string</code> \| <code>object</code> | The data or path to validate |

**Example** *(Validate &#x60;state.data&#x60; with &#x60;state.schema&#x60;)*  
```js
validate()
```
**Example** *(Validate form data at &#x60;state.form&#x60; with a schema from a URL)*  
```js
validate("https://www.example.com/schema/record", "form")
```
**Example** *(Validate the each item in &#x60;state.records&#x60; with a schema from a URL)*  
```js
each("records[*]", validate("https://www.example.com/schema/record"))
```

* * *

## withAgent

withAgent(params) ⇒ <code>Operation</code>

Creates an https agent for axios from the agentOptions key passed in params.


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data |


* * *

