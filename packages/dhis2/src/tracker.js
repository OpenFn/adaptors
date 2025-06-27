import { expandReferences } from '@openfn/language-common/util';
import * as util from './util';

/**
 * State object
 * @typedef {Object} DHIS2State
 * @private
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the DHIS2 server (excluding the body)
 * @property references - An array of all previous data objects used in the Job
 */

/**
 * All options, apart from those listed here, will be appended as query parameters to the URL
 * @typedef {Object} TrackerOptions
 * @property {string} [parseAs='json'] - The response format to parse (e.g., 'json', 'text', 'stream', or 'base64'. Defaults to `json`
 */

/**
 * Import data into DHIS2 using the tracker endpoint.
 * @alias import
 * @public
 * @example <caption>Import some data and pass the `atomicMode` parameter</caption>
 * tracker.import('CREATE', $.trackerData, { atomicMode: 'ALL' })
 * @example <caption>Import a trackedEntity resource</caption>
 * tracker.import(
 *   'CREATE',
 *   {
 *     trackedEntities: [
 *       {
 *         orgUnit: 'TSyzvBiovKh',
 *         trackedEntityType: 'nEenWmSyUEp',
 *         attributes: [
 *           {
 *             attribute: 'w75KJ2mc4zz',
 *             value: 'Gigiwe',
 *           },
 *         ],
 *       },
 *     ],
 *   },
 *   {
 *     atomicMode: 'ALL',
 *   }
 * );
 * @function
 * @param {string} strategy - The effect the import should have. Can either be CREATE, UPDATE, CREATE_AND_UPDATE and DELETE.
 * @param {object} payload - The data to be imported.
 * @param {TrackerOptions} [options] - An optional object containing parseAs, and apiVersion, and queries for the request
 * @state {DHIS2State}
 * @returns {Operation}
 */
function _import(strategy, payload, options = {}) {
  return async state => {
    console.log('Preparing tracker import operation...');

    const [resolvedStrategy, resolvedPayload, resolvedOptions] =
      expandReferences(state, strategy, payload, options);

    const { apiVersion, parseAs, ...query } = resolvedOptions;

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
        apiVersion,
        parseAs,
        query: {
          ...query,
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
 * @alias export
 * @public
 * @example <caption>Export a trackedEntity resource using the id</caption>
 * tracker.export('trackedEntities/Gu5UKnIFnJf')
 * @example <caption>Export all enrollment resources</caption>
 * tracker.export('enrollments', {orgUnit: 'TSyzvBiovKh'});
 * @example <caption>Export all events</caption>
 * tracker.export('events')
 * @function
 * @param {string} path - Path to the resource, relative to the /tracker endpoint
 * @param {object} query - An object of query parameters to be encoded into the URL
 * @param {TrackerOptions} [options] - An optional object containing parseAs, and apiVersion for the request
 * @state {DHIS2State}
 * @returns {Operation}
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
