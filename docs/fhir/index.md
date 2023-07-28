## Functions

<dl>
<dt>
    <a href="#create">create(path, params, callback)</a></dt>
<dt>
    <a href="#createTransactionBundle">createTransactionBundle(params, callback)</a></dt>
<dt>
    <a href="#get">get(path, query, callback)</a></dt>
<dt>
    <a href="#getClaim">getClaim(claimId, query, callback)</a></dt>
</dl>

## create

create(path, params, callback) ⇒ <code>Operation</code>
Creates a resource in a destination system using a POST request

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>object</code> | data to create the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
create("Bundle", {...state.data: type: "collection"})
```

* * *

## createTransactionBundle

createTransactionBundle(params, callback) ⇒ <code>Operation</code>
Creates a transactionBundle for HAPI FHIR

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to create the new transaction |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
createTransactionBundle({
  resourceType: "Bundle",
  type: "transaction",
  entry: [
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
  ],
});
```

* * *

## get

get(path, query, callback) ⇒ <code>Operation</code>
Get a resource in a FHIR system

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| query | <code>object</code> | data to get the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example** *(Get Claim from FHIR with optional query)*  
```js
get("Claim", { _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 })
```
**Example** *(Get Patient from FHIR)*  
```js
get('Patient');
```

* * *

## getClaim

getClaim(claimId, query, callback) ⇒ <code>Operation</code>
Get Claim in a FHIR system

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| claimId | <code>string</code> | (optional) claim id |
| query | <code>object</code> | (optinal) query parameters |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
getClaim({ _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 });
```

* * *

## request

request ⇒
This is an asynchronous function that sends a request to a specified URL with optional parameters
and headers, and returns the response data in JSON format.

**Kind**: global constant  
**Returns**: The `request` function is returning the parsed JSON data from the response of the HTTP
request made to the specified `url` with the given `params` and `method`. If there is an error in
the response, the function will throw an error.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The URL of the API endpoint that the request is being made to. |
| [params] | <code>object</code> |  | An object containing any additional parameters to be sent with the request, such as query parameters or request body data. It is an optional parameter and defaults to an empty object if not provided. |
| [method] | <code>string</code> | <code>&quot;GET&quot;</code> | The HTTP method to be used for the request. It defaults to 'GET' if not specified. |


* * *

