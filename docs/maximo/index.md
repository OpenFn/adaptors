## Functions

<dl>
<dt><a href="#fetch">fetch(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a GET request and POST it somewhere else</p>
</dd>
<dt><a href="#update">update(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make an update in Maximo 7.6 and beyond</p>
</dd>
<dt><a href="#update75">update75(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make an upadte in Maximo 7.5</p>
</dd>
</dl>

<a name="fetch"></a>

## fetch(params) ⇒ <code>Operation</code>
Make a GET request and POST it somewhere else

**Kind**: global function  

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
<a name="update"></a>

## update(params) ⇒ <code>Operation</code>
Make an update in Maximo 7.6 and beyond

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the update |

**Example**  
```js
execute(
  update(params)
)(state)
```
<a name="update75"></a>

## update75(params) ⇒ <code>Operation</code>
Make an upadte in Maximo 7.5

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the update |

**Example**  
```js
execute(
  update75(params)
)(state)
```
