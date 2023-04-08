## postMessage

postMessage(params) ⇒ <code>Operation</code>
Post a message

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
    <td>params</td><td><code>object</code></td><td><p>data to make the fetch</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
postMessage({
 "recipient": {
    "id": "your-psid"
  },
  "message": {
    "text": "your-message"
  }
})
```

* * *

