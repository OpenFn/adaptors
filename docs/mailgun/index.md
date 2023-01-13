## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for mailgun.</p>
</dd>
<dt><a href="#send">send(params)</a></dt>
<dd><p>Create an event</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for mailgun.

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
<a name="send"></a>

## send(params)
Create an event

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params for sending an email |

**Example**  
```js
send({
  from: 'from_email',
  to: 'to_email',
  subject: 'Your Subject',
  text: 'Your message goes here',
  attachment: {
    url: 'www.google.com/doodle.png',
    filename: 'forYou.png',
  },
})
```
