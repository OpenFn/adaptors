import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Query option for the `list` helper function
 * @typedef {Object} ListQueryOptions
 * @property {Number} pageNo - The page number. Please note that Monnify pagination starts at 0 not 1. (Default: 0)
 * @property {Number} pageSize - The page size. (Default: 100)
 * @property {Record<string, any>} [otherOptions] - Additional options.
 **/


/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} query - An object of query parameters to be encoded into the URL.
 */


/**
 * Make a GET request
 * @example <caption>Get all transactions</caption>
 * get('/api/v1/transactions/search');
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedoptions] =
      expandReferences(state, path, options);

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedPath,
      resolvedoptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Fetch a list of items.
 * @example <caption>Get all transactions</caption>
 * list('/api/v2/disbursements/search-transactions', {
 *   query: {
 *     sourceAccountNumber: 4864192954,
 *   }
 * });
 * 
 * @example <caption>Get all transactions for a specific page and page number.</caption>
 * list('/api/v2/disbursements/search-transactions', {
 *   query: {
 *     sourceAccountNumber: 4864192954,
 *     pageNo: 0,
 *     pageSize: 10
 *   }
 * });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {ListQueryOptions} query - Query options.
 * @returns {Operation}
 * @state {HttpState}
 */
export function list(path, query = {}) {
  return async state => {
    const [resolvedPath, resolvedQuery] =
      expandReferences(state, path, query);

    const response = await util.requestWithPagination(
      state.configuration,
      'GET',
      resolvedPath,
      {
        query: resolvedQuery
      },

    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a POST request
 * @example <caption>Resend all failed notifications over a time period</caption>
 * post("/api/v1/transaction-notification/resend-failed-notifications", {
    "startDate": "2021-01-16T13:56:39.492",
    "endDate": "2021-10-16T13:56:39.492"
});
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(state, path, options);

    const response = await util.request(
      state.configuration,
      'POST',
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  }
}

/**
 * Make a generic request
 * @example <caption>Get disbursements from a wallet</caption>
 * request(
 *  'GET', 
 *  '/api/v2/disbursements/search-transactions', 
 *  {}, 
 *  {
 *    query: {
 *      sourceAccountNumber: 4864192954,
 *      pageNo: 0,
 *      pageSize: 10
 *      }
 *   }
 * );
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedoptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedoptions,
    );

    return util.prepareNextState(state, response);
  };
}

export {
  as,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';
