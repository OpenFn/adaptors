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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>State</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
cleanupState(state)
```

* * *

## createEncounter

createEncounter(params) ⇒ <code>Operation</code>
Creates an encounter

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>parameters of the encounter</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>object with uuid for the patient</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>criteria</td><td><code>object</code></td><td><p>Criteria object for the patient</p>
</td>
    </tr><tr>
    <td>options</td><td><code>object</code></td><td><p>Options</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>criteria</td><td><code>object</code></td><td><p>Criteria object for the people</p>
</td>
    </tr><tr>
    <td>options</td><td><code>object</code></td><td><p>Options object for the handling of responses</p>
</td>
    </tr>  </tbody>
</table>

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
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>State</code></td><td><p>Runtime state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
login(state)
```

* * *

## req

req(params, callback) ⇒ <code>Operation</code>
Make a request to any OpenMRS endpoint and execute a callback

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>parameters for the request</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>a callback to execute on the next state</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
req({
  method: 'GET'
  url: 'encounterType'
})(state)
```

* * *

