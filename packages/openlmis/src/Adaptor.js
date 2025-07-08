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
 * @private
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} body - body data to append to the request.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for openlmis.
 * @example <caption> * execute(</caption>
 *   get("processingPeriods")
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 * @state {OpenLMISState}
 */
export function execute(...operations) {
  return commonExecute(util.authorize, ...operations);
}
/**
 * Send a GET request to OpenLMIS
 * @example <caption>Get all supplyLines</caption>
 * get("/supplyLines");
 * @function
 * @public
 * @param {string} path - Path to resource (relative to the base URL defined in configuration)
 * @param {RequestOptions} options - Optional request options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {OpenLMISState}
 */
export function get(path, options, callback) {
  return request('GET', path, null, options, callback);
}

/**
 * Send a POST request to OpenLMIS
 * @example <caption>Creates new program</caption>
 * post("/programs", { name: "Bukayo", code: "abc" });
 * @function
 * @public
 * @param {string} path - Path to resource (relative to the base URL defined in configuration)
 * @param {object} body - Object which will be attached to the POST body
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {OpenLMISState}
 */
export function post(path, body, callback) {
  return request('POST', path, body, null, callback);
}

/**
 * Send a PUT request to OpenLMIS
 * @example <caption>Update existing program</caption>
 * put("/programs/123", { name: "DigTalent", code: "123" });
 * @function
 * @public
 * @param {string} path - Path to resource (relative to the base URL defined in configuration)
 * @param {object} body - Object which will be attached to the PUT body
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {OpenLMISState}
 */
export function put(path, body, callback) {
  return request('PUT', path, body, null, callback);
}

/**
 * Send a HTTP request to OpenLMIS
 * @example
 * request("POST", "/programs", { name: "WSH", code: "123" });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource (relative to the base URL defined in configuration)
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {OpenLMISState}
 */
export function request(method, path, body, options = {}, callback = s => s) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedoptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
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
  as
} from '@openfn/language-common';
