## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>@openfn/language-common/execute</code>, and prepends initial state for khanacademy.</p>
</dd>
<dt><a href="#fetch">fetch(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Fetch data from the Khan Academy API</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for khanacademy.

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
<a name="fetch"></a>

## fetch(params) ⇒ <code>Operation</code>
Fetch data from the Khan Academy API

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the query |

**Example**  
```js
execute(
  fetch(params)
)(state)
```
