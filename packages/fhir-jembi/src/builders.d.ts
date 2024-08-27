
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import "./globals";

export type Encounter_entry_from_outside_target_facility_encounter_Props = {
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

export declare function encounter_entry_from_outside_target_facility_encounter(props: Encounter_entry_from_outside_target_facility_encounter_Props);;

export type Encounter_target_facility_encounter_Props = {
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

export declare function encounter_target_facility_encounter(props: Encounter_target_facility_encounter_Props);;

type Encounter_variants = "entry-from-outside-target-facility-encounter" | "target-facility-encounter";

type Encounter__lookups = {
    "entry-from-outside-target-facility-encounter": Encounter_entry_from_outside_target_facility_encounter_Props;
    "target-facility-encounter": Encounter_target_facility_encounter_Props;
};

export declare function encounter<T extends Encounter_variants>(type: Encounter_variants, props: Encounter__lookups[T]);;