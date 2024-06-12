## Functions

<dl>
<dt>
    <a href="#cleanupstate">cleanupState(state)</a></dt>
<dt>
    <a href="#lookup">lookup(relationshipName, externalID, path)</a></dt>
<dt>
    <a href="#relationship">relationship(relationshipName, externalID, dataSource)</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#arraytostring">arrayToString()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#beta">beta()</a>
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

