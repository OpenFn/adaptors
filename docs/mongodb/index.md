## Functions

<dl>
<dt>
    <a href="#connect">connect(state)</a></dt>
<dt>
    <a href="#disconnect">disconnect(state)</a></dt>
<dt>
    <a href="#execute">execute(operations)</a></dt>
<dt>
    <a href="#findDocuments">findDocuments(params)</a></dt>
<dt>
    <a href="#insertDocuments">insertDocuments(params)</a></dt>
<dt>
    <a href="#updateDocument">updateDocument(params)</a></dt>
</dl>

## connect

connect(state) ⇒ <code>State</code>
Connects to a mongoDb instance

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>State</code></td><td><p>Runtime state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
connect(state)
```

* * *

## disconnect

disconnect(state) ⇒ <code>State</code>
Removes connection from the state.

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

**Example**  
```js
disconnect(state)
```

* * *

## execute

execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for http.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>operations</td><td><code>Operations</code></td><td><p>Operations to be performed.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
execute(
  insertDocuments(params),
  findDocuments(params)
)(state)
```

* * *

## findDocuments

findDocuments(params) ⇒ <code>State</code>
Find documents in a mongoDb collection

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>Configuration for mongo</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
findDocuments({
   database: 'str',
   collection: 'cases',
   query: {a:3}
  });
```

* * *

## insertDocuments

insertDocuments(params) ⇒ <code>State</code>
Inserts documents into a mongoDb collection

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>Configuration for mongo</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
insertDocuments({
   database: 'str',
   collection: 'kids',
   documents: [1,2,3]
  });
```

* * *

## updateDocument

updateDocument(params) ⇒ <code>State</code>
Updates document (optionally upserting) into a mongoDb collection

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>Configuration for mongo</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
updateDocuments({
   database: 'str',
   collection: 'animals',
   filter: { type: 'fuzzy' },
   changes: { kind: 'soft' },
   options: { upsert: true }
  });
```

* * *

