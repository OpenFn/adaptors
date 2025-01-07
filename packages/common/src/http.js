import set from 'lodash/set';
import { request, expandReferences } from './util';

/**
 * Helper functions provided by `http.options`.
 * @typedef OptionsHelpers
 * @public
 * @property {function} json - Sets the `content-type' header to 'application/json'
 * @property {function} basic - Sets basic auth on the Authorization header. Pass username and password
 * @property {function} bearer - Sets a Bearer token on the Authorization header. Pass the token.
 * @property {function} oauth - Sets a Bearer token on the Authorization header. Pass the oauth token.
 */

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
 * Builder function to create request options. Returns an object with helpers to
 * easily add commonly used options. The return object is chainable so you can set
 * as many options as you want.
 * Pass an object to set your own options.
 * @param {CommonRequestOptions} options - options to pass to the request
 * @returns {OptionsHelpers}
 * @function
 * @public
 * @example <caption>Get with a query an oath token</caption>
 * get($.data.url, http.options({ query: $.query }).oath($.configuration.access_token))
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
 * @typedef {Object} CommonRequestOptions
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
 * @typedef {Object} CommonHttpState
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
 * http.request(
 *   'GET',
 *   'https://jsonplaceholder.typicode.com/todos'
 * )
 * @name request
 * @param {string} method - The HTTP method to use.
 * @param {string} url - URL to resource.
 * @param {CommonRequestOptions} options - Request options
 * @state {CommonHttpState}
 * @returns {Operation}
 */
const req = function (method, url, options) {
  return async state => {
    const [resolvedMethod, resolvedUrl, resolvedOptions] = expandReferences(
      state,
      method,
      url,
      options
    );
    const { body, ...responseWithoutBody } = await request(
      resolvedMethod,
      resolvedUrl,
      resolvedOptions
    );
    return {
      ...state,
      response: responseWithoutBody,
      data: body,
    };
  };
};
export { req as request };

/**
 * Make a GET request.
 * @public
 * @function
 * @example <caption>Request a resource</caption>
 * http.get('https://jsonplaceholder.typicode.com/todos')
 * @example <caption>Request a resource with basic auth</caption>
 * http.get(
 *  'https://jsonplaceholder.typicode.com/todos',
 *  http.options().basic('user', 'pass')
 * )
 * @example <caption>Request a resource with oauth</caption>
 * http.get(
 *  'https://jsonplaceholder.typicode.com/todos',
 *  http.options().oauth($.configuration.access_token)
 * )
 * @param {string} url - URL to access
 * @param {CommonRequestOptions} options - Request options
 * @state {CommonHttpState}
 * @returns {Operation}
 */
export function get(url, options) {
  return req('GET', url, options);
}

/**
 * Make a POST request.
 * @public
 * @function
 * @example <caption>Post a JSON object (setting the content-type header)</caption>
 *  http.post(
 *    'https://jsonplaceholder.typicode.com/todos',
 *    $.data,
 *    options().json(),
 *  })
 * @param {string} url - URL to access
 * @param {CommonRequestOptions} options - Request options
 * @state {CommonHttpState}
 * @returns {Operation}
 */
export function post(path, data, options) {
  return req('POST', path, { body: data, ...options });
}
