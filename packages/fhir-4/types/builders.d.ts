
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

interface Address {
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
interface Age {
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
interface Annotation {
    /** Individual responsible for the annotation */
    author?: (string | Reference) | string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** The annotation  - text content (as markdown) */
    text?: string;
    /** When the annotation was made */
    time?: string;
}
interface Attachment {
    /** Mime type of the content, with charset etc. */
    contentType?: string;
    /** Date attachment was first created */
    creation?: string;
    /** Data inline, base64ed */
    data?: any;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Hash of the data (sha-1, base64ed) */
    hash?: any;
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
interface BackboneElement {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Extensions that cannot be ignored even if unrecognized */
    modifierExtension?: Extension[];
}
interface CodeableConcept {
    /** Code defined by a terminology system */
    coding?: Coding[];
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Plain text representation of the concept */
    text?: string;
}
interface CodeableReference {
    /** Reference to a concept (by class) */
    concept?: string[] | CodeableConcept;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Reference to a resource (by instance) */
    reference?: string | Reference;
}
interface Coding {
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
interface ContactDetail {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Name of an individual to contact */
    name?: string;
    /** Contact details for individual or organization */
    telecom?: ContactPoint[];
}
interface ContactPoint {
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
interface Contributor {
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
interface Count {
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
interface DataRequirement {
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
interface Distance {
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
interface Dosage {
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
interface Duration {
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
interface Element {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
}
interface ElementDefinition {
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
    code?: Coding[];
    /** Comments about the use of this element */
    comment?: string;
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
    defaultValue?: any | boolean | any | string | string | string | number | string | string | number | string | string | number | string | string | number | string | url | string | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
    /** Full formal definition as narrative text */
    definition?: string;
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
        value: any;
    };
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Value must be exactly this */
    fixed?: any | boolean | any | string | string | string | number | string | string | number | string | string | number | string | string | number | string | url | string | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
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
    meaningWhenMissing?: string;
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
    pattern?: any | boolean | any | string | string | string | number | string | string | number | string | string | number | string | string | number | string | url | string | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
    /** xmlAttr | xmlText | typeAttr | cdaText | xhtml */
    representation?: string[];
    /** Why this resource has been created */
    requirements?: string;
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
interface Expression {
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
interface Extension {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** identifies the meaning of the extension */
    url?: string;
    /** Value of extension */
    value?: any | boolean | any | string | string | string | number | string | string | number | string | string | number | string | string | number | string | url | string | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
}
interface HumanName {
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
interface Identifier {
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
interface MarketingStatus {
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
interface Meta {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** When the resource version last changed */
    lastUpdated?: string;
    /** Profiles this resource claims to conform to */
    profile?: any[];
    /** Security Labels applied to this resource */
    security?: Coding[];
    /** Identifies where the resource comes from */
    source?: string;
    /** Tags applied to this resource */
    tag?: Coding[];
    /** Version specific identifier */
    versionId?: string;
}
interface Money {
    /** ISO 4217 Currency Code */
    currency?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Numerical value (with implicit precision) */
    value?: number;
}
interface MoneyQuantity {
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
interface Quantity {
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
interface SimpleQuantity {
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
interface Narrative {
    /** Limited xhtml content */
    div?: xhtml;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** generated | extensions | additional | empty */
    status?: string;
}
interface ParameterDefinition {
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
interface Period {
    /** End time with inclusive boundary, if not ongoing */
    end?: string;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Starting time with inclusive boundary */
    start?: string;
}
interface Population {
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
interface ProdCharacteristic {
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
interface ProductShelfLife {
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
interface Range {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** High limit */
    high?: Quantity;
    /** Unique id for inter-element referencing */
    id?: string;
    /** Low limit */
    low?: Quantity;
}
interface Ratio {
    /** Denominator value */
    denominator?: Quantity;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Numerator value */
    numerator?: Quantity;
}
interface RatioRange {
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
interface Reference {
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
interface RelatedArtifact {
    /** Bibliographic citation for the artifact */
    citation?: string;
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
interface SampledData {
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
interface Signature {
    /** The actual signature content (XML DigSig. JWS, picture, etc.) */
    data?: any;
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
    type?: Coding[];
    /** When the signature was created */
    when?: string;
    /** Who signed */
    who?: string | Reference;
}
interface Timing {
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
interface TriggerDefinition {
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
interface UsageContext {
    /** Type of context being specified */
    code?: Coding;
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** Unique id for inter-element referencing */
    id?: string;
    /** Value that defines the context */
    value?: (string[] | CodeableConcept) | Quantity | Range | (string | Reference);
}
interface code {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for code */
    value?: string;
}
interface url {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for url */
    value?: string;
}
interface xhtml {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Actual xhtml */
    value?: string;
}

type MaybeArray$1E<T> = T | T[];
type Account_Props = {
    contained?: any[];
    coverage?: BackboneElement[];
    description?: string;
    extension?: Extension[];
    guarantor?: BackboneElement[];
    id?: string;
    identifier?: MaybeArray$1E<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    owner?: string | Reference;
    partOf?: string | Reference;
    servicePeriod?: Period;
    status?: string;
    subject?: MaybeArray$1E<string | Reference>;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$1D<T> = T | T[];
type ActivityDefinition_Props = {
    approvalDate?: string;
    author?: ContactDetail[];
    bodySite?: MaybeArray$1D<string[] | CodeableConcept>;
    code?: string[] | CodeableConcept;
    contact?: ContactDetail[];
    contained?: any[];
    copyright?: string;
    date?: string;
    description?: string;
    doNotPerform?: boolean;
    dosage?: Dosage[];
    dynamicValue?: BackboneElement[];
    editor?: ContactDetail[];
    effectivePeriod?: Period;
    endorser?: ContactDetail[];
    experimental?: boolean;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1D<string | Identifier>;
    implicitRules?: string;
    intent?: string;
    jurisdiction?: MaybeArray$1D<string[] | CodeableConcept>;
    kind?: string;
    language?: string;
    lastReviewDate?: string;
    library?: any[];
    location?: string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    observationRequirement?: MaybeArray$1D<string | Reference>;
    observationResultRequirement?: MaybeArray$1D<string | Reference>;
    participant?: BackboneElement[];
    priority?: string;
    product?: string | Reference | string[] | CodeableConcept;
    profile?: any;
    publisher?: string;
    purpose?: string;
    quantity?: Quantity;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    specimenRequirement?: MaybeArray$1D<string | Reference>;
    status?: string;
    subject?: string[] | CodeableConcept | string | Reference | any;
    subtitle?: string;
    text?: Narrative;
    timing?: Timing | string | Age | Period | Range | Duration;
    title?: string;
    topic?: MaybeArray$1D<string[] | CodeableConcept>;
    transform?: any;
    url?: string;
    usage?: string;
    useContext?: UsageContext[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$1C<T> = T | T[];
type AdministrableProductDefinition_Props = {
    administrableDoseForm?: string[] | CodeableConcept;
    contained?: any[];
    device?: string | Reference;
    extension?: Extension[];
    formOf?: MaybeArray$1C<string | Reference>;
    id?: string;
    identifier?: MaybeArray$1C<string | Identifier>;
    implicitRules?: string;
    ingredient?: MaybeArray$1C<string[] | CodeableConcept>;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    producedFrom?: MaybeArray$1C<string | Reference>;
    property?: BackboneElement[];
    routeOfAdministration?: BackboneElement[];
    status?: string;
    text?: Narrative;
    unitOfPresentation?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$1B<T> = T | T[];
type AdverseEvent_Props = {
    actuality?: string;
    category?: MaybeArray$1B<string[] | CodeableConcept>;
    contained?: any[];
    contributor?: MaybeArray$1B<string | Reference>;
    date?: string;
    detected?: string;
    encounter?: string | Reference;
    event?: string[] | CodeableConcept;
    extension?: Extension[];
    id?: string;
    identifier?: string | Identifier;
    implicitRules?: string;
    language?: string;
    location?: string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    outcome?: string[] | CodeableConcept;
    recordedDate?: string;
    recorder?: string | Reference;
    referenceDocument?: MaybeArray$1B<string | Reference>;
    resultingCondition?: MaybeArray$1B<string | Reference>;
    seriousness?: string[] | CodeableConcept;
    severity?: string[] | CodeableConcept;
    study?: MaybeArray$1B<string | Reference>;
    subject?: string | Reference;
    subjectMedicalHistory?: MaybeArray$1B<string | Reference>;
    suspectEntity?: BackboneElement[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1A<T> = T | T[];
type AllergyIntolerance_Props = {
    asserter?: string | Reference;
    category?: string[];
    clinicalStatus?: string[] | CodeableConcept;
    code?: string[] | CodeableConcept;
    contained?: any[];
    criticality?: string;
    encounter?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1A<string | Identifier>;
    implicitRules?: string;
    language?: string;
    lastOccurrence?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    onset?: string | Age | Period | Range;
    patient?: string | Reference;
    reaction?: BackboneElement[];
    recordedDate?: string;
    recorder?: string | Reference;
    text?: Narrative;
    type?: string;
    verificationStatus?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$1z<T> = T | T[];
type Appointment_Props = {
    appointmentType?: string[] | CodeableConcept;
    basedOn?: MaybeArray$1z<string | Reference>;
    cancelationReason?: string[] | CodeableConcept;
    comment?: string;
    contained?: any[];
    created?: string;
    description?: string;
    end?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1z<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    minutesDuration?: number;
    modifierExtension?: Extension[];
    participant?: BackboneElement[];
    patientInstruction?: string;
    priority?: number;
    reasonCode?: MaybeArray$1z<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$1z<string | Reference>;
    requestedPeriod?: Period[];
    serviceCategory?: MaybeArray$1z<string[] | CodeableConcept>;
    serviceType?: MaybeArray$1z<string[] | CodeableConcept>;
    slot?: MaybeArray$1z<string | Reference>;
    specialty?: MaybeArray$1z<string[] | CodeableConcept>;
    start?: string;
    status?: string;
    supportingInformation?: MaybeArray$1z<string | Reference>;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1y<T> = T | T[];
type AppointmentResponse_Props = {
    actor?: string | Reference;
    appointment?: string | Reference;
    comment?: string;
    contained?: any[];
    end?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1y<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    participantStatus?: string;
    participantType?: MaybeArray$1y<string[] | CodeableConcept>;
    start?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1x<T> = T | T[];
type BiologicallyDerivedProduct_Props = {
    collection?: BackboneElement;
    contained?: any[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1x<string | Identifier>;
    implicitRules?: string;
    language?: string;
    manipulation?: BackboneElement;
    meta?: Meta;
    modifierExtension?: Extension[];
    parent?: MaybeArray$1x<string | Reference>;
    processing?: BackboneElement[];
    productCategory?: string;
    productCode?: string[] | CodeableConcept;
    quantity?: number;
    request?: MaybeArray$1x<string | Reference>;
    status?: string;
    storage?: BackboneElement[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1w<T> = T | T[];
type BodyStructure_Props = {
    active?: boolean;
    contained?: any[];
    description?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1w<string | Identifier>;
    image?: Attachment[];
    implicitRules?: string;
    language?: string;
    location?: string[] | CodeableConcept;
    locationQualifier?: MaybeArray$1w<string[] | CodeableConcept>;
    meta?: Meta;
    modifierExtension?: Extension[];
    morphology?: string[] | CodeableConcept;
    patient?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1v<T> = T | T[];
type CarePlan_Props = {
    activity?: BackboneElement[];
    addresses?: MaybeArray$1v<string | Reference>;
    author?: string | Reference;
    basedOn?: MaybeArray$1v<string | Reference>;
    careTeam?: MaybeArray$1v<string | Reference>;
    category?: MaybeArray$1v<string[] | CodeableConcept>;
    contained?: any[];
    contributor?: MaybeArray$1v<string | Reference>;
    created?: string;
    description?: string;
    encounter?: string | Reference;
    extension?: Extension[];
    goal?: MaybeArray$1v<string | Reference>;
    id?: string;
    identifier?: MaybeArray$1v<string | Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    intent?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    partOf?: MaybeArray$1v<string | Reference>;
    period?: Period;
    replaces?: MaybeArray$1v<string | Reference>;
    status?: string;
    subject?: string | Reference;
    supportingInfo?: MaybeArray$1v<string | Reference>;
    text?: Narrative;
    title?: string;
    [key: string]: any;
};

type MaybeArray$1u<T> = T | T[];
type CareTeam_Props = {
    category?: MaybeArray$1u<string[] | CodeableConcept>;
    contained?: any[];
    encounter?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1u<string | Identifier>;
    implicitRules?: string;
    language?: string;
    managingOrganization?: MaybeArray$1u<string | Reference>;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    note?: Annotation[];
    participant?: BackboneElement[];
    period?: Period;
    reasonCode?: MaybeArray$1u<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$1u<string | Reference>;
    status?: string;
    subject?: string | Reference;
    telecom?: ContactPoint[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1t<T> = T | T[];
type ChargeItem_Props = {
    account?: MaybeArray$1t<string | Reference>;
    bodysite?: MaybeArray$1t<string[] | CodeableConcept>;
    code?: string[] | CodeableConcept;
    contained?: any[];
    context?: string | Reference;
    costCenter?: string | Reference;
    definitionCanonical?: any[];
    definitionUri?: string[];
    enteredDate?: string;
    enterer?: string | Reference;
    extension?: Extension[];
    factorOverride?: number;
    id?: string;
    identifier?: MaybeArray$1t<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    occurrence?: string | Period | Timing;
    overrideReason?: string;
    partOf?: MaybeArray$1t<string | Reference>;
    performer?: BackboneElement[];
    performingOrganization?: string | Reference;
    priceOverride?: Money;
    product?: string | Reference | string[] | CodeableConcept;
    quantity?: Quantity;
    reason?: MaybeArray$1t<string[] | CodeableConcept>;
    requestingOrganization?: string | Reference;
    service?: MaybeArray$1t<string | Reference>;
    status?: string;
    subject?: string | Reference;
    supportingInformation?: MaybeArray$1t<string | Reference>;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1s<T> = T | T[];
type ChargeItemDefinition_Props = {
    applicability?: BackboneElement[];
    approvalDate?: string;
    code?: string[] | CodeableConcept;
    contact?: ContactDetail[];
    contained?: any[];
    copyright?: string;
    date?: string;
    derivedFromUri?: string[];
    description?: string;
    effectivePeriod?: Period;
    experimental?: boolean;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1s<string | Identifier>;
    implicitRules?: string;
    instance?: MaybeArray$1s<string | Reference>;
    jurisdiction?: MaybeArray$1s<string[] | CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    partOf?: any[];
    propertyGroup?: BackboneElement[];
    publisher?: string;
    replaces?: any[];
    status?: string;
    text?: Narrative;
    title?: string;
    url?: string;
    useContext?: UsageContext[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$1r<T> = T | T[];
type Citation_Props = {
    approvalDate?: string;
    author?: ContactDetail[];
    citedArtifact?: BackboneElement;
    classification?: BackboneElement[];
    contact?: ContactDetail[];
    contained?: any[];
    copyright?: string;
    currentState?: MaybeArray$1r<string[] | CodeableConcept>;
    date?: string;
    description?: string;
    editor?: ContactDetail[];
    effectivePeriod?: Period;
    endorser?: ContactDetail[];
    experimental?: boolean;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1r<string | Identifier>;
    implicitRules?: string;
    jurisdiction?: MaybeArray$1r<string[] | CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    note?: Annotation[];
    publisher?: string;
    purpose?: string;
    relatesTo?: BackboneElement[];
    reviewer?: ContactDetail[];
    status?: string;
    statusDate?: BackboneElement[];
    summary?: BackboneElement[];
    text?: Narrative;
    title?: string;
    url?: string;
    useContext?: UsageContext[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$1q<T> = T | T[];
type Claim_Props = {
    accident?: BackboneElement;
    billablePeriod?: Period;
    careTeam?: BackboneElement[];
    contained?: any[];
    created?: string;
    diagnosis?: BackboneElement[];
    enterer?: string | Reference;
    extension?: Extension[];
    facility?: string | Reference;
    fundsReserve?: string[] | CodeableConcept;
    id?: string;
    identifier?: MaybeArray$1q<string | Identifier>;
    implicitRules?: string;
    insurance?: BackboneElement[];
    insurer?: string | Reference;
    item?: BackboneElement[];
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    originalPrescription?: string | Reference;
    patient?: string | Reference;
    payee?: BackboneElement;
    prescription?: string | Reference;
    priority?: string[] | CodeableConcept;
    procedure?: BackboneElement[];
    provider?: string | Reference;
    referral?: string | Reference;
    related?: BackboneElement[];
    status?: string;
    subType?: string[] | CodeableConcept;
    supportingInfo?: BackboneElement[];
    text?: Narrative;
    total?: Money;
    type?: string[] | CodeableConcept;
    use?: string;
    [key: string]: any;
};

type MaybeArray$1p<T> = T | T[];
type ClaimResponse_Props = {
    addItem?: BackboneElement[];
    adjudication?: any[];
    communicationRequest?: MaybeArray$1p<string | Reference>;
    contained?: any[];
    created?: string;
    disposition?: string;
    error?: BackboneElement[];
    extension?: Extension[];
    form?: Attachment;
    formCode?: string[] | CodeableConcept;
    fundsReserve?: string[] | CodeableConcept;
    id?: string;
    identifier?: MaybeArray$1p<string | Identifier>;
    implicitRules?: string;
    insurance?: BackboneElement[];
    insurer?: string | Reference;
    item?: BackboneElement[];
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    outcome?: string;
    patient?: string | Reference;
    payeeType?: string[] | CodeableConcept;
    payment?: BackboneElement;
    preAuthPeriod?: Period;
    preAuthRef?: string;
    processNote?: BackboneElement[];
    request?: string | Reference;
    requestor?: string | Reference;
    status?: string;
    subType?: string[] | CodeableConcept;
    text?: Narrative;
    total?: BackboneElement[];
    type?: string[] | CodeableConcept;
    use?: string;
    [key: string]: any;
};

type MaybeArray$1o<T> = T | T[];
type ClinicalImpression_Props = {
    assessor?: string | Reference;
    code?: string[] | CodeableConcept;
    contained?: any[];
    date?: string;
    description?: string;
    effective?: string | Period;
    encounter?: string | Reference;
    extension?: Extension[];
    finding?: BackboneElement[];
    id?: string;
    identifier?: MaybeArray$1o<string | Identifier>;
    implicitRules?: string;
    investigation?: BackboneElement[];
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    previous?: string | Reference;
    problem?: MaybeArray$1o<string | Reference>;
    prognosisCodeableConcept?: MaybeArray$1o<string[] | CodeableConcept>;
    prognosisReference?: MaybeArray$1o<string | Reference>;
    protocol?: string[];
    status?: string;
    statusReason?: string[] | CodeableConcept;
    subject?: string | Reference;
    summary?: string;
    supportingInfo?: MaybeArray$1o<string | Reference>;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1n<T> = T | T[];
type ClinicalUseDefinition_Props = {
    category?: MaybeArray$1n<string[] | CodeableConcept>;
    contained?: any[];
    contraindication?: BackboneElement;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1n<string | Identifier>;
    implicitRules?: string;
    indication?: BackboneElement;
    interaction?: BackboneElement;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    population?: MaybeArray$1n<string | Reference>;
    status?: string[] | CodeableConcept;
    subject?: MaybeArray$1n<string | Reference>;
    text?: Narrative;
    type?: string;
    undesirableEffect?: BackboneElement;
    warning?: BackboneElement;
    [key: string]: any;
};

type MaybeArray$1m<T> = T | T[];
type Communication_Props = {
    about?: MaybeArray$1m<string | Reference>;
    basedOn?: MaybeArray$1m<string | Reference>;
    category?: MaybeArray$1m<string[] | CodeableConcept>;
    contained?: any[];
    encounter?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1m<string | Identifier>;
    implicitRules?: string;
    inResponseTo?: MaybeArray$1m<string | Reference>;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    language?: string;
    medium?: MaybeArray$1m<string[] | CodeableConcept>;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    partOf?: MaybeArray$1m<string | Reference>;
    payload?: BackboneElement[];
    priority?: string;
    reasonCode?: MaybeArray$1m<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$1m<string | Reference>;
    received?: string;
    recipient?: MaybeArray$1m<string | Reference>;
    sender?: string | Reference;
    sent?: string;
    status?: string;
    statusReason?: string[] | CodeableConcept;
    subject?: string | Reference;
    text?: Narrative;
    topic?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$1l<T> = T | T[];
type CommunicationRequest_Props = {
    about?: MaybeArray$1l<string | Reference>;
    authoredOn?: string;
    basedOn?: MaybeArray$1l<string | Reference>;
    category?: MaybeArray$1l<string[] | CodeableConcept>;
    contained?: any[];
    doNotPerform?: boolean;
    encounter?: string | Reference;
    extension?: Extension[];
    groupIdentifier?: string | Identifier;
    id?: string;
    identifier?: MaybeArray$1l<string | Identifier>;
    implicitRules?: string;
    language?: string;
    medium?: MaybeArray$1l<string[] | CodeableConcept>;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    occurrence?: string | Period;
    payload?: BackboneElement[];
    priority?: string;
    reasonCode?: MaybeArray$1l<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$1l<string | Reference>;
    recipient?: MaybeArray$1l<string | Reference>;
    replaces?: MaybeArray$1l<string | Reference>;
    requester?: string | Reference;
    sender?: string | Reference;
    status?: string;
    statusReason?: string[] | CodeableConcept;
    subject?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1k<T> = T | T[];
type Contract_Props = {
    alias?: string[];
    applies?: Period;
    author?: string | Reference;
    authority?: MaybeArray$1k<string | Reference>;
    contained?: any[];
    contentDefinition?: BackboneElement;
    contentDerivative?: string[] | CodeableConcept;
    domain?: MaybeArray$1k<string | Reference>;
    expirationType?: string[] | CodeableConcept;
    extension?: Extension[];
    friendly?: BackboneElement[];
    id?: string;
    identifier?: MaybeArray$1k<string | Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: string | Reference;
    instantiatesUri?: string;
    issued?: string;
    language?: string;
    legal?: BackboneElement[];
    legalState?: string[] | CodeableConcept;
    legallyBinding?: Attachment | string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    relevantHistory?: MaybeArray$1k<string | Reference>;
    rule?: BackboneElement[];
    scope?: string[] | CodeableConcept;
    signer?: BackboneElement[];
    site?: MaybeArray$1k<string | Reference>;
    status?: string;
    subType?: MaybeArray$1k<string[] | CodeableConcept>;
    subject?: MaybeArray$1k<string | Reference>;
    subtitle?: string;
    supportingInfo?: MaybeArray$1k<string | Reference>;
    term?: BackboneElement[];
    text?: Narrative;
    title?: string;
    topic?: string[] | CodeableConcept | string | Reference;
    type?: string[] | CodeableConcept;
    url?: string;
    version?: string;
    [key: string]: any;
};

type MaybeArray$1j<T> = T | T[];
type Coverage_Props = {
    beneficiary?: string | Reference;
    class?: BackboneElement[];
    contained?: any[];
    contract?: MaybeArray$1j<string | Reference>;
    costToBeneficiary?: BackboneElement[];
    dependent?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1j<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    network?: string;
    order?: number;
    payor?: MaybeArray$1j<string | Reference>;
    period?: Period;
    policyHolder?: string | Reference;
    relationship?: string[] | CodeableConcept;
    status?: string;
    subrogation?: boolean;
    subscriber?: string | Reference;
    subscriberId?: string;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$1i<T> = T | T[];
type CoverageEligibilityRequest_Props = {
    contained?: any[];
    created?: string;
    enterer?: string | Reference;
    extension?: Extension[];
    facility?: string | Reference;
    id?: string;
    identifier?: MaybeArray$1i<string | Identifier>;
    implicitRules?: string;
    insurance?: BackboneElement[];
    insurer?: string | Reference;
    item?: BackboneElement[];
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    patient?: string | Reference;
    priority?: string[] | CodeableConcept;
    provider?: string | Reference;
    purpose?: string[];
    serviced?: string | Period;
    status?: string;
    supportingInfo?: BackboneElement[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1h<T> = T | T[];
type CoverageEligibilityResponse_Props = {
    contained?: any[];
    created?: string;
    disposition?: string;
    error?: BackboneElement[];
    extension?: Extension[];
    form?: string[] | CodeableConcept;
    id?: string;
    identifier?: MaybeArray$1h<string | Identifier>;
    implicitRules?: string;
    insurance?: BackboneElement[];
    insurer?: string | Reference;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    outcome?: string;
    patient?: string | Reference;
    preAuthRef?: string;
    purpose?: string[];
    request?: string | Reference;
    requestor?: string | Reference;
    serviced?: string | Period;
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1g<T> = T | T[];
type DetectedIssue_Props = {
    author?: string | Reference;
    code?: string[] | CodeableConcept;
    contained?: any[];
    detail?: string;
    evidence?: BackboneElement[];
    extension?: Extension[];
    id?: string;
    identified?: string | Period;
    identifier?: MaybeArray$1g<string | Identifier>;
    implicated?: MaybeArray$1g<string | Reference>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    mitigation?: BackboneElement[];
    modifierExtension?: Extension[];
    patient?: string | Reference;
    reference?: string;
    severity?: string;
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1f<T> = T | T[];
type Device_Props = {
    contact?: ContactPoint[];
    contained?: any[];
    definition?: string | Reference;
    deviceName?: BackboneElement[];
    distinctIdentifier?: string;
    expirationDate?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1f<string | Identifier>;
    implicitRules?: string;
    language?: string;
    location?: string | Reference;
    lotNumber?: string;
    manufactureDate?: string;
    manufacturer?: string;
    meta?: Meta;
    modelNumber?: string;
    modifierExtension?: Extension[];
    note?: Annotation[];
    owner?: string | Reference;
    parent?: string | Reference;
    partNumber?: string;
    patient?: string | Reference;
    property?: BackboneElement[];
    safety?: MaybeArray$1f<string[] | CodeableConcept>;
    serialNumber?: string;
    specialization?: BackboneElement[];
    status?: string;
    statusReason?: MaybeArray$1f<string[] | CodeableConcept>;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    udiCarrier?: BackboneElement[];
    url?: string;
    version?: BackboneElement[];
    [key: string]: any;
};

type MaybeArray$1e<T> = T | T[];
type DeviceDefinition_Props = {
    capability?: BackboneElement[];
    contact?: ContactPoint[];
    contained?: any[];
    deviceName?: BackboneElement[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1e<string | Identifier>;
    implicitRules?: string;
    language?: string;
    languageCode?: MaybeArray$1e<string[] | CodeableConcept>;
    manufacturer?: string | string | Reference;
    material?: BackboneElement[];
    meta?: Meta;
    modelNumber?: string;
    modifierExtension?: Extension[];
    note?: Annotation[];
    onlineInformation?: string;
    owner?: string | Reference;
    parentDevice?: string | Reference;
    physicalCharacteristics?: ProdCharacteristic;
    property?: BackboneElement[];
    quantity?: Quantity;
    safety?: MaybeArray$1e<string[] | CodeableConcept>;
    shelfLifeStorage?: ProductShelfLife[];
    specialization?: BackboneElement[];
    text?: Narrative;
    type?: string[] | CodeableConcept;
    udiDeviceIdentifier?: BackboneElement[];
    url?: string;
    version?: string[];
    [key: string]: any;
};

type MaybeArray$1d<T> = T | T[];
type DeviceMetric_Props = {
    calibration?: BackboneElement[];
    category?: string;
    color?: string;
    contained?: any[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1d<string | Identifier>;
    implicitRules?: string;
    language?: string;
    measurementPeriod?: Timing;
    meta?: Meta;
    modifierExtension?: Extension[];
    operationalStatus?: string;
    parent?: string | Reference;
    source?: string | Reference;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    unit?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$1c<T> = T | T[];
type DeviceRequest_Props = {
    authoredOn?: string;
    basedOn?: MaybeArray$1c<string | Reference>;
    code?: string | Reference | string[] | CodeableConcept;
    contained?: any[];
    encounter?: string | Reference;
    extension?: Extension[];
    groupIdentifier?: string | Identifier;
    id?: string;
    identifier?: MaybeArray$1c<string | Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: MaybeArray$1c<string | Reference>;
    intent?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    occurrence?: string | Period | Timing;
    parameter?: BackboneElement[];
    performer?: string | Reference;
    performerType?: string[] | CodeableConcept;
    priorRequest?: MaybeArray$1c<string | Reference>;
    priority?: string;
    reasonCode?: MaybeArray$1c<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$1c<string | Reference>;
    relevantHistory?: MaybeArray$1c<string | Reference>;
    requester?: string | Reference;
    status?: string;
    subject?: string | Reference;
    supportingInfo?: MaybeArray$1c<string | Reference>;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1b<T> = T | T[];
type DeviceUseStatement_Props = {
    basedOn?: MaybeArray$1b<string | Reference>;
    bodySite?: string[] | CodeableConcept;
    contained?: any[];
    derivedFrom?: MaybeArray$1b<string | Reference>;
    device?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1b<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    reasonCode?: MaybeArray$1b<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$1b<string | Reference>;
    recordedOn?: string;
    source?: string | Reference;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    timing?: Timing | Period | string;
    [key: string]: any;
};

type MaybeArray$1a<T> = T | T[];
type DiagnosticReport_Props = {
    basedOn?: MaybeArray$1a<string | Reference>;
    category?: MaybeArray$1a<string[] | CodeableConcept>;
    code?: string[] | CodeableConcept;
    conclusion?: string;
    conclusionCode?: MaybeArray$1a<string[] | CodeableConcept>;
    contained?: any[];
    effective?: string | Period;
    encounter?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$1a<string | Identifier>;
    imagingStudy?: MaybeArray$1a<string | Reference>;
    implicitRules?: string;
    issued?: string;
    language?: string;
    media?: BackboneElement[];
    meta?: Meta;
    modifierExtension?: Extension[];
    performer?: MaybeArray$1a<string | Reference>;
    presentedForm?: Attachment[];
    result?: MaybeArray$1a<string | Reference>;
    resultsInterpreter?: MaybeArray$1a<string | Reference>;
    specimen?: MaybeArray$1a<string | Reference>;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type DomainResource_Props = {
    contained?: any[];
    extension?: Extension[];
    id?: string;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$19<T> = T | T[];
type Encounter_Props = {
    account?: MaybeArray$19<string | Reference>;
    appointment?: MaybeArray$19<string | Reference>;
    basedOn?: MaybeArray$19<string | Reference>;
    class?: Coding;
    classHistory?: BackboneElement[];
    contained?: any[];
    diagnosis?: BackboneElement[];
    episodeOfCare?: MaybeArray$19<string | Reference>;
    extension?: Extension[];
    hospitalization?: BackboneElement;
    id?: string;
    identifier?: MaybeArray$19<string | Identifier>;
    implicitRules?: string;
    language?: string;
    length?: Duration;
    location?: BackboneElement[];
    meta?: Meta;
    modifierExtension?: Extension[];
    partOf?: string | Reference;
    participant?: BackboneElement[];
    period?: Period;
    priority?: string[] | CodeableConcept;
    reasonCode?: MaybeArray$19<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$19<string | Reference>;
    serviceProvider?: string | Reference;
    serviceType?: string[] | CodeableConcept;
    status?: string;
    statusHistory?: BackboneElement[];
    subject?: string | Reference;
    text?: Narrative;
    type?: MaybeArray$19<string[] | CodeableConcept>;
    [key: string]: any;
};

type MaybeArray$18<T> = T | T[];
type EnrollmentRequest_Props = {
    candidate?: string | Reference;
    contained?: any[];
    coverage?: string | Reference;
    created?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$18<string | Identifier>;
    implicitRules?: string;
    insurer?: string | Reference;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    provider?: string | Reference;
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$17<T> = T | T[];
type EnrollmentResponse_Props = {
    contained?: any[];
    created?: string;
    disposition?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$17<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    organization?: string | Reference;
    outcome?: string;
    request?: string | Reference;
    requestProvider?: string | Reference;
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$16<T> = T | T[];
type EpisodeOfCare_Props = {
    account?: MaybeArray$16<string | Reference>;
    careManager?: string | Reference;
    contained?: any[];
    diagnosis?: BackboneElement[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$16<string | Identifier>;
    implicitRules?: string;
    language?: string;
    managingOrganization?: string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    patient?: string | Reference;
    period?: Period;
    referralRequest?: MaybeArray$16<string | Reference>;
    status?: string;
    statusHistory?: BackboneElement[];
    team?: MaybeArray$16<string | Reference>;
    text?: Narrative;
    type?: MaybeArray$16<string[] | CodeableConcept>;
    [key: string]: any;
};

type MaybeArray$15<T> = T | T[];
type EventDefinition_Props = {
    approvalDate?: string;
    author?: ContactDetail[];
    contact?: ContactDetail[];
    contained?: any[];
    copyright?: string;
    date?: string;
    description?: string;
    editor?: ContactDetail[];
    effectivePeriod?: Period;
    endorser?: ContactDetail[];
    experimental?: boolean;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$15<string | Identifier>;
    implicitRules?: string;
    jurisdiction?: MaybeArray$15<string[] | CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    publisher?: string;
    purpose?: string;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    status?: string;
    subject?: string[] | CodeableConcept | string | Reference;
    subtitle?: string;
    text?: Narrative;
    title?: string;
    topic?: MaybeArray$15<string[] | CodeableConcept>;
    trigger?: TriggerDefinition[];
    url?: string;
    usage?: string;
    useContext?: UsageContext[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$14<T> = T | T[];
type Evidence_Props = {
    approvalDate?: string;
    assertion?: string;
    author?: ContactDetail[];
    certainty?: BackboneElement[];
    citeAs?: string | Reference | string;
    contact?: ContactDetail[];
    contained?: any[];
    date?: string;
    description?: string;
    editor?: ContactDetail[];
    endorser?: ContactDetail[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$14<string | Identifier>;
    implicitRules?: string;
    language?: string;
    lastReviewDate?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    publisher?: string;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    statistic?: BackboneElement[];
    status?: string;
    studyType?: string[] | CodeableConcept;
    synthesisType?: string[] | CodeableConcept;
    text?: Narrative;
    title?: string;
    url?: string;
    useContext?: UsageContext[];
    variableDefinition?: BackboneElement[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$13<T> = T | T[];
type EvidenceReport_Props = {
    author?: ContactDetail[];
    citeAs?: string | Reference | string;
    contact?: ContactDetail[];
    contained?: any[];
    editor?: ContactDetail[];
    endorser?: ContactDetail[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$13<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    publisher?: string;
    relatedArtifact?: RelatedArtifact[];
    relatedIdentifier?: MaybeArray$13<string | Identifier>;
    relatesTo?: BackboneElement[];
    reviewer?: ContactDetail[];
    section?: BackboneElement[];
    status?: string;
    subject?: BackboneElement;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    url?: string;
    useContext?: UsageContext[];
    [key: string]: any;
};

type MaybeArray$12<T> = T | T[];
type EvidenceVariable_Props = {
    actual?: boolean;
    author?: ContactDetail[];
    category?: BackboneElement[];
    characteristic?: BackboneElement[];
    characteristicCombination?: string;
    contact?: ContactDetail[];
    contained?: any[];
    date?: string;
    description?: string;
    editor?: ContactDetail[];
    endorser?: ContactDetail[];
    extension?: Extension[];
    handling?: string;
    id?: string;
    identifier?: MaybeArray$12<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    note?: Annotation[];
    publisher?: string;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    shortTitle?: string;
    status?: string;
    subtitle?: string;
    text?: Narrative;
    title?: string;
    url?: string;
    useContext?: UsageContext[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$11<T> = T | T[];
type ExplanationOfBenefit_Props = {
    accident?: BackboneElement;
    addItem?: BackboneElement[];
    adjudication?: any[];
    benefitBalance?: BackboneElement[];
    benefitPeriod?: Period;
    billablePeriod?: Period;
    careTeam?: BackboneElement[];
    claim?: string | Reference;
    claimResponse?: string | Reference;
    contained?: any[];
    created?: string;
    diagnosis?: BackboneElement[];
    disposition?: string;
    enterer?: string | Reference;
    extension?: Extension[];
    facility?: string | Reference;
    form?: Attachment;
    formCode?: string[] | CodeableConcept;
    fundsReserve?: string[] | CodeableConcept;
    fundsReserveRequested?: string[] | CodeableConcept;
    id?: string;
    identifier?: MaybeArray$11<string | Identifier>;
    implicitRules?: string;
    insurance?: BackboneElement[];
    insurer?: string | Reference;
    item?: BackboneElement[];
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    originalPrescription?: string | Reference;
    outcome?: string;
    patient?: string | Reference;
    payee?: BackboneElement;
    payment?: BackboneElement;
    preAuthRef?: string[];
    preAuthRefPeriod?: Period[];
    precedence?: number;
    prescription?: string | Reference;
    priority?: string[] | CodeableConcept;
    procedure?: BackboneElement[];
    processNote?: BackboneElement[];
    provider?: string | Reference;
    referral?: string | Reference;
    related?: BackboneElement[];
    status?: string;
    subType?: string[] | CodeableConcept;
    supportingInfo?: BackboneElement[];
    text?: Narrative;
    total?: BackboneElement[];
    type?: string[] | CodeableConcept;
    use?: string;
    [key: string]: any;
};

type MaybeArray$10<T> = T | T[];
type FamilyMemberHistory_Props = {
    age?: Age | Range | string;
    born?: Period | string;
    condition?: BackboneElement[];
    contained?: any[];
    dataAbsentReason?: string[] | CodeableConcept;
    date?: string;
    deceased?: boolean | Age | Range | string;
    estimatedAge?: boolean;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$10<string | Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    note?: Annotation[];
    patient?: string | Reference;
    reasonCode?: MaybeArray$10<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$10<string | Reference>;
    relationship?: string[] | CodeableConcept;
    sex?: string[] | CodeableConcept;
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$$<T> = T | T[];
type Flag_Props = {
    author?: string | Reference;
    category?: MaybeArray$$<string[] | CodeableConcept>;
    code?: string[] | CodeableConcept;
    contained?: any[];
    encounter?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$$<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    period?: Period;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$_<T> = T | T[];
type Goal_Props = {
    achievementStatus?: string[] | CodeableConcept;
    addresses?: MaybeArray$_<string | Reference>;
    category?: MaybeArray$_<string[] | CodeableConcept>;
    contained?: any[];
    description?: string[] | CodeableConcept;
    expressedBy?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$_<string | Identifier>;
    implicitRules?: string;
    language?: string;
    lifecycleStatus?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    outcomeCode?: MaybeArray$_<string[] | CodeableConcept>;
    outcomeReference?: MaybeArray$_<string | Reference>;
    priority?: string[] | CodeableConcept;
    start?: string | string[] | CodeableConcept;
    statusDate?: string;
    statusReason?: string;
    subject?: string | Reference;
    target?: BackboneElement[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$Z<T> = T | T[];
type Group_Props = {
    active?: boolean;
    actual?: boolean;
    characteristic?: BackboneElement[];
    code?: string[] | CodeableConcept;
    contained?: any[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$Z<string | Identifier>;
    implicitRules?: string;
    language?: string;
    managingEntity?: string | Reference;
    member?: BackboneElement[];
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    quantity?: number;
    text?: Narrative;
    type?: string;
    [key: string]: any;
};

type MaybeArray$Y<T> = T | T[];
type GuidanceResponse_Props = {
    contained?: any[];
    dataRequirement?: DataRequirement[];
    encounter?: string | Reference;
    evaluationMessage?: MaybeArray$Y<string | Reference>;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$Y<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    module?: string | any | string[] | CodeableConcept;
    note?: Annotation[];
    occurrenceDateTime?: string;
    outputParameters?: string | Reference;
    performer?: string | Reference;
    reasonCode?: MaybeArray$Y<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$Y<string | Reference>;
    requestIdentifier?: string | Identifier;
    result?: string | Reference;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$X<T> = T | T[];
type HealthcareService_Props = {
    active?: boolean;
    appointmentRequired?: boolean;
    availabilityExceptions?: string;
    availableTime?: BackboneElement[];
    category?: MaybeArray$X<string[] | CodeableConcept>;
    characteristic?: MaybeArray$X<string[] | CodeableConcept>;
    comment?: string;
    communication?: MaybeArray$X<string[] | CodeableConcept>;
    contained?: any[];
    coverageArea?: MaybeArray$X<string | Reference>;
    eligibility?: BackboneElement[];
    endpoint?: MaybeArray$X<string | Reference>;
    extension?: Extension[];
    extraDetails?: string;
    id?: string;
    identifier?: MaybeArray$X<string | Identifier>;
    implicitRules?: string;
    language?: string;
    location?: MaybeArray$X<string | Reference>;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    notAvailable?: BackboneElement[];
    photo?: Attachment;
    program?: MaybeArray$X<string[] | CodeableConcept>;
    providedBy?: string | Reference;
    referralMethod?: MaybeArray$X<string[] | CodeableConcept>;
    serviceProvisionCode?: MaybeArray$X<string[] | CodeableConcept>;
    specialty?: MaybeArray$X<string[] | CodeableConcept>;
    telecom?: ContactPoint[];
    text?: Narrative;
    type?: MaybeArray$X<string[] | CodeableConcept>;
    [key: string]: any;
};

type MaybeArray$W<T> = T | T[];
type ImagingStudy_Props = {
    basedOn?: MaybeArray$W<string | Reference>;
    contained?: any[];
    description?: string;
    encounter?: string | Reference;
    endpoint?: MaybeArray$W<string | Reference>;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$W<string | Identifier>;
    implicitRules?: string;
    interpreter?: MaybeArray$W<string | Reference>;
    language?: string;
    location?: string | Reference;
    meta?: Meta;
    modality?: Coding[];
    modifierExtension?: Extension[];
    note?: Annotation[];
    numberOfInstances?: number;
    numberOfSeries?: number;
    procedureCode?: MaybeArray$W<string[] | CodeableConcept>;
    procedureReference?: string | Reference;
    reasonCode?: MaybeArray$W<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$W<string | Reference>;
    referrer?: string | Reference;
    series?: BackboneElement[];
    started?: string;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$V<T> = T | T[];
type Immunization_Props = {
    contained?: any[];
    doseQuantity?: Quantity;
    education?: BackboneElement[];
    encounter?: string | Reference;
    expirationDate?: string;
    extension?: Extension[];
    fundingSource?: string[] | CodeableConcept;
    id?: string;
    identifier?: MaybeArray$V<string | Identifier>;
    implicitRules?: string;
    isSubpotent?: boolean;
    language?: string;
    location?: string | Reference;
    lotNumber?: string;
    manufacturer?: string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    occurrence?: string;
    patient?: string | Reference;
    performer?: BackboneElement[];
    primarySource?: boolean;
    programEligibility?: MaybeArray$V<string[] | CodeableConcept>;
    protocolApplied?: BackboneElement[];
    reaction?: BackboneElement[];
    reasonCode?: MaybeArray$V<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$V<string | Reference>;
    recorded?: string;
    reportOrigin?: string[] | CodeableConcept;
    route?: string[] | CodeableConcept;
    site?: string[] | CodeableConcept;
    status?: string;
    statusReason?: string[] | CodeableConcept;
    subpotentReason?: MaybeArray$V<string[] | CodeableConcept>;
    text?: Narrative;
    vaccineCode?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$U<T> = T | T[];
type ImmunizationEvaluation_Props = {
    authority?: string | Reference;
    contained?: any[];
    date?: string;
    description?: string;
    doseNumber?: number | string;
    doseStatus?: string[] | CodeableConcept;
    doseStatusReason?: MaybeArray$U<string[] | CodeableConcept>;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$U<string | Identifier>;
    immunizationEvent?: string | Reference;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    patient?: string | Reference;
    series?: string;
    seriesDoses?: number | string;
    status?: string;
    targetDisease?: string[] | CodeableConcept;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$T<T> = T | T[];
type ImmunizationRecommendation_Props = {
    authority?: string | Reference;
    contained?: any[];
    date?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$T<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    patient?: string | Reference;
    recommendation?: BackboneElement[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$S<T> = T | T[];
type Ingredient_Props = {
    allergenicIndicator?: boolean;
    contained?: any[];
    extension?: Extension[];
    for?: MaybeArray$S<string | Reference>;
    function?: MaybeArray$S<string[] | CodeableConcept>;
    id?: string;
    identifier?: string | Identifier;
    implicitRules?: string;
    language?: string;
    manufacturer?: BackboneElement[];
    meta?: Meta;
    modifierExtension?: Extension[];
    role?: string[] | CodeableConcept;
    status?: string;
    substance?: BackboneElement;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$R<T> = T | T[];
type InsurancePlan_Props = {
    administeredBy?: string | Reference;
    alias?: string[];
    contact?: BackboneElement[];
    contained?: any[];
    coverage?: BackboneElement[];
    coverageArea?: MaybeArray$R<string | Reference>;
    endpoint?: MaybeArray$R<string | Reference>;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$R<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    network?: MaybeArray$R<string | Reference>;
    ownedBy?: string | Reference;
    period?: Period;
    plan?: BackboneElement[];
    status?: string;
    text?: Narrative;
    type?: MaybeArray$R<string[] | CodeableConcept>;
    [key: string]: any;
};

type MaybeArray$Q<T> = T | T[];
type Invoice_Props = {
    account?: string | Reference;
    cancelledReason?: string;
    contained?: any[];
    date?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$Q<string | Identifier>;
    implicitRules?: string;
    issuer?: string | Reference;
    language?: string;
    lineItem?: BackboneElement[];
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    participant?: BackboneElement[];
    paymentTerms?: string;
    recipient?: string | Reference;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    totalGross?: Money;
    totalNet?: Money;
    totalPriceComponent?: any[];
    type?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$P<T> = T | T[];
type Library_Props = {
    approvalDate?: string;
    author?: ContactDetail[];
    contact?: ContactDetail[];
    contained?: any[];
    content?: Attachment[];
    copyright?: string;
    dataRequirement?: DataRequirement[];
    date?: string;
    description?: string;
    editor?: ContactDetail[];
    effectivePeriod?: Period;
    endorser?: ContactDetail[];
    experimental?: boolean;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$P<string | Identifier>;
    implicitRules?: string;
    jurisdiction?: MaybeArray$P<string[] | CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    parameter?: ParameterDefinition[];
    publisher?: string;
    purpose?: string;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    status?: string;
    subject?: string[] | CodeableConcept | string | Reference;
    subtitle?: string;
    text?: Narrative;
    title?: string;
    topic?: MaybeArray$P<string[] | CodeableConcept>;
    type?: string[] | CodeableConcept;
    url?: string;
    usage?: string;
    useContext?: UsageContext[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$O<T> = T | T[];
type List_Props = {
    code?: string[] | CodeableConcept;
    contained?: any[];
    date?: string;
    emptyReason?: string[] | CodeableConcept;
    encounter?: string | Reference;
    entry?: BackboneElement[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$O<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    mode?: string;
    modifierExtension?: Extension[];
    note?: Annotation[];
    orderedBy?: string[] | CodeableConcept;
    source?: string | Reference;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    title?: string;
    [key: string]: any;
};

type MaybeArray$N<T> = T | T[];
type Location_Props = {
    address?: Address;
    alias?: string[];
    availabilityExceptions?: string;
    contained?: any[];
    description?: string;
    endpoint?: MaybeArray$N<string | Reference>;
    extension?: Extension[];
    hoursOfOperation?: BackboneElement[];
    id?: string;
    identifier?: MaybeArray$N<string | Identifier>;
    implicitRules?: string;
    language?: string;
    managingOrganization?: string | Reference;
    meta?: Meta;
    mode?: string;
    modifierExtension?: Extension[];
    name?: string;
    operationalStatus?: Coding;
    partOf?: string | Reference;
    physicalType?: string[] | CodeableConcept;
    position?: BackboneElement;
    status?: string;
    telecom?: ContactPoint[];
    text?: Narrative;
    type?: MaybeArray$N<string[] | CodeableConcept>;
    [key: string]: any;
};

type MaybeArray$M<T> = T | T[];
type ManufacturedItemDefinition_Props = {
    contained?: any[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$M<string | Identifier>;
    implicitRules?: string;
    ingredient?: MaybeArray$M<string[] | CodeableConcept>;
    language?: string;
    manufacturedDoseForm?: string[] | CodeableConcept;
    manufacturer?: MaybeArray$M<string | Reference>;
    meta?: Meta;
    modifierExtension?: Extension[];
    property?: BackboneElement[];
    status?: string;
    text?: Narrative;
    unitOfPresentation?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$L<T> = T | T[];
type Measure_Props = {
    approvalDate?: string;
    author?: ContactDetail[];
    clinicalRecommendationStatement?: string;
    compositeScoring?: string[] | CodeableConcept;
    contact?: ContactDetail[];
    contained?: any[];
    copyright?: string;
    date?: string;
    definition?: string[];
    description?: string;
    disclaimer?: string;
    editor?: ContactDetail[];
    effectivePeriod?: Period;
    endorser?: ContactDetail[];
    experimental?: boolean;
    extension?: Extension[];
    group?: BackboneElement[];
    guidance?: string;
    id?: string;
    identifier?: MaybeArray$L<string | Identifier>;
    implicitRules?: string;
    improvementNotation?: string[] | CodeableConcept;
    jurisdiction?: MaybeArray$L<string[] | CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    library?: any[];
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    publisher?: string;
    purpose?: string;
    rateAggregation?: string;
    rationale?: string;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    riskAdjustment?: string;
    scoring?: string[] | CodeableConcept;
    status?: string;
    subject?: string[] | CodeableConcept | string | Reference;
    subtitle?: string;
    supplementalData?: BackboneElement[];
    text?: Narrative;
    title?: string;
    topic?: MaybeArray$L<string[] | CodeableConcept>;
    type?: MaybeArray$L<string[] | CodeableConcept>;
    url?: string;
    usage?: string;
    useContext?: UsageContext[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$K<T> = T | T[];
type MeasureReport_Props = {
    contained?: any[];
    date?: string;
    evaluatedResource?: MaybeArray$K<string | Reference>;
    extension?: Extension[];
    group?: BackboneElement[];
    id?: string;
    identifier?: MaybeArray$K<string | Identifier>;
    implicitRules?: string;
    improvementNotation?: string[] | CodeableConcept;
    language?: string;
    measure?: any;
    meta?: Meta;
    modifierExtension?: Extension[];
    period?: Period;
    reporter?: string | Reference;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    type?: string;
    [key: string]: any;
};

type MaybeArray$J<T> = T | T[];
type Media_Props = {
    basedOn?: MaybeArray$J<string | Reference>;
    bodySite?: string[] | CodeableConcept;
    contained?: any[];
    content?: Attachment;
    created?: string | Period;
    device?: string | Reference;
    deviceName?: string;
    duration?: number;
    encounter?: string | Reference;
    extension?: Extension[];
    frames?: number;
    height?: number;
    id?: string;
    identifier?: MaybeArray$J<string | Identifier>;
    implicitRules?: string;
    issued?: string;
    language?: string;
    meta?: Meta;
    modality?: string[] | CodeableConcept;
    modifierExtension?: Extension[];
    note?: Annotation[];
    operator?: string | Reference;
    partOf?: MaybeArray$J<string | Reference>;
    reasonCode?: MaybeArray$J<string[] | CodeableConcept>;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    view?: string[] | CodeableConcept;
    width?: number;
    [key: string]: any;
};

type MaybeArray$I<T> = T | T[];
type Medication_Props = {
    amount?: Ratio;
    batch?: BackboneElement;
    code?: string[] | CodeableConcept;
    contained?: any[];
    extension?: Extension[];
    form?: string[] | CodeableConcept;
    id?: string;
    identifier?: MaybeArray$I<string | Identifier>;
    implicitRules?: string;
    ingredient?: BackboneElement[];
    language?: string;
    manufacturer?: string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$H<T> = T | T[];
type MedicationAdministration_Props = {
    category?: string[] | CodeableConcept;
    contained?: any[];
    context?: string | Reference;
    device?: MaybeArray$H<string | Reference>;
    dosage?: BackboneElement;
    effective?: string | Period;
    eventHistory?: MaybeArray$H<string | Reference>;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$H<string | Identifier>;
    implicitRules?: string;
    instantiates?: string[];
    language?: string;
    medication?: string[] | CodeableConcept | string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    partOf?: MaybeArray$H<string | Reference>;
    performer?: BackboneElement[];
    reasonCode?: MaybeArray$H<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$H<string | Reference>;
    request?: string | Reference;
    status?: string;
    statusReason?: MaybeArray$H<string[] | CodeableConcept>;
    subject?: string | Reference;
    supportingInformation?: MaybeArray$H<string | Reference>;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$G<T> = T | T[];
type MedicationDispense_Props = {
    authorizingPrescription?: MaybeArray$G<string | Reference>;
    category?: string[] | CodeableConcept;
    contained?: any[];
    context?: string | Reference;
    daysSupply?: Quantity;
    destination?: string | Reference;
    detectedIssue?: MaybeArray$G<string | Reference>;
    dosageInstruction?: Dosage[];
    eventHistory?: MaybeArray$G<string | Reference>;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$G<string | Identifier>;
    implicitRules?: string;
    language?: string;
    location?: string | Reference;
    medication?: string[] | CodeableConcept | string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    partOf?: MaybeArray$G<string | Reference>;
    performer?: BackboneElement[];
    quantity?: Quantity;
    receiver?: MaybeArray$G<string | Reference>;
    status?: string;
    statusReason?: string[] | CodeableConcept | string | Reference;
    subject?: string | Reference;
    substitution?: BackboneElement;
    supportingInformation?: MaybeArray$G<string | Reference>;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    whenHandedOver?: string;
    whenPrepared?: string;
    [key: string]: any;
};

type MaybeArray$F<T> = T | T[];
type MedicationKnowledge_Props = {
    administrationGuidelines?: BackboneElement[];
    amount?: Quantity;
    associatedMedication?: MaybeArray$F<string | Reference>;
    code?: string[] | CodeableConcept;
    contained?: any[];
    contraindication?: MaybeArray$F<string | Reference>;
    cost?: BackboneElement[];
    doseForm?: string[] | CodeableConcept;
    drugCharacteristic?: BackboneElement[];
    extension?: Extension[];
    id?: string;
    implicitRules?: string;
    ingredient?: BackboneElement[];
    intendedRoute?: MaybeArray$F<string[] | CodeableConcept>;
    kinetics?: BackboneElement[];
    language?: string;
    manufacturer?: string | Reference;
    medicineClassification?: BackboneElement[];
    meta?: Meta;
    modifierExtension?: Extension[];
    monitoringProgram?: BackboneElement[];
    monograph?: BackboneElement[];
    packaging?: BackboneElement;
    preparationInstruction?: string;
    productType?: MaybeArray$F<string[] | CodeableConcept>;
    regulatory?: BackboneElement[];
    relatedMedicationKnowledge?: BackboneElement[];
    status?: string;
    synonym?: string[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$E<T> = T | T[];
type MedicationRequest_Props = {
    authoredOn?: string;
    basedOn?: MaybeArray$E<string | Reference>;
    category?: MaybeArray$E<string[] | CodeableConcept>;
    contained?: any[];
    courseOfTherapyType?: string[] | CodeableConcept;
    detectedIssue?: MaybeArray$E<string | Reference>;
    dispenseRequest?: BackboneElement;
    doNotPerform?: boolean;
    dosageInstruction?: Dosage[];
    encounter?: string | Reference;
    eventHistory?: MaybeArray$E<string | Reference>;
    extension?: Extension[];
    groupIdentifier?: string | Identifier;
    id?: string;
    identifier?: MaybeArray$E<string | Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: MaybeArray$E<string | Reference>;
    intent?: string;
    language?: string;
    medication?: string[] | CodeableConcept | string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    performer?: string | Reference;
    performerType?: string[] | CodeableConcept;
    priorPrescription?: string | Reference;
    priority?: string;
    reasonCode?: MaybeArray$E<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$E<string | Reference>;
    recorder?: string | Reference;
    reported?: boolean | string | Reference;
    requester?: string | Reference;
    status?: string;
    statusReason?: string[] | CodeableConcept;
    subject?: string | Reference;
    substitution?: BackboneElement;
    supportingInformation?: MaybeArray$E<string | Reference>;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$D<T> = T | T[];
type MedicationStatement_Props = {
    basedOn?: MaybeArray$D<string | Reference>;
    category?: string[] | CodeableConcept;
    contained?: any[];
    context?: string | Reference;
    dateAsserted?: string;
    derivedFrom?: MaybeArray$D<string | Reference>;
    dosage?: Dosage[];
    effective?: string | Period;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$D<string | Identifier>;
    implicitRules?: string;
    informationSource?: string | Reference;
    language?: string;
    medication?: string[] | CodeableConcept | string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    partOf?: MaybeArray$D<string | Reference>;
    reasonCode?: MaybeArray$D<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$D<string | Reference>;
    status?: string;
    statusReason?: MaybeArray$D<string[] | CodeableConcept>;
    subject?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$C<T> = T | T[];
type MedicinalProductDefinition_Props = {
    additionalMonitoringIndicator?: string[] | CodeableConcept;
    attachedDocument?: MaybeArray$C<string | Reference>;
    characteristic?: BackboneElement[];
    classification?: MaybeArray$C<string[] | CodeableConcept>;
    clinicalTrial?: MaybeArray$C<string | Reference>;
    code?: Coding[];
    combinedPharmaceuticalDoseForm?: string[] | CodeableConcept;
    contact?: BackboneElement[];
    contained?: any[];
    crossReference?: BackboneElement[];
    description?: string;
    domain?: string[] | CodeableConcept;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$C<string | Identifier>;
    implicitRules?: string;
    impurity?: CodeableReference[];
    indication?: string;
    ingredient?: MaybeArray$C<string[] | CodeableConcept>;
    language?: string;
    legalStatusOfSupply?: string[] | CodeableConcept;
    marketingStatus?: MarketingStatus[];
    masterFile?: MaybeArray$C<string | Reference>;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: BackboneElement[];
    operation?: BackboneElement[];
    packagedMedicinalProduct?: MaybeArray$C<string[] | CodeableConcept>;
    pediatricUseIndicator?: string[] | CodeableConcept;
    route?: MaybeArray$C<string[] | CodeableConcept>;
    specialMeasures?: MaybeArray$C<string[] | CodeableConcept>;
    status?: string[] | CodeableConcept;
    statusDate?: string;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    version?: string;
    [key: string]: any;
};

type MaybeArray$B<T> = T | T[];
type MolecularSequence_Props = {
    contained?: any[];
    coordinateSystem?: number;
    device?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$B<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    observedSeq?: string;
    patient?: string | Reference;
    performer?: string | Reference;
    pointer?: MaybeArray$B<string | Reference>;
    quality?: BackboneElement[];
    quantity?: Quantity;
    readCoverage?: number;
    referenceSeq?: BackboneElement;
    repository?: BackboneElement[];
    specimen?: string | Reference;
    structureVariant?: BackboneElement[];
    text?: Narrative;
    type?: string;
    variant?: BackboneElement[];
    [key: string]: any;
};

type MaybeArray$A<T> = T | T[];
type NutritionOrder_Props = {
    allergyIntolerance?: MaybeArray$A<string | Reference>;
    contained?: any[];
    dateTime?: string;
    encounter?: string | Reference;
    enteralFormula?: BackboneElement;
    excludeFoodModifier?: MaybeArray$A<string[] | CodeableConcept>;
    extension?: Extension[];
    foodPreferenceModifier?: MaybeArray$A<string[] | CodeableConcept>;
    id?: string;
    identifier?: MaybeArray$A<string | Identifier>;
    implicitRules?: string;
    instantiates?: string[];
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    intent?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    oralDiet?: BackboneElement;
    orderer?: string | Reference;
    patient?: string | Reference;
    status?: string;
    supplement?: BackboneElement[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$z<T> = T | T[];
type NutritionProduct_Props = {
    category?: MaybeArray$z<string[] | CodeableConcept>;
    code?: string[] | CodeableConcept;
    contained?: any[];
    extension?: Extension[];
    id?: string;
    implicitRules?: string;
    ingredient?: BackboneElement[];
    instance?: BackboneElement;
    knownAllergen?: CodeableReference[];
    language?: string;
    manufacturer?: MaybeArray$z<string | Reference>;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    nutrient?: BackboneElement[];
    productCharacteristic?: BackboneElement[];
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$y<T> = T | T[];
type Observation_Props = {
    basedOn?: MaybeArray$y<string | Reference>;
    bodySite?: string[] | CodeableConcept;
    category?: MaybeArray$y<string[] | CodeableConcept>;
    code?: string[] | CodeableConcept;
    component?: BackboneElement[];
    contained?: any[];
    dataAbsentReason?: string[] | CodeableConcept;
    derivedFrom?: MaybeArray$y<string | Reference>;
    device?: string | Reference;
    effective?: string | Period | Timing;
    encounter?: string | Reference;
    extension?: Extension[];
    focus?: MaybeArray$y<string | Reference>;
    hasMember?: MaybeArray$y<string | Reference>;
    id?: string;
    identifier?: MaybeArray$y<string | Identifier>;
    implicitRules?: string;
    interpretation?: MaybeArray$y<string[] | CodeableConcept>;
    issued?: string;
    language?: string;
    meta?: Meta;
    method?: string[] | CodeableConcept;
    modifierExtension?: Extension[];
    note?: Annotation[];
    partOf?: MaybeArray$y<string | Reference>;
    performer?: MaybeArray$y<string | Reference>;
    referenceRange?: BackboneElement[];
    specimen?: string | Reference;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    value?: Quantity | string[] | CodeableConcept | string | boolean | number | Range | Ratio | SampledData | Period;
    [key: string]: any;
};

type MaybeArray$x<T> = T | T[];
type ObservationDefinition_Props = {
    abnormalCodedValueSet?: string | Reference;
    category?: MaybeArray$x<string[] | CodeableConcept>;
    code?: string[] | CodeableConcept;
    contained?: any[];
    criticalCodedValueSet?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$x<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    method?: string[] | CodeableConcept;
    modifierExtension?: Extension[];
    multipleResultsAllowed?: boolean;
    normalCodedValueSet?: string | Reference;
    permittedDataType?: string[];
    preferredReportName?: string;
    qualifiedInterval?: BackboneElement[];
    quantitativeDetails?: BackboneElement;
    text?: Narrative;
    validCodedValueSet?: string | Reference;
    [key: string]: any;
};

type MaybeArray$w<T> = T | T[];
type Organization_Props = {
    active?: boolean;
    address?: Address[];
    alias?: string[];
    contact?: BackboneElement[];
    contained?: any[];
    endpoint?: MaybeArray$w<string | Reference>;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$w<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    partOf?: string | Reference;
    telecom?: ContactPoint[];
    text?: Narrative;
    type?: MaybeArray$w<string[] | CodeableConcept>;
    [key: string]: any;
};

type MaybeArray$v<T> = T | T[];
type OrganizationAffiliation_Props = {
    active?: boolean;
    code?: MaybeArray$v<string[] | CodeableConcept>;
    contained?: any[];
    endpoint?: MaybeArray$v<string | Reference>;
    extension?: Extension[];
    healthcareService?: MaybeArray$v<string | Reference>;
    id?: string;
    identifier?: MaybeArray$v<string | Identifier>;
    implicitRules?: string;
    language?: string;
    location?: MaybeArray$v<string | Reference>;
    meta?: Meta;
    modifierExtension?: Extension[];
    network?: MaybeArray$v<string | Reference>;
    organization?: string | Reference;
    participatingOrganization?: string | Reference;
    period?: Period;
    specialty?: MaybeArray$v<string[] | CodeableConcept>;
    telecom?: ContactPoint[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$u<T> = T | T[];
type PackagedProductDefinition_Props = {
    characteristic?: MaybeArray$u<string[] | CodeableConcept>;
    contained?: any[];
    containedItemQuantity?: Quantity[];
    copackagedIndicator?: boolean;
    description?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$u<string | Identifier>;
    implicitRules?: string;
    language?: string;
    legalStatusOfSupply?: BackboneElement[];
    manufacturer?: MaybeArray$u<string | Reference>;
    marketingStatus?: MarketingStatus[];
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    package?: BackboneElement;
    packageFor?: MaybeArray$u<string | Reference>;
    status?: string[] | CodeableConcept;
    statusDate?: string;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$t<T> = T | T[];
type Patient_Props = {
    active?: boolean;
    address?: Address[];
    birthDate?: string;
    communication?: BackboneElement[];
    contact?: BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: Extension[];
    gender?: string;
    generalPractitioner?: MaybeArray$t<string | Reference>;
    id?: string;
    identifier?: MaybeArray$t<string | Identifier>;
    implicitRules?: string;
    language?: string;
    link?: BackboneElement[];
    managingOrganization?: string | Reference;
    maritalStatus?: string[] | CodeableConcept;
    meta?: Meta;
    modifierExtension?: Extension[];
    multipleBirth?: boolean | number;
    name?: HumanName[];
    photo?: Attachment[];
    telecom?: ContactPoint[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$s<T> = T | T[];
type PaymentNotice_Props = {
    amount?: Money;
    contained?: any[];
    created?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$s<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    payee?: string | Reference;
    payment?: string | Reference;
    paymentDate?: string;
    paymentStatus?: string[] | CodeableConcept;
    provider?: string | Reference;
    recipient?: string | Reference;
    request?: string | Reference;
    response?: string | Reference;
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$r<T> = T | T[];
type PaymentReconciliation_Props = {
    contained?: any[];
    created?: string;
    detail?: BackboneElement[];
    disposition?: string;
    extension?: Extension[];
    formCode?: string[] | CodeableConcept;
    id?: string;
    identifier?: MaybeArray$r<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    outcome?: string;
    paymentAmount?: Money;
    paymentDate?: string;
    paymentIdentifier?: string | Identifier;
    paymentIssuer?: string | Reference;
    period?: Period;
    processNote?: BackboneElement[];
    request?: string | Reference;
    requestor?: string | Reference;
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$q<T> = T | T[];
type Person_Props = {
    active?: boolean;
    address?: Address[];
    birthDate?: string;
    contained?: any[];
    extension?: Extension[];
    gender?: string;
    id?: string;
    identifier?: MaybeArray$q<string | Identifier>;
    implicitRules?: string;
    language?: string;
    link?: BackboneElement[];
    managingOrganization?: string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: HumanName[];
    photo?: Attachment;
    telecom?: ContactPoint[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$p<T> = T | T[];
type PlanDefinition_Props = {
    action?: BackboneElement[];
    approvalDate?: string;
    author?: ContactDetail[];
    contact?: ContactDetail[];
    contained?: any[];
    copyright?: string;
    date?: string;
    description?: string;
    editor?: ContactDetail[];
    effectivePeriod?: Period;
    endorser?: ContactDetail[];
    experimental?: boolean;
    extension?: Extension[];
    goal?: BackboneElement[];
    id?: string;
    identifier?: MaybeArray$p<string | Identifier>;
    implicitRules?: string;
    jurisdiction?: MaybeArray$p<string[] | CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    library?: any[];
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    publisher?: string;
    purpose?: string;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    status?: string;
    subject?: string[] | CodeableConcept | string | Reference | any;
    subtitle?: string;
    text?: Narrative;
    title?: string;
    topic?: MaybeArray$p<string[] | CodeableConcept>;
    type?: string[] | CodeableConcept;
    url?: string;
    usage?: string;
    useContext?: UsageContext[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$o<T> = T | T[];
type Practitioner_Props = {
    active?: boolean;
    address?: Address[];
    birthDate?: string;
    communication?: MaybeArray$o<string[] | CodeableConcept>;
    contained?: any[];
    extension?: Extension[];
    gender?: string;
    id?: string;
    identifier?: MaybeArray$o<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: HumanName[];
    photo?: Attachment[];
    qualification?: BackboneElement[];
    telecom?: ContactPoint[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$n<T> = T | T[];
type PractitionerRole_Props = {
    active?: boolean;
    availabilityExceptions?: string;
    availableTime?: BackboneElement[];
    code?: MaybeArray$n<string[] | CodeableConcept>;
    contained?: any[];
    endpoint?: MaybeArray$n<string | Reference>;
    extension?: Extension[];
    healthcareService?: MaybeArray$n<string | Reference>;
    id?: string;
    identifier?: MaybeArray$n<string | Identifier>;
    implicitRules?: string;
    language?: string;
    location?: MaybeArray$n<string | Reference>;
    meta?: Meta;
    modifierExtension?: Extension[];
    notAvailable?: BackboneElement[];
    organization?: string | Reference;
    period?: Period;
    practitioner?: string | Reference;
    specialty?: MaybeArray$n<string[] | CodeableConcept>;
    telecom?: ContactPoint[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$m<T> = T | T[];
type Procedure_Props = {
    asserter?: string | Reference;
    basedOn?: MaybeArray$m<string | Reference>;
    bodySite?: MaybeArray$m<string[] | CodeableConcept>;
    category?: string[] | CodeableConcept;
    code?: string[] | CodeableConcept;
    complication?: MaybeArray$m<string[] | CodeableConcept>;
    complicationDetail?: MaybeArray$m<string | Reference>;
    contained?: any[];
    encounter?: string | Reference;
    extension?: Extension[];
    focalDevice?: BackboneElement[];
    followUp?: MaybeArray$m<string[] | CodeableConcept>;
    id?: string;
    identifier?: MaybeArray$m<string | Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    language?: string;
    location?: string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    outcome?: string[] | CodeableConcept;
    partOf?: MaybeArray$m<string | Reference>;
    performed?: string | Period | Age | Range;
    performer?: BackboneElement[];
    reasonCode?: MaybeArray$m<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$m<string | Reference>;
    recorder?: string | Reference;
    report?: MaybeArray$m<string | Reference>;
    status?: string;
    statusReason?: string[] | CodeableConcept;
    subject?: string | Reference;
    text?: Narrative;
    usedCode?: MaybeArray$m<string[] | CodeableConcept>;
    usedReference?: MaybeArray$m<string | Reference>;
    [key: string]: any;
};

type MaybeArray$l<T> = T | T[];
type Questionnaire_Props = {
    approvalDate?: string;
    code?: Coding[];
    contact?: ContactDetail[];
    contained?: any[];
    copyright?: string;
    date?: string;
    derivedFrom?: any[];
    description?: string;
    effectivePeriod?: Period;
    experimental?: boolean;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$l<string | Identifier>;
    implicitRules?: string;
    item?: BackboneElement[];
    jurisdiction?: MaybeArray$l<string[] | CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    publisher?: string;
    purpose?: string;
    status?: string;
    subjectType?: string[];
    text?: Narrative;
    title?: string;
    url?: string;
    useContext?: UsageContext[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$k<T> = T | T[];
type QuestionnaireResponse_Props = {
    author?: string | Reference;
    authored?: string;
    basedOn?: MaybeArray$k<string | Reference>;
    contained?: any[];
    encounter?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: string | Identifier;
    implicitRules?: string;
    item?: BackboneElement[];
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    partOf?: MaybeArray$k<string | Reference>;
    questionnaire?: any;
    source?: string | Reference;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$j<T> = T | T[];
type RegulatedAuthorization_Props = {
    basis?: MaybeArray$j<string[] | CodeableConcept>;
    case?: BackboneElement;
    contained?: any[];
    description?: string;
    extension?: Extension[];
    holder?: string | Reference;
    id?: string;
    identifier?: MaybeArray$j<string | Identifier>;
    implicitRules?: string;
    indication?: CodeableReference;
    intendedUse?: string[] | CodeableConcept;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    region?: MaybeArray$j<string[] | CodeableConcept>;
    regulator?: string | Reference;
    status?: string[] | CodeableConcept;
    statusDate?: string;
    subject?: MaybeArray$j<string | Reference>;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    validityPeriod?: Period;
    [key: string]: any;
};

type MaybeArray$i<T> = T | T[];
type RelatedPerson_Props = {
    active?: boolean;
    address?: Address[];
    birthDate?: string;
    communication?: BackboneElement[];
    contained?: any[];
    extension?: Extension[];
    gender?: string;
    id?: string;
    identifier?: MaybeArray$i<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: HumanName[];
    patient?: string | Reference;
    period?: Period;
    photo?: Attachment[];
    relationship?: MaybeArray$i<string[] | CodeableConcept>;
    telecom?: ContactPoint[];
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$h<T> = T | T[];
type RequestGroup_Props = {
    action?: BackboneElement[];
    author?: string | Reference;
    authoredOn?: string;
    basedOn?: MaybeArray$h<string | Reference>;
    code?: string[] | CodeableConcept;
    contained?: any[];
    encounter?: string | Reference;
    extension?: Extension[];
    groupIdentifier?: string | Identifier;
    id?: string;
    identifier?: MaybeArray$h<string | Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    intent?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    priority?: string;
    reasonCode?: MaybeArray$h<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$h<string | Reference>;
    replaces?: MaybeArray$h<string | Reference>;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$g<T> = T | T[];
type ResearchDefinition_Props = {
    approvalDate?: string;
    author?: ContactDetail[];
    comment?: string[];
    contact?: ContactDetail[];
    contained?: any[];
    copyright?: string;
    date?: string;
    description?: string;
    editor?: ContactDetail[];
    effectivePeriod?: Period;
    endorser?: ContactDetail[];
    experimental?: boolean;
    exposure?: string | Reference;
    exposureAlternative?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$g<string | Identifier>;
    implicitRules?: string;
    jurisdiction?: MaybeArray$g<string[] | CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    library?: any[];
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    outcome?: string | Reference;
    population?: string | Reference;
    publisher?: string;
    purpose?: string;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    shortTitle?: string;
    status?: string;
    subject?: string[] | CodeableConcept | string | Reference;
    subtitle?: string;
    text?: Narrative;
    title?: string;
    topic?: MaybeArray$g<string[] | CodeableConcept>;
    url?: string;
    usage?: string;
    useContext?: UsageContext[];
    version?: string;
    [key: string]: any;
};

type MaybeArray$f<T> = T | T[];
type ResearchElementDefinition_Props = {
    approvalDate?: string;
    author?: ContactDetail[];
    characteristic?: BackboneElement[];
    comment?: string[];
    contact?: ContactDetail[];
    contained?: any[];
    copyright?: string;
    date?: string;
    description?: string;
    editor?: ContactDetail[];
    effectivePeriod?: Period;
    endorser?: ContactDetail[];
    experimental?: boolean;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$f<string | Identifier>;
    implicitRules?: string;
    jurisdiction?: MaybeArray$f<string[] | CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    library?: any[];
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    publisher?: string;
    purpose?: string;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    shortTitle?: string;
    status?: string;
    subject?: string[] | CodeableConcept | string | Reference;
    subtitle?: string;
    text?: Narrative;
    title?: string;
    topic?: MaybeArray$f<string[] | CodeableConcept>;
    type?: string;
    url?: string;
    usage?: string;
    useContext?: UsageContext[];
    variableType?: string;
    version?: string;
    [key: string]: any;
};

type MaybeArray$e<T> = T | T[];
type ResearchStudy_Props = {
    arm?: BackboneElement[];
    category?: MaybeArray$e<string[] | CodeableConcept>;
    condition?: MaybeArray$e<string[] | CodeableConcept>;
    contact?: ContactDetail[];
    contained?: any[];
    description?: string;
    enrollment?: MaybeArray$e<string | Reference>;
    extension?: Extension[];
    focus?: MaybeArray$e<string[] | CodeableConcept>;
    id?: string;
    identifier?: MaybeArray$e<string | Identifier>;
    implicitRules?: string;
    keyword?: MaybeArray$e<string[] | CodeableConcept>;
    language?: string;
    location?: MaybeArray$e<string[] | CodeableConcept>;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    objective?: BackboneElement[];
    partOf?: MaybeArray$e<string | Reference>;
    period?: Period;
    phase?: string[] | CodeableConcept;
    primaryPurposeType?: string[] | CodeableConcept;
    principalInvestigator?: string | Reference;
    protocol?: MaybeArray$e<string | Reference>;
    reasonStopped?: string[] | CodeableConcept;
    relatedArtifact?: RelatedArtifact[];
    site?: MaybeArray$e<string | Reference>;
    sponsor?: string | Reference;
    status?: string;
    text?: Narrative;
    title?: string;
    [key: string]: any;
};

type MaybeArray$d<T> = T | T[];
type ResearchSubject_Props = {
    actualArm?: string;
    assignedArm?: string;
    consent?: string | Reference;
    contained?: any[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$d<string | Identifier>;
    implicitRules?: string;
    individual?: string | Reference;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    period?: Period;
    status?: string;
    study?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$c<T> = T | T[];
type RiskAssessment_Props = {
    basedOn?: string | Reference;
    basis?: MaybeArray$c<string | Reference>;
    code?: string[] | CodeableConcept;
    condition?: string | Reference;
    contained?: any[];
    encounter?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$c<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    method?: string[] | CodeableConcept;
    mitigation?: string;
    modifierExtension?: Extension[];
    note?: Annotation[];
    occurrence?: string | Period;
    parent?: string | Reference;
    performer?: string | Reference;
    prediction?: BackboneElement[];
    reasonCode?: MaybeArray$c<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$c<string | Reference>;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$b<T> = T | T[];
type Schedule_Props = {
    active?: boolean;
    actor?: MaybeArray$b<string | Reference>;
    comment?: string;
    contained?: any[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$b<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    planningHorizon?: Period;
    serviceCategory?: MaybeArray$b<string[] | CodeableConcept>;
    serviceType?: MaybeArray$b<string[] | CodeableConcept>;
    specialty?: MaybeArray$b<string[] | CodeableConcept>;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$a<T> = T | T[];
type ServiceRequest_Props = {
    asNeeded?: boolean | string[] | CodeableConcept;
    authoredOn?: string;
    basedOn?: MaybeArray$a<string | Reference>;
    bodySite?: MaybeArray$a<string[] | CodeableConcept>;
    category?: MaybeArray$a<string[] | CodeableConcept>;
    code?: string[] | CodeableConcept;
    contained?: any[];
    doNotPerform?: boolean;
    encounter?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$a<string | Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: MaybeArray$a<string | Reference>;
    intent?: string;
    language?: string;
    locationCode?: MaybeArray$a<string[] | CodeableConcept>;
    locationReference?: MaybeArray$a<string | Reference>;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    occurrence?: string | Period | Timing;
    orderDetail?: MaybeArray$a<string[] | CodeableConcept>;
    patientInstruction?: string;
    performer?: MaybeArray$a<string | Reference>;
    performerType?: string[] | CodeableConcept;
    priority?: string;
    quantity?: Quantity | Ratio | Range;
    reasonCode?: MaybeArray$a<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$a<string | Reference>;
    relevantHistory?: MaybeArray$a<string | Reference>;
    replaces?: MaybeArray$a<string | Reference>;
    requester?: string | Reference;
    requisition?: string | Identifier;
    specimen?: MaybeArray$a<string | Reference>;
    status?: string;
    subject?: string | Reference;
    supportingInfo?: MaybeArray$a<string | Reference>;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$9<T> = T | T[];
type Slot_Props = {
    appointmentType?: string[] | CodeableConcept;
    comment?: string;
    contained?: any[];
    end?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$9<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    overbooked?: boolean;
    schedule?: string | Reference;
    serviceCategory?: MaybeArray$9<string[] | CodeableConcept>;
    serviceType?: MaybeArray$9<string[] | CodeableConcept>;
    specialty?: MaybeArray$9<string[] | CodeableConcept>;
    start?: string;
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$8<T> = T | T[];
type Specimen_Props = {
    accessionIdentifier?: string | Identifier;
    collection?: BackboneElement;
    condition?: MaybeArray$8<string[] | CodeableConcept>;
    contained?: any[];
    container?: BackboneElement[];
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$8<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    parent?: MaybeArray$8<string | Reference>;
    processing?: BackboneElement[];
    receivedTime?: string;
    request?: MaybeArray$8<string | Reference>;
    status?: string;
    subject?: string | Reference;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$7<T> = T | T[];
type SpecimenDefinition_Props = {
    collection?: MaybeArray$7<string[] | CodeableConcept>;
    contained?: any[];
    extension?: Extension[];
    id?: string;
    identifier?: string | Identifier;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    patientPreparation?: MaybeArray$7<string[] | CodeableConcept>;
    text?: Narrative;
    timeAspect?: string;
    typeCollected?: string[] | CodeableConcept;
    typeTested?: BackboneElement[];
    [key: string]: any;
};

type MaybeArray$6<T> = T | T[];
type Substance_Props = {
    category?: MaybeArray$6<string[] | CodeableConcept>;
    code?: string[] | CodeableConcept;
    contained?: any[];
    description?: string;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$6<string | Identifier>;
    implicitRules?: string;
    ingredient?: BackboneElement[];
    instance?: BackboneElement[];
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$5<T> = T | T[];
type SubstanceDefinition_Props = {
    classification?: MaybeArray$5<string[] | CodeableConcept>;
    code?: BackboneElement[];
    contained?: any[];
    description?: string;
    domain?: string[] | CodeableConcept;
    extension?: Extension[];
    grade?: MaybeArray$5<string[] | CodeableConcept>;
    id?: string;
    identifier?: MaybeArray$5<string | Identifier>;
    implicitRules?: string;
    informationSource?: MaybeArray$5<string | Reference>;
    language?: string;
    manufacturer?: MaybeArray$5<string | Reference>;
    meta?: Meta;
    modifierExtension?: Extension[];
    moiety?: BackboneElement[];
    molecularWeight?: BackboneElement[];
    name?: BackboneElement[];
    note?: Annotation[];
    property?: BackboneElement[];
    relationship?: BackboneElement[];
    sourceMaterial?: BackboneElement;
    status?: string[] | CodeableConcept;
    structure?: BackboneElement;
    supplier?: MaybeArray$5<string | Reference>;
    text?: Narrative;
    version?: string;
    [key: string]: any;
};

type MaybeArray$4<T> = T | T[];
type SupplyDelivery_Props = {
    basedOn?: MaybeArray$4<string | Reference>;
    contained?: any[];
    destination?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$4<string | Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    occurrence?: string | Period | Timing;
    partOf?: MaybeArray$4<string | Reference>;
    patient?: string | Reference;
    receiver?: MaybeArray$4<string | Reference>;
    status?: string;
    suppliedItem?: BackboneElement;
    supplier?: string | Reference;
    text?: Narrative;
    type?: string[] | CodeableConcept;
    [key: string]: any;
};

type MaybeArray$3<T> = T | T[];
type SupplyRequest_Props = {
    authoredOn?: string;
    category?: string[] | CodeableConcept;
    contained?: any[];
    deliverFrom?: string | Reference;
    deliverTo?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$3<string | Identifier>;
    implicitRules?: string;
    item?: string[] | CodeableConcept | string | Reference;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    occurrence?: string | Period | Timing;
    parameter?: BackboneElement[];
    priority?: string;
    quantity?: Quantity;
    reasonCode?: MaybeArray$3<string[] | CodeableConcept>;
    reasonReference?: MaybeArray$3<string | Reference>;
    requester?: string | Reference;
    status?: string;
    supplier?: MaybeArray$3<string | Reference>;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$2<T> = T | T[];
type Task_Props = {
    authoredOn?: string;
    basedOn?: MaybeArray$2<string | Reference>;
    businessStatus?: string[] | CodeableConcept;
    code?: string[] | CodeableConcept;
    contained?: any[];
    description?: string;
    encounter?: string | Reference;
    executionPeriod?: Period;
    extension?: Extension[];
    focus?: string | Reference;
    for?: string | Reference;
    groupIdentifier?: string | Identifier;
    id?: string;
    identifier?: MaybeArray$2<string | Identifier>;
    implicitRules?: string;
    input?: BackboneElement[];
    instantiatesCanonical?: any;
    instantiatesUri?: string;
    insurance?: MaybeArray$2<string | Reference>;
    intent?: string;
    language?: string;
    lastModified?: string;
    location?: string | Reference;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    output?: BackboneElement[];
    owner?: string | Reference;
    partOf?: MaybeArray$2<string | Reference>;
    performerType?: MaybeArray$2<string[] | CodeableConcept>;
    priority?: string;
    reasonCode?: string[] | CodeableConcept;
    reasonReference?: string | Reference;
    relevantHistory?: MaybeArray$2<string | Reference>;
    requester?: string | Reference;
    restriction?: BackboneElement;
    status?: string;
    statusReason?: string[] | CodeableConcept;
    text?: Narrative;
    [key: string]: any;
};

type TestReport_Props = {
    contained?: any[];
    extension?: Extension[];
    id?: string;
    identifier?: string | Identifier;
    implicitRules?: string;
    issued?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    participant?: BackboneElement[];
    result?: string;
    score?: number;
    setup?: BackboneElement;
    status?: string;
    teardown?: BackboneElement;
    test?: BackboneElement[];
    testScript?: string | Reference;
    tester?: string;
    text?: Narrative;
    [key: string]: any;
};

type MaybeArray$1<T> = T | T[];
type VerificationResult_Props = {
    attestation?: BackboneElement;
    contained?: any[];
    extension?: Extension[];
    failureAction?: string[] | CodeableConcept;
    frequency?: Timing;
    id?: string;
    implicitRules?: string;
    language?: string;
    lastPerformed?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    need?: string[] | CodeableConcept;
    nextScheduled?: string;
    primarySource?: BackboneElement[];
    status?: string;
    statusDate?: string;
    target?: MaybeArray$1<string | Reference>;
    targetLocation?: string[];
    text?: Narrative;
    validationProcess?: MaybeArray$1<string[] | CodeableConcept>;
    validationType?: string[] | CodeableConcept;
    validator?: BackboneElement[];
    [key: string]: any;
};

type MaybeArray<T> = T | T[];
type VisionPrescription_Props = {
    contained?: any[];
    created?: string;
    dateWritten?: string;
    encounter?: string | Reference;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray<string | Identifier>;
    implicitRules?: string;
    language?: string;
    lensSpecification?: BackboneElement[];
    meta?: Meta;
    modifierExtension?: Extension[];
    patient?: string | Reference;
    prescriber?: string | Reference;
    status?: string;
    text?: Narrative;
    [key: string]: any;
};

/**
 * Set the data value index
 * Each value will be indexed by code and display
 */
declare const setValues: (url: any, values: any, type?: string) => void;
/**
 * Add new entries to the  data value index
 */
declare const extendValues: (url: any, values: any, type?: string) => void;
/**
 * Look up a code from a value set
 */
declare const lookupValue: (url: any, code: any) => any;
declare const mapSystems: (obj: any) => any;
/**
 * Go over all the keys of an object and, based on the hints,
 * expand values using value maps
 */
declare const mapValues: (obj: any, hints: any) => any;
/**
 * Define a set of mapped system values.
 *
 * Builder functions will use this mappings when they encounter them in system keys. Useful for setting shortcuts.
 * @public
 * @function
 * @example <caption>Set shortcut system mappings</caption>
 * b.setSystemMap({
 *   SmartCareID: 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'
 * });
 * create(builders.patient({ identifier: b.identifier('xyz', 'SmartCareId') }))
 */
declare const setSystemMap: (newMappings: any) => (state: any) => any;
declare const extendSystemMap: (newMappings: any) => void;
/**
 * Create an Identifier. Systems will be mapped against the system map. Pass extensions as extra arguments.
 * @public
 * @function
 * @param id - A string identifier, a FHIR identifier object, or an array of either.
 * @param ext - Any other arguments will be treated as extensions
 */
declare const identifier: (id: string | Identifier, ext?: any[], valueHints?: any) => any;
/**
 * Alias for b.identifier()
 * @public
 * @function
 */
declare const id: (id: string | Identifier, ext?: any[], valueHints?: any) => any;
/**
 * Add an extension to a resource (or object).
 * An object will be created and added to an `extension` array on the provided resource.
 * The extension array will be set if it does not exist on the resource.
 * The value will be smartly written to the object, ie, valueDateTime or valueReference or valueString
 * @public
 * @function
 * @param resource - a FHIR resource object to add an extension too
 * @param {string} url - the URL to set for the extension
 * @param value - the value that the extension should contain
 */
declare const addExtension: (resource: any, url: any, value: any) => void;
/**
 * Create an extension with a system and value
 * Values will be typemapped (ie, `value` -> `valueString`)
 * Optionally pass extra keys on the third argument
 * @public
 * @function
 * @param {string} url - the URL to set for the extension
 * @param value - the value that the extension should contain
 * @param props - extra props to add to the extension
 */
declare const extension: (url: string, value: any, props?: Omit<Extension, "url">) => {
    extension: ({
        url: string;
    } & Omit<Extension, "url">)[];
};
/**
 * Alias for b.extension()
 * @public
 * @function
 */
declare const ext: (url: string, value: any, props?: Omit<Extension, "url">) => {
    extension: ({
        url: string;
    } & Omit<Extension, "url">)[];
};
/**
 * Find an extension with a given url in some array
 * @public
 * @function
 * @param obj - a fhir resource
 * @param {string} targetUrl - the extension URL you want to find
 * @param {string} [path] - a path to extract from the resource. Optional.
 */
declare const findExtension: (obj: any, targetUrl: any, path: any) => any;
/**
 * Create a coding object { code, system }. Systems will be mapped using the system map.
 * @public
 * @function
 * @param {string} code - the code value
 * @param {string} system - URL to the system. Will be mapped using the system map.
 */
declare function coding(code: string, system: string, extra?: Omit<Coding, 'code' | 'system'>): any;
declare const c: typeof coding;
/**
 * Create a value object { code, system } with optional system. Systems will be mapped.
 * @function
 * @param {string} value - the value
 * @param {string} system - URL to the system. Well be mapped using the system map.
 */
declare const value: (value: any, system: any, ...extra: any[]) => any;
/**
 * Create a CodeableConcept. Codings can be coding objects or
 * [code, system, extra] tuples (such as passed to b.coding())
 * Systems will be mapped with the system map
 * @public
 * @function
 * @param {string} value - the value
 * @param {object} extra - Extra properties to write to the coding
 * @example <caption>Create a codeableConcept</caption>
 * const myConcept = util.concept(['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 * @example <caption>Create a codeableConcept with text</caption>
 * const myConcept = util.concept('smart care id', ['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 */
type ConceptCoding = Coding | [string, string, Omit<Coding, 'code' | 'system'>?];
declare const concept: (codings: ConceptCoding | ConceptCoding[], extra?: Omit<CodeableConcept, "coding">) => CodeableConcept;
/**
 * Alias for b.concept()
 * @public
 * @function
 */
declare const cc: (codings: ConceptCoding | ConceptCoding[], extra?: Omit<CodeableConcept, "coding">) => CodeableConcept;
declare const ensureConceptText: (concept: any) => void;
/**
 * Create a reference object of the form { reference }
 * If ref is an array, each item will be mapped and an array returned.
 * If ref is a FHIR resource, a reference to it will be generated
 * If ref is a string, it'll be treated as a reference id and returned as an object
 * If ref is a valid FHIR reference, it'll just be returned.
 * @public
 * @function
 * @param ref - the thing to generate a reference from
 */
declare const reference: (ref: any, opts?: {}) => any;
/**
 * Alias for b.reference()
 * @public
 * @function
 */
declare const ref: (ref: any, opts?: {}) => any;
/**
 * Write a value to the target object using a typed key
 * Ie, if key is `value` and the value is a date time string,
 * this function will write `valueDateTime` to the object.
 *
 * This function is poorly named.
 * @public
 * @function
 * @param object - the object to write the composite key to
 * @param {string} key - the base key to use to write the value
 * @param value - some value to write to the object
 */
declare const composite: (object: any, key: any, value: any) => void;

/**
  * Create a Account resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.coverage] - The party(s) that are responsible for covering the payment of this account, and what order should they be applied to the account
  * @param {string} [props.description] - Explanation of purpose/use
  * @param {BackboneElement} [props.guarantor] - The parties ultimately responsible for balancing the Account
  * @param {Identifier} [props.identifier] - Account number
  * @param {string} [props.name] - Human-readable label
  * @param {Reference} [props.owner] - Entity managing the Account
  * @param {Reference} [props.partOf] - Reference to a parent Account
  * @param {Period} [props.servicePeriod] - Transaction window
  * @param {string} [props.status] - active | inactive | entered-in-error | on-hold | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/account-status|4.3.0
  * @param {Reference} [props.subject] - The entity that caused the expenses
  * @param {string} [props.type] - E.g. patient, expense, depreciation. Accepts all values from http://hl7.org/fhir/ValueSet/account-type
  */
declare function account(type: "Account", props: Account_Props): any;
declare function account(props: Account_Props): any;
/**
  * Create a ActivityDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {date} [props.approvalDate] - When the activity definition was approved by publisher
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {string} [props.bodySite] - What part of body to perform on. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {string} [props.code] - Detail type of activity. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-code
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.description] - Natural language description of the activity definition
  * @param {boolean} [props.doNotPerform] - True if the activity should not be performed
  * @param {Dosage} [props.dosage] - Detailed dosage instructions
  * @param {BackboneElement} [props.dynamicValue] - Dynamic aspects of the definition
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {Period} [props.effectivePeriod] - When the activity definition is expected to be used
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {Identifier} [props.identifier] - Additional identifier for the activity definition
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/request-intent|4.3.0
  * @param {string} [props.jurisdiction] - Intended jurisdiction for activity definition (if applicable). Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {string} [props.kind] - Kind of resource. Accepts all values from http://hl7.org/fhir/ValueSet/request-resource-types|4.3.0
  * @param {date} [props.lastReviewDate] - When the activity definition was last reviewed
  * @param {canonical} [props.library] - Logic used by the activity definition
  * @param {Reference} [props.location] - Where it should happen
  * @param {string} [props.name] - Name for this activity definition (computer friendly)
  * @param {Reference} [props.observationRequirement] - What observations are required to perform this action
  * @param {Reference} [props.observationResultRequirement] - What observations must be produced by this action
  * @param {BackboneElement} [props.participant] - Who should participate in the action
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.3.0
  * @param {string} [props.product] - What's administered/supplied. Accepts all values from http://hl7.org/fhir/ValueSet/medication-codes
  * @param {canonical} [props.profile] - What profile the resource needs to conform to
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {markdown} [props.purpose] - Why this activity definition is defined
  * @param {Quantity} [props.quantity] - How much is administered/consumed/supplied
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {Reference} [props.specimenRequirement] - What specimens are required to perform this action
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.subject] - Type of individual the activity definition is intended for. Accepts all values from http://hl7.org/fhir/ValueSet/subject-type
  * @param {string} [props.subtitle] - Subordinate title of the activity definition
  * @param {Timing|dateTime|Age|Period|Range|Duration} [props.timing] - When activity is to occur
  * @param {string} [props.title] - Name for this activity definition (human friendly)
  * @param {string} [props.topic] - E.g. Education, Treatment, Assessment, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/definition-topic
  * @param {canonical} [props.transform] - Transform to apply the template
  * @param {string} [props.url] - Canonical identifier for this activity definition, represented as a URI (globally unique)
  * @param {string} [props.usage] - Describes the clinical usage of the activity definition
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.version] - Business version of the activity definition
  */
declare function activityDefinition(type: "ActivityDefinition", props: ActivityDefinition_Props): any;
declare function activityDefinition(props: ActivityDefinition_Props): any;
/**
  * Create a AdministrableProductDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.administrableDoseForm] - The dose form of the final product after necessary reconstitution or processing. Accepts all values from http://hl7.org/fhir/ValueSet/administrable-dose-form
  * @param {Reference} [props.device] - A device that is integral to the medicinal product, in effect being considered as an "ingredient" of the medicinal product
  * @param {Reference} [props.formOf] - References a product from which one or more of the constituent parts of that product can be prepared and used as described by this administrable product
  * @param {Identifier} [props.identifier] - An identifier for the administrable product
  * @param {string} [props.ingredient] - The ingredients of this administrable medicinal product. This is only needed if the ingredients are not specified either using ManufacturedItemDefiniton, or using by incoming references from the Ingredient resource. Accepts all values from http://hl7.org/fhir/ValueSet/substance-codes
  * @param {Reference} [props.producedFrom] - Indicates the specific manufactured items that are part of the 'formOf' product that are used in the preparation of this specific administrable form
  * @param {BackboneElement} [props.property] - Characteristics e.g. a product's onset of action
  * @param {BackboneElement} [props.routeOfAdministration] - The path by which the product is taken into or makes contact with the body
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.unitOfPresentation] - The presentation type in which this item is given to a patient. e.g. for a spray - 'puff'. Accepts all values from http://hl7.org/fhir/ValueSet/unit-of-presentation
  */
declare function administrableProductDefinition(type: "AdministrableProductDefinition", props: AdministrableProductDefinition_Props): any;
declare function administrableProductDefinition(props: AdministrableProductDefinition_Props): any;
/**
  * Create a AdverseEvent resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.actuality] - actual | potential. Accepts all values from http://hl7.org/fhir/ValueSet/adverse-event-actuality|4.3.0
  * @param {string} [props.category] - product-problem | product-quality | product-use-error | wrong-dose | incorrect-prescribing-information | wrong-technique | wrong-route-of-administration | wrong-rate | wrong-duration | wrong-time | expired-drug | medical-device-use-error | problem-different-manufacturer | unsafe-physical-environment. Accepts all values from http://hl7.org/fhir/ValueSet/adverse-event-category
  * @param {Reference} [props.contributor] - Who  was involved in the adverse event or the potential adverse event
  * @param {dateTime} [props.date] - When the event occurred
  * @param {dateTime} [props.detected] - When the event was detected
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {string} [props.event] - Type of the event itself in relation to the subject. Accepts all values from http://hl7.org/fhir/ValueSet/adverse-event-type
  * @param {Identifier} [props.identifier] - Business identifier for the event
  * @param {Reference} [props.location] - Location where adverse event occurred
  * @param {string} [props.outcome] - resolved | recovering | ongoing | resolvedWithSequelae | fatal | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/adverse-event-outcome|4.3.0
  * @param {dateTime} [props.recordedDate] - When the event was recorded
  * @param {Reference} [props.recorder] - Who recorded the adverse event
  * @param {Reference} [props.referenceDocument] - AdverseEvent.referenceDocument
  * @param {Reference} [props.resultingCondition] - Effect on the subject due to this event
  * @param {string} [props.seriousness] - Seriousness of the event. Accepts all values from http://hl7.org/fhir/ValueSet/adverse-event-seriousness
  * @param {string} [props.severity] - mild | moderate | severe. Accepts all values from http://hl7.org/fhir/ValueSet/adverse-event-severity|4.3.0
  * @param {Reference} [props.study] - AdverseEvent.study
  * @param {Reference} [props.subject] - Subject impacted by event
  * @param {Reference} [props.subjectMedicalHistory] - AdverseEvent.subjectMedicalHistory
  * @param {BackboneElement} [props.suspectEntity] - The suspected agent causing the adverse event
  */
declare function adverseEvent(type: "AdverseEvent", props: AdverseEvent_Props): any;
declare function adverseEvent(props: AdverseEvent_Props): any;
/**
  * Create a AllergyIntolerance resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.asserter] - Source of the information about the allergy
  * @param {string} [props.category] - food | medication | environment | biologic. Accepts all values from http://hl7.org/fhir/ValueSet/allergy-intolerance-category|4.3.0
  * @param {string} [props.clinicalStatus] - active | inactive | resolved. Accepts all values from http://hl7.org/fhir/ValueSet/allergyintolerance-clinical|4.3.0
  * @param {string} [props.code] - Code that identifies the allergy or intolerance. Accepts all values from http://hl7.org/fhir/ValueSet/allergyintolerance-code
  * @param {string} [props.criticality] - low | high | unable-to-assess. Accepts all values from http://hl7.org/fhir/ValueSet/allergy-intolerance-criticality|4.3.0
  * @param {Reference} [props.encounter] - Encounter when the allergy or intolerance was asserted
  * @param {Identifier} [props.identifier] - External ids for this item
  * @param {dateTime} [props.lastOccurrence] - Date(/time) of last known occurrence of a reaction
  * @param {Annotation} [props.note] - Additional text not captured in other fields
  * @param {dateTime|Age|Period|Range|string} [props.onset] - When allergy or intolerance was identified
  * @param {Reference} [props.patient] - Who the sensitivity is for
  * @param {BackboneElement} [props.reaction] - Adverse Reaction Events linked to exposure to substance
  * @param {dateTime} [props.recordedDate] - Date first version of the resource instance was recorded
  * @param {Reference} [props.recorder] - Who recorded the sensitivity
  * @param {string} [props.type] - allergy | intolerance - Underlying mechanism (if known). Accepts all values from http://hl7.org/fhir/ValueSet/allergy-intolerance-type|4.3.0
  * @param {string} [props.verificationStatus] - unconfirmed | confirmed | refuted | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/allergyintolerance-verification|4.3.0
  */
declare function allergyIntolerance(type: "AllergyIntolerance", props: AllergyIntolerance_Props): any;
declare function allergyIntolerance(props: AllergyIntolerance_Props): any;
/**
  * Create a Appointment resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.appointmentType] - The style of appointment or patient that has been booked in the slot (not service type). Accepts all values from http://terminology.hl7.org/ValueSet/v2-0276
  * @param {Reference} [props.basedOn] - The service request this appointment is allocated to assess
  * @param {string} [props.cancelationReason] - The coded reason for the appointment being cancelled. Accepts all values from http://hl7.org/fhir/ValueSet/appointment-cancellation-reason
  * @param {string} [props.comment] - Additional comments
  * @param {dateTime} [props.created] - The date that this appointment was initially created
  * @param {string} [props.description] - Shown on a subject line in a meeting request, or appointment list
  * @param {instant} [props.end] - When appointment is to conclude
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {number} [props.minutesDuration] - Can be less than start/end (e.g. estimate)
  * @param {BackboneElement} [props.participant] - Participants involved in appointment
  * @param {string} [props.patientInstruction] - Detailed information and instructions for the patient
  * @param {unsignedInt} [props.priority] - Used to make informed decisions if needing to re-prioritize
  * @param {string} [props.reasonCode] - Coded reason this appointment is scheduled. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-reason
  * @param {Reference} [props.reasonReference] - Reason the appointment is to take place (resource)
  * @param {Period} [props.requestedPeriod] - Potential date/time interval(s) requested to allocate the appointment within
  * @param {string} [props.serviceCategory] - A broad categorization of the service that is to be performed during this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/service-category
  * @param {string} [props.serviceType] - The specific service that is to be performed during this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/service-type
  * @param {Reference} [props.slot] - The slots that this appointment is filling
  * @param {string} [props.specialty] - The specialty of a practitioner that would be required to perform the service requested in this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/c80-practice-codes
  * @param {instant} [props.start] - When appointment is to take place
  * @param {string} [props.status] - proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error | checked-in | waitlist. Accepts all values from http://hl7.org/fhir/ValueSet/appointmentstatus|4.3.0
  * @param {Reference} [props.supportingInformation] - Additional information to support the appointment
  */
declare function appointment(type: "Appointment", props: Appointment_Props): any;
declare function appointment(props: Appointment_Props): any;
/**
  * Create a AppointmentResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.actor] - Person, Location, HealthcareService, or Device
  * @param {Reference} [props.appointment] - Appointment this response relates to
  * @param {string} [props.comment] - Additional comments
  * @param {instant} [props.end] - Time from appointment, or requested new end time
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {string} [props.participantStatus] - accepted | declined | tentative | needs-action. Accepts all values from http://hl7.org/fhir/ValueSet/participationstatus|4.3.0
  * @param {string} [props.participantType] - Role of participant in the appointment. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-participant-type
  * @param {instant} [props.start] - Time from appointment, or requested new start time
  */
declare function appointmentResponse(type: "AppointmentResponse", props: AppointmentResponse_Props): any;
declare function appointmentResponse(props: AppointmentResponse_Props): any;
/**
  * Create a BiologicallyDerivedProduct resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.collection] - How this product was collected
  * @param {Identifier} [props.identifier] - External ids for this item
  * @param {BackboneElement} [props.manipulation] - Any manipulation of product post-collection
  * @param {Reference} [props.parent] - BiologicallyDerivedProduct parent
  * @param {BackboneElement} [props.processing] - Any processing of the product during collection
  * @param {string} [props.productCategory] - organ | tissue | fluid | cells | biologicalAgent. Accepts all values from http://hl7.org/fhir/ValueSet/product-category|4.3.0
  * @param {CodeableConcept} [props.productCode] - What this biologically derived product is
  * @param {integer} [props.quantity] - The amount of this biologically derived product
  * @param {Reference} [props.request] - Procedure request
  * @param {string} [props.status] - available | unavailable. Accepts all values from http://hl7.org/fhir/ValueSet/product-status|4.3.0
  * @param {BackboneElement} [props.storage] - Product storage
  */
declare function biologicallyDerivedProduct(type: "BiologicallyDerivedProduct", props: BiologicallyDerivedProduct_Props): any;
declare function biologicallyDerivedProduct(props: BiologicallyDerivedProduct_Props): any;
/**
  * Create a BodyStructure resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this record is in active use
  * @param {string} [props.description] - Text description
  * @param {Identifier} [props.identifier] - Bodystructure identifier
  * @param {Attachment} [props.image] - Attached images
  * @param {string} [props.location] - Body site. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {string} [props.locationQualifier] - Body site modifier. Accepts all values from http://hl7.org/fhir/ValueSet/bodystructure-relative-location
  * @param {string} [props.morphology] - Kind of Structure. Accepts all values from http://hl7.org/fhir/ValueSet/bodystructure-code
  * @param {Reference} [props.patient] - Who this is about
  */
declare function bodyStructure(type: "BodyStructure", props: BodyStructure_Props): any;
declare function bodyStructure(props: BodyStructure_Props): any;
/**
  * Create a CarePlan resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.activity] - Action to occur as part of plan
  * @param {Reference} [props.addresses] - Health issues this plan addresses
  * @param {Reference} [props.author] - Who is the designated responsible party
  * @param {Reference} [props.basedOn] - Fulfills CarePlan
  * @param {Reference} [props.careTeam] - Who's involved in plan?
  * @param {string} [props.category] - Type of plan. Accepts all values from http://hl7.org/fhir/ValueSet/care-plan-category
  * @param {Reference} [props.contributor] - Who provided the content of the care plan
  * @param {dateTime} [props.created] - Date record was first recorded
  * @param {string} [props.description] - Summary of nature of plan
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {Reference} [props.goal] - Desired outcome of plan
  * @param {Identifier} [props.identifier] - External Ids for this plan
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {string} [props.intent] - proposal | plan | order | option. Accepts all values from http://hl7.org/fhir/ValueSet/care-plan-intent|4.3.0
  * @param {Annotation} [props.note] - Comments about the plan
  * @param {Reference} [props.partOf] - Part of referenced CarePlan
  * @param {Period} [props.period] - Time period plan covers
  * @param {Reference} [props.replaces] - CarePlan replaced by this CarePlan
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/request-status|4.3.0
  * @param {Reference} [props.subject] - Who the care plan is for
  * @param {Reference} [props.supportingInfo] - Information considered as part of plan
  * @param {string} [props.title] - Human-friendly name for the care plan
  */
declare function carePlan(type: "CarePlan", props: CarePlan_Props): any;
declare function carePlan(props: CarePlan_Props): any;
/**
  * Create a CareTeam resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.category] - Type of team. Accepts all values from http://hl7.org/fhir/ValueSet/care-team-category
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {Identifier} [props.identifier] - External Ids for this team
  * @param {Reference} [props.managingOrganization] - Organization responsible for the care team
  * @param {string} [props.name] - Name of the team, such as crisis assessment team
  * @param {Annotation} [props.note] - Comments made about the CareTeam
  * @param {BackboneElement} [props.participant] - Members of the team
  * @param {Period} [props.period] - Time period team covers
  * @param {string} [props.reasonCode] - Why the care team exists. Accepts all values from http://hl7.org/fhir/ValueSet/clinical-findings
  * @param {Reference} [props.reasonReference] - Why the care team exists
  * @param {string} [props.status] - proposed | active | suspended | inactive | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/care-team-status|4.3.0
  * @param {Reference} [props.subject] - Who care team is for
  * @param {ContactPoint} [props.telecom] - A contact detail for the care team (that applies to all members)
  */
declare function careTeam(type: "CareTeam", props: CareTeam_Props): any;
declare function careTeam(props: CareTeam_Props): any;
/**
  * Create a ChargeItem resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.account] - Account to place this charge
  * @param {string} [props.bodysite] - Anatomical location, if relevant. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {string} [props.code] - A code that identifies the charge, like a billing code. Accepts all values from http://hl7.org/fhir/ValueSet/chargeitem-billingcodes
  * @param {Reference} [props.context] - Encounter / Episode associated with event
  * @param {Reference} [props.costCenter] - Organization that has ownership of the (potential, future) revenue
  * @param {canonical} [props.definitionCanonical] - Resource defining the code of this ChargeItem
  * @param {string} [props.definitionUri] - Defining information about the code of this charge item
  * @param {dateTime} [props.enteredDate] - Date the charge item was entered
  * @param {Reference} [props.enterer] - Individual who was entering
  * @param {decimal} [props.factorOverride] - Factor overriding the associated rules
  * @param {Identifier} [props.identifier] - Business Identifier for item
  * @param {Annotation} [props.note] - Comments made about the ChargeItem
  * @param {dateTime|Period|Timing} [props.occurrence] - When the charged service was applied
  * @param {string} [props.overrideReason] - Reason for overriding the list price/factor
  * @param {Reference} [props.partOf] - Part of referenced ChargeItem
  * @param {BackboneElement} [props.performer] - Who performed charged service
  * @param {Reference} [props.performingOrganization] - Organization providing the charged service
  * @param {Money} [props.priceOverride] - Price overriding the associated rules
  * @param {string} [props.product] - Product charged. Accepts all values from http://hl7.org/fhir/ValueSet/device-kind
  * @param {Quantity} [props.quantity] - Quantity of which the charge item has been serviced
  * @param {string} [props.reason] - Why was the charged  service rendered?. Accepts all values from http://hl7.org/fhir/ValueSet/icd-10
  * @param {Reference} [props.requestingOrganization] - Organization requesting the charged service
  * @param {Reference} [props.service] - Which rendered service is being charged?
  * @param {string} [props.status] - planned | billable | not-billable | aborted | billed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/chargeitem-status|4.3.0
  * @param {Reference} [props.subject] - Individual service was done for/to
  * @param {Reference} [props.supportingInformation] - Further information supporting this charge
  */
declare function chargeItem(type: "ChargeItem", props: ChargeItem_Props): any;
declare function chargeItem(props: ChargeItem_Props): any;
/**
  * Create a ChargeItemDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.applicability] - Whether or not the billing code is applicable
  * @param {date} [props.approvalDate] - When the charge item definition was approved by publisher
  * @param {string} [props.code] - Billing codes or product types this definition applies to. Accepts all values from http://hl7.org/fhir/ValueSet/chargeitem-billingcodes
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.derivedFromUri] - Underlying externally-defined charge item definition
  * @param {markdown} [props.description] - Natural language description of the charge item definition
  * @param {Period} [props.effectivePeriod] - When the charge item definition is expected to be used
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {Identifier} [props.identifier] - Additional identifier for the charge item definition
  * @param {Reference} [props.instance] - Instances this definition applies to
  * @param {string} [props.jurisdiction] - Intended jurisdiction for charge item definition (if applicable). Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {date} [props.lastReviewDate] - When the charge item definition was last reviewed
  * @param {canonical} [props.partOf] - A larger definition of which this particular definition is a component or step
  * @param {BackboneElement} [props.propertyGroup] - Group of properties which are applicable under the same conditions
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {canonical} [props.replaces] - Completed or terminated request(s) whose function is taken by this new request
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.title] - Name for this charge item definition (human friendly)
  * @param {string} [props.url] - Canonical identifier for this charge item definition, represented as a URI (globally unique)
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.version] - Business version of the charge item definition
  */
declare function chargeItemDefinition(type: "ChargeItemDefinition", props: ChargeItemDefinition_Props): any;
declare function chargeItemDefinition(props: ChargeItemDefinition_Props): any;
/**
  * Create a Citation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {date} [props.approvalDate] - When the citation was approved by publisher
  * @param {ContactDetail} [props.author] - Who authored the Citation
  * @param {BackboneElement} [props.citedArtifact] - The article or artifact being described
  * @param {BackboneElement} [props.classification] - The assignment to an organizing scheme
  * @param {ContactDetail} [props.contact] - Contact details for the publisher of the Citation Resource
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions for the Citation, not for the cited artifact
  * @param {string} [props.currentState] - The status of the citation. Accepts all values from http://hl7.org/fhir/ValueSet/citation-status-type
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.description] - Natural language description of the citation
  * @param {ContactDetail} [props.editor] - Who edited the Citation
  * @param {Period} [props.effectivePeriod] - When the citation is expected to be used
  * @param {ContactDetail} [props.endorser] - Who endorsed the Citation
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {Identifier} [props.identifier] - Identifier for the Citation resource itself
  * @param {string} [props.jurisdiction] - Intended jurisdiction for citation (if applicable). Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {date} [props.lastReviewDate] - When the citation was last reviewed
  * @param {string} [props.name] - Name for this citation (computer friendly)
  * @param {Annotation} [props.note] - Used for general notes and annotations not coded elsewhere
  * @param {string} [props.publisher] - The publisher of the Citation, not the publisher of the article or artifact being cited
  * @param {markdown} [props.purpose] - Why this citation is defined
  * @param {BackboneElement} [props.relatesTo] - Artifact related to the Citation Resource
  * @param {ContactDetail} [props.reviewer] - Who reviewed the Citation
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {BackboneElement} [props.statusDate] - An effective date or period for a status of the citation
  * @param {BackboneElement} [props.summary] - A human-readable display of the citation
  * @param {string} [props.title] - Name for this citation (human friendly)
  * @param {string} [props.url] - Canonical identifier for this citation, represented as a globally unique URI
  * @param {UsageContext} [props.useContext] - The context that the Citation Resource content is intended to support
  * @param {string} [props.version] - Business version of the citation
  */
declare function citation(type: "Citation", props: Citation_Props): any;
declare function citation(props: Citation_Props): any;
/**
  * Create a Claim resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.accident] - Details of the event
  * @param {Period} [props.billablePeriod] - Relevant time frame for the claim
  * @param {BackboneElement} [props.careTeam] - Members of the care team
  * @param {dateTime} [props.created] - Resource creation date
  * @param {BackboneElement} [props.diagnosis] - Pertinent diagnosis information
  * @param {Reference} [props.enterer] - Author of the claim
  * @param {Reference} [props.facility] - Servicing facility
  * @param {string} [props.fundsReserve] - For whom to reserve funds. Accepts all values from http://hl7.org/fhir/ValueSet/fundsreserve
  * @param {Identifier} [props.identifier] - Business Identifier for claim
  * @param {BackboneElement} [props.insurance] - Patient insurance information
  * @param {Reference} [props.insurer] - Target
  * @param {BackboneElement} [props.item] - Product or service provided
  * @param {Reference} [props.originalPrescription] - Original prescription if superseded by fulfiller
  * @param {Reference} [props.patient] - The recipient of the products and services
  * @param {BackboneElement} [props.payee] - Recipient of benefits payable
  * @param {Reference} [props.prescription] - Prescription authorizing services and products
  * @param {string} [props.priority] - Desired processing ugency. Accepts all values from http://hl7.org/fhir/ValueSet/process-priority
  * @param {BackboneElement} [props.procedure] - Clinical procedures performed
  * @param {Reference} [props.provider] - Party responsible for the claim
  * @param {Reference} [props.referral] - Treatment referral
  * @param {BackboneElement} [props.related] - Prior or corollary claims
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/fm-status|4.3.0
  * @param {string} [props.subType] - More granular claim type. Accepts all values from http://hl7.org/fhir/ValueSet/claim-subtype
  * @param {BackboneElement} [props.supportingInfo] - Supporting information
  * @param {Money} [props.total] - Total claim cost
  * @param {string} [props.type] - Category or discipline. Accepts all values from http://hl7.org/fhir/ValueSet/claim-type
  * @param {string} [props.use] - claim | preauthorization | predetermination. Accepts all values from http://hl7.org/fhir/ValueSet/claim-use|4.3.0
  */
declare function claim(type: "Claim", props: Claim_Props): any;
declare function claim(props: Claim_Props): any;
/**
  * Create a ClaimResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.addItem] - Insurer added line items
  * @param {any} [props.adjudication] - Header-level adjudication
  * @param {Reference} [props.communicationRequest] - Request for additional information
  * @param {dateTime} [props.created] - Response creation date
  * @param {string} [props.disposition] - Disposition Message
  * @param {BackboneElement} [props.error] - Processing errors
  * @param {Attachment} [props.form] - Printed reference or actual form
  * @param {string} [props.formCode] - Printed form identifier. Accepts all values from http://hl7.org/fhir/ValueSet/forms
  * @param {string} [props.fundsReserve] - Funds reserved status. Accepts all values from http://hl7.org/fhir/ValueSet/fundsreserve
  * @param {Identifier} [props.identifier] - Business Identifier for a claim response
  * @param {BackboneElement} [props.insurance] - Patient insurance information
  * @param {Reference} [props.insurer] - Party responsible for reimbursement
  * @param {BackboneElement} [props.item] - Adjudication for claim line items
  * @param {string} [props.outcome] - queued | complete | error | partial. Accepts all values from http://hl7.org/fhir/ValueSet/remittance-outcome|4.3.0
  * @param {Reference} [props.patient] - The recipient of the products and services
  * @param {string} [props.payeeType] - Party to be paid any benefits payable. Accepts all values from http://hl7.org/fhir/ValueSet/payeetype
  * @param {BackboneElement} [props.payment] - Payment Details
  * @param {Period} [props.preAuthPeriod] - Preauthorization reference effective period
  * @param {string} [props.preAuthRef] - Preauthorization reference
  * @param {BackboneElement} [props.processNote] - Note concerning adjudication
  * @param {Reference} [props.request] - Id of resource triggering adjudication
  * @param {Reference} [props.requestor] - Party responsible for the claim
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/fm-status|4.3.0
  * @param {string} [props.subType] - More granular claim type. Accepts all values from http://hl7.org/fhir/ValueSet/claim-subtype
  * @param {BackboneElement} [props.total] - Adjudication totals
  * @param {string} [props.type] - More granular claim type. Accepts all values from http://hl7.org/fhir/ValueSet/claim-type
  * @param {string} [props.use] - claim | preauthorization | predetermination. Accepts all values from http://hl7.org/fhir/ValueSet/claim-use|4.3.0
  */
declare function claimResponse(type: "ClaimResponse", props: ClaimResponse_Props): any;
declare function claimResponse(props: ClaimResponse_Props): any;
/**
  * Create a ClinicalImpression resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.assessor] - The clinician performing the assessment
  * @param {CodeableConcept} [props.code] - Kind of assessment performed
  * @param {dateTime} [props.date] - When the assessment was documented
  * @param {string} [props.description] - Why/how the assessment was performed
  * @param {dateTime|Period} [props.effective] - Time of assessment
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {BackboneElement} [props.finding] - Possible or likely findings and diagnoses
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {BackboneElement} [props.investigation] - One or more sets of investigations (signs, symptoms, etc.)
  * @param {Annotation} [props.note] - Comments made about the ClinicalImpression
  * @param {Reference} [props.previous] - Reference to last assessment
  * @param {Reference} [props.problem] - Relevant impressions of patient state
  * @param {string} [props.prognosisCodeableConcept] - Estimate of likely outcome. Accepts all values from http://hl7.org/fhir/ValueSet/clinicalimpression-prognosis
  * @param {Reference} [props.prognosisReference] - RiskAssessment expressing likely outcome
  * @param {string} [props.protocol] - Clinical Protocol followed
  * @param {string} [props.status] - in-progress | completed | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/clinicalimpression-status|4.3.0
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {Reference} [props.subject] - Patient or group assessed
  * @param {string} [props.summary] - Summary of the assessment
  * @param {Reference} [props.supportingInfo] - Information supporting the clinical impression
  */
declare function clinicalImpression(type: "ClinicalImpression", props: ClinicalImpression_Props): any;
declare function clinicalImpression(props: ClinicalImpression_Props): any;
/**
  * Create a ClinicalUseDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.category] - A categorisation of the issue, primarily for dividing warnings into subject heading areas such as "Pregnancy", "Overdose". Accepts all values from http://hl7.org/fhir/ValueSet/clinical-use-definition-category
  * @param {BackboneElement} [props.contraindication] - Specifics for when this is a contraindication
  * @param {Identifier} [props.identifier] - Business identifier for this issue
  * @param {BackboneElement} [props.indication] - Specifics for when this is an indication
  * @param {BackboneElement} [props.interaction] - Specifics for when this is an interaction
  * @param {Reference} [props.population] - The population group to which this applies
  * @param {string} [props.status] - Whether this is a current issue or one that has been retired etc. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status
  * @param {Reference} [props.subject] - The medication or procedure for which this is an indication
  * @param {string} [props.type] - indication | contraindication | interaction | undesirable-effect | warning. Accepts all values from http://hl7.org/fhir/ValueSet/clinical-use-definition-type|4.3.0
  * @param {BackboneElement} [props.undesirableEffect] - A possible negative outcome from the use of this treatment
  * @param {BackboneElement} [props.warning] - Critical environmental, health or physical risks or hazards. For example 'Do not operate heavy machinery', 'May cause drowsiness'
  */
declare function clinicalUseDefinition(type: "ClinicalUseDefinition", props: ClinicalUseDefinition_Props): any;
declare function clinicalUseDefinition(props: ClinicalUseDefinition_Props): any;
/**
  * Create a Communication resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.about] - Resources that pertain to this communication
  * @param {Reference} [props.basedOn] - Request fulfilled by this communication
  * @param {string} [props.category] - Message category. Accepts all values from http://hl7.org/fhir/ValueSet/communication-category
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {Identifier} [props.identifier] - Unique identifier
  * @param {Reference} [props.inResponseTo] - Reply to
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {string} [props.medium] - A channel of communication. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ParticipationMode
  * @param {Annotation} [props.note] - Comments made about the communication
  * @param {Reference} [props.partOf] - Part of this action
  * @param {BackboneElement} [props.payload] - Message payload
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.3.0
  * @param {string} [props.reasonCode] - Indication for message. Accepts all values from http://hl7.org/fhir/ValueSet/clinical-findings
  * @param {Reference} [props.reasonReference] - Why was communication done?
  * @param {dateTime} [props.received] - When received
  * @param {Reference} [props.recipient] - Message recipient
  * @param {Reference} [props.sender] - Message sender
  * @param {dateTime} [props.sent] - When sent
  * @param {string} [props.status] - preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/event-status|4.3.0
  * @param {string} [props.statusReason] - Reason for current status. Accepts all values from http://hl7.org/fhir/ValueSet/communication-not-done-reason
  * @param {Reference} [props.subject] - Focus of message
  * @param {string} [props.topic] - Description of the purpose/content. Accepts all values from http://hl7.org/fhir/ValueSet/communication-topic
  */
declare function communication(type: "Communication", props: Communication_Props): any;
declare function communication(props: Communication_Props): any;
/**
  * Create a CommunicationRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.about] - Resources that pertain to this communication request
  * @param {dateTime} [props.authoredOn] - When request transitioned to being actionable
  * @param {Reference} [props.basedOn] - Fulfills plan or proposal
  * @param {string} [props.category] - Message category. Accepts all values from http://hl7.org/fhir/ValueSet/communication-category
  * @param {boolean} [props.doNotPerform] - True if request is prohibiting action
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {Identifier} [props.groupIdentifier] - Composite request this is part of
  * @param {Identifier} [props.identifier] - Unique identifier
  * @param {string} [props.medium] - A channel of communication. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ParticipationMode
  * @param {Annotation} [props.note] - Comments made about communication request
  * @param {dateTime|Period} [props.occurrence] - When scheduled
  * @param {BackboneElement} [props.payload] - Message payload
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.3.0
  * @param {string} [props.reasonCode] - Why is communication needed?. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ActReason
  * @param {Reference} [props.reasonReference] - Why is communication needed?
  * @param {Reference} [props.recipient] - Message recipient
  * @param {Reference} [props.replaces] - Request(s) replaced by this request
  * @param {Reference} [props.requester] - Who/what is requesting service
  * @param {Reference} [props.sender] - Message sender
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/request-status|4.3.0
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {Reference} [props.subject] - Focus of message
  */
declare function communicationRequest(type: "CommunicationRequest", props: CommunicationRequest_Props): any;
declare function communicationRequest(props: CommunicationRequest_Props): any;
/**
  * Create a Contract resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.alias] - Acronym or short name
  * @param {Period} [props.applies] - Effective time
  * @param {Reference} [props.author] - Source of Contract
  * @param {Reference} [props.authority] - Authority under which this Contract has standing
  * @param {BackboneElement} [props.contentDefinition] - Contract precursor content
  * @param {string} [props.contentDerivative] - Content derived from the basal information. Accepts all values from http://hl7.org/fhir/ValueSet/contract-content-derivative
  * @param {Reference} [props.domain] - A sphere of control governed by an authoritative jurisdiction, organization, or person
  * @param {string} [props.expirationType] - Contract cessation cause. Accepts all values from http://hl7.org/fhir/ValueSet/contract-expiration-type
  * @param {BackboneElement} [props.friendly] - Contract Friendly Language
  * @param {Identifier} [props.identifier] - Contract number
  * @param {Reference} [props.instantiatesCanonical] - Source Contract Definition
  * @param {string} [props.instantiatesUri] - External Contract Definition
  * @param {dateTime} [props.issued] - When this Contract was issued
  * @param {BackboneElement} [props.legal] - Contract Legal Language
  * @param {string} [props.legalState] - Negotiation status. Accepts all values from http://hl7.org/fhir/ValueSet/contract-legalstate
  * @param {Attachment|Reference} [props.legallyBinding] - Binding Contract
  * @param {string} [props.name] - Computer friendly designation
  * @param {Reference} [props.relevantHistory] - Key event in Contract History
  * @param {BackboneElement} [props.rule] - Computable Contract Language
  * @param {string} [props.scope] - Range of Legal Concerns. Accepts all values from http://hl7.org/fhir/ValueSet/contract-scope
  * @param {BackboneElement} [props.signer] - Contract Signatory
  * @param {Reference} [props.site] - Specific Location
  * @param {string} [props.status] - amended | appended | cancelled | disputed | entered-in-error | executable | executed | negotiable | offered | policy | rejected | renewed | revoked | resolved | terminated. Accepts all values from http://hl7.org/fhir/ValueSet/contract-status|4.3.0
  * @param {string} [props.subType] - Subtype within the context of type. Accepts all values from http://hl7.org/fhir/ValueSet/contract-subtype
  * @param {Reference} [props.subject] - Contract Target Entity
  * @param {string} [props.subtitle] - Subordinate Friendly name
  * @param {Reference} [props.supportingInfo] - Extra Information
  * @param {BackboneElement} [props.term] - Contract Term List
  * @param {string} [props.title] - Human Friendly name
  * @param {CodeableConcept|Reference} [props.topic] - Focus of contract interest
  * @param {string} [props.type] - Legal instrument category. Accepts all values from http://hl7.org/fhir/ValueSet/contract-type
  * @param {string} [props.url] - Basal definition
  * @param {string} [props.version] - Business edition
  */
declare function contract(type: "Contract", props: Contract_Props): any;
declare function contract(props: Contract_Props): any;
/**
  * Create a Coverage resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.beneficiary] - Plan beneficiary
  * @param {BackboneElement} [props.class] - Additional coverage classifications
  * @param {Reference} [props.contract] - Contract details
  * @param {BackboneElement} [props.costToBeneficiary] - Patient payments for services/products
  * @param {string} [props.dependent] - Dependent number
  * @param {Identifier} [props.identifier] - Business Identifier for the coverage
  * @param {string} [props.network] - Insurer network
  * @param {number} [props.order] - Relative order of the coverage
  * @param {Reference} [props.payor] - Issuer of the policy
  * @param {Period} [props.period] - Coverage start and end dates
  * @param {Reference} [props.policyHolder] - Owner of the policy
  * @param {string} [props.relationship] - Beneficiary relationship to the subscriber. Accepts all values from http://hl7.org/fhir/ValueSet/subscriber-relationship
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/fm-status|4.3.0
  * @param {boolean} [props.subrogation] - Reimbursement to insurer
  * @param {Reference} [props.subscriber] - Subscriber to the policy
  * @param {string} [props.subscriberId] - ID assigned to the subscriber
  * @param {string} [props.type] - Coverage category such as medical or accident. Accepts all values from http://hl7.org/fhir/ValueSet/coverage-type
  */
declare function coverage(type: "Coverage", props: Coverage_Props): any;
declare function coverage(props: Coverage_Props): any;
/**
  * Create a CoverageEligibilityRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.created] - Creation date
  * @param {Reference} [props.enterer] - Author
  * @param {Reference} [props.facility] - Servicing facility
  * @param {Identifier} [props.identifier] - Business Identifier for coverage eligiblity request
  * @param {BackboneElement} [props.insurance] - Patient insurance information
  * @param {Reference} [props.insurer] - Coverage issuer
  * @param {BackboneElement} [props.item] - Item to be evaluated for eligibiity
  * @param {Reference} [props.patient] - Intended recipient of products and services
  * @param {string} [props.priority] - Desired processing priority. Accepts all values from http://hl7.org/fhir/ValueSet/process-priority
  * @param {Reference} [props.provider] - Party responsible for the request
  * @param {string} [props.purpose] - auth-requirements | benefits | discovery | validation. Accepts all values from http://hl7.org/fhir/ValueSet/eligibilityrequest-purpose|4.3.0
  * @param {date|Period} [props.serviced] - Estimated date or dates of service
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/fm-status|4.3.0
  * @param {BackboneElement} [props.supportingInfo] - Supporting information
  */
declare function coverageEligibilityRequest(type: "CoverageEligibilityRequest", props: CoverageEligibilityRequest_Props): any;
declare function coverageEligibilityRequest(props: CoverageEligibilityRequest_Props): any;
/**
  * Create a CoverageEligibilityResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.created] - Response creation date
  * @param {string} [props.disposition] - Disposition Message
  * @param {BackboneElement} [props.error] - Processing errors
  * @param {string} [props.form] - Printed form identifier. Accepts all values from http://hl7.org/fhir/ValueSet/forms
  * @param {Identifier} [props.identifier] - Business Identifier for coverage eligiblity request
  * @param {BackboneElement} [props.insurance] - Patient insurance information
  * @param {Reference} [props.insurer] - Coverage issuer
  * @param {string} [props.outcome] - queued | complete | error | partial. Accepts all values from http://hl7.org/fhir/ValueSet/remittance-outcome|4.3.0
  * @param {Reference} [props.patient] - Intended recipient of products and services
  * @param {string} [props.preAuthRef] - Preauthorization reference
  * @param {string} [props.purpose] - auth-requirements | benefits | discovery | validation. Accepts all values from http://hl7.org/fhir/ValueSet/eligibilityresponse-purpose|4.3.0
  * @param {Reference} [props.request] - Eligibility request reference
  * @param {Reference} [props.requestor] - Party responsible for the request
  * @param {date|Period} [props.serviced] - Estimated date or dates of service
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/fm-status|4.3.0
  */
declare function coverageEligibilityResponse(type: "CoverageEligibilityResponse", props: CoverageEligibilityResponse_Props): any;
declare function coverageEligibilityResponse(props: CoverageEligibilityResponse_Props): any;
/**
  * Create a DetectedIssue resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.author] - The provider or device that identified the issue
  * @param {string} [props.code] - Issue Category, e.g. drug-drug, duplicate therapy, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/detectedissue-category
  * @param {string} [props.detail] - Description and context
  * @param {BackboneElement} [props.evidence] - Supporting evidence
  * @param {dateTime|Period} [props.identified] - When identified
  * @param {Identifier} [props.identifier] - Unique id for the detected issue
  * @param {Reference} [props.implicated] - Problem resource
  * @param {BackboneElement} [props.mitigation] - Step taken to address
  * @param {Reference} [props.patient] - Associated patient
  * @param {string} [props.reference] - Authority for issue
  * @param {string} [props.severity] - high | moderate | low. Accepts all values from http://hl7.org/fhir/ValueSet/detectedissue-severity|4.3.0
  * @param {string} [props.status] - registered | preliminary | final | amended +. Accepts all values from http://hl7.org/fhir/ValueSet/observation-status|4.3.0
  */
declare function detectedIssue(type: "DetectedIssue", props: DetectedIssue_Props): any;
declare function detectedIssue(props: DetectedIssue_Props): any;
/**
  * Create a Device resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {ContactPoint} [props.contact] - Details for human/organization for support
  * @param {Reference} [props.definition] - The reference to the definition for the device
  * @param {BackboneElement} [props.deviceName] - The name of the device as given by the manufacturer
  * @param {string} [props.distinctIdentifier] - The distinct identification string
  * @param {dateTime} [props.expirationDate] - Date and time of expiry of this device (if applicable)
  * @param {Identifier} [props.identifier] - Instance identifier
  * @param {Reference} [props.location] - Where the device is found
  * @param {string} [props.lotNumber] - Lot number of manufacture
  * @param {dateTime} [props.manufactureDate] - Date when the device was made
  * @param {string} [props.manufacturer] - Name of device manufacturer
  * @param {string} [props.modelNumber] - The manufacturer's model number for the device
  * @param {Annotation} [props.note] - Device notes and comments
  * @param {Reference} [props.owner] - Organization responsible for device
  * @param {Reference} [props.parent] - The device that this device is attached to or is part of
  * @param {string} [props.partNumber] - The part number or catalog number of the device
  * @param {Reference} [props.patient] - Patient to whom Device is affixed
  * @param {BackboneElement} [props.property] - The actual configuration settings of a device as it actually operates, e.g., regulation status, time properties
  * @param {CodeableConcept} [props.safety] - Safety Characteristics of Device
  * @param {string} [props.serialNumber] - Serial number assigned by the manufacturer
  * @param {BackboneElement} [props.specialization] - The capabilities supported on a  device, the standards to which the device conforms for a particular purpose, and used for the communication
  * @param {string} [props.status] - active | inactive | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/device-status|4.3.0
  * @param {string} [props.statusReason] - online | paused | standby | offline | not-ready | transduc-discon | hw-discon | off. Accepts all values from http://hl7.org/fhir/ValueSet/device-status-reason
  * @param {string} [props.type] - The kind or type of device. Accepts all values from http://hl7.org/fhir/ValueSet/device-type
  * @param {BackboneElement} [props.udiCarrier] - Unique Device Identifier (UDI) Barcode string
  * @param {string} [props.url] - Network address to contact device
  * @param {BackboneElement} [props.version] - The actual design of the device or software version running on the device
  */
declare function device(type: "Device", props: Device_Props): any;
declare function device(props: Device_Props): any;
/**
  * Create a DeviceDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.capability] - Device capabilities
  * @param {ContactPoint} [props.contact] - Details for human/organization for support
  * @param {BackboneElement} [props.deviceName] - A name given to the device to identify it
  * @param {Identifier} [props.identifier] - Instance identifier
  * @param {CodeableConcept} [props.languageCode] - Language code for the human-readable text strings produced by the device (all supported)
  * @param {string|Reference} [props.manufacturer] - Name of device manufacturer
  * @param {BackboneElement} [props.material] - A substance used to create the material(s) of which the device is made
  * @param {string} [props.modelNumber] - The model number for the device
  * @param {Annotation} [props.note] - Device notes and comments
  * @param {string} [props.onlineInformation] - Access to on-line information
  * @param {Reference} [props.owner] - Organization responsible for device
  * @param {Reference} [props.parentDevice] - The parent device it can be part of
  * @param {ProdCharacteristic} [props.physicalCharacteristics] - Dimensions, color etc.
  * @param {BackboneElement} [props.property] - The actual configuration settings of a device as it actually operates, e.g., regulation status, time properties
  * @param {Quantity} [props.quantity] - The quantity of the device present in the packaging (e.g. the number of devices present in a pack, or the number of devices in the same package of the medicinal product)
  * @param {string} [props.safety] - Safety characteristics of the device. Accepts all values from http://hl7.org/fhir/ValueSet/device-safety
  * @param {ProductShelfLife} [props.shelfLifeStorage] - Shelf Life and storage information
  * @param {BackboneElement} [props.specialization] - The capabilities supported on a  device, the standards to which the device conforms for a particular purpose, and used for the communication
  * @param {string} [props.type] - What kind of device or device system this is. Accepts all values from http://hl7.org/fhir/ValueSet/device-kind
  * @param {BackboneElement} [props.udiDeviceIdentifier] - Unique Device Identifier (UDI) Barcode string
  * @param {string} [props.url] - Network address to contact device
  * @param {string} [props.version] - Available versions
  */
declare function deviceDefinition(type: "DeviceDefinition", props: DeviceDefinition_Props): any;
declare function deviceDefinition(props: DeviceDefinition_Props): any;
/**
  * Create a DeviceMetric resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.calibration] - Describes the calibrations that have been performed or that are required to be performed
  * @param {string} [props.category] - measurement | setting | calculation | unspecified. Accepts all values from http://hl7.org/fhir/ValueSet/metric-category|4.3.0
  * @param {string} [props.color] - black | red | green | yellow | blue | magenta | cyan | white. Accepts all values from http://hl7.org/fhir/ValueSet/metric-color|4.3.0
  * @param {Identifier} [props.identifier] - Instance identifier
  * @param {Timing} [props.measurementPeriod] - Describes the measurement repetition time
  * @param {string} [props.operationalStatus] - on | off | standby | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/metric-operational-status|4.3.0
  * @param {Reference} [props.parent] - Describes the link to the parent Device
  * @param {Reference} [props.source] - Describes the link to the source Device
  * @param {string} [props.type] - Identity of metric, for example Heart Rate or PEEP Setting. Accepts all values from http://hl7.org/fhir/ValueSet/devicemetric-type
  * @param {string} [props.unit] - Unit of Measure for the Metric. Accepts all values from http://hl7.org/fhir/ValueSet/devicemetric-type
  */
declare function deviceMetric(type: "DeviceMetric", props: DeviceMetric_Props): any;
declare function deviceMetric(props: DeviceMetric_Props): any;
/**
  * Create a DeviceRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.authoredOn] - When recorded
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {string} [props.code] - Device requested. Accepts all values from http://hl7.org/fhir/ValueSet/device-kind
  * @param {Reference} [props.encounter] - Encounter motivating request
  * @param {Identifier} [props.groupIdentifier] - Identifier of composite request
  * @param {Identifier} [props.identifier] - External Request identifier
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/request-intent|4.3.0
  * @param {Annotation} [props.note] - Notes or comments
  * @param {dateTime|Period|Timing} [props.occurrence] - Desired time or schedule for use
  * @param {BackboneElement} [props.parameter] - Device details
  * @param {Reference} [props.performer] - Requested Filler
  * @param {string} [props.performerType] - Filler role. Accepts all values from http://hl7.org/fhir/ValueSet/participant-role
  * @param {Reference} [props.priorRequest] - What request replaces
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.3.0
  * @param {string} [props.reasonCode] - Coded Reason for request. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code
  * @param {Reference} [props.reasonReference] - Linked Reason for request
  * @param {Reference} [props.relevantHistory] - Request provenance
  * @param {Reference} [props.requester] - Who/what is requesting diagnostics
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/request-status|4.3.0
  * @param {Reference} [props.subject] - Focus of request
  * @param {Reference} [props.supportingInfo] - Additional clinical information
  */
declare function deviceRequest(type: "DeviceRequest", props: DeviceRequest_Props): any;
declare function deviceRequest(props: DeviceRequest_Props): any;
/**
  * Create a DeviceUseStatement resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal or order
  * @param {string} [props.bodySite] - Target body site. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {Reference} [props.derivedFrom] - Supporting information
  * @param {Reference} [props.device] - Reference to device used
  * @param {Identifier} [props.identifier] - External identifier for this record
  * @param {Annotation} [props.note] - Addition details (comments, instructions)
  * @param {CodeableConcept} [props.reasonCode] - Why device was used
  * @param {Reference} [props.reasonReference] - Why was DeviceUseStatement performed?
  * @param {dateTime} [props.recordedOn] - When statement was recorded
  * @param {Reference} [props.source] - Who made the statement
  * @param {string} [props.status] - active | completed | entered-in-error +. Accepts all values from http://hl7.org/fhir/ValueSet/device-statement-status|4.3.0
  * @param {Reference} [props.subject] - Patient using device
  * @param {Timing|Period|dateTime} [props.timing] - How often  the device was used
  */
declare function deviceUseStatement(type: "DeviceUseStatement", props: DeviceUseStatement_Props): any;
declare function deviceUseStatement(props: DeviceUseStatement_Props): any;
/**
  * Create a DiagnosticReport resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.basedOn] - What was requested
  * @param {string} [props.category] - Service category. Accepts all values from http://hl7.org/fhir/ValueSet/diagnostic-service-sections
  * @param {string} [props.code] - Name/Code for this diagnostic report. Accepts all values from http://hl7.org/fhir/ValueSet/report-codes
  * @param {string} [props.conclusion] - Clinical conclusion (interpretation) of test results
  * @param {string} [props.conclusionCode] - Codes for the clinical conclusion of test results. Accepts all values from http://hl7.org/fhir/ValueSet/clinical-findings
  * @param {dateTime|Period} [props.effective] - Clinically relevant time/time-period for report
  * @param {Reference} [props.encounter] - Health care event when test ordered
  * @param {Identifier} [props.identifier] - Business identifier for report
  * @param {Reference} [props.imagingStudy] - Reference to full details of imaging associated with the diagnostic report
  * @param {instant} [props.issued] - DateTime this version was made
  * @param {BackboneElement} [props.media] - Key images associated with this report
  * @param {Reference} [props.performer] - Responsible Diagnostic Service
  * @param {Attachment} [props.presentedForm] - Entire report as issued
  * @param {Reference} [props.result] - Observations
  * @param {Reference} [props.resultsInterpreter] - Primary result interpreter
  * @param {Reference} [props.specimen] - Specimens this report is based on
  * @param {string} [props.status] - registered | partial | preliminary | final +. Accepts all values from http://hl7.org/fhir/ValueSet/diagnostic-report-status|4.3.0
  * @param {Reference} [props.subject] - The subject of the report - usually, but not always, the patient
  */
declare function diagnosticReport(type: "DiagnosticReport", props: DiagnosticReport_Props): any;
declare function diagnosticReport(props: DiagnosticReport_Props): any;
/**
  * Create a DomainResource resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).

  */
declare function domainResource(type: "DomainResource", props: DomainResource_Props): any;
declare function domainResource(props: DomainResource_Props): any;
/**
  * Create a Encounter resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.account] - The set of accounts that may be used for billing for this Encounter
  * @param {Reference} [props.appointment] - The appointment that scheduled this encounter
  * @param {Reference} [props.basedOn] - The ServiceRequest that initiated this encounter
  * @param {string} [props.class] - Classification of patient encounter. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ActEncounterCode
  * @param {BackboneElement} [props.classHistory] - List of past encounter classes
  * @param {BackboneElement} [props.diagnosis] - The list of diagnosis relevant to this encounter
  * @param {Reference} [props.episodeOfCare] - Episode(s) of care that this encounter should be recorded against
  * @param {BackboneElement} [props.hospitalization] - Details about the admission to a healthcare service
  * @param {Identifier} [props.identifier] - Identifier(s) by which this encounter is known
  * @param {Duration} [props.length] - Quantity of time the encounter lasted (less time absent)
  * @param {BackboneElement} [props.location] - List of locations where the patient has been
  * @param {Reference} [props.partOf] - Another Encounter this encounter is part of
  * @param {BackboneElement} [props.participant] - List of participants involved in the encounter
  * @param {Period} [props.period] - The start and end time of the encounter
  * @param {string} [props.priority] - Indicates the urgency of the encounter. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ActPriority
  * @param {string} [props.reasonCode] - Coded reason the encounter takes place. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-reason
  * @param {Reference} [props.reasonReference] - Reason the encounter takes place (reference)
  * @param {Reference} [props.serviceProvider] - The organization (facility) responsible for this encounter
  * @param {string} [props.serviceType] - Specific type of service. Accepts all values from http://hl7.org/fhir/ValueSet/service-type
  * @param {string} [props.status] - planned | arrived | triaged | in-progress | onleave | finished | cancelled +. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-status|4.3.0
  * @param {BackboneElement} [props.statusHistory] - List of past encounter statuses
  * @param {Reference} [props.subject] - The patient or group present at the encounter
  * @param {string} [props.type] - Specific type of encounter. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-type
  */
declare function encounter(type: "Encounter", props: Encounter_Props): any;
declare function encounter(props: Encounter_Props): any;
/**
  * Create a EnrollmentRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.candidate] - The subject to be enrolled
  * @param {Reference} [props.coverage] - Insurance information
  * @param {dateTime} [props.created] - Creation date
  * @param {Identifier} [props.identifier] - Business Identifier
  * @param {Reference} [props.insurer] - Target
  * @param {Reference} [props.provider] - Responsible practitioner
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/fm-status|4.3.0
  */
declare function enrollmentRequest(type: "EnrollmentRequest", props: EnrollmentRequest_Props): any;
declare function enrollmentRequest(props: EnrollmentRequest_Props): any;
/**
  * Create a EnrollmentResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.created] - Creation date
  * @param {string} [props.disposition] - Disposition Message
  * @param {Identifier} [props.identifier] - Business Identifier
  * @param {Reference} [props.organization] - Insurer
  * @param {string} [props.outcome] - queued | complete | error | partial. Accepts all values from http://hl7.org/fhir/ValueSet/remittance-outcome|4.3.0
  * @param {Reference} [props.request] - Claim reference
  * @param {Reference} [props.requestProvider] - Responsible practitioner
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/fm-status|4.3.0
  */
declare function enrollmentResponse(type: "EnrollmentResponse", props: EnrollmentResponse_Props): any;
declare function enrollmentResponse(props: EnrollmentResponse_Props): any;
/**
  * Create a EpisodeOfCare resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.account] - The set of accounts that may be used for billing for this EpisodeOfCare
  * @param {Reference} [props.careManager] - Care manager/care coordinator for the patient
  * @param {BackboneElement} [props.diagnosis] - The list of diagnosis relevant to this episode of care
  * @param {Identifier} [props.identifier] - Business Identifier(s) relevant for this EpisodeOfCare
  * @param {Reference} [props.managingOrganization] - Organization that assumes care
  * @param {Reference} [props.patient] - The patient who is the focus of this episode of care
  * @param {Period} [props.period] - Interval during responsibility is assumed
  * @param {Reference} [props.referralRequest] - Originating Referral Request(s)
  * @param {string} [props.status] - planned | waitlist | active | onhold | finished | cancelled | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/episode-of-care-status|4.3.0
  * @param {BackboneElement} [props.statusHistory] - Past list of status codes (the current status may be included to cover the start date of the status)
  * @param {Reference} [props.team] - Other practitioners facilitating this episode of care
  * @param {string} [props.type] - Type/class  - e.g. specialist referral, disease management. Accepts all values from http://hl7.org/fhir/ValueSet/episodeofcare-type
  */
declare function episodeOfCare(type: "EpisodeOfCare", props: EpisodeOfCare_Props): any;
declare function episodeOfCare(props: EpisodeOfCare_Props): any;
/**
  * Create a EventDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {date} [props.approvalDate] - When the event definition was approved by publisher
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.description] - Natural language description of the event definition
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {Period} [props.effectivePeriod] - When the event definition is expected to be used
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {Identifier} [props.identifier] - Additional identifier for the event definition
  * @param {string} [props.jurisdiction] - Intended jurisdiction for event definition (if applicable). Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {date} [props.lastReviewDate] - When the event definition was last reviewed
  * @param {string} [props.name] - Name for this event definition (computer friendly)
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {markdown} [props.purpose] - Why this event definition is defined
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.subject] - Type of individual the event definition is focused on. Accepts all values from http://hl7.org/fhir/ValueSet/subject-type
  * @param {string} [props.subtitle] - Subordinate title of the event definition
  * @param {string} [props.title] - Name for this event definition (human friendly)
  * @param {string} [props.topic] - E.g. Education, Treatment, Assessment, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/definition-topic
  * @param {TriggerDefinition} [props.trigger] - "when" the event occurs (multiple = 'or')
  * @param {string} [props.url] - Canonical identifier for this event definition, represented as a URI (globally unique)
  * @param {string} [props.usage] - Describes the clinical usage of the event definition
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.version] - Business version of the event definition
  */
declare function eventDefinition(type: "EventDefinition", props: EventDefinition_Props): any;
declare function eventDefinition(props: EventDefinition_Props): any;
/**
  * Create a Evidence resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {date} [props.approvalDate] - When the summary was approved by publisher
  * @param {markdown} [props.assertion] - Declarative description of the Evidence
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {BackboneElement} [props.certainty] - Certainty or quality of the evidence
  * @param {Reference|markdown} [props.citeAs] - Citation for this evidence
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.description] - Description of the particular summary
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {Identifier} [props.identifier] - Additional identifier for the summary
  * @param {date} [props.lastReviewDate] - When the summary was last reviewed
  * @param {Annotation} [props.note] - Footnotes and/or explanatory notes
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {RelatedArtifact} [props.relatedArtifact] - Link or citation to artifact associated with the summary
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {BackboneElement} [props.statistic] - Values and parameters for a single statistic
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.studyType] - The type of study that produced this evidence. Accepts all values from http://hl7.org/fhir/ValueSet/study-type
  * @param {string} [props.synthesisType] - The method to combine studies. Accepts all values from http://hl7.org/fhir/ValueSet/synthesis-type
  * @param {string} [props.title] - Name for this summary (human friendly)
  * @param {string} [props.url] - Canonical identifier for this evidence, represented as a globally unique URI
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {BackboneElement} [props.variableDefinition] - Evidence variable such as population, exposure, or outcome
  * @param {string} [props.version] - Business version of this summary
  */
declare function evidence(type: "Evidence", props: Evidence_Props): any;
declare function evidence(props: Evidence_Props): any;
/**
  * Create a EvidenceReport resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {Reference|markdown} [props.citeAs] - Citation for this report
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {Identifier} [props.identifier] - Unique identifier for the evidence report
  * @param {Annotation} [props.note] - Used for footnotes and annotations
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {RelatedArtifact} [props.relatedArtifact] - Link, description or reference to artifact associated with the report
  * @param {Identifier} [props.relatedIdentifier] - Identifiers for articles that may relate to more than one evidence report
  * @param {BackboneElement} [props.relatesTo] - Relationships to other compositions/documents
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {BackboneElement} [props.section] - Composition is broken into sections
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {BackboneElement} [props.subject] - Focus of the report
  * @param {string} [props.type] - Kind of report. Accepts all values from http://hl7.org/fhir/ValueSet/evidence-report-type
  * @param {string} [props.url] - Canonical identifier for this EvidenceReport, represented as a globally unique URI
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  */
declare function evidenceReport(type: "EvidenceReport", props: EvidenceReport_Props): any;
declare function evidenceReport(props: EvidenceReport_Props): any;
/**
  * Create a EvidenceVariable resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.actual] - Actual or conceptual
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {BackboneElement} [props.category] - A grouping for ordinal or polychotomous variables
  * @param {BackboneElement} [props.characteristic] - What defines the members of the evidence element
  * @param {string} [props.characteristicCombination] - intersection | union. Accepts all values from http://hl7.org/fhir/ValueSet/characteristic-combination|4.3.0
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.description] - Natural language description of the evidence variable
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {string} [props.handling] - continuous | dichotomous | ordinal | polychotomous. Accepts all values from http://hl7.org/fhir/ValueSet/variable-handling|4.3.0
  * @param {Identifier} [props.identifier] - Additional identifier for the evidence variable
  * @param {string} [props.name] - Name for this evidence variable (computer friendly)
  * @param {Annotation} [props.note] - Used for footnotes or explanatory notes
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {string} [props.shortTitle] - Title for use in informal contexts
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.subtitle] - Subordinate title of the EvidenceVariable
  * @param {string} [props.title] - Name for this evidence variable (human friendly)
  * @param {string} [props.url] - Canonical identifier for this evidence variable, represented as a URI (globally unique)
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.version] - Business version of the evidence variable
  */
declare function evidenceVariable(type: "EvidenceVariable", props: EvidenceVariable_Props): any;
declare function evidenceVariable(props: EvidenceVariable_Props): any;
/**
  * Create a ExplanationOfBenefit resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.accident] - Details of the event
  * @param {BackboneElement} [props.addItem] - Insurer added line items
  * @param {any} [props.adjudication] - Header-level adjudication
  * @param {BackboneElement} [props.benefitBalance] - Balance by Benefit Category
  * @param {Period} [props.benefitPeriod] - When the benefits are applicable
  * @param {Period} [props.billablePeriod] - Relevant time frame for the claim
  * @param {BackboneElement} [props.careTeam] - Care Team members
  * @param {Reference} [props.claim] - Claim reference
  * @param {Reference} [props.claimResponse] - Claim response reference
  * @param {dateTime} [props.created] - Response creation date
  * @param {BackboneElement} [props.diagnosis] - Pertinent diagnosis information
  * @param {string} [props.disposition] - Disposition Message
  * @param {Reference} [props.enterer] - Author of the claim
  * @param {Reference} [props.facility] - Servicing Facility
  * @param {Attachment} [props.form] - Printed reference or actual form
  * @param {string} [props.formCode] - Printed form identifier. Accepts all values from http://hl7.org/fhir/ValueSet/forms
  * @param {string} [props.fundsReserve] - Funds reserved status. Accepts all values from http://hl7.org/fhir/ValueSet/fundsreserve
  * @param {string} [props.fundsReserveRequested] - For whom to reserve funds. Accepts all values from http://hl7.org/fhir/ValueSet/fundsreserve
  * @param {Identifier} [props.identifier] - Business Identifier for the resource
  * @param {BackboneElement} [props.insurance] - Patient insurance information
  * @param {Reference} [props.insurer] - Party responsible for reimbursement
  * @param {BackboneElement} [props.item] - Product or service provided
  * @param {Reference} [props.originalPrescription] - Original prescription if superceded by fulfiller
  * @param {string} [props.outcome] - queued | complete | error | partial. Accepts all values from http://hl7.org/fhir/ValueSet/remittance-outcome|4.3.0
  * @param {Reference} [props.patient] - The recipient of the products and services
  * @param {BackboneElement} [props.payee] - Recipient of benefits payable
  * @param {BackboneElement} [props.payment] - Payment Details
  * @param {string} [props.preAuthRef] - Preauthorization reference
  * @param {Period} [props.preAuthRefPeriod] - Preauthorization in-effect period
  * @param {number} [props.precedence] - Precedence (primary, secondary, etc.)
  * @param {Reference} [props.prescription] - Prescription authorizing services or products
  * @param {string} [props.priority] - Desired processing urgency. Accepts all values from http://hl7.org/fhir/ValueSet/process-priority
  * @param {BackboneElement} [props.procedure] - Clinical procedures performed
  * @param {BackboneElement} [props.processNote] - Note concerning adjudication
  * @param {Reference} [props.provider] - Party responsible for the claim
  * @param {Reference} [props.referral] - Treatment Referral
  * @param {BackboneElement} [props.related] - Prior or corollary claims
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/explanationofbenefit-status|4.3.0
  * @param {string} [props.subType] - More granular claim type. Accepts all values from http://hl7.org/fhir/ValueSet/claim-subtype
  * @param {BackboneElement} [props.supportingInfo] - Supporting information
  * @param {BackboneElement} [props.total] - Adjudication totals
  * @param {string} [props.type] - Category or discipline. Accepts all values from http://hl7.org/fhir/ValueSet/claim-type
  * @param {string} [props.use] - claim | preauthorization | predetermination. Accepts all values from http://hl7.org/fhir/ValueSet/claim-use|4.3.0
  */
declare function explanationOfBenefit(type: "ExplanationOfBenefit", props: ExplanationOfBenefit_Props): any;
declare function explanationOfBenefit(props: ExplanationOfBenefit_Props): any;
/**
  * Create a FamilyMemberHistory resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Age|Range|string} [props.age] - (approximate) age
  * @param {Period|date|string} [props.born] - (approximate) date of birth
  * @param {BackboneElement} [props.condition] - Condition that the related person had
  * @param {string} [props.dataAbsentReason] - subject-unknown | withheld | unable-to-obtain | deferred. Accepts all values from http://hl7.org/fhir/ValueSet/history-absent-reason
  * @param {dateTime} [props.date] - When history was recorded or last updated
  * @param {boolean|Age|Range|date|string} [props.deceased] - Dead? How old/when?
  * @param {boolean} [props.estimatedAge] - Age is estimated?
  * @param {Identifier} [props.identifier] - External Id(s) for this record
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {string} [props.name] - The family member described
  * @param {Annotation} [props.note] - General note about related person
  * @param {Reference} [props.patient] - Patient history is about
  * @param {string} [props.reasonCode] - Why was family member history performed?. Accepts all values from http://hl7.org/fhir/ValueSet/clinical-findings
  * @param {Reference} [props.reasonReference] - Why was family member history performed?
  * @param {string} [props.relationship] - Relationship to the subject. Accepts all values from http://terminology.hl7.org/ValueSet/v3-FamilyMember
  * @param {string} [props.sex] - male | female | other | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/administrative-gender
  * @param {string} [props.status] - partial | completed | entered-in-error | health-unknown. Accepts all values from http://hl7.org/fhir/ValueSet/history-status|4.3.0
  */
declare function familyMemberHistory(type: "FamilyMemberHistory", props: FamilyMemberHistory_Props): any;
declare function familyMemberHistory(props: FamilyMemberHistory_Props): any;
/**
  * Create a Flag resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.author] - Flag creator
  * @param {string} [props.category] - Clinical, administrative, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/flag-category
  * @param {string} [props.code] - Coded or textual message to display to user. Accepts all values from http://hl7.org/fhir/ValueSet/flag-code
  * @param {Reference} [props.encounter] - Alert relevant during encounter
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {Period} [props.period] - Time period when flag is active
  * @param {string} [props.status] - active | inactive | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/flag-status|4.3.0
  * @param {Reference} [props.subject] - Who/What is flag about?
  */
declare function flag(type: "Flag", props: Flag_Props): any;
declare function flag(props: Flag_Props): any;
/**
  * Create a Goal resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.achievementStatus] - in-progress | improving | worsening | no-change | achieved | sustaining | not-achieved | no-progress | not-attainable. Accepts all values from http://hl7.org/fhir/ValueSet/goal-achievement
  * @param {Reference} [props.addresses] - Issues addressed by this goal
  * @param {string} [props.category] - E.g. Treatment, dietary, behavioral, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/goal-category
  * @param {string} [props.description] - Code or text describing goal. Accepts all values from http://hl7.org/fhir/ValueSet/clinical-findings
  * @param {Reference} [props.expressedBy] - Who's responsible for creating Goal?
  * @param {Identifier} [props.identifier] - External Ids for this goal
  * @param {string} [props.lifecycleStatus] - proposed | planned | accepted | active | on-hold | completed | cancelled | entered-in-error | rejected. Accepts all values from http://hl7.org/fhir/ValueSet/goal-status|4.3.0
  * @param {Annotation} [props.note] - Comments about the goal
  * @param {string} [props.outcomeCode] - What result was achieved regarding the goal?. Accepts all values from http://hl7.org/fhir/ValueSet/clinical-findings
  * @param {Reference} [props.outcomeReference] - Observation that resulted from goal
  * @param {string} [props.priority] - high-priority | medium-priority | low-priority. Accepts all values from http://hl7.org/fhir/ValueSet/goal-priority
  * @param {string} [props.start] - When goal pursuit begins. Accepts all values from http://hl7.org/fhir/ValueSet/goal-start-event
  * @param {date} [props.statusDate] - When goal status took effect
  * @param {string} [props.statusReason] - Reason for current status
  * @param {Reference} [props.subject] - Who this goal is intended for
  * @param {BackboneElement} [props.target] - Target outcome for the goal
  */
declare function goal(type: "Goal", props: Goal_Props): any;
declare function goal(props: Goal_Props): any;
/**
  * Create a Group resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this group's record is in active use
  * @param {boolean} [props.actual] - Descriptive or actual
  * @param {BackboneElement} [props.characteristic] - Include / Exclude group members by Trait
  * @param {CodeableConcept} [props.code] - Kind of Group members
  * @param {Identifier} [props.identifier] - Unique id
  * @param {Reference} [props.managingEntity] - Entity that is the custodian of the Group's definition
  * @param {BackboneElement} [props.member] - Who or what is in group
  * @param {string} [props.name] - Label for Group
  * @param {unsignedInt} [props.quantity] - Number of members
  * @param {string} [props.type] - person | animal | practitioner | device | medication | substance. Accepts all values from http://hl7.org/fhir/ValueSet/group-type|4.3.0
  */
declare function group(type: "Group", props: Group_Props): any;
declare function group(props: Group_Props): any;
/**
  * Create a GuidanceResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {DataRequirement} [props.dataRequirement] - Additional required data
  * @param {Reference} [props.encounter] - Encounter during which the response was returned
  * @param {Reference} [props.evaluationMessage] - Messages resulting from the evaluation of the artifact or artifacts
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {string|canonical|CodeableConcept} [props.module] - What guidance was requested
  * @param {Annotation} [props.note] - Additional notes about the response
  * @param {dateTime} [props.occurrenceDateTime] - When the guidance response was processed
  * @param {Reference} [props.outputParameters] - The output parameters of the evaluation, if any
  * @param {Reference} [props.performer] - Device returning the guidance
  * @param {CodeableConcept} [props.reasonCode] - Why guidance is needed
  * @param {Reference} [props.reasonReference] - Why guidance is needed
  * @param {Identifier} [props.requestIdentifier] - The identifier of the request associated with this response, if any
  * @param {Reference} [props.result] - Proposed actions, if any
  * @param {string} [props.status] - success | data-requested | data-required | in-progress | failure | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/guidance-response-status|4.3.0
  * @param {Reference} [props.subject] - Patient the request was performed for
  */
declare function guidanceResponse(type: "GuidanceResponse", props: GuidanceResponse_Props): any;
declare function guidanceResponse(props: GuidanceResponse_Props): any;
/**
  * Create a HealthcareService resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this HealthcareService record is in active use
  * @param {boolean} [props.appointmentRequired] - If an appointment is required for access to this service
  * @param {string} [props.availabilityExceptions] - Description of availability exceptions
  * @param {BackboneElement} [props.availableTime] - Times the Service Site is available
  * @param {string} [props.category] - Broad category of service being performed or delivered. Accepts all values from http://hl7.org/fhir/ValueSet/service-category
  * @param {CodeableConcept} [props.characteristic] - Collection of characteristics (attributes)
  * @param {string} [props.comment] - Additional description and/or any specific issues not covered elsewhere
  * @param {string} [props.communication] - The language that this service is offered in. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Reference} [props.coverageArea] - Location(s) service is intended for/available to
  * @param {BackboneElement} [props.eligibility] - Specific eligibility requirements required to use the service
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to electronic services operated for the healthcare service
  * @param {markdown} [props.extraDetails] - Extra details about the service that can't be placed in the other fields
  * @param {Identifier} [props.identifier] - External identifiers for this item
  * @param {Reference} [props.location] - Location(s) where service may be provided
  * @param {string} [props.name] - Description of service as presented to a consumer while searching
  * @param {BackboneElement} [props.notAvailable] - Not available during this time due to provided reason
  * @param {Attachment} [props.photo] - Facilitates quick identification of the service
  * @param {string} [props.program] - Programs that this service is applicable to. Accepts all values from http://hl7.org/fhir/ValueSet/program
  * @param {Reference} [props.providedBy] - Organization that provides this service
  * @param {string} [props.referralMethod] - Ways that the service accepts referrals. Accepts all values from http://hl7.org/fhir/ValueSet/service-referral-method
  * @param {string} [props.serviceProvisionCode] - Conditions under which service is available/offered. Accepts all values from http://hl7.org/fhir/ValueSet/service-provision-conditions
  * @param {string} [props.specialty] - Specialties handled by the HealthcareService. Accepts all values from http://hl7.org/fhir/ValueSet/c80-practice-codes
  * @param {ContactPoint} [props.telecom] - Contacts related to the healthcare service
  * @param {string} [props.type] - Type of service that may be delivered or performed. Accepts all values from http://hl7.org/fhir/ValueSet/service-type
  */
declare function healthcareService(type: "HealthcareService", props: HealthcareService_Props): any;
declare function healthcareService(props: HealthcareService_Props): any;
/**
  * Create a ImagingStudy resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.basedOn] - Request fulfilled
  * @param {string} [props.description] - Institution-generated description
  * @param {Reference} [props.encounter] - Encounter with which this imaging study is associated
  * @param {Reference} [props.endpoint] - Study access endpoint
  * @param {Identifier} [props.identifier] - Identifiers for the whole study
  * @param {Reference} [props.interpreter] - Who interpreted images
  * @param {Reference} [props.location] - Where ImagingStudy occurred
  * @param {string} [props.modality] - All series modality if actual acquisition modalities. Accepts all values from http://dicom.nema.org/medical/dicom/current/output/chtml/part16/sect_CID_29.html
  * @param {Annotation} [props.note] - User-defined comments
  * @param {unsignedInt} [props.numberOfInstances] - Number of Study Related Instances
  * @param {unsignedInt} [props.numberOfSeries] - Number of Study Related Series
  * @param {string} [props.procedureCode] - The performed procedure code. Accepts all values from http://www.rsna.org/RadLex_Playbook.aspx
  * @param {Reference} [props.procedureReference] - The performed Procedure reference
  * @param {string} [props.reasonCode] - Why the study was requested. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-reason
  * @param {Reference} [props.reasonReference] - Why was study performed
  * @param {Reference} [props.referrer] - Referring physician
  * @param {BackboneElement} [props.series] - Each study has one or more series of instances
  * @param {dateTime} [props.started] - When the study was started
  * @param {string} [props.status] - registered | available | cancelled | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/imagingstudy-status|4.3.0
  * @param {Reference} [props.subject] - Who or what is the subject of the study
  */
declare function imagingStudy(type: "ImagingStudy", props: ImagingStudy_Props): any;
declare function imagingStudy(props: ImagingStudy_Props): any;
/**
  * Create a Immunization resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Quantity} [props.doseQuantity] - Amount of vaccine administered
  * @param {BackboneElement} [props.education] - Educational material presented to patient
  * @param {Reference} [props.encounter] - Encounter immunization was part of
  * @param {date} [props.expirationDate] - Vaccine expiration date
  * @param {string} [props.fundingSource] - Funding source for the vaccine. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-funding-source
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {boolean} [props.isSubpotent] - Dose potency
  * @param {Reference} [props.location] - Where immunization occurred
  * @param {string} [props.lotNumber] - Vaccine lot number
  * @param {Reference} [props.manufacturer] - Vaccine manufacturer
  * @param {Annotation} [props.note] - Additional immunization notes
  * @param {dateTime|string} [props.occurrence] - Vaccine administration date
  * @param {Reference} [props.patient] - Who was immunized
  * @param {BackboneElement} [props.performer] - Who performed event
  * @param {boolean} [props.primarySource] - Indicates context the data was recorded in
  * @param {string} [props.programEligibility] - Patient eligibility for a vaccination program. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-program-eligibility
  * @param {BackboneElement} [props.protocolApplied] - Protocol followed by the provider
  * @param {BackboneElement} [props.reaction] - Details of a reaction that follows immunization
  * @param {string} [props.reasonCode] - Why immunization occurred. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-reason
  * @param {Reference} [props.reasonReference] - Why immunization occurred
  * @param {dateTime} [props.recorded] - When the immunization was first captured in the subject's record
  * @param {string} [props.reportOrigin] - Indicates the source of a secondarily reported record. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-origin
  * @param {string} [props.route] - How vaccine entered body. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-route
  * @param {string} [props.site] - Body site vaccine  was administered. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-site
  * @param {string} [props.status] - completed | entered-in-error | not-done. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-status|4.3.0
  * @param {string} [props.statusReason] - Reason not done. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-status-reason
  * @param {string} [props.subpotentReason] - Reason for being subpotent. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-subpotent-reason
  * @param {string} [props.vaccineCode] - Vaccine product administered. Accepts all values from http://hl7.org/fhir/ValueSet/vaccine-code
  */
declare function immunization(type: "Immunization", props: Immunization_Props): any;
declare function immunization(props: Immunization_Props): any;
/**
  * Create a ImmunizationEvaluation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.authority] - Who is responsible for publishing the recommendations
  * @param {dateTime} [props.date] - Date evaluation was performed
  * @param {string} [props.description] - Evaluation notes
  * @param {number|string} [props.doseNumber] - Dose number within series
  * @param {string} [props.doseStatus] - Status of the dose relative to published recommendations. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-evaluation-dose-status
  * @param {string} [props.doseStatusReason] - Reason for the dose status. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-evaluation-dose-status-reason
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {Reference} [props.immunizationEvent] - Immunization being evaluated
  * @param {Reference} [props.patient] - Who this evaluation is for
  * @param {string} [props.series] - Name of vaccine series
  * @param {number|string} [props.seriesDoses] - Recommended number of doses for immunity
  * @param {string} [props.status] - completed | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-evaluation-status|4.3.0
  * @param {string} [props.targetDisease] - Evaluation target disease. Accepts all values from http://hl7.org/fhir/ValueSet/immunization-evaluation-target-disease
  */
declare function immunizationEvaluation(type: "ImmunizationEvaluation", props: ImmunizationEvaluation_Props): any;
declare function immunizationEvaluation(props: ImmunizationEvaluation_Props): any;
/**
  * Create a ImmunizationRecommendation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.authority] - Who is responsible for protocol
  * @param {dateTime} [props.date] - Date recommendation(s) created
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {Reference} [props.patient] - Who this profile is for
  * @param {BackboneElement} [props.recommendation] - Vaccine administration recommendations
  */
declare function immunizationRecommendation(type: "ImmunizationRecommendation", props: ImmunizationRecommendation_Props): any;
declare function immunizationRecommendation(props: ImmunizationRecommendation_Props): any;
/**
  * Create a Ingredient resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.allergenicIndicator] - If the ingredient is a known or suspected allergen
  * @param {Reference} [props.for] - The product which this ingredient is a constituent part of
  * @param {string} [props.function] - Precise action within the drug product, e.g. antioxidant, alkalizing agent. Accepts all values from http://hl7.org/fhir/ValueSet/ingredient-function
  * @param {Identifier} [props.identifier] - An identifier or code by which the ingredient can be referenced
  * @param {BackboneElement} [props.manufacturer] - An organization that manufactures this ingredient
  * @param {string} [props.role] - Purpose of the ingredient within the product, e.g. active, inactive. Accepts all values from http://hl7.org/fhir/ValueSet/ingredient-role
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {BackboneElement} [props.substance] - The substance that comprises this ingredient
  */
declare function ingredient(type: "Ingredient", props: Ingredient_Props): any;
declare function ingredient(props: Ingredient_Props): any;
/**
  * Create a InsurancePlan resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.administeredBy] - Product administrator
  * @param {string} [props.alias] - Alternate names
  * @param {BackboneElement} [props.contact] - Contact for the product
  * @param {BackboneElement} [props.coverage] - Coverage details
  * @param {Reference} [props.coverageArea] - Where product applies
  * @param {Reference} [props.endpoint] - Technical endpoint
  * @param {Identifier} [props.identifier] - Business Identifier for Product
  * @param {string} [props.name] - Official name
  * @param {Reference} [props.network] - What networks are Included
  * @param {Reference} [props.ownedBy] - Plan issuer
  * @param {Period} [props.period] - When the product is available
  * @param {BackboneElement} [props.plan] - Plan details
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.type] - Kind of product. Accepts all values from http://hl7.org/fhir/ValueSet/insuranceplan-type
  */
declare function insurancePlan(type: "InsurancePlan", props: InsurancePlan_Props): any;
declare function insurancePlan(props: InsurancePlan_Props): any;
/**
  * Create a Invoice resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.account] - Account that is being balanced
  * @param {string} [props.cancelledReason] - Reason for cancellation of this Invoice
  * @param {dateTime} [props.date] - Invoice date / posting date
  * @param {Identifier} [props.identifier] - Business Identifier for item
  * @param {Reference} [props.issuer] - Issuing Organization of Invoice
  * @param {BackboneElement} [props.lineItem] - Line items of this Invoice
  * @param {Annotation} [props.note] - Comments made about the invoice
  * @param {BackboneElement} [props.participant] - Participant in creation of this Invoice
  * @param {markdown} [props.paymentTerms] - Payment details
  * @param {Reference} [props.recipient] - Recipient of this invoice
  * @param {string} [props.status] - draft | issued | balanced | cancelled | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/invoice-status|4.3.0
  * @param {Reference} [props.subject] - Recipient(s) of goods and services
  * @param {Money} [props.totalGross] - Gross total of this Invoice
  * @param {Money} [props.totalNet] - Net total of this Invoice
  * @param {any} [props.totalPriceComponent] - Components of Invoice total
  * @param {CodeableConcept} [props.type] - Type of Invoice
  */
declare function invoice(type: "Invoice", props: Invoice_Props): any;
declare function invoice(props: Invoice_Props): any;
/**
  * Create a Library resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {date} [props.approvalDate] - When the library was approved by publisher
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {Attachment} [props.content] - Contents of the library, either embedded or referenced
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {DataRequirement} [props.dataRequirement] - What data is referenced by this library
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.description] - Natural language description of the library
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {Period} [props.effectivePeriod] - When the library is expected to be used
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {Identifier} [props.identifier] - Additional identifier for the library
  * @param {string} [props.jurisdiction] - Intended jurisdiction for library (if applicable). Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {date} [props.lastReviewDate] - When the library was last reviewed
  * @param {string} [props.name] - Name for this library (computer friendly)
  * @param {ParameterDefinition} [props.parameter] - Parameters defined by the library
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {markdown} [props.purpose] - Why this library is defined
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.subject] - Type of individual the library content is focused on. Accepts all values from http://hl7.org/fhir/ValueSet/subject-type
  * @param {string} [props.subtitle] - Subordinate title of the library
  * @param {string} [props.title] - Name for this library (human friendly)
  * @param {string} [props.topic] - E.g. Education, Treatment, Assessment, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/definition-topic
  * @param {string} [props.type] - logic-library | model-definition | asset-collection | module-definition. Accepts all values from http://hl7.org/fhir/ValueSet/library-type
  * @param {string} [props.url] - Canonical identifier for this library, represented as a URI (globally unique)
  * @param {string} [props.usage] - Describes the clinical usage of the library
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.version] - Business version of the library
  */
declare function library(type: "Library", props: Library_Props): any;
declare function library(props: Library_Props): any;
/**
  * Create a List resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.code] - What the purpose of this list is. Accepts all values from http://hl7.org/fhir/ValueSet/list-example-codes
  * @param {dateTime} [props.date] - When the list was prepared
  * @param {string} [props.emptyReason] - Why list is empty. Accepts all values from http://hl7.org/fhir/ValueSet/list-empty-reason
  * @param {Reference} [props.encounter] - Context in which list created
  * @param {BackboneElement} [props.entry] - Entries in the list
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {string} [props.mode] - working | snapshot | changes. Accepts all values from http://hl7.org/fhir/ValueSet/list-mode|4.3.0
  * @param {Annotation} [props.note] - Comments about the list
  * @param {string} [props.orderedBy] - What order the list has. Accepts all values from http://hl7.org/fhir/ValueSet/list-order
  * @param {Reference} [props.source] - Who and/or what defined the list contents (aka Author)
  * @param {string} [props.status] - current | retired | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/list-status|4.3.0
  * @param {Reference} [props.subject] - If all resources have the same subject
  * @param {string} [props.title] - Descriptive name for the list
  */
declare function list(type: "List", props: List_Props): any;
declare function list(props: List_Props): any;
/**
  * Create a Location resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Address} [props.address] - Physical location
  * @param {string} [props.alias] - A list of alternate names that the location is known as, or was known as, in the past
  * @param {string} [props.availabilityExceptions] - Description of availability exceptions
  * @param {string} [props.description] - Additional details about the location that could be displayed as further information to identify the location beyond its name
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the location
  * @param {BackboneElement} [props.hoursOfOperation] - What days/times during a week is this location usually open
  * @param {Identifier} [props.identifier] - Unique code or number identifying the location to its users
  * @param {Reference} [props.managingOrganization] - Organization responsible for provisioning and upkeep
  * @param {string} [props.mode] - instance | kind. Accepts all values from http://hl7.org/fhir/ValueSet/location-mode|4.3.0
  * @param {string} [props.name] - Name of the location as used by humans
  * @param {string} [props.operationalStatus] - The operational status of the location (typically only for a bed/room). Accepts all values from http://terminology.hl7.org/ValueSet/v2-0116
  * @param {Reference} [props.partOf] - Another Location this one is physically a part of
  * @param {string} [props.physicalType] - Physical form of the location. Accepts all values from http://hl7.org/fhir/ValueSet/location-physical-type
  * @param {BackboneElement} [props.position] - The absolute geographic location
  * @param {string} [props.status] - active | suspended | inactive. Accepts all values from http://hl7.org/fhir/ValueSet/location-status|4.3.0
  * @param {ContactPoint} [props.telecom] - Contact details of the location
  * @param {string} [props.type] - Type of function performed. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ServiceDeliveryLocationRoleType
  */
declare function location(type: "Location", props: Location_Props): any;
declare function location(props: Location_Props): any;
/**
  * Create a ManufacturedItemDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Unique identifier
  * @param {string} [props.ingredient] - The ingredients of this manufactured item. Only needed if these are not specified by incoming references from the Ingredient resource. Accepts all values from http://hl7.org/fhir/ValueSet/substance-codes
  * @param {string} [props.manufacturedDoseForm] - Dose form as manufactured (before any necessary transformation). Accepts all values from http://hl7.org/fhir/ValueSet/manufactured-dose-form
  * @param {Reference} [props.manufacturer] - Manufacturer of the item (Note that this should be named "manufacturer" but it currently causes technical issues)
  * @param {BackboneElement} [props.property] - General characteristics of this item
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.unitOfPresentation] - The “real world” units in which the quantity of the item is described. Accepts all values from http://hl7.org/fhir/ValueSet/unit-of-presentation
  */
declare function manufacturedItemDefinition(type: "ManufacturedItemDefinition", props: ManufacturedItemDefinition_Props): any;
declare function manufacturedItemDefinition(props: ManufacturedItemDefinition_Props): any;
/**
  * Create a Measure resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {date} [props.approvalDate] - When the measure was approved by publisher
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {markdown} [props.clinicalRecommendationStatement] - Summary of clinical guidelines
  * @param {string} [props.compositeScoring] - opportunity | all-or-nothing | linear | weighted. Accepts all values from http://hl7.org/fhir/ValueSet/composite-measure-scoring
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.definition] - Defined terms used in the measure documentation
  * @param {markdown} [props.description] - Natural language description of the measure
  * @param {markdown} [props.disclaimer] - Disclaimer for use of the measure or its referenced content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {Period} [props.effectivePeriod] - When the measure is expected to be used
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {BackboneElement} [props.group] - Population criteria group
  * @param {markdown} [props.guidance] - Additional guidance for implementers
  * @param {Identifier} [props.identifier] - Additional identifier for the measure
  * @param {string} [props.improvementNotation] - increase | decrease. Accepts all values from http://hl7.org/fhir/ValueSet/measure-improvement-notation|4.3.0
  * @param {string} [props.jurisdiction] - Intended jurisdiction for measure (if applicable). Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {date} [props.lastReviewDate] - When the measure was last reviewed
  * @param {canonical} [props.library] - Logic used by the measure
  * @param {string} [props.name] - Name for this measure (computer friendly)
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {markdown} [props.purpose] - Why this measure is defined
  * @param {string} [props.rateAggregation] - How is rate aggregation performed for this measure
  * @param {markdown} [props.rationale] - Detailed description of why the measure exists
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {string} [props.riskAdjustment] - How risk adjustment is applied for this measure
  * @param {string} [props.scoring] - proportion | ratio | continuous-variable | cohort. Accepts all values from http://hl7.org/fhir/ValueSet/measure-scoring
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.subject] - E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device. Accepts all values from http://hl7.org/fhir/ValueSet/subject-type
  * @param {string} [props.subtitle] - Subordinate title of the measure
  * @param {BackboneElement} [props.supplementalData] - What other data should be reported with the measure
  * @param {string} [props.title] - Name for this measure (human friendly)
  * @param {string} [props.topic] - The category of the measure, such as Education, Treatment, Assessment, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/definition-topic
  * @param {string} [props.type] - process | outcome | structure | patient-reported-outcome | composite. Accepts all values from http://hl7.org/fhir/ValueSet/measure-type
  * @param {string} [props.url] - Canonical identifier for this measure, represented as a URI (globally unique)
  * @param {string} [props.usage] - Describes the clinical usage of the measure
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.version] - Business version of the measure
  */
declare function measure(type: "Measure", props: Measure_Props): any;
declare function measure(props: Measure_Props): any;
/**
  * Create a MeasureReport resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.date] - When the report was generated
  * @param {Reference} [props.evaluatedResource] - What data was used to calculate the measure score
  * @param {BackboneElement} [props.group] - Measure results for each group
  * @param {Identifier} [props.identifier] - Additional identifier for the MeasureReport
  * @param {string} [props.improvementNotation] - increase | decrease. Accepts all values from http://hl7.org/fhir/ValueSet/measure-improvement-notation|4.3.0
  * @param {canonical} [props.measure] - What measure was calculated
  * @param {Period} [props.period] - What period the report covers
  * @param {Reference} [props.reporter] - Who is reporting the data
  * @param {string} [props.status] - complete | pending | error. Accepts all values from http://hl7.org/fhir/ValueSet/measure-report-status|4.3.0
  * @param {Reference} [props.subject] - What individual(s) the report is for
  * @param {string} [props.type] - individual | subject-list | summary | data-collection. Accepts all values from http://hl7.org/fhir/ValueSet/measure-report-type|4.3.0
  */
declare function measureReport(type: "MeasureReport", props: MeasureReport_Props): any;
declare function measureReport(props: MeasureReport_Props): any;
/**
  * Create a Media resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.basedOn] - Procedure that caused this media to be created
  * @param {string} [props.bodySite] - Observed body part. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {Attachment} [props.content] - Actual Media - reference or data
  * @param {dateTime|Period} [props.created] - When Media was collected
  * @param {Reference} [props.device] - Observing Device
  * @param {string} [props.deviceName] - Name of the device/manufacturer
  * @param {decimal} [props.duration] - Length in seconds (audio / video)
  * @param {Reference} [props.encounter] - Encounter associated with media
  * @param {number} [props.frames] - Number of frames if > 1 (photo)
  * @param {number} [props.height] - Height of the image in pixels (photo/video)
  * @param {Identifier} [props.identifier] - Identifier(s) for the image
  * @param {instant} [props.issued] - Date/Time this version was made available
  * @param {string} [props.modality] - The type of acquisition equipment/process. Accepts all values from http://hl7.org/fhir/ValueSet/media-modality
  * @param {Annotation} [props.note] - Comments made about the media
  * @param {Reference} [props.operator] - The person who generated the image
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.reasonCode] - Why was event performed?. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-reason
  * @param {string} [props.status] - preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/event-status|4.3.0
  * @param {Reference} [props.subject] - Who/What this Media is a record of
  * @param {string} [props.type] - Classification of media as image, video, or audio. Accepts all values from http://hl7.org/fhir/ValueSet/media-type
  * @param {string} [props.view] - Imaging view, e.g. Lateral or Antero-posterior. Accepts all values from http://hl7.org/fhir/ValueSet/media-view
  * @param {number} [props.width] - Width of the image in pixels (photo/video)
  */
declare function media(type: "Media", props: Media_Props): any;
declare function media(props: Media_Props): any;
/**
  * Create a Medication resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Ratio} [props.amount] - Amount of drug in package
  * @param {BackboneElement} [props.batch] - Details about packaged medications
  * @param {string} [props.code] - Codes that identify this medication. Accepts all values from http://hl7.org/fhir/ValueSet/medication-codes
  * @param {string} [props.form] - powder | tablets | capsule +. Accepts all values from http://hl7.org/fhir/ValueSet/medication-form-codes
  * @param {Identifier} [props.identifier] - Business identifier for this medication
  * @param {BackboneElement} [props.ingredient] - Active or inactive ingredient
  * @param {Reference} [props.manufacturer] - Manufacturer of the item
  * @param {string} [props.status] - active | inactive | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/medication-status|4.3.0
  */
declare function medication(type: "Medication", props: Medication_Props): any;
declare function medication(props: Medication_Props): any;
/**
  * Create a MedicationAdministration resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.category] - Type of medication usage. Accepts all values from http://hl7.org/fhir/ValueSet/medication-admin-category
  * @param {Reference} [props.context] - Encounter or Episode of Care administered as part of
  * @param {Reference} [props.device] - Device used to administer
  * @param {BackboneElement} [props.dosage] - Details of how medication was taken
  * @param {dateTime|Period} [props.effective] - Start and end time of administration
  * @param {Reference} [props.eventHistory] - A list of events of interest in the lifecycle
  * @param {Identifier} [props.identifier] - External identifier
  * @param {string} [props.instantiates] - Instantiates protocol or definition
  * @param {string} [props.medication] - What was administered. Accepts all values from http://hl7.org/fhir/ValueSet/medication-codes
  * @param {Annotation} [props.note] - Information about the administration
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {BackboneElement} [props.performer] - Who performed the medication administration and what they did
  * @param {string} [props.reasonCode] - Reason administration performed. Accepts all values from http://hl7.org/fhir/ValueSet/reason-medication-given-codes
  * @param {Reference} [props.reasonReference] - Condition or observation that supports why the medication was administered
  * @param {Reference} [props.request] - Request administration performed against
  * @param {string} [props.status] - in-progress | not-done | on-hold | completed | entered-in-error | stopped | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/medication-admin-status|4.3.0
  * @param {string} [props.statusReason] - Reason administration not performed. Accepts all values from http://hl7.org/fhir/ValueSet/reason-medication-not-given-codes
  * @param {Reference} [props.subject] - Who received medication
  * @param {Reference} [props.supportingInformation] - Additional information to support administration
  */
declare function medicationAdministration(type: "MedicationAdministration", props: MedicationAdministration_Props): any;
declare function medicationAdministration(props: MedicationAdministration_Props): any;
/**
  * Create a MedicationDispense resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.authorizingPrescription] - Medication order that authorizes the dispense
  * @param {string} [props.category] - Type of medication dispense. Accepts all values from http://hl7.org/fhir/ValueSet/medicationdispense-category
  * @param {Reference} [props.context] - Encounter / Episode associated with event
  * @param {Quantity} [props.daysSupply] - Amount of medication expressed as a timing amount
  * @param {Reference} [props.destination] - Where the medication was sent
  * @param {Reference} [props.detectedIssue] - Clinical issue with action
  * @param {Dosage} [props.dosageInstruction] - How the medication is to be used by the patient or administered by the caregiver
  * @param {Reference} [props.eventHistory] - A list of relevant lifecycle events
  * @param {Identifier} [props.identifier] - External identifier
  * @param {Reference} [props.location] - Where the dispense occurred
  * @param {string} [props.medication] - What medication was supplied. Accepts all values from http://hl7.org/fhir/ValueSet/medication-codes
  * @param {Annotation} [props.note] - Information about the dispense
  * @param {Reference} [props.partOf] - Event that dispense is part of
  * @param {BackboneElement} [props.performer] - Who performed event
  * @param {Quantity} [props.quantity] - Amount dispensed
  * @param {Reference} [props.receiver] - Who collected the medication
  * @param {string} [props.status] - preparation | in-progress | cancelled | on-hold | completed | entered-in-error | stopped | declined | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/medicationdispense-status|4.3.0
  * @param {string} [props.statusReason] - Why a dispense was not performed. Accepts all values from http://hl7.org/fhir/ValueSet/medicationdispense-status-reason
  * @param {Reference} [props.subject] - Who the dispense is for
  * @param {BackboneElement} [props.substitution] - Whether a substitution was performed on the dispense
  * @param {Reference} [props.supportingInformation] - Information that supports the dispensing of the medication
  * @param {string} [props.type] - Trial fill, partial fill, emergency fill, etc.. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ActPharmacySupplyType
  * @param {dateTime} [props.whenHandedOver] - When product was given out
  * @param {dateTime} [props.whenPrepared] - When product was packaged and reviewed
  */
declare function medicationDispense(type: "MedicationDispense", props: MedicationDispense_Props): any;
declare function medicationDispense(props: MedicationDispense_Props): any;
/**
  * Create a MedicationKnowledge resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.administrationGuidelines] - Guidelines for administration of the medication
  * @param {Quantity} [props.amount] - Amount of drug in package
  * @param {Reference} [props.associatedMedication] - A medication resource that is associated with this medication
  * @param {string} [props.code] - Code that identifies this medication. Accepts all values from http://hl7.org/fhir/ValueSet/medication-codes
  * @param {Reference} [props.contraindication] - Potential clinical issue with or between medication(s)
  * @param {BackboneElement} [props.cost] - The pricing of the medication
  * @param {string} [props.doseForm] - powder | tablets | capsule +. Accepts all values from http://hl7.org/fhir/ValueSet/medication-form-codes
  * @param {BackboneElement} [props.drugCharacteristic] - Specifies descriptive properties of the medicine
  * @param {BackboneElement} [props.ingredient] - Active or inactive ingredient
  * @param {string} [props.intendedRoute] - The intended or approved route of administration. Accepts all values from http://hl7.org/fhir/ValueSet/route-codes
  * @param {BackboneElement} [props.kinetics] - The time course of drug absorption, distribution, metabolism and excretion of a medication from the body
  * @param {Reference} [props.manufacturer] - Manufacturer of the item
  * @param {BackboneElement} [props.medicineClassification] - Categorization of the medication within a formulary or classification system
  * @param {BackboneElement} [props.monitoringProgram] - Program under which a medication is reviewed
  * @param {BackboneElement} [props.monograph] - Associated documentation about the medication
  * @param {BackboneElement} [props.packaging] - Details about packaged medications
  * @param {markdown} [props.preparationInstruction] - The instructions for preparing the medication
  * @param {CodeableConcept} [props.productType] - Category of the medication or product
  * @param {BackboneElement} [props.regulatory] - Regulatory information about a medication
  * @param {BackboneElement} [props.relatedMedicationKnowledge] - Associated or related medication information
  * @param {string} [props.status] - active | inactive | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/medicationknowledge-status|4.3.0
  * @param {string} [props.synonym] - Additional names for a medication
  */
declare function medicationKnowledge(type: "MedicationKnowledge", props: MedicationKnowledge_Props): any;
declare function medicationKnowledge(props: MedicationKnowledge_Props): any;
/**
  * Create a MedicationRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.authoredOn] - When request was initially authored
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {string} [props.category] - Type of medication usage. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-category
  * @param {string} [props.courseOfTherapyType] - Overall pattern of medication administration. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-course-of-therapy
  * @param {Reference} [props.detectedIssue] - Clinical Issue with action
  * @param {BackboneElement} [props.dispenseRequest] - Medication supply authorization
  * @param {boolean} [props.doNotPerform] - True if request is prohibiting action
  * @param {Dosage} [props.dosageInstruction] - How the medication should be taken
  * @param {Reference} [props.encounter] - Encounter created as part of encounter/admission/stay
  * @param {Reference} [props.eventHistory] - A list of events of interest in the lifecycle
  * @param {Identifier} [props.groupIdentifier] - Composite request this is part of
  * @param {Identifier} [props.identifier] - External ids for this request
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {string} [props.intent] - proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-intent|4.3.0
  * @param {string} [props.medication] - Medication to be taken. Accepts all values from http://hl7.org/fhir/ValueSet/medication-codes
  * @param {Annotation} [props.note] - Information about the prescription
  * @param {Reference} [props.performer] - Intended performer of administration
  * @param {string} [props.performerType] - Desired kind of performer of the medication administration. Accepts all values from http://hl7.org/fhir/ValueSet/performer-role
  * @param {Reference} [props.priorPrescription] - An order/prescription that is being replaced
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.3.0
  * @param {string} [props.reasonCode] - Reason or indication for ordering or not ordering the medication. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code
  * @param {Reference} [props.reasonReference] - Condition or observation that supports why the prescription is being written
  * @param {Reference} [props.recorder] - Person who entered the request
  * @param {boolean|Reference} [props.reported] - Reported rather than primary record
  * @param {Reference} [props.requester] - Who/What requested the Request
  * @param {string} [props.status] - active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-status|4.3.0
  * @param {string} [props.statusReason] - Reason for current status. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-status-reason
  * @param {Reference} [props.subject] - Who or group medication request is for
  * @param {BackboneElement} [props.substitution] - Any restrictions on medication substitution
  * @param {Reference} [props.supportingInformation] - Information to support ordering of the medication
  */
declare function medicationRequest(type: "MedicationRequest", props: MedicationRequest_Props): any;
declare function medicationRequest(props: MedicationRequest_Props): any;
/**
  * Create a MedicationStatement resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.basedOn] - Fulfils plan, proposal or order
  * @param {string} [props.category] - Type of medication usage. Accepts all values from http://hl7.org/fhir/ValueSet/medication-statement-category
  * @param {Reference} [props.context] - Encounter / Episode associated with MedicationStatement
  * @param {dateTime} [props.dateAsserted] - When the statement was asserted?
  * @param {Reference} [props.derivedFrom] - Additional supporting information
  * @param {Dosage} [props.dosage] - Details of how medication is/was taken or should be taken
  * @param {dateTime|Period} [props.effective] - The date/time or interval when the medication is/was/will be taken
  * @param {Identifier} [props.identifier] - External identifier
  * @param {Reference} [props.informationSource] - Person or organization that provided the information about the taking of this medication
  * @param {string} [props.medication] - What medication was taken. Accepts all values from http://hl7.org/fhir/ValueSet/medication-codes
  * @param {Annotation} [props.note] - Further information about the statement
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.reasonCode] - Reason for why the medication is being/was taken. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code
  * @param {Reference} [props.reasonReference] - Condition or observation that supports why the medication is being/was taken
  * @param {string} [props.status] - active | completed | entered-in-error | intended | stopped | on-hold | unknown | not-taken. Accepts all values from http://hl7.org/fhir/ValueSet/medication-statement-status|4.3.0
  * @param {string} [props.statusReason] - Reason for current status. Accepts all values from http://hl7.org/fhir/ValueSet/reason-medication-status-codes
  * @param {Reference} [props.subject] - Who is/was taking  the medication
  */
declare function medicationStatement(type: "MedicationStatement", props: MedicationStatement_Props): any;
declare function medicationStatement(props: MedicationStatement_Props): any;
/**
  * Create a MedicinalProductDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.additionalMonitoringIndicator] - Whether the Medicinal Product is subject to additional monitoring for regulatory reasons. Accepts all values from http://hl7.org/fhir/ValueSet/medicinal-product-additional-monitoring
  * @param {Reference} [props.attachedDocument] - Additional documentation about the medicinal product
  * @param {BackboneElement} [props.characteristic] - Key product features such as "sugar free", "modified release"
  * @param {string} [props.classification] - Allows the product to be classified by various systems. Accepts all values from http://hl7.org/fhir/ValueSet/product-classification-codes
  * @param {Reference} [props.clinicalTrial] - Clinical trials or studies that this product is involved in
  * @param {string} [props.code] - A code that this product is known by, within some formal terminology. Accepts all values from http://hl7.org/fhir/ValueSet/medication-codes
  * @param {string} [props.combinedPharmaceuticalDoseForm] - The dose form for a single part product, or combined form of a multiple part product. Accepts all values from http://hl7.org/fhir/ValueSet/combined-dose-form
  * @param {BackboneElement} [props.contact] - A product specific contact, person (in a role), or an organization
  * @param {BackboneElement} [props.crossReference] - Reference to another product, e.g. for linking authorised to investigational product
  * @param {markdown} [props.description] - General description of this product
  * @param {string} [props.domain] - If this medicine applies to human or veterinary uses. Accepts all values from http://hl7.org/fhir/ValueSet/medicinal-product-domain
  * @param {Identifier} [props.identifier] - Business identifier for this product. Could be an MPID
  * @param {string} [props.impurity] - Any component of the drug product which is not the chemical entity defined as the drug substance, or an excipient in the drug product. Accepts all values from http://hl7.org/fhir/ValueSet/substance-codes
  * @param {markdown} [props.indication] - Description of indication(s) for this product, used when structured indications are not required
  * @param {string} [props.ingredient] - The ingredients of this medicinal product - when not detailed in other resources. Accepts all values from http://hl7.org/fhir/ValueSet/substance-codes
  * @param {string} [props.legalStatusOfSupply] - The legal status of supply of the medicinal product as classified by the regulator. Accepts all values from http://hl7.org/fhir/ValueSet/legal-status-of-supply
  * @param {MarketingStatus} [props.marketingStatus] - Marketing status of the medicinal product, in contrast to marketing authorization
  * @param {Reference} [props.masterFile] - A master file for the medicinal product (e.g. Pharmacovigilance System Master File)
  * @param {BackboneElement} [props.name] - The product's name, including full name and possibly coded parts
  * @param {BackboneElement} [props.operation] - A manufacturing or administrative process for the medicinal product
  * @param {string} [props.packagedMedicinalProduct] - Package type for the product. Accepts all values from http://hl7.org/fhir/ValueSet/medicinal-product-package-type
  * @param {string} [props.pediatricUseIndicator] - If authorised for use in children. Accepts all values from http://hl7.org/fhir/ValueSet/medicinal-product-pediatric-use
  * @param {string} [props.route] - The path by which the product is taken into or makes contact with the body. Accepts all values from http://hl7.org/fhir/ValueSet/route-codes
  * @param {string} [props.specialMeasures] - Whether the Medicinal Product is subject to special measures for regulatory reasons. Accepts all values from http://hl7.org/fhir/ValueSet/medicinal-product-special-measures
  * @param {string} [props.status] - The status within the lifecycle of this product record. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status
  * @param {dateTime} [props.statusDate] - The date at which the given status became applicable
  * @param {string} [props.type] - Regulatory type, e.g. Investigational or Authorized. Accepts all values from http://hl7.org/fhir/ValueSet/medicinal-product-type
  * @param {string} [props.version] - A business identifier relating to a specific version of the product
  */
declare function medicinalProductDefinition(type: "MedicinalProductDefinition", props: MedicinalProductDefinition_Props): any;
declare function medicinalProductDefinition(props: MedicinalProductDefinition_Props): any;
/**
  * Create a MolecularSequence resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {integer} [props.coordinateSystem] - Base number of coordinate system (0 for 0-based numbering or coordinates, inclusive start, exclusive end, 1 for 1-based numbering, inclusive start, inclusive end)
  * @param {Reference} [props.device] - The method for sequencing
  * @param {Identifier} [props.identifier] - Unique ID for this particular sequence. This is a FHIR-defined id
  * @param {string} [props.observedSeq] - Sequence that was observed
  * @param {Reference} [props.patient] - Who and/or what this is about
  * @param {Reference} [props.performer] - Who should be responsible for test result
  * @param {Reference} [props.pointer] - Pointer to next atomic sequence
  * @param {BackboneElement} [props.quality] - An set of value as quality of sequence
  * @param {Quantity} [props.quantity] - The number of copies of the sequence of interest.  (RNASeq)
  * @param {integer} [props.readCoverage] - Average number of reads representing a given nucleotide in the reconstructed sequence
  * @param {BackboneElement} [props.referenceSeq] - A sequence used as reference
  * @param {BackboneElement} [props.repository] - External repository which contains detailed report related with observedSeq in this resource
  * @param {Reference} [props.specimen] - Specimen used for sequencing
  * @param {BackboneElement} [props.structureVariant] - Structural variant
  * @param {string} [props.type] - aa | dna | rna. Accepts all values from http://hl7.org/fhir/ValueSet/sequence-type|4.3.0
  * @param {BackboneElement} [props.variant] - Variant in sequence
  */
declare function molecularSequence(type: "MolecularSequence", props: MolecularSequence_Props): any;
declare function molecularSequence(props: MolecularSequence_Props): any;
/**
  * Create a NutritionOrder resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.allergyIntolerance] - List of the patient's food and nutrition-related allergies and intolerances
  * @param {dateTime} [props.dateTime] - Date and time the nutrition order was requested
  * @param {Reference} [props.encounter] - The encounter associated with this nutrition order
  * @param {BackboneElement} [props.enteralFormula] - Enteral formula components
  * @param {string} [props.excludeFoodModifier] - Order-specific modifier about the type of food that should not be given. Accepts all values from http://hl7.org/fhir/ValueSet/food-type
  * @param {string} [props.foodPreferenceModifier] - Order-specific modifier about the type of food that should be given. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-diet
  * @param {Identifier} [props.identifier] - Identifiers assigned to this order
  * @param {string} [props.instantiates] - Instantiates protocol or definition
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/request-intent|4.3.0
  * @param {Annotation} [props.note] - Comments
  * @param {BackboneElement} [props.oralDiet] - Oral diet components
  * @param {Reference} [props.orderer] - Who ordered the diet, formula or nutritional supplement
  * @param {Reference} [props.patient] - The person who requires the diet, formula or nutritional supplement
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/request-status|4.3.0
  * @param {BackboneElement} [props.supplement] - Supplement components
  */
declare function nutritionOrder(type: "NutritionOrder", props: NutritionOrder_Props): any;
declare function nutritionOrder(props: NutritionOrder_Props): any;
/**
  * Create a NutritionProduct resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.category] - A category or class of the nutrition product (halal, kosher, gluten free, vegan, etc). Accepts all values from http://hl7.org/fhir/ValueSet/nutrition-product-category
  * @param {string} [props.code] - A code designating a specific type of nutritional product. Accepts all values from http://hl7.org/fhir/ValueSet/edible-substance-type
  * @param {BackboneElement} [props.ingredient] - Ingredients contained in this product
  * @param {BackboneElement} [props.instance] - One or several physical instances or occurrences of the nutrition product
  * @param {string} [props.knownAllergen] - Known or suspected allergens that are a part of this product. Accepts all values from http://hl7.org/fhir/ValueSet/allergen-class
  * @param {Reference} [props.manufacturer] - Manufacturer, representative or officially responsible for the product
  * @param {Annotation} [props.note] - Comments made about the product
  * @param {BackboneElement} [props.nutrient] - The product's nutritional information expressed by the nutrients
  * @param {BackboneElement} [props.productCharacteristic] - Specifies descriptive properties of the nutrition product
  * @param {string} [props.status] - active | inactive | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/nutritionproduct-status|4.3.0
  */
declare function nutritionProduct(type: "NutritionProduct", props: NutritionProduct_Props): any;
declare function nutritionProduct(props: NutritionProduct_Props): any;
/**
  * Create a Observation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal or order
  * @param {string} [props.bodySite] - Observed body part. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {string} [props.category] - Classification of  type of observation. Accepts all values from http://hl7.org/fhir/ValueSet/observation-category
  * @param {string} [props.code] - Type of observation (code / type). Accepts all values from http://hl7.org/fhir/ValueSet/observation-codes
  * @param {BackboneElement} [props.component] - Component results
  * @param {string} [props.dataAbsentReason] - Why the result is missing. Accepts all values from http://hl7.org/fhir/ValueSet/data-absent-reason
  * @param {Reference} [props.derivedFrom] - Related measurements the observation is made from
  * @param {Reference} [props.device] - (Measurement) Device
  * @param {dateTime|Period|Timing|instant} [props.effective] - Clinically relevant time/time-period for observation
  * @param {Reference} [props.encounter] - Healthcare event during which this observation is made
  * @param {Reference} [props.focus] - What the observation is about, when it is not about the subject of record
  * @param {Reference} [props.hasMember] - Related resource that belongs to the Observation group
  * @param {Identifier} [props.identifier] - Business Identifier for observation
  * @param {string} [props.interpretation] - High, low, normal, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/observation-interpretation
  * @param {instant} [props.issued] - Date/Time this version was made available
  * @param {string} [props.method] - How it was done. Accepts all values from http://hl7.org/fhir/ValueSet/observation-methods
  * @param {Annotation} [props.note] - Comments about the observation
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {Reference} [props.performer] - Who is responsible for the observation
  * @param {BackboneElement} [props.referenceRange] - Provides guide for interpretation
  * @param {Reference} [props.specimen] - Specimen used for this observation
  * @param {string} [props.status] - registered | preliminary | final | amended +. Accepts all values from http://hl7.org/fhir/ValueSet/observation-status|4.3.0
  * @param {Reference} [props.subject] - Who and/or what the observation is about
  * @param {Quantity|CodeableConcept|string|boolean|integer|Range|Ratio|SampledData|time|dateTime|Period} [props.value] - Actual result
  */
declare function observation(type: "Observation", props: Observation_Props): any;
declare function observation(props: Observation_Props): any;
/**
  * Create a ObservationDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.abnormalCodedValueSet] - Value set of abnormal coded values for the observations conforming to this ObservationDefinition
  * @param {string} [props.category] - Category of observation. Accepts all values from http://hl7.org/fhir/ValueSet/observation-category
  * @param {string} [props.code] - Type of observation (code / type). Accepts all values from http://hl7.org/fhir/ValueSet/observation-codes
  * @param {Reference} [props.criticalCodedValueSet] - Value set of critical coded values for the observations conforming to this ObservationDefinition
  * @param {Identifier} [props.identifier] - Business identifier for this ObservationDefinition instance
  * @param {string} [props.method] - Method used to produce the observation. Accepts all values from http://hl7.org/fhir/ValueSet/observation-methods
  * @param {boolean} [props.multipleResultsAllowed] - Multiple results allowed
  * @param {Reference} [props.normalCodedValueSet] - Value set of normal coded values for the observations conforming to this ObservationDefinition
  * @param {string} [props.permittedDataType] - Quantity | CodeableConcept | string | boolean | integer | Range | Ratio | SampledData | time | dateTime | Period. Accepts all values from http://hl7.org/fhir/ValueSet/permitted-data-type|4.3.0
  * @param {string} [props.preferredReportName] - Preferred report name
  * @param {BackboneElement} [props.qualifiedInterval] - Qualified range for continuous and ordinal observation results
  * @param {BackboneElement} [props.quantitativeDetails] - Characteristics of quantitative results
  * @param {Reference} [props.validCodedValueSet] - Value set of valid coded values for the observations conforming to this ObservationDefinition
  */
declare function observationDefinition(type: "ObservationDefinition", props: ObservationDefinition_Props): any;
declare function observationDefinition(props: ObservationDefinition_Props): any;
/**
  * Create a Organization resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether the organization's record is still in active use
  * @param {Address} [props.address] - An address for the organization
  * @param {string} [props.alias] - A list of alternate names that the organization is known as, or was known as in the past
  * @param {BackboneElement} [props.contact] - Contact for the organization for a certain purpose
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the organization
  * @param {Identifier} [props.identifier] - Identifies this organization  across multiple systems
  * @param {string} [props.name] - Name used for the organization
  * @param {Reference} [props.partOf] - The organization of which this organization forms a part
  * @param {ContactPoint} [props.telecom] - A contact detail for the organization
  * @param {string} [props.type] - Kind of organization. Accepts all values from http://hl7.org/fhir/ValueSet/organization-type
  */
declare function organization(type: "Organization", props: Organization_Props): any;
declare function organization(props: Organization_Props): any;
/**
  * Create a OrganizationAffiliation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this organization affiliation record is in active use
  * @param {string} [props.code] - Definition of the role the participatingOrganization plays. Accepts all values from http://hl7.org/fhir/ValueSet/organization-role
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for this role
  * @param {Reference} [props.healthcareService] - Healthcare services provided through the role
  * @param {Identifier} [props.identifier] - Business identifiers that are specific to this role
  * @param {Reference} [props.location] - The location(s) at which the role occurs
  * @param {Reference} [props.network] - Health insurance provider network in which the participatingOrganization provides the role's services (if defined) at the indicated locations (if defined)
  * @param {Reference} [props.organization] - Organization where the role is available
  * @param {Reference} [props.participatingOrganization] - Organization that provides/performs the role (e.g. providing services or is a member of)
  * @param {Period} [props.period] - The period during which the participatingOrganization is affiliated with the primary organization
  * @param {string} [props.specialty] - Specific specialty of the participatingOrganization in the context of the role. Accepts all values from http://hl7.org/fhir/ValueSet/c80-practice-codes
  * @param {ContactPoint} [props.telecom] - Contact details at the participatingOrganization relevant to this Affiliation
  */
declare function organizationAffiliation(type: "OrganizationAffiliation", props: OrganizationAffiliation_Props): any;
declare function organizationAffiliation(props: OrganizationAffiliation_Props): any;
/**
  * Create a PackagedProductDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.characteristic] - Allows the key features to be recorded, such as "hospital pack", "nurse prescribable". Accepts all values from http://hl7.org/fhir/ValueSet/package-characteristic
  * @param {Quantity} [props.containedItemQuantity] - A total of the complete count of contained items of a particular type/form, independent of sub-packaging or organization. This can be considered as the pack size
  * @param {boolean} [props.copackagedIndicator] - If the drug product is supplied with another item such as a diluent or adjuvant
  * @param {markdown} [props.description] - Textual description. Note that this is not the name of the package or product
  * @param {Identifier} [props.identifier] - A unique identifier for this package as whole
  * @param {BackboneElement} [props.legalStatusOfSupply] - The legal status of supply of the packaged item as classified by the regulator
  * @param {Reference} [props.manufacturer] - Manufacturer of this package type (multiple means these are all possible manufacturers)
  * @param {MarketingStatus} [props.marketingStatus] - Allows specifying that an item is on the market for sale, or that it is not available, and the dates and locations associated
  * @param {string} [props.name] - A name for this package. Typically as listed in a drug formulary, catalogue, inventory etc
  * @param {BackboneElement} [props.package] - A packaging item, as a container for medically related items, possibly with other packaging items within, or a packaging component, such as bottle cap
  * @param {Reference} [props.packageFor] - The product that this is a pack for
  * @param {string} [props.status] - The status within the lifecycle of this item. High level - not intended to duplicate details elsewhere e.g. legal status, or authorization/marketing status. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status
  * @param {dateTime} [props.statusDate] - The date at which the given status became applicable
  * @param {string} [props.type] - A high level category e.g. medicinal product, raw material, shipping container etc. Accepts all values from http://hl7.org/fhir/ValueSet/package-type
  */
declare function packagedProductDefinition(type: "PackagedProductDefinition", props: PackagedProductDefinition_Props): any;
declare function packagedProductDefinition(props: PackagedProductDefinition_Props): any;
/**
  * Create a Patient resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {Address} [props.address] - An address for the individual
  * @param {date} [props.birthDate] - The date of birth for the individual
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {boolean|dateTime} [props.deceased] - Indicates if the individual is deceased or not
  * @param {string} [props.gender] - male | female | other | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/administrative-gender|4.3.0
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {Identifier} [props.identifier] - An identifier for this patient
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {string} [props.maritalStatus] - Marital (civil) status of a patient. Accepts all values from http://hl7.org/fhir/ValueSet/marital-status
  * @param {boolean|integer} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {HumanName} [props.name] - A name associated with the patient
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {ContactPoint} [props.telecom] - A contact detail for the individual
  */
declare function patient(type: "Patient", props: Patient_Props): any;
declare function patient(props: Patient_Props): any;
/**
  * Create a PaymentNotice resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Money} [props.amount] - Monetary amount of the payment
  * @param {dateTime} [props.created] - Creation date
  * @param {Identifier} [props.identifier] - Business Identifier for the payment noctice
  * @param {Reference} [props.payee] - Party being paid
  * @param {Reference} [props.payment] - Payment reference
  * @param {date} [props.paymentDate] - Payment or clearing date
  * @param {string} [props.paymentStatus] - Issued or cleared Status of the payment. Accepts all values from http://hl7.org/fhir/ValueSet/payment-status
  * @param {Reference} [props.provider] - Responsible practitioner
  * @param {Reference} [props.recipient] - Party being notified
  * @param {Reference} [props.request] - Request reference
  * @param {Reference} [props.response] - Response reference
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/fm-status|4.3.0
  */
declare function paymentNotice(type: "PaymentNotice", props: PaymentNotice_Props): any;
declare function paymentNotice(props: PaymentNotice_Props): any;
/**
  * Create a PaymentReconciliation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.created] - Creation date
  * @param {BackboneElement} [props.detail] - Settlement particulars
  * @param {string} [props.disposition] - Disposition message
  * @param {string} [props.formCode] - Printed form identifier. Accepts all values from http://hl7.org/fhir/ValueSet/forms
  * @param {Identifier} [props.identifier] - Business Identifier for a payment reconciliation
  * @param {string} [props.outcome] - queued | complete | error | partial. Accepts all values from http://hl7.org/fhir/ValueSet/remittance-outcome|4.3.0
  * @param {Money} [props.paymentAmount] - Total amount of Payment
  * @param {date} [props.paymentDate] - When payment issued
  * @param {Identifier} [props.paymentIdentifier] - Business identifier for the payment
  * @param {Reference} [props.paymentIssuer] - Party generating payment
  * @param {Period} [props.period] - Period covered
  * @param {BackboneElement} [props.processNote] - Note concerning processing
  * @param {Reference} [props.request] - Reference to requesting resource
  * @param {Reference} [props.requestor] - Responsible practitioner
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/fm-status|4.3.0
  */
declare function paymentReconciliation(type: "PaymentReconciliation", props: PaymentReconciliation_Props): any;
declare function paymentReconciliation(props: PaymentReconciliation_Props): any;
/**
  * Create a Person resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - This person's record is in active use
  * @param {Address} [props.address] - One or more addresses for the person
  * @param {date} [props.birthDate] - The date on which the person was born
  * @param {string} [props.gender] - male | female | other | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/administrative-gender|4.3.0
  * @param {Identifier} [props.identifier] - A human identifier for this person
  * @param {BackboneElement} [props.link] - Link to a resource that concerns the same actual person
  * @param {Reference} [props.managingOrganization] - The organization that is the custodian of the person record
  * @param {HumanName} [props.name] - A name associated with the person
  * @param {Attachment} [props.photo] - Image of the person
  * @param {ContactPoint} [props.telecom] - A contact detail for the person
  */
declare function person(type: "Person", props: Person_Props): any;
declare function person(props: Person_Props): any;
/**
  * Create a PlanDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.action] - Action defined by the plan
  * @param {date} [props.approvalDate] - When the plan definition was approved by publisher
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.description] - Natural language description of the plan definition
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {Period} [props.effectivePeriod] - When the plan definition is expected to be used
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {BackboneElement} [props.goal] - What the plan is trying to accomplish
  * @param {Identifier} [props.identifier] - Additional identifier for the plan definition
  * @param {string} [props.jurisdiction] - Intended jurisdiction for plan definition (if applicable). Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {date} [props.lastReviewDate] - When the plan definition was last reviewed
  * @param {canonical} [props.library] - Logic used by the plan definition
  * @param {string} [props.name] - Name for this plan definition (computer friendly)
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {markdown} [props.purpose] - Why this plan definition is defined
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.subject] - Type of individual the plan definition is focused on. Accepts all values from http://hl7.org/fhir/ValueSet/subject-type
  * @param {string} [props.subtitle] - Subordinate title of the plan definition
  * @param {string} [props.title] - Name for this plan definition (human friendly)
  * @param {string} [props.topic] - E.g. Education, Treatment, Assessment. Accepts all values from http://hl7.org/fhir/ValueSet/definition-topic
  * @param {string} [props.type] - order-set | clinical-protocol | eca-rule | workflow-definition. Accepts all values from http://hl7.org/fhir/ValueSet/plan-definition-type
  * @param {string} [props.url] - Canonical identifier for this plan definition, represented as a URI (globally unique)
  * @param {string} [props.usage] - Describes the clinical usage of the plan
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.version] - Business version of the plan definition
  */
declare function planDefinition(type: "PlanDefinition", props: PlanDefinition_Props): any;
declare function planDefinition(props: PlanDefinition_Props): any;
/**
  * Create a Practitioner resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this practitioner's record is in active use
  * @param {Address} [props.address] - Address(es) of the practitioner that are not role specific (typically home address)
  * @param {date} [props.birthDate] - The date  on which the practitioner was born
  * @param {string} [props.communication] - A language the practitioner can use in patient communication. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {string} [props.gender] - male | female | other | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/administrative-gender|4.3.0
  * @param {Identifier} [props.identifier] - An identifier for the person as this agent
  * @param {HumanName} [props.name] - The name(s) associated with the practitioner
  * @param {Attachment} [props.photo] - Image of the person
  * @param {BackboneElement} [props.qualification] - Certification, licenses, or training pertaining to the provision of care
  * @param {ContactPoint} [props.telecom] - A contact detail for the practitioner (that apply to all roles)
  */
declare function practitioner(type: "Practitioner", props: Practitioner_Props): any;
declare function practitioner(props: Practitioner_Props): any;
/**
  * Create a PractitionerRole resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this practitioner role record is in active use
  * @param {string} [props.availabilityExceptions] - Description of availability exceptions
  * @param {BackboneElement} [props.availableTime] - Times the Service Site is available
  * @param {string} [props.code] - Roles which this practitioner may perform. Accepts all values from http://hl7.org/fhir/ValueSet/practitioner-role
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the practitioner with this role
  * @param {Reference} [props.healthcareService] - The list of healthcare services that this worker provides for this role's Organization/Location(s)
  * @param {Identifier} [props.identifier] - Business Identifiers that are specific to a role/location
  * @param {Reference} [props.location] - The location(s) at which this practitioner provides care
  * @param {BackboneElement} [props.notAvailable] - Not available during this time due to provided reason
  * @param {Reference} [props.organization] - Organization where the roles are available
  * @param {Period} [props.period] - The period during which the practitioner is authorized to perform in these role(s)
  * @param {Reference} [props.practitioner] - Practitioner that is able to provide the defined services for the organization
  * @param {string} [props.specialty] - Specific specialty of the practitioner. Accepts all values from http://hl7.org/fhir/ValueSet/c80-practice-codes
  * @param {ContactPoint} [props.telecom] - Contact details that are specific to the role/location/service
  */
declare function practitionerRole(type: "PractitionerRole", props: PractitionerRole_Props): any;
declare function practitionerRole(props: PractitionerRole_Props): any;
/**
  * Create a Procedure resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.asserter] - Person who asserts this procedure
  * @param {Reference} [props.basedOn] - A request for this procedure
  * @param {string} [props.bodySite] - Target body sites. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {string} [props.category] - Classification of the procedure. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-category
  * @param {string} [props.code] - Identification of the procedure. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-code
  * @param {string} [props.complication] - Complication following the procedure. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code
  * @param {Reference} [props.complicationDetail] - A condition that is a result of the procedure
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {BackboneElement} [props.focalDevice] - Manipulated, implanted, or removed device
  * @param {string} [props.followUp] - Instructions for follow up. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-followup
  * @param {Identifier} [props.identifier] - External Identifiers for this procedure
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.location] - Where the procedure happened
  * @param {Annotation} [props.note] - Additional information about the procedure
  * @param {string} [props.outcome] - The result of procedure. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-outcome
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {dateTime|Period|string|Age|Range} [props.performed] - When the procedure was performed
  * @param {BackboneElement} [props.performer] - The people who performed the procedure
  * @param {string} [props.reasonCode] - Coded reason procedure performed. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-reason
  * @param {Reference} [props.reasonReference] - The justification that the procedure was performed
  * @param {Reference} [props.recorder] - Who recorded the procedure
  * @param {Reference} [props.report] - Any report resulting from the procedure
  * @param {string} [props.status] - preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/event-status|4.3.0
  * @param {string} [props.statusReason] - Reason for current status. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-not-performed-reason
  * @param {Reference} [props.subject] - Who the procedure was performed on
  * @param {string} [props.usedCode] - Coded items used during the procedure. Accepts all values from http://hl7.org/fhir/ValueSet/device-kind
  * @param {Reference} [props.usedReference] - Items used during procedure
  */
declare function procedure(type: "Procedure", props: Procedure_Props): any;
declare function procedure(props: Procedure_Props): any;
/**
  * Create a Questionnaire resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {date} [props.approvalDate] - When the questionnaire was approved by publisher
  * @param {string} [props.code] - Concept that represents the overall questionnaire. Accepts all values from http://hl7.org/fhir/ValueSet/questionnaire-questions
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {dateTime} [props.date] - Date last changed
  * @param {canonical} [props.derivedFrom] - Instantiates protocol or definition
  * @param {markdown} [props.description] - Natural language description of the questionnaire
  * @param {Period} [props.effectivePeriod] - When the questionnaire is expected to be used
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {Identifier} [props.identifier] - Additional identifier for the questionnaire
  * @param {BackboneElement} [props.item] - Questions and sections within the Questionnaire
  * @param {string} [props.jurisdiction] - Intended jurisdiction for questionnaire (if applicable). Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {date} [props.lastReviewDate] - When the questionnaire was last reviewed
  * @param {string} [props.name] - Name for this questionnaire (computer friendly)
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {markdown} [props.purpose] - Why this questionnaire is defined
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.subjectType] - Resource that can be subject of QuestionnaireResponse. Accepts all values from http://hl7.org/fhir/ValueSet/resource-types|4.3.0
  * @param {string} [props.title] - Name for this questionnaire (human friendly)
  * @param {string} [props.url] - Canonical identifier for this questionnaire, represented as a URI (globally unique)
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.version] - Business version of the questionnaire
  */
declare function questionnaire(type: "Questionnaire", props: Questionnaire_Props): any;
declare function questionnaire(props: Questionnaire_Props): any;
/**
  * Create a QuestionnaireResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.author] - Person who received and recorded the answers
  * @param {dateTime} [props.authored] - Date the answers were gathered
  * @param {Reference} [props.basedOn] - Request fulfilled by this QuestionnaireResponse
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {Identifier} [props.identifier] - Unique id for this set of answers
  * @param {BackboneElement} [props.item] - Groups and questions
  * @param {Reference} [props.partOf] - Part of this action
  * @param {canonical} [props.questionnaire] - Form being answered
  * @param {Reference} [props.source] - The person who answered the questions
  * @param {string} [props.status] - in-progress | completed | amended | entered-in-error | stopped. Accepts all values from http://hl7.org/fhir/ValueSet/questionnaire-answers-status|4.3.0
  * @param {Reference} [props.subject] - The subject of the questions
  */
declare function questionnaireResponse(type: "QuestionnaireResponse", props: QuestionnaireResponse_Props): any;
declare function questionnaireResponse(props: QuestionnaireResponse_Props): any;
/**
  * Create a RegulatedAuthorization resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.basis] - The legal/regulatory framework or reasons under which this authorization is granted. Accepts all values from http://hl7.org/fhir/ValueSet/regulated-authorization-basis
  * @param {BackboneElement} [props.case] - The case or regulatory procedure for granting or amending a regulated authorization. Note: This area is subject to ongoing review and the workgroup is seeking implementer feedback on its use (see link at bottom of page)
  * @param {markdown} [props.description] - General textual supporting information
  * @param {Reference} [props.holder] - The organization that has been granted this authorization, by the regulator
  * @param {Identifier} [props.identifier] - Business identifier for the authorization, typically assigned by the authorizing body
  * @param {CodeableReference} [props.indication] - Condition for which the use of the regulated product applies
  * @param {string} [props.intendedUse] - The intended use of the product, e.g. prevention, treatment. Accepts all values from http://hl7.org/fhir/ValueSet/product-intended-use
  * @param {string} [props.region] - The territory in which the authorization has been granted. Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {Reference} [props.regulator] - The regulatory authority or authorizing body granting the authorization
  * @param {string} [props.status] - The status that is authorised e.g. approved. Intermediate states can be tracked with cases and applications. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status
  * @param {dateTime} [props.statusDate] - The date at which the current status was assigned
  * @param {Reference} [props.subject] - The product type, treatment, facility or activity that is being authorized
  * @param {string} [props.type] - Overall type of this authorization, for example drug marketing approval, orphan drug designation. Accepts all values from http://hl7.org/fhir/ValueSet/regulated-authorization-type
  * @param {Period} [props.validityPeriod] - The time period in which the regulatory approval etc. is in effect, e.g. a Marketing Authorization includes the date of authorization and/or expiration date
  */
declare function regulatedAuthorization(type: "RegulatedAuthorization", props: RegulatedAuthorization_Props): any;
declare function regulatedAuthorization(props: RegulatedAuthorization_Props): any;
/**
  * Create a RelatedPerson resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this related person's record is in active use
  * @param {Address} [props.address] - Address where the related person can be contacted or visited
  * @param {date} [props.birthDate] - The date on which the related person was born
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with about the patient's health
  * @param {string} [props.gender] - male | female | other | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/administrative-gender|4.3.0
  * @param {Identifier} [props.identifier] - A human identifier for this person
  * @param {HumanName} [props.name] - A name associated with the person
  * @param {Reference} [props.patient] - The patient this person is related to
  * @param {Period} [props.period] - Period of time that this relationship is considered valid
  * @param {Attachment} [props.photo] - Image of the person
  * @param {string} [props.relationship] - The nature of the relationship. Accepts all values from http://hl7.org/fhir/ValueSet/relatedperson-relationshiptype
  * @param {ContactPoint} [props.telecom] - A contact detail for the person
  */
declare function relatedPerson(type: "RelatedPerson", props: RelatedPerson_Props): any;
declare function relatedPerson(props: RelatedPerson_Props): any;
/**
  * Create a RequestGroup resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.action] - Proposed actions, if any
  * @param {Reference} [props.author] - Device or practitioner that authored the request group
  * @param {dateTime} [props.authoredOn] - When the request group was authored
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal, or order
  * @param {CodeableConcept} [props.code] - What's being requested/ordered
  * @param {Reference} [props.encounter] - Created as part of
  * @param {Identifier} [props.groupIdentifier] - Composite request this is part of
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/request-intent|4.3.0
  * @param {Annotation} [props.note] - Additional notes about the response
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.3.0
  * @param {CodeableConcept} [props.reasonCode] - Why the request group is needed
  * @param {Reference} [props.reasonReference] - Why the request group is needed
  * @param {Reference} [props.replaces] - Request(s) replaced by this request
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/request-status|4.3.0
  * @param {Reference} [props.subject] - Who the request group is about
  */
declare function requestGroup(type: "RequestGroup", props: RequestGroup_Props): any;
declare function requestGroup(props: RequestGroup_Props): any;
/**
  * Create a ResearchDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {date} [props.approvalDate] - When the research definition was approved by publisher
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {string} [props.comment] - Used for footnotes or explanatory notes
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.description] - Natural language description of the research definition
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {Period} [props.effectivePeriod] - When the research definition is expected to be used
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {Reference} [props.exposure] - What exposure?
  * @param {Reference} [props.exposureAlternative] - What alternative exposure state?
  * @param {Identifier} [props.identifier] - Additional identifier for the research definition
  * @param {string} [props.jurisdiction] - Intended jurisdiction for research definition (if applicable). Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {date} [props.lastReviewDate] - When the research definition was last reviewed
  * @param {canonical} [props.library] - Logic used by the ResearchDefinition
  * @param {string} [props.name] - Name for this research definition (computer friendly)
  * @param {Reference} [props.outcome] - What outcome?
  * @param {Reference} [props.population] - What population?
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {markdown} [props.purpose] - Why this research definition is defined
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {string} [props.shortTitle] - Title for use in informal contexts
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.subject] - E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device. Accepts all values from http://hl7.org/fhir/ValueSet/subject-type
  * @param {string} [props.subtitle] - Subordinate title of the ResearchDefinition
  * @param {string} [props.title] - Name for this research definition (human friendly)
  * @param {string} [props.topic] - The category of the ResearchDefinition, such as Education, Treatment, Assessment, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/definition-topic
  * @param {string} [props.url] - Canonical identifier for this research definition, represented as a URI (globally unique)
  * @param {string} [props.usage] - Describes the clinical usage of the ResearchDefinition
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.version] - Business version of the research definition
  */
declare function researchDefinition(type: "ResearchDefinition", props: ResearchDefinition_Props): any;
declare function researchDefinition(props: ResearchDefinition_Props): any;
/**
  * Create a ResearchElementDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {date} [props.approvalDate] - When the research element definition was approved by publisher
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {BackboneElement} [props.characteristic] - What defines the members of the research element
  * @param {string} [props.comment] - Used for footnotes or explanatory notes
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.description] - Natural language description of the research element definition
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {Period} [props.effectivePeriod] - When the research element definition is expected to be used
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {Identifier} [props.identifier] - Additional identifier for the research element definition
  * @param {string} [props.jurisdiction] - Intended jurisdiction for research element definition (if applicable). Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {date} [props.lastReviewDate] - When the research element definition was last reviewed
  * @param {canonical} [props.library] - Logic used by the ResearchElementDefinition
  * @param {string} [props.name] - Name for this research element definition (computer friendly)
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {markdown} [props.purpose] - Why this research element definition is defined
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {string} [props.shortTitle] - Title for use in informal contexts
  * @param {string} [props.status] - draft | active | retired | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status|4.3.0
  * @param {string} [props.subject] - E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device. Accepts all values from http://hl7.org/fhir/ValueSet/subject-type
  * @param {string} [props.subtitle] - Subordinate title of the ResearchElementDefinition
  * @param {string} [props.title] - Name for this research element definition (human friendly)
  * @param {string} [props.topic] - The category of the ResearchElementDefinition, such as Education, Treatment, Assessment, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/definition-topic
  * @param {string} [props.type] - population | exposure | outcome. Accepts all values from http://hl7.org/fhir/ValueSet/research-element-type|4.3.0
  * @param {string} [props.url] - Canonical identifier for this research element definition, represented as a URI (globally unique)
  * @param {string} [props.usage] - Describes the clinical usage of the ResearchElementDefinition
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.variableType] - dichotomous | continuous | descriptive. Accepts all values from http://hl7.org/fhir/ValueSet/variable-type|4.3.0
  * @param {string} [props.version] - Business version of the research element definition
  */
declare function researchElementDefinition(type: "ResearchElementDefinition", props: ResearchElementDefinition_Props): any;
declare function researchElementDefinition(props: ResearchElementDefinition_Props): any;
/**
  * Create a ResearchStudy resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.arm] - Defined path through the study for a subject
  * @param {CodeableConcept} [props.category] - Classifications for the study
  * @param {string} [props.condition] - Condition being studied. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code
  * @param {ContactDetail} [props.contact] - Contact details for the study
  * @param {markdown} [props.description] - What this is study doing
  * @param {Reference} [props.enrollment] - Inclusion & exclusion criteria
  * @param {CodeableConcept} [props.focus] - Drugs, devices, etc. under study
  * @param {Identifier} [props.identifier] - Business Identifier for study
  * @param {CodeableConcept} [props.keyword] - Used to search for the study
  * @param {string} [props.location] - Geographic region(s) for study. Accepts all values from http://hl7.org/fhir/ValueSet/jurisdiction
  * @param {Annotation} [props.note] - Comments made about the study
  * @param {BackboneElement} [props.objective] - A goal for the study
  * @param {Reference} [props.partOf] - Part of larger study
  * @param {Period} [props.period] - When the study began and ended
  * @param {string} [props.phase] - n-a | early-phase-1 | phase-1 | phase-1-phase-2 | phase-2 | phase-2-phase-3 | phase-3 | phase-4. Accepts all values from http://hl7.org/fhir/ValueSet/research-study-phase
  * @param {string} [props.primaryPurposeType] - treatment | prevention | diagnostic | supportive-care | screening | health-services-research | basic-science | device-feasibility. Accepts all values from http://hl7.org/fhir/ValueSet/research-study-prim-purp-type
  * @param {Reference} [props.principalInvestigator] - Researcher who oversees multiple aspects of the study
  * @param {Reference} [props.protocol] - Steps followed in executing study
  * @param {string} [props.reasonStopped] - accrual-goal-met | closed-due-to-toxicity | closed-due-to-lack-of-study-progress | temporarily-closed-per-study-design. Accepts all values from http://hl7.org/fhir/ValueSet/research-study-reason-stopped
  * @param {RelatedArtifact} [props.relatedArtifact] - References and dependencies
  * @param {Reference} [props.site] - Facility where study activities are conducted
  * @param {Reference} [props.sponsor] - Organization that initiates and is legally responsible for the study
  * @param {string} [props.status] - active | administratively-completed | approved | closed-to-accrual | closed-to-accrual-and-intervention | completed | disapproved | in-review | temporarily-closed-to-accrual | temporarily-closed-to-accrual-and-intervention | withdrawn. Accepts all values from http://hl7.org/fhir/ValueSet/research-study-status|4.3.0
  * @param {string} [props.title] - Name for this study
  */
declare function researchStudy(type: "ResearchStudy", props: ResearchStudy_Props): any;
declare function researchStudy(props: ResearchStudy_Props): any;
/**
  * Create a ResearchSubject resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.actualArm] - What path was followed
  * @param {string} [props.assignedArm] - What path should be followed
  * @param {Reference} [props.consent] - Agreement to participate in study
  * @param {Identifier} [props.identifier] - Business Identifier for research subject in a study
  * @param {Reference} [props.individual] - Who is part of study
  * @param {Period} [props.period] - Start and end of participation
  * @param {string} [props.status] - candidate | eligible | follow-up | ineligible | not-registered | off-study | on-study | on-study-intervention | on-study-observation | pending-on-study | potential-candidate | screening | withdrawn. Accepts all values from http://hl7.org/fhir/ValueSet/research-subject-status|4.3.0
  * @param {Reference} [props.study] - Study subject is part of
  */
declare function researchSubject(type: "ResearchSubject", props: ResearchSubject_Props): any;
declare function researchSubject(props: ResearchSubject_Props): any;
/**
  * Create a RiskAssessment resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.basedOn] - Request fulfilled by this assessment
  * @param {Reference} [props.basis] - Information used in assessment
  * @param {CodeableConcept} [props.code] - Type of assessment
  * @param {Reference} [props.condition] - Condition assessed
  * @param {Reference} [props.encounter] - Where was assessment performed?
  * @param {Identifier} [props.identifier] - Unique identifier for the assessment
  * @param {CodeableConcept} [props.method] - Evaluation mechanism
  * @param {string} [props.mitigation] - How to reduce risk
  * @param {Annotation} [props.note] - Comments on the risk assessment
  * @param {dateTime|Period} [props.occurrence] - When was assessment made?
  * @param {Reference} [props.parent] - Part of this occurrence
  * @param {Reference} [props.performer] - Who did assessment?
  * @param {BackboneElement} [props.prediction] - Outcome predicted
  * @param {CodeableConcept} [props.reasonCode] - Why the assessment was necessary?
  * @param {Reference} [props.reasonReference] - Why the assessment was necessary?
  * @param {string} [props.status] - registered | preliminary | final | amended +. Accepts all values from http://hl7.org/fhir/ValueSet/observation-status|4.3.0
  * @param {Reference} [props.subject] - Who/what does assessment apply to?
  */
declare function riskAssessment(type: "RiskAssessment", props: RiskAssessment_Props): any;
declare function riskAssessment(props: RiskAssessment_Props): any;
/**
  * Create a Schedule resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this schedule is in active use
  * @param {Reference} [props.actor] - Resource(s) that availability information is being provided for
  * @param {string} [props.comment] - Comments on availability
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {Period} [props.planningHorizon] - Period of time covered by schedule
  * @param {string} [props.serviceCategory] - High-level category. Accepts all values from http://hl7.org/fhir/ValueSet/service-category
  * @param {string} [props.serviceType] - Specific service. Accepts all values from http://hl7.org/fhir/ValueSet/service-type
  * @param {string} [props.specialty] - Type of specialty needed. Accepts all values from http://hl7.org/fhir/ValueSet/c80-practice-codes
  */
declare function schedule(type: "Schedule", props: Schedule_Props): any;
declare function schedule(props: Schedule_Props): any;
/**
  * Create a ServiceRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.asNeeded] - Preconditions for service. Accepts all values from http://hl7.org/fhir/ValueSet/medication-as-needed-reason
  * @param {dateTime} [props.authoredOn] - Date request signed
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {string} [props.bodySite] - Location on Body. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {string} [props.category] - Classification of service. Accepts all values from http://hl7.org/fhir/ValueSet/servicerequest-category
  * @param {string} [props.code] - What is being requested/ordered. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-code
  * @param {boolean} [props.doNotPerform] - True if service/procedure should not be performed
  * @param {Reference} [props.encounter] - Encounter in which the request was created
  * @param {Identifier} [props.identifier] - Identifiers assigned to this order
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/request-intent|4.3.0
  * @param {string} [props.locationCode] - Requested location. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ServiceDeliveryLocationRoleType
  * @param {Reference} [props.locationReference] - Requested location
  * @param {Annotation} [props.note] - Comments
  * @param {dateTime|Period|Timing} [props.occurrence] - When service should occur
  * @param {string} [props.orderDetail] - Additional order information. Accepts all values from http://hl7.org/fhir/ValueSet/servicerequest-orderdetail
  * @param {string} [props.patientInstruction] - Patient or consumer-oriented instructions
  * @param {Reference} [props.performer] - Requested performer
  * @param {string} [props.performerType] - Performer role. Accepts all values from http://terminology.hl7.org/ValueSet/action-participant-role
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.3.0
  * @param {Quantity|Ratio|Range} [props.quantity] - Service amount
  * @param {string} [props.reasonCode] - Explanation/Justification for procedure or service. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-reason
  * @param {Reference} [props.reasonReference] - Explanation/Justification for service or service
  * @param {Reference} [props.relevantHistory] - Request provenance
  * @param {Reference} [props.replaces] - What request replaces
  * @param {Reference} [props.requester] - Who/what is requesting service
  * @param {Identifier} [props.requisition] - Composite Request ID
  * @param {Reference} [props.specimen] - Procedure Samples
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/request-status|4.3.0
  * @param {Reference} [props.subject] - Individual or Entity the service is ordered for
  * @param {Reference} [props.supportingInfo] - Additional clinical information
  */
declare function serviceRequest(type: "ServiceRequest", props: ServiceRequest_Props): any;
declare function serviceRequest(props: ServiceRequest_Props): any;
/**
  * Create a Slot resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.appointmentType] - The style of appointment or patient that may be booked in the slot (not service type). Accepts all values from http://terminology.hl7.org/ValueSet/v2-0276
  * @param {string} [props.comment] - Comments on the slot to describe any extended information. Such as custom constraints on the slot
  * @param {instant} [props.end] - Date/Time that the slot is to conclude
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {boolean} [props.overbooked] - This slot has already been overbooked, appointments are unlikely to be accepted for this time
  * @param {Reference} [props.schedule] - The schedule resource that this slot defines an interval of status information
  * @param {string} [props.serviceCategory] - A broad categorization of the service that is to be performed during this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/service-category
  * @param {string} [props.serviceType] - The type of appointments that can be booked into this slot (ideally this would be an identifiable service - which is at a location, rather than the location itself). If provided then this overrides the value provided on the availability resource. Accepts all values from http://hl7.org/fhir/ValueSet/service-type
  * @param {string} [props.specialty] - The specialty of a practitioner that would be required to perform the service requested in this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/c80-practice-codes
  * @param {instant} [props.start] - Date/Time that the slot is to begin
  * @param {string} [props.status] - busy | free | busy-unavailable | busy-tentative | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/slotstatus|4.3.0
  */
declare function slot(type: "Slot", props: Slot_Props): any;
declare function slot(props: Slot_Props): any;
/**
  * Create a Specimen resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.accessionIdentifier] - Identifier assigned by the lab
  * @param {BackboneElement} [props.collection] - Collection details
  * @param {string} [props.condition] - State of the specimen. Accepts all values from http://terminology.hl7.org/ValueSet/v2-0493
  * @param {BackboneElement} [props.container] - Direct container of specimen (tube/slide, etc.)
  * @param {Identifier} [props.identifier] - External Identifier
  * @param {Annotation} [props.note] - Comments
  * @param {Reference} [props.parent] - Specimen from which this specimen originated
  * @param {BackboneElement} [props.processing] - Processing and processing step details
  * @param {dateTime} [props.receivedTime] - The time when specimen was received for processing
  * @param {Reference} [props.request] - Why the specimen was collected
  * @param {string} [props.status] - available | unavailable | unsatisfactory | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/specimen-status|4.3.0
  * @param {Reference} [props.subject] - Where the specimen came from. This may be from patient(s), from a location (e.g., the source of an environmental sample), or a sampling of a substance or a device
  * @param {string} [props.type] - Kind of material that forms the specimen. Accepts all values from http://terminology.hl7.org/ValueSet/v2-0487
  */
declare function specimen(type: "Specimen", props: Specimen_Props): any;
declare function specimen(props: Specimen_Props): any;
/**
  * Create a SpecimenDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.collection] - Specimen collection procedure. Accepts all values from http://hl7.org/fhir/ValueSet/specimen-collection
  * @param {Identifier} [props.identifier] - Business identifier of a kind of specimen
  * @param {string} [props.patientPreparation] - Patient preparation for collection. Accepts all values from http://hl7.org/fhir/ValueSet/prepare-patient-prior-specimen-collection
  * @param {string} [props.timeAspect] - Time aspect for collection
  * @param {string} [props.typeCollected] - Kind of material to collect. Accepts all values from http://terminology.hl7.org/ValueSet/v2-0487
  * @param {BackboneElement} [props.typeTested] - Specimen in container intended for testing by lab
  */
declare function specimenDefinition(type: "SpecimenDefinition", props: SpecimenDefinition_Props): any;
declare function specimenDefinition(props: SpecimenDefinition_Props): any;
/**
  * Create a Substance resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.category] - What class/type of substance this is. Accepts all values from http://hl7.org/fhir/ValueSet/substance-category
  * @param {string} [props.code] - What substance this is. Accepts all values from http://hl7.org/fhir/ValueSet/substance-code
  * @param {string} [props.description] - Textual description of the substance, comments
  * @param {Identifier} [props.identifier] - Unique identifier
  * @param {BackboneElement} [props.ingredient] - Composition information about the substance
  * @param {BackboneElement} [props.instance] - If this describes a specific package/container of the substance
  * @param {string} [props.status] - active | inactive | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/substance-status|4.3.0
  */
declare function substance(type: "Substance", props: Substance_Props): any;
declare function substance(props: Substance_Props): any;
/**
  * Create a SubstanceDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {CodeableConcept} [props.classification] - A categorization, high level e.g. polymer or nucleic acid, or food, chemical, biological, or lower e.g. polymer linear or branch chain, or type of impurity
  * @param {BackboneElement} [props.code] - Codes associated with the substance
  * @param {markdown} [props.description] - Textual description of the substance
  * @param {string} [props.domain] - If the substance applies to human or veterinary use. Accepts all values from http://hl7.org/fhir/ValueSet/medicinal-product-domain
  * @param {string} [props.grade] - The quality standard, established benchmark, to which substance complies (e.g. USP/NF, BP). Accepts all values from http://hl7.org/fhir/ValueSet/substance-grade
  * @param {Identifier} [props.identifier] - Identifier by which this substance is known
  * @param {Reference} [props.informationSource] - Supporting literature
  * @param {Reference} [props.manufacturer] - The entity that creates, makes, produces or fabricates the substance
  * @param {BackboneElement} [props.moiety] - Moiety, for structural modifications
  * @param {BackboneElement} [props.molecularWeight] - The molecular weight or weight range
  * @param {BackboneElement} [props.name] - Names applicable to this substance
  * @param {Annotation} [props.note] - Textual comment about the substance's catalogue or registry record
  * @param {BackboneElement} [props.property] - General specifications for this substance
  * @param {BackboneElement} [props.relationship] - A link between this substance and another
  * @param {BackboneElement} [props.sourceMaterial] - Material or taxonomic/anatomical source
  * @param {string} [props.status] - Status of substance within the catalogue e.g. active, retired. Accepts all values from http://hl7.org/fhir/ValueSet/publication-status
  * @param {BackboneElement} [props.structure] - Structural information
  * @param {Reference} [props.supplier] - An entity that is the source for the substance. It may be different from the manufacturer
  * @param {string} [props.version] - A business level version identifier of the substance
  */
declare function substanceDefinition(type: "SubstanceDefinition", props: SubstanceDefinition_Props): any;
declare function substanceDefinition(props: SubstanceDefinition_Props): any;
/**
  * Create a SupplyDelivery resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal or order
  * @param {Reference} [props.destination] - Where the Supply was sent
  * @param {Identifier} [props.identifier] - External identifier
  * @param {dateTime|Period|Timing} [props.occurrence] - When event occurred
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {Reference} [props.patient] - Patient for whom the item is supplied
  * @param {Reference} [props.receiver] - Who collected the Supply
  * @param {string} [props.status] - in-progress | completed | abandoned | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/supplydelivery-status|4.3.0
  * @param {BackboneElement} [props.suppliedItem] - The item that is delivered or supplied
  * @param {Reference} [props.supplier] - Dispenser
  * @param {string} [props.type] - Category of dispense event. Accepts all values from http://hl7.org/fhir/ValueSet/supplydelivery-type|4.3.0
  */
declare function supplyDelivery(type: "SupplyDelivery", props: SupplyDelivery_Props): any;
declare function supplyDelivery(props: SupplyDelivery_Props): any;
/**
  * Create a SupplyRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.authoredOn] - When the request was made
  * @param {string} [props.category] - The kind of supply (central, non-stock, etc.). Accepts all values from http://hl7.org/fhir/ValueSet/supplyrequest-kind
  * @param {Reference} [props.deliverFrom] - The origin of the supply
  * @param {Reference} [props.deliverTo] - The destination of the supply
  * @param {Identifier} [props.identifier] - Business Identifier for SupplyRequest
  * @param {string} [props.item] - Medication, Substance, or Device requested to be supplied. Accepts all values from http://hl7.org/fhir/ValueSet/supply-item
  * @param {dateTime|Period|Timing} [props.occurrence] - When the request should be fulfilled
  * @param {BackboneElement} [props.parameter] - Ordered item details
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.3.0
  * @param {Quantity} [props.quantity] - The requested amount of the item indicated
  * @param {string} [props.reasonCode] - The reason why the supply item was requested. Accepts all values from http://hl7.org/fhir/ValueSet/supplyrequest-reason
  * @param {Reference} [props.reasonReference] - The reason why the supply item was requested
  * @param {Reference} [props.requester] - Individual making the request
  * @param {string} [props.status] - draft | active | suspended +. Accepts all values from http://hl7.org/fhir/ValueSet/supplyrequest-status|4.3.0
  * @param {Reference} [props.supplier] - Who is intended to fulfill the request
  */
declare function supplyRequest(type: "SupplyRequest", props: SupplyRequest_Props): any;
declare function supplyRequest(props: SupplyRequest_Props): any;
/**
  * Create a Task resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.authoredOn] - Task Creation Date
  * @param {Reference} [props.basedOn] - Request fulfilled by this task
  * @param {CodeableConcept} [props.businessStatus] - E.g. "Specimen collected", "IV prepped"
  * @param {string} [props.code] - Task Type. Accepts all values from http://hl7.org/fhir/ValueSet/task-code
  * @param {string} [props.description] - Human-readable explanation of task
  * @param {Reference} [props.encounter] - Healthcare event during which this task originated
  * @param {Period} [props.executionPeriod] - Start and end time of execution
  * @param {Reference} [props.focus] - What task is acting on
  * @param {Reference} [props.for] - Beneficiary of the Task
  * @param {Identifier} [props.groupIdentifier] - Requisition or grouper id
  * @param {Identifier} [props.identifier] - Task Instance Identifier
  * @param {BackboneElement} [props.input] - Information used to perform task
  * @param {canonical} [props.instantiatesCanonical] - Formal definition of task
  * @param {string} [props.instantiatesUri] - Formal definition of task
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {string} [props.intent] - unknown | proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/task-intent|4.3.0
  * @param {dateTime} [props.lastModified] - Task Last Modified Date
  * @param {Reference} [props.location] - Where task occurs
  * @param {Annotation} [props.note] - Comments made about the task
  * @param {BackboneElement} [props.output] - Information produced as part of task
  * @param {Reference} [props.owner] - Responsible individual
  * @param {Reference} [props.partOf] - Composite task
  * @param {string} [props.performerType] - Requested performer. Accepts all values from http://hl7.org/fhir/ValueSet/performer-role
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.3.0
  * @param {CodeableConcept} [props.reasonCode] - Why task is needed
  * @param {Reference} [props.reasonReference] - Why task is needed
  * @param {Reference} [props.relevantHistory] - Key events in history of the Task
  * @param {Reference} [props.requester] - Who is asking for task to be done
  * @param {BackboneElement} [props.restriction] - Constraints on fulfillment tasks
  * @param {string} [props.status] - draft | requested | received | accepted | +. Accepts all values from http://hl7.org/fhir/ValueSet/task-status|4.3.0
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  */
declare function task(type: "Task", props: Task_Props): any;
declare function task(props: Task_Props): any;
/**
  * Create a TestReport resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External identifier
  * @param {dateTime} [props.issued] - When the TestScript was executed and this TestReport was generated
  * @param {string} [props.name] - Informal name of the executed TestScript
  * @param {BackboneElement} [props.participant] - A participant in the test execution, either the execution engine, a client, or a server
  * @param {string} [props.result] - pass | fail | pending. Accepts all values from http://hl7.org/fhir/ValueSet/report-result-codes|4.3.0
  * @param {decimal} [props.score] - The final score (percentage of tests passed) resulting from the execution of the TestScript
  * @param {BackboneElement} [props.setup] - The results of the series of required setup operations before the tests were executed
  * @param {string} [props.status] - completed | in-progress | waiting | stopped | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/report-status-codes|4.3.0
  * @param {BackboneElement} [props.teardown] - The results of running the series of required clean up steps
  * @param {BackboneElement} [props.test] - A test executed from the test script
  * @param {Reference} [props.testScript] - Reference to the  version-specific TestScript that was executed to produce this TestReport
  * @param {string} [props.tester] - Name of the tester producing this report (Organization or individual)
  */
declare function testReport(type: "TestReport", props: TestReport_Props): any;
declare function testReport(props: TestReport_Props): any;
/**
  * Create a VerificationResult resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {BackboneElement} [props.attestation] - Information about the entity attesting to information
  * @param {string} [props.failureAction] - fatal | warn | rec-only | none. Accepts all values from http://hl7.org/fhir/ValueSet/verificationresult-failure-action
  * @param {Timing} [props.frequency] - Frequency of revalidation
  * @param {dateTime} [props.lastPerformed] - The date/time validation was last completed (including failed validations)
  * @param {string} [props.need] - none | initial | periodic. Accepts all values from http://hl7.org/fhir/ValueSet/verificationresult-need
  * @param {date} [props.nextScheduled] - The date when target is next validated, if appropriate
  * @param {BackboneElement} [props.primarySource] - Information about the primary source(s) involved in validation
  * @param {string} [props.status] - attested | validated | in-process | req-revalid | val-fail | reval-fail. Accepts all values from http://hl7.org/fhir/ValueSet/verificationresult-status|4.3.0
  * @param {dateTime} [props.statusDate] - When the validation status was updated
  * @param {Reference} [props.target] - A resource that was validated
  * @param {string} [props.targetLocation] - The fhirpath location(s) within the resource that was validated
  * @param {string} [props.validationProcess] - The primary process by which the target is validated (edit check; value set; primary source; multiple sources; standalone; in context). Accepts all values from http://hl7.org/fhir/ValueSet/verificationresult-validation-process
  * @param {string} [props.validationType] - nothing | primary | multiple. Accepts all values from http://hl7.org/fhir/ValueSet/verificationresult-validation-type
  * @param {BackboneElement} [props.validator] - Information about the entity validating information
  */
declare function verificationResult(type: "VerificationResult", props: VerificationResult_Props): any;
declare function verificationResult(props: VerificationResult_Props): any;
/**
  * Create a VisionPrescription resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.created] - Response creation date
  * @param {dateTime} [props.dateWritten] - When prescription was authorized
  * @param {Reference} [props.encounter] - Created during encounter / admission / stay
  * @param {Identifier} [props.identifier] - Business Identifier for vision prescription
  * @param {BackboneElement} [props.lensSpecification] - Vision lens authorization
  * @param {Reference} [props.patient] - Who prescription is for
  * @param {Reference} [props.prescriber] - Who authorized the vision prescription
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/fm-status|4.3.0
  */
declare function visionPrescription(type: "VisionPrescription", props: VisionPrescription_Props): any;
declare function visionPrescription(props: VisionPrescription_Props): any;

export { type Address, type Age, type Annotation, type Attachment, type BackboneElement, type CodeableConcept, type CodeableReference, type Coding, type ContactDetail, type ContactPoint, type Contributor, type Count, type DataRequirement, type Distance, type Dosage, type Duration, type Element, type ElementDefinition, type Expression, type Extension, type HumanName, type Identifier, type MarketingStatus, type Meta, type Money, type MoneyQuantity, type Narrative, type ParameterDefinition, type Period, type Population, type ProdCharacteristic, type ProductShelfLife, type Quantity, type Range, type Ratio, type RatioRange, type Reference, type RelatedArtifact, type SampledData, type Signature, type SimpleQuantity, type Timing, type TriggerDefinition, type UsageContext, account, activityDefinition, addExtension, administrableProductDefinition, adverseEvent, allergyIntolerance, appointment, appointmentResponse, biologicallyDerivedProduct, bodyStructure, c, carePlan, careTeam, cc, chargeItem, chargeItemDefinition, citation, claim, claimResponse, clinicalImpression, clinicalUseDefinition, type code, coding, communication, communicationRequest, composite, concept, contract, coverage, coverageEligibilityRequest, coverageEligibilityResponse, detectedIssue, device, deviceDefinition, deviceMetric, deviceRequest, deviceUseStatement, diagnosticReport, domainResource, encounter, enrollmentRequest, enrollmentResponse, ensureConceptText, episodeOfCare, eventDefinition, evidence, evidenceReport, evidenceVariable, explanationOfBenefit, ext, extendSystemMap, extendValues, extension, familyMemberHistory, findExtension, flag, goal, group, guidanceResponse, healthcareService, id, identifier, imagingStudy, immunization, immunizationEvaluation, immunizationRecommendation, ingredient, insurancePlan, invoice, library, list, location, lookupValue, manufacturedItemDefinition, mapSystems, mapValues, measure, measureReport, media, medication, medicationAdministration, medicationDispense, medicationKnowledge, medicationRequest, medicationStatement, medicinalProductDefinition, molecularSequence, nutritionOrder, nutritionProduct, observation, observationDefinition, organization, organizationAffiliation, packagedProductDefinition, patient, paymentNotice, paymentReconciliation, person, planDefinition, practitioner, practitionerRole, procedure, questionnaire, questionnaireResponse, ref, reference, regulatedAuthorization, relatedPerson, requestGroup, researchDefinition, researchElementDefinition, researchStudy, researchSubject, riskAssessment, schedule, serviceRequest, setSystemMap, setValues, slot, specimen, specimenDefinition, substance, substanceDefinition, supplyDelivery, supplyRequest, task, testReport, type url, value, verificationResult, visionPrescription, type xhtml };

