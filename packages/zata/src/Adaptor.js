import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

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
 * Make a GET request to the Zata API
 * @example <caption>Get all product types</caption>
 * get('data/product-type')
 * @example <caption>Test Zata API connectivity</caption>
 * get('test')
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Additional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, options){
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(state, path, options);

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  }
}

/**
 * Make a POST request to the Zata API
 * @example <caption> Create a sale transaction</caption>
 * post('transaction/sale', {
 *  body: {
 *     "purchaseCode": "43034",
 *     "paymentMethodID": 1,
 *     "customerID": 1,
 *     "transactionDate": "2024-01-01",
 *     "note": "string",
 *     "customerTIN": "123456789",
 *     "customerName": "John Doe",
 *     "customerPhone": "123456789",
 *     "items": [
 *       {
 *         "productID": 1,
 *         "units": 12.5,
 *         "unitPrice": 1000,
 *         "discountRate": 100,
 *         "batchNumber": "string"
 *       }
 *     ]
 *    },
 *  header: {
 *    companyId: 1,
 *    branchId: 1
 *  }
 *})
 * @example <caption>Create a company </caption>
 * post('company', {
 *  body: {
 *    name: "Zata Point Global Service",
 *    address: "No 1, Zata Point Street, Zata Point",
 *    phone: "08012345678",
 *    email: "sample@sample.com",
 *    tin: "123456789"
 *  }
 * })
 * @function
 * @public
 * @param {string} path 
 * @param {RequestOptions} options 
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, options){
  return async state => {
    const [resolvedPath, resolvedBody, resolvedOptions] = expandReferences(state, path, options);

    const response = await util.request(
      state.configuration,
      'POST',
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
  }
}

/**
 * Make a PUT request to the Zata API
 * @example <caption>Reduce product quantity</caption>
 * put('product/reduce-quantity/{productId}', {
 *  body: {
 *    quantity: 10,
 *    description: 'reason for reducing quantity',
 *    batchNumber: 'Batch Number'
 *  },
 *  header: {
 *    companyId: 1,
 *    branchId: 1
 *  }
 * })
 * @function
 * @public
 * @param {string} path 
 * @param {RequestOptions} options 
 * @returns {Operation}
 * @state {HttpState}
 */
export function put(path, options) {
  return async state => {
    const [resolvedPath, resolvedBody, resolvedOptions] = expandReferences(state, path, options);

    const response = await util.request(
      state.configuration,
      'PUT',
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
  }
}

/**
 * Make a general HTTP request
 * @example <caption>Create a new sale transaction</caption>
 * request("POST", "transaction/sale",
 *  {
 *      body: {
 *          "purchaseCode": "43034",
 *          "paymentMethodID": 1,
 *          "customerID": 1,
 *          "transactionDate": "2024-01-01",
 *          "note": "string",
 *          "customerTIN": "123456789",
 *          "customerName": "John Doe",
 *          "customerPhone": "12345678910",
 *          "items": [
 *              {
 *                  "productID": 1,
 *                  "units": 12.5,
 *                  "unitPrice": 1000,
 *                  "discountRate": 100,
 *                  "batchNumber": "string"
 *              }
 *          ]
 *      },
 *      headers: {
 *          companyId: 1,
 *          branchId: 1
 *      }
 *  });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Additional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions] =
      expandReferences(state, method, path, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

export {
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
