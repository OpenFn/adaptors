
This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_get">http.get(path, options)</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, body, options)</a>
</dt>

<dt>
    <a href="#http_request">http.request(method, path, body, options)</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
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
    <a href="/adaptors/packages/common-docs#group">group()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#map">map()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#scrubemojis">scrubEmojis()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request to an OpenELIS instance


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Get all orders in progress
```js
http.get('home-dashboard/ORDERS_IN_PROGRESS');
```
**Example:** Get all orders ready for validation
```js
http.get('home-dashboard/ORDERS_READY_FOR_VALIDATION');
```
**Example:** Get all the reasons why a lab order could be referred
```js
http.get('referral-reasons');
```

* * *


### http.post {#http_post}

<p><code>post(path, body, options) ⇒ Operation</code></p>

Make a POST request to an OpenELIS instance


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Validate results for a lab order
```js
http.post('AccessionValidation', {
    "formName": "ResultValidationForm",
    "formMethod": "POST",
    "cancelAction": "Home",
    "submitOnCancel": false,
    "cancelMethod": "POST",
    "searchFinished": true,
    "paging": {
        "totalPages": "1",
        "currentPage": "1",
        "searchTermToPage": [
            {
                "id": "25RSH00005L",
                "value": "1"
            }
        ]
    },
    "currentDate": "",
    "resultList": [
        {
            "id": 4,
            <more details>
        }
    ],
    "testSection": "",
    "accessionNumber": "25RSH00005L",
    "testDate": "",
    "testName": "",
    "testSections": [
        {
            "id": "56",
            "value": "Biochemistry"
        }
    ],
    "testSectionsByName": [
        {
            "id": "56",
            "value": "Biochemistry"
        }
    ],
    "displayTestSections": true
});
```
**Example:** Add results to an order
```js
http.post('LogbookResults', {
    "formName": "LogbookResultsForm",
    "formMethod": "POST",
    "cancelAction": "Home",
    "submitOnCancel": false,
    "cancelMethod": "POST",
    "paging": {
        "totalPages": "1",
        "currentPage": "1",
        "searchTermToPage": [
            {
                "id": "DEV01260000000000003",
                "value": "1"
            }
        ]
    },
    "accessionNumber": "DEV01260000000000003",
    "singlePatient": false,
    "currentDate": "09/02/2026",
    "displayTestMethod": true,
    "displayTestKit": false,
    "testResult": [
        {
            "id": "0",
            <more details>
        }
    ],
    "inventoryItems": [],
    "hivKits": [],
    "syphilisKits": [],
    "type": "",
    "displayMethods": true,
    "testSectionId": "",
    "displayTestSections": true,
    "searchByRange": false,
    "searchFinished": true
});
```

* * *


### http.request {#http_request}

<p><code>request(method, path, body, options) ⇒ Operation</code></p>

Make a general HTTP request


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Edit an existing patient's information
```js
http.request('POST', 'PatientManagement', {
    "patientUpdateStatus": "UPDATE",
    "nationalId": "1234567892",
    "subjectNumber": "1234567892",
    "lastName": "Lazic",
    "firstName": "Aleksa",
    "streetAddress": "",
    "city": "",
    "primaryPhone": "+255-45-89-63-21",
    "gender": "F",
    "birthDateForDisplay": "13/08/2000",
    "commune": "",
    "education": "",
    "maritialStatus": "",
    "nationality": "",
    "healthDistrict": "",
    "healthRegion": "",
    "otherNationality": "",
    "patientContact": {
        "person": {
            "firstName": "",
            "lastName": "",
            "primaryPhone": "",
            "email": "",
            "lastupdated": 1764586121386,
            "id": "409"
        },
        "lastupdated": 1764536400000,
        "id": "200",
        "patientId": "202"
    },
    "patientPK": "202",
    "guid": "c7e48932-2ed8-440a-9312-b68112e3873f",
    "aka": "",
    "mothersName": "",
    "mothersInitial": "",
    "addressDepartment": "",
    "insuranceNumber": "",
    "occupation": "",
    "readOnly": false,
    "stnumber": ""
});
```

* * *


##  Interfaces

### HttpState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

### RequestOptions

Options provided to the HTTP request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> \| <code>string</code> | body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request). |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |


* * *

