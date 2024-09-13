
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import "./globals";

type MedicationDispense_arv_medication_dispense_Props = {
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
    medication: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
    quantity: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Coded form of the unit
         *  */
        code: string;
    };
    /**
     * Amount of medication expressed as a timing amount
     *  */
    daysSupply: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Coded form of the unit
         *  */
        code: string;
    };
    /**
     * When product was packaged and reviewed
     *  */
    whenPrepared: dateTime;
    /**
     * When product was given out
     *  */
    whenHandedOver: dateTime;
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

type MedicationDispense_cotrimoxazole_preventive_therapy_medication_dispense_Props = {
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
    medication: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
    quantity: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Coded form of the unit
         *  */
        code: string;
    };
    /**
     * Amount of medication expressed as a timing amount
     *  */
    daysSupply: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Coded form of the unit
         *  */
        code: string;
    };
    /**
     * When product was packaged and reviewed
     *  */
    whenPrepared: dateTime;
    /**
     * When product was given out
     *  */
    whenHandedOver: dateTime;
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

type MedicationDispense_generic_medication_dispense_Props = {
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
    medication: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * A reference to a code defined by a terminology system
         *  */
        coding: any;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
    quantity: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Coded form of the unit
         *  */
        code: string;
    };
    /**
     * Amount of medication expressed as a timing amount
     *  */
    daysSupply: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: decimal;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: string;
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: uri;
        /**
         * Coded form of the unit
         *  */
        code: string;
    };
    /**
     * When product was packaged and reviewed
     *  */
    whenPrepared: dateTime;
    /**
     * When product was given out
     *  */
    whenHandedOver: dateTime;
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

type MedicationDispense_variants = "arv-medication-dispense" | "cotrimoxazole-preventive-therapy-medication-dispense" | "generic-medication-dispense";

type MedicationDispense__lookups = {
    "arv-medication-dispense": MedicationDispense_arv_medication_dispense_Props;
    "cotrimoxazole-preventive-therapy-medication-dispense": MedicationDispense_cotrimoxazole_preventive_therapy_medication_dispense_Props;
    "generic-medication-dispense": MedicationDispense_generic_medication_dispense_Props;
};

export declare function medicationDispense<T extends MedicationDispense_variants>(type: MedicationDispense_variants, props: MedicationDispense__lookups[T]);;