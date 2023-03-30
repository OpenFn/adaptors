## Functions

<dl>
<dt><a href="#login">login(state)</a> ⇒ <code>State</code></dt>
<dd><p>Logs in to OpenMRS, gets a session token.</p>
</dd>
<dt><a href="#cleanupState">cleanupState(state)</a> ⇒ <code>State</code></dt>
<dd><p>Removes unserializable or confidential keys from the state.</p>
</dd>
<dt><a href="#getPatient">getPatient(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Gets patient matching a uuid</p>
</dd>
<dt><a href="#getPatients">getPatients(criteria, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Gets patients matching criteria</p>
</dd>
<dt><a href="#getPeople">getPeople(criteria, options)</a> ⇒ <code>Operation</code></dt>
<dd><p>Gets people matching criteria</p>
</dd>
<dt><a href="#createEncounter">createEncounter(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Creates an encounter</p>
</dd>
<dt><a href="#req">req(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a request to any OpenMRS endpoint and execute a callback</p>
</dd>
</dl>

<a name="login"></a>

## login(state) ⇒ <code>State</code>
Logs in to OpenMRS, gets a session token.

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
Removes unserializable or confidential keys from the state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
cleanupState(state)
```
<a name="getPatient"></a>

## getPatient(params) ⇒ <code>Operation</code>
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
<a name="getPatients"></a>

## getPatients(criteria, options) ⇒ <code>Operation</code>
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
<a name="getPeople"></a>

## getPeople(criteria, options) ⇒ <code>Operation</code>
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
<a name="createEncounter"></a>

## createEncounter(params) ⇒ <code>Operation</code>
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
<a name="req"></a>

## req(params, callback) ⇒ <code>Operation</code>
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
