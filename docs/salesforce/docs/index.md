<dl>
<dt>
    <a href="#bulk">bulk(sObjectName, operation, records, [options])</a></dt>
<dt>
    <a href="#bulkquery">bulkQuery(query, [options])</a></dt>
<dt>
    <a href="#create">create(sObjectName, records)</a></dt>
<dt>
    <a href="#describe">describe(sObjectName)</a></dt>
<dt>
    <a href="#destroy">destroy(sObjectName, ids, [options])</a></dt>
<dt>
    <a href="#insert">insert(sObjectName, records)</a></dt>
<dt>
    <a href="#query">query(query, [options])</a></dt>
<dt>
    <a href="#retrieve">retrieve(sObjectName, id)</a></dt>
<dt>
    <a href="#update">update(sObjectName, records)</a></dt>
<dt>
    <a href="#upsert">upsert(sObjectName, externalId, records)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_get">http.get(path, [options])</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, body, [options])</a>
</dt>

<dt>
    <a href="#http_request">http.request(path, [options])</a>
</dt>

<dt>
    <a href="#util_toUTF8">util.toUTF8(input)</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#arraytostring">arrayToString()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#chunk">chunk()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
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
    <a href="/adaptors/packages/common-docs#expandreferences">expandReferences()</a>
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
    <a href="/adaptors/packages/common-docs#humanproper">humanProper()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#index">index()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#join">join()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#jsonvalue">jsonValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#referencepath">referencePath()</a>
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
    <a href="/adaptors/packages/common-docs#toarray">toArray()</a>
</dt></dl>

## Functions
### bulk

<p><code>bulk(sObjectName, operation, records, [options]) ⇒ Operation</code></p>

Create and execute a bulk job. Nested relationships will be flattened to dot notation automatically.
This function uses [Bulk API](https://sforce.co/4fDLJnk),
which is subject to [rate limits](https://sforce.co/4b6kn6z).


| Param | Type | Description |
| --- | --- | --- |
| sObjectName | <code>string</code> | API name of the sObject. |
| operation | <code>string</code> | The bulk operation to be performed.Eg `insert`, `update` or `upsert` |
| records | <code>array</code> | an array of records, or a function which returns an array. |
| [options] | [<code>BulkOptions</code>](#bulkoptions) | Options to configure the request. In addition to these, you can pass any of the options supported by the [jsforce API](https://bit.ly/41tyvVU). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | Summary of the response from Salesforce |
| data.success | `true` if Salesforce reports no errors from the operation |
| data.completed | Array of ids for every successful completion |
| data.errors | Array of errors reported by Salesforce |
| references | History of all previous states |
**Example:** Bulk insert
```js
bulk(
  "Patient__c",
  "insert",
  (state) => state.patients.map((x) => ({ Age__c: x.age, Name: x.name })),
  { failOnError: true }
);
```
**Example:** Bulk upsert
```js
bulk(
  "vera__Beneficiary__c",
  "upsert",
  [
    {
      vera__Reporting_Period__c: 2023,
      vera__Geographic_Area__c: "Uganda",
      "vera__Indicator__r.vera__ExtId__c": 1001,
      vera__Result_UID__c: "1001_2023_Uganda",
    },
  ],
  { extIdField: "vera__Result_UID__c" }
);
```
**Example:** Bulk upsert with a nested relationship
```js
bulk(
  "vera__Beneficiary__c",
  "upsert",
  [
    {
      vera__Reporting_Period__c: 2023,
      "vera_Project": {
        "Metrics_ID__c": "jfh5LAnxu1i4na"
      }
    },
  ],
  { extIdField: "vera__Result_UID__c" }
);
```
**Example:** Bulk update Account records using a lazy state reference
```js
fn((state) => {
  state.accounts = state.data.map((a) => ({ Id: a.id, Name: a.name }));
  return state;
});
bulk("Account", "update", $.accounts, { failOnError: true });
```

* * *

### bulkQuery

<p><code>bulkQuery(query, [options]) ⇒ Operation</code></p>

Execute an SOQL Bulk Query.
This function query large data sets and reduce the number of API requests.
`bulkQuery()` uses [Bulk API v2.0 Query](https://sforce.co/4azgczz) which is available in API version 47.0 and later.
This API is subject to [rate limits](https://sforce.co/4b6kn6z).


| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | A query string. |
| [options] | [<code>BulkQueryOptions</code>](#bulkqueryoptions) | Options passed to the bulk api. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | API response data. Can be either an object or array of objects |
| references | History of all previous states |
**Example:** Bulk query patient records where "Health_ID__c" is equal to the value in "state.data.healthId"
```js
bulkQuery(`SELECT Id FROM Patient__c WHERE Health_ID__c = '${$.data.healthId}'`);
```
**Example:** Bulk query with custom polling options
```js
bulkQuery(
  (state) =>
    `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`,
  { pollTimeout: 10000, pollInterval: 6000 }
);
```

* * *

### create

<p><code>create(sObjectName, records) ⇒ Operation</code></p>

Create one or more new sObject records. Relationships in the record should be nested and not use dot-notation syntax


| Param | Type | Description |
| --- | --- | --- |
| sObjectName | <code>string</code> | API name of the sObject. |
| records | <code>Object</code> \| <code>Array.&lt;Object&gt;</code> | Field attributes for the new record, or an array of field attributes. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | Summary of the response from Salesforce |
| data.success | `true` if Salesforce reports no errors from the operation |
| data.completed | Array of ids for every successful completion |
| data.errors | Array of errors reported by Salesforce |
| references | History of all previous states |
**Example:**  Single record creation
```js
create("Account", { Name: "My Account #1" });
```
**Example:**  Multiple records creation
```js
create("Account",[{ Name: "My Account #1" }, { Name: "My Account #2" }]);
```
**Example:**  Create records from data on state
```js
create("Account",
  $.data.map((account) => ({
    Name: account.label
  })
));
```
**Example:** Update a record with a relationship
```js
create("Account", {
  Name: "My Account #1" ,
  "Project__r": {
    "Metrics_ID__c": "jfh5LAnxu1i4na"
  }
});
```

* * *

### describe

<p><code>describe(sObjectName) ⇒ Operation</code></p>

Fetches and logs metadata for an sObject and pushes the result to `state.data`.
If `sObjectName` is not specified, it will print the total number of all available sObjects and push the result to `state.data`.


| Param | Type | Description |
| --- | --- | --- |
| sObjectName | <code>string</code> | The API name of the sObject. If omitted, fetches metadata for all sObjects. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | API response data. Can be either an object or array of objects |
| references | History of all previous states |
**Example:** Fetch metadata for all available sObjects
```js
describe()
```
**Example:** Fetch metadata for Account sObject
```js
describe('Account')
```

* * *

### destroy

<p><code>destroy(sObjectName, ids, [options]) ⇒ Operation</code></p>

Delete records of an sObject.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sObjectName | <code>string</code> |  | API name of the sObject. |
| ids | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | ID or array of IDs of records to delete |
| [options] | <code>object</code> |  | Options for the destroy delete operation. |
| [options.failOnError] | <code>boolean</code> | <code>false</code> | If true, the operation will fail if any record fails to delete. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | Summary of the response from Salesforce |
| data.success | `true` if Salesforce reports no errors from the operation |
| data.completed | Array of ids for every successful completion |
| data.errors | Array of errors reported by Salesforce |
| references | History of all previous states |
**Example:** Delete a single record
```js
destroy("Account", "001XXXXXXXXXXXXXXX");
```
**Example:** Allow operation to fail if any record fails to delete
```js
destroy("Account", ["001XXXXXXXXXXXXXXX", "001YYYYYYYYYYYYYYY"], {
  failOnError: true,
});
```
**Example:**  Using a state variable
```js
 fn((state) => {
  state.data = ["001XXXXXXXXXXXXXXX", "001YYYYYYYYYYYYYYY"];
  return state;
});
destroy("Account", $.data);
```

* * *

### insert

<p><code>insert(sObjectName, records) ⇒ Operation</code></p>

Alias for "create(sObjectName, records)".


| Param | Type | Description |
| --- | --- | --- |
| sObjectName | <code>string</code> | API name of the sObject. |
| records | <code>Object</code> \| <code>Array.&lt;Object&gt;</code> | Field attributes for the new record, or an array of field attributes. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | API response data. Can be either an object or array of objects |
| references | History of all previous states |
**Example:**  Single record creation
```js
insert("Account", { Name: "My Account #1" });
```
**Example:**  Multiple records creation
```js
insert("Account",[{ Name: "My Account #1" }, { Name: "My Account #2" }]);
```
**Example:**  Using a state variable
```js
fn((state) => {
  state.data = [{ Name: "My Account #1" }, { Name: "My Account #2" }];
  return state;
});
insert("Account", $.data);
```

* * *

### query

<p><code>query(query, [options]) ⇒ Operation</code></p>

Executes an SOQL (Salesforce Object Query Language) query to retrieve records from Salesforce.
Note that in an event of a query error, error logs will be printed but the operation will not throw the error.

The Salesforce query API is subject to rate limits, [learn more here](https://sforce.co/3W9zyaQ).


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>string</code> |  | A SOQL query string. Must be less than 4000 characters in WHERE clause |
| [options] | <code>object</code> |  | Query options |
| [options.limit] | <code>number</code> | <code>10000</code> | Maximum number of records to fetch. If `limit: Infinity` is passed, all records will be fetched. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | Array of result objects |
| references | History of all previous states |
| response | An object of result metadata.                     <code>{ done, totalSize, nextRecordsUrl?: string }</code>                     where nextRecordsUrl is only present when done is false |
**Example:** Run a query and download all matching records
```js
query('SELECT Id FROM Patient__c', { limit: Infinity });
```
**Example:** Run a query and limit records
```js
query('SELECT Id From Account Limit 10');
```
**Example:** Query patients by Health ID
```js
query(state => `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.healthId}'`);
```
**Example:** Query patients by Health ID using a lazy state reference
```js
query(`SELECT Id FROM Patient__c WHERE Health_ID__c = '${$.data.healthId}'`);
```

* * *

### retrieve

<p><code>retrieve(sObjectName, id) ⇒ Operation</code></p>

Retrieves a Salesforce sObject(s).


| Param | Type | Description |
| --- | --- | --- |
| sObjectName | <code>string</code> | The sObject to retrieve |
| id | <code>string</code> | The id of the record |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | API response data. Can be either an object or array of objects |
| references | History of all previous states |
**Example:** Retrieve a specific ContentVersion record
```js
retrieve('ContentVersion', '0684K0000020Au7QAE/VersionData');
```

* * *

### update

<p><code>update(sObjectName, records) ⇒ Operation</code></p>

Update an sObject record or records. Relationships in the record should be nested and not use dot-notation syntax


| Param | Type | Description |
| --- | --- | --- |
| sObjectName | <code>string</code> | API name of the sObject. |
| records | <code>object</code> \| <code>Array.&lt;object&gt;</code> | Field attributes for the new object. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | Summary of the response from Salesforce |
| data.success | `true` if Salesforce reports no errors from the operation |
| data.completed | Array of ids for every successful completion |
| data.errors | Array of errors reported by Salesforce |
| references | History of all previous states |
**Example:**  Single record update
```js
update("Account", {
  Id: "0010500000fxbcuAAA",
  Name: "Updated Account #1",
});
```
**Example:**  Multiple records update
```js
update("Account", [
  { Id: "0010500000fxbcuAAA", Name: "Updated Account #1" },
  { Id: "0010500000fxbcvAAA", Name: "Updated Account #2" },
]);
```
**Example:** Update a record with a relationship
```js
update("Account", {
  Id: "0010500000fxbcuAAA",
  "Project__r": {
    "Metrics_ID__c": "jfh5LAnxu1i4na"
  }
});
```

* * *

### upsert

<p><code>upsert(sObjectName, externalId, records) ⇒ Operation</code></p>

Create a new sObject record, or updates it if it already exists. Relationships in the record should be nested and not use dot-notation syntax


| Param | Type | Description |
| --- | --- | --- |
| sObjectName | <code>string</code> | API name of the sObject. |
| externalId | <code>string</code> | The external ID of the sObject. |
| records | <code>Object</code> \| <code>Array.&lt;Object&gt;</code> | Field attributes for the records to upsert, or an array of field attributes. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | API response data. Can be either an object or array of objects |
| references | History of all previous states |
**Example:**  Single record upsert 
```js
upsert("UpsertTable__c", "ExtId__c", { Name: "Record #1", ExtId__c : 'ID-0000001' });
```
**Example:**  Multiple record upsert 
```js
upsert("UpsertTable__c", "ExtId__c", [
  { Name: "Record #1", ExtId__c : 'ID-0000001' },
  { Name: "Record #2", ExtId__c : 'ID-0000002' },
]);
```
**Example:** Update a record with a relationship
```js
upsert("UpsertTable__c", {
  Name: "Record #1",
  "Project__r": {
    "Metrics_ID__c": "jfh5LAnxu1i4na"
  }
});
```

* * *


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(path, [options]) ⇒ Operation</code></p>

Send a GET request on salesforce server configured in `state.configuration`.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The Salesforce API endpoint. |
| [options] | [<code>SimpleRequestOptions</code>](#simplerequestoptions) | Configure headers and query parameters for the request. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | API response data. Can be either an object or array of objects |
| references | History of all previous states |
**Example:** Make a GET request to a custom Salesforce flow
```js
http.get('/actions/custom/flow/POC_OpenFN_Test_Flow');
```
**Example:** Make a GET request to a custom Salesforce flow with query parameters
```js
http.get('/actions/custom/flow/POC_OpenFN_Test_Flow', { query: { Status: 'Active' } });
```
**Example:** Make a GET request then map the response
```js
http.get("/jobs/query/v1/jobs/001XXXXXXXXXXXXXXX/results").then((state) => {
  state.mapping = state.data.map((d) => ({ name: d.name, id: d.extId }));
  return state;
});
```

* * *


### http.post {#http_post}

<p><code>post(path, body, [options]) ⇒ Operation</code></p>

Send a POST request to salesforce server configured in `state.configuration`.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The Salesforce API endpoint. |
| body | <code>object</code> | A JSON Object request body. |
| [options] | [<code>SimpleRequestOptions</code>](#simplerequestoptions) | Configure headers and query parameters for the request. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | API response data. Can be either an object or array of objects |
| references | History of all previous states |
**Example:** POST request to Salesforce
```js
http.post("/jobs/query", {
  operation: "query",
  query: "SELECT Id, Name FROM Account LIMIT 1000",
});
```

* * *


### http.request {#http_request}

<p><code>request(path, [options]) ⇒ Operation</code></p>

Send a request to salesforce server configured in `state.configuration`.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The Salesforce API endpoint. |
| [options] | [<code>FullRequestOptions</code>](#fullrequestoptions) | Configure headers, query and body parameters for the request. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | API response data. Can be either an object or array of objects |
| references | History of all previous states |
**Example:** Make a POST request to a custom Salesforce flow
```js
http.request("/actions/custom/flow/POC_OpenFN_Test_Flow", {
  method: "POST",
  body: { inputs: [{}] },
});
```

* * *


## util

These functions belong to the util namespace.
### util.toUTF8 {#util_toUTF8}

<p><code>toUTF8(input) ⇒ string</code></p>

Transliterates unicode characters to their best ASCII representation

**Returns**: <code>string</code> - - ASCII representation of input string  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | A string with unicode characters |

**Example:** Transliterate `άνθρωποι` to `anthropoi`
```js
fn((state) => {
  const s = util.toUTF8("άνθρωποι");
  console.log(s); // anthropoi
  return state;
});
```

* * *


##  Interfaces

### BulkOptions

Options provided to the Salesforce bulk API request

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| extIdField | <code>string</code> |  | External id field. Required for upsert. |
| [allowNoOp] | <code>boolean</code> | <code>false</code> | Skipping bulk operation if no records. |
| [failOnError] | <code>boolean</code> | <code>false</code> | Fail the operation on error. |
| [pollTimeout] | <code>integer</code> | <code>240000</code> | Polling timeout in milliseconds. |
| [pollInterval] | <code>integer</code> | <code>6000</code> | Polling interval in milliseconds. |


* * *

### BulkQueryOptions

Options provided to the Salesforce bulk query API request

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [pollTimeout] | <code>integer</code> | <code>90000</code> | Polling timeout in milliseconds. |
| [pollInterval] | <code>integer</code> | <code>3000</code> | Polling interval in milliseconds. |


* * *

### FullRequestOptions

Options provided to the Salesforce HTTP request

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [method] | <code>string</code> | <code>&quot;GET&quot;</code> | HTTP method to use. |
| headers | <code>object</code> |  | Object of request headers. |
| query | <code>object</code> |  | Object request query. |
| body | <code>object</code> |  | Object request body. |


* * *

### SalesforceResultState

State object

**Properties**

| Name | Description |
| --- | --- |
| data | Summary of the response from Salesforce |
| data.success | `true` if Salesforce reports no errors from the operation |
| data.completed | Array of ids for every successful completion |
| data.errors | Array of errors reported by Salesforce |
| references | History of all previous states |


* * *

### SimpleRequestOptions
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| headers | <code>object</code> | Object of request headers. |
| query | <code>object</code> | Object of request query. |


* * *

