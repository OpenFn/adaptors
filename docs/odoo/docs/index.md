<dl>
<dt>
    <a href="#create">create(model, data, options)</a></dt>
<dt>
    <a href="#deleterecord">deleteRecord(model, recordId)</a></dt>
<dt>
    <a href="#read">read(model, recordId, fields)</a></dt>
<dt>
    <a href="#update">update(model, recordId, data)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
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
### create

<p><code>create(model, data, options) ⇒ Operation</code></p>

Create a record in Odoo.
You can pass an external ID to the options object to create a record with a specific ID.
You can also pass a downloadNewRecord option to download the whole created resource in the response.


| Param | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | The specific record model i.e. "res.partner" |
| data | <code>object</code> | The data to be created in JSON. |
| options | [<code>CreateOptions</code>](#createoptions) | Options to send to the request. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Odoo server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:**  Create a partner record with an external Id 
```js
create('res.partner', { name: 'Kool Keith' }, { externalId: 23 });
```
**Example:**  Create a partner record and download the whole record in the response 
```js
create('res.partner', { name: 'Kool Keith' }, { downloadNewRecord: true });
```

* * *

### deleteRecord

<p><code>deleteRecord(model, recordId) ⇒ Operation</code></p>

Delete a record from Odoo


| Param | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | The specific record model i.e. "res.partner" |
| recordId | <code>number</code> | The specific recordId to be deleted. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Odoo server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example**
```js
deleteRecord("res.partner", 54 );
```

* * *

### read

<p><code>read(model, recordId, fields) ⇒ Operation</code></p>

Get a record from Odoo. Returns all fields unless a field list is provided as a third argument


| Param | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | The specific record model from i.e. "res.partner" |
| recordId | <code>number</code> | An array of record IDs to read. |
| fields | <code>Array.&lt;string&gt;</code> | An optional array of field strings to read from the record. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Odoo server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Download records with select fields
```js
read("res.partner", [1] , ['name']);
```
**Example:** Download a single record with all fields
```js
read("res.partner", $.recordIds);
```

* * *

### update

<p><code>update(model, recordId, data) ⇒ Operation</code></p>

Update a record in Odoo


| Param | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | The specific record model i.e. "res.partner" |
| recordId | <code>number</code> | The specific recordId to be updated. |
| data | <code>object</code> | The data to be updated in JSON. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Odoo server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example**
```js
update("res.partner", 54 , {name: 'Jane Doe'});
```

* * *


##  Interfaces

### CreateOptions

Options object

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| externalId | <code>number</code> | An optional id to be used in the request |
| downloadNewRecord | <code>boolean</code> | An option defaulted to `false` incase a user intends to receive the whole created resource in the response. The collective response will be written in `state.data`. |


* * *

