## Functions

<dl>
<dt>
    <a href="#cleanupState">cleanupState(state)</a></dt>
<dt>
    <a href="#lookup">lookup(relationshipName, externalID, path)</a></dt>
<dt>
    <a href="#relationship">relationship(relationshipName, externalID, dataSource)</a></dt>
</dl>

## cleanupState

cleanupState(state) ⇒ <code>State</code>
Removes unserializable keys from the state.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>State</code></td>
    </tr>  </tbody>
</table>


* * *

## lookup

lookup(relationshipName, externalID, path) ⇒ <code>object</code>
Adds a lookup or 'dome insert' to a record.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>relationshipName</td><td><code>string</code></td><td><p><code>__r</code> relationship field on the record.</p>
</td>
    </tr><tr>
    <td>externalID</td><td><code>string</code></td><td><p>Salesforce ExternalID field.</p>
</td>
    </tr><tr>
    <td>path</td><td><code>string</code></td><td><p>JSONPath to data source.</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Example)*  
```js
lookup("relationship_name__r", "externalID on related object", "$.path")
```

* * *

## relationship

relationship(relationshipName, externalID, dataSource) ⇒ <code>object</code>
Adds a lookup or 'dome insert' to a record.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>relationshipName</td><td><code>string</code></td><td><p><code>__r</code> relationship field on the record.</p>
</td>
    </tr><tr>
    <td>externalID</td><td><code>string</code></td><td><p>Salesforce ExternalID field.</p>
</td>
    </tr><tr>
    <td>dataSource</td><td><code>string</code></td><td><p>resolvable source.</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Data Sourced Value)*  
```js
relationship("relationship_name__r", "externalID on related object", dataSource("path"))
```
**Example** *(Fixed Value)*  
```js
relationship("relationship_name__r", "externalID on related object", "hello world")
```

* * *

