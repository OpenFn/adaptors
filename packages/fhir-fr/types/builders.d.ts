
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import { builders } from '@openfn/language-fhir-4';

declare type Patient_fr_core_patient_Props = {
    active?: boolean;
    address?: builders.Address[];
    birthDate?: string;
    communication?: builders.BackboneElement[];
    contact?: builders.BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: builders.Extension[];
    gender?: string;
    generalPractitioner?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    link?: builders.BackboneElement[];
    managingOrganization?: builders.Reference;
    maritalStatus?: builders.CodeableConcept;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    multipleBirth?: boolean | number;
    name?: builders.HumanName[];
    photo?: builders.Attachment[];
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Patient_fr_core_patient_ins_Props = {
    active?: boolean;
    address?: builders.Address[];
    birthDate?: string;
    communication?: builders.BackboneElement[];
    contact?: builders.BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: builders.Extension[];
    gender?: string;
    generalPractitioner?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    link?: builders.BackboneElement[];
    managingOrganization?: builders.Reference;
    maritalStatus?: builders.CodeableConcept;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    multipleBirth?: boolean | number;
    name?: builders.HumanName[];
    photo?: builders.Attachment[];
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
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
declare const identifier: (id: string | builders.Identifier, ...ext: any[]) => any;
/**
 * Alias for b.identifier()
 * @public
 * @function
 */
declare const id: (id: string | builders.Identifier, ...ext: any[]) => any;
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
declare const extension: (url: string, value: any, props?: Omit<builders.Extension, 'url'>) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
};
/**
 * Alias for b.extension()
 * @public
 * @function
 */
declare const ext: (url: string, value: any, props?: Omit<builders.Extension, 'url'>) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
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
declare const coding: (code: string, system: string, extra?: Omit<builders.Coding, 'code' | 'system'>) => any;
declare const c: (code: string, system: string, extra?: Omit<builders.Coding, 'code' | 'system'>) => any;
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
declare type ConceptCoding = builders.Coding | [string, string, Omit<builders.Coding, 'code' | 'system'>?];
declare const concept: (codings: ConceptCoding | ConceptCoding[], extra?: Omit<builders.CodeableConcept, 'coding'>) => builders.CodeableConcept;
/**
 * Alias for b.concept()
 * @public
 * @function
 */
declare const cc: (codings: ConceptCoding | ConceptCoding[], extra?: Omit<builders.CodeableConcept, 'coding'>) => builders.CodeableConcept;
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
  * Create a Patient resource.
  * @public
  * @function
  * @param {string} type - A profile type: one of fr-core-patient,fr-core-patient-ins
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Place of Birth for patient
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Regional Registry ID | Identifiant régional
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {HumanName} [props.name] - Name of a human | Nom de naissance
  * @param {ContactPoint} [props.telecom] - Details of a Technology mediated contact point (phone, fax, email, etc.)
  * @param {string} [props.gender] - male | female | other | unknown
  * @param {date} [props.birthDate] - The date of birth for the french patient checked with the INSitelservice | Date de naissance du patient. Dans le cas d'une identité récupérée du téléservice INSi, la date de naissance est modifiée selon les règles du RNIV dans le cas de dates exceptionnelles.
  * @param {boolean|dateTime} [props.deceased] - Indicates if the individual is deceased or not
  * @param {Address} [props.address] - An address expressed using postal conventions (as opposed to GPS or other location definition formats)
  * @param {CodeableConcept} [props.maritalStatus] - Marital (civil) status of a patient
  * @param {boolean|integer} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
  */
declare function patient(type: "fr-core-patient", props: Patient_fr_core_patient_Props): any;
declare function patient(type: "fr-core-patient-ins", props: Patient_fr_core_patient_ins_Props): any;

export { addExtension, c, cc, coding, composite, concept, ext, extendSystemMap, extension, findExtension, id, identifier, mapSystems, patient, ref, reference, setSystemMap, value };

