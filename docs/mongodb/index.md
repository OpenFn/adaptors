## Functions

<dl>
<dt><a href="#connect">connect(state)</a> ⇒ <code>State</code></dt>
<dd><p>Connects to a mongoDb instance</p>
</dd>
<dt><a href="#disconnect">disconnect(state)</a> ⇒ <code>State</code></dt>
<dd><p>Removes connection from the state.</p>
</dd>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>@openfn/language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#findDocuments">findDocuments(params)</a> ⇒ <code>State</code></dt>
<dd><p>Find documents in a mongoDb collection</p>
</dd>
<dt><a href="#insertDocuments">insertDocuments(params)</a> ⇒ <code>State</code></dt>
<dd><p>Inserts documents into a mongoDb collection</p>
</dd>
<dt><a href="#updateDocument">updateDocument(params)</a> ⇒ <code>State</code></dt>
<dd><p>Updates document (optionally upserting) into a mongoDb collection</p>
</dd>
</dl>

<a name="connect"></a>

## connect(state) ⇒ <code>State</code>
Connects to a mongoDb instance

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
connect(state)
```

* * *

<a name="disconnect"></a>

## disconnect(state) ⇒ <code>State</code>
Removes connection from the state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
disconnect(state)
```

* * *

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for http.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
execute(
  insertDocuments(params),
  findDocuments(params)
)(state)
```

* * *

<a name="findDocuments"></a>

## findDocuments(params) ⇒ <code>State</code>
Find documents in a mongoDb collection

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Configuration for mongo |

**Example**  
```js
findDocuments({
   database: 'str',
   collection: 'cases',
   query: {a:3}
  });
```

* * *

<a name="insertDocuments"></a>

## insertDocuments(params) ⇒ <code>State</code>
Inserts documents into a mongoDb collection

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Configuration for mongo |

**Example**  
```js
insertDocuments({
   database: 'str',
   collection: 'kids',
   documents: [1,2,3]
  });
```

* * *

<a name="updateDocument"></a>

## updateDocument(params) ⇒ <code>State</code>
Updates document (optionally upserting) into a mongoDb collection

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Configuration for mongo |

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

