<dl>
<dt>
    <a href="#createentry">createEntry(libraryId, body)</a></dt>
<dt>
    <a href="#getentry">getEntry(libraryId, entryId)</a></dt>
<dt>
    <a href="#getfields">getFields(libraryId)</a></dt>
<dt>
    <a href="#listentries">listEntries(libraryId, [options])</a></dt>
<dt>
    <a href="#listlibraries">listLibraries()</a></dt>
<dt>
    <a href="#updateentry">updateEntry(libraryId, entryId, body)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_get">http.get(path, options)</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, body, options)</a>
</dt>

<dt>
    <a href="#http_put">http.put(path, body, options)</a>
</dt>

<dt>
    <a href="#http_request">http.request(method, path, body, options)</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#assert">assert()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#cursor">cursor()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#each">each()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#field">field()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fields">fields()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fn">fn()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fnif">fnIf()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#group">group()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#map">map()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#scrubemojis">scrubEmojis()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>

## Functions
### createEntry

<p><code>createEntry(libraryId, body) ⇒ Operation</code></p>

Create an entry


| Param | Type | Description |
| --- | --- | --- |
| libraryId | <code>string</code> | The library ID |
| body | <code>object</code> | The entry body to create |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The created entry as returned by Memento |

**Example:** Create an entry
```js
createEntry("HyZV7AYk0", {
  fields: [
    {
      value: "Record 1",
      id: 1,
    },
    {
      id: 2,
      value: 1000,
    },
  ],
});
```

* * *

### getEntry

<p><code>getEntry(libraryId, entryId) ⇒ Operation</code></p>

Get an entry


| Param | Type | Description |
| --- | --- | --- |
| libraryId | <code>string</code> | The library ID |
| entryId | <code>string</code> | The entry ID |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | an entry object |

**Example:** Get an entry
```js
getEntry('HyZV7AYk0', 'T0xIYmE-V2QoMmRTWF1sVVJUKnU');
```

* * *

### getFields

<p><code>getFields(libraryId) ⇒ Operation</code></p>

Get fields for a library


| Param | Type | Description |
| --- | --- | --- |
| libraryId | <code>string</code> | The library ID |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data.fields | An array of fields for the library |

**Example:** Get library fields
```js
getFields('HyZV7AYk0');
```

* * *

### listEntries

<p><code>listEntries(libraryId, [options]) ⇒ Operation</code></p>

List all entries in a library.
This function handles rate limits and automatically paginates to fetch all entries.


| Param | Type | Description |
| --- | --- | --- |
| libraryId | <code>string</code> | The library ID |
| [options] | [<code>EntriesRequestOptions</code>](#entriesrequestoptions) | List entries request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data.entries | An array of entry objects for a library |

**Example:** List all entries in a library
```js
listEntries('HyZV7AYk0');
```

* * *

### listLibraries

<p><code>listLibraries() ⇒ Operation</code></p>

List all libraries

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data.libraries | an array of library objects |

**Example:** List all libraries
```js
listLibraries();
```

* * *

### updateEntry

<p><code>updateEntry(libraryId, entryId, body) ⇒ Operation</code></p>

Update an entry


| Param | Type | Description |
| --- | --- | --- |
| libraryId | <code>string</code> | The ID of the library to update the entry in |
| entryId | <code>string</code> | The ID of the entry to update |
| body | <code>object</code> | The entry body to update |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The updated entry as returned by Memento |

**Example:** Update an entry
```js
updateEntry('HyZV7AYk0', 'T0xIYmE-V2QoMmRTWF1sVVJUKnU', {
  fields: [
    {
      value: "Record Updated",
      id: 1,
    },
    {
      id: 2,
      value: 100,
    },
  ],
});
```

* * *


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** List all libraries
```js
get("libraries");
```
**Example:** Get a single library fields
```js
get('libraries/HyZV7AYk0');
```

* * *


### http.post {#http_post}

<p><code>post(path, body, options) ⇒ Operation</code></p>

Make a POST request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create an entry
```js
post("libraries/HyZV7AYk0/entries", { "name": "Bukayo" });
```

* * *


### http.put {#http_put}

<p><code>put(path, body, options) ⇒ Operation</code></p>

Make a PUT request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the PUT body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Update an entry
```js
put("libraries/HyZV7AYk0/entries/T0xIYmE-V2QoMmRTWF1sVVJUKnU", { "name": "Bukayo" });
```

* * *


### http.request {#http_request}

<p><code>request(method, path, body, options) ⇒ Operation</code></p>

Make a general HTTP request


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Edit an entry
```js
request("PUT", "libraries/HyZV7AYk0/entries/T0xIYmE-V2QoMmRTWF1sVVJUKnU", { "name": "Bukayo" });
```
**Example:** Delete an entry
```js
request("DELETE", "libraries/HyZV7AYk0/entries/T0xIYmE-V2QoMmRTWF1sVVJUKnU");
```

* * *


##  Interfaces

### EntriesRequestOptions

Fetch Entries Request Options


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [options.pageSize] | <code>number</code> | <code>100</code> | The maximum number of entries to return per page. |
| [options.pageToken] | <code>string</code> |  | Start pagination from this token/cursor. |
| [options.startRevision] | <code>string</code> |  | The revision to start from. |
| [options.fields] | <code>string</code> | <code>&quot;&#x27;all&#x27;&quot;</code> | The comma-separated list of fields ids to include in the response |


* * *

### HttpState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

### RequestOptions

Options provided to the HTTP request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> \| <code>string</code> | body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request). |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |


* * *

