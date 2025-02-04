
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import { cursor, dataPath, dataValue, dateFns, each, field, fields, fn, lastReferenceValue, merge, sourceValue } from '@openfn/language-common';

declare const Adaptor_cursor: typeof cursor;
declare const Adaptor_dataPath: typeof dataPath;
declare const Adaptor_dataValue: typeof dataValue;
declare const Adaptor_dateFns: typeof dateFns;
declare const Adaptor_each: typeof each;
declare const Adaptor_field: typeof field;
declare const Adaptor_fields: typeof fields;
declare const Adaptor_fn: typeof fn;
declare const Adaptor_lastReferenceValue: typeof lastReferenceValue;
declare const Adaptor_merge: typeof merge;
declare const Adaptor_sourceValue: typeof sourceValue;
declare namespace Adaptor {
  export { Adaptor_cursor as cursor, Adaptor_dataPath as dataPath, Adaptor_dataValue as dataValue, Adaptor_dateFns as dateFns, Adaptor_each as each, Adaptor_field as field, Adaptor_fields as fields, Adaptor_fn as fn, Adaptor_lastReferenceValue as lastReferenceValue, Adaptor_merge as merge, Adaptor_sourceValue as sourceValue };
}

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
 * Alias for util.identifier()
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
 * @param {string} system - URL to the system. Well be mapped using the system map.
 */
declare const coding: (code: any, system: any) => {
    code: any;
    system: any;
};
declare const c: (code: any, system: any) => {
    code: any;
    system: any;
};
/**
 * Create a value object { code, system } with optional system. Systems will be mapped.
 * @public
 * @function
 * @param {string} value - the value
 * @param {string} system - URL to the system. Well be mapped using the system map.
 */
declare const value: (value: any, system: any, ...extra: any[]) => any;
/**
 * Create a codeableConcept. Codings can be coding objects or
 * [code, system] tuples
 * if the first argument is a string, it will be set as the text.
 * Systems will be mapped with the system map
 * @public
 * @function
 * @example <caption><Create a codeableConcept</caption>
 * const myConcept = util.concept(['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 * * @example <caption><Create a codeableConcept with text</caption>
 * const myConcept = util.concept('smart care id', ['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 */
declare const concept: (text: any, ...codings: any[]) => {};
/**
 * Alias for util.concept()
 * @public
 * @function
 */
declare const cc: (text: any, ...codings: any[]) => {};
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
declare const reference: (ref: any, opts: any) => any;
/**
 * Alias for util.reference()
 * @public
 * @function
 */
declare const ref: (ref: any, opts: any) => any;
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

declare const datatypes_d_addExtension: typeof addExtension;
declare const datatypes_d_c: typeof c;
declare const datatypes_d_cc: typeof cc;
declare const datatypes_d_coding: typeof coding;
declare const datatypes_d_composite: typeof composite;
declare const datatypes_d_concept: typeof concept;
declare const datatypes_d_extendSystemMap: typeof extendSystemMap;
declare const datatypes_d_findExtension: typeof findExtension;
declare const datatypes_d_id: typeof id;
declare const datatypes_d_identifier: typeof identifier;
declare const datatypes_d_mapSystems: typeof mapSystems;
declare const datatypes_d_ref: typeof ref;
declare const datatypes_d_reference: typeof reference;
declare const datatypes_d_setSystemMap: typeof setSystemMap;
declare const datatypes_d_value: typeof value;
declare namespace datatypes_d {
  export { datatypes_d_addExtension as addExtension, datatypes_d_c as c, datatypes_d_cc as cc, datatypes_d_coding as coding, datatypes_d_composite as composite, datatypes_d_concept as concept, datatypes_d_extendSystemMap as extendSystemMap, datatypes_d_findExtension as findExtension, datatypes_d_id as id, datatypes_d_identifier as identifier, datatypes_d_mapSystems as mapSystems, datatypes_d_ref as ref, datatypes_d_reference as reference, datatypes_d_setSystemMap as setSystemMap, datatypes_d_value as value };
}

declare type Address = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
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
    line?: string;
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
declare type Attachment = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
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
    extension?: Extension;
    /**
     * Extensions that cannot be ignored even if unrecognized
     *  */
    modifierExtension?: Extension;
};
declare type CodeableConcept = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
    /**
     * Code defined by a terminology system
     *  */
    coding?: Coding;
    /**
     * Plain text representation of the concept
     *  */
    text?: string;
};
declare type Coding = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
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
declare type ContactPoint = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
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
declare type Extension = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
    /**
     * identifies the meaning of the extension
     *  */
    url?: string;
    /**
     * Value of extension
     *  */
    value?: base64Binary;
};
declare type HumanName = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
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
    given?: string;
    /**
     * Parts that come before the name
     *  */
    prefix?: string;
    /**
     * Parts that come after the name
     *  */
    suffix?: string;
    /**
     * Time period when name was/is in use
     *  */
    period?: Period;
};
declare type Identifier$1 = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
    /**
     * usual | official | temp | secondary | old (If known)
     *  */
    use?: string;
    /**
     * Description of identifier
     *  */
    type?: CodeableConcept;
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
    assigner?: Reference;
};
declare type Meta = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
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
    profile?: any;
    /**
     * Security Labels applied to this resource
     *  */
    security?: Coding;
    /**
     * Tags applied to this resource
     *  */
    tag?: Coding;
};
declare type Narrative = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
    /**
     * generated | extensions | additional | empty
     *  */
    status?: string;
    /**
     * Limited xhtml content
     *  */
    div?: xhtml;
};
declare type Period = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
    /**
     * Starting time with inclusive boundary
     *  */
    start?: string;
    /**
     * End time with inclusive boundary, if not ongoing
     *  */
    end?: string;
};
declare type Reference = {
    /**
     * Unique id for inter-element referencing
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
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
    identifier?: Identifier$1;
    /**
     * Text alternative for the resource
     *  */
    display?: string;
};
declare type base64Binary = {
    /**
     * xml:id (or equivalent in JSON)
     *  */
    id?: string;
    /**
     * Additional content defined by implementations
     *  */
    extension?: Extension;
    /**
     * Primitive value for base64Binary
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
    extension?: Extension;
    /**
     * Primitive value for url
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
    extension?: Extension;
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
    contained?: any;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier$1;
    active?: boolean;
    name?: HumanName;
    telecom?: ContactPoint;
    gender?: string;
    birthDate?: string;
    deceased?: boolean;
    address?: Address;
    maritalStatus?: CodeableConcept;
    multipleBirth?: boolean;
    photo?: Attachment;
    contact?: BackboneElement;
    communication?: BackboneElement;
    generalPractitioner?: Reference;
    managingOrganization?: Reference;
    link?: BackboneElement;
};

/**
  * Create a FHIR Patient resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant. Optional.
  * @param {object} props - Properties to apply to the resource
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - An identifier for this patient
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {HumanName} [props.name] - A name associated with the patient
  * @param {ContactPoint} [props.telecom] - A contact detail for the individual
  * @param {string} [props.gender] - male | female | other | unknown
  * @param {date} [props.birthDate] - The date of birth for the individual
  * @param {boolean} [props.deceased] - Indicates if the individual is deceased or not
  * @param {Address} [props.address] - An address for the individual
  * @param {CodeableConcept} [props.maritalStatus] - Marital (civil) status of a patient
  * @param {boolean} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
 */
declare function patient(type: string, props: Patient_Props): any;
declare function patient(props: Patient_Props): any;

declare const builders_d_patient: typeof patient;
declare namespace builders_d {
  export { builders_d_patient as patient };
}

export { builders_d as b, builders_d as builders, Adaptor as default, datatypes_d as util };

