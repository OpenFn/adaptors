## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>@openfn/language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#upsertMembers">upsertMembers(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Add members to a particular audience</p>
</dd>
<dt><a href="#tagMembers">tagMembers(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Tag members with a particular tag</p>
</dd>
<dt><a href="#startBatch">startBatch(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Start a batch with a list of operations.</p>
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
<a name="upsertMembers"></a>

## upsertMembers(params) ⇒ <code>Operation</code>
Add members to a particular audience

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, users, and options |

**Example**  
```js
upsertMembers(params)
```
<a name="tagMembers"></a>

## tagMembers(params) ⇒ <code>Operation</code>
Tag members with a particular tag

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a tagId, members, and a list |

**Example**  
```js
tagMembers(params)
```
<a name="startBatch"></a>

## startBatch(params) ⇒ <code>Operation</code>
Start a batch with a list of operations.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | operations batch job |

**Example**  
```js
startBatch(params)
```
