## addRow

addRow(db, table, rowData) ⇒ <code>Operation</code>

To add a row data to a database table


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

* * *

