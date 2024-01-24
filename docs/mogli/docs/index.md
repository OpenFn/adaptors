## Functions

<dl>
<dt>
    <a href="#cleanupstate">cleanupState(state)</a></dt>
<dt>
    <a href="#lookup">lookup(relationshipName, externalID, path)</a></dt>
<dt>
    <a href="#relationship">relationship(relationshipName, externalID, dataSource)</a></dt>
</dl>


## cleanupState

cleanupState(state) ⇒ <code>State</code>

Removes unserializable keys from the state.


| Param | Type |
| --- | --- |
| state | <code>State</code> | 


* * *

## lookup

lookup(relationshipName, externalID, path) ⇒ <code>object</code>

Adds a lookup or 'dome insert' to a record.


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

## relationship

relationship(relationshipName, externalID, dataSource) ⇒ <code>object</code>

Adds a lookup or 'dome insert' to a record.


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

