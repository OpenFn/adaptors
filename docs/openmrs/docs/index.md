## Functions

<dl>
<dt>
    <a href="#create">create(resourceType, data, [callback])</a></dt>
<dt>
    <a href="#createencounter">createEncounter(data, [callback])</a></dt>
<dt>
    <a href="#createpatient">createPatient(data, [callback])</a></dt>
<dt>
    <a href="#get">get(path, query, [callback])</a></dt>
<dt>
    <a href="#getencounter">getEncounter(uuid, [callback])</a></dt>
<dt>
    <a href="#getencounters">getEncounters(query, [callback])</a></dt>
<dt>
    <a href="#getpatient">getPatient(uuid, [callback])</a></dt>
<dt>
    <a href="#post">post(path, data, [callback])</a></dt>
<dt>
    <a href="#searchpatient">searchPatient(query, [callback])</a></dt>
<dt>
    <a href="#searchperson">searchPerson(query, [callback])</a></dt>
<dt>
    <a href="#update">update(resourceType, path, data, [callback])</a></dt>
<dt>
    <a href="#upsert">upsert(resourceType, query, data, [callback])</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#arraytostring">arrayToString()</a>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## create

create(resourceType, data, [callback]) ⇒ <code>Operation</code>

Create a record


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | Type of resource to create. E.g. `person`, `patient`, `encounter`, ... |
| data | <code>OpenMRSData</code> | Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, `data` must be a javascript object, and to create multiple instances of a resources, `data` must be an array of javascript objects. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example** *(Create a person)*  
```js
create("person", {
  names: [
    {
      givenName: "Mohit",
      familyName: "Kumar",
    },
  ],
  gender: "M",
  birthdate: "1997-09-02",
  addresses: [
    {
      address1: "30, Vivekananda Layout, Munnekolal,Marathahalli",
      cityVillage: "Bengaluru",
      country: "India",
      postalCode: "560037",
    },
  ],
});
```

* * *

## createEncounter

createEncounter(data, [callback]) ⇒ <code>Operation</code>

Creates an encounter


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Data parameters of the encounter |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example** *(Create an encounter)*  
```js
createEncounter({
  encounterDatetime: '2023-05-25T06:08:25.000+0000',
  patient: '1fdaa696-e759-4a7d-a066-f1ae557c151b',
  encounterType: 'dd528487-82a5-4082-9c72-ed246bd49591',
  location: 'ba685651-ed3b-4e63-9b35-78893060758a',
  encounterProviders: [],
  visit: {
    patient: '1fdaa696-e759-4a7d-a066-f1ae557c151b',
    visitType: '7b0f5697-27e3-40c4-8bae-f4049abfb4ed',
    startDatetime: '2023-05-25T06:08:25.000+0000',
    stopDatetime: '2023-05-25T06:09:25.000+0000',
  },
})
```

* * *

## createPatient

createPatient(data, [callback]) ⇒ <code>Operation</code>

Creates a new patient


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Object parameters of the patient |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
createPatient({
  identifiers: [
    {
      identifier: '4023287',
      identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334',
      preferred: true,
    },
  ],
  person: {
    gender: 'M',
    age: 42,
    birthdate: '1970-01-01T00:00:00.000+0100',
    birthdateEstimated: false,
    names: [
      {
        givenName: 'Doe',
        familyName: 'John',
      },
    ],
  },
})
```

* * *

## get

get(path, query, [callback]) ⇒ <code>Operation</code>

Make a get request to any OpenMRS endpoint


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| query | <code>object</code> | parameters for the request |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
get("patient", {
  q: "Patient",
  limit: 1,
});
```

* * *

## getEncounter

getEncounter(uuid, [callback]) ⇒ <code>Operation</code>

Gets encounter matching a uuid


| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>object</code> | A uuid for the encounter |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
getEncounter("123")
```

* * *

## getEncounters

getEncounters(query, [callback]) ⇒ <code>Operation</code>

Gets encounters matching params


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | Object for the patient |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
getEncounters({ patient: "123", fromdate: "2023-05-18" })
```

* * *

## getPatient

getPatient(uuid, [callback]) ⇒ <code>Operation</code>

Gets patient matching a uuid


| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | A uuid for the patient |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
getPatient("123")
```
**Example** *(Get a patient by uuid)*  
```js
getPatient('681f8785-c9ca-4dc8-a091-7b869316ff93')
```

* * *

## post

post(path, data, [callback]) ⇒ <code>Operation</code>

Make a post request to any OpenMRS endpoint


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object which defines data that will be used to create a given instance of resource |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
post(
  "idgen/identifiersource/8549f706-7e85-4c1d-9424-217d50a2988b/identifier",
  {}
);
```

* * *

## searchPatient

searchPatient(query, [callback]) ⇒ <code>Operation</code>

Fetch all non-retired patients that match any specified parameters


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | Object with query for the patient. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
searchPatient({ q: "Sarah"})
```

* * *

## searchPerson

searchPerson(query, [callback]) ⇒ <code>Operation</code>

Fetch all non-retired persons that match any specified parameters


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | object with query for the person |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
searchPerson({ q: "Sarah" })
```

* * *

## update

update(resourceType, path, data, [callback]) ⇒ <code>Operation</code>

Update data. A generic helper function to update a resource object of any type.
Updating an object requires to send `all required fields` or the `full body`


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of resource to be updated. E.g. `person`, `patient`, etc. |
| path | <code>string</code> | The `id` or `path` to the `object` to be updated. E.g. `e739808f-f166-42ae-aaf3-8b3e8fa13fda` or `e739808f-f166-42ae-aaf3-8b3e8fa13fda/{collection-name}/{object-id}` |
| data | <code>Object</code> | Data to update. It requires to send `all required fields` or the `full body`. If you want `partial updates`, use `patch` operation. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example** *(a person)*  
```js
update("person", '3cad37ad-984d-4c65-a019-3eb120c9c373',{"gender":"M","birthdate":"1997-01-13"})
```

* * *

## upsert

upsert(resourceType, query, data, [callback]) ⇒ <code>Operation</code>

Upsert a record. A generic helper function used to atomically either insert a row, or on the basis of the row already existing, UPDATE that existing row instead.

**Throws**:

- <code>RangeError</code> - Throws range error


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of a resource to `upsert`. E.g. `trackedEntityInstances` |
| query | <code>Object</code> | A query object that allows to uniquely identify the resource to update. If no matches found, then the resource will be created. |
| data | <code>Object</code> | The data to use for update or create depending on the result of the query. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example** *(For an existing patient using upsert)*  
```js
upsert('patient', { q: '10007JJ' }, { person: { age: 50 } });
```
**Example** *(For non existing patient creating a patient record using upsert )*  
```js
upsert(
  "patient",
  { q: "1000EHE" },
  {
    identifiers: [
      {
        identifier: "1000EHE",
        identifierType: "05a29f94-c0ed-11e2-94be-8c13b969e334",
        location: "44c3efb0-2583-4c80-a79e-1f756a03c0a1",
        preferred: true,
      },
    ],
    person: {
      gender: "M",
      age: 42,
    },
  }
);
```

* * *

