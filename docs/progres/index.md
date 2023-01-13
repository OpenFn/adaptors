## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#postData">postData(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a POST request with a certificate</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.

**Kind**: global function  

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
<a name="postData"></a>

## postData(params, callback) ⇒ <code>Operation</code>
Make a POST request with a certificate

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Url, Headers and Body parameters |
| callback | <code>function</code> | (Optional) A callback function |

**Example**  
```js
postData({
 url: urlDTP,
 body: obj,
 headers: {
   'Ocp-Apim-Subscription-Key': configuration['Ocp-Apim-Subscription-Key'],
 },
 agentOptions: {
   key,
   cert,
 },
}, callback)(state)
```
