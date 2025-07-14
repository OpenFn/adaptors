import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} CHTHttpState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the CHT HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} form - Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 */

/**
 * Make a GET request against the base URL.
 * @example <caption>Get a list of contacts</caption>
 * get("/api/v2/export/contacts");
* @example <caption>Filter contacts given a name</caption>
 * get("/api/v2/export/contacts", {
  query: {"filters": {
    "search": "jim"
  }}
});
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Options to configure the HTTP request
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {CHTHttpState}
 */
export function get(path, options, callback) {
  return request('GET', path, null, options, callback);
}

/**
 * Make a POST request against the base url
 * @example <caption>Create a new person</caption>
 * post("/api/v1/people", {  
  "name": "Hannah",
  "phone": "+254712345678",
  "type": "contact",
  "contact_type": "patient", });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {CHTHttpState}
 */
export function post(path, body, options, callback) {
  return request('POST', path, body, options, callback);
}

/**
 * Make a PUT request against the base url
 * @example <caption>Update settings</caption>
 * put("/api/v1/settings",{query:{overwrite:true}});
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Options to configure the HTTP request
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {CHTHttpState}
 */
export function put(path, options, callback) {
  return request('PUT', path, null, options, callback);
}

/**
 * Make a general HTTP request to CHT
 * @example
 * request("POST","/api/v1/people", {  
  "name": "Hannah",
  "phone": "+254712345678",
  "type": "contact",
  "contact_type": "patient", });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} data - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {CHTHttpState}
 */
export function request(method, path, body, options = {}, callback = s => s) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedData, resolvedoptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        data: resolvedData,
        ...resolvedoptions,
      }
    );

    return util.prepareNextState(state, response, callback);
  };
}

export {
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
  as
} from '@openfn/language-common';
