
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
    text?: markdown;
    /** When the annotation was made */
    time?: string;
}
interface Attachment {
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
    value?: base64Binary | boolean | any | string | string | string | number | string | string | number | markdown | oid | number | string | string | number | string | url | uuid | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
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
    security?: Coding;
    /** Identifies where the resource comes from */
    source?: string;
    /** Tags applied to this resource */
    tag?: Coding;
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
interface base64Binary {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for base64Binary */
    value?: string;
}
interface code {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for code */
    value?: string;
}
interface markdown {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for markdown */
    value?: string;
}
interface oid {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for oid */
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
interface uuid {
    /** Additional content defined by implementations */
    extension?: Extension[];
    /** xml:id (or equivalent in JSON) */
    id?: string;
    /** Primitive value for uuid */
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
    copyright?: markdown;
    date?: string;
    description?: markdown;
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
    purpose?: markdown;
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
    copyright?: markdown;
    date?: string;
    derivedFromUri?: string[];
    description?: markdown;
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
    copyright?: markdown;
    currentState?: MaybeArray$1r<string[] | CodeableConcept>;
    date?: string;
    description?: markdown;
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
    purpose?: markdown;
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
    copyright?: markdown;
    date?: string;
    description?: markdown;
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
    purpose?: markdown;
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
    assertion?: markdown;
    author?: ContactDetail[];
    certainty?: BackboneElement[];
    citeAs?: string | Reference | markdown;
    contact?: ContactDetail[];
    contained?: any[];
    date?: string;
    description?: markdown;
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
    citeAs?: string | Reference | markdown;
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
    description?: markdown;
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
    extraDetails?: markdown;
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
    paymentTerms?: markdown;
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
    copyright?: markdown;
    dataRequirement?: DataRequirement[];
    date?: string;
    description?: markdown;
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
    purpose?: markdown;
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
    clinicalRecommendationStatement?: markdown;
    compositeScoring?: string[] | CodeableConcept;
    contact?: ContactDetail[];
    contained?: any[];
    copyright?: markdown;
    date?: string;
    definition?: markdown[];
    description?: markdown;
    disclaimer?: markdown;
    editor?: ContactDetail[];
    effectivePeriod?: Period;
    endorser?: ContactDetail[];
    experimental?: boolean;
    extension?: Extension[];
    group?: BackboneElement[];
    guidance?: markdown;
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
    purpose?: markdown;
    rateAggregation?: string;
    rationale?: markdown;
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
    preparationInstruction?: markdown;
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
    description?: markdown;
    domain?: string[] | CodeableConcept;
    extension?: Extension[];
    id?: string;
    identifier?: MaybeArray$C<string | Identifier>;
    implicitRules?: string;
    impurity?: CodeableReference[];
    indication?: markdown;
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
    description?: markdown;
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
    copyright?: markdown;
    date?: string;
    description?: markdown;
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
    purpose?: markdown;
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
    copyright?: markdown;
    date?: string;
    derivedFrom?: any[];
    description?: markdown;
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
    purpose?: markdown;
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
    description?: markdown;
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
    copyright?: markdown;
    date?: string;
    description?: markdown;
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
    purpose?: markdown;
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
    copyright?: markdown;
    date?: string;
    description?: markdown;
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
    purpose?: markdown;
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
    description?: markdown;
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
    description?: markdown;
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

declare const mapSystems: (obj: any) => any;
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
 * @param {string} [system] - the string system to use by default if
 */
declare const identifier: (id: string | Identifier, ...ext: any[]) => any;
/**
 * Alias for b.identifier()
 * @public
 * @function
 */
declare const id: (id: string | Identifier, ...ext: any[]) => any;
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
declare const coding: (code: string, system: string, extra?: Omit<Coding, "code" | "system">) => any;
declare const c: (code: string, system: string, extra?: Omit<Coding, "code" | "system">) => any;
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
  * @param {Identifier} [props.identifier] - Account number
  * @param {string} [props.status] - active | inactive | entered-in-error | on-hold | unknown
  * @param {CodeableConcept} [props.type] - E.g. patient, expense, depreciation
  * @param {string} [props.name] - Human-readable label
  * @param {Reference} [props.subject] - The entity that caused the expenses
  * @param {Period} [props.servicePeriod] - Transaction window
  * @param {BackboneElement} [props.coverage] - The party(s) that are responsible for covering the payment of this account, and what order should they be applied to the account
  * @param {Reference} [props.owner] - Entity managing the Account
  * @param {string} [props.description] - Explanation of purpose/use
  * @param {BackboneElement} [props.guarantor] - The parties ultimately responsible for balancing the Account
  * @param {Reference} [props.partOf] - Reference to a parent Account
  */
declare function account(type: "Account", props: Account_Props): any;
declare function account(props: Account_Props): any;
/**
  * Create a ActivityDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this activity definition, represented as a URI (globally unique)
  * @param {Identifier} [props.identifier] - Additional identifier for the activity definition
  * @param {string} [props.version] - Business version of the activity definition
  * @param {string} [props.name] - Name for this activity definition (computer friendly)
  * @param {string} [props.title] - Name for this activity definition (human friendly)
  * @param {string} [props.subtitle] - Subordinate title of the activity definition
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {CodeableConcept|Reference|canonical} [props.subject] - Type of individual the activity definition is intended for
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.description] - Natural language description of the activity definition
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {CodeableConcept} [props.jurisdiction] - Intended jurisdiction for activity definition (if applicable)
  * @param {markdown} [props.purpose] - Why this activity definition is defined
  * @param {string} [props.usage] - Describes the clinical usage of the activity definition
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {date} [props.approvalDate] - When the activity definition was approved by publisher
  * @param {date} [props.lastReviewDate] - When the activity definition was last reviewed
  * @param {Period} [props.effectivePeriod] - When the activity definition is expected to be used
  * @param {CodeableConcept} [props.topic] - E.g. Education, Treatment, Assessment, etc.
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {canonical} [props.library] - Logic used by the activity definition
  * @param {string} [props.kind] - Kind of resource
  * @param {canonical} [props.profile] - What profile the resource needs to conform to
  * @param {CodeableConcept} [props.code] - Detail type of activity
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {boolean} [props.doNotPerform] - True if the activity should not be performed
  * @param {Timing|dateTime|Age|Period|Range|Duration} [props.timing] - When activity is to occur
  * @param {Reference} [props.location] - Where it should happen
  * @param {BackboneElement} [props.participant] - Who should participate in the action
  * @param {Reference|CodeableConcept} [props.product] - What's administered/supplied
  * @param {Quantity} [props.quantity] - How much is administered/consumed/supplied
  * @param {Dosage} [props.dosage] - Detailed dosage instructions
  * @param {CodeableConcept} [props.bodySite] - What part of body to perform on
  * @param {Reference} [props.specimenRequirement] - What specimens are required to perform this action
  * @param {Reference} [props.observationRequirement] - What observations are required to perform this action
  * @param {Reference} [props.observationResultRequirement] - What observations must be produced by this action
  * @param {canonical} [props.transform] - Transform to apply the template
  * @param {BackboneElement} [props.dynamicValue] - Dynamic aspects of the definition
  */
declare function activityDefinition(type: "ActivityDefinition", props: ActivityDefinition_Props): any;
declare function activityDefinition(props: ActivityDefinition_Props): any;
/**
  * Create a AdministrableProductDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - An identifier for the administrable product
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {Reference} [props.formOf] - References a product from which one or more of the constituent parts of that product can be prepared and used as described by this administrable product
  * @param {CodeableConcept} [props.administrableDoseForm] - The dose form of the final product after necessary reconstitution or processing
  * @param {CodeableConcept} [props.unitOfPresentation] - The presentation type in which this item is given to a patient. e.g. for a spray - 'puff'
  * @param {Reference} [props.producedFrom] - Indicates the specific manufactured items that are part of the 'formOf' product that are used in the preparation of this specific administrable form
  * @param {CodeableConcept} [props.ingredient] - The ingredients of this administrable medicinal product. This is only needed if the ingredients are not specified either using ManufacturedItemDefiniton, or using by incoming references from the Ingredient resource
  * @param {Reference} [props.device] - A device that is integral to the medicinal product, in effect being considered as an "ingredient" of the medicinal product
  * @param {BackboneElement} [props.property] - Characteristics e.g. a product's onset of action
  * @param {BackboneElement} [props.routeOfAdministration] - The path by which the product is taken into or makes contact with the body
  */
declare function administrableProductDefinition(type: "AdministrableProductDefinition", props: AdministrableProductDefinition_Props): any;
declare function administrableProductDefinition(props: AdministrableProductDefinition_Props): any;
/**
  * Create a AdverseEvent resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier for the event
  * @param {string} [props.actuality] - actual | potential
  * @param {CodeableConcept} [props.category] - product-problem | product-quality | product-use-error | wrong-dose | incorrect-prescribing-information | wrong-technique | wrong-route-of-administration | wrong-rate | wrong-duration | wrong-time | expired-drug | medical-device-use-error | problem-different-manufacturer | unsafe-physical-environment
  * @param {CodeableConcept} [props.event] - Type of the event itself in relation to the subject
  * @param {Reference} [props.subject] - Subject impacted by event
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {dateTime} [props.date] - When the event occurred
  * @param {dateTime} [props.detected] - When the event was detected
  * @param {dateTime} [props.recordedDate] - When the event was recorded
  * @param {Reference} [props.resultingCondition] - Effect on the subject due to this event
  * @param {Reference} [props.location] - Location where adverse event occurred
  * @param {CodeableConcept} [props.seriousness] - Seriousness of the event
  * @param {CodeableConcept} [props.severity] - mild | moderate | severe
  * @param {CodeableConcept} [props.outcome] - resolved | recovering | ongoing | resolvedWithSequelae | fatal | unknown
  * @param {Reference} [props.recorder] - Who recorded the adverse event
  * @param {Reference} [props.contributor] - Who  was involved in the adverse event or the potential adverse event
  * @param {BackboneElement} [props.suspectEntity] - The suspected agent causing the adverse event
  * @param {Reference} [props.subjectMedicalHistory] - AdverseEvent.subjectMedicalHistory
  * @param {Reference} [props.referenceDocument] - AdverseEvent.referenceDocument
  * @param {Reference} [props.study] - AdverseEvent.study
  */
declare function adverseEvent(type: "AdverseEvent", props: AdverseEvent_Props): any;
declare function adverseEvent(props: AdverseEvent_Props): any;
/**
  * Create a AllergyIntolerance resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External ids for this item
  * @param {CodeableConcept} [props.clinicalStatus] - active | inactive | resolved
  * @param {CodeableConcept} [props.verificationStatus] - unconfirmed | confirmed | refuted | entered-in-error
  * @param {string} [props.type] - allergy | intolerance - Underlying mechanism (if known)
  * @param {string} [props.category] - food | medication | environment | biologic
  * @param {string} [props.criticality] - low | high | unable-to-assess
  * @param {CodeableConcept} [props.code] - Code that identifies the allergy or intolerance
  * @param {Reference} [props.patient] - Who the sensitivity is for
  * @param {Reference} [props.encounter] - Encounter when the allergy or intolerance was asserted
  * @param {dateTime|Age|Period|Range|string} [props.onset] - When allergy or intolerance was identified
  * @param {dateTime} [props.recordedDate] - Date first version of the resource instance was recorded
  * @param {Reference} [props.recorder] - Who recorded the sensitivity
  * @param {Reference} [props.asserter] - Source of the information about the allergy
  * @param {dateTime} [props.lastOccurrence] - Date(/time) of last known occurrence of a reaction
  * @param {Annotation} [props.note] - Additional text not captured in other fields
  * @param {BackboneElement} [props.reaction] - Adverse Reaction Events linked to exposure to substance
  */
declare function allergyIntolerance(type: "AllergyIntolerance", props: AllergyIntolerance_Props): any;
declare function allergyIntolerance(props: AllergyIntolerance_Props): any;
/**
  * Create a Appointment resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {string} [props.status] - proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error | checked-in | waitlist
  * @param {CodeableConcept} [props.cancelationReason] - The coded reason for the appointment being cancelled
  * @param {CodeableConcept} [props.serviceCategory] - A broad categorization of the service that is to be performed during this appointment
  * @param {CodeableConcept} [props.serviceType] - The specific service that is to be performed during this appointment
  * @param {CodeableConcept} [props.specialty] - The specialty of a practitioner that would be required to perform the service requested in this appointment
  * @param {CodeableConcept} [props.appointmentType] - The style of appointment or patient that has been booked in the slot (not service type)
  * @param {CodeableConcept} [props.reasonCode] - Coded reason this appointment is scheduled
  * @param {Reference} [props.reasonReference] - Reason the appointment is to take place (resource)
  * @param {unsignedInt} [props.priority] - Used to make informed decisions if needing to re-prioritize
  * @param {string} [props.description] - Shown on a subject line in a meeting request, or appointment list
  * @param {Reference} [props.supportingInformation] - Additional information to support the appointment
  * @param {instant} [props.start] - When appointment is to take place
  * @param {instant} [props.end] - When appointment is to conclude
  * @param {number} [props.minutesDuration] - Can be less than start/end (e.g. estimate)
  * @param {Reference} [props.slot] - The slots that this appointment is filling
  * @param {dateTime} [props.created] - The date that this appointment was initially created
  * @param {string} [props.comment] - Additional comments
  * @param {string} [props.patientInstruction] - Detailed information and instructions for the patient
  * @param {Reference} [props.basedOn] - The service request this appointment is allocated to assess
  * @param {BackboneElement} [props.participant] - Participants involved in appointment
  * @param {Period} [props.requestedPeriod] - Potential date/time interval(s) requested to allocate the appointment within
  */
declare function appointment(type: "Appointment", props: Appointment_Props): any;
declare function appointment(props: Appointment_Props): any;
/**
  * Create a AppointmentResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {Reference} [props.appointment] - Appointment this response relates to
  * @param {instant} [props.start] - Time from appointment, or requested new start time
  * @param {instant} [props.end] - Time from appointment, or requested new end time
  * @param {CodeableConcept} [props.participantType] - Role of participant in the appointment
  * @param {Reference} [props.actor] - Person, Location, HealthcareService, or Device
  * @param {string} [props.participantStatus] - accepted | declined | tentative | needs-action
  * @param {string} [props.comment] - Additional comments
  */
declare function appointmentResponse(type: "AppointmentResponse", props: AppointmentResponse_Props): any;
declare function appointmentResponse(props: AppointmentResponse_Props): any;
/**
  * Create a BiologicallyDerivedProduct resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External ids for this item
  * @param {string} [props.productCategory] - organ | tissue | fluid | cells | biologicalAgent
  * @param {CodeableConcept} [props.productCode] - What this biologically derived product is
  * @param {string} [props.status] - available | unavailable
  * @param {Reference} [props.request] - Procedure request
  * @param {integer} [props.quantity] - The amount of this biologically derived product
  * @param {Reference} [props.parent] - BiologicallyDerivedProduct parent
  * @param {BackboneElement} [props.collection] - How this product was collected
  * @param {BackboneElement} [props.processing] - Any processing of the product during collection
  * @param {BackboneElement} [props.manipulation] - Any manipulation of product post-collection
  * @param {BackboneElement} [props.storage] - Product storage
  */
declare function biologicallyDerivedProduct(type: "BiologicallyDerivedProduct", props: BiologicallyDerivedProduct_Props): any;
declare function biologicallyDerivedProduct(props: BiologicallyDerivedProduct_Props): any;
/**
  * Create a BodyStructure resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Bodystructure identifier
  * @param {boolean} [props.active] - Whether this record is in active use
  * @param {CodeableConcept} [props.morphology] - Kind of Structure
  * @param {CodeableConcept} [props.location] - Body site
  * @param {CodeableConcept} [props.locationQualifier] - Body site modifier
  * @param {string} [props.description] - Text description
  * @param {Attachment} [props.image] - Attached images
  * @param {Reference} [props.patient] - Who this is about
  */
declare function bodyStructure(type: "BodyStructure", props: BodyStructure_Props): any;
declare function bodyStructure(props: BodyStructure_Props): any;
/**
  * Create a CarePlan resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Ids for this plan
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - Fulfills CarePlan
  * @param {Reference} [props.replaces] - CarePlan replaced by this CarePlan
  * @param {Reference} [props.partOf] - Part of referenced CarePlan
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown
  * @param {string} [props.intent] - proposal | plan | order | option
  * @param {CodeableConcept} [props.category] - Type of plan
  * @param {string} [props.title] - Human-friendly name for the care plan
  * @param {string} [props.description] - Summary of nature of plan
  * @param {Reference} [props.subject] - Who the care plan is for
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {Period} [props.period] - Time period plan covers
  * @param {dateTime} [props.created] - Date record was first recorded
  * @param {Reference} [props.author] - Who is the designated responsible party
  * @param {Reference} [props.contributor] - Who provided the content of the care plan
  * @param {Reference} [props.careTeam] - Who's involved in plan?
  * @param {Reference} [props.addresses] - Health issues this plan addresses
  * @param {Reference} [props.supportingInfo] - Information considered as part of plan
  * @param {Reference} [props.goal] - Desired outcome of plan
  * @param {BackboneElement} [props.activity] - Action to occur as part of plan
  * @param {Annotation} [props.note] - Comments about the plan
  */
declare function carePlan(type: "CarePlan", props: CarePlan_Props): any;
declare function carePlan(props: CarePlan_Props): any;
/**
  * Create a CareTeam resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Ids for this team
  * @param {string} [props.status] - proposed | active | suspended | inactive | entered-in-error
  * @param {CodeableConcept} [props.category] - Type of team
  * @param {string} [props.name] - Name of the team, such as crisis assessment team
  * @param {Reference} [props.subject] - Who care team is for
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {Period} [props.period] - Time period team covers
  * @param {BackboneElement} [props.participant] - Members of the team
  * @param {CodeableConcept} [props.reasonCode] - Why the care team exists
  * @param {Reference} [props.reasonReference] - Why the care team exists
  * @param {Reference} [props.managingOrganization] - Organization responsible for the care team
  * @param {ContactPoint} [props.telecom] - A contact detail for the care team (that applies to all members)
  * @param {Annotation} [props.note] - Comments made about the CareTeam
  */
declare function careTeam(type: "CareTeam", props: CareTeam_Props): any;
declare function careTeam(props: CareTeam_Props): any;
/**
  * Create a ChargeItem resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for item
  * @param {string} [props.definitionUri] - Defining information about the code of this charge item
  * @param {canonical} [props.definitionCanonical] - Resource defining the code of this ChargeItem
  * @param {string} [props.status] - planned | billable | not-billable | aborted | billed | entered-in-error | unknown
  * @param {Reference} [props.partOf] - Part of referenced ChargeItem
  * @param {CodeableConcept} [props.code] - A code that identifies the charge, like a billing code
  * @param {Reference} [props.subject] - Individual service was done for/to
  * @param {Reference} [props.context] - Encounter / Episode associated with event
  * @param {dateTime|Period|Timing} [props.occurrence] - When the charged service was applied
  * @param {BackboneElement} [props.performer] - Who performed charged service
  * @param {Reference} [props.performingOrganization] - Organization providing the charged service
  * @param {Reference} [props.requestingOrganization] - Organization requesting the charged service
  * @param {Reference} [props.costCenter] - Organization that has ownership of the (potential, future) revenue
  * @param {Quantity} [props.quantity] - Quantity of which the charge item has been serviced
  * @param {CodeableConcept} [props.bodysite] - Anatomical location, if relevant
  * @param {decimal} [props.factorOverride] - Factor overriding the associated rules
  * @param {Money} [props.priceOverride] - Price overriding the associated rules
  * @param {string} [props.overrideReason] - Reason for overriding the list price/factor
  * @param {Reference} [props.enterer] - Individual who was entering
  * @param {dateTime} [props.enteredDate] - Date the charge item was entered
  * @param {CodeableConcept} [props.reason] - Why was the charged  service rendered?
  * @param {Reference} [props.service] - Which rendered service is being charged?
  * @param {Reference|CodeableConcept} [props.product] - Product charged
  * @param {Reference} [props.account] - Account to place this charge
  * @param {Annotation} [props.note] - Comments made about the ChargeItem
  * @param {Reference} [props.supportingInformation] - Further information supporting this charge
  */
declare function chargeItem(type: "ChargeItem", props: ChargeItem_Props): any;
declare function chargeItem(props: ChargeItem_Props): any;
/**
  * Create a ChargeItemDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this charge item definition, represented as a URI (globally unique)
  * @param {Identifier} [props.identifier] - Additional identifier for the charge item definition
  * @param {string} [props.version] - Business version of the charge item definition
  * @param {string} [props.title] - Name for this charge item definition (human friendly)
  * @param {string} [props.derivedFromUri] - Underlying externally-defined charge item definition
  * @param {canonical} [props.partOf] - A larger definition of which this particular definition is a component or step
  * @param {canonical} [props.replaces] - Completed or terminated request(s) whose function is taken by this new request
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.description] - Natural language description of the charge item definition
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {CodeableConcept} [props.jurisdiction] - Intended jurisdiction for charge item definition (if applicable)
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {date} [props.approvalDate] - When the charge item definition was approved by publisher
  * @param {date} [props.lastReviewDate] - When the charge item definition was last reviewed
  * @param {Period} [props.effectivePeriod] - When the charge item definition is expected to be used
  * @param {CodeableConcept} [props.code] - Billing codes or product types this definition applies to
  * @param {Reference} [props.instance] - Instances this definition applies to
  * @param {BackboneElement} [props.applicability] - Whether or not the billing code is applicable
  * @param {BackboneElement} [props.propertyGroup] - Group of properties which are applicable under the same conditions
  */
declare function chargeItemDefinition(type: "ChargeItemDefinition", props: ChargeItemDefinition_Props): any;
declare function chargeItemDefinition(props: ChargeItemDefinition_Props): any;
/**
  * Create a Citation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this citation, represented as a globally unique URI
  * @param {Identifier} [props.identifier] - Identifier for the Citation resource itself
  * @param {string} [props.version] - Business version of the citation
  * @param {string} [props.name] - Name for this citation (computer friendly)
  * @param {string} [props.title] - Name for this citation (human friendly)
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.publisher] - The publisher of the Citation, not the publisher of the article or artifact being cited
  * @param {ContactDetail} [props.contact] - Contact details for the publisher of the Citation Resource
  * @param {markdown} [props.description] - Natural language description of the citation
  * @param {UsageContext} [props.useContext] - The context that the Citation Resource content is intended to support
  * @param {CodeableConcept} [props.jurisdiction] - Intended jurisdiction for citation (if applicable)
  * @param {markdown} [props.purpose] - Why this citation is defined
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions for the Citation, not for the cited artifact
  * @param {date} [props.approvalDate] - When the citation was approved by publisher
  * @param {date} [props.lastReviewDate] - When the citation was last reviewed
  * @param {Period} [props.effectivePeriod] - When the citation is expected to be used
  * @param {ContactDetail} [props.author] - Who authored the Citation
  * @param {ContactDetail} [props.editor] - Who edited the Citation
  * @param {ContactDetail} [props.reviewer] - Who reviewed the Citation
  * @param {ContactDetail} [props.endorser] - Who endorsed the Citation
  * @param {BackboneElement} [props.summary] - A human-readable display of the citation
  * @param {BackboneElement} [props.classification] - The assignment to an organizing scheme
  * @param {Annotation} [props.note] - Used for general notes and annotations not coded elsewhere
  * @param {CodeableConcept} [props.currentState] - The status of the citation
  * @param {BackboneElement} [props.statusDate] - An effective date or period for a status of the citation
  * @param {BackboneElement} [props.relatesTo] - Artifact related to the Citation Resource
  * @param {BackboneElement} [props.citedArtifact] - The article or artifact being described
  */
declare function citation(type: "Citation", props: Citation_Props): any;
declare function citation(props: Citation_Props): any;
/**
  * Create a Claim resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for claim
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {CodeableConcept} [props.type] - Category or discipline
  * @param {CodeableConcept} [props.subType] - More granular claim type
  * @param {string} [props.use] - claim | preauthorization | predetermination
  * @param {Reference} [props.patient] - The recipient of the products and services
  * @param {Period} [props.billablePeriod] - Relevant time frame for the claim
  * @param {dateTime} [props.created] - Resource creation date
  * @param {Reference} [props.enterer] - Author of the claim
  * @param {Reference} [props.insurer] - Target
  * @param {Reference} [props.provider] - Party responsible for the claim
  * @param {CodeableConcept} [props.priority] - Desired processing ugency
  * @param {CodeableConcept} [props.fundsReserve] - For whom to reserve funds
  * @param {BackboneElement} [props.related] - Prior or corollary claims
  * @param {Reference} [props.prescription] - Prescription authorizing services and products
  * @param {Reference} [props.originalPrescription] - Original prescription if superseded by fulfiller
  * @param {BackboneElement} [props.payee] - Recipient of benefits payable
  * @param {Reference} [props.referral] - Treatment referral
  * @param {Reference} [props.facility] - Servicing facility
  * @param {BackboneElement} [props.careTeam] - Members of the care team
  * @param {BackboneElement} [props.supportingInfo] - Supporting information
  * @param {BackboneElement} [props.diagnosis] - Pertinent diagnosis information
  * @param {BackboneElement} [props.procedure] - Clinical procedures performed
  * @param {BackboneElement} [props.insurance] - Patient insurance information
  * @param {BackboneElement} [props.accident] - Details of the event
  * @param {BackboneElement} [props.item] - Product or service provided
  * @param {Money} [props.total] - Total claim cost
  */
declare function claim(type: "Claim", props: Claim_Props): any;
declare function claim(props: Claim_Props): any;
/**
  * Create a ClaimResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for a claim response
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {CodeableConcept} [props.type] - More granular claim type
  * @param {CodeableConcept} [props.subType] - More granular claim type
  * @param {string} [props.use] - claim | preauthorization | predetermination
  * @param {Reference} [props.patient] - The recipient of the products and services
  * @param {dateTime} [props.created] - Response creation date
  * @param {Reference} [props.insurer] - Party responsible for reimbursement
  * @param {Reference} [props.requestor] - Party responsible for the claim
  * @param {Reference} [props.request] - Id of resource triggering adjudication
  * @param {string} [props.outcome] - queued | complete | error | partial
  * @param {string} [props.disposition] - Disposition Message
  * @param {string} [props.preAuthRef] - Preauthorization reference
  * @param {Period} [props.preAuthPeriod] - Preauthorization reference effective period
  * @param {CodeableConcept} [props.payeeType] - Party to be paid any benefits payable
  * @param {BackboneElement} [props.item] - Adjudication for claim line items
  * @param {BackboneElement} [props.addItem] - Insurer added line items
  * @param {any} [props.adjudication] - Header-level adjudication
  * @param {BackboneElement} [props.total] - Adjudication totals
  * @param {BackboneElement} [props.payment] - Payment Details
  * @param {CodeableConcept} [props.fundsReserve] - Funds reserved status
  * @param {CodeableConcept} [props.formCode] - Printed form identifier
  * @param {Attachment} [props.form] - Printed reference or actual form
  * @param {BackboneElement} [props.processNote] - Note concerning adjudication
  * @param {Reference} [props.communicationRequest] - Request for additional information
  * @param {BackboneElement} [props.insurance] - Patient insurance information
  * @param {BackboneElement} [props.error] - Processing errors
  */
declare function claimResponse(type: "ClaimResponse", props: ClaimResponse_Props): any;
declare function claimResponse(props: ClaimResponse_Props): any;
/**
  * Create a ClinicalImpression resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {string} [props.status] - in-progress | completed | entered-in-error
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {CodeableConcept} [props.code] - Kind of assessment performed
  * @param {string} [props.description] - Why/how the assessment was performed
  * @param {Reference} [props.subject] - Patient or group assessed
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {dateTime|Period} [props.effective] - Time of assessment
  * @param {dateTime} [props.date] - When the assessment was documented
  * @param {Reference} [props.assessor] - The clinician performing the assessment
  * @param {Reference} [props.previous] - Reference to last assessment
  * @param {Reference} [props.problem] - Relevant impressions of patient state
  * @param {BackboneElement} [props.investigation] - One or more sets of investigations (signs, symptoms, etc.)
  * @param {string} [props.protocol] - Clinical Protocol followed
  * @param {string} [props.summary] - Summary of the assessment
  * @param {BackboneElement} [props.finding] - Possible or likely findings and diagnoses
  * @param {CodeableConcept} [props.prognosisCodeableConcept] - Estimate of likely outcome
  * @param {Reference} [props.prognosisReference] - RiskAssessment expressing likely outcome
  * @param {Reference} [props.supportingInfo] - Information supporting the clinical impression
  * @param {Annotation} [props.note] - Comments made about the ClinicalImpression
  */
declare function clinicalImpression(type: "ClinicalImpression", props: ClinicalImpression_Props): any;
declare function clinicalImpression(props: ClinicalImpression_Props): any;
/**
  * Create a ClinicalUseDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier for this issue
  * @param {string} [props.type] - indication | contraindication | interaction | undesirable-effect | warning
  * @param {CodeableConcept} [props.category] - A categorisation of the issue, primarily for dividing warnings into subject heading areas such as "Pregnancy", "Overdose"
  * @param {Reference} [props.subject] - The medication or procedure for which this is an indication
  * @param {CodeableConcept} [props.status] - Whether this is a current issue or one that has been retired etc
  * @param {BackboneElement} [props.contraindication] - Specifics for when this is a contraindication
  * @param {BackboneElement} [props.indication] - Specifics for when this is an indication
  * @param {BackboneElement} [props.interaction] - Specifics for when this is an interaction
  * @param {Reference} [props.population] - The population group to which this applies
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
  * @param {Identifier} [props.identifier] - Unique identifier
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - Request fulfilled by this communication
  * @param {Reference} [props.partOf] - Part of this action
  * @param {Reference} [props.inResponseTo] - Reply to
  * @param {string} [props.status] - preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {CodeableConcept} [props.category] - Message category
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {CodeableConcept} [props.medium] - A channel of communication
  * @param {Reference} [props.subject] - Focus of message
  * @param {CodeableConcept} [props.topic] - Description of the purpose/content
  * @param {Reference} [props.about] - Resources that pertain to this communication
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {dateTime} [props.sent] - When sent
  * @param {dateTime} [props.received] - When received
  * @param {Reference} [props.recipient] - Message recipient
  * @param {Reference} [props.sender] - Message sender
  * @param {CodeableConcept} [props.reasonCode] - Indication for message
  * @param {Reference} [props.reasonReference] - Why was communication done?
  * @param {BackboneElement} [props.payload] - Message payload
  * @param {Annotation} [props.note] - Comments made about the communication
  */
declare function communication(type: "Communication", props: Communication_Props): any;
declare function communication(props: Communication_Props): any;
/**
  * Create a CommunicationRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Unique identifier
  * @param {Reference} [props.basedOn] - Fulfills plan or proposal
  * @param {Reference} [props.replaces] - Request(s) replaced by this request
  * @param {Identifier} [props.groupIdentifier] - Composite request this is part of
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {CodeableConcept} [props.category] - Message category
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {boolean} [props.doNotPerform] - True if request is prohibiting action
  * @param {CodeableConcept} [props.medium] - A channel of communication
  * @param {Reference} [props.subject] - Focus of message
  * @param {Reference} [props.about] - Resources that pertain to this communication request
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {BackboneElement} [props.payload] - Message payload
  * @param {dateTime|Period} [props.occurrence] - When scheduled
  * @param {dateTime} [props.authoredOn] - When request transitioned to being actionable
  * @param {Reference} [props.requester] - Who/what is requesting service
  * @param {Reference} [props.recipient] - Message recipient
  * @param {Reference} [props.sender] - Message sender
  * @param {CodeableConcept} [props.reasonCode] - Why is communication needed?
  * @param {Reference} [props.reasonReference] - Why is communication needed?
  * @param {Annotation} [props.note] - Comments made about communication request
  */
declare function communicationRequest(type: "CommunicationRequest", props: CommunicationRequest_Props): any;
declare function communicationRequest(props: CommunicationRequest_Props): any;
/**
  * Create a Contract resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Contract number
  * @param {string} [props.url] - Basal definition
  * @param {string} [props.version] - Business edition
  * @param {string} [props.status] - amended | appended | cancelled | disputed | entered-in-error | executable | executed | negotiable | offered | policy | rejected | renewed | revoked | resolved | terminated
  * @param {CodeableConcept} [props.legalState] - Negotiation status
  * @param {Reference} [props.instantiatesCanonical] - Source Contract Definition
  * @param {string} [props.instantiatesUri] - External Contract Definition
  * @param {CodeableConcept} [props.contentDerivative] - Content derived from the basal information
  * @param {dateTime} [props.issued] - When this Contract was issued
  * @param {Period} [props.applies] - Effective time
  * @param {CodeableConcept} [props.expirationType] - Contract cessation cause
  * @param {Reference} [props.subject] - Contract Target Entity
  * @param {Reference} [props.authority] - Authority under which this Contract has standing
  * @param {Reference} [props.domain] - A sphere of control governed by an authoritative jurisdiction, organization, or person
  * @param {Reference} [props.site] - Specific Location
  * @param {string} [props.name] - Computer friendly designation
  * @param {string} [props.title] - Human Friendly name
  * @param {string} [props.subtitle] - Subordinate Friendly name
  * @param {string} [props.alias] - Acronym or short name
  * @param {Reference} [props.author] - Source of Contract
  * @param {CodeableConcept} [props.scope] - Range of Legal Concerns
  * @param {CodeableConcept|Reference} [props.topic] - Focus of contract interest
  * @param {CodeableConcept} [props.type] - Legal instrument category
  * @param {CodeableConcept} [props.subType] - Subtype within the context of type
  * @param {BackboneElement} [props.contentDefinition] - Contract precursor content
  * @param {BackboneElement} [props.term] - Contract Term List
  * @param {Reference} [props.supportingInfo] - Extra Information
  * @param {Reference} [props.relevantHistory] - Key event in Contract History
  * @param {BackboneElement} [props.signer] - Contract Signatory
  * @param {BackboneElement} [props.friendly] - Contract Friendly Language
  * @param {BackboneElement} [props.legal] - Contract Legal Language
  * @param {BackboneElement} [props.rule] - Computable Contract Language
  * @param {Attachment|Reference} [props.legallyBinding] - Binding Contract
  */
declare function contract(type: "Contract", props: Contract_Props): any;
declare function contract(props: Contract_Props): any;
/**
  * Create a Coverage resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for the coverage
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {CodeableConcept} [props.type] - Coverage category such as medical or accident
  * @param {Reference} [props.policyHolder] - Owner of the policy
  * @param {Reference} [props.subscriber] - Subscriber to the policy
  * @param {string} [props.subscriberId] - ID assigned to the subscriber
  * @param {Reference} [props.beneficiary] - Plan beneficiary
  * @param {string} [props.dependent] - Dependent number
  * @param {CodeableConcept} [props.relationship] - Beneficiary relationship to the subscriber
  * @param {Period} [props.period] - Coverage start and end dates
  * @param {Reference} [props.payor] - Issuer of the policy
  * @param {BackboneElement} [props.class] - Additional coverage classifications
  * @param {number} [props.order] - Relative order of the coverage
  * @param {string} [props.network] - Insurer network
  * @param {BackboneElement} [props.costToBeneficiary] - Patient payments for services/products
  * @param {boolean} [props.subrogation] - Reimbursement to insurer
  * @param {Reference} [props.contract] - Contract details
  */
declare function coverage(type: "Coverage", props: Coverage_Props): any;
declare function coverage(props: Coverage_Props): any;
/**
  * Create a CoverageEligibilityRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for coverage eligiblity request
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {CodeableConcept} [props.priority] - Desired processing priority
  * @param {string} [props.purpose] - auth-requirements | benefits | discovery | validation
  * @param {Reference} [props.patient] - Intended recipient of products and services
  * @param {date|Period} [props.serviced] - Estimated date or dates of service
  * @param {dateTime} [props.created] - Creation date
  * @param {Reference} [props.enterer] - Author
  * @param {Reference} [props.provider] - Party responsible for the request
  * @param {Reference} [props.insurer] - Coverage issuer
  * @param {Reference} [props.facility] - Servicing facility
  * @param {BackboneElement} [props.supportingInfo] - Supporting information
  * @param {BackboneElement} [props.insurance] - Patient insurance information
  * @param {BackboneElement} [props.item] - Item to be evaluated for eligibiity
  */
declare function coverageEligibilityRequest(type: "CoverageEligibilityRequest", props: CoverageEligibilityRequest_Props): any;
declare function coverageEligibilityRequest(props: CoverageEligibilityRequest_Props): any;
/**
  * Create a CoverageEligibilityResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for coverage eligiblity request
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {string} [props.purpose] - auth-requirements | benefits | discovery | validation
  * @param {Reference} [props.patient] - Intended recipient of products and services
  * @param {date|Period} [props.serviced] - Estimated date or dates of service
  * @param {dateTime} [props.created] - Response creation date
  * @param {Reference} [props.requestor] - Party responsible for the request
  * @param {Reference} [props.request] - Eligibility request reference
  * @param {string} [props.outcome] - queued | complete | error | partial
  * @param {string} [props.disposition] - Disposition Message
  * @param {Reference} [props.insurer] - Coverage issuer
  * @param {BackboneElement} [props.insurance] - Patient insurance information
  * @param {string} [props.preAuthRef] - Preauthorization reference
  * @param {CodeableConcept} [props.form] - Printed form identifier
  * @param {BackboneElement} [props.error] - Processing errors
  */
declare function coverageEligibilityResponse(type: "CoverageEligibilityResponse", props: CoverageEligibilityResponse_Props): any;
declare function coverageEligibilityResponse(props: CoverageEligibilityResponse_Props): any;
/**
  * Create a DetectedIssue resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Unique id for the detected issue
  * @param {string} [props.status] - registered | preliminary | final | amended +
  * @param {CodeableConcept} [props.code] - Issue Category, e.g. drug-drug, duplicate therapy, etc.
  * @param {string} [props.severity] - high | moderate | low
  * @param {Reference} [props.patient] - Associated patient
  * @param {dateTime|Period} [props.identified] - When identified
  * @param {Reference} [props.author] - The provider or device that identified the issue
  * @param {Reference} [props.implicated] - Problem resource
  * @param {BackboneElement} [props.evidence] - Supporting evidence
  * @param {string} [props.detail] - Description and context
  * @param {string} [props.reference] - Authority for issue
  * @param {BackboneElement} [props.mitigation] - Step taken to address
  */
declare function detectedIssue(type: "DetectedIssue", props: DetectedIssue_Props): any;
declare function detectedIssue(props: DetectedIssue_Props): any;
/**
  * Create a Device resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Instance identifier
  * @param {Reference} [props.definition] - The reference to the definition for the device
  * @param {BackboneElement} [props.udiCarrier] - Unique Device Identifier (UDI) Barcode string
  * @param {string} [props.status] - active | inactive | entered-in-error | unknown
  * @param {CodeableConcept} [props.statusReason] - online | paused | standby | offline | not-ready | transduc-discon | hw-discon | off
  * @param {string} [props.distinctIdentifier] - The distinct identification string
  * @param {string} [props.manufacturer] - Name of device manufacturer
  * @param {dateTime} [props.manufactureDate] - Date when the device was made
  * @param {dateTime} [props.expirationDate] - Date and time of expiry of this device (if applicable)
  * @param {string} [props.lotNumber] - Lot number of manufacture
  * @param {string} [props.serialNumber] - Serial number assigned by the manufacturer
  * @param {BackboneElement} [props.deviceName] - The name of the device as given by the manufacturer
  * @param {string} [props.modelNumber] - The manufacturer's model number for the device
  * @param {string} [props.partNumber] - The part number or catalog number of the device
  * @param {CodeableConcept} [props.type] - The kind or type of device
  * @param {BackboneElement} [props.specialization] - The capabilities supported on a  device, the standards to which the device conforms for a particular purpose, and used for the communication
  * @param {BackboneElement} [props.version] - The actual design of the device or software version running on the device
  * @param {BackboneElement} [props.property] - The actual configuration settings of a device as it actually operates, e.g., regulation status, time properties
  * @param {Reference} [props.patient] - Patient to whom Device is affixed
  * @param {Reference} [props.owner] - Organization responsible for device
  * @param {ContactPoint} [props.contact] - Details for human/organization for support
  * @param {Reference} [props.location] - Where the device is found
  * @param {string} [props.url] - Network address to contact device
  * @param {Annotation} [props.note] - Device notes and comments
  * @param {CodeableConcept} [props.safety] - Safety Characteristics of Device
  * @param {Reference} [props.parent] - The device that this device is attached to or is part of
  */
declare function device(type: "Device", props: Device_Props): any;
declare function device(props: Device_Props): any;
/**
  * Create a DeviceDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Instance identifier
  * @param {BackboneElement} [props.udiDeviceIdentifier] - Unique Device Identifier (UDI) Barcode string
  * @param {string|Reference} [props.manufacturer] - Name of device manufacturer
  * @param {BackboneElement} [props.deviceName] - A name given to the device to identify it
  * @param {string} [props.modelNumber] - The model number for the device
  * @param {CodeableConcept} [props.type] - What kind of device or device system this is
  * @param {BackboneElement} [props.specialization] - The capabilities supported on a  device, the standards to which the device conforms for a particular purpose, and used for the communication
  * @param {string} [props.version] - Available versions
  * @param {CodeableConcept} [props.safety] - Safety characteristics of the device
  * @param {ProductShelfLife} [props.shelfLifeStorage] - Shelf Life and storage information
  * @param {ProdCharacteristic} [props.physicalCharacteristics] - Dimensions, color etc.
  * @param {CodeableConcept} [props.languageCode] - Language code for the human-readable text strings produced by the device (all supported)
  * @param {BackboneElement} [props.capability] - Device capabilities
  * @param {BackboneElement} [props.property] - The actual configuration settings of a device as it actually operates, e.g., regulation status, time properties
  * @param {Reference} [props.owner] - Organization responsible for device
  * @param {ContactPoint} [props.contact] - Details for human/organization for support
  * @param {string} [props.url] - Network address to contact device
  * @param {string} [props.onlineInformation] - Access to on-line information
  * @param {Annotation} [props.note] - Device notes and comments
  * @param {Quantity} [props.quantity] - The quantity of the device present in the packaging (e.g. the number of devices present in a pack, or the number of devices in the same package of the medicinal product)
  * @param {Reference} [props.parentDevice] - The parent device it can be part of
  * @param {BackboneElement} [props.material] - A substance used to create the material(s) of which the device is made
  */
declare function deviceDefinition(type: "DeviceDefinition", props: DeviceDefinition_Props): any;
declare function deviceDefinition(props: DeviceDefinition_Props): any;
/**
  * Create a DeviceMetric resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Instance identifier
  * @param {CodeableConcept} [props.type] - Identity of metric, for example Heart Rate or PEEP Setting
  * @param {CodeableConcept} [props.unit] - Unit of Measure for the Metric
  * @param {Reference} [props.source] - Describes the link to the source Device
  * @param {Reference} [props.parent] - Describes the link to the parent Device
  * @param {string} [props.operationalStatus] - on | off | standby | entered-in-error
  * @param {string} [props.color] - black | red | green | yellow | blue | magenta | cyan | white
  * @param {string} [props.category] - measurement | setting | calculation | unspecified
  * @param {Timing} [props.measurementPeriod] - Describes the measurement repetition time
  * @param {BackboneElement} [props.calibration] - Describes the calibrations that have been performed or that are required to be performed
  */
declare function deviceMetric(type: "DeviceMetric", props: DeviceMetric_Props): any;
declare function deviceMetric(props: DeviceMetric_Props): any;
/**
  * Create a DeviceRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Request identifier
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {Reference} [props.priorRequest] - What request replaces
  * @param {Identifier} [props.groupIdentifier] - Identifier of composite request
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {Reference|CodeableConcept} [props.code] - Device requested
  * @param {BackboneElement} [props.parameter] - Device details
  * @param {Reference} [props.subject] - Focus of request
  * @param {Reference} [props.encounter] - Encounter motivating request
  * @param {dateTime|Period|Timing} [props.occurrence] - Desired time or schedule for use
  * @param {dateTime} [props.authoredOn] - When recorded
  * @param {Reference} [props.requester] - Who/what is requesting diagnostics
  * @param {CodeableConcept} [props.performerType] - Filler role
  * @param {Reference} [props.performer] - Requested Filler
  * @param {CodeableConcept} [props.reasonCode] - Coded Reason for request
  * @param {Reference} [props.reasonReference] - Linked Reason for request
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {Reference} [props.supportingInfo] - Additional clinical information
  * @param {Annotation} [props.note] - Notes or comments
  * @param {Reference} [props.relevantHistory] - Request provenance
  */
declare function deviceRequest(type: "DeviceRequest", props: DeviceRequest_Props): any;
declare function deviceRequest(props: DeviceRequest_Props): any;
/**
  * Create a DeviceUseStatement resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External identifier for this record
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal or order
  * @param {string} [props.status] - active | completed | entered-in-error +
  * @param {Reference} [props.subject] - Patient using device
  * @param {Reference} [props.derivedFrom] - Supporting information
  * @param {Timing|Period|dateTime} [props.timing] - How often  the device was used
  * @param {dateTime} [props.recordedOn] - When statement was recorded
  * @param {Reference} [props.source] - Who made the statement
  * @param {Reference} [props.device] - Reference to device used
  * @param {CodeableConcept} [props.reasonCode] - Why device was used
  * @param {Reference} [props.reasonReference] - Why was DeviceUseStatement performed?
  * @param {CodeableConcept} [props.bodySite] - Target body site
  * @param {Annotation} [props.note] - Addition details (comments, instructions)
  */
declare function deviceUseStatement(type: "DeviceUseStatement", props: DeviceUseStatement_Props): any;
declare function deviceUseStatement(props: DeviceUseStatement_Props): any;
/**
  * Create a DiagnosticReport resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier for report
  * @param {Reference} [props.basedOn] - What was requested
  * @param {string} [props.status] - registered | partial | preliminary | final +
  * @param {CodeableConcept} [props.category] - Service category
  * @param {CodeableConcept} [props.code] - Name/Code for this diagnostic report
  * @param {Reference} [props.subject] - The subject of the report - usually, but not always, the patient
  * @param {Reference} [props.encounter] - Health care event when test ordered
  * @param {dateTime|Period} [props.effective] - Clinically relevant time/time-period for report
  * @param {instant} [props.issued] - DateTime this version was made
  * @param {Reference} [props.performer] - Responsible Diagnostic Service
  * @param {Reference} [props.resultsInterpreter] - Primary result interpreter
  * @param {Reference} [props.specimen] - Specimens this report is based on
  * @param {Reference} [props.result] - Observations
  * @param {Reference} [props.imagingStudy] - Reference to full details of imaging associated with the diagnostic report
  * @param {BackboneElement} [props.media] - Key images associated with this report
  * @param {string} [props.conclusion] - Clinical conclusion (interpretation) of test results
  * @param {CodeableConcept} [props.conclusionCode] - Codes for the clinical conclusion of test results
  * @param {Attachment} [props.presentedForm] - Entire report as issued
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
  * @param {Identifier} [props.identifier] - Identifier(s) by which this encounter is known
  * @param {string} [props.status] - planned | arrived | triaged | in-progress | onleave | finished | cancelled +
  * @param {BackboneElement} [props.statusHistory] - List of past encounter statuses
  * @param {Coding} [props.class] - Classification of patient encounter
  * @param {BackboneElement} [props.classHistory] - List of past encounter classes
  * @param {CodeableConcept} [props.type] - Specific type of encounter
  * @param {CodeableConcept} [props.serviceType] - Specific type of service
  * @param {CodeableConcept} [props.priority] - Indicates the urgency of the encounter
  * @param {Reference} [props.subject] - The patient or group present at the encounter
  * @param {Reference} [props.episodeOfCare] - Episode(s) of care that this encounter should be recorded against
  * @param {Reference} [props.basedOn] - The ServiceRequest that initiated this encounter
  * @param {BackboneElement} [props.participant] - List of participants involved in the encounter
  * @param {Reference} [props.appointment] - The appointment that scheduled this encounter
  * @param {Period} [props.period] - The start and end time of the encounter
  * @param {Duration} [props.length] - Quantity of time the encounter lasted (less time absent)
  * @param {CodeableConcept} [props.reasonCode] - Coded reason the encounter takes place
  * @param {Reference} [props.reasonReference] - Reason the encounter takes place (reference)
  * @param {BackboneElement} [props.diagnosis] - The list of diagnosis relevant to this encounter
  * @param {Reference} [props.account] - The set of accounts that may be used for billing for this Encounter
  * @param {BackboneElement} [props.hospitalization] - Details about the admission to a healthcare service
  * @param {BackboneElement} [props.location] - List of locations where the patient has been
  * @param {Reference} [props.serviceProvider] - The organization (facility) responsible for this encounter
  * @param {Reference} [props.partOf] - Another Encounter this encounter is part of
  */
declare function encounter(type: "Encounter", props: Encounter_Props): any;
declare function encounter(props: Encounter_Props): any;
/**
  * Create a EnrollmentRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {dateTime} [props.created] - Creation date
  * @param {Reference} [props.insurer] - Target
  * @param {Reference} [props.provider] - Responsible practitioner
  * @param {Reference} [props.candidate] - The subject to be enrolled
  * @param {Reference} [props.coverage] - Insurance information
  */
declare function enrollmentRequest(type: "EnrollmentRequest", props: EnrollmentRequest_Props): any;
declare function enrollmentRequest(props: EnrollmentRequest_Props): any;
/**
  * Create a EnrollmentResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {Reference} [props.request] - Claim reference
  * @param {string} [props.outcome] - queued | complete | error | partial
  * @param {string} [props.disposition] - Disposition Message
  * @param {dateTime} [props.created] - Creation date
  * @param {Reference} [props.organization] - Insurer
  * @param {Reference} [props.requestProvider] - Responsible practitioner
  */
declare function enrollmentResponse(type: "EnrollmentResponse", props: EnrollmentResponse_Props): any;
declare function enrollmentResponse(props: EnrollmentResponse_Props): any;
/**
  * Create a EpisodeOfCare resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier(s) relevant for this EpisodeOfCare
  * @param {string} [props.status] - planned | waitlist | active | onhold | finished | cancelled | entered-in-error
  * @param {BackboneElement} [props.statusHistory] - Past list of status codes (the current status may be included to cover the start date of the status)
  * @param {CodeableConcept} [props.type] - Type/class  - e.g. specialist referral, disease management
  * @param {BackboneElement} [props.diagnosis] - The list of diagnosis relevant to this episode of care
  * @param {Reference} [props.patient] - The patient who is the focus of this episode of care
  * @param {Reference} [props.managingOrganization] - Organization that assumes care
  * @param {Period} [props.period] - Interval during responsibility is assumed
  * @param {Reference} [props.referralRequest] - Originating Referral Request(s)
  * @param {Reference} [props.careManager] - Care manager/care coordinator for the patient
  * @param {Reference} [props.team] - Other practitioners facilitating this episode of care
  * @param {Reference} [props.account] - The set of accounts that may be used for billing for this EpisodeOfCare
  */
declare function episodeOfCare(type: "EpisodeOfCare", props: EpisodeOfCare_Props): any;
declare function episodeOfCare(props: EpisodeOfCare_Props): any;
/**
  * Create a EventDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this event definition, represented as a URI (globally unique)
  * @param {Identifier} [props.identifier] - Additional identifier for the event definition
  * @param {string} [props.version] - Business version of the event definition
  * @param {string} [props.name] - Name for this event definition (computer friendly)
  * @param {string} [props.title] - Name for this event definition (human friendly)
  * @param {string} [props.subtitle] - Subordinate title of the event definition
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {CodeableConcept|Reference} [props.subject] - Type of individual the event definition is focused on
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.description] - Natural language description of the event definition
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {CodeableConcept} [props.jurisdiction] - Intended jurisdiction for event definition (if applicable)
  * @param {markdown} [props.purpose] - Why this event definition is defined
  * @param {string} [props.usage] - Describes the clinical usage of the event definition
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {date} [props.approvalDate] - When the event definition was approved by publisher
  * @param {date} [props.lastReviewDate] - When the event definition was last reviewed
  * @param {Period} [props.effectivePeriod] - When the event definition is expected to be used
  * @param {CodeableConcept} [props.topic] - E.g. Education, Treatment, Assessment, etc.
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {TriggerDefinition} [props.trigger] - "when" the event occurs (multiple = 'or')
  */
declare function eventDefinition(type: "EventDefinition", props: EventDefinition_Props): any;
declare function eventDefinition(props: EventDefinition_Props): any;
/**
  * Create a Evidence resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this evidence, represented as a globally unique URI
  * @param {Identifier} [props.identifier] - Additional identifier for the summary
  * @param {string} [props.version] - Business version of this summary
  * @param {string} [props.title] - Name for this summary (human friendly)
  * @param {Reference|markdown} [props.citeAs] - Citation for this evidence
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {dateTime} [props.date] - Date last changed
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {date} [props.approvalDate] - When the summary was approved by publisher
  * @param {date} [props.lastReviewDate] - When the summary was last reviewed
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {RelatedArtifact} [props.relatedArtifact] - Link or citation to artifact associated with the summary
  * @param {markdown} [props.description] - Description of the particular summary
  * @param {markdown} [props.assertion] - Declarative description of the Evidence
  * @param {Annotation} [props.note] - Footnotes and/or explanatory notes
  * @param {BackboneElement} [props.variableDefinition] - Evidence variable such as population, exposure, or outcome
  * @param {CodeableConcept} [props.synthesisType] - The method to combine studies
  * @param {CodeableConcept} [props.studyType] - The type of study that produced this evidence
  * @param {BackboneElement} [props.statistic] - Values and parameters for a single statistic
  * @param {BackboneElement} [props.certainty] - Certainty or quality of the evidence
  */
declare function evidence(type: "Evidence", props: Evidence_Props): any;
declare function evidence(props: Evidence_Props): any;
/**
  * Create a EvidenceReport resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this EvidenceReport, represented as a globally unique URI
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {Identifier} [props.identifier] - Unique identifier for the evidence report
  * @param {Identifier} [props.relatedIdentifier] - Identifiers for articles that may relate to more than one evidence report
  * @param {Reference|markdown} [props.citeAs] - Citation for this report
  * @param {CodeableConcept} [props.type] - Kind of report
  * @param {Annotation} [props.note] - Used for footnotes and annotations
  * @param {RelatedArtifact} [props.relatedArtifact] - Link, description or reference to artifact associated with the report
  * @param {BackboneElement} [props.subject] - Focus of the report
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {BackboneElement} [props.relatesTo] - Relationships to other compositions/documents
  * @param {BackboneElement} [props.section] - Composition is broken into sections
  */
declare function evidenceReport(type: "EvidenceReport", props: EvidenceReport_Props): any;
declare function evidenceReport(props: EvidenceReport_Props): any;
/**
  * Create a EvidenceVariable resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this evidence variable, represented as a URI (globally unique)
  * @param {Identifier} [props.identifier] - Additional identifier for the evidence variable
  * @param {string} [props.version] - Business version of the evidence variable
  * @param {string} [props.name] - Name for this evidence variable (computer friendly)
  * @param {string} [props.title] - Name for this evidence variable (human friendly)
  * @param {string} [props.shortTitle] - Title for use in informal contexts
  * @param {string} [props.subtitle] - Subordinate title of the EvidenceVariable
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {dateTime} [props.date] - Date last changed
  * @param {markdown} [props.description] - Natural language description of the evidence variable
  * @param {Annotation} [props.note] - Used for footnotes or explanatory notes
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {boolean} [props.actual] - Actual or conceptual
  * @param {string} [props.characteristicCombination] - intersection | union
  * @param {BackboneElement} [props.characteristic] - What defines the members of the evidence element
  * @param {string} [props.handling] - continuous | dichotomous | ordinal | polychotomous
  * @param {BackboneElement} [props.category] - A grouping for ordinal or polychotomous variables
  */
declare function evidenceVariable(type: "EvidenceVariable", props: EvidenceVariable_Props): any;
declare function evidenceVariable(props: EvidenceVariable_Props): any;
/**
  * Create a ExplanationOfBenefit resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for the resource
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {CodeableConcept} [props.type] - Category or discipline
  * @param {CodeableConcept} [props.subType] - More granular claim type
  * @param {string} [props.use] - claim | preauthorization | predetermination
  * @param {Reference} [props.patient] - The recipient of the products and services
  * @param {Period} [props.billablePeriod] - Relevant time frame for the claim
  * @param {dateTime} [props.created] - Response creation date
  * @param {Reference} [props.enterer] - Author of the claim
  * @param {Reference} [props.insurer] - Party responsible for reimbursement
  * @param {Reference} [props.provider] - Party responsible for the claim
  * @param {CodeableConcept} [props.priority] - Desired processing urgency
  * @param {CodeableConcept} [props.fundsReserveRequested] - For whom to reserve funds
  * @param {CodeableConcept} [props.fundsReserve] - Funds reserved status
  * @param {BackboneElement} [props.related] - Prior or corollary claims
  * @param {Reference} [props.prescription] - Prescription authorizing services or products
  * @param {Reference} [props.originalPrescription] - Original prescription if superceded by fulfiller
  * @param {BackboneElement} [props.payee] - Recipient of benefits payable
  * @param {Reference} [props.referral] - Treatment Referral
  * @param {Reference} [props.facility] - Servicing Facility
  * @param {Reference} [props.claim] - Claim reference
  * @param {Reference} [props.claimResponse] - Claim response reference
  * @param {string} [props.outcome] - queued | complete | error | partial
  * @param {string} [props.disposition] - Disposition Message
  * @param {string} [props.preAuthRef] - Preauthorization reference
  * @param {Period} [props.preAuthRefPeriod] - Preauthorization in-effect period
  * @param {BackboneElement} [props.careTeam] - Care Team members
  * @param {BackboneElement} [props.supportingInfo] - Supporting information
  * @param {BackboneElement} [props.diagnosis] - Pertinent diagnosis information
  * @param {BackboneElement} [props.procedure] - Clinical procedures performed
  * @param {number} [props.precedence] - Precedence (primary, secondary, etc.)
  * @param {BackboneElement} [props.insurance] - Patient insurance information
  * @param {BackboneElement} [props.accident] - Details of the event
  * @param {BackboneElement} [props.item] - Product or service provided
  * @param {BackboneElement} [props.addItem] - Insurer added line items
  * @param {any} [props.adjudication] - Header-level adjudication
  * @param {BackboneElement} [props.total] - Adjudication totals
  * @param {BackboneElement} [props.payment] - Payment Details
  * @param {CodeableConcept} [props.formCode] - Printed form identifier
  * @param {Attachment} [props.form] - Printed reference or actual form
  * @param {BackboneElement} [props.processNote] - Note concerning adjudication
  * @param {Period} [props.benefitPeriod] - When the benefits are applicable
  * @param {BackboneElement} [props.benefitBalance] - Balance by Benefit Category
  */
declare function explanationOfBenefit(type: "ExplanationOfBenefit", props: ExplanationOfBenefit_Props): any;
declare function explanationOfBenefit(props: ExplanationOfBenefit_Props): any;
/**
  * Create a FamilyMemberHistory resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Id(s) for this record
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {string} [props.status] - partial | completed | entered-in-error | health-unknown
  * @param {CodeableConcept} [props.dataAbsentReason] - subject-unknown | withheld | unable-to-obtain | deferred
  * @param {Reference} [props.patient] - Patient history is about
  * @param {dateTime} [props.date] - When history was recorded or last updated
  * @param {string} [props.name] - The family member described
  * @param {CodeableConcept} [props.relationship] - Relationship to the subject
  * @param {CodeableConcept} [props.sex] - male | female | other | unknown
  * @param {Period|date|string} [props.born] - (approximate) date of birth
  * @param {Age|Range|string} [props.age] - (approximate) age
  * @param {boolean} [props.estimatedAge] - Age is estimated?
  * @param {boolean|Age|Range|date|string} [props.deceased] - Dead? How old/when?
  * @param {CodeableConcept} [props.reasonCode] - Why was family member history performed?
  * @param {Reference} [props.reasonReference] - Why was family member history performed?
  * @param {Annotation} [props.note] - General note about related person
  * @param {BackboneElement} [props.condition] - Condition that the related person had
  */
declare function familyMemberHistory(type: "FamilyMemberHistory", props: FamilyMemberHistory_Props): any;
declare function familyMemberHistory(props: FamilyMemberHistory_Props): any;
/**
  * Create a Flag resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {string} [props.status] - active | inactive | entered-in-error
  * @param {CodeableConcept} [props.category] - Clinical, administrative, etc.
  * @param {CodeableConcept} [props.code] - Coded or textual message to display to user
  * @param {Reference} [props.subject] - Who/What is flag about?
  * @param {Period} [props.period] - Time period when flag is active
  * @param {Reference} [props.encounter] - Alert relevant during encounter
  * @param {Reference} [props.author] - Flag creator
  */
declare function flag(type: "Flag", props: Flag_Props): any;
declare function flag(props: Flag_Props): any;
/**
  * Create a Goal resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Ids for this goal
  * @param {string} [props.lifecycleStatus] - proposed | planned | accepted | active | on-hold | completed | cancelled | entered-in-error | rejected
  * @param {CodeableConcept} [props.achievementStatus] - in-progress | improving | worsening | no-change | achieved | sustaining | not-achieved | no-progress | not-attainable
  * @param {CodeableConcept} [props.category] - E.g. Treatment, dietary, behavioral, etc.
  * @param {CodeableConcept} [props.priority] - high-priority | medium-priority | low-priority
  * @param {CodeableConcept} [props.description] - Code or text describing goal
  * @param {Reference} [props.subject] - Who this goal is intended for
  * @param {date|CodeableConcept} [props.start] - When goal pursuit begins
  * @param {BackboneElement} [props.target] - Target outcome for the goal
  * @param {date} [props.statusDate] - When goal status took effect
  * @param {string} [props.statusReason] - Reason for current status
  * @param {Reference} [props.expressedBy] - Who's responsible for creating Goal?
  * @param {Reference} [props.addresses] - Issues addressed by this goal
  * @param {Annotation} [props.note] - Comments about the goal
  * @param {CodeableConcept} [props.outcomeCode] - What result was achieved regarding the goal?
  * @param {Reference} [props.outcomeReference] - Observation that resulted from goal
  */
declare function goal(type: "Goal", props: Goal_Props): any;
declare function goal(props: Goal_Props): any;
/**
  * Create a Group resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Unique id
  * @param {boolean} [props.active] - Whether this group's record is in active use
  * @param {string} [props.type] - person | animal | practitioner | device | medication | substance
  * @param {boolean} [props.actual] - Descriptive or actual
  * @param {CodeableConcept} [props.code] - Kind of Group members
  * @param {string} [props.name] - Label for Group
  * @param {unsignedInt} [props.quantity] - Number of members
  * @param {Reference} [props.managingEntity] - Entity that is the custodian of the Group's definition
  * @param {BackboneElement} [props.characteristic] - Include / Exclude group members by Trait
  * @param {BackboneElement} [props.member] - Who or what is in group
  */
declare function group(type: "Group", props: Group_Props): any;
declare function group(props: Group_Props): any;
/**
  * Create a GuidanceResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.requestIdentifier] - The identifier of the request associated with this response, if any
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {string|canonical|CodeableConcept} [props.module] - What guidance was requested
  * @param {string} [props.status] - success | data-requested | data-required | in-progress | failure | entered-in-error
  * @param {Reference} [props.subject] - Patient the request was performed for
  * @param {Reference} [props.encounter] - Encounter during which the response was returned
  * @param {dateTime} [props.occurrenceDateTime] - When the guidance response was processed
  * @param {Reference} [props.performer] - Device returning the guidance
  * @param {CodeableConcept} [props.reasonCode] - Why guidance is needed
  * @param {Reference} [props.reasonReference] - Why guidance is needed
  * @param {Annotation} [props.note] - Additional notes about the response
  * @param {Reference} [props.evaluationMessage] - Messages resulting from the evaluation of the artifact or artifacts
  * @param {Reference} [props.outputParameters] - The output parameters of the evaluation, if any
  * @param {Reference} [props.result] - Proposed actions, if any
  * @param {DataRequirement} [props.dataRequirement] - Additional required data
  */
declare function guidanceResponse(type: "GuidanceResponse", props: GuidanceResponse_Props): any;
declare function guidanceResponse(props: GuidanceResponse_Props): any;
/**
  * Create a HealthcareService resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External identifiers for this item
  * @param {boolean} [props.active] - Whether this HealthcareService record is in active use
  * @param {Reference} [props.providedBy] - Organization that provides this service
  * @param {CodeableConcept} [props.category] - Broad category of service being performed or delivered
  * @param {CodeableConcept} [props.type] - Type of service that may be delivered or performed
  * @param {CodeableConcept} [props.specialty] - Specialties handled by the HealthcareService
  * @param {Reference} [props.location] - Location(s) where service may be provided
  * @param {string} [props.name] - Description of service as presented to a consumer while searching
  * @param {string} [props.comment] - Additional description and/or any specific issues not covered elsewhere
  * @param {markdown} [props.extraDetails] - Extra details about the service that can't be placed in the other fields
  * @param {Attachment} [props.photo] - Facilitates quick identification of the service
  * @param {ContactPoint} [props.telecom] - Contacts related to the healthcare service
  * @param {Reference} [props.coverageArea] - Location(s) service is intended for/available to
  * @param {CodeableConcept} [props.serviceProvisionCode] - Conditions under which service is available/offered
  * @param {BackboneElement} [props.eligibility] - Specific eligibility requirements required to use the service
  * @param {CodeableConcept} [props.program] - Programs that this service is applicable to
  * @param {CodeableConcept} [props.characteristic] - Collection of characteristics (attributes)
  * @param {CodeableConcept} [props.communication] - The language that this service is offered in
  * @param {CodeableConcept} [props.referralMethod] - Ways that the service accepts referrals
  * @param {boolean} [props.appointmentRequired] - If an appointment is required for access to this service
  * @param {BackboneElement} [props.availableTime] - Times the Service Site is available
  * @param {BackboneElement} [props.notAvailable] - Not available during this time due to provided reason
  * @param {string} [props.availabilityExceptions] - Description of availability exceptions
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to electronic services operated for the healthcare service
  */
declare function healthcareService(type: "HealthcareService", props: HealthcareService_Props): any;
declare function healthcareService(props: HealthcareService_Props): any;
/**
  * Create a ImagingStudy resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Identifiers for the whole study
  * @param {string} [props.status] - registered | available | cancelled | entered-in-error | unknown
  * @param {Coding} [props.modality] - All series modality if actual acquisition modalities
  * @param {Reference} [props.subject] - Who or what is the subject of the study
  * @param {Reference} [props.encounter] - Encounter with which this imaging study is associated
  * @param {dateTime} [props.started] - When the study was started
  * @param {Reference} [props.basedOn] - Request fulfilled
  * @param {Reference} [props.referrer] - Referring physician
  * @param {Reference} [props.interpreter] - Who interpreted images
  * @param {Reference} [props.endpoint] - Study access endpoint
  * @param {unsignedInt} [props.numberOfSeries] - Number of Study Related Series
  * @param {unsignedInt} [props.numberOfInstances] - Number of Study Related Instances
  * @param {Reference} [props.procedureReference] - The performed Procedure reference
  * @param {CodeableConcept} [props.procedureCode] - The performed procedure code
  * @param {Reference} [props.location] - Where ImagingStudy occurred
  * @param {CodeableConcept} [props.reasonCode] - Why the study was requested
  * @param {Reference} [props.reasonReference] - Why was study performed
  * @param {Annotation} [props.note] - User-defined comments
  * @param {string} [props.description] - Institution-generated description
  * @param {BackboneElement} [props.series] - Each study has one or more series of instances
  */
declare function imagingStudy(type: "ImagingStudy", props: ImagingStudy_Props): any;
declare function imagingStudy(props: ImagingStudy_Props): any;
/**
  * Create a Immunization resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {string} [props.status] - completed | entered-in-error | not-done
  * @param {CodeableConcept} [props.statusReason] - Reason not done
  * @param {CodeableConcept} [props.vaccineCode] - Vaccine product administered
  * @param {Reference} [props.patient] - Who was immunized
  * @param {Reference} [props.encounter] - Encounter immunization was part of
  * @param {dateTime|string} [props.occurrence] - Vaccine administration date
  * @param {dateTime} [props.recorded] - When the immunization was first captured in the subject's record
  * @param {boolean} [props.primarySource] - Indicates context the data was recorded in
  * @param {CodeableConcept} [props.reportOrigin] - Indicates the source of a secondarily reported record
  * @param {Reference} [props.location] - Where immunization occurred
  * @param {Reference} [props.manufacturer] - Vaccine manufacturer
  * @param {string} [props.lotNumber] - Vaccine lot number
  * @param {date} [props.expirationDate] - Vaccine expiration date
  * @param {CodeableConcept} [props.site] - Body site vaccine  was administered
  * @param {CodeableConcept} [props.route] - How vaccine entered body
  * @param {Quantity} [props.doseQuantity] - Amount of vaccine administered
  * @param {BackboneElement} [props.performer] - Who performed event
  * @param {Annotation} [props.note] - Additional immunization notes
  * @param {CodeableConcept} [props.reasonCode] - Why immunization occurred
  * @param {Reference} [props.reasonReference] - Why immunization occurred
  * @param {boolean} [props.isSubpotent] - Dose potency
  * @param {CodeableConcept} [props.subpotentReason] - Reason for being subpotent
  * @param {BackboneElement} [props.education] - Educational material presented to patient
  * @param {CodeableConcept} [props.programEligibility] - Patient eligibility for a vaccination program
  * @param {CodeableConcept} [props.fundingSource] - Funding source for the vaccine
  * @param {BackboneElement} [props.reaction] - Details of a reaction that follows immunization
  * @param {BackboneElement} [props.protocolApplied] - Protocol followed by the provider
  */
declare function immunization(type: "Immunization", props: Immunization_Props): any;
declare function immunization(props: Immunization_Props): any;
/**
  * Create a ImmunizationEvaluation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {string} [props.status] - completed | entered-in-error
  * @param {Reference} [props.patient] - Who this evaluation is for
  * @param {dateTime} [props.date] - Date evaluation was performed
  * @param {Reference} [props.authority] - Who is responsible for publishing the recommendations
  * @param {CodeableConcept} [props.targetDisease] - Evaluation target disease
  * @param {Reference} [props.immunizationEvent] - Immunization being evaluated
  * @param {CodeableConcept} [props.doseStatus] - Status of the dose relative to published recommendations
  * @param {CodeableConcept} [props.doseStatusReason] - Reason for the dose status
  * @param {string} [props.description] - Evaluation notes
  * @param {string} [props.series] - Name of vaccine series
  * @param {number|string} [props.doseNumber] - Dose number within series
  * @param {number|string} [props.seriesDoses] - Recommended number of doses for immunity
  */
declare function immunizationEvaluation(type: "ImmunizationEvaluation", props: ImmunizationEvaluation_Props): any;
declare function immunizationEvaluation(props: ImmunizationEvaluation_Props): any;
/**
  * Create a ImmunizationRecommendation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {Reference} [props.patient] - Who this profile is for
  * @param {dateTime} [props.date] - Date recommendation(s) created
  * @param {Reference} [props.authority] - Who is responsible for protocol
  * @param {BackboneElement} [props.recommendation] - Vaccine administration recommendations
  */
declare function immunizationRecommendation(type: "ImmunizationRecommendation", props: ImmunizationRecommendation_Props): any;
declare function immunizationRecommendation(props: ImmunizationRecommendation_Props): any;
/**
  * Create a Ingredient resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - An identifier or code by which the ingredient can be referenced
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {Reference} [props.for] - The product which this ingredient is a constituent part of
  * @param {CodeableConcept} [props.role] - Purpose of the ingredient within the product, e.g. active, inactive
  * @param {CodeableConcept} [props.function] - Precise action within the drug product, e.g. antioxidant, alkalizing agent
  * @param {boolean} [props.allergenicIndicator] - If the ingredient is a known or suspected allergen
  * @param {BackboneElement} [props.manufacturer] - An organization that manufactures this ingredient
  * @param {BackboneElement} [props.substance] - The substance that comprises this ingredient
  */
declare function ingredient(type: "Ingredient", props: Ingredient_Props): any;
declare function ingredient(props: Ingredient_Props): any;
/**
  * Create a InsurancePlan resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for Product
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {CodeableConcept} [props.type] - Kind of product
  * @param {string} [props.name] - Official name
  * @param {string} [props.alias] - Alternate names
  * @param {Period} [props.period] - When the product is available
  * @param {Reference} [props.ownedBy] - Plan issuer
  * @param {Reference} [props.administeredBy] - Product administrator
  * @param {Reference} [props.coverageArea] - Where product applies
  * @param {BackboneElement} [props.contact] - Contact for the product
  * @param {Reference} [props.endpoint] - Technical endpoint
  * @param {Reference} [props.network] - What networks are Included
  * @param {BackboneElement} [props.coverage] - Coverage details
  * @param {BackboneElement} [props.plan] - Plan details
  */
declare function insurancePlan(type: "InsurancePlan", props: InsurancePlan_Props): any;
declare function insurancePlan(props: InsurancePlan_Props): any;
/**
  * Create a Invoice resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for item
  * @param {string} [props.status] - draft | issued | balanced | cancelled | entered-in-error
  * @param {string} [props.cancelledReason] - Reason for cancellation of this Invoice
  * @param {CodeableConcept} [props.type] - Type of Invoice
  * @param {Reference} [props.subject] - Recipient(s) of goods and services
  * @param {Reference} [props.recipient] - Recipient of this invoice
  * @param {dateTime} [props.date] - Invoice date / posting date
  * @param {BackboneElement} [props.participant] - Participant in creation of this Invoice
  * @param {Reference} [props.issuer] - Issuing Organization of Invoice
  * @param {Reference} [props.account] - Account that is being balanced
  * @param {BackboneElement} [props.lineItem] - Line items of this Invoice
  * @param {any} [props.totalPriceComponent] - Components of Invoice total
  * @param {Money} [props.totalNet] - Net total of this Invoice
  * @param {Money} [props.totalGross] - Gross total of this Invoice
  * @param {markdown} [props.paymentTerms] - Payment details
  * @param {Annotation} [props.note] - Comments made about the invoice
  */
declare function invoice(type: "Invoice", props: Invoice_Props): any;
declare function invoice(props: Invoice_Props): any;
/**
  * Create a Library resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this library, represented as a URI (globally unique)
  * @param {Identifier} [props.identifier] - Additional identifier for the library
  * @param {string} [props.version] - Business version of the library
  * @param {string} [props.name] - Name for this library (computer friendly)
  * @param {string} [props.title] - Name for this library (human friendly)
  * @param {string} [props.subtitle] - Subordinate title of the library
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {CodeableConcept} [props.type] - logic-library | model-definition | asset-collection | module-definition
  * @param {CodeableConcept|Reference} [props.subject] - Type of individual the library content is focused on
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.description] - Natural language description of the library
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {CodeableConcept} [props.jurisdiction] - Intended jurisdiction for library (if applicable)
  * @param {markdown} [props.purpose] - Why this library is defined
  * @param {string} [props.usage] - Describes the clinical usage of the library
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {date} [props.approvalDate] - When the library was approved by publisher
  * @param {date} [props.lastReviewDate] - When the library was last reviewed
  * @param {Period} [props.effectivePeriod] - When the library is expected to be used
  * @param {CodeableConcept} [props.topic] - E.g. Education, Treatment, Assessment, etc.
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {ParameterDefinition} [props.parameter] - Parameters defined by the library
  * @param {DataRequirement} [props.dataRequirement] - What data is referenced by this library
  * @param {Attachment} [props.content] - Contents of the library, either embedded or referenced
  */
declare function library(type: "Library", props: Library_Props): any;
declare function library(props: Library_Props): any;
/**
  * Create a List resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {string} [props.status] - current | retired | entered-in-error
  * @param {string} [props.mode] - working | snapshot | changes
  * @param {string} [props.title] - Descriptive name for the list
  * @param {CodeableConcept} [props.code] - What the purpose of this list is
  * @param {Reference} [props.subject] - If all resources have the same subject
  * @param {Reference} [props.encounter] - Context in which list created
  * @param {dateTime} [props.date] - When the list was prepared
  * @param {Reference} [props.source] - Who and/or what defined the list contents (aka Author)
  * @param {CodeableConcept} [props.orderedBy] - What order the list has
  * @param {Annotation} [props.note] - Comments about the list
  * @param {BackboneElement} [props.entry] - Entries in the list
  * @param {CodeableConcept} [props.emptyReason] - Why list is empty
  */
declare function list(type: "List", props: List_Props): any;
declare function list(props: List_Props): any;
/**
  * Create a Location resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Unique code or number identifying the location to its users
  * @param {string} [props.status] - active | suspended | inactive
  * @param {Coding} [props.operationalStatus] - The operational status of the location (typically only for a bed/room)
  * @param {string} [props.name] - Name of the location as used by humans
  * @param {string} [props.alias] - A list of alternate names that the location is known as, or was known as, in the past
  * @param {string} [props.description] - Additional details about the location that could be displayed as further information to identify the location beyond its name
  * @param {string} [props.mode] - instance | kind
  * @param {CodeableConcept} [props.type] - Type of function performed
  * @param {ContactPoint} [props.telecom] - Contact details of the location
  * @param {Address} [props.address] - Physical location
  * @param {CodeableConcept} [props.physicalType] - Physical form of the location
  * @param {BackboneElement} [props.position] - The absolute geographic location
  * @param {Reference} [props.managingOrganization] - Organization responsible for provisioning and upkeep
  * @param {Reference} [props.partOf] - Another Location this one is physically a part of
  * @param {BackboneElement} [props.hoursOfOperation] - What days/times during a week is this location usually open
  * @param {string} [props.availabilityExceptions] - Description of availability exceptions
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the location
  */
declare function location(type: "Location", props: Location_Props): any;
declare function location(props: Location_Props): any;
/**
  * Create a ManufacturedItemDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Unique identifier
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {CodeableConcept} [props.manufacturedDoseForm] - Dose form as manufactured (before any necessary transformation)
  * @param {CodeableConcept} [props.unitOfPresentation] - The “real world” units in which the quantity of the item is described
  * @param {Reference} [props.manufacturer] - Manufacturer of the item (Note that this should be named "manufacturer" but it currently causes technical issues)
  * @param {CodeableConcept} [props.ingredient] - The ingredients of this manufactured item. Only needed if these are not specified by incoming references from the Ingredient resource
  * @param {BackboneElement} [props.property] - General characteristics of this item
  */
declare function manufacturedItemDefinition(type: "ManufacturedItemDefinition", props: ManufacturedItemDefinition_Props): any;
declare function manufacturedItemDefinition(props: ManufacturedItemDefinition_Props): any;
/**
  * Create a Measure resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this measure, represented as a URI (globally unique)
  * @param {Identifier} [props.identifier] - Additional identifier for the measure
  * @param {string} [props.version] - Business version of the measure
  * @param {string} [props.name] - Name for this measure (computer friendly)
  * @param {string} [props.title] - Name for this measure (human friendly)
  * @param {string} [props.subtitle] - Subordinate title of the measure
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {CodeableConcept|Reference} [props.subject] - E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.description] - Natural language description of the measure
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {CodeableConcept} [props.jurisdiction] - Intended jurisdiction for measure (if applicable)
  * @param {markdown} [props.purpose] - Why this measure is defined
  * @param {string} [props.usage] - Describes the clinical usage of the measure
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {date} [props.approvalDate] - When the measure was approved by publisher
  * @param {date} [props.lastReviewDate] - When the measure was last reviewed
  * @param {Period} [props.effectivePeriod] - When the measure is expected to be used
  * @param {CodeableConcept} [props.topic] - The category of the measure, such as Education, Treatment, Assessment, etc.
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {canonical} [props.library] - Logic used by the measure
  * @param {markdown} [props.disclaimer] - Disclaimer for use of the measure or its referenced content
  * @param {CodeableConcept} [props.scoring] - proportion | ratio | continuous-variable | cohort
  * @param {CodeableConcept} [props.compositeScoring] - opportunity | all-or-nothing | linear | weighted
  * @param {CodeableConcept} [props.type] - process | outcome | structure | patient-reported-outcome | composite
  * @param {string} [props.riskAdjustment] - How risk adjustment is applied for this measure
  * @param {string} [props.rateAggregation] - How is rate aggregation performed for this measure
  * @param {markdown} [props.rationale] - Detailed description of why the measure exists
  * @param {markdown} [props.clinicalRecommendationStatement] - Summary of clinical guidelines
  * @param {CodeableConcept} [props.improvementNotation] - increase | decrease
  * @param {markdown} [props.definition] - Defined terms used in the measure documentation
  * @param {markdown} [props.guidance] - Additional guidance for implementers
  * @param {BackboneElement} [props.group] - Population criteria group
  * @param {BackboneElement} [props.supplementalData] - What other data should be reported with the measure
  */
declare function measure(type: "Measure", props: Measure_Props): any;
declare function measure(props: Measure_Props): any;
/**
  * Create a MeasureReport resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Additional identifier for the MeasureReport
  * @param {string} [props.status] - complete | pending | error
  * @param {string} [props.type] - individual | subject-list | summary | data-collection
  * @param {canonical} [props.measure] - What measure was calculated
  * @param {Reference} [props.subject] - What individual(s) the report is for
  * @param {dateTime} [props.date] - When the report was generated
  * @param {Reference} [props.reporter] - Who is reporting the data
  * @param {Period} [props.period] - What period the report covers
  * @param {CodeableConcept} [props.improvementNotation] - increase | decrease
  * @param {BackboneElement} [props.group] - Measure results for each group
  * @param {Reference} [props.evaluatedResource] - What data was used to calculate the measure score
  */
declare function measureReport(type: "MeasureReport", props: MeasureReport_Props): any;
declare function measureReport(props: MeasureReport_Props): any;
/**
  * Create a Media resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Identifier(s) for the image
  * @param {Reference} [props.basedOn] - Procedure that caused this media to be created
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown
  * @param {CodeableConcept} [props.type] - Classification of media as image, video, or audio
  * @param {CodeableConcept} [props.modality] - The type of acquisition equipment/process
  * @param {CodeableConcept} [props.view] - Imaging view, e.g. Lateral or Antero-posterior
  * @param {Reference} [props.subject] - Who/What this Media is a record of
  * @param {Reference} [props.encounter] - Encounter associated with media
  * @param {dateTime|Period} [props.created] - When Media was collected
  * @param {instant} [props.issued] - Date/Time this version was made available
  * @param {Reference} [props.operator] - The person who generated the image
  * @param {CodeableConcept} [props.reasonCode] - Why was event performed?
  * @param {CodeableConcept} [props.bodySite] - Observed body part
  * @param {string} [props.deviceName] - Name of the device/manufacturer
  * @param {Reference} [props.device] - Observing Device
  * @param {number} [props.height] - Height of the image in pixels (photo/video)
  * @param {number} [props.width] - Width of the image in pixels (photo/video)
  * @param {number} [props.frames] - Number of frames if > 1 (photo)
  * @param {decimal} [props.duration] - Length in seconds (audio / video)
  * @param {Attachment} [props.content] - Actual Media - reference or data
  * @param {Annotation} [props.note] - Comments made about the media
  */
declare function media(type: "Media", props: Media_Props): any;
declare function media(props: Media_Props): any;
/**
  * Create a Medication resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier for this medication
  * @param {CodeableConcept} [props.code] - Codes that identify this medication
  * @param {string} [props.status] - active | inactive | entered-in-error
  * @param {Reference} [props.manufacturer] - Manufacturer of the item
  * @param {CodeableConcept} [props.form] - powder | tablets | capsule +
  * @param {Ratio} [props.amount] - Amount of drug in package
  * @param {BackboneElement} [props.ingredient] - Active or inactive ingredient
  * @param {BackboneElement} [props.batch] - Details about packaged medications
  */
declare function medication(type: "Medication", props: Medication_Props): any;
declare function medication(props: Medication_Props): any;
/**
  * Create a MedicationAdministration resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External identifier
  * @param {string} [props.instantiates] - Instantiates protocol or definition
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - in-progress | not-done | on-hold | completed | entered-in-error | stopped | unknown
  * @param {CodeableConcept} [props.statusReason] - Reason administration not performed
  * @param {CodeableConcept} [props.category] - Type of medication usage
  * @param {CodeableConcept|Reference} [props.medication] - What was administered
  * @param {Reference} [props.subject] - Who received medication
  * @param {Reference} [props.context] - Encounter or Episode of Care administered as part of
  * @param {Reference} [props.supportingInformation] - Additional information to support administration
  * @param {dateTime|Period} [props.effective] - Start and end time of administration
  * @param {BackboneElement} [props.performer] - Who performed the medication administration and what they did
  * @param {CodeableConcept} [props.reasonCode] - Reason administration performed
  * @param {Reference} [props.reasonReference] - Condition or observation that supports why the medication was administered
  * @param {Reference} [props.request] - Request administration performed against
  * @param {Reference} [props.device] - Device used to administer
  * @param {Annotation} [props.note] - Information about the administration
  * @param {BackboneElement} [props.dosage] - Details of how medication was taken
  * @param {Reference} [props.eventHistory] - A list of events of interest in the lifecycle
  */
declare function medicationAdministration(type: "MedicationAdministration", props: MedicationAdministration_Props): any;
declare function medicationAdministration(props: MedicationAdministration_Props): any;
/**
  * Create a MedicationDispense resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External identifier
  * @param {Reference} [props.partOf] - Event that dispense is part of
  * @param {string} [props.status] - preparation | in-progress | cancelled | on-hold | completed | entered-in-error | stopped | declined | unknown
  * @param {CodeableConcept|Reference} [props.statusReason] - Why a dispense was not performed
  * @param {CodeableConcept} [props.category] - Type of medication dispense
  * @param {CodeableConcept|Reference} [props.medication] - What medication was supplied
  * @param {Reference} [props.subject] - Who the dispense is for
  * @param {Reference} [props.context] - Encounter / Episode associated with event
  * @param {Reference} [props.supportingInformation] - Information that supports the dispensing of the medication
  * @param {BackboneElement} [props.performer] - Who performed event
  * @param {Reference} [props.location] - Where the dispense occurred
  * @param {Reference} [props.authorizingPrescription] - Medication order that authorizes the dispense
  * @param {CodeableConcept} [props.type] - Trial fill, partial fill, emergency fill, etc.
  * @param {Quantity} [props.quantity] - Amount dispensed
  * @param {Quantity} [props.daysSupply] - Amount of medication expressed as a timing amount
  * @param {dateTime} [props.whenPrepared] - When product was packaged and reviewed
  * @param {dateTime} [props.whenHandedOver] - When product was given out
  * @param {Reference} [props.destination] - Where the medication was sent
  * @param {Reference} [props.receiver] - Who collected the medication
  * @param {Annotation} [props.note] - Information about the dispense
  * @param {Dosage} [props.dosageInstruction] - How the medication is to be used by the patient or administered by the caregiver
  * @param {BackboneElement} [props.substitution] - Whether a substitution was performed on the dispense
  * @param {Reference} [props.detectedIssue] - Clinical issue with action
  * @param {Reference} [props.eventHistory] - A list of relevant lifecycle events
  */
declare function medicationDispense(type: "MedicationDispense", props: MedicationDispense_Props): any;
declare function medicationDispense(props: MedicationDispense_Props): any;
/**
  * Create a MedicationKnowledge resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {CodeableConcept} [props.code] - Code that identifies this medication
  * @param {string} [props.status] - active | inactive | entered-in-error
  * @param {Reference} [props.manufacturer] - Manufacturer of the item
  * @param {CodeableConcept} [props.doseForm] - powder | tablets | capsule +
  * @param {Quantity} [props.amount] - Amount of drug in package
  * @param {string} [props.synonym] - Additional names for a medication
  * @param {BackboneElement} [props.relatedMedicationKnowledge] - Associated or related medication information
  * @param {Reference} [props.associatedMedication] - A medication resource that is associated with this medication
  * @param {CodeableConcept} [props.productType] - Category of the medication or product
  * @param {BackboneElement} [props.monograph] - Associated documentation about the medication
  * @param {BackboneElement} [props.ingredient] - Active or inactive ingredient
  * @param {markdown} [props.preparationInstruction] - The instructions for preparing the medication
  * @param {CodeableConcept} [props.intendedRoute] - The intended or approved route of administration
  * @param {BackboneElement} [props.cost] - The pricing of the medication
  * @param {BackboneElement} [props.monitoringProgram] - Program under which a medication is reviewed
  * @param {BackboneElement} [props.administrationGuidelines] - Guidelines for administration of the medication
  * @param {BackboneElement} [props.medicineClassification] - Categorization of the medication within a formulary or classification system
  * @param {BackboneElement} [props.packaging] - Details about packaged medications
  * @param {BackboneElement} [props.drugCharacteristic] - Specifies descriptive properties of the medicine
  * @param {Reference} [props.contraindication] - Potential clinical issue with or between medication(s)
  * @param {BackboneElement} [props.regulatory] - Regulatory information about a medication
  * @param {BackboneElement} [props.kinetics] - The time course of drug absorption, distribution, metabolism and excretion of a medication from the body
  */
declare function medicationKnowledge(type: "MedicationKnowledge", props: MedicationKnowledge_Props): any;
declare function medicationKnowledge(props: MedicationKnowledge_Props): any;
/**
  * Create a MedicationRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External ids for this request
  * @param {string} [props.status] - active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {string} [props.intent] - proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
  * @param {CodeableConcept} [props.category] - Type of medication usage
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {boolean} [props.doNotPerform] - True if request is prohibiting action
  * @param {boolean|Reference} [props.reported] - Reported rather than primary record
  * @param {CodeableConcept|Reference} [props.medication] - Medication to be taken
  * @param {Reference} [props.subject] - Who or group medication request is for
  * @param {Reference} [props.encounter] - Encounter created as part of encounter/admission/stay
  * @param {Reference} [props.supportingInformation] - Information to support ordering of the medication
  * @param {dateTime} [props.authoredOn] - When request was initially authored
  * @param {Reference} [props.requester] - Who/What requested the Request
  * @param {Reference} [props.performer] - Intended performer of administration
  * @param {CodeableConcept} [props.performerType] - Desired kind of performer of the medication administration
  * @param {Reference} [props.recorder] - Person who entered the request
  * @param {CodeableConcept} [props.reasonCode] - Reason or indication for ordering or not ordering the medication
  * @param {Reference} [props.reasonReference] - Condition or observation that supports why the prescription is being written
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {Identifier} [props.groupIdentifier] - Composite request this is part of
  * @param {CodeableConcept} [props.courseOfTherapyType] - Overall pattern of medication administration
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {Annotation} [props.note] - Information about the prescription
  * @param {Dosage} [props.dosageInstruction] - How the medication should be taken
  * @param {BackboneElement} [props.dispenseRequest] - Medication supply authorization
  * @param {BackboneElement} [props.substitution] - Any restrictions on medication substitution
  * @param {Reference} [props.priorPrescription] - An order/prescription that is being replaced
  * @param {Reference} [props.detectedIssue] - Clinical Issue with action
  * @param {Reference} [props.eventHistory] - A list of events of interest in the lifecycle
  */
declare function medicationRequest(type: "MedicationRequest", props: MedicationRequest_Props): any;
declare function medicationRequest(props: MedicationRequest_Props): any;
/**
  * Create a MedicationStatement resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External identifier
  * @param {Reference} [props.basedOn] - Fulfils plan, proposal or order
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - active | completed | entered-in-error | intended | stopped | on-hold | unknown | not-taken
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {CodeableConcept} [props.category] - Type of medication usage
  * @param {CodeableConcept|Reference} [props.medication] - What medication was taken
  * @param {Reference} [props.subject] - Who is/was taking  the medication
  * @param {Reference} [props.context] - Encounter / Episode associated with MedicationStatement
  * @param {dateTime|Period} [props.effective] - The date/time or interval when the medication is/was/will be taken
  * @param {dateTime} [props.dateAsserted] - When the statement was asserted?
  * @param {Reference} [props.informationSource] - Person or organization that provided the information about the taking of this medication
  * @param {Reference} [props.derivedFrom] - Additional supporting information
  * @param {CodeableConcept} [props.reasonCode] - Reason for why the medication is being/was taken
  * @param {Reference} [props.reasonReference] - Condition or observation that supports why the medication is being/was taken
  * @param {Annotation} [props.note] - Further information about the statement
  * @param {Dosage} [props.dosage] - Details of how medication is/was taken or should be taken
  */
declare function medicationStatement(type: "MedicationStatement", props: MedicationStatement_Props): any;
declare function medicationStatement(props: MedicationStatement_Props): any;
/**
  * Create a MedicinalProductDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier for this product. Could be an MPID
  * @param {CodeableConcept} [props.type] - Regulatory type, e.g. Investigational or Authorized
  * @param {CodeableConcept} [props.domain] - If this medicine applies to human or veterinary uses
  * @param {string} [props.version] - A business identifier relating to a specific version of the product
  * @param {CodeableConcept} [props.status] - The status within the lifecycle of this product record
  * @param {dateTime} [props.statusDate] - The date at which the given status became applicable
  * @param {markdown} [props.description] - General description of this product
  * @param {CodeableConcept} [props.combinedPharmaceuticalDoseForm] - The dose form for a single part product, or combined form of a multiple part product
  * @param {CodeableConcept} [props.route] - The path by which the product is taken into or makes contact with the body
  * @param {markdown} [props.indication] - Description of indication(s) for this product, used when structured indications are not required
  * @param {CodeableConcept} [props.legalStatusOfSupply] - The legal status of supply of the medicinal product as classified by the regulator
  * @param {CodeableConcept} [props.additionalMonitoringIndicator] - Whether the Medicinal Product is subject to additional monitoring for regulatory reasons
  * @param {CodeableConcept} [props.specialMeasures] - Whether the Medicinal Product is subject to special measures for regulatory reasons
  * @param {CodeableConcept} [props.pediatricUseIndicator] - If authorised for use in children
  * @param {CodeableConcept} [props.classification] - Allows the product to be classified by various systems
  * @param {MarketingStatus} [props.marketingStatus] - Marketing status of the medicinal product, in contrast to marketing authorization
  * @param {CodeableConcept} [props.packagedMedicinalProduct] - Package type for the product
  * @param {CodeableConcept} [props.ingredient] - The ingredients of this medicinal product - when not detailed in other resources
  * @param {CodeableReference} [props.impurity] - Any component of the drug product which is not the chemical entity defined as the drug substance, or an excipient in the drug product
  * @param {Reference} [props.attachedDocument] - Additional documentation about the medicinal product
  * @param {Reference} [props.masterFile] - A master file for the medicinal product (e.g. Pharmacovigilance System Master File)
  * @param {BackboneElement} [props.contact] - A product specific contact, person (in a role), or an organization
  * @param {Reference} [props.clinicalTrial] - Clinical trials or studies that this product is involved in
  * @param {Coding} [props.code] - A code that this product is known by, within some formal terminology
  * @param {BackboneElement} [props.name] - The product's name, including full name and possibly coded parts
  * @param {BackboneElement} [props.crossReference] - Reference to another product, e.g. for linking authorised to investigational product
  * @param {BackboneElement} [props.operation] - A manufacturing or administrative process for the medicinal product
  * @param {BackboneElement} [props.characteristic] - Key product features such as "sugar free", "modified release"
  */
declare function medicinalProductDefinition(type: "MedicinalProductDefinition", props: MedicinalProductDefinition_Props): any;
declare function medicinalProductDefinition(props: MedicinalProductDefinition_Props): any;
/**
  * Create a MolecularSequence resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Unique ID for this particular sequence. This is a FHIR-defined id
  * @param {string} [props.type] - aa | dna | rna
  * @param {integer} [props.coordinateSystem] - Base number of coordinate system (0 for 0-based numbering or coordinates, inclusive start, exclusive end, 1 for 1-based numbering, inclusive start, inclusive end)
  * @param {Reference} [props.patient] - Who and/or what this is about
  * @param {Reference} [props.specimen] - Specimen used for sequencing
  * @param {Reference} [props.device] - The method for sequencing
  * @param {Reference} [props.performer] - Who should be responsible for test result
  * @param {Quantity} [props.quantity] - The number of copies of the sequence of interest.  (RNASeq)
  * @param {BackboneElement} [props.referenceSeq] - A sequence used as reference
  * @param {BackboneElement} [props.variant] - Variant in sequence
  * @param {string} [props.observedSeq] - Sequence that was observed
  * @param {BackboneElement} [props.quality] - An set of value as quality of sequence
  * @param {integer} [props.readCoverage] - Average number of reads representing a given nucleotide in the reconstructed sequence
  * @param {BackboneElement} [props.repository] - External repository which contains detailed report related with observedSeq in this resource
  * @param {Reference} [props.pointer] - Pointer to next atomic sequence
  * @param {BackboneElement} [props.structureVariant] - Structural variant
  */
declare function molecularSequence(type: "MolecularSequence", props: MolecularSequence_Props): any;
declare function molecularSequence(props: MolecularSequence_Props): any;
/**
  * Create a NutritionOrder resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Identifiers assigned to this order
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {string} [props.instantiates] - Instantiates protocol or definition
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
  * @param {Reference} [props.patient] - The person who requires the diet, formula or nutritional supplement
  * @param {Reference} [props.encounter] - The encounter associated with this nutrition order
  * @param {dateTime} [props.dateTime] - Date and time the nutrition order was requested
  * @param {Reference} [props.orderer] - Who ordered the diet, formula or nutritional supplement
  * @param {Reference} [props.allergyIntolerance] - List of the patient's food and nutrition-related allergies and intolerances
  * @param {CodeableConcept} [props.foodPreferenceModifier] - Order-specific modifier about the type of food that should be given
  * @param {CodeableConcept} [props.excludeFoodModifier] - Order-specific modifier about the type of food that should not be given
  * @param {BackboneElement} [props.oralDiet] - Oral diet components
  * @param {BackboneElement} [props.supplement] - Supplement components
  * @param {BackboneElement} [props.enteralFormula] - Enteral formula components
  * @param {Annotation} [props.note] - Comments
  */
declare function nutritionOrder(type: "NutritionOrder", props: NutritionOrder_Props): any;
declare function nutritionOrder(props: NutritionOrder_Props): any;
/**
  * Create a NutritionProduct resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.status] - active | inactive | entered-in-error
  * @param {CodeableConcept} [props.category] - A category or class of the nutrition product (halal, kosher, gluten free, vegan, etc)
  * @param {CodeableConcept} [props.code] - A code designating a specific type of nutritional product
  * @param {Reference} [props.manufacturer] - Manufacturer, representative or officially responsible for the product
  * @param {BackboneElement} [props.nutrient] - The product's nutritional information expressed by the nutrients
  * @param {BackboneElement} [props.ingredient] - Ingredients contained in this product
  * @param {CodeableReference} [props.knownAllergen] - Known or suspected allergens that are a part of this product
  * @param {BackboneElement} [props.productCharacteristic] - Specifies descriptive properties of the nutrition product
  * @param {BackboneElement} [props.instance] - One or several physical instances or occurrences of the nutrition product
  * @param {Annotation} [props.note] - Comments made about the product
  */
declare function nutritionProduct(type: "NutritionProduct", props: NutritionProduct_Props): any;
declare function nutritionProduct(props: NutritionProduct_Props): any;
/**
  * Create a Observation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for observation
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal or order
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - registered | preliminary | final | amended +
  * @param {CodeableConcept} [props.category] - Classification of  type of observation
  * @param {CodeableConcept} [props.code] - Type of observation (code / type)
  * @param {Reference} [props.subject] - Who and/or what the observation is about
  * @param {Reference} [props.focus] - What the observation is about, when it is not about the subject of record
  * @param {Reference} [props.encounter] - Healthcare event during which this observation is made
  * @param {dateTime|Period|Timing|instant} [props.effective] - Clinically relevant time/time-period for observation
  * @param {instant} [props.issued] - Date/Time this version was made available
  * @param {Reference} [props.performer] - Who is responsible for the observation
  * @param {Quantity|CodeableConcept|string|boolean|integer|Range|Ratio|SampledData|time|dateTime|Period} [props.value] - Actual result
  * @param {CodeableConcept} [props.dataAbsentReason] - Why the result is missing
  * @param {CodeableConcept} [props.interpretation] - High, low, normal, etc.
  * @param {Annotation} [props.note] - Comments about the observation
  * @param {CodeableConcept} [props.bodySite] - Observed body part
  * @param {CodeableConcept} [props.method] - How it was done
  * @param {Reference} [props.specimen] - Specimen used for this observation
  * @param {Reference} [props.device] - (Measurement) Device
  * @param {BackboneElement} [props.referenceRange] - Provides guide for interpretation
  * @param {Reference} [props.hasMember] - Related resource that belongs to the Observation group
  * @param {Reference} [props.derivedFrom] - Related measurements the observation is made from
  * @param {BackboneElement} [props.component] - Component results
  */
declare function observation(type: "Observation", props: Observation_Props): any;
declare function observation(props: Observation_Props): any;
/**
  * Create a ObservationDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {CodeableConcept} [props.category] - Category of observation
  * @param {CodeableConcept} [props.code] - Type of observation (code / type)
  * @param {Identifier} [props.identifier] - Business identifier for this ObservationDefinition instance
  * @param {string} [props.permittedDataType] - Quantity | CodeableConcept | string | boolean | integer | Range | Ratio | SampledData | time | dateTime | Period
  * @param {boolean} [props.multipleResultsAllowed] - Multiple results allowed
  * @param {CodeableConcept} [props.method] - Method used to produce the observation
  * @param {string} [props.preferredReportName] - Preferred report name
  * @param {BackboneElement} [props.quantitativeDetails] - Characteristics of quantitative results
  * @param {BackboneElement} [props.qualifiedInterval] - Qualified range for continuous and ordinal observation results
  * @param {Reference} [props.validCodedValueSet] - Value set of valid coded values for the observations conforming to this ObservationDefinition
  * @param {Reference} [props.normalCodedValueSet] - Value set of normal coded values for the observations conforming to this ObservationDefinition
  * @param {Reference} [props.abnormalCodedValueSet] - Value set of abnormal coded values for the observations conforming to this ObservationDefinition
  * @param {Reference} [props.criticalCodedValueSet] - Value set of critical coded values for the observations conforming to this ObservationDefinition
  */
declare function observationDefinition(type: "ObservationDefinition", props: ObservationDefinition_Props): any;
declare function observationDefinition(props: ObservationDefinition_Props): any;
/**
  * Create a Organization resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Identifies this organization  across multiple systems
  * @param {boolean} [props.active] - Whether the organization's record is still in active use
  * @param {CodeableConcept} [props.type] - Kind of organization
  * @param {string} [props.name] - Name used for the organization
  * @param {string} [props.alias] - A list of alternate names that the organization is known as, or was known as in the past
  * @param {ContactPoint} [props.telecom] - A contact detail for the organization
  * @param {Address} [props.address] - An address for the organization
  * @param {Reference} [props.partOf] - The organization of which this organization forms a part
  * @param {BackboneElement} [props.contact] - Contact for the organization for a certain purpose
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the organization
  */
declare function organization(type: "Organization", props: Organization_Props): any;
declare function organization(props: Organization_Props): any;
/**
  * Create a OrganizationAffiliation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifiers that are specific to this role
  * @param {boolean} [props.active] - Whether this organization affiliation record is in active use
  * @param {Period} [props.period] - The period during which the participatingOrganization is affiliated with the primary organization
  * @param {Reference} [props.organization] - Organization where the role is available
  * @param {Reference} [props.participatingOrganization] - Organization that provides/performs the role (e.g. providing services or is a member of)
  * @param {Reference} [props.network] - Health insurance provider network in which the participatingOrganization provides the role's services (if defined) at the indicated locations (if defined)
  * @param {CodeableConcept} [props.code] - Definition of the role the participatingOrganization plays
  * @param {CodeableConcept} [props.specialty] - Specific specialty of the participatingOrganization in the context of the role
  * @param {Reference} [props.location] - The location(s) at which the role occurs
  * @param {Reference} [props.healthcareService] - Healthcare services provided through the role
  * @param {ContactPoint} [props.telecom] - Contact details at the participatingOrganization relevant to this Affiliation
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for this role
  */
declare function organizationAffiliation(type: "OrganizationAffiliation", props: OrganizationAffiliation_Props): any;
declare function organizationAffiliation(props: OrganizationAffiliation_Props): any;
/**
  * Create a PackagedProductDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - A unique identifier for this package as whole
  * @param {string} [props.name] - A name for this package. Typically as listed in a drug formulary, catalogue, inventory etc
  * @param {CodeableConcept} [props.type] - A high level category e.g. medicinal product, raw material, shipping container etc
  * @param {Reference} [props.packageFor] - The product that this is a pack for
  * @param {CodeableConcept} [props.status] - The status within the lifecycle of this item. High level - not intended to duplicate details elsewhere e.g. legal status, or authorization/marketing status
  * @param {dateTime} [props.statusDate] - The date at which the given status became applicable
  * @param {Quantity} [props.containedItemQuantity] - A total of the complete count of contained items of a particular type/form, independent of sub-packaging or organization. This can be considered as the pack size
  * @param {markdown} [props.description] - Textual description. Note that this is not the name of the package or product
  * @param {BackboneElement} [props.legalStatusOfSupply] - The legal status of supply of the packaged item as classified by the regulator
  * @param {MarketingStatus} [props.marketingStatus] - Allows specifying that an item is on the market for sale, or that it is not available, and the dates and locations associated
  * @param {CodeableConcept} [props.characteristic] - Allows the key features to be recorded, such as "hospital pack", "nurse prescribable"
  * @param {boolean} [props.copackagedIndicator] - If the drug product is supplied with another item such as a diluent or adjuvant
  * @param {Reference} [props.manufacturer] - Manufacturer of this package type (multiple means these are all possible manufacturers)
  * @param {BackboneElement} [props.package] - A packaging item, as a container for medically related items, possibly with other packaging items within, or a packaging component, such as bottle cap
  */
declare function packagedProductDefinition(type: "PackagedProductDefinition", props: PackagedProductDefinition_Props): any;
declare function packagedProductDefinition(props: PackagedProductDefinition_Props): any;
/**
  * Create a Patient resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - An identifier for this patient
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {HumanName} [props.name] - A name associated with the patient
  * @param {ContactPoint} [props.telecom] - A contact detail for the individual
  * @param {string} [props.gender] - male | female | other | unknown
  * @param {date} [props.birthDate] - The date of birth for the individual
  * @param {boolean|dateTime} [props.deceased] - Indicates if the individual is deceased or not
  * @param {Address} [props.address] - An address for the individual
  * @param {CodeableConcept} [props.maritalStatus] - Marital (civil) status of a patient
  * @param {boolean|integer} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
  */
declare function patient(type: "Patient", props: Patient_Props): any;
declare function patient(props: Patient_Props): any;
/**
  * Create a PaymentNotice resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for the payment noctice
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {Reference} [props.request] - Request reference
  * @param {Reference} [props.response] - Response reference
  * @param {dateTime} [props.created] - Creation date
  * @param {Reference} [props.provider] - Responsible practitioner
  * @param {Reference} [props.payment] - Payment reference
  * @param {date} [props.paymentDate] - Payment or clearing date
  * @param {Reference} [props.payee] - Party being paid
  * @param {Reference} [props.recipient] - Party being notified
  * @param {Money} [props.amount] - Monetary amount of the payment
  * @param {CodeableConcept} [props.paymentStatus] - Issued or cleared Status of the payment
  */
declare function paymentNotice(type: "PaymentNotice", props: PaymentNotice_Props): any;
declare function paymentNotice(props: PaymentNotice_Props): any;
/**
  * Create a PaymentReconciliation resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for a payment reconciliation
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {Period} [props.period] - Period covered
  * @param {dateTime} [props.created] - Creation date
  * @param {Reference} [props.paymentIssuer] - Party generating payment
  * @param {Reference} [props.request] - Reference to requesting resource
  * @param {Reference} [props.requestor] - Responsible practitioner
  * @param {string} [props.outcome] - queued | complete | error | partial
  * @param {string} [props.disposition] - Disposition message
  * @param {date} [props.paymentDate] - When payment issued
  * @param {Money} [props.paymentAmount] - Total amount of Payment
  * @param {Identifier} [props.paymentIdentifier] - Business identifier for the payment
  * @param {BackboneElement} [props.detail] - Settlement particulars
  * @param {CodeableConcept} [props.formCode] - Printed form identifier
  * @param {BackboneElement} [props.processNote] - Note concerning processing
  */
declare function paymentReconciliation(type: "PaymentReconciliation", props: PaymentReconciliation_Props): any;
declare function paymentReconciliation(props: PaymentReconciliation_Props): any;
/**
  * Create a Person resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - A human identifier for this person
  * @param {HumanName} [props.name] - A name associated with the person
  * @param {ContactPoint} [props.telecom] - A contact detail for the person
  * @param {string} [props.gender] - male | female | other | unknown
  * @param {date} [props.birthDate] - The date on which the person was born
  * @param {Address} [props.address] - One or more addresses for the person
  * @param {Attachment} [props.photo] - Image of the person
  * @param {Reference} [props.managingOrganization] - The organization that is the custodian of the person record
  * @param {boolean} [props.active] - This person's record is in active use
  * @param {BackboneElement} [props.link] - Link to a resource that concerns the same actual person
  */
declare function person(type: "Person", props: Person_Props): any;
declare function person(props: Person_Props): any;
/**
  * Create a PlanDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this plan definition, represented as a URI (globally unique)
  * @param {Identifier} [props.identifier] - Additional identifier for the plan definition
  * @param {string} [props.version] - Business version of the plan definition
  * @param {string} [props.name] - Name for this plan definition (computer friendly)
  * @param {string} [props.title] - Name for this plan definition (human friendly)
  * @param {string} [props.subtitle] - Subordinate title of the plan definition
  * @param {CodeableConcept} [props.type] - order-set | clinical-protocol | eca-rule | workflow-definition
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {CodeableConcept|Reference|canonical} [props.subject] - Type of individual the plan definition is focused on
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.description] - Natural language description of the plan definition
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {CodeableConcept} [props.jurisdiction] - Intended jurisdiction for plan definition (if applicable)
  * @param {markdown} [props.purpose] - Why this plan definition is defined
  * @param {string} [props.usage] - Describes the clinical usage of the plan
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {date} [props.approvalDate] - When the plan definition was approved by publisher
  * @param {date} [props.lastReviewDate] - When the plan definition was last reviewed
  * @param {Period} [props.effectivePeriod] - When the plan definition is expected to be used
  * @param {CodeableConcept} [props.topic] - E.g. Education, Treatment, Assessment
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations
  * @param {canonical} [props.library] - Logic used by the plan definition
  * @param {BackboneElement} [props.goal] - What the plan is trying to accomplish
  * @param {BackboneElement} [props.action] - Action defined by the plan
  */
declare function planDefinition(type: "PlanDefinition", props: PlanDefinition_Props): any;
declare function planDefinition(props: PlanDefinition_Props): any;
/**
  * Create a Practitioner resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - An identifier for the person as this agent
  * @param {boolean} [props.active] - Whether this practitioner's record is in active use
  * @param {HumanName} [props.name] - The name(s) associated with the practitioner
  * @param {ContactPoint} [props.telecom] - A contact detail for the practitioner (that apply to all roles)
  * @param {Address} [props.address] - Address(es) of the practitioner that are not role specific (typically home address)
  * @param {string} [props.gender] - male | female | other | unknown
  * @param {date} [props.birthDate] - The date  on which the practitioner was born
  * @param {Attachment} [props.photo] - Image of the person
  * @param {BackboneElement} [props.qualification] - Certification, licenses, or training pertaining to the provision of care
  * @param {CodeableConcept} [props.communication] - A language the practitioner can use in patient communication
  */
declare function practitioner(type: "Practitioner", props: Practitioner_Props): any;
declare function practitioner(props: Practitioner_Props): any;
/**
  * Create a PractitionerRole resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifiers that are specific to a role/location
  * @param {boolean} [props.active] - Whether this practitioner role record is in active use
  * @param {Period} [props.period] - The period during which the practitioner is authorized to perform in these role(s)
  * @param {Reference} [props.practitioner] - Practitioner that is able to provide the defined services for the organization
  * @param {Reference} [props.organization] - Organization where the roles are available
  * @param {CodeableConcept} [props.code] - Roles which this practitioner may perform
  * @param {CodeableConcept} [props.specialty] - Specific specialty of the practitioner
  * @param {Reference} [props.location] - The location(s) at which this practitioner provides care
  * @param {Reference} [props.healthcareService] - The list of healthcare services that this worker provides for this role's Organization/Location(s)
  * @param {ContactPoint} [props.telecom] - Contact details that are specific to the role/location/service
  * @param {BackboneElement} [props.availableTime] - Times the Service Site is available
  * @param {BackboneElement} [props.notAvailable] - Not available during this time due to provided reason
  * @param {string} [props.availabilityExceptions] - Description of availability exceptions
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the practitioner with this role
  */
declare function practitionerRole(type: "PractitionerRole", props: PractitionerRole_Props): any;
declare function practitionerRole(props: PractitionerRole_Props): any;
/**
  * Create a Procedure resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Identifiers for this procedure
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - A request for this procedure
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {CodeableConcept} [props.category] - Classification of the procedure
  * @param {CodeableConcept} [props.code] - Identification of the procedure
  * @param {Reference} [props.subject] - Who the procedure was performed on
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {dateTime|Period|string|Age|Range} [props.performed] - When the procedure was performed
  * @param {Reference} [props.recorder] - Who recorded the procedure
  * @param {Reference} [props.asserter] - Person who asserts this procedure
  * @param {BackboneElement} [props.performer] - The people who performed the procedure
  * @param {Reference} [props.location] - Where the procedure happened
  * @param {CodeableConcept} [props.reasonCode] - Coded reason procedure performed
  * @param {Reference} [props.reasonReference] - The justification that the procedure was performed
  * @param {CodeableConcept} [props.bodySite] - Target body sites
  * @param {CodeableConcept} [props.outcome] - The result of procedure
  * @param {Reference} [props.report] - Any report resulting from the procedure
  * @param {CodeableConcept} [props.complication] - Complication following the procedure
  * @param {Reference} [props.complicationDetail] - A condition that is a result of the procedure
  * @param {CodeableConcept} [props.followUp] - Instructions for follow up
  * @param {Annotation} [props.note] - Additional information about the procedure
  * @param {BackboneElement} [props.focalDevice] - Manipulated, implanted, or removed device
  * @param {Reference} [props.usedReference] - Items used during procedure
  * @param {CodeableConcept} [props.usedCode] - Coded items used during the procedure
  */
declare function procedure(type: "Procedure", props: Procedure_Props): any;
declare function procedure(props: Procedure_Props): any;
/**
  * Create a Questionnaire resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this questionnaire, represented as a URI (globally unique)
  * @param {Identifier} [props.identifier] - Additional identifier for the questionnaire
  * @param {string} [props.version] - Business version of the questionnaire
  * @param {string} [props.name] - Name for this questionnaire (computer friendly)
  * @param {string} [props.title] - Name for this questionnaire (human friendly)
  * @param {canonical} [props.derivedFrom] - Instantiates protocol or definition
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {string} [props.subjectType] - Resource that can be subject of QuestionnaireResponse
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.description] - Natural language description of the questionnaire
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {CodeableConcept} [props.jurisdiction] - Intended jurisdiction for questionnaire (if applicable)
  * @param {markdown} [props.purpose] - Why this questionnaire is defined
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {date} [props.approvalDate] - When the questionnaire was approved by publisher
  * @param {date} [props.lastReviewDate] - When the questionnaire was last reviewed
  * @param {Period} [props.effectivePeriod] - When the questionnaire is expected to be used
  * @param {Coding} [props.code] - Concept that represents the overall questionnaire
  * @param {BackboneElement} [props.item] - Questions and sections within the Questionnaire
  */
declare function questionnaire(type: "Questionnaire", props: Questionnaire_Props): any;
declare function questionnaire(props: Questionnaire_Props): any;
/**
  * Create a QuestionnaireResponse resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Unique id for this set of answers
  * @param {Reference} [props.basedOn] - Request fulfilled by this QuestionnaireResponse
  * @param {Reference} [props.partOf] - Part of this action
  * @param {canonical} [props.questionnaire] - Form being answered
  * @param {string} [props.status] - in-progress | completed | amended | entered-in-error | stopped
  * @param {Reference} [props.subject] - The subject of the questions
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {dateTime} [props.authored] - Date the answers were gathered
  * @param {Reference} [props.author] - Person who received and recorded the answers
  * @param {Reference} [props.source] - The person who answered the questions
  * @param {BackboneElement} [props.item] - Groups and questions
  */
declare function questionnaireResponse(type: "QuestionnaireResponse", props: QuestionnaireResponse_Props): any;
declare function questionnaireResponse(props: QuestionnaireResponse_Props): any;
/**
  * Create a RegulatedAuthorization resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier for the authorization, typically assigned by the authorizing body
  * @param {Reference} [props.subject] - The product type, treatment, facility or activity that is being authorized
  * @param {CodeableConcept} [props.type] - Overall type of this authorization, for example drug marketing approval, orphan drug designation
  * @param {markdown} [props.description] - General textual supporting information
  * @param {CodeableConcept} [props.region] - The territory in which the authorization has been granted
  * @param {CodeableConcept} [props.status] - The status that is authorised e.g. approved. Intermediate states can be tracked with cases and applications
  * @param {dateTime} [props.statusDate] - The date at which the current status was assigned
  * @param {Period} [props.validityPeriod] - The time period in which the regulatory approval etc. is in effect, e.g. a Marketing Authorization includes the date of authorization and/or expiration date
  * @param {CodeableReference} [props.indication] - Condition for which the use of the regulated product applies
  * @param {CodeableConcept} [props.intendedUse] - The intended use of the product, e.g. prevention, treatment
  * @param {CodeableConcept} [props.basis] - The legal/regulatory framework or reasons under which this authorization is granted
  * @param {Reference} [props.holder] - The organization that has been granted this authorization, by the regulator
  * @param {Reference} [props.regulator] - The regulatory authority or authorizing body granting the authorization
  * @param {BackboneElement} [props.case] - The case or regulatory procedure for granting or amending a regulated authorization. Note: This area is subject to ongoing review and the workgroup is seeking implementer feedback on its use (see link at bottom of page)
  */
declare function regulatedAuthorization(type: "RegulatedAuthorization", props: RegulatedAuthorization_Props): any;
declare function regulatedAuthorization(props: RegulatedAuthorization_Props): any;
/**
  * Create a RelatedPerson resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - A human identifier for this person
  * @param {boolean} [props.active] - Whether this related person's record is in active use
  * @param {Reference} [props.patient] - The patient this person is related to
  * @param {CodeableConcept} [props.relationship] - The nature of the relationship
  * @param {HumanName} [props.name] - A name associated with the person
  * @param {ContactPoint} [props.telecom] - A contact detail for the person
  * @param {string} [props.gender] - male | female | other | unknown
  * @param {date} [props.birthDate] - The date on which the related person was born
  * @param {Address} [props.address] - Address where the related person can be contacted or visited
  * @param {Attachment} [props.photo] - Image of the person
  * @param {Period} [props.period] - Period of time that this relationship is considered valid
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with about the patient's health
  */
declare function relatedPerson(type: "RelatedPerson", props: RelatedPerson_Props): any;
declare function relatedPerson(props: RelatedPerson_Props): any;
/**
  * Create a RequestGroup resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal, or order
  * @param {Reference} [props.replaces] - Request(s) replaced by this request
  * @param {Identifier} [props.groupIdentifier] - Composite request this is part of
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {CodeableConcept} [props.code] - What's being requested/ordered
  * @param {Reference} [props.subject] - Who the request group is about
  * @param {Reference} [props.encounter] - Created as part of
  * @param {dateTime} [props.authoredOn] - When the request group was authored
  * @param {Reference} [props.author] - Device or practitioner that authored the request group
  * @param {CodeableConcept} [props.reasonCode] - Why the request group is needed
  * @param {Reference} [props.reasonReference] - Why the request group is needed
  * @param {Annotation} [props.note] - Additional notes about the response
  * @param {BackboneElement} [props.action] - Proposed actions, if any
  */
declare function requestGroup(type: "RequestGroup", props: RequestGroup_Props): any;
declare function requestGroup(props: RequestGroup_Props): any;
/**
  * Create a ResearchDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this research definition, represented as a URI (globally unique)
  * @param {Identifier} [props.identifier] - Additional identifier for the research definition
  * @param {string} [props.version] - Business version of the research definition
  * @param {string} [props.name] - Name for this research definition (computer friendly)
  * @param {string} [props.title] - Name for this research definition (human friendly)
  * @param {string} [props.shortTitle] - Title for use in informal contexts
  * @param {string} [props.subtitle] - Subordinate title of the ResearchDefinition
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {CodeableConcept|Reference} [props.subject] - E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.description] - Natural language description of the research definition
  * @param {string} [props.comment] - Used for footnotes or explanatory notes
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {CodeableConcept} [props.jurisdiction] - Intended jurisdiction for research definition (if applicable)
  * @param {markdown} [props.purpose] - Why this research definition is defined
  * @param {string} [props.usage] - Describes the clinical usage of the ResearchDefinition
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {date} [props.approvalDate] - When the research definition was approved by publisher
  * @param {date} [props.lastReviewDate] - When the research definition was last reviewed
  * @param {Period} [props.effectivePeriod] - When the research definition is expected to be used
  * @param {CodeableConcept} [props.topic] - The category of the ResearchDefinition, such as Education, Treatment, Assessment, etc.
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {canonical} [props.library] - Logic used by the ResearchDefinition
  * @param {Reference} [props.population] - What population?
  * @param {Reference} [props.exposure] - What exposure?
  * @param {Reference} [props.exposureAlternative] - What alternative exposure state?
  * @param {Reference} [props.outcome] - What outcome?
  */
declare function researchDefinition(type: "ResearchDefinition", props: ResearchDefinition_Props): any;
declare function researchDefinition(props: ResearchDefinition_Props): any;
/**
  * Create a ResearchElementDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.url] - Canonical identifier for this research element definition, represented as a URI (globally unique)
  * @param {Identifier} [props.identifier] - Additional identifier for the research element definition
  * @param {string} [props.version] - Business version of the research element definition
  * @param {string} [props.name] - Name for this research element definition (computer friendly)
  * @param {string} [props.title] - Name for this research element definition (human friendly)
  * @param {string} [props.shortTitle] - Title for use in informal contexts
  * @param {string} [props.subtitle] - Subordinate title of the ResearchElementDefinition
  * @param {string} [props.status] - draft | active | retired | unknown
  * @param {boolean} [props.experimental] - For testing purposes, not real usage
  * @param {CodeableConcept|Reference} [props.subject] - E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device
  * @param {dateTime} [props.date] - Date last changed
  * @param {string} [props.publisher] - Name of the publisher (organization or individual)
  * @param {ContactDetail} [props.contact] - Contact details for the publisher
  * @param {markdown} [props.description] - Natural language description of the research element definition
  * @param {string} [props.comment] - Used for footnotes or explanatory notes
  * @param {UsageContext} [props.useContext] - The context that the content is intended to support
  * @param {CodeableConcept} [props.jurisdiction] - Intended jurisdiction for research element definition (if applicable)
  * @param {markdown} [props.purpose] - Why this research element definition is defined
  * @param {string} [props.usage] - Describes the clinical usage of the ResearchElementDefinition
  * @param {markdown} [props.copyright] - Use and/or publishing restrictions
  * @param {date} [props.approvalDate] - When the research element definition was approved by publisher
  * @param {date} [props.lastReviewDate] - When the research element definition was last reviewed
  * @param {Period} [props.effectivePeriod] - When the research element definition is expected to be used
  * @param {CodeableConcept} [props.topic] - The category of the ResearchElementDefinition, such as Education, Treatment, Assessment, etc.
  * @param {ContactDetail} [props.author] - Who authored the content
  * @param {ContactDetail} [props.editor] - Who edited the content
  * @param {ContactDetail} [props.reviewer] - Who reviewed the content
  * @param {ContactDetail} [props.endorser] - Who endorsed the content
  * @param {RelatedArtifact} [props.relatedArtifact] - Additional documentation, citations, etc.
  * @param {canonical} [props.library] - Logic used by the ResearchElementDefinition
  * @param {string} [props.type] - population | exposure | outcome
  * @param {string} [props.variableType] - dichotomous | continuous | descriptive
  * @param {BackboneElement} [props.characteristic] - What defines the members of the research element
  */
declare function researchElementDefinition(type: "ResearchElementDefinition", props: ResearchElementDefinition_Props): any;
declare function researchElementDefinition(props: ResearchElementDefinition_Props): any;
/**
  * Create a ResearchStudy resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for study
  * @param {string} [props.title] - Name for this study
  * @param {Reference} [props.protocol] - Steps followed in executing study
  * @param {Reference} [props.partOf] - Part of larger study
  * @param {string} [props.status] - active | administratively-completed | approved | closed-to-accrual | closed-to-accrual-and-intervention | completed | disapproved | in-review | temporarily-closed-to-accrual | temporarily-closed-to-accrual-and-intervention | withdrawn
  * @param {CodeableConcept} [props.primaryPurposeType] - treatment | prevention | diagnostic | supportive-care | screening | health-services-research | basic-science | device-feasibility
  * @param {CodeableConcept} [props.phase] - n-a | early-phase-1 | phase-1 | phase-1-phase-2 | phase-2 | phase-2-phase-3 | phase-3 | phase-4
  * @param {CodeableConcept} [props.category] - Classifications for the study
  * @param {CodeableConcept} [props.focus] - Drugs, devices, etc. under study
  * @param {CodeableConcept} [props.condition] - Condition being studied
  * @param {ContactDetail} [props.contact] - Contact details for the study
  * @param {RelatedArtifact} [props.relatedArtifact] - References and dependencies
  * @param {CodeableConcept} [props.keyword] - Used to search for the study
  * @param {CodeableConcept} [props.location] - Geographic region(s) for study
  * @param {markdown} [props.description] - What this is study doing
  * @param {Reference} [props.enrollment] - Inclusion & exclusion criteria
  * @param {Period} [props.period] - When the study began and ended
  * @param {Reference} [props.sponsor] - Organization that initiates and is legally responsible for the study
  * @param {Reference} [props.principalInvestigator] - Researcher who oversees multiple aspects of the study
  * @param {Reference} [props.site] - Facility where study activities are conducted
  * @param {CodeableConcept} [props.reasonStopped] - accrual-goal-met | closed-due-to-toxicity | closed-due-to-lack-of-study-progress | temporarily-closed-per-study-design
  * @param {Annotation} [props.note] - Comments made about the study
  * @param {BackboneElement} [props.arm] - Defined path through the study for a subject
  * @param {BackboneElement} [props.objective] - A goal for the study
  */
declare function researchStudy(type: "ResearchStudy", props: ResearchStudy_Props): any;
declare function researchStudy(props: ResearchStudy_Props): any;
/**
  * Create a ResearchSubject resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for research subject in a study
  * @param {string} [props.status] - candidate | eligible | follow-up | ineligible | not-registered | off-study | on-study | on-study-intervention | on-study-observation | pending-on-study | potential-candidate | screening | withdrawn
  * @param {Period} [props.period] - Start and end of participation
  * @param {Reference} [props.study] - Study subject is part of
  * @param {Reference} [props.individual] - Who is part of study
  * @param {string} [props.assignedArm] - What path should be followed
  * @param {string} [props.actualArm] - What path was followed
  * @param {Reference} [props.consent] - Agreement to participate in study
  */
declare function researchSubject(type: "ResearchSubject", props: ResearchSubject_Props): any;
declare function researchSubject(props: ResearchSubject_Props): any;
/**
  * Create a RiskAssessment resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Unique identifier for the assessment
  * @param {Reference} [props.basedOn] - Request fulfilled by this assessment
  * @param {Reference} [props.parent] - Part of this occurrence
  * @param {string} [props.status] - registered | preliminary | final | amended +
  * @param {CodeableConcept} [props.method] - Evaluation mechanism
  * @param {CodeableConcept} [props.code] - Type of assessment
  * @param {Reference} [props.subject] - Who/what does assessment apply to?
  * @param {Reference} [props.encounter] - Where was assessment performed?
  * @param {dateTime|Period} [props.occurrence] - When was assessment made?
  * @param {Reference} [props.condition] - Condition assessed
  * @param {Reference} [props.performer] - Who did assessment?
  * @param {CodeableConcept} [props.reasonCode] - Why the assessment was necessary?
  * @param {Reference} [props.reasonReference] - Why the assessment was necessary?
  * @param {Reference} [props.basis] - Information used in assessment
  * @param {BackboneElement} [props.prediction] - Outcome predicted
  * @param {string} [props.mitigation] - How to reduce risk
  * @param {Annotation} [props.note] - Comments on the risk assessment
  */
declare function riskAssessment(type: "RiskAssessment", props: RiskAssessment_Props): any;
declare function riskAssessment(props: RiskAssessment_Props): any;
/**
  * Create a Schedule resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {boolean} [props.active] - Whether this schedule is in active use
  * @param {CodeableConcept} [props.serviceCategory] - High-level category
  * @param {CodeableConcept} [props.serviceType] - Specific service
  * @param {CodeableConcept} [props.specialty] - Type of specialty needed
  * @param {Reference} [props.actor] - Resource(s) that availability information is being provided for
  * @param {Period} [props.planningHorizon] - Period of time covered by schedule
  * @param {string} [props.comment] - Comments on availability
  */
declare function schedule(type: "Schedule", props: Schedule_Props): any;
declare function schedule(props: Schedule_Props): any;
/**
  * Create a ServiceRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Identifiers assigned to this order
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {Reference} [props.replaces] - What request replaces
  * @param {Identifier} [props.requisition] - Composite Request ID
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
  * @param {CodeableConcept} [props.category] - Classification of service
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {boolean} [props.doNotPerform] - True if service/procedure should not be performed
  * @param {CodeableConcept} [props.code] - What is being requested/ordered
  * @param {CodeableConcept} [props.orderDetail] - Additional order information
  * @param {Quantity|Ratio|Range} [props.quantity] - Service amount
  * @param {Reference} [props.subject] - Individual or Entity the service is ordered for
  * @param {Reference} [props.encounter] - Encounter in which the request was created
  * @param {dateTime|Period|Timing} [props.occurrence] - When service should occur
  * @param {boolean|CodeableConcept} [props.asNeeded] - Preconditions for service
  * @param {dateTime} [props.authoredOn] - Date request signed
  * @param {Reference} [props.requester] - Who/what is requesting service
  * @param {CodeableConcept} [props.performerType] - Performer role
  * @param {Reference} [props.performer] - Requested performer
  * @param {CodeableConcept} [props.locationCode] - Requested location
  * @param {Reference} [props.locationReference] - Requested location
  * @param {CodeableConcept} [props.reasonCode] - Explanation/Justification for procedure or service
  * @param {Reference} [props.reasonReference] - Explanation/Justification for service or service
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {Reference} [props.supportingInfo] - Additional clinical information
  * @param {Reference} [props.specimen] - Procedure Samples
  * @param {CodeableConcept} [props.bodySite] - Location on Body
  * @param {Annotation} [props.note] - Comments
  * @param {string} [props.patientInstruction] - Patient or consumer-oriented instructions
  * @param {Reference} [props.relevantHistory] - Request provenance
  */
declare function serviceRequest(type: "ServiceRequest", props: ServiceRequest_Props): any;
declare function serviceRequest(props: ServiceRequest_Props): any;
/**
  * Create a Slot resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {CodeableConcept} [props.serviceCategory] - A broad categorization of the service that is to be performed during this appointment
  * @param {CodeableConcept} [props.serviceType] - The type of appointments that can be booked into this slot (ideally this would be an identifiable service - which is at a location, rather than the location itself). If provided then this overrides the value provided on the availability resource
  * @param {CodeableConcept} [props.specialty] - The specialty of a practitioner that would be required to perform the service requested in this appointment
  * @param {CodeableConcept} [props.appointmentType] - The style of appointment or patient that may be booked in the slot (not service type)
  * @param {Reference} [props.schedule] - The schedule resource that this slot defines an interval of status information
  * @param {string} [props.status] - busy | free | busy-unavailable | busy-tentative | entered-in-error
  * @param {instant} [props.start] - Date/Time that the slot is to begin
  * @param {instant} [props.end] - Date/Time that the slot is to conclude
  * @param {boolean} [props.overbooked] - This slot has already been overbooked, appointments are unlikely to be accepted for this time
  * @param {string} [props.comment] - Comments on the slot to describe any extended information. Such as custom constraints on the slot
  */
declare function slot(type: "Slot", props: Slot_Props): any;
declare function slot(props: Slot_Props): any;
/**
  * Create a Specimen resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External Identifier
  * @param {Identifier} [props.accessionIdentifier] - Identifier assigned by the lab
  * @param {string} [props.status] - available | unavailable | unsatisfactory | entered-in-error
  * @param {CodeableConcept} [props.type] - Kind of material that forms the specimen
  * @param {Reference} [props.subject] - Where the specimen came from. This may be from patient(s), from a location (e.g., the source of an environmental sample), or a sampling of a substance or a device
  * @param {dateTime} [props.receivedTime] - The time when specimen was received for processing
  * @param {Reference} [props.parent] - Specimen from which this specimen originated
  * @param {Reference} [props.request] - Why the specimen was collected
  * @param {BackboneElement} [props.collection] - Collection details
  * @param {BackboneElement} [props.processing] - Processing and processing step details
  * @param {BackboneElement} [props.container] - Direct container of specimen (tube/slide, etc.)
  * @param {CodeableConcept} [props.condition] - State of the specimen
  * @param {Annotation} [props.note] - Comments
  */
declare function specimen(type: "Specimen", props: Specimen_Props): any;
declare function specimen(props: Specimen_Props): any;
/**
  * Create a SpecimenDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business identifier of a kind of specimen
  * @param {CodeableConcept} [props.typeCollected] - Kind of material to collect
  * @param {CodeableConcept} [props.patientPreparation] - Patient preparation for collection
  * @param {string} [props.timeAspect] - Time aspect for collection
  * @param {CodeableConcept} [props.collection] - Specimen collection procedure
  * @param {BackboneElement} [props.typeTested] - Specimen in container intended for testing by lab
  */
declare function specimenDefinition(type: "SpecimenDefinition", props: SpecimenDefinition_Props): any;
declare function specimenDefinition(props: SpecimenDefinition_Props): any;
/**
  * Create a Substance resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Unique identifier
  * @param {string} [props.status] - active | inactive | entered-in-error
  * @param {CodeableConcept} [props.category] - What class/type of substance this is
  * @param {CodeableConcept} [props.code] - What substance this is
  * @param {string} [props.description] - Textual description of the substance, comments
  * @param {BackboneElement} [props.instance] - If this describes a specific package/container of the substance
  * @param {BackboneElement} [props.ingredient] - Composition information about the substance
  */
declare function substance(type: "Substance", props: Substance_Props): any;
declare function substance(props: Substance_Props): any;
/**
  * Create a SubstanceDefinition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Identifier by which this substance is known
  * @param {string} [props.version] - A business level version identifier of the substance
  * @param {CodeableConcept} [props.status] - Status of substance within the catalogue e.g. active, retired
  * @param {CodeableConcept} [props.classification] - A categorization, high level e.g. polymer or nucleic acid, or food, chemical, biological, or lower e.g. polymer linear or branch chain, or type of impurity
  * @param {CodeableConcept} [props.domain] - If the substance applies to human or veterinary use
  * @param {CodeableConcept} [props.grade] - The quality standard, established benchmark, to which substance complies (e.g. USP/NF, BP)
  * @param {markdown} [props.description] - Textual description of the substance
  * @param {Reference} [props.informationSource] - Supporting literature
  * @param {Annotation} [props.note] - Textual comment about the substance's catalogue or registry record
  * @param {Reference} [props.manufacturer] - The entity that creates, makes, produces or fabricates the substance
  * @param {Reference} [props.supplier] - An entity that is the source for the substance. It may be different from the manufacturer
  * @param {BackboneElement} [props.moiety] - Moiety, for structural modifications
  * @param {BackboneElement} [props.property] - General specifications for this substance
  * @param {BackboneElement} [props.molecularWeight] - The molecular weight or weight range
  * @param {BackboneElement} [props.structure] - Structural information
  * @param {BackboneElement} [props.code] - Codes associated with the substance
  * @param {BackboneElement} [props.name] - Names applicable to this substance
  * @param {BackboneElement} [props.relationship] - A link between this substance and another
  * @param {BackboneElement} [props.sourceMaterial] - Material or taxonomic/anatomical source
  */
declare function substanceDefinition(type: "SubstanceDefinition", props: SubstanceDefinition_Props): any;
declare function substanceDefinition(props: SubstanceDefinition_Props): any;
/**
  * Create a SupplyDelivery resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External identifier
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal or order
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - in-progress | completed | abandoned | entered-in-error
  * @param {Reference} [props.patient] - Patient for whom the item is supplied
  * @param {CodeableConcept} [props.type] - Category of dispense event
  * @param {BackboneElement} [props.suppliedItem] - The item that is delivered or supplied
  * @param {dateTime|Period|Timing} [props.occurrence] - When event occurred
  * @param {Reference} [props.supplier] - Dispenser
  * @param {Reference} [props.destination] - Where the Supply was sent
  * @param {Reference} [props.receiver] - Who collected the Supply
  */
declare function supplyDelivery(type: "SupplyDelivery", props: SupplyDelivery_Props): any;
declare function supplyDelivery(props: SupplyDelivery_Props): any;
/**
  * Create a SupplyRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for SupplyRequest
  * @param {string} [props.status] - draft | active | suspended +
  * @param {CodeableConcept} [props.category] - The kind of supply (central, non-stock, etc.)
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {CodeableConcept|Reference} [props.item] - Medication, Substance, or Device requested to be supplied
  * @param {Quantity} [props.quantity] - The requested amount of the item indicated
  * @param {BackboneElement} [props.parameter] - Ordered item details
  * @param {dateTime|Period|Timing} [props.occurrence] - When the request should be fulfilled
  * @param {dateTime} [props.authoredOn] - When the request was made
  * @param {Reference} [props.requester] - Individual making the request
  * @param {Reference} [props.supplier] - Who is intended to fulfill the request
  * @param {CodeableConcept} [props.reasonCode] - The reason why the supply item was requested
  * @param {Reference} [props.reasonReference] - The reason why the supply item was requested
  * @param {Reference} [props.deliverFrom] - The origin of the supply
  * @param {Reference} [props.deliverTo] - The destination of the supply
  */
declare function supplyRequest(type: "SupplyRequest", props: SupplyRequest_Props): any;
declare function supplyRequest(props: SupplyRequest_Props): any;
/**
  * Create a Task resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Task Instance Identifier
  * @param {canonical} [props.instantiatesCanonical] - Formal definition of task
  * @param {string} [props.instantiatesUri] - Formal definition of task
  * @param {Reference} [props.basedOn] - Request fulfilled by this task
  * @param {Identifier} [props.groupIdentifier] - Requisition or grouper id
  * @param {Reference} [props.partOf] - Composite task
  * @param {string} [props.status] - draft | requested | received | accepted | +
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {CodeableConcept} [props.businessStatus] - E.g. "Specimen collected", "IV prepped"
  * @param {string} [props.intent] - unknown | proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {CodeableConcept} [props.code] - Task Type
  * @param {string} [props.description] - Human-readable explanation of task
  * @param {Reference} [props.focus] - What task is acting on
  * @param {Reference} [props.for] - Beneficiary of the Task
  * @param {Reference} [props.encounter] - Healthcare event during which this task originated
  * @param {Period} [props.executionPeriod] - Start and end time of execution
  * @param {dateTime} [props.authoredOn] - Task Creation Date
  * @param {dateTime} [props.lastModified] - Task Last Modified Date
  * @param {Reference} [props.requester] - Who is asking for task to be done
  * @param {CodeableConcept} [props.performerType] - Requested performer
  * @param {Reference} [props.owner] - Responsible individual
  * @param {Reference} [props.location] - Where task occurs
  * @param {CodeableConcept} [props.reasonCode] - Why task is needed
  * @param {Reference} [props.reasonReference] - Why task is needed
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {Annotation} [props.note] - Comments made about the task
  * @param {Reference} [props.relevantHistory] - Key events in history of the Task
  * @param {BackboneElement} [props.restriction] - Constraints on fulfillment tasks
  * @param {BackboneElement} [props.input] - Information used to perform task
  * @param {BackboneElement} [props.output] - Information produced as part of task
  */
declare function task(type: "Task", props: Task_Props): any;
declare function task(props: Task_Props): any;
/**
  * Create a TestReport resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - External identifier
  * @param {string} [props.name] - Informal name of the executed TestScript
  * @param {string} [props.status] - completed | in-progress | waiting | stopped | entered-in-error
  * @param {Reference} [props.testScript] - Reference to the  version-specific TestScript that was executed to produce this TestReport
  * @param {string} [props.result] - pass | fail | pending
  * @param {decimal} [props.score] - The final score (percentage of tests passed) resulting from the execution of the TestScript
  * @param {string} [props.tester] - Name of the tester producing this report (Organization or individual)
  * @param {dateTime} [props.issued] - When the TestScript was executed and this TestReport was generated
  * @param {BackboneElement} [props.participant] - A participant in the test execution, either the execution engine, a client, or a server
  * @param {BackboneElement} [props.setup] - The results of the series of required setup operations before the tests were executed
  * @param {BackboneElement} [props.test] - A test executed from the test script
  * @param {BackboneElement} [props.teardown] - The results of running the series of required clean up steps
  */
declare function testReport(type: "TestReport", props: TestReport_Props): any;
declare function testReport(props: TestReport_Props): any;
/**
  * Create a VerificationResult resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.target] - A resource that was validated
  * @param {string} [props.targetLocation] - The fhirpath location(s) within the resource that was validated
  * @param {CodeableConcept} [props.need] - none | initial | periodic
  * @param {string} [props.status] - attested | validated | in-process | req-revalid | val-fail | reval-fail
  * @param {dateTime} [props.statusDate] - When the validation status was updated
  * @param {CodeableConcept} [props.validationType] - nothing | primary | multiple
  * @param {CodeableConcept} [props.validationProcess] - The primary process by which the target is validated (edit check; value set; primary source; multiple sources; standalone; in context)
  * @param {Timing} [props.frequency] - Frequency of revalidation
  * @param {dateTime} [props.lastPerformed] - The date/time validation was last completed (including failed validations)
  * @param {date} [props.nextScheduled] - The date when target is next validated, if appropriate
  * @param {CodeableConcept} [props.failureAction] - fatal | warn | rec-only | none
  * @param {BackboneElement} [props.primarySource] - Information about the primary source(s) involved in validation
  * @param {BackboneElement} [props.attestation] - Information about the entity attesting to information
  * @param {BackboneElement} [props.validator] - Information about the entity validating information
  */
declare function verificationResult(type: "VerificationResult", props: VerificationResult_Props): any;
declare function verificationResult(props: VerificationResult_Props): any;
/**
  * Create a VisionPrescription resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - Business Identifier for vision prescription
  * @param {string} [props.status] - active | cancelled | draft | entered-in-error
  * @param {dateTime} [props.created] - Response creation date
  * @param {Reference} [props.patient] - Who prescription is for
  * @param {Reference} [props.encounter] - Created during encounter / admission / stay
  * @param {dateTime} [props.dateWritten] - When prescription was authorized
  * @param {Reference} [props.prescriber] - Who authorized the vision prescription
  * @param {BackboneElement} [props.lensSpecification] - Vision lens authorization
  */
declare function visionPrescription(type: "VisionPrescription", props: VisionPrescription_Props): any;
declare function visionPrescription(props: VisionPrescription_Props): any;

export { type Address, type Age, type Annotation, type Attachment, type BackboneElement, type CodeableConcept, type CodeableReference, type Coding, type ContactDetail, type ContactPoint, type Contributor, type Count, type DataRequirement, type Distance, type Dosage, type Duration, type Element, type ElementDefinition, type Expression, type Extension, type HumanName, type Identifier, type MarketingStatus, type Meta, type Money, type MoneyQuantity, type Narrative, type ParameterDefinition, type Period, type Population, type ProdCharacteristic, type ProductShelfLife, type Quantity, type Range, type Ratio, type RatioRange, type Reference, type RelatedArtifact, type SampledData, type Signature, type SimpleQuantity, type Timing, type TriggerDefinition, type UsageContext, account, activityDefinition, addExtension, administrableProductDefinition, adverseEvent, allergyIntolerance, appointment, appointmentResponse, type base64Binary, biologicallyDerivedProduct, bodyStructure, c, carePlan, careTeam, cc, chargeItem, chargeItemDefinition, citation, claim, claimResponse, clinicalImpression, clinicalUseDefinition, type code, coding, communication, communicationRequest, composite, concept, contract, coverage, coverageEligibilityRequest, coverageEligibilityResponse, detectedIssue, device, deviceDefinition, deviceMetric, deviceRequest, deviceUseStatement, diagnosticReport, domainResource, encounter, enrollmentRequest, enrollmentResponse, episodeOfCare, eventDefinition, evidence, evidenceReport, evidenceVariable, explanationOfBenefit, ext, extendSystemMap, extension, familyMemberHistory, findExtension, flag, goal, group, guidanceResponse, healthcareService, id, identifier, imagingStudy, immunization, immunizationEvaluation, immunizationRecommendation, ingredient, insurancePlan, invoice, library, list, location, manufacturedItemDefinition, mapSystems, type markdown, measure, measureReport, media, medication, medicationAdministration, medicationDispense, medicationKnowledge, medicationRequest, medicationStatement, medicinalProductDefinition, molecularSequence, nutritionOrder, nutritionProduct, observation, observationDefinition, type oid, organization, organizationAffiliation, packagedProductDefinition, patient, paymentNotice, paymentReconciliation, person, planDefinition, practitioner, practitionerRole, procedure, questionnaire, questionnaireResponse, ref, reference, regulatedAuthorization, relatedPerson, requestGroup, researchDefinition, researchElementDefinition, researchStudy, researchSubject, riskAssessment, schedule, serviceRequest, setSystemMap, slot, specimen, specimenDefinition, substance, substanceDefinition, supplyDelivery, supplyRequest, task, testReport, type url, type uuid, value, verificationResult, visionPrescription, type xhtml };

