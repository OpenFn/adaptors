import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * Make a GET request
 * @example
 * get("patient");
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {Object} params - Optional request params
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function get(path, params, callback) {
  return request('GET', path, null, params, callback);
}

/**
 * Make a POST request
 * @example
 * post("patient", { "name":"Bukayo" });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} data - Object which will be attached to the POST body
 * @param {Object} params - Optional request params
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function post(path, params, callback) {
  return request('POST', path, null, params, callback);
}

/**
 * Make a general HTTP request
 * @example
 * request("POST", "patient", { "name":"Bukayo" });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} data - Object which will be attached to the POST body
 * @param {Object} params - Optional request params
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function request(method, path, body, params = {}, callback = s => s) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedData, resolvedParams] =
      expandReferences(state, method, path, body, params);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        params: resolvedParams,
        data: resolvedData,
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
} from '@openfn/language-common';
