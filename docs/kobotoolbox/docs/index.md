<dl>
<dt>
    <a href="#getdeploymentinfo">getDeploymentInfo(formId)</a></dt>
<dt>
    <a href="#getforms">getForms()</a></dt>
<dt>
    <a href="#getsubmissions">getSubmissions(formId, [options])</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_get">http.get(path, [options])</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, data, [options])</a>
</dt>

<dt>
    <a href="#http_put">http.put(path, data, [options])</a>
</dt>

<dt>
    <a href="#http_request">http.request(method, path, [options])</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
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
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### getDeploymentInfo

<p><code>getDeploymentInfo(formId) ⇒ Operation</code></p>

Get deployment information for a specific form. Calls `/api/v2/assets/<id>/deployment/`.


| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | Form Id to get the deployment information |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | an object containing deployment information |

**Example**
```js
getDeploymentInfo('aXecHjmbATuF6iGFmvBLBX');
```

* * *

### getForms

<p><code>getForms() ⇒ Operation</code></p>

Make a request to fetch all survey forms accessible to the authorized user. Calls `/api/v2/assets/?asset_type=survey`.

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | an array of form objects |

**Example**
```js
getForms();
```

* * *

### getSubmissions

<p><code>getSubmissions(formId, [options]) ⇒ Operation</code></p>

Get submissions for a specific form. Calls `/api/v2/assets/<formId>/data/`


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| formId | <code>string</code> |  | Form Id to get the specific submissions |
| [options] | <code>object</code> | <code>{}</code> | Options to control the request |
| [options.sort] | <code>object</code> |  | Field and direction to sort submissions by. |
| [options.query] | <code>object</code> |  | Query options to filter the submissions. See query operators [http://docs.mongodb.org/manual/reference/operator/query/.](http://docs.mongodb.org/manual/reference/operator/query/.) |
| [options.start] | <code>number</code> | <code>0</code> | The index of the first submission to return. |
| [options.limit] | <code>number</code> | <code>30000</code> | Maximum number of submissions to fetch. Pass `Infinity` to disable the limit and download all submissions |
| [options.pageSize] | <code>number</code> | <code>10000</code> | Limits the size of each page of submissions. Maximum value is 30000. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | an array of submission objects |

**Example:** Get submissions for a specific form
```js
getSubmissions('aXecHjmbATuF6iGFmvBLBX');.
```
**Example:** Get all submissions for a specific form
```js
getSubmissions('aXecHjmbATuF6iGFmvBLBX', { limit: Infinity });
```
**Example:** Get form submissions with a query
```js
getSubmissions('aXecHjmbATuF6iGFmvBLBX', { query: { _submission_time:{ $gte: "2025-03-12T21:54:20" } } });
```
**Example:** Get form submissions with sorting
```js
getSubmissions('aXecHjmbATuF6iGFmvBLBX', { sort: { _submission_time: -1 } });
```
**Example:** Get form submissions with specific start index
```js
getSubmissions('aXecHjmbATuF6iGFmvBLBX', { start: 10 });
```

* * *


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(path, [options]) ⇒ operation</code></p>

Make a GET request to any KoboToolbox endpoint.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to resource |
| [options] | [<code>HTTPRequestOptions</code>](#httprequestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the KoboToolbox server (excluding the body) |
| references | An array containing all previous data objects |

**Example:** GET assets resource
```js
http.get('assets')
```

* * *


### http.post {#http_post}

<p><code>post(path, data, [options]) ⇒ operation</code></p>

Make a POST request to a KoboToolbox endpoint


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to resource |
| data | <code>any</code> |  | the body data in JSON format |
| [options] | [<code>HTTPRequestOptions</code>](#httprequestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the KoboToolbox server (excluding the body) |
| references | An array containing all previous data objects |

**Example:** Create an asset resource
```js
http.post(
 '/assets/',
 {
  name: 'Feedback Survey Test',
  asset_type: 'survey',
 },
 );
```

* * *


### http.put {#http_put}

<p><code>put(path, data, [options]) ⇒ operation</code></p>

Make a PUT request to a KoboToolbox endpoint


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to resource |
| data | <code>any</code> |  | the body data in JSON format |
| [options] | [<code>HTTPRequestOptions</code>](#httprequestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the KoboToolbox server (excluding the body) |
| references | An array containing all previous data objects |

**Example:** Update an asset resource
```js
http.put(
 'assets/a4jAWzoa8SZWzZGhx84sB5/deployment/',
 {
  name: 'Feedback Survey Test',
  asset_type: 'survey',
 },
 );
```

* * *


### http.request {#http_request}

<p><code>request(method, path, [options]) ⇒ Operation</code></p>

Make a HTTP request to any KoboToolbox endpoint


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| method | <code>string</code> |  | HTTP method to use |
| path | <code>string</code> |  | Path to resource |
| [options] | [<code>HTTPRequestOptions</code>](#httprequestoptions) | <code>{}</code> | An object containing query, headers, and body for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the KoboToolbox server (excluding the body) |
| references | An array containing all previous data objects |

**Example:** Bulk updating of submissions
```js
http.request("PATCH", `assets/${$.form_uid}/data/bulk/`, {
  body: {
    submission_ids: [$.data.submission_id],
    data: {
      Transaction_status: "success",
    },
  },
});
```

* * *


##  Interfaces

### HTTPRequestOptions

Options object


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>object</code> |  | An object of query parameters to be encoded into the URL |
| headers | <code>object</code> |  | An object of all request headers |
| body | <code>object</code> |  | The request body (as JSON) |
| maxRedirections | <code>number</code> |  | The maximum number of redirects to follow |
| [parseAs] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | The response format to parse (e.g., 'json', 'text', or 'stream') |


* * *

