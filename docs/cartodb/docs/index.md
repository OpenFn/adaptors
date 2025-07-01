<dl>
<dt>
    <a href="#addrow">addRow(table, rowData)</a></dt>
<dt>
    <a href="#sql">sql(sqlQuery)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
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
### addRow

<p><code>addRow(table, rowData) ⇒ Operation</code></p>

Add rows to a table


| Param | Type | Description |
| --- | --- | --- |
| table | <code>String</code> | Table name |
| rowData | <code>object</code> | data to add in the row |


**Example:** Add rows to a table
```js
addRow('users', { name: 'Alice', age: 25, city: 'New York' })
```

* * *

### sql

<p><code>sql(sqlQuery) ⇒ Operation</code></p>

Execute an SQL statement


| Param | Type | Description |
| --- | --- | --- |
| sqlQuery | <code>object</code> | Payload data for the message |


**Example:** A basic radius search query
```js
sql("SELECT * FROM table WHERE ST_DWithin(geom,ST_Point(-73,40),1000)");
```

* * *


