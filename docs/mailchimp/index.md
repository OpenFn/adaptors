<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute](#module_Adaptor.execute)
        * [new exports.execute(operations)](#new_module_Adaptor.execute_new)
    * [.upsertMembers](#module_Adaptor.upsertMembers)
        * [new exports.upsertMembers(params)](#new_module_Adaptor.upsertMembers_new)
    * [.tagMembers](#module_Adaptor.tagMembers)
        * [new exports.tagMembers(params)](#new_module_Adaptor.tagMembers_new)
    * [.startBatch](#module_Adaptor.startBatch)
        * [new exports.startBatch(params)](#new_module_Adaptor.startBatch_new)

<a name="module_Adaptor.execute"></a>

### Adaptor.execute
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.execute_new"></a>

#### new exports.execute(operations)
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for http.


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
<a name="module_Adaptor.upsertMembers"></a>

### Adaptor.upsertMembers
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.upsertMembers_new"></a>

#### new exports.upsertMembers(params)
Add members to a particular audience


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, users, and options |

**Example**  
```js
upsertMembers(params)
```
<a name="module_Adaptor.tagMembers"></a>

### Adaptor.tagMembers
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.tagMembers_new"></a>

#### new exports.tagMembers(params)
Tag members with a particular tag


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a tagId, members, and a list |

**Example**  
```js
tagMembers(params)
```
<a name="module_Adaptor.startBatch"></a>

### Adaptor.startBatch
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.startBatch_new"></a>

#### new exports.startBatch(params)
Start a batch with a list of operations.


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | operations batch job |

**Example**  
```js
startBatch(params)
```
