import { expandReferences, encode } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} Dhis2State
 * @private
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the Dhis2 server (excluding the body)
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
 * Get data. HTTP helper method for getting data of any kind from DHIS2.
 * - This can be used to get `DataValueSets`,`events`,`trackers`,`etc.`
 * @public
 * @function
 * @param {string} path - Path to resource(use its `plural` name). E.g. `dataElements`, `tracker/trackedEntities`,`organisationUnits`, etc.
 * @param {RequestOptions} [options] - An optional object containing query, parseAs,and headers for the request
 * @state {Dhis2State}
 * @returns {Operation}
 * @example <caption>Get all data values for the 'pBOMPrpg1QX' dataset</caption>
 * http.get('dataValueSets', {
 *  query:{
 *   dataSet: 'pBOMPrpg1QX',
 *   orgUnit: 'DiszpKrYNg8',
 *   period: '201401',
 *   fields: '*',
 * }
 * });
 * @example <caption>Get the relationship between two tracker entities. The only required parameters are 'trackedEntity', 'enrollment' or 'event'. See [Relationships docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#relationships-get-apitrackerrelationships)</caption>
 * http.get('tracker/relationships', {
 *   query: { trackedEntity:['F8yKM85NbxW'] }
 * });
 * @example <caption>Get an image from a trackedEntityInstance.</caption>
 * http.get('trackedEntityInstances/qHVDKszQmdx/BqaEWTBG3RB/image', {
 *   headers:{
 *       Accept: 'image/*'
 *   },
 *   parseAs: 'base64',
 * });
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

    if (parseAs === 'base64') {
      response.body = encode(response.body);
    }
    console.log(`Retrieved ${resolvedPath}`);

    return util.handleHttpResponse(response, state);
  };
}

/**
 * Post data. HTTP helper method for posting data of any kind to DHIS2.
 * This can be used to create `DataValueSets`,`events`,`trackers`,etc.
 * @public
 * @function
 * @param {string} path - Path to resource. E.g. `trackedEntities`, `programs`, `events`, ...
 * @magic path $.children.resourceTypes[*]
 * @param {Dhis2Data} data - Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, `data` must be a javascript object, and to create multiple instances of a resources, `data` must be an array of javascript objects.
 * @param {RequestOptions} [options] - An optional object containing query, parseAs,and headers for the request.
 * @state {Dhis2State}
 * @returns {Operation}
 * @example <caption>Create an event</caption>
 * http.post("tracker", {
 *   events: [
 *     {
 *       program: "eBAyeGv0exc",
 *       orgUnit: "DiszpKrYNg8",
 *       status: "COMPLETED",
 *     },
 *   ],
 * });
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

    console.log(`Created ${resolvedPath}`);
    return util.handleHttpResponse(response, state);
  };
}

/**
 * Patch a record. A HTTP helper function to send partial updates on one or more object properties.
 * - You are not required to send the full body of object properties.
 * - This is useful for cases where you don't want or need to update all properties on a object.
 * @public
 * @function
 * @param {string} resourceType - The type of resource to be updated. E.g. `dataElements`, `organisationUnits`, etc.
 * @param {string} path - The `id` or `path` to the `object` to be updated. E.g. `FTRrcoaog83` or `FTRrcoaog83/{collection-name}/{object-id}`
 * @param {Object} data - Data to update. Include only the fields you want to update. E.g. `{name: "New Name"}`
 * @param {RequestOptions} [options] - An optional object containing query, parseAs,and headers for the request.
 * @state {Dhis2State}
 * @returns {Operation}
 * @example <caption>a dataElement</caption>
 * patch('dataElements', 'FTRrcoaog83', { name: 'New Name' });
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

    console.log(`Patched ${resolvedResourceType} at ${resolvedPath}`);
    return util.handleHttpResponse(response, state);
  };
}

/**
 * Make a HTTP request to any dhis2 endpoint
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
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {RequestOptions}  [options] - An optional object containing query, requestConfig, and data for the request
 * @returns {Operation}
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

    console.log(`Successful ${resolvedMethod.toLowerCase()} operation...`);
    return util.handleHttpResponse(response, state);
  };
}
