<dl>
<dt>
    <a href="#fetchreportdata">fetchReportData(reportId, params, postUrl)</a></dt>
<dt>
    <a href="#get">get(path, [params], [callback])</a></dt>
<dt>
    <a href="#post">post(path, data, [params], [callback])</a></dt>
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
### fetchReportData

<p><code>fetchReportData(reportId, params, postUrl) ⇒ Operation</code></p>

Make a GET request to CommCare's Reports API
and POST the response somewhere else.


| Param | Type | Description |
| --- | --- | --- |
| reportId | <code>String</code> | API name of the report. |
| params | <code>Object</code> | Input parameters for the request, see [Commcare docs](https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143957341/Download+Report+Data). |
| postUrl | <code>String</code> | URL to which the response object will be posted. |

**Example:** Fetch 10 records from a report and post them to example.com
```js
fetchReportData(
  "9aab0eeb88555a7b4568676883e7379a",
  { limit: 10 },
  "https://www.example.com/api/"
)
```

* * *

### get

<p><code>get(path, [params], [callback]) ⇒ Operation</code></p>

Make a GET request to any CommCare endpoint. The response body will be returned to `state.data` as JSON.
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
**Example:** Get a specific case by id
```js
get("/case/12345")
```
**Example:** Get exactly 20 cases
```js
get("/case", { offset:0, limit: 20 })
```
**Example:** Get forms by app id
```js
get("/form", { app_id: "02bf50ab803a89ea4963799362874f0c" })
```
**Example:** Get all cases, 50 at a time, and add them to state
```js
get("/case", {}, (state) => {
   state.cases.push(...state.data) // adds 50 cases to the cases array
   return state;
})
```

* * *

### post

<p><code>post(path, data, [params], [callback]) ⇒ Operation</code></p>

Make a POST request to any CommCare endpoint.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object or JSON to use as the request body |
| [params] | <code>Object</code> | Optional request params |
| [callback] | <code>function</code> | Optional callback to handle the response |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the CommCare server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Post a user object to to the /user endpoint
```js
post("/user", { "username":"test", "password":"somepassword" })
```

* * *

### submit

<p><code>submit(data) ⇒ Operation</code></p>

Submit forms to CommCare. Accepts an array of JSON
objects, converts them into XML, and submits to CommCare as an x-form.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The form as a JSON object |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the response from the CommCare Server |
**Example:** Submit a form to CommCare
```js
 submit(
   fields(
     field("@", (state) => ({
         "xmlns": `http://openrosa.org/formdesigner/${state.formId}`
     }),
     field("question1", (state) => state.data.answer1),
     field("question2", (state) => state.data.answer2),
   )
 )
```

* * *

### submitXls

<p><code>submitXls(data, params) ⇒ Operation</code></p>

Bulk upload data to CommCare. Accepts an array of objects, converts them into
an XLS representation, and uploads.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>array</code> | Array of objects to upload |
| params | <code>Object</code> | Input parameters, see [CommCare docs](https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143946459/Bulk+Upload+Case+Data). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the response from the CommCare Server |
**Example:** Upload a single row of data
```js
submitXls(
   [
     {name: 'Mamadou', phone: '000000'},
   ],
   {
     case_type: 'student',
     search_field: 'external_id',
     create_new_cases: 'on',
   }
)
```

* * *


