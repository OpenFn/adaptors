
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import "./values";
import build_SzAppointment, { Appointment_SzAppointment_Props } from "./profiles/SzAppointment";
import build_SzCondition, { Condition_SzCondition_Props } from "./profiles/SzCondition";
import build_SzEncounter, { Encounter_SzEncounter_Props } from "./profiles/SzEncounter";
import build_SzEpisodeOfCare, { EpisodeOfCare_SzEpisodeOfCare_Props } from "./profiles/SzEpisodeOfCare";
import build_SzLocation, { Location_SzLocation_Props } from "./profiles/SzLocation";
import build_SzMedication, { Medication_SzMedication_Props } from "./profiles/SzMedication";
import build_SzMedicationDispense, { MedicationDispense_SzMedicationDispense_Props } from "./profiles/SzMedicationDispense";
import build_SzMedicationRequest, { MedicationRequest_SzMedicationRequest_Props } from "./profiles/SzMedicationRequest";
import build_SzCauseOfDeath, { Observation_SzCauseOfDeath_Props } from "./profiles/SzCauseOfDeath";
import build_SzClinicalObservation, { Observation_SzClinicalObservation_Props } from "./profiles/SzClinicalObservation";
import build_SzLabResult, { Observation_SzLabResult_Props } from "./profiles/SzLabResult";
import build_SzMannerOfDeath, { Observation_SzMannerOfDeath_Props } from "./profiles/SzMannerOfDeath";
import build_SzVitalSigns, { Observation_SzVitalSigns_Props } from "./profiles/SzVitalSigns";
import build_SzOrganization, { Organization_SzOrganization_Props } from "./profiles/SzOrganization";
import build_SzPatient, { Patient_SzPatient_Props } from "./profiles/SzPatient";
import build_SzPractitioner, { Practitioner_SzPractitioner_Props } from "./profiles/SzPractitioner";
import build_SzProcedure, { Procedure_SzProcedure_Props } from "./profiles/SzProcedure";
import build_SzLabRequest, { ServiceRequest_SzLabRequest_Props } from "./profiles/SzLabRequest";
import build_SzReferral, { ServiceRequest_SzReferral_Props } from "./profiles/SzReferral";
import build_SzLabSpecimen, { Specimen_SzLabSpecimen_Props } from "./profiles/SzLabSpecimen";
export * from "./datatypes";

/**
  * Create a Appointment resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {string} [props.status] - proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error | checked-in | waitlist. Accepts all values from http://hl7.org/fhir/ValueSet/appointmentstatus|4.0.1
  * @param {string} [props.cancelationReason] - The coded reason for the appointment being cancelled. Accepts all values from http://hl7.org/fhir/ValueSet/appointment-cancellation-reason
  * @param {string} [props.serviceCategory] - A broad categorization of the service that is to be performed during this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/service-category
  * @param {string} [props.serviceType] - The specific service that is to be performed during this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/service-type
  * @param {string} [props.specialty] - The specialty of a practitioner that would be required to perform the service requested in this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/c80-practice-codes
  * @param {string} [props.appointmentType] - The style of appointment or patient that has been booked in the slot (not service type). Accepts all values from http://terminology.hl7.org/ValueSet/v2-0276
  * @param {string} [props.reasonCode] - Coded reason this appointment is scheduled. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-reason
  * @param {Reference} [props.reasonReference] - Reason the appointment is to take place (resource)
  * @param {unsignedInt} [props.priority] - Used to make informed decisions if needing to re-prioritize
  * @param {string} [props.description] - Shown on a subject line in a meeting request, or appointment list
  * @param {Reference} [props.supportingInformation] - Additional information to support the appointment
  * @param {instant} [props.start] - When appointment is to take place
  * @param {instant} [props.end] - When appointment is to conclude
  * @param {number} [props.minutesDuration] - Can be less than start/end (e.g. estimate)
  * @param {Reference} [props.slot] - The slots that this appointment is filling
  * @param {dateTime} [props.created] - The date that this appointment was initially created
  * @param {string} [props.comment] - Additional comments
  * @param {string} [props.patientInstruction] - Detailed information and instructions for the patient
  * @param {Reference} [props.basedOn] - The service request this appointment is allocated to assess
  * @param {BackboneElement} [props.participant] - Participants involved in appointment
  * @param {Period} [props.requestedPeriod] - Potential date/time interval(s) requested to allocate the appointment within
  */
export function appointment(type: "SzAppointment", props: Appointment_SzAppointment_Props);

export function appointment(props: Appointment_SzAppointment_Props);

export function appointment(type: any, props?: any) {
    const mappings = {
        "SzAppointment": build_SzAppointment
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzAppointment";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a Condition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - External Ids for this condition
  * @param {string} [props.clinicalStatus] - active | recurrence | relapse | inactive | remission | resolved. Accepts all values from http://hl7.org/fhir/ValueSet/condition-clinical|4.0.1
  * @param {string} [props.verificationStatus] - unconfirmed | provisional | differential | confirmed | refuted | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/condition-ver-status|4.0.1
  * @param {string} [props.category] - problem-list-item | encounter-diagnosis. Accepts all values from http://hl7.org/fhir/ValueSet/condition-category
  * @param {string} [props.severity] - Subjective severity of condition. Accepts all values from http://hl7.org/fhir/ValueSet/condition-severity
  * @param {string} [props.code] - Condition Identification. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code
  * @param {string} [props.bodySite] - Anatomical location, if relevant. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {Reference} [props.subject] - Who has the condition?
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {dateTime} [props.onset] - Diagnosis date
  * @param {dateTime|Age|Period|Range|string} [props.abatement] - When in resolution/remission
  * @param {dateTime} [props.recordedDate] - Date record was first recorded
  * @param {Reference} [props.recorder] - Who recorded the condition
  * @param {Reference} [props.asserter] - Person who asserts this condition
  * @param {BackboneElement} [props.stage] - Stage/grade, usually assessed formally
  * @param {BackboneElement} [props.evidence] - Supporting evidence
  * @param {Annotation} [props.note] - Additional information about the Condition
  */
export function condition(type: "SzCondition", props: Condition_SzCondition_Props);

export function condition(props: Condition_SzCondition_Props);

export function condition(type: any, props?: any) {
    const mappings = {
        "SzCondition": build_SzCondition
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzCondition";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a Encounter resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Identifier(s) by which this encounter is known
  * @param {string} [props.status] - planned | arrived | triaged | in-progress | onleave | finished | cancelled +. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-status|4.0.1
  * @param {BackboneElement} [props.statusHistory] - List of past encounter statuses
  * @param {string} [props.class] - Department in which the encounter took place. Accepts all values from http://172.209.216.154:3447/fhir/ValueSet/SzEncounterClassificationVS
  * @param {BackboneElement} [props.classHistory] - List of past encounter classes
  * @param {string} [props.type] - Specific type of encounter. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-type
  * @param {string} [props.serviceType] - Specific type of service. Accepts all values from http://hl7.org/fhir/ValueSet/service-type
  * @param {string} [props.priority] - Indicates the urgency of the encounter. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ActPriority
  * @param {Reference} [props.subject] - Patient associated with the encounter
  * @param {Reference} [props.episodeOfCare] - Episode(s) of care that this encounter should be recorded against
  * @param {Reference} [props.basedOn] - The ServiceRequest that initiated this encounter
  * @param {BackboneElement} [props.participant] - List of participants involved in the encounter
  * @param {Reference} [props.appointment] - The appointment that scheduled this encounter
  * @param {Period} [props.period] - The start and end time of the encounter
  * @param {Duration} [props.length] - Quantity of time the encounter lasted (less time absent)
  * @param {string} [props.reasonCode] - Coded reason the encounter takes place. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-reason
  * @param {Reference} [props.reasonReference] - Reason the encounter takes place (reference)
  * @param {BackboneElement} [props.diagnosis] - The list of diagnosis relevant to this encounter
  * @param {Reference} [props.account] - The set of accounts that may be used for billing for this Encounter
  * @param {BackboneElement} [props.hospitalization] - Details about the admission to a healthcare service
  * @param {BackboneElement} [props.location] - Encounter location
  * @param {Reference} [props.serviceProvider] - Health facility responsible for the encounter
  * @param {Reference} [props.partOf] - Another Encounter this encounter is part of
  */
export function encounter(type: "SzEncounter", props: Encounter_SzEncounter_Props);

export function encounter(props: Encounter_SzEncounter_Props);

export function encounter(type: any, props?: any) {
    const mappings = {
        "SzEncounter": build_SzEncounter
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzEncounter";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a EpisodeOfCare resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Business Identifier(s) relevant for this EpisodeOfCare
  * @param {string} [props.status] - planned | waitlist | active | onhold | finished | cancelled | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/episode-of-care-status|4.0.1
  * @param {BackboneElement} [props.statusHistory] - Past list of status codes (the current status may be included to cover the start date of the status)
  * @param {string} [props.type] - Episode of care classification. Accepts all values from http://172.209.216.154:3447/fhir/ValueSet/SzEpisodeOfCareTypeVS
  * @param {BackboneElement} [props.diagnosis] - The list of diagnosis relevant to this episode of care
  * @param {Reference} [props.patient] - The patient who is the focus of this episode of care
  * @param {Reference} [props.managingOrganization] - Organization that assumes care
  * @param {Period} [props.period] - Start and end datest of the Episode of care
  * @param {Reference} [props.referralRequest] - Originating Referral Request(s)
  * @param {Reference} [props.careManager] - Care manager/care coordinator for the patient
  * @param {Reference} [props.team] - Other practitioners facilitating this episode of care
  * @param {Reference} [props.account] - The set of accounts that may be used for billing for this EpisodeOfCare
  */
export function episodeOfCare(type: "SzEpisodeOfCare", props: EpisodeOfCare_SzEpisodeOfCare_Props);

export function episodeOfCare(props: EpisodeOfCare_SzEpisodeOfCare_Props);

export function episodeOfCare(type: any, props?: any) {
    const mappings = {
        "SzEpisodeOfCare": build_SzEpisodeOfCare
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzEpisodeOfCare";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a Location resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Unique code or number identifying the location to its users
  * @param {string} [props.status] - active | suspended | inactive. Accepts all values from http://hl7.org/fhir/ValueSet/location-status|4.0.1
  * @param {string} [props.operationalStatus] - The operational status of the location (typically only for a bed/room). Accepts all values from http://terminology.hl7.org/ValueSet/v2-0116
  * @param {string} [props.name] - Location Name
  * @param {string} [props.alias] - A list of alternate names that the location is known as, or was known as, in the past
  * @param {string} [props.description] - Additional details about the location that could be displayed as further information to identify the location beyond its name
  * @param {string} [props.mode] - instance | kind. Accepts all values from http://hl7.org/fhir/ValueSet/location-mode|4.0.1
  * @param {string} [props.type] - Location Type. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ServiceDeliveryLocationRoleType
  * @param {ContactPoint} [props.telecom] - Contact details of the location
  * @param {Address} [props.address] - Physical location
  * @param {string} [props.physicalType] - Physical form of the location. Accepts all values from http://hl7.org/fhir/ValueSet/location-physical-type
  * @param {BackboneElement} [props.position] - The absolute geographic location
  * @param {Reference} [props.managingOrganization] - Organization responsible for provisioning and upkeep
  * @param {Reference} [props.partOf] - Another Location this one is physically a part of
  * @param {BackboneElement} [props.hoursOfOperation] - What days/times during a week is this location usually open
  * @param {string} [props.availabilityExceptions] - Description of availability exceptions
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the location
  */
export function location(type: "SzLocation", props: Location_SzLocation_Props);

export function location(props: Location_SzLocation_Props);

export function location(type: any, props?: any) {
    const mappings = {
        "SzLocation": build_SzLocation
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzLocation";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a Medication resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Business identifier for this medication
  * @param {string} [props.code] - ELMIS Product Code. Accepts all values from http://172.209.216.154:3447/fhir/ValueSet/SzProductCodeVS
  * @param {string} [props.status] - active | inactive | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/medication-status|4.0.1
  * @param {Reference} [props.manufacturer] - Manufacturer of the item
  * @param {string} [props.form] - powder | tablets | capsule +. Accepts all values from http://hl7.org/fhir/ValueSet/medication-form-codes
  * @param {Ratio} [props.amount] - Amount of drug in package
  * @param {BackboneElement} [props.ingredient] - Active or inactive ingredient
  * @param {BackboneElement} [props.batch] - Details about packaged medications
  */
export function medication(type: "SzMedication", props: Medication_SzMedication_Props);

export function medication(props: Medication_SzMedication_Props);

export function medication(type: any, props?: any) {
    const mappings = {
        "SzMedication": build_SzMedication
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzMedication";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a MedicationDispense resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - External identifier
  * @param {Reference} [props.partOf] - Event that dispense is part of
  * @param {string} [props.status] - preparation | in-progress | cancelled | on-hold | completed | entered-in-error | stopped | declined | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/medicationdispense-status|4.0.1
  * @param {string} [props.statusReason] - Why a dispense was not performed. Accepts all values from http://hl7.org/fhir/ValueSet/medicationdispense-status-reason
  * @param {string} [props.category] - Type of medication dispense. Accepts all values from http://hl7.org/fhir/ValueSet/medicationdispense-category
  * @param {string} [props.medication] - Supplied Medication. Accepts all values from http://hl7.org/fhir/ValueSet/medication-codes
  * @param {Reference} [props.subject] - Who the dispense is for
  * @param {Reference} [props.context] - Encounter / Episode associated with event
  * @param {Reference} [props.supportingInformation] - Information that supports the dispensing of the medication
  * @param {BackboneElement} [props.performer] - Dispensing Practitioner
  * @param {Reference} [props.location] - Where the dispense occurred
  * @param {Reference} [props.authorizingPrescription] - Medication order that authorizes the dispense
  * @param {string} [props.type] - Trial fill, partial fill, emergency fill, etc.. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ActPharmacySupplyType
  * @param {Quantity} [props.quantity] - Amount dispensed
  * @param {Quantity} [props.daysSupply] - Amount of medication expressed as a timing amount
  * @param {dateTime} [props.whenPrepared] - When product was packaged and reviewed
  * @param {dateTime} [props.whenHandedOver] - When product was given out
  * @param {Reference} [props.destination] - Where the medication was sent
  * @param {Reference} [props.receiver] - Who collected the medication
  * @param {Annotation} [props.note] - Information about the dispense
  * @param {Dosage} [props.dosageInstruction] - How the medication is to be used by the patient or administered by the caregiver
  * @param {BackboneElement} [props.substitution] - Whether a substitution was performed on the dispense
  * @param {Reference} [props.detectedIssue] - Clinical issue with action
  * @param {Reference} [props.eventHistory] - A list of relevant lifecycle events
  */
export function medicationDispense(
    type: "SzMedicationDispense",
    props: MedicationDispense_SzMedicationDispense_Props
);

export function medicationDispense(props: MedicationDispense_SzMedicationDispense_Props);

export function medicationDispense(type: any, props?: any) {
    const mappings = {
        "SzMedicationDispense": build_SzMedicationDispense
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzMedicationDispense";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a MedicationRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - External ids for this request
  * @param {string} [props.status] - active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-status|4.0.1
  * @param {string} [props.statusReason] - Reason for current status. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-status-reason
  * @param {string} [props.intent] - proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-intent|4.0.1
  * @param {string} [props.category] - Type of medication usage. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-category
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.0.1
  * @param {boolean} [props.doNotPerform] - True if request is prohibiting action
  * @param {boolean|Reference} [props.reported] - Reported rather than primary record
  * @param {string} [props.medication] - Medication to be taken. Accepts all values from http://172.209.216.154:3447/fhir/ValueSet/SzProductCodeVS
  * @param {Reference} [props.subject] - Who or group medication request is for
  * @param {Reference} [props.encounter] - Encounter created as part of encounter/admission/stay
  * @param {Reference} [props.supportingInformation] - Information to support ordering of the medication
  * @param {dateTime} [props.authoredOn] - Medication Request Date
  * @param {Reference} [props.requester] - Who/What requested the Request
  * @param {Reference} [props.performer] - Intended performer of administration
  * @param {string} [props.performerType] - Desired kind of performer of the medication administration. Accepts all values from http://hl7.org/fhir/ValueSet/performer-role
  * @param {Reference} [props.recorder] - Person who entered the request
  * @param {string} [props.reasonCode] - Reason or indication for ordering or not ordering the medication. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code
  * @param {Reference} [props.reasonReference] - Condition or observation that supports why the prescription is being written
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {Identifier} [props.groupIdentifier] - Composite request this is part of
  * @param {string} [props.courseOfTherapyType] - Overall pattern of medication administration. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-course-of-therapy
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {Annotation} [props.note] - Information about the prescription
  * @param {Dosage} [props.dosageInstruction] - Dosage Instruction
  * @param {BackboneElement} [props.dispenseRequest] - Medication supply authorization
  * @param {BackboneElement} [props.substitution] - Any restrictions on medication substitution
  * @param {Reference} [props.priorPrescription] - An order/prescription that is being replaced
  * @param {Reference} [props.detectedIssue] - Clinical Issue with action
  * @param {Reference} [props.eventHistory] - A list of events of interest in the lifecycle
  */
export function medicationRequest(
    type: "SzMedicationRequest",
    props: MedicationRequest_SzMedicationRequest_Props
);

export function medicationRequest(props: MedicationRequest_SzMedicationRequest_Props);

export function medicationRequest(type: any, props?: any) {
    const mappings = {
        "SzMedicationRequest": build_SzMedicationRequest
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzMedicationRequest";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a Observation resource.
  * @public
  * @function
  * @param {string} type - A profile type: one of SzCauseOfDeath,SzClinicalObservation,SzLabResult,SzMannerOfDeath,SzVitalSigns
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Business Identifier for observation
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal or order
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - registered | preliminary | final | amended +. Accepts all values from http://hl7.org/fhir/ValueSet/observation-status|4.0.1
  * @param {string} [props.category] - Classification of  type of observation. Accepts all values from http://hl7.org/fhir/ValueSet/observation-category
  * @param {string} [props.code] - Cause of death. Accepts all values from http://hl7.org/fhir/ValueSet/observation-codes
  * @param {Reference} [props.subject] - The decedent
  * @param {Reference} [props.focus] - What the observation is about, when it is not about the subject of record
  * @param {Reference} [props.encounter] - Healthcare event during which this observation is made
  * @param {dateTime|Period|Timing|instant} [props.effective] - Clinically relevant time/time-period for observation
  * @param {instant} [props.issued] - Date/Time this version was made available
  * @param {Reference} [props.performer] - Cause of death certifier (coroner or medical examiner)
  * @param {CodeableConcept} [props.value] - Actual result
  * @param {string} [props.dataAbsentReason] - Why the result is missing. Accepts all values from http://hl7.org/fhir/ValueSet/data-absent-reason
  * @param {string} [props.interpretation] - High, low, normal, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/observation-interpretation
  * @param {Annotation} [props.note] - Comments about the observation
  * @param {string} [props.bodySite] - Observed body part. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {string} [props.method] - How it was done. Accepts all values from http://hl7.org/fhir/ValueSet/observation-methods
  * @param {Reference} [props.specimen] - Specimen used for this observation
  * @param {Reference} [props.device] - (Measurement) Device
  * @param {BackboneElement} [props.referenceRange] - Provides guide for interpretation
  * @param {Reference} [props.hasMember] - Related resource that belongs to the Observation group
  * @param {Reference} [props.derivedFrom] - Related measurements the observation is made from
  * @param {BackboneElement} [props.component] - Cause of death time interval for Intermediate, Intermediate I, Intermediat II, Underlying
  */
export function observation(type: "SzCauseOfDeath", props: Observation_SzCauseOfDeath_Props);

export function observation(
    type: "SzClinicalObservation",
    props: Observation_SzClinicalObservation_Props
);

export function observation(type: "SzLabResult", props: Observation_SzLabResult_Props);
export function observation(type: "SzMannerOfDeath", props: Observation_SzMannerOfDeath_Props);
export function observation(type: "SzVitalSigns", props: Observation_SzVitalSigns_Props);

export function observation(type: any, props?: any) {
    const mappings = {
        "SzCauseOfDeath": build_SzCauseOfDeath,
        "SzClinicalObservation": build_SzClinicalObservation,
        "SzLabResult": build_SzLabResult,
        "SzMannerOfDeath": build_SzMannerOfDeath,
        "SzVitalSigns": build_SzVitalSigns
    };

    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a Organization resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Identifies this organization  across multiple systems
  * @param {boolean} [props.active] - Whether the organization's record is still in active use
  * @param {string} [props.type] - Organization Type. Accepts all values from http://hl7.org/fhir/ValueSet/organization-type
  * @param {string} [props.name] - Organization' name
  * @param {string} [props.alias] - A list of alternate names that the organization is known as, or was known as in the past
  * @param {ContactPoint} [props.telecom] - A contact detail for the organization
  * @param {Address} [props.address] - An address for the organization
  * @param {Reference} [props.partOf] - The organization of which this organization forms a part
  * @param {BackboneElement} [props.contact] - Contact for the organization for a certain purpose
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the organization
  */
export function organization(type: "SzOrganization", props: Organization_SzOrganization_Props);

export function organization(props: Organization_SzOrganization_Props);

export function organization(type: any, props?: any) {
    const mappings = {
        "SzOrganization": build_SzOrganization
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzOrganization";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a Patient resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Extension
  * @param {Extension} [props.nationality] - Nationality.
  * @param {string} [props.inkhundla] - Extention: Eswatini Inkhundla. Accepts all values from http://172.209.216.154:3447/fhir/ValueSet/SzTinkhundlaVS
  * @param {string} [props.chiefdom] - Extention: Eswatini Chiefdom. Accepts all values from http://172.209.216.154:3447/fhir/ValueSet/SzChiefdomVS
  * @param {dateTime} [props.registrationDate] - Date the patient was registered
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Patient's Identification Number
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {HumanName} [props.name] - Patient's name
  * @param {ContactPoint} [props.telecom] - A contact detail for the individual
  * @param {string} [props.gender] - Sex at birth: male | female | other | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/administrative-gender|4.0.1
  * @param {date} [props.birthDate] - Date of birth: YYYY-MM-DD
  * @param {boolean|dateTime} [props.deceased] - Indicates if the individual is deceased or not
  * @param {Address} [props.address] - An address for the individual
  * @param {string} [props.maritalStatus] - Marital (civil) status of a patient. Accepts all values from http://hl7.org/fhir/ValueSet/marital-status
  * @param {boolean|integer} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
  */
export function patient(type: "SzPatient", props: Patient_SzPatient_Props);

export function patient(props: Patient_SzPatient_Props);

export function patient(type: any, props?: any) {
    const mappings = {
        "SzPatient": build_SzPatient
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzPatient";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a Practitioner resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - An identifier for the person as this agent
  * @param {boolean} [props.active] - Whether this practitioner's record is in active use
  * @param {HumanName} [props.name] - Practitioner's name
  * @param {ContactPoint} [props.telecom] - A contact detail for the practitioner (that apply to all roles)
  * @param {Address} [props.address] - Address(es) of the practitioner that are not role specific (typically home address)
  * @param {string} [props.gender] - Sex at birth: male | female | other | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/administrative-gender|4.0.1
  * @param {date} [props.birthDate] - The date  on which the practitioner was born
  * @param {Attachment} [props.photo] - Image of the person
  * @param {BackboneElement} [props.qualification] - Certification, licenses, or training pertaining to the provision of care
  * @param {string} [props.communication] - A language the practitioner can use in patient communication. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  */
export function practitioner(type: "SzPractitioner", props: Practitioner_SzPractitioner_Props);

export function practitioner(props: Practitioner_SzPractitioner_Props);

export function practitioner(type: any, props?: any) {
    const mappings = {
        "SzPractitioner": build_SzPractitioner
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzPractitioner";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a Procedure resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - External Identifiers for this procedure
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - A request for this procedure
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/event-status|4.0.1
  * @param {string} [props.statusReason] - Reason for current status. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-not-performed-reason
  * @param {string} [props.category] - Classification of the procedure. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-category
  * @param {string} [props.code] - Procedure Code. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-code
  * @param {Reference} [props.subject] - Who the procedure was performed on
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {dateTime|Period|string|Age|Range} [props.performed] - When the procedure was performed
  * @param {Reference} [props.recorder] - Who recorded the procedure
  * @param {Reference} [props.asserter] - Person who asserts this procedure
  * @param {BackboneElement} [props.performer] - The people who performed the procedure
  * @param {Reference} [props.location] - Where the procedure happened
  * @param {string} [props.reasonCode] - Coded reason procedure performed. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-reason
  * @param {Reference} [props.reasonReference] - The justification that the procedure was performed
  * @param {string} [props.bodySite] - Target body sites. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {string} [props.outcome] - The result of procedure. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-outcome
  * @param {Reference} [props.report] - Any report resulting from the procedure
  * @param {string} [props.complication] - Complication following the procedure. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code
  * @param {Reference} [props.complicationDetail] - A condition that is a result of the procedure
  * @param {string} [props.followUp] - Instructions for follow up. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-followup
  * @param {Annotation} [props.note] - Additional information about the procedure
  * @param {BackboneElement} [props.focalDevice] - Manipulated, implanted, or removed device
  * @param {Reference} [props.usedReference] - Items used during procedure
  * @param {string} [props.usedCode] - Coded items used during the procedure. Accepts all values from http://hl7.org/fhir/ValueSet/device-kind
  */
export function procedure(type: "SzProcedure", props: Procedure_SzProcedure_Props);

export function procedure(props: Procedure_SzProcedure_Props);

export function procedure(type: any, props?: any) {
    const mappings = {
        "SzProcedure": build_SzProcedure
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzProcedure";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a ServiceRequest resource.
  * @public
  * @function
  * @param {string} type - A profile type: one of SzLabRequest,SzReferral
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Identifiers assigned to this order
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {Reference} [props.replaces] - What request replaces
  * @param {Identifier} [props.requisition] - Composite Request ID
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/request-status|4.0.1
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/request-intent|4.0.1
  * @param {string} [props.category] - Type of service request. Accepts all values from http://hl7.org/fhir/ValueSet/servicerequest-category
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.0.1
  * @param {boolean} [props.doNotPerform] - True if service/procedure should not be performed
  * @param {string} [props.code] - Local test code. Accepts all values from http://172.209.216.154:3447/fhir/ValueSet/SzTestCodeVS
  * @param {string} [props.orderDetail] - Additional order information. Accepts all values from http://hl7.org/fhir/ValueSet/servicerequest-orderdetail
  * @param {Quantity|Ratio|Range} [props.quantity] - Service amount
  * @param {Reference} [props.subject] - Patient's information
  * @param {Reference} [props.encounter] - Encounter information
  * @param {dateTime|Period|Timing} [props.occurrence] - When service should occur
  * @param {string} [props.asNeeded] - Preconditions for service. Accepts all values from http://hl7.org/fhir/ValueSet/medication-as-needed-reason
  * @param {dateTime} [props.authoredOn] - Date request signed
  * @param {Reference} [props.requester] - Who/what is requesting service
  * @param {string} [props.performerType] - Performer role. Accepts all values from http://hl7.org/fhir/ValueSet/participant-role
  * @param {Reference} [props.performer] - Requested performer
  * @param {string} [props.locationCode] - Requested location. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ServiceDeliveryLocationRoleType
  * @param {Reference} [props.locationReference] - Requested location
  * @param {string} [props.reasonCode] - Explanation/Justification for procedure or service. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-reason
  * @param {Reference} [props.reasonReference] - Explanation/Justification for service or service
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {Reference} [props.supportingInfo] - Additional clinical information
  * @param {Reference} [props.specimen] - Lab test specimen
  * @param {string} [props.bodySite] - Location on Body. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {Annotation} [props.note] - Comments
  * @param {string} [props.patientInstruction] - Patient or consumer-oriented instructions
  * @param {Reference} [props.relevantHistory] - Request provenance
  */
export function serviceRequest(type: "SzLabRequest", props: ServiceRequest_SzLabRequest_Props);

export function serviceRequest(type: "SzReferral", props: ServiceRequest_SzReferral_Props);

export function serviceRequest(type: any, props?: any) {
    const mappings = {
        "SzLabRequest": build_SzLabRequest,
        "SzReferral": build_SzReferral
    };

    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}

/**
  * Create a Specimen resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - External Identifier
  * @param {Identifier} [props.accessionIdentifier] - Identifier assigned by the lab
  * @param {string} [props.status] - available | unavailable | unsatisfactory | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/specimen-status|4.0.1
  * @param {string} [props.type] - Type of specimen being collected. Accepts all values from http://terminology.hl7.org/CodeSystem/v2-0487
  * @param {Reference} [props.subject] - Patient associated with the specimen being collected
  * @param {dateTime} [props.receivedTime] - The time when specimen was received for processing
  * @param {Reference} [props.parent] - Specimen from which this specimen originated
  * @param {Reference} [props.request] - Why the specimen was collected
  * @param {BackboneElement} [props.collection] - Specimen collection information
  * @param {BackboneElement} [props.processing] - Processing and processing step details
  * @param {BackboneElement} [props.container] - Direct container of specimen (tube/slide, etc.)
  * @param {string} [props.condition] - State of the specimen. Accepts all values from http://terminology.hl7.org/ValueSet/v2-0493
  * @param {Annotation} [props.note] - Comments
  */
export function specimen(type: "SzLabSpecimen", props: Specimen_SzLabSpecimen_Props);

export function specimen(props: Specimen_SzLabSpecimen_Props);

export function specimen(type: any, props?: any) {
    const mappings = {
        "SzLabSpecimen": build_SzLabSpecimen
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "SzLabSpecimen";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}
