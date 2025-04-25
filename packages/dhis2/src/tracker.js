import { expandReferences } from '@openfn/language-common/util';
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
 * @property {string} [parseAs='json'] - The response format to parse (e.g., 'json', 'text', 'stream', or 'base64'. Defaults to `json`
 * @property {string} [apiVersion=42] - The apiVersion of the request. Defaults to 42.
 */

/**
 * Import data into DHIS2 using the tracker endpoint.
 * @public
 * @function
 * @param {string} strategy - The effect the import should have. Can either be CREATE, UPDATE, CREATE_AND_UPDATE and DELETE.
 * @param {object} payload - The data to be imported.
 * @param {object} query - An object of query parameters to be encoded into the URL
 * @param {RequestOptions} [options] - An optional object containing parseAs, and apiVersion for the request
 * @state {Dhis2State}
 * @returns {Operation}
 * @example <caption>Import a trackedEntity resource</caption>
 * tracker.import('CREATE', {
 * trackedEntities: [
 *   {
 *     orgUnit: 'TSyzvBiovKh',
 *     trackedEntityType: 'nEenWmSyUEp',
 *     attributes: [
 *       {
 *         attribute: 'w75KJ2mc4zz',
 *         value: 'Gigiwe',
 *       },
 *     ],
 *   },
 *  ],
 * });
 */
function _import(strategy, payload, query, options = {}) {
  return async state => {
    console.log('Preparing tracker import operation...');

    const [resolvedStrategy, resolvedPayload, resolvedQuery, resolvedOptions] =
      expandReferences(state, strategy, payload, query, options);

    const response = await util.request(state.configuration, {
      method: 'POST',
      path: util.prefixVersionToPath(
        state.configuration,
        {
          ...resolvedOptions,
          resolvedStrategy,
        },
        'tracker'
      ),
      options: {
        ...resolvedOptions,
        query: {
          ...resolvedQuery,
          async: false,
        },
      },
      data: resolvedPayload,
    });

    return util.handleHttpResponse(response, state);
  };
}

export { _import as import };

/**
 * Export data from DHIS2.
 * @public
 * @function
 * @param {string} path - Path to the resource
 * @param {object} query - An object of query parameters to be encoded into the URL
 * @param {RequestOptions} [options] - An optional object containing parseAs, and apiVersion for the request
 * @state {Dhis2State}
 * @returns {Operation}
 * @example <caption>Export a trackedEntity resource using the id</caption>
 * tracker.export('trackedEntities/Gu5UKnIFnJf')
 * @example <caption>Export all enrollment resources</caption>
 * tracker.export('enrollments', {orgUnit: 'TSyzvBiovKh'});
 */
function _export(path, query, options = {}) {
  return async state => {
    console.log('Preparing tracker export operation...');

    const [resolvedPath, resolvedQuery, resolvedOptions] = expandReferences(
      state,
      path,
      query,
      options
    );

    const response = await util.request(state.configuration, {
      method: 'GET',
      path: util.prefixVersionToPath(
        state.configuration,
        resolvedOptions,
        `tracker/${resolvedPath}`
      ),
      options: {
        ...resolvedOptions,
        query: {
          ...resolvedQuery,
          async: false,
        },
      },
    });

    return util.handleHttpResponse(response, state);
  };
}

export { _export as export };
