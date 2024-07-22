<dl>
<dt>
    <a href="#fetch">fetch(params)</a></dt>
<dt>
    <a href="#update">update(params)</a></dt>
<dt>
    <a href="#update75">update75(params)</a></dt>
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
### fetch

<p><code>fetch(params) ⇒ Operation</code></p>

Make a GET request and POST it somewhere else


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the fetch |

**Example**
```js
fetch({
 endpoint: 'maxrest/rest/os/mxinventory',
 query: {
   ITEMNUM: '01226',
   _format: 'json',
 },
 postUrl: 'https://www.openfn.org/inbox/not-real',
});
```

* * *

### update

<p><code>update(params) ⇒ Operation</code></p>

Make an update in Maximo 7.6 and beyond


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the update |

**Example**
```js
execute(
  update(params)
)(state)
```

* * *

### update75

<p><code>update75(params) ⇒ Operation</code></p>

Make an upadte in Maximo 7.5


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the update |

**Example**
```js
execute(
  update75(params)
)(state)
```

* * *

