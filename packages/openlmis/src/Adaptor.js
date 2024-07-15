import { expandReferences } from '@openfn/language-common/util';
import { execute as commonExecute } from '@openfn/language-common';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} OpenLMISState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for odk.
 * @example <caption> * execute(</caption>
 *   get("processingPeriods")
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 * @state {OpenLMISState}
 */
export function execute(...operations) {
  return state => {
    return commonExecute(util.authorize, ...operations)(state);
  };
}
/**
 * Make a GET request in OpenLMIS
 * @example <caption>Get all supplyLines</caption>
 * get("supplyLines");
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {OpenLMISState}
 */
export function get(path, options, callback) {
  return request('GET', path, null, options, callback);
}

/**
 * Make a POST request in OpenLMIS
 * @example <caption>Creates new program</caption>
 * post("programs", { "name":"Bukayo" });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} data - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {OpenLMISState}
 */
export function post(path, options, callback) {
  return request('POST', path, null, options, callback);
}

/**
 * Make a PUT request in OpenLMIS
 * @example <caption>Update existing program</caption>
 * put("programs/123", { "name":"Bukayo" });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} data - Object which will be attached to the PUT body
 * @param {RequestOptions} options - Optional request options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {OpenLMISState}
 */
export function put(path, options, callback) {
  return request('PUT', path, null, options, callback);
}

/**
 * Make a general HTTP request in OpenLMIS
 * @example
 * request("POST", "patient", { "name":"Bukayo" });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} data - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {OpenLMISState}
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
  fnIf,
  merge,
  sourceValue,
  lastReferenceValue,
} from '@openfn/language-common';
