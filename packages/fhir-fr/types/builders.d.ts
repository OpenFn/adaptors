
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import { builders } from '@openfn/language-fhir-4';

declare type Patient_fr_core_patient_Props = {
    active?: boolean;
    address?: builders.Address[];
    birthDate?: string;
    communication?: builders.BackboneElement[];
    contact?: builders.BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: builders.Extension[];
    gender?: string;
    generalPractitioner?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    link?: builders.BackboneElement[];
    managingOrganization?: builders.Reference;
    maritalStatus?: builders.CodeableConcept;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    multipleBirth?: boolean | number;
    name?: builders.HumanName[];
    photo?: builders.Attachment[];
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Patient_fr_core_patient_ins_Props = {
    active?: boolean;
    address?: builders.Address[];
    birthDate?: string;
    communication?: builders.BackboneElement[];
    contact?: builders.BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: builders.Extension[];
    gender?: string;
    generalPractitioner?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    link?: builders.BackboneElement[];
    managingOrganization?: builders.Reference;
    maritalStatus?: builders.CodeableConcept;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    multipleBirth?: boolean | number;
    name?: builders.HumanName[];
    photo?: builders.Attachment[];
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    [key: string]: any;
};

/**
  * Create a Patient resource.
  * @public
  * @function
  * @param {string} type - A profile type: one of fr-core-patient,fr-core-patient-ins
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Place of Birth for patient
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Regional Registry ID | Identifiant régional
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {HumanName} [props.name] - Name of a human | Nom de naissance
  * @param {ContactPoint} [props.telecom] - Details of a Technology mediated contact point (phone, fax, email, etc.)
  * @param {string} [props.gender] - male | female | other | unknown
  * @param {date} [props.birthDate] - The date of birth for the french patient checked with the INSitelservice | Date de naissance du patient. Dans le cas d'une identité récupérée du téléservice INSi, la date de naissance est modifiée selon les règles du RNIV dans le cas de dates exceptionnelles.
  * @param {boolean|dateTime} [props.deceased] - Indicates if the individual is deceased or not
  * @param {Address} [props.address] - An address expressed using postal conventions (as opposed to GPS or other location definition formats)
  * @param {CodeableConcept} [props.maritalStatus] - Marital (civil) status of a patient
  * @param {boolean|integer} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
  */
declare function patient(type: "fr-core-patient", props: Patient_fr_core_patient_Props): any;
declare function patient(type: "fr-core-patient-ins", props: Patient_fr_core_patient_ins_Props): any;

export { patient };

