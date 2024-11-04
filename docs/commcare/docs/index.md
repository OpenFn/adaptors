<dl>
<dt>
    <a href="#bulk">bulk(type, data, params)</a></dt>
<dt>
    <a href="#fetchreportdata">fetchReportData(reportId, params, postUrl)</a></dt>
<dt>
    <a href="#get">get(path, [params], [callback])</a></dt>
<dt>
    <a href="#post">post(path, data, [params], [callback])</a></dt>
<dt>
    <a href="#request">request(method, path, body, options)</a></dt>
<dt>
    <a href="#submit">submit(data)</a></dt>
<dt>
    <a href="#submitxls">submitXls(data, params)</a></dt>
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
    <a href="/adaptors/packages/common-docs#http">http</a>
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
### bulk

<p><code>bulk(type, data, params) ⇒ Operation</code></p>

Bulk upload data to CommCare for case-data or lookup-table. Accepts an array of objects, converts them into
an XLS representation, and uploads.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>&#x27;case-data&#x27;</code> \| <code>&#x27;lookup-table&#x27;</code> | The type of data being processed. |
| data | <code>Object</code> \| <code>Array.&lt;Object&gt;</code> | An object or an array of objects to upload. - If type is `'case-data'`, this should be an object array of objects. - If type is `'lookup-table'`, this should be an object. |
| params | <code>Object</code> | Input parameters, see [CommCare docs](https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143946459/Bulk+Upload+Case+Data) for case-data and [Commcare Docs](https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143946023/Bulk+upload+Lookup+Tables) for lookup-table. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the CommCare server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Upload a single row of a case-data resource
```js
bulk('case-data', [{ name: 'Mamadou', phone: '000000' }], {
  case_type: 'student',
  search_field: 'external_id',
  create_new_cases: 'on',
});
```
**Example:** Upload a single row of a lookup-table resource
```js
bulk(
  'lookup-table',
  {
    types: [
      {
        'DELETE(Y/N)': 'N',
        table_id: 'fruit',
        'is_global?': 'yes',
        'field 1': 'type',
        'field 2': 'name',
      },
    ],
    fruit: [
      {
        UID: '',
        'DELETE(Y/N)': 'N',
        'field:type': 'citrus',
        'field:name': 'Orange',
      },
    ],
  },
  { replace: false }
);
```

* * *

### fetchReportData

<p><code>fetchReportData(reportId, params, postUrl) ⇒ Operation</code></p>

Make a GET request to CommCare's Reports API
and POST the response somewhere else.


| Param | Type | Description |
| --- | --- | --- |
| reportId | <code>String</code> | API name of the report. |
| params | <code>Object</code> | Input parameters for the request, see [Commcare docs](https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143957341/Download+Report+Data). |
| postUrl | <code>String</code> | URL to which the response object will be posted. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the CommCare server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Get 10 records from a report and post them to example.com. Equivalent to `<baseUrl>/configurablereportdata/abcde?limit=10`
```js
fetchReportData(
  "abcde",
  { limit: 10 },
  "https://www.example.com/api/"
)
```

* * *

### get

<p><code>get(path, [params], [callback]) ⇒ Operation</code></p>

Make a GET request to CommCare. Use this to fetch resources directly from Commcare REST API.
You can pass Commcare query parameters as an object of key value pairs, which will map to parameters
in the URL.
The response body will be returned to `state.data` as JSON.
Paginated responses will be fully downloaded and returned as a single array, _unless_ an `offset` is passed.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| [params] | <code>Object</code> | Input parameters for the request. These vary by endpoint,  see [CommCare docs](https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143957366/Data+APIs). |
| [callback] | <code>function</code> | Optional callback function. Invoked once per page of data retrieved. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the CommCare server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Get a resource by Id. Equivalent to GET `<baseUrl>/case/12345`
```js
get("/case/12345")
```
**Example:** Get a resource with exactly 20 items. Equivalent to `<baseUrl>/case?offset=0&limit=20`
```js
get("/case", { offset:0, limit: 20 })
```
**Example:** Get all items in a resource, and add them to state. Equivalent to `<baseUrl>/case`
```js
get("/case", {}, (state) => {
  state.cases.push(...state.data) // adds all cases to the cases array
  return state;
})
```

* * *

### post

<p><code>post(path, data, [params], [callback]) ⇒ Operation</code></p>

Make a POST request to CommCare. Use this to send resources directly to Commcare REST API.
You can pass Commcare body data as a JSON object.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object or JSON to create a resource |
| [params] | <code>Object</code> | Optional request params |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the CommCare server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Create a user resource.Equivalent to `<baseUrl>/user`
```js
post("/user", { "username":"test", "password":"somepassword" })
```

* * *

### request

<p><code>request(method, path, body, options) ⇒ Operation</code></p>

Make a general HTTP request against the Commcare server. Use this to make any request to Commcare REST API.


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the body |
| options | <code>RequestOptions</code> | Optional request params |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the CommCare server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Get a resource. Equivalent to `<baseUrl>/a/asri/api/v0.5/case`
```js
request("GET", "/a/asri/api/v0.5/case");
```

* * *

### submit

<p><code>submit(data) ⇒ Operation</code></p>

Submit forms to CommCare. Use this to send forms directly to Commcare REST API. Accepts an array of JSON
objects, converts them into XML, and submits to CommCare as an x-form.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The form as a JSON object |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the CommCare server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Submit a form resource.
```js
submit(
 fields(
   field('@', state => ({
     xmlns: `http://openrosa.org/formdesigner/${state.formId}`,
   })),
   field('question1', state => state.data.answer1),
   field('question2', state => state.data.answer2)
 )
);
```

* * *

### submitXls

<p><code>submitXls(data, params) ⇒ Operation</code></p>

Bulk upload data to CommCare. Use this to send multiple items for a single resource at once to Commcare. It accepts an array of objects, converts them into
an XLS representation, and uploads.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>array</code> | Array of objects to upload |
| params | <code>Object</code> | Input parameters, see [CommCare docs](https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143946459/Bulk+Upload+Case+Data). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the CommCare server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Upload a single row of data for a resource.
```js
submitXls([{ name: 'Mamadou', phone: '000000' }], {
  case_type: 'student',
  search_field: 'external_id',
  create_new_cases: 'on',
});
```

* * *


