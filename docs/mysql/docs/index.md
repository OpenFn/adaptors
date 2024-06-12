## Functions

<dl>
<dt>
    <a href="#insert">insert(table, fields)</a></dt>
<dt>
    <a href="#query">query(options)</a></dt>
<dt>
    <a href="#sqlstring">sqlString(queryString)</a></dt>
<dt>
    <a href="#upsert">upsert(table, fields)</a></dt>
<dt>
    <a href="#upsertmany">upsertMany(table, data)</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#arraytostring">arrayToString()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
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
    <a href="/adaptors/packages/common-docs#http">http()</a>
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

## insert

insert(table, fields) ⇒ <code>Operation</code>

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

* * *

## query

query(options) ⇒ <code>Operation</code>

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

* * *

## sqlString

sqlString(queryString) ⇒ <code>Operation</code>

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

* * *

## upsert

upsert(table, fields) ⇒ <code>Operation</code>

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

* * *

## upsertMany

upsertMany(table, data) ⇒ <code>Operation</code>

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

* * *

