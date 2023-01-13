## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for beyonic.</p>
</dd>
<dt><a href="#createPayment">createPayment(data)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a payment</p>
</dd>
<dt><a href="#createContact">createContact(data)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a contact</p>
</dd>
<dt><a href="#createCollectionRequest">createCollectionRequest(data)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a collection request</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for beyonic.

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
<a name="createPayment"></a>

## createPayment(data) ⇒ <code>Operation</code>
Create a payment

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Payload data for the payment |

**Example**  
```js
execute(
  createPayment(data)
)(state)
```
<a name="createContact"></a>

## createContact(data) ⇒ <code>Operation</code>
Create a contact

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Payload data for the contact |

**Example**  
```js
execute(
  createContact(data)
)(state)
```
<a name="createCollectionRequest"></a>

## createCollectionRequest(data) ⇒ <code>Operation</code>
Create a collection request

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Payload data for the collection request |

**Example**  
```js
execute(
  createCollectionRequest(data)
)(state)
```
