<dl>
<dt>
    <a href="#create">create(path, body, options)</a></dt>
<dt>
    <a href="#delete">delete(path, options)</a></dt>
<dt>
    <a href="#read">read(path, options)</a></dt>
<dt>
    <a href="#request">request(method, path, body, options)</a></dt>
<dt>
    <a href="#update">update(path, body, options)</a></dt>
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

## Functions
### create

<p><code>create(path, body, options) ⇒ Operation</code></p>

Create a resource


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

**Example:** Create a Patient using builders (see [fhir-4 docs](https://docs.openfn.org/adaptors/packages/fhir-4-docs#functions))
```js
create('Patient', builders.patient({
  identifier: [
    builders.identifier({
      use: 'official',
      system: 'http://ohie.org/National_Id',
      value: 'NIN-TEST-001',
    }),
  ],
  name: [{ use: 'official', family: 'Nakamura', given: ['Aiko'], text: 'Aiko Nakamura' }],
  gender: 'female',
  birthDate: '1992-04-10',
  active: true,
  telecom: [{ system: 'phone', value: '0712345678' }],
}));
```
**Example:** Create a Patient without builders
```js
create('Patient', {
  resourceType: 'Patient',
  active: true,
  identifier: [
    { use: 'official', system: 'http://ohie.org/National_Id', value: 'NIN-TEST-001' },
  ],
  name: [{ use: 'official', family: 'Nakamura', given: ['Aiko'] }],
  gender: 'female',
  birthDate: '1992-04-10',
  telecom: [{ system: 'phone', value: '0712345678' }],
});
```

* * *

### delete

<p><code>delete(path, options) ⇒ Operation</code></p>

Delete a resource


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

**Example:** Delete a Patient by ID
```js
delete('Patient/97597');
```

* * *

### read

<p><code>read(path, options) ⇒ Operation</code></p>

Read a resource
The response body will be returned to `state.data` as JSON.
Paginated responses will be fully downloaded and returned as a single array, _unless_ a `getpagesoffset` is passed.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options. Set `query._getpagesoffset` to fetch a specific page without auto-pagination. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Read server metadata
```js
read('metadata');
```
**Example:** Search for recently updated Patients — auto-paginates through all pages
```js
read('Patient', {
  query: {
    '_lastUpdated': 'gt2026-07-01T00:00:00Z',
    '_sort': '_lastUpdated',
    '_count': 50,
  }
});
```
**Example:** Fetch a specific page — auto-pagination disabled when _getpagesoffset is set
```js
read('Patient', {
  query: {
    '_getpagesoffset': 100,
    '_count': 50,
  }
});
```

* * *

### request

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

**Example:** Search Observations for a specific patient
```js
request('GET', 'Observation', null, {
  query: { 'subject': 'Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7' }
});
```
**Example:** Update a Patient resource
```js
request('PUT', 'Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7', {
  resourceType: 'Patient',
  id: '0181038e-682b-4c7c-a946-e3757d2fa2f7',
  active: false,
  name: [{ use: 'official', family: 'Mathenge', given: ['Monica'] }],
  gender: 'female',
  birthDate: '1990-07-07',
});
```

* * *

### update

<p><code>update(path, body, options) ⇒ Operation</code></p>

Update a resource


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

**Example:** Update a Patient by ID
```js
update('Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7', {
  resourceType: 'Patient',
  id: '0181038e-682b-4c7c-a946-e3757d2fa2f7',
  active: true,
  name: [{ use: 'official', family: 'Mathenge', given: ['Monica'] }],
  gender: 'female',
  birthDate: '1990-07-07',
  telecom: [{ system: 'phone', value: '0712010203' }],
  managingOrganization: { reference: 'Organization/eb4963c3-3d6e-4ea9-bde8-6a5b638bc4f8' },
});
```

* * *


##  Interfaces

### OnaFHIRState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

### RequestOptions

Options provided to Ona fhir request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |


* * *

