/**
 * INVARIANT: Must export function named `request`
 * - ALL operational functions go here
 *
 * Docs: ./wiki/build-a-new-adaptor.md, ./wiki/best-practice.md
 * API: Inji Verify POST /v2/vc-verification (context path /v1/verify)
 */
import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object after an Inji Verify HTTP call
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options for verifyCredential
 * @typedef {Object} VerifyCredentialOptions
 * @public
 * @property {boolean} [skipStatusChecks=false] - Skip credential status (e.g. revocation) checks
 * @property {string[]} [statusCheckFilters=[]] - Status check purposes to run (e.g. `['revocation']`)
 * @property {boolean} [includeClaims=false] - Include extracted claims when schema/signature is valid
 */

/**
 * Options provided to a general HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request
 * @property {object} errors - Map of errorCodes -> error messages
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} headers - An object of headers to append to the request
 * @property {string} parseAs - Parse the response body as json, text or stream
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds
 */

/**
 * Verify a Verifiable Credential with Inji Verify (V2).
 *
 * Posts to `{baseUrl}/v2/vc-verification`. Configure `baseUrl` with the
 * service context path, e.g. `https://verify.example.org/v1/verify`.
 *
 * @example <caption>Verify a credential from state</caption>
 * verifyCredential($.data, {
 *   skipStatusChecks: false,
 *   statusCheckFilters: ['revocation'],
 *   includeClaims: false,
 * });
 * @function
 * @public
 * @param {object|string} credential - JSON-LD object, SD-JWT string, or CWT hex string
 * @param {VerifyCredentialOptions} [options={}] - Verification options
 * @returns {Operation}
 * @state {HttpState}
 */
export function verifyCredential(credential, options = {}) {
  return async state => {
    const [resolvedCredential, resolvedOptions] = expandReferences(
      state,
      credential,
      options
    );

    const {
      skipStatusChecks = false,
      statusCheckFilters = [],
      includeClaims = false,
    } = resolvedOptions;

    const body = {
      verifiableCredential: util.toVerifiableCredential(resolvedCredential),
      skipStatusChecks,
      statusCheckFilters,
      includeClaims,
    };

    const response = await util.request(
      state.configuration,
      'POST',
      'v2/vc-verification',
      { body }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a general HTTP request to Inji Verify.
 * Prefer {@link verifyCredential} for VC verification.
 * @example
 * request('POST', 'v2/vc-verification', {
 *   verifiableCredential: JSON.stringify($.data),
 *   skipStatusChecks: false,
 *   statusCheckFilters: ['revocation'],
 *   includeClaims: false,
 * });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path relative to configuration.baseUrl
 * @param {object} body - Object attached to the request body
 * @param {RequestOptions} [options={}] - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedOptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
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
