<dl>
<dt>
    <a href="#sendsms">sendSMS(from, toNumber, message)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
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
### sendSMS

<p><code>sendSMS(from, toNumber, message) ⇒ Operation</code></p>

Sends an SMS message to a specific phone number


| Param | Type | Description |
| --- | --- | --- |
| from | <code>String</code> | Name or number the message should be sent from. |
| toNumber | <code>String</code> | Destination phone number. |
| message | <code>String</code> | Text message |

**Example**
```js
sendSMS("OpenFn", "phoneNumber", "Hello World!")
```

* * *

