import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import crypto from 'node:crypto';
import * as util from './Utils.js';

/**
 * State returned by an HTTP-calling operation
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options passed through to the underlying HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} headers - An object of headers to append to the request.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 * @property {object} tls - TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
 */

/**
 * State returned by getAuthorizationUrl
 * @typedef {Object} AuthorizationUrlState
 * @property data.url - the authorization URL to redirect the user to
 * @property data.codeVerifier - the PKCE code verifier to pass to getToken
 **/

/**
 * Options for the authorization URL builder
 * @typedef {Object} AuthorizationUrlOptions
 * @public
 * @property {string} scope - Space-separated OIDC scopes. Default: "openid profile"
 * @property {string} state - Value returned alongside the code. Default: a random UUID
 * @property {string} nonce - Value echoed back in the ID token. Default: a random UUID
 * @property {string} acrValues - Space-separated authentication context class references (eg. OTP, biometrics)
 * @property {object|string} claims - The OIDC `claims` parameter
 * @property {string} codeVerifier - PKCE code verifier. Default: a fresh random verifier
 */

/**
 * Build the eSignet authorization URL for a user to visit and consent.
 * Makes no network request. Returns the URL and the PKCE `codeVerifier`
 * on state; capture the verifier to pass to `getToken`.
 * @example <caption>Build an authorization URL with the default scope</caption>
 * getAuthorizationUrl();
 * @example <caption>Request OTP-based authentication and extra claims</caption>
 * getAuthorizationUrl({
 *   acrValues: 'mosip:idp:acr:generated-code',
 *   claims: { userinfo: { phone_number: { essential: true } } },
 * });
 * @function
 * @public
 * @param {AuthorizationUrlOptions} options - Optional overrides for the authorization request
 * @returns {Operation}
 * @state {AuthorizationUrlState}
 */
export function getAuthorizationUrl(options = {}) {
  return state => {
    const [resolvedOptions] = expandReferences(state, options);

    const { clientId, redirectUri, authorizationEndpoint } =
      state.configuration;

    const {
      scope = 'openid profile',
      state: authState = crypto.randomUUID(),
      nonce = crypto.randomUUID(),
      acrValues,
      claims,
      codeVerifier = util.generateCodeVerifier(),
    } = resolvedOptions;

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope,
      state: authState,
      nonce,
      code_challenge: util.generateCodeChallenge(codeVerifier),
      code_challenge_method: 'S256',
    });

    if (acrValues) {
      params.set('acr_values', acrValues);
    }
    if (claims) {
      params.set(
        'claims',
        typeof claims === 'string' ? claims : JSON.stringify(claims),
      );
    }

    const url = `${authorizationEndpoint}?${params.toString()}`;

    return composeNextState(state, { url, codeVerifier });
  };
}

/**
 * Exchange an authorization code for tokens, authenticating with a
 * signed JWK client assertion (private_key_jwt). The access token is
 * saved to state.configuration for a following getUserInfo call.
 * @example <caption>Exchange the code and PKCE verifier for tokens</caption>
 * getToken(state => state.data.code, { codeVerifier: state.data.codeVerifier });
 * @function
 * @public
 * @param {string} code - The authorization code returned to redirectUri
 * @param {object} options - Optional `codeVerifier` (PKCE) and request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function getToken(code, options = {}) {
  return async state => {
    const [resolvedCode, resolvedOptions] = expandReferences(
      state,
      code,
      options,
    );

    const response = await util.getToken(
      state.configuration,
      resolvedCode,
      resolvedOptions,
    );

    const nextState = util.prepareNextState(state, response);

    return {
      ...nextState,
      configuration: {
        ...nextState.configuration,
        access_token: response.body.access_token,
      },
    };
  };
}

/**
 * Fetch and decode verified identity claims from the userinfo endpoint.
 * Falls back to the access token saved by getToken if none is passed.
 * @example <caption>Fetch claims using the token from a prior getToken call</caption>
 * getUserInfo();
 * @example <caption>Fetch claims with an explicit access token</caption>
 * getUserInfo('some-access-token');
 * @function
 * @public
 * @param {string} accessToken - Optional access token. Defaults to state.configuration.access_token
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {claims}
 */
export function getUserInfo(accessToken, options = {}) {
  return async state => {
    const [resolvedAccessToken, resolvedOptions] = expandReferences(
      state,
      accessToken,
      options,
    );

    const token = resolvedAccessToken || state.configuration.access_token;
    const { userInfoEndpoint } = state.configuration;

    const response = await util.request(
      { ...state.configuration, access_token: token },
      'GET',
      userInfoEndpoint,
      { ...resolvedOptions, parseAs: 'text' },
    );

    return composeNextState(state, util.decodeClaims(response.body));
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
