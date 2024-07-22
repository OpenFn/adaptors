<dl>
<dt>
    <a href="#get">get(path, params, callback)</a></dt>
<dt>
    <a href="#patch">patch(path, data, params, [callback])</a></dt>
<dt>
    <a href="#post">post(path, data, params, [callback])</a></dt>
<dt>
    <a href="#put">put(path, data, params, [callback])</a></dt>
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
    <a href="/adaptors/packages/common-docs#http">http()</a>
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

<p><code>get(path, params, callback) ⇒ Operation</code></p>

Make a get request to any satusehat endpoint


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>object</code> | Optional request params such as name. |
| callback | <code>function</code> | An optional callback to handle the response |

**Example**
```js
get("Organization", {"name": "somename"})
```

* * *

### patch

<p><code>patch(path, data, params, [callback]) ⇒ Operation</code></p>

Make a patch request to satusehat


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource and exact item to be partially updated |
| data | <code>Array</code> | An array of objects which defines data that will be used to partially update a given instance of resource |
| params | <code>Object</code> | Optional request params. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**
```js
patch(
  "Organization/123",
   [{
"op": "replace", // Operation - `replace` is the only one used to change a specific property or element
 "path": "/language", // Path - The name of property/element of resource to be replaced
 "value": "id" // Value- The value to be replaced
}]

);
```

* * *

### post

<p><code>post(path, data, params, [callback]) ⇒ Operation</code></p>

Make a post request to satusehat


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object or JSON which defines data that will be used to create a given instance of resource |
| params | <code>Object</code> | Optional request params. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**
```js
post(
  "Organization",
 { "resourceType": "Organization", "active": true,
 }
);
```

* * *

### put

<p><code>put(path, data, params, [callback]) ⇒ Operation</code></p>

Make a put request to satusehat


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource and exact item to be updated |
| data | <code>object</code> | Object or JSON which defines data that will be used to update a given instance of resource |
| params | <code>Object</code> | Optional request params. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**
```js
put(
  "Organization/123",
 { "resourceType": "Organization", "active": false,
 }
);
```

* * *

