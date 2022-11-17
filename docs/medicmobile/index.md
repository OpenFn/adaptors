## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>@openfn/language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#fetchSubmissions">fetchSubmissions(formId, params, postUrl)</a> ⇒ <code>Operation</code></dt>
<dd><p>Access form submissions and post them as JSON.</p>
</dd>
<dt><a href="#changesApi">changesApi(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Access the CouchDB Changes API</p>
</dd>
<dt><a href="#pickFormData">pickFormData(formId)</a> ⇒ <code>Operation</code></dt>
<dd><p>Select submissions for a specific form</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for http.

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
<a name="fetchSubmissions"></a>

## fetchSubmissions(formId, params, postUrl) ⇒ <code>Operation</code>
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
<a name="changesApi"></a>

## changesApi(params, callback) ⇒ <code>Operation</code>
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
<a name="pickFormData"></a>

## pickFormData(formId) ⇒ <code>Operation</code>
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
