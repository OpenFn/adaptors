
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import "./globals";

export type EncounterProps = {
    id: string;
    meta: Meta;
    implicitRules: string;
    language: string;
    text: Narrative;
    contained: Resource;
    extension: Extension;
    modifierExtension: Extension;
    identifier: string;
    status: string;
    statusHistory: BackboneElement;
    class: Coding;
    classHistory: BackboneElement;
    type: CodeableConcept;
    serviceType: CodeableConcept;
    priority: CodeableConcept;
    subject: Reference;
    episodeOfCare: Reference;
    basedOn: Reference;
    participant: BackboneElement;
    appointment: Reference;
    period: Period;
    length: Duration;
    reasonCode: CodeableConcept;
    reasonReference: Reference;
    diagnosis: BackboneElement;
    account: Reference;
    hospitalization: BackboneElement;
    location: BackboneElement;
    serviceProvider: Reference;
    partOf: Reference;
};;

export declare function encounter(props: EncounterProps);;

export type PatientProps = {
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
};;

export declare function patient(props: PatientProps);;

export type ObservationProps = {
    id: string;
    meta: Meta;
    implicitRules: string;
    language: string;
    text: Narrative;
    contained: Resource;
    extension: Extension;
    modifierExtension: Extension;
    identifier: Identifier;
    basedOn: Reference;
    partOf: Reference;
    status: string;
    category: CodeableConcept;
    code: CodeableConcept;
    subject: Reference;
    focus: Reference;
    encounter: Reference;
    issued: string;
    performer: Reference;
    dataAbsentReason: CodeableConcept;
    interpretation: CodeableConcept;
    note: Annotation;
    bodySite: CodeableConcept;
    method: CodeableConcept;
    specimen: Reference;
    device: Reference;
    referenceRange: BackboneElement;
    hasMember: Reference;
    derivedFrom: Reference;
    component: BackboneElement;
};;

export declare function observation(props: ObservationProps);;