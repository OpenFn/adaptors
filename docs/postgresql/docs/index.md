<dl>
<dt>
    <a href="#describetable">describeTable(tableName, [options])</a></dt>
<dt>
    <a href="#findvalue">findValue(filter)</a></dt>
<dt>
    <a href="#insert">insert(table, record, [options])</a></dt>
<dt>
    <a href="#insertmany">insertMany(table, records, [options])</a></dt>
<dt>
    <a href="#inserttable">insertTable(tableName, columns, [options])</a></dt>
<dt>
    <a href="#modifytable">modifyTable(tableName, columns, [options])</a></dt>
<dt>
    <a href="#sql">sql(sqlQuery, [options])</a></dt>
<dt>
    <a href="#upsert">upsert(table, uuid, record, [options])</a></dt>
<dt>
    <a href="#upsertif">upsertIf(logical, table, uuid, record, [options])</a></dt>
<dt>
    <a href="#upsertmany">upsertMany(table, uuid, data, [options])</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#arraytostring">arrayToString()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#assert">assert()</a>
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
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
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
    <a href="/adaptors/packages/common-docs#group">group()</a>
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
### describeTable

<p><code>describeTable(tableName, [options]) ⇒ Operation</code></p>

List the columns of a table in a database.


| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to describe |
| [options] | <code>ExecutionOptions</code> | Execution options. (OpenFn only) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed result rows |
| result | the result from a successful query |
| references | an array of all previous data objects used in the job |

**Example:** Describe a table
```js
describeTable('clinic_visits')
```

* * *

### findValue

<p><code>findValue(filter) ⇒ Operation</code></p>

Fetch a uuid key given a condition


| Param | Type | Description |
| --- | --- | --- |
| filter | <code>FindValueFilter</code> | A filter object with the lookup table, a uuid and the condition |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the value of the found uuid |
| result | the result from a successful query |
| references | an array of all previous data objects used in the job |

**Example:** Find a user by first name
```js
findValue({
   uuid: 'id',
   relation: 'users',
   where: { first_name: 'Mamadou' },
   operator: { first_name: 'like' }
 })
```

* * *

### insert

<p><code>insert(table, record, [options]) ⇒ Operation</code></p>

Insert a record


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| record | <code>object</code> | Payload data for the record as a JS object or function |
| [options] | <code>GeneralOptions</code> | Shared options. (OpenFn only) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed result rows |
| result | the result from a successful query |
| references | an array of all previous data objects used in the job |

**Example:** Insert a record
```js
insert('users', { name: 'Elodie', id: 7 }, { setNull: "'NaN'", logValues: true });
```

* * *

### insertMany

<p><code>insertMany(table, records, [options]) ⇒ Operation</code></p>

Insert many records, using the keys of the first as the column template


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| records | <code>array</code> | An array or a function that takes state and returns an array |
| [options] | <code>GeneralOptions</code> | Shared options. (OpenFn only) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed result rows |
| result | the result from a successful query |
| references | an array of all previous data objects used in the job |

**Example:** Insert many records
```js
insertMany('users', state => state.data.recordArray, { setNull: "'undefined'", logValues: true });
```

* * *

### insertTable

<p><code>insertTable(tableName, columns, [options]) ⇒ Operation</code></p>

Create a table in database when given an array of columns and a table_name.


| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to create |
| columns | <code>array</code> | An array of form columns |
| [options] | <code>ExecutionOptions</code> | Execution options. (OpenFn only) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed result rows |
| result | the result from a successful query |
| references | an array of all previous data objects used in the job |

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

<p><code>modifyTable(tableName, columns, [options]) ⇒ Operation</code></p>

Alter an existing table in the database.


| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | The name of the table to alter |
| columns | <code>array</code> | An array of form columns |
| [options] | <code>ExecutionOptions</code> | Execution options. (OpenFn only) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed result rows |
| result | the result from a successful query |
| references | an array of all previous data objects used in the job |

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

<p><code>sql(sqlQuery, [options]) ⇒ Operation</code></p>

Execute an SQL statement


| Param | Type | Description |
| --- | --- | --- |
| sqlQuery | <code>string</code> \| <code>SqlQueryConfig</code> | SQL query string or a query config object. |
| [options] | <code>ExecutionOptions</code> | Execution options. (OpenFn only) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed result rows |
| result | the result from a successful query |
| references | an array of all previous data objects used in the job |

**Example:** Text-only Query
```js
sql('SELECT * FROM users;');
```
**Example:** Text-only Query with writeSql option
```js
sql("select id from users where first_name = 'Mamadou'", { writeSql: true });
```
**Example:** Parameterized Query
```js
sql("INSERT INTO users(name, age) VALUES ($1, $2);", { values: ["Alice", 25]});
```
**Example:** Format query with util.format
```js
sql(util.format('INSERT INTO users(name, age) VALUES (%L, %L);', 'Alice', 25));
```
**Example:**  Prepared Statements
```js
sql({
  // give the query a unique name
  name: "fetch-user",
  text: "SELECT * FROM user WHERE id = $1",
  values: [1],
});
```

* * *

### upsert

<p><code>upsert(table, uuid, record, [options]) ⇒ Operation</code></p>

Insert or update a record using ON CONFLICT UPDATE


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| record | <code>object</code> | Payload data for the record as a JS object or function |
| [options] | <code>GeneralOptions</code> | Shared options. (OpenFn only) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed result rows |
| result | the result from a successful query |
| references | an array of all previous data objects used in the job |

**Example:** Insert or update a record
```js
upsert(
  "users", // the DB table
  "ON CONSTRAINT users_pkey", // a DB column with a unique constraint OR a CONSTRAINT NAME
  { name: "Elodie", id: 7 },
  {
    setNull: ["''", "'undefined'"],
    writeSql: true,
    logValues: true,
  }
);
```

* * *

### upsertIf

<p><code>upsertIf(logical, table, uuid, record, [options]) ⇒ Operation</code></p>

Insert or update a record based on a logical condition using ON CONFLICT UPDATE


| Param | Type | Description |
| --- | --- | --- |
| logical | <code>string</code> | a data to check existing value for. |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| record | <code>object</code> | Payload data for the record as a JS object or function |
| [options] | <code>GeneralOptions</code> | Shared options. (OpenFn only) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed result rows |
| result | the result from a successful query |
| references | an array of all previous data objects used in the job |

**Example:** Insert or update a record conditionally
```js
upsertIf(
  $.data.name,
  "users", // the DB table
  "ON CONSTRAINT users_pkey", // a DB column with a unique constraint OR a CONSTRAINT NAME
  { name: "Elodie", id: 7 },
  { writeSql: true }
);
```

* * *

### upsertMany

<p><code>upsertMany(table, uuid, data, [options]) ⇒ Operation</code></p>

Insert or update multiple records using ON CONFLICT UPDATE and excluded


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| uuid | <code>string</code> | The uuid column to determine a matching/existing record |
| data | <code>array</code> | An array of objects or a function that returns an array |
| [options] | <code>GeneralOptions</code> | Shared options. (OpenFn only) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed result rows |
| result | the result from a successful query |
| references | an array of all previous data objects used in the job |

**Example:** Insert or update multiple records
```js
upsertMany(
  'users', // the DB table
  'email', // a DB column with a unique constraint OR a CONSTRAINT NAME
  [
    { name: 'one', email: 'one@openfn.org' },
    { name: 'two', email: 'two@openfn.org' },
  ]
)
```

* * *


