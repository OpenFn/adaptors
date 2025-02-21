import { expandReferences } from '@openfn/language-common/util';
import { request } from './fhir.utils';
import { prepareNextState } from './Utils';

/**
 * OpenMRS FHIR requests parameters options.
 * This combines {@link https://fhir.openmrs.org/artifacts.html | FHIR search parameters}, {@link https://www.hl7.org/fhir/R4/search.html resource-specific parameters}, and pagination options.
 * @typedef {Object} FhirParameters
 * @public
 * @property {string} count - Number of results to return (_count in FHIR)
 * @property {string} include - Resources to include in the response (_include in FHIR)
 * @property {string} revinclude - Reverse includes to include in the response (_revinclude in FHIR)
 * @property {string} summary - Summary mode for the response (_summary in FHIR)
 * @property {string} total - Whether to include a total count of matching resources (_total in FHIR)
 * @property {string} elements - List of elements to include in the response (_elements in FHIR)
 * @property {string} contained - Whether to include contained resources (_contained in FHIR)
 * @property {string} containedType - Type of contained resources (_containedType in FHIR)
 * @property {string} id - Logical ID of the resource to filter on (_id in FHIR)
 * @property {string} lastUpdated - Timestamp to filter resources last updated after this date (_lastUpdated in FHIR)
 * @property {string} tag - Tag to filter resources by (_tag in FHIR)
 * @property {string} profile - Profile URL to filter resources by (_profile in FHIR)
 * @property {string} security - Security labels to filter resources by (_security in FHIR)
 * @property {string} text - Text search on narrative content (_text in FHIR)
 * @property {string} content - Full-text search on resource content (_content in FHIR)
 * @property {string} list - Search resources included in a particular list (_list in FHIR)
 * @property {string} has - Perform search based on reference chains (_has in FHIR)
 * @property {string} getPagesOffset - Offset for pagination, used to skip a number of results (_getpagesoffset in OpenMRS)
 * @property {string} getPages - Get specific pages of resources (_getpages in OpenMRS)
 * @property {string} bundleType - Type of bundle to return (e.g., searchset, batch, history) (_bundleType in FHIR)
 */

/**
 * Make a get request to any FHIR endpoint in OpenMRS
 * @example <caption>Get encounters based on lastUpdated field</caption>
 * fhir.get('Encounter', { count: 100, lastUpdated: 'ge2024-01-01T00:00:00Z' })
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {FhirParameters} query - Request parameters
 * @param {function} [callback] - Optional callback to handle the response
 * @state {HttpState}
 * @returns {Operation}
 */
export function get(path, query, callback = s => s) {
  return async state => {
    const [resolvedPath, resolvedQuery = {}] = expandReferences(
      state,
      path,
      query
    );

    const response = await request(
      state,
      'GET',
      resolvedPath,
      {},
      resolvedQuery
    );
    return prepareNextState(state, response, callback);
  };
}
