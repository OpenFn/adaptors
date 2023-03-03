## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for openhim.</p>
</dd>
<dt><a href="#encounter">encounter(encounterData)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create an encounter</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for openhim.

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
<a name="encounter"></a>

## encounter(encounterData) ⇒ <code>Operation</code>
Create an encounter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| encounterData | <code>object</code> | Payload data for the encounter |

**Example**  
```js
execute(
  encounter(data)
)(state)
```
