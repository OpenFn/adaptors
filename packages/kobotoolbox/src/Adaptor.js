import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences, logResponse } from '@openfn/language-common/util';

import * as util from './util';

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
 * Make a request to fetch all survey forms accessible to the authorized user. Calls `/api/v2/assets/?asset_type=survey`.
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
    const { body } = await util.request(state, 'GET', url, {});

    console.log('✓', body.results?.length, 'forms fetched.');

    return composeNextState(state, body);
  };
}

/**
 * Get submissions for a specific form. Calls `/api/v2/assets/<formId>/data/`.
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
export function getSubmissions(formId, options) {
  return async state => {
    const [resolvedFormId, resolvedOptions = {}] = expandReferences(
      state,
      formId,
      options
    );

    const { query, limit, pageSize, start } = resolvedOptions;
    const url = `/assets/${resolvedFormId}/data/`;
    const qs = {};
    if (query) {
      if (typeof query === 'string') {
        qs.query = query;
      } else {
        qs.query = JSON.stringify(query);
      }
    }

    const { body } = await util.paginateRequest(state, 'GET', url, {
      query: { ...qs },
      limit,
      pageSize,
      start,
    });

    console.log('✓', body?.results?.length, 'submissions fetched.');
    return composeNextState(state, body);
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
