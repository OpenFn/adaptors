import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} OpenCRVSHTTPState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 */

/**
 * Make a POST request
 * @example
 * http.post("/location", {
  "statisticalID": "TEST_LOCATION",
  "name": "My name",
  "alias": "My alias",
  "partOf": "Location/0",
  "code": "ADMIN_STRUCTURE",
  "jurisdictionType": "STATE",
  "statistics": [
    {
      "year": 0,
      "male_population": 0,
      "female_population": 0,
      "population": 0,
      "crude_birth_rate": 0
    }
  ]
});
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OpenCRVSHTTPState}
 */
export function post(path, body, options) {
  return request('POST', path, body, options);
}

/**
   * Make a general HTTP request
   * @example <caption>Create a new administrative location</caption>
   * http.request("POST", "/location", {
    "statisticalID": "TEST_LOCATION",
    "name": "My name",
    "alias": "My alias",
    "partOf": "Location/0",
    "code": "ADMIN_STRUCTURE",
    "jurisdictionType": "STATE",
    "statistics": [
      {
        "year": 0,
        "male_population": 0,
        "female_population": 0,
        "population": 0,
        "crude_birth_rate": 0
      }
    ]
  });
   * @function
   * @public
   * @param {string} method - HTTP method to use
   * @param {string} path - Path to resource
   * @param {object} body - Object which will be attached to the POST body
   * @param {RequestOptions} options - Optional request options
   * @returns {Operation}
   * @state {OpenCRVSHTTPState}
   */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedoptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedoptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}
