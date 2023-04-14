## Functions

<dl>
<dt>
    <a href="#cleanupState">cleanupState(state)</a></dt>
<dt>
    <a href="#createEncounter">createEncounter(params)</a></dt>
<dt>
    <a href="#getPatient">getPatient(params)</a></dt>
<dt>
    <a href="#getPatients">getPatients(criteria, options)</a></dt>
<dt>
    <a href="#getPeople">getPeople(criteria, options)</a></dt>
<dt>
    <a href="#login">login(state)</a></dt>
<dt>
    <a href="#req">req(params, callback)</a></dt>
</dl>

## cleanupState

cleanupState(state) ⇒ <code>State</code>
Removes unserializable or confidential keys from the state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
cleanupState(state)
```

* * *

## createEncounter

createEncounter(params) ⇒ <code>Operation</code>
Creates an encounter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | parameters of the encounter |

**Example**  
```js
execute(
  createEncounter(params)(state)
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
execute(
  getPatient({ uuid: 123 })
)(state)
```

* * *

## getPatients

getPatients(criteria, options) ⇒ <code>Operation</code>
Gets patients matching criteria

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| criteria | <code>object</code> | Criteria object for the patient |
| options | <code>object</code> | Options |

**Example**  
```js
execute(
  getPatients(criteria)
)(state)
```

* * *

## getPeople

getPeople(criteria, options) ⇒ <code>Operation</code>
Gets people matching criteria

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| criteria | <code>object</code> | Criteria object for the people |
| options | <code>object</code> | Options object for the handling of responses |

**Example**  
```js
execute(
  getPeople(
  { identifier: '007' },
  { exactlyOne: true }
)(state)
```

* * *

## login

login(state) ⇒ <code>State</code>
Logs in to OpenMRS, gets a session token.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
login(state)
```

* * *

## req

req(params, callback) ⇒ <code>Operation</code>
Make a request to any OpenMRS endpoint and execute a callback

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | parameters for the request |
| callback | <code>function</code> | a callback to execute on the next state |

**Example**  
```js
req({
  method: 'GET'
  url: 'encounterType'
})(state)
```

* * *

