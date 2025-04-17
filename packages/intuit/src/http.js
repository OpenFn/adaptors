import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} IntuitState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the Quickbook(intuit) server (excluding the body)
 * @property references - An array of all previous data objects used in the Job
 * @private
 */

/**
 * Options object
 * @typedef {Object} IntuitOptions
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} headers - An object of all request headers
 * @property {string} [parseAs='json'] - The response format to parse (e.g., 'json', 'text', or 'stream')
 */

/**
 * Make a GET request to any intuit endpoint
 * @example <caption>Get intuit user company information.</caption>
 * http.get("/v3/company/9341453908059456/companyinfo/9341453908059456");
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {IntuitOptions}  [options={}] - An object containing query and headers for the request
 * @state {IntuitState}
 * @returns {Operation}
 */
export function get(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions = {}] = expandReferences(
      state,
      path,
      options
    );
    const response = await util.request(
      state,
      'GET',
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a POST request to any Intuit endpoint
 * @example <caption>Create an account on intuit.</caption>
 * http.post("/v3/company/9341453908059456/account",
 *  {
 *       "Name": "MyJobs_testing",
 *       "AccountType": "Accounts Receivable"
 *  },
 *  {
 *  query: {
 *    minorversion: 40,
 *   },
 * })
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} data - The request body (as JSON)
 * @param {IntuitOptions} [options={}] - An object containing query, and headers for the request
 * @state {IntuitState}
 * @returns {Operation}
 */
export function post(path, data, options = {}) {
  return async state => {
    const [resolvedPath, resolvedBody, resolvedOptions = {}] = expandReferences(
      state,
      path,
      data,
      options
    );
    const response = await util.request(state, 'POST', resolvedPath, {
      ...resolvedOptions,
      body: resolvedBody,
    });

    return util.prepareNextState(state, response);
  };
}
