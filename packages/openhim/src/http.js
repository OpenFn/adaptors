import * as util from './Util';
import { expandReferences } from '@openfn/language-common/util';

/**
 * State object
 * @typedef {Object} OpenHIMHttpState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the OpenHIM server, including headers, statusCode, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the OpenHIM request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string.
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - The format to parse the response body as. Defaults to `json`. Accepted values: `json`, `stream`, and `text`.
 */

/**
 * Make a GET request to OpenHIM
 * @example <caption>Get all transactions</caption>
 * http.get('/transactions')
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OpenHIMHttpState}
 */
export function get(path, options) {
  return request('GET', path, null, options);
}

/**
 * Make a POST request to OpenHIM
 * @example <caption>Create a client </caption>
 * http.post(
  '/clients',
  {
    roles: ['fhir'],
    clientID: 'fhir-server-5',
    name: 'FHIR Server',
    passwordAlgorithm: 'sha512',
    passwordSalt: '3e74a280c568f27241e48e938edf21bf',
    passwordHash:
      '9a5158dc87a25da9d8822d48ed831a88bb4ba7fa636ddb6d6a725f73688546052cb7f2c355758e4839f9416e6cc0e37e1e3070f597af2836d39768a5ecc050db',
  },
  {
    parseAs: 'text',
  }
);
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OpenHIMHttpState}
 */
export function post(path, body, options) {
  return request('POST', path, body, options);
}

/**
 * Make a PUT request to OpenHIM
 * @example <caption>Update an existing client</caption>
 * http.put(
  '/clients/686fb79470b851d7a21dad76',
  {
    _id: '686fb79470b851d7a21dad76',
    roles: ['fhir', 'testing'],
    clientID: 'fhir-server-5',
    name: 'FHIR Server',
    passwordAlgorithm: 'sha512',
    passwordSalt: '3e74a280c568f27241e48e938edf21bf',
    passwordHash:
      '9a5158dc87a25da9d8822d48ed831a88bb4ba7fa636ddb6d6a725f73688546052cb7f2c355758e4839f9416e6cc0e37e1e3070f597af2836d39768a5ecc050db',
  },
  {
    parseAs: 'text',
  }
);
 * @function
 * @public
 * @param {string} path - Path to resource with the id of the resource to update
 * @param {object} body - Object which will be attached to the PUT body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OpenHIMHttpState}
 */
export function put(path, body, options) {
  return request('PUT', path, body, options);
}

/**
 * Make a DELETE request to OpenHIM
 * @example <caption>Delete an existing client</caption>
 * http.delete('/clients/686fb65870b851d7a21d9ca0', {
  parseAs: 'text',
});
 * @function
 * @alias delete
 * @public
 * @param {string} path - Path to resource with the id of the resource to delete
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OpenHIMHttpState}
 */
export function _delete(path, options) {
  return request('DELETE', path, null, options);
}

/**
 * Make a general HTTP request to OpenHIM
 * @example <caption>Create a client</caption>
 * http.request(
  'POST',
  '/clients',
  {
    roles: ['fhir'],
    clientID: 'fhir-server-2',
    name: 'FHIR Server',
    passwordAlgorithm: 'sha512',
    passwordSalt: '3e74a280c568f27241e48e938edf21bf',
    passwordHash:
      '9a5158dc87a25da9d8822d48ed831a88bb4ba7fa636ddb6d6a725f73688546052cb7f2c355758e4839f9416e6cc0e37e1e3070f597af2836d39768a5ecc050db',
  },
  {
    parseAs: 'text',
  }
);
 * @example <caption>Get all transactions</caption>
 * http.request('GET','/transactions')
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OpenHIMHttpState}
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
