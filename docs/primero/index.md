## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#generateAuthString">generateAuthString(state)</a> ⇒ <code>string</code></dt>
<dd><p>Generate an auth string to support multiple types of auth credentials.</p>
</dd>
<dt><a href="#queryHandler">queryHandler(state, params, callback)</a> ⇒ <code>State</code></dt>
<dd><p>Execute custom query</p>
</dd>
<dt><a href="#login">login(state)</a> ⇒ <code>State</code></dt>
<dd><p>Logs in to Primero.</p>
</dd>
<dt><a href="#cleanupState">cleanupState(state)</a> ⇒ <code>State</code></dt>
<dd><p>Removes unserializable keys from the state.</p>
</dd>
<dt><a href="#getCases">getCases(query, options, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get cases from Primero</p>
</dd>
<dt><a href="#createCase">createCase(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create case in Primero</p>
</dd>
<dt><a href="#updateCase">updateCase(id, params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Update case in Primero</p>
</dd>
<dt><a href="#upsertCase">upsertCase(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Upsert case to Primero</p>
</dd>
<dt><a href="#getReferrals">getReferrals(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get referrals for a specific case in Primero</p>
</dd>
<dt><a href="#createReferrals">createReferrals(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create referrals in Primero</p>
</dd>
<dt><a href="#updateReferral">updateReferral(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Update a single referral for a specific case in Primero</p>
</dd>
<dt><a href="#getForms">getForms(query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get forms from Primero</p>
</dd>
<dt><a href="#getLookups">getLookups(query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get lookups from Primero</p>
</dd>
<dt><a href="#getLocations">getLocations(query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get locations from Primero</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.

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
<a name="generateAuthString"></a>

## generateAuthString(state) ⇒ <code>string</code>
Generate an auth string to support multiple types of auth credentials.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
generateAuthString(state)
```
<a name="queryHandler"></a>

## queryHandler(state, params, callback) ⇒ <code>State</code>
Execute custom query

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 
| params | <code>object</code> | 
| callback | <code>function</code> | 

<a name="login"></a>

## login(state) ⇒ <code>State</code>
Logs in to Primero.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
login(state)
```
<a name="cleanupState"></a>

## cleanupState(state) ⇒ <code>State</code>
Removes unserializable keys from the state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
cleanupState(state)
```
<a name="getCases"></a>

## getCases(query, options, callback) ⇒ <code>Operation</code>
Get cases from Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum, option to getReferrals |
| options | <code>object</code> | (Optional) an object with a getReferrals key to fetch referrals |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
getCases({
  remote: true,
  case_id: '6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz'
  query: 'sex=male' // optional
}, { withReferrals: true }, callback)
```
<a name="createCase"></a>

## createCase(params, callback) ⇒ <code>Operation</code>
Create case in Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
createCase({
  data: state => data {
    "enabled": true,
    "age": 15,
    "sex": "male",
    "name": "Alex",
    "status": "open",
    "case_id": "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
    "owned_by": "primero_cp"
  }}, callback)
```
<a name="updateCase"></a>

## updateCase(id, params, callback) ⇒ <code>Operation</code>
Update case in Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | an ID to use for the update. |
| params | <code>object</code> | an object with some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
updateCase("7ed1d49f-14c7-4181-8d83-dc8ed1699f08", {
  data: state => data {
    "age": 20,
    "sex": "male",
    "name": "Alex",
    "status": "open",
    "case_id": "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
  }}, callback)
```
<a name="upsertCase"></a>

## upsertCase(params, callback) ⇒ <code>Operation</code>
Upsert case to Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with an externalId and some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
upsertCase({
  externalIds: ['case_id'],
  data: state => ({
    "age": 20,
    "sex": "male",
    "name": "Alex",
    "status": "open",
    "case_id": "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
  })
});
```
<a name="getReferrals"></a>

## getReferrals(params, callback) ⇒ <code>Operation</code>
Get referrals for a specific case in Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with an externalId field to select the attribute to use for matching on case and an externalId value for that case. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
getReferrals({
  externalId: "record_id",
  id: "7ed1d49f-14c7-4181-8d83-dc8ed1699f08",
}, callback)
```
<a name="createReferrals"></a>

## createReferrals(params, callback) ⇒ <code>Operation</code>
Create referrals in Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with referral data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
createReferrals({
  data: {
    "ids": ['case_id'],
     "transitioned_to": "primero_cp",
     "notes": "Creating a referral"
  }
}, callback)
```
<a name="updateReferral"></a>

## updateReferral(params, callback) ⇒ <code>Operation</code>
Update a single referral for a specific case in Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with an externalId value to use, the id and the referral id to update. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
updateReferral({
  caseExternalId: "record_id",
  caseId: "7ed1d49f-14c7-4181-8d83-dc8ed1699f08"
  id: "37612f65-3bda-48eb-b526-d31383f94166",
  data: state => state.data
}, callback)
```
<a name="getForms"></a>

## getForms(query, callback) ⇒ <code>Operation</code>
Get forms from Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
getForms({
  record_type: '' // Optional. Filters by the record type of the form,
  module_id: 'id' //Optional. Filter forms by module,
}, callback)
```
<a name="getLookups"></a>

## getLookups(query, callback) ⇒ <code>Operation</code>
Get lookups from Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
getLookups({
  page: 1 // Optional. Pagination. Defaults to 1,
  per: 20 // Optional. Records per page. Defaults to 20,
}, callback)
```
<a name="getLocations"></a>

## getLocations(query, callback) ⇒ <code>Operation</code>
Get locations from Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
getLocations({
  page: 1 // Optional.
  per: 20 // Optional. Records per page,
  hierarchy: // Defaults to false,
}, callback)
```
