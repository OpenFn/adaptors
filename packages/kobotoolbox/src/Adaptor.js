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
 * getForms();
 * @function
 * @returns {Operation}
 */
export function getForms() {
  return async state => {
    const url = `/assets/?asset_type=survey`;

    const response = await util.request(state, 'GET', url, {});
    console.log('✓', response.body.results.length, 'forms fetched.');
    return util.prepareNextState(state, response);
  };
}

/**
 * Get submissions for a specific form
 * @example <caption>Get all submissions for a specific form</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX');
 * @function
 * @public
 * @param {string} formId - Form Id to get the specific submissions
 * @returns {Operation}
 */
export function getSubmissions(formId) {
  return async state => {
    const [resolvedFormId] = expandReferences(state, formId);

    const url = `/assets/${resolvedFormId}/data/`;

    const response = await util.request(state, 'GET', url, {}, true);
    console.log('✓', response.body.results.length, 'forms fetched.');

    return util.prepareNextState(state, response);
  };
}

/**
 * Get deployment information for a specific form
 * @example
 * getDeploymentInfo('aXecHjmbATuF6iGFmvBLBX');
 * @function
 * @public
 * @param {string} formId - Form Id to get the deployment information
 * @param {RequestOptions} [options={}] - Optional query params and headers for the request
 * @returns {Operation}
 */
export function getDeploymentInfo(formId, options = {}) {
  return async state => {
    const [resolvedFormId, resolvedOptions] = expandReferences(
      state,
      formId,
      options
    );

    const url = `/assets/${resolvedFormId}/deployment/`;

    const response = await util.request(state, 'GET', url, resolvedOptions);
    console.log('✓', 'deployment information fetched.');
    return util.prepareNextState(state, response);
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
