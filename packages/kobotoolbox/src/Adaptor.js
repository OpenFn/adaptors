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
    console.log('✓', response.body.count, 'forms fetched.');
    return util.prepareNextState(state, response);
  };
}

/**
 * Get submissions for a specific form
 * @example <caption>Get all submissions for a specific form</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX');
 * @example <caption>Get submissions with exactly 10 items. Equivalent to `<baseURL>/api/v2/assets/?offset=0&limit=10`</caption>
 * getSubmissions('aXecHjmbATuF6iGFmvBLBX', { limit: 10 });
 * @function
 * @public
 * @param {string} formId - Form Id to get the specific submissions
 * @param {object} [options={}] - Optional query params; limit and start for the request
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

    let {start, limit = Infinity, pageSize = 30000} = resolvedOptions
    console.log({ start, limit, pageSize });
    

    let nextState = state;
    let result;
    let count = 0;

    // Automatically paginate if the user did not pass a start
    let allowPagination = isNaN(resolvedOptions.start);

    try {
      let requestOptions = {
        query: {
          ...resolvedOptions,
          limit: limit < Infinity ? Math.min(pageSize, limit - count): pageSize,
         
        },
      };

   
      console.log('ola', Math.min(pageSize, limit - count));
      console.log({limit});
      
      
      
      

      do {
        // Make first request to get submissions
        const response = await util.request(state, 'GET', url, requestOptions);

        nextState = util.prepareNextState(state, response);
        count += response.body.results.length;
console.log({count});

        // If there's another page of  data from the response, set up the next request to get it
        if (response.body.next) {
          if (!result) {
            result = [];
          }
          const nextUrl = new URL(response.body.next);
          start = nextUrl.searchParams.get('start');
          console.log({ limit});
          
          limit = limit > count?  limit - count: nextUrl.searchParams.get('limit');

          requestOptions = {
            query: {
              ...requestOptions.query,
              start,
              limit,
            },
          };
console.log('are we here');

          result.push(...nextState.data.results);
        } else {
          if (result) {
            result.push(...nextState.data.results);
          } else {
            result = nextState.data;
          }
          // Exit loop then no more data is available
          break;
        }
      } while (allowPagination && count < limit);
      console.log({count, limit});
      
      console.log('✓', result.length, 'forms fetched.');
      return {
        ...nextState,
        data: result,
      };
    } catch (e) {
      if (e.statusCode === 404) {
        e.body = { error: `Asset resource submission with ${formId} not found` };
      }
      throw e;
    }
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
