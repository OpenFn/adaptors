import { expandReferences } from '@openfn/language-common/util';
import util from './Utils';

/**
 * Make a GET request
 * @example
 * get("patient");
 * @function
 * @param {string} path - Path to resource
 * @param {Object} params - Optional request params
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function get(path, params, callback) {
  return request('POST', path, null, params, callback);
}

/**
 * Make a POST request
 * @example
 * post("patient", { "name":"Bukayo" });
 * @function
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
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} data - Object which will be attached to the POST body
 * @param {Object} params - Optional request params
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function request(method, path, body, params = {}, callback = s => s) {
  return async state => {
    const [resolvedPath, resolvedData, resolvedParams] = expandReferences(
      state,
      path,
      params
    );
    try {
      const response = await util.request(
        state.configuration,
        `/${resolvedPath}`,
        {
          method,
          params: resolvedParams,
          data: resolvedData,
        }
      );

      return util.prepareNextState(state, response, callback);
    } catch (e) {
      throw e.body ?? e;
    }
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
