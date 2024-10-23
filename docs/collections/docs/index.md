
This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#collections_each">collections.each(name, query, callback)</a>
</dt>

<dt>
    <a href="#collections_get">collections.get(name, query)</a>
</dt>

<dt>
    <a href="#collections_remove">collections.remove(name, query)</a>
</dt>

<dt>
    <a href="#collections_set">collections.set(keygen, values)</a>
</dt>
</dl>



## collections

These functions belong to the collections namespace.
### collections.each {#collections_each}

<p><code>each(name, query, callback)</code></p>

Iterate over all values in a collection which match the provided query.
each() maintains a low memory footprint by streaming items individually.
You can pass a string key-pattern as a query, or pass a query object.
The callback function will be invoked for each value with three parameters:
`state`, `value` and `key`.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the collection to remove from |
| query | <code>string</code> \| [<code>QueryOptions</code>](#queryoptions) | A string key or key pattern (with wildcards '*') to remove, or a query object |
| callback | <code>function</code> | A callback invoked for each item `(state,  value, key) => void` |

**Example:** Iterate over a range of values with wildcards
```js
collections.each('my-collection', 'record-2024*-appointment-*', (state, value, key) => {
  state.cumulativeCost += value.cost;
})
```
**Example:** Iterate over a range of values with date filters
```js
collections.each('my-collection', { updatedBefore: new Date().toString() }, (state, value, key) => {
  state.cumulativeCost += value.cost;
})
```

* * *


### collections.get {#collections_get}

<p><code>get(name, query)</code></p>

Fetch one or more values from a collection.
For large datasets, we recommend using each(), which streams data.
You can pass a specific key as a string to only fetch one item, or pass a query
with a key-pattern or a date filter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the collection to fetch from |
| query | <code>string</code> \| [<code>QueryOptions</code>](#queryoptions) | A string key or key pattern (with wildcards '*') to fetch, or a query object |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the downloaded values as an array unless a specific string was specified |
**Example:** Get a specific value from a collection
```js
collections.get('my-collection', '556e0a62')
```
**Example:** Get a range of values from a collection with a key pattern
```js
collections.get('my-collection', '2024*')
```
**Example:** Get all values created since the end of January 2024
```js
collections.get('my-collection', { createdAfter: '202401')
```

* * *


### collections.remove {#collections_remove}

<p><code>remove(name, query)</code></p>

Remove one or more values from a collection.
You can pass a specific key as a string to only fetch one item, or pass a query
with a key-pattern or a date filter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the collection to remove from |
| query | <code>string</code> \| [<code>QueryOptions</code>](#queryoptions) | A string key or key pattern (with wildcards '*') to remove, or a query object |

**Example:** Remove a specific value from a collection
```js
collections.remove('my-collection', '556e0a62')
```
**Example:** Remove a range of values from a collection with a key pattern
```js
collections.remove('my-collection', '2024*')
```
**Example:** Remove all values created since the end of January 2024
```js
collections.remove('my-collection', { createdAfter: '202401')
```

* * *


### collections.set {#collections_set}

<p><code>set(keygen, values)</code></p>

Adds one or more values to a collection. If a key already exists, its value will
be replaced by the new value.
You can pass a string key and a single value, or a key generator function and an array of values.
The function will be called for each value, passing each value as the first argument, and should return
a string key.


| Param | Description |
| --- | --- |
| keygen | a function which generates a key for each value. Pass a string to set a static key for a single item. |
| values | an array of values to set, or a single value. |

**Example:** Set a number of values using each value&#x27;s id property as a key
```js
collections.set('my-collection', (item) => item.id, $.data)
```
**Example:** Set a number of values, generating an id from a string template
```js
collections.set('my-collection', (item) => `${item.category}-${Date.now()}`, $.data)
```
**Example:** Set a single value with a static key
```js
collections.set('my-collection', 'city-codes', { NY: 'New York', LDN: 'London' }})
```

* * *


##  Interfaces

### QueryOptions

Query options. All dates should be parseable as ISO 8601 strings, see https://simple.wikipedia.org/wiki/ISO_8601

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key or key pattern to match against. Patterns support wildcards,  eg `2024-01*` |
| createdBefore | <code>string</code> | matches values that were created before the start of the provided date |
| createdAfter | <code>string</code> | matches values that were created after the end of the provided date |
| updatedBefore | <code>string</code> | matches values that were updated before the start of the provided date |
| updatedAfter | <code>string</code> | matches values that were updated after the end of the provided date* |


* * *

