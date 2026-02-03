<dl>
<dt>
    <a href="#createcustomer">createCustomer(customerData)</a></dt>
<dt>
    <a href="#createpaymentmethod">createPaymentMethod(paymentMethodData)</a></dt>
<dt>
    <a href="#initiatepayment">initiatePayment(paymentData)</a></dt>
</dl>


## Functions
### createCustomer

<p><code>createCustomer(customerData) ⇒ function</code></p>

Create a new customer in Flutterwave.


| Param | Type |
| --- | --- |
| customerData | <code>Object</code> | 



* * *

### createPaymentMethod

<p><code>createPaymentMethod(paymentMethodData) ⇒ function</code></p>

Create a new payment method in Flutterwave.

**Returns**: <code>function</code> - - A function that takes the state and performs the operation.  

| Param | Type | Description |
| --- | --- | --- |
| paymentMethodData | <code>Object</code> | The payment method details to send to Flutterwave. |



* * *

### initiatePayment

<p><code>initiatePayment(paymentData) ⇒ function</code></p>

Initiate a payment request to the Flutterwave API.

**Returns**: <code>function</code> - - A function that takes the state and performs the operation.  

| Param | Type | Description |
| --- | --- | --- |
| paymentData | <code>Object</code> | The payment details to send to Flutterwave. |



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
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| form | <code>object</code> | Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |
| tls | <code>object</code> | TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions |


* * *

