## addRow

addRow(db, table, rowData) ⇒ <code>Operation</code>
To add a row data to a database table

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>db</td><td><code>string</code></td><td><p>Database</p>
</td>
    </tr><tr>
    <td>table</td><td><code>string</code></td><td><p>Database table</p>
</td>
    </tr><tr>
    <td>rowData</td><td><code>object</code></td><td><p>row data to be added into the database</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
addRow(
'testing_openfn',
'Customers',
fields(field('Subject', dataValue('formId')), field('Status', 'Closed'))
);
```

* * *

