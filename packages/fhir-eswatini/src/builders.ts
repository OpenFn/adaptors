
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import "./values";
import build_SzEncounter, { Encounter_SzEncounter_Props } from "./profiles/SzEncounter";
export * from "./datatypes";

/**
  * Create a Encounter resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Identifier(s) by which this encounter is known
  * @param {string} [props.status] - planned | arrived | triaged | in-progress | onleave | finished | cancelled +
  * @param {BackboneElement} [props.statusHistory] - List of past encounter statuses
  * @param {string} [props.class] - Department in which the encounter took place. Accepts values: OPD, IPD, CO, SO
  * @param {BackboneElement} [props.classHistory] - List of past encounter classes
  * @param {CodeableConcept} [props.type] - Specific type of encounter
  * @param {CodeableConcept} [props.serviceType] - Specific type of service
  * @param {CodeableConcept} [props.priority] - Indicates the urgency of the encounter
  * @param {Reference} [props.subject] - Patient associated with the encounter
  * @param {Reference} [props.episodeOfCare] - Episode(s) of care that this encounter should be recorded against
  * @param {Reference} [props.basedOn] - The ServiceRequest that initiated this encounter
  * @param {BackboneElement} [props.participant] - List of participants involved in the encounter
  * @param {Reference} [props.appointment] - The appointment that scheduled this encounter
  * @param {Period} [props.period] - The start and end time of the encounter
  * @param {Duration} [props.length] - Quantity of time the encounter lasted (less time absent)
  * @param {CodeableConcept} [props.reasonCode] - Coded reason the encounter takes place
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
