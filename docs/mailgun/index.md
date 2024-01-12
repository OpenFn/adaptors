## send

send(params)
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

* * *

