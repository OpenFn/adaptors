
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import "./globals";

type Address_fr_core_address_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Code COG de la ville
     *  */
    extension: Extension;
    /**
     * home | work | temp | old | billing - purpose of this address
     *  */
    use: "home" | "work" | "temp" | "old" | "billing";
    /**
     * postal | physical | both
     *  */
    type: "postal" | "physical" | "both";
    /**
     * Text representation of the address
     *  */
    text: string;
    /**
     * Street name, number, direction & P.O. Box etc.
     *  */
    line: string;
    /**
     * Les communes existantes sont définies ici : https://public.opendatasoft.com/explore/dataset/correspondance-code-insee-code-postal/table.
     *  */
    city: string;
    /**
     * District name (aka county)
     *  */
    district: string;
    /**
     * Sub-unit of country (abbreviations ok)
     *  */
    state: string;
    /**
     * Postal code for area
     *  */
    postalCode: string;
    /**
     * Country (will be ISO 3166 3 letter code; code=FRA for France)
     *  */
    country: string;
    /**
     * Time period when address was/is in use
     *  */
    period: Period;
};

type Address__lookups = {
    "fr-core-address": Address_fr_core_address_Props;
};

export declare function address<T extends keyof Address__lookups>(type: T, props: Address__lookups[T]);;

type Extension_fr_core_address_insee_code_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: Coding;
};

type Extension_fr_core_appointment_operator_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: Reference;
};

type Extension_fr_core_comment_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_contact_point_email_type_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: Coding;
};

type Extension_fr_core_estimated_discharge_date_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_human_name_assembly_order_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_identity_reliability_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Spécifie le type de document qui a été contrôlé par l'agent d'admission pour justifier le statut de l'identité. Seuls certains types de pièces définis dans le RNIV permettent de valider une identité (CN | PA | CS | ... )
     *  */
    extension: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * identifies the meaning of the extension
         *  */
        url: string;
        /**
         * Value of extension
         *  */
        value: Coding;
    };
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: base64Binary;
};

type Extension_fr_core_location_position_room_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: Coding;
};

type Extension_fr_core_lunar_date_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_observation_body_position_ext_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: CodeableConcept;
};

type Extension_fr_core_observation_height_body_position_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: CodeableConcept;
};

type Extension_fr_core_observation_level_of_exertion_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: CodeableConcept;
};

type Extension_fr_core_organization_activity_field_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: Coding;
};

type Extension_fr_core_organization_activity_type_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_organization_analysis_section_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_organization_applicant_act_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: boolean;
};

type Extension_fr_core_organization_budget_letter_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_organization_description_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_organization_executant_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: boolean;
};

type Extension_fr_core_organization_external_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: boolean;
};

type Extension_fr_core_organization_field_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_organization_number_of_theorical_accomadation_space_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: number;
};

type Extension_fr_core_organization_prestation_discipline_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_organization_short_name_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_patient_birth_list_given_name_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_patient_birthdate_update_indicator_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: boolean;
};

type Extension_fr_core_patient_contact_identifier_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: Identifier;
};

type Extension_fr_core_patient_death_place_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_patient_nationality_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Nationality Period
     *  */
    extension: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * identifies the meaning of the extension
         *  */
        url: string;
        /**
         * Value of extension
         *  */
        value: Period;
    };
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: base64Binary;
};

type Extension_fr_core_practitioner_profession_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: Coding;
};

type Extension_fr_core_practitioner_specialty_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: Coding;
};

type Extension_fr_core_role_code_categorie_professionnelle_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * code de TRE_R09-CategorieProfessionnelle du MOS de l'ANS.
         *  */
        coding: Coding;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
};

type Extension_fr_core_schedule_availability_time_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * identifies the meaning of the extension
         *  */
        url: string;
        /**
         * Value of extension
         *  */
        value: number;
    };
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: base64Binary;
};

type Extension_fr_core_service_type_duration_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Duration of the service | durée du service
     *  */
    extension: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * identifies the meaning of the extension
         *  */
        url: string;
        /**
         * Value of extension
         *  */
        value: Duration;
    };
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: base64Binary;
};

type Extension_fr_core_slot_date_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: string;
};

type Extension_fr_core_use_period_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url: string;
    /**
     * Value of extension
     *  */
    value: Period;
};

type Extension__lookups = {
    "fr-core-address-insee-code": Extension_fr_core_address_insee_code_Props;
    "fr-core-appointment-operator": Extension_fr_core_appointment_operator_Props;
    "fr-core-comment": Extension_fr_core_comment_Props;
    "fr-core-contact-point-email-type": Extension_fr_core_contact_point_email_type_Props;
    "fr-core-estimated-discharge-date": Extension_fr_core_estimated_discharge_date_Props;
    "fr-core-human-name-assembly-order": Extension_fr_core_human_name_assembly_order_Props;
    "fr-core-identity-reliability": Extension_fr_core_identity_reliability_Props;
    "fr-core-location-position-room": Extension_fr_core_location_position_room_Props;
    "fr-core-lunar-date": Extension_fr_core_lunar_date_Props;
    "fr-core-observation-body-position-ext": Extension_fr_core_observation_body_position_ext_Props;
    "fr-core-observation-height-body-position": Extension_fr_core_observation_height_body_position_Props;
    "fr-core-observation-level-of-exertion": Extension_fr_core_observation_level_of_exertion_Props;
    "fr-core-organization-activity-field": Extension_fr_core_organization_activity_field_Props;
    "fr-core-organization-activity-type": Extension_fr_core_organization_activity_type_Props;
    "fr-core-organization-analysis-section": Extension_fr_core_organization_analysis_section_Props;
    "fr-core-organization-applicant-act": Extension_fr_core_organization_applicant_act_Props;
    "fr-core-organization-budget-letter": Extension_fr_core_organization_budget_letter_Props;
    "fr-core-organization-description": Extension_fr_core_organization_description_Props;
    "fr-core-organization-executant": Extension_fr_core_organization_executant_Props;
    "fr-core-organization-external": Extension_fr_core_organization_external_Props;
    "fr-core-organization-field": Extension_fr_core_organization_field_Props;
    "fr-core-organization-number-of-theorical-accomadation-space": Extension_fr_core_organization_number_of_theorical_accomadation_space_Props;
    "fr-core-organization-prestation-discipline": Extension_fr_core_organization_prestation_discipline_Props;
    "fr-core-organization-short-name": Extension_fr_core_organization_short_name_Props;
    "fr-core-patient-birth-list-given-name": Extension_fr_core_patient_birth_list_given_name_Props;
    "fr-core-patient-birthdate-update-indicator": Extension_fr_core_patient_birthdate_update_indicator_Props;
    "fr-core-patient-contact-identifier": Extension_fr_core_patient_contact_identifier_Props;
    "fr-core-patient-death-place": Extension_fr_core_patient_death_place_Props;
    "fr-core-patient-nationality": Extension_fr_core_patient_nationality_Props;
    "fr-core-practitioner-profession": Extension_fr_core_practitioner_profession_Props;
    "fr-core-practitioner-specialty": Extension_fr_core_practitioner_specialty_Props;
    "fr-core-role-code-categorie-professionnelle": Extension_fr_core_role_code_categorie_professionnelle_Props;
    "fr-core-schedule-availability-time": Extension_fr_core_schedule_availability_time_Props;
    "fr-core-service-type-duration": Extension_fr_core_service_type_duration_Props;
    "fr-core-slot-date": Extension_fr_core_slot_date_Props;
    "fr-core-use-period": Extension_fr_core_use_period_Props;
};

export declare function extension<T extends keyof Extension__lookups>(type: T, props: Extension__lookups[T]);;

type Appointment_fr_core_appointment_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * FR Core Appointment Operator Extension
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
    status: "proposed" | "pending" | "booked" | "arrived" | "fulfilled" | "cancelled" | "noshow" | "entered-in-error" | "checked-in" | "waitlist";
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
        status: "accepted" | "declined" | "tentative" | "needs-action";
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
    "fr-core-appointment": Appointment_fr_core_appointment_Props;
};

export declare function appointment<T extends keyof Appointment__lookups>(type: T, props: Appointment__lookups[T]);;

type ContactPoint_fr_core_contact_point_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Type of email | type de messagerie électronique
     *  */
    extension: Extension;
    /**
     * phone | fax | email | pager | url | sms | other
     *  */
    system: "phone" | "fax" | "email" | "pager" | "url" | "sms" | "other";
    /**
     * The actual contact point details
     *  */
    value: string;
    /**
     * home | work | temp | old | mobile - purpose of this contact point
     *  */
    use: "home" | "work" | "temp" | "old" | "mobile";
    /**
     * Specify preferred order of use (1 = highest)
     *  */
    rank: number;
    /**
     * Time period when the contact point was/is in use
     *  */
    period: Period;
};

type ContactPoint__lookups = {
    "fr-core-contact-point": ContactPoint_fr_core_contact_point_Props;
};

export declare function contactPoint<T extends keyof ContactPoint__lookups>(type: T, props: ContactPoint__lookups[T]);;

type Encounter_fr_core_encounter_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Estimated discharge date | Date de sortie estimée
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Identifier(s) by which this encounter is known | identifiant de la rencontre
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: string;
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
    status: "planned" | "in-progress" | "on-hold" | "discharged" | "completed" | "cancelled" | "discontinued" | "entered-in-error" | "unknown";
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
        status: "planned" | "in-progress" | "on-hold" | "discharged" | "completed" | "cancelled" | "discontinued" | "entered-in-error" | "unknown";
        /**
         * The time that the episode was in the specified status
         *  */
        period: Period;
    };
    /**
     * Classification of patient encounter
     *  */
    class: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Identity of the terminology system
         *  */
        system: string;
        /**
         * Version of the system - if relevant
         *  */
        version: string;
        /**
         * Symbol in syntax defined by the system
         *  */
        code: string;
        /**
         * Representation defined by the system
         *  */
        display: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        userSelected: boolean;
    };
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
     * List of participants involved in the encounter | Liste des personnes impliquées dans la rencontre
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
         * Organization that issued id (may be just text)
         *  */
        preAdmissionIdentifier: Reference;
        /**
         * The location/organization from which the patient came before admission
         *  */
        origin: Reference;
        /**
         * From where patient was admitted (physician referral, transfer)
         *  */
        admitSource: CodeableConcept;
        /**
         * the resaon of re-admission of this hospitalization encounter | Raison de la ré-admission du patient.
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
        status: "planned" | "active" | "reserved" | "completed";
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
    "fr-core-encounter": Encounter_fr_core_encounter_Props;
};

export declare function encounter<T extends keyof Encounter__lookups>(type: T, props: Encounter__lookups[T]);;

type HealthcareService_fr_core_healthcare_service_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * FR Core Service Type Duration Extension
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * External identifiers for this item
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: string;
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
     * Details of a Technology mediated contact point (phone, fax, email, etc.)
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
        daysOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
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
    "fr-core-healthcare-service": HealthcareService_fr_core_healthcare_service_Props;
};

export declare function healthcareService<T extends keyof HealthcareService__lookups>(type: T, props: HealthcareService__lookups[T]);;

type HumanName_fr_core_human_name_Props = {
    /**
     * Unique id for inter-element referencing
     *  */
    id: string;
    /**
     * Preferred display order of name parts
     *  */
    extension: Extension;
    /**
     * usual | official | temp | nickname | anonymous | old | maiden
     *  */
    use: "usual" | "official" | "temp" | "nickname" | "anonymous" | "old";
    /**
     * Text representation of the full name
     *  */
    text: string;
    /**
     * Family name (often called 'Surname')
     *  */
    family: string;
    /**
     * Given names (not always 'first'). Includes middle names
     *  */
    given: string;
    /**
     * Parts that come before the name
     *  */
    prefix: string;
    /**
     * jeu de valeurs pour spécifier le titre de la personne
     *  */
    suffix: string;
    /**
     * Time period when name was/is in use
     *  */
    period: Period;
};

type HumanName__lookups = {
    "fr-core-human-name": HumanName_fr_core_human_name_Props;
};

export declare function humanName<T extends keyof HumanName__lookups>(type: T, props: HumanName__lookups[T]);;

type Location_fr_core_location_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * FR Core Use Period Extension
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Identifiant fonctionnel du lieu. Il est recommandé de remplir ce champs pour faciliter l'identification des ressources.
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: string;
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
     * active | suspended | inactive
     *  */
    status: "active" | "suspended" | "inactive";
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
    mode: "instance" | "kind";
    /**
     * Type of function performed
     *  */
    type: CodeableConcept;
    /**
     * Details of a Technology mediated contact point (phone, fax, email, etc.)
     *  */
    telecom: ContactPoint;
    /**
     * An address expressed using postal conventions (as opposed to GPS or other location definition formats)
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
    partOf: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * FR Core Location Part Of Position Room Extension
         *  */
        positionRoom: any;
        /**
         * Literal reference, Relative, internal or absolute URL
         *  */
        reference: string;
        /**
         * Type the reference refers to (e.g. "Patient")
         *  */
        type: "Base";
        /**
         * Logical reference, when literal reference is not known
         *  */
        identifier: Identifier;
        /**
         * Text alternative for the resource
         *  */
        display: string;
    };
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
        daysOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
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
    "fr-core-location": Location_fr_core_location_Props;
};

export declare function location<T extends keyof Location__lookups>(type: T, props: Location__lookups[T]);;

type MedicationAdministration_fr_core_medication_administration_inhaled_oxygen_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
    status: "in-progress" | "not-done" | "on-hold" | "completed" | "entered-in-error" | "stopped" | "unknown";
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
    medication: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
    "fr-core-medication-administration-inhaled-oxygen": MedicationAdministration_fr_core_medication_administration_inhaled_oxygen_Props;
};

export declare function medicationAdministration<T extends keyof MedicationAdministration__lookups>(type: T, props: MedicationAdministration__lookups[T]);;

type Observation_fr_core_observation_bmi_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Other information that may be relevant to this event.
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
    status: "registered" | "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error" | "unknown";
    /**
     * Classification of  type of observation
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Body Mass Index (BMI)
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
     * Often just a dateTime for Vital Signs
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
     * Vital Signs value are recorded using the Quantity data type. For supporting observations such as Cuff size could use other datatypes such as CodeableConcept.
     *  */
    value: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: number;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: "<" | "<=" | ">=" | ">" | "ad";
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: string;
        /**
         * Coded responses from the common UCUM units for vital signs value set.
         *  */
        code: string;
    };
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
     * Used when reporting vital signs panel components
     *  */
    hasMember: Reference;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * Used when reporting systolic and diastolic blood pressure.
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
         * Vital Sign Value recorded with UCUM
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

type Observation_fr_core_observation_body_height_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Other information that may be relevant to this event.
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
    status: "registered" | "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error" | "unknown";
    /**
     * Classification of  type of observation
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Body Height
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
     * Often just a dateTime for Vital Signs
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
     * Vital Signs value are recorded using the Quantity data type. For supporting observations such as Cuff size could use other datatypes such as CodeableConcept.
     *  */
    value: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: number;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: "<" | "<=" | ">=" | ">" | "ad";
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: string;
        /**
         * Coded responses from the common UCUM units for vital signs value set.
         *  */
        code: string;
    };
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
     * Used when reporting vital signs panel components
     *  */
    hasMember: Reference;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * Used when reporting systolic and diastolic blood pressure.
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
         * Vital Sign Value recorded with UCUM
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

type Observation_fr_core_observation_body_temperature_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Other information that may be relevant to this event.
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
    status: "registered" | "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error" | "unknown";
    /**
     * Classification of  type of observation
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Body Temperature
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
     * Often just a dateTime for Vital Signs
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
     * Vital Signs value are recorded using the Quantity data type. For supporting observations such as Cuff size could use other datatypes such as CodeableConcept.
     *  */
    value: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: number;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: "<" | "<=" | ">=" | ">" | "ad";
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: string;
        /**
         * Coded responses from the common UCUM units for vital signs value set.
         *  */
        code: string;
    };
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
     * Used when reporting vital signs panel components
     *  */
    hasMember: Reference;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * Used when reporting systolic and diastolic blood pressure.
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
         * Vital Sign Value recorded with UCUM
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

type Observation_fr_core_observation_body_weight_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Other information that may be relevant to this event.
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
    status: "registered" | "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error" | "unknown";
    /**
     * Classification of  type of observation
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Body Weight
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
     * Often just a dateTime for Vital Signs
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
     * Vital Signs value are recorded using the Quantity data type. For supporting observations such as Cuff size could use other datatypes such as CodeableConcept.
     *  */
    value: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: number;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: "<" | "<=" | ">=" | ">" | "ad";
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: string;
        /**
         * Coded responses from the common UCUM units for vital signs value set.
         *  */
        code: string;
    };
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
     * Used when reporting vital signs panel components
     *  */
    hasMember: Reference;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * Used when reporting systolic and diastolic blood pressure.
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
         * Vital Sign Value recorded with UCUM
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

type Observation_fr_core_observation_bp_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Other information that may be relevant to this event.
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
    status: "registered" | "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error" | "unknown";
    /**
     * Classification of  type of observation
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Blood Pressure
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
     * Often just a dateTime for Vital Signs
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
     * Vital Signs value are recorded using the Quantity data type. For supporting observations such as Cuff size could use other datatypes such as CodeableConcept.
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
     * Used when reporting vital signs panel components
     *  */
    hasMember: Reference;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * Mean blood pressure
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
         * Plain text representation of the concept
         *  */
        code: string;
        /**
         * Vital Sign Value recorded with UCUM
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

type Observation_fr_core_observation_head_circum_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Other information that may be relevant to this event.
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
    status: "registered" | "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error" | "unknown";
    /**
     * Classification of  type of observation
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Head Circumference
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
     * Often just a dateTime for Vital Signs
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
     * Vital Signs value are recorded using the Quantity data type. For supporting observations such as Cuff size could use other datatypes such as CodeableConcept.
     *  */
    value: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: number;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: "<" | "<=" | ">=" | ">" | "ad";
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: string;
        /**
         * Coded responses from the common UCUM units for vital signs value set.
         *  */
        code: string;
    };
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
     * Used when reporting vital signs panel components
     *  */
    hasMember: Reference;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * Used when reporting systolic and diastolic blood pressure.
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
         * Vital Sign Value recorded with UCUM
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

type Observation_fr_core_observation_heartrate_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Other information that may be relevant to this event.
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
    status: "registered" | "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error" | "unknown";
    /**
     * Classification of  type of observation
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Heart Rate
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
     * Often just a dateTime for Vital Signs
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
     * Vital Signs value are recorded using the Quantity data type. For supporting observations such as Cuff size could use other datatypes such as CodeableConcept.
     *  */
    value: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: number;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: "<" | "<=" | ">=" | ">" | "ad";
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: string;
        /**
         * Coded responses from the common UCUM units for vital signs value set.
         *  */
        code: string;
    };
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
    bodySite: {
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
     * How it was done
     *  */
    method: {
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
     * Used when reporting vital signs panel components
     *  */
    hasMember: Reference;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * Used when reporting systolic and diastolic blood pressure.
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
         * Vital Sign Value recorded with UCUM
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

type Observation_fr_core_observation_resp_rate_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Other information that may be relevant to this event.
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
    status: "registered" | "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error" | "unknown";
    /**
     * Classification of  type of observation
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Respiratory Rate
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
     * Often just a dateTime for Vital Signs
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
     * Vital Signs value are recorded using the Quantity data type. For supporting observations such as Cuff size could use other datatypes such as CodeableConcept.
     *  */
    value: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: number;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: "<" | "<=" | ">=" | ">" | "ad";
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: string;
        /**
         * Coded responses from the common UCUM units for vital signs value set.
         *  */
        code: string;
    };
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
     * Used when reporting vital signs panel components
     *  */
    hasMember: Reference;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * Used when reporting systolic and diastolic blood pressure.
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
         * Vital Sign Value recorded with UCUM
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

type Observation_fr_core_observation_saturation_oxygen_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Other information that may be relevant to this event.
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
    partOf: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Literal reference, Relative, internal or absolute URL
         *  */
        reference: string;
        /**
         * Type the reference refers to (e.g. "Patient")
         *  */
        type: "Base";
        /**
         * Logical reference, when literal reference is not known
         *  */
        identifier: Identifier;
        /**
         * Text alternative for the resource
         *  */
        display: string;
    };
    /**
     * registered | preliminary | final | amended +
     *  */
    status: "registered" | "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error" | "unknown";
    /**
     * Classification of  type of observation
     *  */
    category: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Oxygen Saturation
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
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
     * Often just a dateTime for Vital Signs
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
     * Vital Signs value are recorded using the Quantity data type. For supporting observations such as Cuff size could use other datatypes such as CodeableConcept.
     *  */
    value: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Numerical value (with implicit precision)
         *  */
        value: number;
        /**
         * < | <= | >= | > - how to understand the value
         *  */
        comparator: "<" | "<=" | ">=" | ">" | "ad";
        /**
         * Unit representation
         *  */
        unit: string;
        /**
         * System that defines coded unit form
         *  */
        system: string;
        /**
         * Coded responses from the common UCUM units for vital signs value set.
         *  */
        code: string;
    };
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
     * Used when reporting vital signs panel components
     *  */
    hasMember: Reference;
    /**
     * Related measurements the observation is made from
     *  */
    derivedFrom: Reference;
    /**
     * Used when reporting systolic and diastolic blood pressure.
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
         * Vital Sign Value recorded with UCUM
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
    "fr-core-observation-bmi": Observation_fr_core_observation_bmi_Props;
    "fr-core-observation-body-height": Observation_fr_core_observation_body_height_Props;
    "fr-core-observation-body-temperature": Observation_fr_core_observation_body_temperature_Props;
    "fr-core-observation-body-weight": Observation_fr_core_observation_body_weight_Props;
    "fr-core-observation-bp": Observation_fr_core_observation_bp_Props;
    "fr-core-observation-head-circum": Observation_fr_core_observation_head_circum_Props;
    "fr-core-observation-heartrate": Observation_fr_core_observation_heartrate_Props;
    "fr-core-observation-resp-rate": Observation_fr_core_observation_resp_rate_Props;
    "fr-core-observation-saturation-oxygen": Observation_fr_core_observation_saturation_oxygen_Props;
};

export declare function observation<T extends keyof Observation__lookups>(type: T, props: Observation__lookups[T]);;

type Organization_fr_core_organization_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * RPPS rang (11 chiffres RPPS + 2 chiffres RANG)
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: string;
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
     * Whether the organization's record is still in active use
     *  */
    active: boolean;
    /**
     * Catégorie d'établissement du RASS
     *  */
    type: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Name used for the organization
     *  */
    name: string;
    /**
     * A list of alternate names that the organization is known as, or was known as in the past
     *  */
    alias: string;
    /**
     * Details of a Technology mediated contact point (phone, fax, email, etc.)
     *  */
    telecom: ContactPoint;
    /**
     * An address expressed using postal conventions (as opposed to GPS or other location definition formats)
     *  */
    address: Address;
    /**
     * The organization of which this organization forms a part
     *  */
    partOf: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Literal reference, Relative, internal or absolute URL
         *  */
        reference: string;
        /**
         * Type the reference refers to (e.g. "Patient")
         *  */
        type: string;
        /**
         * Logical reference, when literal reference is not known
         *  */
        identifier: Identifier;
        /**
         * Text alternative for the resource
         *  */
        display: string;
    };
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
         * Details of a Technology mediated contact point (phone, fax, email, etc.)
         *  */
        telecom: ContactPoint;
        /**
         * An address expressed using postal conventions (as opposed to GPS or other location definition formats)
         *  */
        address: Address;
    };
    /**
     * Technical endpoints providing access to services operated for the organization
     *  */
    endpoint: Reference;
};

type Organization_fr_core_organization_pole_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Identifies this organization  across multiple systems
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: string;
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
    partOf: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Literal reference, Relative, internal or absolute URL
         *  */
        reference: string;
        /**
         * Type the reference refers to (e.g. "Patient")
         *  */
        type: string;
        /**
         * Logical reference, when literal reference is not known
         *  */
        identifier: Identifier;
        /**
         * Text alternative for the resource
         *  */
        display: string;
    };
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

type Organization_fr_core_organization_uac_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Identifies this organization  across multiple systems
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: string;
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
    partOf: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Literal reference, Relative, internal or absolute URL
         *  */
        reference: string;
        /**
         * Type the reference refers to (e.g. "Patient")
         *  */
        type: string;
        /**
         * Logical reference, when literal reference is not known
         *  */
        identifier: Identifier;
        /**
         * Text alternative for the resource
         *  */
        display: string;
    };
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

type Organization_fr_core_organization_uf_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Extension
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Identifies this organization  across multiple systems
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: string;
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
    "fr-core-organization": Organization_fr_core_organization_Props;
    "fr-core-organization-pole": Organization_fr_core_organization_pole_Props;
    "fr-core-organization-uac": Organization_fr_core_organization_uac_Props;
    "fr-core-organization-uf": Organization_fr_core_organization_uf_Props;
};

export declare function organization<T extends keyof Organization__lookups>(type: T, props: Organization__lookups[T]);;

type Patient_fr_core_patient_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Place of Birth for patient
     *  */
    extension: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * identifies the meaning of the extension
         *  */
        url: string;
        /**
         * An address expressed using postal conventions (as opposed to GPS or other location definition formats)
         *  */
        value: Address;
    };
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Regional Registry ID | Identifiant régional
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: string;
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
     * Whether this patient's record is in active use
     *  */
    active: boolean;
    /**
     * Name of a human | Nom de naissance
     *  */
    name: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Dans le cas d’une identité créée ou modifiée par un appel au téléservice INSi, il s’agit de la liste des prénoms retournée par le téléservice. Ce composant contient tous les prénoms du patient, y compris le premier, que l'on retrouve également dans le champ name.given. Il s'agit de la liste des prénoms du patient, qu'elle soit issue d'une saisie locale ou du retour à l'appel au téléservice INSi. Conformément aux spécifications INS, cette liste est constituée des prénoms, séparés par des espaces.
         *  */
        "birth-list-given-name": any;
        /**
         * usual | official | temp | nickname | anonymous | old | maiden
         *  */
        use: "usual" | "official" | "temp" | "nickname" | "anonymous" | "old";
        /**
         * Text representation of the full name
         *  */
        text: string;
        /**
         * Family name (often called 'Surname')
         *  */
        family: string;
        /**
         * Given names (not always 'first'). Includes middle names
         *  */
        given: string;
        /**
         * Parts that come before the name
         *  */
        prefix: string;
        /**
         * Parts that come after the name
         *  */
        suffix: string;
        /**
         * Time period when name was/is in use
         *  */
        period: Period;
    };
    /**
     * Details of a Technology mediated contact point (phone, fax, email, etc.)
     *  */
    telecom: ContactPoint;
    /**
     * male | female | other | unknown
     *  */
    gender: "male" | "female" | "other" | "unknown";
    /**
     * The date of birth for the french patient checked with the INSitelservice | Date de naissance du patient. Dans le cas d'une identité récupérée du téléservice INSi, la date de naissance est modifiée selon les règles du RNIV dans le cas de dates exceptionnelles.
     *  */
    birthDate: string;
    /**
     * Indicates if the individual is deceased or not
     *  */
    deceased: boolean;
    /**
     * An address expressed using postal conventions (as opposed to GPS or other location definition formats)
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
         * Contact identifier in the patient resource | Identifiant de contact dans la ressource Patient
         *  */
        contactIdentifier: any;
        /**
         * Comment on a dataElement | Commentaire sur un dataElement
         *  */
        comment: any;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The nature of the relationship. Relation de la personne. Ex : Mère, époux, enfant ...
         *  */
        relationship: CodeableConcept;
        /**
         * Name of a human - parts and usage
         *  */
        name: HumanName;
        /**
         * Details of a Technology mediated contact point (phone, fax, email, etc.)
         *  */
        telecom: ContactPoint;
        /**
         * Address for the contact person
         *  */
        address: Address;
        /**
         * male | female | other | unknown
         *  */
        gender: "male" | "female" | "other" | "unknown";
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
        type: "replaced-by" | "replaces" | "refer" | "seealso";
    };
};

type Patient_fr_core_patient_ins_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * Place of Birth for patient
     *  */
    extension: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * identifies the meaning of the extension
         *  */
        url: string;
        /**
         * Time period when address was/is in use
         *  */
        value: Period;
    };
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * INS-NIA - The temporary patient health national identifier obtained by requesting the national patient identification service (CNAM)| Identifiant national temporaire de santé du patient obtenu par interrogation du téléservice INSi de la CNAM
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * Autorité d'affectation des INS-NIA
         *  */
        system: string;
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
     * Whether this patient's record is in active use
     *  */
    active: boolean;
    /**
     * Name of a human | Nom de naissance
     *  */
    name: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Dans le cas d’une identité créée ou modifiée par un appel au téléservice INSi, il s’agit de la liste des prénoms retournée par le téléservice. Ce composant contient tous les prénoms du patient, y compris le premier, que l'on retrouve également dans le champ name.given. Il s'agit de la liste des prénoms du patient, qu'elle soit issue d'une saisie locale ou du retour à l'appel au téléservice INSi. Conformément aux spécifications INS, cette liste est constituée des prénoms, séparés par des espaces.
         *  */
        "birth-list-given-name": any;
        /**
         * usual | official | temp | nickname | anonymous | old | maiden
         *  */
        use: "usual" | "official" | "temp" | "nickname" | "anonymous" | "old";
        /**
         * Text representation of the full name
         *  */
        text: string;
        /**
         * Family name (often called 'Surname')
         *  */
        family: string;
        /**
         * Dans le cas d’une identité créée ou modifiée par un appel au téléservice INSi, il est nécessaire d’extraire le premier prénom de la liste des prénoms retournée par le téléservice et de l'inclure dans le champs given. En cas de prénom composé, given peut par exemple contenir 'Anne-sophie' ou 'Anne Sophie'.
         *  */
        given: string;
        /**
         * Parts that come before the name
         *  */
        prefix: string;
        /**
         * Parts that come after the name
         *  */
        suffix: string;
        /**
         * Time period when name was/is in use
         *  */
        period: Period;
    };
    /**
     * Details of a Technology mediated contact point (phone, fax, email, etc.)
     *  */
    telecom: ContactPoint;
    /**
     * male | female | unknown
     *  */
    gender: string;
    /**
     * The date of birth for the french patient checked with the INSitelservice | Date de naissance du patient. Dans le cas d'une identité récupérée du téléservice INSi, la date de naissance est modifiée selon les règles du RNIV dans le cas de dates exceptionnelles.
     *  */
    birthDate: string;
    /**
     * Indicates if the individual is deceased or not
     *  */
    deceased: boolean;
    /**
     * An address expressed using postal conventions (as opposed to GPS or other location definition formats)
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
         * Contact identifier in the patient resource | Identifiant de contact dans la ressource Patient
         *  */
        contactIdentifier: any;
        /**
         * Comment on a dataElement | Commentaire sur un dataElement
         *  */
        comment: any;
        /**
         * Extensions that cannot be ignored even if unrecognized
         *  */
        modifierExtension: Extension;
        /**
         * The nature of the relationship. Relation de la personne. Ex : Mère, époux, enfant ...
         *  */
        relationship: CodeableConcept;
        /**
         * Name of a human - parts and usage
         *  */
        name: HumanName;
        /**
         * Details of a Technology mediated contact point (phone, fax, email, etc.)
         *  */
        telecom: ContactPoint;
        /**
         * Address for the contact person
         *  */
        address: Address;
        /**
         * male | female | other | unknown
         *  */
        gender: "male" | "female" | "other" | "unknown";
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
        type: "replaced-by" | "replaces" | "refer" | "seealso";
    };
};

type Patient__lookups = {
    "fr-core-patient": Patient_fr_core_patient_Props;
    "fr-core-patient-ins": Patient_fr_core_patient_ins_Props;
};

export declare function patient<T extends keyof Patient__lookups>(type: T, props: Patient__lookups[T]);;

type Practitioner_fr_core_practitioner_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * FR Core Practitioner Specialty Extension
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Numéro ADELI (9 chiffres)
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: string;
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
     * Whether this practitioner's record is in active use
     *  */
    active: boolean;
    /**
     * Name of a human - parts and usage
     *  */
    name: HumanName;
    /**
     * Details of a Technology mediated contact point (phone, fax, email, etc.)
     *  */
    telecom: ContactPoint;
    /**
     * An address expressed using postal conventions (as opposed to GPS or other location definition formats)
     *  */
    address: Address;
    /**
     * male | female | other | unknown
     *  */
    gender: "male" | "female" | "other" | "unknown";
    /**
     * The date  on which the practitioner was born
     *  */
    birthDate: string;
    /**
     * Image of the person
     *  */
    photo: Attachment;
    /**
     * Qualifications obtained by training and certification | Diplômes. Les différents diplômes sont : les diplômes d'état français, les commissions de qualification, les diplômes d'études spécialisées, les DESC groupe 1 et 2, les capacités, les diplômes d'un pays de l'EEE, les diplômes d'université (DU) ou Inter-Universitaire, les certificats d'étude spéciale, les attestations, les diplômes européens d'études spécialisées, les diplômes de 2ème cycle non qualifiant et les autres types de diplômes. Pour plus d'informations, consulter le jeu de valeurs associé.
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
    "fr-core-practitioner": Practitioner_fr_core_practitioner_Props;
};

export declare function practitioner<T extends keyof Practitioner__lookups>(type: T, props: Practitioner__lookups[T]);;

type PractitionerRole_fr_core_practitioner_role_exercice_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * FR Core Service Type Duration Extension
     *  */
    extension: Extension;
    /**
     * Extensions that cannot be ignored
     *  */
    modifierExtension: Extension;
    /**
     * Business Identifiers that are specific to a role/location
     *  */
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value | Namespace du RASS)
         *  */
        system: string;
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
     * The role a person plays representing an organization | Rôle (situation d'exercice) du professionnel de santé au sein de l'organisation
     *  */
    code: CodeableConcept;
    /**
     * Specific specialty associated with the organization | spécialité ordinale du professionnel de santé au sein de l'organisation
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
     * Details of a Technology mediated contact point | Coordonnées électroniques détaillées
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
        daysOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
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

type PractitionerRole_fr_core_practitioner_role_profession_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Professions which this practitioner may have
     *  */
    code: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Catégorie professionnnelle selon le MOS de l'ANS
         *  */
        professionnalCategory: any;
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
     * Details of a Technology mediated contact point (phone, fax, email, etc.)
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
        daysOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
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
    "fr-core-practitioner-role-exercice": PractitionerRole_fr_core_practitioner_role_exercice_Props;
    "fr-core-practitioner-role-profession": PractitionerRole_fr_core_practitioner_role_profession_Props;
};

export declare function practitionerRole<T extends keyof PractitionerRole__lookups>(type: T, props: PractitionerRole__lookups[T]);;

type RelatedPerson_fr_core_related_person_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * The nature of the relationship. Relation de la personne. Ex : Mère, époux, enfant ...
     *  */
    relationship: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * If this coding was chosen directly by the user
         *  */
        coding: boolean;
        /**
         * Plain text representation of the concept
         *  */
        text: string;
    };
    /**
     * Name of a human - parts and usage
     *  */
    name: HumanName;
    /**
     * Details of a Technology mediated contact point (phone, fax, email, etc.)
     *  */
    telecom: ContactPoint;
    /**
     * male | female | other | unknown
     *  */
    gender: "male" | "female" | "other" | "unknown";
    /**
     * The date on which the related person was born
     *  */
    birthDate: string;
    /**
     * An address expressed using postal conventions (as opposed to GPS or other location definition formats)
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
    "fr-core-related-person": RelatedPerson_fr_core_related_person_Props;
};

export declare function relatedPerson<T extends keyof RelatedPerson__lookups>(type: T, props: RelatedPerson__lookups[T]);;

type Schedule_fr_core_schedule_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
     * Text summary of the resource, for human interpretation
     *  */
    text: Narrative;
    /**
     * Contained, inline Resources
     *  */
    contained: Resource;
    /**
     * FR Core Schedule availability time Extension
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
    "fr-core-schedule": Schedule_fr_core_schedule_Props;
};

export declare function schedule<T extends keyof Schedule__lookups>(type: T, props: Schedule__lookups[T]);;

type Slot_fr_core_slot_Props = {
    /**
     * Logical id of this artifact
     *  */
    id: string;
    /**
     * Metadata about the resource
     *  */
    meta: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Version specific identifier
         *  */
        versionId: string;
        /**
         * When the resource version last changed
         *  */
        lastUpdated: string;
        /**
         * Identifies where the resource comes from
         *  */
        source: string;
        /**
         * Profiles this resource claims to conform to
         *  */
        profile: any;
        /**
         * Security Labels applied to this resource
         *  */
        security: Coding;
        /**
         * Tags applied to this resource
         *  */
        tag: Coding;
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
    identifier: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * usual | official | temp | secondary | old (If known)
         *  */
        use: "usual" | "official" | "temp" | "secondary" | "old";
        /**
         * Description of identifier
         *  */
        type: CodeableConcept;
        /**
         * The namespace for the identifier value
         *  */
        system: string;
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
    status: "busy" | "free" | "busy-unavailable" | "busy-tentative" | "entered-in-error";
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
    "fr-core-slot": Slot_fr_core_slot_Props;
};

export declare function slot<T extends keyof Slot__lookups>(type: T, props: Slot__lookups[T]);;
