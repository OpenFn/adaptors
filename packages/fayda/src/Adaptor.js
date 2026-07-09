import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import crypto from 'node:crypto';
import * as util from './Utils.js';

/**
 * State object returned by an HTTP-calling operation
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
 * Options provided to the authorization URL builder
 * @typedef {Object} AuthorizationUrlOptions
 * @public
 * @property {string} scope - OIDC scopes to request. Default: "openid profile"
 * @property {string} state - CSRF state value returned alongside the authorization code. Default: a random UUID
 * @property {string} nonce - OIDC nonce value, echoed back in the ID token. Default: a random UUID
 * @property {string} acrValues - Space-separated authentication context class references (eg. OTP, biometrics)
 * @property {object|string} claims - The OIDC `claims` parameter, requesting specific userinfo/id_token claims
 */

/**
 * Build the eSignet authorization URL that a user must visit to
 * authenticate and consent. This makes no network request: redirecting
 * the user and collecting their consent happens outside of OpenFn. The
 * resulting `code` query param on your redirectUri is what you pass to
 * getToken.
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
 * @state {url}
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
    } = resolvedOptions;

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope,
      state: authState,
      nonce,
    });

    if (acrValues) {
      params.set('acr_values', acrValues);
    }
    if (claims) {
      params.set(
        'claims',
        typeof claims === 'string' ? claims : JSON.stringify(claims)
      );
    }

    const url = `${authorizationEndpoint}?${params.toString()}`;

    return composeNextState(state, { url });
  };
}

/**
 * Exchange an authorization code for tokens at eSignet's token endpoint,
 * authenticating as the client with a signed JWK client assertion
 * (private_key_jwt) rather than a shared secret. The returned
 * access_token is stashed on state.configuration so that a following
 * getUserInfo call can use it without it being passed explicitly.
 * @example <caption>Exchange the code returned to your redirectUri for tokens</caption>
 * getToken(state => state.data.code);
 * @function
 * @public
 * @param {string} code - The authorization code returned to redirectUri
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function getToken(code, options = {}) {
  return async state => {
    const [resolvedCode, resolvedOptions] = expandReferences(
      state,
      code,
      options
    );

    const response = await util.getToken(
      state.configuration,
      resolvedCode,
      resolvedOptions
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
 * Fetch verified identity claims from eSignet's userinfo endpoint. The
 * response is a signed JWT (JWS); this decodes its claims without
 * verifying the signature (JWKS-based verification is a future
 * addition, not v1). Falls back to the access_token stored on
 * state.configuration by a prior getToken call if none is provided.
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
      options
    );

    const token = resolvedAccessToken || state.configuration.access_token;
    const { userInfoEndpoint } = state.configuration;

    const response = await util.request(
      { ...state.configuration, access_token: token },
      'GET',
      userInfoEndpoint,
      { ...resolvedOptions, parseAs: 'text' }
    );

    const claims = util.decodeClaims(response.body);

    return composeNextState(state, claims);
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
