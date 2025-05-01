<dl>
<dt>
    <a href="#converttoems">convertToEms(messageContents)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#cursor">cursor()</a>
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
    <a href="/adaptors/packages/common-docs#http">http</a>
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
### convertToEms

<p><code>convertToEms(messageContents) ⇒ Operation</code></p>

Processes EMS data from the provided list of message contents.


| Param | Type | Description |
| --- | --- | --- |
| messageContents | <code>Array</code> | Array of message content objects. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The converted, EMS-compliant version of each message contents. |
**Example:** Convert data to EMS-compliant data.
```js
convertToEms(
  [
    {
      metadata: { content: '', filename: '' },
      data: { content: '', filename: '' }
    }
  ]
);
```

* * *


