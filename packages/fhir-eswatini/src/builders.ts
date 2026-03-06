
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import "./values";
import build_SzCauseOfDeath, { Observation_SzCauseOfDeath_Props } from "./profiles/SzCauseOfDeath";
import build_SzClinicalObservation, { Observation_SzClinicalObservation_Props } from "./profiles/SzClinicalObservation";
import build_SzLabResult, { Observation_SzLabResult_Props } from "./profiles/SzLabResult";
import build_SzMannerOfDeath, { Observation_SzMannerOfDeath_Props } from "./profiles/SzMannerOfDeath";
import build_SzVitalSigns, { Observation_SzVitalSigns_Props } from "./profiles/SzVitalSigns";
export * from "./datatypes";

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
