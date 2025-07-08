import { execute as commonExecute } from '@openfn/language-common';
import { request as sendRequest, xmlParser } from './util';

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {string} contentType - Sets the `Content-Type` header on the request. Defaults to `json`. Supported values: `json`, `xml`, `string`, and `form` (for FormData).
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).This is only applicable to the request function
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
 * @private
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
 * @example <caption>Make a GET request</caption>
 * request('GET', '/patient', {
 *   query: { foo: 'bar', a: 1 },
 * });
 * @example <caption>Make a POST request with a body</caption>
 * request('POST', '/todos', {
 *   body:{
 *     "userId": 1,
 *     "title": "delectus aut autem",
 *     "completed": false
 *   },
 * });
 * @function
 * @param {string} method - The HTTP method to use.
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} options - Body, Query, Headers and Authentication parameters
 * @state {HttpState}
 * @returns {Operation}
 */
export function request(method, path, options) {
  return sendRequest(method, path, options);
}

/**
 * Make a GET request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>GET request with query parameters and custom headers</caption>
 * get('/patient', {
 *   query: { foo: 'bar', a: 1 },
 * });
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} options - Body, Query, Headers and Authentication parameters
 * @state {HttpState}
 * @returns {Operation}
 */
export function get(path, options) {
  return sendRequest('GET', path, options);
}

/**
 * Make a POST request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>POST a resource with from state</caption>
 * post('/patient', $.data);
 * @example <caption>POST a resource with custom headers</caption>
 * post('/patient', $.data, {
 *   headers: { 'content-type': 'application/fhir+json' },
 * });
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {object} data - Body data to append to the request. JSON will be converted to a string.
 * @param {RequestOptions} options - Query, Headers and Authentication parameters
 * @state {HttpState}
 * @returns {operation}
 */

export function post(path, data, options) {
  return sendRequest('POST', path, { body: data, ...options });
}

/**
 * Make a PUT request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>PUT a resource from state</caption>
 * put('/patient', $.data);
 * @example <caption>PUT a resource with custom headers</caption>
 * put('/patient', $.data, {
 *   headers: { 'content-type': 'application/fhir+json' },
 * })
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {object} data - Body data to append to the request. JSON will be converted to a string.
 * @param {RequestOptions} options- Query, Headers and Auth parameters
 * @state {HttpState}
 * @returns {Operation}
 */
export function put(path, data, options) {
  return sendRequest('PUT', path, { body: data, ...options });
}

/**
 * Make a PATCH request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>PATCH a resource from state</caption>
 * patch('/patient', $.data);
 * @example <caption>PATCH a resource with custom headers</caption>
 * patch('/patient', $.data, {
 *   headers: { 'content-type': 'application/fhir+json' },
 * });
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {object} data - Body data to append to the request. JSON will be converted to a string.
 * @param {RequestOptions} options - Query, Headers and Auth parameters
 * @state {HttpState}
 * @returns {Operation}
 */
export function patch(path, data, options) {
  return sendRequest('PATCH', path, { body: data, ...options });
}

/**
 * Make a DELETE request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>DELETE a resource by ID</caption>
 * del(`/myendpoint/${$.data.id}`);
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} options - Query, Headers and Auth parameters
 * @state {HttpState}
 * @returns {Operation}
 */
export function del(path, options) {
  return sendRequest('DELETE', path, options);
}

/**
 * Parse XML with the Cheerio parser
 * @public
 * @example <caption>Parse XML from state.response</caption>
 *  parseXML(
 *   (state) => state.response,
 *   ($) => {
 *     return $("table[class=your_table]").parsetable(true, true, true);
 *   }
 * );
 * @example <caption>Using parseXML with a callback to extract data</caption>
 * parseXML(
 *   (state) => state.response,
 *   ($) => $("table[class=your_table]").parsetable(true, true, true)
 * ).then((next) => ({ ...next, results: next.data.data }));
 * @function
 * @param {String} data - Body string to be parsed
 * @param {function} script - script for extracting data
 * @state data - the parsed XML as a JSON object
 * @state references - an array of all previous data objects used in the Job
 * @returns {Operation}
 */
export function parseXML(data, script) {
  return xmlParser({ body: data }, script);
}

export {
  alterState,
  arrayToString,
  as,
  chunk,
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
  group,
  humanProper,
  lastReferenceValue,
  map,
  merge,
  parseCsv,
  scrubEmojis,
  sourceValue,
  splitKeys,
  toArray,
} from '@openfn/language-common';
