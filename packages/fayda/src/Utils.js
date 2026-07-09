import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';
import crypto from 'node:crypto';

const CLIENT_ASSERTION_TYPE =
  'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';

const base64url = input => Buffer.from(input).toString('base64url');

// Signs a private_key_jwt client assertion for eSignet's token endpoint,
// per RFC 7523. configuration.privateKey is a base64-encoded JWK.
export const generateClientAssertion = configuration => {
  const { clientId, privateKey, tokenEndpoint } = configuration;

  const jwk = JSON.parse(Buffer.from(privateKey, 'base64').toString('utf8'));
  const keyObject = crypto.createPrivateKey({ key: jwk, format: 'jwk' });

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
    .sign(keyObject);

  return `${signingInput}.${base64url(signature)}`;
};

// Decodes the claims out of a JWT without verifying its signature.
export const decodeClaims = jwt => {
  const [, payload] = jwt.split('.');
  return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
};

// Exchanges an authorization code for tokens by POSTing a signed
// client assertion to eSignet's token endpoint.
export const getToken = async (configuration, code, options = {}) => {
  const { clientId, redirectUri, tokenEndpoint } = configuration;

  const clientAssertion = generateClientAssertion(configuration);

  const body = new URLSearchParams();
  body.append('grant_type', 'authorization_code');
  body.append('code', code);
  body.append('client_id', clientId);
  body.append('redirect_uri', redirectUri);
  body.append('client_assertion_type', CLIENT_ASSERTION_TYPE);
  body.append('client_assertion', clientAssertion);

  const requestOptions = {
    ...options,
    body: body.toString(),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      ...options.headers,
    },
    parseAs: 'json',
  };

  return commonRequest('POST', tokenEndpoint, requestOptions).then(
    logResponse
  );
};

// Attaches the configured access_token to a request against an
// eSignet URL (eg. userInfoEndpoint).
export const request = (configuration = {}, method, url, options = {}) => {
  const { access_token } = configuration;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${access_token}`,
  };

  return commonRequest(method, url, {
    ...options,
    headers,
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
