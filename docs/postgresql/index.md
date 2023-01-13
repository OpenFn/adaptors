## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for postgresql.</p>
</dd>
<dt><a href="#sql">sql(sqlQuery, options)</a> ⇒ <code>Operation</code></dt>
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
<dd><p>Insert or update a record using ON CONFLICT UPDATE</p>
</dd>
<dt><a href="#upsertIf">upsertIf(logical, table, uuid, record, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert or update a record based on a logical condition using ON CONFLICT UPDATE</p>
</dd>
<dt><a href="#upsertMany">upsertMany(table, uuid, data, options)</a> ⇒ <code>Operation</code></dt>
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

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for postgresql.

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
<a name="sql"></a>

## sql(sqlQuery, options) ⇒ <code>Operation</code>
Execute an SQL statement

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sqlQuery | <code>function</code> | a function which takes state and returns a string of SQL. |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
sql(state => `select(*) from ${state.data.tableName};`, { writeSql: true })
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
   where: { first_name: 'Mamadou' },
   operator: { first_name: 'like' }
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
| record | <code>object</code> | Payload data for the record as a JS object or function |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
insert('users', { name: 'Elodie', id: 7 }, { setNull: "'NaN'", logValues: true });
```
<a name="insertMany"></a>

## insertMany(table, records, options) ⇒ <code>Operation</code>
Insert many records, using the keys of the first as the column template

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| records | <code>array</code> | An array or a function that takes state and returns an array |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
insertMany('users', state => state.data.recordArray, { setNull: "'undefined'", logValues: true });
```
<a name="upsert"></a>

## upsert(table, uuid, record, options) ⇒ <code>Operation</code>
Insert or update a record using ON CONFLICT UPDATE

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| record | <code>object</code> | Payload data for the record as a JS object or function |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
upsert(
  'users', // the DB table
  'ON CONSTRAINT users_pkey', // a DB column with a unique constraint OR a CONSTRAINT NAME
  { name: 'Elodie', id: 7 },
  { setNull: ["''", "'undefined'"], writeSql:true, execute: true, logValues: true }
)
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
  'ON CONSTRAINT users_pkey', // a DB column with a unique constraint OR a CONSTRAINT NAME
  { name: 'Elodie', id: 7 },
  { writeSql:true, execute: true }
)
```
<a name="upsertMany"></a>

## upsertMany(table, uuid, data, options) ⇒ <code>Operation</code>
Insert or update multiple records using ON CONFLICT UPDATE and excluded

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| data | <code>array</code> | An array of objects or a function that returns an array |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
upsertMany(
  'users', // the DB table
  'email', // a DB column with a unique constraint OR a CONSTRAINT NAME
  [
    { name: 'one', email: 'one@openfn.org },
    { name: 'two', email: 'two@openfn.org },
  ]
 { logValues: true }
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
