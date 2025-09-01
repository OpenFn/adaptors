<dl>
<dt>
    <a href="#generatepdf">generatePDF(htmlTemplateString, [options])</a></dt>
<dt>
    <a href="#request">request(method, path, body, options)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#assert">assert()</a>
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
### generatePDF

<p><code>generatePDF(htmlTemplateString, [options]) ⇒ Operation</code></p>

Generate a PDF from an HTML string.


| Param | Type | Description |
| --- | --- | --- |
| htmlTemplateString | <code>string</code> | A HTML string or url to convert to PDF |
| [options] | [<code>PDFBodyOptions</code>](#pdfbodyoptions) | Optional configuration for PDF generation |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The parsed response body when `filename` is provided, otherwise a base64-encoded string. |

**Example:** Generate a PDF from a HTML string
```js
generatePDF(
`<html>
  <body>
    <h1>Sales Report</h1>
    <p>Date: 2025-02-01</p>
    <p>Total Sales: $42</p>
  </body>
</html>
`);
```
**Example:** Generate a PDF with options
```js
generatePDF(
`<html>
  <body>
    <h1>Sales Report</h1>
    <p>Date: 2025-02-01</p>
    <p>Total Sales: $42</p>
  </body>
</html>
`, {
  sandbox: true});
```
**Example:** Generate a PDF from a url
```js
generatePDF('https://www.example.com/', {
  sandbox: true,
  encode: false,
});
```
**Example:** Generate a PDF with a filename
```js
generatePDF('https://www.example.com/', {
 sandbox: true,
 filename: 'example.pdf',
});
```

* * *

### request

<p><code>request(method, path, body, options) ⇒ Operation</code></p>

Make a general HTTP request to PDFShift


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| body | [<code>BodyOptions</code>](#bodyoptions) | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Make a request to convert a HTML string to PDF
```js
request(
  'POST',
  '/convert/pdf',
   { source: $.html },
);
```

* * *


##  Interfaces

### BodyOptions

PDF Body Options object. [See PDFShift documentation](https://docs.pdfshift.io/#convert) for more details.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | The HTML string or url to convert to PDF. |
| sandbox | <code>boolean</code> | Generates PDF documents in dev mode that doesn't count in the credits. |
| encode | <code>boolean</code> | Return the generated PDF in Base64 encoded format, instead of raw. Defaults to `true`. |
| filename | <code>string</code> | Optional. Must be 7+ characters (letters, numbers, "-" or "_").   If set, the API returns a temporary S3 URL (file kept 2 days); otherwise, it returns a Base64 PDF. |


* * *

### HttpState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

### PDFBodyOptions

PDF Body Options object. [See PDFShift documentation](https://docs.pdfshift.io/#convert) for more details.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sandbox | <code>boolean</code> | Generates PDF documents in dev mode that doesn't count in the credits. |
| encode | <code>boolean</code> | Return the generated PDF in Base64 encoded format, instead of raw. Defaults to `true`. |
| filename | <code>string</code> | Optional. Must be 7+ characters (letters, numbers, "-" or "_").   If set, the API returns a temporary S3 URL (file kept 2 days); otherwise, it returns a Base64 PDF. |


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

