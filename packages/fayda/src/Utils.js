import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';
import { importJWK, SignJWT, decodeJwt } from 'jose';

const CLIENT_ASSERTION_TYPE =
  'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';

// Sign a private_key_jwt client assertion for the token endpoint.
// configuration.privateKey is a base64-encoded JWK. tokenExpirationTime
// (default '5m') sets how long the single-use assertion is valid.
export const generateClientAssertion = async configuration => {
  const { clientId, privateKey, tokenEndpoint, tokenExpirationTime } =
    configuration;

  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = { iss: clientId, sub: clientId, aud: tokenEndpoint };

  const jwk = JSON.parse(Buffer.from(privateKey, 'base64').toString());
  const key = await importJWK(jwk, 'RS256');

  return new SignJWT(payload)
    .setProtectedHeader(header)
    .setIssuedAt()
    .setExpirationTime(tokenExpirationTime || '5m')
    .sign(key);
};

// Decode the claims from signed JWT, or return the body as-is if the
// userinfo response is unsigned (plain JSON rather than JWS).
export const decodeClaims = token => {
  const trimmed = token.trim();
  return trimmed.startsWith('{') ? JSON.parse(trimmed) : decodeJwt(trimmed);
};

// Exchange an authorization code for tokens using the signed client
// assertion (and a PKCE code_verifier, if one was used).
export const getToken = async (configuration, code, options = {}) => {
  const { clientId, redirectUri, tokenEndpoint } = configuration;
  const { codeVerifier, ...requestOptions } = options;

  const body = new URLSearchParams();
  body.append('grant_type', 'authorization_code');
  body.append('code', code);
  body.append('client_id', clientId);
  body.append('redirect_uri', redirectUri);
  body.append('client_assertion_type', CLIENT_ASSERTION_TYPE);
  body.append('client_assertion', await generateClientAssertion(configuration));
  if (codeVerifier) {
    body.append('code_verifier', codeVerifier);
  }

  const opts = {
    ...requestOptions,
    body: body.toString(),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      ...requestOptions.headers,
    },
    parseAs: 'json',
  };

  return commonRequest('POST', tokenEndpoint, opts).then(logResponse);
};

// Send an authenticated request to an eSignet endpoint.
export const request = (configuration = {}, method, url, options = {}) => {
  const { access_token } = configuration;

  return commonRequest(method, url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${access_token}`,
    },
    parseAs: options.parseAs || 'json',
  }).then(logResponse);
};
