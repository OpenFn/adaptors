<dl>
<dt>
    <a href="#bulk">bulk(sObject, operation, options, records)</a></dt>
<dt>
    <a href="#bulkquery">bulkQuery(qs, options, callback)</a></dt>
<dt>
    <a href="#create">create(sObject, attrs)</a></dt>
<dt>
    <a href="#createif">createIf(logical, sObject, attrs)</a></dt>
<dt>
    <a href="#describe">describe(sObject)</a></dt>
<dt>
    <a href="#describeall">describeAll()</a></dt>
<dt>
    <a href="#destroy">destroy(sObject, attrs, options)</a></dt>
<dt>
    <a href="#insert">insert(sObject, attrs)</a></dt>
<dt>
    <a href="#query">query(qs, options, callback)</a></dt>
<dt>
    <a href="#reference">reference(position)</a></dt>
<dt>
    <a href="#relationship">relationship(relationshipName, externalId, dataSource)</a></dt>
<dt>
    <a href="#retrieve">retrieve(sObject, id, callback)</a></dt>
<dt>
    <a href="#toutf8">toUTF8(input)</a></dt>
<dt>
    <a href="#update">update(sObject, attrs)</a></dt>
<dt>
    <a href="#upsert">upsert(sObject, externalId, attrs)</a></dt>
<dt>
    <a href="#upsertif">upsertIf(logical, sObject, externalId, attrs)</a></dt>
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
    <a href="/adaptors/packages/common-docs#beta">beta</a>
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
    <a href="/adaptors/packages/common-docs#http">http</a>
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
### bulk

<p><code>bulk(sObject, operation, options, records) ⇒ Operation</code></p>

Create and execute a bulk job.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sObject | <code>string</code> |  | API name of the sObject. |
| operation | <code>string</code> |  | The bulk operation to be performed.Eg "insert" | "update" | "upsert" |
| options | <code>object</code> |  | Options passed to the bulk api. |
| [options.pollTimeout] | <code>integer</code> | <code>240000</code> | Polling timeout in milliseconds. |
| [options.pollInterval] | <code>integer</code> | <code>6000</code> | Polling interval in milliseconds. |
| [options.extIdField] | <code>string</code> |  | External id field. |
| [options.failOnError] | <code>boolean</code> | <code>false</code> | Fail the operation on error. |
| records | <code>array</code> |  | an array of records, or a function which returns an array. |

**Example:** Bulk insert
```js
bulk(
  "Patient__c",
  "insert",
  { failOnError: true },
  (state) => state.someArray.map((x) => ({ Age__c: x.age, Name: x.name }))
);
```
**Example:** Bulk upsert
```js
bulk(
  "vera__Beneficiary__c",
  "upsert",
  { extIdField: "vera__Result_UID__c" },
  [
    {
      vera__Reporting_Period__c: 2023,
      vera__Geographic_Area__c: "Uganda",
      "vera__Indicator__r.vera__ExtId__c": 1001,
      vera__Result_UID__c: "1001_2023_Uganda",
    },
  ]
);
```

* * *

### bulkQuery

<p><code>bulkQuery(qs, options, callback) ⇒ Operation</code></p>

Execute an SOQL Bulk Query.
This function uses bulk query to efficiently query large data sets and reduce the number of API requests.
`bulkQuery()` uses [Bulk API v.2.0 Query](https://sforce.co/4azgczz) which is available in API version 47.0 and later.
This API is subject to [rate limits](https://sforce.co/4b6kn6z).


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| qs | <code>string</code> |  | A query string. |
| options | <code>object</code> |  | Options passed to the bulk api. |
| [options.pollTimeout] | <code>integer</code> | <code>90000</code> | Polling timeout in milliseconds. |
| [options.pollInterval] | <code>integer</code> | <code>3000</code> | Polling interval in milliseconds. |
| callback | <code>function</code> |  | A callback to execute once the record is retrieved |

**Example:** The results will be available on &#x60;state.data&#x60;
```js
bulkQuery(state=> `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`);
```
**Example**
```js
bulkQuery(
  (state) =>
    `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`,
  { pollTimeout: 10000, pollInterval: 6000 }
);
```

* * *

### create

<p><code>create(sObject, attrs) ⇒ Operation</code></p>

Create a new sObject record(s).


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | API name of the sObject. |
| attrs | <code>object</code> | Field attributes for the new record. |

**Example:**  Single record creation
```js
create("Account", { Name: "My Account #1" });
```
**Example:**  Multiple records creation
```js
create("Account",[{ Name: "My Account #1" }, { Name: "My Account #2" }]);
```

* * *

### createIf

<p><code>createIf(logical, sObject, attrs) ⇒ Operation</code></p>

Create a new sObject if conditions are met.

**The `createIf()` function has been deprecated. Use `fnIf(condition,create())` instead.**


| Param | Type | Description |
| --- | --- | --- |
| logical | <code>boolean</code> | a logical statement that will be evaluated. |
| sObject | <code>string</code> | API name of the sObject. |
| attrs | <code>object</code> \| <code>Array.&lt;object&gt;</code> | Field attributes for the new object. |

**Example**
```js
createIf(true, 'obj_name', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

### describe

<p><code>describe(sObject) ⇒ Operation</code></p>

Prints an sObject metadata and pushes the result to state.references


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | API name of the sObject. |

**Example**
```js
describe('obj_name')
```

* * *

### describeAll

<p><code>describeAll() ⇒ Operation</code></p>

Prints the total number of all available sObjects and pushes the result to `state.references`.

**Example**
```js
describeAll()
```

* * *

### destroy

<p><code>destroy(sObject, attrs, options) ⇒ Operation</code></p>

Delete records of an object.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | API name of the sObject. |
| attrs | <code>object</code> | Array of IDs of records to delete. |
| options | <code>object</code> | Options for the destroy delete operation. |

**Example**
```js
destroy('obj_name', [
 '0060n00000JQWHYAA5',
 '0090n00000JQEWHYAA5
], { failOnError: true })
```

* * *

### insert

<p><code>insert(sObject, attrs) ⇒ Operation</code></p>

Alias for "create(sObject, attrs)".


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | API name of the sObject. |
| attrs | <code>object</code> | Field attributes for the new record. |

**Example:**  Single record creation
```js
insert("Account", { Name: "My Account #1" });
```
**Example:**  Multiple records creation
```js
insert("Account",[{ Name: "My Account #1" }, { Name: "My Account #2" }]);
```

* * *

### query

<p><code>query(qs, options, callback) ⇒ Operation</code></p>

Execute an SOQL query.
Note that in an event of a query error,
error logs will be printed but the operation will not throw the error.

The Salesforce query API is subject to rate limits, [See for more details](https://sforce.co/3W9zyaQ).


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| qs | <code>string</code> |  | A query string. Must be less than `4000` characters in WHERE clause |
| options | <code>object</code> |  | Options passed to the bulk api. |
| [options.autoFetch] | <code>boolean</code> | <code>false</code> | Fetch next records if available. |
| callback | <code>function</code> |  | A callback to execute once the record is retrieved |

**Example**
```js
query(state=> `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`);
```
**Example:** Query more records if next records are available
```js
query(state=> `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`, { autoFetch: true });
```

* * *

### reference

<p><code>reference(position) ⇒ State</code></p>

Get a reference ID by an index.


| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | Position for references array. |

**Example**
```js
reference(0)
```

* * *

### relationship

<p><code>relationship(relationshipName, externalId, dataSource) ⇒ object</code></p>

Adds a lookup relation or 'dome insert' to a record.


| Param | Type | Description |
| --- | --- | --- |
| relationshipName | <code>string</code> | `__r` relationship field on the record. |
| externalId | <code>string</code> | Salesforce ExternalID field. |
| dataSource | <code>string</code> | resolvable source. |

**Example**
```js
Data Sourced Value:
 relationship("relationship_name__r", "externalID on related object", dataSource("path"))
Fixed Value:
 relationship("relationship_name__r", "externalID on related object", "hello world")
```

* * *

### retrieve

<p><code>retrieve(sObject, id, callback) ⇒ Operation</code></p>

Retrieves a Salesforce sObject(s).


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | The sObject to retrieve |
| id | <code>string</code> | The id of the record |
| callback | <code>function</code> | A callback to execute once the record is retrieved |

**Example**
```js
retrieve('ContentVersion', '0684K0000020Au7QAE/VersionData');
```

* * *

### toUTF8

<p><code>toUTF8(input) ⇒ string</code></p>

Transliterates unicode characters to their best ASCII representation

**Returns**: <code>string</code> - - ASCII representation of input string  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | A string with unicode characters |

**Example**
```js
fn((state) => {
  const s = toUTF8("άνθρωποι");
  console.log(s); // anthropoi
  return state;
});
```

* * *

### update

<p><code>update(sObject, attrs) ⇒ Operation</code></p>

Update an sObject record or records.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | API name of the sObject. |
| attrs | <code>object</code> \| <code>Array.&lt;object&gt;</code> | Field attributes for the new object. |

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

* * *

### upsert

<p><code>upsert(sObject, externalId, attrs) ⇒ Operation</code></p>

Create a new sObject record, or updates it if it already exists
External ID field name must be specified in second argument.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>string</code> | API name of the sObject. |
| externalId | <code>string</code> | The external ID of the sObject. |
| attrs | <code>object</code> \| <code>Array.&lt;object&gt;</code> | Field attributes for the new object. |

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

* * *

### upsertIf

<p><code>upsertIf(logical, sObject, externalId, attrs) ⇒ Operation</code></p>

Conditionally create a new sObject record, or updates it if it already exists

**The `upsertIf()` function has been deprecated. Use `fnIf(condition,upsert())` instead.**


| Param | Type | Description |
| --- | --- | --- |
| logical | <code>boolean</code> | a logical statement that will be evaluated. |
| sObject | <code>string</code> | API name of the sObject. |
| externalId | <code>string</code> | ID. |
| attrs | <code>object</code> \| <code>Array.&lt;object&gt;</code> | Field attributes for the new object. |

**Example**
```js
upsertIf(true, 'obj_name', 'ext_id', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *


