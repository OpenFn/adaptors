## Functions

<dl>
<dt>
    <a href="#createcollectionrequest">createCollectionRequest(data)</a></dt>
<dt>
    <a href="#createcontact">createContact(data)</a></dt>
<dt>
    <a href="#createpayment">createPayment(data)</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#field">field()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fields">fields()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fn">fn()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## createCollectionRequest

createCollectionRequest(data) ⇒ <code>Operation</code>

Create a collection request


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Payload data for the collection request |

**Example**  
```js
execute(
  createCollectionRequest(data)
)(state)
```

* * *

## createContact

createContact(data) ⇒ <code>Operation</code>

Create a contact


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Payload data for the contact |

**Example**  
```js
execute(
  createContact(data)
)(state)
```

* * *

## createPayment

createPayment(data) ⇒ <code>Operation</code>

Create a payment


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Payload data for the payment |

**Example**  
```js
execute(
  createPayment(data)
)(state)
```

* * *
