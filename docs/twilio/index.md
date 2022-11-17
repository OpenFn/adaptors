## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#sendSMS">sendSMS(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Sends an SMS message to a specific phone number</p>
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
