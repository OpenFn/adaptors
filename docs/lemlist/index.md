<dl>
<dt>
    <a href="#listactivities">listActivities([options])</a></dt>
<dt>
    <a href="#request">request(method, path, body, options)</a></dt>
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
### listActivities

<p><code>listActivities([options]) ⇒ Operation</code></p>


List lemlist activities (emails sent, opened, replied, bounced, etc).
Returns an array of activities to `state.data`.
Fetches every page until no records remain or `limit` is reached.
Filters which resolve to `undefined`, `null` or `''` are ignored.


| Param | Type | Description |
| --- | --- | --- |
| [options] | [<code>ListActivitiesOptions</code>](#listactivitiesoptions) | Filters and pagination options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** List all replies since a given date
```js
listActivities({ type: 'emailsReplied', minDate: '2026-10-01T00:00:00Z' });
```
**Example:** List activities for a campaign
```js
listActivities({ campaignId: 'cam_abc123' });
```
**Example:** Fetch at most 500 activities
```js
listActivities({ type: 'emailsSent', limit: 500 });
```
**Example:** Fetch every activity, 50 at a time
```js
listActivities({ type: 'emailsOpened', pageSize: 50 });
```

* * *

### request

<p><code>request(method, path, body, options) ⇒ Operation</code></p>


Make a general HTTP request to the lemlist API


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource, relative to https://api.lemlist.com/api |
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
request('GET', 'campaigns');
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

### ListActivitiesOptions

Options for listing activities


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Activity type to filter by, ie `emailsReplied`, `emailsBounced`, `emailsUnsubscribed` |
| campaignId | <code>string</code> | Only return activities for this campaign |
| leadId | <code>string</code> | Only return activities for this lead |
| isFirst | <code>boolean</code> | Only return the first activity of each type |
| minDate | <code>string</code> | Only return activities created at or after this date (ISO 8601 or unix seconds) |
| maxDate | <code>string</code> | Only return activities created at or before this date (ISO 8601 or unix seconds) |
| offset | <code>number</code> | Number of records to skip before fetching. Default: 0. |
| limit | <code>number</code> | Maximum total number of records to return, across all pages. Default: `Infinity`. |
| pageSize | <code>number</code> | Number of records to request per page (max 100). Default: 100. |
| version | <code>string</code> | lemlist API version. Default: `v2`. |


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

