/**
 * Fetch a single FHIR resource.
 * @public
 * @function
 * @param {string} reference - The type and ID of the resource to read, eg, `Patient/123`
 * @state data - the newly updated resource, as returned by the server
 * @state response - the HTTP response returned by the server.
 * @example <caption>Read a single Patient resource</caption>
 * read('Patient/12345')
 * @returns Operation
 */
export declare function read(reference: string): (state: any) => Promise<any>;
declare type SearchQuery = {
    /** k/v pairs. Can do stuff like given:contains=eve and [parameter]=ge2013-03-14. So the parameter can have criteria   */
    query?: Record<string, string>;
    filter?: Record<string, string>;
    lastUpdated?: string;
    [key: string]: any;
};
/**
 * Search for matching FHIR resources. Exclude _ from search parameters, and pass query terms on options.query.
 * @public
 * @function
 * @param {string} resourceType - The type of the resource to search for.
 * @param {object} options - Parameters, query and filter.
 * @param {object} [options.*] - Pass supported query parameters without underscore. See {@link https://www.hl7.org/fhir/R4/search.html#Summary FHIR Search Summary}.
 * @param {object} [options.query] - query terms to search for. These are appended to the query URL veratim..
 * @state data - the newly updated resource, as returned by the server
 * @state response - the HTTP response returned by the server.
 * @example <caption>Search with parameter and query term</caption>
 * search('Patient', {
 *   lastUpdated: $.cursor,
 *   count: 10,
 *   query: { given: 'messi' },
 * })
 * @example <caption>Search for patients with a given name containing "eve"</caption>
 * search('Patient', {
 *   query: { 'given:contains': 'eve' },
 * })
 * @returns Operation
 */
export declare function search(resourceType: string, options: SearchQuery): (state: any) => Promise<any>;
/**
 * Update a resource. If the resource does not already exist, it will be created and `state.response.statusCode` will be 201.
 * Otherwise, the existing resource will be replaced.
 * To partially update a resource, use `patch()`.
 * @public
 * @function
 * @param {string} reference - The type and ID of the resource to update, eg, `Patient/123`
 * @param {object} resource - The new version of this resource.
 * @state data - the newly updated resource, as returned by the server
 * @state response - the HTTP response returned by the server.
 * @example <caption>Update a Patient with a builder function</caption>
 * update('Patient/123', b.patient({
 *   id: 'Patient/123',
 *   name: { family: "Messi", given: "Lionel", use: "official" },
 * }))
 * @returns Operation
 */
export declare function update(reference: string, resource: any): (state: any) => Promise<any>;
/**
 * Delete a single FHIR resource.
 * @public
 * @function
 * @param {string} reference - The type and ID of the resource to delete, eg, `Patient/123`
 * @state response - the HTTP response returned by the server.
 * @example <caption>Delete a single Patient resource</caption>
 * delete('Patient/12345')
 * @returns Operation
 */
declare function _delete(reference: string): (state: any) => Promise<any>;
export { _delete as delete };
/**
 * Create a new resource. The resource does not need to include an id.
 * The created resource will be returned to state.data.
 * @public
 * @function
 * @param {object} resource - The resource to create.
 * @state data - the newly created resource.
 * @state response - the HTTP response returned by the server.
 * @example <caption>Create a Patient with a builder function</caption>
 * create(b.patient({
 *   name: { family: "Messi", given: "Lionel", use: "official" },
 * }))
 * @returns Operation
 */
export declare function create(resource: any): (state: any) => Promise<any>;
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
/**
 * Upload a bundle from state (created by addToBundle) as a transaction.
 * @public
 * @function
 * @param {string/object} bundle - A bundle object or name of a bundle on state
 * @example <caption>Upload the default bundle</caption>
 * uploadBundle()
 * @example <caption>Create and a bundle with a custom name</caption>
 * addToBundle($.patients, 'patientsBundle')
 * uploadBundle('patientsBundle')
 * @example <caption>Upload a bundle from state</caption>
 * uploadBundle($.patientsBundle)
 * @returns Operation
 */
export declare function uploadBundle(bundle?: string | any): (state: any) => Promise<any>;
export { dataPath, dataValue, dateFns, cursor, each, field, fields, fn, lastReferenceValue, merge, sourceValue, } from '@openfn/language-common';
