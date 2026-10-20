import { expect } from 'chai';
import crypto from 'node:crypto';
import { enableMockClient } from '@openfn/language-common/util';

import { getUserInfo } from '../src/Adaptor.js';

// This creates a mock client which acts like a fake server.
// It enables pattern-matching on the request object and custom responses
// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
const testServer = enableMockClient('https://fake.esignet.com');

// A throwaway RS256 keypair, standing in for a real eSignet-registered
// signing key, used to sign/verify the client assertion in these tests.
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});
const base64PrivateKey = Buffer.from(
  JSON.stringify(privateKey.export({ format: 'jwk' }))
).toString('base64');

const configuration = {
  clientId: 'test-client-id',
  privateKey: base64PrivateKey,
  redirectUri: 'https://myapp.example.com/callback',
  tokenEndpoint: 'https://fake.esignet.com/oidc/token',
  userInfoEndpoint: 'https://fake.esignet.com/oidc/userinfo',
};

const isValidAssertion = assertion => {
  const [header, payload, signature] = assertion.split('.');
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(`${header}.${payload}`);
  return verifier.verify(publicKey, Buffer.from(signature, 'base64url'));
};

const decodeJwtPayload = jwt =>
  JSON.parse(Buffer.from(jwt.split('.')[1], 'base64url').toString());

// Reply helper for the token endpoint: capture the request body and return a
// token payload.
const interceptToken = (
  onBody,
  response = { access_token: 'fake-access-token', token_type: 'Bearer' }
) =>
  testServer
    .intercept({ path: '/oidc/token', method: 'POST' })
    .reply(200, req => {
      onBody(new URLSearchParams(req.body));
      return response;
    });

describe('getUserInfo', () => {
  const claims = {
    sub: '9830872690593682',
    name: 'Test User',
    email: 'test@example.com',
  };
  const fakeUserInfoJwt = [
    Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString(
      'base64url'
    ),
    Buffer.from(JSON.stringify(claims)).toString('base64url'),
    'fakesignature',
  ].join('.');

  const interceptUserInfo = (onAuthHeader = () => {}) =>
    testServer
      .intercept({ path: '/oidc/userinfo', method: 'GET' })
      .reply(
        200,
        req => {
          onAuthHeader(req.headers['Authorization']);
          return fakeUserInfoJwt;
        },
        { headers: { 'content-type': 'text/plain' } }
      );

  it('exchanges the code for a token and returns decoded claims', async () => {
    let tokenBody;
    let authHeader;

    interceptToken(body => {
      tokenBody = body;
    });
    interceptUserInfo(header => {
      authHeader = header;
    });

    const state = { configuration };
    const finalState = await getUserInfo('test-auth-code')(state);

    // The code was exchanged with a valid signed client assertion.
    expect(tokenBody.get('grant_type')).to.equal('authorization_code');
    expect(tokenBody.get('code')).to.equal('test-auth-code');
    expect(tokenBody.get('client_id')).to.equal('test-client-id');
    expect(tokenBody.get('redirect_uri')).to.equal(configuration.redirectUri);
    expect(tokenBody.get('client_assertion_type')).to.equal(
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
    );
    expect(isValidAssertion(tokenBody.get('client_assertion'))).to.equal(true);

    // The token from the exchange authenticates the userinfo call.
    expect(authHeader).to.equal('Bearer fake-access-token');

    // Only the verified claims land on state.
    expect(finalState.data).to.eql(claims);

    // The access token must never leak onto inspectable state (dataclips / logs).
    expect(finalState.configuration.access_token).to.be.undefined;
    expect(finalState.response).to.be.undefined;
  });

  it('forwards the PKCE code_verifier to the token request', async () => {
    let tokenBody;

    interceptToken(body => {
      tokenBody = body;
    });
    interceptUserInfo();

    const state = { configuration };
    await getUserInfo('test-auth-code', { codeVerifier: 'test-verifier' })(
      state
    );

    expect(tokenBody.get('code_verifier')).to.equal('test-verifier');
  });

  it('handles an unsigned (plain JSON) userinfo response', async () => {
    interceptToken(() => {});
    testServer
      .intercept({ path: '/oidc/userinfo', method: 'GET' })
      .reply(200, claims, { headers: { 'content-type': 'application/json' } });

    const state = { configuration };
    const finalState = await getUserInfo('test-auth-code')(state);

    expect(finalState.data).to.eql(claims);
  });

  it('signs the client assertion with the default 5-minute expiry', async () => {
    let tokenBody;

    interceptToken(body => {
      tokenBody = body;
    });
    interceptUserInfo();

    const state = { configuration };
    await getUserInfo('test-auth-code')(state);

    const assertion = decodeJwtPayload(tokenBody.get('client_assertion'));
    expect(assertion.exp - assertion.iat).to.equal(300);
  });

  it('honours a configured tokenExpirationTime', async () => {
    let tokenBody;

    interceptToken(body => {
      tokenBody = body;
    });
    interceptUserInfo();

    const state = {
      configuration: { ...configuration, tokenExpirationTime: '2m' },
    };
    await getUserInfo('test-auth-code')(state);

    const assertion = decodeJwtPayload(tokenBody.get('client_assertion'));
    expect(assertion.exp - assertion.iat).to.equal(120);
  });

  it('throws with the error body when eSignet rejects the code', async () => {
    testServer.intercept({ path: '/oidc/token', method: 'POST' }).reply(400, {
      error: 'invalid_grant',
      error_description: 'Authorization code is invalid or expired',
    });

    const state = { configuration };

    let error;
    try {
      await getUserInfo('bad-code')(state);
    } catch (e) {
      error = e;
    }

    expect(error.statusCode).to.equal(400);
    expect(error.body.error).to.equal('invalid_grant');
  });
});
