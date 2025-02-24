
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

declare type Address = {
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
declare type Age = {
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
declare type Annotation = {
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
declare type Attachment = {
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
declare type BackboneElement = {
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
declare type CodeableConcept = {
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
declare type CodeableReference = {
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
declare type Coding = {
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
declare type ContactDetail = {
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
declare type ContactPoint = {
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
declare type Contributor = {
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
declare type Count = {
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
declare type DataRequirement = {
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
declare type Distance = {
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
declare type Dosage = {
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
declare type Duration = {
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
declare type Expression = {
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
declare type Extension = {
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
declare type HumanName = {
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
declare type Identifier = {
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
declare type Meta = {
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
declare type Money = {
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
declare type Quantity = {
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
declare type Narrative = {
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
declare type ParameterDefinition = {
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
declare type Period = {
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
declare type Range = {
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
declare type Ratio = {
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
declare type RatioRange = {
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
declare type Reference = {
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
declare type RelatedArtifact = {
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
declare type SampledData = {
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
declare type Signature = {
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
declare type Timing = {
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
declare type TriggerDefinition = {
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
declare type UsageContext = {
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
declare type base64Binary = {
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
declare type markdown = {
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
declare type oid = {
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
declare type url = {
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
declare type uuid = {
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
declare type xhtml = {
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

declare type Patient_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: any[];
    extension?: Extension[];
    modifierExtension?: Extension[];
    identifier?: Array<string | Identifier>;
    active?: boolean;
    name?: HumanName[];
    telecom?: ContactPoint[];
    gender?: string;
    birthDate?: string;
    deceased?: boolean | string;
    address?: Address[];
    maritalStatus?: string[] | CodeableConcept;
    multipleBirth?: boolean | number;
    photo?: Attachment[];
    contact?: BackboneElement[];
    communication?: BackboneElement[];
    generalPractitioner?: Array<string | Reference>;
    managingOrganization?: string | Reference;
    link?: BackboneElement[];
    initialiser?: any;
    typeShorthands?: any;
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
 * util.setSystemMap({
 *   SmartCareID: 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'
 * });
 * builders.patient('patient', { identifier: util.identifier('xyz', 'SmartCareId') })
 * };
 */
declare const setSystemMap: (newMappings: any) => void;
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
declare const extension: (url: string, value: any, props?: Omit<Extension, 'url'>) => {
    extension: ({
        url: string;
    } & Omit<Extension, "url">)[];
};
/**
 * Alias for b.extension()
 * @public
 * @function
 */
declare const ext: (url: string, value: any, props?: Omit<Extension, 'url'>) => {
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
declare const coding: (code: string, system: string, extra?: Omit<Coding, 'code' | 'system'>) => any;
declare const c: (code: string, system: string, extra?: Omit<Coding, 'code' | 'system'>) => any;
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
 * @example <caption><Create a codeableConcept</caption>
 * const myConcept = util.concept(['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 * * @example <caption><Create a codeableConcept with text</caption>
 * const myConcept = util.concept('smart care id', ['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 */
declare type ConceptCoding = Coding | [string, string, Omit<Coding, 'code' | 'system'>?];
declare const concept: (codings: ConceptCoding | ConceptCoding[], extra?: Omit<CodeableConcept, 'coding'>) => Coding | [string, string, Omit<Coding, "code" | "system">?] | ConceptCoding[] | {
    coding: any;
    id?: string;
    extension?: Extension[];
    text?: string;
};
/**
 * Alias for b.concept()
 * @public
 * @function
 */
declare const cc: (codings: ConceptCoding | ConceptCoding[], extra?: Omit<CodeableConcept, 'coding'>) => Coding | [string, string, Omit<Coding, "code" | "system">?] | ConceptCoding[] | {
    coding: any;
    id?: string;
    extension?: Extension[];
    text?: string;
};
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
  * Create a FHIR Patient resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant. Optional.
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.identifier] - An identifier for this patient
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {HumanName} [props.name] - A name associated with the patient
  * @param {ContactPoint} [props.telecom] - A contact detail for the individual
  * @param {string} [props.gender] - male | female | other | unknown
  * @param {date} [props.birthDate] - The date of birth for the individual
  * @param {boolean,dateTime} [props.deceased] - Indicates if the individual is deceased or not
  * @param {Address} [props.address] - An address for the individual
  * @param {CodeableConcept} [props.maritalStatus] - Marital (civil) status of a patient
  * @param {boolean,integer} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
 */
declare function patient(type: string, props: Patient_Props): any;
declare function patient(props: Patient_Props): any;

export { addExtension, c, cc, coding, composite, concept, ext, extendSystemMap, extension, findExtension, id, identifier, mapSystems, patient, ref, reference, setSystemMap, value };

