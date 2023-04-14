<a name="sendSMS"></a>

## sendSMS(from, toNumber, message) ⇒ <code>Operation</code>
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
    <td>from</td><td><code>String</code></td><td><p>Name or number the message should be sent from.</p>
</td>
    </tr><tr>
    <td>toNumber</td><td><code>String</code></td><td><p>Destination phone number.</p>
</td>
    </tr><tr>
    <td>message</td><td><code>String</code></td><td><p>Text message</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
sendSMS("OpenFn", "phoneNumber", "Hello World!")
```

* * *

