## Functions

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

The following functions are exported from the common adaptor:
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
    <a href="/adaptors/packages/common-docs#datefns">dateFns()</a>
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

## create

create(resourceType, resource, params, callback) ⇒ <code>Operation</code>

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
**Example** *(Create a new patient)*  
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

## createTransactionBundle

createTransactionBundle(entries, callback) ⇒ <code>Operation</code>

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

## get

get(path, params, options, callback) ⇒ <code>Operation</code>

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
**Example** *(Get a Patient resource by id)*  
```js
get('Patient/0bd0038b-8aad-4719-8d55-ff94bd3de5d0');
```
**Example** *(Get a resource with query parameters)*  
```js
get("Claim", { _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 })
```

* * *

## getClaim

getClaim(claimId, params, callback) ⇒ <code>Operation</code>

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

## GetOptions

GetOptions : <code>Object</code>

Options provided to a GET HTTP request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| headers | <code>object</code> | Object of headers to append to the request |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |


* * *

## post

post(path, data, options, callback) ⇒ <code>Operation</code>

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
**Example** *(Create bundle)*  
```js
post("Bundle",{
  "resourceType": "Bundle"
})
```

* * *

## request

request ⇒ <code>Operation</code>

Send a generic HTTP request to the baseURL defined in config


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The HTTP method to be used for the request. It defaults to 'GET' if not |
| path | <code>string</code> | The resource path that the request is being made to |
| [options] | [<code>RequestOptions</code>](#requestoptions) | An object containing any additional parameters to be sent with the request, such as query parameters or request body data. |
| callback | <code>function</code> | (Optional) callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the FHIR HTTP server (with the body removed) |
| references | an array of all the previous data values |

* * *

## RequestOptions

RequestOptions : <code>Object</code>

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

