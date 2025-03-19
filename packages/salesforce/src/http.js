import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import * as util from './util';

/**
 * @typedef {Object} SimpleRequestOptions
 * @public
 * @property {object} headers - Object of request headers.
 * @property {object} query - Object of request query.
 * */

/**
 * Options provided to the Salesforce HTTP request
 * @typedef {Object} FullRequestOptions
 * @public
 * @property {string} [method=GET] - HTTP method to use.
 * @property {object} headers - Object of request headers.
 * @property {object} query - Object request query.
 * @property {object} json - Object request body.
 * @property {string} body - A string request body.
 */

/**
 * Send a GET request on salesforce server configured in `state.configuration`.
 * @public
 * @example <caption>Make a GET request to a custom Salesforce flow</caption>
 * http.get('/actions/custom/flow/POC_OpenFN_Test_Flow');
 * @example <caption>Make a GET request to a custom Salesforce flow with query parameters</caption>
 * http.get('/actions/custom/flow/POC_OpenFN_Test_Flow', { query: { Status: 'Active' } });
 * @example <caption>Make a GET request then map the response</caption>
 * http.get("/jobs/query/v1/jobs/001XXXXXXXXXXXXXXX/results").then((state) => {
 *   state.mapping = state.data.map((d) => ({ name: d.name, id: d.extId }));
 *   return state;
 * });
 * @function
 * @param {string} path - The Salesforce API endpoint.
 * @param {SimpleRequestOptions} [options] - Configure headers and query parameters for the request.
 * @state {SalesforceState}
 * @returns {Operation}
 */
export function get(path, options) {
  return async state => {
    const { connection } = state;
    const [resolvedPath, resolvedOptions = {}] = expandReferences(
      state,
      path,
      options
    );
    console.log(`GET: ${resolvedPath}`);
    const { query, ...otherOptions } = resolvedOptions;
    const url = query
      ? `${resolvedPath}?${util.buildQuery(query)}`
      : resolvedPath;

    const result = await connection.requestGet(url, otherOptions);

    return composeNextState(state, result);
  };
}

/**
 * Send a POST request to salesforce server configured in `state.configuration`.
 * @public
 * @example <caption>Make a POST request to a custom Salesforce flow</caption>
 * http.post("/actions/custom/flow/POC_OpenFN_Test_Flow", {
 *   body: {
 *     inputs: [
 *       {
 *         CommentCount: 6,
 *         FeedItemId: "0D5D0000000cfMY",
 *       },
 *     ],
 *   },
 * });
 * @function
 * @param {string} path - The Salesforce API endpoint.
 * @param {object} data - A JSON Object request body.
 * @param {SimpleRequestOptions} [options] - Configure headers and query parameters for the request.
 * @state {SalesforceState}
 * @returns {Operation}
 */
export function post(path, data, options) {
  return async state => {
    const { connection } = state;
    const [resolvedPath, resolvedData, resolvedOptions = {}] = expandReferences(
      state,
      path,
      data,
      options
    );
    const { query, ...otherOptions } = resolvedOptions;
    const url = query
      ? `${resolvedPath}?${util.buildQuery(query)}`
      : resolvedPath;

    console.log(`POST: ${resolvedPath}`);

    const result = await connection.requestPost(
      url,
      resolvedData,
      otherOptions
    );

    return composeNextState(state, result);
  };
}

/**
 * Send a request to salesforce server configured in `state.configuration`.
 * @public
 * @example <caption>Make a POST request to a custom Salesforce flow</caption>
 * http.request("/actions/custom/flow/POC_OpenFN_Test_Flow", {
 *   method: "POST",
 *   json: { inputs: [{}] },
 * });
 * @function
 * @param {string} path - The Salesforce API endpoint.
 * @param {FullRequestOptions} [options] - Configure headers, query and body parameters for the request.
 * @state {SalesforceState}
 * @returns {Operation}
 */
export function request(path, options) {
  return async state => {
    const { connection } = state;
    const [resolvedPath, resolvedOptions = {}] = expandReferences(
      state,
      path,
      options
    );
    const { method = 'GET', json, body, headers, query } = resolvedOptions;
    console.log(`${method}: ${resolvedPath}`);

    const url = query
      ? `${resolvedPath}?${util.buildQuery(query)}`
      : resolvedPath;

    const requestOptions = {
      url,
      method,
      headers: json
        ? { 'content-type': 'application/json', ...headers }
        : headers,
      body: json ? JSON.stringify(json) : body,
    };

    const result = await connection.request(requestOptions);

    return composeNextState(state, result);
  };
}
