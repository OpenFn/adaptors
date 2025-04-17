import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 */

/**
 * Make a GET request
 * @example <caption>Get products</caption>
 * get("products", { query: { max: 10 }});
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, options) {
  return async state => {
    const response = await util.request(state, 'GET', path, options);
    return util.prepareNextState(state, response);
  }
}

/**
 * Make a POST request
 * @example
  post("products", 
   {
      "id": "ff80818163e2de8d0163eba1b1e90002",
      "productCode": null,
      "name": "New product",
      "category": {
          "id": "ff80818163e2de8d0163eb93c5a00001",
          "name": "New category"
        },
      "description": null,
      "dateCreated": "2018-06-10T21:37:12Z",
      "lastUpdated": "2018-06-10T21:37:12Z"
  });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, body, options) {
  return async state => {
    const response = await util.request(state, 'POST', path, { ...options, body });
    return util.prepareNextState(state, response);
  }
}

/**
 * Make a general HTTP request
 * @example <caption>Update stock movement</caption>
 * request("POST", "/stockMovements/ff808181642fc9c101642fcccc420004", 
 *  {
     body: {
        "name": "new stock movement",
        "description": "new stock movement",
        "origin.id": "1",
        "destination.id": "2",
        "requestedBy.id": "1",
        "dateRequested": "06/23/2018"
      }
  });
  @example <caption>Update a product</caption>
 * request('POST', '/products/ff808181812576850182aee36930040b', { body: { name: 'Coffee', description: 'Arabica coffee from the highlands of Ethiopia' } });
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
    const [resolvedMethod, resolvedPath, resolvedoptions] = expandReferences(state, method, path, options);

    const response = await util.request(
      state,
      resolvedMethod,
      resolvedPath,
      resolvedoptions,

    );

    return util.prepareNextState(state, response);
  };
}

export {
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
