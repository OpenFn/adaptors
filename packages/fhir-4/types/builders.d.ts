
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import "./globals";

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
