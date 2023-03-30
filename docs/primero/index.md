## Functions

<dl>
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
<p>Use this function to get cases from Primero based on a set of query parameters.
Note that in many implementations, the <code>remote</code> attribute should be set to <code>true</code> to ensure that only cases marked for remote access will be retrieved.
You can specify a <code>case_id</code> value to fetch a unique case and a query string to filter result.</p>
</dd>
<dt><a href="#createCase">createCase(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a new case in Primero</p>
<p>Use this function to create a new case in Primero based on a set of Data.</p>
</dd>
<dt><a href="#updateCase">updateCase(id, params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Update an existing case in Primero</p>
<p>Use this function to update an existing case from Primero.
In this implementation, the function uses a case ID to check for the case to update,
Then merge the values submitted in this call into an existing case.
Fields not specified in this request will not be modified.
For nested subform fields, the subform arrays will be recursively merged,
keeping both the existing values and appending the new</p>
</dd>
<dt><a href="#upsertCase">upsertCase(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Upsert case to Primero</p>
<p>Use this function to update an existing case from Primero or to create it otherwise.
In this implementation, we first fetch the list of cases,
then we check if the case exist before choosing the right operation to do.</p>
</dd>
<dt><a href="#getReferrals">getReferrals(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get referrals for a specific case in Primero</p>
<p>Use this function to get the list of referrals of one case from Primero.
The search can be done using either <code>record id</code> or <code>case id</code>.</p>
</dd>
<dt><a href="#createReferrals">createReferrals(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create referrals in Primero</p>
<p>Use this function to bulk refer to one or multiple cases from Primero to a single user</p>
</dd>
<dt><a href="#updateReferral">updateReferral(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Update a single referral for a specific case in Primero</p>
</dd>
<dt><a href="#getForms">getForms(query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get forms from Primero</p>
<p>Use this function to get forms from Primero that are accessible to this user based on a set of query parameters.
The user can filter the form list by record type and module.</p>
</dd>
<dt><a href="#getLookups">getLookups(query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get lookups from Primero</p>
<p>Use this function to get a paginated list of all lookups that are accessible to this user from Primero.
Note: You can specify a <code>per</code> value to fetch records per page(Defaults to 20).
Also you can specify <code>page</code> value to fetch pagination (Defaults to 1)</p>
</dd>
<dt><a href="#getLocations">getLocations(query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get locations from Primero</p>
<p>Use this function to get a paginated list of all locations that are accessible to this user from Primero.
Note: You can specify a <code>per</code> value to fetch records per page(Defaults to 20).
Also you can specify <code>page</code> value to fetch pagination (Defaults to 1).
Another parameter is <code>hierarchy: true</code> (Defaults to false)</p>
</dd>
</dl>

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

Use this function to get cases from Primero based on a set of query parameters.
Note that in many implementations, the `remote` attribute should be set to `true` to ensure that only cases marked for remote access will be retrieved.
You can specify a `case_id` value to fetch a unique case and a query string to filter result.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum, option to getReferrals |
| options | <code>object</code> | (Optional) an object with a getReferrals key to fetch referrals |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *( Get cases from Primero with query parameters)*  
```js
getCases({
  remote: true,
  query: "sex=male",
});
```
**Example** *(Get case from Primero for a specific case id)*  
```js
getCases({
  remote: true,
  case_id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
});
```
<a name="createCase"></a>

## createCase(params, callback) ⇒ <code>Operation</code>
Create a new case in Primero

Use this function to create a new case in Primero based on a set of Data.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Create a new case in Primero based on a set of Data)*  
```js
createCase({
  data: {
    age: 16,
    sex: "female",
    name: "Edwine Edgemont",
  },
});
```
<a name="updateCase"></a>

## updateCase(id, params, callback) ⇒ <code>Operation</code>
Update an existing case in Primero

Use this function to update an existing case from Primero.
In this implementation, the function uses a case ID to check for the case to update,
Then merge the values submitted in this call into an existing case.
Fields not specified in this request will not be modified.
For nested subform fields, the subform arrays will be recursively merged,
keeping both the existing values and appending the new

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | A case ID to use for the update. |
| params | <code>object</code> | an object with some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Update case for a specific case id)*  
```js
updateCase("6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz", {
  data: {
    age: 16,
    sex: "female",
    name: "Fiona Edgemont",
  },
});
```
<a name="upsertCase"></a>

## upsertCase(params, callback) ⇒ <code>Operation</code>
Upsert case to Primero

Use this function to update an existing case from Primero or to create it otherwise.
In this implementation, we first fetch the list of cases,
then we check if the case exist before choosing the right operation to do.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with an externalIds and some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Upsert case for a specific case id)*  
```js
upsertCase({
  externalIds: ["case_id"],
  data: state => ({
    age: 20,
    sex: "male",
    name: "Alex",
    status: "open",
    case_id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
  }),
});
```
<a name="getReferrals"></a>

## getReferrals(params, callback) ⇒ <code>Operation</code>
Get referrals for a specific case in Primero

Use this function to get the list of referrals of one case from Primero.
The search can be done using either `record id` or `case id`.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with an externalId field to select the attribute to use for matching on case and an externalId value for that case. |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Get referrals for a case in Primero by record id)*  
```js
getReferrals({
  externalId: "record_id",
  id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
});
```
**Example** *(Get referrals for a case in Primero by case id)*  
```js
 getReferrals({
  id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
});
```
<a name="createReferrals"></a>

## createReferrals(params, callback) ⇒ <code>Operation</code>
Create referrals in Primero

Use this function to bulk refer to one or multiple cases from Primero to a single user

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with referral data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Create referrals for multiple cases in Primero)*  
```js
createReferrals({
  data: {
    ids: [
      "749e9c6e-60db-45ec-8f5a-69da7c223a79",
      "dcea6052-07d9-4cfa-9abf-9a36987cdd25",
    ],
    transitioned_to: "primero_cp",
    notes: "This is a bulk referral",
  },
});
```
<a name="updateReferral"></a>

## updateReferral(params, callback) ⇒ <code>Operation</code>
Update a single referral for a specific case in Primero

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with an caseExternalId value to use, the id and the referral id to update. |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Update referral by record id)*  
```js
updateReferral({
  caseExternalId: "record_id",
  id: "749e9c6e-60db-45ec-8f5a-69da7c223a79",
  caseId: "dcea6052-07d9-4cfa-9abf-9a36987cdd25",
  data: (state) => state.data,
});
```
<a name="getForms"></a>

## getForms(query, callback) ⇒ <code>Operation</code>
Get forms from Primero

Use this function to get forms from Primero that are accessible to this user based on a set of query parameters.
The user can filter the form list by record type and module.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Get the list of all forms)*  
```js
getForms();
```
**Example** *(Get the list of all forms for a specific module)*  
```js
getForms({
  module_id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
});
```
<a name="getLookups"></a>

## getLookups(query, callback) ⇒ <code>Operation</code>
Get lookups from Primero

Use this function to get a paginated list of all lookups that are accessible to this user from Primero.
Note: You can specify a `per` value to fetch records per page(Defaults to 20).
Also you can specify `page` value to fetch pagination (Defaults to 1)

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Get lookups from Primero with query parameters)*  
```js
getLookups({
  per: 10000,
  page: 5
});
```
<a name="getLocations"></a>

## getLocations(query, callback) ⇒ <code>Operation</code>
Get locations from Primero

Use this function to get a paginated list of all locations that are accessible to this user from Primero.
Note: You can specify a `per` value to fetch records per page(Defaults to 20).
Also you can specify `page` value to fetch pagination (Defaults to 1).
Another parameter is `hierarchy: true` (Defaults to false)

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum |
| callback | <code>function</code> | (Optional) Callback function |

**Example** *(Get loocations from Primero with query parameters)*  
```js
getLocations({
  page: 1,
  per: 20
})
```
