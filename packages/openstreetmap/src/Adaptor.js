import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 */

/**
 * Options for running an Overpass query
 * @typedef {Object} QueryOptions
 * @public
 * @property {number} timeout - Maximum query run time in seconds, sent to Overpass as `[timeout:N]`. Default: 180.
 */

/**
 * Which features to fetch. `area` or `bbox` is required.
 * @typedef {Object} FeatureFilter
 * @public
 * @property {object|Array<object>} tags - Tags to match. In an object, every tag must match. In an array of objects, any object may match. Values are a string, an array of strings (any of them), or `'*'` (any value).
 * @property {object} area - Tags identifying the area to search inside, ie `{ 'ISO3166-2': 'XX-YY' }` or `{ name: 'Example', admin_level: '4' }`
 * @property {object} bbox - Bounding box to search inside, as `{ south, west, north, east }` in decimal degrees
 * @property {string} changedSince - Only return features created or modified after this date. Deleted features are not reported.
 */

/**
 * Make a general HTTP request to an Overpass API instance
 * @example <caption>Check the rate limit status of the Overpass instance</caption>
 * request('GET', 'status');
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource, relative to the configured `baseUrl`
 * @param {object} body - Object which will be attached to the request body
 * @param {RequestOptions} [options] - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedOptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedOptions,
      },
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Run an Overpass QL query and write the matching OpenStreetMap elements to
 * `state.data`. The adaptor adds the `[out:json][timeout:N]` settings, so don't
 * include them in the query. See the
 * [Overpass QL docs](https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL).
 * @example <caption>Fetch the schools inside a bounding box</caption>
 * query('nwr["amenity"="school"](51.47,-0.15,51.52,-0.05); out center;');
 * @example <caption>Allow a slow query to run for up to 10 minutes</caption>
 * query($.data.overpassQuery, { timeout: 600 });
 * @function
 * @public
 * @param {string} overpassQL - The Overpass QL query to run
 * @param {QueryOptions} [options] - Optional query options
 * @returns {Operation}
 * @state data - an array of OpenStreetMap elements
 */
export function query(overpassQL, options = {}) {
  return async state => {
    const [resolvedQuery, resolvedOptions] = expandReferences(
      state,
      overpassQL,
      options,
    );

    const { elements } = await util.interpreter(
      state.configuration,
      resolvedQuery,
      resolvedOptions,
    );

    console.log(`Fetched ${elements.length} OpenStreetMap elements`);

    return composeNextState(state, elements);
  };
}

/**
 * List OpenStreetMap features which match some tags inside an area or bounding box,
 * as a GeoJSON FeatureCollection.
 * Every feature is a Point: ways and relations use the center of their bounding box.
 * Feature properties are the OpenStreetMap tags plus `@id`, `@version` and `@timestamp`.
 * The collection's `timestamp` is the time of the OpenStreetMap data Overpass searched,
 * which can be used as the next `changedSince`.
 * @example <caption>List the schools in a region</caption>
 * listFeatures({
 *   tags: { amenity: 'school' },
 *   area: { 'ISO3166-2': $.data.regionCode },
 * });
 * @example <caption>List libraries, community centres and parks in a bounding box</caption>
 * listFeatures({
 *   tags: [{ amenity: ['library', 'community_centre'] }, { leisure: 'park' }],
 *   bbox: $.data.bbox,
 * });
 * @example <caption>List shops changed since the last run</caption>
 * listFeatures({
 *   tags: { shop: '*' },
 *   area: { name: 'Example District', admin_level: '6' },
 *   changedSince: $.lastRunTimestamp,
 * });
 * @function
 * @public
 * @param {FeatureFilter} filter - Which features to fetch
 * @param {QueryOptions} [options] - Optional query options
 * @returns {Operation}
 * @state data - a GeoJSON FeatureCollection
 */
export function listFeatures(filter, options = {}) {
  return async state => {
    const [resolvedFilter, resolvedOptions] = expandReferences(
      state,
      filter,
      options,
    );

    const result = await util.interpreter(
      state.configuration,
      util.buildFeatureQuery(resolvedFilter),
      resolvedOptions,
    );
    const collection = util.toFeatureCollection(result);

    console.log(`Fetched ${collection.features.length} OpenStreetMap features`);

    return composeNextState(state, collection);
  };
}

export {
  as,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';
