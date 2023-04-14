## Functions

<dl>
<dt>
    <a href="#changesApi">changesApi(params, callback)</a></dt>
<dt>
    <a href="#fetchSubmissions">fetchSubmissions(formId, params, postUrl)</a></dt>
<dt>
    <a href="#pickFormData">pickFormData(formId)</a></dt>
</dl>

## changesApi

changesApi(params, callback) ⇒ <code>Operation</code>
Access the CouchDB Changes API

**Kind**: global function  
**Access**: public  

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

**Kind**: global function  
**Access**: public  

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

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | The form ID. |

**Example**  
```js
pickFormData(formId)
```

* * *

