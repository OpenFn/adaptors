<dl>
<dt>
    <a href="#createpdf">createPDF(input, options)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_request">http.request(method, path, options)</a>
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
    <a href="/adaptors/packages/common-docs#source">source()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>

## Functions
### createPDF

<p><code>createPDF(input, options) ⇒ Operation</code></p>

Create a PDF from HTML or URL.

**Returns**: <code>Operation</code> - Returns state with base64 string directly  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | HTML string or URL string |
| options | <code>object</code> | Optional request options |



* * *


## http

These functions belong to the http namespace.
### http.request {#http_request}

<p><code>request(method, path, options) ⇒ Operation</code></p>

Make a Browserless-authenticated HTTP request operation.
This operation always sends requests to the configured Browserless 'baseUrl'.

**Returns**: <code>Operation</code> - an OpenFn operation returning a state with `data` and `response`.  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method (e.g. 'GET', 'POST'). |
| path | <code>string</code> | API Path (e.g. 'pdf, 'content) joined to the configured 'baseUrl'. |
| options | <code>object</code> | Request options (body, headers, query, parseAs). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |


* * *


