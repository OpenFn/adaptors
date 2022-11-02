<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute(operations)](#module_Adaptor.execute) ⇒ <code>Operation</code>
    * [.create(path, params, callback)](#module_Adaptor.create) ⇒ <code>Operation</code>
    * [.createTransactionBundle(params, callback)](#module_Adaptor.createTransactionBundle) ⇒ <code>Operation</code>

<a name="module_Adaptor.execute"></a>

### Adaptor.execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  

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
<a name="module_Adaptor.create"></a>

### Adaptor.create(path, params, callback) ⇒ <code>Operation</code>
Creates a resource in a destination system using a POST request

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>object</code> | data to create the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
create("/endpoint", {"foo": "bar"})
```
<a name="module_Adaptor.createTransactionBundle"></a>

### Adaptor.createTransactionBundle(params, callback) ⇒ <code>Operation</code>
Creates a transactionBundle for HAPI FHIR

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to create the new transaction |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
createTransactionBundle( {"entry": [{...},, {...}]})
```
