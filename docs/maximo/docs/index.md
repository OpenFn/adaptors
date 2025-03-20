<dl>
<dt>
    <a href="#fetch">fetch(params)</a></dt>
<dt>
    <a href="#update">update(params)</a></dt>
<dt>
    <a href="#update75">update75(params)</a></dt>
</dl>


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

**Example:** Update a workorder
```js
update({
  endpoint: "maxrest/rest/mbo/workorder/1234",
  body: state => state.data,
});
```

* * *

### update75

<p><code>update75(params) ⇒ Operation</code></p>

Make an upadte in Maximo 7.5


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the update |

**Example:** Update an inventory balance
```js
update75({
  endpoint: "maxrest/rest/mbo/invbalances",
  body: state => state.inventoryBalances,
});
```

* * *


