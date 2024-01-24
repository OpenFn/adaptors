## Functions

<dl>
<dt>
    <a href="#describetable">describeTable(tableName, [options], callback)</a></dt>
<dt>
    <a href="#findvalue">findValue([filter])</a></dt>
<dt>
    <a href="#insert">insert(table, record, [options], callback)</a></dt>
<dt>
    <a href="#insertmany">insertMany(table, records, [options], callback)</a></dt>
<dt>
    <a href="#inserttable">insertTable(tableName, columns, [options], callback)</a></dt>
<dt>
    <a href="#modifytable">modifyTable(tableName, columns, [options], callback)</a></dt>
<dt>
    <a href="#sql">sql(sqlQuery, [options], callback)</a></dt>
<dt>
    <a href="#upsert">upsert(table, uuid, record, [options], callback)</a></dt>
<dt>
    <a href="#upsertif">upsertIf(logical, table, uuid, record, [options], callback)</a></dt>
<dt>
    <a href="#upsertmany">upsertMany(table, uuid, data, [options], callback)</a></dt>
</dl>


## describeTable

describeTable(tableName, [options], callback) ⇒ <code>Operation</code>

List the columns of a table in a database.


| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to describe |
| [options] | <code>object</code> | Optional options argument |
| [options.writeSql] | <code>boolean</code> | A boolean value that specifies whether to log the generated SQL statement. Defaults to false. |
| [options.execute] | <code>boolean</code> | A boolean value that specifies whether to execute the generated SQL statement. Defaults to false. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
describeTable('clinic_visits')
```

* * *

## findValue

findValue([filter]) ⇒ <code>value</code>

Fetch a uuid key given a condition


| Param | Type | Description |
| --- | --- | --- |
| [filter] | <code>object</code> | A filter object with the lookup table, a uuid and the condition |
| [filter.uuid] | <code>string</code> | The uuid value to search for in the specified relation. |
| [filter.relation] | <code>string</code> | The name of the relation to search for the uuid value. |
| [filter.where] | <code>object</code> | An object that contains key-value pairs to filter the search results. |
| [filter.operator] | <code>object</code> | An object that contains key-value pairs to specify the type of comparison to perform on the where clause. |

**Example**  
```js
findValue({
   uuid: 'id',
   relation: 'users',
   where: { first_name: 'Mamadou' },
   operator: { first_name: 'like' }
 })
```

* * *

## insert

insert(table, record, [options], callback) ⇒ <code>Operation</code>

Insert a record


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| record | <code>object</code> | Payload data for the record as a JS object or function |
| [options] | <code>object</code> | Optional options argument |
| [options.setNull] | <code>string</code> | A string value that specifies the behavior for inserting null values. |
| [options.logValues] | <code>boolean</code> | A boolean value that specifies whether to log the inserted values to the console. Defaults to false. |
| [options.writeSql] | <code>boolean</code> | A boolean value that specifies whether to log the generated SQL statement. Defaults to false. |
| [options.execute] | <code>boolean</code> | A boolean value that specifies whether to execute the generated SQL statement. Defaults to false. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
insert('users', { name: 'Elodie', id: 7 }, { setNull: "'NaN'", logValues: true });
```

* * *

## insertMany

insertMany(table, records, [options], callback) ⇒ <code>Operation</code>

Insert many records, using the keys of the first as the column template


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| records | <code>array</code> | An array or a function that takes state and returns an array |
| [options] | <code>object</code> | Optional options argument |
| [options.setNull] | <code>string</code> | A string value that specifies the behavior for inserting null values. |
| [options.logValues] | <code>boolean</code> | A boolean value that specifies whether to log the inserted values to the console. Defaults to false. |
| [options.writeSql] | <code>boolean</code> | A boolean value that specifies whether to log the generated SQL statement. Defaults to false. |
| [options.execute] | <code>boolean</code> | A boolean value that specifies whether to execute the generated SQL statement. Defaults to false. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
insertMany('users', state => state.data.recordArray, { setNull: "'undefined'", logValues: true });
```

* * *

## insertTable

insertTable(tableName, columns, [options], callback) ⇒ <code>Operation</code>

Create a table in database when given an array of columns and a table_name.


| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to create |
| columns | <code>array</code> | An array of form columns |
| [options] | <code>object</code> | Optional options argument |
| [options.writeSql] | <code>boolean</code> | A boolean value that specifies whether to log the generated SQL statement. Defaults to false. |
| [options.execute] | <code>boolean</code> | A boolean value that specifies whether to execute the generated SQL statement. Defaults to false. |
| callback | <code>function</code> | (Optional) callback function |

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

modifyTable(tableName, columns, [options], callback) ⇒ <code>Operation</code>

Alter an existing table in the database.


| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to alter |
| columns | <code>array</code> | An array of form columns |
| [options] | <code>object</code> | Optional options argument |
| [options.writeSql] | <code>boolean</code> | A boolean value that specifies whether to log the generated SQL statement. Defaults to false. |
| [options.execute] | <code>boolean</code> | A boolean value that specifies whether to execute the generated SQL statement. Defaults to false. |
| callback | <code>function</code> | (Optional) callback function |

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

sql(sqlQuery, [options], callback) ⇒ <code>Operation</code>

Execute an SQL statement


| Param | Type | Description |
| --- | --- | --- |
| sqlQuery | <code>function</code> | a function which takes state and returns a string of SQL. |
| [options] | <code>object</code> | Optional options argument |
| [options.writeSql] | <code>boolean</code> | A boolean value that specifies whether to log the generated SQL statement. Defaults to false. |
| [options.execute] | <code>boolean</code> | A boolean value that specifies whether to execute the generated SQL statement. Defaults to false. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
sql(state => `select(*) from ${state.data.tableName};`, { writeSql: true })
```

* * *

## upsert

upsert(table, uuid, record, [options], callback) ⇒ <code>Operation</code>

Insert or update a record using ON CONFLICT UPDATE


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| record | <code>object</code> | Payload data for the record as a JS object or function |
| [options] | <code>object</code> | Optional options argument |
| [options.setNull] | <code>string</code> | A string value that specifies the behavior for inserting null values. |
| [options.writeSql] | <code>boolean</code> | A boolean value that specifies whether to log the generated SQL statement. Defaults to false. |
| [options.execute] | <code>boolean</code> | A boolean value that specifies whether to execute the generated SQL statement. Defaults to false. |
| [options.logValues] | <code>boolean</code> | A boolean value that specifies whether to log the inserted values to the console. Defaults to false. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
upsert(
  'users', // the DB table
  'ON CONSTRAINT users_pkey', // a DB column with a unique constraint OR a CONSTRAINT NAME
  { name: 'Elodie', id: 7 },
  { setNull: ["''", "'undefined'"], writeSql:true, execute: true, logValues: true }
)
```

* * *

## upsertIf

upsertIf(logical, table, uuid, record, [options], callback) ⇒ <code>Operation</code>

Insert or update a record based on a logical condition using ON CONFLICT UPDATE


| Param | Type | Description |
| --- | --- | --- |
| logical | <code>string</code> | a data to check existing value for. |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| record | <code>object</code> | Payload data for the record as a JS object or function |
| [options] | <code>object</code> | Optional options argument |
| [options.setNull] | <code>string</code> | A string value that specifies the behavior for inserting null values. |
| [options.writeSql] | <code>boolean</code> | A boolean value that specifies whether to log the generated SQL statement. Defaults to false. |
| [options.execute] | <code>boolean</code> | A boolean value that specifies whether to execute the generated SQL statement. Defaults to false. |
| [options.logValues] | <code>boolean</code> | A boolean value that specifies whether to log the inserted values to the console. Defaults to false. |
| callback | <code>function</code> | (Optional) callback function |

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

* * *

## upsertMany

upsertMany(table, uuid, data, [options], callback) ⇒ <code>Operation</code>

Insert or update multiple records using ON CONFLICT UPDATE and excluded


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| data | <code>array</code> | An array of objects or a function that returns an array |
| [options] | <code>object</code> | Optional options argument |
| [options.setNull] | <code>string</code> | A string value that specifies the behavior for inserting null values. |
| [options.writeSql] | <code>boolean</code> | A boolean value that specifies whether to log the generated SQL statement. Defaults to false. |
| [options.execute] | <code>boolean</code> | A boolean value that specifies whether to execute the generated SQL statement. Defaults to false. |
| [options.logValues] | <code>boolean</code> | A boolean value that specifies whether to log the inserted values to the console. Defaults to false. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
upsertMany(
  'users', // the DB table
  'email', // a DB column with a unique constraint OR a CONSTRAINT NAME
  [
    { name: 'one', email: 'one@openfn.org' },
    { name: 'two', email: 'two@openfn.org' },
  ]
 { logValues: true }
)
```

* * *

