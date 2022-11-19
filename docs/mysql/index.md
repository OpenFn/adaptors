<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute](#module_Adaptor.execute)
        * [new exports.execute(operations)](#new_module_Adaptor.execute_new)
    * [.insert](#module_Adaptor.insert)
        * [new exports.insert(table, fields)](#new_module_Adaptor.insert_new)
    * [.upsert](#module_Adaptor.upsert)
        * [new exports.upsert(table, fields)](#new_module_Adaptor.upsert_new)
    * [.upsertMany](#module_Adaptor.upsertMany)
        * [new exports.upsertMany(table, data)](#new_module_Adaptor.upsertMany_new)
    * [.query](#module_Adaptor.query)
        * [new exports.query(options)](#new_module_Adaptor.query_new)
    * [.sqlString](#module_Adaptor.sqlString)
        * [new exports.sqlString(queryString)](#new_module_Adaptor.sqlString_new)

<a name="module_Adaptor.execute"></a>

### Adaptor.execute
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.execute_new"></a>

#### new exports.execute(operations)
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for mysql.


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
<a name="module_Adaptor.insert"></a>

### Adaptor.insert
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.insert_new"></a>

#### new exports.insert(table, fields)
Insert a record


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
<a name="module_Adaptor.upsert"></a>

### Adaptor.upsert
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.upsert_new"></a>

#### new exports.upsert(table, fields)
Insert or Update a record if matched


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
<a name="module_Adaptor.upsertMany"></a>

### Adaptor.upsertMany
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.upsertMany_new"></a>

#### new exports.upsertMany(table, data)
Insert or update multiple records using ON DUPLICATE KEY


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
<a name="module_Adaptor.query"></a>

### Adaptor.query
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.query_new"></a>

#### new exports.query(options)
Execute a SQL statement


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Payload data for the message |

**Example**  
```js
execute(
  query({ sql: 'select * from users;' })
)(state)
```
<a name="module_Adaptor.sqlString"></a>

### Adaptor.sqlString
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.sqlString_new"></a>

#### new exports.sqlString(queryString)
Execute a SQL statement


| Param | Type | Description |
| --- | --- | --- |
| queryString | <code>String</code> | A query string (or function which takes state and returns a string) |

**Example**  
```js
execute(
  sqlString(state => "select * from items;")
)(state)
```
