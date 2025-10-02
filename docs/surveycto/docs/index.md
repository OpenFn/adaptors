<dl>
<dt>
    <a href="#cursor">cursor(value, options)</a></dt>
<dt>
    <a href="#fetchsubmissions">fetchSubmissions(formId, options)</a></dt>
<dt>
    <a href="#jsontocsvbuffer">jsonToCSVBuffer(rows)</a></dt>
<dt>
    <a href="#list">list(resource, options)</a></dt>
<dt>
    <a href="#uploadcsvrecords">uploadCsvRecords(datasetId, rows, metadata)</a></dt>
<dt>
    <a href="#upsertdataset">upsertDataset(data)</a></dt>
<dt>
    <a href="#upsertrecord">upsertRecord(datasetId, data)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_delete">http.delete(path, params)</a>
</dt>

<dt>
    <a href="#http_get">http.get(path, params)</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, params)</a>
</dt>

<dt>
    <a href="#http_request">http.request(path, params)</a>
</dt>
</dl>


This adaptor exports the following from common:
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
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
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

## Functions
### cursor

<p><code>cursor(value, options) ⇒ Operation</code></p>

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


**Example:** Use a cursor from state if present, or else use the default value
```js
cursor('today')
fetchSubmissions('test', { date: $.cursor });
```

* * *

### fetchSubmissions

<p><code>fetchSubmissions(formId, options) ⇒ Operation</code></p>

Fetch form submissions.

If a date filter is provided, it will be  converted internally to the surveyCTO `MMM dd, yyy h:mm:ss` format (in UTC time).


| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | Form id |
| options | [<code>FetchSubmissionOptions</code>](#fetchsubmissionoptions) | Form submission date, format, status parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the SurveyCTO server, including headers, statusCode etc |
| references | an array of all previous data objects used in the Job. |

**Example:** Fetch all form submissions
```js
fetchSubmissions('test');
```
**Example:**  With SurveyCTO date format (UTC)
```js
fetchSubmissions('test', { date: 'Apr 18, 2024 6:26:21 AM' });
```
**Example:** Using a rolling cursor 
```js
cursor((state) => state.cursor, { defaultValue: 'today' });
fetchSubmissions('test', { date: (state) => state.cursor, format: 'csv' });
cursor('now');
```
**Example:**  Formatting the results to CSV String
```js
fetchSubmissions('test', { format: 'csv' });
```
**Example:**  With reviewStatus filter
```js
fetchSubmissions('test', { status: 'approved|rejected' });
```

* * *

### jsonToCSVBuffer

<p><code>jsonToCSVBuffer(rows) ⇒ Operation</code></p>

Converts an array of objects to a CSV buffer.


| Param | Type | Description |
| --- | --- | --- |
| rows | <code>\*</code> | An array of JSON objects. |


**Example**
```js
jsonToCSVBuffer([
 {
    lastName: 'Rothfuss',
    firstName: 'Patrick',
    book: 'The Name of the Wind'
  },
 {
    lastName: 'Martin',
    firstName: 'George',
    book: 'A Game of Thrones'
  },
])
```

* * *

### list

<p><code>list(resource, options) ⇒ Operation</code></p>

List resources from SurveyCTO


| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | Resource to fetch |
| options | <code>object</code> | Optional request query options. [See the API docs for details](https://developer.surveycto.com/api-v2.html#getdatasets-parameters) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the server with `total` and `nextCursor` |
| references | an array of all previous data objects used in the Job. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options.limit | <code>number</code> | Maximum number of items to return. Defaults to 20. Maximum is 1000. |
| options.cursor | <code>string</code> | Optional string to specify the starting point of the next page of results. |

**Example:** List all dataset records
```js
list(`datasets/${$.datasetId}/records`)
```
**Example:** List all datasets
```js
list('datasets')
```
**Example:** List dataset records with pagination options
```js
list(`datasets/${$.datasetId}/records`,{
  limit: 2,
});
```
**Example:** List datasets with pagination options
```js
list('datasets',{
  limit: 2,
});
```

* * *

### uploadCsvRecords

<p><code>uploadCsvRecords(datasetId, rows, metadata) ⇒ Operation</code></p>

Upload CSV dataset records


| Param | Type | Description |
| --- | --- | --- |
| datasetId | <code>string</code> | ID of the dataset |
| rows | <code>string</code> | An array of JSON objects to be uploaded as records. The data will be converted to CSV format before upload. |
| metadata | <code>object</code> | Optional metadata for configuring how the uploaded data should be processed |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the SurveyCTO server, including headers, statusCode etc |
| references | an array of all previous data objects used in the Job. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| joiningField | <code>string</code> | Optional field name to use for merging records. Required when uploadMode is `MERGE`. |
| uploadMode | <code>string</code> | Optional upload mode. One of `APPEND` (default), `MERGE` and `CLEAR`. |

**Example:** Upload records
```js
uploadCsvRecords('enumerators_dataset', [
  {
    id: '4',
    name: 'Trial update',
    users: 'All users',
  },
  {
    id: '5',
    name: 'Trials',
    users: 'All users here',
  },
]);
```
**Example:** Upload records with metadata
```js
uploadCsvRecords(
  'enumerators_dataset',
  [
    {
      id: '4',
      name: 'Trial update',
      users: 'All users',
    },
    {
      id: '5',
      name: 'Trials',
      users: 'All users here',
    },
  ],
  {
    uploadMode: 'MERGE',
    joiningField: 'id',
  }
);
```

* * *

### upsertDataset

<p><code>upsertDataset(data) ⇒ Operation</code></p>

Update (if exist) or create a dataset in SurveyCTO


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | The dataset object to create or update |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the SurveyCTO server, including headers, statusCode etc |
| references | an array of all previous data objects used in the Job. |

**Example:** Upsert a dataset
```js
upsertDataset({
  id: 'enum_dataset',
  title: 'Enum Dataset',
  discriminator: 'ENUMERATORS',
  locationContext: {
    parentGroupId: 1,
    siblingAbove: {
      id: 'new_dataset',
      itemClass: 'DATASET',
    },
  },
  allowOfflineUpdates: false,
  idFormatOptions: {
    prefix: 'enum',
    suffix: '',
    numberOfDigits: '8',
    allowCapitalLetters: true,
  },
});
```

* * *

### upsertRecord

<p><code>upsertRecord(datasetId, data) ⇒ Operation</code></p>

Update (if exist) or create a dataset record in SurveyCTO


| Param | Type | Description |
| --- | --- | --- |
| datasetId | <code>string</code> | ID of the dataset |
| data | <code>object</code> | The record object to create or update |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the SurveyCTO server, including headers, statusCode etc |
| references | an array of all previous data objects used in the Job. |

**Example:** Upsert a dataset record
```js
upsertRecord('enumerators_dataset', {
  id: '2',
  name: 'Trial update',
  users: 'All users',
});
```

* * *


## http

These functions belong to the http namespace.
### http.delete {#http_delete}

<p><code>delete(path, params) ⇒ Operation</code></p>

Delete resources from SurveyCTO


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Query and headers parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the SurveyCTO server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Delete a dataset
```js
http.delete('/datasets/enumerators_dataset');
```
**Example:** Delete a dataset record
```js
http.delete('/datasets/enumerators_dataset/record', {
  query: {
    recordId: 2,
  },
});
```

* * *


### http.get {#http_get}

<p><code>get(path, params) ⇒ Operation</code></p>

Get resources from SurveyCTO


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Query and headers parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the SurveyCTO server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Get a record with id
```js
http.get('/datasets/enumerators_dataset/record', {
  query: {
    recordId: '4',
  },
});
```
**Example:** Get a dataset with id
```js
http.get('/datasets/enumerators_dataset')
```
**Example:** Get a dataset in csv format
```js
http.get('/datasets/data/csv/enumerators_dataset', {
  query: {
    asAttachment: true,
  },
});
```

* * *


### http.post {#http_post}

<p><code>post(path, params) ⇒ Operation</code></p>

Send a HTTP POST request to SurveyCTO


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Query, body, and headers parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the SurveyCTO server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Purge a dataset
```js
http.post('/datasets/enumeratorse_dataset/purge');
```

* * *


### http.request {#http_request}

<p><code>request(path, params) ⇒ Operation</code></p>

Make a HTTP request to SurveyCTO


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | [<code>RequestOptions</code>](#requestoptions) | Query, body, headers and method parameters |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the SurveyCTO server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Post JSON data to SurveyCTO
```js
http.request("/anEndpoint", {
  method: "POST",
   contentType: "json",
  body: $.data,
});
```
**Example:** Upload a CSV blob to a dataset
```js
  http.request('datasets/library/records/upload', {
    method: 'POST',
    contentType: 'form',
    body: {
      file: {
        blob: $.data,
        type: 'text/csv',
        filename: 'library.csv'
      }
    },
  });
```

* * *


##  Interfaces

### FetchSubmissionOptions

Options provided to `fetchSubmissions()`


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [date] | <code>string</code> | <code>0</code> | Fetch only submissions from this timestamp. Acccepts SuvreyCTO date strings, unix and epoch timestamps, and ISO dates. By default, all submissions will be retrieved. |
| [format] | <code>string</code> | <code>&quot;json&quot;</code> | Format the submission data type as  `csv` or `json`. |
| [status] | <code>string</code> |  | Review status. Can be either, `approved`, `rejected`, `pending` or combine eg `approved|rejected`. |


* * *

### HTTPState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the SurveyCTO server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

### RequestOptions

Options provided to request()


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [headers] | <code>object</code> |  | An object of headers parameters. |
| [body] | <code>object</code> |  | Body data to append to the request. |
| [query] | <code>object</code> |  | An object of query parameters to be encoded into the URL. |
| [contentType] | <code>object</code> |  | Set the content-type header to the appropriate format. Supported values: `json` and `form` |
| [method] | <code>string</code> | <code>&quot;GET&quot;</code> | The HTTP method to use. |


* * *

### SurveyCTOListState

List State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the server with `total` and `nextCursor` |
| references | an array of all previous data objects used in the Job. |


* * *

### SurveyCTOState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the SurveyCTO server, including headers, statusCode etc |
| references | an array of all previous data objects used in the Job. |


* * *

