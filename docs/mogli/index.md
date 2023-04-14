## Functions

<dl>
<dt><a href="#cleanupState">cleanupState(state)</a> ⇒ <code>State</code></dt>
<dd><p>Removes unserializable keys from the state.</p>
</dd>
<dt><a href="#lookup">lookup(relationshipName, externalID, path)</a> ⇒ <code>object</code></dt>
<dd><p>Adds a lookup or &#39;dome insert&#39; to a record.</p>
</dd>
<dt><a href="#relationship">relationship(relationshipName, externalID, dataSource)</a> ⇒ <code>object</code></dt>
<dd><p>Adds a lookup or &#39;dome insert&#39; to a record.</p>
</dd>
</dl>

<a name="cleanupState"></a>

## cleanupState(state) ⇒ <code>State</code>
Removes unserializable keys from the state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 


* * *

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

* * *

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

* * *

