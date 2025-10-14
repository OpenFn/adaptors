<dl>
<dt>
    <a href="#decryptsubmission">decryptSubmission(submissionData, options)</a></dt>
<dt>
    <a href="#processwebhook">processWebhook(submissionData, signatureHeader)</a></dt>
<dt>
    <a href="#verifywebhook">verifyWebhook(signatureHeader)</a></dt>
</dl>


## Functions
### decryptSubmission

<p><code>decryptSubmission(submissionData, options) ⇒ Operation</code></p>

Decrypt a FormSG submission


| Param | Type | Description |
| --- | --- | --- |
| submissionData | <code>DecryptParams</code> | The encrypted submission data from FormSG webhook |
| options | [<code>DecryptOptions</code>](#decryptoptions) | Options for decryption |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The current data/response |
| configuration | FormSG configuration |
| references | Array of previous data objects |

**Example**
```js
decryptSubmission($.data)
```
**Example**
```js
decryptSubmission($.data, {
  verifySignature: true,
  signatureHeader: $.request.headers['x-formsg-signature']
})
```

* * *

### processWebhook

<p><code>processWebhook(submissionData, signatureHeader) ⇒ Operation</code></p>

Process a FormSG webhook (verify and decrypt in one step)


| Param | Type | Description |
| --- | --- | --- |
| submissionData | <code>DecryptParams</code> | The encrypted submission data from FormSG webhook |
| signatureHeader | <code>string</code> | The X-FormSG-Signature header value |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The current data/response |
| configuration | FormSG configuration |
| references | Array of previous data objects |

**Example**
```js
processWebhook($.data, $.request.headers['x-formsg-signature'])
```

* * *

### verifyWebhook

<p><code>verifyWebhook(signatureHeader) ⇒ Operation</code></p>

Verify a FormSG webhook signature


| Param | Type | Description |
| --- | --- | --- |
| signatureHeader | <code>string</code> | The X-FormSG-Signature header value |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The current data/response |
| configuration | FormSG configuration |
| references | Array of previous data objects |

**Example**
```js
verifyWebhook($.request.headers['x-formsg-signature'])
```

* * *


##  Interfaces

### DecryptOptions

Options for decrypting FormSG submissions


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [verifySignature] | <code>boolean</code> | <code>false</code> | Whether to verify webhook signature |
| [signatureHeader] | <code>string</code> |  | The X-FormSG-Signature header value |


* * *

### FormSGConfiguration

Configuration for FormSG adaptor


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| formSecretKey | <code>string</code> |  | Your form's secret key from FormSG |
| [mode] | <code>PackageMode</code> | <code>&#x27;development&#x27;</code> | SDK mode: 'production', 'staging', or 'development' |
| [webhookEndpoint] | <code>string</code> |  | The URI of your webhook endpoint |


* * *

### FormSGState

State object for FormSG operations


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The current data/response |
| configuration | [<code>FormSGConfiguration</code>](#formsgconfiguration) | FormSG configuration |
| references | <code>Array</code> | Array of previous data objects |


* * *

