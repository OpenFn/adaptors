/**
 * New helpers go here
 *
 * light, generic wrappers
 *
 */

import { request } from './util/http';

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors.
 * @property {object} form - Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 * @property {object} tls - TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
 */

/**
 * State object
 * @typedef {Object} HttpState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Make a HTTP request.
 * @public
 * @function
 * @example
 * request(
 *   'GET',
 *   'https://jsonplaceholder.typicode.com/todos'
 * )
 * @param {string} method - The HTTP method to use.
 * @param {string} url - URL to resource.
 * @param {RequestOptions} options - Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @state {HttpState}
 * @returns {Operation}
 */
export function request(method, url, options, callback) {
  return sendRequest(method, url, options, callback);
}

/**
 * Make a GET request.
 * @public
 * @function
 * @example
 * get('https://jsonplaceholder.typicode.com/todos')
 * @param {string} url - URL to access.
 * @param {RequestOptions} options - Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @state {HttpState}
 * @returns {Operation}
 */
export function get(url, options, callback) {
  return sendRequest('GET', url, options, callback);
}

/**
 * Make a POST request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example
 * @function
 *  post('/myEndpoint', {
 *    body: {'foo': 'bar'},
 *    headers: {'content-type': 'application/json'},
 *  })
 * @param {string} url - URL to access.
 * @param {RequestOptions} params - Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @state {HttpState}
 * @returns {Operation}
 */

export function post(path, data, options, callback) {
  return sendRequest('POST', path, { body: data, ...options }, callback);
}
