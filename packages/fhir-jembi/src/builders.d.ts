
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

type Encounter_entry_from_outside_target_facility_encounter_Props = {
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
    class: Coding;
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
    type: CodeableConcept;
    serviceType: CodeableConcept;
    priority: CodeableConcept;
    subject: Reference;
    episodeOfCare: Reference;
    basedOn: Reference;
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
    appointment: Reference;
    period: Period;
    length: Duration;
    reasonCode: CodeableConcept;
    reasonReference: Reference;
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
    account: Reference;
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
    serviceProvider: Reference;
    partOf: Reference;
};