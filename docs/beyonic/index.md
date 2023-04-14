## Functions

<dl>
<dt><a href="#createCollectionRequest">createCollectionRequest(data)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a collection request</p>
</dd>
<dt><a href="#createContact">createContact(data)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a contact</p>
</dd>
<dt><a href="#createPayment">createPayment(data)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a payment</p>
</dd>
</dl>

<a name="createCollectionRequest"></a>

## createCollectionRequest(data) ⇒ <code>Operation</code>
Create a collection request

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>data</td><td><code>object</code></td><td><p>Payload data for the collection request</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
execute(
  createCollectionRequest(data)
)(state)
```

* * *

<a name="createContact"></a>

## createContact(data) ⇒ <code>Operation</code>
Create a contact

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>data</td><td><code>object</code></td><td><p>Payload data for the contact</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
execute(
  createContact(data)
)(state)
```

* * *

<a name="createPayment"></a>

## createPayment(data) ⇒ <code>Operation</code>
Create a payment

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>data</td><td><code>object</code></td><td><p>Payload data for the payment</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
execute(
  createPayment(data)
)(state)
```

* * *

