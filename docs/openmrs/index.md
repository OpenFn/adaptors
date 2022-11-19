<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * _static_
        * [.getPatient](#module_Adaptor.getPatient)
            * [new exports.getPatient(params)](#new_module_Adaptor.getPatient_new)
        * [.getPeople](#module_Adaptor.getPeople)
            * [new exports.getPeople(criteria, options)](#new_module_Adaptor.getPeople_new)
        * [.createEncounter](#module_Adaptor.createEncounter)
            * [new exports.createEncounter(params)](#new_module_Adaptor.createEncounter_new)
        * [.req](#module_Adaptor.req)
            * [new exports.req(params, callback)](#new_module_Adaptor.req_new)
        * [.execute(operations)](#module_Adaptor.execute) ⇒ <code>Operation</code>
        * [.getPatients(criteria, options)](#module_Adaptor.getPatients) ⇒ <code>Operation</code>
    * _inner_
        * [~login(state)](#module_Adaptor..login) ⇒ <code>State</code>
        * [~cleanupState(state)](#module_Adaptor..cleanupState) ⇒ <code>State</code>

<a name="module_Adaptor.getPatient"></a>

### Adaptor.getPatient
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.getPatient_new"></a>

#### new exports.getPatient(params)
Gets patient matching a uuid


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | object with uuid for the patient |

**Example**  
```js
execute(
  getPatient({ uuid: 123 })
)(state)
```
<a name="module_Adaptor.getPeople"></a>

### Adaptor.getPeople
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.getPeople_new"></a>

#### new exports.getPeople(criteria, options)
Gets people matching criteria


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
<a name="module_Adaptor.createEncounter"></a>

### Adaptor.createEncounter
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.createEncounter_new"></a>

#### new exports.createEncounter(params)
Creates an encounter


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | parameters of the encounter |

**Example**  
```js
execute(
  createEncounter(params)(state)
```
<a name="module_Adaptor.req"></a>

### Adaptor.req
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.req_new"></a>

#### new exports.req(params, callback)
Make a request to any OpenMRS endpoint and execute a callback


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
<a name="module_Adaptor.execute"></a>

### Adaptor.execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for OpenMRS.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Array</code> | Operations to be performed. |

**Example**  
```js
execute(
  create('foo'),
  delete('bar')
)(state)
```
<a name="module_Adaptor.getPatients"></a>

### Adaptor.getPatients(criteria, options) ⇒ <code>Operation</code>
Gets patients matching criteria

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  

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
<a name="module_Adaptor..login"></a>

### Adaptor~login(state) ⇒ <code>State</code>
Logs in to OpenMRS, gets a session token.

**Kind**: inner method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
login(state)
```
<a name="module_Adaptor..cleanupState"></a>

### Adaptor~cleanupState(state) ⇒ <code>State</code>
Removes unserializable or confidential keys from the state.

**Kind**: inner method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type |
| --- | --- |
| state | <code>State</code> | 

**Example**  
```js
cleanupState(state)
```
