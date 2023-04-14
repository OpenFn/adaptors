## Functions

<dl>
<dt><a href="#addRowsToRefs">addRowsToRefs(state, rows)</a> ⇒ <code>State</code></dt>
<dd><p>Sets the returned rows from a query as the first item in the state.references
array, leaving state.data unchanged between operations.</p>
</dd>
<dt><a href="#cleanupState">cleanupState(state)</a> ⇒ <code>State</code></dt>
<dd><p>Removes unserializable keys from the state.</p>
</dd>
<dt><a href="#createConnection">createConnection(state)</a> ⇒ <code>State</code></dt>
<dd><p>Creates a connection.</p>
</dd>
<dt><a href="#describeTable">describeTable(tableName, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>List the columns of a table in a database.</p>
</dd>
<dt><a href="#findValue">findValue(filter)</a> ⇒ <code>Operation</code></dt>
<dd><p>Fetch a uuid key given a condition</p>
</dd>
<dt><a href="#flattenRows">flattenRows(state, rows)</a> ⇒ <code>State</code></dt>
<dd><p>Returns a flatten object of the rows (array of arrays) with rowCount.</p>
</dd>
<dt><a href="#insert">insert(table, record, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert a record</p>
</dd>
<dt><a href="#insertMany">insertMany(table, records, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert many records, using the keys of the first as the column template</p>
</dd>
<dt><a href="#insertTable">insertTable(tableName, columns, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a table in database when given an array of columns and a table_name.</p>
</dd>
<dt><a href="#modifyTable">modifyTable(tableName, columns, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Alter an existing table in the database.</p>
</dd>
<dt><a href="#sql">sql(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute an SQL statement</p>
</dd>
<dt><a href="#upsert">upsert(table, uuid, record, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert or update a record using SQL MERGE</p>
</dd>
<dt><a href="#upsertIf">upsertIf(logical, table, uuid, record, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert or update a record based on a logical condition using ON CONFLICT UPDATE</p>
</dd>
<dt><a href="#upsertMany">upsertMany(table, uuid, records, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert or update multiple records using ON CONFLICT UPDATE and excluded</p>
</dd>
</dl>

<a name="addRowsToRefs"></a>

## addRowsToRefs(state, rows) ⇒ <code>State</code>
Sets the returned rows from a query as the first item in the state.references
array, leaving state.data unchanged between operations.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>State</code></td><td></td>
    </tr><tr>
    <td>rows</td><td><code>array</code></td><td><p>the array of rows returned from the sql query</p>
</td>
    </tr>  </tbody>
</table>


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

<a name="describeTable"></a>

## describeTable(tableName, options) ⇒ <code>Operation</code>
List the columns of a table in a database.

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
    <td>tableName</td><td><code>string</code></td><td><p>The name of the table to describe</p>
</td>
    </tr><tr>
    <td>options</td><td><code>object</code></td><td><p>Optional options argument</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
describeTable('clinic_visits')
```

* * *

<a name="findValue"></a>

## findValue(filter) ⇒ <code>Operation</code>
Fetch a uuid key given a condition

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
    <td>filter</td><td><code>object</code></td><td><p>A filter object with the lookup table, a uuid and the condition</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
findValue({
   uuid: 'id',
   relation: 'users',
   where: { first_name: 'Mama%', last_name: 'Cisse'},
   operator: { first_name: 'like', last_name: '='}
 })
```

* * *

<a name="flattenRows"></a>

## flattenRows(state, rows) ⇒ <code>State</code>
Returns a flatten object of the rows (array of arrays) with rowCount.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>State</code></td><td></td>
    </tr><tr>
    <td>rows</td><td><code>array</code></td><td><p>the array of rows returned from the sql query</p>
</td>
    </tr>  </tbody>
</table>


* * *

<a name="insert"></a>

## insert(table, record, options) ⇒ <code>Operation</code>
Insert a record

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
    <td>table</td><td><code>string</code></td><td><p>The target table</p>
</td>
    </tr><tr>
    <td>record</td><td><code>object</code></td><td><p>Payload data for the record as a JS object</p>
</td>
    </tr><tr>
    <td>options</td><td><code>object</code></td><td><p>Optional options argument</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
insert(table, record, {setNull: ["'undefined'", "''"], logValues: false})
```

* * *

<a name="insertMany"></a>

## insertMany(table, records, options) ⇒ <code>Operation</code>
Insert many records, using the keys of the first as the column template

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
    <td>table</td><td><code>string</code></td><td><p>The target table</p>
</td>
    </tr><tr>
    <td>records</td><td><code>function</code></td><td><p>A function that takes state and returns an array of records</p>
</td>
    </tr><tr>
    <td>options</td><td><code>object</code></td><td><p>Optional options argument</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
insertMany(table, records, { setNull: false, writeSql: true, logValues: false })
```

* * *

<a name="insertTable"></a>

## insertTable(tableName, columns, options) ⇒ <code>Operation</code>
Create a table in database when given an array of columns and a table_name.

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
    <td>tableName</td><td><code>string</code></td><td><p>The name of the table to create</p>
</td>
    </tr><tr>
    <td>columns</td><td><code>array</code></td><td><p>An array of form columns</p>
</td>
    </tr><tr>
    <td>options</td><td><code>object</code></td><td><p>Optional options argument</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
insertTable('table_name', state => state.data.map(
  column => ({
    name: column.name,
    type: column.type,
    required: true, // optional
    unique: false, // optional - to be set to true for unique constraint
  })
));
```

* * *

<a name="modifyTable"></a>

## modifyTable(tableName, columns, options) ⇒ <code>Operation</code>
Alter an existing table in the database.

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
    <td>tableName</td><td><code>string</code></td><td><p>The name of the table to alter</p>
</td>
    </tr><tr>
    <td>columns</td><td><code>array</code></td><td><p>An array of form columns</p>
</td>
    </tr><tr>
    <td>options</td><td><code>object</code></td><td><p>Optional options argument</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
modifyTable('table_name', state => state.data.map(
  newColumn => ({
    name: newColumn.name,
    type: newColumn.type,
    required: true, // optional
    unique: false, // optional - to be set to true for unique constraint
  })
));
```

* * *

<a name="sql"></a>

## sql(params) ⇒ <code>Operation</code>
Execute an SQL statement

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
    <td>params</td><td><code>object</code></td><td><p>Payload data for the message</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
sql({ query, options })
```

* * *

<a name="upsert"></a>

## upsert(table, uuid, record, options) ⇒ <code>Operation</code>
Insert or update a record using SQL MERGE

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
    <td>table</td><td><code>string</code></td><td><p>The target table</p>
</td>
    </tr><tr>
    <td>uuid</td><td><code>string</code></td><td><p>The uuid column to determine a matching/existing record</p>
</td>
    </tr><tr>
    <td>record</td><td><code>object</code></td><td><p>Payload data for the record as a JS object</p>
</td>
    </tr><tr>
    <td>options</td><td><code>object</code></td><td><p>Optional options argument</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
upsert(table, uuid, record, { setNull: "'undefined'", logValues: false})
upsert(table, [uuid1, uuid2], record, { setNull: "'undefined'", logValues: false})
```

* * *

<a name="upsertIf"></a>

## upsertIf(logical, table, uuid, record, options) ⇒ <code>Operation</code>
Insert or update a record based on a logical condition using ON CONFLICT UPDATE

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
    <td>logical</td><td><code>string</code></td><td><p>a data to check existing value for.</p>
</td>
    </tr><tr>
    <td>table</td><td><code>string</code></td><td><p>The target table</p>
</td>
    </tr><tr>
    <td>uuid</td><td><code>string</code></td><td><p>The uuid column to determine a matching/existing record</p>
</td>
    </tr><tr>
    <td>record</td><td><code>object</code></td><td><p>Payload data for the record as a JS object or function</p>
</td>
    </tr><tr>
    <td>options</td><td><code>object</code></td><td><p>Optional options argument</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
upsertIf(
  dataValue('name'),
  'users', // the DB table
  'uuid', // a DB column with a unique constraint
  { name: 'Elodie', id: 7 },
  { writeSql:true, execute: true, logValues: false }
)
```

* * *

<a name="upsertMany"></a>

## upsertMany(table, uuid, records, options) ⇒ <code>Operation</code>
Insert or update multiple records using ON CONFLICT UPDATE and excluded

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
    <td>table</td><td><code>string</code></td><td><p>The target table</p>
</td>
    </tr><tr>
    <td>uuid</td><td><code>string</code></td><td><p>The uuid column to determine a matching/existing record</p>
</td>
    </tr><tr>
    <td>records</td><td><code>function</code></td><td><p>A function that takes state and returns an array of records</p>
</td>
    </tr><tr>
    <td>options</td><td><code>object</code></td><td><p>Optional options argument</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
upsertMany(
 'users', 'email', records, { logValues: false }
)
upsertMany(
 'users', ['email', 'phone'], records, { logValues: false }
)
```

* * *

