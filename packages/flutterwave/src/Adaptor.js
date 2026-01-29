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

    const response = await util.request(
      state.configuration,
      'POST',
      '/payments',
      {
        body: JSON.stringify(resolvedPaymentData), // Serialize the body
      }
    );

    return util.prepareNextState(state, response);
  };
}
