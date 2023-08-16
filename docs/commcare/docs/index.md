## Functions

<dl>
<dt>
    <a href="#clientPost">clientPost(formData)</a></dt>
<dt>
    <a href="#fetchReportData">fetchReportData(reportId, params, postUrl)</a></dt>
<dt>
    <a href="#submit">submit(formData)</a></dt>
<dt>
    <a href="#submitXls">submitXls(formData, params)</a></dt>
</dl>

## clientPost

clientPost(formData) ⇒ <code>State</code>
Performs a post request

**Kind**: global function  

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

**Kind**: global function  
**Access**: public  

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

**Kind**: global function  
**Access**: public  

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

**Kind**: global function  
**Access**: public  

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

