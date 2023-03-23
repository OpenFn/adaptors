## Modules

<dl>
<dt><a href="#module_FakeAdaptor">FakeAdaptor</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#relationship">relationship(relationshipName, externalId, dataSource)</a> ⇒ <code>object</code></dt>
<dd><p>Adds a lookup relation or &#39;dome insert&#39; to a record.</p>
</dd>
<dt><a href="#describeAll">describeAll()</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Outputs basic information about available sObjects.</p>
</dd>
<dt><a href="#describe">describe(sObject)</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Outputs basic information about an sObject to <code>STDOUT</code>.</p>
</dd>
<dt><a href="#retrieve">retrieve(sObject, id, callback)</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Retrieves a Salesforce sObject(s).</p>
</dd>
<dt><a href="#query">query(qs)</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Execute an SOQL query.
Note that in an event of a query error,
error logs will be printed but the operation will not throw the error.</p>
</dd>
<dt><a href="#bulk">bulk(sObject, operation, options, fun)</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Create and execute a bulk job.</p>
</dd>
<dt><a href="#destroy">destroy(sObject, attrs, options)</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Delete records of an object.</p>
</dd>
<dt><a href="#create">create(sObject, attrs)</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Create a new object.</p>
</dd>
<dt><a href="#createIf">createIf(logical, sObject, attrs)</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Create a new object if conditions are met.</p>
</dd>
<dt><a href="#upsert">upsert(sObject, externalId, attrs)</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Upsert an object.</p>
</dd>
<dt><a href="#upsertIf">upsertIf(logical, sObject, externalId, attrs)</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Upsert if conditions are met.</p>
</dd>
<dt><a href="#update">update(sObject, attrs)</a> ⇒ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Update an object.</p>
</dd>
<dt><a href="#reference">reference(position)</a> ⇒ <code><a href="#State">State</a></code></dt>
<dd><p>Get a reference ID by an index.</p>
</dd>
<dt><a href="#createConnection">createConnection(state)</a> ⇒ <code><a href="#State">State</a></code></dt>
<dd><p>Creates a connection.</p>
</dd>
<dt><a href="#login">login(state)</a> ⇒ <code><a href="#State">State</a></code></dt>
<dd><p>Performs a login.</p>
</dd>
<dt><a href="#execute">execute(operations)</a> ⇒ <code><a href="#State">State</a></code></dt>
<dd><p>Executes an operation.</p>
</dd>
<dt><a href="#cleanupState">cleanupState(state)</a> ⇒ <code><a href="#State">State</a></code></dt>
<dd><p>Removes unserializable keys from the state.</p>
</dd>
<dt><a href="#steps">steps()</a> ⇒ <code>Array</code></dt>
<dd><p>Flattens an array of operations.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#State">State</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Operation">Operation</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="module_FakeAdaptor"></a>

## FakeAdaptor
<a name="relationship"></a>

## relationship(relationshipName, externalId, dataSource) ⇒ <code>object</code>
Adds a lookup relation or 'dome insert' to a record.

**Kind**: global function  
**Access**: public  

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
<a name="describeAll"></a>

## describeAll() ⇒ [<code>Operation</code>](#Operation)
Outputs basic information about available sObjects.

**Kind**: global function  
**Access**: public  
**Example**  
```js
describeAll()
```
<a name="describe"></a>

## describe(sObject) ⇒ [<code>Operation</code>](#Operation)
Outputs basic information about an sObject to `STDOUT`.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | API name of the sObject. |

**Example**  
```js
describe('obj_name')
```
<a name="retrieve"></a>

## retrieve(sObject, id, callback) ⇒ [<code>Operation</code>](#Operation)
Retrieves a Salesforce sObject(s).

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sObject | <code>String</code> | The sObject to retrieve |
| id | <code>String</code> | The id of the record |
| callback | <code>function</code> | A callback to execute once the record is retrieved |

**Example**  
```js
retrieve('ContentVersion', '0684K0000020Au7QAE/VersionData');
```
<a name="query"></a>

## query(qs) ⇒ [<code>Operation</code>](#Operation)
Execute an SOQL query.
Note that in an event of a query error,
error logs will be printed but the operation will not throw the error.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| qs | <code>String</code> | A query string. |

**Example**  
```js
query(`SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`);
```
<a name="bulk"></a>

## bulk(sObject, operation, options, fun) ⇒ [<code>Operation</code>](#Operation)
Create and execute a bulk job.

**Kind**: global function  
**Access**: public  

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
<a name="destroy"></a>

## destroy(sObject, attrs, options) ⇒ [<code>Operation</code>](#Operation)
Delete records of an object.

**Kind**: global function  
**Access**: public  

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
<a name="create"></a>

## create(sObject, attrs) ⇒ [<code>Operation</code>](#Operation)
Create a new object.

**Kind**: global function  
**Access**: public  

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
<a name="createIf"></a>

## createIf(logical, sObject, attrs) ⇒ [<code>Operation</code>](#Operation)
Create a new object if conditions are met.

**Kind**: global function  
**Access**: public  

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
<a name="upsert"></a>

## upsert(sObject, externalId, attrs) ⇒ [<code>Operation</code>](#Operation)
Upsert an object.

**Kind**: global function  
**Access**: public  
**Magic**: sObject - $.children[?(!@.meta.system)].name  
**Magic**: externalId - $.children[?(@.name=="{{args.sObject}}")].children[?(@.meta.externalId)].name  
**Magic**: attrs - $.children[?(@.name=="{{args.sObject}}")].children[?(!@.meta.externalId)]  

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
<a name="upsertIf"></a>

## upsertIf(logical, sObject, externalId, attrs) ⇒ [<code>Operation</code>](#Operation)
Upsert if conditions are met.

**Kind**: global function  
**Access**: public  

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
<a name="update"></a>

## update(sObject, attrs) ⇒ [<code>Operation</code>](#Operation)
Update an object.

**Kind**: global function  
**Access**: public  

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
<a name="reference"></a>

## reference(position) ⇒ [<code>State</code>](#State)
Get a reference ID by an index.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | Position for references array. |

**Example**  
```js
reference(0)
```
<a name="createConnection"></a>

## createConnection(state) ⇒ [<code>State</code>](#State)
Creates a connection.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>State</code>](#State) | Runtime state. |

**Example**  
```js
createConnection(state)
```
<a name="login"></a>

## login(state) ⇒ [<code>State</code>](#State)
Performs a login.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>State</code>](#State) | Runtime state. |

**Example**  
```js
login(state)
```
<a name="execute"></a>

## execute(operations) ⇒ [<code>State</code>](#State)
Executes an operation.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| operations | [<code>Operation</code>](#Operation) | Operations |

<a name="cleanupState"></a>

## cleanupState(state) ⇒ [<code>State</code>](#State)
Removes unserializable keys from the state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | [<code>State</code>](#State) | 

**Example**  
```js
cleanupState(state)
```
<a name="steps"></a>

## steps() ⇒ <code>Array</code>
Flattens an array of operations.

**Kind**: global function  
**Example**  
```js
steps(
  createIf(params),
  update(params)
)
```
<a name="State"></a>

## State : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | JSON Data. |
| references | <code>Array.&lt;Reference&gt;</code> | History of all previous operations. |

<a name="Operation"></a>

## Operation : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| state | [<code>State</code>](#State) | 

