<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute](#module_Adaptor.execute)
        * [new exports.execute(operations)](#new_module_Adaptor.execute_new)
    * [.fetch](#module_Adaptor.fetch)
        * [new exports.fetch(params)](#new_module_Adaptor.fetch_new)

<a name="module_Adaptor.execute"></a>

### Adaptor.execute
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.execute_new"></a>

#### new exports.execute(operations)
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for khanacademy.


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

### Adaptor.fetch
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.fetch_new"></a>

#### new exports.fetch(params)
Fetch data from the Khan Academy API


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the query |

**Example**  
```js
execute(
  fetch(params)
)(state)
```
