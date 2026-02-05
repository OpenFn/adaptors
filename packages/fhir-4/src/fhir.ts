
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

export interface Address {
    /** Name of city, town etc. */
    city?: string;
    /** Country (e.g. can be ISO 3166 2 or 3 letter code) */
    country?: string;
    /** District name (aka county) */
    district?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Street name, number, direction & P.O. Box etc. */
    line?: string[];
    /** Time period when address was/is in use */
    period?: Period;
    /** Postal code for area */
    postalCode?: string;
    /** Sub-unit of country (abbreviations ok) */
    state?: string;
    /** Text representation of the address */
    text?: string;
    /** postal | physical | both */
    type?: string;
    /** home | work | temp | old | billing - purpose of this address */
    use?: string;
}
export interface Age {
    /** Coded form of the unit */
    code?: string;
    /** < | <= | >= | > - how to understand the value */
    comparator?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** System that defines coded unit form */
    system?: string;
    /** Unit representation */
    unit?: string;
    /** Numerical value (with implicit precision) */
    value?: number;
}
export interface Annotation {
    /** Individual responsible for the annotation */
    author?: (string | Reference) | string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** The annotation  - text content (as markdown) */
    text?: markdown;
    /** When the annotation was made */
    time?: string;
}
export interface Attachment {
    /** Mime type of the content, with charset etc. */
    contentType?: string;
    /** Date attachment was first created */
    creation?: string;
    /** Data inline, base64ed */
    data?: base64Binary;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Hash of the data (sha-1, base64ed) */
    hash?: base64Binary;
    /** Unique id for inter-element referencing */
    id?: string;
    /** Human language of the content (BCP-47) */
    language?: string;
    /** Number of bytes of content (if url provided) */
    size?: number;
    /** Label to display in place of the data */
    title?: string;
    /** Uri where the data can be found */
    url?: url;
}
export interface BackboneElement {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Extensions that cannot be ignored even if unrecognized */
    modifierExtension?: Extension[];
}
export interface CodeableConcept {
    /** Code defined by a terminology system */
    coding?: Coding[];
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Plain text representation of the concept */
    text?: string;
}
export interface CodeableReference {
    /** Reference to a concept (by class) */
    concept?: string[] | CodeableConcept;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Reference to a resource (by instance) */
    reference?: string | Reference;
}
export interface Coding {
    /** Symbol in syntax defined by the system */
    code?: string;
    /** Representation defined by the system */
    display?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Identity of the terminology system */
    system?: string;
    /** If this coding was chosen directly by the user */
    userSelected?: boolean;
    /** Version of the system - if relevant */
    version?: string;
}
export interface ContactDetail {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Name of an individual to contact */
    name?: string;
    /** Contact details for individual or organization */
    telecom?: ContactPoint[];
}
export interface ContactPoint {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Time period when the contact point was/is in use */
    period?: Period;
    /** Specify preferred order of use (1 = highest) */
    rank?: number;
    /** phone | fax | email | pager | url | sms | other */
    system?: string;
    /** home | work | temp | old | mobile - purpose of this contact point */
    use?: string;
    /** The actual contact point details */
    value?: string;
}
export interface Contributor {
    /** Contact details of the contributor */
    contact?: ContactDetail[];
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Who contributed the content */
    name?: string;
    /** author | editor | reviewer | endorser */
    type?: string;
}
export interface Count {
    /** Coded form of the unit */
    code?: string;
    /** < | <= | >= | > - how to understand the value */
    comparator?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** System that defines coded unit form */
    system?: string;
    /** Unit representation */
    unit?: string;
    /** Numerical value (with implicit precision) */
    value?: number;
}
export interface DataRequirement {
    /** What codes are expected */
    codeFilter?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * A code-valued attribute to filter on
         *  */
        path: string;
        /**
         * A coded (token) parameter to search on
         *  */
        searchParam: string;
        /**
         * Valueset for the filter
         *  */
        valueSet: any;
        /**
         * What code is expected
         *  */
        code: Coding;
    };
    /** What dates/date ranges are expected */
    dateFilter?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * A date-valued attribute to filter on
         *  */
        path: string;
        /**
         * A date valued parameter to search on
         *  */
        searchParam: string;
        /**
         * The value of the filter, as a Period, DateTime, or Duration value
         *  */
        value: string;
    };
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Number of results */
    limit?: number;
    /** Indicates specific structure elements that are referenced by the knowledge module */
    mustSupport?: string[];
    /** The profile of the required data */
    profile?: any[];
    /** Order of the results */
    sort?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * The name of the attribute to perform the sort
         *  */
        path: string;
        /**
         * ascending | descending
         *  */
        direction: string;
    };
    /** E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device */
    subject?: (string[] | CodeableConcept) | (string | Reference);
    /** The type of the required data */
    type?: string;
}
export interface Distance {
    /** Coded form of the unit */
    code?: string;
    /** < | <= | >= | > - how to understand the value */
    comparator?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** System that defines coded unit form */
    system?: string;
    /** Unit representation */
    unit?: string;
    /** Numerical value (with implicit precision) */
    value?: number;
}
export interface Dosage {
    /** Supplemental instruction or warnings to the patient - e.g. "with meals", "may cause drowsiness" */
    additionalInstruction?: string[] | CodeableConcept;
    /** Take "as needed" (for x) */
    asNeeded?: boolean | (string[] | CodeableConcept);
    /** Amount of medication administered */
    doseAndRate?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * The kind of dose or rate specified
         *  */
        type: CodeableConcept;
        /**
         * Amount of medication per dose
         *  */
        dose: Range;
        /**
         * Amount of medication per unit of time
         *  */
        rate: Ratio;
    };
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Upper limit on medication per administration */
    maxDosePerAdministration?: Quantity;
    /** Upper limit on medication per lifetime of the patient */
    maxDosePerLifetime?: Quantity;
    /** Upper limit on medication per unit of time */
    maxDosePerPeriod?: Ratio;
    /** Technique for administering medication */
    method?: string[] | CodeableConcept;
    /** Extensions that cannot be ignored even if unrecognized */
    modifierExtension?: Extension[];
    /** Patient or consumer oriented instructions */
    patientInstruction?: string;
    /** How drug should enter body */
    route?: string[] | CodeableConcept;
    /** The order of the dosage instructions */
    sequence?: number;
    /** Body site to administer to */
    site?: string[] | CodeableConcept;
    /** Free text dosage instructions e.g. SIG */
    text?: string;
    /** When medication should be administered */
    timing?: Timing;
}
export interface Duration {
    /** Coded form of the unit */
    code?: string;
    /** < | <= | >= | > - how to understand the value */
    comparator?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** System that defines coded unit form */
    system?: string;
    /** Unit representation */
    unit?: string;
    /** Numerical value (with implicit precision) */
    value?: number;
}
export interface Element {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
}
export interface ElementDefinition {
    /** Other names */
    alias?: string[];
    /** Base definition information for tools */
    base?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Path that identifies the base element
         *  */
        path: string;
        /**
         * Min cardinality of the base element
         *  */
        min: number;
        /**
         * Max cardinality of the base element
         *  */
        max: string;
    };
    /** ValueSet details if this is coded */
    binding?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * required | extensible | preferred | example
         *  */
        strength: string;
        /**
         * Human explanation of the value set
         *  */
        description: string;
        /**
         * Source of value set
         *  */
        valueSet: any;
    };
    /** Corresponding codes in terminologies */
    code?: Coding;
    /** Comments about the use of this element */
    comment?: markdown;
    /** Reference to invariant about presence */
    condition?: string[];
    /** Condition that must evaluate to true */
    constraint?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Target of 'condition' reference above
         *  */
        key: string;
        /**
         * Why this constraint is necessary or appropriate
         *  */
        requirements: string;
        /**
         * error | warning
         *  */
        severity: string;
        /**
         * Human description of constraint
         *  */
        human: string;
        /**
         * FHIRPath expression of constraint
         *  */
        expression: string;
        /**
         * XPath expression of constraint
         *  */
        xpath: string;
        /**
         * Reference to original source of constraint
         *  */
        source: any;
    };
    /** Reference to definition of content for the element */
    contentReference?: string;
    /** Specified value if missing from instance */
    defaultValue?: base64Binary | boolean | any | string | string | string | number | string | string | number | markdown | oid | number | string | string | number | string | url | uuid | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
    /** Full formal definition as narrative text */
    definition?: markdown;
    /** Example value (as defined for type) */
    example?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Describes the purpose of this example
         *  */
        label: string;
        /**
         * Value of Example (one of allowed types)
         *  */
        value: base64Binary;
    };
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Value must be exactly this */
    fixed?: base64Binary | boolean | any | string | string | string | number | string | string | number | markdown | oid | number | string | string | number | string | url | uuid | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
    /** Unique id for inter-element referencing */
    id?: string;
    /** If this modifies the meaning of other elements */
    isModifier?: boolean;
    /** Reason that this element is marked as a modifier */
    isModifierReason?: string;
    /** Include when _summary = true? */
    isSummary?: boolean;
    /** Name for element to display with or prompt for element */
    label?: string;
    /** Map element to another set of definitions */
    mapping?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Reference to mapping declaration
         *  */
        identity: string;
        /**
         * Computable language of mapping
         *  */
        language: string;
        /**
         * Details of the mapping
         *  */
        map: string;
        /**
         * Comments about the mapping or its use
         *  */
        comment: string;
    };
    /** Maximum Cardinality (a number or *) */
    max?: string;
    /** Max length for strings */
    maxLength?: number;
    /** Maximum Allowed Value (for some types) */
    maxValue?: string | string | string | string | number | number | number | number | Quantity;
    /** Implicit meaning when this element is missing */
    meaningWhenMissing?: markdown;
    /** Minimum Cardinality */
    min?: number;
    /** Minimum Allowed Value (for some types) */
    minValue?: string | string | string | string | number | number | number | number | Quantity;
    /** Extensions that cannot be ignored even if unrecognized */
    modifierExtension?: Extension[];
    /** If the element must be supported */
    mustSupport?: boolean;
    /** What the order of the elements means */
    orderMeaning?: string;
    /** Path of the element in the hierarchy of elements */
    path?: string;
    /** Value must have at least these property values */
    pattern?: base64Binary | boolean | any | string | string | string | number | string | string | number | markdown | oid | number | string | string | number | string | url | uuid | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
    /** xmlAttr | xmlText | typeAttr | cdaText | xhtml */
    representation?: string;
    /** Why this resource has been created */
    requirements?: markdown;
    /** Concise definition for space-constrained presentation */
    short?: string;
    /** If this slice definition constrains an inherited slice definition (or not) */
    sliceIsConstraining?: boolean;
    /** Name for this particular element (in a set of slices) */
    sliceName?: string;
    /** This element is sliced - slices follow */
    slicing?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Path to element value
         *  */
        discriminator: string;
        /**
         * Text description of how slicing works (or not)
         *  */
        description: string;
        /**
         * If elements must be in same order as slices
         *  */
        ordered: boolean;
        /**
         * closed | open | openAtEnd
         *  */
        rules: string;
    };
    /** Data type and Profile for this element */
    type?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Data type or Resource (reference to definition)
         *  */
        code: string;
        /**
         * Profiles (StructureDefinition or IG) - one must apply
         *  */
        profile: any;
        /**
         * Profile (StructureDefinition or IG) on the Reference/canonical target - one must apply
         *  */
        targetProfile: any;
        /**
         * contained | referenced | bundled - how aggregated
         *  */
        aggregation: string;
        /**
         * either | independent | specific
         *  */
        versioning: string;
    };
}
export interface Expression {
    /** Natural language description of the condition */
    description?: string;
    /** Expression in specified language */
    expression?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** text/cql | text/fhirpath | application/x-fhir-query | text/cql-identifier | text/cql-expression | etc. */
    language?: string;
    /** Short name assigned to expression for reuse */
    name?: string;
    /** Where the expression is found */
    reference?: string;
}
export interface Extension {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** identifies the meaning of the extension */
    url?: string;
    /** Value of extension */
    value?: base64Binary | boolean | any | string | string | string | number | string | string | number | markdown | oid | number | string | string | number | string | url | uuid | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
}
export interface HumanName {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Family name (often called 'Surname') */
    family?: string;
    /** Given names (not always 'first'). Includes middle names */
    given?: string[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Time period when name was/is in use */
    period?: Period;
    /** Parts that come before the name */
    prefix?: string[];
    /** Parts that come after the name */
    suffix?: string[];
    /** Text representation of the full name */
    text?: string;
    /** usual | official | temp | nickname | anonymous | old | maiden */
    use?: string;
}
export interface Identifier {
    /** Organization that issued id (may be just text) */
    assigner?: string | Reference;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Time period when id is/was valid for use */
    period?: Period;
    /** The namespace for the identifier value */
    system?: string;
    /** Description of identifier */
    type?: string[] | CodeableConcept;
    /** usual | official | temp | secondary | old (If known) */
    use?: string;
    /** The value that is unique */
    value?: string;
}
export interface MarketingStatus {
    /** The country in which the marketing authorisation has been granted shall be specified It should be specified using the ISO 3166 ‑ 1 alpha-2 code elements */
    country?: string[] | CodeableConcept;
    /** The date when the Medicinal Product is placed on the market by the Marketing Authorisation Holder (or where applicable, the manufacturer/distributor) in a country and/or jurisdiction shall be provided A complete date consisting of day, month and year shall be specified using the ISO 8601 date format NOTE “Placed on the market” refers to the release of the Medicinal Product into the distribution chain */
    dateRange?: Period;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Where a Medicines Regulatory Agency has granted a marketing authorisation for which specific provisions within a jurisdiction apply, the jurisdiction can be specified using an appropriate controlled terminology The controlled term and the controlled term identifier shall be specified */
    jurisdiction?: string[] | CodeableConcept;
    /** Extensions that cannot be ignored even if unrecognized */
    modifierExtension?: Extension[];
    /** The date when the Medicinal Product is placed on the market by the Marketing Authorisation Holder (or where applicable, the manufacturer/distributor) in a country and/or jurisdiction shall be provided A complete date consisting of day, month and year shall be specified using the ISO 8601 date format NOTE “Placed on the market” refers to the release of the Medicinal Product into the distribution chain */
    restoreDate?: string;
    /** This attribute provides information on the status of the marketing of the medicinal product See ISO/TS 20443 for more information and examples */
    status?: string[] | CodeableConcept;
}
export interface Meta {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** When the resource version last changed */
    lastUpdated?: string;
    /** Profiles this resource claims to conform to */
    profile?: any[];
    /** Security Labels applied to this resource */
    security?: Coding;
    /** Identifies where the resource comes from */
    source?: string;
    /** Tags applied to this resource */
    tag?: Coding;
    /** Version specific identifier */
    versionId?: string;
}
export interface Money {
    /** ISO 4217 Currency Code */
    currency?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Numerical value (with implicit precision) */
    value?: number;
}
export interface MoneyQuantity {
    /** Coded form of the unit */
    code?: string;
    /** < | <= | >= | > - how to understand the value */
    comparator?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** System that defines coded unit form */
    system?: string;
    /** Unit representation */
    unit?: string;
    /** Numerical value (with implicit precision) */
    value?: number;
}
export interface Quantity {
    /** Coded form of the unit */
    code?: string;
    /** < | <= | >= | > - how to understand the value */
    comparator?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** System that defines coded unit form */
    system?: string;
    /** Unit representation */
    unit?: string;
    /** Numerical value (with implicit precision) */
    value?: number;
}
export interface SimpleQuantity {
    /** Coded form of the unit */
    code?: string;
    /** < | <= | >= | > - how to understand the value */
    comparator?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** System that defines coded unit form */
    system?: string;
    /** Unit representation */
    unit?: string;
    /** Numerical value (with implicit precision) */
    value?: number;
}
export interface Narrative {
    /** Limited xhtml content */
    div?: xhtml;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** generated | extensions | additional | empty */
    status?: string;
}
export interface ParameterDefinition {
    /** A brief description of the parameter */
    documentation?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Maximum cardinality (a number of *) */
    max?: string;
    /** Minimum cardinality */
    min?: number;
    /** Name used to access the parameter value */
    name?: string;
    /** What profile the value is expected to be */
    profile?: any;
    /** What type of value */
    type?: string;
    /** in | out */
    use?: string;
}
export interface Period {
    /** End time with inclusive boundary, if not ongoing */
    end?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Starting time with inclusive boundary */
    start?: string;
}
export interface Population {
    /** The age of the specific population */
    age?: Range | (string[] | CodeableConcept);
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** The gender of the specific population */
    gender?: string[] | CodeableConcept;
    /** Unique id for inter-element referencing */
    id?: string;
    /** Extensions that cannot be ignored even if unrecognized */
    modifierExtension?: Extension[];
    /** The existing physiological conditions of the specific population to which this applies */
    physiologicalCondition?: string[] | CodeableConcept;
    /** Race of the specific population */
    race?: string[] | CodeableConcept;
}
export interface ProdCharacteristic {
    /** Where applicable, the color can be specified An appropriate controlled vocabulary shall be used The term and the term identifier shall be used */
    color?: string[];
    /** Where applicable, the depth can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used */
    depth?: Quantity;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Where applicable, the external diameter can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used */
    externalDiameter?: Quantity;
    /** Where applicable, the height can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used */
    height?: Quantity;
    /** Unique id for inter-element referencing */
    id?: string;
    /** Where applicable, the image can be provided The format of the image attachment shall be specified by regional implementations */
    image?: Attachment[];
    /** Where applicable, the imprint can be specified as text */
    imprint?: string[];
    /** Extensions that cannot be ignored even if unrecognized */
    modifierExtension?: Extension[];
    /** Where applicable, the nominal volume can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used */
    nominalVolume?: Quantity;
    /** Where applicable, the scoring can be specified An appropriate controlled vocabulary shall be used The term and the term identifier shall be used */
    scoring?: string[] | CodeableConcept;
    /** Where applicable, the shape can be specified An appropriate controlled vocabulary shall be used The term and the term identifier shall be used */
    shape?: string;
    /** Where applicable, the weight can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used */
    weight?: Quantity;
    /** Where applicable, the width can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used */
    width?: Quantity;
}
export interface ProductShelfLife {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Unique identifier for the packaged Medicinal Product */
    identifier?: string | Identifier;
    /** Extensions that cannot be ignored even if unrecognized */
    modifierExtension?: Extension[];
    /** The shelf life time period can be specified using a numerical value for the period of time and its unit of time measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used */
    period?: Quantity;
    /** Special precautions for storage, if any, can be specified using an appropriate controlled vocabulary The controlled term and the controlled term identifier shall be specified */
    specialPrecautionsForStorage?: string[] | CodeableConcept;
    /** This describes the shelf life, taking into account various scenarios such as shelf life of the packaged Medicinal Product itself, shelf life after transformation where necessary and shelf life after the first opening of a bottle, etc. The shelf life type shall be specified using an appropriate controlled vocabulary The controlled term and the controlled term identifier shall be specified */
    type?: string[] | CodeableConcept;
}
export interface Range {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** High limit */
    high?: Quantity;
    /** Unique id for inter-element referencing */
    id?: string;
    /** Low limit */
    low?: Quantity;
}
export interface Ratio {
    /** Denominator value */
    denominator?: Quantity;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Numerator value */
    numerator?: Quantity;
}
export interface RatioRange {
    /** Denominator value */
    denominator?: Quantity;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** High Numerator limit */
    highNumerator?: Quantity;
    /** Unique id for inter-element referencing */
    id?: string;
    /** Low Numerator limit */
    lowNumerator?: Quantity;
}
export interface Reference {
    /** Text alternative for the resource */
    display?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Logical reference, when literal reference is not known */
    identifier?: string | Identifier;
    /** Literal reference, Relative, internal or absolute URL */
    reference?: string;
    /** Type the reference refers to (e.g. "Patient") */
    type?: string;
}
export interface RelatedArtifact {
    /** Bibliographic citation for the artifact */
    citation?: markdown;
    /** Brief description of the related artifact */
    display?: string;
    /** What document is being referenced */
    document?: Attachment;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Short label */
    label?: string;
    /** What resource is being referenced */
    resource?: any;
    /** documentation | justification | citation | predecessor | successor | derived-from | depends-on | composed-of */
    type?: string;
    /** Where the artifact can be accessed */
    url?: url;
}
export interface SampledData {
    /** Decimal values with spaces, or "E" | "U" | "L" */
    data?: string;
    /** Number of sample points at each time point */
    dimensions?: number;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Multiply data by this before adding to origin */
    factor?: number;
    /** Unique id for inter-element referencing */
    id?: string;
    /** Lower limit of detection */
    lowerLimit?: number;
    /** Zero value and units */
    origin?: Quantity;
    /** Number of milliseconds between samples */
    period?: number;
    /** Upper limit of detection */
    upperLimit?: number;
}
export interface Signature {
    /** The actual signature content (XML DigSig. JWS, picture, etc.) */
    data?: base64Binary;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** The party represented */
    onBehalfOf?: string | Reference;
    /** The technical format of the signature */
    sigFormat?: string;
    /** The technical format of the signed resources */
    targetFormat?: string;
    /** Indication of the reason the entity signed the object(s) */
    type?: Coding;
    /** When the signature was created */
    when?: string;
    /** Who signed */
    who?: string | Reference;
}
export interface Timing {
    /** BID | TID | QID | AM | PM | QD | QOD | + */
    code?: string[] | CodeableConcept;
    /** When the event occurs */
    event?: string[];
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Extensions that cannot be ignored even if unrecognized */
    modifierExtension?: Extension[];
    /** When the event is to occur */
    repeat?: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Length/Range of lengths, or (Start and/or end) limits
         *  */
        bounds: Duration;
        /**
         * Number of times to repeat
         *  */
        count: number;
        /**
         * Maximum number of times to repeat
         *  */
        countMax: number;
        /**
         * How long when it happens
         *  */
        duration: number;
        /**
         * How long when it happens (Max)
         *  */
        durationMax: number;
        /**
         * s | min | h | d | wk | mo | a - unit of time (UCUM)
         *  */
        durationUnit: string;
        /**
         * Event occurs frequency times per period
         *  */
        frequency: number;
        /**
         * Event occurs up to frequencyMax times per period
         *  */
        frequencyMax: number;
        /**
         * Event occurs frequency times per period
         *  */
        period: number;
        /**
         * Upper limit of period (3-4 hours)
         *  */
        periodMax: number;
        /**
         * s | min | h | d | wk | mo | a - unit of time (UCUM)
         *  */
        periodUnit: string;
        /**
         * mon | tue | wed | thu | fri | sat | sun
         *  */
        dayOfWeek: string;
        /**
         * Time of day for action
         *  */
        timeOfDay: string;
        /**
         * Code for time period of occurrence
         *  */
        when: string;
        /**
         * Minutes from event (before or after)
         *  */
        offset: number;
    };
}
export interface TriggerDefinition {
    /** Whether the event triggers (boolean expression) */
    condition?: Expression;
    /** Triggering data of the event (multiple = 'and') */
    data?: DataRequirement[];
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Name or URI that identifies the event */
    name?: string;
    /** Timing of the event */
    timing?: Timing | (string | Reference) | string | string;
    /** named-event | periodic | data-changed | data-added | data-modified | data-removed | data-accessed | data-access-ended */
    type?: string;
}
export interface UsageContext {
    /** Type of context being specified */
    code?: Coding;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Value that defines the context */
    value?: (string[] | CodeableConcept) | Quantity | Range | (string | Reference);
}
export interface base64Binary {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for base64Binary */
    value?: string;
}
export interface code {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for code */
    value?: string;
}
export interface markdown {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for markdown */
    value?: string;
}
export interface oid {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for oid */
    value?: string;
}
export interface url {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for url */
    value?: string;
}
export interface uuid {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for uuid */
    value?: string;
}
export interface xhtml {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Actual xhtml */
    value?: string;
}
