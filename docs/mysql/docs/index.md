<dl>
<dt>
    <a href="#insert">insert(table, fields)</a></dt>
<dt>
    <a href="#sql">sql(sqlQuery, [options])</a></dt>
<dt>
    <a href="#upsert">upsert(table, fields)</a></dt>
<dt>
    <a href="#upsertmany">upsertMany(table, data)</a></dt>
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

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the query results object |
| data.result | the query result rows |
| data.fields | the query result fields |
| queries | an array of queries executed. Queries are added if `options.writeSql` is true. |
| references | an array of all previous data objects used in the Job |

**Example:** Insert a record into a table
```js
insert("users", { name: "one", email: "one@openfn.org" });
```

* * *

### sql

<p><code>sql(sqlQuery, [options]) ⇒ Operation</code></p>

Execute a SQL statement. Take care when inserting values from state directly into a query,
as this can be a vector for injection attacks. See [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
for guidelines


| Param | Type | Description |
| --- | --- | --- |
| sqlQuery | <code>string</code> | The sql query string. |
| [options] | [<code>sqlOptions</code>](#sqloptions) | The sql query options. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the query results object |
| data.result | the query result rows |
| data.fields | the query result fields |
| queries | an array of queries executed. Queries are added if `options.writeSql` is true. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
sql(state => `select * from ${state.data.tableName};`, { writeSql: true })
```
**Example:** Prepared statements
```js
sql(state => `select * from ?? where id = ?;`, {
  values: state => [state.data.tableName, state.data.id],
});
```

* * *

### upsert

<p><code>upsert(table, fields) ⇒ Operation</code></p>

Insert or Update a record if matched


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| fields | <code>object</code> | A fields object |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the query results object |
| data.result | the query result rows |
| data.fields | the query result fields |
| queries | an array of queries executed. Queries are added if `options.writeSql` is true. |
| references | an array of all previous data objects used in the Job |

**Example:** Upsert a record into a table
```js
upsert("users", { name: "Tuchi Dev" });
```

* * *

### upsertMany

<p><code>upsertMany(table, data) ⇒ Operation</code></p>

Insert or update multiple records using ON DUPLICATE KEY


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| data | <code>array</code> | An array of objects fields |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the query results object |
| data.result | the query result rows |
| data.fields | the query result fields |
| queries | an array of queries executed. Queries are added if `options.writeSql` is true. |
| references | an array of all previous data objects used in the Job |


* * *


##  Interfaces

### sqlOptions

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>array</code> |  | An array of values for prepared statements. |
| [writeSql] | <code>boolean</code> | <code>false</code> | If true, logs the generated SQL statement. Defaults to false. |
| [execute] | <code>boolean</code> | <code>true</code> | If false, does not execute the SQL, just logs it and adds to state.queries. Defaults to true. |


* * *

