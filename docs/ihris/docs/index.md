
This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#fhir_get">fhir.get(path, query)</a>
</dt>

<dt>
    <a href="#http_get">http.get(resource, options)</a>
</dt>

<dt>
    <a href="#http_post">http.post(resource, body, options)</a>
</dt>

<dt>
    <a href="#http_put">http.put(resource, body, options)</a>
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


## fhir

These functions belong to the fhir namespace.
### fhir.get {#fhir_get}

<p><code>get(path, query) ⇒ Operation</code></p>

Make a get request to any FHIR endpoint in iHRIS


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| query | [<code>FhirParameters</code>](#fhirparameters) | Request parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the FHIR server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Get encounters based on lastUpdated field
```js
fhir.get('Encounter', { count: 100, lastUpdated: 'ge2024-01-01T00:00:00Z' })
```
**Example:** Get all active practitioner roles for a location
```js
fhir.get('PractitionerRole', {
  count: 500,
  active: true,
  location: 1234,
  include: 'PractitionerRole:practitioner',
})
```

* * *


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(resource, options) ⇒ Operation</code></p>

Get a FHIR resource by ID or list all resources of a type


| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | FHIR resource type |
| options | <code>object</code> | Options including headers and query parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** List all practitioners
```js
http.get('/fhir/Practitioner');
```
**Example:**  List a specific practitioner by ID
```js
http.get('/fhir/Practitioner/P10004');
```
**Example:** Get active practitioners, limit to 1 result
```js
http.get('/fhir/Practitioner', {
  query: {
    active: true,
    _count: 1,
  },
});
```

* * *


### http.post {#http_post}

<p><code>post(resource, body, options) ⇒ Operation</code></p>

Create a new FHIR resource


| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | FHIR resource type |
| body | <code>object</code> | FHIR resource data |
| options | <code>object</code> | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create a new Practitioner resource
```js
 http.post('/fhir/Practitioner',  {
   "resourceType": "Practitioner",
   "meta": {
     "versionId": "1",
     "lastUpdated": "2024-08-06T06:13:10.163+00:00",
     "source": "#m5UGgxqUFEI7qIRF",
     "profile": [
       "http://ihris.org/fhir/StructureDefinition/ihris-practitioner"
     ]
   },
   "extension": [
   // ... extension data
   ],
   "active": true,
   "name": [
     {
       "use": "official",
       "text": "Tekiokion Traifrop",
       "family": "Traifrop",
       "given": [
         "Tekiokion"
       ]
     }
   ],
   "gender": "male",
   "birthDate": "1979-01-01",
   "qualification": [
     {
       "code": {
         "coding": [
           {
             "system": "http://terminology.hl7.org/CodeSystem/v2-0360|2.7",
             "code": "BA"
           }
         ],
         "text": "Bachelor of Arts"
       }
     }
   ]
 });
```

* * *


### http.put {#http_put}

<p><code>put(resource, body, options) ⇒ Operation</code></p>

Update an existing FHIR resource


| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | Path to FHIR resource |
| body | <code>object</code> | Updated FHIR resource data |
| options | <code>object</code> | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Update a Practitioner resource
```js
http.put('/fhir/Practitioner/6462', {
  resourceType: 'Practitioner',
  id: '6462',
  meta: {
    versionId: '1',
    lastUpdated: '2025-11-03T07:06:59.309+00:00',
    source: '#m5UGgxqUFEI7qIRF',
    profile: ['http://ihris.org/fhir/StructureDefinition/ihris-practitioner'],
  },
  extension: [
    {
      url: 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-nationality',
      valueCoding: {
        system: 'urn:iso:std:iso:3166',
        code: 'TF',
      },
    },
    {
      url: 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-residence',
      valueReference: {
        reference: 'Location/TF.W.GAS',
      },
    },
    {
      url: 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-marital-status',
      valueCoding: {
        system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
        code: 'S',
      },
    },
  ],
  active: true,
  name: [
    {
      use: 'official',
      text: 'Tekiokionses Traifrop',
      family: 'Traifrop',
      given: ['Tekiokionses'],
    },
  ],
  gender: 'male',
  birthDate: '1979-01-01',
  qualification: [
    {
      code: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0360|2.7',
            code: 'BA',
          },
        ],
        text: 'Bachelor of Arts',
      },
    },
  ],
});
```

* * *


### http.request {#http_request}

<p><code>request(method, path, body, options) ⇒ Operation</code></p>

Make a general HTTP request to iHRIS


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

**Example:** Make a GET request with query parameters
```js
http.request(
  'GET',
  '/fhir/Practitioner',
  {},
  {
    query: { active: 'true', _count: '10' },
  }
);
```

* * *


##  Interfaces

### FhirParameters

iHRIS FHIR requests parameters options.
This combines [ FHIR search parameters](https://fhir.openmrs.org/artifacts.html), [resource-specific parameters](https://www.hl7.org/fhir/R4/search.html), and pagination options.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| count | <code>string</code> | Number of results to return (_count in FHIR) |
| sort | <code>string</code> | Sorting criteria for the results (_sort in FHIR) |
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
| getPagesOffset | <code>string</code> | Offset for pagination, used to skip a number of results (_getpagesoffset in iHRIS) |
| getPages | <code>string</code> | Get specific pages of resources (_getpages in iHRIS) |
| bundleType | <code>string</code> | Type of bundle to return (e.g., searchset, batch, history) (_bundleType in FHIR) |


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
| body | <code>object</code> | body data to append to the request. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |


* * *

