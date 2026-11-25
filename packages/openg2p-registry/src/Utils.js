import crypto from 'node:crypto';
import { composeNextState } from '@openfn/language-common';
import { request as commonRequest } from '@openfn/language-common/util';
import nodepath from 'node:path';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

// Compact JSON with recursively sorted object keys. This is the payload
// format the registry re-creates when verifying a signature
export const canonicalize = value => {
  if (Array.isArray(value)) {
    return `[${value.map(v => canonicalize(v ?? null)).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.keys(value)
      .sort()
      .filter(key => value[key] !== undefined)
      .map(key => `${JSON.stringify(key)}:${canonicalize(value[key])}`);
    return `{${entries.join(',')}}`;
  }
  return JSON.stringify(value);
};

const b64url = input => Buffer.from(input).toString('base64url');

const detectAlgorithm = key => {
  switch (key.asymmetricKeyType) {
    case 'rsa':
      return 'RS256';
    case 'ec':
      return 'ES256';
    case 'ed25519':
      return 'EdDSA';
    default:
      throw new Error(
        `Unsupported key type "${key.asymmetricKeyType}": use an RSA, EC P-256 or Ed25519 private key`
      );
  }
};

const signers = {
  RS256: (input, key) => crypto.sign('sha256', input, key),
  ES256: (input, key) =>
    crypto.sign('sha256', input, { key, dsaEncoding: 'ieee-p1363' }),
  EdDSA: (input, key) => crypto.sign(null, input, key),
};

// Returns a detached JWS (`<header>..<signature>`) over the canonical payload
export const signPayload = (payload, { privateKey, keyId, algorithm }) => {
  if (!privateKey) {
    throw new Error('configuration.privateKey is required to sign requests');
  }

  const key = crypto.createPrivateKey(privateKey);
  const alg = algorithm ?? detectAlgorithm(key);
  const sign = signers[alg];
  if (!sign) {
    throw new Error(
      `Unsupported algorithm "${alg}": use one of ${Object.keys(signers).join(', ')}`
    );
  }

  const header = { alg, typ: 'JWT', ...(keyId && { kid: keyId }) };
  const encodedHeader = b64url(JSON.stringify(header));
  const signingInput = `${encodedHeader}.${b64url(canonicalize(payload))}`;
  const signature = sign(Buffer.from(signingInput), key);

  return `${encodedHeader}..${b64url(signature)}`;
};

// Adds the sender id to the envelope header and attaches a detached JWS
// over everything except the signature itself
export const signBody = (configuration, body) => {
  const payload = { ...body };
  delete payload.signature;

  if (payload.header && configuration.senderId) {
    payload.header = { sender_id: configuration.senderId, ...payload.header };
  }

  return {
    signature: signPayload(payload, configuration),
    ...payload,
  };
};

export const request = (configuration = {}, method, path, options = {}) => {
  const { baseUrl } = configuration;

  const errors = {
    404: 'Page not found',
  };

  const { body, ...rest } = options;
  const isSignable = body && typeof body === 'object' && !Array.isArray(body);

  const opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...rest,
    body: isSignable ? signBody(configuration, body) : body,
    headers: {
      'content-type': 'application/json',
      ...rest.headers,
    },
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts);
};
