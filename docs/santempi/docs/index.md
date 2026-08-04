
This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_get">http.get(path, options)</a>
</dt>

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


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request


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

**Example:** Search for a FHIR Patient by identifier
```js
http.get('/fhir/Patient', {
  headers: { Accept: 'application/fhir+json' },
  query: { identifier: 'http://ohie.org/National_Id|NIN-001-TEST' }
});
```
**Example:** Get an HDSI concept by reference term
```js
http.get('/hdsi/Concept', {
  query: {
    'referenceTerm.mnemonic': 'id_category',
    'referenceTerm.codeSystem.url': 'http://test.ohie.org/'
  }
});
```

* * *


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

**Example:** Register a new Patient built with openfn's fhir-4 builders
```js
http.post('/fhir/Patient', state => builders.patient({
  identifier: [
    builders.identifier({
      use: 'official',
      system: 'http://ohie.org/National_Id',
      value: 'NIN-001-TEST',
    }),
  ],
  name: [{ use: 'official', family: 'Nakamura', given: ['Aiko'] }],
  gender: 'female',
  birthDate: '1992-04-10',
}), {
  headers: {
    Accept: 'application/fhir+json',
    'Content-Type': 'application/fhir+json'
  }
});
```
**Example:** Create an Assigning Authority on the AMI surface
```js
http.post('/ami/AssigningAuthority', {
  $type: 'AssigningAuthority',
  name: 'Test National ID Authority',
  domainName: 'TEST-NIN',
  oid: '2.16.800.1.113883.3.9999.5.1',
  url: 'http://test.ohie.org/National_Id',
  isUnique: false,
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

**Example:** Match a patient using the FHIR $match operation
```js
http.request('POST', '/fhir/Patient/$match', {
  resourceType: 'Parameters',
  parameter: [
    {
      name: 'resource',
      resource: {
        resourceType: 'Patient',
        identifier: [{ system: 'http://ohie.org/National_Id', value: 'NIN-001-TEST' }],
        name: [{ family: 'Nakamura', given: ['Aiko'] }],
        gender: 'female',
        birthDate: '1992-04-10',
      }
    },
    { name: 'count', valueInteger: 5 }
  ]
}, {
  headers: {
    Accept: 'application/fhir+json',
    'Content-Type': 'application/fhir+json'
  }
});
```
**Example:** Get all AMI match configurations
```js
http.request('GET', '/ami/MatchConfiguration');
```

* * *


##  Interfaces

### RequestOptions

Options provided to santeMPI HTTP requests


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |


* * *

### SanteMPIHttpState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

