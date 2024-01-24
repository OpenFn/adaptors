## query

query(qs, options, callback) ⇒ <code>Operation</code>

Execute an SQL statement


| Param | Type | Description |
| --- | --- | --- |
| qs | <code>string</code> | SQL statement |
| options | <code>object</code> | (Optional) options for executing sql statement |
| callback | <code>function</code> | An optional callback function |

**Example** *(Get patient count from hive database)*  
```js
query("select count(*) from patient");
```

* * *

