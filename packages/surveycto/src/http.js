import { expandReferences } from '@openfn/language-common/util';
import { requestHelper, prepareNextState } from './Utils';

/**
 * State object
 * @typedef {Object} HTTPState
 * @property data - the parsed response body
 * @property response - the response from the SurveyCTO server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to request()
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} [headers] - An object of headers parameters.
 * @property {object} [body] - Body data to append to the request.
 * @property {object} [query] - An object of query parameters to be encoded into the URL.
 * @property {object} [contentType] - Set the content-type header to the appropriate format. Supported values: `json` and `form`
 * @property {string} [method = GET] - The HTTP method to use.
 */

/**
 * Make a HTTP request to SurveyCTO
 * @public
 * @example <caption>Post JSON data to SurveyCTO</caption>
 * http.request("/anEndpoint", {
 *   method: "POST",
 *    contentType: "json",
 *   body: $.data,
 * });
 * @example <caption>Upload a CSV blob to a dataset</caption>
 *   http.request('datasets/library/records/upload', {
 *     method: 'POST',
 *     contentType: 'form',
 *     body: {
 *       file: {
 *         blob: $.data,
 *         type: 'text/csv',
 *         filename: 'library.csv'
 *       }
 *     },
 *   });
 * @function
 * @param {string} path - Path to resource
 * @param {RequestOptions} params - Query, body, headers and method parameters
 * @returns {Operation}
 * @state {HTTPState}
 */
export function request(path, params) {
  return async state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    const response = await requestHelper(state, resolvedPath, resolvedParams);
    return prepareNextState(state, response);
  };
}

/**
 * Get resources from SurveyCTO
 * @public
 * @example <caption>Get a record with id</caption>
 * http.get('/datasets/enumerators_dataset/record', {
 *   query: {
 *     recordId: '4',
 *   },
 * });
 * @example <caption>Get a dataset with id</caption>
 * http.get('/datasets/enumerators_dataset')
 * @example <caption>Get a dataset in csv format</caption>
 * http.get('/datasets/data/csv/enumerators_dataset', {
 *   query: {
 *     asAttachment: true,
 *   },
 * });
 * @function
 * @param {string} path - Path to resource
 * @param {RequestOptions} params - Query and headers parameters
 * @returns {Operation}
 * @state {HTTPState}
 */
export function get(path, params = {}) {
  return request(path, { ...params, method: 'GET' });
}

/**
 * Send a HTTP POST request to SurveyCTO
 * @public
 * @example <caption>Purge a dataset</caption>
 * http.post('/datasets/enumeratorse_dataset/purge');
 * @function
 * @param {string} path - Path to resource
 * @param {RequestOptions} params - Query, body, and headers parameters
 * @returns {Operation}
 * @state {HTTPState}
 */
export function post(path, params = {}) {
  return request(path, { ...params, method: 'POST' });
}

/**
 * Delete resources from SurveyCTO
 * @public
 * @alias delete
 * @example <caption>Delete a dataset</caption>
 * http.delete('/datasets/enumerators_dataset');
 * @example <caption>Delete a dataset record</caption>
 * http.delete('/datasets/enumerators_dataset/record', {
 *   query: {
 *     recordId: 2,
 *   },
 * });
 * @function
 * @param {string} path - Path to resource
 * @param {RequestOptions} params - Query and headers parameters
 * @returns {Operation}
 * @state {HTTPState}
 *
 */
export function _delete(path, params = {}) {
  return request(path, { ...params, method: 'DELETE' });
}
