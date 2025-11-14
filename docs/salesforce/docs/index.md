<dl>
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
    <a href="#bulk1_destroy">bulk1.destroy(sObject, records, [options])</a>
</dt>

<dt>
    <a href="#bulk1_insert">bulk1.insert(sObject, records, [options])</a>
</dt>

<dt>
    <a href="#bulk1_query">bulk1.query(query)</a>
</dt>

<dt>
    <a href="#bulk1_update">bulk1.update(sObject, records, [options])</a>
</dt>

<dt>
    <a href="#bulk1_upsert">bulk1.upsert(sObject, externalIdFieldName, records, options)</a>
</dt>

<dt>
    <a href="#bulk2_destroy">bulk2.destroy(sObject, records, [options])</a>
</dt>

<dt>
    <a href="#bulk2_insert">bulk2.insert(sObject, records, [options])</a>
</dt>

<dt>
    <a href="#bulk2_query">bulk2.query(query, options)</a>
</dt>

<dt>
    <a href="#bulk2_update">bulk2.update(sObject, records, [options])</a>
</dt>

<dt>
    <a href="#bulk2_upsert">bulk2.upsert(sObject, externalIdFieldName, records, [options])</a>
</dt>

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
    <a href="/adaptors/packages/common-docs#alterstate">alterState</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#arraytostring">arrayToString()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
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
    <a href="/adaptors/packages/common-docs#map">map()</a>
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


## bulk1

These functions belong to the bulk1 namespace.
### bulk1.destroy {#bulk1_destroy}

<p><code>destroy(sObject, records, [options]) ⇒ Operation</code></p>

Bulk deletes records using Salesforce Bulk API 1.0


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | The Salesforce object type |
| records | <code>Array</code> | Array of records to delete (must include Id field) |
| [options] | [<code>Bulk1Options</code>](#bulk1options) | Bulk delete options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The processed records or results from the bulk load operation |
| data.successfulResults | Array of successful results |
| data.failedResults | Array of failed results |
| data.unprocessedRecords | Array of unprocessed records |
| references | Array of previous state data objects used in the job |

**Example:** Delete multiple records
```js
bulk1.delete('Account', [{ Id: '001xx' }]);
```
**Example:** Bulk delete continue on error
```js
bulk1.delete('Account', [{ Id: '001xx' }], {
  pollInterval: 3000,
  failOnError: false
});
```

* * *


### bulk1.insert {#bulk1_insert}

<p><code>insert(sObject, records, [options]) ⇒ Operation</code></p>

Bulk inserts records using Salesforce Bulk API 1.0


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | The Salesforce object type |
| records | <code>Array</code> | Array of records to insert |
| [options] | [<code>Bulk1Options</code>](#bulk1options) | Bulk insert options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The processed records or results from the bulk load operation |
| data.successfulResults | Array of successful results |
| data.failedResults | Array of failed results |
| data.unprocessedRecords | Array of unprocessed records |
| references | Array of previous state data objects used in the job |

**Example:** Insert multiple records
```js
bulk1.insert('Account', [{ Name: 'Coco' }, { Name: 'Melon' }]);
```
**Example:** Bulk insert continue on error
```js
bulk1.insert('Account', [{ Name: 'Coco' }, { Name: 'Melon' }], {
  pollInterval: 1000,
  failOnError: false
});
```

* * *


### bulk1.query {#bulk1_query}

<p><code>query(query) ⇒ Operation</code></p>

Executes a bulk query using Salesforce Bulk API 1.0


| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | SOQL query string to execute |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The processed records or query results from the Bulk API operation |
| references | Array of previous state data objects used in the job |

**Example:** Query records
```js
bulk1.query('SELECT Id, Name FROM Account');
```
**Example:** Query with custom options
```js
bulk1.query('SELECT Id, Name FROM Account', {
  pollInterval: 1000,
  pollTimeout: 24000
});
```

* * *


### bulk1.update {#bulk1_update}

<p><code>update(sObject, records, [options]) ⇒ Operation</code></p>

Bulk updates records using Salesforce Bulk API 1.0


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | The Salesforce object type |
| records | <code>Array</code> | Array of records to update |
| [options] | [<code>Bulk1Options</code>](#bulk1options) | Bulk update options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The processed records or results from the bulk load operation |
| data.successfulResults | Array of successful results |
| data.failedResults | Array of failed results |
| data.unprocessedRecords | Array of unprocessed records |
| references | Array of previous state data objects used in the job |

**Example:** Update multiple records
```js
bulk1.update('Account', [{ Id: '001xx', Name: 'Updated Name' }]);
```
**Example:** Bulk update continue on error
```js
bulk1.update('Account', [{ Id: '001xx', Name: 'Updated Name' }], {
  pollInterval: 1000,
  failOnError: false
});
```

* * *


### bulk1.upsert {#bulk1_upsert}

<p><code>upsert(sObject, externalIdFieldName, records, options) ⇒ Operation</code></p>

Bulk upserts records using Salesforce Bulk API 1.0


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | The Salesforce object type |
| externalIdFieldName | <code>string</code> | External ID field name for upsert matching |
| records | <code>Array</code> | Array of records to upsert |
| options | [<code>Bulk1Options</code>](#bulk1options) | Bulk upsert options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The processed records or results from the bulk load operation |
| data.successfulResults | Array of successful results |
| data.failedResults | Array of failed results |
| data.unprocessedRecords | Array of unprocessed records |
| references | Array of previous state data objects used in the job |

**Example:** Upsert multiple records
```js
bulk1.upsert('Account', [{ External_Id__c: 'EXT001', Name: 'Upserted Name' }], { extIdField: 'External_Id__c' });
```
**Example:** Bulk upsert continue on error
```js
bulk1.upsert('Account', [{ External_Id__c: 'EXT001', Name: 'Upserted Name' }], {
  extIdField: 'External_Id__c',
  pollInterval: 3000,
  failOnError: false
});
```

* * *


## bulk2

These functions belong to the bulk2 namespace.
### bulk2.destroy {#bulk2_destroy}

<p><code>destroy(sObject, records, [options]) ⇒ Operation</code></p>

Bulk deletes records using Salesforce Bulk API 2.0


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | The Salesforce object type |
| records | <code>Array</code> | Array of records to delete |
| [options] | [<code>Bulk2LoadOptions</code>](#bulk2loadoptions) | Bulk delete options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The processed records or results from the bulk insert operation |
| data.successfulResults | Array of successful results |
| data.failedResults | Array of failed results |
| data.unprocessedRecords | Array of unprocessed records |
| references | Array of previous state data objects used in the job |

**Example:** Bulk delete records
```js
bulk2.destroy("Account", [
  "0010500000fxbcuAAA",
  "0010500000fxbcvAAA",
]);
```
**Example:** Bulk delete records with custom polling options
```js
bulk2.destroy(
  "Account",
  [
    "0010500000fxbcuAAA",
    "0010500000fxbcvAAA",
  ],
  {
    pollInterval: 1000,
    pollTimeout: 3000,
  }
);
```
**Example:** Bulk delete records continue on error
```js
bulk2.destroy(
  "Account",
  [
    "0010500000fxbcuAAA",
    "0010500000fxbcvAAA",
  ],
  {
    failOnError: false,
  }
);
```

* * *


### bulk2.insert {#bulk2_insert}

<p><code>insert(sObject, records, [options]) ⇒ Operation</code></p>

Bulk inserts records using Salesforce Bulk API 2.0


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | The Salesforce object type |
| records | <code>Array</code> | Array of records to insert |
| [options] | [<code>Bulk2LoadOptions</code>](#bulk2loadoptions) | Bulk insert options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The processed records or results from the bulk insert operation |
| data.successfulResults | Array of successful results |
| data.failedResults | Array of failed results |
| data.unprocessedRecords | Array of unprocessed records |
| references | Array of previous state data objects used in the job |

**Example:** Bulk insert continue on error
```js
bulk2.insert('Account', [{ Name: 'Coco' }, { Name: 'Melon' }], {
  failOnError: false,
});
```
**Example:** Bulk insert with custom polling options
```js
bulk2.insert('Account', [{ Name: 'Coco' }, { Name: 'Melon' }], {
  pollInterval: 1000,
  pollTimeout: 3000,
});
```

* * *


### bulk2.query {#bulk2_query}

<p><code>query(query, options) ⇒ Operation</code></p>

Executes a bulk query using Salesforce Bulk API 2.0


| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | SOQL query string to execute |
| options | [<code>QueryOptions</code>](#queryoptions) | Query options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The processed records or query results from the Bulk API operation |
| references | Array of previous state data objects used in the job |

**Example:** Bulk query records
```js
bulk2.query('SELECT Id, Name FROM Account');
```
**Example:** Bulk query with `scanAll` enabled
```js
bulk2.query('SELECT Id, Name FROM Account', { scanAll: true });
```
**Example:** Query with custom options
```js
bulk2.query(
  'SELECT Id, Name FROM Account',
  {
    scanAll: true,
    pollInterval: 1000,
    pollTimeout: 3000,
  }
);
```

* * *


### bulk2.update {#bulk2_update}

<p><code>update(sObject, records, [options]) ⇒ Operation</code></p>

Bulk updates records using Salesforce Bulk API 2.0


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | The Salesforce object type |
| records | <code>Array</code> | Array of records to update |
| [options] | [<code>Bulk2LoadOptions</code>](#bulk2loadoptions) | Bulk update options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The processed records or results from the bulk insert operation |
| data.successfulResults | Array of successful results |
| data.failedResults | Array of failed results |
| data.unprocessedRecords | Array of unprocessed records |
| references | Array of previous state data objects used in the job |

**Example:** Bulk update records
```js
bulk2.update("Account", [
  { Id: "0010500000fxbcuAAA", Name: "Updated Account #1" },
  { Id: "0010500000fxbcvAAA", Name: "Updated Account #2" },
]);
```
**Example:** Bulk update records continue on error
```js
bulk2.update(
  "Account",
  [
    { Id: "0010500000fxbcuAAA", Name: "Updated Account #1" },
    { Id: "0010500000fxbcvAAA", Name: "Updated Account #2" },
  ],
  {
    failOnError: false,
  }
);
```

* * *


### bulk2.upsert {#bulk2_upsert}

<p><code>upsert(sObject, externalIdFieldName, records, [options]) ⇒ Operation</code></p>

Bulk upserts records using Salesforce Bulk API 2.0


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | The Salesforce object type |
| externalIdFieldName | <code>string</code> | External ID field name for upsert matching |
| records | <code>Array</code> | Array of records to upsert |
| [options] | [<code>Bulk2LoadOptions</code>](#bulk2loadoptions) | Bulk upsert options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The processed records or results from the bulk insert operation |
| data.successfulResults | Array of successful results |
| data.failedResults | Array of failed results |
| data.unprocessedRecords | Array of unprocessed records |
| references | Array of previous state data objects used in the job |

**Example:** Bulk upsert records
```js
bulk2.upsert("UpsertTable__c", "ExtId__c", [
  { Name: "Record #1", ExtId__c : 'ID-0000001' },
  { Name: "Record #2", ExtId__c : 'ID-0000002' },
]);
```
**Example:** Bulk upsert records with custom polling options
```js
bulk2.upsert(
  "UpsertTable__c",
  "ExtId__c",
  [
    { Name: "Record #1", ExtId__c : 'ID-0000001' },
    { Name: "Record #2", ExtId__c : 'ID-0000002' },
  ],
  {
    pollInterval: 1000,
    pollTimeout: 3000,
  }
);
```
**Example:** Bulk upsert records continue on error
```js
bulk2.upsert(
  "UpsertTable__c",
  "ExtId__c",
  [
    { Name: "Record #1", ExtId__c : 'ID-0000001' },
    { Name: "Record #2", ExtId__c : 'ID-0000002' },
  ],
  {
    failOnError: false,
  }
);
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

### Bulk1Options

Options for configuring Salesforce Bulk API 1.0 operations


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [allowNoOp] | <code>boolean</code> | <code>false</code> | Skipping bulk operation if no records |
| [failOnError] | <code>boolean</code> | <code>true</code> | Fail the operation on error |
| [pollTimeout] | <code>number</code> | <code>300000</code> | Polling timeout in milliseconds. Default: 300000 (30 seconds) |
| [pollInterval] | <code>number</code> | <code>6000</code> | Polling interval in milliseconds. Default: 6000 (6 seconds) |
| [concurrencyMode] | <code>boolean</code> | <code>&#x27;Parallel&#x27;</code> | Concurrency mode: 'Parallel' or 'Serial' |


* * *

### Bulk2LoadOptions

Bulk insert options


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [pollInterval] | <code>number</code> | <code>1000</code> | Polling interval in milliseconds. Default: 1000 (1 second) |
| [pollTimeout] | <code>number</code> | <code>30000</code> | Polling timeout in milliseconds. Default: 30000 (30 seconds) |
| [failOnError] | <code>boolean</code> | <code>true</code> | Fail the operation on error |


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

### QueryOptions

Options for configuring Salesforce Bulk API 2.0 queries


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [scanAll] | <code>boolean</code> | <code>false</code> | Whether to scan through all records including deleted and archived ones |
| [pollInterval] | <code>number</code> | <code>1000</code> | Polling interval in milliseconds. Default: 1000 (1 second) |
| [pollTimeout] | <code>number</code> | <code>30000</code> | Polling timeout in milliseconds. Default: 30000 (30 seconds) |


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

