<dl>
<dt>
    <a href="#get">get(path, params, callback)</a></dt>
<dt>
    <a href="#patch">patch(path, data, params, [callback])</a></dt>
<dt>
    <a href="#post">post(path, data, params, [callback])</a></dt>
<dt>
    <a href="#put">put(path, data, params, [callback])</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#arraytostring">arrayToString()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
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
    <a href="/adaptors/packages/common-docs#http">http</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### get

<p><code>get(path, params, callback) ⇒ Operation</code></p>

Make a GET request to Satusehat. Use this to fetch resources directly from the Satusehat REST API.
You can pass Satusehat query parameters as an object of key value pairs, which will map to parameters
in the URL.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>object</code> | Optional object of query parameters to include in the request |
| callback | <code>function</code> | An optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Satusehat server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Get a resource by Id. Equivalent to GET `<baseUrl>/Organization/abcde`
```js
get("Organization/abcde")
```
**Example:** Get resources with a query. Equivalent to GET `<baseUrl>/Patient?identifier=https://fhir.kemkes.go.id/id/nik|9271060312000001`
```js
get('/Patient', {
  identifier:'https://fhir.kemkes.go.id/id/nik|9271060312000001'
});
```

* * *

### patch

<p><code>patch(path, data, params, [callback]) ⇒ Operation</code></p>

Make a PATCH request to Satusehat. Use this to directly update resources on Satusehat REST API.
You can pass Satusehat an array of objects which contains `op`, `path`, and `value` as the body. You can also pass Satusehat query parameters as an object of key value pairs, which will map to parameters
in the URL.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource and exact item to be partially updated |
| data | <code>Array</code> | An array of objects which defines data that will be used to partially update a given instance of resource |
| params | <code>Object</code> | Optional object of query parameters to include in the request. |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Satusehat server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Update a property of a resource. Equivalent to PATCH `<baseurl>/Organization/abcde`
```js
patch('Organization/abcde', [
{
 op: 'replace',
 path: '/language', // Name of property/element of resource to be replaced
 value: 'id', // Value to be replaced
},
]);
```

* * *

### post

<p><code>post(path, data, params, [callback]) ⇒ Operation</code></p>

Make a POST request to Satusehat. Use this to send resources directly to Satusehat REST API.
You can pass Satusehat body data as a JSON FHIR object.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | JSON FHIR object to create a resource |
| params | <code>Object</code> | Optional object of query parameters to include in the request |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Satusehat server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Create an encounter resource. Equivalent to POST `<baseUrl>/Encounter`
```js
post('Encounter', { resourceType: 'Encounter', ...state.data });
```

* * *

### put

<p><code>put(path, data, params, [callback]) ⇒ Operation</code></p>

Make a PUT request to Satusehat. Use this to directly update resources on Satusehat REST API.
You can pass Satusehat body data as a JSON FHIR object. You can also pass Satusehat query parameters as an object of key value pairs, which will map to parameters
in the URL.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource and exact item to be updated |
| data | <code>object</code> | JSON FHIR object to update the resource |
| params | <code>Object</code> | Optional object of query parameters to include in the request |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Satusehat server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Update a resource. Equivalent to PUT `<baseurl>/Organization/abcde`
```js
put('Organization/abcde', { resourceType: 'Organization', active: false });
```

* * *


