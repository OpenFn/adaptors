import { expandReferences } from '@openfn/language-common/util';

import { sendRequest } from './util';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 */

/**
 * Make a GET request
 * @example <caption>List libraries</caption>
 * get("libraries");
 * @example <caption>Get a library fields</caption>
 * get('libraries/HyZV7AYk0');
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, options) {
  return request('GET', path, null, options);
}

/**
 * Make a POST request
 * @example <caption>Create an entry</caption>
 * post("libraries/HyZV7AYk0/entries", { "name": "Bukayo" });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, body, options) {
  return request('POST', path, body, options);
}

/**
 * Make a general HTTP request
 * @example <caption>Edit an entry</caption>
 * request("PUT", "libraries/HyZV7AYk0/entries/T0xIYmE-V2QoMmRTWF1sVVJUKnU", { "name": "Bukayo" });
 * @example <caption>Delete an entry</caption>
 * request("DELETE", "libraries/HyZV7AYk0/entries/T0xIYmE-V2QoMmRTWF1sVVJUKnU");
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedOptions] =
      expandReferences(state, method, path, body, options);

    return sendRequest(state, resolvedMethod, resolvedPath, {
      ...resolvedOptions,
      body: resolvedBody,
    });
  };
}
