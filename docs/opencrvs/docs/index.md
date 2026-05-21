<dl>
<dt>
    <a href="#createbirthnotification">createBirthNotification(body)</a></dt>
<dt>
    <a href="#createdocumententry">createDocumentEntry(resource, [fullUrl])</a></dt>
<dt>
    <a href="#createevent">createEvent(type, options)</a></dt>
<dt>
    <a href="#getlocations">getLocations(options)</a></dt>
<dt>
    <a href="#notifyevent">notifyEvent(eventId, declaration, options)</a></dt>
<dt>
    <a href="#queryevents">queryEvents(variables, options)</a></dt>
<dt>
    <a href="#submitbirthnotification">submitBirthNotification(declaration, options)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_post">http.post(path, body, options)</a>
</dt>

<dt>
    <a href="#http_request">http.request(method, path, body, options)</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
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
    <a href="/adaptors/packages/common-docs#log">log()</a>
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
### createBirthNotification

~~<p><code>createBirthNotification(body) ⇒ Operation</code></p>
~~***for OpenCRVS v2 deployments — use [submitBirthNotification](#submitBirthNotification)
  (or [createEvent](#createEvent) + [notifyEvent](#notifyEvent)) instead. Retained for v1
  gateway-based deployments that still consume FHIR bundles.***


Create a Birth Notification. Pass an array of FHIR resources wrapped in entry
objects like `{ fullUrl, resource }`. References must use the full URL
of the corresponding resources. See [OpenCRVS Event Notification Postman documentation](https://github.com/opencrvs/opencrvs-countryconfig/blob/master/postman/Event%20Notification.postman_collection.json)


| Param | Type | Description |
| --- | --- | --- |
| body | <code>Array</code> | An array of Birth Notification bundle entries. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create a birth notification
```js
createBirthNotification($.bundleData)
```
**Example:** Cross-reference two bundle resources
```js
createBirthNotification([
  {
    fullUrl: 'urn:uuid:abcde',
    resource: {
      resourceType: 'Composition',
     section:[
           {
          title: "Mother's details",
          code: {
            coding: [
              {
                system: 'http://opencrvs.org/specs/sections',
                code: 'mother-details',
              },
            ],
            text: "Mother's details",
          },
          entry: [
            {
              reference: 'urn:uuid:wxyz',
            },
          ],
        }
         // ... other section details  
        ]
      
      // ... other resource details
    },
  },
  {
    fullUrl: 'urn:uuid:wxyz',
    resource: {
      resourceType: 'Patient',
      // ... other resource details
    },
  },
]);
```

* * *

### createDocumentEntry

<p><code>createDocumentEntry(resource, [fullUrl]) ⇒ Object</code></p>

Create a document bundle entry with automatic UUID generation

**Returns**: <code>Object</code> - Bundle entry with fullUrl and resource  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>Object</code> | A FHIR resource using builders from fhir-4 |
| [fullUrl] | <code>string</code> | Custom fullUrl. Auto-generated if not provided |


**Example**
```js
createDocumentEntry(builders.patient({ name: [{ given: ['John'] }] }))
```

* * *

### createEvent

<p><code>createEvent(type, options) ⇒ Operation</code></p>

Create an OpenCRVS v2 event (e.g. a birth or death registration).
Posts to the `register.<domain>` host. The returned event id is
available on `state.data.id` for use with `notifyEvent`.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Event type, e.g. `'birth'` or `'death'`. |
| options | <code>object</code> | Optional fields: `createdAtLocation` (string) and   `transactionId` (string, defaults to a random UUID). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create a birth event at a known location
```js
createEvent('birth', { createdAtLocation: 'a1b2-...' });
```

* * *

### getLocations

<p><code>getLocations(options) ⇒ Operation</code></p>

Fetch the list of locations from the `countryconfig.<domain>` host.
Useful for picking `createdAtLocation` or `child.birthLocation`.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Optional fields: `params` (object of query parameters   to append to the request). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getLocations();
```

* * *

### notifyEvent

<p><code>notifyEvent(eventId, declaration, options) ⇒ Operation</code></p>

Notify an existing OpenCRVS v2 event with declaration data.
Posts to `register.<domain>/api/events/events/{eventId}/notify`.


| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | The event id returned by [createEvent](#createEvent). |
| declaration | <code>object</code> | Flat dotted-key declaration (e.g. `'child.name'`, `'child.dob'`). |
| options | <code>object</code> | Optional fields: `createdAtLocation` (string),   `transactionId` (string, defaults to a random UUID) and `annotation` (object). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Notify a birth event
```js
notifyEvent($.id, {
  'child.name': { firstname: 'Test', surname: 'Baby' },
  'child.dob': '2026-05-01',
  'child.gender': 'female',
}, { createdAtLocation: $.locationId });
```

* * *

### queryEvents

<p><code>queryEvents(variables, options) ⇒ Operation</code></p>

Make an events search query against the OpenCRVS GraphQL API.


| Param | Type | Description |
| --- | --- | --- |
| variables | <code>Object</code> | GraphQL search parameters. For a full list of options, see [variables.advancedSearchParameters in OpenCRVS Docs](https://documentation.opencrvs.org/technology/interoperability/record-search-clients#record-search-requests) |
| options | <code>Object</code> | Options to control the request, such as `count` and `skip`. Count defaults to 10. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Search for events with specific parameters
```js
queryEvents(
  {
    event: 'birth',
    registrationStatuses: ['REGISTERED'],
    childGender: 'male',
    dateOfRegistrationEnd: '2022-12-31T23:59:59.999Z',
    dateOfRegistrationStart: '2021-11-01T00:00:00.000Z',
    declarationJurisdictionId: '',
    eventLocationId: '704b9706-d729-4834-8656-05b562065deb',
    fatherFirstNames: 'Dad',
    motherFirstNames: 'Mom',
  },
);
```
**Example:** Search for events with options
```js
queryEvents(
  {
    event: 'birth',
    registrationStatuses: ['REGISTERED'],
    childGender: 'male',
    dateOfRegistrationEnd: '2022-12-31T23:59:59.999Z',
    dateOfRegistrationStart: '2021-11-01T00:00:00.000Z',
    declarationJurisdictionId: '',
    eventLocationId: '704b9706-d729-4834-8656-05b562065deb',
    fatherFirstNames: 'Dad',
    motherFirstNames: 'Mom',
  },
  { count: 10, skip: 0 }
);
```

* * *

### submitBirthNotification

<p><code>submitBirthNotification(declaration, options) ⇒ Operation</code></p>

Convenience helper: create a v2 birth event and notify it in one step.
Mirrors the reference integration script's create-then-notify chain.
The notify response is left on `state.data`.


| Param | Type | Description |
| --- | --- | --- |
| declaration | <code>object</code> | Flat dotted-key declaration passed through to [notifyEvent](#notifyEvent). |
| options | <code>object</code> | Optional fields: `createdAtLocation` (string),   `transactionId` (string, applied to the create call only — notify always   generates its own UUID) and `annotation` (object, passed to notify). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Submit a birth notification in one call
```js
submitBirthNotification({
  'child.name': { firstname: 'Test', surname: 'Baby' },
  'child.dob': '2026-05-01',
  'child.gender': 'female',
  'child.placeOfBirth': 'HEALTH_FACILITY',
  'child.birthLocation': $.locationId,
  'informant.relation': 'MOTHER',
}, { createdAtLocation: $.locationId });
```

* * *


## http

These functions belong to the http namespace.
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

**Example**
```js
http.post("/location", {
  "statisticalID": "TEST_LOCATION",
  "name": "My name",
  "alias": "My alias",
  "partOf": "Location/0",
  "code": "ADMIN_STRUCTURE",
  "jurisdictionType": "STATE",
  "statistics": [
    {
      "year": 0,
      "male_population": 0,
      "female_population": 0,
      "population": 0,
      "crude_birth_rate": 0
    }
  ]
});
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

**Example:** Create a new administrative location
```js
http.request("POST", "/location", {
    "statisticalID": "TEST_LOCATION",
    "name": "My name",
    "alias": "My alias",
    "partOf": "Location/0",
    "code": "ADMIN_STRUCTURE",
    "jurisdictionType": "STATE",
    "statistics": [
      {
        "year": 0,
        "male_population": 0,
        "female_population": 0,
        "population": 0,
        "crude_birth_rate": 0
      }
    ]
  });
```

* * *


##  Interfaces

### OpenCRVSHTTPState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

### OpenCRVSState

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
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |


* * *

