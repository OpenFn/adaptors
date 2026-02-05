
This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#datatypes_addExtension">datatypes.addExtension(resource, url, value)</a>
</dt>

<dt>
    <a href="#datatypes_cc">datatypes.cc()</a>
</dt>

<dt>
    <a href="#datatypes_coding">datatypes.coding(code, system)</a>
</dt>

<dt>
    <a href="#datatypes_composite">datatypes.composite(object, key, value)</a>
</dt>

<dt>
    <a href="#datatypes_concept">datatypes.concept(value, extra)</a>
</dt>

<dt>
    <a href="#datatypes_ext">datatypes.ext()</a>
</dt>

<dt>
    <a href="#datatypes_extension">datatypes.extension(url, value, props)</a>
</dt>

<dt>
    <a href="#datatypes_findExtension">datatypes.findExtension(obj, targetUrl, [path])</a>
</dt>

<dt>
    <a href="#datatypes_id">datatypes.id()</a>
</dt>

<dt>
    <a href="#datatypes_identifier">datatypes.identifier(id, ext, [system])</a>
</dt>

<dt>
    <a href="#datatypes_ref">datatypes.ref()</a>
</dt>

<dt>
    <a href="#datatypes_reference">datatypes.reference(ref)</a>
</dt>

<dt>
    <a href="#datatypes_setSystemMap">datatypes.setSystemMap()</a>
</dt>

<dt>
    <a href="#builders_appointment">builders.appointment(props)</a>
</dt>

<dt>
    <a href="#builders_condition">builders.condition(props)</a>
</dt>

<dt>
    <a href="#builders_encounter">builders.encounter(props)</a>
</dt>

<dt>
    <a href="#builders_episodeOfCare">builders.episodeOfCare(props)</a>
</dt>

<dt>
    <a href="#builders_extension">builders.extension(type, props)</a>
</dt>

<dt>
    <a href="#builders_location">builders.location(props)</a>
</dt>

<dt>
    <a href="#builders_medication">builders.medication(props)</a>
</dt>

<dt>
    <a href="#builders_medicationDispense">builders.medicationDispense(props)</a>
</dt>

<dt>
    <a href="#builders_medicationRequest">builders.medicationRequest(props)</a>
</dt>

<dt>
    <a href="#builders_observation">builders.observation(type, props)</a>
</dt>

<dt>
    <a href="#builders_organization">builders.organization(props)</a>
</dt>

<dt>
    <a href="#builders_patient">builders.patient(props)</a>
</dt>

<dt>
    <a href="#builders_practitioner">builders.practitioner(props)</a>
</dt>

<dt>
    <a href="#builders_procedure">builders.procedure(props)</a>
</dt>

<dt>
    <a href="#builders_serviceRequest">builders.serviceRequest(type, props)</a>
</dt>

<dt>
    <a href="#builders_specimen">builders.specimen(props)</a>
</dt>
</dl>



## datatypes

These functions belong to the datatypes namespace.
### datatypes.addExtension {#datatypes_addExtension}

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


### datatypes.cc {#datatypes_cc}

<p><code>cc()</code></p>

Alias for b.concept()



* * *


### datatypes.coding {#datatypes_coding}

<p><code>coding(code, system)</code></p>

Create a coding object { code, system }. Systems will be mapped using the system map.


| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | the code value |
| system | <code>string</code> | URL to the system. Will be mapped using the system map. |



* * *


### datatypes.composite {#datatypes_composite}

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


### datatypes.concept {#datatypes_concept}

<p><code>concept(value, extra)</code></p>

Create a CodeableConcept. Codings can be coding objects or
[code, system, extra] tuples (such as passed to b.coding())
Systems will be mapped with the system map


| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | the value |
| extra | <code>object</code> | Extra properties to write to the coding |


**Example:** Create a codeableConcept
```js
const myConcept = util.concept(['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
```
**Example:** Create a codeableConcept with text
```js
const myConcept = util.concept('smart care id', ['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
```

* * *


### datatypes.ext {#datatypes_ext}

<p><code>ext()</code></p>

Alias for b.extension()



* * *


### datatypes.extension {#datatypes_extension}

<p><code>extension(url, value, props)</code></p>

Create an extension with a system and value
Values will be typemapped (ie, `value` -> `valueString`)
Optionally pass extra keys on the third argument


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | the URL to set for the extension |
| value |  | the value that the extension should contain |
| props |  | extra props to add to the extension |



* * *


### datatypes.findExtension {#datatypes_findExtension}

<p><code>findExtension(obj, targetUrl, [path])</code></p>

Find an extension with a given url in some array


| Param | Type | Description |
| --- | --- | --- |
| obj |  | a fhir resource |
| targetUrl | <code>string</code> | the extension URL you want to find |
| [path] | <code>string</code> | a path to extract from the resource. Optional. |



* * *


### datatypes.id {#datatypes_id}

<p><code>id()</code></p>

Alias for b.identifier()



* * *


### datatypes.identifier {#datatypes_identifier}

<p><code>identifier(id, ext, [system])</code></p>

Create an Identifier. Systems will be mapped against the system map. Pass extensions as extra arguments.


| Param | Type | Description |
| --- | --- | --- |
| id |  | A string identifier, a FHIR identifier object, or an array of either. |
| ext |  | Any other arguments will be treated as extensions |
| [system] | <code>string</code> | the string system to use by default if |



* * *


### datatypes.ref {#datatypes_ref}

<p><code>ref()</code></p>

Alias for b.reference()



* * *


### datatypes.reference {#datatypes_reference}

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


### datatypes.setSystemMap {#datatypes_setSystemMap}

<p><code>setSystemMap()</code></p>

Define a set of mapped system values.

Builder functions will use this mappings when they encounter them in system keys. Useful for setting shortcuts.


**Example:** Set shortcut system mappings
```js
b.setSystemMap({
  SmartCareID: 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'
});
create(builders.patient({ identifier: b.identifier('xyz', 'SmartCareId') }))
```

* * *


## builders

These functions belong to the builders namespace.
### builders.appointment {#builders_appointment}

<p><code>appointment(props)</code></p>

Create a Appointment resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | External Ids for this item |
| [props.status] | <code>string</code> | proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error | checked-in | waitlist |
| [props.cancelationReason] | <code>CodeableConcept</code> | The coded reason for the appointment being cancelled |
| [props.serviceCategory] | <code>CodeableConcept</code> | A broad categorization of the service that is to be performed during this appointment |
| [props.serviceType] | <code>CodeableConcept</code> | The specific service that is to be performed during this appointment |
| [props.specialty] | <code>CodeableConcept</code> | The specialty of a practitioner that would be required to perform the service requested in this appointment |
| [props.appointmentType] | <code>CodeableConcept</code> | The style of appointment or patient that has been booked in the slot (not service type) |
| [props.reasonCode] | <code>CodeableConcept</code> | Coded reason this appointment is scheduled |
| [props.reasonReference] | <code>Reference</code> | Reason the appointment is to take place (resource) |
| [props.priority] | <code>unsignedInt</code> | Used to make informed decisions if needing to re-prioritize |
| [props.description] | <code>string</code> | Shown on a subject line in a meeting request, or appointment list |
| [props.supportingInformation] | <code>Reference</code> | Additional information to support the appointment |
| [props.start] | <code>instant</code> | When appointment is to take place |
| [props.end] | <code>instant</code> | When appointment is to conclude |
| [props.minutesDuration] | <code>number</code> | Can be less than start/end (e.g. estimate) |
| [props.slot] | <code>Reference</code> | The slots that this appointment is filling |
| [props.created] | <code>dateTime</code> | The date that this appointment was initially created |
| [props.comment] | <code>string</code> | Additional comments |
| [props.patientInstruction] | <code>string</code> | Detailed information and instructions for the patient |
| [props.basedOn] | <code>Reference</code> | The service request this appointment is allocated to assess |
| [props.participant] | <code>BackboneElement</code> | Participants involved in appointment |
| [props.requestedPeriod] | <code>Period</code> | Potential date/time interval(s) requested to allocate the appointment within |



* * *


### builders.condition {#builders_condition}

<p><code>condition(props)</code></p>

Create a Condition resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | External Ids for this condition |
| [props.clinicalStatus] | <code>CodeableConcept</code> | active | recurrence | relapse | inactive | remission | resolved |
| [props.verificationStatus] | <code>CodeableConcept</code> | unconfirmed | provisional | differential | confirmed | refuted | entered-in-error |
| [props.category] | <code>CodeableConcept</code> | problem-list-item | encounter-diagnosis |
| [props.severity] | <code>CodeableConcept</code> | Subjective severity of condition |
| [props.code] | <code>CodeableConcept</code> | Condition Identification |
| [props.bodySite] | <code>CodeableConcept</code> | Anatomical location, if relevant |
| [props.subject] | <code>Reference</code> | Who has the condition? |
| [props.encounter] | <code>Reference</code> | Encounter created as part of |
| [props.onset] | <code>dateTime</code> | Diagnosis date |
| [props.abatement] | <code>dateTime</code> \| <code>Age</code> \| <code>Period</code> \| <code>Range</code> \| <code>string</code> | When in resolution/remission |
| [props.recordedDate] | <code>dateTime</code> | Date record was first recorded |
| [props.recorder] | <code>Reference</code> | Who recorded the condition |
| [props.asserter] | <code>Reference</code> | Person who asserts this condition |
| [props.stage] | <code>BackboneElement</code> | Stage/grade, usually assessed formally |
| [props.evidence] | <code>BackboneElement</code> | Supporting evidence |
| [props.note] | <code>Annotation</code> | Additional information about the Condition |



* * *


### builders.encounter {#builders_encounter}

<p><code>encounter(props)</code></p>

Create a Encounter resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | Identifier(s) by which this encounter is known |
| [props.status] | <code>string</code> | planned | arrived | triaged | in-progress | onleave | finished | cancelled + |
| [props.statusHistory] | <code>BackboneElement</code> | List of past encounter statuses |
| [props.class] | <code>Coding</code> | Department in which the encounter took place |
| [props.classHistory] | <code>BackboneElement</code> | List of past encounter classes |
| [props.type] | <code>CodeableConcept</code> | Specific type of encounter |
| [props.serviceType] | <code>CodeableConcept</code> | Specific type of service |
| [props.priority] | <code>CodeableConcept</code> | Indicates the urgency of the encounter |
| [props.subject] | <code>Reference</code> | Patient associated with the encounter |
| [props.episodeOfCare] | <code>Reference</code> | Episode(s) of care that this encounter should be recorded against |
| [props.basedOn] | <code>Reference</code> | The ServiceRequest that initiated this encounter |
| [props.participant] | <code>BackboneElement</code> | List of participants involved in the encounter |
| [props.appointment] | <code>Reference</code> | The appointment that scheduled this encounter |
| [props.period] | <code>Period</code> | The start and end time of the encounter |
| [props.length] | <code>Duration</code> | Quantity of time the encounter lasted (less time absent) |
| [props.reasonCode] | <code>CodeableConcept</code> | Coded reason the encounter takes place |
| [props.reasonReference] | <code>Reference</code> | Reason the encounter takes place (reference) |
| [props.diagnosis] | <code>BackboneElement</code> | The list of diagnosis relevant to this encounter |
| [props.account] | <code>Reference</code> | The set of accounts that may be used for billing for this Encounter |
| [props.hospitalization] | <code>BackboneElement</code> | Details about the admission to a healthcare service |
| [props.location] | <code>BackboneElement</code> | Encounter location |
| [props.serviceProvider] | <code>Reference</code> | Health facility responsible for the encounter |
| [props.partOf] | <code>Reference</code> | Another Encounter this encounter is part of |



* * *


### builders.episodeOfCare {#builders_episodeOfCare}

<p><code>episodeOfCare(props)</code></p>

Create a EpisodeOfCare resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | Business Identifier(s) relevant for this EpisodeOfCare |
| [props.status] | <code>string</code> | planned | waitlist | active | onhold | finished | cancelled | entered-in-error |
| [props.statusHistory] | <code>BackboneElement</code> | Past list of status codes (the current status may be included to cover the start date of the status) |
| [props.type] | <code>CodeableConcept</code> | Episode of care classification |
| [props.diagnosis] | <code>BackboneElement</code> | The list of diagnosis relevant to this episode of care |
| [props.patient] | <code>Reference</code> | The patient who is the focus of this episode of care |
| [props.managingOrganization] | <code>Reference</code> | Organization that assumes care |
| [props.period] | <code>Period</code> | Start and end datest of the Episode of care |
| [props.referralRequest] | <code>Reference</code> | Originating Referral Request(s) |
| [props.careManager] | <code>Reference</code> | Care manager/care coordinator for the patient |
| [props.team] | <code>Reference</code> | Other practitioners facilitating this episode of care |
| [props.account] | <code>Reference</code> | The set of accounts that may be used for billing for this EpisodeOfCare |



* * *


### builders.extension {#builders_extension}

<p><code>extension(type, props)</code></p>

Create a Extension resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | A profile type: one of SzAuthorizerExtension,SzChiefdomExtension,SzInkhundlaExtension,SzLocationCodeExtension,SzReferralRecipientExtension,SzRegistrationDate,SzTestingLabExtension |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Unique id for inter-element referencing |
| [props.extension] | <code>Extension</code> | Extension |
| [props.url] | <code>string</code> | identifies the meaning of the extension |
| [props.value] | <code>Reference</code> | Value of extension |



* * *


### builders.location {#builders_location}

<p><code>location(props)</code></p>

Create a Location resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | Unique code or number identifying the location to its users |
| [props.status] | <code>string</code> | active | suspended | inactive |
| [props.operationalStatus] | <code>Coding</code> | The operational status of the location (typically only for a bed/room) |
| [props.name] | <code>string</code> | Location Name |
| [props.alias] | <code>string</code> | A list of alternate names that the location is known as, or was known as, in the past |
| [props.description] | <code>string</code> | Additional details about the location that could be displayed as further information to identify the location beyond its name |
| [props.mode] | <code>string</code> | instance | kind |
| [props.type] | <code>CodeableConcept</code> | Location Type |
| [props.telecom] | <code>ContactPoint</code> | Contact details of the location |
| [props.address] | <code>Address</code> | Physical location |
| [props.physicalType] | <code>CodeableConcept</code> | Physical form of the location |
| [props.position] | <code>BackboneElement</code> | The absolute geographic location |
| [props.managingOrganization] | <code>Reference</code> | Organization responsible for provisioning and upkeep |
| [props.partOf] | <code>Reference</code> | Another Location this one is physically a part of |
| [props.hoursOfOperation] | <code>BackboneElement</code> | What days/times during a week is this location usually open |
| [props.availabilityExceptions] | <code>string</code> | Description of availability exceptions |
| [props.endpoint] | <code>Reference</code> | Technical endpoints providing access to services operated for the location |



* * *


### builders.medication {#builders_medication}

<p><code>medication(props)</code></p>

Create a Medication resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | Business identifier for this medication |
| [props.code] | <code>CodeableConcept</code> | ELMIS Product Code |
| [props.status] | <code>string</code> | active | inactive | entered-in-error |
| [props.manufacturer] | <code>Reference</code> | Manufacturer of the item |
| [props.form] | <code>CodeableConcept</code> | powder | tablets | capsule + |
| [props.amount] | <code>Ratio</code> | Amount of drug in package |
| [props.ingredient] | <code>BackboneElement</code> | Active or inactive ingredient |
| [props.batch] | <code>BackboneElement</code> | Details about packaged medications |



* * *


### builders.medicationDispense {#builders_medicationDispense}

<p><code>medicationDispense(props)</code></p>

Create a MedicationDispense resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | External identifier |
| [props.partOf] | <code>Reference</code> | Event that dispense is part of |
| [props.status] | <code>string</code> | preparation | in-progress | cancelled | on-hold | completed | entered-in-error | stopped | declined | unknown |
| [props.statusReason] | <code>CodeableConcept</code> \| <code>Reference</code> | Why a dispense was not performed |
| [props.category] | <code>CodeableConcept</code> | Type of medication dispense |
| [props.medication] | <code>CodeableConcept</code> | Supplied Medication |
| [props.subject] | <code>Reference</code> | Who the dispense is for |
| [props.context] | <code>Reference</code> | Encounter / Episode associated with event |
| [props.supportingInformation] | <code>Reference</code> | Information that supports the dispensing of the medication |
| [props.performer] | <code>BackboneElement</code> | Dispensing Practitioner |
| [props.location] | <code>Reference</code> | Where the dispense occurred |
| [props.authorizingPrescription] | <code>Reference</code> | Medication order that authorizes the dispense |
| [props.type] | <code>CodeableConcept</code> | Trial fill, partial fill, emergency fill, etc. |
| [props.quantity] | <code>Quantity</code> | Amount dispensed |
| [props.daysSupply] | <code>Quantity</code> | Amount of medication expressed as a timing amount |
| [props.whenPrepared] | <code>dateTime</code> | When product was packaged and reviewed |
| [props.whenHandedOver] | <code>dateTime</code> | When product was given out |
| [props.destination] | <code>Reference</code> | Where the medication was sent |
| [props.receiver] | <code>Reference</code> | Who collected the medication |
| [props.note] | <code>Annotation</code> | Information about the dispense |
| [props.dosageInstruction] | <code>Dosage</code> | How the medication is to be used by the patient or administered by the caregiver |
| [props.substitution] | <code>BackboneElement</code> | Whether a substitution was performed on the dispense |
| [props.detectedIssue] | <code>Reference</code> | Clinical issue with action |
| [props.eventHistory] | <code>Reference</code> | A list of relevant lifecycle events |



* * *


### builders.medicationRequest {#builders_medicationRequest}

<p><code>medicationRequest(props)</code></p>

Create a MedicationRequest resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | External ids for this request |
| [props.status] | <code>string</code> | active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown |
| [props.statusReason] | <code>CodeableConcept</code> | Reason for current status |
| [props.intent] | <code>string</code> | proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option |
| [props.category] | <code>CodeableConcept</code> | Type of medication usage |
| [props.priority] | <code>string</code> | routine | urgent | asap | stat |
| [props.doNotPerform] | <code>boolean</code> | True if request is prohibiting action |
| [props.reported] | <code>boolean</code> \| <code>Reference</code> | Reported rather than primary record |
| [props.medication] | <code>CodeableConcept</code> | Medication to be taken |
| [props.subject] | <code>Reference</code> | Who or group medication request is for |
| [props.encounter] | <code>Reference</code> | Encounter created as part of encounter/admission/stay |
| [props.supportingInformation] | <code>Reference</code> | Information to support ordering of the medication |
| [props.authoredOn] | <code>dateTime</code> | Medication Request Date |
| [props.requester] | <code>Reference</code> | Who/What requested the Request |
| [props.performer] | <code>Reference</code> | Intended performer of administration |
| [props.performerType] | <code>CodeableConcept</code> | Desired kind of performer of the medication administration |
| [props.recorder] | <code>Reference</code> | Person who entered the request |
| [props.reasonCode] | <code>CodeableConcept</code> | Reason or indication for ordering or not ordering the medication |
| [props.reasonReference] | <code>Reference</code> | Condition or observation that supports why the prescription is being written |
| [props.instantiatesCanonical] | <code>canonical</code> | Instantiates FHIR protocol or definition |
| [props.instantiatesUri] | <code>string</code> | Instantiates external protocol or definition |
| [props.basedOn] | <code>Reference</code> | What request fulfills |
| [props.groupIdentifier] | <code>Identifier</code> | Composite request this is part of |
| [props.courseOfTherapyType] | <code>CodeableConcept</code> | Overall pattern of medication administration |
| [props.insurance] | <code>Reference</code> | Associated insurance coverage |
| [props.note] | <code>Annotation</code> | Information about the prescription |
| [props.dosageInstruction] | <code>Dosage</code> | Dosage Instruction |
| [props.dispenseRequest] | <code>BackboneElement</code> | Medication supply authorization |
| [props.substitution] | <code>BackboneElement</code> | Any restrictions on medication substitution |
| [props.priorPrescription] | <code>Reference</code> | An order/prescription that is being replaced |
| [props.detectedIssue] | <code>Reference</code> | Clinical Issue with action |
| [props.eventHistory] | <code>Reference</code> | A list of events of interest in the lifecycle |



* * *


### builders.observation {#builders_observation}

<p><code>observation(type, props)</code></p>

Create a Observation resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | A profile type: one of SzCauseOfDeath,SzClinicalObservation,SzLabResult,SzMannerOfDeath,SzVitalSigns |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | Business Identifier for observation |
| [props.basedOn] | <code>Reference</code> | Fulfills plan, proposal or order |
| [props.partOf] | <code>Reference</code> | Part of referenced event |
| [props.status] | <code>string</code> | registered | preliminary | final | amended + |
| [props.category] | <code>CodeableConcept</code> | Classification of  type of observation |
| [props.code] | <code>CodeableConcept</code> | Cause of death |
| [props.subject] | <code>Reference</code> | The decedent |
| [props.focus] | <code>Reference</code> | What the observation is about, when it is not about the subject of record |
| [props.encounter] | <code>Reference</code> | Healthcare event during which this observation is made |
| [props.effective] | <code>dateTime</code> \| <code>Period</code> \| <code>Timing</code> \| <code>instant</code> | Clinically relevant time/time-period for observation |
| [props.issued] | <code>instant</code> | Date/Time this version was made available |
| [props.performer] | <code>Reference</code> | Cause of death certifier (coroner or medical examiner) |
| [props.value] | <code>CodeableConcept</code> | Actual result |
| [props.dataAbsentReason] | <code>CodeableConcept</code> | Why the result is missing |
| [props.interpretation] | <code>CodeableConcept</code> | High, low, normal, etc. |
| [props.note] | <code>Annotation</code> | Comments about the observation |
| [props.bodySite] | <code>CodeableConcept</code> | Observed body part |
| [props.method] | <code>CodeableConcept</code> | How it was done |
| [props.specimen] | <code>Reference</code> | Specimen used for this observation |
| [props.device] | <code>Reference</code> | (Measurement) Device |
| [props.referenceRange] | <code>BackboneElement</code> | Provides guide for interpretation |
| [props.hasMember] | <code>Reference</code> | Related resource that belongs to the Observation group |
| [props.derivedFrom] | <code>Reference</code> | Related measurements the observation is made from |
| [props.component] | <code>BackboneElement</code> | Cause of death time interval for Intermediate, Intermediate I, Intermediat II, Underlying |



* * *


### builders.organization {#builders_organization}

<p><code>organization(props)</code></p>

Create a Organization resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | Identifies this organization  across multiple systems |
| [props.active] | <code>boolean</code> | Whether the organization's record is still in active use |
| [props.type] | <code>CodeableConcept</code> | Organization Type |
| [props.name] | <code>string</code> | Organization' name |
| [props.alias] | <code>string</code> | A list of alternate names that the organization is known as, or was known as in the past |
| [props.telecom] | <code>ContactPoint</code> | A contact detail for the organization |
| [props.address] | <code>Address</code> | An address for the organization |
| [props.partOf] | <code>Reference</code> | The organization of which this organization forms a part |
| [props.contact] | <code>BackboneElement</code> | Contact for the organization for a certain purpose |
| [props.endpoint] | <code>Reference</code> | Technical endpoints providing access to services operated for the organization |



* * *


### builders.patient {#builders_patient}

<p><code>patient(props)</code></p>

Create a Patient resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Date the patient was registered |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | Patient's Identification Number |
| [props.active] | <code>boolean</code> | Whether this patient's record is in active use |
| [props.name] | <code>HumanName</code> | Patient's name |
| [props.telecom] | <code>ContactPoint</code> | A contact detail for the individual |
| [props.gender] | <code>string</code> | Sex at birth: male | female | other | unknown |
| [props.birthDate] | <code>date</code> | Date of birth: YYYY-MM-DD |
| [props.deceased] | <code>boolean</code> \| <code>dateTime</code> | Indicates if the individual is deceased or not |
| [props.address] | <code>Address</code> | An address for the individual |
| [props.maritalStatus] | <code>CodeableConcept</code> | Marital (civil) status of a patient |
| [props.multipleBirth] | <code>boolean</code> \| <code>integer</code> | Whether patient is part of a multiple birth |
| [props.photo] | <code>Attachment</code> | Image of the patient |
| [props.contact] | <code>BackboneElement</code> | A contact party (e.g. guardian, partner, friend) for the patient |
| [props.communication] | <code>BackboneElement</code> | A language which may be used to communicate with the patient about his or her health |
| [props.generalPractitioner] | <code>Reference</code> | Patient's nominated primary care provider |
| [props.managingOrganization] | <code>Reference</code> | Organization that is the custodian of the patient record |
| [props.link] | <code>BackboneElement</code> | Link to another patient resource that concerns the same actual person |



* * *


### builders.practitioner {#builders_practitioner}

<p><code>practitioner(props)</code></p>

Create a Practitioner resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | An identifier for the person as this agent |
| [props.active] | <code>boolean</code> | Whether this practitioner's record is in active use |
| [props.name] | <code>HumanName</code> | Practitioner's name |
| [props.telecom] | <code>ContactPoint</code> | A contact detail for the practitioner (that apply to all roles) |
| [props.address] | <code>Address</code> | Address(es) of the practitioner that are not role specific (typically home address) |
| [props.gender] | <code>string</code> | Sex at birth: male | female | other | unknown |
| [props.birthDate] | <code>date</code> | The date  on which the practitioner was born |
| [props.photo] | <code>Attachment</code> | Image of the person |
| [props.qualification] | <code>BackboneElement</code> | Certification, licenses, or training pertaining to the provision of care |
| [props.communication] | <code>CodeableConcept</code> | A language the practitioner can use in patient communication |



* * *


### builders.procedure {#builders_procedure}

<p><code>procedure(props)</code></p>

Create a Procedure resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | External Identifiers for this procedure |
| [props.instantiatesCanonical] | <code>canonical</code> | Instantiates FHIR protocol or definition |
| [props.instantiatesUri] | <code>string</code> | Instantiates external protocol or definition |
| [props.basedOn] | <code>Reference</code> | A request for this procedure |
| [props.partOf] | <code>Reference</code> | Part of referenced event |
| [props.status] | <code>string</code> | preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown |
| [props.statusReason] | <code>CodeableConcept</code> | Reason for current status |
| [props.category] | <code>CodeableConcept</code> | Classification of the procedure |
| [props.code] | <code>CodeableConcept</code> | Procedure Code |
| [props.subject] | <code>Reference</code> | Who the procedure was performed on |
| [props.encounter] | <code>Reference</code> | Encounter created as part of |
| [props.performed] | <code>dateTime</code> \| <code>Period</code> \| <code>string</code> \| <code>Age</code> \| <code>Range</code> | When the procedure was performed |
| [props.recorder] | <code>Reference</code> | Who recorded the procedure |
| [props.asserter] | <code>Reference</code> | Person who asserts this procedure |
| [props.performer] | <code>BackboneElement</code> | The people who performed the procedure |
| [props.location] | <code>Reference</code> | Where the procedure happened |
| [props.reasonCode] | <code>CodeableConcept</code> | Coded reason procedure performed |
| [props.reasonReference] | <code>Reference</code> | The justification that the procedure was performed |
| [props.bodySite] | <code>CodeableConcept</code> | Target body sites |
| [props.outcome] | <code>CodeableConcept</code> | The result of procedure |
| [props.report] | <code>Reference</code> | Any report resulting from the procedure |
| [props.complication] | <code>CodeableConcept</code> | Complication following the procedure |
| [props.complicationDetail] | <code>Reference</code> | A condition that is a result of the procedure |
| [props.followUp] | <code>CodeableConcept</code> | Instructions for follow up |
| [props.note] | <code>Annotation</code> | Additional information about the procedure |
| [props.focalDevice] | <code>BackboneElement</code> | Manipulated, implanted, or removed device |
| [props.usedReference] | <code>Reference</code> | Items used during procedure |
| [props.usedCode] | <code>CodeableConcept</code> | Coded items used during the procedure |



* * *


### builders.serviceRequest {#builders_serviceRequest}

<p><code>serviceRequest(type, props)</code></p>

Create a ServiceRequest resource.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | A profile type: one of SzLabRequest,SzReferral |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | Identifiers assigned to this order |
| [props.instantiatesCanonical] | <code>canonical</code> | Instantiates FHIR protocol or definition |
| [props.instantiatesUri] | <code>string</code> | Instantiates external protocol or definition |
| [props.basedOn] | <code>Reference</code> | What request fulfills |
| [props.replaces] | <code>Reference</code> | What request replaces |
| [props.requisition] | <code>Identifier</code> | Composite Request ID |
| [props.status] | <code>string</code> | draft | active | on-hold | revoked | completed | entered-in-error | unknown |
| [props.intent] | <code>string</code> | proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option |
| [props.category] | <code>CodeableConcept</code> | Type of service request |
| [props.priority] | <code>string</code> | routine | urgent | asap | stat |
| [props.doNotPerform] | <code>boolean</code> | True if service/procedure should not be performed |
| [props.code] | <code>CodeableConcept</code> | Local test code |
| [props.orderDetail] | <code>CodeableConcept</code> | Additional order information |
| [props.quantity] | <code>Quantity</code> \| <code>Ratio</code> \| <code>Range</code> | Service amount |
| [props.subject] | <code>Reference</code> | Patient's information |
| [props.encounter] | <code>Reference</code> | Encounter information |
| [props.occurrence] | <code>dateTime</code> \| <code>Period</code> \| <code>Timing</code> | When service should occur |
| [props.asNeeded] | <code>boolean</code> \| <code>CodeableConcept</code> | Preconditions for service |
| [props.authoredOn] | <code>dateTime</code> | Date request signed |
| [props.requester] | <code>Reference</code> | Who/what is requesting service |
| [props.performerType] | <code>CodeableConcept</code> | Performer role |
| [props.performer] | <code>Reference</code> | Requested performer |
| [props.locationCode] | <code>CodeableConcept</code> | Requested location |
| [props.locationReference] | <code>Reference</code> | Requested location |
| [props.reasonCode] | <code>CodeableConcept</code> | Explanation/Justification for procedure or service |
| [props.reasonReference] | <code>Reference</code> | Explanation/Justification for service or service |
| [props.insurance] | <code>Reference</code> | Associated insurance coverage |
| [props.supportingInfo] | <code>Reference</code> | Additional clinical information |
| [props.specimen] | <code>Reference</code> | Lab test specimen |
| [props.bodySite] | <code>CodeableConcept</code> | Location on Body |
| [props.note] | <code>Annotation</code> | Comments |
| [props.patientInstruction] | <code>string</code> | Patient or consumer-oriented instructions |
| [props.relevantHistory] | <code>Reference</code> | Request provenance |



* * *


### builders.specimen {#builders_specimen}

<p><code>specimen(props)</code></p>

Create a Specimen resource.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Properties to apply to the resource (includes common and custom properties). |
| [props.id] | <code>string</code> | Logical id of this artifact |
| [props.meta] | <code>Meta</code> | Metadata about the resource |
| [props.implicitRules] | <code>string</code> | A set of rules under which this content was created |
| [props.language] | <code>string</code> | Language of the resource content |
| [props.text] | <code>Narrative</code> | Text summary of the resource, for human interpretation |
| [props.contained] | <code>Resource</code> | Contained, inline Resources |
| [props.extension] | <code>Extension</code> | Additional content defined by implementations |
| [props.modifierExtension] | <code>Extension</code> | Extensions that cannot be ignored |
| [props.identifier] | <code>Identifier</code> | External Identifier |
| [props.accessionIdentifier] | <code>Identifier</code> | Identifier assigned by the lab |
| [props.status] | <code>string</code> | available | unavailable | unsatisfactory | entered-in-error |
| [props.type] | <code>CodeableConcept</code> | Type of specimen being collected |
| [props.subject] | <code>Reference</code> | Patient associated with the specimen being collected |
| [props.receivedTime] | <code>dateTime</code> | The time when specimen was received for processing |
| [props.parent] | <code>Reference</code> | Specimen from which this specimen originated |
| [props.request] | <code>Reference</code> | Why the specimen was collected |
| [props.collection] | <code>BackboneElement</code> | Specimen collection information |
| [props.processing] | <code>BackboneElement</code> | Processing and processing step details |
| [props.container] | <code>BackboneElement</code> | Direct container of specimen (tube/slide, etc.) |
| [props.condition] | <code>CodeableConcept</code> | State of the specimen |
| [props.note] | <code>Annotation</code> | Comments |



* * *


