## Functions

<dl>
<dt>
    <a href="#bulk">bulk(sObject, operation, options, fun)</a></dt>
<dt>
    <a href="#bulkquery">bulkQuery(qs, options, callback)</a></dt>
<dt>
    <a href="#cleanupstate">cleanupState(state)</a></dt>
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
    <a href="#execute">execute(operations)</a></dt>
<dt>
    <a href="#query">query(qs)</a></dt>
<dt>
    <a href="#reference">reference(position)</a></dt>
<dt>
    <a href="#relationship">relationship(relationshipName, externalId, dataSource)</a></dt>
<dt>
    <a href="#request">request(url, options, callback)</a></dt>
<dt>
    <a href="#retrieve">retrieve(sObject, id, callback)</a></dt>
<dt>
    <a href="#steps">steps()</a></dt>
<dt>
    <a href="#toutf8">toUTF8(input)</a></dt>
<dt>
    <a href="#update">update(sObject, attrs)</a></dt>
<dt>
    <a href="#upsert">upsert(sObject, externalId, attrs)</a></dt>
<dt>
    <a href="#upsertif">upsertIf(logical, sObject, externalId, attrs)</a></dt>
</dl>


## bulk

bulk(sObject, operation, options, fun) ⇒ <code>Operation</code>

Create and execute a bulk job.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| operation | <code>String</code> | The bulk operation to be performed |
| options | <code>Object</code> | Options passed to the bulk api. |
| fun | <code>function</code> | A function which takes state and returns an array. |

**Example**  
```js
bulk('Patient__c', 'insert', { failOnError: true, pollInterval: 3000, pollTimeout: 240000 }, state => {
  return state.data.someArray.map(x => {
    return { 'Age__c': x.age, 'Name': x.name }
  })
});
```

* * *

## bulkQuery

bulkQuery(qs, options, callback) ⇒ <code>Operation</code>

Execute an SOQL Bulk Query.
This function uses bulk query to efficiently query large data sets and reduce the number of API requests.
Note that in an event of a query error,
error logs will be printed but the operation will not throw the error.


| Param | Type | Description |
| --- | --- | --- |
| qs | <code>String</code> | A query string. |
| options | <code>Object</code> | Options passed to the bulk api. |
| [options.pollTimeout] | <code>integer</code> | Polling timeout in milliseconds. |
| [options.pollInterval] | <code>integer</code> | Polling interval in milliseconds. |
| callback | <code>function</code> | A callback to execute once the record is retrieved |

**Example** *(The results will be available on &#x60;state.data&#x60;)*  
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

## cleanupState

cleanupState(state) ⇒ <code>State</code>

Removes unserializable keys from the state.


| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
cleanupState(state)
```

* * *

## create

create(sObject, attrs) ⇒ <code>Operation</code>

Create a new object.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| attrs | <code>Object</code> | Field attributes for the new object. |

**Example**  
```js
create('obj_name', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

## createIf

createIf(logical, sObject, attrs) ⇒ <code>Operation</code>

Create a new object if conditions are met.


| Param | Type | Description |
| --- | --- | --- |
| logical | <code>boolean</code> | a logical statement that will be evaluated. |
| sObject | <code>String</code> | API name of the sObject. |
| attrs | <code>Object</code> | Field attributes for the new object. |

**Example**  
```js
createIf(true, 'obj_name', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

## describe

describe(sObject) ⇒ <code>Operation</code>

Outputs basic information about an sObject to `STDOUT`.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |

**Example**  
```js
describe('obj_name')
```

* * *

## describeAll

describeAll() ⇒ <code>Operation</code>

Outputs basic information about available sObjects.

**Example**  
```js
describeAll()
```

* * *

## destroy

destroy(sObject, attrs, options) ⇒ <code>Operation</code>

Delete records of an object.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| attrs | <code>Object</code> | Array of IDs of records to delete. |
| options | <code>Object</code> | Options for the destroy delete operation. |

**Example**  
```js
destroy('obj_name', [
 '0060n00000JQWHYAA5',
 '0090n00000JQEWHYAA5
], { failOnError: true })
```

* * *

## execute

execute(operations) ⇒ <code>State</code>

Executes an operation.


| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operation</code> | Operations |


* * *

## query

query(qs) ⇒ <code>Operation</code>

Execute an SOQL query.
Note that in an event of a query error,
error logs will be printed but the operation will not throw the error.


| Param | Type | Description |
| --- | --- | --- |
| qs | <code>String</code> | A query string. |

**Example**  
```js
query(`SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`);
```

* * *

## reference

reference(position) ⇒ <code>State</code>

Get a reference ID by an index.


| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | Position for references array. |

**Example**  
```js
reference(0)
```

* * *

## relationship

relationship(relationshipName, externalId, dataSource) ⇒ <code>object</code>

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

## request

request(url, options, callback) ⇒ <code>Operation</code>

Send a HTTP request using connected session information.


| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | Relative or absolute URL to request from |
| options | <code>Object</code> | Request options |
| [options.method] | <code>String</code> | HTTP method to use. Defaults to GET |
| [options.headers] | <code>Object</code> | Object of request headers |
| [options.json] | <code>Object</code> | A JSON Object request body |
| [options.body] | <code>String</code> | HTTP body (in POST/PUT/PATCH methods) |
| callback | <code>function</code> | A callback to execute once the request is complete |

**Example**  
```js
request('/actions/custom/flow/POC_OpenFN_Test_Flow', {
  method: 'POST',
  json: { inputs: [{}] },
});
```

* * *

## retrieve

retrieve(sObject, id, callback) ⇒ <code>Operation</code>

Retrieves a Salesforce sObject(s).


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | The sObject to retrieve |
| id | <code>String</code> | The id of the record |
| callback | <code>function</code> | A callback to execute once the record is retrieved |

**Example**  
```js
retrieve('ContentVersion', '0684K0000020Au7QAE/VersionData');
```

* * *

## steps

steps() ⇒ <code>Array</code>

Flattens an array of operations.

**Example**  
```js
steps(
  createIf(params),
  update(params)
)
```

* * *

## toUTF8

toUTF8(input) ⇒ <code>String</code>

Transliterates unicode characters to their best ASCII representation

**Returns**: <code>String</code> - - ASCII representation of input string  

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

## update

update(sObject, attrs) ⇒ <code>Operation</code>

Update an object.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| attrs | <code>Object</code> | Field attributes for the new object. |

**Example**  
```js
update('obj_name', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

## upsert

upsert(sObject, externalId, attrs) ⇒ <code>Operation</code>

Upsert an object.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| externalId | <code>String</code> | ID. |
| attrs | <code>Object</code> | Field attributes for the new object. |

**Example**  
```js
upsert('obj_name', 'ext_id', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

## upsertIf

upsertIf(logical, sObject, externalId, attrs) ⇒ <code>Operation</code>

Upsert if conditions are met.


| Param | Type | Description |
| --- | --- | --- |
| logical | <code>boolean</code> | a logical statement that will be evaluated. |
| sObject | <code>String</code> | API name of the sObject. |
| externalId | <code>String</code> | ID. |
| attrs | <code>Object</code> | Field attributes for the new object. |

**Example**  
```js
upsertIf(true, 'obj_name', 'ext_id', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

