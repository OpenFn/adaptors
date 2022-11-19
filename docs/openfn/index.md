## Classes

<dl>
<dt><a href="#execute">execute</a></dt>
<dd></dd>
<dt><a href="#request">request</a></dt>
<dd></dd>
</dl>

<a name="execute"></a>

## execute
**Kind**: global class  
<a name="new_execute_new"></a>

### new exports.execute(operations)
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.


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
<a name="request"></a>

## request
**Kind**: global class  
**Access**: public  
<a name="new_request_new"></a>

### new exports.request(options, callback)
Make a POST request


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Body, Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
request({method: 'get', path: '/jobs/});
```
