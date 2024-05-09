## Functions

<dl>
<dt>
    <a href="#cleanupstate">cleanupState(state)</a></dt>
<dt>
    <a href="#getfhir">getFHIR(path, params, callback)</a></dt>
<dt>
    <a href="#login">login(state)</a></dt>
</dl>

The following functions are exported from the common adaptor:
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
    <a href="/adaptors/packages/common-docs#datefns">dateFns()</a>
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
    <a href="/adaptors/packages/common-docs#http">http()</a>
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

## cleanupState

cleanupState(state) ⇒ <code>State</code>

Discards the auth token from state.

**Returns**: <code>State</code> - state - but with a "token" removed from the configuration key.  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
cleanupState(state)
```

* * *

## getFHIR

getFHIR(path, params, callback) ⇒ <code>Operation</code>

Get FHIR resources from OpenIMIS


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>object</code> | data to create the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
getFHIR("Patient")
```

* * *

## login

login(state) ⇒ <code>State</code>

Logs in to OpenIMIS.

**Returns**: <code>State</code> - state - but with a "token" added to the configuration key.  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>State</code> | Runtime state. |

**Example**  
```js
login(state)
```

* * *

