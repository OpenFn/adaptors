
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import "./globals";

type Encounter_entry_from_outside_target_facility_encounter_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Identifier(s) by which this encounter is known
     *  */
    identifier: string;
    /**
     * planned | arrived | triaged | in-progress | onleave | finished | cancelled +
     *  */
    status: string;
    /**
     * List of past encounter statuses
     *  */
    statusHistory: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * planned | arrived | triaged | in-progress | onleave | finished | cancelled +
         *  */
        status: string;
        /**
         * The time that the episode was in the specified status
         *  */
        period: Period;
    };
    /**
     * Classification of patient encounter
     *  */
    class: Coding;
    /**
     * List of past encounter classes
     *  */
    classHistory: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * inpatient | outpatient | ambulatory | emergency +
         *  */
        class: Coding;
        /**
         * The time that the episode was in the specified class
         *  */
        period: Period;
    };
    /**
     * Specific type of encounter
     *  */
    type: CodeableConcept;
    /**
     * Specific type of service
     *  */
    serviceType: CodeableConcept;
    /**
     * Indicates the urgency of the encounter
     *  */
    priority: CodeableConcept;
    /**
     * The patient or group present at the encounter
     *  */
    subject: Reference;
    /**
     * Episode(s) of care that this encounter should be recorded against
     *  */
    episodeOfCare: Reference;
    /**
     * The ServiceRequest that initiated this encounter
     *  */
    basedOn: Reference;
    /**
     * List of participants involved in the encounter
     *  */
    participant: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Role of participant in encounter
         *  */
        type: CodeableConcept;
        /**
         * Period of time during the encounter that the participant participated
         *  */
        period: Period;
        /**
         * Persons involved in the encounter other than the patient
         *  */
        individual: Reference;
    };
    /**
     * The appointment that scheduled this encounter
     *  */
    appointment: Reference;
    /**
     * The start and end time of the encounter
     *  */
    period: Period;
    /**
     * Quantity of time the encounter lasted (less time absent)
     *  */
    length: Duration;
    /**
     * Coded reason the encounter takes place
     *  */
    reasonCode: CodeableConcept;
    /**
     * Reason the encounter takes place (reference)
     *  */
    reasonReference: Reference;
    /**
     * The list of diagnosis relevant to this encounter
     *  */
    diagnosis: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The diagnosis or procedure relevant to the encounter
         *  */
        condition: Reference;
        /**
         * Role that this diagnosis has within the encounter (e.g. admission, billing, discharge …)
         *  */
        use: CodeableConcept;
        /**
         * Ranking of the diagnosis (for each role type)
         *  */
        rank: number;
    };
    /**
     * The set of accounts that may be used for billing for this Encounter
     *  */
    account: Reference;
    /**
     * Details about the admission to a healthcare service
     *  */
    hospitalization: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Pre-admission identifier
         *  */
        preAdmissionIdentifier: Identifier;
        /**
         * The location/organization from which the patient came before admission
         *  */
        origin: Reference;
        /**
         * From where patient was admitted (physician referral, transfer)
         *  */
        admitSource: CodeableConcept;
        /**
         * The type of hospital re-admission that has occurred (if any). If the value is absent, then this is not identified as a readmission
         *  */
        reAdmission: CodeableConcept;
        /**
         * Diet preferences reported by the patient
         *  */
        dietPreference: CodeableConcept;
        /**
         * Special courtesies (VIP, board member)
         *  */
        specialCourtesy: CodeableConcept;
        /**
         * Wheelchair, translator, stretcher, etc.
         *  */
        specialArrangement: CodeableConcept;
        /**
         * Location/organization to which the patient is discharged
         *  */
        destination: Reference;
        /**
         * Category or kind of location after discharge
         *  */
        dischargeDisposition: CodeableConcept;
    };
    /**
     * List of locations where the patient has been
     *  */
    location: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Location the encounter takes place
         *  */
        location: Reference;
        /**
         * planned | active | reserved | completed
         *  */
        status: string;
        /**
         * The physical type of the location (usually the level in the location hierachy - bed room ward etc.)
         *  */
        physicalType: CodeableConcept;
        /**
         * Time period during which the patient was present at the location
         *  */
        period: Period;
    };
    /**
     * The organization (facility) responsible for this encounter
     *  */
    serviceProvider: Reference;
    /**
     * Another Encounter this encounter is part of
     *  */
    partOf: Reference;
};

type Encounter_target_facility_encounter_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Identifier(s) by which this encounter is known
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: string;
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: uri;
        /**
         * The value that is unique
         *  */
        value: string;
        /**
         * Time period when id is/was valid for use
         *  */
        period: Period;
        /**
         * Organization that issued id (may be just text)
         *  */
        assigner: Reference;
    };
    /**
     * planned | arrived | triaged | in-progress | onleave | finished | cancelled +
     *  */
    status: string;
    /**
     * List of past encounter statuses
     *  */
    statusHistory: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * planned | arrived | triaged | in-progress | onleave | finished | cancelled +
         *  */
        status: string;
        /**
         * The time that the episode was in the specified status
         *  */
        period: Period;
    };
    /**
     * Classification of patient encounter
     *  */
    class: Coding;
    /**
     * List of past encounter classes
     *  */
    classHistory: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * inpatient | outpatient | ambulatory | emergency +
         *  */
        class: Coding;
        /**
         * The time that the episode was in the specified class
         *  */
        period: Period;
    };
    /**
     * Specific type of encounter
     *  */
    type: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Encounter Visit Type
         *  */
        visitType: any;
        /**
         * Code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Specific type of service
     *  */
    serviceType: CodeableConcept;
    /**
     * Indicates the urgency of the encounter
     *  */
    priority: CodeableConcept;
    /**
     * The patient or group present at the encounter
     *  */
    subject: Reference;
    /**
     * Episode(s) of care that this encounter should be recorded against
     *  */
    episodeOfCare: Reference;
    /**
     * The ServiceRequest that initiated this encounter
     *  */
    basedOn: Reference;
    /**
     * List of participants involved in the encounter
     *  */
    participant: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Role of participant in encounter
         *  */
        type: CodeableConcept;
        /**
         * Period of time during the encounter that the participant participated
         *  */
        period: Period;
        /**
         * Persons involved in the encounter other than the patient
         *  */
        individual: Reference;
    };
    /**
     * The appointment that scheduled this encounter
     *  */
    appointment: Reference;
    /**
     * The start and end time of the encounter
     *  */
    period: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Starting time with inclusive boundary
         *  */
        start: dateTime;
        /**
         * End time with inclusive boundary, if not ongoing
         *  */
        end: dateTime;
    };
    /**
     * Quantity of time the encounter lasted (less time absent)
     *  */
    length: Duration;
    /**
     * Coded reason the encounter takes place
     *  */
    reasonCode: CodeableConcept;
    /**
     * Reason the encounter takes place (reference)
     *  */
    reasonReference: Reference;
    /**
     * The list of diagnosis relevant to this encounter
     *  */
    diagnosis: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The diagnosis or procedure relevant to the encounter
         *  */
        condition: Reference;
        /**
         * Role that this diagnosis has within the encounter (e.g. admission, billing, discharge …)
         *  */
        use: CodeableConcept;
        /**
         * Ranking of the diagnosis (for each role type)
         *  */
        rank: number;
    };
    /**
     * The set of accounts that may be used for billing for this Encounter
     *  */
    account: Reference;
    /**
     * Details about the admission to a healthcare service
     *  */
    hospitalization: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Pre-admission identifier
         *  */
        preAdmissionIdentifier: Identifier;
        /**
         * The location/organization from which the patient came before admission
         *  */
        origin: Reference;
        /**
         * From where patient was admitted (physician referral, transfer)
         *  */
        admitSource: CodeableConcept;
        /**
         * The type of hospital re-admission that has occurred (if any). If the value is absent, then this is not identified as a readmission
         *  */
        reAdmission: CodeableConcept;
        /**
         * Diet preferences reported by the patient
         *  */
        dietPreference: CodeableConcept;
        /**
         * Special courtesies (VIP, board member)
         *  */
        specialCourtesy: CodeableConcept;
        /**
         * Wheelchair, translator, stretcher, etc.
         *  */
        specialArrangement: CodeableConcept;
        /**
         * Location/organization to which the patient is discharged
         *  */
        destination: Reference;
        /**
         * Category or kind of location after discharge
         *  */
        dischargeDisposition: CodeableConcept;
    };
    /**
     * List of locations where the patient has been
     *  */
    location: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Location the encounter takes place
         *  */
        location: Reference;
        /**
         * planned | active | reserved | completed
         *  */
        status: string;
        /**
         * The physical type of the location (usually the level in the location hierachy - bed room ward etc.)
         *  */
        physicalType: CodeableConcept;
        /**
         * Time period during which the patient was present at the location
         *  */
        period: Period;
    };
    /**
     * The organization (facility) responsible for this encounter
     *  */
    serviceProvider: Reference;
    /**
     * Another Encounter this encounter is part of
     *  */
    partOf: Reference;
};

type Encounter_variants = "entry-from-outside-target-facility-encounter" | "target-facility-encounter";

type Encounter__lookups = {
    "entry-from-outside-target-facility-encounter": Encounter_entry_from_outside_target_facility_encounter_Props;
    "target-facility-encounter": Encounter_target_facility_encounter_Props;
};

export declare function encounter<T extends Encounter_variants>(type: Encounter_variants, props: Encounter__lookups[T]);;