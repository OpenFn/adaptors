
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import "./globals";

type CarePlan_art_follow_up_careplan_Props = {
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
     * External Ids for this plan
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Fulfills CarePlan
     *  */
    basedOn: Reference;
    /**
     * CarePlan replaced by this CarePlan
     *  */
    replaces: Reference;
    /**
     * Part of referenced CarePlan
     *  */
    partOf: Reference;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * proposal | plan | order | option
     *  */
    intent: string;
    /**
     * Type of plan
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
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
     * Human-friendly name for the care plan
     *  */
    title: string;
    /**
     * Summary of nature of plan
     *  */
    description: string;
    /**
     * Who the care plan is for
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Time period plan covers
     *  */
    period: Period;
    /**
     * Date record was first recorded
     *  */
    created: dateTime;
    /**
     * Who is the designated responsible party
     *  */
    author: Reference;
    /**
     * Who provided the content of the care plan
     *  */
    contributor: Reference;
    /**
     * Who's involved in plan?
     *  */
    careTeam: Reference;
    /**
     * Health issues this plan addresses
     *  */
    addresses: Reference;
    /**
     * Information considered as part of plan
     *  */
    supportingInfo: Reference;
    /**
     * Desired outcome of plan
     *  */
    goal: Reference;
    /**
     * Action to occur as part of plan
     *  */
    activity: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Care Plan - Next Visit Date
         *  */
        nextVisitDate: any;
        /**
         * ARV Adherence
         *  */
        adherence: any;
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
        /**
         * Extra info describing activity to perform
         *  */
        detail: string;
    };
    /**
     * Comments about the plan
     *  */
    note: Annotation;
};

type CarePlan_cervical_cancer_care_plan_Props = {
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
     * External Ids for this plan
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Fulfills CarePlan
     *  */
    basedOn: Reference;
    /**
     * CarePlan replaced by this CarePlan
     *  */
    replaces: Reference;
    /**
     * Part of referenced CarePlan
     *  */
    partOf: Reference;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * proposal | plan | order | option
     *  */
    intent: string;
    /**
     * Type of plan
     *  */
    category: CodeableConcept;
    /**
     * Human-friendly name for the care plan
     *  */
    title: string;
    /**
     * Summary of nature of plan
     *  */
    description: string;
    /**
     * Who the care plan is for
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Time period plan covers
     *  */
    period: Period;
    /**
     * Date record was first recorded
     *  */
    created: dateTime;
    /**
     * Who is the designated responsible party
     *  */
    author: Reference;
    /**
     * Who provided the content of the care plan
     *  */
    contributor: Reference;
    /**
     * Who's involved in plan?
     *  */
    careTeam: Reference;
    /**
     * Health issues this plan addresses
     *  */
    addresses: Reference;
    /**
     * Information considered as part of plan
     *  */
    supportingInfo: Reference;
    /**
     * Desired outcome of plan
     *  */
    goal: Reference;
    /**
     * Action to occur as part of plan
     *  */
    activity: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Care Plan - Next Visit Date
         *  */
        nextVisitDate: any;
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
        /**
         * Extra info describing activity to perform
         *  */
        detail: string;
    };
    /**
     * Comments about the plan
     *  */
    note: Annotation;
};

type CarePlan_cotrimoxazole_preventive_therapy_careplan_Props = {
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
     * External Ids for this plan
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Fulfills CarePlan
     *  */
    basedOn: Reference;
    /**
     * CarePlan replaced by this CarePlan
     *  */
    replaces: Reference;
    /**
     * Part of referenced CarePlan
     *  */
    partOf: Reference;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * proposal | plan | order | option
     *  */
    intent: string;
    /**
     * Type of plan
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
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
     * Human-friendly name for the care plan
     *  */
    title: string;
    /**
     * Summary of nature of plan
     *  */
    description: string;
    /**
     * Who the care plan is for
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Time period plan covers
     *  */
    period: Period;
    /**
     * Date record was first recorded
     *  */
    created: dateTime;
    /**
     * Who is the designated responsible party
     *  */
    author: Reference;
    /**
     * Who provided the content of the care plan
     *  */
    contributor: Reference;
    /**
     * Who's involved in plan?
     *  */
    careTeam: Reference;
    /**
     * Health issues this plan addresses
     *  */
    addresses: Reference;
    /**
     * Information considered as part of plan
     *  */
    supportingInfo: Reference;
    /**
     * Desired outcome of plan
     *  */
    goal: Reference;
    /**
     * Action to occur as part of plan
     *  */
    activity: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Cotrimoxazole Adherence
         *  */
        adherence: any;
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
        /**
         * Extra info describing activity to perform
         *  */
        detail: string;
    };
    /**
     * Comments about the plan
     *  */
    note: Annotation;
};

type CarePlan_tb_treatment_careplan_Props = {
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
     * External Ids for this plan
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Fulfills CarePlan
     *  */
    basedOn: Reference;
    /**
     * CarePlan replaced by this CarePlan
     *  */
    replaces: Reference;
    /**
     * Part of referenced CarePlan
     *  */
    partOf: Reference;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * proposal | plan | order | option
     *  */
    intent: string;
    /**
     * Type of plan
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
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
     * Human-friendly name for the care plan
     *  */
    title: string;
    /**
     * Summary of nature of plan
     *  */
    description: string;
    /**
     * Who the care plan is for
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Time period plan covers
     *  */
    period: Period;
    /**
     * Date record was first recorded
     *  */
    created: dateTime;
    /**
     * Who is the designated responsible party
     *  */
    author: Reference;
    /**
     * Who provided the content of the care plan
     *  */
    contributor: Reference;
    /**
     * Who's involved in plan?
     *  */
    careTeam: Reference;
    /**
     * Health issues this plan addresses
     *  */
    addresses: Reference;
    /**
     * Information considered as part of plan
     *  */
    supportingInfo: Reference;
    /**
     * Desired outcome of plan
     *  */
    goal: Reference;
    /**
     * Action to occur as part of plan
     *  */
    activity: {
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
        /**
         * Extra info describing activity to perform
         *  */
        detail: string;
    };
    /**
     * Comments about the plan
     *  */
    note: Annotation;
};

type CarePlan_tpt_careplan_Props = {
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
     * External Ids for this plan
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: canonical;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Fulfills CarePlan
     *  */
    basedOn: Reference;
    /**
     * CarePlan replaced by this CarePlan
     *  */
    replaces: Reference;
    /**
     * Part of referenced CarePlan
     *  */
    partOf: Reference;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * proposal | plan | order | option
     *  */
    intent: string;
    /**
     * Type of plan
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
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
     * Human-friendly name for the care plan
     *  */
    title: string;
    /**
     * Summary of nature of plan
     *  */
    description: string;
    /**
     * Who the care plan is for
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Time period plan covers
     *  */
    period: Period;
    /**
     * Date record was first recorded
     *  */
    created: dateTime;
    /**
     * Who is the designated responsible party
     *  */
    author: Reference;
    /**
     * Who provided the content of the care plan
     *  */
    contributor: Reference;
    /**
     * Who's involved in plan?
     *  */
    careTeam: Reference;
    /**
     * Health issues this plan addresses
     *  */
    addresses: Reference;
    /**
     * Information considered as part of plan
     *  */
    supportingInfo: Reference;
    /**
     * Desired outcome of plan
     *  */
    goal: Reference;
    /**
     * Action to occur as part of plan
     *  */
    activity: {
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
        /**
         * Extra info describing activity to perform
         *  */
        detail: string;
    };
    /**
     * Comments about the plan
     *  */
    note: Annotation;
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