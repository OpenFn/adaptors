import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import * as util from './util';

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
    const response = await util.request(state, 'GET', 'assets', {
      query: { asset_type: 'survey' },
    });

    console.log('✓', response.body.results?.length, 'forms fetched.');

    return util.prepareNextState(state, response);
  };
}

/**
 * Get submissions for a specific form. Calls `/api/v2/assets/<formId>/data/`
 * @example <caption>Get submissions for a specific form</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX');.
 * @example <caption>Get all submissions for a specific form</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX', { limit: Infinity });
 * @example <caption>Get form submissions with a query</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX', { query: { _submission_time:{ $gte: "2025-03-12T21:54:20" } } });
 * @example <caption>Get form submissions with sorting</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX', { sort: { _submission_time: -1 } });
 * @example <caption>Get form submissions with specific start index</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX', { start: 10 });
 * @function
 * @public
 * @param {string} formId - Form Id to get the specific submissions
 * @param {object} [options={}] - Options to control the request
 * @param {object} [options.sort] - Field and direction to sort submissions by.
 * @param {object} [options.query] - Query options to filter the submissions. See query operators {@link http://docs.mongodb.org/manual/reference/operator/query/.}
 * @param {number} [options.start=0] - The index of the first submission to return.
 * @param {number} [options.limit=30000] - Maximum number of submissions to fetch. Pass `Infinity` to disable the limit and download all submissions
 * @param {number} [options.pageSize=10000] - Limits the size of each page of submissions. Maximum value is 30000.
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

    const { query, limit, pageSize, sort, start } = resolvedOptions;
    const path = `/assets/${resolvedFormId}/data/`;
    const qs = {};
    if (query) {
      qs.query = util.maybeStringify(query);
    }
    if (sort) {
      qs.sort = util.maybeStringify(sort);
    }
    const requestOptions = {
      query: { ...qs },
      start,
      limit,
      pageSize,
    };
    const result = await util.requestWithPagination(
      state,
      path,
      requestOptions
    );

    console.log('✓', result?.length, 'submissions fetched.');
    return composeNextState(state, result);
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
  as,
  cursor,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  sourceValue,
} from '@openfn/language-common';
