import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} HttpState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the Pesapal server, including headers, statusCode, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the Pesapal request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string.
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 */

/**
 * Make a GET request to Pesapal
 * @example <caption>Get all registered IPN URLs for a merchant</caption>
 * get('URLSetup/GetIpnList')
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, options) {
  return request('GET', path, null, options);
}

/**
 * Make a POST request to Pesapal
 * @example <caption>Send an order request </caption>
 * post("Transactions/SubmitOrderRequest", {
 *   id: "TEST-05",
 *   currency: "KES",
 *   amount: "1",
 *   description: "Testing",
 *   callback_url: "https://www.myapplication.com/response-page",
 *   notification_id: "fe078e53-78da-4a83-aa89-e7ded5c456e6",
 *   billing_address: {
 *     email_address: "john.doe@example.com",
 *     phone_number: "0712xxxxxx",
 *     country_code: "",
 *     first_name: "Doe",
 *     middle_name: "",
 *     last_name: "John",
 *     line_1: "",
 *     line_2: "",
 *     city: "",
 *     state: "",
 *     postal_code: "",
 *     zip_code: "",
 *   },
 * });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, body, options) {
  return request('POST', path, body, options);
}

/**
 * Make a general HTTP request to Pesapal
 * @example <caption>Register IPN URL</caption>
 * request("POST", "URLSetup/RegisterIPN", {
 *   "url": "https://www.myapplication.com/ipn",
 *   "ipn_notification_type": "GET"
 *  });
 * @example <caption>Get transaction status</caption>
 * request('GET', 'GetTransactionStatus', {}, {query:{
 *   orderTrackingId: '123456'
 * }})
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
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
  as
} from '@openfn/language-common';
