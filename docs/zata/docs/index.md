<dl>
<dt>
    <a href="#get">get(path, options)</a></dt>
<dt>
    <a href="#post">post(path, options)</a></dt>
<dt>
    <a href="#put">put(path, options)</a></dt>
<dt>
    <a href="#request">request(method, path, options)</a></dt>
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

## Functions
### get

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request to the Zata API


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Additional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Get all product types
```js
get('data/product-type')
```
**Example:** Test Zata API connectivity
```js
get('test')
```

* * *

### post

<p><code>post(path, options) ⇒ Operation</code></p>

Make a POST request to the Zata API


| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| options | [<code>RequestOptions</code>](#requestoptions) | 

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:**  Create a sale transaction
```js
post('transaction/sale', {
 body: {
    "purchaseCode": "43034",
    "paymentMethodID": 1,
    "customerID": 1,
    "transactionDate": "2024-01-01",
    "note": "string",
    "customerTIN": "123456789",
    "customerName": "John Doe",
    "customerPhone": "123456789",
    "items": [
      {
        "productID": 1,
        "units": 12.5,
        "unitPrice": 1000,
        "discountRate": 100,
        "batchNumber": "string"
      }
    ]
   },
 header: {
   companyId: 1,
   branchId: 1
 }
})
```
**Example:** Create a company 
```js
post('company', {
 body: {
   name: "Zata Point Global Service",
   address: "No 1, Zata Point Street, Zata Point",
   phone: "08012345678",
   email: "sample@sample.com",
   tin: "123456789"
 }
})
```

* * *

### put

<p><code>put(path, options) ⇒ Operation</code></p>

Make a PUT request to the Zata API


| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| options | [<code>RequestOptions</code>](#requestoptions) | 

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Reduce product quantity
```js
put('product/reduce-quantity/{productId}', {
 body: {
   quantity: 10,
   description: 'reason for reducing quantity',
   batchNumber: 'Batch Number'
 },
 header: {
   companyId: 1,
   branchId: 1
 }
})
```

* * *

### request

<p><code>request(method, path, options) ⇒ Operation</code></p>

Make a general HTTP request


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Additional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create a new sale transaction
```js
request("POST", "transaction/sale",
 {
     body: {
         "purchaseCode": "43034",
         "paymentMethodID": 1,
         "customerID": 1,
         "transactionDate": "2024-01-01",
         "note": "string",
         "customerTIN": "123456789",
         "customerName": "John Doe",
         "customerPhone": "12345678910",
         "items": [
             {
                 "productID": 1,
                 "units": 12.5,
                 "unitPrice": 1000,
                 "discountRate": 100,
                 "batchNumber": "string"
             }
         ]
     },
     headers: {
         companyId: 1,
         branchId: 1
     }
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
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| form | <code>object</code> | Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |
| tls | <code>object</code> | TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions |


* * *

