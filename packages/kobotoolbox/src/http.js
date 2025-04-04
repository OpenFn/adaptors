import { expandReferences } from '@openfn/language-common/util';
import * as util from './util';

/**
 * State object
 * @typedef {Object} KoboToolboxHttpState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the KoboToolbox server (excluding the body). Responses will be returned in JSON format
 * @property references - An array of all previous data objects used in the Job
 */

/**
 * Options object
 * @typedef {Object} RequestOptions
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} headers - An object of all request headers
 * @property {string} [parseAs='json'] - The response format to parse (e.g., 'json', 'text', or 'stream')
 */

/**
 * Make a GET request to any KoboToolbox endpoint.
 * @public
 * @function
 * @example <caption>GET assets resource</caption>
 * http.get(
 *  "/assets/",
 *  )
 * @param {string} path - path to resource
 * @param {RequestOptions} [options={}] - An object containing query params and headers for the request
 * @state {KoboToolboxHttpState}
 * @returns {operation}
 */
export function get(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options
    );

    const response = await util.request(
      state,
      'GET',
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a POST request to a KoboToolbox endpoint
 * @public
 * @function
 * @example <caption>Create an asset resource</caption>
 * http.post(
 *  '/assets/',
 *  {
 *   name: 'Feedback Survey Test',
 *   asset_type: 'survey',
 *  },
 *  );
 * @param {string} path - path to resource
 * @param {any} data - the body data in JSON format
 * @param {RequestOptions} [options={}] - An object containing query params and headers for the request
 * @state {KoboToolboxHttpState}
 * @returns {operation}
 */
export function post(path, data, options = {}) {
  return async state => {
    const [resolvedPath, resolvedData, resolvedOptions] = expandReferences(
      state,
      path,
      data,
      options
    );

    const optionsObject = {
      data: resolvedData,
      ...resolvedOptions,
    };
    const response = await util.request(
      state,
      'POST',
      resolvedPath,
      optionsObject
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a PUT request to a KoboToolbox endpoint
 * @public
 * @function
 * @example <caption>Update an asset resource</caption>
 * http.put(
 *  'assets/a4jAWzoa8SZWzZGhx84sB5/deployment/',
 *  {
 *   name: 'Feedback Survey Test',
 *   asset_type: 'survey',
 *  },
 *  );
 * @param {string} path - path to resource
 * @param {any} data - the body data in JSON format
 * @param {RequestOptions} [options={}] - An object containing query params and headers for the request
 * @state {KoboToolboxHttpState}
 * @returns {operation}
 */
export function put(path, data, options = {}) {
  return async state => {
    const [resolvedPath, resolvedData, resolvedOptions] = expandReferences(
      state,
      path,
      data,
      options
    );

    const optionsObject = {
      data: resolvedData,
      ...resolvedOptions,
    };
    const response = await util.request(
      state,
      'PUT',
      resolvedPath,
      optionsObject
    );

    return util.prepareNextState(state, response);
  };
}
