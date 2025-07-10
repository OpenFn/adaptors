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
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} form - Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 * @property {object} tls - TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
 */


/**
 * Make a HTTP request to the [MTN MoMo API ](https://momodeveloper.mtn.com/API-collections#api=collection&operation=bc-authorize)
 * @example <caption>Get basic user information</caption>
 * request("GET", "/collection/v1_0/accountholder/MSISDN/46733123451/basicuserinfo", {}, { headers: { "X-Target-Environment": "sandbox" } });
 * @example <caption>Create an invoice</caption>
 * request("POST", "/collection/v2_0/invoice", 
 *  {
 *    "externalId": "996b82e6-d498-4c7c-87ee-7b0654350a2c",
 *    "amount": "100",
 *    "currency": "EUR",
 *    "validityDuration": "3600",
 *    "intendedPayer": {
 *      "partyIdType": "MSISDN",
 *      "partyId": "46733123450"
 *    },
 *    "payee": {
 *      "partyIdType": "MSISDN",
 *      "partyId": "46733123452"
 *    }
 *   "description": ""
 *  },
 *  {
 *    "headers": {
 *      "X-Target-Environment": "sandbox",
 *      "X-Reference-Id": "ceb46c4f-1523-405b-9d16-dd9ad45e202c"
*      }
 * });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the HTTP request body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedoptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state,
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
  merge,
  scrubEmojis,
  sourceValue,
  util,
  as
} from '@openfn/language-common';
