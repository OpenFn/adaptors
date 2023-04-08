## Functions

<dl>
<dt>
    <a href="#addRowsToRefs">addRowsToRefs(state, rows)</a></dt>
<dt>
    <a href="#cleanupState">cleanupState(state)</a></dt>
<dt>
    <a href="#createConnection">createConnection(state)</a></dt>
<dt>
    <a href="#describeTable">describeTable(tableName, options)</a></dt>
<dt>
    <a href="#findValue">findValue(filter)</a></dt>
<dt>
    <a href="#flattenRows">flattenRows(state, rows)</a></dt>
<dt>
    <a href="#insert">insert(table, record, options)</a></dt>
<dt>
    <a href="#insertMany">insertMany(table, records, options)</a></dt>
<dt>
    <a href="#insertTable">insertTable(tableName, columns, options)</a></dt>
<dt>
    <a href="#modifyTable">modifyTable(tableName, columns, options)</a></dt>
<dt>
    <a href="#sql">sql(params)</a></dt>
<dt>
    <a href="#upsert">upsert(table, uuid, record, options)</a></dt>
<dt>
    <a href="#upsertIf">upsertIf(logical, table, uuid, record, options)</a></dt>
<dt>
    <a href="#upsertMany">upsertMany(table, uuid, records, options)</a></dt>
</dl>

## addRowsToRefs

addRowsToRefs(state, rows) ⇒ <code>State</code>
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

## cleanupState

cleanupState(state) ⇒ <code>State</code>
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

## createConnection

createConnection(state) ⇒ <code>State</code>
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

## describeTable

describeTable(tableName, options) ⇒ <code>Operation</code>
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

## findValue

findValue(filter) ⇒ <code>Operation</code>
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

## flattenRows

flattenRows(state, rows) ⇒ <code>State</code>
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

## insert

insert(table, record, options) ⇒ <code>Operation</code>
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

## insertMany

insertMany(table, records, options) ⇒ <code>Operation</code>
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

## insertTable

insertTable(tableName, columns, options) ⇒ <code>Operation</code>
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

## modifyTable

modifyTable(tableName, columns, options) ⇒ <code>Operation</code>
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

## sql

sql(params) ⇒ <code>Operation</code>
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

## upsert

upsert(table, uuid, record, options) ⇒ <code>Operation</code>
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

## upsertIf

upsertIf(logical, table, uuid, record, options) ⇒ <code>Operation</code>
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

## upsertMany

upsertMany(table, uuid, records, options) ⇒ <code>Operation</code>
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

