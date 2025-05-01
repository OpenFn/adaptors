<dl>
<dt>
    <a href="#getcase">getCase(id, query, callback)</a></dt>
<dt>
    <a href="#getcontact">getContact(id, query, callback)</a></dt>
<dt>
    <a href="#getlocation">getLocation(query, callback)</a></dt>
<dt>
    <a href="#getoutbreak">getOutbreak(query, callback)</a></dt>
<dt>
    <a href="#getreferencedata">getReferenceData(query, callback)</a></dt>
<dt>
    <a href="#listcases">listCases(id, callback)</a></dt>
<dt>
    <a href="#listcontacts">listContacts(id, callback)</a></dt>
<dt>
    <a href="#listlocations">listLocations(callback)</a></dt>
<dt>
    <a href="#listoutbreaks">listOutbreaks(callback)</a></dt>
<dt>
    <a href="#listreferencedata">listReferenceData(callback)</a></dt>
<dt>
    <a href="#upsertcase">upsertCase(id, externalId, goDataCase, callback)</a></dt>
<dt>
    <a href="#upsertcontact">upsertContact(id, externalId, goDataContact, callback)</a></dt>
<dt>
    <a href="#upsertlocation">upsertLocation(externalId, goDataLocation, callback)</a></dt>
<dt>
    <a href="#upsertoutbreak">upsertOutbreak(outbreak, callback)</a></dt>
<dt>
    <a href="#upsertreferencedata">upsertReferenceData(externalId, goDataReferenceData, callback)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
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
### getCase

<p><code>getCase(id, query, callback) ⇒ Operation</code></p>

Get one or multiple cases within an outbreak from a query filter


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

* * *

### getContact

<p><code>getContact(id, query, callback) ⇒ Operation</code></p>

Get one or multiple contacts within an outbreak from a query filter


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

* * *

### getLocation

<p><code>getLocation(query, callback) ⇒ Operation</code></p>

Get one or multiple locations from a query filter


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

* * *

### getOutbreak

<p><code>getOutbreak(query, callback) ⇒ Operation</code></p>

Get one or multiple outbreaks from a query filter


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

* * *

### getReferenceData

<p><code>getReferenceData(query, callback) ⇒ Operation</code></p>

Get one or multiple reference data from a query filter


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

* * *

### listCases

<p><code>listCases(id, callback) ⇒ Operation</code></p>

Fetch the list of cases within a particular outbreak using its ID.


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

* * *

### listContacts

<p><code>listContacts(id, callback) ⇒ Operation</code></p>

Fetch the list of contacts within a particular outbreak using its ID.


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

* * *

### listLocations

<p><code>listLocations(callback) ⇒ Operation</code></p>

Fetch the list of locations


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

* * *

### listOutbreaks

<p><code>listOutbreaks(callback) ⇒ Operation</code></p>

Fetch the list of outbreaks


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

* * *

### listReferenceData

<p><code>listReferenceData(callback) ⇒ Operation</code></p>

Fetch the list of reference data


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

* * *

### upsertCase

<p><code>upsertCase(id, externalId, goDataCase, callback) ⇒ Operation</code></p>

Upsert case to godata using an external id to mach a specific record


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

* * *

### upsertContact

<p><code>upsertContact(id, externalId, goDataContact, callback) ⇒ Operation</code></p>

Upsert contact to godata using an external id to match a specific record.


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

* * *

### upsertLocation

<p><code>upsertLocation(externalId, goDataLocation, callback) ⇒ Operation</code></p>

Upsert location to godata


| Param | Type | Description |
| --- | --- | --- |
| externalId | <code>string</code> | External Id to match |
| goDataLocation | <code>object</code> | an object with some location data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**
```js
upsertLocation('name', {...})
```

* * *

### upsertOutbreak

<p><code>upsertOutbreak(outbreak, callback) ⇒ Operation</code></p>

Upsert outbreak to godata


| Param | Type | Description |
| --- | --- | --- |
| outbreak | <code>object</code> | an object with an externalId and some outbreak data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**
```js
upsertOutbreak({externalId: "3dec33-ede3", data: {...}})
```

* * *

### upsertReferenceData

<p><code>upsertReferenceData(externalId, goDataReferenceData, callback) ⇒ Operation</code></p>

Upsert reference data to godata


| Param | Type | Description |
| --- | --- | --- |
| externalId | <code>string</code> | External Id to match |
| goDataReferenceData | <code>object</code> | an object with some reference data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example**
```js
upsertReferenceData('id', {...})
```

* * *


