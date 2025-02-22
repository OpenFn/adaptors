
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

export type Address = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * home | work | temp | old | billing - purpose of this address
     *  */
    use?: string;
    /**
     * postal | physical | both
     *  */
    type?: string;
    /**
     * Text representation of the address
     *  */
    text?: string;
    /**
     * Street name, number, direction & P.O. Box etc.
     *  */
    line?: string[];
    /**
     * Name of city, town etc.
     *  */
    city?: string;
    /**
     * District name (aka county)
     *  */
    district?: string;
    /**
     * Sub-unit of country (abbreviations ok)
     *  */
    state?: string;
    /**
     * Postal code for area
     *  */
    postalCode?: string;
    /**
     * Country (e.g. can be ISO 3166 2 or 3 letter code)
     *  */
    country?: string;
    /**
     * Time period when address was/is in use
     *  */
    period?: Period;
};
export type Age = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Numerical value (with implicit precision)
     *  */
    value?: number;
    /**
     * < | <= | >= | > - how to understand the value
     *  */
    comparator?: string;
    /**
     * Unit representation
     *  */
    unit?: string;
    /**
     * System that defines coded unit form
     *  */
    system?: string;
    /**
     * Coded form of the unit
     *  */
    code?: string;
};
export type Annotation = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Individual responsible for the annotation
     *  */
    author?: (string | Reference) | string;
    /**
     * When the annotation was made
     *  */
    time?: string;
    /**
     * The annotation  - text content (as markdown)
     *  */
    text?: markdown;
};
export type Attachment = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Mime type of the content, with charset etc.
     *  */
    contentType?: string;
    /**
     * Human language of the content (BCP-47)
     *  */
    language?: string;
    /**
     * Data inline, base64ed
     *  */
    data?: base64Binary;
    /**
     * Uri where the data can be found
     *  */
    url?: url;
    /**
     * Number of bytes of content (if url provided)
     *  */
    size?: number;
    /**
     * Hash of the data (sha-1, base64ed)
     *  */
    hash?: base64Binary;
    /**
     * Label to display in place of the data
     *  */
    title?: string;
    /**
     * Date attachment was first created
     *  */
    creation?: string;
};
export type BackboneElement = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Extensions that cannot be ignored even if unrecognized
     *  */
    modifierExtension?: Extension[];
};
export type CodeableConcept = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Code defined by a terminology system
     *  */
    coding?: Coding[];
    /**
     * Plain text representation of the concept
     *  */
    text?: string;
};
export type CodeableReference = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Reference to a concept (by class)
     *  */
    concept?: string[] | CodeableConcept;
    /**
     * Reference to a resource (by instance)
     *  */
    reference?: string | Reference;
};
export type Coding = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Identity of the terminology system
     *  */
    system?: string;
    /**
     * Version of the system - if relevant
     *  */
    version?: string;
    /**
     * Symbol in syntax defined by the system
     *  */
    code?: string;
    /**
     * Representation defined by the system
     *  */
    display?: string;
    /**
     * If this coding was chosen directly by the user
     *  */
    userSelected?: boolean;
};
export type ContactDetail = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Name of an individual to contact
     *  */
    name?: string;
    /**
     * Contact details for individual or organization
     *  */
    telecom?: ContactPoint[];
};
export type ContactPoint = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * phone | fax | email | pager | url | sms | other
     *  */
    system?: string;
    /**
     * The actual contact point details
     *  */
    value?: string;
    /**
     * home | work | temp | old | mobile - purpose of this contact point
     *  */
    use?: string;
    /**
     * Specify preferred order of use (1 = highest)
     *  */
    rank?: number;
    /**
     * Time period when the contact point was/is in use
     *  */
    period?: Period;
};
export type Contributor = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * author | editor | reviewer | endorser
     *  */
    type?: string;
    /**
     * Who contributed the content
     *  */
    name?: string;
    /**
     * Contact details of the contributor
     *  */
    contact?: ContactDetail[];
};
export type Count = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Numerical value (with implicit precision)
     *  */
    value?: number;
    /**
     * < | <= | >= | > - how to understand the value
     *  */
    comparator?: string;
    /**
     * Unit representation
     *  */
    unit?: string;
    /**
     * System that defines coded unit form
     *  */
    system?: string;
    /**
     * Coded form of the unit
     *  */
    code?: string;
};
export type DataRequirement = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * The type of the required data
     *  */
    type?: string;
    /**
     * The profile of the required data
     *  */
    profile?: any[];
    /**
     * E.g. Patient, Practitioner, RelatedPerson, Organization, Location, Device
     *  */
    subject?: (string[] | CodeableConcept) | (string | Reference);
    /**
     * Indicates specific structure elements that are referenced by the knowledge module
     *  */
    mustSupport?: string[];
    /**
     * What codes are expected
     *  */
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
    /**
     * What dates/date ranges are expected
     *  */
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
    /**
     * Number of results
     *  */
    limit?: number;
    /**
     * Order of the results
     *  */
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
};
export type Distance = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Numerical value (with implicit precision)
     *  */
    value?: number;
    /**
     * < | <= | >= | > - how to understand the value
     *  */
    comparator?: string;
    /**
     * Unit representation
     *  */
    unit?: string;
    /**
     * System that defines coded unit form
     *  */
    system?: string;
    /**
     * Coded form of the unit
     *  */
    code?: string;
};
export type Dosage = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Extensions that cannot be ignored even if unrecognized
     *  */
    modifierExtension?: Extension[];
    /**
     * The order of the dosage instructions
     *  */
    sequence?: number;
    /**
     * Free text dosage instructions e.g. SIG
     *  */
    text?: string;
    /**
     * Supplemental instruction or warnings to the patient - e.g. "with meals", "may cause drowsiness"
     *  */
    additionalInstruction?: string[] | CodeableConcept;
    /**
     * Patient or consumer oriented instructions
     *  */
    patientInstruction?: string;
    /**
     * When medication should be administered
     *  */
    timing?: Timing;
    /**
     * Take "as needed" (for x)
     *  */
    asNeeded?: boolean | (string[] | CodeableConcept);
    /**
     * Body site to administer to
     *  */
    site?: string[] | CodeableConcept;
    /**
     * How drug should enter body
     *  */
    route?: string[] | CodeableConcept;
    /**
     * Technique for administering medication
     *  */
    method?: string[] | CodeableConcept;
    /**
     * Amount of medication administered
     *  */
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
    /**
     * Upper limit on medication per unit of time
     *  */
    maxDosePerPeriod?: Ratio;
    /**
     * Upper limit on medication per administration
     *  */
    maxDosePerAdministration?: Quantity;
    /**
     * Upper limit on medication per lifetime of the patient
     *  */
    maxDosePerLifetime?: Quantity;
};
export type Duration = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Numerical value (with implicit precision)
     *  */
    value?: number;
    /**
     * < | <= | >= | > - how to understand the value
     *  */
    comparator?: string;
    /**
     * Unit representation
     *  */
    unit?: string;
    /**
     * System that defines coded unit form
     *  */
    system?: string;
    /**
     * Coded form of the unit
     *  */
    code?: string;
};
export type Element = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
};
export type ElementDefinition = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Extensions that cannot be ignored even if unrecognized
     *  */
    modifierExtension?: Extension[];
    /**
     * Path of the element in the hierarchy of elements
     *  */
    path?: string;
    /**
     * xmlAttr | xmlText | typeAttr | cdaText | xhtml
     *  */
    representation?: string;
    /**
     * Name for this particular element (in a set of slices)
     *  */
    sliceName?: string;
    /**
     * If this slice definition constrains an inherited slice definition (or not)
     *  */
    sliceIsConstraining?: boolean;
    /**
     * Name for element to display with or prompt for element
     *  */
    label?: string;
    /**
     * Corresponding codes in terminologies
     *  */
    code?: Coding;
    /**
     * This element is sliced - slices follow
     *  */
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
    /**
     * Concise definition for space-constrained presentation
     *  */
    short?: string;
    /**
     * Full formal definition as narrative text
     *  */
    definition?: markdown;
    /**
     * Comments about the use of this element
     *  */
    comment?: markdown;
    /**
     * Why this resource has been created
     *  */
    requirements?: markdown;
    /**
     * Other names
     *  */
    alias?: string[];
    /**
     * Minimum Cardinality
     *  */
    min?: number;
    /**
     * Maximum Cardinality (a number or *)
     *  */
    max?: string;
    /**
     * Base definition information for tools
     *  */
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
    /**
     * Reference to definition of content for the element
     *  */
    contentReference?: string;
    /**
     * Data type and Profile for this element
     *  */
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
    /**
     * Specified value if missing from instance
     *  */
    defaultValue?: base64Binary | boolean | any | string | string | string | number | string | string | number | markdown | oid | number | string | string | number | string | url | uuid | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
    /**
     * Implicit meaning when this element is missing
     *  */
    meaningWhenMissing?: markdown;
    /**
     * What the order of the elements means
     *  */
    orderMeaning?: string;
    /**
     * Value must be exactly this
     *  */
    fixed?: base64Binary | boolean | any | string | string | string | number | string | string | number | markdown | oid | number | string | string | number | string | url | uuid | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
    /**
     * Value must have at least these property values
     *  */
    pattern?: base64Binary | boolean | any | string | string | string | number | string | string | number | markdown | oid | number | string | string | number | string | url | uuid | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
    /**
     * Example value (as defined for type)
     *  */
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
    /**
     * Minimum Allowed Value (for some types)
     *  */
    minValue?: string | string | string | string | number | number | number | number | Quantity;
    /**
     * Maximum Allowed Value (for some types)
     *  */
    maxValue?: string | string | string | string | number | number | number | number | Quantity;
    /**
     * Max length for strings
     *  */
    maxLength?: number;
    /**
     * Reference to invariant about presence
     *  */
    condition?: string[];
    /**
     * Condition that must evaluate to true
     *  */
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
    /**
     * If the element must be supported
     *  */
    mustSupport?: boolean;
    /**
     * If this modifies the meaning of other elements
     *  */
    isModifier?: boolean;
    /**
     * Reason that this element is marked as a modifier
     *  */
    isModifierReason?: string;
    /**
     * Include when _summary = true?
     *  */
    isSummary?: boolean;
    /**
     * ValueSet details if this is coded
     *  */
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
    /**
     * Map element to another set of definitions
     *  */
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
};
export type Expression = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Natural language description of the condition
     *  */
    description?: string;
    /**
     * Short name assigned to expression for reuse
     *  */
    name?: string;
    /**
     * text/cql | text/fhirpath | application/x-fhir-query | text/cql-identifier | text/cql-expression | etc.
     *  */
    language?: string;
    /**
     * Expression in specified language
     *  */
    expression?: string;
    /**
     * Where the expression is found
     *  */
    reference?: string;
};
export type Extension = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * identifies the meaning of the extension
     *  */
    url?: string;
    /**
     * Value of extension
     *  */
    value?: base64Binary | boolean | any | string | string | string | number | string | string | number | markdown | oid | number | string | string | number | string | url | uuid | Address | Age | Annotation | Attachment | (string[] | CodeableConcept) | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | (string | Identifier) | Money | Period | Quantity | Range | Ratio | RatioRange | (string | Reference) | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
};
export type HumanName = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * usual | official | temp | nickname | anonymous | old | maiden
     *  */
    use?: string;
    /**
     * Text representation of the full name
     *  */
    text?: string;
    /**
     * Family name (often called 'Surname')
     *  */
    family?: string;
    /**
     * Given names (not always 'first'). Includes middle names
     *  */
    given?: string[];
    /**
     * Parts that come before the name
     *  */
    prefix?: string[];
    /**
     * Parts that come after the name
     *  */
    suffix?: string[];
    /**
     * Time period when name was/is in use
     *  */
    period?: Period;
};
export type Identifier = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * usual | official | temp | secondary | old (If known)
     *  */
    use?: string;
    /**
     * Description of identifier
     *  */
    type?: string[] | CodeableConcept;
    /**
     * The namespace for the identifier value
     *  */
    system?: string;
    /**
     * The value that is unique
     *  */
    value?: string;
    /**
     * Time period when id is/was valid for use
     *  */
    period?: Period;
    /**
     * Organization that issued id (may be just text)
     *  */
    assigner?: string | Reference;
};
export type MarketingStatus = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Extensions that cannot be ignored even if unrecognized
     *  */
    modifierExtension?: Extension[];
    /**
     * The country in which the marketing authorisation has been granted shall be specified It should be specified using the ISO 3166 ‑ 1 alpha-2 code elements
     *  */
    country?: string[] | CodeableConcept;
    /**
     * Where a Medicines Regulatory Agency has granted a marketing authorisation for which specific provisions within a jurisdiction apply, the jurisdiction can be specified using an appropriate controlled terminology The controlled term and the controlled term identifier shall be specified
     *  */
    jurisdiction?: string[] | CodeableConcept;
    /**
     * This attribute provides information on the status of the marketing of the medicinal product See ISO/TS 20443 for more information and examples
     *  */
    status?: string[] | CodeableConcept;
    /**
     * The date when the Medicinal Product is placed on the market by the Marketing Authorisation Holder (or where applicable, the manufacturer/distributor) in a country and/or jurisdiction shall be provided A complete date consisting of day, month and year shall be specified using the ISO 8601 date format NOTE “Placed on the market” refers to the release of the Medicinal Product into the distribution chain
     *  */
    dateRange?: Period;
    /**
     * The date when the Medicinal Product is placed on the market by the Marketing Authorisation Holder (or where applicable, the manufacturer/distributor) in a country and/or jurisdiction shall be provided A complete date consisting of day, month and year shall be specified using the ISO 8601 date format NOTE “Placed on the market” refers to the release of the Medicinal Product into the distribution chain
     *  */
    restoreDate?: string;
};
export type Meta = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Version specific identifier
     *  */
    versionId?: string;
    /**
     * When the resource version last changed
     *  */
    lastUpdated?: string;
    /**
     * Identifies where the resource comes from
     *  */
    source?: string;
    /**
     * Profiles this resource claims to conform to
     *  */
    profile?: any[];
    /**
     * Security Labels applied to this resource
     *  */
    security?: Coding;
    /**
     * Tags applied to this resource
     *  */
    tag?: Coding;
};
export type Money = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Numerical value (with implicit precision)
     *  */
    value?: number;
    /**
     * ISO 4217 Currency Code
     *  */
    currency?: string;
};
export type MoneyQuantity = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Numerical value (with implicit precision)
     *  */
    value?: number;
    /**
     * < | <= | >= | > - how to understand the value
     *  */
    comparator?: string;
    /**
     * Unit representation
     *  */
    unit?: string;
    /**
     * System that defines coded unit form
     *  */
    system?: string;
    /**
     * Coded form of the unit
     *  */
    code?: string;
};
export type Quantity = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Numerical value (with implicit precision)
     *  */
    value?: number;
    /**
     * < | <= | >= | > - how to understand the value
     *  */
    comparator?: string;
    /**
     * Unit representation
     *  */
    unit?: string;
    /**
     * System that defines coded unit form
     *  */
    system?: string;
    /**
     * Coded form of the unit
     *  */
    code?: string;
};
export type SimpleQuantity = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Numerical value (with implicit precision)
     *  */
    value?: number;
    /**
     * < | <= | >= | > - how to understand the value
     *  */
    comparator?: string;
    /**
     * Unit representation
     *  */
    unit?: string;
    /**
     * System that defines coded unit form
     *  */
    system?: string;
    /**
     * Coded form of the unit
     *  */
    code?: string;
};
export type Narrative = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * generated | extensions | additional | empty
     *  */
    status?: string;
    /**
     * Limited xhtml content
     *  */
    div?: xhtml;
};
export type ParameterDefinition = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Name used to access the parameter value
     *  */
    name?: string;
    /**
     * in | out
     *  */
    use?: string;
    /**
     * Minimum cardinality
     *  */
    min?: number;
    /**
     * Maximum cardinality (a number of *)
     *  */
    max?: string;
    /**
     * A brief description of the parameter
     *  */
    documentation?: string;
    /**
     * What type of value
     *  */
    type?: string;
    /**
     * What profile the value is expected to be
     *  */
    profile?: any;
};
export type Period = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Starting time with inclusive boundary
     *  */
    start?: string;
    /**
     * End time with inclusive boundary, if not ongoing
     *  */
    end?: string;
};
export type Population = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Extensions that cannot be ignored even if unrecognized
     *  */
    modifierExtension?: Extension[];
    /**
     * The age of the specific population
     *  */
    age?: Range | (string[] | CodeableConcept);
    /**
     * The gender of the specific population
     *  */
    gender?: string[] | CodeableConcept;
    /**
     * Race of the specific population
     *  */
    race?: string[] | CodeableConcept;
    /**
     * The existing physiological conditions of the specific population to which this applies
     *  */
    physiologicalCondition?: string[] | CodeableConcept;
};
export type ProdCharacteristic = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Extensions that cannot be ignored even if unrecognized
     *  */
    modifierExtension?: Extension[];
    /**
     * Where applicable, the height can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used
     *  */
    height?: Quantity;
    /**
     * Where applicable, the width can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used
     *  */
    width?: Quantity;
    /**
     * Where applicable, the depth can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used
     *  */
    depth?: Quantity;
    /**
     * Where applicable, the weight can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used
     *  */
    weight?: Quantity;
    /**
     * Where applicable, the nominal volume can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used
     *  */
    nominalVolume?: Quantity;
    /**
     * Where applicable, the external diameter can be specified using a numerical value and its unit of measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used
     *  */
    externalDiameter?: Quantity;
    /**
     * Where applicable, the shape can be specified An appropriate controlled vocabulary shall be used The term and the term identifier shall be used
     *  */
    shape?: string;
    /**
     * Where applicable, the color can be specified An appropriate controlled vocabulary shall be used The term and the term identifier shall be used
     *  */
    color?: string[];
    /**
     * Where applicable, the imprint can be specified as text
     *  */
    imprint?: string[];
    /**
     * Where applicable, the image can be provided The format of the image attachment shall be specified by regional implementations
     *  */
    image?: Attachment[];
    /**
     * Where applicable, the scoring can be specified An appropriate controlled vocabulary shall be used The term and the term identifier shall be used
     *  */
    scoring?: string[] | CodeableConcept;
};
export type ProductShelfLife = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Extensions that cannot be ignored even if unrecognized
     *  */
    modifierExtension?: Extension[];
    /**
     * Unique identifier for the packaged Medicinal Product
     *  */
    identifier?: string | Identifier;
    /**
     * This describes the shelf life, taking into account various scenarios such as shelf life of the packaged Medicinal Product itself, shelf life after transformation where necessary and shelf life after the first opening of a bottle, etc. The shelf life type shall be specified using an appropriate controlled vocabulary The controlled term and the controlled term identifier shall be specified
     *  */
    type?: string[] | CodeableConcept;
    /**
     * The shelf life time period can be specified using a numerical value for the period of time and its unit of time measurement The unit of measurement shall be specified in accordance with ISO 11240 and the resulting terminology The symbol and the symbol identifier shall be used
     *  */
    period?: Quantity;
    /**
     * Special precautions for storage, if any, can be specified using an appropriate controlled vocabulary The controlled term and the controlled term identifier shall be specified
     *  */
    specialPrecautionsForStorage?: string[] | CodeableConcept;
};
export type Range = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Low limit
     *  */
    low?: Quantity;
    /**
     * High limit
     *  */
    high?: Quantity;
};
export type Ratio = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Numerator value
     *  */
    numerator?: Quantity;
    /**
     * Denominator value
     *  */
    denominator?: Quantity;
};
export type RatioRange = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Low Numerator limit
     *  */
    lowNumerator?: Quantity;
    /**
     * High Numerator limit
     *  */
    highNumerator?: Quantity;
    /**
     * Denominator value
     *  */
    denominator?: Quantity;
};
export type Reference = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Literal reference, Relative, internal or absolute URL
     *  */
    reference?: string;
    /**
     * Type the reference refers to (e.g. "Patient")
     *  */
    type?: string;
    /**
     * Logical reference, when literal reference is not known
     *  */
    identifier?: string | Identifier;
    /**
     * Text alternative for the resource
     *  */
    display?: string;
};
export type RelatedArtifact = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * documentation | justification | citation | predecessor | successor | derived-from | depends-on | composed-of
     *  */
    type?: string;
    /**
     * Short label
     *  */
    label?: string;
    /**
     * Brief description of the related artifact
     *  */
    display?: string;
    /**
     * Bibliographic citation for the artifact
     *  */
    citation?: markdown;
    /**
     * Where the artifact can be accessed
     *  */
    url?: url;
    /**
     * What document is being referenced
     *  */
    document?: Attachment;
    /**
     * What resource is being referenced
     *  */
    resource?: any;
};
export type SampledData = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Zero value and units
     *  */
    origin?: Quantity;
    /**
     * Number of milliseconds between samples
     *  */
    period?: number;
    /**
     * Multiply data by this before adding to origin
     *  */
    factor?: number;
    /**
     * Lower limit of detection
     *  */
    lowerLimit?: number;
    /**
     * Upper limit of detection
     *  */
    upperLimit?: number;
    /**
     * Number of sample points at each time point
     *  */
    dimensions?: number;
    /**
     * Decimal values with spaces, or "E" | "U" | "L"
     *  */
    data?: string;
};
export type Signature = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Indication of the reason the entity signed the object(s)
     *  */
    type?: Coding;
    /**
     * When the signature was created
     *  */
    when?: string;
    /**
     * Who signed
     *  */
    who?: string | Reference;
    /**
     * The party represented
     *  */
    onBehalfOf?: string | Reference;
    /**
     * The technical format of the signed resources
     *  */
    targetFormat?: string;
    /**
     * The technical format of the signature
     *  */
    sigFormat?: string;
    /**
     * The actual signature content (XML DigSig. JWS, picture, etc.)
     *  */
    data?: base64Binary;
};
export type Timing = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Extensions that cannot be ignored even if unrecognized
     *  */
    modifierExtension?: Extension[];
    /**
     * When the event occurs
     *  */
    event?: string[];
    /**
     * When the event is to occur
     *  */
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
    /**
     * BID | TID | QID | AM | PM | QD | QOD | +
     *  */
    code?: string[] | CodeableConcept;
};
export type TriggerDefinition = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * named-event | periodic | data-changed | data-added | data-modified | data-removed | data-accessed | data-access-ended
     *  */
    type?: string;
    /**
     * Name or URI that identifies the event
     *  */
    name?: string;
    /**
     * Timing of the event
     *  */
    timing?: Timing | (string | Reference) | string | string;
    /**
     * Triggering data of the event (multiple = 'and')
     *  */
    data?: DataRequirement[];
    /**
     * Whether the event triggers (boolean expression)
     *  */
    condition?: Expression;
};
export type UsageContext = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Type of context being specified
     *  */
    code?: Coding;
    /**
     * Value that defines the context
     *  */
    value?: (string[] | CodeableConcept) | Quantity | Range | (string | Reference);
};
export type base64Binary = {
    /**
     * xml:id (or equivalent in JSON)
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Primitive value for base64Binary
     *  */
    value?: string;
};
export type code = {
    /**
     * xml:id (or equivalent in JSON)
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Primitive value for code
     *  */
    value?: string;
};
export type markdown = {
    /**
     * xml:id (or equivalent in JSON)
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Primitive value for markdown
     *  */
    value?: string;
};
export type oid = {
    /**
     * xml:id (or equivalent in JSON)
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Primitive value for oid
     *  */
    value?: string;
};
export type url = {
    /**
     * xml:id (or equivalent in JSON)
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Primitive value for url
     *  */
    value?: string;
};
export type uuid = {
    /**
     * xml:id (or equivalent in JSON)
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Primitive value for uuid
     *  */
    value?: string;
};
export type xhtml = {
    /**
     * xml:id (or equivalent in JSON)
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension[];
    /**
     * Actual xhtml
     *  */
    value?: string;
};
