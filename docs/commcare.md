<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * _static_
        * [.execute](#module_Adaptor.execute)
            * [new exports.execute(operations)](#new_module_Adaptor.execute_new)
        * [.submitXls](#module_Adaptor.submitXls)
            * [new exports.submitXls(formData, params)](#new_module_Adaptor.submitXls_new)
        * [.submit](#module_Adaptor.submit)
            * [new exports.submit(formData)](#new_module_Adaptor.submit_new)
        * [.fetchReportData](#module_Adaptor.fetchReportData)
            * [new exports.fetchReportData(reportId, params, postUrl)](#new_module_Adaptor.fetchReportData_new)
    * _inner_
        * [~clientPost](#module_Adaptor..clientPost)
            * [new clientPost(formData)](#new_module_Adaptor..clientPost_new)

<a name="module_Adaptor.execute"></a>

### Adaptor.execute
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.execute_new"></a>

#### new exports.execute(operations)
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for commcare.


| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
execute(
  create('foo'),
  delete('bar')
)(state)
```
<a name="module_Adaptor.submitXls"></a>

### Adaptor.submitXls
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.submitXls_new"></a>

#### new exports.submitXls(formData, params)
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
<a name="module_Adaptor.submit"></a>

### Adaptor.submit
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.submit_new"></a>

#### new exports.submit(formData)
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
<a name="module_Adaptor.fetchReportData"></a>

### Adaptor.fetchReportData
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.fetchReportData_new"></a>

#### new exports.fetchReportData(reportId, params, postUrl)
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
<a name="module_Adaptor..clientPost"></a>

### Adaptor~clientPost
**Kind**: inner class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor..clientPost_new"></a>

#### new clientPost(formData)
Performs a post request


| Param | Type | Description |
| --- | --- | --- |
| formData | <code>Object</code> | Form Data with auth params and body |

**Example**  
```js
clientPost(formData)
```
