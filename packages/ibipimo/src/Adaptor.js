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
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} form - Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 * @property {object} tls - TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
 */

/**
 * Make a general HTTP request
 * @example
 * request("POST", "/api/v1/ask-for-vl-results", { siteid: "77889900", sample_uids: ["2026010401"]});
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource (include /api/v1/ if needed)
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions] = expandReferences(
      state,
      method,
      path,
      options
    );

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a POST request
 * @example
 * post("/api/v1/ask-for-vl-results", { siteid: "77889900", sample_uids: ["2026010401"]});
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Body data
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 */
export function post(path, body, options = {}) {
  return request('POST', path, { ...options, body });
}

/**
 * Make a GET request
 * @example
 * get("/api/v1/samples/status");
 * @example
 * get("/api/v1/sites", { query: { active: true } });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options (query params, headers, etc.)
 * @returns {Operation}
 */
export function get(path, options = {}) {
  return request('GET', path, options);
}

/**
 * Post viral load test requests to IBIPIMO
 * @example
 * postViralLoadRequest({
 *   siteid: "77889900",
 *   samples: [{
 *     sidainfo_uid: "147460",
 *     p_code: "000003",
 *     p_name: "Magara",
 *     p_prename: "Mahire",
 *     p_sex: "M",
 *     p_dob: "1950-01-15",
 *     // ... other required fields
 *   }]
 * });
 * @function
 * @public
 * @param {object} data - Object containing siteid and samples array
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function postViralLoadRequest(data, options = {}) {
  return post('/api/v1/post-viral-load-requests', data, options);
}

/**
 * Get viral load test results from IBIPIMO
 * @example
 * getViralLoadResults({
 *   siteid: "77889900",
 *   sample_uids: ["2026010401", "IBI-2024-000001"]
 * });
 * @function
 * @public
 * @param {object} data - Object containing siteid and sample_uids array
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function getViralLoadResults(data, options = {}) {
  return post('/api/v1/ask-for-vl-results', data, options);
}

/**
 * Process IBIPIMO viral load results response
 * Extracts and structures data from IBIPIMO's complex response format into a simplified,
 * consistent format for easier handling in workflows.
 * @example
 * // After getting results from IBIPIMO
 * getViralLoadResults({
 *   siteid: "77889900",
 *   sample_uids: ["634R", "634W"]
 * });
 *
 * // Process the response
 * processViralLoadResults((state, processResults) => {
 *   const processed = processResults(state.data);
 *
 *   console.log(`Found ${processed.totalFound}/${processed.totalRequested} results`);
 *   console.log(`${processed.totalPending} samples still pending`);
 *
 *   // Use processed data for SIDAInfo integration
 *   return {
 *     ...state,
 *     readyForSidaInfo: processed.availableResults,
 *     pendingSamples: processed.pendingSamples
 *   };
 * });
 * @function
 * @public
 * @param {function} processor - Function that receives (state, processResults) where processResults
 *                              transforms IBIPIMO response into structured format
 * @returns {Operation}
 * @state {HttpState}
 * @description The processResults function returns an object with:
 * - totalRequested: Number of samples requested
 * - totalFound: Number of results available
 * - totalPending: Number of samples without published results
 * - availableResults: Array of sample results ready for processing
 * - pendingSamples: Array of sample UIDs still being processed
 * - sampleStatuses: Object with detailed status info per sample
 * - notFoundSamples: Array of sample UIDs not found in system
 */
export function processViralLoadResults(processor) {
  return state => {
    const processResults = ibipimResponse => {
      return {
        totalRequested: ibipimResponse.total_requested || 0,
        totalFound: ibipimResponse.total_found || 0,
        totalPending: ibipimResponse.total_without_published_result || 0,
        availableResults: ibipimResponse.results || [],
        pendingSamples: ibipimResponse.no_results || [],
        sampleStatuses: ibipimResponse.sample_statuses || {},
        notFoundSamples: ibipimResponse.not_found_sample_uids || [],
      };
    };
    return processor(state, processResults);
  };
}

/**
 * Process IBIPIMO viral load submission response
 * Handles the response from postViralLoadRequest to extract success/error information
 * and provide structured feedback on the submission operation.
 * @example
 * postViralLoadRequest({
 *   siteid: "77889900",
 *   samples: [{ sidainfo_uid: "147460", p_name: "Test" }]
 * });
 *
 * processViralLoadSubmission((state, processSubmission) => {
 *   const result = processSubmission(state.data);
 *   if (result.hasErrors) {
 *     return { ...state, submissionFailed: true, errors: result.errors };
 *   }
 *   return { ...state, newSampleIds: result.sampleIds };
 * });
 * @function
 * @public
 * @param {function} processor - Function that receives (state, processSubmission) where processSubmission transforms IBIPIMO submission response
 * @returns {Operation}
 * @state {HttpState}
 * @description The processSubmission function returns: savedSamples, savedCount, errors, errorCount, hasErrors, sampleIds
 */
export function processViralLoadSubmission(processor) {
  return state => {
    const processSubmission = ibipimResponse => {
      return {
        savedSamples: ibipimResponse.saved_viral_load_samples || [],
        savedCount: ibipimResponse.saved_viral_load_samples?.length || 0,
        errors: ibipimResponse.errors || [],
        errorCount: ibipimResponse.errors?.length || 0,
        hasErrors: (ibipimResponse.errors?.length || 0) > 0,
        sampleIds: (ibipimResponse.saved_viral_load_samples || []).map(
          s => s.s_uid
        ),
      };
    };
    return processor(state, processSubmission);
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
