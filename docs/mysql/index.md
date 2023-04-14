## Functions

<dl>
<dt><a href="#insert">insert(table, fields)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert a record</p>
</dd>
<dt><a href="#query">query(options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a SQL statement</p>
</dd>
<dt><a href="#sqlString">sqlString(queryString)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a SQL statement</p>
</dd>
<dt><a href="#upsert">upsert(table, fields)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert or Update a record if matched</p>
</dd>
<dt><a href="#upsertMany">upsertMany(table, data)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert or update multiple records using ON DUPLICATE KEY</p>
</dd>
</dl>

<a name="insert"></a>

## insert(table, fields) ⇒ <code>Operation</code>
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

<a name="query"></a>

## query(options) ⇒ <code>Operation</code>
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

<a name="sqlString"></a>

## sqlString(queryString) ⇒ <code>Operation</code>
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

<a name="upsert"></a>

## upsert(table, fields) ⇒ <code>Operation</code>
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

<a name="upsertMany"></a>

## upsertMany(table, data) ⇒ <code>Operation</code>
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

