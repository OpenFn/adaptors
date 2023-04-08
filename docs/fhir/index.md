## Functions

<dl>
<dt>
    <a href="#create">create(path, params, callback)</a></dt>
<dt>
    <a href="#createTransactionBundle">createTransactionBundle(params, callback)</a></dt>
</dl>

## create

create(path, params, callback) ⇒ <code>Operation</code>
Creates a resource in a destination system using a POST request

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>path</td><td><code>string</code></td><td><p>Path to resource</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>data to create the new resource</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
create("/endpoint", {"foo": "bar"})
```

* * *

## createTransactionBundle

createTransactionBundle(params, callback) ⇒ <code>Operation</code>
Creates a transactionBundle for HAPI FHIR

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>data to create the new transaction</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
createTransactionBundle( {"entry": [{...},, {...}]})
```

* * *

