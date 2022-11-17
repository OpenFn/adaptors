## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>@openfn/language-common/execute</code>, and prepends initial state for telerivet.</p>
</dd>
<dt><a href="#send">send(sendData)</a> ⇒ <code>Operation</code></dt>
<dd><p>Send a message</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for telerivet.

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
<a name="send"></a>

## send(sendData) ⇒ <code>Operation</code>
Send a message

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| sendData | <code>object</code> | Payload data for the message |

**Example**  
```js
execute(
  send(data)
)(state)
```
