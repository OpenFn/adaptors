## Classes

<dl>
<dt><a href="#execute">execute</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#fetchSubmissions">fetchSubmissions(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a GET request and POST it somewhere else</p>
</dd>
</dl>

<a name="execute"></a>

## execute
**Kind**: global class  
<a name="new_execute_new"></a>

### new exports.execute(operations)
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for http.


| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
execute(
  create('foo'),
  delete('bar')
)(state)
```
<a name="fetchSubmissions"></a>

## fetchSubmissions(params) ⇒ <code>Operation</code>
Make a GET request and POST it somewhere else

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the fetch |

**Example**  
```js
execute(
  fetch(params)
)(state)
```
