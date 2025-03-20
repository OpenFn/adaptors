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
</dl>


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

Get submissions for a specific form. Calls `/api/v2/assets/<formId>/data/`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| formId | <code>string</code> |  | Form Id to get the specific submissions |
| [options] | <code>object</code> | <code>{}</code> | Optional query params for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | an array of submission objects |
**Example:** Get all submissions for a specific form
```js
getSubmissions('aXecHjmbATuF6iGFmvBLBX');
```
**Example:** Get form submissions with a query
```js
getSubmissions('aXecHjmbATuF6iGFmvBLBX', { query: { _submission_time:{ $gte: "2022-06-12T21:54:20" } } });
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
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the KoboToolbox server (excluding the body). Responses will be returned in JSON format |
| references | An array of all previous data objects used in the Job |
**Example:** GET assets resource
```js
http.get(
 "/assets/",
 )
```

* * *


### http.post {#http_post}

<p><code>post(path, data, [options]) ⇒ operation</code></p>

Make a POST request to a KoboToolbox endpoint


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to resource |
| data | <code>any</code> |  | the body data in JSON format |
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the KoboToolbox server (excluding the body). Responses will be returned in JSON format |
| references | An array of all previous data objects used in the Job |
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
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the KoboToolbox server (excluding the body). Responses will be returned in JSON format |
| references | An array of all previous data objects used in the Job |
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


##  Interfaces

### KoboToolboxHttpState

State object

**Properties**

| Name | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the KoboToolbox server (excluding the body). Responses will be returned in JSON format |
| references | An array of all previous data objects used in the Job |


* * *

### RequestOptions

Options object

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>object</code> |  | An object of query parameters to be encoded into the URL |
| headers | <code>object</code> |  | An object of all request headers |
| [parseAs] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | The response format to parse (e.g., 'json', 'text', or 'stream') |


* * *

### RequestOptions

Options object

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>object</code> |  | An object of query parameters to be encoded into the URL |
| headers | <code>object</code> |  | An object of all request headers |
| [parseAs] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | The response format to parse (e.g., 'json', 'text', or 'stream') |


* * *

