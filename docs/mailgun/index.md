<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute](#module_Adaptor.execute)
        * [new exports.execute(operations)](#new_module_Adaptor.execute_new)
    * [.send(params)](#module_Adaptor.send)

<a name="module_Adaptor.execute"></a>

### Adaptor.execute
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.execute_new"></a>

#### new exports.execute(operations)
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for mailgun.


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
<a name="module_Adaptor.send"></a>

### Adaptor.send(params)
Create an event

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
