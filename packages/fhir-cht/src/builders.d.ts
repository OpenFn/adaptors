
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import "./globals";

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
        tag: "actionable" | "_ActCoverageAssessmentObservationValue" | "_AllergyTestValue" | "_CompositeMeasureScoring" | "_CoverageLimitObservationValue" | "_CriticalityObservationValue" | "_EmploymentStatus" | "_GeneticObservationValue" | "_MeasurementImprovementNotation" | "_ObservationMeasureScoring" | "_ObservationMeasureType" | "_ObservationPopulationInclusion" | "_PartialCompletionScale" | "_SecurityObservationValue" | "_SeverityObservation" | "_SubjectBodyPosition" | "_VerificationOutcomeValue" | "_WorkSchedule" | "_AnnotationValue" | "_CommonClinicalObservationValue" | "_CoverageChemicalDependencyValue" | "_IndividualCaseSafetyReportValueDomains" | "_InjuryObservationValue" | "_IntoleranceValue" | "_IssueTriggerObservationValue" | "_OtherIndicationValue" | "_IndicationValue";
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
        type: "AC" | "ACSN" | "AIN" | "AM" | "AMA" | "AN" | "ANC" | "AND" | "ANON" | "ANT" | "APRN" | "ASID" | "BA" | "BC" | "BCFN" | "BCT" | "BR" | "BRN" | "BSNR" | "CAAI" | "CC" | "CONM" | "CY" | "CZ" | "DC" | "DCFN" | "DDS" | "DEA" | "DFN" | "DI" | "DL" | "DN" | "DO" | "DP" | "DPM" | "DR" | "DS" | "DSG" | "EI" | "EN" | "ESN" | "FDR" | "FDRFN" | "FGN" | "FI" | "FILL" | "GI" | "GIN" | "GL" | "GN" | "HC" | "IND" | "IRISTEM" | "JHN" | "LACSN" | "LANR" | "LI" | "L&I" | "LN" | "LR" | "MA" | "MB" | "MC" | "MCD" | "MCN" | "MCR" | "MCT" | "MD" | "MI" | "MR" | "MRT" | "MS" | "NBSNR" | "NCT" | "NE" | "NH" | "NI" | "NII" | "NIIP" | "NNxxx" | "NP" | "NPI" | "OBI" | "OD" | "PA" | "PC" | "PCN" | "PE" | "PEN" | "PGN" | "PHC" | "PHE" | "PHO" | "PI" | "PIN" | "PLAC" | "PN" | "PNT" | "PPIN" | "PPN" | "PRC" | "PRN" | "PT" | "QA" | "RI" | "RN" | "RPH" | "RR" | "RRI" | "RRP" | "SAMN" | "SB" | "SID" | "SL" | "SN" | "SNBSN" | "SNO" | "SP" | "SR" | "SRX" | "SS" | "STN" | "TAX" | "TN" | "TPR" | "TRL" | "U" | "UDI" | "UPIN" | "USID" | "VN" | "VP" | "VS" | "WC" | "WCN" | "WP" | "XV" | "XX";
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
    maritalStatus: "PACS" | "A" | "D" | "I" | "L" | "M" | "P" | "T" | "U" | "W" | "NI" | "NP" | "NAV" | "DER" | "OTH" | "UNC" | "INV" | "MSK" | "NA" | "UNK" | "NINF" | "PINF" | "ASKU" | "NASK" | "NAVU" | "QS" | "TRC";
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
        tag: "actionable" | "_ActCoverageAssessmentObservationValue" | "_AllergyTestValue" | "_CompositeMeasureScoring" | "_CoverageLimitObservationValue" | "_CriticalityObservationValue" | "_EmploymentStatus" | "_GeneticObservationValue" | "_MeasurementImprovementNotation" | "_ObservationMeasureScoring" | "_ObservationMeasureType" | "_ObservationPopulationInclusion" | "_PartialCompletionScale" | "_SecurityObservationValue" | "_SeverityObservation" | "_SubjectBodyPosition" | "_VerificationOutcomeValue" | "_WorkSchedule" | "_AnnotationValue" | "_CommonClinicalObservationValue" | "_CoverageChemicalDependencyValue" | "_IndividualCaseSafetyReportValueDomains" | "_InjuryObservationValue" | "_IntoleranceValue" | "_IssueTriggerObservationValue" | "_OtherIndicationValue" | "_IndicationValue";
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
        type: "AC" | "ACSN" | "AIN" | "AM" | "AMA" | "AN" | "ANC" | "AND" | "ANON" | "ANT" | "APRN" | "ASID" | "BA" | "BC" | "BCFN" | "BCT" | "BR" | "BRN" | "BSNR" | "CAAI" | "CC" | "CONM" | "CY" | "CZ" | "DC" | "DCFN" | "DDS" | "DEA" | "DFN" | "DI" | "DL" | "DN" | "DO" | "DP" | "DPM" | "DR" | "DS" | "DSG" | "EI" | "EN" | "ESN" | "FDR" | "FDRFN" | "FGN" | "FI" | "FILL" | "GI" | "GIN" | "GL" | "GN" | "HC" | "IND" | "IRISTEM" | "JHN" | "LACSN" | "LANR" | "LI" | "L&I" | "LN" | "LR" | "MA" | "MB" | "MC" | "MCD" | "MCN" | "MCR" | "MCT" | "MD" | "MI" | "MR" | "MRT" | "MS" | "NBSNR" | "NCT" | "NE" | "NH" | "NI" | "NII" | "NIIP" | "NNxxx" | "NP" | "NPI" | "OBI" | "OD" | "PA" | "PC" | "PCN" | "PE" | "PEN" | "PGN" | "PHC" | "PHE" | "PHO" | "PI" | "PIN" | "PLAC" | "PN" | "PNT" | "PPIN" | "PPN" | "PRC" | "PRN" | "PT" | "QA" | "RI" | "RN" | "RPH" | "RR" | "RRI" | "RRP" | "SAMN" | "SB" | "SID" | "SL" | "SN" | "SNBSN" | "SNO" | "SP" | "SR" | "SRX" | "SS" | "STN" | "TAX" | "TN" | "TPR" | "TRL" | "U" | "UDI" | "UPIN" | "USID" | "VN" | "VP" | "VS" | "WC" | "WCN" | "WP" | "XV" | "XX";
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
    maritalStatus: "PACS" | "A" | "D" | "I" | "L" | "M" | "P" | "T" | "U" | "W" | "NI" | "NP" | "NAV" | "DER" | "OTH" | "UNC" | "INV" | "MSK" | "NA" | "UNK" | "NINF" | "PINF" | "ASKU" | "NASK" | "NAVU" | "QS" | "TRC";
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

type Patient_variants = "fr-core-patient" | "fr-core-patient-ins";

type Patient__lookups = {
    "fr-core-patient": Patient_fr_core_patient_Props;
    "fr-core-patient-ins": Patient_fr_core_patient_ins_Props;
};

export declare function patient<T extends Patient_variants>(type: Patient_variants, props: Patient__lookups[T]);;
