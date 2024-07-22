<dl>
<dt>
    <a href="#addrowstorefs">addRowsToRefs(state, rows)</a></dt>
<dt>
    <a href="#cleanupstate">cleanupState(state)</a></dt>
<dt>
    <a href="#createconnection">createConnection(state)</a></dt>
<dt>
    <a href="#describetable">describeTable(tableName, options)</a></dt>
<dt>
    <a href="#findvalue">findValue(filter)</a></dt>
<dt>
    <a href="#flattenrows">flattenRows(state, rows)</a></dt>
<dt>
    <a href="#insert">insert(table, record, options)</a></dt>
<dt>
    <a href="#insertmany">insertMany(table, records, options)</a></dt>
<dt>
    <a href="#inserttable">insertTable(tableName, columns, options)</a></dt>
<dt>
    <a href="#modifytable">modifyTable(tableName, columns, options)</a></dt>
<dt>
    <a href="#sql">sql(params)</a></dt>
<dt>
    <a href="#upsert">upsert(table, uuid, record, options)</a></dt>
<dt>
    <a href="#upsertif">upsertIf(logical, table, uuid, record, options)</a></dt>
<dt>
    <a href="#upsertmany">upsertMany(table, uuid, records, options)</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#cursor">cursor()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#each">each()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#field">field()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fields">fields()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fn">fn()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fnif">fnIf()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#http">http()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### addRowsToRefs

<p><code>addRowsToRefs(state, rows) ⇒ State</code></p>

Sets the returned rows from a query as the first item in the state.references
array, leaving state.data unchanged between operations.


| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> |  |
| rows | <code>array</code> | the array of rows returned from the sql query |


* * *

### cleanupState

<p><code>cleanupState(state) ⇒ State</code></p>

Removes unserializable keys from the state.


| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**
```js
cleanupState(state)
```

* * *

### createConnection

<p><code>createConnection(state) ⇒ State</code></p>

Creates a connection.


| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**
```js
createConnection(state)
```

* * *

### describeTable

<p><code>describeTable(tableName, options) ⇒ Operation</code></p>

List the columns of a table in a database.


| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to describe |
| options | <code>object</code> | Optional options argument |

**Example**
```js
describeTable('clinic_visits')
```

* * *

### findValue

<p><code>findValue(filter) ⇒ Operation</code></p>

Fetch a uuid key given a condition


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

### flattenRows

<p><code>flattenRows(state, rows) ⇒ State</code></p>

Returns a flatten object of the rows (array of arrays) with rowCount.


| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> |  |
| rows | <code>array</code> | the array of rows returned from the sql query |


* * *

### insert

<p><code>insert(table, record, options) ⇒ Operation</code></p>

Insert a record


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

### insertMany

<p><code>insertMany(table, records, options) ⇒ Operation</code></p>

Insert many records, using the keys of the first as the column template


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

### insertTable

<p><code>insertTable(tableName, columns, options) ⇒ Operation</code></p>

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

* * *

### modifyTable

<p><code>modifyTable(tableName, columns, options) ⇒ Operation</code></p>

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

* * *

### sql

<p><code>sql(params) ⇒ Operation</code></p>

Execute an SQL statement


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Payload data for the message |

**Example**
```js
sql({ query, options })
```

* * *

### upsert

<p><code>upsert(table, uuid, record, options) ⇒ Operation</code></p>

Insert or update a record using SQL MERGE


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

### upsertIf

<p><code>upsertIf(logical, table, uuid, record, options) ⇒ Operation</code></p>

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
  'uuid', // a DB column with a unique constraint
  { name: 'Elodie', id: 7 },
  { writeSql:true, execute: true, logValues: false }
)
```

* * *

### upsertMany

<p><code>upsertMany(table, uuid, records, options) ⇒ Operation</code></p>

Insert or update multiple records using ON CONFLICT UPDATE and excluded


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

