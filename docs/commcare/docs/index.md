## Functions

<dl>
<dt>
    <a href="#fetchreportdata">fetchReportData(reportId, params, postUrl)</a></dt>
<dt>
    <a href="#get">get(path, params, [callback])</a></dt>
<dt>
    <a href="#post">post(path, data, params, [callback])</a></dt>
<dt>
    <a href="#submit">submit(formData)</a></dt>
<dt>
    <a href="#submitxls">submitXls(formData, params)</a></dt>
</dl>

The following functions are exported from the common adaptor:
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
    <a href="/adaptors/packages/common-docs#http">http()</a>
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

## fetchReportData

fetchReportData(reportId, params, postUrl) ⇒ <code>Operation</code>

Make a GET request to CommCare's Reports API
and POST the response to somewhere else.


| Param | Type | Description |
| --- | --- | --- |
| reportId | <code>String</code> | API name of the report. |
| params | <code>Object</code> | Query params, incl: limit, offset, and custom report filters. |
| postUrl | <code>String</code> | Url to which the response object will be posted. |

**Example**  
```js
fetchReportData(reportId, params, postUrl)
```

* * *

## get

get(path, params, [callback]) ⇒ <code>Operation</code>

Make a get request to any commcare endpoint
- The response returned is {meta:{}, objects:[]}. These are destructured where objects will be written into state.data and meta into state.response along with the status code and returned headers.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>Object</code> | Optional request params such as limit and offset. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example** *(Get a list of cases)*  
```js
get(
   "case"
   {
     limit: 1,
     offset:0,
   }
)
 * @example <caption>Get a specific case </caption>
get(
   "case/12345"
   {
     limit: 1,
     offset:0,
   }
)
```

* * *

## post

post(path, data, params, [callback]) ⇒ <code>Operation</code>

Make a post request to commcare


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object or JSON which defines data that will be used to create a given instance of resource |
| params | <code>Object</code> | Optional request params. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
post(
  "user",
 {"username":"test",
 "password":"somepassword"}
);
```

* * *

## submit

submit(formData) ⇒ <code>Operation</code>

Submit form data


| Param | Type | Description |
| --- | --- | --- |
| formData | <code>Object</code> | Object including form data. |

**Example**  
```js
submit(
   fields(
     field("@", function(state) {
       return {
         "xmlns": "http://openrosa.org/formdesigner/form-id-here"
       };
     }),
     field("question1", dataValue("answer1")),
     field("question2", "Some answer here.")
   )
 )
```

* * *

## submitXls

submitXls(formData, params) ⇒ <code>Operation</code>

Convert form data to xls then submit.


| Param | Type | Description |
| --- | --- | --- |
| formData | <code>Object</code> | Object including form data. |
| params | <code>Object</code> | Request params including case type and external id. |

**Example**  
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

