## Functions

<dl>
<dt>
    <a href="#connect">connect(state)</a></dt>
<dt>
    <a href="#disconnect">disconnect(state)</a></dt>
<dt>
    <a href="#execute">execute(operations)</a></dt>
<dt>
    <a href="#finddocuments">findDocuments(params)</a></dt>
<dt>
    <a href="#insertdocuments">insertDocuments(params)</a></dt>
<dt>
    <a href="#updatedocument">updateDocument(params)</a></dt>
</dl>


## connect

connect(state) ⇒ <code>State</code>

Connects to a mongoDb instance


| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
connect(state)
```

* * *

## disconnect

disconnect(state) ⇒ <code>State</code>

Removes connection from the state.


| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
disconnect(state)
```

* * *

## execute

execute(operations) ⇒ <code>Operation</code>

Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for http.


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

## findDocuments

findDocuments(params) ⇒ <code>State</code>

Find documents in a mongoDb collection


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

## insertDocuments

insertDocuments(params) ⇒ <code>State</code>

Inserts documents into a mongoDb collection


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

## updateDocument

updateDocument(params) ⇒ <code>State</code>

Updates document (optionally upserting) into a mongoDb collection


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

