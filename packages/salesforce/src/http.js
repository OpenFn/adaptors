import { salesforceRequest } from './Adaptor';

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
  return salesforceRequest(path, options);
}

/**
 * Send a POST request to salesforce server configured in `state.configuration`.
 * @public
 * @example <caption>POST request to Salesforce</caption>
 * http.post("/jobs/query", {
 *   operation: "query",
 *   query: "SELECT Id, Name FROM Account LIMIT 1000",
 * });
 * @function
 * @param {string} path - The Salesforce API endpoint.
 * @param {object} body - A JSON Object request body.
 * @param {SimpleRequestOptions} [options] - Configure headers and query parameters for the request.
 * @state {SalesforceState}
 * @returns {Operation}
 */
export function post(path, body, options) {
  return salesforceRequest(path, { json: body, method: 'POST', ...options });
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
  return salesforceRequest(path, options);
}
