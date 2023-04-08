## Functions

<dl>
<dt>
    <a href="#insert">insert(table, fields)</a></dt>
<dt>
    <a href="#query">query(options)</a></dt>
<dt>
    <a href="#sqlString">sqlString(queryString)</a></dt>
<dt>
    <a href="#upsert">upsert(table, fields)</a></dt>
<dt>
    <a href="#upsertMany">upsertMany(table, data)</a></dt>
</dl>

## insert

insert(table, fields) ⇒ <code>Operation</code>
Insert a record

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>table</td><td><code>string</code></td><td><p>The target table</p>
</td>
    </tr><tr>
    <td>fields</td><td><code>object</code></td><td><p>A fields object</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
execute(
  insert('table', fields(
     field('name', dataValue('name'))
  ))
)(state)
```

* * *

## query

query(options) ⇒ <code>Operation</code>
Execute a SQL statement

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>options</td><td><code>object</code></td><td><p>Payload data for the message</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
execute(
  query({ sql: 'select * from users;' })
)(state)
```

* * *

## sqlString

sqlString(queryString) ⇒ <code>Operation</code>
Execute a SQL statement

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>queryString</td><td><code>String</code></td><td><p>A query string (or function which takes state and returns a string)</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
execute(
  sqlString(state => "select * from items;")
)(state)
```

* * *

## upsert

upsert(table, fields) ⇒ <code>Operation</code>
Insert or Update a record if matched

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>table</td><td><code>string</code></td><td><p>The target table</p>
</td>
    </tr><tr>
    <td>fields</td><td><code>object</code></td><td><p>A fields object</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
execute(
  upsert('table', fields(
     field('name', dataValue('name'))
  ))
)(state)
```

* * *

## upsertMany

upsertMany(table, data) ⇒ <code>Operation</code>
Insert or update multiple records using ON DUPLICATE KEY

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>table</td><td><code>string</code></td><td><p>The target table</p>
</td>
    </tr><tr>
    <td>data</td><td><code>array</code></td><td><p>An array of objects or a function that returns an array</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
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

