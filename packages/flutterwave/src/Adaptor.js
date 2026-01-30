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
 * Initiate a payment request to the Flutterwave API.
 * @function
 * @public
 * @param {Object} paymentData - The payment details to send to Flutterwave.
 * @returns {Function} - A function that takes the state and performs the operation.
 */
export function initiatePayment(paymentData) {
  return async state => {
    const resolvedPaymentData = expandReferences(state, paymentData);
    const body = Array.isArray(resolvedPaymentData)
      ? resolvedPaymentData[0]
      : resolvedPaymentData;

    const response = await util.request(
      state.configuration,
      'POST',
      '/charges',
      {
        body: JSON.stringify(body), // Serialize the body
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Create a new customer in Flutterwave.
 * @function
 * @public
 * @param {Object} customerData - The customer details (email, name, phone, etc.).
 * @returns {Function} - A function that takes the state and performs the operation.
 */
export function createCustomer(customerData) {
  return async state => {
    const resolvedData = expandReferences(state, customerData);
    const body = Array.isArray(resolvedData) ? resolvedData[0] : resolvedData;

    const response = await util.request(
      state.configuration,
      'POST',
      '/customers',
      {
        body: JSON.stringify(body),
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * List all customers or search.
 * @function
 * @public
 * @param {Object} query - Query parameters (from, to, page, etc.).
 * @returns {Function} - A function that takes the state and performs the operation.
 */
export function listCustomers(queryParams) {
  return async state => {
    const resolvedParams = expandReferences(state, queryParams);
    const query = Array.isArray(resolvedParams) ? resolvedParams[0] : resolvedParams;

    const response = await util.request(
        state.configuration,
        'GET',
        '/customers',
        {
          query: query,
        }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Get a single customer by ID.
 * @function
 * @public
 * @param {string|number} id - The customer's ID or email.
 * @returns {Function} - A function that takes the state and performs the operation.
 */
export function getCustomer(id) {
  return async state => {
    const resolvedId = expandReferences(state, id);

    const response = await util.request(
        state.configuration,
        'GET',
        `/customers/${resolvedId}`
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Update a customer's details.
 * @function
 * @public
 * @param {string|number} id - The customer's ID.
 * @param {Object} data - The data to update.
 * @returns {Function} - A function that takes the state and performs the operation.
 */
export function updateCustomer(id, data) {
  return async state => {
    const resolvedId = expandReferences(state, id);
    const resolvedData = expandReferences(state, data);
    const body = Array.isArray(resolvedData) ? resolvedData[0] : resolvedData;

    const response = await util.request(
        state.configuration,
        'PUT',
        `/customers/${resolvedId}`,
        {
          body: JSON.stringify(body),
        }
    );

    return util.prepareNextState(state, response);
  };
}
