## Functions

<dl>
<dt>
    <a href="#create">create(path, params, callback)</a></dt>
<dt>
    <a href="#createTransactionBundle">createTransactionBundle(params, callback)</a></dt>
<dt>
    <a href="#get">get(path, query, callback)</a></dt>
</dl>

## create

create(path, params, callback) ⇒ <code>Operation</code>
Creates a resource in a destination system using a POST request

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>object</code> | data to create the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
create("/endpoint", {"foo": "bar"})
```

* * *

## createTransactionBundle

createTransactionBundle(params, callback) ⇒ <code>Operation</code>
Creates a transactionBundle for HAPI FHIR

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to create the new transaction |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
createTransactionBundle( {"entry": [{...},, {...}]})
```

* * *

## get

get(path, query, callback) ⇒ <code>Operation</code>
Get a resource in a FHIR system

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| query | <code>object</code> | data to get the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
get("/endpoint", {"foo": "bar"})
```

* * *

