import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * Options object
 * @typedef {Object} RequestOptions
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} headers - An object of all request headers
 * @property {object} body - The request body (as JSON)
 * @property {string} [parseAs='json'] - The response format to parse (e.g., 'json', 'text', or 'stream')
 */

/**
 * Make a HTTP request to any OpenMRS endpoint
 * @example <caption>GET request with a URL query</caption>
 * http.request("GET",
 *   "/ws/rest/v1/patient/d3f7e1a8-0114-4de6-914b-41a11fc8a1a8", {
 *    query:{ 
 *       limit: 1, 
 *       offset: 20 
 *    },
 * });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {RequestOptions}  [options={}] - An object containing query, headers, and body for the request
 * @returns {Operation}
 */
export function request(method, path, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions = {}] =
      expandReferences(state, method, path, options);

    const response = await util.request(
      state,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a GET request to any OpenMRS endpoint.
 * Unlike the main `get()`, this does not append anything to the path you provide.
 * @public
 * @function
 * @example <caption>GET a resource with a query</caption>
 * http.get(
 *  "/ws/rest/v1/patient",
 *  {
 *    query: {
 *      limit: 1
 *    }
 *  }
 *  )
 * @param {string} path - path to resource
 * @param {RequestOptions} [options={}] - An object containing query params and headers for the request
 * @returns {operation}
 */
export function get(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(state, path, options);

    const response = await util.request(state, 'GET', resolvedPath, resolvedOptions);

    return util.prepareNextState(state, response);
  };
}


/**
 * Make a POST request to an OpenMRS endpoint
 * @public
 * @function
 * @example <caption>Post with a JSON payload</caption>
 * http.post(
 *  "/ws/rest/v1/patient",
 *  {
 *      "person": {
 *      "gender":"M",
 *      "age":47,
 *      "birthdate":"1970-01-01T00:00:00.000+0100",
 *      "names":[
 *        {
 *          "givenName":"Jon",
 *          "familyName":"Snow"
 *        }
 *      ],
 *    }
 *    }
 * )
 * @param {string} path - path to resource
 * @param {any} data - the payload
 * @param {RequestOptions} [options={}] - An object containing query params and headers for the request
 * @returns {operation}
 */
export function post(path, data, options = {}) {
  return  async state => {
    const [resolvedPath, resolvedData, resolvedOptions] = expandReferences(state, path, data, options);

    const optionsObject = {
      data: resolvedData,
      ...resolvedOptions
    }
    const response = await util.request(state, 'POST', resolvedPath, optionsObject);

    return util.prepareNextState(state, response);
  }
}


/**
 * Make a DELETE request to an OpenMRS endpoint
 * @alias delete
 * @public
 * @function
 * @example <caption>Delete a resource</caption>
 * http.delete(
 *  "/ws/rest/v1/patient/abc/"
 * )
 * @param {string} path - path to resource
 * @param {RequestOptions} [options={}] - An object containing query params and headers for the request
 * @returns {operation}
 */
 function _delete(path, options = {}) {
  return  async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(state, path, options);

    const response = await util.request(state, 'DELETE', resolvedPath, resolvedOptions);

    return util.prepareNextState(state, response);
  }
}

export { _delete as delete };