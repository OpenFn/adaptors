/**
 * This file contains some operations which wrap the common.util request helper
 *
 * They enable every adaptor to export the http namespace and expose totally generic http operations
 *
 */

import { expandReferences } from './util';
import { request } from './util/http';
import set from 'lodash/set';

const helpers = {
  json: function () {
    set(this, 'headers.Content-Type', 'application/json');
    return this;
  },
  basic: function (username, password) {
    const buff = Buffer.from(`${username}:${password}`);
    const credentials = buff.toString('base64');

    set(this, 'headers.Authorization', `Basic ${credentials}`);
    return this;
  },
  bearer: function (token) {
    set(this, 'headers.Authorization', `Bearer ${token}`);
    return this;
  },
  oauth: function (token) {
    set(this, 'headers.Authorization', `Bearer ${token}`);
    return this;
  },
};

/**
 * Builder function for request options
 * Enables stuff like this:
 * ```
 * get($.data.url, http.options({ query: $.query }).json().basic(user, pass))
 * ```
 */
export function options(opts = {}) {
  for (let h in helpers) {
    Object.defineProperty(opts, h, {
      enumerable: false,
      value: helpers[h],
    });
  }

  return opts;
}

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
 * @state {HttpState}
 * @returns {Operation}
 */
const req = function (method, url, options) {
  return state => {
    const [resolvedMethod, resolvedUrl, resolvedOptions] = expandReferences(
      state,
      method,
      url,
      options
    );
    return request(resolvedMethod, resolvedUrl, resolvedOptions);
  };
};
export { req as request };

/**
 * Make a GET request.
 * @public
 * @function
 * @example
 * get('https://jsonplaceholder.typicode.com/todos')
 * @param {string} url - URL to access.
 * @param {RequestOptions} options - Query, Headers and Authentication parameters
 * @state {HttpState}
 * @returns {Operation}
 */
export function get(url, options) {
  return req('GET', url, options);
}

/**
 * Make a POST request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @function
 * @example
 *  post('/myEndpoint', {
 *    body: {'foo': 'bar'},
 *    headers: {'content-type': 'application/json'},
 *  })
 * @param {string} url - URL to access.
 * @param {RequestOptions} params - Query, Headers and Authentication parameters
 * @state {HttpState}
 * @returns {Operation}
 */

export function post(path, data, options) {
  return req('POST', path, { body: data, ...options });
}
