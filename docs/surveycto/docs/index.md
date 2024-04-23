## Functions

<dl>
<dt>
    <a href="#fetchsubmissions">fetchSubmissions(formId, options, callback)</a></dt>
<dt>
    <a href="#request">request(path, params, callback)</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#chunk">chunk()</a>
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
    <a href="/adaptors/packages/common-docs#datefns">dateFns()</a>
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
    <a href="/adaptors/packages/common-docs#parsecsv">parseCsv()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## fetchSubmissions

fetchSubmissions(formId, options, callback) ⇒ <code>Operation</code>

Fetch form submissions


| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | Form id |
| options | [<code>FormSubmissionOptions</code>](#formsubmissionoptions) | Form submission date, format, status parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Fetch all form submissions)*  
```js
fetchSubmissions('test');
```
**Example** *( With &#x60;MMM dd, yyyy h:mm:ss a&#x60; date format)*  
```js
fetchSubmissions('test', { date: 'Apr 18, 2024 6:26:21 AM' });
```
**Example** *( With &#x60;unix timestamp&#x60; date format)*  
```js
fetchSubmissions('test', { date: '1444694400000' });
```
**Example** *( Formatting the results to CSV String)*  
```js
fetchSubmissions('test', { date: '1444694400000', format: 'csv' });
```
**Example** *( With reviewStatus filter)*  
```js
fetchSubmissions('test', {
  date: '1444694400',
  status: 'approved|rejected',
});
```
**Example** *( With access to the callback)*  
```js
fetchSubmissions(
  'test',
  {
    date: 'Apr 18, 2024 6:26:21 AM',
    status: 'approved|rejected',
  },
  state => {
    console.log('Hello from the callback!');
    return state;
  }
);
```

* * *

## FormSubmissionOptions

FormSubmissionOptions : <code>Object</code>

Options provided to the HTTP request

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [date] | <code>string</code> | <code>0</code> | A timestamp in seconds or millseconds or in `MMM dd, yyyy h:mm:ss a` format. Defaults to `0` which will request all data |
| [format] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | Format the submission data typee, It can be in `csv` or `json`. Defaults to `json` (JSON response) |
| status | <code>string</code> |  | (Opt)Review status. Can be either, `approved`, `rejected`, `pending` or combine eg `approved|rejected`. |


* * *

## request

request(path, params, callback) ⇒ <code>Operation</code>

Make a request in SurveyCTO API


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Query, body and method parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
request("/anEndpoint", {
  method: "POST",
  query: { foo: "bar", a: 1 },
});
```

* * *

## RequestOptions

RequestOptions : <code>Object</code>

Options provided to the SurveyCTO API request

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| headers | <code>object</code> |  | An object of headers parameters. |
| body | <code>object</code> |  | Body data to append to the request. |
| query | <code>object</code> |  | An object of query parameters to be encoded into the URL. |
| [method] | <code>string</code> | <code>&quot;GET&quot;</code> | The HTTP method to use. Defaults to `GET` |


* * *

