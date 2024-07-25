
This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#sourceHelpers_lookup">sourceHelpers.lookup(relationshipName, externalID, path)</a>
</dt>

<dt>
    <a href="#sourceHelpers_relationship">sourceHelpers.relationship(relationshipName, externalID, dataSource)</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#arraytostring">arrayToString()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#beta">beta</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#each">each()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#field">field()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fields">fields()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fn">fn()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fnif">fnIf()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#index">index()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#join">join()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#map">map()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#referencepath">referencePath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#source">source()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#toarray">toArray()</a>
</dt></dl>


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


