<dl>
<dt>
    <a href="#get">get(path, options)</a></dt>
<dt>
    <a href="#post">post(path, body, options)</a></dt>
<dt>
    <a href="#request">request(method, path, body, options)</a></dt>
</dl>


## Functions
### get

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request to Pesapal


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the Pesapal server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Get all registered IPN URLs for a merchant
```js
get('URLSetup/GetIpnList')
```

* * *

### post

<p><code>post(path, body, options) ⇒ Operation</code></p>

Make a POST request to Pesapal


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the Pesapal server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Send an order request 
```js
post('Transactions/SubmitOrderRequest', 
    {
        "id": "TEST-05",
        "currency": "KES",
        "amount": "1",
        "description": "Testing",
        "callback_url": "https://www.myapplication.com/response-page",
        "notification_id": "fe078e53-78da-4a83-aa89-e7ded5c456e6",
        "billing_address": {
            "email_address": "john.doe@example.com",
            "phone_number": "0712xxxxxx",
            "country_code": "",
            "first_name": "Doe",
            "middle_name": "",
            "last_name": "John",
            "line_1": "",
            "line_2": "",
            "city": "",
            "state": "",
            "postal_code": "",
            "zip_code": ""
        }
})
```

* * *

### request

<p><code>request(method, path, body, options) ⇒ Operation</code></p>

Make a general HTTP request to Pesapal


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
| response | the response from the Pesapal server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Register IPN URL
```js
request("POST", "URLSetup/RegisterIPN", {
  "url": "https://www.myapplication.com/ipn",
  "ipn_notification_type": "GET"
 });
```
**Example:** Get transaction status
```js
request('GET', 'GetTransactionStatus', {}, {query:{
  orderTrackingId: '123456'
}})
```

* * *


##  Interfaces

### RequestOptions

Options provided to the Pesapal request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> \| <code>string</code> | body data to append to the request. JSON will be converted to a string. |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |


* * *

