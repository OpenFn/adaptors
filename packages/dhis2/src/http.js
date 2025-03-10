import { expandReferences, encode } from '@openfn/language-common/util';
import { generateUrl, handleResponse } from './Utils';
import * as client from './Client';

/**
 * Options object
 * @typedef {Object} RequestOptions
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} requestConfig -  The configuration for the request, including headers, etc.
 * @property {object} data - The request body (as JSON)
 */

/**
 * Get data. Generic helper method for getting data of any kind from DHIS2.
 * - This can be used to get `DataValueSets`,`events`,`trackers`,`etc.`
 * @public
 * @function
 * @param {string} resourceType - The type of resource to get(use its `plural` name). E.g. `dataElements`, `tracker/trackedEntities`,`organisationUnits`, etc.
 * @param {Object} query - A query object that will limit what resources are retrieved when converted into request params.
 * @param {Object} [options] - Optional `options` to define URL parameters via params beyond filters, request configuration (e.g. `auth`) and DHIS2 api version to use.
 * @param {Object} [options.params] - The parameters for the request.
 * @param {Object} [options.requestConfig] - The configuration for the request, including headers, etc.
 * @param {boolean} [options.asBase64=false] - Optional flag to indicate if the response should be returned as a Base64 encoded string.
 * @returns {Operation} state
 * @example <caption>Get all data values for the 'pBOMPrpg1QX' dataset</caption>
 * http.get('dataValueSets', {
 *   dataSet: 'pBOMPrpg1QX',
 *   orgUnit: 'DiszpKrYNg8',
 *   period: '201401',
 *   fields: '*',
 * });
 * @example <caption>Get all programs for an organization unit</caption>
 * http.get('programs', { orgUnit: 'TSyzvBiovKh', fields: '*' });
 * @example <caption>Get a single tracked entity given the provided ID. See [TrackedEntities docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#tracked-entities-get-apitrackertrackedentities)</caption>
 * http.get('tracker/trackedEntities/F8yKM85NbxW');
 * @example <caption>Get an enrollment given the provided ID. See [Enrollment docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#enrollments-get-apitrackerenrollments)</caption>
 * http.get('tracker/enrollments/abcd');
 * @example <caption>Get all events matching given criteria. See [Events docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#events-get-apitrackerevents)</caption>
 * http.get('tracker/events');
 * @example <caption>Get the relationship between two tracker entities. The only required parameters are 'trackedEntity', 'enrollment' or 'event'. See [Relationships docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#relationships-get-apitrackerrelationships)</caption>
 * http.get('tracker/relationships', {
 *   trackedEntity:['F8yKM85NbxW'],
 * });
 */
export function get(resourceType, query, options = {}) {
  return state => {
    console.log('Preparing get operation...');

    const [resolvedResourceType, resolvedQuery, resolvedOptions] =
      expandReferences(state, resourceType, query, options);

    const { params, requestConfig, asBase64 = false } = resolvedOptions;
    const { configuration } = state;

    console.log(
      'url',
      generateUrl(configuration, resolvedOptions, resolvedResourceType)
    );

    return client
      .request(configuration, {
        method: 'get',
        url: generateUrl(configuration, resolvedOptions, resolvedResourceType),
        params: {
          ...resolvedQuery,
          ...params,
        },
        responseType: asBase64 ? 'arraybuffer' : 'json',
        ...requestConfig,
      })
      .then(result => {
        console.log(`Retrieved ${resolvedResourceType}`);
        const response = asBase64 ? { data: encode(result.data) } : result;
        return handleResponse(response, state);
      });
  };
}

/**
 * Post data. Generic helper method for posting data of any kind to DHIS2.
 * This can be used to create `DataValueSets`,`events`,`trackers`,etc.
 * @public
 * @function
 * @param {string} resourceType - Type of resource to create. E.g. `trackedEntities`, `programs`, `events`, ...
 * @magic resourceType $.children.resourceTypes[*]
 * @param {Dhis2Data} data - Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, `data` must be a javascript object, and to create multiple instances of a resources, `data` must be an array of javascript objects.
 * @param {Object} [options] - Optional `options` to define URL parameters via params (E.g. `filter`, `dimension` and other import parameters), request config (E.g. `auth`) and the DHIS2 apiVersion.
 * @returns {Operation} state
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
export function post(resourceType, data, query, options = {}) {
  return state => {
    console.log('Preparing post operation...');

    const [resolvedResourceType, resolvedQuery, resolvedOptions, resolvedData] =
      expandReferences(state, resourceType, query, options, data);

    const { params, requestConfig } = resolvedOptions;
    const { configuration } = state;

    return client
      .request(configuration, {
        method: 'post',
        url: generateUrl(configuration, resolvedOptions, resolvedResourceType),
        params: { ...resolvedQuery, ...params },
        responseType: 'json',
        data: resolvedData,
        ...requestConfig,
      })
      .then(result => {
        console.log(`Created ${resolvedResourceType}`);
        return handleResponse(result, state);
      });
  };
}

/**
 * Patch a record. A generic helper function to send partial updates on one or more object properties.
 * - You are not required to send the full body of object properties.
 * - This is useful for cases where you don't want or need to update all properties on a object.
 * @public
 * @function
 * @param {string} resourceType - The type of resource to be updated. E.g. `dataElements`, `organisationUnits`, etc.
 * @param {string} path - The `id` or `path` to the `object` to be updated. E.g. `FTRrcoaog83` or `FTRrcoaog83/{collection-name}/{object-id}`
 * @param {Object} data - Data to update. Include only the fields you want to update. E.g. `{name: "New Name"}`
 * @param {Object} [options] - Optional configuration, including params for the update ({preheatCache: true, strategy: 'UPDATE', mergeMode: 'REPLACE'}). Defaults to `{operationName: 'patch', apiVersion: state.configuration.apiVersion, responseType: 'json'}`
 * @returns {Operation}
 * @example <caption>a dataElement</caption>
 * http.patch('dataElements', 'FTRrcoaog83', { name: 'New Name' });
 */
// TODO: @Elias, can this be deleted in favor of update? How does DHIS2 handle PATCH vs PUT?
// I need to investigate on this. But I think DHIS2 forces to send all properties back when we do an update. If that's confirmed then this may be needed.
export function patch(resourceType, path, data, options = {}) {
  return state => {
    console.log('Preparing patch operation...');

    const [resolvedResourceType, resolvedPath, resolvedData, resolvedOptions] =
      expandReferences(state, resourceType, path, data, options);

    const { params, requestConfig } = resolvedOptions;
    const { configuration } = state;

    return client
      .request(configuration, {
        method: 'patch',
        url: generateUrl(
          configuration,
          resolvedOptions,
          resolvedResourceType,
          resolvedPath
        ),
        params,
        data: resolvedData,
        ...requestConfig,
      })
      .then(result => {
        console.log(`Patched ${resolvedResourceType} at ${resolvedPath}`);
        return handleResponse(result, state);
      });
  };
}

/**
 * Make a HTTP request to any dhis2 endpoint
 * @example <caption>GET request with a URL params</caption>
 * http.request("GET",
 *   "tracker/relationships", {
 *    params:{
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
 *   params:{
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
  return state => {
    console.log(`Preparing a ${method.toLowerCase()} operation...`);

    const [resolvedMethod, resolvedPath, resolvedOptions = {}] =
      expandReferences(state, method, path, options);

    const { params, requestConfig, data } = resolvedOptions;
    const { configuration } = state;

    return client
      .request(configuration, {
        method: resolvedMethod,
        url: generateUrl(configuration, resolvedOptions, resolvedPath),
        params: { ...params },
        responseType: 'json',
        data,
        ...requestConfig,
      })
      .then(result => {
        console.log(`Successful ${method.toLowerCase()} operation...`);
        return handleResponse(result, state);
      });
  };
}
