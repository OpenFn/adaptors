<dl>
<dt>
    <a href="#downloadattachment">downloadAttachment(attachmentId, options)</a></dt>
<dt>
    <a href="#getattachmentmetadata">getAttachmentMetadata(attachmentId)</a></dt>
<dt>
    <a href="#getform">getForm(formId, options)</a></dt>
<dt>
    <a href="#getforms">getForms(options)</a></dt>
<dt>
    <a href="#getsubmission">getSubmission(formId, submissionId)</a></dt>
<dt>
    <a href="#getsubmissions">getSubmissions(formId, options)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_get">http.get(path, options)</a>
</dt>

<dt>
    <a href="#http_request">http.request(method, path, options)</a>
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
### downloadAttachment

<p><code>downloadAttachment(attachmentId, options) ⇒ Operation</code></p>

Download an attachment in binary or base64 format


| Param | Type | Description |
| --- | --- | --- |
| attachmentId | <code>string</code> | Id of the attachment to be retrieved. |
| options | <code>object</code> | Optional request options. Supported options are: `filename` for the specific attachment to be downloaded, and `parseAs` for either `stream` or `base64`. Defaults to `parseAs: stream`. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| references | an array of all previous data objects used in the Job |

**Example:** Download an attachment
```js
downloadAttachment('622038', {
  filename:
    'project/attachments/download_1.png',
});
```
**Example:** Download an attachment in base64 format
```js
downloadAttachment('622038', {
  filename:
    'project/attachments/download_1.png',
  parseAs: 'base64',
});
```

* * *

### getAttachmentMetadata

<p><code>getAttachmentMetadata(attachmentId) ⇒ Operation</code></p>

Fetch a single attachment's metadata


| Param | Type | Description |
| --- | --- | --- |
| attachmentId | <code>string</code> | Id of the attachment to be retrieved. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getAttachmentMetadata('621985');
```

* * *

### getForm

<p><code>getForm(formId, options) ⇒ Operation</code></p>

Get metadata or structural data for a single form


| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | Id of the form to be retrieved. |
| options | <code>object</code> | Optional filter options. |
| options.structureOnly | <code>boolean</code> | If true, only the form structure is returned in JSON format. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| references | an array of all previous data objects used in the Job |

**Example:**  Get a single form 
```js
getForm('6225');
```
**Example:**  Get a single form structure 
```js
getForm('6225', {
  structureOnly: true,
});
```

* * *

### getForms

<p><code>getForms(options) ⇒ Operation</code></p>

Fetch all forms


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Optional filter options. Some supported options are: `public`, `tags`, `page`, and `page_size`. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| references | an array of all previous data objects used in the Job |

**Example:** Get all forms without filter options
```js
getForms();
```
**Example:** Get all forms with filter options
```js
getForms({
  public: true,
  page: 1,
  page_size: 5,
});
```

* * *

### getSubmission

<p><code>getSubmission(formId, submissionId) ⇒ Operation</code></p>

Get a single data submission for a single form


| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | Id of the form's submissions to be retrieved. |
| submissionId | <code>string</code> | Id of the submission to be retrieved. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getSubmission('6225', '7783155');
```

* * *

### getSubmissions

<p><code>getSubmissions(formId, options) ⇒ Operation</code></p>

Get submission data of a single form


| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | Id of the form's submissions to be retrieved. |
| options | <code>object</code> | Optional filter options. Some supported options are: `query`, `limit`, `start`, `page`, and `page_size`. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| references | an array of all previous data objects used in the Job |

**Example:** Get submissions without filter options
```js
getSubmissions('6225');
```
**Example:** Get submissions with filter options
```js
getSubmissions('6225', {
  query: `{"_submission_time":{"$gte":"2024-11-05"}}`,
  limit: 1,
});
```

* * *


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request to Inform


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| references | an array of all previous data objects used in the Job |

**Example:** Get all forms
```js
http.get('forms')
```

* * *


### http.request {#http_request}

<p><code>request(method, path, options) ⇒ Operation</code></p>

Make a general HTTP request to Inform


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| references | an array of all previous data objects used in the Job |

**Example:** Get all forms with a query
```js
http.request('GET', 'forms', {
  query: {
    public: true,
    page: 1,
    page_size: 5,
  },
});
```

* * *


##  Interfaces

### RequestOptions

Options provided to the Inform request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> \| <code>string</code> | body data to append to the request. JSON will be converted to a string. |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |


* * *

