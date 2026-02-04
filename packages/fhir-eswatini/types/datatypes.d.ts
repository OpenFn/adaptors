export declare const mapSystems: (obj: any) => any;
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
export declare const setSystemMap: (newMappings: any) => void;
export declare const extendSystemMap: (newMappings: any) => void;
/**
 * Create an Identifier. Systems will be mapped against the system map. Pass extensions as extra arguments.
 * @public
 * @function
 * @param id - A string identifier, a FHIR identifier object, or an array of either.
 * @param ext - Any other arguments will be treated as extensions
 * @param {string} [system] - the string system to use by default if
 */
export declare const identifier: (id: string | Identifier, ...ext: any[]) => any;
/**
 * Alias for util.identifier()
 * @public
 * @function
 */
export declare const id: (id: string | Identifier, ...ext: any[]) => any;
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
export declare const addExtension: (resource: any, url: any, value: any) => void;
/**
 * Find an extension with a given url in some array
 * @public
 * @function
 * @param obj - a fhir resource
 * @param {string} targetUrl - the extension URL you want to find
 * @param {string} [path] - a path to extract from the resource. Optional.
 */
export declare const findExtension: (obj: any, targetUrl: any, path: any) => any;
/**
 * Create a coding object { code, system }. Systems will be mapped using the system map.
 * @public
 * @function
 * @param {string} code - the code value
 * @param {string} system - URL to the system. Well be mapped using the system map.
 */
export declare const coding: (code: any, system: any) => {
    code: any;
    system: any;
};
export declare const c: (code: any, system: any) => {
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
export declare const value: (value: any, system: any, ...extra: any[]) => any;
/**
 * Create a codeableConcept. Codings can be coding objects or
 * [code, system] tuples
 * if the first argument is a string, it will be set as the text.
 * Systems will be mapped with the system map
 * @public
 * @function
 * @example <caption>Create a codeableConcept</caption>
 * const myConcept = util.concept(['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 * @example <caption>Create a codeableConcept with text</caption>
 * const myConcept = util.concept('smart care id', ['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 */
export declare const concept: (text: any, ...codings: any[]) => {};
/**
 * Alias for util.concept()
 * @public
 * @function
 */
export declare const cc: (text: any, ...codings: any[]) => {};
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
export declare const reference: (ref: any, opts: any) => any;
/**
 * Alias for util.reference()
 * @public
 * @function
 */
export declare const ref: (ref: any, opts: any) => any;
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
export declare const composite: (object: any, key: any, value: any) => void;
