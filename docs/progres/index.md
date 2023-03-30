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
