

## Functions
### sendSMS

<p><code>sendSMS(params) ⇒ Operation</code></p>

Sends an SMS message to a specific phone number


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


