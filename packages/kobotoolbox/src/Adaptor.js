import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import * as util from './Utils';

/**
 * Options object
 * @typedef {Object} RequestOptions
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} headers - An object of all request headers
 * @property {string} [parseAs='json'] - The response format to parse (e.g., 'json', 'text', or 'stream')
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
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
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Make a request to get the list of forms
 * @public
 * @example
 * getForms({}, state => {
 *    console.log(state.data);
 *    return state;
 * });
 * @function
 * @param {RequestOptions} [options={}] - Optional headers and query for the request
 * @param {function} callback - (Optional) Callback function to execute after fetching form list
 * @returns {Operation}
 */
export function getForms(options = {}, callback) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    const url = `/assets/?format=json`;

    const response = await util.request(state, 'GET', url, resolvedOptions);
    console.log('✓', response.body.count, 'forms fetched.');
    return util.prepareNextState(state, response, callback);
  };
}

/**
 * Get submissions for a specific form
 * @example
 * getSubmissions({formId: 'aXecHjmbATuF6iGFmvBLBX'}, state => {
 *   console.log(state.data);
 *   return state;
 * });
 * @function
 * @public
 * @param {object} params - Form Id and data to make the fetch or filter
 * @param {function} callback - (Optional) Callback function to execute after fetching form submissions
 * @returns {Operation}
 */
export function getSubmissions(params, callback) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    const { formId } = resolvedParams;

    const url = `/assets/${formId}/data/?format=json`;

    const response = await util.request(state, 'GET', url, resolvedParams);
    console.log('✓', response.body.count, 'forms fetched.');
    return util.prepareNextState(state, response, callback);
  };
}

/**
 * Get deployment information for a specific form
 * @example
 * getDeploymentInfo({formId: 'aXecHjmbATuF6iGFmvBLBX'}, state => {
 *   console.log(state.data);
 *   return state;
 * });
 * @function
 * @public
 * @param {object} params - Form Id and data to make the fetch or filter
 * @param {function} callback - (Optional) Callback function to execute after fetching form deployment information
 * @returns {Operation}
 */
export function getDeploymentInfo(params, callback) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    const { formId } = resolvedParams;

    const url = `/assets/${formId}/deployment/?format=json`;

    const response = await util.request(state, 'GET', url, resolvedParams);
    console.log('✓', 'deployment information fetched.');
    return util.prepareNextState(state, response, callback);
  };
}

export {
  alterState,
  cursor,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  fn,
  fnIf,
  http, 
  group,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
