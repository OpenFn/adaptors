## Functions

<dl>
<dt>
    <a href="#createEncounter">createEncounter(params)</a></dt>
<dt>
    <a href="#createPatient">createPatient(params)</a></dt>
<dt>
    <a href="#get">get(path, params)</a></dt>
<dt>
    <a href="#getEncounter">getEncounter(uuid)</a></dt>
<dt>
    <a href="#getEncounters">getEncounters(params)</a></dt>
<dt>
    <a href="#getPatient">getPatient(params)</a></dt>
<dt>
    <a href="#post">post(path, params)</a></dt>
<dt>
    <a href="#searchPatient">searchPatient(params)</a></dt>
<dt>
    <a href="#searchPerson">searchPerson(params)</a></dt>
</dl>

## createEncounter

createEncounter(params) ⇒ <code>Operation</code>
Creates an encounter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | parameters of the encounter |

**Example**  
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

createPatient(params) ⇒ <code>Operation</code>
Creates a new patient

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | parameters of the patient |

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

get(path, params) ⇒ <code>Operation</code>
Make a get request to any OpenMRS endpoint

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>object</code> | parameters for the request |

**Example**  
```js
get("encounterType", {
  v: "default",
  limit: 1,
});
```

* * *

## getEncounter

getEncounter(uuid) ⇒ <code>Operation</code>
Gets encounter matching a uuid

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>object</code> | object with uuid for the encounter |

**Example**  
```js
getEncounter("123")
```

* * *

## getEncounters

getEncounters(params) ⇒ <code>Operation</code>
Gets encounters matching params

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Criteria object for the patient |

**Example**  
```js
getEncounters({patient: "123", fromdate: "2023-05-18"})
```

* * *

## getPatient

getPatient(params) ⇒ <code>Operation</code>
Gets patient matching a uuid

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | object with uuid for the patient |

**Example**  
```js
getPatient("123")
```

* * *

## post

post(path, params) ⇒ <code>Operation</code>
Make a post request to any OpenMRS endpoint

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>object</code> | parameters for the request |

**Example**  
```js
post("encounterType", {
  v: "default",
  limit: 1,
});
```

* * *

## searchPatient

searchPatient(params) ⇒ <code>Operation</code>
Fetch all non-retired patients that match any specified parameters

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | object with query for the patient |

**Example**  
```js
searchPatient({ q: Sarah })
```

* * *

## searchPerson

searchPerson(params) ⇒ <code>Operation</code>
Fetch all non-retired persons that match any specified parameters

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | object with query for the person |

**Example**  
```js
searchPerson({ q: Sarah })
```

* * *

