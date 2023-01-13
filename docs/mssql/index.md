## Functions

<dl>
<dt><a href="#createConnection">createConnection(state)</a> ⇒ <code>State</code></dt>
<dd><p>Creates a connection.</p>
</dd>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for mssql.</p>
</dd>
<dt><a href="#cleanupState">cleanupState(state)</a> ⇒ <code>State</code></dt>
<dd><p>Removes unserializable keys from the state.</p>
</dd>
<dt><a href="#addRowsToRefs">addRowsToRefs(state, rows)</a> ⇒ <code>State</code></dt>
<dd><p>Sets the returned rows from a query as the first item in the state.references
array, leaving state.data unchanged between operations.</p>
</dd>
<dt><a href="#flattenRows">flattenRows(state, rows)</a> ⇒ <code>State</code></dt>
<dd><p>Returns a flatten object of the rows (array of arrays) with rowCount.</p>
</dd>
<dt><a href="#sql">sql(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute an SQL statement</p>
</dd>
<dt><a href="#findValue">findValue(filter)</a> ⇒ <code>Operation</code></dt>
<dd><p>Fetch a uuid key given a condition</p>
</dd>
<dt><a href="#insert">insert(table, record, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert a record</p>
</dd>
<dt><a href="#insertMany">insertMany(table, records, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert many records, using the keys of the first as the column template</p>
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
<dt><a href="#describeTable">describeTable(tableName, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>List the columns of a table in a database.</p>
</dd>
<dt><a href="#insertTable">insertTable(tableName, columns, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a table in database when given an array of columns and a table_name.</p>
</dd>
<dt><a href="#modifyTable">modifyTable(tableName, columns, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Alter an existing table in the database.</p>
</dd>
</dl>

<a name="createConnection"></a>

## createConnection(state) ⇒ <code>State</code>
Creates a connection.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
createConnection(state)
```
<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for mssql.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
execute(
  create('foo'),
  delete('bar')
)(state)
```
<a name="cleanupState"></a>

## cleanupState(state) ⇒ <code>State</code>
Removes unserializable keys from the state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
cleanupState(state)
```
<a name="addRowsToRefs"></a>

## addRowsToRefs(state, rows) ⇒ <code>State</code>
Sets the returned rows from a query as the first item in the state.references
array, leaving state.data unchanged between operations.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> |  |
| rows | <code>array</code> | the array of rows returned from the sql query |

<a name="flattenRows"></a>

## flattenRows(state, rows) ⇒ <code>State</code>
Returns a flatten object of the rows (array of arrays) with rowCount.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> |  |
| rows | <code>array</code> | the array of rows returned from the sql query |

<a name="sql"></a>

## sql(params) ⇒ <code>Operation</code>
Execute an SQL statement

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Payload data for the message |

**Example**  
```js
sql({ query, options })
```
<a name="findValue"></a>

## findValue(filter) ⇒ <code>Operation</code>
Fetch a uuid key given a condition

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | A filter object with the lookup table, a uuid and the condition |

**Example**  
```js
findValue({
   uuid: 'id',
   relation: 'users',
   where: { first_name: 'Mama%', last_name: 'Cisse'},
   operator: { first_name: 'like', last_name: '='}
 })
```
<a name="insert"></a>

## insert(table, record, options) ⇒ <code>Operation</code>
Insert a record

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| record | <code>object</code> | Payload data for the record as a JS object |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
insert(table, record, {setNull: ["'undefined'", "''"], logValues: false})
```
<a name="insertMany"></a>

## insertMany(table, records, options) ⇒ <code>Operation</code>
Insert many records, using the keys of the first as the column template

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| records | <code>function</code> | A function that takes state and returns an array of records |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
insertMany(table, records, { setNull: false, writeSql: true, logValues: false })
```
<a name="upsert"></a>

## upsert(table, uuid, record, options) ⇒ <code>Operation</code>
Insert or update a record using SQL MERGE

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| record | <code>object</code> | Payload data for the record as a JS object |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
upsert(table, uuid, record, { setNull: "'undefined'", logValues: false})
upsert(table, [uuid1, uuid2], record, { setNull: "'undefined'", logValues: false})
```
<a name="upsertIf"></a>

## upsertIf(logical, table, uuid, record, options) ⇒ <code>Operation</code>
Insert or update a record based on a logical condition using ON CONFLICT UPDATE

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| logical | <code>string</code> | a data to check existing value for. |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| record | <code>object</code> | Payload data for the record as a JS object or function |
| options | <code>object</code> | Optional options argument |

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
<a name="upsertMany"></a>

## upsertMany(table, uuid, records, options) ⇒ <code>Operation</code>
Insert or update multiple records using ON CONFLICT UPDATE and excluded

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| records | <code>function</code> | A function that takes state and returns an array of records |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
upsertMany(
 'users', 'email', records, { logValues: false }
)
upsertMany(
 'users', ['email', 'phone'], records, { logValues: false }
)
```
<a name="describeTable"></a>

## describeTable(tableName, options) ⇒ <code>Operation</code>
List the columns of a table in a database.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to describe |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
describeTable('clinic_visits')
```
<a name="insertTable"></a>

## insertTable(tableName, columns, options) ⇒ <code>Operation</code>
Create a table in database when given an array of columns and a table_name.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to create |
| columns | <code>array</code> | An array of form columns |
| options | <code>object</code> | Optional options argument |

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
<a name="modifyTable"></a>

## modifyTable(tableName, columns, options) ⇒ <code>Operation</code>
Alter an existing table in the database.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to alter |
| columns | <code>array</code> | An array of form columns |
| options | <code>object</code> | Optional options argument |

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
