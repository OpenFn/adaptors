
This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#sourceHelpers_lookup">sourceHelpers.lookup(relationshipName, externalID, path)</a>
</dt>

<dt>
    <a href="#sourceHelpers_relationship">sourceHelpers.relationship(relationshipName, externalID, dataSource)</a>
</dt>
</dl>



## sourceHelpers

These functions belong to the sourceHelpers namespace.
### sourceHelpers.lookup {#sourceHelpers_lookup}

<p><code>lookup(relationshipName, externalID, path) ⇒ object</code></p>

Adds a lookup or 'dome insert' to a record.


| Param | Type | Description |
| --- | --- | --- |
| relationshipName | <code>string</code> | `__r` relationship field on the record. |
| externalID | <code>string</code> | Salesforce ExternalID field. |
| path | <code>string</code> | JSONPath to data source. |

**Example:** Example
```js
lookup("relationship_name__r", "externalID on related object", "$.path")
```

* * *


### sourceHelpers.relationship {#sourceHelpers_relationship}

<p><code>relationship(relationshipName, externalID, dataSource) ⇒ object</code></p>

Adds a lookup or 'dome insert' to a record.


| Param | Type | Description |
| --- | --- | --- |
| relationshipName | <code>string</code> | `__r` relationship field on the record. |
| externalID | <code>string</code> | Salesforce ExternalID field. |
| dataSource | <code>string</code> | resolvable source. |

**Example:** Data Sourced Value
```js
relationship("relationship_name__r", "externalID on related object", dataSource("path"))
```
**Example:** Fixed Value
```js
relationship("relationship_name__r", "externalID on related object", "hello world")
```

* * *


