## Modules

<dl>
<dt><a href="#module_Adaptor">Adaptor</a></dt>
<dd></dd>
<dt><a href="#module_FakeAdaptor">FakeAdaptor</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#lookup">lookup(relationshipName, externalID, path)</a> ⇒ <code>object</code></dt>
<dd><p>Adds a lookup or &#39;dome insert&#39; to a record.</p>
</dd>
<dt><a href="#relationship">relationship(relationshipName, externalID, dataSource)</a> ⇒ <code>object</code></dt>
<dd><p>Adds a lookup or &#39;dome insert&#39; to a record.</p>
</dd>
</dl>

<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [~cleanupState](#module_Adaptor..cleanupState)
        * [new cleanupState(state)](#new_module_Adaptor..cleanupState_new)
    * [~State](#module_Adaptor..State) : <code>Object</code>
    * [~Operation](#module_Adaptor..Operation) : <code>function</code>

<a name="module_Adaptor..cleanupState"></a>

### Adaptor~cleanupState
**Kind**: inner class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor..cleanupState_new"></a>

#### new cleanupState(state)
Removes unserializable keys from the state.


| Param | Type |
| --- | --- |
| state | <code>State</code> | 

<a name="module_Adaptor..State"></a>

### Adaptor~State : <code>Object</code>
**Kind**: inner typedef of [<code>Adaptor</code>](#module_Adaptor)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | JSON Data. |
| references | <code>Array.&lt;Reference&gt;</code> | History of all previous operations. |

<a name="module_Adaptor..Operation"></a>

### Adaptor~Operation : <code>function</code>
**Kind**: inner typedef of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

<a name="module_FakeAdaptor"></a>

## FakeAdaptor
<a name="lookup"></a>

## lookup(relationshipName, externalID, path) ⇒ <code>object</code>
Adds a lookup or 'dome insert' to a record.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| relationshipName | <code>string</code> | `__r` relationship field on the record. |
| externalID | <code>string</code> | Salesforce ExternalID field. |
| path | <code>string</code> | JSONPath to data source. |

**Example** *(Example)*  
```js
lookup("relationship_name__r", "externalID on related object", "$.path")
```
<a name="relationship"></a>

## relationship(relationshipName, externalID, dataSource) ⇒ <code>object</code>
Adds a lookup or 'dome insert' to a record.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| relationshipName | <code>string</code> | `__r` relationship field on the record. |
| externalID | <code>string</code> | Salesforce ExternalID field. |
| dataSource | <code>string</code> | resolvable source. |

**Example** *(Data Sourced Value)*  
```js
relationship("relationship_name__r", "externalID on related object", dataSource("path"))
```
**Example** *(Fixed Value)*  
```js
relationship("relationship_name__r", "externalID on related object", "hello world")
```
