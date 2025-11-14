<dl>
<dt>
    <a href="#execute">execute(...operations)</a></dt>
<dt>
    <a href="#insert">insert(table, records, [options])</a></dt>
<dt>
    <a href="#query">query(sqlQuery, [options])</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#util_escapeSqlString">util.escapeSqlString(value)</a>
</dt>

<dt>
    <a href="#util_formatSqlValue">util.formatSqlValue(value)</a>
</dt>

<dt>
    <a href="#util_validateSqlIdentifier">util.validateSqlIdentifier(identifier)</a>
</dt>
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
    <a href="/adaptors/packages/common-docs#map">map()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### execute

<p><code>execute(...operations) ⇒ Operation</code></p>

Execute a sequence of operations against MotherDuck cloud database.
Wraps `@openfn/language-common/execute`, and prepends initial state for MotherDuck.


| Param | Type | Description |
| --- | --- | --- |
| ...operations | <code>Operation</code> | Operations to be performed. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| references | Array of previous operation results |
| data | Data from the last operation |

**Example**
```js
execute(
  query('SELECT * FROM my_table'),
  insert('users', { name: 'John', age: 30 })
)(state)
```

* * *

### insert

<p><code>insert(table, records, [options]) ⇒ Operation</code></p>

Insert one or more records into a MotherDuck table with automatic batching.
Large datasets are automatically split into batches for optimal performance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| table | <code>string</code> |  | Target table name |
| records | <code>object</code> \| <code>Array</code> |  | A single record object or array of records |
| [options] | <code>object</code> |  | Insert options |
| [options.batchSize] | <code>number</code> | <code>1000</code> | Number of records per batch |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | Metadata including recordsInserted and batches |

**Example:** Insert a single record
```js
insert('users', { name: 'John', age: 30, email: 'john@example.com' })
```
**Example:** Insert multiple records
```js
insert('users', [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
])
```
**Example:** Insert with custom batch size
```js
insert('users', records, { batchSize: 500 })
```

* * *

### query

<p><code>query(sqlQuery, [options]) ⇒ Operation</code></p>

Execute a SQL query against the MotherDuck database.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sqlQuery | <code>string</code> |  | SQL query string |
| [options] | <code>object</code> |  | Query execution options |
| [options.writeSql] | <code>boolean</code> | <code>false</code> | Include full SQL in response.query (default: false, hides query for security) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | Query results as array of row objects |
| response | Metadata including rowCount, command, and query |

**Example:** Simple query
```js
query('SELECT * FROM users WHERE age > 18')
```
**Example:** Query with SQL logging
```js
query('SELECT * FROM orders', { writeSql: true })
```

* * *


## util

These functions belong to the util namespace.
### util.escapeSqlString {#util_escapeSqlString}

<p><code>escapeSqlString(value) ⇒ string</code></p>

Escape SQL string values to prevent SQL injection

**Returns**: <code>string</code> - - Escaped string value  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | String value to escape |



* * *


### util.formatSqlValue {#util_formatSqlValue}

<p><code>formatSqlValue(value) ⇒ string</code></p>

Format a value for SQL insertion

**Returns**: <code>string</code> - - Formatted SQL value  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | Value to format |



* * *


### util.validateSqlIdentifier {#util_validateSqlIdentifier}

<p><code>validateSqlIdentifier(identifier) ⇒ string</code></p>

Validate SQL identifier (table names, column names, etc.)

**Returns**: <code>string</code> - - Validated identifier  
**Throws**:

- <code>Error</code> - If identifier contains dangerous characters


| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | SQL identifier to validate |



* * *


