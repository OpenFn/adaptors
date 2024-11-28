
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
    <a href="#builders_address">builders.address(type, props)</a>
</dt>

<dt>
    <a href="#builders_appointment">builders.appointment(type, props)</a>
</dt>

<dt>
    <a href="#builders_contactPoint">builders.contactPoint(type, props)</a>
</dt>

<dt>
    <a href="#builders_encounter">builders.encounter(type, props)</a>
</dt>

<dt>
    <a href="#builders_extension">builders.extension(type, props)</a>
</dt>

<dt>
    <a href="#builders_healthcareService">builders.healthcareService(type, props)</a>
</dt>

<dt>
    <a href="#builders_humanName">builders.humanName(type, props)</a>
</dt>

<dt>
    <a href="#builders_location">builders.location(type, props)</a>
</dt>

<dt>
    <a href="#builders_medicationAdministration">builders.medicationAdministration(type, props)</a>
</dt>

<dt>
    <a href="#builders_observation">builders.observation(type, props)</a>
</dt>

<dt>
    <a href="#builders_organization">builders.organization(type, props)</a>
</dt>

<dt>
    <a href="#builders_patient">builders.patient(type, props)</a>
</dt>

<dt>
    <a href="#builders_practitioner">builders.practitioner(type, props)</a>
</dt>

<dt>
    <a href="#builders_practitionerRole">builders.practitionerRole(type, props)</a>
</dt>

<dt>
    <a href="#builders_relatedPerson">builders.relatedPerson(type, props)</a>
</dt>

<dt>
    <a href="#builders_schedule">builders.schedule(type, props)</a>
</dt>

<dt>
    <a href="#builders_slot">builders.slot(type, props)</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#cursor">cursor()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
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
### builders.address {#builders_address}

<p><code>address(type, props)</code></p>

Create a FHIR Address resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.appointment {#builders_appointment}

<p><code>appointment(type, props)</code></p>

Create a FHIR Appointment resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.contactPoint {#builders_contactPoint}

<p><code>contactPoint(type, props)</code></p>

Create a FHIR ContactPoint resource.


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


### builders.extension {#builders_extension}

<p><code>extension(type, props)</code></p>

Create a FHIR Extension resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.healthcareService {#builders_healthcareService}

<p><code>healthcareService(type, props)</code></p>

Create a FHIR HealthcareService resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.humanName {#builders_humanName}

<p><code>humanName(type, props)</code></p>

Create a FHIR HumanName resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.location {#builders_location}

<p><code>location(type, props)</code></p>

Create a FHIR Location resource.


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


### builders.observation {#builders_observation}

<p><code>observation(type, props)</code></p>

Create a FHIR Observation resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.organization {#builders_organization}

<p><code>organization(type, props)</code></p>

Create a FHIR Organization resource.


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


### builders.practitioner {#builders_practitioner}

<p><code>practitioner(type, props)</code></p>

Create a FHIR Practitioner resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.practitionerRole {#builders_practitionerRole}

<p><code>practitionerRole(type, props)</code></p>

Create a FHIR PractitionerRole resource.


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


### builders.schedule {#builders_schedule}

<p><code>schedule(type, props)</code></p>

Create a FHIR Schedule resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


### builders.slot {#builders_slot}

<p><code>slot(type, props)</code></p>

Create a FHIR Slot resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The profile id for the resource variant |
| props |  | Properties to apply to the resource |


* * *


