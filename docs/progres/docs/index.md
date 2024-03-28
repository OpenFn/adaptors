
The following functions are exported from the common adaptor:
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
    <a href="/adaptors/packages/common-docs#http">http()</a>
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

## postData

postData(params, callback) ⇒ <code>Operation</code>

Make a POST request with a certificate


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Url, Headers and Body parameters |
| callback | <code>function</code> | (Optional) A callback function |

**Example**  
```js
postData({
 url: urlDTP,
 body: obj,
 headers: {
   'Ocp-Apim-Subscription-Key': configuration['Ocp-Apim-Subscription-Key'],
 },
 agentOptions: {
   key,
   cert,
 },
}, callback)(state)
```

* * *

