<dl>
<dt>
    <a href="#createcustomer">createCustomer(customerData, [options])</a></dt>
<dt>
    <a href="#createpaymentmethod">createPaymentMethod(paymentMethodData, [options])</a></dt>
<dt>
    <a href="#initiatepayment">initiatePayment(paymentData, [options])</a></dt>
</dl>


## Functions
### createCustomer

<p><code>createCustomer(customerData, [options]) ⇒ function</code></p>

Create a new customer in Flutterwave.


| Param | Type | Description |
| --- | --- | --- |
| customerData | <code>Object</code> |  |
| [options] | [<code>RequestOptions</code>](#requestoptions) | Optional request options |



* * *

### createPaymentMethod

<p><code>createPaymentMethod(paymentMethodData, [options]) ⇒ function</code></p>

Create a new payment method in Flutterwave.

**Returns**: <code>function</code> - - A function that takes the state and performs the operation.  

| Param | Type | Description |
| --- | --- | --- |
| paymentMethodData | <code>Object</code> | The payment method details to send to Flutterwave. |
| [options] | [<code>RequestOptions</code>](#requestoptions) | Optional request options |



* * *

### initiatePayment

<p><code>initiatePayment(paymentData, [options]) ⇒ function</code></p>

Initiate a payment request to the Flutterwave API.

**Returns**: <code>function</code> - - A function that takes the state and performs the operation.  

| Param | Type | Description |
| --- | --- | --- |
| paymentData | <code>Object</code> | The payment details to send to Flutterwave. |
| [options] | [<code>RequestOptions</code>](#requestoptions) | Optional request options |



* * *


##  Interfaces

### FlutterwaveState

State object returned by flutterwave API


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body from flutterwave |
| response | the full response from the flutterwave server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

### RequestOptions

Options provided to the Flutterwave requests


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| form | <code>object</code> | Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |


* * *

