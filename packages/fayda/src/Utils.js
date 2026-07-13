import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';
import crypto from 'node:crypto';

const CLIENT_ASSERTION_TYPE =
  'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';

const base64url = input => Buffer.from(input).toString('base64url');

// Sign a private_key_jwt client assertion (RFC 7523) for the token
// endpoint. configuration.privateKey is a base64-encoded JWK.
export const generateClientAssertion = configuration => {
  const { clientId, privateKey, tokenEndpoint } = configuration;

  const jwk = JSON.parse(Buffer.from(privateKey, 'base64').toString('utf8'));
  const key = crypto.createPrivateKey({ key: jwk, format: 'jwk' });

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: clientId,
    sub: clientId,
    aud: tokenEndpoint,
    iat: now,
    exp: now + 5 * 60,
    jti: crypto.randomUUID(),
  };

  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(
    JSON.stringify(claims),
  )}`;
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(signingInput)
    .sign(key);

  return `${signingInput}.${base64url(signature)}`;
};

export const generateCodeVerifier = () =>
  crypto.randomBytes(32).toString('base64url');

export const generateCodeChallenge = verifier =>
  crypto.createHash('sha256').update(verifier).digest('base64url');

// Decode a JWT payload, or return the body as-is if userinfo is
// unsigned (plain JSON rather than a JWS).
export const decodeClaims = token => {
  const trimmed = token.trim();
  if (trimmed.startsWith('{')) {
    return JSON.parse(trimmed);
  }
  const [, payload] = trimmed.split('.');
  return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
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
  body.append('client_assertion', generateClientAssertion(configuration));
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

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};
