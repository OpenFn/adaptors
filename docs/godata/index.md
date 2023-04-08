## Functions

<dl>
<dt>
    <a href="#getCase">getCase(id, query, callback)</a></dt>
<dt>
    <a href="#getContact">getContact(id, query, callback)</a></dt>
<dt>
    <a href="#getLocation">getLocation(query, callback)</a></dt>
<dt>
    <a href="#getOutbreak">getOutbreak(query, callback)</a></dt>
<dt>
    <a href="#getReferenceData">getReferenceData(query, callback)</a></dt>
<dt>
    <a href="#listCases">listCases(id, callback)</a></dt>
<dt>
    <a href="#listContacts">listContacts(id, callback)</a></dt>
<dt>
    <a href="#listLocations">listLocations(callback)</a></dt>
<dt>
    <a href="#listOutbreaks">listOutbreaks(callback)</a></dt>
<dt>
    <a href="#listReferenceData">listReferenceData(callback)</a></dt>
<dt>
    <a href="#upsertCase">upsertCase(id, externalId, goDataCase, callback)</a></dt>
<dt>
    <a href="#upsertContact">upsertContact(id, externalId, goDataContact, callback)</a></dt>
<dt>
    <a href="#upsertLocation">upsertLocation(externalId, goDataLocation, callback)</a></dt>
<dt>
    <a href="#upsertOutbreak">upsertOutbreak(outbreak, callback)</a></dt>
<dt>
    <a href="#upsertReferenceData">upsertReferenceData(externalId, goDataReferenceData, callback)</a></dt>
</dl>

## getCase

getCase(id, query, callback) ⇒ <code>Operation</code>
Get one or multiple cases within an outbreak from a query filter

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
    <td>id</td><td><code>string</code></td><td><p>Outbreak id</p>
</td>
    </tr><tr>
    <td>query</td><td><code>object</code></td><td><p>An object with a query filter parameter</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

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

* * *

## getContact

getContact(id, query, callback) ⇒ <code>Operation</code>
Get one or multiple contacts within an outbreak from a query filter

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
    <td>id</td><td><code>string</code></td><td><p>Outbreak id</p>
</td>
    </tr><tr>
    <td>query</td><td><code>object</code></td><td><p>An object with a query filter parameter</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getContact("343d-dc3e", {"where":{"firstName": "Luca"}}, state => {
   console.log(state.data);
   return state;
 });
```

* * *

## getLocation

getLocation(query, callback) ⇒ <code>Operation</code>
Get one or multiple locations from a query filter

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
    <td>query</td><td><code>object</code></td><td><p>An object with a query filter parameter</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getLocation({"where":{"name": "30 DE OCTUBRE"}}, state => {
   console.log(state.data);
   return state;
 });
```

* * *

## getOutbreak

getOutbreak(query, callback) ⇒ <code>Operation</code>
Get one or multiple outbreaks from a query filter

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
    <td>query</td><td><code>object</code></td><td><p>An object with a query filter parameter</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getOutbreak({"where":{"name": "Outbreak demo"}}, state => {
   console.log(state.data);
   return state;
 });
```

* * *

## getReferenceData

getReferenceData(query, callback) ⇒ <code>Operation</code>
Get one or multiple reference data from a query filter

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
    <td>query</td><td><code>object</code></td><td><p>An object with a query filter parameter</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getReferenceData({"where":{"categoryId": "LNG_REFERENCE_DATA_CATEGORY_CENTRE_NAME"}}, state => {
   console.log(state.data);
   return state;
 });
```

* * *

## listCases

listCases(id, callback) ⇒ <code>Operation</code>
Fetch the list of cases within a particular outbreak using its ID.

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
    <td>id</td><td><code>string</code></td><td><p>Outbreak id</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
listCases("343d-dc3e", state => {
   console.log(state);
   return state;
 });
```

* * *

## listContacts

listContacts(id, callback) ⇒ <code>Operation</code>
Fetch the list of contacts within a particular outbreak using its ID.

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
    <td>id</td><td><code>string</code></td><td><p>Outbreak id</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
listContacts("343d-dc3e", // Outbreak Id
   state => {
      console.log(state);
   return state;
 });
```

* * *

## listLocations

listLocations(callback) ⇒ <code>Operation</code>
Fetch the list of locations

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
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
listLocations(state => {
   console.log(state.data);
   return state;
 });
```

* * *

## listOutbreaks

listOutbreaks(callback) ⇒ <code>Operation</code>
Fetch the list of outbreaks

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
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
listOutbreaks(state => {
   console.log(state.data);
   return state;
 });
```

* * *

## listReferenceData

listReferenceData(callback) ⇒ <code>Operation</code>
Fetch the list of reference data

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
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
listReferenceData(state => {
   console.log(state.data);
   return state;
 });
```

* * *

## upsertCase

upsertCase(id, externalId, goDataCase, callback) ⇒ <code>Operation</code>
Upsert case to godata using an external id to mach a specific record

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
    <td>id</td><td><code>string</code></td><td><p>Outbreak id</p>
</td>
    </tr><tr>
    <td>externalId</td><td><code>string</code></td><td><p>External Id to match</p>
</td>
    </tr><tr>
    <td>goDataCase</td><td><code>object</code></td><td><p>an object with some case data.</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

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

* * *

## upsertContact

upsertContact(id, externalId, goDataContact, callback) ⇒ <code>Operation</code>
Upsert contact to godata using an external id to match a specific record.

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
    <td>id</td><td><code>string</code></td><td><p>Outbreak id</p>
</td>
    </tr><tr>
    <td>externalId</td><td><code>string</code></td><td><p>External Id to match</p>
</td>
    </tr><tr>
    <td>goDataContact</td><td><code>object</code></td><td><p>an object with some case data.</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

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

* * *

## upsertLocation

upsertLocation(externalId, goDataLocation, callback) ⇒ <code>Operation</code>
Upsert location to godata

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
    <td>externalId</td><td><code>string</code></td><td><p>External Id to match</p>
</td>
    </tr><tr>
    <td>goDataLocation</td><td><code>object</code></td><td><p>an object with some location data.</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
upsertLocation('name', {...})
```

* * *

## upsertOutbreak

upsertOutbreak(outbreak, callback) ⇒ <code>Operation</code>
Upsert outbreak to godata

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
    <td>outbreak</td><td><code>object</code></td><td><p>an object with an externalId and some outbreak data.</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
upsertOutbreak({externalId: "3dec33-ede3", data: {...}})
```

* * *

## upsertReferenceData

upsertReferenceData(externalId, goDataReferenceData, callback) ⇒ <code>Operation</code>
Upsert reference data to godata

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
    <td>externalId</td><td><code>string</code></td><td><p>External Id to match</p>
</td>
    </tr><tr>
    <td>goDataReferenceData</td><td><code>object</code></td><td><p>an object with some reference data.</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
upsertReferenceData('id', {...})
```

* * *

