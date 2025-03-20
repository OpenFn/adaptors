<dl>
<dt>
    <a href="#sendsms">sendSms(data)</a></dt>
</dl>


## Functions
### sendSms

<p><code>sendSms(data) ⇒ Operation</code></p>

Send SMS using Wigal SMS Gateway API


| Param | Type | Description |
| --- | --- | --- |
| data | [<code>SMSRequestObject</code>](#smsrequestobject) | SMS payload to push to Wigal. This includes the message, phone number, etc |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. containt status and message response |
| response | the response from the Wigal SMS server, including headers, statusCode etc |
| references | an array of all previous data objects used in the Job |
**Example:** Send General SMS message
```js
sendSms({
  senderid: "Stevkky",
  destinations: [{ destination: "0552825710" }],
  message: "This is a sample message for SMS sending via Wigal FROG API.",
  smstype: "text",
});
```
**Example:** Send Personalized SMS message
```js
sendSms({
  senderid: "Stevkky",
  destinations: [
    {
      destination: "0542709440",
      message: "Hello Joe your order is ready",
      msgid: "MGS1010101",
      smstype: "text",
    },
  ],
});
```

* * *


##  Interfaces

### SendSMSState

State object

**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body. containt status and message response |
| response | the response from the Wigal SMS server, including headers, statusCode etc |
| references | an array of all previous data objects used in the Job |


* * *

### SMSRequestObject

SMS Request Object

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| senderid | <code>string</code> | The senderID used for sending message. Approved SenderIDs only |
| destinations | <code>array</code> | An array of objects containing the destination phone number and message to be sent |
| message | <code>string</code> | The message to be sent to the destinations |
| smstype | <code>string</code> | The type of message to be sent. Default is 'text' |


* * *

