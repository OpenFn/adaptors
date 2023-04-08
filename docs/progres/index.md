## postData

postData(params, callback) ⇒ <code>Operation</code>
Make a POST request with a certificate

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>Url, Headers and Body parameters</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) A callback function</p>
</td>
    </tr>  </tbody>
</table>

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

* * *

