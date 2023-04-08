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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>Query parameters</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>formId</td><td><code>string</code></td><td><p>Query parameters</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>Starting sequence id</p>
</td>
    </tr><tr>
    <td>postUrl</td><td><code>string</code></td><td><p>Inbox to post form data</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>formId</td><td><code>string</code></td><td><p>The form ID.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
pickFormData(formId)
```

* * *

