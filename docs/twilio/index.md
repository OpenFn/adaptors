<a name="sendSMS"></a>

## sendSMS(params) ⇒ <code>Operation</code>
Sends an SMS message to a specific phone number

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | an object containing 'body', 'from', and 'to' keys. |

**Example**  
```js
sendSMS({
 body: dataValue('sampleText'),
 from: dataValue('myFromNumber'),
 to: dataValue('ukMobile'),
});
```

* * *

