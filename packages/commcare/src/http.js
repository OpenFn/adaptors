import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} CommCareState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the CommCare server (excluding the body)
 * @property references - An array of all previous data objects used in the Job
 * @private
 */

/**
 * Make a POST request to CommCare. Use this to send resources directly to Commcare REST API.
 * You can pass CommCare body data as a JSON object.
 * @example <caption>Post to the V2 case API with JSON data (prefixed with /a/[domain]/api/)</caption>
 * http.post('case/v2', {
 *   case_type: 'patient',
 *   case_name: 'Elizabeth Harmon',
 *   owner_id: '20cc9dda-b90a-4af3-aa3d-fc67184e73ef',
 *   properties: { dob: '1948-11-02' },
 * });
 * @function
 * @public
 * @param {string} path - Path to resource. Relative paths are prefixed with `/a/[domain]/api/`; paths starting with `/` are used as-is.
 * @param {object} data - Object or JSON to create a resource
 * @param {Object} [params] - Optional request params
 * @returns {Operation}
 * @state {CommCareState}
 */
export function post(path, data, params = {}) {
  return request('POST', path, data, params);
}

/**
 * Make a GET request to CommCare. Use this to retrieve resources directly from the CommCare REST API.
 * @example <caption>Get cases using the v1 API (prefixed with /a/[domain]/api/)</caption>
 * http.get('case/v1');
 * @example <caption>Filter cases by type using query parameters</caption>
 * http.get('case/v1', { case_type: 'patient', limit: 100 });
 * @example <caption>Paginate all results into state.data</caption>
 * http.get('case/v2', { paginate: true });
 * @example <caption>Stream each page to a callback without accumulating in memory</caption>
 * http.get('case/v2', { paginate: true }, state => {
 *   console.log(state.data); // one page at a time
 *   return state;
 * });
 * @function
 * @public
 * @param {string} path - Path to resource. Relative paths are prefixed with `/a/[domain]/api/`; paths starting with `/` are used as-is.
 * @param {Object} [params] - Query parameters to append to the URL. All keys except `params.paginate` are sent as query strings (e.g. `{ case_type: 'patient' }` becomes `?case_type=patient`). Set `params.paginate` to `true` to enable automatic pagination.
 * @param {Function} [callback] - Optional per-page callback. When provided alongside `params.paginate`, each page's records are passed as `state.data` and the full dataset is NOT accumulated. `state.data` will be `{}` when the operation completes.
 * @returns {Operation}
 * @state {CommCareState}
 */
export function get(path, params = {}, callback) {
  return async state => {
    const { domain } = state.configuration;
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params,
    );

    const { paginate, ...requestParams } = resolvedParams;

    // Return response data to callback if provided
    const callbackMode = typeof callback === 'function';

    const url = util.buildUrl(resolvedPath, domain);

    try {
      let currentParams = { ...requestParams };
      let results = null;
      let nextState = state;

      do {
        const response = await util.request(state.configuration, url, {
          method: 'GET',
          params: currentParams,
          contentType: 'application/json',
        });

        const body = response.body;
        // Only return response array data
        const items = Object.values(body).find(Array.isArray) ?? [];

        if (callbackMode) {

          const pageState = util.prepareNextState(state, response);
          nextState = await callback({ ...pageState, data: items });
        } else {
          nextState = util.prepareNextState(state, response);
          if (!results) results = [];
          results.push(...items);
        }

        // cursor API (body.next) takes precedence over paging API (body.meta.next)
        const next = body?.next ?? body?.meta?.next;
        const hasMore = paginate === true && next;

        if (hasMore) {
          if (body?.next) {
            const cursor = new URL(body.next).searchParams.get('cursor');
            currentParams = { ...requestParams, cursor };
          } else {
            currentParams = {
              ...requestParams,
              offset: body.meta.offset + body.meta.limit,
              limit: body.meta.limit,
            };
          }
        } else {
          break;
        }
      } while (true);

      return {
        ...nextState,
        data: callbackMode ? {} : results ?? nextState.data,
      };
    } catch (error) {
      throw error;
    }
  };
}

/**
 * Make a general HTTP request against the CommCare server. Use this to make any request to CommCare REST API.
 * @example <caption>Get cases using the v1 API (prefixed with /a/[domain]/api/)</caption>
 * http.request('GET', 'case/v1');
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the body
 * @param {object} params - An object of query parameters to be encoded into the URL
 * @returns {Operation}
 * @state {CommCareState}
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
