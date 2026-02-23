<dl>
<dt>
    <a href="#get">get(path, options)</a></dt>
<dt>
    <a href="#getviralloadresults">getViralLoadResults(data, options)</a></dt>
<dt>
    <a href="#post">post(path, body, options)</a></dt>
<dt>
    <a href="#postviralloadrequest">postViralLoadRequest(data, options)</a></dt>
<dt>
    <a href="#processviralloadresults">processViralLoadResults(processor)</a></dt>
<dt>
    <a href="#processviralloadsubmission">processViralLoadSubmission(processor)</a></dt>
<dt>
    <a href="#request">request(method, path, options)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#as">as</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#cursor">cursor</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#each">each</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#field">field</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fields">fields</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fn">fn</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fnif">fnIf</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#group">group</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#map">map</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#scrubemojis">scrubEmojis</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>

## Functions
### get

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options (query params, headers, etc.) |


**Example**
```js
get("/api/v1/samples/status");
```
**Example**
```js
get("/api/v1/sites", { query: { active: true } });
```

* * *

### getViralLoadResults

<p><code>getViralLoadResults(data, options) ⇒ Operation</code></p>

Get viral load test results from IBIPIMO


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Object containing siteid and sample_uids array |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getViralLoadResults({
  siteid: "77889900",
  sample_uids: ["2026010401", "IBI-2024-000001"]
});
```

* * *

### post

<p><code>post(path, body, options) ⇒ Operation</code></p>

Make a POST request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Body data |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |


**Example**
```js
post("/api/v1/ask-for-vl-results", { siteid: "77889900", sample_uids: ["2026010401"]});
```

* * *

### postViralLoadRequest

<p><code>postViralLoadRequest(data, options) ⇒ Operation</code></p>

Post viral load test requests to IBIPIMO


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Object containing siteid and samples array |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
postViralLoadRequest({
  siteid: "77889900",
  samples: [{
    sidainfo_uid: "147460",
    p_code: "000003",
    p_name: "Magara",
    p_prename: "Mahire",
    p_sex: "M",
    p_dob: "1950-01-15",
    // ... other required fields
  }]
});
```

* * *

### processViralLoadResults

<p><code>processViralLoadResults(processor) ⇒ Operation</code></p>

The processResults function returns an object with:
- totalRequested: Number of samples requested
- totalFound: Number of results available
- totalPending: Number of samples without published results
- availableResults: Array of sample results ready for processing
- pendingSamples: Array of sample UIDs still being processed
- sampleStatuses: Object with detailed status info per sample
- notFoundSamples: Array of sample UIDs not found in system


| Param | Type | Description |
| --- | --- | --- |
| processor | <code>function</code> | Function that receives (state, processResults) where processResults                              transforms IBIPIMO response into structured format |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
// After getting results from IBIPIMO
getViralLoadResults({
  siteid: "77889900",
  sample_uids: ["634R", "634W"]
});

// Process the response
processViralLoadResults((state, processResults) => {
  const processed = processResults(state.data);

  console.log(`Found ${processed.totalFound}/${processed.totalRequested} results`);
  console.log(`${processed.totalPending} samples still pending`);

  // Use processed data for SIDAInfo integration
  return {
    ...state,
    readyForSidaInfo: processed.availableResults,
    pendingSamples: processed.pendingSamples
  };
});
```

* * *

### processViralLoadSubmission

<p><code>processViralLoadSubmission(processor) ⇒ Operation</code></p>

The processSubmission function returns: savedSamples, savedCount, errors, errorCount, hasErrors, sampleIds


| Param | Type | Description |
| --- | --- | --- |
| processor | <code>function</code> | Function that receives (state, processSubmission) where processSubmission transforms IBIPIMO submission response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
postViralLoadRequest({
  siteid: "77889900",
  samples: [{ sidainfo_uid: "147460", p_name: "Test" }]
});

processViralLoadSubmission((state, processSubmission) => {
  const result = processSubmission(state.data);
  if (result.hasErrors) {
    return { ...state, submissionFailed: true, errors: result.errors };
  }
  return { ...state, newSampleIds: result.sampleIds };
});
```

* * *

### request

<p><code>request(method, path, options) ⇒ Operation</code></p>

Make a general HTTP request


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource (include /api/v1/ if needed) |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
request("POST", "/api/v1/ask-for-vl-results", { siteid: "77889900", sample_uids: ["2026010401"]});
```

* * *


##  Interfaces

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
| body | <code>object</code> \| <code>string</code> | body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request). |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| form | <code>object</code> | Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |
| tls | <code>object</code> | TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions |


* * *

