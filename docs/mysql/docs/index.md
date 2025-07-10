<dl>
<dt>
    <a href="#insert">insert(table, fields)</a></dt>
<dt>
    <a href="#query">query(options)</a></dt>
<dt>
    <a href="#sqlstring">sqlString(queryString)</a></dt>
<dt>
    <a href="#upsert">upsert(table, fields)</a></dt>
<dt>
    <a href="#upsertmany">upsertMany(table, data)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
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
    <a href="/adaptors/packages/common-docs#http">http</a>
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
### insert

<p><code>insert(table, fields) ⇒ Operation</code></p>

Insert a record


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| fields | <code>object</code> | A fields object |


**Example:** Insert a record into the `users` table
```js
insert("users", { name: (state) => state.data.name });
```

* * *

### query

<p><code>query(options) ⇒ Operation</code></p>

Execute a SQL statement


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Payload data for the message |


**Example:** Execute a SQL statement
```js
query({ sql: 'select * from users;' })
```

* * *

### sqlString

<p><code>sqlString(queryString) ⇒ Operation</code></p>

Execute a SQL statement


| Param | Type | Description |
| --- | --- | --- |
| queryString | <code>String</code> | A query string (or function which takes state and returns a string) |


**Example:** Execute a SQL statement
```js
sqlString(state => "select * from items;")
```

* * *

### upsert

<p><code>upsert(table, fields) ⇒ Operation</code></p>

Insert or Update a record if matched


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| fields | <code>object</code> | A fields object |


**Example:** Upsert a record
```js
upsert("table", { name: (state) => state.data.name });
```

* * *

### upsertMany

<p><code>upsertMany(table, data) ⇒ Operation</code></p>

Insert or update multiple records using ON DUPLICATE KEY


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| data | <code>array</code> | An array of objects or a function that returns an array |


**Example:** Upsert multiple records
```js
upsertMany(
  'users', // the DB table
  [
    { name: 'one', email: 'one@openfn.org' },
    { name: 'two', email: 'two@openfn.org' },
  ]
)
```

* * *


