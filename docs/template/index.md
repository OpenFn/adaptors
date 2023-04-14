## Functions

<dl>
<dt>
    <a href="#create">create(path, params, callback)</a></dt>
<dt>
    <a href="#createPatient">createPatient(params, callback)</a></dt>
</dl>

## create

create(path, params, callback) ⇒ <code>Operation</code>
Creates a fictional resource in a fictional destination system using a POST request

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

## createPatient

createPatient(params, callback) ⇒ <code>Operation</code>
Create a fictional patient in a fictional universe with a fictional REST api

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to create the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
createPatient({"foo": "bar"})
```

* * *

