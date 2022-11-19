<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute(operations)](#module_Adaptor.execute) ⇒ <code>Operation</code>
    * [.fetch(params)](#module_Adaptor.fetch) ⇒ <code>Operation</code>
    * [.update(params)](#module_Adaptor.update) ⇒ <code>Operation</code>
    * [.update75(params)](#module_Adaptor.update75) ⇒ <code>Operation</code>

<a name="module_Adaptor.execute"></a>

### Adaptor.execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for http.

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
<a name="module_Adaptor.fetch"></a>

### Adaptor.fetch(params) ⇒ <code>Operation</code>
Make a GET request and POST it somewhere else

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the fetch |

**Example**  
```js
fetch({
 endpoint: 'maxrest/rest/os/mxinventory',
 query: {
   ITEMNUM: '01226',
   _format: 'json',
 },
 postUrl: 'https://www.openfn.org/inbox/not-real',
});
```
<a name="module_Adaptor.update"></a>

### Adaptor.update(params) ⇒ <code>Operation</code>
Make an update in Maximo 7.6 and beyond

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the update |

**Example**  
```js
execute(
  update(params)
)(state)
```
<a name="module_Adaptor.update75"></a>

### Adaptor.update75(params) ⇒ <code>Operation</code>
Make an upadte in Maximo 7.5

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the update |

**Example**  
```js
execute(
  update75(params)
)(state)
```
