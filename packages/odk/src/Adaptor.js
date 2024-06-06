import { expandReferences } from '@openfn/language-common/util';
import { execute as commonExecute } from '@openfn/language-common';
import * as util from './Utils';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for commcare.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(
      util.authorize,
      ...operations
    )({ ...initialState, ...state });
  };
}

/**
 * Make a GET request
 * @example
 * get("v1/projects");
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {Object} params - Optional request params
 * @param {Object} headers - Optional request headers
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function get(path, params, headers, callback) {
  return request('GET', path, null, params, callback, headers);
}

/**
 * Make a GET request
 * @example
 * getForms(22);
 * @function
 * @public
 * @param {number} projectId - Id of the project you want to get its forms
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function getForms(projectId, callback) {
  const path = `/v1/projects/${projectId}/forms`;
  return request('GET', path, null, callback);
}

/**
 * Make a GET request
 * @example
 * getSubmissions(22, 'test');
 * @function
 * @public
 * @param {number} projectId - Id of the project you want to get its forms submissions
 * @param {string} xmlFormId - Id of the form you want to get its submissions
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function getSubmissions(projectId, xmlFormId, callback) {
  const path = `/v1/projects/${projectId}/forms/${xmlFormId}/submissions`;
  return request('GET', path, null, callback);
}

/**
 * Make a POST request
 * @example
 * post('v1/projects', { name: 'Project Name' });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} data - Object which will be attached to the POST body
 * @param {Object} params - Optional request params
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function post(path, data, params, callback) {
  return request('POST', path, data, params, callback);
}

/**
 * Make a general HTTP request
 * @example
 * request("POST", 'v1/projects', { name: 'Project Name' });
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

    try {
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
    } catch (error) {
      throw error.statusCode === 404 ? 'Page Not Found' : error.body ?? error;
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
