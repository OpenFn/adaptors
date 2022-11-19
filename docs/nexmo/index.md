## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>@openfn/language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#sendSMS">sendSMS(from, toNumber, message)</a> ⇒ <code>Operation</code></dt>
<dd><p>Sends an SMS message to a specific phone number</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for http.

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
<a name="sendSMS"></a>

## sendSMS(from, toNumber, message) ⇒ <code>Operation</code>
Sends an SMS message to a specific phone number

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>String</code> | Name or number the message should be sent from. |
| toNumber | <code>String</code> | Destination phone number. |
| message | <code>String</code> | Text message |

**Example**  
```js
sendSMS("OpenFn", "phoneNumber", "Hello World!")
```
