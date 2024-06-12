## Functions

<dl>
<dt>
    <a href="#changesapi">changesApi(params, callback)</a></dt>
<dt>
    <a href="#fetchsubmissions">fetchSubmissions(formId, params, postUrl)</a></dt>
<dt>
    <a href="#pickformdata">pickFormData(formId)</a></dt>
</dl>

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

## changesApi

changesApi(params, callback) ⇒ <code>Operation</code>

Access the CouchDB Changes API


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Query parameters |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
changesApi(params, callback)
```

* * *

## fetchSubmissions

fetchSubmissions(formId, params, postUrl) ⇒ <code>Operation</code>

Access form submissions and post them as JSON.


| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | Query parameters |
| params | <code>object</code> | Starting sequence id |
| postUrl | <code>string</code> | Inbox to post form data |

**Example**  
```js
fetchSubmissions(
  "pregnancy", // formId
  { "last-event-id": 334 }, // params
  "http://localhost:4000/inbox/abc-123-xyz" // postUrl
);
```

* * *

## pickFormData

pickFormData(formId) ⇒ <code>Operation</code>

Select submissions for a specific form


| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | The form ID. |

**Example**  
```js
pickFormData(formId)
```

* * *

