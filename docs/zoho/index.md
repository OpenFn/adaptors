## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>@openfn/language-common/execute</code>, and prepends initial state for zoho.</p>
</dd>
<dt><a href="#addRow">addRow(db, table, rowData)</a> ⇒ <code>Operation</code></dt>
<dd><p>To add a row data to a database table</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for zoho.

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
<a name="addRow"></a>

## addRow(db, table, rowData) ⇒ <code>Operation</code>
To add a row data to a database table

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| db | <code>string</code> | Database |
| table | <code>string</code> | Database table |
| rowData | <code>object</code> | row data to be added into the database |

**Example**  
```js
addRow(
'testing_openfn',
'Customers',
fields(field('Subject', dataValue('formId')), field('Status', 'Closed'))
);
```
