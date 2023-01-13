## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#create">create(path, params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Creates a resource in a destination system using a POST request</p>
</dd>
<dt><a href="#createTransactionBundle">createTransactionBundle(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Creates a transactionBundle for HAPI FHIR</p>
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
<a name="createTransactionBundle"></a>

## createTransactionBundle(params, callback) ⇒ <code>Operation</code>
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
