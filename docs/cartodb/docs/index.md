## Functions

<dl>
<dt>
    <a href="#addrow">addRow(table, rowData)</a></dt>
<dt>
    <a href="#sql">sql(sqlQuery)</a></dt>
</dl>

The following functions are exported from the common adaptor:
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## addRow

addRow(table, rowData) ⇒ <code>Operation</code>

Add rows to a table


| Param | Type | Description |
| --- | --- | --- |
| table | <code>String</code> | Table name |
| rowData | <code>object</code> | data to add in the row |

**Example**  
```js
execute(
  addRow(table, rowData)
)
```

* * *

## sql

sql(sqlQuery) ⇒ <code>Operation</code>

Execute an SQL statement


| Param | Type | Description |
| --- | --- | --- |
| sqlQuery | <code>object</code> | Payload data for the message |

**Example**  
```js
execute(
  sql(sqlQuery)
)
```

* * *

