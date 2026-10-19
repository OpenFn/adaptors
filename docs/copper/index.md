<dl>
<dt>
    <a href="#request">request(method, path, body, options)</a></dt>
<dt>
    <a href="#upsertlead">upsertLead(properties, [match])</a></dt>
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

<p><code>request(method, path, body, options) ⇒ Operation</code></p>


Make a general HTTP request to the Copper API


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource, relative to https://api.copper.com/developer_api/v1 |
| body | <code>object</code> | Object which will be attached to the request body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
request('POST', 'leads/search', { page_size: 25 });
```

* * *

### upsertLead

<p><code>upsertLead(properties, [match]) ⇒ Operation</code></p>


Create or update a Copper lead. If no lead matches, a new lead is created.
If exactly one lead matches, it is updated. If several leads match, an error is thrown.
By default leads are matched on `properties.email.email`.
Writes the created or updated lead to `state.data`.


| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | Lead fields to set, as described in the Copper lead schema |
| [match] | [<code>LeadMatch</code>](#leadmatch) | Match criteria. Defaults to matching on email. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Upsert a lead, matching on email
```js
upsertLead({
  name: 'Ada Lovelace',
  email: { email: 'ada@example.com', category: 'work' },
  company_name: 'Analytical Engines',
});
```
**Example:** Upsert a lead from a lemlist activity
```js
upsertLead($ => ({
  name: `${$.data.leadFirstName} ${$.data.leadLastName}`,
  email: { email: $.data.leadEmail, category: 'work' },
  company_name: $.data.leadCompanyName,
}));
```
**Example:** Upsert a lead, matching on name
```js
upsertLead(
  { name: 'Ada Lovelace', title: 'Mathematician' },
  { field_name: 'name', field_value: 'Ada Lovelace' }
);
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

### LeadMatch

Lead match criteria


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| field_name | <code>string</code> | The field to match on: `email`, `name`, or a custom field |
| field_value | <code>string</code> | The value to match |


* * *

### RequestOptions

Options provided to the HTTP request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeout | <code>number</code> | Request timeout in ms. Default: 300 seconds. |


* * *

