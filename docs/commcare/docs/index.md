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
| params | [<code>RequestQueries</code>](#requestqueries) | Query params, incl: limit, offset, and any custom report filters. |
| postUrl | <code>String</code> | Url to which the response object will be posted. |

**Example**  
```js
fetchReportData(reportId, params, postUrl)
```

* * *

## get

get(path, params, [callback]) ⇒ <code>Operation</code>

Make a GET request to any commcare endpoint. The returned objects will be written to state.data.
A `response` key will be added to state with the HTTP response and a `meta` key


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestQueries</code>](#requestqueries) | Optional request params such as limit and offset. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example** *(Get a list of cases)*  
```js
get("case", { limit: 20 })
```
**Example** *(Get a specific case )*  
```js
get("case/12345")
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
post( "user", { "username":"test", "password":"somepassword" })
```

* * *

## RequestOptions

RequestOptions : <code>Object</code>

Queries provided to the submitXls request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| case_type | <code>string</code> | Optional case type |
| search_field | <code>string</code> | Optional search field |
| create_new_cases | <code>string</code> | Optional for allowing to create new cases. Default `:on` |


* * *

## RequestQueries

RequestQueries : <code>Object</code>

Queries provided to the GET request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| limit | <code>number</code> | The maximum number of records to return. Default: 20. Maximum: 5000. |
| offset | <code>number</code> | The number of records to offset in the results. Default: 0 |
| xmlns | <code>string</code> | Optional form XML namespace. See the [Commcare Docs](https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143979045/Finding+a+Form%27s+XMLNS) |
| indexed_on_start | <code>string</code> | Optional date (and time). Will return only forms that have had data modified since the passed in date. |
| indexed_on_end | <code>string</code> | Optional date (and time). Will return only forms that have had data modified before the passed in date. |
| received_on_start | <code>string</code> | Optional date (and time). Will return only forms that were received after the passed in date. |
| received_on_end | <code>string</code> | Optional date (and time). Will return only forms that were received before the passed in date. |
| app_id | <code>string</code> | The returned records will be limited to the application defined |
| case_id | <code>string</code> | A case UUID.  Will only return forms which updated that case. |
| owner_id | <code>string</code> | Optional user of group UUID used when getting cases |
| user_id | <code>string</code> | Optional UUID for all cases last modified by that user |
| type | <code>string</code> | Optional case type to get all matching cases |


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
| params | [<code>RequestOptions</code>](#requestoptions) | Request params including case type. |

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

