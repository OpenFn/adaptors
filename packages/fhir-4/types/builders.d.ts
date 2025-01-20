
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import "./globals";

type Account_Account_Props = {
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
     * Account number
     *  */
    identifier: Identifier;
    /**
     * active | inactive | entered-in-error | on-hold | unknown
     *  */
    status: string;
    /**
     * E.g. patient, expense, depreciation
     *  */
    type: CodeableConcept;
    /**
     * Human-readable label
     *  */
    name: string;
    /**
     * The entity that caused the expenses
     *  */
    subject: Reference;
    /**
     * Transaction window
     *  */
    servicePeriod: Period;
    /**
     * The party(s) that are responsible for covering the payment of this account, and what order should they be applied to the account
     *  */
    coverage: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The party(s), such as insurances, that may contribute to the payment of this account
         *  */
        coverage: Reference;
        /**
         * The priority of the coverage in the context of this account
         *  */
        priority: number;
    };
    /**
     * Entity managing the Account
     *  */
    owner: Reference;
    /**
     * Explanation of purpose/use
     *  */
    description: string;
    /**
     * The parties ultimately responsible for balancing the Account
     *  */
    guarantor: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Responsible entity
         *  */
        party: Reference;
        /**
         * Credit or other hold applied
         *  */
        onHold: boolean;
        /**
         * Guarantee account during
         *  */
        period: Period;
    };
    /**
     * Reference to a parent Account
     *  */
    partOf: Reference;
};

type Account__lookups = {
    "Account": Account_Account_Props;
};

export declare function account(props: Account_Account_Props);;

export declare function account<T extends keyof Account__lookups>(type: T, props: Account__lookups[T]);;

type ActivityDefinition_ActivityDefinition_Props = {
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
     * Canonical identifier for this activity definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the activity definition
     *  */
    identifier: Identifier;
    /**
     * Business version of the activity definition
     *  */
    version: string;
    /**
     * Name for this activity definition (computer friendly)
     *  */
    name: string;
    /**
     * Name for this activity definition (human friendly)
     *  */
    title: string;
    /**
     * Subordinate title of the activity definition
     *  */
    subtitle: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Type of individual the activity definition is intended for
     *  */
    subject: CodeableConcept;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the activity definition
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for activity definition (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this activity definition is defined
     *  */
    purpose: markdown;
    /**
     * Describes the clinical usage of the activity definition
     *  */
    usage: string;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * When the activity definition was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the activity definition was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * When the activity definition is expected to be used
     *  */
    effectivePeriod: Period;
    /**
     * E.g. Education, Treatment, Assessment, etc.
     *  */
    topic: CodeableConcept;
    /**
     * Who authored the content
     *  */
    author: ContactDetail;
    /**
     * Who edited the content
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the content
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the content
     *  */
    endorser: ContactDetail;
    /**
     * Additional documentation, citations, etc.
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * Logic used by the activity definition
     *  */
    library: any;
    /**
     * Kind of resource
     *  */
    kind: string;
    /**
     * What profile the resource needs to conform to
     *  */
    profile: any;
    /**
     * Detail type of activity
     *  */
    code: CodeableConcept;
    /**
     * proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * True if the activity should not be performed
     *  */
    doNotPerform: boolean;
    /**
     * When activity is to occur
     *  */
    timing: Timing;
    /**
     * Where it should happen
     *  */
    location: Reference;
    /**
     * Who should participate in the action
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
         * patient | practitioner | related-person | device
         *  */
        type: string;
        /**
         * E.g. Nurse, Surgeon, Parent, etc.
         *  */
        role: CodeableConcept;
    };
    /**
     * What's administered/supplied
     *  */
    product: Reference;
    /**
     * How much is administered/consumed/supplied
     *  */
    quantity: Quantity;
    /**
     * Detailed dosage instructions
     *  */
    dosage: Dosage;
    /**
     * What part of body to perform on
     *  */
    bodySite: CodeableConcept;
    /**
     * What specimens are required to perform this action
     *  */
    specimenRequirement: Reference;
    /**
     * What observations are required to perform this action
     *  */
    observationRequirement: Reference;
    /**
     * What observations must be produced by this action
     *  */
    observationResultRequirement: Reference;
    /**
     * Transform to apply the template
     *  */
    transform: any;
    /**
     * Dynamic aspects of the definition
     *  */
    dynamicValue: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The path to the element to be set dynamically
         *  */
        path: string;
        /**
         * An expression that provides the dynamic value for the customization
         *  */
        expression: Expression;
    };
};

type ActivityDefinition__lookups = {
    "ActivityDefinition": ActivityDefinition_ActivityDefinition_Props;
};

export declare function activityDefinition(props: ActivityDefinition_ActivityDefinition_Props);;

export declare function activityDefinition<T extends keyof ActivityDefinition__lookups>(type: T, props: ActivityDefinition__lookups[T]);;

type AdministrableProductDefinition_AdministrableProductDefinition_Props = {
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
     * An identifier for the administrable product
     *  */
    identifier: Identifier;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * References a product from which one or more of the constituent parts of that product can be prepared and used as described by this administrable product
     *  */
    formOf: Reference;
    /**
     * The dose form of the final product after necessary reconstitution or processing
     *  */
    administrableDoseForm: CodeableConcept;
    /**
     * The presentation type in which this item is given to a patient. e.g. for a spray - 'puff'
     *  */
    unitOfPresentation: CodeableConcept;
    /**
     * Indicates the specific manufactured items that are part of the 'formOf' product that are used in the preparation of this specific administrable form
     *  */
    producedFrom: Reference;
    /**
     * The ingredients of this administrable medicinal product. This is only needed if the ingredients are not specified either using ManufacturedItemDefiniton, or using by incoming references from the Ingredient resource
     *  */
    ingredient: CodeableConcept;
    /**
     * A device that is integral to the medicinal product, in effect being considered as an "ingredient" of the medicinal product
     *  */
    device: Reference;
    /**
     * Characteristics e.g. a product's onset of action
     *  */
    property: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A code expressing the type of characteristic
         *  */
        type: CodeableConcept;
        /**
         * A value for the characteristic
         *  */
        value: CodeableConcept;
        /**
         * The status of characteristic e.g. assigned or pending
         *  */
        status: CodeableConcept;
    };
    /**
     * The path by which the product is taken into or makes contact with the body
     *  */
    routeOfAdministration: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Coded expression for the route
         *  */
        code: CodeableConcept;
        /**
         * The first dose (dose quantity) administered can be specified for the product
         *  */
        firstDose: Quantity;
        /**
         * The maximum single dose that can be administered
         *  */
        maxSingleDose: Quantity;
        /**
         * The maximum dose quantity to be administered in any one 24-h period
         *  */
        maxDosePerDay: Quantity;
        /**
         * The maximum dose per treatment period that can be administered
         *  */
        maxDosePerTreatmentPeriod: Ratio;
        /**
         * The maximum treatment period during which the product can be administered
         *  */
        maxTreatmentPeriod: Duration;
        /**
         * Extra information about the withdrawal period
         *  */
        targetSpecies: string;
    };
};

type AdministrableProductDefinition__lookups = {
    "AdministrableProductDefinition": AdministrableProductDefinition_AdministrableProductDefinition_Props;
};

export declare function administrableProductDefinition(props: AdministrableProductDefinition_AdministrableProductDefinition_Props);;

export declare function administrableProductDefinition<T extends keyof AdministrableProductDefinition__lookups>(type: T, props: AdministrableProductDefinition__lookups[T]);;

type AdverseEvent_AdverseEvent_Props = {
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
     * Business identifier for the event
     *  */
    identifier: Identifier;
    /**
     * actual | potential
     *  */
    actuality: string;
    /**
     * product-problem | product-quality | product-use-error | wrong-dose | incorrect-prescribing-information | wrong-technique | wrong-route-of-administration | wrong-rate | wrong-duration | wrong-time | expired-drug | medical-device-use-error | problem-different-manufacturer | unsafe-physical-environment
     *  */
    category: CodeableConcept;
    /**
     * Type of the event itself in relation to the subject
     *  */
    event: CodeableConcept;
    /**
     * Subject impacted by event
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * When the event occurred
     *  */
    date: string;
    /**
     * When the event was detected
     *  */
    detected: string;
    /**
     * When the event was recorded
     *  */
    recordedDate: string;
    /**
     * Effect on the subject due to this event
     *  */
    resultingCondition: Reference;
    /**
     * Location where adverse event occurred
     *  */
    location: Reference;
    /**
     * Seriousness of the event
     *  */
    seriousness: CodeableConcept;
    /**
     * mild | moderate | severe
     *  */
    severity: CodeableConcept;
    /**
     * resolved | recovering | ongoing | resolvedWithSequelae | fatal | unknown
     *  */
    outcome: CodeableConcept;
    /**
     * Who recorded the adverse event
     *  */
    recorder: Reference;
    /**
     * Who  was involved in the adverse event or the potential adverse event
     *  */
    contributor: Reference;
    /**
     * The suspected agent causing the adverse event
     *  */
    suspectEntity: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Refers to the specific entity that caused the adverse event
         *  */
        instance: Reference;
        /**
         * ProbabilityScale | Bayesian | Checklist
         *  */
        causality: CodeableConcept;
    };
    /**
     * AdverseEvent.subjectMedicalHistory
     *  */
    subjectMedicalHistory: Reference;
    /**
     * AdverseEvent.referenceDocument
     *  */
    referenceDocument: Reference;
    /**
     * AdverseEvent.study
     *  */
    study: Reference;
};

type AdverseEvent__lookups = {
    "AdverseEvent": AdverseEvent_AdverseEvent_Props;
};

export declare function adverseEvent(props: AdverseEvent_AdverseEvent_Props);;

export declare function adverseEvent<T extends keyof AdverseEvent__lookups>(type: T, props: AdverseEvent__lookups[T]);;

type AllergyIntolerance_AllergyIntolerance_Props = {
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
     * External ids for this item
     *  */
    identifier: Identifier;
    /**
     * active | inactive | resolved
     *  */
    clinicalStatus: CodeableConcept;
    /**
     * unconfirmed | confirmed | refuted | entered-in-error
     *  */
    verificationStatus: CodeableConcept;
    /**
     * allergy | intolerance - Underlying mechanism (if known)
     *  */
    type: string;
    /**
     * food | medication | environment | biologic
     *  */
    category: string;
    /**
     * low | high | unable-to-assess
     *  */
    criticality: string;
    /**
     * Code that identifies the allergy or intolerance
     *  */
    code: CodeableConcept;
    /**
     * Who the sensitivity is for
     *  */
    patient: Reference;
    /**
     * Encounter when the allergy or intolerance was asserted
     *  */
    encounter: Reference;
    /**
     * When allergy or intolerance was identified
     *  */
    onset: string;
    /**
     * Date first version of the resource instance was recorded
     *  */
    recordedDate: string;
    /**
     * Who recorded the sensitivity
     *  */
    recorder: Reference;
    /**
     * Source of the information about the allergy
     *  */
    asserter: Reference;
    /**
     * Date(/time) of last known occurrence of a reaction
     *  */
    lastOccurrence: string;
    /**
     * Additional text not captured in other fields
     *  */
    note: Annotation;
    /**
     * Adverse Reaction Events linked to exposure to substance
     *  */
    reaction: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Specific substance or pharmaceutical product considered to be responsible for event
         *  */
        substance: CodeableConcept;
        /**
         * Clinical symptoms/signs associated with the Event
         *  */
        manifestation: CodeableConcept;
        /**
         * Description of the event as a whole
         *  */
        description: string;
        /**
         * Date(/time) when manifestations showed
         *  */
        onset: string;
        /**
         * mild | moderate | severe (of event as a whole)
         *  */
        severity: string;
        /**
         * How the subject was exposed to the substance
         *  */
        exposureRoute: CodeableConcept;
        /**
         * Text about event not captured in other fields
         *  */
        note: Annotation;
    };
};

type AllergyIntolerance__lookups = {
    "AllergyIntolerance": AllergyIntolerance_AllergyIntolerance_Props;
};

export declare function allergyIntolerance(props: AllergyIntolerance_AllergyIntolerance_Props);;

export declare function allergyIntolerance<T extends keyof AllergyIntolerance__lookups>(type: T, props: AllergyIntolerance__lookups[T]);;

type Appointment_Appointment_Props = {
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
     * External Ids for this item
     *  */
    identifier: Identifier;
    /**
     * proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error | checked-in | waitlist
     *  */
    status: string;
    /**
     * The coded reason for the appointment being cancelled
     *  */
    cancelationReason: CodeableConcept;
    /**
     * A broad categorization of the service that is to be performed during this appointment
     *  */
    serviceCategory: CodeableConcept;
    /**
     * The specific service that is to be performed during this appointment
     *  */
    serviceType: CodeableConcept;
    /**
     * The specialty of a practitioner that would be required to perform the service requested in this appointment
     *  */
    specialty: CodeableConcept;
    /**
     * The style of appointment or patient that has been booked in the slot (not service type)
     *  */
    appointmentType: CodeableConcept;
    /**
     * Coded reason this appointment is scheduled
     *  */
    reasonCode: CodeableConcept;
    /**
     * Reason the appointment is to take place (resource)
     *  */
    reasonReference: Reference;
    /**
     * Used to make informed decisions if needing to re-prioritize
     *  */
    priority: number;
    /**
     * Shown on a subject line in a meeting request, or appointment list
     *  */
    description: string;
    /**
     * Additional information to support the appointment
     *  */
    supportingInformation: Reference;
    /**
     * When appointment is to take place
     *  */
    start: string;
    /**
     * When appointment is to conclude
     *  */
    end: string;
    /**
     * Can be less than start/end (e.g. estimate)
     *  */
    minutesDuration: number;
    /**
     * The slots that this appointment is filling
     *  */
    slot: Reference;
    /**
     * The date that this appointment was initially created
     *  */
    created: string;
    /**
     * Additional comments
     *  */
    comment: string;
    /**
     * Detailed information and instructions for the patient
     *  */
    patientInstruction: string;
    /**
     * The service request this appointment is allocated to assess
     *  */
    basedOn: Reference;
    /**
     * Participants involved in appointment
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
         * Role of participant in the appointment
         *  */
        type: CodeableConcept;
        /**
         * Person, Location/HealthcareService or Device
         *  */
        actor: Reference;
        /**
         * required | optional | information-only
         *  */
        required: string;
        /**
         * accepted | declined | tentative | needs-action
         *  */
        status: string;
        /**
         * Participation period of the actor
         *  */
        period: Period;
    };
    /**
     * Potential date/time interval(s) requested to allocate the appointment within
     *  */
    requestedPeriod: Period;
};

type Appointment__lookups = {
    "Appointment": Appointment_Appointment_Props;
};

export declare function appointment(props: Appointment_Appointment_Props);;

export declare function appointment<T extends keyof Appointment__lookups>(type: T, props: Appointment__lookups[T]);;

type AppointmentResponse_AppointmentResponse_Props = {
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
     * External Ids for this item
     *  */
    identifier: Identifier;
    /**
     * Appointment this response relates to
     *  */
    appointment: Reference;
    /**
     * Time from appointment, or requested new start time
     *  */
    start: string;
    /**
     * Time from appointment, or requested new end time
     *  */
    end: string;
    /**
     * Role of participant in the appointment
     *  */
    participantType: CodeableConcept;
    /**
     * Person, Location, HealthcareService, or Device
     *  */
    actor: Reference;
    /**
     * accepted | declined | tentative | needs-action
     *  */
    participantStatus: string;
    /**
     * Additional comments
     *  */
    comment: string;
};

type AppointmentResponse__lookups = {
    "AppointmentResponse": AppointmentResponse_AppointmentResponse_Props;
};

export declare function appointmentResponse(props: AppointmentResponse_AppointmentResponse_Props);;

export declare function appointmentResponse<T extends keyof AppointmentResponse__lookups>(type: T, props: AppointmentResponse__lookups[T]);;

type AuditEvent_AuditEvent_Props = {
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
     * Type/identifier of event
     *  */
    type: Coding;
    /**
     * More specific type/id for the event
     *  */
    subtype: Coding;
    /**
     * Type of action performed during the event
     *  */
    action: string;
    /**
     * When the activity occurred
     *  */
    period: Period;
    /**
     * Time when the event was recorded
     *  */
    recorded: string;
    /**
     * Whether the event succeeded or failed
     *  */
    outcome: string;
    /**
     * Description of the event outcome
     *  */
    outcomeDesc: string;
    /**
     * The purposeOfUse of the event
     *  */
    purposeOfEvent: CodeableConcept;
    /**
     * Actor involved in the event
     *  */
    agent: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * How agent participated
         *  */
        type: CodeableConcept;
        /**
         * Agent role in the event
         *  */
        role: CodeableConcept;
        /**
         * Identifier of who
         *  */
        who: Reference;
        /**
         * Alternative User identity
         *  */
        altId: string;
        /**
         * Human friendly name for the agent
         *  */
        name: string;
        /**
         * Whether user is initiator
         *  */
        requestor: boolean;
        /**
         * Where
         *  */
        location: Reference;
        /**
         * Policy that authorized event
         *  */
        policy: string;
        /**
         * Type of media
         *  */
        media: Coding;
        /**
         * The type of network access point
         *  */
        network: string;
        /**
         * Reason given for this user
         *  */
        purposeOfUse: CodeableConcept;
    };
    /**
     * Audit Event Reporter
     *  */
    source: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Logical source location within the enterprise
         *  */
        site: string;
        /**
         * The identity of source detecting the event
         *  */
        observer: Reference;
        /**
         * The type of source where event originated
         *  */
        type: Coding;
    };
    /**
     * Data or objects used
     *  */
    entity: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Specific instance of resource
         *  */
        what: Reference;
        /**
         * Type of entity involved
         *  */
        type: Coding;
        /**
         * What role the entity played
         *  */
        role: Coding;
        /**
         * Life-cycle stage for the entity
         *  */
        lifecycle: Coding;
        /**
         * Security labels on the entity
         *  */
        securityLabel: Coding;
        /**
         * Descriptor for entity
         *  */
        name: string;
        /**
         * Descriptive text
         *  */
        description: string;
        /**
         * Query parameters
         *  */
        query: base64Binary;
        /**
         * Property value
         *  */
        detail: string;
    };
};

type AuditEvent__lookups = {
    "AuditEvent": AuditEvent_AuditEvent_Props;
};

export declare function auditEvent(props: AuditEvent_AuditEvent_Props);;

export declare function auditEvent<T extends keyof AuditEvent__lookups>(type: T, props: AuditEvent__lookups[T]);;

type Basic_Basic_Props = {
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
     * Business identifier
     *  */
    identifier: Identifier;
    /**
     * Kind of Resource
     *  */
    code: CodeableConcept;
    /**
     * Identifies the focus of this resource
     *  */
    subject: Reference;
    /**
     * When created
     *  */
    created: string;
    /**
     * Who created
     *  */
    author: Reference;
};

type Basic__lookups = {
    "Basic": Basic_Basic_Props;
};

export declare function basic(props: Basic_Basic_Props);;

export declare function basic<T extends keyof Basic__lookups>(type: T, props: Basic__lookups[T]);;

type Binary_Binary_Props = {
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
     * MimeType of the binary content
     *  */
    contentType: string;
    /**
     * Identifies another resource to use as proxy when enforcing access control
     *  */
    securityContext: Reference;
    /**
     * The actual content
     *  */
    data: base64Binary;
};

type Binary__lookups = {
    "Binary": Binary_Binary_Props;
};

export declare function binary(props: Binary_Binary_Props);;

export declare function binary<T extends keyof Binary__lookups>(type: T, props: Binary__lookups[T]);;

type BiologicallyDerivedProduct_BiologicallyDerivedProduct_Props = {
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
     * External ids for this item
     *  */
    identifier: Identifier;
    /**
     * organ | tissue | fluid | cells | biologicalAgent
     *  */
    productCategory: string;
    /**
     * What this biologically derived product is
     *  */
    productCode: CodeableConcept;
    /**
     * available | unavailable
     *  */
    status: string;
    /**
     * Procedure request
     *  */
    request: Reference;
    /**
     * The amount of this biologically derived product
     *  */
    quantity: number;
    /**
     * BiologicallyDerivedProduct parent
     *  */
    parent: Reference;
    /**
     * How this product was collected
     *  */
    collection: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Individual performing collection
         *  */
        collector: Reference;
        /**
         * Who is product from
         *  */
        source: Reference;
        /**
         * Time of product collection
         *  */
        collected: string;
    };
    /**
     * Any processing of the product during collection
     *  */
    processing: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Description of of processing
         *  */
        description: string;
        /**
         * Procesing code
         *  */
        procedure: CodeableConcept;
        /**
         * Substance added during processing
         *  */
        additive: Reference;
        /**
         * Time of processing
         *  */
        time: string;
    };
    /**
     * Any manipulation of product post-collection
     *  */
    manipulation: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Description of manipulation
         *  */
        description: string;
        /**
         * Time of manipulation
         *  */
        time: string;
    };
    /**
     * Product storage
     *  */
    storage: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Description of storage
         *  */
        description: string;
        /**
         * Storage temperature
         *  */
        temperature: number;
        /**
         * farenheit | celsius | kelvin
         *  */
        scale: string;
        /**
         * Storage timeperiod
         *  */
        duration: Period;
    };
};

type BiologicallyDerivedProduct__lookups = {
    "BiologicallyDerivedProduct": BiologicallyDerivedProduct_BiologicallyDerivedProduct_Props;
};

export declare function biologicallyDerivedProduct(props: BiologicallyDerivedProduct_BiologicallyDerivedProduct_Props);;

export declare function biologicallyDerivedProduct<T extends keyof BiologicallyDerivedProduct__lookups>(type: T, props: BiologicallyDerivedProduct__lookups[T]);;

type BodyStructure_BodyStructure_Props = {
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
     * Bodystructure identifier
     *  */
    identifier: Identifier;
    /**
     * Whether this record is in active use
     *  */
    active: boolean;
    /**
     * Kind of Structure
     *  */
    morphology: CodeableConcept;
    /**
     * Body site
     *  */
    location: CodeableConcept;
    /**
     * Body site modifier
     *  */
    locationQualifier: CodeableConcept;
    /**
     * Text description
     *  */
    description: string;
    /**
     * Attached images
     *  */
    image: Attachment;
    /**
     * Who this is about
     *  */
    patient: Reference;
};

type BodyStructure__lookups = {
    "BodyStructure": BodyStructure_BodyStructure_Props;
};

export declare function bodyStructure(props: BodyStructure_BodyStructure_Props);;

export declare function bodyStructure<T extends keyof BodyStructure__lookups>(type: T, props: BodyStructure__lookups[T]);;

type Bundle_Bundle_Props = {
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
     * Persistent identifier for the bundle
     *  */
    identifier: Identifier;
    /**
     * document | message | transaction | transaction-response | batch | batch-response | history | searchset | collection
     *  */
    type: string;
    /**
     * When the bundle was assembled
     *  */
    timestamp: string;
    /**
     * If search, the total number of matches
     *  */
    total: number;
    /**
     * Links related to this Bundle
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
         * See http://www.iana.org/assignments/link-relations/link-relations.xhtml#link-relations-1
         *  */
        relation: string;
        /**
         * Reference details for the link
         *  */
        url: string;
    };
    /**
     * Entry in the bundle - will have a resource or information
     *  */
    entry: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * URI for resource (Absolute URL server address or URI for UUID/OID)
         *  */
        fullUrl: string;
        /**
         * A resource in the bundle
         *  */
        resource: Resource;
        /**
         * Search ranking (between 0 and 1)
         *  */
        search: number;
        /**
         * For conditional creates
         *  */
        request: string;
        /**
         * OperationOutcome with hints and warnings (for batch/transaction)
         *  */
        response: Resource;
    };
    /**
     * Digital Signature
     *  */
    signature: Signature;
};

type Bundle__lookups = {
    "Bundle": Bundle_Bundle_Props;
};

export declare function bundle(props: Bundle_Bundle_Props);;

export declare function bundle<T extends keyof Bundle__lookups>(type: T, props: Bundle__lookups[T]);;

type CapabilityStatement_CapabilityStatement_Props = {
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
     * Canonical identifier for this capability statement, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Business version of the capability statement
     *  */
    version: string;
    /**
     * Name for this capability statement (computer friendly)
     *  */
    name: string;
    /**
     * Name for this capability statement (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the capability statement
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for capability statement (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this capability statement is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * instance | capability | requirements
     *  */
    kind: string;
    /**
     * Canonical URL of another capability statement this implements
     *  */
    instantiates: any;
    /**
     * Canonical URL of another capability statement this adds to
     *  */
    imports: any;
    /**
     * Software that is covered by this capability statement
     *  */
    software: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A name the software is known by
         *  */
        name: string;
        /**
         * Version covered by this statement
         *  */
        version: string;
        /**
         * Date this version was released
         *  */
        releaseDate: string;
    };
    /**
     * If this describes a specific instance
     *  */
    implementation: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Describes this specific instance
         *  */
        description: string;
        /**
         * Base URL for the installation
         *  */
        url: url;
        /**
         * Organization that manages the data
         *  */
        custodian: Reference;
    };
    /**
     * FHIR Version the system supports
     *  */
    fhirVersion: string;
    /**
     * formats supported (xml | json | ttl | mime type)
     *  */
    format: string;
    /**
     * Patch formats supported
     *  */
    patchFormat: string;
    /**
     * Implementation guides supported
     *  */
    implementationGuide: any;
    /**
     * If the endpoint is a RESTful one
     *  */
    rest: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * client | server
         *  */
        mode: string;
        /**
         * General description of implementation
         *  */
        documentation: markdown;
        /**
         * General description of how security works
         *  */
        security: markdown;
        /**
         * Specific details about operation behavior
         *  */
        resource: markdown;
        /**
         * Anything special about operation behavior
         *  */
        interaction: markdown;
        /**
         * Compartments served/used by system
         *  */
        compartment: any;
    };
    /**
     * If messaging is supported
     *  */
    messaging: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Network address or identifier of the end-point
         *  */
        endpoint: url;
        /**
         * Reliable Message Cache Length (min)
         *  */
        reliableCache: number;
        /**
         * Messaging interface behavior details
         *  */
        documentation: markdown;
        /**
         * Message supported by this system
         *  */
        supportedMessage: any;
    };
    /**
     * Document definition
     *  */
    document: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * producer | consumer
         *  */
        mode: string;
        /**
         * Description of document support
         *  */
        documentation: markdown;
        /**
         * Constraint on the resources used in the document
         *  */
        profile: any;
    };
};

type CapabilityStatement__lookups = {
    "CapabilityStatement": CapabilityStatement_CapabilityStatement_Props;
};

export declare function capabilityStatement(props: CapabilityStatement_CapabilityStatement_Props);;

export declare function capabilityStatement<T extends keyof CapabilityStatement__lookups>(type: T, props: CapabilityStatement__lookups[T]);;

type CarePlan_CarePlan_Props = {
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
    instantiatesCanonical: any;
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
    created: string;
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

type CarePlan__lookups = {
    "CarePlan": CarePlan_CarePlan_Props;
};

export declare function carePlan(props: CarePlan_CarePlan_Props);;

export declare function carePlan<T extends keyof CarePlan__lookups>(type: T, props: CarePlan__lookups[T]);;

type CareTeam_CareTeam_Props = {
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
     * External Ids for this team
     *  */
    identifier: Identifier;
    /**
     * proposed | active | suspended | inactive | entered-in-error
     *  */
    status: string;
    /**
     * Type of team
     *  */
    category: CodeableConcept;
    /**
     * Name of the team, such as crisis assessment team
     *  */
    name: string;
    /**
     * Who care team is for
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Time period team covers
     *  */
    period: Period;
    /**
     * Members of the team
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
         * Type of involvement
         *  */
        role: CodeableConcept;
        /**
         * Who is involved
         *  */
        member: Reference;
        /**
         * Organization of the practitioner
         *  */
        onBehalfOf: Reference;
        /**
         * Time period of participant
         *  */
        period: Period;
    };
    /**
     * Why the care team exists
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why the care team exists
     *  */
    reasonReference: Reference;
    /**
     * Organization responsible for the care team
     *  */
    managingOrganization: Reference;
    /**
     * A contact detail for the care team (that applies to all members)
     *  */
    telecom: ContactPoint;
    /**
     * Comments made about the CareTeam
     *  */
    note: Annotation;
};

type CareTeam__lookups = {
    "CareTeam": CareTeam_CareTeam_Props;
};

export declare function careTeam(props: CareTeam_CareTeam_Props);;

export declare function careTeam<T extends keyof CareTeam__lookups>(type: T, props: CareTeam__lookups[T]);;

type CatalogEntry_CatalogEntry_Props = {
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
     * Unique identifier of the catalog item
     *  */
    identifier: Identifier;
    /**
     * The type of item - medication, device, service, protocol or other
     *  */
    type: CodeableConcept;
    /**
     * Whether the entry represents an orderable item
     *  */
    orderable: boolean;
    /**
     * The item that is being defined
     *  */
    referencedItem: Reference;
    /**
     * Any additional identifier(s) for the catalog item, in the same granularity or concept
     *  */
    additionalIdentifier: Identifier;
    /**
     * Classification (category or class) of the item entry
     *  */
    classification: CodeableConcept;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * The time period in which this catalog entry is expected to be active
     *  */
    validityPeriod: Period;
    /**
     * The date until which this catalog entry is expected to be active
     *  */
    validTo: string;
    /**
     * When was this catalog last updated
     *  */
    lastUpdated: string;
    /**
     * Additional characteristics of the catalog entry
     *  */
    additionalCharacteristic: CodeableConcept;
    /**
     * Additional classification of the catalog entry
     *  */
    additionalClassification: CodeableConcept;
    /**
     * An item that this catalog entry is related to
     *  */
    relatedEntry: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * triggers | is-replaced-by
         *  */
        relationtype: string;
        /**
         * The reference to the related item
         *  */
        item: Reference;
    };
};

type CatalogEntry__lookups = {
    "CatalogEntry": CatalogEntry_CatalogEntry_Props;
};

export declare function catalogEntry(props: CatalogEntry_CatalogEntry_Props);;

export declare function catalogEntry<T extends keyof CatalogEntry__lookups>(type: T, props: CatalogEntry__lookups[T]);;

type ChargeItem_ChargeItem_Props = {
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
     * Business Identifier for item
     *  */
    identifier: Identifier;
    /**
     * Defining information about the code of this charge item
     *  */
    definitionUri: string;
    /**
     * Resource defining the code of this ChargeItem
     *  */
    definitionCanonical: any;
    /**
     * planned | billable | not-billable | aborted | billed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * Part of referenced ChargeItem
     *  */
    partOf: Reference;
    /**
     * A code that identifies the charge, like a billing code
     *  */
    code: CodeableConcept;
    /**
     * Individual service was done for/to
     *  */
    subject: Reference;
    /**
     * Encounter / Episode associated with event
     *  */
    context: Reference;
    /**
     * When the charged service was applied
     *  */
    occurrence: string;
    /**
     * Who performed charged service
     *  */
    performer: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * What type of performance was done
         *  */
        function: CodeableConcept;
        /**
         * Individual who was performing
         *  */
        actor: Reference;
    };
    /**
     * Organization providing the charged service
     *  */
    performingOrganization: Reference;
    /**
     * Organization requesting the charged service
     *  */
    requestingOrganization: Reference;
    /**
     * Organization that has ownership of the (potential, future) revenue
     *  */
    costCenter: Reference;
    /**
     * Quantity of which the charge item has been serviced
     *  */
    quantity: Quantity;
    /**
     * Anatomical location, if relevant
     *  */
    bodysite: CodeableConcept;
    /**
     * Factor overriding the associated rules
     *  */
    factorOverride: number;
    /**
     * Price overriding the associated rules
     *  */
    priceOverride: Money;
    /**
     * Reason for overriding the list price/factor
     *  */
    overrideReason: string;
    /**
     * Individual who was entering
     *  */
    enterer: Reference;
    /**
     * Date the charge item was entered
     *  */
    enteredDate: string;
    /**
     * Why was the charged  service rendered?
     *  */
    reason: CodeableConcept;
    /**
     * Which rendered service is being charged?
     *  */
    service: Reference;
    /**
     * Product charged
     *  */
    product: Reference;
    /**
     * Account to place this charge
     *  */
    account: Reference;
    /**
     * Comments made about the ChargeItem
     *  */
    note: Annotation;
    /**
     * Further information supporting this charge
     *  */
    supportingInformation: Reference;
};

type ChargeItem__lookups = {
    "ChargeItem": ChargeItem_ChargeItem_Props;
};

export declare function chargeItem(props: ChargeItem_ChargeItem_Props);;

export declare function chargeItem<T extends keyof ChargeItem__lookups>(type: T, props: ChargeItem__lookups[T]);;

type ChargeItemDefinition_ChargeItemDefinition_Props = {
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
     * Canonical identifier for this charge item definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the charge item definition
     *  */
    identifier: Identifier;
    /**
     * Business version of the charge item definition
     *  */
    version: string;
    /**
     * Name for this charge item definition (human friendly)
     *  */
    title: string;
    /**
     * Underlying externally-defined charge item definition
     *  */
    derivedFromUri: string;
    /**
     * A larger definition of which this particular definition is a component or step
     *  */
    partOf: any;
    /**
     * Completed or terminated request(s) whose function is taken by this new request
     *  */
    replaces: any;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the charge item definition
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for charge item definition (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * When the charge item definition was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the charge item definition was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * When the charge item definition is expected to be used
     *  */
    effectivePeriod: Period;
    /**
     * Billing codes or product types this definition applies to
     *  */
    code: CodeableConcept;
    /**
     * Instances this definition applies to
     *  */
    instance: Reference;
    /**
     * Whether or not the billing code is applicable
     *  */
    applicability: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Natural language description of the condition
         *  */
        description: string;
        /**
         * Language of the expression
         *  */
        language: string;
        /**
         * Boolean-valued expression
         *  */
        expression: string;
    };
    /**
     * Group of properties which are applicable under the same conditions
     *  */
    propertyGroup: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Monetary amount associated with this component
         *  */
        priceComponent: Money;
    };
};

type ChargeItemDefinition__lookups = {
    "ChargeItemDefinition": ChargeItemDefinition_ChargeItemDefinition_Props;
};

export declare function chargeItemDefinition(props: ChargeItemDefinition_ChargeItemDefinition_Props);;

export declare function chargeItemDefinition<T extends keyof ChargeItemDefinition__lookups>(type: T, props: ChargeItemDefinition__lookups[T]);;

type Citation_Citation_Props = {
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
     * Canonical identifier for this citation, represented as a globally unique URI
     *  */
    url: string;
    /**
     * Identifier for the Citation resource itself
     *  */
    identifier: Identifier;
    /**
     * Business version of the citation
     *  */
    version: string;
    /**
     * Name for this citation (computer friendly)
     *  */
    name: string;
    /**
     * Name for this citation (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * The publisher of the Citation, not the publisher of the article or artifact being cited
     *  */
    publisher: string;
    /**
     * Contact details for the publisher of the Citation Resource
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the citation
     *  */
    description: markdown;
    /**
     * The context that the Citation Resource content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for citation (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this citation is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions for the Citation, not for the cited artifact
     *  */
    copyright: markdown;
    /**
     * When the citation was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the citation was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * When the citation is expected to be used
     *  */
    effectivePeriod: Period;
    /**
     * Who authored the Citation
     *  */
    author: ContactDetail;
    /**
     * Who edited the Citation
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the Citation
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the Citation
     *  */
    endorser: ContactDetail;
    /**
     * A human-readable display of the citation
     *  */
    summary: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Format for display of the citation
         *  */
        style: CodeableConcept;
        /**
         * The human-readable display of the citation
         *  */
        text: markdown;
    };
    /**
     * The assignment to an organizing scheme
     *  */
    classification: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The kind of classifier (e.g. publication type, keyword)
         *  */
        type: CodeableConcept;
        /**
         * The specific classification value
         *  */
        classifier: CodeableConcept;
    };
    /**
     * Used for general notes and annotations not coded elsewhere
     *  */
    note: Annotation;
    /**
     * The status of the citation
     *  */
    currentState: CodeableConcept;
    /**
     * An effective date or period for a status of the citation
     *  */
    statusDate: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Classification of the status
         *  */
        activity: CodeableConcept;
        /**
         * Either occurred or expected
         *  */
        actual: boolean;
        /**
         * When the status started and/or ended
         *  */
        period: Period;
    };
    /**
     * Artifact related to the Citation Resource
     *  */
    relatesTo: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * How the Citation resource relates to the target artifact
         *  */
        relationshipType: CodeableConcept;
        /**
         * The clasification of the related artifact
         *  */
        targetClassifier: CodeableConcept;
        /**
         * The article or artifact that the Citation Resource is related to
         *  */
        target: string;
    };
    /**
     * The article or artifact being described
     *  */
    citedArtifact: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * May include DOI, PMID, PMCID, etc.
         *  */
        identifier: Identifier;
        /**
         * May include trial registry identifiers
         *  */
        relatedIdentifier: Identifier;
        /**
         * When the cited artifact was accessed
         *  */
        dateAccessed: string;
        /**
         * Citation for the main version of the cited artifact
         *  */
        version: Reference;
        /**
         * The status of the cited artifact
         *  */
        currentState: CodeableConcept;
        /**
         * When the status started and/or ended
         *  */
        statusDate: Period;
        /**
         * The title of the article or artifact
         *  */
        title: markdown;
        /**
         * Copyright notice for the abstract
         *  */
        abstract: markdown;
        /**
         * The citation for the full article or artifact
         *  */
        part: Reference;
        /**
         * The article or artifact that the cited artifact is related to
         *  */
        relatesTo: string;
        /**
         * Copyright notice for the full article or artifact
         *  */
        publicationForm: markdown;
        /**
         * The specific URL
         *  */
        webLocation: string;
        /**
         * Acceptable to re-use the classification
         *  */
        classification: boolean;
        /**
         * The display string for the author list, contributor list, or contributorship statement
         *  */
        contributorship: markdown;
        /**
         * Any additional information or content for the article or artifact
         *  */
        note: Annotation;
    };
};

type Citation__lookups = {
    "Citation": Citation_Citation_Props;
};

export declare function citation(props: Citation_Citation_Props);;

export declare function citation<T extends keyof Citation__lookups>(type: T, props: Citation__lookups[T]);;

type Claim_Claim_Props = {
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
     * Business Identifier for claim
     *  */
    identifier: Identifier;
    /**
     * active | cancelled | draft | entered-in-error
     *  */
    status: string;
    /**
     * Category or discipline
     *  */
    type: CodeableConcept;
    /**
     * More granular claim type
     *  */
    subType: CodeableConcept;
    /**
     * claim | preauthorization | predetermination
     *  */
    use: string;
    /**
     * The recipient of the products and services
     *  */
    patient: Reference;
    /**
     * Relevant time frame for the claim
     *  */
    billablePeriod: Period;
    /**
     * Resource creation date
     *  */
    created: string;
    /**
     * Author of the claim
     *  */
    enterer: Reference;
    /**
     * Target
     *  */
    insurer: Reference;
    /**
     * Party responsible for the claim
     *  */
    provider: Reference;
    /**
     * Desired processing ugency
     *  */
    priority: CodeableConcept;
    /**
     * For whom to reserve funds
     *  */
    fundsReserve: CodeableConcept;
    /**
     * Prior or corollary claims
     *  */
    related: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Reference to the related claim
         *  */
        claim: Reference;
        /**
         * How the reference claim is related
         *  */
        relationship: CodeableConcept;
        /**
         * File or case reference
         *  */
        reference: Identifier;
    };
    /**
     * Prescription authorizing services and products
     *  */
    prescription: Reference;
    /**
     * Original prescription if superseded by fulfiller
     *  */
    originalPrescription: Reference;
    /**
     * Recipient of benefits payable
     *  */
    payee: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Category of recipient
         *  */
        type: CodeableConcept;
        /**
         * Recipient reference
         *  */
        party: Reference;
    };
    /**
     * Treatment referral
     *  */
    referral: Reference;
    /**
     * Servicing facility
     *  */
    facility: Reference;
    /**
     * Members of the care team
     *  */
    careTeam: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Order of care team
         *  */
        sequence: number;
        /**
         * Practitioner or organization
         *  */
        provider: Reference;
        /**
         * Indicator of the lead practitioner
         *  */
        responsible: boolean;
        /**
         * Function within the team
         *  */
        role: CodeableConcept;
        /**
         * Practitioner credential or specialization
         *  */
        qualification: CodeableConcept;
    };
    /**
     * Supporting information
     *  */
    supportingInfo: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Information instance identifier
         *  */
        sequence: number;
        /**
         * Classification of the supplied information
         *  */
        category: CodeableConcept;
        /**
         * Type of information
         *  */
        code: CodeableConcept;
        /**
         * When it occurred
         *  */
        timing: string;
        /**
         * Data to be provided
         *  */
        value: boolean;
        /**
         * Explanation for the information
         *  */
        reason: CodeableConcept;
    };
    /**
     * Pertinent diagnosis information
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
         * Diagnosis instance identifier
         *  */
        sequence: number;
        /**
         * Nature of illness or problem
         *  */
        diagnosis: CodeableConcept;
        /**
         * Timing or nature of the diagnosis
         *  */
        type: CodeableConcept;
        /**
         * Present on admission
         *  */
        onAdmission: CodeableConcept;
        /**
         * Package billing code
         *  */
        packageCode: CodeableConcept;
    };
    /**
     * Clinical procedures performed
     *  */
    procedure: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Procedure instance identifier
         *  */
        sequence: number;
        /**
         * Category of Procedure
         *  */
        type: CodeableConcept;
        /**
         * When the procedure was performed
         *  */
        date: string;
        /**
         * Specific clinical procedure
         *  */
        procedure: CodeableConcept;
        /**
         * Unique device identifier
         *  */
        udi: Reference;
    };
    /**
     * Patient insurance information
     *  */
    insurance: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Insurance instance identifier
         *  */
        sequence: number;
        /**
         * Coverage to be used for adjudication
         *  */
        focal: boolean;
        /**
         * Pre-assigned Claim number
         *  */
        identifier: Identifier;
        /**
         * Insurance information
         *  */
        coverage: Reference;
        /**
         * Additional provider contract number
         *  */
        businessArrangement: string;
        /**
         * Prior authorization reference number
         *  */
        preAuthRef: string;
        /**
         * Adjudication results
         *  */
        claimResponse: Reference;
    };
    /**
     * Details of the event
     *  */
    accident: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * When the incident occurred
         *  */
        date: string;
        /**
         * The nature of the accident
         *  */
        type: CodeableConcept;
        /**
         * Where the event occurred
         *  */
        location: Address;
    };
    /**
     * Product or service provided
     *  */
    item: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Item instance identifier
         *  */
        sequence: number;
        /**
         * Applicable careTeam members
         *  */
        careTeamSequence: number;
        /**
         * Applicable diagnoses
         *  */
        diagnosisSequence: number;
        /**
         * Applicable procedures
         *  */
        procedureSequence: number;
        /**
         * Applicable exception and supporting information
         *  */
        informationSequence: number;
        /**
         * Revenue or cost center code
         *  */
        revenue: CodeableConcept;
        /**
         * Benefit classification
         *  */
        category: CodeableConcept;
        /**
         * Billing, service, product, or drug code
         *  */
        productOrService: CodeableConcept;
        /**
         * Product or service billing modifiers
         *  */
        modifier: CodeableConcept;
        /**
         * Program the product or service is provided under
         *  */
        programCode: CodeableConcept;
        /**
         * Date or dates of service or product delivery
         *  */
        serviced: string;
        /**
         * Place of service or where product was supplied
         *  */
        location: CodeableConcept;
        /**
         * Count of products or services
         *  */
        quantity: Quantity;
        /**
         * Fee, charge or cost per item
         *  */
        unitPrice: Money;
        /**
         * Price scaling factor
         *  */
        factor: number;
        /**
         * Total item cost
         *  */
        net: Money;
        /**
         * Unique device identifier
         *  */
        udi: Reference;
        /**
         * Anatomical location
         *  */
        bodySite: CodeableConcept;
        /**
         * Anatomical sub-location
         *  */
        subSite: CodeableConcept;
        /**
         * Encounters related to this billed item
         *  */
        encounter: Reference;
        /**
         * Unique device identifier
         *  */
        detail: Reference;
    };
    /**
     * Total claim cost
     *  */
    total: Money;
};

type Claim__lookups = {
    "Claim": Claim_Claim_Props;
};

export declare function claim(props: Claim_Claim_Props);;

export declare function claim<T extends keyof Claim__lookups>(type: T, props: Claim__lookups[T]);;

type ClaimResponse_ClaimResponse_Props = {
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
     * Business Identifier for a claim response
     *  */
    identifier: Identifier;
    /**
     * active | cancelled | draft | entered-in-error
     *  */
    status: string;
    /**
     * More granular claim type
     *  */
    type: CodeableConcept;
    /**
     * More granular claim type
     *  */
    subType: CodeableConcept;
    /**
     * claim | preauthorization | predetermination
     *  */
    use: string;
    /**
     * The recipient of the products and services
     *  */
    patient: Reference;
    /**
     * Response creation date
     *  */
    created: string;
    /**
     * Party responsible for reimbursement
     *  */
    insurer: Reference;
    /**
     * Party responsible for the claim
     *  */
    requestor: Reference;
    /**
     * Id of resource triggering adjudication
     *  */
    request: Reference;
    /**
     * queued | complete | error | partial
     *  */
    outcome: string;
    /**
     * Disposition Message
     *  */
    disposition: string;
    /**
     * Preauthorization reference
     *  */
    preAuthRef: string;
    /**
     * Preauthorization reference effective period
     *  */
    preAuthPeriod: Period;
    /**
     * Party to be paid any benefits payable
     *  */
    payeeType: CodeableConcept;
    /**
     * Adjudication for claim line items
     *  */
    item: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Claim item instance identifier
         *  */
        itemSequence: number;
        /**
         * Applicable note numbers
         *  */
        noteNumber: number;
        /**
         * Non-monetary value
         *  */
        adjudication: number;
        /**
         * Applicable note numbers
         *  */
        detail: number;
    };
    /**
     * Insurer added line items
     *  */
    addItem: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Item sequence number
         *  */
        itemSequence: number;
        /**
         * Detail sequence number
         *  */
        detailSequence: number;
        /**
         * Subdetail sequence number
         *  */
        subdetailSequence: number;
        /**
         * Authorized providers
         *  */
        provider: Reference;
        /**
         * Billing, service, product, or drug code
         *  */
        productOrService: CodeableConcept;
        /**
         * Service/Product billing modifiers
         *  */
        modifier: CodeableConcept;
        /**
         * Program the product or service is provided under
         *  */
        programCode: CodeableConcept;
        /**
         * Date or dates of service or product delivery
         *  */
        serviced: string;
        /**
         * Place of service or where product was supplied
         *  */
        location: CodeableConcept;
        /**
         * Count of products or services
         *  */
        quantity: Quantity;
        /**
         * Fee, charge or cost per item
         *  */
        unitPrice: Money;
        /**
         * Price scaling factor
         *  */
        factor: number;
        /**
         * Total item cost
         *  */
        net: Money;
        /**
         * Anatomical location
         *  */
        bodySite: CodeableConcept;
        /**
         * Anatomical sub-location
         *  */
        subSite: CodeableConcept;
        /**
         * Applicable note numbers
         *  */
        noteNumber: number;
        /**
         * Applicable note numbers
         *  */
        detail: number;
    };
    /**
     * Header-level adjudication
     *  */
    adjudication: any;
    /**
     * Adjudication totals
     *  */
    total: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of adjudication information
         *  */
        category: CodeableConcept;
        /**
         * Financial total for the category
         *  */
        amount: Money;
    };
    /**
     * Payment Details
     *  */
    payment: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Partial or complete payment
         *  */
        type: CodeableConcept;
        /**
         * Payment adjustment for non-claim issues
         *  */
        adjustment: Money;
        /**
         * Explanation for the adjustment
         *  */
        adjustmentReason: CodeableConcept;
        /**
         * Expected date of payment
         *  */
        date: string;
        /**
         * Payable amount after adjustment
         *  */
        amount: Money;
        /**
         * Business identifier for the payment
         *  */
        identifier: Identifier;
    };
    /**
     * Funds reserved status
     *  */
    fundsReserve: CodeableConcept;
    /**
     * Printed form identifier
     *  */
    formCode: CodeableConcept;
    /**
     * Printed reference or actual form
     *  */
    form: Attachment;
    /**
     * Note concerning adjudication
     *  */
    processNote: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Note instance identifier
         *  */
        number: number;
        /**
         * display | print | printoper
         *  */
        type: string;
        /**
         * Note explanatory text
         *  */
        text: string;
        /**
         * Language of the text
         *  */
        language: CodeableConcept;
    };
    /**
     * Request for additional information
     *  */
    communicationRequest: Reference;
    /**
     * Patient insurance information
     *  */
    insurance: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Insurance instance identifier
         *  */
        sequence: number;
        /**
         * Coverage to be used for adjudication
         *  */
        focal: boolean;
        /**
         * Insurance information
         *  */
        coverage: Reference;
        /**
         * Additional provider contract number
         *  */
        businessArrangement: string;
        /**
         * Adjudication results
         *  */
        claimResponse: Reference;
    };
    /**
     * Processing errors
     *  */
    error: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Item sequence number
         *  */
        itemSequence: number;
        /**
         * Detail sequence number
         *  */
        detailSequence: number;
        /**
         * Subdetail sequence number
         *  */
        subDetailSequence: number;
        /**
         * Error code detailing processing issues
         *  */
        code: CodeableConcept;
    };
};

type ClaimResponse__lookups = {
    "ClaimResponse": ClaimResponse_ClaimResponse_Props;
};

export declare function claimResponse(props: ClaimResponse_ClaimResponse_Props);;

export declare function claimResponse<T extends keyof ClaimResponse__lookups>(type: T, props: ClaimResponse__lookups[T]);;

type ClinicalImpression_ClinicalImpression_Props = {
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
     * Business identifier
     *  */
    identifier: Identifier;
    /**
     * in-progress | completed | entered-in-error
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * Kind of assessment performed
     *  */
    code: CodeableConcept;
    /**
     * Why/how the assessment was performed
     *  */
    description: string;
    /**
     * Patient or group assessed
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Time of assessment
     *  */
    effective: string;
    /**
     * When the assessment was documented
     *  */
    date: string;
    /**
     * The clinician performing the assessment
     *  */
    assessor: Reference;
    /**
     * Reference to last assessment
     *  */
    previous: Reference;
    /**
     * Relevant impressions of patient state
     *  */
    problem: Reference;
    /**
     * One or more sets of investigations (signs, symptoms, etc.)
     *  */
    investigation: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A name/code for the set
         *  */
        code: CodeableConcept;
        /**
         * Record of a specific investigation
         *  */
        item: Reference;
    };
    /**
     * Clinical Protocol followed
     *  */
    protocol: string;
    /**
     * Summary of the assessment
     *  */
    summary: string;
    /**
     * Possible or likely findings and diagnoses
     *  */
    finding: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * What was found
         *  */
        itemCodeableConcept: CodeableConcept;
        /**
         * What was found
         *  */
        itemReference: Reference;
        /**
         * Which investigations support finding
         *  */
        basis: string;
    };
    /**
     * Estimate of likely outcome
     *  */
    prognosisCodeableConcept: CodeableConcept;
    /**
     * RiskAssessment expressing likely outcome
     *  */
    prognosisReference: Reference;
    /**
     * Information supporting the clinical impression
     *  */
    supportingInfo: Reference;
    /**
     * Comments made about the ClinicalImpression
     *  */
    note: Annotation;
};

type ClinicalImpression__lookups = {
    "ClinicalImpression": ClinicalImpression_ClinicalImpression_Props;
};

export declare function clinicalImpression(props: ClinicalImpression_ClinicalImpression_Props);;

export declare function clinicalImpression<T extends keyof ClinicalImpression__lookups>(type: T, props: ClinicalImpression__lookups[T]);;

type ClinicalUseDefinition_ClinicalUseDefinition_Props = {
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
     * Business identifier for this issue
     *  */
    identifier: Identifier;
    /**
     * indication | contraindication | interaction | undesirable-effect | warning
     *  */
    type: string;
    /**
     * A categorisation of the issue, primarily for dividing warnings into subject heading areas such as "Pregnancy", "Overdose"
     *  */
    category: CodeableConcept;
    /**
     * The medication or procedure for which this is an indication
     *  */
    subject: Reference;
    /**
     * Whether this is a current issue or one that has been retired etc
     *  */
    status: CodeableConcept;
    /**
     * Specifics for when this is a contraindication
     *  */
    contraindication: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The situation that is being documented as contraindicating against this item
         *  */
        diseaseSymptomProcedure: CodeableReference;
        /**
         * The status of the disease or symptom for the contraindication
         *  */
        diseaseStatus: CodeableReference;
        /**
         * A comorbidity (concurrent condition) or coinfection
         *  */
        comorbidity: CodeableReference;
        /**
         * The indication which this is a contraidication for
         *  */
        indication: Reference;
        /**
         * Reference to a specific medication as part of an indication or contraindication
         *  */
        otherTherapy: CodeableReference;
    };
    /**
     * Specifics for when this is an indication
     *  */
    indication: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The situation that is being documented as an indicaton for this item
         *  */
        diseaseSymptomProcedure: CodeableReference;
        /**
         * The status of the disease or symptom for the indication
         *  */
        diseaseStatus: CodeableReference;
        /**
         * A comorbidity or coinfection as part of the indication
         *  */
        comorbidity: CodeableReference;
        /**
         * The intended effect, aim or strategy to be achieved
         *  */
        intendedEffect: CodeableReference;
        /**
         * Timing or duration information
         *  */
        duration: Range;
        /**
         * An unwanted side effect or negative outcome of the subject of this resource when being used for this indication
         *  */
        undesirableEffect: Reference;
    };
    /**
     * Specifics for when this is an interaction
     *  */
    interaction: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The specific medication, food or laboratory test that interacts
         *  */
        interactant: Reference;
        /**
         * The type of the interaction e.g. drug-drug interaction, drug-lab test interaction
         *  */
        type: CodeableConcept;
        /**
         * The effect of the interaction, for example "reduced gastric absorption of primary medication"
         *  */
        effect: CodeableReference;
        /**
         * The incidence of the interaction, e.g. theoretical, observed
         *  */
        incidence: CodeableConcept;
        /**
         * Actions for managing the interaction
         *  */
        management: CodeableConcept;
    };
    /**
     * The population group to which this applies
     *  */
    population: Reference;
    /**
     * A possible negative outcome from the use of this treatment
     *  */
    undesirableEffect: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The situation in which the undesirable effect may manifest
         *  */
        symptomConditionEffect: CodeableReference;
        /**
         * High level classification of the effect
         *  */
        classification: CodeableConcept;
        /**
         * How often the effect is seen
         *  */
        frequencyOfOccurrence: CodeableConcept;
    };
    /**
     * Critical environmental, health or physical risks or hazards. For example 'Do not operate heavy machinery', 'May cause drowsiness'
     *  */
    warning: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A textual definition of this warning, with formatting
         *  */
        description: markdown;
        /**
         * A coded or unformatted textual definition of this warning
         *  */
        code: CodeableConcept;
    };
};

type ClinicalUseDefinition__lookups = {
    "ClinicalUseDefinition": ClinicalUseDefinition_ClinicalUseDefinition_Props;
};

export declare function clinicalUseDefinition(props: ClinicalUseDefinition_ClinicalUseDefinition_Props);;

export declare function clinicalUseDefinition<T extends keyof ClinicalUseDefinition__lookups>(type: T, props: ClinicalUseDefinition__lookups[T]);;

type CodeSystem_CodeSystem_Props = {
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
     * Canonical identifier for this code system, represented as a URI (globally unique) (Coding.system)
     *  */
    url: string;
    /**
     * Additional identifier for the code system (business identifier)
     *  */
    identifier: Identifier;
    /**
     * Business version of the code system (Coding.version)
     *  */
    version: string;
    /**
     * Name for this code system (computer friendly)
     *  */
    name: string;
    /**
     * Name for this code system (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the code system
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for code system (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this code system is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * If code comparison is case sensitive
     *  */
    caseSensitive: boolean;
    /**
     * Canonical reference to the value set with entire code system
     *  */
    valueSet: any;
    /**
     * grouped-by | is-a | part-of | classified-with
     *  */
    hierarchyMeaning: string;
    /**
     * If code system defines a compositional grammar
     *  */
    compositional: boolean;
    /**
     * If definitions are not stable
     *  */
    versionNeeded: boolean;
    /**
     * not-present | example | fragment | complete | supplement
     *  */
    content: string;
    /**
     * Canonical URL of Code System this adds designations and properties to
     *  */
    supplements: any;
    /**
     * Total concepts in the code system
     *  */
    count: number;
    /**
     * Filter that can be used in a value set
     *  */
    filter: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Code that identifies the filter
         *  */
        code: string;
        /**
         * How or why the filter is used
         *  */
        description: string;
        /**
         * = | is-a | descendent-of | is-not-a | regex | in | not-in | generalizes | exists
         *  */
        operator: string;
        /**
         * What to use for the value
         *  */
        value: string;
    };
    /**
     * Additional information supplied about each concept
     *  */
    property: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Identifies the property on the concepts, and when referred to in operations
         *  */
        code: string;
        /**
         * Formal identifier for the property
         *  */
        uri: string;
        /**
         * Why the property is defined, and/or what it conveys
         *  */
        description: string;
        /**
         * code | Coding | string | integer | boolean | dateTime | decimal
         *  */
        type: string;
    };
    /**
     * Concepts in the code system
     *  */
    concept: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Code that identifies concept
         *  */
        code: string;
        /**
         * Text to display to the user
         *  */
        display: string;
        /**
         * Formal definition
         *  */
        definition: string;
        /**
         * The text value for this designation
         *  */
        designation: string;
        /**
         * Value of the property for this concept
         *  */
        property: string;
    };
};

type CodeSystem__lookups = {
    "CodeSystem": CodeSystem_CodeSystem_Props;
};

export declare function codeSystem(props: CodeSystem_CodeSystem_Props);;

export declare function codeSystem<T extends keyof CodeSystem__lookups>(type: T, props: CodeSystem__lookups[T]);;

type Communication_Communication_Props = {
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
     * Unique identifier
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: any;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Request fulfilled by this communication
     *  */
    basedOn: Reference;
    /**
     * Part of this action
     *  */
    partOf: Reference;
    /**
     * Reply to
     *  */
    inResponseTo: Reference;
    /**
     * preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * Message category
     *  */
    category: CodeableConcept;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * A channel of communication
     *  */
    medium: CodeableConcept;
    /**
     * Focus of message
     *  */
    subject: Reference;
    /**
     * Description of the purpose/content
     *  */
    topic: CodeableConcept;
    /**
     * Resources that pertain to this communication
     *  */
    about: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * When sent
     *  */
    sent: string;
    /**
     * When received
     *  */
    received: string;
    /**
     * Message recipient
     *  */
    recipient: Reference;
    /**
     * Message sender
     *  */
    sender: Reference;
    /**
     * Indication for message
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why was communication done?
     *  */
    reasonReference: Reference;
    /**
     * Message payload
     *  */
    payload: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Message part content
         *  */
        content: string;
    };
    /**
     * Comments made about the communication
     *  */
    note: Annotation;
};

type Communication__lookups = {
    "Communication": Communication_Communication_Props;
};

export declare function communication(props: Communication_Communication_Props);;

export declare function communication<T extends keyof Communication__lookups>(type: T, props: Communication__lookups[T]);;

type CommunicationRequest_CommunicationRequest_Props = {
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
     * Unique identifier
     *  */
    identifier: Identifier;
    /**
     * Fulfills plan or proposal
     *  */
    basedOn: Reference;
    /**
     * Request(s) replaced by this request
     *  */
    replaces: Reference;
    /**
     * Composite request this is part of
     *  */
    groupIdentifier: Identifier;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * Message category
     *  */
    category: CodeableConcept;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * True if request is prohibiting action
     *  */
    doNotPerform: boolean;
    /**
     * A channel of communication
     *  */
    medium: CodeableConcept;
    /**
     * Focus of message
     *  */
    subject: Reference;
    /**
     * Resources that pertain to this communication request
     *  */
    about: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Message payload
     *  */
    payload: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Message part content
         *  */
        content: string;
    };
    /**
     * When scheduled
     *  */
    occurrence: string;
    /**
     * When request transitioned to being actionable
     *  */
    authoredOn: string;
    /**
     * Who/what is requesting service
     *  */
    requester: Reference;
    /**
     * Message recipient
     *  */
    recipient: Reference;
    /**
     * Message sender
     *  */
    sender: Reference;
    /**
     * Why is communication needed?
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why is communication needed?
     *  */
    reasonReference: Reference;
    /**
     * Comments made about communication request
     *  */
    note: Annotation;
};

type CommunicationRequest__lookups = {
    "CommunicationRequest": CommunicationRequest_CommunicationRequest_Props;
};

export declare function communicationRequest(props: CommunicationRequest_CommunicationRequest_Props);;

export declare function communicationRequest<T extends keyof CommunicationRequest__lookups>(type: T, props: CommunicationRequest__lookups[T]);;

type CompartmentDefinition_CompartmentDefinition_Props = {
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
     * Canonical identifier for this compartment definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Business version of the compartment definition
     *  */
    version: string;
    /**
     * Name for this compartment definition (computer friendly)
     *  */
    name: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the compartment definition
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Why this compartment definition is defined
     *  */
    purpose: markdown;
    /**
     * Patient | Encounter | RelatedPerson | Practitioner | Device
     *  */
    code: string;
    /**
     * Whether the search syntax is supported
     *  */
    search: boolean;
    /**
     * How a resource is related to the compartment
     *  */
    resource: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Name of resource type
         *  */
        code: string;
        /**
         * Search Parameter Name, or chained parameters
         *  */
        param: string;
        /**
         * Additional documentation about the resource and compartment
         *  */
        documentation: string;
    };
};

type CompartmentDefinition__lookups = {
    "CompartmentDefinition": CompartmentDefinition_CompartmentDefinition_Props;
};

export declare function compartmentDefinition(props: CompartmentDefinition_CompartmentDefinition_Props);;

export declare function compartmentDefinition<T extends keyof CompartmentDefinition__lookups>(type: T, props: CompartmentDefinition__lookups[T]);;

type Composition_Composition_Props = {
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
     * Version-independent identifier for the Composition
     *  */
    identifier: Identifier;
    /**
     * preliminary | final | amended | entered-in-error
     *  */
    status: string;
    /**
     * Kind of composition (LOINC if possible)
     *  */
    type: CodeableConcept;
    /**
     * Categorization of Composition
     *  */
    category: CodeableConcept;
    /**
     * Who and/or what the composition is about
     *  */
    subject: Reference;
    /**
     * Context of the Composition
     *  */
    encounter: Reference;
    /**
     * Composition editing time
     *  */
    date: string;
    /**
     * Who and/or what authored the composition
     *  */
    author: Reference;
    /**
     * Human Readable name/title
     *  */
    title: string;
    /**
     * As defined by affinity domain
     *  */
    confidentiality: string;
    /**
     * Attests to accuracy of composition
     *  */
    attester: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * personal | professional | legal | official
         *  */
        mode: string;
        /**
         * When the composition was attested
         *  */
        time: string;
        /**
         * Who attested the composition
         *  */
        party: Reference;
    };
    /**
     * Organization which maintains the composition
     *  */
    custodian: Reference;
    /**
     * Relationships to other compositions/documents
     *  */
    relatesTo: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * replaces | transforms | signs | appends
         *  */
        code: string;
        /**
         * Target of the relationship
         *  */
        target: Identifier;
    };
    /**
     * The clinical service(s) being documented
     *  */
    event: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Code(s) that apply to the event being documented
         *  */
        code: CodeableConcept;
        /**
         * The period covered by the documentation
         *  */
        period: Period;
        /**
         * The event(s) being documented
         *  */
        detail: Reference;
    };
    /**
     * Composition is broken into sections
     *  */
    section: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Label for section (e.g. for ToC)
         *  */
        title: string;
        /**
         * Classification of section (recommended)
         *  */
        code: CodeableConcept;
        /**
         * Who and/or what authored the section
         *  */
        author: Reference;
        /**
         * Who/what the section is about, when it is not about the subject of composition
         *  */
        focus: Reference;
        /**
         * Text summary of the section, for human interpretation
         *  */
        text: Narrative;
        /**
         * working | snapshot | changes
         *  */
        mode: string;
        /**
         * Order of section entries
         *  */
        orderedBy: CodeableConcept;
        /**
         * A reference to data that supports this section
         *  */
        entry: Reference;
        /**
         * Why the section is empty
         *  */
        emptyReason: CodeableConcept;
    };
};

type Composition__lookups = {
    "Composition": Composition_Composition_Props;
};

export declare function composition(props: Composition_Composition_Props);;

export declare function composition<T extends keyof Composition__lookups>(type: T, props: Composition__lookups[T]);;

type ConceptMap_ConceptMap_Props = {
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
     * Canonical identifier for this concept map, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the concept map
     *  */
    identifier: Identifier;
    /**
     * Business version of the concept map
     *  */
    version: string;
    /**
     * Name for this concept map (computer friendly)
     *  */
    name: string;
    /**
     * Name for this concept map (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the concept map
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for concept map (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this concept map is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * The source value set that contains the concepts that are being mapped
     *  */
    source: string;
    /**
     * The target value set which provides context for the mappings
     *  */
    target: string;
    /**
     * Same source and target systems
     *  */
    group: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Source system where concepts to be mapped are defined
         *  */
        source: string;
        /**
         * Specific version of the  code system
         *  */
        sourceVersion: string;
        /**
         * Target system that the concepts are to be mapped to
         *  */
        target: string;
        /**
         * Specific version of the  code system
         *  */
        targetVersion: string;
        /**
         * Display for the code (if value is a code)
         *  */
        element: string;
        /**
         * canonical reference to an additional ConceptMap to use for mapping if the source concept is unmapped
         *  */
        unmapped: any;
    };
};

type ConceptMap__lookups = {
    "ConceptMap": ConceptMap_ConceptMap_Props;
};

export declare function conceptMap(props: ConceptMap_ConceptMap_Props);;

export declare function conceptMap<T extends keyof ConceptMap__lookups>(type: T, props: ConceptMap__lookups[T]);;

type Condition_Condition_Props = {
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
     * External Ids for this condition
     *  */
    identifier: Identifier;
    /**
     * active | recurrence | relapse | inactive | remission | resolved
     *  */
    clinicalStatus: CodeableConcept;
    /**
     * unconfirmed | provisional | differential | confirmed | refuted | entered-in-error
     *  */
    verificationStatus: CodeableConcept;
    /**
     * problem-list-item | encounter-diagnosis
     *  */
    category: CodeableConcept;
    /**
     * Subjective severity of condition
     *  */
    severity: CodeableConcept;
    /**
     * Identification of the condition, problem or diagnosis
     *  */
    code: CodeableConcept;
    /**
     * Anatomical location, if relevant
     *  */
    bodySite: CodeableConcept;
    /**
     * Who has the condition?
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Estimated or actual date,  date-time, or age
     *  */
    onset: string;
    /**
     * When in resolution/remission
     *  */
    abatement: string;
    /**
     * Date record was first recorded
     *  */
    recordedDate: string;
    /**
     * Who recorded the condition
     *  */
    recorder: Reference;
    /**
     * Person who asserts this condition
     *  */
    asserter: Reference;
    /**
     * Stage/grade, usually assessed formally
     *  */
    stage: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Simple summary (disease specific)
         *  */
        summary: CodeableConcept;
        /**
         * Formal record of assessment
         *  */
        assessment: Reference;
        /**
         * Kind of staging
         *  */
        type: CodeableConcept;
    };
    /**
     * Supporting evidence
     *  */
    evidence: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Manifestation/symptom
         *  */
        code: CodeableConcept;
        /**
         * Supporting information found elsewhere
         *  */
        detail: Reference;
    };
    /**
     * Additional information about the Condition
     *  */
    note: Annotation;
};

type Condition__lookups = {
    "Condition": Condition_Condition_Props;
};

export declare function condition(props: Condition_Condition_Props);;

export declare function condition<T extends keyof Condition__lookups>(type: T, props: Condition__lookups[T]);;

type Consent_Consent_Props = {
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
     * Identifier for this record (external references)
     *  */
    identifier: Identifier;
    /**
     * draft | proposed | active | rejected | inactive | entered-in-error
     *  */
    status: string;
    /**
     * Which of the four areas this resource covers (extensible)
     *  */
    scope: CodeableConcept;
    /**
     * Classification of the consent statement - for indexing/retrieval
     *  */
    category: CodeableConcept;
    /**
     * Who the consent applies to
     *  */
    patient: Reference;
    /**
     * When this Consent was created or indexed
     *  */
    dateTime: string;
    /**
     * Who is agreeing to the policy and rules
     *  */
    performer: Reference;
    /**
     * Custodian of the consent
     *  */
    organization: Reference;
    /**
     * Source from which this consent is taken
     *  */
    source: Attachment;
    /**
     * Policies covered by this consent
     *  */
    policy: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Enforcement source for policy
         *  */
        authority: string;
        /**
         * Specific policy covered by this consent
         *  */
        uri: string;
    };
    /**
     * Regulation that this consents to
     *  */
    policyRule: CodeableConcept;
    /**
     * Consent Verified by patient or family
     *  */
    verification: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Has been verified
         *  */
        verified: boolean;
        /**
         * Person who verified
         *  */
        verifiedWith: Reference;
        /**
         * When consent verified
         *  */
        verificationDate: string;
    };
    /**
     * Constraints to the base Consent.policyRule
     *  */
    provision: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * deny | permit
         *  */
        type: string;
        /**
         * Timeframe for this rule
         *  */
        period: Period;
        /**
         * Resource for the actor (or group, by role)
         *  */
        actor: Reference;
        /**
         * Actions controlled by this rule
         *  */
        action: CodeableConcept;
        /**
         * Security Labels that define affected resources
         *  */
        securityLabel: Coding;
        /**
         * Context of activities covered by this rule
         *  */
        purpose: Coding;
        /**
         * e.g. Resource Type, Profile, CDA, etc.
         *  */
        class: Coding;
        /**
         * e.g. LOINC or SNOMED CT code, etc. in the content
         *  */
        code: CodeableConcept;
        /**
         * Timeframe for data controlled by this rule
         *  */
        dataPeriod: Period;
        /**
         * The actual data reference
         *  */
        data: Reference;
    };
};

type Consent__lookups = {
    "Consent": Consent_Consent_Props;
};

export declare function consent(props: Consent_Consent_Props);;

export declare function consent<T extends keyof Consent__lookups>(type: T, props: Consent__lookups[T]);;

type Contract_Contract_Props = {
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
     * Contract number
     *  */
    identifier: Identifier;
    /**
     * Basal definition
     *  */
    url: string;
    /**
     * Business edition
     *  */
    version: string;
    /**
     * amended | appended | cancelled | disputed | entered-in-error | executable | executed | negotiable | offered | policy | rejected | renewed | revoked | resolved | terminated
     *  */
    status: string;
    /**
     * Negotiation status
     *  */
    legalState: CodeableConcept;
    /**
     * Source Contract Definition
     *  */
    instantiatesCanonical: Reference;
    /**
     * External Contract Definition
     *  */
    instantiatesUri: string;
    /**
     * Content derived from the basal information
     *  */
    contentDerivative: CodeableConcept;
    /**
     * When this Contract was issued
     *  */
    issued: string;
    /**
     * Effective time
     *  */
    applies: Period;
    /**
     * Contract cessation cause
     *  */
    expirationType: CodeableConcept;
    /**
     * Contract Target Entity
     *  */
    subject: Reference;
    /**
     * Authority under which this Contract has standing
     *  */
    authority: Reference;
    /**
     * A sphere of control governed by an authoritative jurisdiction, organization, or person
     *  */
    domain: Reference;
    /**
     * Specific Location
     *  */
    site: Reference;
    /**
     * Computer friendly designation
     *  */
    name: string;
    /**
     * Human Friendly name
     *  */
    title: string;
    /**
     * Subordinate Friendly name
     *  */
    subtitle: string;
    /**
     * Acronym or short name
     *  */
    alias: string;
    /**
     * Source of Contract
     *  */
    author: Reference;
    /**
     * Range of Legal Concerns
     *  */
    scope: CodeableConcept;
    /**
     * Focus of contract interest
     *  */
    topic: CodeableConcept;
    /**
     * Legal instrument category
     *  */
    type: CodeableConcept;
    /**
     * Subtype within the context of type
     *  */
    subType: CodeableConcept;
    /**
     * Contract precursor content
     *  */
    contentDefinition: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Content structure and use
         *  */
        type: CodeableConcept;
        /**
         * Detailed Content Type Definition
         *  */
        subType: CodeableConcept;
        /**
         * Publisher Entity
         *  */
        publisher: Reference;
        /**
         * When published
         *  */
        publicationDate: string;
        /**
         * amended | appended | cancelled | disputed | entered-in-error | executable | executed | negotiable | offered | policy | rejected | renewed | revoked | resolved | terminated
         *  */
        publicationStatus: string;
        /**
         * Publication Ownership
         *  */
        copyright: markdown;
    };
    /**
     * Contract Term List
     *  */
    term: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Contract Term Number
         *  */
        identifier: Identifier;
        /**
         * Contract Term Issue Date Time
         *  */
        issued: string;
        /**
         * Contract Term Effective Time
         *  */
        applies: Period;
        /**
         * Term Concern
         *  */
        topic: CodeableConcept;
        /**
         * Contract Term Type or Form
         *  */
        type: CodeableConcept;
        /**
         * Contract Term Type specific classification
         *  */
        subType: CodeableConcept;
        /**
         * Term Statement
         *  */
        text: string;
        /**
         * Handling Instructions
         *  */
        securityLabel: Coding;
        /**
         * Offer restriction numbers
         *  */
        offer: number;
        /**
         * Security Labels that define affected terms
         *  */
        asset: number;
        /**
         * Action restriction numbers
         *  */
        action: number;
    };
    /**
     * Extra Information
     *  */
    supportingInfo: Reference;
    /**
     * Key event in Contract History
     *  */
    relevantHistory: Reference;
    /**
     * Contract Signatory
     *  */
    signer: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Contract Signatory Role
         *  */
        type: Coding;
        /**
         * Contract Signatory Party
         *  */
        party: Reference;
        /**
         * Contract Documentation Signature
         *  */
        signature: Signature;
    };
    /**
     * Contract Friendly Language
     *  */
    friendly: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Easily comprehended representation of this Contract
         *  */
        content: Attachment;
    };
    /**
     * Contract Legal Language
     *  */
    legal: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Contract Legal Text
         *  */
        content: Attachment;
    };
    /**
     * Computable Contract Language
     *  */
    rule: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Computable Contract Rules
         *  */
        content: Attachment;
    };
    /**
     * Binding Contract
     *  */
    legallyBinding: Attachment;
};

type Contract__lookups = {
    "Contract": Contract_Contract_Props;
};

export declare function contract(props: Contract_Contract_Props);;

export declare function contract<T extends keyof Contract__lookups>(type: T, props: Contract__lookups[T]);;

type Coverage_Coverage_Props = {
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
     * Business Identifier for the coverage
     *  */
    identifier: Identifier;
    /**
     * active | cancelled | draft | entered-in-error
     *  */
    status: string;
    /**
     * Coverage category such as medical or accident
     *  */
    type: CodeableConcept;
    /**
     * Owner of the policy
     *  */
    policyHolder: Reference;
    /**
     * Subscriber to the policy
     *  */
    subscriber: Reference;
    /**
     * ID assigned to the subscriber
     *  */
    subscriberId: string;
    /**
     * Plan beneficiary
     *  */
    beneficiary: Reference;
    /**
     * Dependent number
     *  */
    dependent: string;
    /**
     * Beneficiary relationship to the subscriber
     *  */
    relationship: CodeableConcept;
    /**
     * Coverage start and end dates
     *  */
    period: Period;
    /**
     * Issuer of the policy
     *  */
    payor: Reference;
    /**
     * Additional coverage classifications
     *  */
    class: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of class such as 'group' or 'plan'
         *  */
        type: CodeableConcept;
        /**
         * Value associated with the type
         *  */
        value: string;
        /**
         * Human readable description of the type and value
         *  */
        name: string;
    };
    /**
     * Relative order of the coverage
     *  */
    order: number;
    /**
     * Insurer network
     *  */
    network: string;
    /**
     * Patient payments for services/products
     *  */
    costToBeneficiary: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Cost category
         *  */
        type: CodeableConcept;
        /**
         * The amount or percentage due from the beneficiary
         *  */
        value: Quantity;
        /**
         * The effective period of the exception
         *  */
        exception: Period;
    };
    /**
     * Reimbursement to insurer
     *  */
    subrogation: boolean;
    /**
     * Contract details
     *  */
    contract: Reference;
};

type Coverage__lookups = {
    "Coverage": Coverage_Coverage_Props;
};

export declare function coverage(props: Coverage_Coverage_Props);;

export declare function coverage<T extends keyof Coverage__lookups>(type: T, props: Coverage__lookups[T]);;

type CoverageEligibilityRequest_CoverageEligibilityRequest_Props = {
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
     * Business Identifier for coverage eligiblity request
     *  */
    identifier: Identifier;
    /**
     * active | cancelled | draft | entered-in-error
     *  */
    status: string;
    /**
     * Desired processing priority
     *  */
    priority: CodeableConcept;
    /**
     * auth-requirements | benefits | discovery | validation
     *  */
    purpose: string;
    /**
     * Intended recipient of products and services
     *  */
    patient: Reference;
    /**
     * Estimated date or dates of service
     *  */
    serviced: string;
    /**
     * Creation date
     *  */
    created: string;
    /**
     * Author
     *  */
    enterer: Reference;
    /**
     * Party responsible for the request
     *  */
    provider: Reference;
    /**
     * Coverage issuer
     *  */
    insurer: Reference;
    /**
     * Servicing facility
     *  */
    facility: Reference;
    /**
     * Supporting information
     *  */
    supportingInfo: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Information instance identifier
         *  */
        sequence: number;
        /**
         * Data to be provided
         *  */
        information: Reference;
        /**
         * Applies to all items
         *  */
        appliesToAll: boolean;
    };
    /**
     * Patient insurance information
     *  */
    insurance: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Applicable coverage
         *  */
        focal: boolean;
        /**
         * Insurance information
         *  */
        coverage: Reference;
        /**
         * Additional provider contract number
         *  */
        businessArrangement: string;
    };
    /**
     * Item to be evaluated for eligibiity
     *  */
    item: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Applicable exception or supporting information
         *  */
        supportingInfoSequence: number;
        /**
         * Benefit classification
         *  */
        category: CodeableConcept;
        /**
         * Billing, service, product, or drug code
         *  */
        productOrService: CodeableConcept;
        /**
         * Product or service billing modifiers
         *  */
        modifier: CodeableConcept;
        /**
         * Perfoming practitioner
         *  */
        provider: Reference;
        /**
         * Count of products or services
         *  */
        quantity: Quantity;
        /**
         * Fee, charge or cost per item
         *  */
        unitPrice: Money;
        /**
         * Servicing facility
         *  */
        facility: Reference;
        /**
         * Nature of illness or problem
         *  */
        diagnosis: CodeableConcept;
        /**
         * Product or service details
         *  */
        detail: Reference;
    };
};

type CoverageEligibilityRequest__lookups = {
    "CoverageEligibilityRequest": CoverageEligibilityRequest_CoverageEligibilityRequest_Props;
};

export declare function coverageEligibilityRequest(props: CoverageEligibilityRequest_CoverageEligibilityRequest_Props);;

export declare function coverageEligibilityRequest<T extends keyof CoverageEligibilityRequest__lookups>(type: T, props: CoverageEligibilityRequest__lookups[T]);;

type CoverageEligibilityResponse_CoverageEligibilityResponse_Props = {
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
     * Business Identifier for coverage eligiblity request
     *  */
    identifier: Identifier;
    /**
     * active | cancelled | draft | entered-in-error
     *  */
    status: string;
    /**
     * auth-requirements | benefits | discovery | validation
     *  */
    purpose: string;
    /**
     * Intended recipient of products and services
     *  */
    patient: Reference;
    /**
     * Estimated date or dates of service
     *  */
    serviced: string;
    /**
     * Response creation date
     *  */
    created: string;
    /**
     * Party responsible for the request
     *  */
    requestor: Reference;
    /**
     * Eligibility request reference
     *  */
    request: Reference;
    /**
     * queued | complete | error | partial
     *  */
    outcome: string;
    /**
     * Disposition Message
     *  */
    disposition: string;
    /**
     * Coverage issuer
     *  */
    insurer: Reference;
    /**
     * Patient insurance information
     *  */
    insurance: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Insurance information
         *  */
        coverage: Reference;
        /**
         * Coverage inforce indicator
         *  */
        inforce: boolean;
        /**
         * When the benefits are applicable
         *  */
        benefitPeriod: Period;
        /**
         * Preauthorization requirements endpoint
         *  */
        item: string;
    };
    /**
     * Preauthorization reference
     *  */
    preAuthRef: string;
    /**
     * Printed form identifier
     *  */
    form: CodeableConcept;
    /**
     * Processing errors
     *  */
    error: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Error code detailing processing issues
         *  */
        code: CodeableConcept;
    };
};

type CoverageEligibilityResponse__lookups = {
    "CoverageEligibilityResponse": CoverageEligibilityResponse_CoverageEligibilityResponse_Props;
};

export declare function coverageEligibilityResponse(props: CoverageEligibilityResponse_CoverageEligibilityResponse_Props);;

export declare function coverageEligibilityResponse<T extends keyof CoverageEligibilityResponse__lookups>(type: T, props: CoverageEligibilityResponse__lookups[T]);;

type DetectedIssue_DetectedIssue_Props = {
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
     * Unique id for the detected issue
     *  */
    identifier: Identifier;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Issue Category, e.g. drug-drug, duplicate therapy, etc.
     *  */
    code: CodeableConcept;
    /**
     * high | moderate | low
     *  */
    severity: string;
    /**
     * Associated patient
     *  */
    patient: Reference;
    /**
     * When identified
     *  */
    identified: string;
    /**
     * The provider or device that identified the issue
     *  */
    author: Reference;
    /**
     * Problem resource
     *  */
    implicated: Reference;
    /**
     * Supporting evidence
     *  */
    evidence: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Manifestation
         *  */
        code: CodeableConcept;
        /**
         * Supporting information
         *  */
        detail: Reference;
    };
    /**
     * Description and context
     *  */
    detail: string;
    /**
     * Authority for issue
     *  */
    reference: string;
    /**
     * Step taken to address
     *  */
    mitigation: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * What mitigation?
         *  */
        action: CodeableConcept;
        /**
         * Date committed
         *  */
        date: string;
        /**
         * Who is committing?
         *  */
        author: Reference;
    };
};

type DetectedIssue__lookups = {
    "DetectedIssue": DetectedIssue_DetectedIssue_Props;
};

export declare function detectedIssue(props: DetectedIssue_DetectedIssue_Props);;

export declare function detectedIssue<T extends keyof DetectedIssue__lookups>(type: T, props: DetectedIssue__lookups[T]);;

type Device_Device_Props = {
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
     * Instance identifier
     *  */
    identifier: Identifier;
    /**
     * The reference to the definition for the device
     *  */
    definition: Reference;
    /**
     * Unique Device Identifier (UDI) Barcode string
     *  */
    udiCarrier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Mandatory fixed portion of UDI
         *  */
        deviceIdentifier: string;
        /**
         * UDI Issuing Organization
         *  */
        issuer: string;
        /**
         * Regional UDI authority
         *  */
        jurisdiction: string;
        /**
         * UDI Machine Readable Barcode String
         *  */
        carrierAIDC: base64Binary;
        /**
         * UDI Human Readable Barcode String
         *  */
        carrierHRF: string;
        /**
         * barcode | rfid | manual +
         *  */
        entryType: string;
    };
    /**
     * active | inactive | entered-in-error | unknown
     *  */
    status: string;
    /**
     * online | paused | standby | offline | not-ready | transduc-discon | hw-discon | off
     *  */
    statusReason: CodeableConcept;
    /**
     * The distinct identification string
     *  */
    distinctIdentifier: string;
    /**
     * Name of device manufacturer
     *  */
    manufacturer: string;
    /**
     * Date when the device was made
     *  */
    manufactureDate: string;
    /**
     * Date and time of expiry of this device (if applicable)
     *  */
    expirationDate: string;
    /**
     * Lot number of manufacture
     *  */
    lotNumber: string;
    /**
     * Serial number assigned by the manufacturer
     *  */
    serialNumber: string;
    /**
     * The name of the device as given by the manufacturer
     *  */
    deviceName: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The name that identifies the device
         *  */
        name: string;
        /**
         * udi-label-name | user-friendly-name | patient-reported-name | manufacturer-name | model-name | other
         *  */
        type: string;
    };
    /**
     * The manufacturer's model number for the device
     *  */
    modelNumber: string;
    /**
     * The part number or catalog number of the device
     *  */
    partNumber: string;
    /**
     * The kind or type of device
     *  */
    type: CodeableConcept;
    /**
     * The capabilities supported on a  device, the standards to which the device conforms for a particular purpose, and used for the communication
     *  */
    specialization: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The standard that is used to operate and communicate
         *  */
        systemType: CodeableConcept;
        /**
         * The version of the standard that is used to operate and communicate
         *  */
        version: string;
    };
    /**
     * The actual design of the device or software version running on the device
     *  */
    version: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The type of the device version, e.g. manufacturer, approved, internal
         *  */
        type: CodeableConcept;
        /**
         * A single component of the device version
         *  */
        component: Identifier;
        /**
         * The version text
         *  */
        value: string;
    };
    /**
     * The actual configuration settings of a device as it actually operates, e.g., regulation status, time properties
     *  */
    property: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Code that specifies the property DeviceDefinitionPropetyCode (Extensible)
         *  */
        type: CodeableConcept;
        /**
         * Property value as a quantity
         *  */
        valueQuantity: Quantity;
        /**
         * Property value as a code, e.g., NTP4 (synced to NTP)
         *  */
        valueCode: CodeableConcept;
    };
    /**
     * Patient to whom Device is affixed
     *  */
    patient: Reference;
    /**
     * Organization responsible for device
     *  */
    owner: Reference;
    /**
     * Details for human/organization for support
     *  */
    contact: ContactPoint;
    /**
     * Where the device is found
     *  */
    location: Reference;
    /**
     * Network address to contact device
     *  */
    url: string;
    /**
     * Device notes and comments
     *  */
    note: Annotation;
    /**
     * Safety Characteristics of Device
     *  */
    safety: CodeableConcept;
    /**
     * The device that this device is attached to or is part of
     *  */
    parent: Reference;
};

type Device__lookups = {
    "Device": Device_Device_Props;
};

export declare function device(props: Device_Device_Props);;

export declare function device<T extends keyof Device__lookups>(type: T, props: Device__lookups[T]);;

type DeviceDefinition_DeviceDefinition_Props = {
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
     * Instance identifier
     *  */
    identifier: Identifier;
    /**
     * Unique Device Identifier (UDI) Barcode string
     *  */
    udiDeviceIdentifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The identifier that is to be associated with every Device that references this DeviceDefintiion for the issuer and jurisdication porvided in the DeviceDefinition.udiDeviceIdentifier
         *  */
        deviceIdentifier: string;
        /**
         * The organization that assigns the identifier algorithm
         *  */
        issuer: string;
        /**
         * The jurisdiction to which the deviceIdentifier applies
         *  */
        jurisdiction: string;
    };
    /**
     * Name of device manufacturer
     *  */
    manufacturer: string;
    /**
     * A name given to the device to identify it
     *  */
    deviceName: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The name of the device
         *  */
        name: string;
        /**
         * udi-label-name | user-friendly-name | patient-reported-name | manufacturer-name | model-name | other
         *  */
        type: string;
    };
    /**
     * The model number for the device
     *  */
    modelNumber: string;
    /**
     * What kind of device or device system this is
     *  */
    type: CodeableConcept;
    /**
     * The capabilities supported on a  device, the standards to which the device conforms for a particular purpose, and used for the communication
     *  */
    specialization: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The standard that is used to operate and communicate
         *  */
        systemType: string;
        /**
         * The version of the standard that is used to operate and communicate
         *  */
        version: string;
    };
    /**
     * Available versions
     *  */
    version: string;
    /**
     * Safety characteristics of the device
     *  */
    safety: CodeableConcept;
    /**
     * Shelf Life and storage information
     *  */
    shelfLifeStorage: ProductShelfLife;
    /**
     * Dimensions, color etc.
     *  */
    physicalCharacteristics: ProdCharacteristic;
    /**
     * Language code for the human-readable text strings produced by the device (all supported)
     *  */
    languageCode: CodeableConcept;
    /**
     * Device capabilities
     *  */
    capability: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of capability
         *  */
        type: CodeableConcept;
        /**
         * Description of capability
         *  */
        description: CodeableConcept;
    };
    /**
     * The actual configuration settings of a device as it actually operates, e.g., regulation status, time properties
     *  */
    property: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Code that specifies the property DeviceDefinitionPropetyCode (Extensible)
         *  */
        type: CodeableConcept;
        /**
         * Property value as a quantity
         *  */
        valueQuantity: Quantity;
        /**
         * Property value as a code, e.g., NTP4 (synced to NTP)
         *  */
        valueCode: CodeableConcept;
    };
    /**
     * Organization responsible for device
     *  */
    owner: Reference;
    /**
     * Details for human/organization for support
     *  */
    contact: ContactPoint;
    /**
     * Network address to contact device
     *  */
    url: string;
    /**
     * Access to on-line information
     *  */
    onlineInformation: string;
    /**
     * Device notes and comments
     *  */
    note: Annotation;
    /**
     * The quantity of the device present in the packaging (e.g. the number of devices present in a pack, or the number of devices in the same package of the medicinal product)
     *  */
    quantity: Quantity;
    /**
     * The parent device it can be part of
     *  */
    parentDevice: Reference;
    /**
     * A substance used to create the material(s) of which the device is made
     *  */
    material: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The substance
         *  */
        substance: CodeableConcept;
        /**
         * Indicates an alternative material of the device
         *  */
        alternate: boolean;
        /**
         * Whether the substance is a known or suspected allergen
         *  */
        allergenicIndicator: boolean;
    };
};

type DeviceDefinition__lookups = {
    "DeviceDefinition": DeviceDefinition_DeviceDefinition_Props;
};

export declare function deviceDefinition(props: DeviceDefinition_DeviceDefinition_Props);;

export declare function deviceDefinition<T extends keyof DeviceDefinition__lookups>(type: T, props: DeviceDefinition__lookups[T]);;

type DeviceMetric_DeviceMetric_Props = {
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
     * Instance identifier
     *  */
    identifier: Identifier;
    /**
     * Identity of metric, for example Heart Rate or PEEP Setting
     *  */
    type: CodeableConcept;
    /**
     * Unit of Measure for the Metric
     *  */
    unit: CodeableConcept;
    /**
     * Describes the link to the source Device
     *  */
    source: Reference;
    /**
     * Describes the link to the parent Device
     *  */
    parent: Reference;
    /**
     * on | off | standby | entered-in-error
     *  */
    operationalStatus: string;
    /**
     * black | red | green | yellow | blue | magenta | cyan | white
     *  */
    color: string;
    /**
     * measurement | setting | calculation | unspecified
     *  */
    category: string;
    /**
     * Describes the measurement repetition time
     *  */
    measurementPeriod: Timing;
    /**
     * Describes the calibrations that have been performed or that are required to be performed
     *  */
    calibration: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * unspecified | offset | gain | two-point
         *  */
        type: string;
        /**
         * not-calibrated | calibration-required | calibrated | unspecified
         *  */
        state: string;
        /**
         * Describes the time last calibration has been performed
         *  */
        time: string;
    };
};

type DeviceMetric__lookups = {
    "DeviceMetric": DeviceMetric_DeviceMetric_Props;
};

export declare function deviceMetric(props: DeviceMetric_DeviceMetric_Props);;

export declare function deviceMetric<T extends keyof DeviceMetric__lookups>(type: T, props: DeviceMetric__lookups[T]);;

type DeviceRequest_DeviceRequest_Props = {
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
     * External Request identifier
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: any;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * What request fulfills
     *  */
    basedOn: Reference;
    /**
     * What request replaces
     *  */
    priorRequest: Reference;
    /**
     * Identifier of composite request
     *  */
    groupIdentifier: Identifier;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * Device requested
     *  */
    code: Reference;
    /**
     * Device details
     *  */
    parameter: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Device detail
         *  */
        code: CodeableConcept;
        /**
         * Value of detail
         *  */
        value: CodeableConcept;
    };
    /**
     * Focus of request
     *  */
    subject: Reference;
    /**
     * Encounter motivating request
     *  */
    encounter: Reference;
    /**
     * Desired time or schedule for use
     *  */
    occurrence: string;
    /**
     * When recorded
     *  */
    authoredOn: string;
    /**
     * Who/what is requesting diagnostics
     *  */
    requester: Reference;
    /**
     * Filler role
     *  */
    performerType: CodeableConcept;
    /**
     * Requested Filler
     *  */
    performer: Reference;
    /**
     * Coded Reason for request
     *  */
    reasonCode: CodeableConcept;
    /**
     * Linked Reason for request
     *  */
    reasonReference: Reference;
    /**
     * Associated insurance coverage
     *  */
    insurance: Reference;
    /**
     * Additional clinical information
     *  */
    supportingInfo: Reference;
    /**
     * Notes or comments
     *  */
    note: Annotation;
    /**
     * Request provenance
     *  */
    relevantHistory: Reference;
};

type DeviceRequest__lookups = {
    "DeviceRequest": DeviceRequest_DeviceRequest_Props;
};

export declare function deviceRequest(props: DeviceRequest_DeviceRequest_Props);;

export declare function deviceRequest<T extends keyof DeviceRequest__lookups>(type: T, props: DeviceRequest__lookups[T]);;

type DeviceUseStatement_DeviceUseStatement_Props = {
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
     * External identifier for this record
     *  */
    identifier: Identifier;
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * active | completed | entered-in-error +
     *  */
    status: string;
    /**
     * Patient using device
     *  */
    subject: Reference;
    /**
     * Supporting information
     *  */
    derivedFrom: Reference;
    /**
     * How often  the device was used
     *  */
    timing: Timing;
    /**
     * When statement was recorded
     *  */
    recordedOn: string;
    /**
     * Who made the statement
     *  */
    source: Reference;
    /**
     * Reference to device used
     *  */
    device: Reference;
    /**
     * Why device was used
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why was DeviceUseStatement performed?
     *  */
    reasonReference: Reference;
    /**
     * Target body site
     *  */
    bodySite: CodeableConcept;
    /**
     * Addition details (comments, instructions)
     *  */
    note: Annotation;
};

type DeviceUseStatement__lookups = {
    "DeviceUseStatement": DeviceUseStatement_DeviceUseStatement_Props;
};

export declare function deviceUseStatement(props: DeviceUseStatement_DeviceUseStatement_Props);;

export declare function deviceUseStatement<T extends keyof DeviceUseStatement__lookups>(type: T, props: DeviceUseStatement__lookups[T]);;

type DiagnosticReport_DiagnosticReport_Props = {
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
     * Business identifier for report
     *  */
    identifier: Identifier;
    /**
     * What was requested
     *  */
    basedOn: Reference;
    /**
     * registered | partial | preliminary | final +
     *  */
    status: string;
    /**
     * Service category
     *  */
    category: CodeableConcept;
    /**
     * Name/Code for this diagnostic report
     *  */
    code: CodeableConcept;
    /**
     * The subject of the report - usually, but not always, the patient
     *  */
    subject: Reference;
    /**
     * Health care event when test ordered
     *  */
    encounter: Reference;
    /**
     * Clinically relevant time/time-period for report
     *  */
    effective: string;
    /**
     * DateTime this version was made
     *  */
    issued: string;
    /**
     * Responsible Diagnostic Service
     *  */
    performer: Reference;
    /**
     * Primary result interpreter
     *  */
    resultsInterpreter: Reference;
    /**
     * Specimens this report is based on
     *  */
    specimen: Reference;
    /**
     * Observations
     *  */
    result: Reference;
    /**
     * Reference to full details of imaging associated with the diagnostic report
     *  */
    imagingStudy: Reference;
    /**
     * Key images associated with this report
     *  */
    media: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Comment about the image (e.g. explanation)
         *  */
        comment: string;
        /**
         * Reference to the image source
         *  */
        link: Reference;
    };
    /**
     * Clinical conclusion (interpretation) of test results
     *  */
    conclusion: string;
    /**
     * Codes for the clinical conclusion of test results
     *  */
    conclusionCode: CodeableConcept;
    /**
     * Entire report as issued
     *  */
    presentedForm: Attachment;
};

type DiagnosticReport__lookups = {
    "DiagnosticReport": DiagnosticReport_DiagnosticReport_Props;
};

export declare function diagnosticReport(props: DiagnosticReport_DiagnosticReport_Props);;

export declare function diagnosticReport<T extends keyof DiagnosticReport__lookups>(type: T, props: DiagnosticReport__lookups[T]);;

type DocumentManifest_DocumentManifest_Props = {
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
     * Unique Identifier for the set of documents
     *  */
    masterIdentifier: Identifier;
    /**
     * Other identifiers for the manifest
     *  */
    identifier: Identifier;
    /**
     * current | superseded | entered-in-error
     *  */
    status: string;
    /**
     * Kind of document set
     *  */
    type: CodeableConcept;
    /**
     * The subject of the set of documents
     *  */
    subject: Reference;
    /**
     * When this document manifest created
     *  */
    created: string;
    /**
     * Who and/or what authored the DocumentManifest
     *  */
    author: Reference;
    /**
     * Intended to get notified about this set of documents
     *  */
    recipient: Reference;
    /**
     * The source system/application/software
     *  */
    source: string;
    /**
     * Human-readable description (title)
     *  */
    description: string;
    /**
     * Items in manifest
     *  */
    content: Reference;
    /**
     * Related things
     *  */
    related: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Identifiers of things that are related
         *  */
        identifier: Identifier;
        /**
         * Related Resource
         *  */
        ref: Reference;
    };
};

type DocumentManifest__lookups = {
    "DocumentManifest": DocumentManifest_DocumentManifest_Props;
};

export declare function documentManifest(props: DocumentManifest_DocumentManifest_Props);;

export declare function documentManifest<T extends keyof DocumentManifest__lookups>(type: T, props: DocumentManifest__lookups[T]);;

type DocumentReference_DocumentReference_Props = {
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
     * Master Version Specific Identifier
     *  */
    masterIdentifier: Identifier;
    /**
     * Other identifiers for the document
     *  */
    identifier: Identifier;
    /**
     * current | superseded | entered-in-error
     *  */
    status: string;
    /**
     * preliminary | final | amended | entered-in-error
     *  */
    docStatus: string;
    /**
     * Kind of document (LOINC if possible)
     *  */
    type: CodeableConcept;
    /**
     * Categorization of document
     *  */
    category: CodeableConcept;
    /**
     * Who/what is the subject of the document
     *  */
    subject: Reference;
    /**
     * When this document reference was created
     *  */
    date: string;
    /**
     * Who and/or what authored the document
     *  */
    author: Reference;
    /**
     * Who/what authenticated the document
     *  */
    authenticator: Reference;
    /**
     * Organization which maintains the document
     *  */
    custodian: Reference;
    /**
     * Relationships to other documents
     *  */
    relatesTo: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * replaces | transforms | signs | appends
         *  */
        code: string;
        /**
         * Target of the relationship
         *  */
        target: Reference;
    };
    /**
     * Human-readable description
     *  */
    description: string;
    /**
     * Document security-tags
     *  */
    securityLabel: CodeableConcept;
    /**
     * Document referenced
     *  */
    content: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Where to access the document
         *  */
        attachment: Attachment;
        /**
         * Format/content rules for the document
         *  */
        format: Coding;
    };
    /**
     * Clinical context of document
     *  */
    context: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Context of the document  content
         *  */
        encounter: Reference;
        /**
         * Main clinical acts documented
         *  */
        event: CodeableConcept;
        /**
         * Time of service that is being documented
         *  */
        period: Period;
        /**
         * Kind of facility where patient was seen
         *  */
        facilityType: CodeableConcept;
        /**
         * Additional details about where the content was created (e.g. clinical specialty)
         *  */
        practiceSetting: CodeableConcept;
        /**
         * Patient demographics from source
         *  */
        sourcePatientInfo: Reference;
        /**
         * Related identifiers or resources
         *  */
        related: Reference;
    };
};

type DocumentReference__lookups = {
    "DocumentReference": DocumentReference_DocumentReference_Props;
};

export declare function documentReference(props: DocumentReference_DocumentReference_Props);;

export declare function documentReference<T extends keyof DocumentReference__lookups>(type: T, props: DocumentReference__lookups[T]);;

type DomainResource_DomainResource_Props = {
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
};

type DomainResource__lookups = {
    "DomainResource": DomainResource_DomainResource_Props;
};

export declare function domainResource(props: DomainResource_DomainResource_Props);;

export declare function domainResource<T extends keyof DomainResource__lookups>(type: T, props: DomainResource__lookups[T]);;

type Encounter_Encounter_Props = {
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
    identifier: Identifier;
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

type Encounter__lookups = {
    "Encounter": Encounter_Encounter_Props;
};

export declare function encounter(props: Encounter_Encounter_Props);;

export declare function encounter<T extends keyof Encounter__lookups>(type: T, props: Encounter__lookups[T]);;

type Endpoint_Endpoint_Props = {
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
     * Identifies this endpoint across multiple systems
     *  */
    identifier: Identifier;
    /**
     * active | suspended | error | off | entered-in-error | test
     *  */
    status: string;
    /**
     * Protocol/Profile/Standard to be used with this endpoint connection
     *  */
    connectionType: Coding;
    /**
     * A name that this endpoint can be identified by
     *  */
    name: string;
    /**
     * Organization that manages this endpoint (might not be the organization that exposes the endpoint)
     *  */
    managingOrganization: Reference;
    /**
     * Contact details for source (e.g. troubleshooting)
     *  */
    contact: ContactPoint;
    /**
     * Interval the endpoint is expected to be operational
     *  */
    period: Period;
    /**
     * The type of content that may be used at this endpoint (e.g. XDS Discharge summaries)
     *  */
    payloadType: CodeableConcept;
    /**
     * Mimetype to send. If not specified, the content could be anything (including no payload, if the connectionType defined this)
     *  */
    payloadMimeType: string;
    /**
     * The technical base address for connecting to this endpoint
     *  */
    address: url;
    /**
     * Usage depends on the channel type
     *  */
    header: string;
};

type Endpoint__lookups = {
    "Endpoint": Endpoint_Endpoint_Props;
};

export declare function endpoint(props: Endpoint_Endpoint_Props);;

export declare function endpoint<T extends keyof Endpoint__lookups>(type: T, props: Endpoint__lookups[T]);;

type EnrollmentRequest_EnrollmentRequest_Props = {
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
     * Business Identifier
     *  */
    identifier: Identifier;
    /**
     * active | cancelled | draft | entered-in-error
     *  */
    status: string;
    /**
     * Creation date
     *  */
    created: string;
    /**
     * Target
     *  */
    insurer: Reference;
    /**
     * Responsible practitioner
     *  */
    provider: Reference;
    /**
     * The subject to be enrolled
     *  */
    candidate: Reference;
    /**
     * Insurance information
     *  */
    coverage: Reference;
};

type EnrollmentRequest__lookups = {
    "EnrollmentRequest": EnrollmentRequest_EnrollmentRequest_Props;
};

export declare function enrollmentRequest(props: EnrollmentRequest_EnrollmentRequest_Props);;

export declare function enrollmentRequest<T extends keyof EnrollmentRequest__lookups>(type: T, props: EnrollmentRequest__lookups[T]);;

type EnrollmentResponse_EnrollmentResponse_Props = {
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
     * Business Identifier
     *  */
    identifier: Identifier;
    /**
     * active | cancelled | draft | entered-in-error
     *  */
    status: string;
    /**
     * Claim reference
     *  */
    request: Reference;
    /**
     * queued | complete | error | partial
     *  */
    outcome: string;
    /**
     * Disposition Message
     *  */
    disposition: string;
    /**
     * Creation date
     *  */
    created: string;
    /**
     * Insurer
     *  */
    organization: Reference;
    /**
     * Responsible practitioner
     *  */
    requestProvider: Reference;
};

type EnrollmentResponse__lookups = {
    "EnrollmentResponse": EnrollmentResponse_EnrollmentResponse_Props;
};

export declare function enrollmentResponse(props: EnrollmentResponse_EnrollmentResponse_Props);;

export declare function enrollmentResponse<T extends keyof EnrollmentResponse__lookups>(type: T, props: EnrollmentResponse__lookups[T]);;

type EpisodeOfCare_EpisodeOfCare_Props = {
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
     * Business Identifier(s) relevant for this EpisodeOfCare
     *  */
    identifier: Identifier;
    /**
     * planned | waitlist | active | onhold | finished | cancelled | entered-in-error
     *  */
    status: string;
    /**
     * Past list of status codes (the current status may be included to cover the start date of the status)
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
         * planned | waitlist | active | onhold | finished | cancelled | entered-in-error
         *  */
        status: string;
        /**
         * Duration the EpisodeOfCare was in the specified status
         *  */
        period: Period;
    };
    /**
     * Type/class  - e.g. specialist referral, disease management
     *  */
    type: CodeableConcept;
    /**
     * The list of diagnosis relevant to this episode of care
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
         * Conditions/problems/diagnoses this episode of care is for
         *  */
        condition: Reference;
        /**
         * Role that this diagnosis has within the episode of care (e.g. admission, billing, discharge …)
         *  */
        role: CodeableConcept;
        /**
         * Ranking of the diagnosis (for each role type)
         *  */
        rank: number;
    };
    /**
     * The patient who is the focus of this episode of care
     *  */
    patient: Reference;
    /**
     * Organization that assumes care
     *  */
    managingOrganization: Reference;
    /**
     * Interval during responsibility is assumed
     *  */
    period: Period;
    /**
     * Originating Referral Request(s)
     *  */
    referralRequest: Reference;
    /**
     * Care manager/care coordinator for the patient
     *  */
    careManager: Reference;
    /**
     * Other practitioners facilitating this episode of care
     *  */
    team: Reference;
    /**
     * The set of accounts that may be used for billing for this EpisodeOfCare
     *  */
    account: Reference;
};

type EpisodeOfCare__lookups = {
    "EpisodeOfCare": EpisodeOfCare_EpisodeOfCare_Props;
};

export declare function episodeOfCare(props: EpisodeOfCare_EpisodeOfCare_Props);;

export declare function episodeOfCare<T extends keyof EpisodeOfCare__lookups>(type: T, props: EpisodeOfCare__lookups[T]);;

type EventDefinition_EventDefinition_Props = {
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
     * Canonical identifier for this event definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the event definition
     *  */
    identifier: Identifier;
    /**
     * Business version of the event definition
     *  */
    version: string;
    /**
     * Name for this event definition (computer friendly)
     *  */
    name: string;
    /**
     * Name for this event definition (human friendly)
     *  */
    title: string;
    /**
     * Subordinate title of the event definition
     *  */
    subtitle: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Type of individual the event definition is focused on
     *  */
    subject: CodeableConcept;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the event definition
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for event definition (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this event definition is defined
     *  */
    purpose: markdown;
    /**
     * Describes the clinical usage of the event definition
     *  */
    usage: string;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * When the event definition was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the event definition was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * When the event definition is expected to be used
     *  */
    effectivePeriod: Period;
    /**
     * E.g. Education, Treatment, Assessment, etc.
     *  */
    topic: CodeableConcept;
    /**
     * Who authored the content
     *  */
    author: ContactDetail;
    /**
     * Who edited the content
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the content
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the content
     *  */
    endorser: ContactDetail;
    /**
     * Additional documentation, citations, etc.
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * "when" the event occurs (multiple = 'or')
     *  */
    trigger: TriggerDefinition;
};

type EventDefinition__lookups = {
    "EventDefinition": EventDefinition_EventDefinition_Props;
};

export declare function eventDefinition(props: EventDefinition_EventDefinition_Props);;

export declare function eventDefinition<T extends keyof EventDefinition__lookups>(type: T, props: EventDefinition__lookups[T]);;

type Evidence_Evidence_Props = {
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
     * Canonical identifier for this evidence, represented as a globally unique URI
     *  */
    url: string;
    /**
     * Additional identifier for the summary
     *  */
    identifier: Identifier;
    /**
     * Business version of this summary
     *  */
    version: string;
    /**
     * Name for this summary (human friendly)
     *  */
    title: string;
    /**
     * Citation for this evidence
     *  */
    citeAs: Reference;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * When the summary was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the summary was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Who authored the content
     *  */
    author: ContactDetail;
    /**
     * Who edited the content
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the content
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the content
     *  */
    endorser: ContactDetail;
    /**
     * Link or citation to artifact associated with the summary
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * Description of the particular summary
     *  */
    description: markdown;
    /**
     * Declarative description of the Evidence
     *  */
    assertion: markdown;
    /**
     * Footnotes and/or explanatory notes
     *  */
    note: Annotation;
    /**
     * Evidence variable such as population, exposure, or outcome
     *  */
    variableDefinition: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A text description or summary of the variable
         *  */
        description: markdown;
        /**
         * Footnotes and/or explanatory notes
         *  */
        note: Annotation;
        /**
         * population | subpopulation | exposure | referenceExposure | measuredVariable | confounder
         *  */
        variableRole: CodeableConcept;
        /**
         * Definition of the actual variable related to the statistic(s)
         *  */
        observed: Reference;
        /**
         * Definition of the intended variable related to the Evidence
         *  */
        intended: Reference;
        /**
         * low | moderate | high | exact
         *  */
        directnessMatch: CodeableConcept;
    };
    /**
     * The method to combine studies
     *  */
    synthesisType: CodeableConcept;
    /**
     * The type of study that produced this evidence
     *  */
    studyType: CodeableConcept;
    /**
     * Values and parameters for a single statistic
     *  */
    statistic: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Description of content
         *  */
        description: string;
        /**
         * Footnotes and/or explanatory notes
         *  */
        note: Annotation;
        /**
         * Type of statistic, eg relative risk
         *  */
        statisticType: CodeableConcept;
        /**
         * Associated category for categorical variable
         *  */
        category: CodeableConcept;
        /**
         * Statistic value
         *  */
        quantity: Quantity;
        /**
         * The number of events associated with the statistic
         *  */
        numberOfEvents: number;
        /**
         * The number of participants affected
         *  */
        numberAffected: number;
        /**
         * Number of participants with known results for measured variables
         *  */
        sampleSize: number;
        /**
         * Lower and upper bound values of the attribute estimate
         *  */
        attributeEstimate: Range;
        /**
         * Range of values for grouping of ordinal or polychotomous variables
         *  */
        modelCharacteristic: Range;
    };
    /**
     * Certainty or quality of the evidence
     *  */
    certainty: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Textual description of certainty
         *  */
        description: string;
        /**
         * Footnotes and/or explanatory notes
         *  */
        note: Annotation;
        /**
         * Aspect of certainty being rated
         *  */
        type: CodeableConcept;
        /**
         * Assessment or judgement of the aspect
         *  */
        rating: CodeableConcept;
        /**
         * Individual or group who did the rating
         *  */
        rater: string;
    };
};

type Evidence__lookups = {
    "Evidence": Evidence_Evidence_Props;
};

export declare function evidence(props: Evidence_Evidence_Props);;

export declare function evidence<T extends keyof Evidence__lookups>(type: T, props: Evidence__lookups[T]);;

type EvidenceReport_EvidenceReport_Props = {
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
     * Canonical identifier for this EvidenceReport, represented as a globally unique URI
     *  */
    url: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Unique identifier for the evidence report
     *  */
    identifier: Identifier;
    /**
     * Identifiers for articles that may relate to more than one evidence report
     *  */
    relatedIdentifier: Identifier;
    /**
     * Citation for this report
     *  */
    citeAs: Reference;
    /**
     * Kind of report
     *  */
    type: CodeableConcept;
    /**
     * Used for footnotes and annotations
     *  */
    note: Annotation;
    /**
     * Link, description or reference to artifact associated with the report
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * Focus of the report
     *  */
    subject: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Timeframe for the characteristic
         *  */
        characteristic: Period;
        /**
         * Footnotes and/or explanatory notes
         *  */
        note: Annotation;
    };
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Who authored the content
     *  */
    author: ContactDetail;
    /**
     * Who edited the content
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the content
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the content
     *  */
    endorser: ContactDetail;
    /**
     * Relationships to other compositions/documents
     *  */
    relatesTo: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * replaces | amends | appends | transforms | replacedWith | amendedWith | appendedWith | transformedWith
         *  */
        code: string;
        /**
         * Target of the relationship
         *  */
        target: Identifier;
    };
    /**
     * Composition is broken into sections
     *  */
    section: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Label for section (e.g. for ToC)
         *  */
        title: string;
        /**
         * Classification of section (recommended)
         *  */
        focus: CodeableConcept;
        /**
         * Classification of section by Resource
         *  */
        focusReference: Reference;
        /**
         * Who and/or what authored the section
         *  */
        author: Reference;
        /**
         * Text summary of the section, for human interpretation
         *  */
        text: Narrative;
        /**
         * working | snapshot | changes
         *  */
        mode: string;
        /**
         * Order of section entries
         *  */
        orderedBy: CodeableConcept;
        /**
         * Extensible classifiers as content
         *  */
        entryClassifier: CodeableConcept;
        /**
         * Reference to resources as content
         *  */
        entryReference: Reference;
        /**
         * Quantity as content
         *  */
        entryQuantity: Quantity;
        /**
         * Why the section is empty
         *  */
        emptyReason: CodeableConcept;
    };
};

type EvidenceReport__lookups = {
    "EvidenceReport": EvidenceReport_EvidenceReport_Props;
};

export declare function evidenceReport(props: EvidenceReport_EvidenceReport_Props);;

export declare function evidenceReport<T extends keyof EvidenceReport__lookups>(type: T, props: EvidenceReport__lookups[T]);;

type EvidenceVariable_EvidenceVariable_Props = {
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
     * Canonical identifier for this evidence variable, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the evidence variable
     *  */
    identifier: Identifier;
    /**
     * Business version of the evidence variable
     *  */
    version: string;
    /**
     * Name for this evidence variable (computer friendly)
     *  */
    name: string;
    /**
     * Name for this evidence variable (human friendly)
     *  */
    title: string;
    /**
     * Title for use in informal contexts
     *  */
    shortTitle: string;
    /**
     * Subordinate title of the EvidenceVariable
     *  */
    subtitle: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Natural language description of the evidence variable
     *  */
    description: markdown;
    /**
     * Used for footnotes or explanatory notes
     *  */
    note: Annotation;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Who authored the content
     *  */
    author: ContactDetail;
    /**
     * Who edited the content
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the content
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the content
     *  */
    endorser: ContactDetail;
    /**
     * Additional documentation, citations, etc.
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * Actual or conceptual
     *  */
    actual: boolean;
    /**
     * intersection | union
     *  */
    characteristicCombination: string;
    /**
     * What defines the members of the evidence element
     *  */
    characteristic: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Natural language description of the characteristic
         *  */
        description: string;
        /**
         * What code or expression defines members?
         *  */
        definition: Reference;
        /**
         * Method used for describing characteristic
         *  */
        method: CodeableConcept;
        /**
         * Device used for determining characteristic
         *  */
        device: Reference;
        /**
         * Whether the characteristic includes or excludes members
         *  */
        exclude: boolean;
        /**
         * Used for footnotes or explanatory notes
         *  */
        timeFromStart: Annotation;
        /**
         * mean | median | mean-of-mean | mean-of-median | median-of-mean | median-of-median
         *  */
        groupMeasure: string;
    };
    /**
     * continuous | dichotomous | ordinal | polychotomous
     *  */
    handling: string;
    /**
     * A grouping for ordinal or polychotomous variables
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Description of the grouping
         *  */
        name: string;
        /**
         * Definition of the grouping
         *  */
        value: CodeableConcept;
    };
};

type EvidenceVariable__lookups = {
    "EvidenceVariable": EvidenceVariable_EvidenceVariable_Props;
};

export declare function evidenceVariable(props: EvidenceVariable_EvidenceVariable_Props);;

export declare function evidenceVariable<T extends keyof EvidenceVariable__lookups>(type: T, props: EvidenceVariable__lookups[T]);;

type ExampleScenario_ExampleScenario_Props = {
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
     * Canonical identifier for this example scenario, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the example scenario
     *  */
    identifier: Identifier;
    /**
     * Business version of the example scenario
     *  */
    version: string;
    /**
     * Name for this example scenario (computer friendly)
     *  */
    name: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for example scenario (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * The purpose of the example, e.g. to illustrate a scenario
     *  */
    purpose: markdown;
    /**
     * Actor participating in the resource
     *  */
    actor: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * ID or acronym of the actor
         *  */
        actorId: string;
        /**
         * person | entity
         *  */
        type: string;
        /**
         * The name of the actor as shown in the page
         *  */
        name: string;
        /**
         * The description of the actor
         *  */
        description: markdown;
    };
    /**
     * Each resource and each version that is present in the workflow
     *  */
    instance: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The id of the resource for referencing
         *  */
        resourceId: string;
        /**
         * The type of the resource
         *  */
        resourceType: string;
        /**
         * A short name for the resource instance
         *  */
        name: string;
        /**
         * Human-friendly description of the resource instance
         *  */
        description: markdown;
        /**
         * The description of the resource version
         *  */
        version: markdown;
        /**
         * A specific version of a resource contained in the instance
         *  */
        containedInstance: string;
    };
    /**
     * Each major process - a group of operations
     *  */
    process: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The diagram title of the group of operations
         *  */
        title: string;
        /**
         * A longer description of the group of operations
         *  */
        description: markdown;
        /**
         * Description of initial status before the process starts
         *  */
        preConditions: markdown;
        /**
         * Description of final status after the process ends
         *  */
        postConditions: markdown;
        /**
         * A human-readable description of each option
         *  */
        step: markdown;
    };
    /**
     * Another nested workflow
     *  */
    workflow: any;
};

type ExampleScenario__lookups = {
    "ExampleScenario": ExampleScenario_ExampleScenario_Props;
};

export declare function exampleScenario(props: ExampleScenario_ExampleScenario_Props);;

export declare function exampleScenario<T extends keyof ExampleScenario__lookups>(type: T, props: ExampleScenario__lookups[T]);;

type ExplanationOfBenefit_ExplanationOfBenefit_Props = {
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
     * Business Identifier for the resource
     *  */
    identifier: Identifier;
    /**
     * active | cancelled | draft | entered-in-error
     *  */
    status: string;
    /**
     * Category or discipline
     *  */
    type: CodeableConcept;
    /**
     * More granular claim type
     *  */
    subType: CodeableConcept;
    /**
     * claim | preauthorization | predetermination
     *  */
    use: string;
    /**
     * The recipient of the products and services
     *  */
    patient: Reference;
    /**
     * Relevant time frame for the claim
     *  */
    billablePeriod: Period;
    /**
     * Response creation date
     *  */
    created: string;
    /**
     * Author of the claim
     *  */
    enterer: Reference;
    /**
     * Party responsible for reimbursement
     *  */
    insurer: Reference;
    /**
     * Party responsible for the claim
     *  */
    provider: Reference;
    /**
     * Desired processing urgency
     *  */
    priority: CodeableConcept;
    /**
     * For whom to reserve funds
     *  */
    fundsReserveRequested: CodeableConcept;
    /**
     * Funds reserved status
     *  */
    fundsReserve: CodeableConcept;
    /**
     * Prior or corollary claims
     *  */
    related: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Reference to the related claim
         *  */
        claim: Reference;
        /**
         * How the reference claim is related
         *  */
        relationship: CodeableConcept;
        /**
         * File or case reference
         *  */
        reference: Identifier;
    };
    /**
     * Prescription authorizing services or products
     *  */
    prescription: Reference;
    /**
     * Original prescription if superceded by fulfiller
     *  */
    originalPrescription: Reference;
    /**
     * Recipient of benefits payable
     *  */
    payee: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Category of recipient
         *  */
        type: CodeableConcept;
        /**
         * Recipient reference
         *  */
        party: Reference;
    };
    /**
     * Treatment Referral
     *  */
    referral: Reference;
    /**
     * Servicing Facility
     *  */
    facility: Reference;
    /**
     * Claim reference
     *  */
    claim: Reference;
    /**
     * Claim response reference
     *  */
    claimResponse: Reference;
    /**
     * queued | complete | error | partial
     *  */
    outcome: string;
    /**
     * Disposition Message
     *  */
    disposition: string;
    /**
     * Preauthorization reference
     *  */
    preAuthRef: string;
    /**
     * Preauthorization in-effect period
     *  */
    preAuthRefPeriod: Period;
    /**
     * Care Team members
     *  */
    careTeam: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Order of care team
         *  */
        sequence: number;
        /**
         * Practitioner or organization
         *  */
        provider: Reference;
        /**
         * Indicator of the lead practitioner
         *  */
        responsible: boolean;
        /**
         * Function within the team
         *  */
        role: CodeableConcept;
        /**
         * Practitioner credential or specialization
         *  */
        qualification: CodeableConcept;
    };
    /**
     * Supporting information
     *  */
    supportingInfo: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Information instance identifier
         *  */
        sequence: number;
        /**
         * Classification of the supplied information
         *  */
        category: CodeableConcept;
        /**
         * Type of information
         *  */
        code: CodeableConcept;
        /**
         * When it occurred
         *  */
        timing: string;
        /**
         * Data to be provided
         *  */
        value: boolean;
        /**
         * Explanation for the information
         *  */
        reason: Coding;
    };
    /**
     * Pertinent diagnosis information
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
         * Diagnosis instance identifier
         *  */
        sequence: number;
        /**
         * Nature of illness or problem
         *  */
        diagnosis: CodeableConcept;
        /**
         * Timing or nature of the diagnosis
         *  */
        type: CodeableConcept;
        /**
         * Present on admission
         *  */
        onAdmission: CodeableConcept;
        /**
         * Package billing code
         *  */
        packageCode: CodeableConcept;
    };
    /**
     * Clinical procedures performed
     *  */
    procedure: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Procedure instance identifier
         *  */
        sequence: number;
        /**
         * Category of Procedure
         *  */
        type: CodeableConcept;
        /**
         * When the procedure was performed
         *  */
        date: string;
        /**
         * Specific clinical procedure
         *  */
        procedure: CodeableConcept;
        /**
         * Unique device identifier
         *  */
        udi: Reference;
    };
    /**
     * Precedence (primary, secondary, etc.)
     *  */
    precedence: number;
    /**
     * Patient insurance information
     *  */
    insurance: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Coverage to be used for adjudication
         *  */
        focal: boolean;
        /**
         * Insurance information
         *  */
        coverage: Reference;
        /**
         * Prior authorization reference number
         *  */
        preAuthRef: string;
    };
    /**
     * Details of the event
     *  */
    accident: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * When the incident occurred
         *  */
        date: string;
        /**
         * The nature of the accident
         *  */
        type: CodeableConcept;
        /**
         * Where the event occurred
         *  */
        location: Address;
    };
    /**
     * Product or service provided
     *  */
    item: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Item instance identifier
         *  */
        sequence: number;
        /**
         * Applicable care team members
         *  */
        careTeamSequence: number;
        /**
         * Applicable diagnoses
         *  */
        diagnosisSequence: number;
        /**
         * Applicable procedures
         *  */
        procedureSequence: number;
        /**
         * Applicable exception and supporting information
         *  */
        informationSequence: number;
        /**
         * Revenue or cost center code
         *  */
        revenue: CodeableConcept;
        /**
         * Benefit classification
         *  */
        category: CodeableConcept;
        /**
         * Billing, service, product, or drug code
         *  */
        productOrService: CodeableConcept;
        /**
         * Product or service billing modifiers
         *  */
        modifier: CodeableConcept;
        /**
         * Program the product or service is provided under
         *  */
        programCode: CodeableConcept;
        /**
         * Date or dates of service or product delivery
         *  */
        serviced: string;
        /**
         * Place of service or where product was supplied
         *  */
        location: CodeableConcept;
        /**
         * Count of products or services
         *  */
        quantity: Quantity;
        /**
         * Fee, charge or cost per item
         *  */
        unitPrice: Money;
        /**
         * Price scaling factor
         *  */
        factor: number;
        /**
         * Total item cost
         *  */
        net: Money;
        /**
         * Unique device identifier
         *  */
        udi: Reference;
        /**
         * Anatomical location
         *  */
        bodySite: CodeableConcept;
        /**
         * Anatomical sub-location
         *  */
        subSite: CodeableConcept;
        /**
         * Encounters related to this billed item
         *  */
        encounter: Reference;
        /**
         * Applicable note numbers
         *  */
        noteNumber: number;
        /**
         * Non-monitary value
         *  */
        adjudication: number;
        /**
         * Applicable note numbers
         *  */
        detail: number;
    };
    /**
     * Insurer added line items
     *  */
    addItem: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Item sequence number
         *  */
        itemSequence: number;
        /**
         * Detail sequence number
         *  */
        detailSequence: number;
        /**
         * Subdetail sequence number
         *  */
        subDetailSequence: number;
        /**
         * Authorized providers
         *  */
        provider: Reference;
        /**
         * Billing, service, product, or drug code
         *  */
        productOrService: CodeableConcept;
        /**
         * Service/Product billing modifiers
         *  */
        modifier: CodeableConcept;
        /**
         * Program the product or service is provided under
         *  */
        programCode: CodeableConcept;
        /**
         * Date or dates of service or product delivery
         *  */
        serviced: string;
        /**
         * Place of service or where product was supplied
         *  */
        location: CodeableConcept;
        /**
         * Count of products or services
         *  */
        quantity: Quantity;
        /**
         * Fee, charge or cost per item
         *  */
        unitPrice: Money;
        /**
         * Price scaling factor
         *  */
        factor: number;
        /**
         * Total item cost
         *  */
        net: Money;
        /**
         * Anatomical location
         *  */
        bodySite: CodeableConcept;
        /**
         * Anatomical sub-location
         *  */
        subSite: CodeableConcept;
        /**
         * Applicable note numbers
         *  */
        noteNumber: number;
        /**
         * Applicable note numbers
         *  */
        detail: number;
    };
    /**
     * Header-level adjudication
     *  */
    adjudication: any;
    /**
     * Adjudication totals
     *  */
    total: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of adjudication information
         *  */
        category: CodeableConcept;
        /**
         * Financial total for the category
         *  */
        amount: Money;
    };
    /**
     * Payment Details
     *  */
    payment: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Partial or complete payment
         *  */
        type: CodeableConcept;
        /**
         * Payment adjustment for non-claim issues
         *  */
        adjustment: Money;
        /**
         * Explanation for the variance
         *  */
        adjustmentReason: CodeableConcept;
        /**
         * Expected date of payment
         *  */
        date: string;
        /**
         * Payable amount after adjustment
         *  */
        amount: Money;
        /**
         * Business identifier for the payment
         *  */
        identifier: Identifier;
    };
    /**
     * Printed form identifier
     *  */
    formCode: CodeableConcept;
    /**
     * Printed reference or actual form
     *  */
    form: Attachment;
    /**
     * Note concerning adjudication
     *  */
    processNote: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Note instance identifier
         *  */
        number: number;
        /**
         * display | print | printoper
         *  */
        type: string;
        /**
         * Note explanatory text
         *  */
        text: string;
        /**
         * Language of the text
         *  */
        language: CodeableConcept;
    };
    /**
     * When the benefits are applicable
     *  */
    benefitPeriod: Period;
    /**
     * Balance by Benefit Category
     *  */
    benefitBalance: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Benefit classification
         *  */
        category: CodeableConcept;
        /**
         * Excluded from the plan
         *  */
        excluded: boolean;
        /**
         * Short name for the benefit
         *  */
        name: string;
        /**
         * Description of the benefit or services covered
         *  */
        description: string;
        /**
         * In or out of network
         *  */
        network: CodeableConcept;
        /**
         * Individual or family
         *  */
        unit: CodeableConcept;
        /**
         * Annual or lifetime
         *  */
        term: CodeableConcept;
        /**
         * Benefits used
         *  */
        financial: number;
    };
};

type ExplanationOfBenefit__lookups = {
    "ExplanationOfBenefit": ExplanationOfBenefit_ExplanationOfBenefit_Props;
};

export declare function explanationOfBenefit(props: ExplanationOfBenefit_ExplanationOfBenefit_Props);;

export declare function explanationOfBenefit<T extends keyof ExplanationOfBenefit__lookups>(type: T, props: ExplanationOfBenefit__lookups[T]);;

type FamilyMemberHistory_FamilyMemberHistory_Props = {
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
     * External Id(s) for this record
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: any;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * partial | completed | entered-in-error | health-unknown
     *  */
    status: string;
    /**
     * subject-unknown | withheld | unable-to-obtain | deferred
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * Patient history is about
     *  */
    patient: Reference;
    /**
     * When history was recorded or last updated
     *  */
    date: string;
    /**
     * The family member described
     *  */
    name: string;
    /**
     * Relationship to the subject
     *  */
    relationship: CodeableConcept;
    /**
     * male | female | other | unknown
     *  */
    sex: CodeableConcept;
    /**
     * (approximate) date of birth
     *  */
    born: Period;
    /**
     * (approximate) age
     *  */
    age: Age;
    /**
     * Age is estimated?
     *  */
    estimatedAge: boolean;
    /**
     * Dead? How old/when?
     *  */
    deceased: boolean;
    /**
     * Why was family member history performed?
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why was family member history performed?
     *  */
    reasonReference: Reference;
    /**
     * General note about related person
     *  */
    note: Annotation;
    /**
     * Condition that the related person had
     *  */
    condition: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Condition suffered by relation
         *  */
        code: CodeableConcept;
        /**
         * deceased | permanent disability | etc.
         *  */
        outcome: CodeableConcept;
        /**
         * Whether the condition contributed to the cause of death
         *  */
        contributedToDeath: boolean;
        /**
         * When condition first manifested
         *  */
        onset: Age;
        /**
         * Extra information about condition
         *  */
        note: Annotation;
    };
};

type FamilyMemberHistory__lookups = {
    "FamilyMemberHistory": FamilyMemberHistory_FamilyMemberHistory_Props;
};

export declare function familyMemberHistory(props: FamilyMemberHistory_FamilyMemberHistory_Props);;

export declare function familyMemberHistory<T extends keyof FamilyMemberHistory__lookups>(type: T, props: FamilyMemberHistory__lookups[T]);;

type Flag_Flag_Props = {
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
     * Business identifier
     *  */
    identifier: Identifier;
    /**
     * active | inactive | entered-in-error
     *  */
    status: string;
    /**
     * Clinical, administrative, etc.
     *  */
    category: CodeableConcept;
    /**
     * Coded or textual message to display to user
     *  */
    code: CodeableConcept;
    /**
     * Who/What is flag about?
     *  */
    subject: Reference;
    /**
     * Time period when flag is active
     *  */
    period: Period;
    /**
     * Alert relevant during encounter
     *  */
    encounter: Reference;
    /**
     * Flag creator
     *  */
    author: Reference;
};

type Flag__lookups = {
    "Flag": Flag_Flag_Props;
};

export declare function flag(props: Flag_Flag_Props);;

export declare function flag<T extends keyof Flag__lookups>(type: T, props: Flag__lookups[T]);;

type Goal_Goal_Props = {
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
     * External Ids for this goal
     *  */
    identifier: Identifier;
    /**
     * proposed | planned | accepted | active | on-hold | completed | cancelled | entered-in-error | rejected
     *  */
    lifecycleStatus: string;
    /**
     * in-progress | improving | worsening | no-change | achieved | sustaining | not-achieved | no-progress | not-attainable
     *  */
    achievementStatus: CodeableConcept;
    /**
     * E.g. Treatment, dietary, behavioral, etc.
     *  */
    category: CodeableConcept;
    /**
     * high-priority | medium-priority | low-priority
     *  */
    priority: CodeableConcept;
    /**
     * Code or text describing goal
     *  */
    description: CodeableConcept;
    /**
     * Who this goal is intended for
     *  */
    subject: Reference;
    /**
     * When goal pursuit begins
     *  */
    start: string;
    /**
     * Target outcome for the goal
     *  */
    target: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The parameter whose value is being tracked
         *  */
        measure: CodeableConcept;
        /**
         * The target value to be achieved
         *  */
        detail: Quantity;
        /**
         * Reach goal on or before
         *  */
        due: string;
    };
    /**
     * When goal status took effect
     *  */
    statusDate: string;
    /**
     * Reason for current status
     *  */
    statusReason: string;
    /**
     * Who's responsible for creating Goal?
     *  */
    expressedBy: Reference;
    /**
     * Issues addressed by this goal
     *  */
    addresses: Reference;
    /**
     * Comments about the goal
     *  */
    note: Annotation;
    /**
     * What result was achieved regarding the goal?
     *  */
    outcomeCode: CodeableConcept;
    /**
     * Observation that resulted from goal
     *  */
    outcomeReference: Reference;
};

type Goal__lookups = {
    "Goal": Goal_Goal_Props;
};

export declare function goal(props: Goal_Goal_Props);;

export declare function goal<T extends keyof Goal__lookups>(type: T, props: Goal__lookups[T]);;

type GraphDefinition_GraphDefinition_Props = {
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
     * Canonical identifier for this graph definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Business version of the graph definition
     *  */
    version: string;
    /**
     * Name for this graph definition (computer friendly)
     *  */
    name: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the graph definition
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for graph definition (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this graph definition is defined
     *  */
    purpose: markdown;
    /**
     * Type of resource at which the graph starts
     *  */
    start: string;
    /**
     * Profile on base resource
     *  */
    profile: any;
    /**
     * Links this graph makes rules about
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
         * Path in the resource that contains the link
         *  */
        path: string;
        /**
         * Which slice (if profiled)
         *  */
        sliceName: string;
        /**
         * Minimum occurrences for this link
         *  */
        min: number;
        /**
         * Maximum occurrences for this link
         *  */
        max: string;
        /**
         * Why this link is specified
         *  */
        description: string;
        /**
         * Documentation for FHIRPath expression
         *  */
        target: string;
    };
};

type GraphDefinition__lookups = {
    "GraphDefinition": GraphDefinition_GraphDefinition_Props;
};

export declare function graphDefinition(props: GraphDefinition_GraphDefinition_Props);;

export declare function graphDefinition<T extends keyof GraphDefinition__lookups>(type: T, props: GraphDefinition__lookups[T]);;

type Group_Group_Props = {
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
     * Unique id
     *  */
    identifier: Identifier;
    /**
     * Whether this group's record is in active use
     *  */
    active: boolean;
    /**
     * person | animal | practitioner | device | medication | substance
     *  */
    type: string;
    /**
     * Descriptive or actual
     *  */
    actual: boolean;
    /**
     * Kind of Group members
     *  */
    code: CodeableConcept;
    /**
     * Label for Group
     *  */
    name: string;
    /**
     * Number of members
     *  */
    quantity: number;
    /**
     * Entity that is the custodian of the Group's definition
     *  */
    managingEntity: Reference;
    /**
     * Include / Exclude group members by Trait
     *  */
    characteristic: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Kind of characteristic
         *  */
        code: CodeableConcept;
        /**
         * Value held by characteristic
         *  */
        value: CodeableConcept;
        /**
         * Group includes or excludes
         *  */
        exclude: boolean;
        /**
         * Period over which characteristic is tested
         *  */
        period: Period;
    };
    /**
     * Who or what is in group
     *  */
    member: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Reference to the group member
         *  */
        entity: Reference;
        /**
         * Period member belonged to the group
         *  */
        period: Period;
        /**
         * If member is no longer in group
         *  */
        inactive: boolean;
    };
};

type Group__lookups = {
    "Group": Group_Group_Props;
};

export declare function group(props: Group_Group_Props);;

export declare function group<T extends keyof Group__lookups>(type: T, props: Group__lookups[T]);;

type GuidanceResponse_GuidanceResponse_Props = {
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
     * The identifier of the request associated with this response, if any
     *  */
    requestIdentifier: Identifier;
    /**
     * Business identifier
     *  */
    identifier: Identifier;
    /**
     * What guidance was requested
     *  */
    module: string;
    /**
     * success | data-requested | data-required | in-progress | failure | entered-in-error
     *  */
    status: string;
    /**
     * Patient the request was performed for
     *  */
    subject: Reference;
    /**
     * Encounter during which the response was returned
     *  */
    encounter: Reference;
    /**
     * When the guidance response was processed
     *  */
    occurrenceDateTime: string;
    /**
     * Device returning the guidance
     *  */
    performer: Reference;
    /**
     * Why guidance is needed
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why guidance is needed
     *  */
    reasonReference: Reference;
    /**
     * Additional notes about the response
     *  */
    note: Annotation;
    /**
     * Messages resulting from the evaluation of the artifact or artifacts
     *  */
    evaluationMessage: Reference;
    /**
     * The output parameters of the evaluation, if any
     *  */
    outputParameters: Reference;
    /**
     * Proposed actions, if any
     *  */
    result: Reference;
    /**
     * Additional required data
     *  */
    dataRequirement: DataRequirement;
};

type GuidanceResponse__lookups = {
    "GuidanceResponse": GuidanceResponse_GuidanceResponse_Props;
};

export declare function guidanceResponse(props: GuidanceResponse_GuidanceResponse_Props);;

export declare function guidanceResponse<T extends keyof GuidanceResponse__lookups>(type: T, props: GuidanceResponse__lookups[T]);;

type HealthcareService_HealthcareService_Props = {
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
     * External identifiers for this item
     *  */
    identifier: Identifier;
    /**
     * Whether this HealthcareService record is in active use
     *  */
    active: boolean;
    /**
     * Organization that provides this service
     *  */
    providedBy: Reference;
    /**
     * Broad category of service being performed or delivered
     *  */
    category: CodeableConcept;
    /**
     * Type of service that may be delivered or performed
     *  */
    type: CodeableConcept;
    /**
     * Specialties handled by the HealthcareService
     *  */
    specialty: CodeableConcept;
    /**
     * Location(s) where service may be provided
     *  */
    location: Reference;
    /**
     * Description of service as presented to a consumer while searching
     *  */
    name: string;
    /**
     * Additional description and/or any specific issues not covered elsewhere
     *  */
    comment: string;
    /**
     * Extra details about the service that can't be placed in the other fields
     *  */
    extraDetails: markdown;
    /**
     * Facilitates quick identification of the service
     *  */
    photo: Attachment;
    /**
     * Contacts related to the healthcare service
     *  */
    telecom: ContactPoint;
    /**
     * Location(s) service is intended for/available to
     *  */
    coverageArea: Reference;
    /**
     * Conditions under which service is available/offered
     *  */
    serviceProvisionCode: CodeableConcept;
    /**
     * Specific eligibility requirements required to use the service
     *  */
    eligibility: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Coded value for the eligibility
         *  */
        code: CodeableConcept;
        /**
         * Describes the eligibility conditions for the service
         *  */
        comment: markdown;
    };
    /**
     * Programs that this service is applicable to
     *  */
    program: CodeableConcept;
    /**
     * Collection of characteristics (attributes)
     *  */
    characteristic: CodeableConcept;
    /**
     * The language that this service is offered in
     *  */
    communication: CodeableConcept;
    /**
     * Ways that the service accepts referrals
     *  */
    referralMethod: CodeableConcept;
    /**
     * If an appointment is required for access to this service
     *  */
    appointmentRequired: boolean;
    /**
     * Times the Service Site is available
     *  */
    availableTime: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * mon | tue | wed | thu | fri | sat | sun
         *  */
        daysOfWeek: string;
        /**
         * Always available? e.g. 24 hour service
         *  */
        allDay: boolean;
        /**
         * Opening time of day (ignored if allDay = true)
         *  */
        availableStartTime: time;
        /**
         * Closing time of day (ignored if allDay = true)
         *  */
        availableEndTime: time;
    };
    /**
     * Not available during this time due to provided reason
     *  */
    notAvailable: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Reason presented to the user explaining why time not available
         *  */
        description: string;
        /**
         * Service not available from this date
         *  */
        during: Period;
    };
    /**
     * Description of availability exceptions
     *  */
    availabilityExceptions: string;
    /**
     * Technical endpoints providing access to electronic services operated for the healthcare service
     *  */
    endpoint: Reference;
};

type HealthcareService__lookups = {
    "HealthcareService": HealthcareService_HealthcareService_Props;
};

export declare function healthcareService(props: HealthcareService_HealthcareService_Props);;

export declare function healthcareService<T extends keyof HealthcareService__lookups>(type: T, props: HealthcareService__lookups[T]);;

type ImagingStudy_ImagingStudy_Props = {
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
     * Identifiers for the whole study
     *  */
    identifier: Identifier;
    /**
     * registered | available | cancelled | entered-in-error | unknown
     *  */
    status: string;
    /**
     * All series modality if actual acquisition modalities
     *  */
    modality: Coding;
    /**
     * Who or what is the subject of the study
     *  */
    subject: Reference;
    /**
     * Encounter with which this imaging study is associated
     *  */
    encounter: Reference;
    /**
     * When the study was started
     *  */
    started: string;
    /**
     * Request fulfilled
     *  */
    basedOn: Reference;
    /**
     * Referring physician
     *  */
    referrer: Reference;
    /**
     * Who interpreted images
     *  */
    interpreter: Reference;
    /**
     * Study access endpoint
     *  */
    endpoint: Reference;
    /**
     * Number of Study Related Series
     *  */
    numberOfSeries: number;
    /**
     * Number of Study Related Instances
     *  */
    numberOfInstances: number;
    /**
     * The performed Procedure reference
     *  */
    procedureReference: Reference;
    /**
     * The performed procedure code
     *  */
    procedureCode: CodeableConcept;
    /**
     * Where ImagingStudy occurred
     *  */
    location: Reference;
    /**
     * Why the study was requested
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why was study performed
     *  */
    reasonReference: Reference;
    /**
     * User-defined comments
     *  */
    note: Annotation;
    /**
     * Institution-generated description
     *  */
    description: string;
    /**
     * Each study has one or more series of instances
     *  */
    series: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * DICOM Series Instance UID for the series
         *  */
        uid: string;
        /**
         * Numeric identifier of this series
         *  */
        number: number;
        /**
         * The modality of the instances in the series
         *  */
        modality: Coding;
        /**
         * A short human readable summary of the series
         *  */
        description: string;
        /**
         * Number of Series Related Instances
         *  */
        numberOfInstances: number;
        /**
         * Series access endpoint
         *  */
        endpoint: Reference;
        /**
         * Body part examined
         *  */
        bodySite: Coding;
        /**
         * Body part laterality
         *  */
        laterality: Coding;
        /**
         * Specimen imaged
         *  */
        specimen: Reference;
        /**
         * When the series started
         *  */
        started: string;
        /**
         * Who performed the series
         *  */
        performer: Reference;
        /**
         * Description of instance
         *  */
        instance: string;
    };
};

type ImagingStudy__lookups = {
    "ImagingStudy": ImagingStudy_ImagingStudy_Props;
};

export declare function imagingStudy(props: ImagingStudy_ImagingStudy_Props);;

export declare function imagingStudy<T extends keyof ImagingStudy__lookups>(type: T, props: ImagingStudy__lookups[T]);;

type Immunization_Immunization_Props = {
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
     * Business identifier
     *  */
    identifier: Identifier;
    /**
     * completed | entered-in-error | not-done
     *  */
    status: string;
    /**
     * Reason not done
     *  */
    statusReason: CodeableConcept;
    /**
     * Vaccine product administered
     *  */
    vaccineCode: CodeableConcept;
    /**
     * Who was immunized
     *  */
    patient: Reference;
    /**
     * Encounter immunization was part of
     *  */
    encounter: Reference;
    /**
     * Vaccine administration date
     *  */
    occurrence: string;
    /**
     * When the immunization was first captured in the subject's record
     *  */
    recorded: string;
    /**
     * Indicates context the data was recorded in
     *  */
    primarySource: boolean;
    /**
     * Indicates the source of a secondarily reported record
     *  */
    reportOrigin: CodeableConcept;
    /**
     * Where immunization occurred
     *  */
    location: Reference;
    /**
     * Vaccine manufacturer
     *  */
    manufacturer: Reference;
    /**
     * Vaccine lot number
     *  */
    lotNumber: string;
    /**
     * Vaccine expiration date
     *  */
    expirationDate: string;
    /**
     * Body site vaccine  was administered
     *  */
    site: CodeableConcept;
    /**
     * How vaccine entered body
     *  */
    route: CodeableConcept;
    /**
     * Amount of vaccine administered
     *  */
    doseQuantity: Quantity;
    /**
     * Who performed event
     *  */
    performer: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * What type of performance was done
         *  */
        function: CodeableConcept;
        /**
         * Individual or organization who was performing
         *  */
        actor: Reference;
    };
    /**
     * Additional immunization notes
     *  */
    note: Annotation;
    /**
     * Why immunization occurred
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why immunization occurred
     *  */
    reasonReference: Reference;
    /**
     * Dose potency
     *  */
    isSubpotent: boolean;
    /**
     * Reason for being subpotent
     *  */
    subpotentReason: CodeableConcept;
    /**
     * Educational material presented to patient
     *  */
    education: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Educational material document identifier
         *  */
        documentType: string;
        /**
         * Educational material reference pointer
         *  */
        reference: string;
        /**
         * Educational material publication date
         *  */
        publicationDate: string;
        /**
         * Educational material presentation date
         *  */
        presentationDate: string;
    };
    /**
     * Patient eligibility for a vaccination program
     *  */
    programEligibility: CodeableConcept;
    /**
     * Funding source for the vaccine
     *  */
    fundingSource: CodeableConcept;
    /**
     * Details of a reaction that follows immunization
     *  */
    reaction: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * When reaction started
         *  */
        date: string;
        /**
         * Additional information on reaction
         *  */
        detail: Reference;
        /**
         * Indicates self-reported reaction
         *  */
        reported: boolean;
    };
    /**
     * Protocol followed by the provider
     *  */
    protocolApplied: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Name of vaccine series
         *  */
        series: string;
        /**
         * Who is responsible for publishing the recommendations
         *  */
        authority: Reference;
        /**
         * Vaccine preventatable disease being targetted
         *  */
        targetDisease: CodeableConcept;
        /**
         * Dose number within series
         *  */
        doseNumber: number;
        /**
         * Recommended number of doses for immunity
         *  */
        seriesDoses: number;
    };
};

type Immunization__lookups = {
    "Immunization": Immunization_Immunization_Props;
};

export declare function immunization(props: Immunization_Immunization_Props);;

export declare function immunization<T extends keyof Immunization__lookups>(type: T, props: Immunization__lookups[T]);;

type ImmunizationEvaluation_ImmunizationEvaluation_Props = {
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
     * Business identifier
     *  */
    identifier: Identifier;
    /**
     * completed | entered-in-error
     *  */
    status: string;
    /**
     * Who this evaluation is for
     *  */
    patient: Reference;
    /**
     * Date evaluation was performed
     *  */
    date: string;
    /**
     * Who is responsible for publishing the recommendations
     *  */
    authority: Reference;
    /**
     * Evaluation target disease
     *  */
    targetDisease: CodeableConcept;
    /**
     * Immunization being evaluated
     *  */
    immunizationEvent: Reference;
    /**
     * Status of the dose relative to published recommendations
     *  */
    doseStatus: CodeableConcept;
    /**
     * Reason for the dose status
     *  */
    doseStatusReason: CodeableConcept;
    /**
     * Evaluation notes
     *  */
    description: string;
    /**
     * Name of vaccine series
     *  */
    series: string;
    /**
     * Dose number within series
     *  */
    doseNumber: number;
    /**
     * Recommended number of doses for immunity
     *  */
    seriesDoses: number;
};

type ImmunizationEvaluation__lookups = {
    "ImmunizationEvaluation": ImmunizationEvaluation_ImmunizationEvaluation_Props;
};

export declare function immunizationEvaluation(props: ImmunizationEvaluation_ImmunizationEvaluation_Props);;

export declare function immunizationEvaluation<T extends keyof ImmunizationEvaluation__lookups>(type: T, props: ImmunizationEvaluation__lookups[T]);;

type ImmunizationRecommendation_ImmunizationRecommendation_Props = {
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
     * Business identifier
     *  */
    identifier: Identifier;
    /**
     * Who this profile is for
     *  */
    patient: Reference;
    /**
     * Date recommendation(s) created
     *  */
    date: string;
    /**
     * Who is responsible for protocol
     *  */
    authority: Reference;
    /**
     * Vaccine administration recommendations
     *  */
    recommendation: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Vaccine  or vaccine group recommendation applies to
         *  */
        vaccineCode: CodeableConcept;
        /**
         * Disease to be immunized against
         *  */
        targetDisease: CodeableConcept;
        /**
         * Vaccine which is contraindicated to fulfill the recommendation
         *  */
        contraindicatedVaccineCode: CodeableConcept;
        /**
         * Vaccine recommendation status
         *  */
        forecastStatus: CodeableConcept;
        /**
         * Vaccine administration status reason
         *  */
        forecastReason: CodeableConcept;
        /**
         * Recommended date
         *  */
        dateCriterion: string;
        /**
         * Protocol details
         *  */
        description: string;
        /**
         * Name of vaccination series
         *  */
        series: string;
        /**
         * Recommended dose number within series
         *  */
        doseNumber: number;
        /**
         * Recommended number of doses for immunity
         *  */
        seriesDoses: number;
        /**
         * Past immunizations supporting recommendation
         *  */
        supportingImmunization: Reference;
        /**
         * Patient observations supporting recommendation
         *  */
        supportingPatientInformation: Reference;
    };
};

type ImmunizationRecommendation__lookups = {
    "ImmunizationRecommendation": ImmunizationRecommendation_ImmunizationRecommendation_Props;
};

export declare function immunizationRecommendation(props: ImmunizationRecommendation_ImmunizationRecommendation_Props);;

export declare function immunizationRecommendation<T extends keyof ImmunizationRecommendation__lookups>(type: T, props: ImmunizationRecommendation__lookups[T]);;

type ImplementationGuide_ImplementationGuide_Props = {
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
     * Canonical identifier for this implementation guide, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Business version of the implementation guide
     *  */
    version: string;
    /**
     * Name for this implementation guide (computer friendly)
     *  */
    name: string;
    /**
     * Name for this implementation guide (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the implementation guide
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for implementation guide (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * NPM Package name for IG
     *  */
    packageId: string;
    /**
     * SPDX license code for this IG (or not-open-source)
     *  */
    license: string;
    /**
     * FHIR Version(s) this Implementation Guide targets
     *  */
    fhirVersion: string;
    /**
     * Another Implementation guide this depends on
     *  */
    dependsOn: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Identity of the IG that this depends on
         *  */
        uri: any;
        /**
         * NPM Package name for IG this depends on
         *  */
        packageId: string;
        /**
         * Version of the IG
         *  */
        version: string;
    };
    /**
     * Profiles that apply globally
     *  */
    global: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type this profile applies to
         *  */
        type: string;
        /**
         * Profile that all resources must conform to
         *  */
        profile: any;
    };
    /**
     * Information needed to build the IG
     *  */
    definition: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Human readable text describing the package
         *  */
        grouping: string;
        /**
         * Grouping this is part of
         *  */
        resource: string;
        /**
         * html | markdown | xml | generated
         *  */
        page: string;
        /**
         * Value for named type
         *  */
        parameter: string;
        /**
         * The scope in which the template applies
         *  */
        template: string;
    };
    /**
     * Information about an assembled IG
     *  */
    manifest: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Location of rendered implementation guide
         *  */
        rendering: url;
        /**
         * Relative path for page in IG
         *  */
        resource: url;
        /**
         * Anchor available on the page
         *  */
        page: string;
        /**
         * Image within the IG
         *  */
        image: string;
        /**
         * Additional linkable file in IG
         *  */
        other: string;
    };
};

type ImplementationGuide__lookups = {
    "ImplementationGuide": ImplementationGuide_ImplementationGuide_Props;
};

export declare function implementationGuide(props: ImplementationGuide_ImplementationGuide_Props);;

export declare function implementationGuide<T extends keyof ImplementationGuide__lookups>(type: T, props: ImplementationGuide__lookups[T]);;

type Ingredient_Ingredient_Props = {
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
     * An identifier or code by which the ingredient can be referenced
     *  */
    identifier: Identifier;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * The product which this ingredient is a constituent part of
     *  */
    for: Reference;
    /**
     * Purpose of the ingredient within the product, e.g. active, inactive
     *  */
    role: CodeableConcept;
    /**
     * Precise action within the drug product, e.g. antioxidant, alkalizing agent
     *  */
    function: CodeableConcept;
    /**
     * If the ingredient is a known or suspected allergen
     *  */
    allergenicIndicator: boolean;
    /**
     * An organization that manufactures this ingredient
     *  */
    manufacturer: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * allowed | possible | actual
         *  */
        role: string;
        /**
         * An organization that manufactures this ingredient
         *  */
        manufacturer: Reference;
    };
    /**
     * The substance that comprises this ingredient
     *  */
    substance: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A code or full resource that represents the ingredient substance
         *  */
        code: CodeableReference;
        /**
         * Where the strength range applies
         *  */
        strength: CodeableConcept;
    };
};

type Ingredient__lookups = {
    "Ingredient": Ingredient_Ingredient_Props;
};

export declare function ingredient(props: Ingredient_Ingredient_Props);;

export declare function ingredient<T extends keyof Ingredient__lookups>(type: T, props: Ingredient__lookups[T]);;

type InsurancePlan_InsurancePlan_Props = {
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
     * Business Identifier for Product
     *  */
    identifier: Identifier;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * Kind of product
     *  */
    type: CodeableConcept;
    /**
     * Official name
     *  */
    name: string;
    /**
     * Alternate names
     *  */
    alias: string;
    /**
     * When the product is available
     *  */
    period: Period;
    /**
     * Plan issuer
     *  */
    ownedBy: Reference;
    /**
     * Product administrator
     *  */
    administeredBy: Reference;
    /**
     * Where product applies
     *  */
    coverageArea: Reference;
    /**
     * Contact for the product
     *  */
    contact: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The type of contact
         *  */
        purpose: CodeableConcept;
        /**
         * A name associated with the contact
         *  */
        name: HumanName;
        /**
         * Contact details (telephone, email, etc.)  for a contact
         *  */
        telecom: ContactPoint;
        /**
         * Visiting or postal addresses for the contact
         *  */
        address: Address;
    };
    /**
     * Technical endpoint
     *  */
    endpoint: Reference;
    /**
     * What networks are Included
     *  */
    network: Reference;
    /**
     * Coverage details
     *  */
    coverage: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of coverage
         *  */
        type: CodeableConcept;
        /**
         * What networks provide coverage
         *  */
        network: Reference;
        /**
         * Benefit limit details
         *  */
        benefit: CodeableConcept;
    };
    /**
     * Plan details
     *  */
    plan: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Business Identifier for Product
         *  */
        identifier: Identifier;
        /**
         * Type of plan
         *  */
        type: CodeableConcept;
        /**
         * Where product applies
         *  */
        coverageArea: Reference;
        /**
         * What networks provide coverage
         *  */
        network: Reference;
        /**
         * Additional cost information
         *  */
        generalCost: string;
        /**
         * The actual cost value
         *  */
        specificCost: Quantity;
    };
};

type InsurancePlan__lookups = {
    "InsurancePlan": InsurancePlan_InsurancePlan_Props;
};

export declare function insurancePlan(props: InsurancePlan_InsurancePlan_Props);;

export declare function insurancePlan<T extends keyof InsurancePlan__lookups>(type: T, props: InsurancePlan__lookups[T]);;

type Invoice_Invoice_Props = {
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
     * Business Identifier for item
     *  */
    identifier: Identifier;
    /**
     * draft | issued | balanced | cancelled | entered-in-error
     *  */
    status: string;
    /**
     * Reason for cancellation of this Invoice
     *  */
    cancelledReason: string;
    /**
     * Type of Invoice
     *  */
    type: CodeableConcept;
    /**
     * Recipient(s) of goods and services
     *  */
    subject: Reference;
    /**
     * Recipient of this invoice
     *  */
    recipient: Reference;
    /**
     * Invoice date / posting date
     *  */
    date: string;
    /**
     * Participant in creation of this Invoice
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
         * Type of involvement in creation of this Invoice
         *  */
        role: CodeableConcept;
        /**
         * Individual who was involved
         *  */
        actor: Reference;
    };
    /**
     * Issuing Organization of Invoice
     *  */
    issuer: Reference;
    /**
     * Account that is being balanced
     *  */
    account: Reference;
    /**
     * Line items of this Invoice
     *  */
    lineItem: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Sequence number of line item
         *  */
        sequence: number;
        /**
         * Reference to ChargeItem containing details of this line item or an inline billing code
         *  */
        chargeItem: Reference;
        /**
         * Monetary amount associated with this component
         *  */
        priceComponent: Money;
    };
    /**
     * Components of Invoice total
     *  */
    totalPriceComponent: any;
    /**
     * Net total of this Invoice
     *  */
    totalNet: Money;
    /**
     * Gross total of this Invoice
     *  */
    totalGross: Money;
    /**
     * Payment details
     *  */
    paymentTerms: markdown;
    /**
     * Comments made about the invoice
     *  */
    note: Annotation;
};

type Invoice__lookups = {
    "Invoice": Invoice_Invoice_Props;
};

export declare function invoice(props: Invoice_Invoice_Props);;

export declare function invoice<T extends keyof Invoice__lookups>(type: T, props: Invoice__lookups[T]);;

type Library_Library_Props = {
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
     * Canonical identifier for this library, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the library
     *  */
    identifier: Identifier;
    /**
     * Business version of the library
     *  */
    version: string;
    /**
     * Name for this library (computer friendly)
     *  */
    name: string;
    /**
     * Name for this library (human friendly)
     *  */
    title: string;
    /**
     * Subordinate title of the library
     *  */
    subtitle: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * logic-library | model-definition | asset-collection | module-definition
     *  */
    type: CodeableConcept;
    /**
     * Type of individual the library content is focused on
     *  */
    subject: CodeableConcept;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the library
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for library (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this library is defined
     *  */
    purpose: markdown;
    /**
     * Describes the clinical usage of the library
     *  */
    usage: string;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * When the library was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the library was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * When the library is expected to be used
     *  */
    effectivePeriod: Period;
    /**
     * E.g. Education, Treatment, Assessment, etc.
     *  */
    topic: CodeableConcept;
    /**
     * Who authored the content
     *  */
    author: ContactDetail;
    /**
     * Who edited the content
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the content
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the content
     *  */
    endorser: ContactDetail;
    /**
     * Additional documentation, citations, etc.
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * Parameters defined by the library
     *  */
    parameter: ParameterDefinition;
    /**
     * What data is referenced by this library
     *  */
    dataRequirement: DataRequirement;
    /**
     * Contents of the library, either embedded or referenced
     *  */
    content: Attachment;
};

type Library__lookups = {
    "Library": Library_Library_Props;
};

export declare function library(props: Library_Library_Props);;

export declare function library<T extends keyof Library__lookups>(type: T, props: Library__lookups[T]);;

type Linkage_Linkage_Props = {
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
     * Whether this linkage assertion is active or not
     *  */
    active: boolean;
    /**
     * Who is responsible for linkages
     *  */
    author: Reference;
    /**
     * Item to be linked
     *  */
    item: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * source | alternate | historical
         *  */
        type: string;
        /**
         * Resource being linked
         *  */
        resource: Reference;
    };
};

type Linkage__lookups = {
    "Linkage": Linkage_Linkage_Props;
};

export declare function linkage(props: Linkage_Linkage_Props);;

export declare function linkage<T extends keyof Linkage__lookups>(type: T, props: Linkage__lookups[T]);;

type List_List_Props = {
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
     * Business identifier
     *  */
    identifier: Identifier;
    /**
     * current | retired | entered-in-error
     *  */
    status: string;
    /**
     * working | snapshot | changes
     *  */
    mode: string;
    /**
     * Descriptive name for the list
     *  */
    title: string;
    /**
     * What the purpose of this list is
     *  */
    code: CodeableConcept;
    /**
     * If all resources have the same subject
     *  */
    subject: Reference;
    /**
     * Context in which list created
     *  */
    encounter: Reference;
    /**
     * When the list was prepared
     *  */
    date: string;
    /**
     * Who and/or what defined the list contents (aka Author)
     *  */
    source: Reference;
    /**
     * What order the list has
     *  */
    orderedBy: CodeableConcept;
    /**
     * Comments about the list
     *  */
    note: Annotation;
    /**
     * Entries in the list
     *  */
    entry: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Status/Workflow information about this item
         *  */
        flag: CodeableConcept;
        /**
         * If this item is actually marked as deleted
         *  */
        deleted: boolean;
        /**
         * When item added to list
         *  */
        date: string;
        /**
         * Actual entry
         *  */
        item: Reference;
    };
    /**
     * Why list is empty
     *  */
    emptyReason: CodeableConcept;
};

type List__lookups = {
    "List": List_List_Props;
};

export declare function list(props: List_List_Props);;

export declare function list<T extends keyof List__lookups>(type: T, props: List__lookups[T]);;

type Location_Location_Props = {
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
     * Unique code or number identifying the location to its users
     *  */
    identifier: Identifier;
    /**
     * active | suspended | inactive
     *  */
    status: string;
    /**
     * The operational status of the location (typically only for a bed/room)
     *  */
    operationalStatus: Coding;
    /**
     * Name of the location as used by humans
     *  */
    name: string;
    /**
     * A list of alternate names that the location is known as, or was known as, in the past
     *  */
    alias: string;
    /**
     * Additional details about the location that could be displayed as further information to identify the location beyond its name
     *  */
    description: string;
    /**
     * instance | kind
     *  */
    mode: string;
    /**
     * Type of function performed
     *  */
    type: CodeableConcept;
    /**
     * Contact details of the location
     *  */
    telecom: ContactPoint;
    /**
     * Physical location
     *  */
    address: Address;
    /**
     * Physical form of the location
     *  */
    physicalType: CodeableConcept;
    /**
     * The absolute geographic location
     *  */
    position: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Longitude with WGS84 datum
         *  */
        longitude: number;
        /**
         * Latitude with WGS84 datum
         *  */
        latitude: number;
        /**
         * Altitude with WGS84 datum
         *  */
        altitude: number;
    };
    /**
     * Organization responsible for provisioning and upkeep
     *  */
    managingOrganization: Reference;
    /**
     * Another Location this one is physically a part of
     *  */
    partOf: Reference;
    /**
     * What days/times during a week is this location usually open
     *  */
    hoursOfOperation: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * mon | tue | wed | thu | fri | sat | sun
         *  */
        daysOfWeek: string;
        /**
         * The Location is open all day
         *  */
        allDay: boolean;
        /**
         * Time that the Location opens
         *  */
        openingTime: time;
        /**
         * Time that the Location closes
         *  */
        closingTime: time;
    };
    /**
     * Description of availability exceptions
     *  */
    availabilityExceptions: string;
    /**
     * Technical endpoints providing access to services operated for the location
     *  */
    endpoint: Reference;
};

type Location__lookups = {
    "Location": Location_Location_Props;
};

export declare function location(props: Location_Location_Props);;

export declare function location<T extends keyof Location__lookups>(type: T, props: Location__lookups[T]);;

type ManufacturedItemDefinition_ManufacturedItemDefinition_Props = {
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
     * Unique identifier
     *  */
    identifier: Identifier;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * Dose form as manufactured (before any necessary transformation)
     *  */
    manufacturedDoseForm: CodeableConcept;
    /**
     * The “real world” units in which the quantity of the item is described
     *  */
    unitOfPresentation: CodeableConcept;
    /**
     * Manufacturer of the item (Note that this should be named "manufacturer" but it currently causes technical issues)
     *  */
    manufacturer: Reference;
    /**
     * The ingredients of this manufactured item. Only needed if these are not specified by incoming references from the Ingredient resource
     *  */
    ingredient: CodeableConcept;
    /**
     * General characteristics of this item
     *  */
    property: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A code expressing the type of characteristic
         *  */
        type: CodeableConcept;
        /**
         * A value for the characteristic
         *  */
        value: CodeableConcept;
    };
};

type ManufacturedItemDefinition__lookups = {
    "ManufacturedItemDefinition": ManufacturedItemDefinition_ManufacturedItemDefinition_Props;
};

export declare function manufacturedItemDefinition(props: ManufacturedItemDefinition_ManufacturedItemDefinition_Props);;

export declare function manufacturedItemDefinition<T extends keyof ManufacturedItemDefinition__lookups>(type: T, props: ManufacturedItemDefinition__lookups[T]);;

type Measure_Measure_Props = {
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
     * Canonical identifier for this measure, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the measure
     *  */
    identifier: Identifier;
    /**
     * Business version of the measure
     *  */
    version: string;
    /**
     * Name for this measure (computer friendly)
     *  */
    name: string;
    /**
     * Name for this measure (human friendly)
     *  */
    title: string;
    /**
     * Subordinate title of the measure
     *  */
    subtitle: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device
     *  */
    subject: CodeableConcept;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the measure
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for measure (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this measure is defined
     *  */
    purpose: markdown;
    /**
     * Describes the clinical usage of the measure
     *  */
    usage: string;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * When the measure was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the measure was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * When the measure is expected to be used
     *  */
    effectivePeriod: Period;
    /**
     * The category of the measure, such as Education, Treatment, Assessment, etc.
     *  */
    topic: CodeableConcept;
    /**
     * Who authored the content
     *  */
    author: ContactDetail;
    /**
     * Who edited the content
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the content
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the content
     *  */
    endorser: ContactDetail;
    /**
     * Additional documentation, citations, etc.
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * Logic used by the measure
     *  */
    library: any;
    /**
     * Disclaimer for use of the measure or its referenced content
     *  */
    disclaimer: markdown;
    /**
     * proportion | ratio | continuous-variable | cohort
     *  */
    scoring: CodeableConcept;
    /**
     * opportunity | all-or-nothing | linear | weighted
     *  */
    compositeScoring: CodeableConcept;
    /**
     * process | outcome | structure | patient-reported-outcome | composite
     *  */
    type: CodeableConcept;
    /**
     * How risk adjustment is applied for this measure
     *  */
    riskAdjustment: string;
    /**
     * How is rate aggregation performed for this measure
     *  */
    rateAggregation: string;
    /**
     * Detailed description of why the measure exists
     *  */
    rationale: markdown;
    /**
     * Summary of clinical guidelines
     *  */
    clinicalRecommendationStatement: markdown;
    /**
     * increase | decrease
     *  */
    improvementNotation: CodeableConcept;
    /**
     * Defined terms used in the measure documentation
     *  */
    definition: markdown;
    /**
     * Additional guidance for implementers
     *  */
    guidance: markdown;
    /**
     * Population criteria group
     *  */
    group: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Meaning of the group
         *  */
        code: CodeableConcept;
        /**
         * Summary description
         *  */
        description: string;
        /**
         * The criteria that defines this population
         *  */
        population: Expression;
        /**
         * Component of how the measure should be stratified
         *  */
        stratifier: Expression;
    };
    /**
     * What other data should be reported with the measure
     *  */
    supplementalData: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Meaning of the supplemental data
         *  */
        code: CodeableConcept;
        /**
         * supplemental-data | risk-adjustment-factor
         *  */
        usage: CodeableConcept;
        /**
         * The human readable description of this supplemental data
         *  */
        description: string;
        /**
         * Expression describing additional data to be reported
         *  */
        criteria: Expression;
    };
};

type Measure__lookups = {
    "Measure": Measure_Measure_Props;
};

export declare function measure(props: Measure_Measure_Props);;

export declare function measure<T extends keyof Measure__lookups>(type: T, props: Measure__lookups[T]);;

type MeasureReport_MeasureReport_Props = {
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
     * Additional identifier for the MeasureReport
     *  */
    identifier: Identifier;
    /**
     * complete | pending | error
     *  */
    status: string;
    /**
     * individual | subject-list | summary | data-collection
     *  */
    type: string;
    /**
     * What measure was calculated
     *  */
    measure: any;
    /**
     * What individual(s) the report is for
     *  */
    subject: Reference;
    /**
     * When the report was generated
     *  */
    date: string;
    /**
     * Who is reporting the data
     *  */
    reporter: Reference;
    /**
     * What period the report covers
     *  */
    period: Period;
    /**
     * increase | decrease
     *  */
    improvementNotation: CodeableConcept;
    /**
     * Measure results for each group
     *  */
    group: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Meaning of the group
         *  */
        code: CodeableConcept;
        /**
         * For subject-list reports, the subject results in this population
         *  */
        population: Reference;
        /**
         * What score this group achieved
         *  */
        measureScore: Quantity;
        /**
         * What score this stratum achieved
         *  */
        stratifier: Quantity;
    };
    /**
     * What data was used to calculate the measure score
     *  */
    evaluatedResource: Reference;
};

type MeasureReport__lookups = {
    "MeasureReport": MeasureReport_MeasureReport_Props;
};

export declare function measureReport(props: MeasureReport_MeasureReport_Props);;

export declare function measureReport<T extends keyof MeasureReport__lookups>(type: T, props: MeasureReport__lookups[T]);;

type Media_Media_Props = {
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
     * Identifier(s) for the image
     *  */
    identifier: Identifier;
    /**
     * Procedure that caused this media to be created
     *  */
    basedOn: Reference;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * Classification of media as image, video, or audio
     *  */
    type: CodeableConcept;
    /**
     * The type of acquisition equipment/process
     *  */
    modality: CodeableConcept;
    /**
     * Imaging view, e.g. Lateral or Antero-posterior
     *  */
    view: CodeableConcept;
    /**
     * Who/What this Media is a record of
     *  */
    subject: Reference;
    /**
     * Encounter associated with media
     *  */
    encounter: Reference;
    /**
     * When Media was collected
     *  */
    created: string;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * The person who generated the image
     *  */
    operator: Reference;
    /**
     * Why was event performed?
     *  */
    reasonCode: CodeableConcept;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * Name of the device/manufacturer
     *  */
    deviceName: string;
    /**
     * Observing Device
     *  */
    device: Reference;
    /**
     * Height of the image in pixels (photo/video)
     *  */
    height: number;
    /**
     * Width of the image in pixels (photo/video)
     *  */
    width: number;
    /**
     * Number of frames if > 1 (photo)
     *  */
    frames: number;
    /**
     * Length in seconds (audio / video)
     *  */
    duration: number;
    /**
     * Actual Media - reference or data
     *  */
    content: Attachment;
    /**
     * Comments made about the media
     *  */
    note: Annotation;
};

type Media__lookups = {
    "Media": Media_Media_Props;
};

export declare function media(props: Media_Media_Props);;

export declare function media<T extends keyof Media__lookups>(type: T, props: Media__lookups[T]);;

type Medication_Medication_Props = {
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
     * Business identifier for this medication
     *  */
    identifier: Identifier;
    /**
     * Codes that identify this medication
     *  */
    code: CodeableConcept;
    /**
     * active | inactive | entered-in-error
     *  */
    status: string;
    /**
     * Manufacturer of the item
     *  */
    manufacturer: Reference;
    /**
     * powder | tablets | capsule +
     *  */
    form: CodeableConcept;
    /**
     * Amount of drug in package
     *  */
    amount: Ratio;
    /**
     * Active or inactive ingredient
     *  */
    ingredient: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The actual ingredient or content
         *  */
        item: CodeableConcept;
        /**
         * Active ingredient indicator
         *  */
        isActive: boolean;
        /**
         * Quantity of ingredient present
         *  */
        strength: Ratio;
    };
    /**
     * Details about packaged medications
     *  */
    batch: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Identifier assigned to batch
         *  */
        lotNumber: string;
        /**
         * When batch will expire
         *  */
        expirationDate: string;
    };
};

type Medication__lookups = {
    "Medication": Medication_Medication_Props;
};

export declare function medication(props: Medication_Medication_Props);;

export declare function medication<T extends keyof Medication__lookups>(type: T, props: Medication__lookups[T]);;

type MedicationAdministration_MedicationAdministration_Props = {
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
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * Instantiates protocol or definition
     *  */
    instantiates: string;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * in-progress | not-done | on-hold | completed | entered-in-error | stopped | unknown
     *  */
    status: string;
    /**
     * Reason administration not performed
     *  */
    statusReason: CodeableConcept;
    /**
     * Type of medication usage
     *  */
    category: CodeableConcept;
    /**
     * What was administered
     *  */
    medication: CodeableConcept;
    /**
     * Who received medication
     *  */
    subject: Reference;
    /**
     * Encounter or Episode of Care administered as part of
     *  */
    context: Reference;
    /**
     * Additional information to support administration
     *  */
    supportingInformation: Reference;
    /**
     * Start and end time of administration
     *  */
    effective: string;
    /**
     * Who performed the medication administration and what they did
     *  */
    performer: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of performance
         *  */
        function: CodeableConcept;
        /**
         * Who performed the medication administration
         *  */
        actor: Reference;
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
     * Device used to administer
     *  */
    device: Reference;
    /**
     * Information about the administration
     *  */
    note: Annotation;
    /**
     * Details of how medication was taken
     *  */
    dosage: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Free text dosage instructions e.g. SIG
         *  */
        text: string;
        /**
         * Body site administered to
         *  */
        site: CodeableConcept;
        /**
         * Path of substance into body
         *  */
        route: CodeableConcept;
        /**
         * How drug was administered
         *  */
        method: CodeableConcept;
        /**
         * Amount of medication per dose
         *  */
        dose: Quantity;
        /**
         * Dose quantity per unit of time
         *  */
        rate: Ratio;
    };
    /**
     * A list of events of interest in the lifecycle
     *  */
    eventHistory: Reference;
};

type MedicationAdministration__lookups = {
    "MedicationAdministration": MedicationAdministration_MedicationAdministration_Props;
};

export declare function medicationAdministration(props: MedicationAdministration_MedicationAdministration_Props);;

export declare function medicationAdministration<T extends keyof MedicationAdministration__lookups>(type: T, props: MedicationAdministration__lookups[T]);;

type MedicationDispense_MedicationDispense_Props = {
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
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * Event that dispense is part of
     *  */
    partOf: Reference;
    /**
     * preparation | in-progress | cancelled | on-hold | completed | entered-in-error | stopped | declined | unknown
     *  */
    status: string;
    /**
     * Why a dispense was not performed
     *  */
    statusReason: CodeableConcept;
    /**
     * Type of medication dispense
     *  */
    category: CodeableConcept;
    /**
     * What medication was supplied
     *  */
    medication: CodeableConcept;
    /**
     * Who the dispense is for
     *  */
    subject: Reference;
    /**
     * Encounter / Episode associated with event
     *  */
    context: Reference;
    /**
     * Information that supports the dispensing of the medication
     *  */
    supportingInformation: Reference;
    /**
     * Who performed event
     *  */
    performer: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Who performed the dispense and what they did
         *  */
        function: CodeableConcept;
        /**
         * Individual who was performing
         *  */
        actor: Reference;
    };
    /**
     * Where the dispense occurred
     *  */
    location: Reference;
    /**
     * Medication order that authorizes the dispense
     *  */
    authorizingPrescription: Reference;
    /**
     * Trial fill, partial fill, emergency fill, etc.
     *  */
    type: CodeableConcept;
    /**
     * Amount dispensed
     *  */
    quantity: Quantity;
    /**
     * Amount of medication expressed as a timing amount
     *  */
    daysSupply: Quantity;
    /**
     * When product was packaged and reviewed
     *  */
    whenPrepared: string;
    /**
     * When product was given out
     *  */
    whenHandedOver: string;
    /**
     * Where the medication was sent
     *  */
    destination: Reference;
    /**
     * Who collected the medication
     *  */
    receiver: Reference;
    /**
     * Information about the dispense
     *  */
    note: Annotation;
    /**
     * How the medication is to be used by the patient or administered by the caregiver
     *  */
    dosageInstruction: Dosage;
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
         * Whether a substitution was or was not performed on the dispense
         *  */
        wasSubstituted: boolean;
        /**
         * Code signifying whether a different drug was dispensed from what was prescribed
         *  */
        type: CodeableConcept;
        /**
         * Why was substitution made
         *  */
        reason: CodeableConcept;
        /**
         * Who is responsible for the substitution
         *  */
        responsibleParty: Reference;
    };
    /**
     * Clinical issue with action
     *  */
    detectedIssue: Reference;
    /**
     * A list of relevant lifecycle events
     *  */
    eventHistory: Reference;
};

type MedicationDispense__lookups = {
    "MedicationDispense": MedicationDispense_MedicationDispense_Props;
};

export declare function medicationDispense(props: MedicationDispense_MedicationDispense_Props);;

export declare function medicationDispense<T extends keyof MedicationDispense__lookups>(type: T, props: MedicationDispense__lookups[T]);;

type MedicationKnowledge_MedicationKnowledge_Props = {
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
     * Code that identifies this medication
     *  */
    code: CodeableConcept;
    /**
     * active | inactive | entered-in-error
     *  */
    status: string;
    /**
     * Manufacturer of the item
     *  */
    manufacturer: Reference;
    /**
     * powder | tablets | capsule +
     *  */
    doseForm: CodeableConcept;
    /**
     * Amount of drug in package
     *  */
    amount: Quantity;
    /**
     * Additional names for a medication
     *  */
    synonym: string;
    /**
     * Associated or related medication information
     *  */
    relatedMedicationKnowledge: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Category of medicationKnowledge
         *  */
        type: CodeableConcept;
        /**
         * Associated documentation about the associated medication knowledge
         *  */
        reference: Reference;
    };
    /**
     * A medication resource that is associated with this medication
     *  */
    associatedMedication: Reference;
    /**
     * Category of the medication or product
     *  */
    productType: CodeableConcept;
    /**
     * Associated documentation about the medication
     *  */
    monograph: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The category of medication document
         *  */
        type: CodeableConcept;
        /**
         * Associated documentation about the medication
         *  */
        source: Reference;
    };
    /**
     * Active or inactive ingredient
     *  */
    ingredient: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Medication(s) or substance(s) contained in the medication
         *  */
        item: CodeableConcept;
        /**
         * Active ingredient indicator
         *  */
        isActive: boolean;
        /**
         * Quantity of ingredient present
         *  */
        strength: Ratio;
    };
    /**
     * The instructions for preparing the medication
     *  */
    preparationInstruction: markdown;
    /**
     * The intended or approved route of administration
     *  */
    intendedRoute: CodeableConcept;
    /**
     * The pricing of the medication
     *  */
    cost: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The category of the cost information
         *  */
        type: CodeableConcept;
        /**
         * The source or owner for the price information
         *  */
        source: string;
        /**
         * The price of the medication
         *  */
        cost: Money;
    };
    /**
     * Program under which a medication is reviewed
     *  */
    monitoringProgram: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of program under which the medication is monitored
         *  */
        type: CodeableConcept;
        /**
         * Name of the reviewing program
         *  */
        name: string;
    };
    /**
     * Guidelines for administration of the medication
     *  */
    administrationGuidelines: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Dosage for the medication for the specific guidelines
         *  */
        dosage: Dosage;
        /**
         * Indication for use that apply to the specific administration guidelines
         *  */
        indication: CodeableConcept;
        /**
         * The specific characteristic
         *  */
        patientCharacteristics: string;
    };
    /**
     * Categorization of the medication within a formulary or classification system
     *  */
    medicineClassification: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The type of category for the medication (for example, therapeutic classification, therapeutic sub-classification)
         *  */
        type: CodeableConcept;
        /**
         * Specific category assigned to the medication
         *  */
        classification: CodeableConcept;
    };
    /**
     * Details about packaged medications
     *  */
    packaging: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A code that defines the specific type of packaging that the medication can be found in
         *  */
        type: CodeableConcept;
        /**
         * The number of product units the package would contain if fully loaded
         *  */
        quantity: Quantity;
    };
    /**
     * Specifies descriptive properties of the medicine
     *  */
    drugCharacteristic: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Code specifying the type of characteristic of medication
         *  */
        type: CodeableConcept;
        /**
         * Description of the characteristic
         *  */
        value: CodeableConcept;
    };
    /**
     * Potential clinical issue with or between medication(s)
     *  */
    contraindication: Reference;
    /**
     * Regulatory information about a medication
     *  */
    regulatory: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Specifies the authority of the regulation
         *  */
        regulatoryAuthority: Reference;
        /**
         * Specifies if regulation allows for changes in the medication when dispensing
         *  */
        substitution: boolean;
        /**
         * Specifies the specific drug schedule
         *  */
        schedule: CodeableConcept;
        /**
         * The period that applies to the maximum number of units
         *  */
        maxDispense: Duration;
    };
    /**
     * The time course of drug absorption, distribution, metabolism and excretion of a medication from the body
     *  */
    kinetics: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The drug concentration measured at certain discrete points in time
         *  */
        areaUnderCurve: Quantity;
        /**
         * The median lethal dose of a drug
         *  */
        lethalDose50: Quantity;
        /**
         * Time required for concentration in the body to decrease by half
         *  */
        halfLifePeriod: Duration;
    };
};

type MedicationKnowledge__lookups = {
    "MedicationKnowledge": MedicationKnowledge_MedicationKnowledge_Props;
};

export declare function medicationKnowledge(props: MedicationKnowledge_MedicationKnowledge_Props);;

export declare function medicationKnowledge<T extends keyof MedicationKnowledge__lookups>(type: T, props: MedicationKnowledge__lookups[T]);;

type MedicationRequest_MedicationRequest_Props = {
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
     * External ids for this request
     *  */
    identifier: Identifier;
    /**
     * active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * Type of medication usage
     *  */
    category: CodeableConcept;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * True if request is prohibiting action
     *  */
    doNotPerform: boolean;
    /**
     * Reported rather than primary record
     *  */
    reported: boolean;
    /**
     * Medication to be taken
     *  */
    medication: CodeableConcept;
    /**
     * Who or group medication request is for
     *  */
    subject: Reference;
    /**
     * Encounter created as part of encounter/admission/stay
     *  */
    encounter: Reference;
    /**
     * Information to support ordering of the medication
     *  */
    supportingInformation: Reference;
    /**
     * When request was initially authored
     *  */
    authoredOn: string;
    /**
     * Who/What requested the Request
     *  */
    requester: Reference;
    /**
     * Intended performer of administration
     *  */
    performer: Reference;
    /**
     * Desired kind of performer of the medication administration
     *  */
    performerType: CodeableConcept;
    /**
     * Person who entered the request
     *  */
    recorder: Reference;
    /**
     * Reason or indication for ordering or not ordering the medication
     *  */
    reasonCode: CodeableConcept;
    /**
     * Condition or observation that supports why the prescription is being written
     *  */
    reasonReference: Reference;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: any;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * What request fulfills
     *  */
    basedOn: Reference;
    /**
     * Composite request this is part of
     *  */
    groupIdentifier: Identifier;
    /**
     * Overall pattern of medication administration
     *  */
    courseOfTherapyType: CodeableConcept;
    /**
     * Associated insurance coverage
     *  */
    insurance: Reference;
    /**
     * Information about the prescription
     *  */
    note: Annotation;
    /**
     * How the medication should be taken
     *  */
    dosageInstruction: Dosage;
    /**
     * Medication supply authorization
     *  */
    dispenseRequest: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * First fill duration
         *  */
        initialFill: Duration;
        /**
         * Minimum period of time between dispenses
         *  */
        dispenseInterval: Duration;
        /**
         * Time period supply is authorized for
         *  */
        validityPeriod: Period;
        /**
         * Number of refills authorized
         *  */
        numberOfRepeatsAllowed: number;
        /**
         * Amount of medication to supply per dispense
         *  */
        quantity: Quantity;
        /**
         * Number of days supply per dispense
         *  */
        expectedSupplyDuration: Duration;
        /**
         * Intended dispenser
         *  */
        performer: Reference;
    };
    /**
     * Any restrictions on medication substitution
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
         * Whether substitution is allowed or not
         *  */
        allowed: boolean;
        /**
         * Why should (not) substitution be made
         *  */
        reason: CodeableConcept;
    };
    /**
     * An order/prescription that is being replaced
     *  */
    priorPrescription: Reference;
    /**
     * Clinical Issue with action
     *  */
    detectedIssue: Reference;
    /**
     * A list of events of interest in the lifecycle
     *  */
    eventHistory: Reference;
};

type MedicationRequest__lookups = {
    "MedicationRequest": MedicationRequest_MedicationRequest_Props;
};

export declare function medicationRequest(props: MedicationRequest_MedicationRequest_Props);;

export declare function medicationRequest<T extends keyof MedicationRequest__lookups>(type: T, props: MedicationRequest__lookups[T]);;

type MedicationStatement_MedicationStatement_Props = {
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
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * Fulfils plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * active | completed | entered-in-error | intended | stopped | on-hold | unknown | not-taken
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * Type of medication usage
     *  */
    category: CodeableConcept;
    /**
     * What medication was taken
     *  */
    medication: CodeableConcept;
    /**
     * Who is/was taking  the medication
     *  */
    subject: Reference;
    /**
     * Encounter / Episode associated with MedicationStatement
     *  */
    context: Reference;
    /**
     * The date/time or interval when the medication is/was/will be taken
     *  */
    effective: string;
    /**
     * When the statement was asserted?
     *  */
    dateAsserted: string;
    /**
     * Person or organization that provided the information about the taking of this medication
     *  */
    informationSource: Reference;
    /**
     * Additional supporting information
     *  */
    derivedFrom: Reference;
    /**
     * Reason for why the medication is being/was taken
     *  */
    reasonCode: CodeableConcept;
    /**
     * Condition or observation that supports why the medication is being/was taken
     *  */
    reasonReference: Reference;
    /**
     * Further information about the statement
     *  */
    note: Annotation;
    /**
     * Details of how medication is/was taken or should be taken
     *  */
    dosage: Dosage;
};

type MedicationStatement__lookups = {
    "MedicationStatement": MedicationStatement_MedicationStatement_Props;
};

export declare function medicationStatement(props: MedicationStatement_MedicationStatement_Props);;

export declare function medicationStatement<T extends keyof MedicationStatement__lookups>(type: T, props: MedicationStatement__lookups[T]);;

type MedicinalProductDefinition_MedicinalProductDefinition_Props = {
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
     * Business identifier for this product. Could be an MPID
     *  */
    identifier: Identifier;
    /**
     * Regulatory type, e.g. Investigational or Authorized
     *  */
    type: CodeableConcept;
    /**
     * If this medicine applies to human or veterinary uses
     *  */
    domain: CodeableConcept;
    /**
     * A business identifier relating to a specific version of the product
     *  */
    version: string;
    /**
     * The status within the lifecycle of this product record
     *  */
    status: CodeableConcept;
    /**
     * The date at which the given status became applicable
     *  */
    statusDate: string;
    /**
     * General description of this product
     *  */
    description: markdown;
    /**
     * The dose form for a single part product, or combined form of a multiple part product
     *  */
    combinedPharmaceuticalDoseForm: CodeableConcept;
    /**
     * The path by which the product is taken into or makes contact with the body
     *  */
    route: CodeableConcept;
    /**
     * Description of indication(s) for this product, used when structured indications are not required
     *  */
    indication: markdown;
    /**
     * The legal status of supply of the medicinal product as classified by the regulator
     *  */
    legalStatusOfSupply: CodeableConcept;
    /**
     * Whether the Medicinal Product is subject to additional monitoring for regulatory reasons
     *  */
    additionalMonitoringIndicator: CodeableConcept;
    /**
     * Whether the Medicinal Product is subject to special measures for regulatory reasons
     *  */
    specialMeasures: CodeableConcept;
    /**
     * If authorised for use in children
     *  */
    pediatricUseIndicator: CodeableConcept;
    /**
     * Allows the product to be classified by various systems
     *  */
    classification: CodeableConcept;
    /**
     * Marketing status of the medicinal product, in contrast to marketing authorization
     *  */
    marketingStatus: MarketingStatus;
    /**
     * Package type for the product
     *  */
    packagedMedicinalProduct: CodeableConcept;
    /**
     * The ingredients of this medicinal product - when not detailed in other resources
     *  */
    ingredient: CodeableConcept;
    /**
     * Any component of the drug product which is not the chemical entity defined as the drug substance, or an excipient in the drug product
     *  */
    impurity: CodeableReference;
    /**
     * Additional documentation about the medicinal product
     *  */
    attachedDocument: Reference;
    /**
     * A master file for the medicinal product (e.g. Pharmacovigilance System Master File)
     *  */
    masterFile: Reference;
    /**
     * A product specific contact, person (in a role), or an organization
     *  */
    contact: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Allows the contact to be classified, for example QPPV, Pharmacovigilance Enquiry Information
         *  */
        type: CodeableConcept;
        /**
         * A product specific contact, person (in a role), or an organization
         *  */
        contact: Reference;
    };
    /**
     * Clinical trials or studies that this product is involved in
     *  */
    clinicalTrial: Reference;
    /**
     * A code that this product is known by, within some formal terminology
     *  */
    code: Coding;
    /**
     * The product's name, including full name and possibly coded parts
     *  */
    name: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The full product name
         *  */
        productName: string;
        /**
         * Type of product name, such as rINN, BAN, Proprietary, Non-Proprietary
         *  */
        type: CodeableConcept;
        /**
         * Identifying type for this part of the name (e.g. strength part)
         *  */
        namePart: CodeableConcept;
        /**
         * Language code for this name
         *  */
        countryLanguage: CodeableConcept;
    };
    /**
     * Reference to another product, e.g. for linking authorised to investigational product
     *  */
    crossReference: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Reference to another product, e.g. for linking authorised to investigational product
         *  */
        product: CodeableReference;
        /**
         * The type of relationship, for instance branded to generic or virtual to actual product
         *  */
        type: CodeableConcept;
    };
    /**
     * A manufacturing or administrative process for the medicinal product
     *  */
    operation: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The type of manufacturing operation e.g. manufacturing itself, re-packaging
         *  */
        type: CodeableReference;
        /**
         * Date range of applicability
         *  */
        effectiveDate: Period;
        /**
         * The organization responsible for the particular process, e.g. the manufacturer or importer
         *  */
        organization: Reference;
        /**
         * Specifies whether this process is considered proprietary or confidential
         *  */
        confidentialityIndicator: CodeableConcept;
    };
    /**
     * Key product features such as "sugar free", "modified release"
     *  */
    characteristic: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A code expressing the type of characteristic
         *  */
        type: CodeableConcept;
        /**
         * A value for the characteristic
         *  */
        value: CodeableConcept;
    };
};

type MedicinalProductDefinition__lookups = {
    "MedicinalProductDefinition": MedicinalProductDefinition_MedicinalProductDefinition_Props;
};

export declare function medicinalProductDefinition(props: MedicinalProductDefinition_MedicinalProductDefinition_Props);;

export declare function medicinalProductDefinition<T extends keyof MedicinalProductDefinition__lookups>(type: T, props: MedicinalProductDefinition__lookups[T]);;

type MessageDefinition_MessageDefinition_Props = {
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
     * Business Identifier for a given MessageDefinition
     *  */
    url: string;
    /**
     * Primary key for the message definition on a given server
     *  */
    identifier: Identifier;
    /**
     * Business version of the message definition
     *  */
    version: string;
    /**
     * Name for this message definition (computer friendly)
     *  */
    name: string;
    /**
     * Name for this message definition (human friendly)
     *  */
    title: string;
    /**
     * Takes the place of
     *  */
    replaces: any;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the message definition
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for message definition (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this message definition is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * Definition this one is based on
     *  */
    base: any;
    /**
     * Protocol/workflow this is part of
     *  */
    parent: any;
    /**
     * Event code  or link to the EventDefinition
     *  */
    event: Coding;
    /**
     * consequence | currency | notification
     *  */
    category: string;
    /**
     * Resource(s) that are the subject of the event
     *  */
    focus: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of resource
         *  */
        code: string;
        /**
         * Profile that must be adhered to by focus
         *  */
        profile: any;
        /**
         * Minimum number of focuses of this type
         *  */
        min: number;
        /**
         * Maximum number of focuses of this type
         *  */
        max: string;
    };
    /**
     * always | on-error | never | on-success
     *  */
    responseRequired: string;
    /**
     * Responses to this message
     *  */
    allowedResponse: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Reference to allowed message definition response
         *  */
        message: any;
        /**
         * When should this response be used
         *  */
        situation: markdown;
    };
    /**
     * Canonical reference to a GraphDefinition
     *  */
    graph: any;
};

type MessageDefinition__lookups = {
    "MessageDefinition": MessageDefinition_MessageDefinition_Props;
};

export declare function messageDefinition(props: MessageDefinition_MessageDefinition_Props);;

export declare function messageDefinition<T extends keyof MessageDefinition__lookups>(type: T, props: MessageDefinition__lookups[T]);;

type MessageHeader_MessageHeader_Props = {
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
     * Code for the event this message represents or link to event definition
     *  */
    event: Coding;
    /**
     * Message destination application(s)
     *  */
    destination: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Name of system
         *  */
        name: string;
        /**
         * Particular delivery destination within the destination
         *  */
        target: Reference;
        /**
         * Actual destination address or id
         *  */
        endpoint: url;
        /**
         * Intended "real-world" recipient for the data
         *  */
        receiver: Reference;
    };
    /**
     * Real world sender of the message
     *  */
    sender: Reference;
    /**
     * The source of the data entry
     *  */
    enterer: Reference;
    /**
     * The source of the decision
     *  */
    author: Reference;
    /**
     * Message source application
     *  */
    source: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Name of system
         *  */
        name: string;
        /**
         * Name of software running the system
         *  */
        software: string;
        /**
         * Version of software running
         *  */
        version: string;
        /**
         * Human contact for problems
         *  */
        contact: ContactPoint;
        /**
         * Actual message source address or id
         *  */
        endpoint: url;
    };
    /**
     * Final responsibility for event
     *  */
    responsible: Reference;
    /**
     * Cause of event
     *  */
    reason: CodeableConcept;
    /**
     * If this is a reply to prior message
     *  */
    response: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Id of original message
         *  */
        identifier: string;
        /**
         * ok | transient-error | fatal-error
         *  */
        code: string;
        /**
         * Specific list of hints/warnings/errors
         *  */
        details: Reference;
    };
    /**
     * The actual content of the message
     *  */
    focus: Reference;
    /**
     * Link to the definition for this message
     *  */
    definition: any;
};

type MessageHeader__lookups = {
    "MessageHeader": MessageHeader_MessageHeader_Props;
};

export declare function messageHeader(props: MessageHeader_MessageHeader_Props);;

export declare function messageHeader<T extends keyof MessageHeader__lookups>(type: T, props: MessageHeader__lookups[T]);;

type MolecularSequence_MolecularSequence_Props = {
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
     * Unique ID for this particular sequence. This is a FHIR-defined id
     *  */
    identifier: Identifier;
    /**
     * aa | dna | rna
     *  */
    type: string;
    /**
     * Base number of coordinate system (0 for 0-based numbering or coordinates, inclusive start, exclusive end, 1 for 1-based numbering, inclusive start, inclusive end)
     *  */
    coordinateSystem: number;
    /**
     * Who and/or what this is about
     *  */
    patient: Reference;
    /**
     * Specimen used for sequencing
     *  */
    specimen: Reference;
    /**
     * The method for sequencing
     *  */
    device: Reference;
    /**
     * Who should be responsible for test result
     *  */
    performer: Reference;
    /**
     * The number of copies of the sequence of interest.  (RNASeq)
     *  */
    quantity: Quantity;
    /**
     * A sequence used as reference
     *  */
    referenceSeq: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Chromosome containing genetic finding
         *  */
        chromosome: CodeableConcept;
        /**
         * The Genome Build used for reference, following GRCh build versions e.g. 'GRCh 37'
         *  */
        genomeBuild: string;
        /**
         * sense | antisense
         *  */
        orientation: string;
        /**
         * Reference identifier
         *  */
        referenceSeqId: CodeableConcept;
        /**
         * A pointer to another MolecularSequence entity as reference sequence
         *  */
        referenceSeqPointer: Reference;
        /**
         * A string to represent reference sequence
         *  */
        referenceSeqString: string;
        /**
         * watson | crick
         *  */
        strand: string;
        /**
         * Start position of the window on the  reference sequence
         *  */
        windowStart: number;
        /**
         * End position of the window on the reference sequence
         *  */
        windowEnd: number;
    };
    /**
     * Variant in sequence
     *  */
    variant: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Start position of the variant on the  reference sequence
         *  */
        start: number;
        /**
         * End position of the variant on the reference sequence
         *  */
        end: number;
        /**
         * Allele that was observed
         *  */
        observedAllele: string;
        /**
         * Allele in the reference sequence
         *  */
        referenceAllele: string;
        /**
         * Extended CIGAR string for aligning the sequence with reference bases
         *  */
        cigar: string;
        /**
         * Pointer to observed variant information
         *  */
        variantPointer: Reference;
    };
    /**
     * Sequence that was observed
     *  */
    observedSeq: string;
    /**
     * An set of value as quality of sequence
     *  */
    quality: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * indel | snp | unknown
         *  */
        type: string;
        /**
         * Standard sequence for comparison
         *  */
        standardSequence: CodeableConcept;
        /**
         * Start position of the sequence
         *  */
        start: number;
        /**
         * End position of the sequence
         *  */
        end: number;
        /**
         * Quality score for the comparison
         *  */
        score: Quantity;
        /**
         * Method to get quality
         *  */
        method: CodeableConcept;
        /**
         * True positives from the perspective of the truth data
         *  */
        truthTP: number;
        /**
         * True positives from the perspective of the query data
         *  */
        queryTP: number;
        /**
         * False negatives
         *  */
        truthFN: number;
        /**
         * False positives
         *  */
        queryFP: number;
        /**
         * False positives where the non-REF alleles in the Truth and Query Call Sets match
         *  */
        gtFP: number;
        /**
         * Precision of comparison
         *  */
        precision: number;
        /**
         * Recall of comparison
         *  */
        recall: number;
        /**
         * F-score
         *  */
        fScore: number;
        /**
         * FScore of the GQ score
         *  */
        roc: number;
    };
    /**
     * Average number of reads representing a given nucleotide in the reconstructed sequence
     *  */
    readCoverage: number;
    /**
     * External repository which contains detailed report related with observedSeq in this resource
     *  */
    repository: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * directlink | openapi | login | oauth | other
         *  */
        type: string;
        /**
         * URI of the repository
         *  */
        url: string;
        /**
         * Repository's name
         *  */
        name: string;
        /**
         * Id of the dataset that used to call for dataset in repository
         *  */
        datasetId: string;
        /**
         * Id of the variantset that used to call for variantset in repository
         *  */
        variantsetId: string;
        /**
         * Id of the read
         *  */
        readsetId: string;
    };
    /**
     * Pointer to next atomic sequence
     *  */
    pointer: Reference;
    /**
     * Structural variant
     *  */
    structureVariant: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Structural variant change type
         *  */
        variantType: CodeableConcept;
        /**
         * Does the structural variant have base pair resolution breakpoints?
         *  */
        exact: boolean;
        /**
         * Structural variant length
         *  */
        length: number;
        /**
         * Structural variant outer end
         *  */
        outer: number;
        /**
         * Structural variant inner end
         *  */
        inner: number;
    };
};

type MolecularSequence__lookups = {
    "MolecularSequence": MolecularSequence_MolecularSequence_Props;
};

export declare function molecularSequence(props: MolecularSequence_MolecularSequence_Props);;

export declare function molecularSequence<T extends keyof MolecularSequence__lookups>(type: T, props: MolecularSequence__lookups[T]);;

type NamingSystem_NamingSystem_Props = {
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
     * Name for this naming system (computer friendly)
     *  */
    name: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * codesystem | identifier | root
     *  */
    kind: string;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Who maintains system namespace?
     *  */
    responsible: string;
    /**
     * e.g. driver,  provider,  patient, bank etc.
     *  */
    type: CodeableConcept;
    /**
     * Natural language description of the naming system
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for naming system (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * How/where is it used
     *  */
    usage: string;
    /**
     * Unique identifiers used for system
     *  */
    uniqueId: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * oid | uuid | uri | other
         *  */
        type: string;
        /**
         * The unique identifier
         *  */
        value: string;
        /**
         * Is this the id that should be used for this type
         *  */
        preferred: boolean;
        /**
         * Notes about identifier usage
         *  */
        comment: string;
        /**
         * When is identifier valid?
         *  */
        period: Period;
    };
};

type NamingSystem__lookups = {
    "NamingSystem": NamingSystem_NamingSystem_Props;
};

export declare function namingSystem(props: NamingSystem_NamingSystem_Props);;

export declare function namingSystem<T extends keyof NamingSystem__lookups>(type: T, props: NamingSystem__lookups[T]);;

type NutritionOrder_NutritionOrder_Props = {
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
     * Identifiers assigned to this order
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: any;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Instantiates protocol or definition
     *  */
    instantiates: string;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * The person who requires the diet, formula or nutritional supplement
     *  */
    patient: Reference;
    /**
     * The encounter associated with this nutrition order
     *  */
    encounter: Reference;
    /**
     * Date and time the nutrition order was requested
     *  */
    dateTime: string;
    /**
     * Who ordered the diet, formula or nutritional supplement
     *  */
    orderer: Reference;
    /**
     * List of the patient's food and nutrition-related allergies and intolerances
     *  */
    allergyIntolerance: Reference;
    /**
     * Order-specific modifier about the type of food that should be given
     *  */
    foodPreferenceModifier: CodeableConcept;
    /**
     * Order-specific modifier about the type of food that should not be given
     *  */
    excludeFoodModifier: CodeableConcept;
    /**
     * Oral diet components
     *  */
    oralDiet: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of oral diet or diet restrictions that describe what can be consumed orally
         *  */
        type: CodeableConcept;
        /**
         * Scheduled frequency of diet
         *  */
        schedule: Timing;
        /**
         * Quantity of the specified nutrient
         *  */
        nutrient: Quantity;
        /**
         * Concepts that are used to identify an entity that is ingested for nutritional purposes
         *  */
        texture: CodeableConcept;
        /**
         * The required consistency of fluids and liquids provided to the patient
         *  */
        fluidConsistencyType: CodeableConcept;
        /**
         * Instructions or additional information about the oral diet
         *  */
        instruction: string;
    };
    /**
     * Supplement components
     *  */
    supplement: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of supplement product requested
         *  */
        type: CodeableConcept;
        /**
         * Product or brand name of the nutritional supplement
         *  */
        productName: string;
        /**
         * Scheduled frequency of supplement
         *  */
        schedule: Timing;
        /**
         * Amount of the nutritional supplement
         *  */
        quantity: Quantity;
        /**
         * Instructions or additional information about the oral supplement
         *  */
        instruction: string;
    };
    /**
     * Enteral formula components
     *  */
    enteralFormula: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of enteral or infant formula
         *  */
        baseFormulaType: CodeableConcept;
        /**
         * Product or brand name of the enteral or infant formula
         *  */
        baseFormulaProductName: string;
        /**
         * Type of modular component to add to the feeding
         *  */
        additiveType: CodeableConcept;
        /**
         * Product or brand name of the modular additive
         *  */
        additiveProductName: string;
        /**
         * Amount of energy per specified volume that is required
         *  */
        caloricDensity: Quantity;
        /**
         * How the formula should enter the patient's gastrointestinal tract
         *  */
        routeofAdministration: CodeableConcept;
        /**
         * Speed with which the formula is provided per period of time
         *  */
        administration: Quantity;
        /**
         * Upper limit on formula volume per unit of time
         *  */
        maxVolumeToDeliver: Quantity;
        /**
         * Formula feeding instructions expressed as text
         *  */
        administrationInstruction: string;
    };
    /**
     * Comments
     *  */
    note: Annotation;
};

type NutritionOrder__lookups = {
    "NutritionOrder": NutritionOrder_NutritionOrder_Props;
};

export declare function nutritionOrder(props: NutritionOrder_NutritionOrder_Props);;

export declare function nutritionOrder<T extends keyof NutritionOrder__lookups>(type: T, props: NutritionOrder__lookups[T]);;

type NutritionProduct_NutritionProduct_Props = {
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
     * active | inactive | entered-in-error
     *  */
    status: string;
    /**
     * A category or class of the nutrition product (halal, kosher, gluten free, vegan, etc)
     *  */
    category: CodeableConcept;
    /**
     * A code designating a specific type of nutritional product
     *  */
    code: CodeableConcept;
    /**
     * Manufacturer, representative or officially responsible for the product
     *  */
    manufacturer: Reference;
    /**
     * The product's nutritional information expressed by the nutrients
     *  */
    nutrient: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The (relevant) nutrients in the product
         *  */
        item: CodeableReference;
        /**
         * The amount of nutrient expressed in one or more units: X per pack / per serving / per dose
         *  */
        amount: Ratio;
    };
    /**
     * Ingredients contained in this product
     *  */
    ingredient: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The ingredient contained in the product
         *  */
        item: CodeableReference;
        /**
         * The amount of ingredient that is in the product
         *  */
        amount: Ratio;
    };
    /**
     * Known or suspected allergens that are a part of this product
     *  */
    knownAllergen: CodeableReference;
    /**
     * Specifies descriptive properties of the nutrition product
     *  */
    productCharacteristic: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Code specifying the type of characteristic
         *  */
        type: CodeableConcept;
        /**
         * The value of the characteristic
         *  */
        value: CodeableConcept;
    };
    /**
     * One or several physical instances or occurrences of the nutrition product
     *  */
    instance: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The amount of items or instances
         *  */
        quantity: Quantity;
        /**
         * The identifier for the physical instance, typically a serial number
         *  */
        identifier: Identifier;
        /**
         * The identification of the batch or lot of the product
         *  */
        lotNumber: string;
        /**
         * The expiry date or date and time for the product
         *  */
        expiry: string;
        /**
         * The date until which the product is expected to be good for consumption
         *  */
        useBy: string;
    };
    /**
     * Comments made about the product
     *  */
    note: Annotation;
};

type NutritionProduct__lookups = {
    "NutritionProduct": NutritionProduct_NutritionProduct_Props;
};

export declare function nutritionProduct(props: NutritionProduct_NutritionProduct_Props);;

export declare function nutritionProduct<T extends keyof NutritionProduct__lookups>(type: T, props: NutritionProduct__lookups[T]);;

type Observation_Observation_Props = {
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
     * Business Identifier for observation
     *  */
    identifier: Identifier;
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Classification of  type of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: CodeableConcept;
    /**
     * Who and/or what the observation is about
     *  */
    subject: Reference;
    /**
     * What the observation is about, when it is not about the subject of record
     *  */
    focus: Reference;
    /**
     * Healthcare event during which this observation is made
     *  */
    encounter: Reference;
    /**
     * Clinically relevant time/time-period for observation
     *  */
    effective: string;
    /**
     * Date/Time this version was made available
     *  */
    issued: string;
    /**
     * Who is responsible for the observation
     *  */
    performer: Reference;
    /**
     * Actual result
     *  */
    value: Quantity;
    /**
     * Why the result is missing
     *  */
    dataAbsentReason: CodeableConcept;
    /**
     * High, low, normal, etc.
     *  */
    interpretation: CodeableConcept;
    /**
     * Comments about the observation
     *  */
    note: Annotation;
    /**
     * Observed body part
     *  */
    bodySite: CodeableConcept;
    /**
     * How it was done
     *  */
    method: CodeableConcept;
    /**
     * Specimen used for this observation
     *  */
    specimen: Reference;
    /**
     * (Measurement) Device
     *  */
    device: Reference;
    /**
     * Provides guide for interpretation
     *  */
    referenceRange: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Low Range, if relevant
         *  */
        low: Quantity;
        /**
         * High Range, if relevant
         *  */
        high: Quantity;
        /**
         * Reference range qualifier
         *  */
        type: CodeableConcept;
        /**
         * Reference range population
         *  */
        appliesTo: CodeableConcept;
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Text based reference range in an observation
         *  */
        text: string;
    };
    /**
     * Related resource that belongs to the Observation group
     *  */
    hasMember: Reference;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * Component results
     *  */
    component: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of component observation (code / type)
         *  */
        code: CodeableConcept;
        /**
         * Actual component result
         *  */
        value: Quantity;
        /**
         * Why the component result is missing
         *  */
        dataAbsentReason: CodeableConcept;
        /**
         * High, low, normal, etc.
         *  */
        interpretation: CodeableConcept;
    };
};

type Observation__lookups = {
    "Observation": Observation_Observation_Props;
};

export declare function observation(props: Observation_Observation_Props);;

export declare function observation<T extends keyof Observation__lookups>(type: T, props: Observation__lookups[T]);;

type ObservationDefinition_ObservationDefinition_Props = {
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
     * Category of observation
     *  */
    category: CodeableConcept;
    /**
     * Type of observation (code / type)
     *  */
    code: CodeableConcept;
    /**
     * Business identifier for this ObservationDefinition instance
     *  */
    identifier: Identifier;
    /**
     * Quantity | CodeableConcept | string | boolean | integer | Range | Ratio | SampledData | time | dateTime | Period
     *  */
    permittedDataType: string;
    /**
     * Multiple results allowed
     *  */
    multipleResultsAllowed: boolean;
    /**
     * Method used to produce the observation
     *  */
    method: CodeableConcept;
    /**
     * Preferred report name
     *  */
    preferredReportName: string;
    /**
     * Characteristics of quantitative results
     *  */
    quantitativeDetails: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Customary unit for quantitative results
         *  */
        customaryUnit: CodeableConcept;
        /**
         * SI unit for quantitative results
         *  */
        unit: CodeableConcept;
        /**
         * SI to Customary unit conversion factor
         *  */
        conversionFactor: number;
        /**
         * Decimal precision of observation quantitative results
         *  */
        decimalPrecision: number;
    };
    /**
     * Qualified range for continuous and ordinal observation results
     *  */
    qualifiedInterval: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * reference | critical | absolute
         *  */
        category: string;
        /**
         * The interval itself, for continuous or ordinal observations
         *  */
        range: Range;
        /**
         * Range context qualifier
         *  */
        context: CodeableConcept;
        /**
         * Targetted population of the range
         *  */
        appliesTo: CodeableConcept;
        /**
         * male | female | other | unknown
         *  */
        gender: string;
        /**
         * Applicable age range, if relevant
         *  */
        age: Range;
        /**
         * Applicable gestational age range, if relevant
         *  */
        gestationalAge: Range;
        /**
         * Condition associated with the reference range
         *  */
        condition: string;
    };
    /**
     * Value set of valid coded values for the observations conforming to this ObservationDefinition
     *  */
    validCodedValueSet: Reference;
    /**
     * Value set of normal coded values for the observations conforming to this ObservationDefinition
     *  */
    normalCodedValueSet: Reference;
    /**
     * Value set of abnormal coded values for the observations conforming to this ObservationDefinition
     *  */
    abnormalCodedValueSet: Reference;
    /**
     * Value set of critical coded values for the observations conforming to this ObservationDefinition
     *  */
    criticalCodedValueSet: Reference;
};

type ObservationDefinition__lookups = {
    "ObservationDefinition": ObservationDefinition_ObservationDefinition_Props;
};

export declare function observationDefinition(props: ObservationDefinition_ObservationDefinition_Props);;

export declare function observationDefinition<T extends keyof ObservationDefinition__lookups>(type: T, props: ObservationDefinition__lookups[T]);;

type OperationDefinition_OperationDefinition_Props = {
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
     * Canonical identifier for this operation definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Business version of the operation definition
     *  */
    version: string;
    /**
     * Name for this operation definition (computer friendly)
     *  */
    name: string;
    /**
     * Name for this operation definition (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * operation | query
     *  */
    kind: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the operation definition
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for operation definition (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this operation definition is defined
     *  */
    purpose: markdown;
    /**
     * Whether content is changed by the operation
     *  */
    affectsState: boolean;
    /**
     * Name used to invoke the operation
     *  */
    code: string;
    /**
     * Additional information about use
     *  */
    comment: markdown;
    /**
     * Marks this as a profile of the base
     *  */
    base: any;
    /**
     * Types this operation applies to
     *  */
    resource: string;
    /**
     * Invoke at the system level?
     *  */
    system: boolean;
    /**
     * Invoke at the type level?
     *  */
    type: boolean;
    /**
     * Invoke on an instance?
     *  */
    instance: boolean;
    /**
     * Validation information for in parameters
     *  */
    inputProfile: any;
    /**
     * Validation information for out parameters
     *  */
    outputProfile: any;
    /**
     * Parameters for the operation/query
     *  */
    parameter: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Name in Parameters.parameter.name or in URL
         *  */
        name: string;
        /**
         * in | out
         *  */
        use: string;
        /**
         * Minimum Cardinality
         *  */
        min: number;
        /**
         * Maximum Cardinality (a number or *)
         *  */
        max: string;
        /**
         * Description of meaning/use
         *  */
        documentation: string;
        /**
         * What type this parameter has
         *  */
        type: string;
        /**
         * If type is Reference | canonical, allowed targets
         *  */
        targetProfile: any;
        /**
         * number | date | string | token | reference | composite | quantity | uri | special
         *  */
        searchType: string;
        /**
         * Source of value set
         *  */
        binding: any;
        /**
         * Element id of reference
         *  */
        referencedFrom: string;
    };
    /**
     * Define overloaded variants for when  generating code
     *  */
    overload: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Name of parameter to include in overload
         *  */
        parameterName: string;
        /**
         * Comments to go on overload
         *  */
        comment: string;
    };
};

type OperationDefinition__lookups = {
    "OperationDefinition": OperationDefinition_OperationDefinition_Props;
};

export declare function operationDefinition(props: OperationDefinition_OperationDefinition_Props);;

export declare function operationDefinition<T extends keyof OperationDefinition__lookups>(type: T, props: OperationDefinition__lookups[T]);;

type OperationOutcome_OperationOutcome_Props = {
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
     * A single issue associated with the action
     *  */
    issue: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * fatal | error | warning | information
         *  */
        severity: string;
        /**
         * Error or warning code
         *  */
        code: string;
        /**
         * Additional details about the error
         *  */
        details: CodeableConcept;
        /**
         * Additional diagnostic information about the issue
         *  */
        diagnostics: string;
        /**
         * Deprecated: Path of element(s) related to issue
         *  */
        location: string;
        /**
         * FHIRPath of element(s) related to issue
         *  */
        expression: string;
    };
};

type OperationOutcome__lookups = {
    "OperationOutcome": OperationOutcome_OperationOutcome_Props;
};

export declare function operationOutcome(props: OperationOutcome_OperationOutcome_Props);;

export declare function operationOutcome<T extends keyof OperationOutcome__lookups>(type: T, props: OperationOutcome__lookups[T]);;

type Organization_Organization_Props = {
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
     * Identifies this organization  across multiple systems
     *  */
    identifier: Identifier;
    /**
     * Whether the organization's record is still in active use
     *  */
    active: boolean;
    /**
     * Kind of organization
     *  */
    type: CodeableConcept;
    /**
     * Name used for the organization
     *  */
    name: string;
    /**
     * A list of alternate names that the organization is known as, or was known as in the past
     *  */
    alias: string;
    /**
     * A contact detail for the organization
     *  */
    telecom: ContactPoint;
    /**
     * An address for the organization
     *  */
    address: Address;
    /**
     * The organization of which this organization forms a part
     *  */
    partOf: Reference;
    /**
     * Contact for the organization for a certain purpose
     *  */
    contact: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The type of contact
         *  */
        purpose: CodeableConcept;
        /**
         * A name associated with the contact
         *  */
        name: HumanName;
        /**
         * Contact details (telephone, email, etc.)  for a contact
         *  */
        telecom: ContactPoint;
        /**
         * Visiting or postal addresses for the contact
         *  */
        address: Address;
    };
    /**
     * Technical endpoints providing access to services operated for the organization
     *  */
    endpoint: Reference;
};

type Organization__lookups = {
    "Organization": Organization_Organization_Props;
};

export declare function organization(props: Organization_Organization_Props);;

export declare function organization<T extends keyof Organization__lookups>(type: T, props: Organization__lookups[T]);;

type OrganizationAffiliation_OrganizationAffiliation_Props = {
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
     * Business identifiers that are specific to this role
     *  */
    identifier: Identifier;
    /**
     * Whether this organization affiliation record is in active use
     *  */
    active: boolean;
    /**
     * The period during which the participatingOrganization is affiliated with the primary organization
     *  */
    period: Period;
    /**
     * Organization where the role is available
     *  */
    organization: Reference;
    /**
     * Organization that provides/performs the role (e.g. providing services or is a member of)
     *  */
    participatingOrganization: Reference;
    /**
     * Health insurance provider network in which the participatingOrganization provides the role's services (if defined) at the indicated locations (if defined)
     *  */
    network: Reference;
    /**
     * Definition of the role the participatingOrganization plays
     *  */
    code: CodeableConcept;
    /**
     * Specific specialty of the participatingOrganization in the context of the role
     *  */
    specialty: CodeableConcept;
    /**
     * The location(s) at which the role occurs
     *  */
    location: Reference;
    /**
     * Healthcare services provided through the role
     *  */
    healthcareService: Reference;
    /**
     * Contact details at the participatingOrganization relevant to this Affiliation
     *  */
    telecom: ContactPoint;
    /**
     * Technical endpoints providing access to services operated for this role
     *  */
    endpoint: Reference;
};

type OrganizationAffiliation__lookups = {
    "OrganizationAffiliation": OrganizationAffiliation_OrganizationAffiliation_Props;
};

export declare function organizationAffiliation(props: OrganizationAffiliation_OrganizationAffiliation_Props);;

export declare function organizationAffiliation<T extends keyof OrganizationAffiliation__lookups>(type: T, props: OrganizationAffiliation__lookups[T]);;

type PackagedProductDefinition_PackagedProductDefinition_Props = {
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
     * A unique identifier for this package as whole
     *  */
    identifier: Identifier;
    /**
     * A name for this package. Typically as listed in a drug formulary, catalogue, inventory etc
     *  */
    name: string;
    /**
     * A high level category e.g. medicinal product, raw material, shipping container etc
     *  */
    type: CodeableConcept;
    /**
     * The product that this is a pack for
     *  */
    packageFor: Reference;
    /**
     * The status within the lifecycle of this item. High level - not intended to duplicate details elsewhere e.g. legal status, or authorization/marketing status
     *  */
    status: CodeableConcept;
    /**
     * The date at which the given status became applicable
     *  */
    statusDate: string;
    /**
     * A total of the complete count of contained items of a particular type/form, independent of sub-packaging or organization. This can be considered as the pack size
     *  */
    containedItemQuantity: Quantity;
    /**
     * Textual description. Note that this is not the name of the package or product
     *  */
    description: markdown;
    /**
     * The legal status of supply of the packaged item as classified by the regulator
     *  */
    legalStatusOfSupply: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The actual status of supply. In what situation this package type may be supplied for use
         *  */
        code: CodeableConcept;
        /**
         * The place where the legal status of supply applies
         *  */
        jurisdiction: CodeableConcept;
    };
    /**
     * Allows specifying that an item is on the market for sale, or that it is not available, and the dates and locations associated
     *  */
    marketingStatus: MarketingStatus;
    /**
     * Allows the key features to be recorded, such as "hospital pack", "nurse prescribable"
     *  */
    characteristic: CodeableConcept;
    /**
     * If the drug product is supplied with another item such as a diluent or adjuvant
     *  */
    copackagedIndicator: boolean;
    /**
     * Manufacturer of this package type (multiple means these are all possible manufacturers)
     *  */
    manufacturer: Reference;
    /**
     * A packaging item, as a container for medically related items, possibly with other packaging items within, or a packaging component, such as bottle cap
     *  */
    package: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * An identifier that is specific to this particular part of the packaging. Including possibly a Data Carrier Identifier
         *  */
        identifier: Identifier;
        /**
         * The physical type of the container of the items
         *  */
        type: CodeableConcept;
        /**
         * The quantity of this level of packaging in the package that contains it (with the outermost level being 1)
         *  */
        quantity: number;
        /**
         * Material type of the package item
         *  */
        material: CodeableConcept;
        /**
         * A possible alternate material for this part of the packaging, that is allowed to be used instead of the usual material
         *  */
        alternateMaterial: CodeableConcept;
        /**
         * Special precautions for storage, if any, can be specified using an appropriate controlled vocabulary. The controlled term and the controlled term identifier shall be specified
         *  */
        shelfLifeStorage: CodeableConcept;
        /**
         * Manufacturer of this package Item (multiple means these are all possible manufacturers)
         *  */
        manufacturer: Reference;
        /**
         * A value for the characteristic
         *  */
        property: CodeableConcept;
        /**
         * The number of this type of item within this packaging
         *  */
        containedItem: Quantity;
    };
};

type PackagedProductDefinition__lookups = {
    "PackagedProductDefinition": PackagedProductDefinition_PackagedProductDefinition_Props;
};

export declare function packagedProductDefinition(props: PackagedProductDefinition_PackagedProductDefinition_Props);;

export declare function packagedProductDefinition<T extends keyof PackagedProductDefinition__lookups>(type: T, props: PackagedProductDefinition__lookups[T]);;

type Parameters_Parameters_Props = {
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
     * Operation Parameter
     *  */
    parameter: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Name from the definition
         *  */
        name: string;
        /**
         * If parameter is a data type
         *  */
        value: base64Binary;
        /**
         * If parameter is a whole resource
         *  */
        resource: Resource;
    };
};

type Parameters__lookups = {
    "Parameters": Parameters_Parameters_Props;
};

export declare function parameters(props: Parameters_Parameters_Props);;

export declare function parameters<T extends keyof Parameters__lookups>(type: T, props: Parameters__lookups[T]);;

type Patient_Patient_Props = {
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
     * An identifier for this patient
     *  */
    identifier: Identifier;
    /**
     * Whether this patient's record is in active use
     *  */
    active: boolean;
    /**
     * A name associated with the patient
     *  */
    name: HumanName;
    /**
     * A contact detail for the individual
     *  */
    telecom: ContactPoint;
    /**
     * male | female | other | unknown
     *  */
    gender: string;
    /**
     * The date of birth for the individual
     *  */
    birthDate: string;
    /**
     * Indicates if the individual is deceased or not
     *  */
    deceased: boolean;
    /**
     * An address for the individual
     *  */
    address: Address;
    /**
     * Marital (civil) status of a patient
     *  */
    maritalStatus: CodeableConcept;
    /**
     * Whether patient is part of a multiple birth
     *  */
    multipleBirth: boolean;
    /**
     * Image of the patient
     *  */
    photo: Attachment;
    /**
     * A contact party (e.g. guardian, partner, friend) for the patient
     *  */
    contact: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The kind of relationship
         *  */
        relationship: CodeableConcept;
        /**
         * A name associated with the contact person
         *  */
        name: HumanName;
        /**
         * A contact detail for the person
         *  */
        telecom: ContactPoint;
        /**
         * Address for the contact person
         *  */
        address: Address;
        /**
         * male | female | other | unknown
         *  */
        gender: string;
        /**
         * Organization that is associated with the contact
         *  */
        organization: Reference;
        /**
         * The period during which this contact person or organization is valid to be contacted relating to this patient
         *  */
        period: Period;
    };
    /**
     * A language which may be used to communicate with the patient about his or her health
     *  */
    communication: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The language which can be used to communicate with the patient about his or her health
         *  */
        language: CodeableConcept;
        /**
         * Language preference indicator
         *  */
        preferred: boolean;
    };
    /**
     * Patient's nominated primary care provider
     *  */
    generalPractitioner: Reference;
    /**
     * Organization that is the custodian of the patient record
     *  */
    managingOrganization: Reference;
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
};

type Patient__lookups = {
    "Patient": Patient_Patient_Props;
};

export declare function patient(props: Patient_Patient_Props);;

export declare function patient<T extends keyof Patient__lookups>(type: T, props: Patient__lookups[T]);;

type PaymentNotice_PaymentNotice_Props = {
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
     * Business Identifier for the payment noctice
     *  */
    identifier: Identifier;
    /**
     * active | cancelled | draft | entered-in-error
     *  */
    status: string;
    /**
     * Request reference
     *  */
    request: Reference;
    /**
     * Response reference
     *  */
    response: Reference;
    /**
     * Creation date
     *  */
    created: string;
    /**
     * Responsible practitioner
     *  */
    provider: Reference;
    /**
     * Payment reference
     *  */
    payment: Reference;
    /**
     * Payment or clearing date
     *  */
    paymentDate: string;
    /**
     * Party being paid
     *  */
    payee: Reference;
    /**
     * Party being notified
     *  */
    recipient: Reference;
    /**
     * Monetary amount of the payment
     *  */
    amount: Money;
    /**
     * Issued or cleared Status of the payment
     *  */
    paymentStatus: CodeableConcept;
};

type PaymentNotice__lookups = {
    "PaymentNotice": PaymentNotice_PaymentNotice_Props;
};

export declare function paymentNotice(props: PaymentNotice_PaymentNotice_Props);;

export declare function paymentNotice<T extends keyof PaymentNotice__lookups>(type: T, props: PaymentNotice__lookups[T]);;

type PaymentReconciliation_PaymentReconciliation_Props = {
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
     * Business Identifier for a payment reconciliation
     *  */
    identifier: Identifier;
    /**
     * active | cancelled | draft | entered-in-error
     *  */
    status: string;
    /**
     * Period covered
     *  */
    period: Period;
    /**
     * Creation date
     *  */
    created: string;
    /**
     * Party generating payment
     *  */
    paymentIssuer: Reference;
    /**
     * Reference to requesting resource
     *  */
    request: Reference;
    /**
     * Responsible practitioner
     *  */
    requestor: Reference;
    /**
     * queued | complete | error | partial
     *  */
    outcome: string;
    /**
     * Disposition message
     *  */
    disposition: string;
    /**
     * When payment issued
     *  */
    paymentDate: string;
    /**
     * Total amount of Payment
     *  */
    paymentAmount: Money;
    /**
     * Business identifier for the payment
     *  */
    paymentIdentifier: Identifier;
    /**
     * Settlement particulars
     *  */
    detail: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Business identifier of the payment detail
         *  */
        identifier: Identifier;
        /**
         * Business identifier of the prior payment detail
         *  */
        predecessor: Identifier;
        /**
         * Category of payment
         *  */
        type: CodeableConcept;
        /**
         * Request giving rise to the payment
         *  */
        request: Reference;
        /**
         * Submitter of the request
         *  */
        submitter: Reference;
        /**
         * Response committing to a payment
         *  */
        response: Reference;
        /**
         * Date of commitment to pay
         *  */
        date: string;
        /**
         * Contact for the response
         *  */
        responsible: Reference;
        /**
         * Recipient of the payment
         *  */
        payee: Reference;
        /**
         * Amount allocated to this payable
         *  */
        amount: Money;
    };
    /**
     * Printed form identifier
     *  */
    formCode: CodeableConcept;
    /**
     * Note concerning processing
     *  */
    processNote: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * display | print | printoper
         *  */
        type: string;
        /**
         * Note explanatory text
         *  */
        text: string;
    };
};

type PaymentReconciliation__lookups = {
    "PaymentReconciliation": PaymentReconciliation_PaymentReconciliation_Props;
};

export declare function paymentReconciliation(props: PaymentReconciliation_PaymentReconciliation_Props);;

export declare function paymentReconciliation<T extends keyof PaymentReconciliation__lookups>(type: T, props: PaymentReconciliation__lookups[T]);;

type Person_Person_Props = {
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
     * A human identifier for this person
     *  */
    identifier: Identifier;
    /**
     * A name associated with the person
     *  */
    name: HumanName;
    /**
     * A contact detail for the person
     *  */
    telecom: ContactPoint;
    /**
     * male | female | other | unknown
     *  */
    gender: string;
    /**
     * The date on which the person was born
     *  */
    birthDate: string;
    /**
     * One or more addresses for the person
     *  */
    address: Address;
    /**
     * Image of the person
     *  */
    photo: Attachment;
    /**
     * The organization that is the custodian of the person record
     *  */
    managingOrganization: Reference;
    /**
     * This person's record is in active use
     *  */
    active: boolean;
    /**
     * Link to a resource that concerns the same actual person
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
         * The resource to which this actual person is associated
         *  */
        target: Reference;
        /**
         * level1 | level2 | level3 | level4
         *  */
        assurance: string;
    };
};

type Person__lookups = {
    "Person": Person_Person_Props;
};

export declare function person(props: Person_Person_Props);;

export declare function person<T extends keyof Person__lookups>(type: T, props: Person__lookups[T]);;

type PlanDefinition_PlanDefinition_Props = {
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
     * Canonical identifier for this plan definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the plan definition
     *  */
    identifier: Identifier;
    /**
     * Business version of the plan definition
     *  */
    version: string;
    /**
     * Name for this plan definition (computer friendly)
     *  */
    name: string;
    /**
     * Name for this plan definition (human friendly)
     *  */
    title: string;
    /**
     * Subordinate title of the plan definition
     *  */
    subtitle: string;
    /**
     * order-set | clinical-protocol | eca-rule | workflow-definition
     *  */
    type: CodeableConcept;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Type of individual the plan definition is focused on
     *  */
    subject: CodeableConcept;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the plan definition
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for plan definition (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this plan definition is defined
     *  */
    purpose: markdown;
    /**
     * Describes the clinical usage of the plan
     *  */
    usage: string;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * When the plan definition was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the plan definition was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * When the plan definition is expected to be used
     *  */
    effectivePeriod: Period;
    /**
     * E.g. Education, Treatment, Assessment
     *  */
    topic: CodeableConcept;
    /**
     * Who authored the content
     *  */
    author: ContactDetail;
    /**
     * Who edited the content
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the content
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the content
     *  */
    endorser: ContactDetail;
    /**
     * Additional documentation, citations
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * Logic used by the plan definition
     *  */
    library: any;
    /**
     * What the plan is trying to accomplish
     *  */
    goal: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * E.g. Treatment, dietary, behavioral
         *  */
        category: CodeableConcept;
        /**
         * Code or text describing the goal
         *  */
        description: CodeableConcept;
        /**
         * high-priority | medium-priority | low-priority
         *  */
        priority: CodeableConcept;
        /**
         * When goal pursuit begins
         *  */
        start: CodeableConcept;
        /**
         * What does the goal address
         *  */
        addresses: CodeableConcept;
        /**
         * Supporting documentation for the goal
         *  */
        documentation: RelatedArtifact;
        /**
         * Reach goal within
         *  */
        target: Duration;
    };
    /**
     * Action defined by the plan
     *  */
    action: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * User-visible prefix for the action (e.g. 1. or A.)
         *  */
        prefix: string;
        /**
         * User-visible title
         *  */
        title: string;
        /**
         * Brief description of the action
         *  */
        description: string;
        /**
         * Static text equivalent of the action, used if the dynamic aspects cannot be interpreted by the receiving system
         *  */
        textEquivalent: string;
        /**
         * routine | urgent | asap | stat
         *  */
        priority: string;
        /**
         * Code representing the meaning of the action or sub-actions
         *  */
        code: CodeableConcept;
        /**
         * Why the action should be performed
         *  */
        reason: CodeableConcept;
        /**
         * Supporting documentation for the intended performer of the action
         *  */
        documentation: RelatedArtifact;
        /**
         * What goals this action supports
         *  */
        goalId: string;
        /**
         * Type of individual the action is focused on
         *  */
        subject: CodeableConcept;
        /**
         * When the action should be triggered
         *  */
        trigger: TriggerDefinition;
        /**
         * Boolean-valued expression
         *  */
        condition: Expression;
        /**
         * Input data requirements
         *  */
        input: DataRequirement;
        /**
         * Output data definition
         *  */
        output: DataRequirement;
        /**
         * Time offset for the relationship
         *  */
        relatedAction: Duration;
        /**
         * When the action should take place
         *  */
        timing: string;
        /**
         * E.g. Nurse, Surgeon, Parent
         *  */
        participant: CodeableConcept;
        /**
         * create | update | remove | fire-event
         *  */
        type: CodeableConcept;
        /**
         * visual-group | logical-group | sentence-group
         *  */
        groupingBehavior: string;
        /**
         * any | all | all-or-none | exactly-one | at-most-one | one-or-more
         *  */
        selectionBehavior: string;
        /**
         * must | could | must-unless-documented
         *  */
        requiredBehavior: string;
        /**
         * yes | no
         *  */
        precheckBehavior: string;
        /**
         * single | multiple
         *  */
        cardinalityBehavior: string;
        /**
         * Description of the activity to be performed
         *  */
        definition: any;
        /**
         * Transform to apply the template
         *  */
        transform: any;
        /**
         * An expression that provides the dynamic value for the customization
         *  */
        dynamicValue: Expression;
    };
};

type PlanDefinition__lookups = {
    "PlanDefinition": PlanDefinition_PlanDefinition_Props;
};

export declare function planDefinition(props: PlanDefinition_PlanDefinition_Props);;

export declare function planDefinition<T extends keyof PlanDefinition__lookups>(type: T, props: PlanDefinition__lookups[T]);;

type Practitioner_Practitioner_Props = {
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
     * An identifier for the person as this agent
     *  */
    identifier: Identifier;
    /**
     * Whether this practitioner's record is in active use
     *  */
    active: boolean;
    /**
     * The name(s) associated with the practitioner
     *  */
    name: HumanName;
    /**
     * A contact detail for the practitioner (that apply to all roles)
     *  */
    telecom: ContactPoint;
    /**
     * Address(es) of the practitioner that are not role specific (typically home address)
     *  */
    address: Address;
    /**
     * male | female | other | unknown
     *  */
    gender: string;
    /**
     * The date  on which the practitioner was born
     *  */
    birthDate: string;
    /**
     * Image of the person
     *  */
    photo: Attachment;
    /**
     * Certification, licenses, or training pertaining to the provision of care
     *  */
    qualification: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * An identifier for this qualification for the practitioner
         *  */
        identifier: Identifier;
        /**
         * Coded representation of the qualification
         *  */
        code: CodeableConcept;
        /**
         * Period during which the qualification is valid
         *  */
        period: Period;
        /**
         * Organization that regulates and issues the qualification
         *  */
        issuer: Reference;
    };
    /**
     * A language the practitioner can use in patient communication
     *  */
    communication: CodeableConcept;
};

type Practitioner__lookups = {
    "Practitioner": Practitioner_Practitioner_Props;
};

export declare function practitioner(props: Practitioner_Practitioner_Props);;

export declare function practitioner<T extends keyof Practitioner__lookups>(type: T, props: Practitioner__lookups[T]);;

type PractitionerRole_PractitionerRole_Props = {
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
     * Business Identifiers that are specific to a role/location
     *  */
    identifier: Identifier;
    /**
     * Whether this practitioner role record is in active use
     *  */
    active: boolean;
    /**
     * The period during which the practitioner is authorized to perform in these role(s)
     *  */
    period: Period;
    /**
     * Practitioner that is able to provide the defined services for the organization
     *  */
    practitioner: Reference;
    /**
     * Organization where the roles are available
     *  */
    organization: Reference;
    /**
     * Roles which this practitioner may perform
     *  */
    code: CodeableConcept;
    /**
     * Specific specialty of the practitioner
     *  */
    specialty: CodeableConcept;
    /**
     * The location(s) at which this practitioner provides care
     *  */
    location: Reference;
    /**
     * The list of healthcare services that this worker provides for this role's Organization/Location(s)
     *  */
    healthcareService: Reference;
    /**
     * Contact details that are specific to the role/location/service
     *  */
    telecom: ContactPoint;
    /**
     * Times the Service Site is available
     *  */
    availableTime: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * mon | tue | wed | thu | fri | sat | sun
         *  */
        daysOfWeek: string;
        /**
         * Always available? e.g. 24 hour service
         *  */
        allDay: boolean;
        /**
         * Opening time of day (ignored if allDay = true)
         *  */
        availableStartTime: time;
        /**
         * Closing time of day (ignored if allDay = true)
         *  */
        availableEndTime: time;
    };
    /**
     * Not available during this time due to provided reason
     *  */
    notAvailable: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Reason presented to the user explaining why time not available
         *  */
        description: string;
        /**
         * Service not available from this date
         *  */
        during: Period;
    };
    /**
     * Description of availability exceptions
     *  */
    availabilityExceptions: string;
    /**
     * Technical endpoints providing access to services operated for the practitioner with this role
     *  */
    endpoint: Reference;
};

type PractitionerRole__lookups = {
    "PractitionerRole": PractitionerRole_PractitionerRole_Props;
};

export declare function practitionerRole(props: PractitionerRole_PractitionerRole_Props);;

export declare function practitionerRole<T extends keyof PractitionerRole__lookups>(type: T, props: PractitionerRole__lookups[T]);;

type Procedure_Procedure_Props = {
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
     * External Identifiers for this procedure
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: any;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * A request for this procedure
     *  */
    basedOn: Reference;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * Classification of the procedure
     *  */
    category: CodeableConcept;
    /**
     * Identification of the procedure
     *  */
    code: CodeableConcept;
    /**
     * Who the procedure was performed on
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * When the procedure was performed
     *  */
    performed: string;
    /**
     * Who recorded the procedure
     *  */
    recorder: Reference;
    /**
     * Person who asserts this procedure
     *  */
    asserter: Reference;
    /**
     * The people who performed the procedure
     *  */
    performer: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Type of performance
         *  */
        function: CodeableConcept;
        /**
         * The reference to the practitioner
         *  */
        actor: Reference;
        /**
         * Organization the device or practitioner was acting for
         *  */
        onBehalfOf: Reference;
    };
    /**
     * Where the procedure happened
     *  */
    location: Reference;
    /**
     * Coded reason procedure performed
     *  */
    reasonCode: CodeableConcept;
    /**
     * The justification that the procedure was performed
     *  */
    reasonReference: Reference;
    /**
     * Target body sites
     *  */
    bodySite: CodeableConcept;
    /**
     * The result of procedure
     *  */
    outcome: CodeableConcept;
    /**
     * Any report resulting from the procedure
     *  */
    report: Reference;
    /**
     * Complication following the procedure
     *  */
    complication: CodeableConcept;
    /**
     * A condition that is a result of the procedure
     *  */
    complicationDetail: Reference;
    /**
     * Instructions for follow up
     *  */
    followUp: CodeableConcept;
    /**
     * Additional information about the procedure
     *  */
    note: Annotation;
    /**
     * Manipulated, implanted, or removed device
     *  */
    focalDevice: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Kind of change to device
         *  */
        action: CodeableConcept;
        /**
         * Device that was changed
         *  */
        manipulated: Reference;
    };
    /**
     * Items used during procedure
     *  */
    usedReference: Reference;
    /**
     * Coded items used during the procedure
     *  */
    usedCode: CodeableConcept;
};

type Procedure__lookups = {
    "Procedure": Procedure_Procedure_Props;
};

export declare function procedure(props: Procedure_Procedure_Props);;

export declare function procedure<T extends keyof Procedure__lookups>(type: T, props: Procedure__lookups[T]);;

type Provenance_Provenance_Props = {
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
     * Target Reference(s) (usually version specific)
     *  */
    target: Reference;
    /**
     * When the activity occurred
     *  */
    occurred: Period;
    /**
     * When the activity was recorded / updated
     *  */
    recorded: string;
    /**
     * Policy or plan the activity was defined by
     *  */
    policy: string;
    /**
     * Where the activity occurred, if relevant
     *  */
    location: Reference;
    /**
     * Reason the activity is occurring
     *  */
    reason: CodeableConcept;
    /**
     * Activity that occurred
     *  */
    activity: CodeableConcept;
    /**
     * Actor involved
     *  */
    agent: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * How the agent participated
         *  */
        type: CodeableConcept;
        /**
         * What the agents role was
         *  */
        role: CodeableConcept;
        /**
         * Who participated
         *  */
        who: Reference;
        /**
         * Who the agent is representing
         *  */
        onBehalfOf: Reference;
    };
    /**
     * An entity used in this activity
     *  */
    entity: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * derivation | revision | quotation | source | removal
         *  */
        role: string;
        /**
         * Identity of entity
         *  */
        what: Reference;
    };
    /**
     * Signature on target
     *  */
    signature: Signature;
};

type Provenance__lookups = {
    "Provenance": Provenance_Provenance_Props;
};

export declare function provenance(props: Provenance_Provenance_Props);;

export declare function provenance<T extends keyof Provenance__lookups>(type: T, props: Provenance__lookups[T]);;

type Questionnaire_Questionnaire_Props = {
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
     * Canonical identifier for this questionnaire, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the questionnaire
     *  */
    identifier: Identifier;
    /**
     * Business version of the questionnaire
     *  */
    version: string;
    /**
     * Name for this questionnaire (computer friendly)
     *  */
    name: string;
    /**
     * Name for this questionnaire (human friendly)
     *  */
    title: string;
    /**
     * Instantiates protocol or definition
     *  */
    derivedFrom: any;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Resource that can be subject of QuestionnaireResponse
     *  */
    subjectType: string;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the questionnaire
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for questionnaire (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this questionnaire is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * When the questionnaire was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the questionnaire was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * When the questionnaire is expected to be used
     *  */
    effectivePeriod: Period;
    /**
     * Concept that represents the overall questionnaire
     *  */
    code: Coding;
    /**
     * Questions and sections within the Questionnaire
     *  */
    item: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Unique id for item in questionnaire
         *  */
        linkId: string;
        /**
         * ElementDefinition - details for the item
         *  */
        definition: string;
        /**
         * Corresponding concept for this item in a terminology
         *  */
        code: Coding;
        /**
         * E.g. "1(a)", "2.5.3"
         *  */
        prefix: string;
        /**
         * Primary text for the item
         *  */
        text: string;
        /**
         * group | display | boolean | decimal | integer | date | dateTime +
         *  */
        type: string;
        /**
         * Value for question comparison based on operator
         *  */
        enableWhen: boolean;
        /**
         * all | any
         *  */
        enableBehavior: string;
        /**
         * Whether the item must be included in data results
         *  */
        required: boolean;
        /**
         * Whether the item may repeat
         *  */
        repeats: boolean;
        /**
         * Don't allow human editing
         *  */
        readOnly: boolean;
        /**
         * No more than this many characters
         *  */
        maxLength: number;
        /**
         * Valueset containing permitted answers
         *  */
        answerValueSet: any;
        /**
         * Whether option is selected by default
         *  */
        answerOption: boolean;
        /**
         * Actual value for initializing the question
         *  */
        initial: boolean;
    };
};

type Questionnaire__lookups = {
    "Questionnaire": Questionnaire_Questionnaire_Props;
};

export declare function questionnaire(props: Questionnaire_Questionnaire_Props);;

export declare function questionnaire<T extends keyof Questionnaire__lookups>(type: T, props: Questionnaire__lookups[T]);;

type QuestionnaireResponse_QuestionnaireResponse_Props = {
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
     * Unique id for this set of answers
     *  */
    identifier: Identifier;
    /**
     * Request fulfilled by this QuestionnaireResponse
     *  */
    basedOn: Reference;
    /**
     * Part of this action
     *  */
    partOf: Reference;
    /**
     * Form being answered
     *  */
    questionnaire: any;
    /**
     * in-progress | completed | amended | entered-in-error | stopped
     *  */
    status: string;
    /**
     * The subject of the questions
     *  */
    subject: Reference;
    /**
     * Encounter created as part of
     *  */
    encounter: Reference;
    /**
     * Date the answers were gathered
     *  */
    authored: string;
    /**
     * Person who received and recorded the answers
     *  */
    author: Reference;
    /**
     * The person who answered the questions
     *  */
    source: Reference;
    /**
     * Groups and questions
     *  */
    item: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Pointer to specific item from Questionnaire
         *  */
        linkId: string;
        /**
         * ElementDefinition - details for the item
         *  */
        definition: string;
        /**
         * Name for group or question text
         *  */
        text: string;
        /**
         * Single-valued answer to the question
         *  */
        answer: boolean;
    };
};

type QuestionnaireResponse__lookups = {
    "QuestionnaireResponse": QuestionnaireResponse_QuestionnaireResponse_Props;
};

export declare function questionnaireResponse(props: QuestionnaireResponse_QuestionnaireResponse_Props);;

export declare function questionnaireResponse<T extends keyof QuestionnaireResponse__lookups>(type: T, props: QuestionnaireResponse__lookups[T]);;

type RegulatedAuthorization_RegulatedAuthorization_Props = {
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
     * Business identifier for the authorization, typically assigned by the authorizing body
     *  */
    identifier: Identifier;
    /**
     * The product type, treatment, facility or activity that is being authorized
     *  */
    subject: Reference;
    /**
     * Overall type of this authorization, for example drug marketing approval, orphan drug designation
     *  */
    type: CodeableConcept;
    /**
     * General textual supporting information
     *  */
    description: markdown;
    /**
     * The territory in which the authorization has been granted
     *  */
    region: CodeableConcept;
    /**
     * The status that is authorised e.g. approved. Intermediate states can be tracked with cases and applications
     *  */
    status: CodeableConcept;
    /**
     * The date at which the current status was assigned
     *  */
    statusDate: string;
    /**
     * The time period in which the regulatory approval etc. is in effect, e.g. a Marketing Authorization includes the date of authorization and/or expiration date
     *  */
    validityPeriod: Period;
    /**
     * Condition for which the use of the regulated product applies
     *  */
    indication: CodeableReference;
    /**
     * The intended use of the product, e.g. prevention, treatment
     *  */
    intendedUse: CodeableConcept;
    /**
     * The legal/regulatory framework or reasons under which this authorization is granted
     *  */
    basis: CodeableConcept;
    /**
     * The organization that has been granted this authorization, by the regulator
     *  */
    holder: Reference;
    /**
     * The regulatory authority or authorizing body granting the authorization
     *  */
    regulator: Reference;
    /**
     * The case or regulatory procedure for granting or amending a regulated authorization. Note: This area is subject to ongoing review and the workgroup is seeking implementer feedback on its use (see link at bottom of page)
     *  */
    case: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Identifier by which this case can be referenced
         *  */
        identifier: Identifier;
        /**
         * The defining type of case
         *  */
        type: CodeableConcept;
        /**
         * The status associated with the case
         *  */
        status: CodeableConcept;
        /**
         * Relevant date for this case
         *  */
        date: Period;
    };
};

type RegulatedAuthorization__lookups = {
    "RegulatedAuthorization": RegulatedAuthorization_RegulatedAuthorization_Props;
};

export declare function regulatedAuthorization(props: RegulatedAuthorization_RegulatedAuthorization_Props);;

export declare function regulatedAuthorization<T extends keyof RegulatedAuthorization__lookups>(type: T, props: RegulatedAuthorization__lookups[T]);;

type RelatedPerson_RelatedPerson_Props = {
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
     * A human identifier for this person
     *  */
    identifier: Identifier;
    /**
     * Whether this related person's record is in active use
     *  */
    active: boolean;
    /**
     * The patient this person is related to
     *  */
    patient: Reference;
    /**
     * The nature of the relationship
     *  */
    relationship: CodeableConcept;
    /**
     * A name associated with the person
     *  */
    name: HumanName;
    /**
     * A contact detail for the person
     *  */
    telecom: ContactPoint;
    /**
     * male | female | other | unknown
     *  */
    gender: string;
    /**
     * The date on which the related person was born
     *  */
    birthDate: string;
    /**
     * Address where the related person can be contacted or visited
     *  */
    address: Address;
    /**
     * Image of the person
     *  */
    photo: Attachment;
    /**
     * Period of time that this relationship is considered valid
     *  */
    period: Period;
    /**
     * A language which may be used to communicate with about the patient's health
     *  */
    communication: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The language which can be used to communicate with the patient about his or her health
         *  */
        language: CodeableConcept;
        /**
         * Language preference indicator
         *  */
        preferred: boolean;
    };
};

type RelatedPerson__lookups = {
    "RelatedPerson": RelatedPerson_RelatedPerson_Props;
};

export declare function relatedPerson(props: RelatedPerson_RelatedPerson_Props);;

export declare function relatedPerson<T extends keyof RelatedPerson__lookups>(type: T, props: RelatedPerson__lookups[T]);;

type RequestGroup_RequestGroup_Props = {
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
     * Business identifier
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: any;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * Fulfills plan, proposal, or order
     *  */
    basedOn: Reference;
    /**
     * Request(s) replaced by this request
     *  */
    replaces: Reference;
    /**
     * Composite request this is part of
     *  */
    groupIdentifier: Identifier;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * What's being requested/ordered
     *  */
    code: CodeableConcept;
    /**
     * Who the request group is about
     *  */
    subject: Reference;
    /**
     * Created as part of
     *  */
    encounter: Reference;
    /**
     * When the request group was authored
     *  */
    authoredOn: string;
    /**
     * Device or practitioner that authored the request group
     *  */
    author: Reference;
    /**
     * Why the request group is needed
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why the request group is needed
     *  */
    reasonReference: Reference;
    /**
     * Additional notes about the response
     *  */
    note: Annotation;
    /**
     * Proposed actions, if any
     *  */
    action: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * User-visible prefix for the action (e.g. 1. or A.)
         *  */
        prefix: string;
        /**
         * User-visible title
         *  */
        title: string;
        /**
         * Short description of the action
         *  */
        description: string;
        /**
         * Static text equivalent of the action, used if the dynamic aspects cannot be interpreted by the receiving system
         *  */
        textEquivalent: string;
        /**
         * routine | urgent | asap | stat
         *  */
        priority: string;
        /**
         * Code representing the meaning of the action or sub-actions
         *  */
        code: CodeableConcept;
        /**
         * Supporting documentation for the intended performer of the action
         *  */
        documentation: RelatedArtifact;
        /**
         * Boolean-valued expression
         *  */
        condition: Expression;
        /**
         * Time offset for the relationship
         *  */
        relatedAction: Duration;
        /**
         * When the action should take place
         *  */
        timing: string;
        /**
         * Who should perform the action
         *  */
        participant: Reference;
        /**
         * create | update | remove | fire-event
         *  */
        type: CodeableConcept;
        /**
         * visual-group | logical-group | sentence-group
         *  */
        groupingBehavior: string;
        /**
         * any | all | all-or-none | exactly-one | at-most-one | one-or-more
         *  */
        selectionBehavior: string;
        /**
         * must | could | must-unless-documented
         *  */
        requiredBehavior: string;
        /**
         * yes | no
         *  */
        precheckBehavior: string;
        /**
         * single | multiple
         *  */
        cardinalityBehavior: string;
        /**
         * The target of the action
         *  */
        resource: Reference;
    };
};

type RequestGroup__lookups = {
    "RequestGroup": RequestGroup_RequestGroup_Props;
};

export declare function requestGroup(props: RequestGroup_RequestGroup_Props);;

export declare function requestGroup<T extends keyof RequestGroup__lookups>(type: T, props: RequestGroup__lookups[T]);;

type ResearchDefinition_ResearchDefinition_Props = {
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
     * Canonical identifier for this research definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the research definition
     *  */
    identifier: Identifier;
    /**
     * Business version of the research definition
     *  */
    version: string;
    /**
     * Name for this research definition (computer friendly)
     *  */
    name: string;
    /**
     * Name for this research definition (human friendly)
     *  */
    title: string;
    /**
     * Title for use in informal contexts
     *  */
    shortTitle: string;
    /**
     * Subordinate title of the ResearchDefinition
     *  */
    subtitle: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device
     *  */
    subject: CodeableConcept;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the research definition
     *  */
    description: markdown;
    /**
     * Used for footnotes or explanatory notes
     *  */
    comment: string;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for research definition (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this research definition is defined
     *  */
    purpose: markdown;
    /**
     * Describes the clinical usage of the ResearchDefinition
     *  */
    usage: string;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * When the research definition was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the research definition was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * When the research definition is expected to be used
     *  */
    effectivePeriod: Period;
    /**
     * The category of the ResearchDefinition, such as Education, Treatment, Assessment, etc.
     *  */
    topic: CodeableConcept;
    /**
     * Who authored the content
     *  */
    author: ContactDetail;
    /**
     * Who edited the content
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the content
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the content
     *  */
    endorser: ContactDetail;
    /**
     * Additional documentation, citations, etc.
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * Logic used by the ResearchDefinition
     *  */
    library: any;
    /**
     * What population?
     *  */
    population: Reference;
    /**
     * What exposure?
     *  */
    exposure: Reference;
    /**
     * What alternative exposure state?
     *  */
    exposureAlternative: Reference;
    /**
     * What outcome?
     *  */
    outcome: Reference;
};

type ResearchDefinition__lookups = {
    "ResearchDefinition": ResearchDefinition_ResearchDefinition_Props;
};

export declare function researchDefinition(props: ResearchDefinition_ResearchDefinition_Props);;

export declare function researchDefinition<T extends keyof ResearchDefinition__lookups>(type: T, props: ResearchDefinition__lookups[T]);;

type ResearchElementDefinition_ResearchElementDefinition_Props = {
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
     * Canonical identifier for this research element definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the research element definition
     *  */
    identifier: Identifier;
    /**
     * Business version of the research element definition
     *  */
    version: string;
    /**
     * Name for this research element definition (computer friendly)
     *  */
    name: string;
    /**
     * Name for this research element definition (human friendly)
     *  */
    title: string;
    /**
     * Title for use in informal contexts
     *  */
    shortTitle: string;
    /**
     * Subordinate title of the ResearchElementDefinition
     *  */
    subtitle: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device
     *  */
    subject: CodeableConcept;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the research element definition
     *  */
    description: markdown;
    /**
     * Used for footnotes or explanatory notes
     *  */
    comment: string;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for research element definition (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this research element definition is defined
     *  */
    purpose: markdown;
    /**
     * Describes the clinical usage of the ResearchElementDefinition
     *  */
    usage: string;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * When the research element definition was approved by publisher
     *  */
    approvalDate: string;
    /**
     * When the research element definition was last reviewed
     *  */
    lastReviewDate: string;
    /**
     * When the research element definition is expected to be used
     *  */
    effectivePeriod: Period;
    /**
     * The category of the ResearchElementDefinition, such as Education, Treatment, Assessment, etc.
     *  */
    topic: CodeableConcept;
    /**
     * Who authored the content
     *  */
    author: ContactDetail;
    /**
     * Who edited the content
     *  */
    editor: ContactDetail;
    /**
     * Who reviewed the content
     *  */
    reviewer: ContactDetail;
    /**
     * Who endorsed the content
     *  */
    endorser: ContactDetail;
    /**
     * Additional documentation, citations, etc.
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * Logic used by the ResearchElementDefinition
     *  */
    library: any;
    /**
     * population | exposure | outcome
     *  */
    type: string;
    /**
     * dichotomous | continuous | descriptive
     *  */
    variableType: string;
    /**
     * What defines the members of the research element
     *  */
    characteristic: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * What code or expression defines members?
         *  */
        definition: CodeableConcept;
        /**
         * What code/value pairs define members?
         *  */
        usageContext: UsageContext;
        /**
         * Whether the characteristic includes or excludes members
         *  */
        exclude: boolean;
        /**
         * What unit is the outcome described in?
         *  */
        unitOfMeasure: CodeableConcept;
        /**
         * What time period does the study cover
         *  */
        studyEffectiveDescription: string;
        /**
         * What time period does the study cover
         *  */
        studyEffective: string;
        /**
         * Observation time from study start
         *  */
        studyEffectiveTimeFromStart: Duration;
        /**
         * mean | median | mean-of-mean | mean-of-median | median-of-mean | median-of-median
         *  */
        studyEffectiveGroupMeasure: string;
        /**
         * What time period do participants cover
         *  */
        participantEffectiveDescription: string;
        /**
         * What time period do participants cover
         *  */
        participantEffective: string;
        /**
         * Observation time from study start
         *  */
        participantEffectiveTimeFromStart: Duration;
        /**
         * mean | median | mean-of-mean | mean-of-median | median-of-mean | median-of-median
         *  */
        participantEffectiveGroupMeasure: string;
    };
};

type ResearchElementDefinition__lookups = {
    "ResearchElementDefinition": ResearchElementDefinition_ResearchElementDefinition_Props;
};

export declare function researchElementDefinition(props: ResearchElementDefinition_ResearchElementDefinition_Props);;

export declare function researchElementDefinition<T extends keyof ResearchElementDefinition__lookups>(type: T, props: ResearchElementDefinition__lookups[T]);;

type ResearchStudy_ResearchStudy_Props = {
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
     * Business Identifier for study
     *  */
    identifier: Identifier;
    /**
     * Name for this study
     *  */
    title: string;
    /**
     * Steps followed in executing study
     *  */
    protocol: Reference;
    /**
     * Part of larger study
     *  */
    partOf: Reference;
    /**
     * active | administratively-completed | approved | closed-to-accrual | closed-to-accrual-and-intervention | completed | disapproved | in-review | temporarily-closed-to-accrual | temporarily-closed-to-accrual-and-intervention | withdrawn
     *  */
    status: string;
    /**
     * treatment | prevention | diagnostic | supportive-care | screening | health-services-research | basic-science | device-feasibility
     *  */
    primaryPurposeType: CodeableConcept;
    /**
     * n-a | early-phase-1 | phase-1 | phase-1-phase-2 | phase-2 | phase-2-phase-3 | phase-3 | phase-4
     *  */
    phase: CodeableConcept;
    /**
     * Classifications for the study
     *  */
    category: CodeableConcept;
    /**
     * Drugs, devices, etc. under study
     *  */
    focus: CodeableConcept;
    /**
     * Condition being studied
     *  */
    condition: CodeableConcept;
    /**
     * Contact details for the study
     *  */
    contact: ContactDetail;
    /**
     * References and dependencies
     *  */
    relatedArtifact: RelatedArtifact;
    /**
     * Used to search for the study
     *  */
    keyword: CodeableConcept;
    /**
     * Geographic region(s) for study
     *  */
    location: CodeableConcept;
    /**
     * What this is study doing
     *  */
    description: markdown;
    /**
     * Inclusion & exclusion criteria
     *  */
    enrollment: Reference;
    /**
     * When the study began and ended
     *  */
    period: Period;
    /**
     * Organization that initiates and is legally responsible for the study
     *  */
    sponsor: Reference;
    /**
     * Researcher who oversees multiple aspects of the study
     *  */
    principalInvestigator: Reference;
    /**
     * Facility where study activities are conducted
     *  */
    site: Reference;
    /**
     * accrual-goal-met | closed-due-to-toxicity | closed-due-to-lack-of-study-progress | temporarily-closed-per-study-design
     *  */
    reasonStopped: CodeableConcept;
    /**
     * Comments made about the study
     *  */
    note: Annotation;
    /**
     * Defined path through the study for a subject
     *  */
    arm: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Label for study arm
         *  */
        name: string;
        /**
         * Categorization of study arm
         *  */
        type: CodeableConcept;
        /**
         * Short explanation of study path
         *  */
        description: string;
    };
    /**
     * A goal for the study
     *  */
    objective: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Label for the objective
         *  */
        name: string;
        /**
         * primary | secondary | exploratory
         *  */
        type: CodeableConcept;
    };
};

type ResearchStudy__lookups = {
    "ResearchStudy": ResearchStudy_ResearchStudy_Props;
};

export declare function researchStudy(props: ResearchStudy_ResearchStudy_Props);;

export declare function researchStudy<T extends keyof ResearchStudy__lookups>(type: T, props: ResearchStudy__lookups[T]);;

type ResearchSubject_ResearchSubject_Props = {
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
     * Business Identifier for research subject in a study
     *  */
    identifier: Identifier;
    /**
     * candidate | eligible | follow-up | ineligible | not-registered | off-study | on-study | on-study-intervention | on-study-observation | pending-on-study | potential-candidate | screening | withdrawn
     *  */
    status: string;
    /**
     * Start and end of participation
     *  */
    period: Period;
    /**
     * Study subject is part of
     *  */
    study: Reference;
    /**
     * Who is part of study
     *  */
    individual: Reference;
    /**
     * What path should be followed
     *  */
    assignedArm: string;
    /**
     * What path was followed
     *  */
    actualArm: string;
    /**
     * Agreement to participate in study
     *  */
    consent: Reference;
};

type ResearchSubject__lookups = {
    "ResearchSubject": ResearchSubject_ResearchSubject_Props;
};

export declare function researchSubject(props: ResearchSubject_ResearchSubject_Props);;

export declare function researchSubject<T extends keyof ResearchSubject__lookups>(type: T, props: ResearchSubject__lookups[T]);;

type Resource_Resource_Props = {
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
};

type Resource__lookups = {
    "Resource": Resource_Resource_Props;
};

export declare function resource(props: Resource_Resource_Props);;

export declare function resource<T extends keyof Resource__lookups>(type: T, props: Resource__lookups[T]);;

type RiskAssessment_RiskAssessment_Props = {
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
     * Unique identifier for the assessment
     *  */
    identifier: Identifier;
    /**
     * Request fulfilled by this assessment
     *  */
    basedOn: Reference;
    /**
     * Part of this occurrence
     *  */
    parent: Reference;
    /**
     * registered | preliminary | final | amended +
     *  */
    status: string;
    /**
     * Evaluation mechanism
     *  */
    method: CodeableConcept;
    /**
     * Type of assessment
     *  */
    code: CodeableConcept;
    /**
     * Who/what does assessment apply to?
     *  */
    subject: Reference;
    /**
     * Where was assessment performed?
     *  */
    encounter: Reference;
    /**
     * When was assessment made?
     *  */
    occurrence: string;
    /**
     * Condition assessed
     *  */
    condition: Reference;
    /**
     * Who did assessment?
     *  */
    performer: Reference;
    /**
     * Why the assessment was necessary?
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why the assessment was necessary?
     *  */
    reasonReference: Reference;
    /**
     * Information used in assessment
     *  */
    basis: Reference;
    /**
     * Outcome predicted
     *  */
    prediction: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Possible outcome for the subject
         *  */
        outcome: CodeableConcept;
        /**
         * Likelihood of specified outcome
         *  */
        probability: number;
        /**
         * Likelihood of specified outcome as a qualitative value
         *  */
        qualitativeRisk: CodeableConcept;
        /**
         * Relative likelihood
         *  */
        relativeRisk: number;
        /**
         * Timeframe or age range
         *  */
        when: Period;
        /**
         * Explanation of prediction
         *  */
        rationale: string;
    };
    /**
     * How to reduce risk
     *  */
    mitigation: string;
    /**
     * Comments on the risk assessment
     *  */
    note: Annotation;
};

type RiskAssessment__lookups = {
    "RiskAssessment": RiskAssessment_RiskAssessment_Props;
};

export declare function riskAssessment(props: RiskAssessment_RiskAssessment_Props);;

export declare function riskAssessment<T extends keyof RiskAssessment__lookups>(type: T, props: RiskAssessment__lookups[T]);;

type Schedule_Schedule_Props = {
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
     * External Ids for this item
     *  */
    identifier: Identifier;
    /**
     * Whether this schedule is in active use
     *  */
    active: boolean;
    /**
     * High-level category
     *  */
    serviceCategory: CodeableConcept;
    /**
     * Specific service
     *  */
    serviceType: CodeableConcept;
    /**
     * Type of specialty needed
     *  */
    specialty: CodeableConcept;
    /**
     * Resource(s) that availability information is being provided for
     *  */
    actor: Reference;
    /**
     * Period of time covered by schedule
     *  */
    planningHorizon: Period;
    /**
     * Comments on availability
     *  */
    comment: string;
};

type Schedule__lookups = {
    "Schedule": Schedule_Schedule_Props;
};

export declare function schedule(props: Schedule_Schedule_Props);;

export declare function schedule<T extends keyof Schedule__lookups>(type: T, props: Schedule__lookups[T]);;

type SearchParameter_SearchParameter_Props = {
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
     * Canonical identifier for this search parameter, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Business version of the search parameter
     *  */
    version: string;
    /**
     * Name for this search parameter (computer friendly)
     *  */
    name: string;
    /**
     * Original definition for the search parameter
     *  */
    derivedFrom: any;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the search parameter
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for search parameter (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this search parameter is defined
     *  */
    purpose: markdown;
    /**
     * Code used in URL
     *  */
    code: string;
    /**
     * The resource type(s) this search parameter applies to
     *  */
    base: string;
    /**
     * number | date | string | token | reference | composite | quantity | uri | special
     *  */
    type: string;
    /**
     * FHIRPath expression that extracts the values
     *  */
    expression: string;
    /**
     * XPath that extracts the values
     *  */
    xpath: string;
    /**
     * normal | phonetic | nearby | distance | other
     *  */
    xpathUsage: string;
    /**
     * Types of resource (if a resource reference)
     *  */
    target: string;
    /**
     * Allow multiple values per parameter (or)
     *  */
    multipleOr: boolean;
    /**
     * Allow multiple parameters (and)
     *  */
    multipleAnd: boolean;
    /**
     * eq | ne | gt | lt | ge | le | sa | eb | ap
     *  */
    comparator: string;
    /**
     * missing | exact | contains | not | text | in | not-in | below | above | type | identifier | ofType
     *  */
    modifier: string;
    /**
     * Chained names supported
     *  */
    chain: string;
    /**
     * For Composite resources to define the parts
     *  */
    component: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Defines how the part works
         *  */
        definition: any;
        /**
         * Subexpression relative to main expression
         *  */
        expression: string;
    };
};

type SearchParameter__lookups = {
    "SearchParameter": SearchParameter_SearchParameter_Props;
};

export declare function searchParameter(props: SearchParameter_SearchParameter_Props);;

export declare function searchParameter<T extends keyof SearchParameter__lookups>(type: T, props: SearchParameter__lookups[T]);;

type ServiceRequest_ServiceRequest_Props = {
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
     * Identifiers assigned to this order
     *  */
    identifier: Identifier;
    /**
     * Instantiates FHIR protocol or definition
     *  */
    instantiatesCanonical: any;
    /**
     * Instantiates external protocol or definition
     *  */
    instantiatesUri: string;
    /**
     * What request fulfills
     *  */
    basedOn: Reference;
    /**
     * What request replaces
     *  */
    replaces: Reference;
    /**
     * Composite Request ID
     *  */
    requisition: Identifier;
    /**
     * draft | active | on-hold | revoked | completed | entered-in-error | unknown
     *  */
    status: string;
    /**
     * proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * Classification of service
     *  */
    category: CodeableConcept;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * True if service/procedure should not be performed
     *  */
    doNotPerform: boolean;
    /**
     * What is being requested/ordered
     *  */
    code: CodeableConcept;
    /**
     * Additional order information
     *  */
    orderDetail: CodeableConcept;
    /**
     * Service amount
     *  */
    quantity: Quantity;
    /**
     * Individual or Entity the service is ordered for
     *  */
    subject: Reference;
    /**
     * Encounter in which the request was created
     *  */
    encounter: Reference;
    /**
     * When service should occur
     *  */
    occurrence: string;
    /**
     * Preconditions for service
     *  */
    asNeeded: boolean;
    /**
     * Date request signed
     *  */
    authoredOn: string;
    /**
     * Who/what is requesting service
     *  */
    requester: Reference;
    /**
     * Performer role
     *  */
    performerType: CodeableConcept;
    /**
     * Requested performer
     *  */
    performer: Reference;
    /**
     * Requested location
     *  */
    locationCode: CodeableConcept;
    /**
     * Requested location
     *  */
    locationReference: Reference;
    /**
     * Explanation/Justification for procedure or service
     *  */
    reasonCode: CodeableConcept;
    /**
     * Explanation/Justification for service or service
     *  */
    reasonReference: Reference;
    /**
     * Associated insurance coverage
     *  */
    insurance: Reference;
    /**
     * Additional clinical information
     *  */
    supportingInfo: Reference;
    /**
     * Procedure Samples
     *  */
    specimen: Reference;
    /**
     * Location on Body
     *  */
    bodySite: CodeableConcept;
    /**
     * Comments
     *  */
    note: Annotation;
    /**
     * Patient or consumer-oriented instructions
     *  */
    patientInstruction: string;
    /**
     * Request provenance
     *  */
    relevantHistory: Reference;
};

type ServiceRequest__lookups = {
    "ServiceRequest": ServiceRequest_ServiceRequest_Props;
};

export declare function serviceRequest(props: ServiceRequest_ServiceRequest_Props);;

export declare function serviceRequest<T extends keyof ServiceRequest__lookups>(type: T, props: ServiceRequest__lookups[T]);;

type Slot_Slot_Props = {
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
     * External Ids for this item
     *  */
    identifier: Identifier;
    /**
     * A broad categorization of the service that is to be performed during this appointment
     *  */
    serviceCategory: CodeableConcept;
    /**
     * The type of appointments that can be booked into this slot (ideally this would be an identifiable service - which is at a location, rather than the location itself). If provided then this overrides the value provided on the availability resource
     *  */
    serviceType: CodeableConcept;
    /**
     * The specialty of a practitioner that would be required to perform the service requested in this appointment
     *  */
    specialty: CodeableConcept;
    /**
     * The style of appointment or patient that may be booked in the slot (not service type)
     *  */
    appointmentType: CodeableConcept;
    /**
     * The schedule resource that this slot defines an interval of status information
     *  */
    schedule: Reference;
    /**
     * busy | free | busy-unavailable | busy-tentative | entered-in-error
     *  */
    status: string;
    /**
     * Date/Time that the slot is to begin
     *  */
    start: string;
    /**
     * Date/Time that the slot is to conclude
     *  */
    end: string;
    /**
     * This slot has already been overbooked, appointments are unlikely to be accepted for this time
     *  */
    overbooked: boolean;
    /**
     * Comments on the slot to describe any extended information. Such as custom constraints on the slot
     *  */
    comment: string;
};

type Slot__lookups = {
    "Slot": Slot_Slot_Props;
};

export declare function slot(props: Slot_Slot_Props);;

export declare function slot<T extends keyof Slot__lookups>(type: T, props: Slot__lookups[T]);;

type Specimen_Specimen_Props = {
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
     * External Identifier
     *  */
    identifier: Identifier;
    /**
     * Identifier assigned by the lab
     *  */
    accessionIdentifier: Identifier;
    /**
     * available | unavailable | unsatisfactory | entered-in-error
     *  */
    status: string;
    /**
     * Kind of material that forms the specimen
     *  */
    type: CodeableConcept;
    /**
     * Where the specimen came from. This may be from patient(s), from a location (e.g., the source of an environmental sample), or a sampling of a substance or a device
     *  */
    subject: Reference;
    /**
     * The time when specimen was received for processing
     *  */
    receivedTime: string;
    /**
     * Specimen from which this specimen originated
     *  */
    parent: Reference;
    /**
     * Why the specimen was collected
     *  */
    request: Reference;
    /**
     * Collection details
     *  */
    collection: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Who collected the specimen
         *  */
        collector: Reference;
        /**
         * Collection time
         *  */
        collected: string;
        /**
         * How long it took to collect specimen
         *  */
        duration: Duration;
        /**
         * The quantity of specimen collected
         *  */
        quantity: Quantity;
        /**
         * Technique used to perform collection
         *  */
        method: CodeableConcept;
        /**
         * Anatomical collection site
         *  */
        bodySite: CodeableConcept;
        /**
         * Whether or how long patient abstained from food and/or drink
         *  */
        fastingStatus: CodeableConcept;
    };
    /**
     * Processing and processing step details
     *  */
    processing: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Textual description of procedure
         *  */
        description: string;
        /**
         * Indicates the treatment step  applied to the specimen
         *  */
        procedure: CodeableConcept;
        /**
         * Material used in the processing step
         *  */
        additive: Reference;
        /**
         * Date and time of specimen processing
         *  */
        time: string;
    };
    /**
     * Direct container of specimen (tube/slide, etc.)
     *  */
    container: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Id for the container
         *  */
        identifier: Identifier;
        /**
         * Textual description of the container
         *  */
        description: string;
        /**
         * Kind of container directly associated with specimen
         *  */
        type: CodeableConcept;
        /**
         * Container volume or size
         *  */
        capacity: Quantity;
        /**
         * Quantity of specimen within container
         *  */
        specimenQuantity: Quantity;
        /**
         * Additive associated with container
         *  */
        additive: CodeableConcept;
    };
    /**
     * State of the specimen
     *  */
    condition: CodeableConcept;
    /**
     * Comments
     *  */
    note: Annotation;
};

type Specimen__lookups = {
    "Specimen": Specimen_Specimen_Props;
};

export declare function specimen(props: Specimen_Specimen_Props);;

export declare function specimen<T extends keyof Specimen__lookups>(type: T, props: Specimen__lookups[T]);;

type SpecimenDefinition_SpecimenDefinition_Props = {
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
     * Business identifier of a kind of specimen
     *  */
    identifier: Identifier;
    /**
     * Kind of material to collect
     *  */
    typeCollected: CodeableConcept;
    /**
     * Patient preparation for collection
     *  */
    patientPreparation: CodeableConcept;
    /**
     * Time aspect for collection
     *  */
    timeAspect: string;
    /**
     * Specimen collection procedure
     *  */
    collection: CodeableConcept;
    /**
     * Specimen in container intended for testing by lab
     *  */
    typeTested: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Primary or secondary specimen
         *  */
        isDerived: boolean;
        /**
         * Type of intended specimen
         *  */
        type: CodeableConcept;
        /**
         * preferred | alternate
         *  */
        preference: string;
        /**
         * Specimen container preparation
         *  */
        container: string;
        /**
         * Specimen requirements
         *  */
        requirement: string;
        /**
         * Specimen retention time
         *  */
        retentionTime: Duration;
        /**
         * Rejection criterion
         *  */
        rejectionCriterion: CodeableConcept;
        /**
         * Preservation instruction
         *  */
        handling: string;
    };
};

type SpecimenDefinition__lookups = {
    "SpecimenDefinition": SpecimenDefinition_SpecimenDefinition_Props;
};

export declare function specimenDefinition(props: SpecimenDefinition_SpecimenDefinition_Props);;

export declare function specimenDefinition<T extends keyof SpecimenDefinition__lookups>(type: T, props: SpecimenDefinition__lookups[T]);;

type StructureDefinition_StructureDefinition_Props = {
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
     * Canonical identifier for this structure definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the structure definition
     *  */
    identifier: Identifier;
    /**
     * Business version of the structure definition
     *  */
    version: string;
    /**
     * Name for this structure definition (computer friendly)
     *  */
    name: string;
    /**
     * Name for this structure definition (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the structure definition
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for structure definition (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this structure definition is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * Assist with indexing and finding
     *  */
    keyword: Coding;
    /**
     * FHIR Version this StructureDefinition targets
     *  */
    fhirVersion: string;
    /**
     * External specification that the content is mapped to
     *  */
    mapping: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Internal id when this mapping is used
         *  */
        identity: string;
        /**
         * Identifies what this mapping refers to
         *  */
        uri: string;
        /**
         * Names what this mapping refers to
         *  */
        name: string;
        /**
         * Versions, Issues, Scope limitations etc.
         *  */
        comment: string;
    };
    /**
     * primitive-type | complex-type | resource | logical
     *  */
    kind: string;
    /**
     * Whether the structure is abstract
     *  */
    abstract: boolean;
    /**
     * If an extension, where it can be used in instances
     *  */
    context: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * fhirpath | element | extension
         *  */
        type: string;
        /**
         * Where the extension can be used in instances
         *  */
        expression: string;
    };
    /**
     * FHIRPath invariants - when the extension can be used
     *  */
    contextInvariant: string;
    /**
     * Type defined or constrained by this structure
     *  */
    type: string;
    /**
     * Definition that this type is constrained/specialized from
     *  */
    baseDefinition: any;
    /**
     * specialization | constraint - How relates to base definition
     *  */
    derivation: string;
    /**
     * Snapshot view of the structure
     *  */
    snapshot: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Definition of elements in the resource (if no StructureDefinition)
         *  */
        element: ElementDefinition;
    };
    /**
     * Differential view of the structure
     *  */
    differential: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Definition of elements in the resource (if no StructureDefinition)
         *  */
        element: ElementDefinition;
    };
};

type StructureDefinition__lookups = {
    "StructureDefinition": StructureDefinition_StructureDefinition_Props;
};

export declare function structureDefinition(props: StructureDefinition_StructureDefinition_Props);;

export declare function structureDefinition<T extends keyof StructureDefinition__lookups>(type: T, props: StructureDefinition__lookups[T]);;

type StructureMap_StructureMap_Props = {
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
     * Canonical identifier for this structure map, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the structure map
     *  */
    identifier: Identifier;
    /**
     * Business version of the structure map
     *  */
    version: string;
    /**
     * Name for this structure map (computer friendly)
     *  */
    name: string;
    /**
     * Name for this structure map (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the structure map
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for structure map (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this structure map is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * Structure Definition used by this map
     *  */
    structure: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Canonical reference to structure definition
         *  */
        url: any;
        /**
         * source | queried | target | produced
         *  */
        mode: string;
        /**
         * Name for type in this map
         *  */
        alias: string;
        /**
         * Documentation on use of structure
         *  */
        documentation: string;
    };
    /**
     * Other maps used by this map (canonical URLs)
     *  */
    import: any;
    /**
     * Named sections for reader convenience
     *  */
    group: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Human-readable label
         *  */
        name: string;
        /**
         * Another group that this group adds rules to
         *  */
        extends: string;
        /**
         * none | types | type-and-types
         *  */
        typeMode: string;
        /**
         * Additional description/explanation for group
         *  */
        documentation: string;
        /**
         * Documentation for this instance of data
         *  */
        input: string;
        /**
         * Documentation for this instance of data
         *  */
        rule: string;
    };
};

type StructureMap__lookups = {
    "StructureMap": StructureMap_StructureMap_Props;
};

export declare function structureMap(props: StructureMap_StructureMap_Props);;

export declare function structureMap<T extends keyof StructureMap__lookups>(type: T, props: StructureMap__lookups[T]);;

type Subscription_Subscription_Props = {
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
     * requested | active | error | off
     *  */
    status: string;
    /**
     * Contact details for source (e.g. troubleshooting)
     *  */
    contact: ContactPoint;
    /**
     * When to automatically delete the subscription
     *  */
    end: string;
    /**
     * Description of why this subscription was created
     *  */
    reason: string;
    /**
     * Rule for server push
     *  */
    criteria: string;
    /**
     * Latest error note
     *  */
    error: string;
    /**
     * The channel on which to report matches to the criteria
     *  */
    channel: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * rest-hook | websocket | email | sms | message
         *  */
        type: string;
        /**
         * Where the channel points to
         *  */
        endpoint: url;
        /**
         * MIME type to send, or omit for no payload
         *  */
        payload: string;
        /**
         * Usage depends on the channel type
         *  */
        header: string;
    };
};

type Subscription__lookups = {
    "Subscription": Subscription_Subscription_Props;
};

export declare function subscription(props: Subscription_Subscription_Props);;

export declare function subscription<T extends keyof Subscription__lookups>(type: T, props: Subscription__lookups[T]);;

type SubscriptionStatus_SubscriptionStatus_Props = {
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
     * requested | active | error | off | entered-in-error
     *  */
    status: string;
    /**
     * handshake | heartbeat | event-notification | query-status | query-event
     *  */
    type: string;
    /**
     * Events since the Subscription was created
     *  */
    eventsSinceSubscriptionStart: string;
    /**
     * Detailed information about any events relevant to this notification
     *  */
    notificationEvent: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Event number
         *  */
        eventNumber: string;
        /**
         * The instant this event occurred
         *  */
        timestamp: string;
        /**
         * The focus of this event
         *  */
        focus: Reference;
        /**
         * Additional context for this event
         *  */
        additionalContext: Reference;
    };
    /**
     * Reference to the Subscription responsible for this notification
     *  */
    subscription: Reference;
    /**
     * Reference to the SubscriptionTopic this notification relates to
     *  */
    topic: any;
    /**
     * List of errors on the subscription
     *  */
    error: CodeableConcept;
};

type SubscriptionStatus__lookups = {
    "SubscriptionStatus": SubscriptionStatus_SubscriptionStatus_Props;
};

export declare function subscriptionStatus(props: SubscriptionStatus_SubscriptionStatus_Props);;

export declare function subscriptionStatus<T extends keyof SubscriptionStatus__lookups>(type: T, props: SubscriptionStatus__lookups[T]);;

type SubscriptionTopic_SubscriptionTopic_Props = {
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
     * Canonical identifier for this subscription topic definition, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Business Identifier for this subscription topic
     *  */
    identifier: Identifier;
    /**
     * Business version of the subscription topic
     *  */
    version: string;
    /**
     * Name for this subscription topic (Human friendly)
     *  */
    title: string;
    /**
     * Based on FHIR protocol or definition
     *  */
    derivedFrom: any;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * If for testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date status first applied
     *  */
    date: string;
    /**
     * The name of the individual or organization that published the SubscriptionTopic
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the SubscriptionTopic
     *  */
    description: markdown;
    /**
     * Content intends to support these contexts
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction of the SubscriptionTopic (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this SubscriptionTopic is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * When SubscriptionTopic is/was approved by publisher
     *  */
    approvalDate: string;
    /**
     * Date the Subscription Topic was last reviewed by the publisher
     *  */
    lastReviewDate: string;
    /**
     * The effective date range for the SubscriptionTopic
     *  */
    effectivePeriod: Period;
    /**
     * Definition of a resource-based trigger for the subscription topic
     *  */
    resourceTrigger: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text representation of the resource trigger
         *  */
        description: markdown;
        /**
         * Data Type or Resource (reference to definition) for this trigger definition
         *  */
        resource: string;
        /**
         * create | update | delete
         *  */
        supportedInteraction: string;
        /**
         * Both must be true flag
         *  */
        queryCriteria: boolean;
        /**
         * FHIRPath based trigger rule
         *  */
        fhirPathCriteria: string;
    };
    /**
     * Event definitions the SubscriptionTopic
     *  */
    eventTrigger: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Text representation of the event trigger
         *  */
        description: markdown;
        /**
         * Event which can trigger a notification from the SubscriptionTopic
         *  */
        event: CodeableConcept;
        /**
         * Data Type or Resource (reference to definition) for this trigger definition
         *  */
        resource: string;
    };
    /**
     * Properties by which a Subscription can filter notifications from the SubscriptionTopic
     *  */
    canFilterBy: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Description of this filter parameter
         *  */
        description: markdown;
        /**
         * URL of the triggering Resource that this filter applies to
         *  */
        resource: string;
        /**
         * Human-readable and computation-friendly name for a filter parameter usable by subscriptions on this topic, via Subscription.filterBy.filterParameter
         *  */
        filterParameter: string;
        /**
         * Canonical URL for a filterParameter definition
         *  */
        filterDefinition: string;
        /**
         * = | eq | ne | gt | lt | ge | le | sa | eb | ap | above | below | in | not-in | of-type
         *  */
        modifier: string;
    };
    /**
     * Properties for describing the shape of notifications generated by this topic
     *  */
    notificationShape: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * URL of the Resource that is the focus (main) resource in a notification shape
         *  */
        resource: string;
        /**
         * Include directives, rooted in the resource for this shape
         *  */
        include: string;
        /**
         * Reverse include directives, rooted in the resource for this shape
         *  */
        revInclude: string;
    };
};

type SubscriptionTopic__lookups = {
    "SubscriptionTopic": SubscriptionTopic_SubscriptionTopic_Props;
};

export declare function subscriptionTopic(props: SubscriptionTopic_SubscriptionTopic_Props);;

export declare function subscriptionTopic<T extends keyof SubscriptionTopic__lookups>(type: T, props: SubscriptionTopic__lookups[T]);;

type Substance_Substance_Props = {
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
     * Unique identifier
     *  */
    identifier: Identifier;
    /**
     * active | inactive | entered-in-error
     *  */
    status: string;
    /**
     * What class/type of substance this is
     *  */
    category: CodeableConcept;
    /**
     * What substance this is
     *  */
    code: CodeableConcept;
    /**
     * Textual description of the substance, comments
     *  */
    description: string;
    /**
     * If this describes a specific package/container of the substance
     *  */
    instance: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Identifier of the package/container
         *  */
        identifier: Identifier;
        /**
         * When no longer valid to use
         *  */
        expiry: string;
        /**
         * Amount of substance in the package
         *  */
        quantity: Quantity;
    };
    /**
     * Composition information about the substance
     *  */
    ingredient: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Optional amount (concentration)
         *  */
        quantity: Ratio;
        /**
         * A component of the substance
         *  */
        substance: CodeableConcept;
    };
};

type Substance__lookups = {
    "Substance": Substance_Substance_Props;
};

export declare function substance(props: Substance_Substance_Props);;

export declare function substance<T extends keyof Substance__lookups>(type: T, props: Substance__lookups[T]);;

type SubstanceDefinition_SubstanceDefinition_Props = {
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
     * Identifier by which this substance is known
     *  */
    identifier: Identifier;
    /**
     * A business level version identifier of the substance
     *  */
    version: string;
    /**
     * Status of substance within the catalogue e.g. active, retired
     *  */
    status: CodeableConcept;
    /**
     * A categorization, high level e.g. polymer or nucleic acid, or food, chemical, biological, or lower e.g. polymer linear or branch chain, or type of impurity
     *  */
    classification: CodeableConcept;
    /**
     * If the substance applies to human or veterinary use
     *  */
    domain: CodeableConcept;
    /**
     * The quality standard, established benchmark, to which substance complies (e.g. USP/NF, BP)
     *  */
    grade: CodeableConcept;
    /**
     * Textual description of the substance
     *  */
    description: markdown;
    /**
     * Supporting literature
     *  */
    informationSource: Reference;
    /**
     * Textual comment about the substance's catalogue or registry record
     *  */
    note: Annotation;
    /**
     * The entity that creates, makes, produces or fabricates the substance
     *  */
    manufacturer: Reference;
    /**
     * An entity that is the source for the substance. It may be different from the manufacturer
     *  */
    supplier: Reference;
    /**
     * Moiety, for structural modifications
     *  */
    moiety: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Role that the moiety is playing
         *  */
        role: CodeableConcept;
        /**
         * Identifier by which this moiety substance is known
         *  */
        identifier: Identifier;
        /**
         * Textual name for this moiety substance
         *  */
        name: string;
        /**
         * Stereochemistry type
         *  */
        stereochemistry: CodeableConcept;
        /**
         * Optical activity type
         *  */
        opticalActivity: CodeableConcept;
        /**
         * Molecular formula for this moiety (e.g. with the Hill system)
         *  */
        molecularFormula: string;
        /**
         * Quantitative value for this moiety
         *  */
        amount: Quantity;
        /**
         * The measurement type of the quantitative value
         *  */
        measurementType: CodeableConcept;
    };
    /**
     * General specifications for this substance
     *  */
    property: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A code expressing the type of property
         *  */
        type: CodeableConcept;
        /**
         * A value for the property
         *  */
        value: CodeableConcept;
    };
    /**
     * The molecular weight or weight range
     *  */
    molecularWeight: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The method by which the weight was determined
         *  */
        method: CodeableConcept;
        /**
         * Type of molecular weight e.g. exact, average, weight average
         *  */
        type: CodeableConcept;
        /**
         * Used to capture quantitative values for a variety of elements
         *  */
        amount: Quantity;
    };
    /**
     * Structural information
     *  */
    structure: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Stereochemistry type
         *  */
        stereochemistry: CodeableConcept;
        /**
         * Optical activity type
         *  */
        opticalActivity: CodeableConcept;
        /**
         * Molecular formula (e.g. using the Hill system)
         *  */
        molecularFormula: string;
        /**
         * Specified per moiety according to the Hill system
         *  */
        molecularFormulaByMoiety: string;
        /**
         * The method used to find the structure e.g. X-ray, NMR
         *  */
        technique: CodeableConcept;
        /**
         * Source of information for the structure
         *  */
        sourceDocument: Reference;
        /**
         * An attachment with the structural representation e.g. a structure graphic or AnIML file
         *  */
        representation: Reference;
    };
    /**
     * Codes associated with the substance
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The specific code
         *  */
        code: CodeableConcept;
        /**
         * Status of the code assignment, for example 'provisional', 'approved'
         *  */
        status: CodeableConcept;
        /**
         * The date at which the code status was changed
         *  */
        statusDate: string;
        /**
         * Any comment can be provided in this field
         *  */
        note: Annotation;
        /**
         * Supporting literature
         *  */
        source: Reference;
    };
    /**
     * Names applicable to this substance
     *  */
    name: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The actual name
         *  */
        name: string;
        /**
         * Name type e.g. 'systematic',  'scientific, 'brand'
         *  */
        type: CodeableConcept;
        /**
         * The status of the name e.g. 'current', 'proposed'
         *  */
        status: CodeableConcept;
        /**
         * If this is the preferred name for this substance
         *  */
        preferred: boolean;
        /**
         * Human language that the name is written in
         *  */
        language: CodeableConcept;
        /**
         * The use context of this name e.g. as an active ingredient or as a food colour additive
         *  */
        domain: CodeableConcept;
        /**
         * The jurisdiction where this name applies
         *  */
        jurisdiction: CodeableConcept;
        /**
         * Date of official name change
         *  */
        official: string;
        /**
         * Supporting literature
         *  */
        source: Reference;
    };
    /**
     * A link between this substance and another
     *  */
    relationship: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A pointer to another substance, as a resource or a representational code
         *  */
        substanceDefinition: Reference;
        /**
         * For example "salt to parent", "active moiety"
         *  */
        type: CodeableConcept;
        /**
         * For example where an enzyme strongly bonds with a particular substance, this is a defining relationship for that enzyme, out of several possible relationships
         *  */
        isDefining: boolean;
        /**
         * A numeric factor for the relationship, e.g. that a substance salt has some percentage of active substance in relation to some other
         *  */
        amount: Quantity;
        /**
         * For use when the numeric has an uncertain range
         *  */
        ratioHighLimitAmount: Ratio;
        /**
         * An operator for the amount, for example "average", "approximately", "less than"
         *  */
        comparator: CodeableConcept;
        /**
         * Supporting literature
         *  */
        source: Reference;
    };
    /**
     * Material or taxonomic/anatomical source
     *  */
    sourceMaterial: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Classification of the origin of the raw material. e.g. cat hair is an Animal source type
         *  */
        type: CodeableConcept;
        /**
         * The genus of an organism e.g. the Latin epithet of the plant/animal scientific name
         *  */
        genus: CodeableConcept;
        /**
         * The species of an organism e.g. the Latin epithet of the species of the plant/animal
         *  */
        species: CodeableConcept;
        /**
         * An anatomical origin of the source material within an organism
         *  */
        part: CodeableConcept;
        /**
         * The country or countries where the material is harvested
         *  */
        countryOfOrigin: CodeableConcept;
    };
};

type SubstanceDefinition__lookups = {
    "SubstanceDefinition": SubstanceDefinition_SubstanceDefinition_Props;
};

export declare function substanceDefinition(props: SubstanceDefinition_SubstanceDefinition_Props);;

export declare function substanceDefinition<T extends keyof SubstanceDefinition__lookups>(type: T, props: SubstanceDefinition__lookups[T]);;

type SupplyDelivery_SupplyDelivery_Props = {
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
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * Fulfills plan, proposal or order
     *  */
    basedOn: Reference;
    /**
     * Part of referenced event
     *  */
    partOf: Reference;
    /**
     * in-progress | completed | abandoned | entered-in-error
     *  */
    status: string;
    /**
     * Patient for whom the item is supplied
     *  */
    patient: Reference;
    /**
     * Category of dispense event
     *  */
    type: CodeableConcept;
    /**
     * The item that is delivered or supplied
     *  */
    suppliedItem: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Amount dispensed
         *  */
        quantity: Quantity;
        /**
         * Medication, Substance, or Device supplied
         *  */
        item: CodeableConcept;
    };
    /**
     * When event occurred
     *  */
    occurrence: string;
    /**
     * Dispenser
     *  */
    supplier: Reference;
    /**
     * Where the Supply was sent
     *  */
    destination: Reference;
    /**
     * Who collected the Supply
     *  */
    receiver: Reference;
};

type SupplyDelivery__lookups = {
    "SupplyDelivery": SupplyDelivery_SupplyDelivery_Props;
};

export declare function supplyDelivery(props: SupplyDelivery_SupplyDelivery_Props);;

export declare function supplyDelivery<T extends keyof SupplyDelivery__lookups>(type: T, props: SupplyDelivery__lookups[T]);;

type SupplyRequest_SupplyRequest_Props = {
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
     * Business Identifier for SupplyRequest
     *  */
    identifier: Identifier;
    /**
     * draft | active | suspended +
     *  */
    status: string;
    /**
     * The kind of supply (central, non-stock, etc.)
     *  */
    category: CodeableConcept;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * Medication, Substance, or Device requested to be supplied
     *  */
    item: CodeableConcept;
    /**
     * The requested amount of the item indicated
     *  */
    quantity: Quantity;
    /**
     * Ordered item details
     *  */
    parameter: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Item detail
         *  */
        code: CodeableConcept;
        /**
         * Value of detail
         *  */
        value: CodeableConcept;
    };
    /**
     * When the request should be fulfilled
     *  */
    occurrence: string;
    /**
     * When the request was made
     *  */
    authoredOn: string;
    /**
     * Individual making the request
     *  */
    requester: Reference;
    /**
     * Who is intended to fulfill the request
     *  */
    supplier: Reference;
    /**
     * The reason why the supply item was requested
     *  */
    reasonCode: CodeableConcept;
    /**
     * The reason why the supply item was requested
     *  */
    reasonReference: Reference;
    /**
     * The origin of the supply
     *  */
    deliverFrom: Reference;
    /**
     * The destination of the supply
     *  */
    deliverTo: Reference;
};

type SupplyRequest__lookups = {
    "SupplyRequest": SupplyRequest_SupplyRequest_Props;
};

export declare function supplyRequest(props: SupplyRequest_SupplyRequest_Props);;

export declare function supplyRequest<T extends keyof SupplyRequest__lookups>(type: T, props: SupplyRequest__lookups[T]);;

type Task_Task_Props = {
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
     * Task Instance Identifier
     *  */
    identifier: Identifier;
    /**
     * Formal definition of task
     *  */
    instantiatesCanonical: any;
    /**
     * Formal definition of task
     *  */
    instantiatesUri: string;
    /**
     * Request fulfilled by this task
     *  */
    basedOn: Reference;
    /**
     * Requisition or grouper id
     *  */
    groupIdentifier: Identifier;
    /**
     * Composite task
     *  */
    partOf: Reference;
    /**
     * draft | requested | received | accepted | +
     *  */
    status: string;
    /**
     * Reason for current status
     *  */
    statusReason: CodeableConcept;
    /**
     * E.g. "Specimen collected", "IV prepped"
     *  */
    businessStatus: CodeableConcept;
    /**
     * unknown | proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
     *  */
    intent: string;
    /**
     * routine | urgent | asap | stat
     *  */
    priority: string;
    /**
     * Task Type
     *  */
    code: CodeableConcept;
    /**
     * Human-readable explanation of task
     *  */
    description: string;
    /**
     * What task is acting on
     *  */
    focus: Reference;
    /**
     * Beneficiary of the Task
     *  */
    for: Reference;
    /**
     * Healthcare event during which this task originated
     *  */
    encounter: Reference;
    /**
     * Start and end time of execution
     *  */
    executionPeriod: Period;
    /**
     * Task Creation Date
     *  */
    authoredOn: string;
    /**
     * Task Last Modified Date
     *  */
    lastModified: string;
    /**
     * Who is asking for task to be done
     *  */
    requester: Reference;
    /**
     * Requested performer
     *  */
    performerType: CodeableConcept;
    /**
     * Responsible individual
     *  */
    owner: Reference;
    /**
     * Where task occurs
     *  */
    location: Reference;
    /**
     * Why task is needed
     *  */
    reasonCode: CodeableConcept;
    /**
     * Why task is needed
     *  */
    reasonReference: Reference;
    /**
     * Associated insurance coverage
     *  */
    insurance: Reference;
    /**
     * Comments made about the task
     *  */
    note: Annotation;
    /**
     * Key events in history of the Task
     *  */
    relevantHistory: Reference;
    /**
     * Constraints on fulfillment tasks
     *  */
    restriction: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * How many times to repeat
         *  */
        repetitions: number;
        /**
         * When fulfillment sought
         *  */
        period: Period;
        /**
         * For whom is fulfillment sought?
         *  */
        recipient: Reference;
    };
    /**
     * Information used to perform task
     *  */
    input: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Label for the input
         *  */
        type: CodeableConcept;
        /**
         * Content to use in performing the task
         *  */
        value: base64Binary;
    };
    /**
     * Information produced as part of task
     *  */
    output: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Label for output
         *  */
        type: CodeableConcept;
        /**
         * Result of output
         *  */
        value: base64Binary;
    };
};

type Task__lookups = {
    "Task": Task_Task_Props;
};

export declare function task(props: Task_Task_Props);;

export declare function task<T extends keyof Task__lookups>(type: T, props: Task__lookups[T]);;

type TerminologyCapabilities_TerminologyCapabilities_Props = {
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
     * Canonical identifier for this terminology capabilities, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Business version of the terminology capabilities
     *  */
    version: string;
    /**
     * Name for this terminology capabilities (computer friendly)
     *  */
    name: string;
    /**
     * Name for this terminology capabilities (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the terminology capabilities
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for terminology capabilities (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this terminology capabilities is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * instance | capability | requirements
     *  */
    kind: string;
    /**
     * Software that is covered by this terminology capability statement
     *  */
    software: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A name the software is known by
         *  */
        name: string;
        /**
         * Version covered by this statement
         *  */
        version: string;
    };
    /**
     * If this describes a specific instance
     *  */
    implementation: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Describes this specific instance
         *  */
        description: string;
        /**
         * Base URL for the implementation
         *  */
        url: url;
    };
    /**
     * Whether lockedDate is supported
     *  */
    lockedDate: boolean;
    /**
     * A code system supported by the server
     *  */
    codeSystem: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * URI for the Code System
         *  */
        uri: any;
        /**
         * Properties supported for $lookup
         *  */
        version: string;
        /**
         * Whether subsumption is supported
         *  */
        subsumption: boolean;
    };
    /**
     * Information about the [ValueSet/$expand](valueset-operation-expand.html) operation
     *  */
    expansion: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Whether the server can return nested value sets
         *  */
        hierarchical: boolean;
        /**
         * Whether the server supports paging on expansion
         *  */
        paging: boolean;
        /**
         * Allow request for incomplete expansions?
         *  */
        incomplete: boolean;
        /**
         * Description of support for parameter
         *  */
        parameter: string;
        /**
         * Documentation about text searching works
         *  */
        textFilter: markdown;
    };
    /**
     * explicit | all
     *  */
    codeSearch: string;
    /**
     * Information about the [ValueSet/$validate-code](valueset-operation-validate-code.html) operation
     *  */
    validateCode: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Whether translations are validated
         *  */
        translations: boolean;
    };
    /**
     * Information about the [ConceptMap/$translate](conceptmap-operation-translate.html) operation
     *  */
    translation: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Whether the client must identify the map
         *  */
        needsMap: boolean;
    };
    /**
     * Information about the [ConceptMap/$closure](conceptmap-operation-closure.html) operation
     *  */
    closure: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * If cross-system closure is supported
         *  */
        translation: boolean;
    };
};

type TerminologyCapabilities__lookups = {
    "TerminologyCapabilities": TerminologyCapabilities_TerminologyCapabilities_Props;
};

export declare function terminologyCapabilities(props: TerminologyCapabilities_TerminologyCapabilities_Props);;

export declare function terminologyCapabilities<T extends keyof TerminologyCapabilities__lookups>(type: T, props: TerminologyCapabilities__lookups[T]);;

type TestReport_TestReport_Props = {
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
     * External identifier
     *  */
    identifier: Identifier;
    /**
     * Informal name of the executed TestScript
     *  */
    name: string;
    /**
     * completed | in-progress | waiting | stopped | entered-in-error
     *  */
    status: string;
    /**
     * Reference to the  version-specific TestScript that was executed to produce this TestReport
     *  */
    testScript: Reference;
    /**
     * pass | fail | pending
     *  */
    result: string;
    /**
     * The final score (percentage of tests passed) resulting from the execution of the TestScript
     *  */
    score: number;
    /**
     * Name of the tester producing this report (Organization or individual)
     *  */
    tester: string;
    /**
     * When the TestScript was executed and this TestReport was generated
     *  */
    issued: string;
    /**
     * A participant in the test execution, either the execution engine, a client, or a server
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
         * test-engine | client | server
         *  */
        type: string;
        /**
         * The uri of the participant. An absolute URL is preferred
         *  */
        uri: string;
        /**
         * The display name of the participant
         *  */
        display: string;
    };
    /**
     * The results of the series of required setup operations before the tests were executed
     *  */
    setup: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * A link to further details on the result
         *  */
        action: string;
    };
    /**
     * A test executed from the test script
     *  */
    test: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Tracking/logging name of this test
         *  */
        name: string;
        /**
         * Tracking/reporting short description of the test
         *  */
        description: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        action: Extension;
    };
    /**
     * The results of running the series of required clean up steps
     *  */
    teardown: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        action: Extension;
    };
};

type TestReport__lookups = {
    "TestReport": TestReport_TestReport_Props;
};

export declare function testReport(props: TestReport_TestReport_Props);;

export declare function testReport<T extends keyof TestReport__lookups>(type: T, props: TestReport__lookups[T]);;

type TestScript_TestScript_Props = {
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
     * Canonical identifier for this test script, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the test script
     *  */
    identifier: Identifier;
    /**
     * Business version of the test script
     *  */
    version: string;
    /**
     * Name for this test script (computer friendly)
     *  */
    name: string;
    /**
     * Name for this test script (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the test script
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for test script (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Why this test script is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * An abstract server representing a client or sender in a message exchange
     *  */
    origin: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The index of the abstract origin server starting at 1
         *  */
        index: number;
        /**
         * FHIR-Client | FHIR-SDC-FormFiller
         *  */
        profile: Coding;
    };
    /**
     * An abstract server representing a destination or receiver in a message exchange
     *  */
    destination: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The index of the abstract destination server starting at 1
         *  */
        index: number;
        /**
         * FHIR-Server | FHIR-SDC-FormManager | FHIR-SDC-FormReceiver | FHIR-SDC-FormProcessor
         *  */
        profile: Coding;
    };
    /**
     * Required capability that is assumed to function correctly on the FHIR server being tested
     *  */
    metadata: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Short description
         *  */
        link: string;
        /**
         * Required Capability Statement
         *  */
        capability: any;
    };
    /**
     * Fixture in the test script - by reference (uri)
     *  */
    fixture: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Whether or not to implicitly create the fixture during setup
         *  */
        autocreate: boolean;
        /**
         * Whether or not to implicitly delete the fixture during teardown
         *  */
        autodelete: boolean;
        /**
         * Reference of the resource
         *  */
        resource: Reference;
    };
    /**
     * Reference of the validation profile
     *  */
    profile: Reference;
    /**
     * Placeholder for evaluated elements
     *  */
    variable: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Descriptive name for this variable
         *  */
        name: string;
        /**
         * Default, hard-coded, or user-defined value for this variable
         *  */
        defaultValue: string;
        /**
         * Natural language description of the variable
         *  */
        description: string;
        /**
         * The FHIRPath expression against the fixture body
         *  */
        expression: string;
        /**
         * HTTP header field name for source
         *  */
        headerField: string;
        /**
         * Hint help text for default value to enter
         *  */
        hint: string;
        /**
         * XPath or JSONPath against the fixture body
         *  */
        path: string;
        /**
         * Fixture Id of source expression or headerField within this variable
         *  */
        sourceId: string;
    };
    /**
     * A series of required setup operations before tests are executed
     *  */
    setup: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Will this assert produce a warning only on error?
         *  */
        action: boolean;
    };
    /**
     * A test in this script
     *  */
    test: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Tracking/logging name of this test
         *  */
        name: string;
        /**
         * Tracking/reporting short description of the test
         *  */
        description: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        action: Extension;
    };
    /**
     * A series of required clean up steps
     *  */
    teardown: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        action: Extension;
    };
};

type TestScript__lookups = {
    "TestScript": TestScript_TestScript_Props;
};

export declare function testScript(props: TestScript_TestScript_Props);;

export declare function testScript<T extends keyof TestScript__lookups>(type: T, props: TestScript__lookups[T]);;

type ValueSet_ValueSet_Props = {
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
     * Canonical identifier for this value set, represented as a URI (globally unique)
     *  */
    url: string;
    /**
     * Additional identifier for the value set (business identifier)
     *  */
    identifier: Identifier;
    /**
     * Business version of the value set
     *  */
    version: string;
    /**
     * Name for this value set (computer friendly)
     *  */
    name: string;
    /**
     * Name for this value set (human friendly)
     *  */
    title: string;
    /**
     * draft | active | retired | unknown
     *  */
    status: string;
    /**
     * For testing purposes, not real usage
     *  */
    experimental: boolean;
    /**
     * Date last changed
     *  */
    date: string;
    /**
     * Name of the publisher (organization or individual)
     *  */
    publisher: string;
    /**
     * Contact details for the publisher
     *  */
    contact: ContactDetail;
    /**
     * Natural language description of the value set
     *  */
    description: markdown;
    /**
     * The context that the content is intended to support
     *  */
    useContext: UsageContext;
    /**
     * Intended jurisdiction for value set (if applicable)
     *  */
    jurisdiction: CodeableConcept;
    /**
     * Indicates whether or not any change to the content logical definition may occur
     *  */
    immutable: boolean;
    /**
     * Why this value set is defined
     *  */
    purpose: markdown;
    /**
     * Use and/or publishing restrictions
     *  */
    copyright: markdown;
    /**
     * Content logical definition of the value set (CLD)
     *  */
    compose: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Fixed date for references with no specified version (transitive)
         *  */
        lockedDate: string;
        /**
         * Whether inactive codes are in the value set
         *  */
        inactive: boolean;
        /**
         * Select the contents included in this value set
         *  */
        include: any;
    };
    /**
     * Used when the value set is "expanded"
     *  */
    expansion: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Identifies the value set expansion (business identifier)
         *  */
        identifier: string;
        /**
         * Time ValueSet expansion happened
         *  */
        timestamp: string;
        /**
         * Total number of codes in the expansion
         *  */
        total: number;
        /**
         * Offset at which this resource starts
         *  */
        offset: number;
        /**
         * Value of the named parameter
         *  */
        parameter: string;
        /**
         * User display for the concept
         *  */
        contains: string;
    };
};

type ValueSet__lookups = {
    "ValueSet": ValueSet_ValueSet_Props;
};

export declare function valueSet(props: ValueSet_ValueSet_Props);;

export declare function valueSet<T extends keyof ValueSet__lookups>(type: T, props: ValueSet__lookups[T]);;

type VerificationResult_VerificationResult_Props = {
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
     * A resource that was validated
     *  */
    target: Reference;
    /**
     * The fhirpath location(s) within the resource that was validated
     *  */
    targetLocation: string;
    /**
     * none | initial | periodic
     *  */
    need: CodeableConcept;
    /**
     * attested | validated | in-process | req-revalid | val-fail | reval-fail
     *  */
    status: string;
    /**
     * When the validation status was updated
     *  */
    statusDate: string;
    /**
     * nothing | primary | multiple
     *  */
    validationType: CodeableConcept;
    /**
     * The primary process by which the target is validated (edit check; value set; primary source; multiple sources; standalone; in context)
     *  */
    validationProcess: CodeableConcept;
    /**
     * Frequency of revalidation
     *  */
    frequency: Timing;
    /**
     * The date/time validation was last completed (including failed validations)
     *  */
    lastPerformed: string;
    /**
     * The date when target is next validated, if appropriate
     *  */
    nextScheduled: string;
    /**
     * fatal | warn | rec-only | none
     *  */
    failureAction: CodeableConcept;
    /**
     * Information about the primary source(s) involved in validation
     *  */
    primarySource: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Reference to the primary source
         *  */
        who: Reference;
        /**
         * Type of primary source (License Board; Primary Education; Continuing Education; Postal Service; Relationship owner; Registration Authority; legal source; issuing source; authoritative source)
         *  */
        type: CodeableConcept;
        /**
         * Method for exchanging information with the primary source
         *  */
        communicationMethod: CodeableConcept;
        /**
         * successful | failed | unknown
         *  */
        validationStatus: CodeableConcept;
        /**
         * When the target was validated against the primary source
         *  */
        validationDate: string;
        /**
         * yes | no | undetermined
         *  */
        canPushUpdates: CodeableConcept;
        /**
         * specific | any | source
         *  */
        pushTypeAvailable: CodeableConcept;
    };
    /**
     * Information about the entity attesting to information
     *  */
    attestation: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The individual or organization attesting to information
         *  */
        who: Reference;
        /**
         * When the who is asserting on behalf of another (organization or individual)
         *  */
        onBehalfOf: Reference;
        /**
         * The method by which attested information was submitted/retrieved
         *  */
        communicationMethod: CodeableConcept;
        /**
         * The date the information was attested to
         *  */
        date: string;
        /**
         * A digital identity certificate associated with the attestation source
         *  */
        sourceIdentityCertificate: string;
        /**
         * A digital identity certificate associated with the proxy entity submitting attested information on behalf of the attestation source
         *  */
        proxyIdentityCertificate: string;
        /**
         * Proxy signature
         *  */
        proxySignature: Signature;
        /**
         * Attester signature
         *  */
        sourceSignature: Signature;
    };
    /**
     * Information about the entity validating information
     *  */
    validator: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * Reference to the organization validating information
         *  */
        organization: Reference;
        /**
         * A digital identity certificate associated with the validator
         *  */
        identityCertificate: string;
        /**
         * Validator signature
         *  */
        attestationSignature: Signature;
    };
};

type VerificationResult__lookups = {
    "VerificationResult": VerificationResult_VerificationResult_Props;
};

export declare function verificationResult(props: VerificationResult_VerificationResult_Props);;

export declare function verificationResult<T extends keyof VerificationResult__lookups>(type: T, props: VerificationResult__lookups[T]);;
