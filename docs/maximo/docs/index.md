## Functions

<dl>
<dt>
    <a href="#fetch">fetch(params)</a></dt>
<dt>
    <a href="#update">update(params)</a></dt>
<dt>
    <a href="#update75">update75(params)</a></dt>
</dl>


## fetch

fetch(params) ⇒ <code>Operation</code>

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

## update

update(params) ⇒ <code>Operation</code>

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

## update75

update75(params) ⇒ <code>Operation</code>

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

