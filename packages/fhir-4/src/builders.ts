
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import Patient_Patient from "./profiles/Patient";
export function patient(type: string, props: object);
export function patient(props: object);

/**
  * Create a FHIR Patient resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant. Optional.
  * @param props {object} - Properties to apply to the resource
  * @param [props.id] {string} - Logical id of this artifact
  * @param [props.meta] {Meta} - Metadata about the resource
  * @param [props.implicitRules] {string} - A set of rules under which this content was created
  * @param [props.language] {string} - Language of the resource content
  * @param [props.text] {Narrative} - Text summary of the resource, for human interpretation
  * @param [props.contained] {Resource} - Contained, inline Resources
  * @param [props.extension] {Extension} - Additional content defined by implementations
  * @param [props.modifierExtension] {Extension} - Extensions that cannot be ignored
  * @param [props.identifier] {Identifier} - An identifier for this patient
  * @param [props.active] {boolean} - Whether this patient's record is in active use
  * @param [props.name] {HumanName} - A name associated with the patient
  * @param [props.telecom] {ContactPoint} - A contact detail for the individual
  * @param [props.gender] {string} - male | female | other | unknown
  * @param [props.birthDate] {date} - The date of birth for the individual
  * @param [props.deceased] {boolean} - Indicates if the individual is deceased or not
  * @param [props.address] {Address} - An address for the individual
  * @param [props.maritalStatus] {CodeableConcept} - Marital (civil) status of a patient
  * @param [props.multipleBirth] {boolean} - Whether patient is part of a multiple birth
  * @param [props.photo] {Attachment} - Image of the patient
  * @param [props.contact] {BackboneElement} - A contact party (e.g. guardian, partner, friend) for the patient
  * @param [props.communication] {BackboneElement} - A language which may be used to communicate with the patient about his or her health
  * @param [props.generalPractitioner] {Reference} - Patient's nominated primary care provider
  * @param [props.managingOrganization] {Reference} - Organization that is the custodian of the patient record
  * @param [props.link] {BackboneElement} - Link to another patient resource that concerns the same actual person
 */
export function patient(type, props) {
    const mappings = {
        "Patient": Patient_Patient
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "Patient";
    }
    return mappings[type](props)
}
