<dl>
<dt>
    <a href="#buygoods">buyGoods(data, options)</a></dt>
<dt>
    <a href="#checktransactionstatus">checkTransactionStatus(data, options)</a></dt>
<dt>
    <a href="#registerurl">registerUrl(data, options)</a></dt>
<dt>
    <a href="#remittax">remitTax(data, options)</a></dt>
<dt>
    <a href="#request">request(method, path, body, options)</a></dt>
<dt>
    <a href="#stkpush">stkPush(data, options)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### buyGoods

<p><code>buyGoods(data, options) ⇒ Operation</code></p>

Pay for goods and services directly from your business account to a till number, merchant store number or Merchant HO


| Param | Type | Description |
| --- | --- | --- |
| data | [<code>BuyGoodsObject</code>](#buygoodsobject) | The object that will be attached to the POST request body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request object. Includes headers, error mappings and query params |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the DARAJA API server (excluding the body) |
| references | an array of all previous data objects used in the Job |
**Example:** Pay for goods
```js
buyGoods({
    "Initiator": "testapi",
    "SecurityCredential": "sbMXpuhMX5LzieNiDrx9TgscfaBxxvie0WlBDdGli4MWu4s5gbhYVlBy+T89xHQdoYwcG202KNp403ln2dLFnytPqw==",
    "Amount": 1,
    "PartyA": 600999,
    "PartyB": 600000,
    "AccountReference": 353353,
    "Requester": 254708374149,
    "Remarks": "ok",
    "QueueTimeOutURL": "https://mydomain.com/b2b/queue/",
    "ResultURL": "https://mydomain.com/b2b/result/"
});
```

* * *

### checkTransactionStatus

<p><code>checkTransactionStatus(data, options) ⇒ Operation</code></p>

Check the status of the transaction


| Param | Type | Description |
| --- | --- | --- |
| data | [<code>TransactionStatusObject</code>](#transactionstatusobject) | The object that will be attached to the POST request body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request object. Includes headers, error mappings and query params |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the DARAJA API server (excluding the body) |
| references | an array of all previous data objects used in the Job |
**Example:** Check status of a transaction
```js
checkTransactionStatus({
    "Initiator": "testapi",
    "SecurityCredential": "ctHDk+dN14A22B5GyQQvISSTY3K1tVnCTuQGoG7PsTCadzTkl5wz44Rhpkb0BZDvfRA==",
    "TransactionID": "OEI2AK4Q16",
    "PartyA": 600998,
    "IdentifierType": 4,
    "ResultURL": "https://mydomain.com/TransactionStatus/result/",
    "QueueTimeOutURL": "https://mydomain.com/TransactionStatus/queue/",
    "Remarks": "fdfdfdfdf",
    "Occassion": "null",
});
```

* * *

### registerUrl

<p><code>registerUrl(data, options) ⇒ Operation</code></p>

Register a URL that allows receiving payment notifications to your paybill.


| Param | Type | Description |
| --- | --- | --- |
| data | [<code>RegisterUrlObject</code>](#registerurlobject) | The object that will be attached to the POST request body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request object. Includes headers, error mappings and query params |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the DARAJA API server (excluding the body) |
| references | an array of all previous data objects used in the Job |
**Example:** Register a URL to receive payment notifications
```js
registerUrl({
    "ShortCode": 600426,
    "ResponseType": "Completed",
    "ConfirmationURL": "https://mydomain.com/confirmation",
    "ValidationURL": "https://mydomain.com/validation"
});
```

* * *

### remitTax

<p><code>remitTax(data, options) ⇒ Operation</code></p>

Remit tax to the Kenya Revenue Authority (KRA).


| Param | Type | Description |
| --- | --- | --- |
| data | [<code>RemitTaxObject</code>](#remittaxobject) | The object that will be attached to the POST request body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request object. Includes headers, error mappings and query params |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the DARAJA API server (excluding the body) |
| references | an array of all previous data objects used in the Job |
**Example:** Pay tax to KRA
```js
remitTax({
    "Initiator": "testapi",
    "SecurityCredential": "Uq1qluCjSYfMF3XEvlpfuatnWwWerwq42fB+mMd8nsKdAVO04DGHhG/s3xO3g7POki9B8i7cSoEkBux4bQrlDLDWJhaTrt1TdbE+ZQ==",
    "Amount": 1,
    "PartyA": 600995,
    "AccountReference": 353353,
    "Remarks": "ok",
    "QueueTimeOutURL": "https://mydomain.com/b2b/queue/",
    "ResultURL": "https://mydomain.com/b2b/result/"
})
```

* * *

### request

<p><code>request(method, path, body, options) ⇒ Operation</code></p>

Make a general HTTP request


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource. |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the DARAJA API server (excluding the body) |
| references | an array of all previous data objects used in the Job |
**Example:** Register a URL to receive payment notifications
```js
request("POST", "/mpesa/c2b/v1/registerurl", 
 {
   "ShortCode": 600426,
   "ResponseType": "Completed",
   "ConfirmationURL": "https://mydomain.com/confirmation",
   "ValidationURL": "https://mydomain.com/validation"
 });
```

* * *

### stkPush

<p><code>stkPush(data, options) ⇒ Operation</code></p>

Initiate a STK pin prompt to a Safaricom mobile number.


| Param | Type | Description |
| --- | --- | --- |
| data | [<code>STKPushObject</code>](#stkpushobject) | The object that will be attached to the POST request body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request object. Includes headers, error mappings and query params |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the DARAJA API server (excluding the body) |
| references | an array of all previous data objects used in the Job |
**Example:** Initiate STK Push
```js
stkPush({
    "Amount": 1,
    "PartyA": 254708374149,
    "PartyB": 174379,
    "PhoneNumber": 254708374149,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of X"
});
```

* * *


##  Interfaces

### BuyGoodsObject

Buy goods parameter definition

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Initiator | <code>string</code> | The M-Pesa API operator username. This user needs Org Business Pay Bill API initiator role on M-Pesa |
| SecurityCredential | <code>string</code> | The encrypted password of the M-Pesa API operator. |
| Amount | <code>number</code> | The transaction amount. |
| PartyA | <code>number</code> | Your shortcode. The shortcode from which money will be deducted. |
| AccountReference | <code>string</code> | The account number to be associated with the payment. Up to 13 characters |
| Remarks | <code>string</code> | Any additional information to be associated with the transaction. |
| QueueTimeOutURL | <code>URL</code> | A URL that will be used to notify your system in case the request times out before processing. |
| ResultURL | <code>URL</code> | A URL that will be used to send transaction results after processing. |


* * *

### RegisterUrlObject

Register URL parameter definition

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ShortCode | <code>numeric</code> | Usually, a unique number is tagged to an M-PESA pay bill/till number of the organization. |
| ResponseType | <code>string</code> | This parameter specifies what is to happen if for any reason the validation URL is not reachable. Sample values: 'Canceled', 'Completed' |
| ConfirmationURL | <code>URL</code> | This is the URL that receives the confirmation request from API upon payment completion. |
| ValidationURL | <code>URL</code> | This is the URL that receives the validation request from the API upon payment submission. |


* * *

### RemitTaxObject

Remit tax parameter definition

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Initiator | <code>string</code> | The M-Pesa API operator username. |
| SecurityCredential | <code>string</code> | The encrypted password of the M-Pesa API operator. |
| Amount | <code>number</code> | The transaction amount. |
| PartyA | <code>number</code> | This is your own shortcode from which the money will be deducted. |
| AccountReference | <code>string</code> | The payment registration number (PRN) issued by KRA. |
| Remarks | <code>string</code> | Any additional information to be associated with the transaction. |
| QueueTimeOutURL | <code>URL</code> | A URL that will be used to notify your system in case the request times out before processing. |
| ResultURL | <code>URL</code> | A URL that will be used to send transaction results after processing. |


* * *

### RequestOptions

Options provided to the HTTP request

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |


* * *

### STKPushObject

STKPush request data object

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Amount | <code>number</code> | Amount charged. |
| PartyA | <code>number</code> | The phone number that receives the STK push prompt. Expected to be a valid Safaricom Number that is M-pesa registered in the format 2547XXXXXXXX |
| PartyB | <code>number</code> | The organization that receives the funds |
| PhoneNumber | <code>number</code> | The mobile number to receive the STK pin prompt |
| CallBackURL | <code>URL</code> | A valid secure URL that is used to receive notifications from M-Pesa API. It is the endpoint to which the results will be sent by M-Pesa API |
| AccountReference | <code>string</code> | Along with the business name, this value is also displayed to the customer in the STK pin prompt message. Maximum of 12 characters |
| TransactionDesc | <code>string</code> | Any additional information/comment that can be sent along with the request from you system. |


* * *

### TransactionStatusObject

Check transaction status data object.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Initiator | <code>string</code> | The name of the initiator initiating the request. |
| SecurityCredential | <code>string</code> | Encrypted credential of the user getting transaction status. |
| TransactionID | <code>string</code> | Unique identifier to identify a transaction on Mpesa. |
| PartyA | <code>number</code> | Organization/MSISDN receiving the transaction. |
| IdentifierType | <code>number</code> | Type of organization receiving the transaction. Example: "4" Orgnaization shortcode. |
| ResultURL | <code>URL</code> | The path that stores information of a transaction. |
| QueueTimeOutURL | <code>URL</code> | The path that stores information of timeout transaction. |
| Remarks | <code>string</code> | Comments that are sent along with the transaction. |
| Occassion | <code>string</code> | Optional parameter. |


* * *

