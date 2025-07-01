<dl>
<dt>
    <a href="#create">create(path, data)</a></dt>
<dt>
    <a href="#destroy">destroy(path, [options])</a></dt>
<dt>
    <a href="#get">get(path, [options])</a></dt>
<dt>
    <a href="#update">update(path, data)</a></dt>
<dt>
    <a href="#upsert">upsert(path, data, params)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_delete">http.delete(path, [options])</a>
</dt>

<dt>
    <a href="#http_get">http.get(path, [options])</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, data, [options])</a>
</dt>

<dt>
    <a href="#http_request">http.request(method, path, [options])</a>
</dt>

<dt>
    <a href="#fhir_get">fhir.get(path, query, [callback])</a>
</dt>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>

## Functions
### create

<p><code>create(path, data) ⇒ Operation</code></p>

Create a resource. For a list of valid resources, see [OpenMRS Docs](https://rest.openmrs.org/)


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (excluding `/ws/rest/v1/`) |
| data | <code>object</code> | Resource definition |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The newly created resource, as returned by OpenMRS |

**Example:** Create a person (<a href="https://rest.openmrs.org/#create-a-person">see OpenMRS API</a>)
```js
create("person", {
  names: [
    {
      givenName: "Mohit",
      familyName: "Kumar",
    },
  ],
  gender: "M",
  birthdate: "1997-09-02",
  addresses: [
    {
      address1: "30, Vivekananda Layout, Munnekolal,Marathahalli",
      cityVillage: "Bengaluru",
      country: "India",
      postalCode: "560037",
    },
  ],
});
```
**Example:** Create an encounter (<a href="https://rest.openmrs.org/#create-an-encounter">see OpenMRS API</a>)
```js
create("encounter", {
  encounterDatetime: '2023-05-25T06:08:25.000+0000',
  patient: '1fdaa696-e759-4a7d-a066-f1ae557c151b',
  encounterType: 'dd528487-82a5-4082-9c72-ed246bd49591',
  location: 'ba685651-ed3b-4e63-9b35-78893060758a',
  encounterProviders: [],
  visit: {
    patient: '1fdaa696-e759-4a7d-a066-f1ae557c151b',
    visitType: '7b0f5697-27e3-40c4-8bae-f4049abfb4ed',
    startDatetime: '2023-05-25T06:08:25.000+0000',
    stopDatetime: '2023-05-25T06:09:25.000+0000',
  },
})
```
**Example:** Create a patient (<a href="https://rest.openmrs.org/#create-a-patient">see OpenMRS API</a>)
```js
create("patient", {
  identifiers: [
    {
      identifier: '4023287',
      identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334',
      preferred: true,
    },
  ],
  person: {
    gender: 'M',
    age: 42,
    birthdate: '1970-01-01T00:00:00.000+0100',
    birthdateEstimated: false,
    names: [
      {
        givenName: 'Doe',
        familyName: 'John',
      },
    ],
  },
})
  
```
**Example:** Create a patientIdentifier subresource (<a href="https://rest.openmrs.org/#create-a-patientidentifier-sub-resource-with-properties">see OpenMRS API</a>)
```js
create("patient/b52ec6f9-0e26-424c-a4a1-c64f9d571eb3/identifier", { 
 "identifier" : "111:CLINIC1",
 "identifierType" : "a5d38e09-efcb-4d91-a526-50ce1ba5011a",
 "location" : "8d6c993e-c2cc-11de-8d13-0010c6dffd0f",
 "preferred" : true
})
}
```

* * *

### destroy

<p><code>destroy(path, [options]) ⇒ Operation</code></p>

Delete a resource. Must include a UUID in the path.
Throws an error if the resource does not exist.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | Path to resource (excluding `/ws/rest/v1/`) |
| [options] | <code>object</code> | <code>{}</code> |  |
| [options.purge] | <code>object</code> | <code>false</code> | The resource will be voided/retired unless true |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response from OpenMRS |

**Example:** Void a patient
```js
destroy("patient/12346");
```
**Example:** Purge a patient
```js
destroy("patient/12346", {
  purge: true
});
```

* * *

### get

<p><code>get(path, [options]) ⇒ Operation</code></p>

Fetch resources from OpenMRS. Use this to fetch a single resource,
or to search a list.

Options will be appended as query parameters to the request URL,
refer to [OpenMRS Docs](https://rest.openmrs.org/) for details.

Pagination is handled automatically by default (maximum 10k items). Set `max`
to paginate with a higher limit, or pass `limit` to force a single request, as
per the OpenMRS Rest API.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | Path to resource (excluding `/ws/rest/v1/`) |
| [options] | [<code>GetOptions</code>](#getoptions) | <code>{}</code> | Query parameters and other options for the request. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | An array of result objects |

**Example:** List all concepts (up to a maximum of 10k items, with pagination)
```js
get("concept")
```
**Example:** List all concepts (with pagination)
```js
get("concept", { query: "brian", max: Infinity })
```
**Example:** Search up to 100 patients by name (allowing pagination) (<a href="https://rest.openmrs.org/#search-patients">see OpenMRS API</a>)
```js
get("patient", { query: "brian", max: 100 })
```
**Example:** Fetch patient by UUID (returns an array of 1 item)
```js
get("patient/abc")
```
**Example:** Fetch patient by UUID (returns an object of patient data)
```js
get("patient/abc", { singleton: true })
```
**Example:** Search up to 10 patients by name (in a single request without pagination) (<a href="https://rest.openmrs.org/#search-patients">see OpenMRS API</a>)
```js
get("patient", { query: "brian", limit: 10 })
```
**Example:** List allergy subresources
```js
get("patient/abc/allergy")
```
**Example:** Get allergy subresource by its UUID and parent patient UUID
```js
get("patient/abc/allergy/xyz")
```

* * *

### update

<p><code>update(path, data) ⇒ Operation</code></p>

Update a resource. Only properties included in the data will be affected.
For a list of valid resources and for update rules, see the Update sections
of the [OpenMRS Docs](https://rest.openmrs.org/)


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (excluding `/ws/rest/v1/`) |
| data | <code>Object</code> | Resource properties to update |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The full updated resource, as returned by OpenMRS |

**Example:** Update a person (<a href="https://rest.openmrs.org/#create-a-person">see OpenMRS API</a>)
```js
update('person/3cad37ad-984d-4c65-a019-3eb120c9c373', {
  'gender': 'M',
  'birthdate':'1997-01-13'
})
```

* * *

### upsert

<p><code>upsert(path, data, params) ⇒ Operation</code></p>

Update a resource if it already exists, or otherwise create a new one.

Upsert will first make a request for the target item (using the `path` and `params`) to see if it exists, and then issue a second create or update request.
If the query request returns multiple items, the upsert will throw an error.

Params will be appended as query parameters to the request URL,
refer to [OpenMRS Docs](https://rest.openmrs.org/) for details.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (excluding `/ws/rest/v1/`) |
| data | <code>Object</code> | The resource data |
| params | <code>Object</code> | Query parameters to append to the initial query |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The created/updated resource, as returned by OpenMRS |

**Example:** Upsert a patient (<a href="https://rest.openmrs.org/#patients-overview">see OpenMRS API</a>)
```js
upsert("patient/a5d38e09-efcb-4d91-a526-50ce1ba5011a", {
  identifiers: [
    {
      identifier: '4023287',
      identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334',
      preferred: true,
    },
  ],
  person: {
    gender: 'M',
    age: 42,
    birthdate: '1970-01-01T00:00:00.000+0100',
    birthdateEstimated: false,
    names: [
      {
        givenName: 'Doe',
        familyName: 'John',
      },
    ],
  },
})
```
**Example:** Upsert a patient using a query to identify the record
```js
upsert("patient", $.data, { q: "Lamine Yamal", limit: 1 })
```

* * *


## http

These functions belong to the http namespace.
### http.delete {#http_delete}

<p><code>delete(path, [options]) ⇒ operation</code></p>

Make a DELETE request to an OpenMRS endpoint


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to resource |
| [options] | [<code>HTTPRequestOptions</code>](#httprequestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the OpenMRS server (excluding the body) |
| references | An array containing all previous data objects |

**Example:** Delete a resource
```js
http.delete(
 "/ws/rest/v1/patient/abc/"
)
```

* * *


### http.get {#http_get}

<p><code>get(path, [options]) ⇒ operation</code></p>

Make a GET request to any OpenMRS endpoint.
Unlike the main `get()`, this does not append anything to the path you provide.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to resource |
| [options] | [<code>HTTPRequestOptions</code>](#httprequestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the OpenMRS server (excluding the body) |
| references | An array containing all previous data objects |

**Example:** GET a resource with a query
```js
http.get(
 "/ws/rest/v1/patient",
 {
   query: {
     limit: 1
   }
 }
)
```
**Example:** Don't throw if OpenMRS returns a 404 error code
```js
http.get(
 "/ws/rest/v1/patient",
 {
   errors: { 404: false }
 }
)
```

* * *


### http.post {#http_post}

<p><code>post(path, data, [options]) ⇒ operation</code></p>

Make a POST request to an OpenMRS endpoint


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to resource |
| data | <code>any</code> |  | the payload |
| [options] | [<code>HTTPRequestOptions</code>](#httprequestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the OpenMRS server (excluding the body) |
| references | An array containing all previous data objects |

**Example:** Post with a JSON payload
```js
http.post(
 "/ws/rest/v1/patient",
 {
     "person": {
     "gender":"M",
     "age":47,
     "birthdate":"1970-01-01T00:00:00.000+0100",
     "names":[
       {
         "givenName":"Jon",
         "familyName":"Snow"
       }
     ],
   }
   }
)
```

* * *


### http.request {#http_request}

<p><code>request(method, path, [options]) ⇒ Operation</code></p>

Make a HTTP request to any OpenMRS endpoint


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| method | <code>string</code> |  | HTTP method to use |
| path | <code>string</code> |  | Path to resource |
| [options] | [<code>HTTPRequestOptions</code>](#httprequestoptions) | <code>{}</code> | An object containing query, headers, and body for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the OpenMRS server (excluding the body) |
| references | An array containing all previous data objects |

**Example:** GET request with a query parameters
```js
http.request("GET",
  "/ws/rest/v1/patient/d3f7e1a8-0114-4de6-914b-41a11fc8a1a8", {
   query:{
      limit: 1,
      startIndex: 20
   },
});
```

* * *


## fhir

These functions belong to the fhir namespace.
### fhir.get {#fhir_get}

<p><code>get(path, query, [callback]) ⇒ Operation</code></p>

Make a get request to any FHIR endpoint in OpenMRS


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| query | [<code>FhirParameters</code>](#fhirparameters) | Request parameters |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the OpenMRS server (excluding the body) |
| references | An array containing all previous data objects |

**Example:** Get encounters based on lastUpdated field
```js
fhir.get('Encounter', { count: 100, lastUpdated: 'ge2024-01-01T00:00:00Z' })
```

* * *


##  Interfaces

### FhirParameters

OpenMRS FHIR requests parameters options.
This combines [ FHIR search parameters](https://fhir.openmrs.org/artifacts.html), [resource-specific parameters](https://www.hl7.org/fhir/R4/search.html), and pagination options.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| count | <code>string</code> | Number of results to return (_count in FHIR) |
| include | <code>string</code> | Resources to include in the response (_include in FHIR) |
| revinclude | <code>string</code> | Reverse includes to include in the response (_revinclude in FHIR) |
| summary | <code>string</code> | Summary mode for the response (_summary in FHIR) |
| total | <code>string</code> | Whether to include a total count of matching resources (_total in FHIR) |
| elements | <code>string</code> | List of elements to include in the response (_elements in FHIR) |
| contained | <code>string</code> | Whether to include contained resources (_contained in FHIR) |
| containedType | <code>string</code> | Type of contained resources (_containedType in FHIR) |
| id | <code>string</code> | Logical ID of the resource to filter on (_id in FHIR) |
| lastUpdated | <code>string</code> | Timestamp to filter resources last updated after this date (_lastUpdated in FHIR) |
| tag | <code>string</code> | Tag to filter resources by (_tag in FHIR) |
| profile | <code>string</code> | Profile URL to filter resources by (_profile in FHIR) |
| security | <code>string</code> | Security labels to filter resources by (_security in FHIR) |
| text | <code>string</code> | Text search on narrative content (_text in FHIR) |
| content | <code>string</code> | Full-text search on resource content (_content in FHIR) |
| list | <code>string</code> | Search resources included in a particular list (_list in FHIR) |
| has | <code>string</code> | Perform search based on reference chains (_has in FHIR) |
| getPagesOffset | <code>string</code> | Offset for pagination, used to skip a number of results (_getpagesoffset in OpenMRS) |
| getPages | <code>string</code> | Get specific pages of resources (_getpages in OpenMRS) |
| bundleType | <code>string</code> | Type of bundle to return (e.g., searchset, batch, history) (_bundleType in FHIR) |


* * *

### GetOptions

Options to append to the request. Unless otherwise specified, options are appended to the URL as query parameters - see the [OpenMRS Docs](https://rest.openmrs.org/) for all supported parameters.


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [query] | <code>string</code> |  | (OpenFn only) Query string. Maps to `q` in OpenMRS. |
| [max] | <code>number</code> | <code>10000</code> | (OpenFn only) Restrict the maximum number of retrieved records. May be fetched in several pages. Not used if `limit` is set. |
| [pageSize] | <code>number</code> | <code>1000</code> | (OpenFn only) Limits the size of each page of data. Not used if limit is set. |
| [singleton] | <code>boolean</code> |  | (OpenFn only) If set to true, only the first result will be returned. Useful for "get by id" APIs. |


* * *

### HTTPRequestOptions

Options object


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>object</code> |  | An object of query parameters to be encoded into the URL |
| headers | <code>object</code> |  | An object of all request headers |
| body | <code>object</code> |  | The request body (as JSON) |
| errors | <code>object</code> \| <code>boolean</code> |  | Pass `false` to not throw on errors. Pass a map of errorCodes: error messages, ie, `{ 404: 'Resource not found' }`, or `false` to suppress errors for a specific code. |
| [parseAs] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | The response format to parse (e.g., 'json', 'text', or 'stream') |


* * *

