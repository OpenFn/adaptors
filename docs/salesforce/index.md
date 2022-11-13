## Modules

<dl>
<dt><a href="#module_Adaptor">Adaptor</a></dt>
<dd></dd>
<dt><a href="#module_FakeAdaptor">FakeAdaptor</a></dt>
<dd></dd>
</dl>

<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * _static_
        * [.relationship](#module_Adaptor.relationship)
            * [new exports.relationship(relationshipName, externalId, dataSource)](#new_module_Adaptor.relationship_new)
        * [.describeAll](#module_Adaptor.describeAll)
            * [new exports.describeAll(state)](#new_module_Adaptor.describeAll_new)
        * [.describe](#module_Adaptor.describe)
            * [new exports.describe(sObject, state)](#new_module_Adaptor.describe_new)
        * [.retrieve](#module_Adaptor.retrieve)
            * [new exports.retrieve(sObject, id, callback, state)](#new_module_Adaptor.retrieve_new)
        * [.query](#module_Adaptor.query)
            * [new exports.query(qs, state)](#new_module_Adaptor.query_new)
        * [.bulk](#module_Adaptor.bulk)
            * [new exports.bulk(sObject, operation, options, fun, state)](#new_module_Adaptor.bulk_new)
        * [.destroy](#module_Adaptor.destroy)
            * [new exports.destroy(sObject, attrs, options, state)](#new_module_Adaptor.destroy_new)
        * [.create](#module_Adaptor.create)
            * [new exports.create(sObject, attrs, state)](#new_module_Adaptor.create_new)
        * [.createIf](#module_Adaptor.createIf)
            * [new exports.createIf(logical, sObject, attrs, state)](#new_module_Adaptor.createIf_new)
        * [.upsert](#module_Adaptor.upsert)
            * [new exports.upsert(sObject, externalId, attrs, state)](#new_module_Adaptor.upsert_new)
        * [.upsertIf](#module_Adaptor.upsertIf)
            * [new exports.upsertIf(logical, sObject, externalId, attrs, state)](#new_module_Adaptor.upsertIf_new)
        * [.update](#module_Adaptor.update)
            * [new exports.update(sObject, attrs, state)](#new_module_Adaptor.update_new)
        * [.reference](#module_Adaptor.reference)
            * [new exports.reference(position, state)](#new_module_Adaptor.reference_new)
        * [.execute(operations)](#module_Adaptor.execute) ⇒ <code>State</code>
        * [.steps()](#module_Adaptor.steps) ⇒ <code>Array</code>
    * _inner_
        * [~createConnection(state)](#module_Adaptor..createConnection) ⇒ <code>State</code>
        * [~login(state)](#module_Adaptor..login) ⇒ <code>State</code>
        * [~cleanupState(state)](#module_Adaptor..cleanupState) ⇒ <code>State</code>
        * [~State](#module_Adaptor..State) : <code>Object</code>
        * [~Operation](#module_Adaptor..Operation) : <code>function</code>

<a name="module_Adaptor.relationship"></a>

### Adaptor.relationship
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.relationship_new"></a>

#### new exports.relationship(relationshipName, externalId, dataSource)
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
<a name="module_Adaptor.describeAll"></a>

### Adaptor.describeAll
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.describeAll_new"></a>

#### new exports.describeAll(state)
Outputs basic information about available sObjects.


| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
describeAll()
```
<a name="module_Adaptor.describe"></a>

### Adaptor.describe
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.describe_new"></a>

#### new exports.describe(sObject, state)
Outputs basic information about an sObject to `STDOUT`.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
describe('obj_name')
```
<a name="module_Adaptor.retrieve"></a>

### Adaptor.retrieve
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.retrieve_new"></a>

#### new exports.retrieve(sObject, id, callback, state)
Retrieves a Salesforce sObject(s).


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | The sObject to retrieve |
| id | <code>String</code> | The id of the record |
| callback | <code>function</code> | A callback to execute once the record is retrieved |
| state | <code>State</code> | Runtime state |

**Example**  
```js
retrieve('ContentVersion', '0684K0000020Au7QAE/VersionData');
```
<a name="module_Adaptor.query"></a>

### Adaptor.query
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.query_new"></a>

#### new exports.query(qs, state)
Execute an SOQL query.
Note that in an event of a query error,
error logs will be printed but the operation will not throw the error.


| Param | Type | Description |
| --- | --- | --- |
| qs | <code>String</code> | A query string. |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
query(`SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`);
```
<a name="module_Adaptor.bulk"></a>

### Adaptor.bulk
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.bulk_new"></a>

#### new exports.bulk(sObject, operation, options, fun, state)
Create and execute a bulk job.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| operation | <code>String</code> | The bulk operation to be performed |
| options | <code>Object</code> | Options passed to the bulk api. |
| fun | <code>function</code> | A function which takes state and returns an array. |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
bulk('Patient__c', 'insert', { failOnError: true, pollInterval: 3000, pollTimeout: 240000 }, state => {
  return state.data.someArray.map(x => {
    return { 'Age__c': x.age, 'Name': x.name }
  })
});
```
<a name="module_Adaptor.destroy"></a>

### Adaptor.destroy
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.destroy_new"></a>

#### new exports.destroy(sObject, attrs, options, state)
Delete records of an object.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| attrs | <code>Object</code> | Array of IDs of records to delete. |
| options | <code>Object</code> | Options for the destroy delete operation. |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
destroy('obj_name', [
 '0060n00000JQWHYAA5',
 '0090n00000JQEWHYAA5
], { failOnError: true })
```
<a name="module_Adaptor.create"></a>

### Adaptor.create
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.create_new"></a>

#### new exports.create(sObject, attrs, state)
Create a new object.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| attrs | <code>Object</code> | Field attributes for the new object. |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
create('obj_name', {
  attr1: "foo",
  attr2: "bar"
})
```
<a name="module_Adaptor.createIf"></a>

### Adaptor.createIf
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.createIf_new"></a>

#### new exports.createIf(logical, sObject, attrs, state)
Create a new object if conditions are met.


| Param | Type | Description |
| --- | --- | --- |
| logical | <code>boolean</code> | a logical statement that will be evaluated. |
| sObject | <code>String</code> | API name of the sObject. |
| attrs | <code>Object</code> | Field attributes for the new object. |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
createIf(true, 'obj_name', {
  attr1: "foo",
  attr2: "bar"
})
```
<a name="module_Adaptor.upsert"></a>

### Adaptor.upsert
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.upsert_new"></a>

#### new exports.upsert(sObject, externalId, attrs, state)
Upsert an object.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| externalId | <code>String</code> | ID. |
| attrs | <code>Object</code> | Field attributes for the new object. |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
upsert('obj_name', 'ext_id', {
  attr1: "foo",
  attr2: "bar"
})
```
<a name="module_Adaptor.upsertIf"></a>

### Adaptor.upsertIf
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.upsertIf_new"></a>

#### new exports.upsertIf(logical, sObject, externalId, attrs, state)
Upsert if conditions are met.


| Param | Type | Description |
| --- | --- | --- |
| logical | <code>boolean</code> | a logical statement that will be evaluated. |
| sObject | <code>String</code> | API name of the sObject. |
| externalId | <code>String</code> | ID. |
| attrs | <code>Object</code> | Field attributes for the new object. |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
upsertIf(true, 'obj_name', 'ext_id', {
  attr1: "foo",
  attr2: "bar"
})
```
<a name="module_Adaptor.update"></a>

### Adaptor.update
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.update_new"></a>

#### new exports.update(sObject, attrs, state)
Update an object.


| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |
| attrs | <code>Object</code> | Field attributes for the new object. |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
update('obj_name', {
  attr1: "foo",
  attr2: "bar"
})
```
<a name="module_Adaptor.reference"></a>

### Adaptor.reference
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.reference_new"></a>

#### new exports.reference(position, state)
Get a reference ID by an index.


| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | Position for references array. |
| state | <code>State</code> | Array of references. |

**Example**  
```js
reference(0)
```
<a name="module_Adaptor.execute"></a>

### Adaptor.execute(operations) ⇒ <code>State</code>
Executes an operation.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operation</code> | Operations |

<a name="module_Adaptor.steps"></a>

### Adaptor.steps() ⇒ <code>Array</code>
Flattens an array of operations.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
**Example**  
```js
steps(
  createIf(params),
  update(params)
)
```
<a name="module_Adaptor..createConnection"></a>

### Adaptor~createConnection(state) ⇒ <code>State</code>
Creates a connection.

**Kind**: inner method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
createConnection(state)
```
<a name="module_Adaptor..login"></a>

### Adaptor~login(state) ⇒ <code>State</code>
Performs a login.

**Kind**: inner method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
login(state)
```
<a name="module_Adaptor..cleanupState"></a>

### Adaptor~cleanupState(state) ⇒ <code>State</code>
Removes unserializable keys from the state.

**Kind**: inner method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
cleanupState(state)
```
<a name="module_Adaptor..State"></a>

### Adaptor~State : <code>Object</code>
**Kind**: inner typedef of [<code>Adaptor</code>](#module_Adaptor)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | JSON Data. |
| references | <code>Array.&lt;Reference&gt;</code> | History of all previous operations. |

<a name="module_Adaptor..Operation"></a>

### Adaptor~Operation : <code>function</code>
**Kind**: inner typedef of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

<a name="module_FakeAdaptor"></a>

## FakeAdaptor
