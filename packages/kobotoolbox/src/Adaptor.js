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
 * Make a request to fetch all survey forms accessible to the user's API token. Calls `/api/v2/assets/?asset_type=survey`.
 * @public
 * @example
 * getForms();
 * @function
 * @state data - an array of form objects
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
 * Get submissions for a specific form. Calls `/api/v2/assets/<id>/data/`.
 * @example <caption>Get all submissions for a specific form</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX');
 * @example <caption>Get form submissions with a query</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX', { query: { _submission_time:{ $gte: "2022-06-12T21:54:20" } } });
 * @function
 * @public
 * @param {string} formId - Form Id to get the specific submissions
 * @param {object} [options={}] - Optional query params for the request
 * @state data - an array of submission objects
 * @returns {Operation}
 */
export function getSubmissions(formId, options = {}) {
  return async state => {
    const [resolvedFormId, resolvedOptions] = expandReferences(
      state,
      formId,
      options
    );

    const url = `/assets/${resolvedFormId}/data/`;
    const query = {};
    if (resolvedOptions.query) {
      if (typeof resolvedOptions.query == 'string') {
        query.query = resolvedOptions.query;
      } else {
        query.query = JSON.stringify(resolvedOptions.query);
      }
    }

    const response = await util.request(state, 'GET', url, {
      paginate: true,
      query,
    });
    console.log('✓', response.results.length, 'submissions fetched.');
    return util.prepareNextState(state, response);
  };
}

/**
 * Get deployment information for a specific form. Calls `/api/v2/assets/<id>/deployment/`.
 * @example
 * getDeploymentInfo('aXecHjmbATuF6iGFmvBLBX');
 * @function
 * @public
 * @param {string} formId - Form Id to get the deployment information
 * @state data - an object containing deployment information
 * @returns {Operation}
 */
export function getDeploymentInfo(formId) {
  return async state => {
    const [resolvedFormId] = expandReferences(state, formId);

    const url = `/assets/${resolvedFormId}/deployment/`;

    const response = await util.request(state, 'GET', url, {});
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
