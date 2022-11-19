## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>@openfn/language-common/execute</code>, and prepends initial state for resourcemap.</p>
</dd>
<dt><a href="#submitSite">submitSite(eventData)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create an event</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for resourcemap.

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
<a name="submitSite"></a>

## submitSite(eventData) ⇒ <code>Operation</code>
Create an event

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| eventData | <code>object</code> | Payload data for the event |

**Example**  
```js
execute(
  event(eventData)
)(state)
```
