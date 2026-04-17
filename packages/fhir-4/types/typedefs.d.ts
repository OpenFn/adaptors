type Address = {
    /**
     * - Name of city, town etc.
     */
    city?: string;
    /**
     * - Country (e.g. can be ISO 3166 2 or 3 letter code)
     */
    country?: string;
    /**
     * - District name (aka county)
     */
    district?: string;
    /**
     * - Additional content defined by implementations
     */
    extension?: Extension[];
    /**
     * - Unique id for inter-element referencing
     */
    id?: string;
    /**
     * - Street name, number, direction & P.O. Box etc.
     */
    line?: string[];
    /**
     * - Time period when address was/is in use
     */
    period?: Period;
    /**
     * - Postal code for area
     */
    postalCode?: string;
    /**
     * - Sub-unit of country (abbreviations ok)
     */
    state?: string;
    /**
     * - Text representation of the address
     */
    text?: string;
    /**
     * - postal | physical | both
     */
    type?: string;
    /**
     * - home | work | temp | old | billing - purpose of this address
     */
    use?: string;
};
type CodeableConcept = {
    /**
     * - Code defined by a terminology system
     */
    coding?: Coding[];
    /**
     * - Additional content defined by implementations
     */
    extension?: Extension[];
    /**
     * - Unique id for inter-element referencing
     */
    id?: string;
    /**
     * - Plain text representation of the concept
     */
    text?: string;
};
type Coding = {
    /**
     * - Symbol in syntax defined by the system
     */
    code?: string;
    /**
     * - Representation defined by the system
     */
    display?: string;
    /**
     * - Additional content defined by implementations
     */
    extension?: Extension[];
    /**
     * - Unique id for inter-element referencing
     */
    id?: string;
    /**
     * - Identity of the terminology system
     */
    system?: string;
    /**
     * - If this coding was chosen directly by the user
     */
    userSelected?: boolean;
    /**
     * - Version of the system - if relevant
     */
    version?: string;
};
type ContactPoint = {
    /**
     * - Additional content defined by implementations
     */
    extension?: Extension[];
    /**
     * - Unique id for inter-element referencing
     */
    id?: string;
    /**
     * - Time period when the contact point was/is in use
     */
    period?: Period;
    /**
     * - Specify preferred order of use (1 = highest)
     */
    rank?: number;
    /**
     * - phone | fax | email | pager | url | sms | other
     */
    system?: string;
    /**
     * - home | work | temp | old | mobile - purpose of this contact point
     */
    use?: string;
    /**
     * - The actual contact point details
     */
    value?: string;
};
type HumanName = {
    /**
     * - Additional content defined by implementations
     */
    extension?: Extension[];
    /**
     * - Family name (often called 'Surname')
     */
    family?: string;
    /**
     * - Given names (not always 'first'). Includes middle names
     */
    given?: string[];
    /**
     * - Unique id for inter-element referencing
     */
    id?: string;
    /**
     * - Time period when name was/is in use
     */
    period?: Period;
    /**
     * - Parts that come before the name
     */
    prefix?: string[];
    /**
     * - Parts that come after the name
     */
    suffix?: string[];
    /**
     * - Text representation of the full name
     */
    text?: string;
    /**
     * - usual | official | temp | nickname | anonymous | old | maiden
     */
    use?: string;
};
type Identifier = {
    /**
     * - Organization that issued id (may be just text)
     */
    assigner?: string | Reference;
    /**
     * - Additional content defined by implementations
     */
    extension?: Extension[];
    /**
     * - Unique id for inter-element referencing
     */
    id?: string;
    /**
     * - Time period when id is/was valid for use
     */
    period?: Period;
    /**
     * - The namespace for the identifier value
     */
    system?: string;
    /**
     * - Description of identifier
     */
    type?: string[] | CodeableConcept;
    /**
     * - usual | official | temp | secondary | old (If known)
     */
    use?: string;
    /**
     * - The value that is unique
     */
    value?: string;
};
type Period = {
    /**
     * - End time with inclusive boundary, if not ongoing
     */
    end?: string;
    /**
     * - Additional content defined by implementations
     */
    extension?: Extension[];
    /**
     * - Unique id for inter-element referencing
     */
    id?: string;
    /**
     * - Starting time with inclusive boundary
     */
    start?: string;
};
type Reference = {
    /**
     * - Text alternative for the resource
     */
    display?: string;
    /**
     * - Additional content defined by implementations
     */
    extension?: Extension[];
    /**
     * - Unique id for inter-element referencing
     */
    id?: string;
    /**
     * - Logical reference, when literal reference is not known
     */
    identifier?: string | Identifier;
    /**
     * - Literal reference, Relative, internal or absolute URL
     */
    reference?: string;
    /**
     * - Type the reference refers to (e.g. "Patient")
     */
    type?: string;
};
