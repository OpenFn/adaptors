<dl>
<dt>
    <a href="#create">create(resourceType, data, [callback])</a></dt>
<dt>
    <a href="#get">get(path, query, [callback])</a></dt>
<dt>
    <a href="#getencounter">getEncounter(uuid, [callback])</a></dt>
<dt>
    <a href="#getencounters">getEncounters(query, [callback])</a></dt>
<dt>
    <a href="#getpatient">getPatient(uuid, [callback])</a></dt>
<dt>
    <a href="#post">post(path, data, [callback])</a></dt>
<dt>
    <a href="#searchpatient">searchPatient(query, [callback])</a></dt>
<dt>
    <a href="#searchperson">searchPerson(query, [callback])</a></dt>
<dt>
    <a href="#update">update(resourceType, path, data, [callback])</a></dt>
<dt>
    <a href="#upsert">upsert(resourceType, query, data, [callback])</a></dt>
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
</dt></dl>

## Functions
### create

<p><code>create(resourceType, data, [callback]) ⇒ Operation</code></p>

Create a record


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | Type of resource to create. E.g. `person`, `patient`, `encounter`, ... |
| data | <code>OpenMRSData</code> | Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, `data` must be a javascript object, and to create multiple instances of a resources, `data` must be an array of javascript objects. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example:** Create a person
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
**Example:** Create an encounter
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
**Example:** Create a patient
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

* * *

### get

<p><code>get(path, query, [callback]) ⇒ Operation</code></p>

Make a get request to any OpenMRS REST endpoint.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (excluding /ws/rest/v1/) |
| query | <code>object</code> | parameters for the request |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**
```js
get("patient", {
  q: "Patient",
  limit: 1,
});
```

* * *

### getEncounter

<p><code>getEncounter(uuid, [callback]) ⇒ Operation</code></p>

Gets encounter matching a uuid


| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>object</code> | A uuid for the encounter |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**
```js
getEncounter("123")
```

* * *

### getEncounters

<p><code>getEncounters(query, [callback]) ⇒ Operation</code></p>

Gets encounters matching params


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | Object for the patient |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**
```js
getEncounters({ patient: "123", fromdate: "2023-05-18" })
```

* * *

### getPatient

<p><code>getPatient(uuid, [callback]) ⇒ Operation</code></p>

Gets patient matching a uuid


| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | A uuid for the patient |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example:** Get a patient by uuid
```js
getPatient('681f8785-c9ca-4dc8-a091-7b869316ff93')
```

* * *

### post

<p><code>post(path, data, [callback]) ⇒ Operation</code></p>

Make a post request to any OpenMRS rest endpoint


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (excluding /ws/rest/v1/) |
| data | <code>object</code> | Object which defines data that will be used to create a given instance of resource |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**
```js
post(
  "idgen/identifiersource/8549f706-7e85-4c1d-9424-217d50a2988b/identifier",
  {}
);
```

* * *

### searchPatient

<p><code>searchPatient(query, [callback]) ⇒ Operation</code></p>

Fetch all non-retired patients that match any specified parameters


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | Object with query for the patient. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**
```js
searchPatient({ q: "Sarah"})
```

* * *

### searchPerson

<p><code>searchPerson(query, [callback]) ⇒ Operation</code></p>

Fetch all non-retired persons that match any specified parameters


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | object with query for the person |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**
```js
searchPerson({ q: "Sarah" })
```

* * *

### update

<p><code>update(resourceType, path, data, [callback]) ⇒ Operation</code></p>

Update data. A generic helper function to update a resource object of any type.
Updating an object requires to send `all required fields` or the `full body`


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of resource to be updated. E.g. `person`, `patient`, etc. |
| path | <code>string</code> | The `id` or `path` to the `object` to be updated. E.g. `e739808f-f166-42ae-aaf3-8b3e8fa13fda` or `e739808f-f166-42ae-aaf3-8b3e8fa13fda/{collection-name}/{object-id}` |
| data | <code>Object</code> | Data to update. It requires to send `all required fields` or the `full body`. If you want `partial updates`, use `patch` operation. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example:** a person
```js
update("person", '3cad37ad-984d-4c65-a019-3eb120c9c373',{"gender":"M","birthdate":"1997-01-13"})
```

* * *

### upsert

<p><code>upsert(resourceType, query, data, [callback]) ⇒ Operation</code></p>

Upsert a record. A generic helper function used to atomically either insert a row, or on the basis of the row already existing, UPDATE that existing row instead.

**Throws**:

- <code>RangeError</code> - Throws range error


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of a resource to `upsert`. E.g. `trackedEntityInstances` |
| query | <code>Object</code> | A query object that allows to uniquely identify the resource to update. If no matches found, then the resource will be created. |
| data | <code>Object</code> | The data to use for update or create depending on the result of the query. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example:** For an existing patient using upsert
```js
upsert('patient', { q: '10007JJ' }, { person: { age: 50 } });
```
**Example:** For non existing patient creating a patient record using upsert 
```js
upsert(
  "patient",
  { q: "1000EHE" },
  {
    identifiers: [
      {
        identifier: "1000EHE",
        identifierType: "05a29f94-c0ed-11e2-94be-8c13b969e334",
        location: "44c3efb0-2583-4c80-a79e-1f756a03c0a1",
        preferred: true,
      },
    ],
    person: {
      gender: "M",
      age: 42,
    },
  }
);
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
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | An object containing query params and headers for the request |

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
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | An object containing query params and headers for the request |

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

* * *


### http.post {#http_post}

<p><code>post(path, data, [options]) ⇒ operation</code></p>

Make a POST request to an OpenMRS endpoint


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to resource |
| data | <code>any</code> |  | the payload |
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | An object containing query params and headers for the request |

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
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | An object containing query, headers, and body for the request |

**Example:** GET request with a URL query
```js
http.request("GET",
  "/ws/rest/v1/patient/d3f7e1a8-0114-4de6-914b-41a11fc8a1a8", {
   query:{ 
      limit: 1, 
      offset: 20 
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

### RequestOptions

Options object

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>object</code> |  | An object of query parameters to be encoded into the URL |
| headers | <code>object</code> |  | An object of all request headers |
| body | <code>object</code> |  | The request body (as JSON) |
| [parseAs] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | The response format to parse (e.g., 'json', 'text', or 'stream') |


* * *

