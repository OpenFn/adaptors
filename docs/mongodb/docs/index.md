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

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### connect

<p><code>connect(state) ⇒ State</code></p>

Connects to a mongoDb instance


| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**
```js
connect(state)
```

* * *

### disconnect

<p><code>disconnect(state) ⇒ State</code></p>

Removes connection from the state.


| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**
```js
disconnect(state)
```

* * *

### execute

<p><code>execute(operations) ⇒ Operation</code></p>

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

### findDocuments

<p><code>findDocuments(params) ⇒ State</code></p>

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

### insertDocuments

<p><code>insertDocuments(params) ⇒ State</code></p>

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

### updateDocument

<p><code>updateDocument(params) ⇒ State</code></p>

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

