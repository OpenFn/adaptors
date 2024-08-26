
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
    identifier: Identifier;
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