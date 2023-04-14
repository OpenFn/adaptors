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

* * *

## query

query(options) ⇒ <code>Operation</code>
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

* * *

## sqlString

sqlString(queryString) ⇒ <code>Operation</code>
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

* * *

## upsert

upsert(table, fields) ⇒ <code>Operation</code>
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

* * *

## upsertMany

upsertMany(table, data) ⇒ <code>Operation</code>
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

* * *

