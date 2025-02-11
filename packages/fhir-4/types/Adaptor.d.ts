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
export declare function search(resourceType: string, options: SearchQuery): (state: any) => Promise<State>;
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
 * @returns Operation
 */
export declare function update(reference: string, resource: any): (state: any) => Promise<any>;
declare function _delete(reference: string): void;
export { _delete as delete };
export declare function create(): void;
export declare function addToBundle(resources: any[], name?: string): void;
export declare function submitBundle(name?: string): void;
export { dataPath, dataValue, dateFns, cursor, each, field, fields, fn, lastReferenceValue, merge, sourceValue, } from '@openfn/language-common';
