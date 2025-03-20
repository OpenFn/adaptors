<dl>
<dt>
    <a href="#create">create(resourceType, resource, params, callback)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#utils_addExtension">utils.addExtension(resource, url, value)</a>
</dt>

<dt>
    <a href="#utils_cc">utils.cc()</a>
</dt>

<dt>
    <a href="#utils_coding">utils.coding(code, system)</a>
</dt>

<dt>
    <a href="#utils_composite">utils.composite(object, key, value)</a>
</dt>

<dt>
    <a href="#utils_concept">utils.concept()</a>
</dt>

<dt>
    <a href="#utils_findExtension">utils.findExtension(obj, targetUrl, [path])</a>
</dt>

<dt>
    <a href="#utils_id">utils.id()</a>
</dt>

<dt>
    <a href="#utils_identifier">utils.identifier(input, [system])</a>
</dt>

<dt>
    <a href="#utils_ref">utils.ref()</a>
</dt>

<dt>
    <a href="#utils_reference">utils.reference(ref)</a>
</dt>

<dt>
    <a href="#utils_setSystemMap">utils.setSystemMap()</a>
</dt>

<dt>
    <a href="#builders_carePlan">builders.carePlan(type, props)</a>
</dt>

<dt>
    <a href="#builders_encounter">builders.encounter(type, props)</a>
</dt>

<dt>
    <a href="#builders_medication">builders.medication(type, props)</a>
</dt>

<dt>
    <a href="#builders_medicationAdministration">builders.medicationAdministration(type, props)</a>
</dt>

<dt>
    <a href="#builders_medicationDispense">builders.medicationDispense(type, props)</a>
</dt>

<dt>
    <a href="#builders_medicationRequest">builders.medicationRequest(type, props)</a>
</dt>

<dt>
    <a href="#builders_observation">builders.observation(type, props)</a>
</dt>

<dt>
    <a href="#builders_patient">builders.patient(type, props)</a>
</dt>

<dt>
    <a href="#builders_relatedPerson">builders.relatedPerson(type, props)</a>
</dt>
</dl>


## Functions
### create

<p><code>create(resourceType, resource, params, callback) ⇒ Operation</code></p>

Creates a new resource with a server assigned resourceType.
The resource object doesn't need resourceType or id


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>FhirResourceTypes</code> | The resource type to create |
| resource | <code>FhirResource</code> | The resource to create |
| params | <code>object</code> | (Optional) FHIR parameters to control and configure resource creation. You can specify a version ie r4 here. |
| callback | <code>function</code> | (Optional) callback function |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
**Example:** Create a new patient
```js
create('Patient', {
  name: [
    {
      use: 'official',
      family: 'La Paradisio',
      given: ['Josephine', 'Nessa'],
    },
  ],
});
```

* * *


## utils

These functions belong to the utils namespace.
### utils.addExtension {#utils_addExtension}

<p><code>addExtension(resource, url, value)</code></p>

Add an extension to a resource (or object).
An object will be created and added to an `extension` array on the provided resource. 
The extension array will be set if it does not exist on the resource.
The value will be smartly written to the object, ie, valueDateTime or valueReference or valueString


| Param | Type | Description |
| --- | --- | --- |
| resource |  | a FHIR resource object to add an extension too |
| url | <code>string</code> | the URL to set for the extension |
| value |  | the value that the extension should contain |


* * *


### utils.cc {#utils_cc}

<p><code>cc()</code></p>

Alias for util.concept()


* * *


### utils.coding {#utils_coding}

<p><code>coding(code, system)</code></p>

Create a coding object { code, system }. Systems will be mapped using the system map.


| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | the code value |
| system | <code>string</code> | URL to the system. Well be mapped using the system map. |


* * *


### utils.composite {#utils_composite}

<p><code>composite(object, key, value)</code></p>

Write a value to the target object using a typed key
Ie, if key is `value` and the value is a date time string,
this function will write `valueDateTime` to the object.

This function is poorly named.


| Param | Type | Description |
| --- | --- | --- |
| object |  | the object to write the composite key to |
| key | <code>string</code> | the base key to use to write the value |
| value |  | some value to write to the object |


* * *


### utils.concept {#utils_concept}

<p><code>concept()</code></p>

Create a codeableConcept. Codings can be coding objects or
[code, system] tuples
if the first argument is a string, it will be set as the text.
Systems will be mapped with the system map

**Example:** <Create a codeableConcept
```js
const myConcept = util.concept(['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])  
* @example <caption><Create a codeableConcept with text</caption>
const myConcept = util.concept('smart care id', ['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])  
```

* * *


### utils.findExtension {#utils_findExtension}

<p><code>findExtension(obj, targetUrl, [path])</code></p>

Find an extension with a given url in some array


| Param | Type | Description |
| --- | --- | --- |
| obj |  | a fhir resource |
| targetUrl | <code>string</code> | the extension URL you want to find |
| [path] | <code>string</code> | a path to extract from the resource. Optional. |


* * *


### utils.id {#utils_id}

<p><code>id()</code></p>

Alias for util.identifier()


* * *


### utils.identifier {#utils_identifier}

<p><code>identifier(input, [system])</code></p>

Create an identifier resource. Systems will be mapped against the system map.
The input can be a string value, or an identifier object.
If input is an array of identifiers, an array of mapped/parsed values will be returned.


| Param | Type | Description |
| --- | --- | --- |
| input |  | an array of strings, or a identifier value as a string or object |
| [system] | <code>string</code> | the string system to use by default if |


* * *


### utils.ref {#utils_ref}

<p><code>ref()</code></p>

Alias for util.reference()


* * *


### utils.reference {#utils_reference}

<p><code>reference(ref)</code></p>

Create a reference object of the form { reference }
If ref is an array, each item will be mapped and an array returned.
If ref is a FHIR resource, a reference to it will be generated
If ref is a string, it'll be treated as a reference id and returned as an object
If ref is a valid FHIR reference, it'll just be returned.


| Param | Description |
| --- | --- |
| ref | the thing to generate a reference from |


* * *


### utils.setSystemMap {#utils_setSystemMap}

<p><code>setSystemMap()</code></p>

Define a set of mapped system values.

Builder functions will use this mappings when they encounter them in system keys. Useful for setting shortcuts.

**Example:** Set shortcut sustem mappings
```js
util.setSystemMap({
  SmartCareID: 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'
});
builders.patient('patient', { identifier: util.identifier('xyz', 'SmartCareId') })
};
```

* * *


## builders

These functions belong to the builders namespace.
### builders.carePlan {#builders_carePlan}

<p><code>carePlan(type, props)</code></p>

Create a FHIR CarePlan resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.encounter {#builders_encounter}

<p><code>encounter(type, props)</code></p>

Create a FHIR Encounter resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.medication {#builders_medication}

<p><code>medication(type, props)</code></p>

Create a FHIR Medication resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.medicationAdministration {#builders_medicationAdministration}

<p><code>medicationAdministration(type, props)</code></p>

Create a FHIR MedicationAdministration resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.medicationDispense {#builders_medicationDispense}

<p><code>medicationDispense(type, props)</code></p>

Create a FHIR MedicationDispense resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.medicationRequest {#builders_medicationRequest}

<p><code>medicationRequest(type, props)</code></p>

Create a FHIR MedicationRequest resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.observation {#builders_observation}

<p><code>observation(type, props)</code></p>

Create a FHIR Observation resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.patient {#builders_patient}

<p><code>patient(type, props)</code></p>

Create a FHIR Patient resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.relatedPerson {#builders_relatedPerson}

<p><code>relatedPerson(type, props)</code></p>

Create a FHIR RelatedPerson resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


