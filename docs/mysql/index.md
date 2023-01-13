## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for mysql.</p>
</dd>
<dt><a href="#insert">insert(table, fields)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert a record</p>
</dd>
<dt><a href="#upsert">upsert(table, fields)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert or Update a record if matched</p>
</dd>
<dt><a href="#upsertMany">upsertMany(table, data)</a> ⇒ <code>Operation</code></dt>
<dd><p>Insert or update multiple records using ON DUPLICATE KEY</p>
</dd>
<dt><a href="#query">query(options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a SQL statement</p>
</dd>
<dt><a href="#sqlString">sqlString(queryString)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a SQL statement</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for mysql.

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
<a name="insert"></a>

## insert(table, fields) ⇒ <code>Operation</code>
Insert a record

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| fields | <code>object</code> | A fields object |

**Example**  
```js
execute(
  insert('table', fields(
     field('name', dataValue('name'))
  ))
)(state)
```
<a name="upsert"></a>

## upsert(table, fields) ⇒ <code>Operation</code>
Insert or Update a record if matched

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| fields | <code>object</code> | A fields object |

**Example**  
```js
execute(
  upsert('table', fields(
     field('name', dataValue('name'))
  ))
)(state)
```
<a name="upsertMany"></a>

## upsertMany(table, data) ⇒ <code>Operation</code>
Insert or update multiple records using ON DUPLICATE KEY

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | The target table |
| data | <code>array</code> | An array of objects or a function that returns an array |

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
<a name="query"></a>

## query(options) ⇒ <code>Operation</code>
Execute a SQL statement

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Payload data for the message |

**Example**  
```js
execute(
  query({ sql: 'select * from users;' })
)(state)
```
<a name="sqlString"></a>

## sqlString(queryString) ⇒ <code>Operation</code>
Execute a SQL statement

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| queryString | <code>String</code> | A query string (or function which takes state and returns a string) |

**Example**  
```js
execute(
  sqlString(state => "select * from items;")
)(state)
```
