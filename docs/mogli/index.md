## Modules

<dl>
<dt><a href="#module_FakeAdaptor">FakeAdaptor</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#cleanupState">cleanupState(state)</a> ⇒ <code><a href="#State">State</a></code></dt>
<dd><p>Removes unserializable keys from the state.</p>
</dd>
<dt><a href="#lookup">lookup(relationshipName, externalID, path)</a> ⇒ <code>object</code></dt>
<dd><p>Adds a lookup or &#39;dome insert&#39; to a record.</p>
</dd>
<dt><a href="#relationship">relationship(relationshipName, externalID, dataSource)</a> ⇒ <code>object</code></dt>
<dd><p>Adds a lookup or &#39;dome insert&#39; to a record.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#State">State</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Operation">Operation</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="module_FakeAdaptor"></a>

## FakeAdaptor
<a name="cleanupState"></a>

## cleanupState(state) ⇒ [<code>State</code>](#State)
Removes unserializable keys from the state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | [<code>State</code>](#State) | 

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
<a name="State"></a>

## State : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | JSON Data. |
| references | <code>Array.&lt;Reference&gt;</code> | History of all previous operations. |

<a name="Operation"></a>

## Operation : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| state | [<code>State</code>](#State) | 

