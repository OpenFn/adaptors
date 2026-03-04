export { createBundle, uploadBundle } from '@openfn/language-fhir-4';
/**
 * Add a resource to a bundle on state, using the `name` as the key (or `bundle` by default).
 * The resource will be upserted (via PUT).
 * A new bundle will be generated if one does not already exist.
 * @public
 * @function
 * @param {object/array} resources - A resource or array of resources to add to the bundle
 * @param {string} [name] - A name (key) for this bundle on state (defaults to `bundle`)
 * @state bundle - the updated bundle
 * @example <caption>Add a new patient resource to the default bundle</caption>
 * addToBundle(b.patient($.patientDetails))
 * @returns Operation
 */
export declare function addToBundle(resources: any | any[], name?: string): (state: any) => any;
export { combine, dataPath, dataValue, dateFns, cursor, each, field, fields, fn, lastReferenceValue, merge, sourceValue, } from '@openfn/language-common';
