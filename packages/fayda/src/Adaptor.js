import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * Options for the userinfo request
 * @typedef {Object} UserInfoOptions
 * @public
 * @property {string} codeVerifier - PKCE code verifier that pairs with the code_challenge the app sent to the authorization endpoint. Required if the authorization request used PKCE.
 * @property {object} headers - An object of headers to append to the request.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 * @property {object} tls - TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
 */

/**
 * Exchange an authorization code for a user's verified identity claims.
 * Gets an access token with a signed JWK client assertion (private_key_jwt),
 * calls the userinfo endpoint, and writes the decoded claims to state.data.
 * The access token is used only for the exchange.
 * @example <caption>Fetch claims for an authorization code delivered by webhook</caption>
 * getUserInfo($.code, { codeVerifier: $.codeVerifier });
 * @function
 * @public
 * @param {string} authorizationCode - The authorization code returned to redirectUri
 * @param {UserInfoOptions} options - PKCE `codeVerifier` and request options
 * @returns {Operation}
 * @state {claims}
 */
export function getUserInfo(authorizationCode, options = {}) {
  return async state => {
    const [resolvedAuthorizationCode, resolvedOptions] = expandReferences(
      state,
      authorizationCode,
      options,
    );

    const { codeVerifier, ...requestOptions } = resolvedOptions;

    // Keep the access token in local scope
    const { body } = await util.getToken(
      state.configuration,
      resolvedAuthorizationCode,
      { codeVerifier },
    );

    const { userInfoEndpoint } = state.configuration;

    const response = await util.request(
      { access_token: body.access_token },
      'GET',
      userInfoEndpoint,
      { ...requestOptions, parseAs: 'text' },
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
