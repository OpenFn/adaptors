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
    const url = `/assets/?asset_type=survey`;
    const response = await util.request(state, 'GET', url, {});

    console.log('✓', response.body.results?.length, 'forms fetched.');

    return util.prepareNextState(state, response);
  };
}

/**
 * Get submissions for a specific form. Calls `/api/v2/assets/<formId>/data/`.
 * @example <caption>Get all submissions for a specific form</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX');
 * @example <caption>Get form submissions with a query</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX', { query: { _submission_time:{ $gte: "2025-03-12T21:54:20" } } });
 * @function
 * @public
 * @param {string} formId - Form Id to get the specific submissions
 * @param {object} [options={}] - Optional query params for the request
 * @param {number} [options.limit] - Limit the number of submissions to fetch
 * @param {object} [options.query] - Query parameters to filter the submissions. See query operators {@link http://docs.mongodb.org/manual/reference/operator/query/.}
 * @param {number} [options.max=10000] - (Openfn only) Restrict the maximum number of retrieved submissions. May be fetched in several pages. Not used if `limit` is set.
 * @param {number} [options.pageSize=1000] - (Openfn only) Limits the size of each page of submissions. Not used if limit is set.
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
    if (resolvedOptions.limit) {
      const keysToRemove = Object.keys(resolvedOptions).filter(k =>
        k.match(/^(max|pageSize)$/)
      );
      if (keysToRemove.length) {
        console.warn(
          `Warning: ignoring option [${keysToRemove.join(
            ','
          )}] as "limit" is set`
        );
        delete resolvedOptions.max;
        delete resolvedOptions.pageSize;
      }
    }
    const { query, limit, pageSize = 1e3, max = 1e4 } = resolvedOptions;
    const path = `/assets/${resolvedFormId}/data/`;
    const qs = {};
    if (query) {
      if (typeof query === 'string') {
        qs.query = query;
      } else {
        qs.query = JSON.stringify(query);
      }
    }
    const requestOptions = {
      query: { ...qs },
      max,
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
