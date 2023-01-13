## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#listContacts">listContacts(id, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Fetch the list of contacts within a particular outbreak using its ID.</p>
</dd>
<dt><a href="#getContact">getContact(id, query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get one or multiple contacts within an outbreak from a query filter</p>
</dd>
<dt><a href="#upsertContact">upsertContact(id, externalId, goDataContact, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Upsert contact to godata using an external id to match a specific record.</p>
</dd>
<dt><a href="#listOutbreaks">listOutbreaks(callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Fetch the list of outbreaks</p>
</dd>
<dt><a href="#getOutbreak">getOutbreak(query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get one or multiple outbreaks from a query filter</p>
</dd>
<dt><a href="#upsertOutbreak">upsertOutbreak(outbreak, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Upsert outbreak to godata</p>
</dd>
<dt><a href="#listCases">listCases(id, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Fetch the list of cases within a particular outbreak using its ID.</p>
</dd>
<dt><a href="#getCase">getCase(id, query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get one or multiple cases within an outbreak from a query filter</p>
</dd>
<dt><a href="#upsertCase">upsertCase(id, externalId, goDataCase, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Upsert case to godata using an external id to mach a specific record</p>
</dd>
<dt><a href="#listLocations">listLocations(callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Fetch the list of locations</p>
</dd>
<dt><a href="#getLocation">getLocation(query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get one or multiple locations from a query filter</p>
</dd>
<dt><a href="#upsertLocation">upsertLocation(externalId, goDataLocation, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Upsert location to godata</p>
</dd>
<dt><a href="#listReferenceData">listReferenceData(callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Fetch the list of reference data</p>
</dd>
<dt><a href="#getReferenceData">getReferenceData(query, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get one or multiple reference data from a query filter</p>
</dd>
<dt><a href="#upsertReferenceData">upsertReferenceData(externalId, goDataReferenceData, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Upsert reference data to godata</p>
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
<a name="listContacts"></a>

## listContacts(id, callback) ⇒ <code>Operation</code>
Fetch the list of contacts within a particular outbreak using its ID.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Outbreak id |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
listContacts("343d-dc3e", // Outbreak Id
   state => {
      console.log(state);
   return state;
 });
```
<a name="getContact"></a>

## getContact(id, query, callback) ⇒ <code>Operation</code>
Get one or multiple contacts within an outbreak from a query filter

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Outbreak id |
| query | <code>object</code> | An object with a query filter parameter |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
getContact("343d-dc3e", {"where":{"firstName": "Luca"}}, state => {
   console.log(state.data);
   return state;
 });
```
<a name="upsertContact"></a>

## upsertContact(id, externalId, goDataContact, callback) ⇒ <code>Operation</code>
Upsert contact to godata using an external id to match a specific record.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Outbreak id |
| externalId | <code>string</code> | External Id to match |
| goDataContact | <code>object</code> | an object with some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
upsertContact("4dce-3eedce3-rd33", 'visualId',
   {
     firstName: 'Luca',
     gender: 'male',
     'age:years': '20'
     ...
   }
 )
```
<a name="listOutbreaks"></a>

## listOutbreaks(callback) ⇒ <code>Operation</code>
Fetch the list of outbreaks

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
listOutbreaks(state => {
   console.log(state.data);
   return state;
 });
```
<a name="getOutbreak"></a>

## getOutbreak(query, callback) ⇒ <code>Operation</code>
Get one or multiple outbreaks from a query filter

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | An object with a query filter parameter |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
getOutbreak({"where":{"name": "Outbreak demo"}}, state => {
   console.log(state.data);
   return state;
 });
```
<a name="upsertOutbreak"></a>

## upsertOutbreak(outbreak, callback) ⇒ <code>Operation</code>
Upsert outbreak to godata

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| outbreak | <code>object</code> | an object with an externalId and some outbreak data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
upsertOutbreak({externalId: "3dec33-ede3", data: {...}})
```
<a name="listCases"></a>

## listCases(id, callback) ⇒ <code>Operation</code>
Fetch the list of cases within a particular outbreak using its ID.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Outbreak id |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
listCases("343d-dc3e", state => {
   console.log(state);
   return state;
 });
```
<a name="getCase"></a>

## getCase(id, query, callback) ⇒ <code>Operation</code>
Get one or multiple cases within an outbreak from a query filter

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Outbreak id |
| query | <code>object</code> | An object with a query filter parameter |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
getCase(
   '3b55-cdf4',
   { 'where.relationship': { active: true }, where: { firstName: 'Luca'} },
   state => {
     console.log(state);
     return state;
   }
);
```
<a name="upsertCase"></a>

## upsertCase(id, externalId, goDataCase, callback) ⇒ <code>Operation</code>
Upsert case to godata using an external id to mach a specific record

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Outbreak id |
| externalId | <code>string</code> | External Id to match |
| goDataCase | <code>object</code> | an object with some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
upsertCase("4dce-3eedce3-rd33", 'visualId',
   data: state => {
     const patient = state.data.body;
      return {
        firstName: patient.Patient_name.split(' ')[0],
        lastName: patient.Patient_name.split(' ')[1],
        visualId: patient.Case_ID,
        'age:years': patient.Age_in_year,
        gender: patient.Sex,
      };
 })
```
<a name="listLocations"></a>

## listLocations(callback) ⇒ <code>Operation</code>
Fetch the list of locations

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
listLocations(state => {
   console.log(state.data);
   return state;
 });
```
<a name="getLocation"></a>

## getLocation(query, callback) ⇒ <code>Operation</code>
Get one or multiple locations from a query filter

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | An object with a query filter parameter |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
getLocation({"where":{"name": "30 DE OCTUBRE"}}, state => {
   console.log(state.data);
   return state;
 });
```
<a name="upsertLocation"></a>

## upsertLocation(externalId, goDataLocation, callback) ⇒ <code>Operation</code>
Upsert location to godata

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| externalId | <code>string</code> | External Id to match |
| goDataLocation | <code>object</code> | an object with some location data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
upsertLocation('name', {...})
```
<a name="listReferenceData"></a>

## listReferenceData(callback) ⇒ <code>Operation</code>
Fetch the list of reference data

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
listReferenceData(state => {
   console.log(state.data);
   return state;
 });
```
<a name="getReferenceData"></a>

## getReferenceData(query, callback) ⇒ <code>Operation</code>
Get one or multiple reference data from a query filter

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | An object with a query filter parameter |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
getReferenceData({"where":{"categoryId": "LNG_REFERENCE_DATA_CATEGORY_CENTRE_NAME"}}, state => {
   console.log(state.data);
   return state;
 });
```
<a name="upsertReferenceData"></a>

## upsertReferenceData(externalId, goDataReferenceData, callback) ⇒ <code>Operation</code>
Upsert reference data to godata

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| externalId | <code>string</code> | External Id to match |
| goDataReferenceData | <code>object</code> | an object with some reference data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
upsertReferenceData('id', {...})
```
