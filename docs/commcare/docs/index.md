## Functions

<dl>
<dt>
    <a href="#clientpost">clientPost(formData)</a></dt>
<dt>
    <a href="#fetchreportdata">fetchReportData(reportId, params, postUrl)</a></dt>
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

## clientPost

clientPost(formData) ⇒ <code>State</code>

Performs a post request


| Param | Type | Description |
| --- | --- | --- |
| formData | <code>Object</code> | Form Data with auth params and body |

**Example**  
```js
clientPost(formData)
```

* * *

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

