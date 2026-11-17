<dl>
<dt>
    <a href="#request">request(method, path, body, [options])</a></dt>
<dt>
    <a href="#verify">verify(credential, [options])</a></dt>
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
### request

<p><code>request(method, path, body, [options]) ⇒ Operation</code></p>


Make a general HTTP request to Inji Verify.
Prefer [verify](#verify) for VC verification.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| method | <code>string</code> |  | HTTP method to use |
| path | <code>string</code> |  | Path relative to configuration.baseUrl |
| body | <code>object</code> |  | Object attached to the request body |
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
request('POST', 'v2/vc-verification', {
  verifiableCredential: JSON.stringify($.data),
  skipStatusChecks: false,
  statusCheckFilters: ['revocation'],
  includeClaims: false,
});
```

* * *

### verify

<p><code>verify(credential, [options]) ⇒ Operation</code></p>


Verify a Verifiable Credential with Inji Verify (V2).

Posts to `{baseUrl}/v2/vc-verification`. Configure `baseUrl` with the
service context path, e.g. `https://verify.example.org/v1/verify`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| credential | <code>object</code> \| <code>string</code> |  | JSON-LD object, SD-JWT string, or CWT hex string |
| [options] | [<code>VerifyOptions</code>](#verifyoptions) | <code>{}</code> | Verification options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Verify a credential from state
```js
verify($.data, {
  skipStatusChecks: false,
  statusCheckFilters: ['revocation'],
  includeClaims: false,
});
```

* * *


##  Interfaces

### HttpState

State object after an Inji Verify HTTP call


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |


* * *

### RequestOptions

Options provided to a general HTTP request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> \| <code>string</code> | body data to append to the request |
| errors | <code>object</code> | Map of errorCodes -> error messages |
| query | <code>object</code> | An object of query parameters to be encoded into the URL |
| headers | <code>object</code> | An object of headers to append to the request |
| parseAs | <code>string</code> | Parse the response body as json, text or stream |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds |


* * *

### VerifyOptions

Options for verify


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [skipStatusChecks] | <code>boolean</code> | <code>false</code> | Skip credential status (e.g. revocation) checks |
| [statusCheckFilters] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Status check purposes to run (e.g. `['revocation']`) |
| [includeClaims] | <code>boolean</code> | <code>false</code> | Include extracted claims when schema/signature is valid |


* * *

