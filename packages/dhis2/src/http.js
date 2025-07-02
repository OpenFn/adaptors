import { expandReferences } from '@openfn/language-common/util';
import * as util from './util';

/**
 * State object
 * @typedef {Object} DHIS2HttpState
 * @private
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the DHIS2 server (excluding the body)
 * @property references - An array of all previous data objects used in the Job
 */

/**
 * Options object
 * @typedef {Object} RequestOptions
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} headers - An object of all request headers
 * @property {string} [parseAs='json'] - The response format to parse (e.g., 'json', 'text', 'stream', or 'base64'. Defaults to `json`
 * @property {string} [apiVersion=42] - The apiVersion of the request. Defaults to 42.
 */

/**
 * Make a GET request to any DHIS2 endpoint.
 * @public
 * @example <caption>Get with query parameters</caption>
 * http.get('dataValueSets', {
 *  query:{
 *   dataSet: 'pBOMPrpg1QX',
 *   orgUnit: 'DiszpKrYNg8',
 *   period: '201401',
 *   fields: '*',
 * }
 * });
 * @example <caption>Get an image from a trackedEntityInstance.</caption>
 * http.get('trackedEntityInstances/qHVDKszQmdx/BqaEWTBG3RB/image', {
 *   headers:{
 *       Accept: 'image/*'
 *   },
 *   parseAs: 'base64',
 * });
 * @function
 * @param {string} path - Path to resource.
 * @param {RequestOptions} [options] - An optional object containing query, parseAs,and headers for the request
 * @state {DHIS2HttpState}
 * @returns {Operation}
 */
export function get(path, options = {}) {
  return async state => {
    console.log('Preparing get operation...');

    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options
    );

    const { parseAs } = resolvedOptions;

    const response = await util.request(state.configuration, {
      method: 'GET',
      path: util.prefixVersionToPath(
        state.configuration,
        resolvedOptions,
        resolvedPath
      ),
      options: resolvedOptions,
    });

    return util.handleHttpResponse(response, state);
  };
}

/**
 * Make a POST request to any DHIS2 endpoint.
 * @public
 * @example <caption>Call the tracker endpoint with a JSON payload</caption>
 * http.post("tracker", {
 *   events: [
 *     {
 *       program: "eBAyeGv0exc",
 *       orgUnit: "DiszpKrYNg8",
 *       status: "COMPLETED",
 *     },
 *   ],
 * });
 * @function
 * @param {string} path - Path to resource.
 * @magic path $.children.resourceTypes[*]
 * @param {DHIS2Data} data - Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, `data` must be a javascript object, and to create multiple instances of a resources, `data` must be an array of javascript objects.
 * @param {RequestOptions} [options] - An optional object containing query, parseAs,and headers for the request.
 * @state {DHIS2HttpState}
 * @returns {Operation}
 */
export function post(path, data, options = {}) {
  return async state => {
    console.log('Preparing post operation...');

    const [resolvedPath, resolvedOptions, resolvedData] = expandReferences(
      state,
      path,
      options,
      data
    );

    const { configuration } = state;
    let response;

    response = await util.request(configuration, {
      method: 'POST',
      path: util.prefixVersionToPath(
        configuration,
        resolvedOptions,
        resolvedPath
      ),
      options: resolvedOptions,
      data: resolvedData,
    });

    return util.handleHttpResponse(response, state);
  };
}

/**
 * Make a PATCH request to any DHIS2 endpoint.
 * @public
 * @example <caption>Update a resource</caption>
 * patch('dataElements', 'FTRrcoaog83', { name: 'New Name' });
 * @function
 * @param {string} resourceType - The type of resource to be updated.
 * @param {string} path - The `id` or `path` to the `object` to be updated. E.g. `FTRrcoaog83` or `FTRrcoaog83/{collection-name}/{object-id}`
 * @param {Object} data - Data to update. Include only the fields you want to update. E.g. `{name: "New Name"}`
 * @param {RequestOptions} [options] - An optional object containing query, parseAs,and headers for the request.
 * @state {DHIS2HttpState}
 * @returns {Operation}
 */

export function patch(resourceType, path, data, options = {}) {
  return async state => {
    console.log('Preparing patch operation...');

    const [resolvedResourceType, resolvedPath, resolvedData, resolvedOptions] =
      expandReferences(state, resourceType, path, data, options);

    const { configuration } = state;
    let response;

    response = await util.request(configuration, {
      method: 'PATCH',
      path: util.prefixVersionToPath(
        configuration,
        resolvedOptions,
        resolvedResourceType,
        resolvedPath
      ),
      options: resolvedOptions,
      data: resolvedData,
    });
    return util.handleHttpResponse(response, state);
  };
}

/**
 * Make a HTTP request to any DHIS2 endpoint
 * @public
 * @example <caption>GET request with a URL params</caption>
 * http.request("GET",
 *   "tracker/relationships", {
 *    query:{
 *        trackedEntity: ['F8yKM85NbxW']
 *    },
 * });
 * @example <caption>Upsert a tracker resource </caption>
 * http.request('POST', 'tracker', {
 *   data: {
 *   orgUnit: 'TSyzvBiovKh',
 *   trackedEntityType: 'nEenWmSyUEp',
 *   attributes: [
 *     {
 *       attribute: 'w75KJ2mc4zz',
 *       value: 'Qassime',
 *     },
 *   ],
 *  },
 *   query:{
 *      importStrategy: 'CREATE_AND_UPDATE'
 *    }
 *  });
 * @function
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {RequestOptions}  [options] - An optional object containing query, requestConfig, and data for the request
 * @returns {Operation}
 * @state {DHIS2HttpState}
 */
export function request(method, path, options = {}) {
  return async state => {
    console.log(`Preparing a ${method.toLowerCase()} operation...`);

    const [resolvedMethod, resolvedPath, resolvedOptions = {}] =
      expandReferences(state, method, path, options);

    const { data } = resolvedOptions;
    const { configuration } = state;
    let response;

    response = await util.request(configuration, {
      method: resolvedMethod,
      path: util.prefixVersionToPath(
        configuration,
        resolvedOptions,
        resolvedPath
      ),
      options: resolvedOptions,
      data,
    });

    return util.handleHttpResponse(response, state);
  };
}
