
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import "./globals";

type CarePlan_art_follow_up_careplan_Props = {
    /**
     * Action to occur as part of plan
     *  */
    activity: {
        /**
         * ARV Adherence
         *  */
        adherence: any;
        /**
         * Extra info describing activity to perform
         *  */
        detail: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Care Plan - Next Visit Date
         *  */
        nextVisitDate: any;
        /**
         * Results of the activity
         *  */
        outcomeCodeableConcept: CodeableConcept;
        /**
         * Appointment, Encounter, Procedure, etc.
         *  */
        outcomeReference: Reference;
        /**
         * Comments about the activity status/progress
         *  */
        progress: Annotation;
        /**
         * Activity details defined in specific resource
         *  */
        reference: Reference;
    };
    /**
     * Health issues this plan addresses
     *  */
    addresses: Reference;
    /**
     * Who is the designated responsible party
     *  */
    author: Reference;
    /**
     * Fulfills CarePlan
     *  */
    basedOn: Reference;
    /**
     * Who's involved in plan?
     *  */
    careTeam: Reference;
    /**
     * Type of plan
     *  */
    category: {
        /**
         * Code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Who provided the content of the care plan
     *  */
    contributor: Reference;
    /**
     * Date record was first recorded
     *  */
    created: dateTime;
    /**
     * Summary of nature of plan
     *  */
    description: string;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Desired outcome of plan
     *  */
    goal: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External Ids for this plan
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * proposal | plan | order | option
     *  */
    intent: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the plan
     *  */
    note: Annotation;
    /**
     * Part of referenced CarePlan
     *  */
    partOf: Reference;
    /**
     * Time period plan covers
     *  */
    period: Period;
    /**
     * CarePlan replaced by this CarePlan
     *  */
    replaces: Reference;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * Who the care plan is for
     *  */
    subject: Reference;
    /**
     * Information considered as part of plan
     *  */
    supportingInfo: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Human-friendly name for the care plan
     *  */
    title: string;
};

type CarePlan_cervical_cancer_care_plan_Props = {
    /**
     * Action to occur as part of plan
     *  */
    activity: {
        /**
         * Extra info describing activity to perform
         *  */
        detail: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Care Plan - Next Visit Date
         *  */
        nextVisitDate: any;
        /**
         * Results of the activity
         *  */
        outcomeCodeableConcept: CodeableConcept;
        /**
         * Appointment, Encounter, Procedure, etc.
         *  */
        outcomeReference: Reference;
        /**
         * Comments about the activity status/progress
         *  */
        progress: Annotation;
        /**
         * Activity details defined in specific resource
         *  */
        reference: Reference;
    };
    /**
     * Health issues this plan addresses
     *  */
    addresses: Reference;
    /**
     * Who is the designated responsible party
     *  */
    author: Reference;
    /**
     * Fulfills CarePlan
     *  */
    basedOn: Reference;
    /**
     * Who's involved in plan?
     *  */
    careTeam: Reference;
    /**
     * Type of plan
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Who provided the content of the care plan
     *  */
    contributor: Reference;
    /**
     * Date record was first recorded
     *  */
    created: dateTime;
    /**
     * Summary of nature of plan
     *  */
    description: string;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Desired outcome of plan
     *  */
    goal: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External Ids for this plan
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * proposal | plan | order | option
     *  */
    intent: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the plan
     *  */
    note: Annotation;
    /**
     * Part of referenced CarePlan
     *  */
    partOf: Reference;
    /**
     * Time period plan covers
     *  */
    period: Period;
    /**
     * CarePlan replaced by this CarePlan
     *  */
    replaces: Reference;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * Who the care plan is for
     *  */
    subject: Reference;
    /**
     * Information considered as part of plan
     *  */
    supportingInfo: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Human-friendly name for the care plan
     *  */
    title: string;
};

type CarePlan_cotrimoxazole_preventive_therapy_careplan_Props = {
    /**
     * Action to occur as part of plan
     *  */
    activity: {
        /**
         * Cotrimoxazole Adherence
         *  */
        adherence: any;
        /**
         * Extra info describing activity to perform
         *  */
        detail: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Results of the activity
         *  */
        outcomeCodeableConcept: CodeableConcept;
        /**
         * Appointment, Encounter, Procedure, etc.
         *  */
        outcomeReference: Reference;
        /**
         * Comments about the activity status/progress
         *  */
        progress: Annotation;
        /**
         * Activity details defined in specific resource
         *  */
        reference: Reference;
    };
    /**
     * Health issues this plan addresses
     *  */
    addresses: Reference;
    /**
     * Who is the designated responsible party
     *  */
    author: Reference;
    /**
     * Fulfills CarePlan
     *  */
    basedOn: Reference;
    /**
     * Who's involved in plan?
     *  */
    careTeam: Reference;
    /**
     * Type of plan
     *  */
    category: {
        /**
         * Code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Who provided the content of the care plan
     *  */
    contributor: Reference;
    /**
     * Date record was first recorded
     *  */
    created: dateTime;
    /**
     * Summary of nature of plan
     *  */
    description: string;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Desired outcome of plan
     *  */
    goal: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External Ids for this plan
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * proposal | plan | order | option
     *  */
    intent: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the plan
     *  */
    note: Annotation;
    /**
     * Part of referenced CarePlan
     *  */
    partOf: Reference;
    /**
     * Time period plan covers
     *  */
    period: Period;
    /**
     * CarePlan replaced by this CarePlan
     *  */
    replaces: Reference;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * Who the care plan is for
     *  */
    subject: Reference;
    /**
     * Information considered as part of plan
     *  */
    supportingInfo: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Human-friendly name for the care plan
     *  */
    title: string;
};

type CarePlan_tb_treatment_careplan_Props = {
    /**
     * Action to occur as part of plan
     *  */
    activity: {
        /**
         * Extra info describing activity to perform
         *  */
        detail: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Results of the activity
         *  */
        outcomeCodeableConcept: CodeableConcept;
        /**
         * Appointment, Encounter, Procedure, etc.
         *  */
        outcomeReference: Reference;
        /**
         * Comments about the activity status/progress
         *  */
        progress: Annotation;
        /**
         * Activity details defined in specific resource
         *  */
        reference: Reference;
    };
    /**
     * Health issues this plan addresses
     *  */
    addresses: Reference;
    /**
     * Who is the designated responsible party
     *  */
    author: Reference;
    /**
     * Fulfills CarePlan
     *  */
    basedOn: Reference;
    /**
     * Who's involved in plan?
     *  */
    careTeam: Reference;
    /**
     * Type of plan
     *  */
    category: {
        /**
         * Code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Who provided the content of the care plan
     *  */
    contributor: Reference;
    /**
     * Date record was first recorded
     *  */
    created: dateTime;
    /**
     * Summary of nature of plan
     *  */
    description: string;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Desired outcome of plan
     *  */
    goal: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External Ids for this plan
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * proposal | plan | order | option
     *  */
    intent: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the plan
     *  */
    note: Annotation;
    /**
     * Part of referenced CarePlan
     *  */
    partOf: Reference;
    /**
     * Time period plan covers
     *  */
    period: Period;
    /**
     * CarePlan replaced by this CarePlan
     *  */
    replaces: Reference;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * Who the care plan is for
     *  */
    subject: Reference;
    /**
     * Information considered as part of plan
     *  */
    supportingInfo: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Human-friendly name for the care plan
     *  */
    title: string;
};

type CarePlan_tpt_careplan_Props = {
    /**
     * Action to occur as part of plan
     *  */
    activity: {
        /**
         * Extra info describing activity to perform
         *  */
        detail: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Results of the activity
         *  */
        outcomeCodeableConcept: CodeableConcept;
        /**
         * Appointment, Encounter, Procedure, etc.
         *  */
        outcomeReference: Reference;
        /**
         * Comments about the activity status/progress
         *  */
        progress: Annotation;
        /**
         * Activity details defined in specific resource
         *  */
        reference: Reference;
    };
    /**
     * Health issues this plan addresses
     *  */
    addresses: Reference;
    /**
     * Who is the designated responsible party
     *  */
    author: Reference;
    /**
     * Fulfills CarePlan
     *  */
    basedOn: Reference;
    /**
     * Who's involved in plan?
     *  */
    careTeam: Reference;
    /**
     * Type of plan
     *  */
    category: {
        /**
         * Code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Who provided the content of the care plan
     *  */
    contributor: Reference;
    /**
     * Date record was first recorded
     *  */
    created: dateTime;
    /**
     * Summary of nature of plan
     *  */
    description: string;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Desired outcome of plan
     *  */
    goal: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External Ids for this plan
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * proposal | plan | order | option
     *  */
    intent: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the plan
     *  */
    note: Annotation;
    /**
     * Part of referenced CarePlan
     *  */
    partOf: Reference;
    /**
     * Time period plan covers
     *  */
    period: Period;
    /**
     * CarePlan replaced by this CarePlan
     *  */
    replaces: Reference;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * Who the care plan is for
     *  */
    subject: Reference;
    /**
     * Information considered as part of plan
     *  */
    supportingInfo: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Human-friendly name for the care plan
     *  */
    title: string;
};

type CarePlan_variants = "art-follow-up-careplan" | "cervical-cancer-care-plan" | "cotrimoxazole-preventive-therapy-careplan" | "tb-treatment-careplan" | "tpt-careplan";

type CarePlan__lookups = {
    "art-follow-up-careplan": CarePlan_art_follow_up_careplan_Props;
    "cervical-cancer-care-plan": CarePlan_cervical_cancer_care_plan_Props;
    "cotrimoxazole-preventive-therapy-careplan": CarePlan_cotrimoxazole_preventive_therapy_careplan_Props;
    "tb-treatment-careplan": CarePlan_tb_treatment_careplan_Props;
    "tpt-careplan": CarePlan_tpt_careplan_Props;
};

export declare function carePlan<T extends CarePlan_variants>(type: CarePlan_variants, props: CarePlan__lookups[T]);;

type Encounter_entry_from_outside_target_facility_encounter_Props = {
    /**
     * The set of accounts that may be used for billing for this Encounter
     *  */
    account: Reference;
    /**
     * The appointment that scheduled this encounter
     *  */
    appointment: Reference;
    /**
     * The ServiceRequest that initiated this encounter
     *  */
    basedOn: Reference;
    /**
     * Classification of patient encounter
     *  */
    class: Coding;
    /**
     * List of past encounter classes
     *  */
    classHistory: {
        /**
         * inpatient | outpatient | ambulatory | emergency +
         *  */
        class: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The time that the episode was in the specified class
         *  */
        period: Period;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * The list of diagnosis relevant to this encounter
     *  */
    diagnosis: {
        /**
         * The diagnosis or procedure relevant to the encounter
         *  */
        condition: Reference;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Ranking of the diagnosis (for each role type)
         *  */
        rank: number;
        /**
         * Role that this diagnosis has within the encounter (e.g. admission, billing, discharge …)
         *  */
        use: CodeableConcept;
    };
    /**
     * Episode(s) of care that this encounter should be recorded against
     *  */
    episodeOfCare: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Details about the admission to a healthcare service
     *  */
    hospitalization: {
        /**
         * From where patient was admitted (physician referral, transfer)
         *  */
        admitSource: CodeableConcept;
        /**
         * Location/organization to which the patient is discharged
         *  */
        destination: Reference;
        /**
         * Diet preferences reported by the patient
         *  */
        dietPreference: CodeableConcept;
        /**
         * Category or kind of location after discharge
         *  */
        dischargeDisposition: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The location/organization from which the patient came before admission
         *  */
        origin: Reference;
        /**
         * Pre-admission identifier
         *  */
        preAdmissionIdentifier: Identifier;
        /**
         * The type of hospital re-admission that has occurred (if any). If the value is absent, then this is not identified as a readmission
         *  */
        reAdmission: CodeableConcept;
        /**
         * Wheelchair, translator, stretcher, etc.
         *  */
        specialArrangement: CodeableConcept;
        /**
         * Special courtesies (VIP, board member)
         *  */
        specialCourtesy: CodeableConcept;
    };
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Identifier(s) by which this encounter is known
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Quantity of time the encounter lasted (less time absent)
     *  */
    length: Duration;
    /**
     * List of locations where the patient has been
     *  */
    location: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Location the encounter takes place
         *  */
        location: Reference;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Time period during which the patient was present at the location
         *  */
        period: Period;
        /**
         * The physical type of the location (usually the level in the location hierachy - bed room ward etc.)
         *  */
        physicalType: CodeableConcept;
        /**
         * planned | active | reserved | completed
         *  */
        status: string;
    };
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Another Encounter this encounter is part of
     *  */
    partOf: Reference;
    /**
     * List of participants involved in the encounter
     *  */
    participant: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Persons involved in the encounter other than the patient
         *  */
        individual: Reference;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Period of time during the encounter that the participant participated
         *  */
        period: Period;
        /**
         * Role of participant in encounter
         *  */
        type: CodeableConcept;
    };
    /**
     * The start and end time of the encounter
     *  */
    period: Period;
    /**
     * Indicates the urgency of the encounter
     *  */
    priority: CodeableConcept;
    /**
     * Coded reason the encounter takes place
     *  */
    reasonCode: CodeableConcept;
    /**
     * Reason the encounter takes place (reference)
     *  */
    reasonReference: Reference;
    /**
     * The organization (facility) responsible for this encounter
     *  */
    serviceProvider: Reference;
    /**
     * Specific type of service
     *  */
    serviceType: CodeableConcept;
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
         * The time that the episode was in the specified status
         *  */
        period: Period;
        /**
         * planned | arrived | triaged | in-progress | onleave | finished | cancelled +
         *  */
        status: string;
    };
    /**
     * The patient or group present at the encounter
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Specific type of encounter
     *  */
    type: CodeableConcept;
};

type Encounter_target_facility_encounter_Props = {
    /**
     * The set of accounts that may be used for billing for this Encounter
     *  */
    account: Reference;
    /**
     * The appointment that scheduled this encounter
     *  */
    appointment: Reference;
    /**
     * The ServiceRequest that initiated this encounter
     *  */
    basedOn: Reference;
    /**
     * Classification of patient encounter
     *  */
    class: Coding;
    /**
     * List of past encounter classes
     *  */
    classHistory: {
        /**
         * inpatient | outpatient | ambulatory | emergency +
         *  */
        class: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The time that the episode was in the specified class
         *  */
        period: Period;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * The list of diagnosis relevant to this encounter
     *  */
    diagnosis: {
        /**
         * The diagnosis or procedure relevant to the encounter
         *  */
        condition: Reference;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Ranking of the diagnosis (for each role type)
         *  */
        rank: number;
        /**
         * Role that this diagnosis has within the encounter (e.g. admission, billing, discharge …)
         *  */
        use: CodeableConcept;
    };
    /**
     * Episode(s) of care that this encounter should be recorded against
     *  */
    episodeOfCare: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Details about the admission to a healthcare service
     *  */
    hospitalization: {
        /**
         * From where patient was admitted (physician referral, transfer)
         *  */
        admitSource: CodeableConcept;
        /**
         * Location/organization to which the patient is discharged
         *  */
        destination: Reference;
        /**
         * Diet preferences reported by the patient
         *  */
        dietPreference: CodeableConcept;
        /**
         * Category or kind of location after discharge
         *  */
        dischargeDisposition: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The location/organization from which the patient came before admission
         *  */
        origin: Reference;
        /**
         * Pre-admission identifier
         *  */
        preAdmissionIdentifier: Identifier;
        /**
         * The type of hospital re-admission that has occurred (if any). If the value is absent, then this is not identified as a readmission
         *  */
        reAdmission: CodeableConcept;
        /**
         * Wheelchair, translator, stretcher, etc.
         *  */
        specialArrangement: CodeableConcept;
        /**
         * Special courtesies (VIP, board member)
         *  */
        specialCourtesy: CodeableConcept;
    };
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Identifier(s) by which this encounter is known
     *  */
    identifier: {
        /**
         * Organization that issued id (may be just text)
         *  */
        assigner: Reference;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Time period when id is/was valid for use
         *  */
        period: Period;
        /**
         * The namespace for the identifier value
         *  */
        system: uri;
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: string;
        /**
         * The value that is unique
         *  */
        value: string;
    };
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Quantity of time the encounter lasted (less time absent)
     *  */
    length: Duration;
    /**
     * List of locations where the patient has been
     *  */
    location: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Location the encounter takes place
         *  */
        location: Reference;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Time period during which the patient was present at the location
         *  */
        period: Period;
        /**
         * The physical type of the location (usually the level in the location hierachy - bed room ward etc.)
         *  */
        physicalType: CodeableConcept;
        /**
         * planned | active | reserved | completed
         *  */
        status: string;
    };
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Another Encounter this encounter is part of
     *  */
    partOf: Reference;
    /**
     * List of participants involved in the encounter
     *  */
    participant: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Persons involved in the encounter other than the patient
         *  */
        individual: Reference;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Period of time during the encounter that the participant participated
         *  */
        period: Period;
        /**
         * Role of participant in encounter
         *  */
        type: CodeableConcept;
    };
    /**
     * The start and end time of the encounter
     *  */
    period: {
        /**
         * End time with inclusive boundary, if not ongoing
         *  */
        end: dateTime;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Starting time with inclusive boundary
         *  */
        start: dateTime;
    };
    /**
     * Indicates the urgency of the encounter
     *  */
    priority: CodeableConcept;
    /**
     * Coded reason the encounter takes place
     *  */
    reasonCode: CodeableConcept;
    /**
     * Reason the encounter takes place (reference)
     *  */
    reasonReference: Reference;
    /**
     * The organization (facility) responsible for this encounter
     *  */
    serviceProvider: Reference;
    /**
     * Specific type of service
     *  */
    serviceType: CodeableConcept;
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
         * The time that the episode was in the specified status
         *  */
        period: Period;
        /**
         * planned | arrived | triaged | in-progress | onleave | finished | cancelled +
         *  */
        status: string;
    };
    /**
     * The patient or group present at the encounter
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Specific type of encounter
     *  */
    type: {
        /**
         * Code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
        /**
         * Encounter Visit Type
         *  */
        visitType: any;
    };
};

type Encounter_variants = "entry-from-outside-target-facility-encounter" | "target-facility-encounter";

type Encounter__lookups = {
    "entry-from-outside-target-facility-encounter": Encounter_entry_from_outside_target_facility_encounter_Props;
    "target-facility-encounter": Encounter_target_facility_encounter_Props;
};

export declare function encounter<T extends Encounter_variants>(type: Encounter_variants, props: Encounter__lookups[T]);;

type Medication_arv_regimen_medication_Props = {
    /**
     * Amount of drug in package
     *  */
    amount: Ratio;
    /**
     * Details about packaged medications
     *  */
    batch: {
        /**
         * When batch will expire
         *  */
        expirationDate: dateTime;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Identifier assigned to batch
         *  */
        lotNumber: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
    };
    /**
     * Codes that identify this medication
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * powder | tablets | capsule +
     *  */
    form: CodeableConcept;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business identifier for this medication
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Active or inactive ingredient
     *  */
    ingredient: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Active ingredient indicator
         *  */
        isActive: boolean;
        /**
         * The actual ingredient or content
         *  */
        item: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Quantity of ingredient present
         *  */
        strength: Ratio;
    };
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Manufacturer of the item
     *  */
    manufacturer: Reference;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * active | inactive | entered-in-error
     *  */
    status: string;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type Medication_oi_medication_Props = {
    /**
     * Amount of drug in package
     *  */
    amount: Ratio;
    /**
     * Details about packaged medications
     *  */
    batch: {
        /**
         * When batch will expire
         *  */
        expirationDate: dateTime;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Identifier assigned to batch
         *  */
        lotNumber: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
    };
    /**
     * Codes that identify this medication
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * powder | tablets | capsule +
     *  */
    form: CodeableConcept;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business identifier for this medication
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Active or inactive ingredient
     *  */
    ingredient: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Active ingredient indicator
         *  */
        isActive: boolean;
        /**
         * The actual ingredient or content
         *  */
        item: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Quantity of ingredient present
         *  */
        strength: Ratio;
    };
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Manufacturer of the item
     *  */
    manufacturer: Reference;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * active | inactive | entered-in-error
     *  */
    status: string;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type Medication_tpt_medication_Props = {
    /**
     * Amount of drug in package
     *  */
    amount: Ratio;
    /**
     * Details about packaged medications
     *  */
    batch: {
        /**
         * When batch will expire
         *  */
        expirationDate: dateTime;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Identifier assigned to batch
         *  */
        lotNumber: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
    };
    /**
     * Codes that identify this medication
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * powder | tablets | capsule +
     *  */
    form: CodeableConcept;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business identifier for this medication
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Active or inactive ingredient
     *  */
    ingredient: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Active ingredient indicator
         *  */
        isActive: boolean;
        /**
         * The actual ingredient or content
         *  */
        item: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Quantity of ingredient present
         *  */
        strength: Ratio;
    };
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Manufacturer of the item
     *  */
    manufacturer: Reference;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * active | inactive | entered-in-error
     *  */
    status: string;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type Medication_variants = "arv-regimen-medication" | "oi-medication" | "tpt-medication";

type Medication__lookups = {
    "arv-regimen-medication": Medication_arv_regimen_medication_Props;
    "oi-medication": Medication_oi_medication_Props;
    "tpt-medication": Medication_tpt_medication_Props;
};

export declare function medication<T extends Medication_variants>(type: Medication_variants, props: Medication__lookups[T]);;

type MedicationAdministration_arv_medication_administration_Props = {
    /**
     * Type of medication usage
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Encounter or Episode of Care administered as part of
     *  */
    context: Reference;
    /**
     * Device used to administer
     *  */
    device: Reference;
    /**
     * Details of how medication was taken
     *  */
    dosage: {
        /**
         * Amount of medication per dose
         *  */
        dose: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * How drug was administered
         *  */
        method: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Dose quantity per unit of time
         *  */
        rate: Ratio;
        /**
         * Path of substance into body
         *  */
        route: CodeableConcept;
        /**
         * Body site administered to
         *  */
        site: CodeableConcept;
        /**
         * Free text dosage instructions e.g. SIG
         *  */
        text: string;
    };
    /**
     * Start and end time of administration
     *  */
    effective: {
        /**
         * End time with inclusive boundary, if not ongoing
         *  */
        end: dateTime;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Starting time with inclusive boundary
         *  */
        start: dateTime;
    };
    /**
     * A list of events of interest in the lifecycle
     *  */
    eventHistory: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates protocol or definition
     *  */
    instantiates: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * What was administered
     *  */
    medication: Reference;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Information about the administration
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who performed the medication administration and what they did
     *  */
    performer: {
        /**
         * Who performed the medication administration
         *  */
        actor: Reference;
        /**
         * Type of performance
         *  */
        function: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
    };
    /**
     * Reason administration performed
     *  */
    reasonCode: CodeableConcept;
    /**
     * Condition or observation that supports why the medication was administered
     *  */
    reasonReference: Reference;
    /**
     * Request administration performed against
     *  */
    request: Reference;
    /**
     * in-progress | not-done | on-hold | completed | entered-in-error | stopped | unknown
     *  */
    status: string;
    /**
     * Reason administration not performed
     *  */
    statusReason: CodeableConcept;
    /**
     * Who received medication
     *  */
    subject: Reference;
    /**
     * Additional information to support administration
     *  */
    supportingInformation: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type MedicationAdministration_cotrimoxazole_preventive_therapy_medication_administration_Props = {
    /**
     * Type of medication usage
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Encounter or Episode of Care administered as part of
     *  */
    context: Reference;
    /**
     * Device used to administer
     *  */
    device: Reference;
    /**
     * Details of how medication was taken
     *  */
    dosage: {
        /**
         * Amount of medication per dose
         *  */
        dose: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * How drug was administered
         *  */
        method: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Dose quantity per unit of time
         *  */
        rate: Ratio;
        /**
         * Path of substance into body
         *  */
        route: CodeableConcept;
        /**
         * Body site administered to
         *  */
        site: CodeableConcept;
        /**
         * Free text dosage instructions e.g. SIG
         *  */
        text: string;
    };
    /**
     * Start and end time of administration
     *  */
    effective: {
        /**
         * Used to represent the medication end date for the request (point in time prescription).
         *  */
        end: dateTime;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Starting time with inclusive boundary
         *  */
        start: dateTime;
    };
    /**
     * A list of events of interest in the lifecycle
     *  */
    eventHistory: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates protocol or definition
     *  */
    instantiates: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * What was administered
     *  */
    medication: Reference;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Information about the administration
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who performed the medication administration and what they did
     *  */
    performer: {
        /**
         * Who performed the medication administration
         *  */
        actor: Reference;
        /**
         * Type of performance
         *  */
        function: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
    };
    /**
     * Reason administration performed
     *  */
    reasonCode: CodeableConcept;
    /**
     * Condition or observation that supports why the medication was administered
     *  */
    reasonReference: Reference;
    /**
     * Used for point in time prescriptions in the context of an encounter.
     *  */
    request: Reference;
    /**
     * in-progress | not-done | on-hold | completed | entered-in-error | stopped | unknown
     *  */
    status: string;
    /**
     * Reason administration not performed
     *  */
    statusReason: CodeableConcept;
    /**
     * Who received medication
     *  */
    subject: Reference;
    /**
     * Additional information to support administration
     *  */
    supportingInformation: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type MedicationAdministration_fluconazole_preventive_therapy_medication_administration_Props = {
    /**
     * Type of medication usage
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Encounter or Episode of Care administered as part of
     *  */
    context: Reference;
    /**
     * Device used to administer
     *  */
    device: Reference;
    /**
     * Details of how medication was taken
     *  */
    dosage: {
        /**
         * Amount of medication per dose
         *  */
        dose: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * How drug was administered
         *  */
        method: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Dose quantity per unit of time
         *  */
        rate: Ratio;
        /**
         * Path of substance into body
         *  */
        route: CodeableConcept;
        /**
         * Body site administered to
         *  */
        site: CodeableConcept;
        /**
         * Free text dosage instructions e.g. SIG
         *  */
        text: string;
    };
    /**
     * Start and end time of administration
     *  */
    effective: {
        /**
         * Used to represent the medication end date for the request (point in time prescription).
         *  */
        end: dateTime;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Starting time with inclusive boundary
         *  */
        start: dateTime;
    };
    /**
     * A list of events of interest in the lifecycle
     *  */
    eventHistory: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates protocol or definition
     *  */
    instantiates: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * What was administered
     *  */
    medication: Reference;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Information about the administration
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who performed the medication administration and what they did
     *  */
    performer: {
        /**
         * Who performed the medication administration
         *  */
        actor: Reference;
        /**
         * Type of performance
         *  */
        function: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
    };
    /**
     * Reason administration performed
     *  */
    reasonCode: CodeableConcept;
    /**
     * Condition or observation that supports why the medication was administered
     *  */
    reasonReference: Reference;
    /**
     * Request administration performed against
     *  */
    request: Reference;
    /**
     * in-progress | not-done | on-hold | completed | entered-in-error | stopped | unknown
     *  */
    status: string;
    /**
     * Reason administration not performed
     *  */
    statusReason: CodeableConcept;
    /**
     * Who received medication
     *  */
    subject: Reference;
    /**
     * Additional information to support administration
     *  */
    supportingInformation: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type MedicationAdministration_variants = "arv-medication-administration" | "cotrimoxazole-preventive-therapy-medication-administration" | "fluconazole-preventive-therapy-medication-administration";

type MedicationAdministration__lookups = {
    "arv-medication-administration": MedicationAdministration_arv_medication_administration_Props;
    "cotrimoxazole-preventive-therapy-medication-administration": MedicationAdministration_cotrimoxazole_preventive_therapy_medication_administration_Props;
    "fluconazole-preventive-therapy-medication-administration": MedicationAdministration_fluconazole_preventive_therapy_medication_administration_Props;
};

export declare function medicationAdministration<T extends MedicationAdministration_variants>(type: MedicationAdministration_variants, props: MedicationAdministration__lookups[T]);;

type MedicationDispense_arv_medication_dispense_Props = {
    /**
     * Medication order that authorizes the dispense
     *  */
    authorizingPrescription: Reference;
    /**
     * Type of medication dispense
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Encounter / Episode associated with event
     *  */
    context: Reference;
    /**
     * Amount of medication expressed as a timing amount
     *  */
    daysSupply: {
        /**
         * Coded form of the unit
         *  */
        code: string;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
    };
    /**
     * Where the medication was sent
     *  */
    destination: Reference;
    /**
     * Clinical issue with action
     *  */
    detectedIssue: Reference;
    /**
     * How the medication is to be used by the patient or administered by the caregiver
     *  */
    dosageInstruction: Dosage;
    /**
     * A list of relevant lifecycle events
     *  */
    eventHistory: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Where the dispense occurred
     *  */
    location: Reference;
    /**
     * What medication was supplied
     *  */
    medication: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Information about the dispense
     *  */
    note: Annotation;
    /**
     * Event that dispense is part of
     *  */
    partOf: Reference;
    /**
     * Who performed event
     *  */
    performer: {
        /**
         * Individual who was performing
         *  */
        actor: Reference;
        /**
         * Who performed the dispense and what they did
         *  */
        function: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
    };
    /**
     * Amount dispensed
     *  */
    quantity: {
        /**
         * Coded form of the unit
         *  */
        code: string;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
    };
    /**
     * Who collected the medication
     *  */
    receiver: Reference;
    /**
     * preparation | in-progress | cancelled | on-hold | completed | entered-in-error | stopped | declined | unknown
     *  */
    status: string;
    /**
     * Why a dispense was not performed
     *  */
    statusReason: CodeableConcept;
    /**
     * Who the dispense is for
     *  */
    subject: Reference;
    /**
     * Whether a substitution was performed on the dispense
     *  */
    substitution: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Why was substitution made
         *  */
        reason: CodeableConcept;
        /**
         * Who is responsible for the substitution
         *  */
        responsibleParty: Reference;
        /**
         * Code signifying whether a different drug was dispensed from what was prescribed
         *  */
        type: CodeableConcept;
        /**
         * Whether a substitution was or was not performed on the dispense
         *  */
        wasSubstituted: boolean;
    };
    /**
     * Information that supports the dispensing of the medication
     *  */
    supportingInformation: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Trial fill, partial fill, emergency fill, etc.
     *  */
    type: CodeableConcept;
    /**
     * When product was given out
     *  */
    whenHandedOver: dateTime;
    /**
     * When product was packaged and reviewed
     *  */
    whenPrepared: dateTime;
};

type MedicationDispense_cotrimoxazole_preventive_therapy_medication_dispense_Props = {
    /**
     * Medication order that authorizes the dispense
     *  */
    authorizingPrescription: Reference;
    /**
     * Type of medication dispense
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Encounter / Episode associated with event
     *  */
    context: Reference;
    /**
     * Amount of medication expressed as a timing amount
     *  */
    daysSupply: {
        /**
         * Coded form of the unit
         *  */
        code: string;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
    };
    /**
     * Where the medication was sent
     *  */
    destination: Reference;
    /**
     * Clinical issue with action
     *  */
    detectedIssue: Reference;
    /**
     * How the medication is to be used by the patient or administered by the caregiver
     *  */
    dosageInstruction: Dosage;
    /**
     * A list of relevant lifecycle events
     *  */
    eventHistory: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Where the dispense occurred
     *  */
    location: Reference;
    /**
     * What medication was supplied
     *  */
    medication: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Information about the dispense
     *  */
    note: Annotation;
    /**
     * Event that dispense is part of
     *  */
    partOf: Reference;
    /**
     * Who performed event
     *  */
    performer: {
        /**
         * Individual who was performing
         *  */
        actor: Reference;
        /**
         * Who performed the dispense and what they did
         *  */
        function: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
    };
    /**
     * Amount dispensed
     *  */
    quantity: {
        /**
         * Coded form of the unit
         *  */
        code: string;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
    };
    /**
     * Who collected the medication
     *  */
    receiver: Reference;
    /**
     * preparation | in-progress | cancelled | on-hold | completed | entered-in-error | stopped | declined | unknown
     *  */
    status: string;
    /**
     * Why a dispense was not performed
     *  */
    statusReason: CodeableConcept;
    /**
     * Who the dispense is for
     *  */
    subject: Reference;
    /**
     * Whether a substitution was performed on the dispense
     *  */
    substitution: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Why was substitution made
         *  */
        reason: CodeableConcept;
        /**
         * Who is responsible for the substitution
         *  */
        responsibleParty: Reference;
        /**
         * Code signifying whether a different drug was dispensed from what was prescribed
         *  */
        type: CodeableConcept;
        /**
         * Whether a substitution was or was not performed on the dispense
         *  */
        wasSubstituted: boolean;
    };
    /**
     * Information that supports the dispensing of the medication
     *  */
    supportingInformation: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Trial fill, partial fill, emergency fill, etc.
     *  */
    type: CodeableConcept;
    /**
     * When product was given out
     *  */
    whenHandedOver: dateTime;
    /**
     * When product was packaged and reviewed
     *  */
    whenPrepared: dateTime;
};

type MedicationDispense_generic_medication_dispense_Props = {
    /**
     * Medication order that authorizes the dispense
     *  */
    authorizingPrescription: Reference;
    /**
     * Type of medication dispense
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Encounter / Episode associated with event
     *  */
    context: Reference;
    /**
     * Amount of medication expressed as a timing amount
     *  */
    daysSupply: {
        /**
         * Coded form of the unit
         *  */
        code: string;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
    };
    /**
     * Where the medication was sent
     *  */
    destination: Reference;
    /**
     * Clinical issue with action
     *  */
    detectedIssue: Reference;
    /**
     * How the medication is to be used by the patient or administered by the caregiver
     *  */
    dosageInstruction: Dosage;
    /**
     * A list of relevant lifecycle events
     *  */
    eventHistory: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Where the dispense occurred
     *  */
    location: Reference;
    /**
     * What medication was supplied
     *  */
    medication: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Information about the dispense
     *  */
    note: Annotation;
    /**
     * Event that dispense is part of
     *  */
    partOf: Reference;
    /**
     * Who performed event
     *  */
    performer: {
        /**
         * Individual who was performing
         *  */
        actor: Reference;
        /**
         * Who performed the dispense and what they did
         *  */
        function: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
    };
    /**
     * Amount dispensed
     *  */
    quantity: {
        /**
         * Coded form of the unit
         *  */
        code: string;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
    };
    /**
     * Who collected the medication
     *  */
    receiver: Reference;
    /**
     * preparation | in-progress | cancelled | on-hold | completed | entered-in-error | stopped | declined | unknown
     *  */
    status: string;
    /**
     * Why a dispense was not performed
     *  */
    statusReason: CodeableConcept;
    /**
     * Who the dispense is for
     *  */
    subject: Reference;
    /**
     * Whether a substitution was performed on the dispense
     *  */
    substitution: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Why was substitution made
         *  */
        reason: CodeableConcept;
        /**
         * Who is responsible for the substitution
         *  */
        responsibleParty: Reference;
        /**
         * Code signifying whether a different drug was dispensed from what was prescribed
         *  */
        type: CodeableConcept;
        /**
         * Whether a substitution was or was not performed on the dispense
         *  */
        wasSubstituted: boolean;
    };
    /**
     * Information that supports the dispensing of the medication
     *  */
    supportingInformation: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Trial fill, partial fill, emergency fill, etc.
     *  */
    type: CodeableConcept;
    /**
     * When product was given out
     *  */
    whenHandedOver: dateTime;
    /**
     * When product was packaged and reviewed
     *  */
    whenPrepared: dateTime;
};

type MedicationDispense_variants = "arv-medication-dispense" | "cotrimoxazole-preventive-therapy-medication-dispense" | "generic-medication-dispense";

type MedicationDispense__lookups = {
    "arv-medication-dispense": MedicationDispense_arv_medication_dispense_Props;
    "cotrimoxazole-preventive-therapy-medication-dispense": MedicationDispense_cotrimoxazole_preventive_therapy_medication_dispense_Props;
    "generic-medication-dispense": MedicationDispense_generic_medication_dispense_Props;
};

export declare function medicationDispense<T extends MedicationDispense_variants>(type: MedicationDispense_variants, props: MedicationDispense__lookups[T]);;

type MedicationRequest_arv_medication_request_Props = {
    /**
     * When request was initially authored
     *  */
    authoredOn: dateTime;
    /**
     * What request fulfills
     *  */
    basedOn: Reference;
    /**
     * Type of medication usage
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Overall pattern of medication administration
     *  */
    courseOfTherapyType: CodeableConcept;
    /**
     * Clinical Issue with action
     *  */
    detectedIssue: Reference;
    /**
     * Medication supply authorization
     *  */
    dispenseRequest: {
        /**
         * Minimum period of time between dispenses
         *  */
        dispenseInterval: Duration;
        /**
         * Number of days supply per dispense
         *  */
        expectedSupplyDuration: Duration;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * First fill duration
         *  */
        initialFill: Duration;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Number of refills authorized
         *  */
        numberOfRepeatsAllowed: unsignedInt;
        /**
         * Intended dispenser
         *  */
        performer: Reference;
        /**
         * Coded form of the unit
         *  */
        quantity: string;
        /**
         * Time period supply is authorized for
         *  */
        validityPeriod: Period;
    };
    /**
     * True if request is prohibiting action
     *  */
    doNotPerform: boolean;
    /**
     * How the medication should be taken
     *  */
    dosageInstruction: Dosage;
    /**
     * Encounter created as part of encounter/admission/stay
     *  */
    encounter: Reference;
    /**
     * A list of events of interest in the lifecycle
     *  */
    eventHistory: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Composite request this is part of
     *  */
    groupIdentifier: Identifier;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External ids for this request
     *  */
    identifier: {
        /**
         * Organization that issued id (may be just text)
         *  */
        assigner: Reference;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Time period when id is/was valid for use
         *  */
        period: Period;
        /**
         * The namespace for the identifier value
         *  */
        system: uri;
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: string;
        /**
         * The value that is unique
         *  */
        value: string;
    };
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Associated insurance coverage
     *  */
    insurance: Reference;
    /**
     * proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Medication to be taken
     *  */
    medication: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Information about the prescription
     *  */
    note: Annotation;
    /**
     * Intended performer of administration
     *  */
    performer: Reference;
    /**
     * Desired kind of performer of the medication administration
     *  */
    performerType: CodeableConcept;
    /**
     * An order/prescription that is being replaced
     *  */
    priorPrescription: Reference;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * Reason or indication for ordering or not ordering the medication
     *  */
    reasonCode: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Condition or observation that supports why the prescription is being written
     *  */
    reasonReference: Reference;
    /**
     * Person who entered the request
     *  */
    recorder: Reference;
    /**
     * Reported rather than primary record
     *  */
    reported: boolean;
    /**
     * Who/What requested the Request
     *  */
    requester: Reference;
    /**
     * active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * Who or group medication request is for
     *  */
    subject: Reference;
    /**
     * Any restrictions on medication substitution
     *  */
    substitution: {
        /**
         * Whether substitution is allowed or not
         *  */
        allowed: boolean;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Why should (not) substitution be made
         *  */
        reason: CodeableConcept;
    };
    /**
     * Information to support ordering of the medication
     *  */
    supportingInformation: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type MedicationRequest_cotrimoxazole_preventive_therapy_medication_request_Props = {
    /**
     * When request was initially authored
     *  */
    authoredOn: dateTime;
    /**
     * What request fulfills
     *  */
    basedOn: Reference;
    /**
     * Type of medication usage
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Overall pattern of medication administration
     *  */
    courseOfTherapyType: CodeableConcept;
    /**
     * Clinical Issue with action
     *  */
    detectedIssue: Reference;
    /**
     * Medication supply authorization
     *  */
    dispenseRequest: {
        /**
         * Minimum period of time between dispenses
         *  */
        dispenseInterval: Duration;
        /**
         * Number of days supply per dispense
         *  */
        expectedSupplyDuration: Duration;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * First fill duration
         *  */
        initialFill: Duration;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Number of refills authorized
         *  */
        numberOfRepeatsAllowed: unsignedInt;
        /**
         * Intended dispenser
         *  */
        performer: Reference;
        /**
         * Coded form of the unit
         *  */
        quantity: string;
        /**
         * Time period supply is authorized for
         *  */
        validityPeriod: Period;
    };
    /**
     * True if request is prohibiting action
     *  */
    doNotPerform: boolean;
    /**
     * How the medication should be taken
     *  */
    dosageInstruction: Dosage;
    /**
     * Encounter created as part of encounter/admission/stay
     *  */
    encounter: Reference;
    /**
     * A list of events of interest in the lifecycle
     *  */
    eventHistory: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Composite request this is part of
     *  */
    groupIdentifier: Identifier;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External ids for this request
     *  */
    identifier: {
        /**
         * Organization that issued id (may be just text)
         *  */
        assigner: Reference;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Time period when id is/was valid for use
         *  */
        period: Period;
        /**
         * The namespace for the identifier value
         *  */
        system: uri;
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: string;
        /**
         * The value that is unique
         *  */
        value: string;
    };
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Associated insurance coverage
     *  */
    insurance: Reference;
    /**
     * proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Medication to be taken
     *  */
    medication: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Information about the prescription
     *  */
    note: Annotation;
    /**
     * Intended performer of administration
     *  */
    performer: Reference;
    /**
     * Desired kind of performer of the medication administration
     *  */
    performerType: CodeableConcept;
    /**
     * An order/prescription that is being replaced
     *  */
    priorPrescription: Reference;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * Reason or indication for ordering or not ordering the medication
     *  */
    reasonCode: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Condition or observation that supports why the prescription is being written
     *  */
    reasonReference: Reference;
    /**
     * Person who entered the request
     *  */
    recorder: Reference;
    /**
     * Reported rather than primary record
     *  */
    reported: boolean;
    /**
     * Who/What requested the Request
     *  */
    requester: Reference;
    /**
     * active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * Who or group medication request is for
     *  */
    subject: Reference;
    /**
     * Any restrictions on medication substitution
     *  */
    substitution: {
        /**
         * Whether substitution is allowed or not
         *  */
        allowed: boolean;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Why should (not) substitution be made
         *  */
        reason: CodeableConcept;
    };
    /**
     * Information to support ordering of the medication
     *  */
    supportingInformation: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type MedicationRequest_generic_medication_request_Props = {
    /**
     * When request was initially authored
     *  */
    authoredOn: dateTime;
    /**
     * What request fulfills
     *  */
    basedOn: Reference;
    /**
     * Type of medication usage
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Overall pattern of medication administration
     *  */
    courseOfTherapyType: CodeableConcept;
    /**
     * Clinical Issue with action
     *  */
    detectedIssue: Reference;
    /**
     * Medication supply authorization
     *  */
    dispenseRequest: {
        /**
         * Minimum period of time between dispenses
         *  */
        dispenseInterval: Duration;
        /**
         * Number of days supply per dispense
         *  */
        expectedSupplyDuration: Duration;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * First fill duration
         *  */
        initialFill: Duration;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Number of refills authorized
         *  */
        numberOfRepeatsAllowed: unsignedInt;
        /**
         * Intended dispenser
         *  */
        performer: Reference;
        /**
         * Coded form of the unit
         *  */
        quantity: string;
        /**
         * Time period supply is authorized for
         *  */
        validityPeriod: Period;
    };
    /**
     * True if request is prohibiting action
     *  */
    doNotPerform: boolean;
    /**
     * How the medication should be taken
     *  */
    dosageInstruction: Dosage;
    /**
     * Encounter created as part of encounter/admission/stay
     *  */
    encounter: Reference;
    /**
     * A list of events of interest in the lifecycle
     *  */
    eventHistory: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Composite request this is part of
     *  */
    groupIdentifier: Identifier;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External ids for this request
     *  */
    identifier: {
        /**
         * Organization that issued id (may be just text)
         *  */
        assigner: Reference;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Time period when id is/was valid for use
         *  */
        period: Period;
        /**
         * The namespace for the identifier value
         *  */
        system: uri;
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: string;
        /**
         * The value that is unique
         *  */
        value: string;
    };
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Associated insurance coverage
     *  */
    insurance: Reference;
    /**
     * proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Medication to be taken
     *  */
    medication: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Information about the prescription
     *  */
    note: Annotation;
    /**
     * Intended performer of administration
     *  */
    performer: Reference;
    /**
     * Desired kind of performer of the medication administration
     *  */
    performerType: CodeableConcept;
    /**
     * An order/prescription that is being replaced
     *  */
    priorPrescription: Reference;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * Reason or indication for ordering or not ordering the medication
     *  */
    reasonCode: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Condition or observation that supports why the prescription is being written
     *  */
    reasonReference: Reference;
    /**
     * Person who entered the request
     *  */
    recorder: Reference;
    /**
     * Reported rather than primary record
     *  */
    reported: boolean;
    /**
     * Who/What requested the Request
     *  */
    requester: Reference;
    /**
     * active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * Who or group medication request is for
     *  */
    subject: Reference;
    /**
     * Any restrictions on medication substitution
     *  */
    substitution: {
        /**
         * Whether substitution is allowed or not
         *  */
        allowed: boolean;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Why should (not) substitution be made
         *  */
        reason: CodeableConcept;
    };
    /**
     * Information to support ordering of the medication
     *  */
    supportingInformation: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type MedicationRequest_tpt_medication_request_Props = {
    /**
     * When request was initially authored
     *  */
    authoredOn: dateTime;
    /**
     * What request fulfills
     *  */
    basedOn: Reference;
    /**
     * Type of medication usage
     *  */
    category: CodeableConcept;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Overall pattern of medication administration
     *  */
    courseOfTherapyType: CodeableConcept;
    /**
     * Clinical Issue with action
     *  */
    detectedIssue: Reference;
    /**
     * Medication supply authorization
     *  */
    dispenseRequest: {
        /**
         * Minimum period of time between dispenses
         *  */
        dispenseInterval: Duration;
        /**
         * Number of days supply per dispense
         *  */
        expectedSupplyDuration: Duration;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * First fill duration
         *  */
        initialFill: Duration;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Number of refills authorized
         *  */
        numberOfRepeatsAllowed: unsignedInt;
        /**
         * Intended dispenser
         *  */
        performer: Reference;
        /**
         * Coded form of the unit
         *  */
        quantity: string;
        /**
         * Time period supply is authorized for
         *  */
        validityPeriod: Period;
    };
    /**
     * True if request is prohibiting action
     *  */
    doNotPerform: boolean;
    /**
     * How the medication should be taken
     *  */
    dosageInstruction: Dosage;
    /**
     * Encounter created as part of encounter/admission/stay
     *  */
    encounter: Reference;
    /**
     * A list of events of interest in the lifecycle
     *  */
    eventHistory: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * Composite request this is part of
     *  */
    groupIdentifier: Identifier;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * External ids for this request
     *  */
    identifier: {
        /**
         * Organization that issued id (may be just text)
         *  */
        assigner: Reference;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Time period when id is/was valid for use
         *  */
        period: Period;
        /**
         * The namespace for the identifier value
         *  */
        system: uri;
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: string;
        /**
         * The value that is unique
         *  */
        value: string;
    };
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Associated insurance coverage
     *  */
    insurance: Reference;
    /**
     * proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Medication to be taken
     *  */
    medication: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Information about the prescription
     *  */
    note: Annotation;
    /**
     * Intended performer of administration
     *  */
    performer: Reference;
    /**
     * Desired kind of performer of the medication administration
     *  */
    performerType: CodeableConcept;
    /**
     * An order/prescription that is being replaced
     *  */
    priorPrescription: Reference;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * Reason or indication for ordering or not ordering the medication
     *  */
    reasonCode: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Condition or observation that supports why the prescription is being written
     *  */
    reasonReference: Reference;
    /**
     * Person who entered the request
     *  */
    recorder: Reference;
    /**
     * Reported rather than primary record
     *  */
    reported: boolean;
    /**
     * Who/What requested the Request
     *  */
    requester: Reference;
    /**
     * active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * Who or group medication request is for
     *  */
    subject: Reference;
    /**
     * Any restrictions on medication substitution
     *  */
    substitution: {
        /**
         * Whether substitution is allowed or not
         *  */
        allowed: boolean;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Why should (not) substitution be made
         *  */
        reason: CodeableConcept;
    };
    /**
     * Information to support ordering of the medication
     *  */
    supportingInformation: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type MedicationRequest_variants = "arv-medication-request" | "cotrimoxazole-preventive-therapy-medication-request" | "generic-medication-request" | "tpt-medication-request";

type MedicationRequest__lookups = {
    "arv-medication-request": MedicationRequest_arv_medication_request_Props;
    "cotrimoxazole-preventive-therapy-medication-request": MedicationRequest_cotrimoxazole_preventive_therapy_medication_request_Props;
    "generic-medication-request": MedicationRequest_generic_medication_request_Props;
    "tpt-medication-request": MedicationRequest_tpt_medication_request_Props;
};

export declare function medicationRequest<T extends MedicationRequest_variants>(type: MedicationRequest_variants, props: MedicationRequest__lookups[T]);;

type Observation_active_tb_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Date and Time Associated with the Assertion
         *  */
        observedDate: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_alt_ast_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Coded form of the unit
         *  */
        value: string;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_alternate_tb_prophylaxis_type_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: {
        /**
         * Text alternative for the resource
         *  */
        display: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Logical reference, when literal reference is not known
         *  */
        identifier: Identifier;
        /**
         * Literal reference, Relative, internal or absolute URL
         *  */
        reference: string;
        /**
         * Type the reference refers to (e.g. "Patient")
         *  */
        type: uri;
    };
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_alternate_tpt_at_follow_up_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_art_eligibility_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_art_followup_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Date and Time Associated with the Assertion
         *  */
        observedDate: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_art_followup_stopped_reasons_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Reasons ART Stopped
         *  */
        stopReason: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_art_not_started_plan_next_step_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_arv_adherence_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_arv_change_category_type_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_arv_poor_adherence_reasons_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Reasons For Poor ARV Adherence
         *  */
        poorAdherenceReasons: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_arv_regimen_change_reason_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
        /**
         * Viral Load/CD4 Count Classifications Indicating Treatment Failure
         *  */
        treatmentFailureIndication: any;
    };
};

type Observation_arv_regimen_changed_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_arv_regimen_side_effects_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * ARV Regimen Side Effects
         *  */
        aRVSideEffects: any;
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_assessed_for_pain_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_blood_pressure_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Coded form of the unit
         *  */
        value: string;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_bmi_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_breastfeeding_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cd4_absolute_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cd4_percentage_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cervical_cancer_screening_accepted_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cervical_cancer_screening_counselling_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cervical_cancer_screening_method_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cervical_cancer_screening_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cervical_cancer_screening_result_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cervical_cancer_screening_type_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cervical_cancer_treatment_received_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_children_developmental_milestone_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_confirmed_hiv_positive_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cotrimoxazole_preventive_therapy_adherence_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_cotrimoxazole_preventive_therapy_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_counseled_for_hiv_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Date and Time Associated with the Assertion
         *  */
        observedDate: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_creatine_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_current_art_duration_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_delivery_mode_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_delivery_place_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_differentiated_service_delivery_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Differentiated Service Delivery - Details
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_disclosure_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_edema_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_elicited_index_case_contacts_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_enhanced_adherence_counselling_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_estimated_delivery_date_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_family_member_hiv_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_family_planning_method_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Family Planning Method
         *  */
        method: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_fluconazole_preventive_therapy_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_future_pregnancy_plans_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_generic_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_head_circumference_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_health_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_heart_rate_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_height_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_hgb_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_highest_education_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_hiv_prevention_plan_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * HIV Prevention Plan
         *  */
        hIVPreventionPlan: any;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_hiv_program_final_outcome_known_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Date and Time Associated with the Assertion
         *  */
        observedDate: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_hiv_program_final_outcome_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_hiv_program_reason_art_not_started_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_hiv_program_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Date and Time Associated with the Assertion
         *  */
        observedDate: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_hiv_status_disclosure_at_enrollment_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Patient Relationship
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_hiv_test_results_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_hiv_treatment_prior_enrollment_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_inh_at_follow_up_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_last_menstrual_period_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_level_of_pain_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_maternal_hiv_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_muac_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_nutritional_screening_result_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_nutritional_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_nutritional_suppliments_provided_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_otz_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Date and Time Associated with the Assertion
         *  */
        observedDate: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_patient_functional_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_patient_occupation_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_patient_who_stage_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Used for indicating the WHO HIV clinical stage at enrollment into the HIV program.
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_physical_examinations_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_pregnancy_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_presenting_symptom_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_reason_eligible_for_art_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
        /**
         * Reasons Why Eligible for ART
         *  */
        whyEligible: any;
    };
};

type Observation_reason_not_eligbile_for_tpt_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_resides_in_catchment_area_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Challenge Anticipated With Regular Follow Up
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_respiratory_rate_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_screened_for_tb_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Date and Time Associated with the Assertion
         *  */
        observedDate: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_target_population_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_tb_diagnostic_test_result_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_tb_prophylaxis_type_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_tb_screening_result_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_tb_treatment_started_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Date and Time Associated with the Assertion
         *  */
        observedDate: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_tb_treatment_status_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_temperature_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_tested_for_hiv_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Date and Time Associated with the Assertion
         *  */
        observedDate: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_therapeutic_supplementary_food_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_tpt_eligbility_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_tpt_started_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_treatment_completed_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_treatment_discontinued_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_viral_load_count_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_viral_load_indication_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_viral_load_performed_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_weight_observation_Props = {
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Component results
     *  */
    component: {
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Actual component result
         *  */
        value: Quantity;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: dateTime;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
    };
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Actual result
     *  */
    value: {
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Observation_variants = "active-tb-observation" | "alt-ast-observation" | "alternate-tb-prophylaxis-type-observation" | "alternate-tpt-at-follow-up-observation" | "art-eligibility-status-observation" | "art-followup-status-observation" | "art-followup-stopped-reasons-observation" | "art-not-started-plan-next-step-observation" | "arv-adherence-observation" | "arv-change-category-type-observation" | "arv-poor-adherence-reasons-observation" | "arv-regimen-change-reason-observation" | "arv-regimen-changed-observation" | "arv-regimen-side-effects-observation" | "assessed-for-pain-observation" | "blood-pressure" | "bmi-observation" | "breastfeeding-status-observation" | "cd4-absolute-observation" | "cd4-percentage-observation" | "cervical-cancer-screening-accepted-observation" | "cervical-cancer-screening-counselling-status-observation" | "cervical-cancer-screening-method-observation" | "cervical-cancer-screening-observation" | "cervical-cancer-screening-result-observation" | "cervical-cancer-screening-type-observation" | "cervical-cancer-treatment-received-observation" | "children-developmental-milestone-observation" | "confirmed-hiv-positive-observation" | "cotrimoxazole-preventive-therapy-adherence-observation" | "cotrimoxazole-preventive-therapy-observation" | "counseled-for-hiv-observation" | "creatine-observation" | "current-art-duration-observation" | "delivery-mode-observation" | "delivery-place-observation" | "differentiated-service-delivery-observation" | "disclosure-status-observation" | "edema-observation" | "elicited-index-case-contacts-observation" | "enhanced-adherence-counselling-observation" | "estimated-delivery-date-observation" | "family-member-hiv-status-observation" | "family-planning-method-observation" | "fluconazole-preventive-therapy-observation" | "future-pregnancy-plans-observation" | "generic-observation" | "head-circumference-observation" | "health-status-observation" | "heart-rate-observation" | "height-observation" | "hgb-observation" | "highest-education-observation" | "hiv-prevention-plan-observation" | "hiv-program-final-outcome-known-observation" | "hiv-program-final-outcome-observation" | "hiv-program-reason-art-not-started-observation" | "hiv-program-status-observation" | "hiv-status-disclosure-at-enrollment-observation" | "hiv-test-results-observation" | "hiv-treatment-prior-enrollment-observation" | "inh-at-follow-up-observation" | "last-menstrual-period-observation" | "level-of-pain-observation" | "maternal-hiv-status-observation" | "muac-observation" | "nutritional-screening-result-observation" | "nutritional-status-observation" | "nutritional-suppliments-provided-observation" | "otz-observation" | "patient-functional-status-observation" | "patient-occupation-observation" | "patient-who-stage-observation" | "physical-examinations-observation" | "pregnancy-status-observation" | "presenting-symptom-observation" | "reason-eligible-for-art-observation" | "reason-not-eligbile-for-tpt-observation" | "resides-in-catchment-area-observation" | "respiratory-rate-observation" | "screened-for-tb-observation" | "target-population-observation" | "tb-diagnostic-test-result-observation" | "tb-prophylaxis-type-observation" | "tb-screening-result-observation" | "tb-treatment-started-observation" | "tb-treatment-status-observation" | "temperature-observation" | "tested-for-hiv-observation" | "therapeutic-supplementary-food-observation" | "tpt-eligbility-observation" | "tpt-started-observation" | "treatment-completed-observation" | "treatment-discontinued-observation" | "viral-load-count-observation" | "viral-load-indication-observation" | "viral-load-performed-observation" | "weight-observation";

type Observation__lookups = {
    "active-tb-observation": Observation_active_tb_observation_Props;
    "alt-ast-observation": Observation_alt_ast_observation_Props;
    "alternate-tb-prophylaxis-type-observation": Observation_alternate_tb_prophylaxis_type_observation_Props;
    "alternate-tpt-at-follow-up-observation": Observation_alternate_tpt_at_follow_up_observation_Props;
    "art-eligibility-status-observation": Observation_art_eligibility_status_observation_Props;
    "art-followup-status-observation": Observation_art_followup_status_observation_Props;
    "art-followup-stopped-reasons-observation": Observation_art_followup_stopped_reasons_observation_Props;
    "art-not-started-plan-next-step-observation": Observation_art_not_started_plan_next_step_observation_Props;
    "arv-adherence-observation": Observation_arv_adherence_observation_Props;
    "arv-change-category-type-observation": Observation_arv_change_category_type_observation_Props;
    "arv-poor-adherence-reasons-observation": Observation_arv_poor_adherence_reasons_observation_Props;
    "arv-regimen-change-reason-observation": Observation_arv_regimen_change_reason_observation_Props;
    "arv-regimen-changed-observation": Observation_arv_regimen_changed_observation_Props;
    "arv-regimen-side-effects-observation": Observation_arv_regimen_side_effects_observation_Props;
    "assessed-for-pain-observation": Observation_assessed_for_pain_observation_Props;
    "blood-pressure": Observation_blood_pressure_Props;
    "bmi-observation": Observation_bmi_observation_Props;
    "breastfeeding-status-observation": Observation_breastfeeding_status_observation_Props;
    "cd4-absolute-observation": Observation_cd4_absolute_observation_Props;
    "cd4-percentage-observation": Observation_cd4_percentage_observation_Props;
    "cervical-cancer-screening-accepted-observation": Observation_cervical_cancer_screening_accepted_observation_Props;
    "cervical-cancer-screening-counselling-status-observation": Observation_cervical_cancer_screening_counselling_status_observation_Props;
    "cervical-cancer-screening-method-observation": Observation_cervical_cancer_screening_method_observation_Props;
    "cervical-cancer-screening-observation": Observation_cervical_cancer_screening_observation_Props;
    "cervical-cancer-screening-result-observation": Observation_cervical_cancer_screening_result_observation_Props;
    "cervical-cancer-screening-type-observation": Observation_cervical_cancer_screening_type_observation_Props;
    "cervical-cancer-treatment-received-observation": Observation_cervical_cancer_treatment_received_observation_Props;
    "children-developmental-milestone-observation": Observation_children_developmental_milestone_observation_Props;
    "confirmed-hiv-positive-observation": Observation_confirmed_hiv_positive_observation_Props;
    "cotrimoxazole-preventive-therapy-adherence-observation": Observation_cotrimoxazole_preventive_therapy_adherence_observation_Props;
    "cotrimoxazole-preventive-therapy-observation": Observation_cotrimoxazole_preventive_therapy_observation_Props;
    "counseled-for-hiv-observation": Observation_counseled_for_hiv_observation_Props;
    "creatine-observation": Observation_creatine_observation_Props;
    "current-art-duration-observation": Observation_current_art_duration_observation_Props;
    "delivery-mode-observation": Observation_delivery_mode_observation_Props;
    "delivery-place-observation": Observation_delivery_place_observation_Props;
    "differentiated-service-delivery-observation": Observation_differentiated_service_delivery_observation_Props;
    "disclosure-status-observation": Observation_disclosure_status_observation_Props;
    "edema-observation": Observation_edema_observation_Props;
    "elicited-index-case-contacts-observation": Observation_elicited_index_case_contacts_observation_Props;
    "enhanced-adherence-counselling-observation": Observation_enhanced_adherence_counselling_observation_Props;
    "estimated-delivery-date-observation": Observation_estimated_delivery_date_observation_Props;
    "family-member-hiv-status-observation": Observation_family_member_hiv_status_observation_Props;
    "family-planning-method-observation": Observation_family_planning_method_observation_Props;
    "fluconazole-preventive-therapy-observation": Observation_fluconazole_preventive_therapy_observation_Props;
    "future-pregnancy-plans-observation": Observation_future_pregnancy_plans_observation_Props;
    "generic-observation": Observation_generic_observation_Props;
    "head-circumference-observation": Observation_head_circumference_observation_Props;
    "health-status-observation": Observation_health_status_observation_Props;
    "heart-rate-observation": Observation_heart_rate_observation_Props;
    "height-observation": Observation_height_observation_Props;
    "hgb-observation": Observation_hgb_observation_Props;
    "highest-education-observation": Observation_highest_education_observation_Props;
    "hiv-prevention-plan-observation": Observation_hiv_prevention_plan_observation_Props;
    "hiv-program-final-outcome-known-observation": Observation_hiv_program_final_outcome_known_observation_Props;
    "hiv-program-final-outcome-observation": Observation_hiv_program_final_outcome_observation_Props;
    "hiv-program-reason-art-not-started-observation": Observation_hiv_program_reason_art_not_started_observation_Props;
    "hiv-program-status-observation": Observation_hiv_program_status_observation_Props;
    "hiv-status-disclosure-at-enrollment-observation": Observation_hiv_status_disclosure_at_enrollment_observation_Props;
    "hiv-test-results-observation": Observation_hiv_test_results_observation_Props;
    "hiv-treatment-prior-enrollment-observation": Observation_hiv_treatment_prior_enrollment_observation_Props;
    "inh-at-follow-up-observation": Observation_inh_at_follow_up_observation_Props;
    "last-menstrual-period-observation": Observation_last_menstrual_period_observation_Props;
    "level-of-pain-observation": Observation_level_of_pain_observation_Props;
    "maternal-hiv-status-observation": Observation_maternal_hiv_status_observation_Props;
    "muac-observation": Observation_muac_observation_Props;
    "nutritional-screening-result-observation": Observation_nutritional_screening_result_observation_Props;
    "nutritional-status-observation": Observation_nutritional_status_observation_Props;
    "nutritional-suppliments-provided-observation": Observation_nutritional_suppliments_provided_observation_Props;
    "otz-observation": Observation_otz_observation_Props;
    "patient-functional-status-observation": Observation_patient_functional_status_observation_Props;
    "patient-occupation-observation": Observation_patient_occupation_observation_Props;
    "patient-who-stage-observation": Observation_patient_who_stage_observation_Props;
    "physical-examinations-observation": Observation_physical_examinations_observation_Props;
    "pregnancy-status-observation": Observation_pregnancy_status_observation_Props;
    "presenting-symptom-observation": Observation_presenting_symptom_observation_Props;
    "reason-eligible-for-art-observation": Observation_reason_eligible_for_art_observation_Props;
    "reason-not-eligbile-for-tpt-observation": Observation_reason_not_eligbile_for_tpt_observation_Props;
    "resides-in-catchment-area-observation": Observation_resides_in_catchment_area_observation_Props;
    "respiratory-rate-observation": Observation_respiratory_rate_observation_Props;
    "screened-for-tb-observation": Observation_screened_for_tb_observation_Props;
    "target-population-observation": Observation_target_population_observation_Props;
    "tb-diagnostic-test-result-observation": Observation_tb_diagnostic_test_result_observation_Props;
    "tb-prophylaxis-type-observation": Observation_tb_prophylaxis_type_observation_Props;
    "tb-screening-result-observation": Observation_tb_screening_result_observation_Props;
    "tb-treatment-started-observation": Observation_tb_treatment_started_observation_Props;
    "tb-treatment-status-observation": Observation_tb_treatment_status_observation_Props;
    "temperature-observation": Observation_temperature_observation_Props;
    "tested-for-hiv-observation": Observation_tested_for_hiv_observation_Props;
    "therapeutic-supplementary-food-observation": Observation_therapeutic_supplementary_food_observation_Props;
    "tpt-eligbility-observation": Observation_tpt_eligbility_observation_Props;
    "tpt-started-observation": Observation_tpt_started_observation_Props;
    "treatment-completed-observation": Observation_treatment_completed_observation_Props;
    "treatment-discontinued-observation": Observation_treatment_discontinued_observation_Props;
    "viral-load-count-observation": Observation_viral_load_count_observation_Props;
    "viral-load-indication-observation": Observation_viral_load_indication_observation_Props;
    "viral-load-performed-observation": Observation_viral_load_performed_observation_Props;
    "weight-observation": Observation_weight_observation_Props;
};

export declare function observation<T extends Observation_variants>(type: Observation_variants, props: Observation__lookups[T]);;

type Patient_patient_Props = {
    /**
     * Whether this patient's record is in active use
     *  */
    active: boolean;
    /**
     * An address for the individual
     *  */
    address: {
        /**
         * Name of city, town etc.
         *  */
        city: string;
        /**
         * Country (e.g. can be ISO 3166 2 or 3 letter code)
         *  */
        country: string;
        /**
         * District name (aka county)
         *  */
        district: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Street name, number, direction & P.O. Box etc.
         *  */
        line: string;
        /**
         * Time period when address was/is in use
         *  */
        period: Period;
        /**
         * Postal code for area
         *  */
        postalCode: string;
        /**
         * Residential Type
         *  */
        residentialType: any;
        /**
         * Sub-unit of country (abbreviations ok)
         *  */
        state: string;
        /**
         * Text representation of the address
         *  */
        text: string;
        /**
         * postal | physical | both
         *  */
        type: string;
        /**
         * home | work | temp | old | billing - purpose of this address
         *  */
        use: string;
    };
    /**
     * The date of birth for the individual
     *  */
    birthDate: string;
    /**
     * A language which may be used to communicate with the patient about his or her health
     *  */
    communication: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * The language which can be used to communicate with the patient about his or her health
         *  */
        language: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Language preference indicator
         *  */
        preferred: boolean;
    };
    /**
     * A contact party (e.g. guardian, partner, friend) for the patient
     *  */
    contact: {
        /**
         * Address for the contact person
         *  */
        address: Address;
        /**
         * male | female | other | unknown
         *  */
        gender: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A name associated with the contact person
         *  */
        name: HumanName;
        /**
         * Organization that is associated with the contact
         *  */
        organization: Reference;
        /**
         * The period during which this contact person or organization is valid to be contacted relating to this patient
         *  */
        period: Period;
        /**
         * The kind of relationship
         *  */
        relationship: CodeableConcept;
        /**
         * A contact detail for the person
         *  */
        telecom: ContactPoint;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Indicates if the individual is deceased or not
     *  */
    deceased: boolean;
    /**
     * The patient's professed religious affiliations
     *  */
    extension: Extension;
    /**
     * male | female | other | unknown
     *  */
    gender: string;
    /**
     * Patient's nominated primary care provider
     *  */
    generalPractitioner: Reference;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * An identifier for this patient
     *  */
    identifier: {
        /**
         * Organization that issued id (may be just text)
         *  */
        assigner: Reference;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Time period when id is/was valid for use
         *  */
        period: Period;
        /**
         * The namespace for the identifier value
         *  */
        system: uri;
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: string;
        /**
         * The value that is unique
         *  */
        value: string;
    };
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Link to another patient resource that concerns the same actual person
     *  */
    link: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The other patient or related person resource that the link refers to
         *  */
        other: Reference;
        /**
         * replaced-by | replaces | refer | seealso
         *  */
        type: string;
    };
    /**
     * Organization that is the custodian of the patient record
     *  */
    managingOrganization: Reference;
    /**
     * Marital (civil) status of a patient
     *  */
    maritalStatus: CodeableConcept;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Whether patient is part of a multiple birth
     *  */
    multipleBirth: boolean;
    /**
     * A name associated with the patient
     *  */
    name: {
        /**
         * Family name (often called 'Surname')
         *  */
        family: string;
        /**
         * Given names (not always 'first'). Includes middle names
         *  */
        given: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Time period when name was/is in use
         *  */
        period: Period;
        /**
         * Parts that come before the name
         *  */
        prefix: string;
        /**
         * Parts that come after the name
         *  */
        suffix: string;
        /**
         * Text representation of the full name
         *  */
        text: string;
        /**
         * usual | official | temp | nickname | anonymous | old | maiden
         *  */
        use: string;
    };
    /**
     * Image of the patient
     *  */
    photo: Attachment;
    religion: CodeableConcept;
    /**
     * A contact detail for the individual
     *  */
    telecom: ContactPoint;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type Patient_variants = "patient";

type Patient__lookups = {
    "patient": Patient_patient_Props;
};

export declare function patient<T extends Patient_variants>(type: Patient_variants, props: Patient__lookups[T]);;

type RelatedPerson_related_person_Props = {
    /**
     * Whether this related person's record is in active use
     *  */
    active: boolean;
    /**
     * Address where the related person can be contacted or visited
     *  */
    address: {
        /**
         * Name of city, town etc.
         *  */
        city: string;
        /**
         * Country (e.g. can be ISO 3166 2 or 3 letter code)
         *  */
        country: string;
        /**
         * District name (aka county)
         *  */
        district: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Street name, number, direction & P.O. Box etc.
         *  */
        line: string;
        /**
         * Time period when address was/is in use
         *  */
        period: Period;
        /**
         * Postal code for area
         *  */
        postalCode: string;
        /**
         * Sub-unit of country (abbreviations ok)
         *  */
        state: string;
        /**
         * Text representation of the address
         *  */
        text: string;
        /**
         * postal | physical | both
         *  */
        type: string;
        /**
         * home | work | temp | old | billing - purpose of this address
         *  */
        use: string;
    };
    /**
     * The date on which the related person was born
     *  */
    birthDate: string;
    /**
     * A language which may be used to communicate with about the patient's health
     *  */
    communication: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * The language which can be used to communicate with the patient about his or her health
         *  */
        language: CodeableConcept;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Language preference indicator
         *  */
        preferred: boolean;
    };
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Additional content defined by implementations
     *  */
    extension: Extension;
    /**
     * male | female | other | unknown
     *  */
    gender: string;
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * A human identifier for this person
     *  */
    identifier: Identifier;
    /**
     * A set of rules under which this content was created
     *  */
    implicitRules: string;
    /**
     * Language of the resource content
     *  */
    language: string;
    /**
     * Metadata about the resource
     *  */
    meta: Meta;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * A name associated with the person
     *  */
    name: {
        /**
         * Family name (often called 'Surname')
         *  */
        family: string;
        /**
         * Given names (not always 'first'). Includes middle names
         *  */
        given: string;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Time period when name was/is in use
         *  */
        period: Period;
        /**
         * Parts that come before the name
         *  */
        prefix: string;
        /**
         * Parts that come after the name
         *  */
        suffix: string;
        /**
         * Text representation of the full name
         *  */
        text: string;
        /**
         * usual | official | temp | nickname | anonymous | old | maiden
         *  */
        use: string;
    };
    /**
     * The patient this person is related to
     *  */
    patient: Reference;
    /**
     * Period of time that this relationship is considered valid
     *  */
    period: Period;
    /**
     * Image of the person
     *  */
    photo: Attachment;
    /**
     * The nature of the relationship
     *  */
    relationship: {
        /**
         * Code defined by a terminology system
         *  */
        coding: Coding;
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * A contact detail for the person
     *  */
    telecom: ContactPoint;
    /**
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
};

type RelatedPerson_variants = "related-person";

type RelatedPerson__lookups = {
    "related-person": RelatedPerson_related_person_Props;
};

export declare function relatedPerson<T extends RelatedPerson_variants>(type: RelatedPerson_variants, props: RelatedPerson__lookups[T]);;