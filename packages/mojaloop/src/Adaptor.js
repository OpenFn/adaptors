import { execute as commonExecute } from '@openfn/language-common';
import { request as sendRequest } from './util.js';

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} body - Body data to append to the request. JSON will be converted to a string.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 */

/**
 * State object
 * @typedef {Object} MojalooState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/

/**
 * Execute a sequence of operations
 * Wraps `language-common/execute`, and prepends initial state for mojaloop.
 * @example
 * execute(
 *   getParties('MSISDN', '123456789'),
 *   initiateTransfer(...)
 * )(state)
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Make a HTTP request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>Make a GET request</caption>
 * request('GET', '/parties/MSISDN/123456789', {
 *   headers: { 'FSPIOP-Source': 'pisp' }
 * });
 * @example <caption>Make a POST request with a body</caption>
 * request('POST', '/consentRequests', {
 *   body: {
 *     consentRequestId: '123',
 *     scopes: [{ accountId: 'acc123', actions: ['ACCOUNTS_TRANSFER'] }]
 *   },
 * });
 * @function
 * @param {string} method - The HTTP method to use.
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} options - Body, Query, Headers and Auth parameters
 * @state {MojalooState}
 * @returns {Operation}
 */
export function request(method, path, options) {
  return sendRequest(method, path, options);
}

/**
 * Make a GET request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>Get parties information</caption>
 * get('/parties/MSISDN/123456789', {
 *   headers: { 'FSPIOP-Source': 'pisp' }
 * });
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} options - Query, Headers and Auth parameters
 * @state {MojalooState}
 * @returns {Operation}
 */
export function get(path, options) {
  return sendRequest('GET', path, options);
}

/**
 * Make a POST request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>Create a consent request</caption>
 * post('/consentRequests', {
 *   consentRequestId: '123',
 *   scopes: [{ accountId: 'acc123', actions: ['ACCOUNTS_TRANSFER'] }]
 * });
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {object} data - Body data to append to the request. JSON will be converted to a string.
 * @param {RequestOptions} options - Query, Headers and Auth parameters
 * @state {MojalooState}
 * @returns {Operation}
 */
export function post(path, data, options) {
  return sendRequest('POST', path, { body: data, ...options });
}

/**
 * Make a PUT request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>Update a consent</caption>
 * put('/consents/123', {
 *   status: 'ACTIVE',
 *   credential: { credentialType: 'FIDO', status: 'ACTIVE' }
 * });
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {object} data - Body data to append to the request. JSON will be converted to a string.
 * @param {RequestOptions} options - Query, Headers and Auth parameters
 * @state {MojalooState}
 * @returns {Operation}
 */
export function put(path, data, options) {
  return sendRequest('PUT', path, { body: data, ...options });
}

/**
 * Make a PATCH request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>Patch a resource from state</caption>
 * patch('/consents/123', { status: 'ACTIVE' });
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {object} data - Body data to append to the request. JSON will be converted to a string.
 * @param {RequestOptions} options - Query, Headers and Auth parameters
 * @state {MojalooState}
 * @returns {Operation}
 */
export function patch(path, data, options) {
  return sendRequest('PATCH', path, { body: data, ...options });
}

/**
 * Make a DELETE request. If `configuration.baseUrl` is set, paths must be relative.
 * @public
 * @example <caption>Delete a resource by ID</caption>
 * del('/consents/123');
 * @function
 * @param {string} path - Path to resource. Can be an absolute URL if baseURL is NOT set on `state.configuration`.
 * @param {RequestOptions} options - Query, Headers and Auth parameters
 * @state {MojalooState}
 * @returns {Operation}
 */
export function del(path, options) {
  return sendRequest('DELETE', path, options);
}

/**
 * Get party information by identifier type and identifier
 * @public
 * @example <caption>Get party by MSISDN</caption>
 * getParties('MSISDN', '123456789', {
 *   headers: { 'FSPIOP-Source': 'pisp' }
 * });
 * @function
 * @param {string} idType - The type of identifier (e.g., 'MSISDN', 'ACCOUNT_ID')
 * @param {string} idValue - The identifier value
 * @param {RequestOptions} options - Additional request options
 * @state {MojalooState}
 * @returns {Operation}
 */
export function getParties(idType, idValue, options) {
  return sendRequest('GET', `/parties/${idType}/${idValue}`, options);
}

/**
 * Create a consent request for account linking
 * @public
 * @example <caption>Create consent request</caption>
 * createConsentRequest({
 *   consentRequestId: '123',
 *   userId: 'user123',
 *   scopes: [
 *     { accountId: 'acc123', actions: ['ACCOUNTS_TRANSFER', 'ACCOUNTS_GET_BALANCE'] }
 *   ],
 *   authChannels: ['WEB', 'OTP'],
 *   callbackUri: 'https://pisp.example.com/callback'
 * });
 * @function
 * @param {object} consentRequest - The consent request data
 * @param {RequestOptions} options - Additional request options
 * @state {MojalooState}
 * @returns {Operation}
 */
export function createConsentRequest(consentRequest, options) {
  return sendRequest('POST', '/consentRequests', {
    body: consentRequest,
    ...options,
  });
}

/**
 * Get consent by ID
 * @public
 * @example <caption>Get consent details</caption>
 * getConsent('consent123', {
 *   headers: { 'FSPIOP-Source': 'pisp' }
 * });
 * @function
 * @param {string} consentId - The consent ID
 * @param {RequestOptions} options - Additional request options
 * @state {MojalooState}
 * @returns {Operation}
 */
export function getConsent(consentId, options) {
  return sendRequest('GET', `/consents/${consentId}`, options);
}

/**
 * Update a consent
 * @public
 * @example <caption>Update consent status</caption>
 * updateConsent('consent123', {
 *   status: 'ACTIVE',
 *   credential: {
 *     credentialType: 'FIDO',
 *     status: 'ACTIVE',
 *     payload: { publicKey: 'key123' }
 *   }
 * });
 * @function
 * @param {string} consentId - The consent ID
 * @param {object} consentData - The consent update data
 * @param {RequestOptions} options - Additional request options
 * @state {MojalooState}
 * @returns {Operation}
 */
export function updateConsent(consentId, consentData, options) {
  return sendRequest('PUT', `/consents/${consentId}`, {
    body: consentData,
    ...options,
  });
}

/**
 * Revoke a consent
 * @public
 * @example <caption>Revoke a consent</caption>
 * revokeConsent('consent123', {
 *   headers: { 'FSPIOP-Source': 'pisp' }
 * });
 * @function
 * @param {string} consentId - The consent ID
 * @param {RequestOptions} options - Additional request options
 * @state {MojalooState}
 * @returns {Operation}
 */
export function revokeConsent(consentId, options) {
  return sendRequest('DELETE', `/consents/${consentId}`, options);
}

/**
 * Create a third party transaction request
 * @public
 * @example <caption>Initiate a transfer</caption>
 * createThirdPartyRequest({
 *   transactionRequestId: 'txn123',
 *   payee: { partyIdInfo: { partyIdType: 'MSISDN', partyIdentifier: '987654321' } },
 *   payer: { partyIdType: 'THIRD_PARTY_LINK', partyIdentifier: 'link123' },
 *   amountType: 'SEND',
 *   amount: { currency: 'USD', amount: '100' },
 *   transactionType: { scenario: 'TRANSFER', initiator: 'PAYER', initiatorType: 'CONSUMER' }
 * });
 * @function
 * @param {object} transactionRequest - The transaction request data
 * @param {RequestOptions} options - Additional request options
 * @state {MojalooState}
 * @returns {Operation}
 */
export function createThirdPartyRequest(transactionRequest, options) {
  return sendRequest('POST', '/thirdpartyRequests/transactions', {
    body: transactionRequest,
    ...options,
  });
}

/**
 * Get third party transaction request by ID
 * @public
 * @example <caption>Get transaction request details</caption>
 * getThirdPartyRequest('txn123', {
 *   headers: { 'FSPIOP-Source': 'pisp' }
 * });
 * @function
 * @param {string} transactionRequestId - The transaction request ID
 * @param {RequestOptions} options - Additional request options
 * @state {MojalooState}
 * @returns {Operation}
 */
export function getThirdPartyRequest(transactionRequestId, options) {
  return sendRequest(
    'GET',
    `/thirdpartyRequests/transactions/${transactionRequestId}`,
    options
  );
}

/**
 * Authorize a third party transaction request
 * @public
 * @example <caption>Authorize a transaction</caption>
 * authorizeThirdPartyRequest('txn123', {
 *   authorizationResponse: {
 *     responseType: 'ACCEPTED',
 *     signedPayload: { signedPayloadType: 'FIDO', fidoSignedPayload: { id: '123', response: {} } }
 *   }
 * });
 * @function
 * @param {string} transactionRequestId - The transaction request ID
 * @param {object} authData - The authorization data
 * @param {RequestOptions} options - Additional request options
 * @state {MojalooState}
 * @returns {Operation}
 */
export function authorizeThirdPartyRequest(
  transactionRequestId,
  authData,
  options
) {
  return sendRequest(
    'PUT',
    `/thirdpartyRequests/transactions/${transactionRequestId}`,
    { body: authData, ...options }
  );
}

/**
 * Get accounts linked to a consent
 * @public
 * @example <caption>Get accounts by consent ID</caption>
 * getAccounts('consent123', {
 *   headers: { 'FSPIOP-Source': 'pisp' }
 * });
 * @function
 * @param {string} consentId - The consent ID
 * @param {RequestOptions} options - Additional request options
 * @state {MojalooState}
 * @returns {Operation}
 */
export function getAccounts(consentId, options) {
  return sendRequest('GET', `/accounts/${consentId}`, options);
}

export {
  alterState,
  arrayToString,
  as,
  chunk,
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
  humanProper,
  lastReferenceValue,
  map,
  merge,
  parseCsv,
  scrubEmojis,
  sourceValue,
  splitKeys,
  toArray,
} from '@openfn/language-common';
