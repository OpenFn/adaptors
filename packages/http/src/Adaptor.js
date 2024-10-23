import { execute as commonExecute } from '@openfn/language-common';
import { request as sendRequest, xmlParser } from './util';

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
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
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Execute a sequence of operations
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
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
 * Make a HTTP request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example
 * request(
 *   'GET',
 *   '/myEndpoint',
 *    {
 *      query: {foo: 'bar', a: 1},
 *      headers: {'content-type': 'application/json'},
 *    }
 * )
 * @function
 * @param {string} method - The HTTP method to use.
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} params - Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @state {HttpState}
 * @returns {Operation}
 */
export function request(method, path, params, callback) {
  return sendRequest(method, path, params, callback);
}

/**
 * Make a GET request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example
 * get('/myEndpoint', {
 *   query: {foo: 'bar', a: 1},
 *   headers: {'content-type': 'application/json'},
 * })
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} params - Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @state {HttpState}
 * @returns {Operation}
 */
export function get(path, params, callback) {
  return sendRequest('GET', path, params, callback);
}

/**
 * Make a POST request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example
 *  post('/myEndpoint', {
 *    body: {'foo': 'bar'},
 *    headers: {'content-type': 'application/json'},
 *  })
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} params - Body, Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @state {HttpState}
 * @returns {operation}
 */

export function post(path, params, callback) {
  return sendRequest('POST', path, params, callback);
}

/**
 * Make a PUT request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example
 *  put('/myEndpoint', {
 *    body: {'foo': 'bar'},
 *    headers: {'content-type': 'application/json'},
 *  })
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} params - Body, Query, Headers and Auth parameters
 * @param {function} callback - (Optional) Callback function
 * @state {HttpState}
 * @returns {Operation}
 */
export function put(path, params, callback) {
  return sendRequest('PUT', path, params, callback);
}

/**
 * Make a PATCH request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example
 *  patch('/myEndpoint', {
 *    body: {'foo': 'bar'},
 *    headers: {'content-type': 'application/json'},
 *  })
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} params - Body, Query, Headers and Auth parameters
 * @param {function} callback - (Optional) Callback function
 * @state {HttpState}
 * @returns {Operation}
 */
export function patch(path, params, callback) {
  return sendRequest('PATCH', path, params, callback);
}

/**
 * Make a DELETE request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example
 *  del(`/myendpoint/${state => state.data.id}`, {
 *    headers: {'content-type': 'application/json'}
 *  })
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} params - Body, Query, Headers and Auth parameters
 * @param {function} callback - (Optional) Callback function
 * @state {HttpState}
 * @returns {Operation}
 */
export function del(path, params, callback) {
  return sendRequest('DELETE', path, params, callback);
}

/**
 * Parse XML with the Cheerio parser
 * @public
 * @example
 *  parseXML(
 *   (state) => state.response,
 *   ($) => {
 *     return $("table[class=your_table]").parsetable(true, true, true);
 *   }
 * );
 * @example <caption>Using parseXML with a callback</caption>
 *  parseXML(
 *   (state) => state.response,
 *   ($) => {
 *     return $("table[class=your_table]").parsetable(true, true, true);
 *   },
 *   (next) => ({ ...next, results: next.data.body })
 * );
 * @function
 * @param {String} body - data string to be parsed
 * @param {function} script - script for extracting data
 * @param {function} callback - (Optional) Callback function
 * @state data - the parsed XML as a JSON object
 * @state references - an array of all previous data objects used in the Job
 * @returns {Operation}
 */
export function parseXML(body, script, callback) {
  return xmlParser(body, script, callback);
}

export {
  alterState,
  arrayToString,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  chunk,
  group,
  humanProper,
  lastReferenceValue,
  merge,
  scrubEmojis,
  sourceValue,
  splitKeys,
  toArray,
  parseCsv,
} from '@openfn/language-common';
