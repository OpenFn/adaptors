## Functions

<dl>
<dt>
    <a href="#cursor">cursor(value, options)</a></dt>
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
    <a href="/adaptors/packages/common-docs#fnif">fnIf()</a>
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

## convertDate

convertDate

This function will attempt to convert any date representation into
a surveyCTO `MMM dd, yyy h:mm:ss a` string.
Strings already in this format will be ignored, other strings will be parsed
by the Date constructor.
Number values should be epoch or unix timestamps and will be converted to strings


| Param | Type | Description |
| --- | --- | --- |
| date | <code>\*</code> | a date in a string, number or Date format |


* * *

## cursor

cursor(value, options) ⇒ <code>Operation</code>

Sets `state.cursor` to a SurveyCTO timestamp string (`MMM dd, yyy h:mm:ss a`).
This supports natural language dates like `now`, `today`, `yesterday`, `n hours ago`, `n days ago`, and `start`,
which will be converted into timestamp strings.
See the usage guide at [https://docs.openfn.org/documentation/jobs/job-writing-guide#using-cursors](https://docs.openfn.org/documentation/jobs/job-writing-guide#using-cursors)


| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | the cursor value. Usually an ISO date, natural language date, or page number |
| options | <code>object</code> | options to control the cursor. |
| options.key | <code>string</code> | set the cursor key. Will persist through the whole run. |
| options.defaultValue | <code>any</code> | the value to use if value is falsy |
| options.format | <code>function</code> | custom formatter for the final cursor value |

**Example** *(Use a cursor from state if present, or else use the default value)*  
```js
cursor('today')
fetchSubmissions('test', { date: $.cursor });
```

* * *

## FetchSubmissionOptions

FetchSubmissionOptions : <code>Object</code>

Options provided to `fetchSubmissions()`

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [date] | <code>string</code> | <code>0</code> | Fetch only submissions from this timestamp. Acccepts SuvreyCTO date strings, unix and epoch timestamps, and ISO dates. By default, all submissions will be retrieved. |
| [format] | <code>string</code> | <code>&quot;json&quot;</code> | Format the submission data type as  `csv` or `json`. |
| [status] | <code>string</code> |  | Review status. Can be either, `approved`, `rejected`, `pending` or combine eg `approved|rejected`. |


* * *

## fetchSubmissions

fetchSubmissions(formId, options, callback) ⇒ <code>Operation</code>

Fetch form submissions.

If a date filter is provided, it will be  converted internally to the surveyCTO `MMM dd, yyy h:mm:ss` format (in UTC time).


| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | Form id |
| options | [<code>FetchSubmissionOptions</code>](#fetchsubmissionoptions) | Form submission date, format, status parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Fetch all form submissions)*  
```js
fetchSubmissions('test');
```
**Example** *( With SurveyCTO date format (UTC))*  
```js
fetchSubmissions('test', { date: 'Apr 18, 2024 6:26:21 AM' });
```
**Example** *(Using a rolling cursor )*  
```js
cursor((state) => state.cursor, { defaultValue: 'today' });
fetchSubmissions('test', { date: (state) => state.cursor, format: 'csv' });
cursor('now');
```
**Example** *( Formatting the results to CSV String)*  
```js
fetchSubmissions('test', { format: 'csv' });
```
**Example** *( With reviewStatus filter)*  
```js
fetchSubmissions('test', { status: 'approved|rejected' });
```
**Example** *( With a callback function)*  
```js
fetchSubmissions(
  'test',
  {
    date: 'Apr 18, 2024 6:26:21 AM',
  },
  state => {
    console.log('Hello from the callback!');
    return state;
  }
);
```

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

Options provided to request()

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [headers] | <code>object</code> |  | An object of headers parameters. |
| [body] | <code>object</code> |  | Body data to append to the request. |
| [query] | <code>object</code> |  | An object of query parameters to be encoded into the URL. |
| [method] | <code>string</code> | <code>&quot;GET&quot;</code> | The HTTP method to use. |


* * *

