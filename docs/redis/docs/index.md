<dl>
<dt>
    <a href="#get">get(key)</a></dt>
<dt>
    <a href="#hget">hget(key, field)</a></dt>
<dt>
    <a href="#hgetall">hGetAll(key)</a></dt>
<dt>
    <a href="#hset">hset(key, value)</a></dt>
<dt>
    <a href="#scan">scan(pattern, options)</a></dt>
<dt>
    <a href="#set">set(key, value)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#cursor">cursor()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
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
### get

<p><code>get(key) ⇒ Operation</code></p>

Get the string value of a key.
If the key does not exist, null is returned.
An error is thrown if the value stored at key is not a string, because `get()` only handles string values.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The name of the key |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the result returned from Redis |
| references | an array of all previous data objects used in the Job |
**Example:** Get the value of the patient key
```js
get("patient");
```

* * *

### hget

<p><code>hget(key, field) ⇒ Operation</code></p>

Get the value associated with a specific field in a hash stored at a specified key.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The name of the key |
| field | <code>string</code> | Field |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the result returned from Redis |
| references | an array of all previous data objects used in the Job |
**Example:** Get the value of the name field under the patient key
```js
hget("patient", "name");
```

* * *

### hGetAll

<p><code>hGetAll(key) ⇒ Operation</code></p>

Get all fields and values of a hash, as an object, for a specified key.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The name of the key |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The hash as an object |
| references | an array of all previous data objects used in the Job |
**Example:** Get the hash obejct at the noderedis:animals:1 key
```js
hGetAll("noderedis:animals:1");
```

* * *

### hset

<p><code>hset(key, value) ⇒ Operation</code></p>

Sets the specified fields to their respective values in the hash stored at key.
This function overwrites the values of specified fields that exist in the hash.
If key doesn't exist, a new key holding a hash is created.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The name of the key |
| value | <code>object</code> | The values to set |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| references | an array of all previous data objects used in the Job |
**Example:** Set a field and value for the patient key
```js
hset('patient', { name: 'mtuchi' });
```
**Example:** Set multiple field values for the patient key
```js
hset('patient', { name: 'victor', ihs_number: 12345  });
```

* * *

### scan

<p><code>scan(pattern, options) ⇒ Operation</code></p>

Returns all keys which patch the provided pattern.


| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>string</code> | A glob-style pattern |
| options | [<code>ScanOptions</code>](#scanoptions) | Scan options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | an array of keys which match the pattern |
| references | an array of all previous data objects used in the Job |
| cursor | A numeric value used to continue the iteration from where it left off |
**Example:** Scan for matching keys
```js
scan('*:20240524T172736Z*');
```
**Example:** Scan for keys and fetch the string values inside
```js
scan('*:20240524T172736Z*');
each($.data, get($.data).then((state) => {
   state.results = state.results ?? [];
   state.results.push(state.data)
   return state;
})
```

* * *

### set

<p><code>set(key, value) ⇒ Operation</code></p>

Set the string value of a key.
If the key already exists, its value is updated. Otherwise, a new key-value pair is created.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The name of the key |
| value | <code>string</code> | The value to set |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| references | an array of all previous data objects used in the Job |
**Example:** Set the &quot;patient&quot; key to value &quot;mtuchi&quot;
```js
set("patient", "mtuchi");
```

* * *


##  Interfaces

### ScanOptions

Options provided to the scan function

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [cursor] | <code>integer</code> | <code>0</code> | A numeric value used to continue the iteration from where it left off. Initially, you start with 0. |
| [type] | <code>string</code> | <code>&quot;&#x27;hash&#x27;&quot;</code> | Limits the keys returned to those of a specified type (e.g., string, list, set, hash, etc.). |
| count | <code>integer</code> |  | A hint to the server about how many elements to return in the call (default is 10). |


* * *

