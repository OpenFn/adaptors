<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute](#module_Adaptor.execute)
        * [new exports.execute(operations)](#new_module_Adaptor.execute_new)
    * [.sql](#module_Adaptor.sql)
        * [new exports.sql(sqlQuery, options)](#new_module_Adaptor.sql_new)
    * [.findValue](#module_Adaptor.findValue)
        * [new exports.findValue(filter)](#new_module_Adaptor.findValue_new)
    * [.insert](#module_Adaptor.insert)
        * [new exports.insert(table, record, options)](#new_module_Adaptor.insert_new)
    * [.insertMany](#module_Adaptor.insertMany)
        * [new exports.insertMany(table, records, options)](#new_module_Adaptor.insertMany_new)
    * [.upsert](#module_Adaptor.upsert)
        * [new exports.upsert(table, uuid, record, options)](#new_module_Adaptor.upsert_new)
    * [.upsertIf](#module_Adaptor.upsertIf)
        * [new exports.upsertIf(logical, table, uuid, record, options)](#new_module_Adaptor.upsertIf_new)
    * [.upsertMany](#module_Adaptor.upsertMany)
        * [new exports.upsertMany(table, uuid, data, options)](#new_module_Adaptor.upsertMany_new)
    * [.describeTable](#module_Adaptor.describeTable)
        * [new exports.describeTable(tableName, options)](#new_module_Adaptor.describeTable_new)
    * [.insertTable](#module_Adaptor.insertTable)
        * [new exports.insertTable(tableName, columns, options)](#new_module_Adaptor.insertTable_new)
    * [.modifyTable](#module_Adaptor.modifyTable)
        * [new exports.modifyTable(tableName, columns, options)](#new_module_Adaptor.modifyTable_new)

<a name="module_Adaptor.execute"></a>

### Adaptor.execute
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.execute_new"></a>

#### new exports.execute(operations)
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for postgresql.


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
<a name="module_Adaptor.sql"></a>

### Adaptor.sql
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.sql_new"></a>

#### new exports.sql(sqlQuery, options)
Execute an SQL statement


| Param | Type | Description |
| --- | --- | --- |
| sqlQuery | <code>function</code> | a function which takes state and returns a string of SQL. |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
sql(state => `select(*) from ${state.data.tableName};`, { writeSql: true })
```
<a name="module_Adaptor.findValue"></a>

### Adaptor.findValue
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.findValue_new"></a>

#### new exports.findValue(filter)
Fetch a uuid key given a condition


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
<a name="module_Adaptor.insert"></a>

### Adaptor.insert
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.insert_new"></a>

#### new exports.insert(table, record, options)
Insert a record


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| record | <code>object</code> | Payload data for the record as a JS object or function |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
insert('users', { name: 'Elodie', id: 7 }, { setNull: "'NaN'", logValues: true });
```
<a name="module_Adaptor.insertMany"></a>

### Adaptor.insertMany
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.insertMany_new"></a>

#### new exports.insertMany(table, records, options)
Insert many records, using the keys of the first as the column template


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| records | <code>array</code> | An array or a function that takes state and returns an array |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
insertMany('users', state => state.data.recordArray, { setNull: "'undefined'", logValues: true });
```
<a name="module_Adaptor.upsert"></a>

### Adaptor.upsert
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.upsert_new"></a>

#### new exports.upsert(table, uuid, record, options)
Insert or update a record using ON CONFLICT UPDATE


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
<a name="module_Adaptor.upsertIf"></a>

### Adaptor.upsertIf
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.upsertIf_new"></a>

#### new exports.upsertIf(logical, table, uuid, record, options)
Insert or update a record based on a logical condition using ON CONFLICT UPDATE


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
<a name="module_Adaptor.upsertMany"></a>

### Adaptor.upsertMany
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.upsertMany_new"></a>

#### new exports.upsertMany(table, uuid, data, options)
Insert or update multiple records using ON CONFLICT UPDATE and excluded


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
<a name="module_Adaptor.describeTable"></a>

### Adaptor.describeTable
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.describeTable_new"></a>

#### new exports.describeTable(tableName, options)
List the columns of a table in a database.


| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to describe |
| options | <code>object</code> | Optional options argument |

**Example**  
```js
describeTable('clinic_visits')
```
<a name="module_Adaptor.insertTable"></a>

### Adaptor.insertTable
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.insertTable_new"></a>

#### new exports.insertTable(tableName, columns, options)
Create a table in database when given an array of columns and a table_name.


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
<a name="module_Adaptor.modifyTable"></a>

### Adaptor.modifyTable
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.modifyTable_new"></a>

#### new exports.modifyTable(tableName, columns, options)
Alter an existing table in the database.


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
