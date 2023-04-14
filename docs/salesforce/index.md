## Functions

<dl>
<dt><a href="#bulk">bulk(sObject, operation, options, fun)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create and execute a bulk job.</p>
</dd>
<dt><a href="#cleanupState">cleanupState(state)</a> ⇒ <code>State</code></dt>
<dd><p>Removes unserializable keys from the state.</p>
</dd>
<dt><a href="#create">create(sObject, attrs)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a new object.</p>
</dd>
<dt><a href="#createConnection">createConnection(state)</a> ⇒ <code>State</code></dt>
<dd><p>Creates a connection.</p>
</dd>
<dt><a href="#createIf">createIf(logical, sObject, attrs)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a new object if conditions are met.</p>
</dd>
<dt><a href="#describe">describe(sObject)</a> ⇒ <code>Operation</code></dt>
<dd><p>Outputs basic information about an sObject to <code>STDOUT</code>.</p>
</dd>
<dt><a href="#describeAll">describeAll()</a> ⇒ <code>Operation</code></dt>
<dd><p>Outputs basic information about available sObjects.</p>
</dd>
<dt><a href="#destroy">destroy(sObject, attrs, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Delete records of an object.</p>
</dd>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>State</code></dt>
<dd><p>Executes an operation.</p>
</dd>
<dt><a href="#login">login(state)</a> ⇒ <code>State</code></dt>
<dd><p>Performs a login.</p>
</dd>
<dt><a href="#query">query(qs)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute an SOQL query.
Note that in an event of a query error,
error logs will be printed but the operation will not throw the error.</p>
</dd>
<dt><a href="#reference">reference(position)</a> ⇒ <code>State</code></dt>
<dd><p>Get a reference ID by an index.</p>
</dd>
<dt><a href="#relationship">relationship(relationshipName, externalId, dataSource)</a> ⇒ <code>object</code></dt>
<dd><p>Adds a lookup relation or &#39;dome insert&#39; to a record.</p>
</dd>
<dt><a href="#retrieve">retrieve(sObject, id, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Retrieves a Salesforce sObject(s).</p>
</dd>
<dt><a href="#steps">steps()</a> ⇒ <code>Array</code></dt>
<dd><p>Flattens an array of operations.</p>
</dd>
<dt><a href="#update">update(sObject, attrs)</a> ⇒ <code>Operation</code></dt>
<dd><p>Update an object.</p>
</dd>
<dt><a href="#upsert">upsert(sObject, externalId, attrs)</a> ⇒ <code>Operation</code></dt>
<dd><p>Upsert an object.</p>
</dd>
<dt><a href="#upsertIf">upsertIf(logical, sObject, externalId, attrs)</a> ⇒ <code>Operation</code></dt>
<dd><p>Upsert if conditions are met.</p>
</dd>
</dl>

<a name="bulk"></a>

## bulk(sObject, operation, options, fun) ⇒ <code>Operation</code>
Create and execute a bulk job.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>sObject</td><td><code>String</code></td><td><p>API name of the sObject.</p>
</td>
    </tr><tr>
    <td>operation</td><td><code>String</code></td><td><p>The bulk operation to be performed</p>
</td>
    </tr><tr>
    <td>options</td><td><code>Object</code></td><td><p>Options passed to the bulk api.</p>
</td>
    </tr><tr>
    <td>fun</td><td><code>function</code></td><td><p>A function which takes state and returns an array.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
bulk('Patient__c', 'insert', { failOnError: true, pollInterval: 3000, pollTimeout: 240000 }, state => {
  return state.data.someArray.map(x => {
    return { 'Age__c': x.age, 'Name': x.name }
  })
});
```

* * *

<a name="cleanupState"></a>

## cleanupState(state) ⇒ <code>State</code>
Removes unserializable keys from the state.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>State</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
cleanupState(state)
```

* * *

<a name="create"></a>

## create(sObject, attrs) ⇒ <code>Operation</code>
Create a new object.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>sObject</td><td><code>String</code></td><td><p>API name of the sObject.</p>
</td>
    </tr><tr>
    <td>attrs</td><td><code>Object</code></td><td><p>Field attributes for the new object.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
create('obj_name', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

<a name="createConnection"></a>

## createConnection(state) ⇒ <code>State</code>
Creates a connection.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>State</code></td><td><p>Runtime state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
createConnection(state)
```

* * *

<a name="createIf"></a>

## createIf(logical, sObject, attrs) ⇒ <code>Operation</code>
Create a new object if conditions are met.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>logical</td><td><code>boolean</code></td><td><p>a logical statement that will be evaluated.</p>
</td>
    </tr><tr>
    <td>sObject</td><td><code>String</code></td><td><p>API name of the sObject.</p>
</td>
    </tr><tr>
    <td>attrs</td><td><code>Object</code></td><td><p>Field attributes for the new object.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
createIf(true, 'obj_name', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

<a name="describe"></a>

## describe(sObject) ⇒ <code>Operation</code>
Outputs basic information about an sObject to `STDOUT`.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>sObject</td><td><code>String</code></td><td><p>API name of the sObject.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
describe('obj_name')
```

* * *

<a name="describeAll"></a>

## describeAll() ⇒ <code>Operation</code>
Outputs basic information about available sObjects.

**Kind**: global function  
**Access**: public  
**Example**  
```js
describeAll()
```

* * *

<a name="destroy"></a>

## destroy(sObject, attrs, options) ⇒ <code>Operation</code>
Delete records of an object.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>sObject</td><td><code>String</code></td><td><p>API name of the sObject.</p>
</td>
    </tr><tr>
    <td>attrs</td><td><code>Object</code></td><td><p>Array of IDs of records to delete.</p>
</td>
    </tr><tr>
    <td>options</td><td><code>Object</code></td><td><p>Options for the destroy delete operation.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
destroy('obj_name', [
 '0060n00000JQWHYAA5',
 '0090n00000JQEWHYAA5
], { failOnError: true })
```

* * *

<a name="execute"></a>

## execute(operations) ⇒ <code>State</code>
Executes an operation.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>operations</td><td><code>Operation</code></td><td><p>Operations</p>
</td>
    </tr>  </tbody>
</table>


* * *

<a name="login"></a>

## login(state) ⇒ <code>State</code>
Performs a login.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>State</code></td><td><p>Runtime state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
login(state)
```

* * *

<a name="query"></a>

## query(qs) ⇒ <code>Operation</code>
Execute an SOQL query.
Note that in an event of a query error,
error logs will be printed but the operation will not throw the error.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>qs</td><td><code>String</code></td><td><p>A query string.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
query(`SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`);
```

* * *

<a name="reference"></a>

## reference(position) ⇒ <code>State</code>
Get a reference ID by an index.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>position</td><td><code>number</code></td><td><p>Position for references array.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
reference(0)
```

* * *

<a name="relationship"></a>

## relationship(relationshipName, externalId, dataSource) ⇒ <code>object</code>
Adds a lookup relation or 'dome insert' to a record.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>relationshipName</td><td><code>string</code></td><td><p><code>__r</code> relationship field on the record.</p>
</td>
    </tr><tr>
    <td>externalId</td><td><code>string</code></td><td><p>Salesforce ExternalID field.</p>
</td>
    </tr><tr>
    <td>dataSource</td><td><code>string</code></td><td><p>resolvable source.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
Data Sourced Value:
 relationship("relationship_name__r", "externalID on related object", dataSource("path"))
Fixed Value:
 relationship("relationship_name__r", "externalID on related object", "hello world")
```

* * *

<a name="retrieve"></a>

## retrieve(sObject, id, callback) ⇒ <code>Operation</code>
Retrieves a Salesforce sObject(s).

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>sObject</td><td><code>String</code></td><td><p>The sObject to retrieve</p>
</td>
    </tr><tr>
    <td>id</td><td><code>String</code></td><td><p>The id of the record</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>A callback to execute once the record is retrieved</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
retrieve('ContentVersion', '0684K0000020Au7QAE/VersionData');
```

* * *

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

* * *

<a name="update"></a>

## update(sObject, attrs) ⇒ <code>Operation</code>
Update an object.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>sObject</td><td><code>String</code></td><td><p>API name of the sObject.</p>
</td>
    </tr><tr>
    <td>attrs</td><td><code>Object</code></td><td><p>Field attributes for the new object.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
update('obj_name', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

<a name="upsert"></a>

## upsert(sObject, externalId, attrs) ⇒ <code>Operation</code>
Upsert an object.

**Kind**: global function  
**Access**: public  
**Magic**: sObject - $.children[?(!@.meta.system)].name  
**Magic**: externalId - $.children[?(@.name=="{{args.sObject}}")].children[?(@.meta.externalId)].name  
**Magic**: attrs - $.children[?(@.name=="{{args.sObject}}")].children[?(!@.meta.externalId)]  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>sObject</td><td><code>String</code></td><td><p>API name of the sObject.</p>
</td>
    </tr><tr>
    <td>externalId</td><td><code>String</code></td><td><p>ID.</p>
</td>
    </tr><tr>
    <td>attrs</td><td><code>Object</code></td><td><p>Field attributes for the new object.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
upsert('obj_name', 'ext_id', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

<a name="upsertIf"></a>

## upsertIf(logical, sObject, externalId, attrs) ⇒ <code>Operation</code>
Upsert if conditions are met.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>logical</td><td><code>boolean</code></td><td><p>a logical statement that will be evaluated.</p>
</td>
    </tr><tr>
    <td>sObject</td><td><code>String</code></td><td><p>API name of the sObject.</p>
</td>
    </tr><tr>
    <td>externalId</td><td><code>String</code></td><td><p>ID.</p>
</td>
    </tr><tr>
    <td>attrs</td><td><code>Object</code></td><td><p>Field attributes for the new object.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
upsertIf(true, 'obj_name', 'ext_id', {
  attr1: "foo",
  attr2: "bar"
})
```

* * *

