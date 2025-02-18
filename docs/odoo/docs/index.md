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

Create a record in Odoo


| Param | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | The specific record model i.e. "res.partner" |
| data | <code>object</code> | The data to be created in JSON. |
| options | <code>object</code> | Optional external ID for the record. |

**Example**
```js
create("res.partner", { name: "Kool Keith" }, {externalId: 23});
```

* * *

### deleteRecord

<p><code>deleteRecord(model, recordId) ⇒ Operation</code></p>

Delete a record from Odoo


| Param | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | The specific record model i.e. "res.partner" |
| recordId | <code>number</code> | The specific recordId to be deleted. |

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
| fields | <code>string</code> | An optional array of fields to read from the record. |

**Example:** Download records with select fields
```js
read("res.partner", [1] , [name]);
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

**Example**
```js
update("res.partner", 54 , {name: 'Jane Doe'});
```

* * *


