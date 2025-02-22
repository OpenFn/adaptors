
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import Patient_Patient, { Patient_Props } from "./profiles/Patient";
export * from "./datatypes";

/**
  * Create a FHIR Patient resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant. Optional.
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - An identifier for this patient
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {HumanName} [props.name] - A name associated with the patient
  * @param {ContactPoint} [props.telecom] - A contact detail for the individual
  * @param {string} [props.gender] - male | female | other | unknown
  * @param {date} [props.birthDate] - The date of birth for the individual
  * @param {boolean,dateTime} [props.deceased] - Indicates if the individual is deceased or not
  * @param {Address} [props.address] - An address for the individual
  * @param {CodeableConcept} [props.maritalStatus] - Marital (civil) status of a patient
  * @param {boolean,integer} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
 */
export function patient(type: string, props: Patient_Props);

export function patient(props: Patient_Props);

export function patient(type: any, props?: any) {
    const mappings = {
        "Patient": Patient_Patient
    };

    // Handle optional type parameter
    if (typeof type !== "string") {
      props = type;
      type = "Patient";
    }
    if (type in mappings) {
        return mappings[type](props)
    }
    throw new Error(`Error: profile "${type}" not recognised`)
}
