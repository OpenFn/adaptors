import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} CommCareHttpState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the CommCare server (excluding the body)
 * @property references - An array of all previous data objects used in the Job
 * @private
 */

/**
 * Make a POST request to CommCare. Use this to send resources directly to Commcare REST API.
 * You can pass CommCare body data as a JSON object.
 * @example <caption>Post to the V2 case API with JSON data (prefixed with /a/<domain>/api/)</caption>
 * http.post('case/v2', {
 *   case_type: 'patient',
 *   case_name: 'Elizabeth Harmon',
 *   owner_id: '20cc9dda-b90a-4af3-aa3d-fc67184e73ef',
 *   properties: { dob: '1948-11-02' },
 * });
 * @function
 * @public
 * @param {string} path - Path to resource. Relative paths are prefixed with `/a/<domain>/api/`; paths starting with `/` are used as-is.
 * @param {object} data - Object or JSON to create a resource
 * @param {Object} [params] - Optional request params
 * @returns {Operation}
 * @state {CommCareHttpState}
 */
export function post(path, data, params = {}) {
  return request('POST', path, data, params);
}

/**
 * Make a GET request to CommCare. Use this to retrieve resources directly from the CommCare REST API.
 * @example <caption>Get cases using the v1 API (prefixed with /a/<domain>/api/)</caption>
 * http.get('case/v1');
 * @function
 * @public
 * @param {string} path - Path to resource. Relative paths are prefixed with `/a/<domain>/api/`; paths starting with `/` are used as-is.
 * @param {Object} [params] - Optional request params
 * @returns {Operation}
 * @state {CommCareHttpState}
 */
export function get(path, params = {}) {
  return request('GET', path, null, params);
}

/**
 * Make a general HTTP request against the CommCare server. Use this to make any request to CommCare REST API.
 * @example <caption>Get cases using the v1 API (prefixed with /a/<domain>/api/)</caption>
 * http.request('GET', 'case/v1');
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the body
 * @param {object} params - An object of query parameters to be encoded into the URL
 * @returns {Operation}
 * @state {CommCareHttpState}
 */
export function request(method, path, body, params = {}) {
  return async state => {
    const { domain } = state.configuration;
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedParams] =
      expandReferences(state, method, path, body, params);

    const url = util.buildUrl(resolvedPath, domain);
    const response = await util.request(state.configuration, url, {
      method: resolvedMethod,
      data: resolvedBody,
      params: resolvedParams,
      contentType: 'application/json',
    });

    return util.prepareNextState(state, response);
  };
}
