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

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> |  |
| rows | <code>array</code> | the array of rows returned from the sql query |


* * *

## cleanupState

cleanupState(state) ⇒ <code>State</code>
Removes unserializable keys from the state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
cleanupState(state)
```

* * *

## createConnection

createConnection(state) ⇒ <code>State</code>
Creates a connection.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

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

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to describe |
| options | <code>object</code> | Optional options argument |

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

* * *

## flattenRows

flattenRows(state, rows) ⇒ <code>State</code>
Returns a flatten object of the rows (array of arrays) with rowCount.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> |  |
| rows | <code>array</code> | the array of rows returned from the sql query |


* * *

## insert

insert(table, record, options) ⇒ <code>Operation</code>
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

* * *

## insertMany

insertMany(table, records, options) ⇒ <code>Operation</code>
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

* * *

## insertTable

insertTable(tableName, columns, options) ⇒ <code>Operation</code>
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

* * *

## modifyTable

modifyTable(tableName, columns, options) ⇒ <code>Operation</code>
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

* * *

## sql

sql(params) ⇒ <code>Operation</code>
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

* * *

## upsert

upsert(table, uuid, record, options) ⇒ <code>Operation</code>
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

* * *

## upsertIf

upsertIf(logical, table, uuid, record, options) ⇒ <code>Operation</code>
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

* * *

## upsertMany

upsertMany(table, uuid, records, options) ⇒ <code>Operation</code>
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

* * *

