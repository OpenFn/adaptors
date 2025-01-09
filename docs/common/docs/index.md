<dl>
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
    <a href="#each">each(dataSource, operation)</a></dt>
<dt>
    <a href="#expandreferences">expandReferences(value, [skipFilter])</a></dt>
<dt>
    <a href="#field">field(key, value)</a></dt>
<dt>
    <a href="#fields">fields(fields)</a></dt>
<dt>
    <a href="#fn">fn(func)</a></dt>
<dt>
    <a href="#fnif">fnIf(condition, operation)</a></dt>
<dt>
    <a href="#group">group(arrayOfObjects, keyPath, callback)</a></dt>
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
    <a href="#parsecsv">parseCsv(csvData, [parsingOptions], [callback])</a></dt>
<dt>
    <a href="#referencepath">referencePath(path)</a></dt>
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
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#util_decode">util.decode(base64Data)</a>
</dt>

<dt>
    <a href="#util_encode">util.encode(data)</a>
</dt>

<dt>
    <a href="#util_uuid">util.uuid()</a>
</dt>

<dt>
    <a href="#beta_each">beta.each(dataSource, operation)</a>
</dt>

<dt>
    <a href="#dateFns_format">dateFns.format()</a>
</dt>

<dt>
    <a href="#dateFns_parse">dateFns.parse()</a>
</dt>

<dt>
    <a href="#http_get">http.get(url, options)</a>
</dt>

<dt>
    <a href="#http_options">http.options(options)</a>
</dt>

<dt>
    <a href="#http_post">http.post(url, options)</a>
</dt>

<dt>
    <a href="#http_request">http.request(method, url, options)</a>
</dt>
</dl>


## Functions
### arrayToString

<p><code>arrayToString(arr, separator) ⇒ string</code></p>

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

### asData

<p><code>asData(data, state) ⇒ array</code></p>

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

### chunk

<p><code>chunk(array, chunkSize) ⇒ Object</code></p>

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

### combine

<p><code>combine(operations) ⇒ Operation</code></p>

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

### composeNextState

<p><code>composeNextState(state, response) ⇒ State</code></p>

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

### cursor

<p><code>cursor(value, options) ⇒ Operation</code></p>

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

**Example:** Use a cursor from state if present, or else use the default value
```js
cursor($.cursor, { defaultValue: 'today' })
```
**Example:** Use a pagination cursor
```js
cursor(22)
```

* * *

### dataPath

<p><code>dataPath(path) ⇒ string</code></p>

Ensures a path points at the data.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | JSONPath referencing a point in `data`. |

**Example**
```js
dataPath('key')
```

* * *

### dataValue

<p><code>dataValue(path) ⇒ Operation</code></p>

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

### each

<p><code>each(dataSource, operation) ⇒ Operation</code></p>

Iterates over an array of items and invokes an operation upon each one, where the state
object is _scoped_ so that state.data is the item under iteration.
The rest of the state object is untouched and can be referenced as usual.
You can pass an array directly, or use lazy state or a JSONPath string to
reference a slice of state.


| Param | Type | Description |
| --- | --- | --- |
| dataSource | <code>DataSource</code> | JSONPath referencing a point in `state`. |
| operation | <code>Operation</code> | The operation needed to be repeated. |

**Example:** Using lazy state ($) to iterate over items in state.data and pass each into an "insert" operation
```js
each(
  $.data,
  // Inside the callback operation, `$.data` is scoped to the item under iteration
  insert("patient", {
    patient_name: $.data.properties.case_name,
    patient_id: $.data.case_id,
  })
);
```
**Example:** Iterate over items in state.data and pass each one into an "insert" operation
```js
each(
  $.data,
  insert("patient", (state) => ({
    patient_id: state.data.case_id,
    ...state.data
  }))
);
```
**Example:** Using JSON path to iterate over items in state.data and pass each one into an "insert" operation
```js
each(
  "$.data[*]",
  insert("patient", (state) => ({
    patient_name: state.data.properties.case_name,
    patient_id: state.data.case_id,
  }))
);
```

* * *

### expandReferences

<p><code>expandReferences(value, [skipFilter]) ⇒ Operation</code></p>

Recursively resolves objects that have resolvable values (functions).


| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> | data |
| [skipFilter] | <code>function</code> | a function which returns true if a value should be skipped |


* * *

### field

<p><code>field(key, value) ⇒ Field</code></p>

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

### fields

<p><code>fields(fields) ⇒ Object</code></p>

Zips key value pairs into an object.


| Param | Type | Description |
| --- | --- | --- |
| fields | <code>Fields</code> | a list of fields |

**Example**
```js
fields(list_of_fields)
```

* * *

### fn

<p><code>fn(func) ⇒ Operation</code></p>

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

### fnIf

<p><code>fnIf(condition, operation) ⇒ Operation</code></p>

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

### group

<p><code>group(arrayOfObjects, keyPath, callback) ⇒ Operation</code></p>

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

### humanProper

<p><code>humanProper(str) ⇒ string</code></p>

Substitutes underscores for spaces and proper-cases a string


| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String that needs converting |

**Example**
```js
field("destination_string__c", humanProper(state.data.path_to_string))
```

* * *

### index

<p><code>index() ⇒ DataSource</code></p>

Returns the index of the current array being iterated.
To be used with `each` as a data source.

**Example**
```js
index()
```

* * *

### join

<p><code>join(targetPath, sourcePath, targetKey) ⇒ Operation</code></p>

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

### jsonValue

<p><code>jsonValue(obj, path) ⇒ Operation</code></p>

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

### lastReferenceValue

<p><code>lastReferenceValue(path) ⇒ Operation</code></p>

Picks out the last reference value from source data.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | JSONPath referencing a point in `references`. |

**Example**
```js
lastReferenceValue('key')
```

* * *

### map

<p><code>map(path, operation, state) ⇒ State</code></p>

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

### merge

<p><code>merge(dataSource, fields) ⇒ DataSource</code></p>

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

### parseCsv

<p><code>parseCsv(csvData, [parsingOptions], [callback]) ⇒ Operation</code></p>

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

### referencePath

<p><code>referencePath(path) ⇒ string</code></p>

Ensures a path points at references.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | JSONPath referencing a point in `references`. |

**Example**
```js
referencePath('key')
```

* * *

### scrubEmojis

<p><code>scrubEmojis(text, replacementChars) ⇒ string</code></p>

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

### source

<p><code>source(path) ⇒ Array.&lt;(String|Object)&gt;</code></p>

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

### sourceValue

<p><code>sourceValue(path) ⇒ Operation</code></p>

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

### splitKeys

<p><code>splitKeys(obj, keys) ⇒ Array.&lt;Object&gt;</code></p>

Splits an object into two objects based on a list of keys.
The first object contains the keys that are not in the list,
and the second contains the keys that are.

**Returns**: <code>Array.&lt;Object&gt;</code> - - Tuple of objects, first object contains keys not in list, second contains keys that are.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to split. |
| keys | <code>Array.&lt;string&gt;</code> | List of keys to split on. |


* * *

### toArray

<p><code>toArray(arg) ⇒ array</code></p>

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


## util

These functions belong to the util namespace.
### util.decode {#util_decode}

<p><code>decode(base64Data) ⇒ string</code></p>

Decodes a Base64 encoded string back to its original format.

**Returns**: <code>string</code> - - The decoded string.  

| Param | Type | Description |
| --- | --- | --- |
| base64Data | <code>string</code> | The Base64 encoded string. |

**Example:** Decode a Base64 string
```js
const decoded = decode('SGVsbG8gV29ybGQ=');
console.log(decoded); // Output: Hello World
```

* * *


### util.encode {#util_encode}

<p><code>encode(data) ⇒ string</code></p>

Encodes a given string into Base64 format.

**Returns**: <code>string</code> - - The Base64 encoded string.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The string to be encoded. |

**Example:** Encode a string
```js
const encoded = encode('Hello World');
console.log(encoded); // Output: SGVsbG8gV29ybGQ=
```

* * *


### util.uuid {#util_uuid}

<p><code>uuid() ⇒ string</code></p>

Generates a UUID (Universally Unique Identifier).

**Returns**: <code>string</code> - - A newly generated UUID.  
**Example:** Generate a UUID
```js
const id = uuid();
console.log(id); // Output:'3f4e254e-8f6f-4f8b-9651-1c1c262cc83f'
```

* * *


## beta

These functions belong to the beta namespace.
### beta.each {#beta_each}

<p><code>each(dataSource, operation) ⇒ Operation</code></p>

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


## dateFns

These functions belong to the dateFns namespace.
### dateFns.format {#dateFns_format}

<p><code>format()</code></p>

The format function from the date-fns library. See [https://date-fns.org/v3.6.0/docs/parse](https://date-fns.org/v3.6.0/docs/parse)


* * *


### dateFns.parse {#dateFns_parse}

<p><code>parse()</code></p>

The parse function from the date-fns library. See [https://date-fns.org/v3.6.0/docs/parse](https://date-fns.org/v3.6.0/docs/parse)


* * *


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(url, options) ⇒ Operation</code></p>

Make a GET request.


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL to access |
| options | [<code>CommonRequestOptions</code>](#commonrequestoptions) | Request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Request a resource
```js
http.get('https://jsonplaceholder.typicode.com/todos')
```
**Example:** Request a resource with basic auth
```js
http.get(
 'https://jsonplaceholder.typicode.com/todos',
 http.options().basic('user', 'pass')
)
```
**Example:** Request a resource with oauth
```js
http.get(
 'https://jsonplaceholder.typicode.com/todos',
 http.options().oauth($.configuration.access_token)
)
```

* * *


### http.options {#http_options}

<p><code>options(options) ⇒ OptionsHelpers</code></p>

Builder function to create request options. Returns an object with helpers to
easily add commonly used options. The return object is chainable so you can set
as many options as you want.
Pass an object to set your own options.


| Param | Type | Description |
| --- | --- | --- |
| options | [<code>CommonRequestOptions</code>](#commonrequestoptions) | options to pass to the request |

**Example:** Get with a query an oath token
```js
get($.data.url, http.options({ query: $.query }).oath($.configuration.access_token))
```

* * *


### http.post {#http_post}

<p><code>post(url, options) ⇒ Operation</code></p>

Make a POST request.


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL to access |
| options | [<code>CommonRequestOptions</code>](#commonrequestoptions) | Request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Post a JSON object (setting the content-type header)
```js
 http.post(
   'https://jsonplaceholder.typicode.com/todos',
   $.data,
   options().json(),
 })
```

* * *


### http.request {#http_request}

<p><code>request(method, url, options) ⇒ Operation</code></p>

Make a HTTP request.


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The HTTP method to use. |
| url | <code>string</code> | URL to resource. |
| options | [<code>CommonRequestOptions</code>](#commonrequestoptions) | Request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
http.request(
  'GET',
  'https://jsonplaceholder.typicode.com/todos'
)
```

* * *


##  Interfaces

### OptionsHelpers

Helper functions provided by `http.options`.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| json | <code>function</code> | Sets the `content-type' header to 'application/json' |
| basic | <code>function</code> | Sets basic auth on the Authorization header. Pass username and password |
| bearer | <code>function</code> | Sets a Bearer token on the Authorization header. Pass the token. |
| oauth | <code>function</code> | Sets a Bearer token on the Authorization header. Pass the oauth token. |


* * *

