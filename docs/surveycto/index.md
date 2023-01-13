## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>@openfn/language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#fetchSubmissions">fetchSubmissions(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a GET request and POST it somewhere else</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for http.

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
<a name="fetchSubmissions"></a>

## fetchSubmissions(params) ⇒ <code>Operation</code>
Make a GET request and POST it somewhere else

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the fetch |

**Example**  
```js
execute(
  fetch(params)
)(state)
```
