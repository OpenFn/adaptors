<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute](#module_Adaptor.execute)
        * [new exports.execute(operations)](#new_module_Adaptor.execute_new)
    * [.listContacts(id, callback)](#module_Adaptor.listContacts) ⇒ <code>Operation</code>
    * [.getContact(id, query, callback)](#module_Adaptor.getContact) ⇒ <code>Operation</code>
    * [.upsertContact(id, externalId, goDataContact, callback)](#module_Adaptor.upsertContact) ⇒ <code>Operation</code>
    * [.listOutbreaks(callback)](#module_Adaptor.listOutbreaks) ⇒ <code>Operation</code>
    * [.getOutbreak(query, callback)](#module_Adaptor.getOutbreak) ⇒ <code>Operation</code>
    * [.upsertOutbreak(outbreak, callback)](#module_Adaptor.upsertOutbreak) ⇒ <code>Operation</code>
    * [.listCases(id, callback)](#module_Adaptor.listCases) ⇒ <code>Operation</code>
    * [.getCase(id, query, callback)](#module_Adaptor.getCase) ⇒ <code>Operation</code>
    * [.upsertCase(id, externalId, goDataCase, callback)](#module_Adaptor.upsertCase) ⇒ <code>Operation</code>
    * [.listLocations(callback)](#module_Adaptor.listLocations) ⇒ <code>Operation</code>
    * [.getLocation(query, callback)](#module_Adaptor.getLocation) ⇒ <code>Operation</code>
    * [.upsertLocation(externalId, goDataLocation, callback)](#module_Adaptor.upsertLocation) ⇒ <code>Operation</code>
    * [.listReferenceData(callback)](#module_Adaptor.listReferenceData) ⇒ <code>Operation</code>
    * [.getReferenceData(query, callback)](#module_Adaptor.getReferenceData) ⇒ <code>Operation</code>
    * [.upsertReferenceData(externalId, goDataReferenceData, callback)](#module_Adaptor.upsertReferenceData) ⇒ <code>Operation</code>

<a name="module_Adaptor.execute"></a>

### Adaptor.execute
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.execute_new"></a>

#### new exports.execute(operations)
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.


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
<a name="module_Adaptor.listContacts"></a>

### Adaptor.listContacts(id, callback) ⇒ <code>Operation</code>
Fetch the list of contacts within a particular outbreak using its ID.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.getContact"></a>

### Adaptor.getContact(id, query, callback) ⇒ <code>Operation</code>
Get one or multiple contacts within an outbreak from a query filter

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.upsertContact"></a>

### Adaptor.upsertContact(id, externalId, goDataContact, callback) ⇒ <code>Operation</code>
Upsert contact to godata using an external id to match a specific record.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.listOutbreaks"></a>

### Adaptor.listOutbreaks(callback) ⇒ <code>Operation</code>
Fetch the list of outbreaks

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.getOutbreak"></a>

### Adaptor.getOutbreak(query, callback) ⇒ <code>Operation</code>
Get one or multiple outbreaks from a query filter

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.upsertOutbreak"></a>

### Adaptor.upsertOutbreak(outbreak, callback) ⇒ <code>Operation</code>
Upsert outbreak to godata

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| outbreak | <code>object</code> | an object with an externalId and some outbreak data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**  
```js
upsertOutbreak({externalId: "3dec33-ede3", data: {...}})
```
<a name="module_Adaptor.listCases"></a>

### Adaptor.listCases(id, callback) ⇒ <code>Operation</code>
Fetch the list of cases within a particular outbreak using its ID.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.getCase"></a>

### Adaptor.getCase(id, query, callback) ⇒ <code>Operation</code>
Get one or multiple cases within an outbreak from a query filter

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.upsertCase"></a>

### Adaptor.upsertCase(id, externalId, goDataCase, callback) ⇒ <code>Operation</code>
Upsert case to godata using an external id to mach a specific record

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.listLocations"></a>

### Adaptor.listLocations(callback) ⇒ <code>Operation</code>
Fetch the list of locations

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.getLocation"></a>

### Adaptor.getLocation(query, callback) ⇒ <code>Operation</code>
Get one or multiple locations from a query filter

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.upsertLocation"></a>

### Adaptor.upsertLocation(externalId, goDataLocation, callback) ⇒ <code>Operation</code>
Upsert location to godata

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.listReferenceData"></a>

### Adaptor.listReferenceData(callback) ⇒ <code>Operation</code>
Fetch the list of reference data

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.getReferenceData"></a>

### Adaptor.getReferenceData(query, callback) ⇒ <code>Operation</code>
Get one or multiple reference data from a query filter

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.upsertReferenceData"></a>

### Adaptor.upsertReferenceData(externalId, goDataReferenceData, callback) ⇒ <code>Operation</code>
Upsert reference data to godata

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
