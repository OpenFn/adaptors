## Functions

<dl>
<dt>
    <a href="#get">get(path, options)</a></dt>
<dt>
    <a href="#getforms">getForms(projectId)</a></dt>
<dt>
    <a href="#getsubmissions">getSubmissions(projectId, xmlFormId, query)</a></dt>
<dt>
    <a href="#post">post(path, body, options)</a></dt>
<dt>
    <a href="#request">request(method, path, body, options)</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
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

## get

get(path, options) ⇒ <code>Operation</code>

Make a GET request against the base URL.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Options to configure the HTTP request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the ODK HTTP server (with the body removed) |
| references | an array of all the previous data values |
**Example** *(Get a list of available projects)*  
```js
get("v1/projects");
```
**Example** *(Get projects with query parameters)*  
```js
get("v1/projects", {
 query: { datasets: true }
});
```

* * *

## getForms

getForms(projectId) ⇒ <code>Operation</code>

Fetch all forms for a project.


| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>number</code> | Id of the project |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | array of form data objects |
| response | the response from the ODK HTTP server (with the body removed) |
| references | an array of all the previous data values |
**Example** *(Fetch all forms for project with id 22)*  
```js
getForms(22);
```

* * *

## getSubmissions

getSubmissions(projectId, xmlFormId, query) ⇒ <code>Operation</code>

Fetch all submissions to a given form.


| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>number</code> | Id of the project the form belongs to |
| xmlFormId | <code>string</code> | Id of the form to fetch submissions for |
| query | <code>string</code> | Query parameters to append to the request, see [https://docs.getodk.org/central-api-odata-endpoints/#data-document](https://docs.getodk.org/central-api-odata-endpoints/#data-document) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | array of form submission objects |
| response | the response from the ODK HTTP server (with the body removed) |
| references | an array of all the previous data values |
**Example** *(Get all submissions to a form called &#x27;patient-follow-up&#x27;)*  
```js
getSubmissions(22, 'patient-follow-up');
```
**Example** *(Filter submissions since a given)*  
```js
getSubmissions(22, 'patient-follow-up', { $filter: "$root/Submissions/__system/submissionDate gt 2020-01-31T23:59:59.999Z" });
```

* * *

## post

post(path, body, options) ⇒ <code>Operation</code>

Make a POST request against the base URL.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Options to configure the HTTP request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the ODK HTTP server (with the body removed) |
| references | an array of all the previous data values |
**Example** *(Create a new project)*  
```js
post('v1/projects', { name: 'Project Name' });
```

* * *

## request

request(method, path, body, options) ⇒ <code>Operation</code>

Make a general HTTP request against the base URL.


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request params |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the ODK HTTP server (with the body removed) |
| references | an array of all the previous data values |
**Example** *(Make a POST request to create a new project)*  
```js
request("POST", 'v1/projects', { name: 'Project Name' });
```

* * *

## RequestOptions

RequestOptions : <code>Object</code>

Options provided to the HTTP request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |


* * *

