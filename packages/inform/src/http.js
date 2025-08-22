import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} HttpState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the Inform server, including headers, statusCode, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the Inform request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string.
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 */

/**
 * Make a GET request to Inform
 * @example <caption>Get all forms</caption>
 * http.get('forms')
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, options) {
  return request('GET', path, options);
}

/**
 * Make a general HTTP request to Inform
 * @example <caption>Get all forms with a query</caption>
 * http.request('GET', 'forms', {
 *   query: {
 *     public: true,
 *     page: 1,
 *     page_size: 5,
 *   },
 * });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedoptions] = expandReferences(
      state,
      method,
      path,
      options
    );

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedoptions
    );

    return util.prepareHttpNextState(state, response);
  };
};
