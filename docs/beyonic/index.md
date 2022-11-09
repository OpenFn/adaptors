<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute](#module_Adaptor.execute)
        * [new exports.execute(operations)](#new_module_Adaptor.execute_new)
    * [.createPayment](#module_Adaptor.createPayment)
        * [new exports.createPayment(data)](#new_module_Adaptor.createPayment_new)
    * [.createContact](#module_Adaptor.createContact)
        * [new exports.createContact(data)](#new_module_Adaptor.createContact_new)
    * [.createCollectionRequest](#module_Adaptor.createCollectionRequest)
        * [new exports.createCollectionRequest(data)](#new_module_Adaptor.createCollectionRequest_new)

<a name="module_Adaptor.execute"></a>

### Adaptor.execute
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.execute_new"></a>

#### new exports.execute(operations)
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for beyonic.


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
<a name="module_Adaptor.createPayment"></a>

### Adaptor.createPayment
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.createPayment_new"></a>

#### new exports.createPayment(data)
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
<a name="module_Adaptor.createContact"></a>

### Adaptor.createContact
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.createContact_new"></a>

#### new exports.createContact(data)
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
<a name="module_Adaptor.createCollectionRequest"></a>

### Adaptor.createCollectionRequest
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.createCollectionRequest_new"></a>

#### new exports.createCollectionRequest(data)
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
