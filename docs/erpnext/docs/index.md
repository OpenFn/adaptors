<dl>
<dt>
    <a href="#create">create(doctype, data)</a></dt>
<dt>
    <a href="#deleterecord">deleteRecord(doctype, name)</a></dt>
<dt>
    <a href="#getcount">getCount(doctype, filters)</a></dt>
<dt>
    <a href="#getlist">getList(doctype, options)</a></dt>
<dt>
    <a href="#read">read(doctype, name)</a></dt>
<dt>
    <a href="#update">update(doctype, name, data)</a></dt>
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
### create

<p><code>create(doctype, data) ⇒ Operation</code></p>

Create a document in ERPNext. Returns the complete created document with all fields.


| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The doctype to create (e.g., "Customer", "Sales Order") |
| data | <code>object</code> | The document data as JSON |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the ERPNext server (excluding the body) |
| references | An array of all previous data objects used in the Job |

**Example:** Create a customer record
```js
create('Customer', {
  customer_name: 'Acme Corporation',
  customer_type: 'Company'
});
```
**Example:** Create with data from state
```js
create('Sales Order', $.orderData);
```
**Example:** Create an item with multiple fields
```js
create('Item', {
  item_code: 'ITEM-001',
  item_name: 'Sample Product',
  item_group: 'Products',
  stock_uom: 'Nos'
});
```

* * *

### deleteRecord

<p><code>deleteRecord(doctype, name) ⇒ Operation</code></p>

Delete a document from ERPNext


| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The doctype to delete from (e.g., "Customer", "Sales Order") |
| name | <code>string</code> | The document name/ID to delete |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the ERPNext server (excluding the body) |
| references | An array of all previous data objects used in the Job |

**Example:** Delete a customer
```js
deleteRecord('Customer', 'CUST-00001');
```
**Example:** Delete using state data
```js
deleteRecord('Sales Order', $.data.order_id);
```
**Example:** Delete a draft document
```js
deleteRecord('Quotation', 'QTN-00001');
```

* * *

### getCount

<p><code>getCount(doctype, filters) ⇒ Operation</code></p>

Get count of documents matching filters


| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The doctype to count (e.g., "Customer", "Sales Order") |
| filters | <code>object</code> | Optional filters to apply (e.g., `{ status: 'Open' }`) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the ERPNext server (excluding the body) |
| references | An array of all previous data objects used in the Job |

**Example:** Count all customers
```js
getCount('Customer');
```
**Example:** Count with filters
```js
getCount('Sales Order', { status: 'Open' });
```
**Example:** Count from state data
```js
getCount('Item', { item_group: $.data.group_name });
```

* * *

### getList

<p><code>getList(doctype, options) ⇒ Operation</code></p>

Get a list of documents from ERPNext with filtering, field selection, and pagination


| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The doctype to query (e.g., "Customer", "Sales Order") |
| options | [<code>ListOptions</code>](#listoptions) | Optional query configuration. See [Frappe Database API](https://frappeframework.com/docs/user/en/api/database#get-list) for supported options. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the ERPNext server (excluding the body) |
| references | An array of all previous data objects used in the Job |

**Example:** Get all customers
```js
getList('Customer');
```
**Example:** Get customers with filters
```js
getList('Customer', {
  filters: { customer_type: 'Company' },
  fields: ['name', 'customer_name', 'territory']
});
```
**Example:** Get with pagination
```js
getList('Sales Order', {
  filters: { status: 'Draft' },
  limit: 50,
  offset: 0,
  orderBy: 'creation desc'
});
```
**Example:** Get specific fields only
```js
getList('Item', {
  fields: ['item_code', 'item_name', 'standard_rate'],
  filters: { item_group: 'Products' },
  limit: 100
});
```

* * *

### read

<p><code>read(doctype, name) ⇒ Operation</code></p>

Read a document from ERPNext by name/ID. Returns the complete document with all fields.
Note: For field selection, use getList() with filters instead.


| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The doctype to read from (e.g., "Customer", "Sales Order") |
| name | <code>string</code> | The document name/ID to read |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the ERPNext server (excluding the body) |
| references | An array of all previous data objects used in the Job |

**Example:** Read a customer by name
```js
read('Customer', 'CUST-00001');
```
**Example:** Read from state data
```js
read('Item', $.data.item_code);
```
**Example:** Read a sales order
```js
read('Sales Order', $.orderId);
```

* * *

### update

<p><code>update(doctype, name, data) ⇒ Operation</code></p>

Update a document in ERPNext


| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The doctype to update (e.g., "Customer", "Sales Order") |
| name | <code>string</code> | The document name/ID to update |
| data | <code>object</code> | The fields to update as JSON |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the ERPNext server (excluding the body) |
| references | An array of all previous data objects used in the Job |

**Example:** Update a customer's details
```js
update('Customer', 'CUST-00001', {
  customer_name: 'Updated Corp Name',
  mobile_no: '+1234567890'
});
```
**Example:** Update using state data
```js
update('Sales Order', $.data.order_id, {
  status: 'Confirmed'
});
```
**Example:** Update multiple fields
```js
update('Item', 'ITEM-001', {
  item_name: 'Updated Product Name',
  standard_rate: 150.00,
  description: 'Updated description'
});
```

* * *


##  Interfaces

### ListOptions

Options object for list operations

**See**: [Frappe Database API](https://frappeframework.com/docs/user/en/api/database#get-list)  

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filters | <code>object</code> | Filters to apply to the query (e.g., `{ status: 'Open' }`). |
| fields | <code>Array.&lt;string&gt;</code> | Array of field names to return (e.g., `['name', 'status']`). |
| limit | <code>number</code> | Maximum number of records to return. Defaults to `1000`. |
| offset | <code>number</code> | Number of records to skip. Defaults to `0`. |
| orderBy | <code>string</code> | Field to sort by with direction (e.g., `'creation desc'`). |


* * *

