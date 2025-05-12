import { expandReferences } from '@openfn/language-common/util';
import { request, prepareNextState } from './Utils';

/**
 * State object
 * @typedef {Object} PrimeroHttpState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the Primero server (excluding the body). Responses will be returned in JSON format
 * @property references - An array of all previous data objects used in the Job
 * @private
 */

/**
 * Options object
 * @typedef {Object} RequestOptions
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} headers - An object of all request headers
 * @property {string} [parseAs='json'] - The response format to parse (e.g., 'json', 'text', or 'stream')
 */

/**
 * Make a GET request to any Primero endpoint.
 * @public
 * @function
 * @example <caption>GET all cases</caption>
 * http.get('/cases');
 * @param {string} path - Path to the resource.
 * @param {RequestOptions} [options = {}] - An object containing query params and headers for the request
 * @state {PrimeroHttpState}
 * @returns {Operation}
 */
export function get(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options
    );

    const response = await request(state, 'GET', resolvedPath, resolvedOptions);

    return prepareNextState(state, response);
  };
}

/**
 * Make a POST request to any Primero endpoint.
 * @public
 * @example <caption>POST a case to Primero</caption>
 * http.post('cases',{
 *     age: 16,
 *     sex: "female",
 *     name: "Edwine Edgemont",
 * });
 * @function
 * @param {string} path - Path to the resource.
 * @param {object} data - the body data in JSON format.
 * @param {RequestOptions} [options={}] - An object containing query params and headers for the request
 * @state {PrimeroHttpState}
 * @returns {Operation}
 */
export function post(path, data, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions, resolvedData] = expandReferences(
      state,
      path,
      options,
      data
    );

    const response = await request(state, 'POST', resolvedPath, {
      ...resolvedOptions,
      body: resolvedData,
    });
    return prepareNextState(state, response);
  };
}

/**
 * Make a PATCH request to Primero
 * @public
 * @example <caption>Update a single case resource </caption>
 * http.patch('cases/344f3c08-affc-4d8a-b4d3-925b9f4d2867', {
 *   age: 17,
 *   sex: "female",
 *   name: "Edwine Edgemont",
 *  });
 * @function
 * @param {string} path - Path to the resource.
 * @param {object} data - the body data in JSON format.
 * @param {RequestOptions} [options={}] - An object containing query params and headers for the request
 * @state {PrimeroHttpState}
 * @returns {Operation}
 */
export function patch(path, data, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions, resolvedData] = expandReferences(
      state,
      path,
      options,
      data
    );

    const response = await request(state, 'PATCH', resolvedPath, {
      ...resolvedOptions,
      body: resolvedData,
    });

    return prepareNextState(state, response);
  };
}
