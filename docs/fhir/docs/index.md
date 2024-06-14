## Functions

<dl>
<dt>
    <a href="#create">create(path, data, callback)</a></dt>
<dt>
    <a href="#createtransactionbundle">createTransactionBundle(params, callback)</a></dt>
<dt>
    <a href="#get">get(path, query, callback)</a></dt>
<dt>
    <a href="#getclaim">getClaim(claimId, query, callback)</a></dt>
<dt>
    <a href="#post">post(path, data, params, callback)</a></dt>
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

create(path, data, callback) ⇒ <code>Operation</code>

Creates a resource in a destination system


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | data to create the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
create("Bundle", {
  entry: [
    {
      fullUrl: "", // Eg: Patient URL
      resource: {}, // Resource data
      search: {
        mode: "match",
      },
    },
  ],
  type: "collection",
});
```

* * *

## createTransactionBundle

createTransactionBundle(params, callback) ⇒ <code>Operation</code>

Creates a transactionBundle for HAPI FHIR


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

## post

post(path, data, params, callback) ⇒ <code>Operation</code>

Sends a HTTP POST request  to the destination system


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object or JSON which defines data that will be used to create a given resource |
| params | [<code>RequestParams</code>](#requestparams) | Contains optional headers, parseAs, and throwOnError |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
post("Bundle",{
"resourceType": "Bundle"
})
```

* * *

## request

request ⇒ <code>Object</code>

This is an asynchronous function that sends a request to a specified URL with optional parameters
and headers, and returns the response data in JSON format.
If there is an error in the response, the function will throw an error unless `params.throwOnError` is false.

**Returns**: <code>Object</code> - The `request` function returns a  object, where the parsed JSON body
is written to `data`, and the raw http response to `response`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The URL of the API endpoint that the request is being made to. |
| [params] | <code>object</code> |  | An object containing any additional parameters to be sent with the request, such as query parameters or request body data. It is an optional parameter and defaults to an empty object if not provided. |
| [method] | <code>string</code> | <code>&quot;GET&quot;</code> | The HTTP method to be used for the request. It defaults to 'GET' if not specified. |


* * *

## RequestParams

RequestParams : <code>Object</code>

Options provided to a HTTP request

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [throwOnError] | <code>boolean</code> | <code>true</code> | Optional boolean value to throw if the error is status code 400. |
| headers | <code>object</code> |  | An optional object of headers to append to the request. |
| parseAs | <code>string</code> |  | An optional field of the data response format. |


* * *

