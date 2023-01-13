## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#create">create(path, params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Creates a fictional resource in a fictional destination system using a POST request</p>
</dd>
<dt><a href="#createPatient">createPatient(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a fictional patient in a fictional universe with a fictional REST api</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.

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
<a name="create"></a>

## create(path, params, callback) ⇒ <code>Operation</code>
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
<a name="createPatient"></a>

## createPatient(params, callback) ⇒ <code>Operation</code>
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
