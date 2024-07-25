<dl>
<dt>
    <a href="#create">create(resourceType, resource, params, callback)</a></dt>
<dt>
    <a href="#createtransactionbundle">createTransactionBundle(entries, callback)</a></dt>
<dt>
    <a href="#get">get(path, params, options, callback)</a></dt>
<dt>
    <a href="#getclaim">getClaim(claimId, params, callback)</a></dt>
<dt>
    <a href="#post">post(path, data, options, callback)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### create

<p><code>create(resourceType, resource, params, callback) ⇒ Operation</code></p>

Creates a new resource with a server assigned resourceType.
The resource object doesn't need resourceType or id


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The resource type to create |
| resource | <code>object</code> | The resource to create |
| params | <code>object</code> | (Optional) FHIR parameters to control and configure resource creation |
| callback | <code>function</code> | (Optional) callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the FHIR HTTP server (with the body removed) |
| references | an array of all the previous data values |
**Example:** Create a new patient
```js
create('Patient', {
  name: [
    {
      use: 'official',
      family: 'La Paradisio',
      given: ['Josephine', 'Nessa'],
    },
  ],
});
```

* * *

### createTransactionBundle

<p><code>createTransactionBundle(entries, callback) ⇒ Operation</code></p>

Create a transaction bundle to process multiple requests at once


| Param | Type | Description |
| --- | --- | --- |
| entries | <code>array</code> | array of transactions |
| callback | <code>function</code> | (Optional) callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the FHIR HTTP server (with the body removed) |
| references | an array of all the previous data values |
**Example**
```js
createTransactionBundle([
  {
    fullUrl: "https://hapi.fhir.org/baseR4/Patient/592442",
    resource: {
      resourceType: "Patient",
      id: "592442",
      name: [{ given: "Caleb", family: "Cushing" }],
    },
    request: {
      method: "POST",
      url: "Patient",
    },
  },
]);
```

* * *

### get

<p><code>get(path, params, options, callback) ⇒ Operation</code></p>

Send a HTTP GET request to the baseURL defined in config


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>object</code> | (Optional) Parameters to encode into the URL query |
| options | [<code>GetOptions</code>](#getoptions) | (Optional) Options to control the request |
| callback | <code>function</code> | (Optional) callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the FHIR HTTP server (with the body removed) |
| references | an array of all the previous data values |
**Example:** Get a Patient resource by id
```js
get('Patient/0bd0038b-8aad-4719-8d55-ff94bd3de5d0');
```
**Example:** Get a resource with query parameters
```js
get("Claim", { _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 })
```

* * *

### getClaim

<p><code>getClaim(claimId, params, callback) ⇒ Operation</code></p>

Get Claim in a FHIR system


| Param | Type | Description |
| --- | --- | --- |
| claimId | <code>string</code> | claim id |
| params | <code>object</code> | query parameters |
| callback | <code>function</code> | callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the FHIR HTTP server (with the body removed) |
| references | an array of all the previous data values |
**Example**
```js
getClaim('',{ _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 });
```

* * *

### post

<p><code>post(path, data, options, callback) ⇒ Operation</code></p>

Send a HTTP POST request to the baseURL defined in config


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | JSON data to append to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | (Optional) Additional options for the request |
| callback | <code>function</code> | (Optional) callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the FHIR HTTP server (with the body removed) |
| references | an array of all the previous data values |
**Example:** Create bundle
```js
post("Bundle",{
  "resourceType": "Bundle"
})
```

* * *


##  Interfaces

### GetOptions

Options provided to a GET HTTP request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |


* * *

### RequestOptions

Options provided to a HTTP request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| headers | <code>object</code> | Object of headers to append to the request |
| body | <code>object</code> | JSON payload to attach to the request |
| query | <code>object</code> | Query parameters for the request. Will be encoded into the URL |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |


* * *

