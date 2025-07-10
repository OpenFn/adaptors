import { execute as commonExecute } from '@openfn/language-common';
import { request as sendRequest } from './util';

/**
 * Options provided to the OpenFn API request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 */

/**
 * State object
 * @typedef {Object} OpenFnState
 * @property data - the parsed response body
 * @property response - the response from the OpenFn API, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/

/**
 * Execute a sequence of operations
 * Wraps `language-common/execute`, and prepends initial state for OpenFn.
 * @example
 * execute(
 *   get('/jobs'),
 *   post('/jobs', { name: 'test' })
 * )(state)
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Make a HTTP request to OpenFn API. Requires authentication first.
 * @public
 * @example <caption>Make a GET request</caption>
 * request('GET', 'jobs', {
 *   query: { limit: 10 },
 * });
 * @example <caption>Make a POST request with a body</caption>
 * request('POST', 'jobs', {
 *   body: {
 *     name: 'test job',
 *     expression: 'fn(state => state)'
 *   },
 * });
 * @function
 * @param {string} method - The HTTP method to use.
 * @param {string} path - Path to resource (relative to /api/).
 * @param {RequestOptions} options - Body, Query, Headers and Authentication parameters
 * @state {OpenFnState}
 * @returns {Operation}
 */
export function request(method, path, options) {
  return sendRequest(method, path, options);
}

/**
 * Make a GET request to OpenFn API. Requires authentication first.
 * @public
 * @example <caption>GET request with query parameters</caption>
 * get('jobs', {
 *   query: { limit: 10, offset: 0 },
 * });
 * @function
 * @param {string} path - Path to resource (relative to /api/).
 * @param {RequestOptions} options - Query, Headers and Authentication parameters
 * @state {OpenFnState}
 * @returns {Operation}
 */
export function get(path, options) {
  return sendRequest('GET', path, options);
}

/**
 * Make a POST request to OpenFn API. Requires authentication first.
 * @public
 * @example <caption>POST a new job</caption>
 * post('jobs', {
 *   name: 'test job',
 *   body: 'fn(state => state)'
 * });
 * @example <caption>POST with custom headers</caption>
 * post('jobs', {
 *   name: 'test job',
 *   body: 'fn(state => state)'
 * }, {
 *   headers: { 'x-custom': 'value' },
 * });
 * @function
 * @param {string} path - Path to resource (relative to /api/).
 * @param {object} data - Body data to append to the request. JSON will be converted to a string.
 * @param {RequestOptions} options - Query, Headers and Authentication parameters
 * @state {OpenFnState}
 * @returns {operation}
 */
export function post(path, data, options) {
  return sendRequest('POST', path, { body: data, ...options });
}

export {
  alterState,
  cursor,
  dateFns,
  beta,
  combine,
  dataPath,
  dataValue,
  each,
  field,
  fn,
  fnIf,
  fields,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
