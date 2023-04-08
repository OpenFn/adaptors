## sendSMS

sendSMS(params) ⇒ <code>Operation</code>
Sends an SMS message to a specific phone number

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
    <td>params</td><td><code>Object</code></td><td><p>an object containing &#39;body&#39;, &#39;from&#39;, and &#39;to&#39; keys.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
sendSMS({
 body: dataValue('sampleText'),
 from: dataValue('myFromNumber'),
 to: dataValue('ukMobile'),
});
```

* * *

