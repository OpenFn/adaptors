
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import "./globals";

type Patient_patient_Props = {
    id: string;
    meta: Meta;
    implicitRules: string;
    language: string;
    text: Narrative;
    contained: Resource;
    extension: Extension;
    modifierExtension: Extension;
    identifier: Identifier;
    active: boolean;
    name: HumanName;
    telecom: ContactPoint;
    gender: string;
    birthDate: string;
    address: Address;
    maritalStatus: CodeableConcept;
    photo: Attachment;
    contact: BackboneElement;
    communication: BackboneElement;
    generalPractitioner: Reference;
    managingOrganization: Reference;
    link: BackboneElement;
    religion: CodeableConcept;
};

type Patient_variants = "patient";

type Patient__lookups = {
    "patient": Patient_patient_Props;
};

export declare function patient<T extends Patient_variants>(type: Patient_variants, props: Patient__lookups[T]);;