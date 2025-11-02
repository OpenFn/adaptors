<dl>
<dt>
    <a href="#send">send(params)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#beta">beta</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#each">each()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#field">field()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fields">fields()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fn">fn()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fnif">fnIf()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### send

<p><code>send(params)</code></p>

Create an event


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params for sending an email |


**Example**
```js
// Fetch attachment from URL
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
**Example**
```js
// Attach from base64 string
send({
  from: 'admin@openfn.org',
  to: 'email@example.com',
  subject: 'Your invoice',
  text: 'Please find your invoice attached',
  attachment: {
    filename: 'invoice.pdf',
    data: $.data // base64 string
  },
})
```

* * *


