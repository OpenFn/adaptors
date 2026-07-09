import { expect } from 'chai';
import crypto from 'node:crypto';
import { enableMockClient } from '@openfn/language-common/util';

import { getAuthorizationUrl, getToken, getUserInfo } from '../src/Adaptor.js';

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
  authorizationEndpoint: 'https://fake.esignet.com/authorize',
  tokenEndpoint: 'https://fake.esignet.com/oidc/token',
  userInfoEndpoint: 'https://fake.esignet.com/oidc/userinfo',
};

const isValidAssertion = assertion => {
  const [header, payload, signature] = assertion.split('.');
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(`${header}.${payload}`);
  return verifier.verify(publicKey, Buffer.from(signature, 'base64url'));
};

describe('getAuthorizationUrl', () => {
  it('builds an authorization URL with the default scope', async () => {
    const state = { configuration };

    const finalState = await getAuthorizationUrl()(state);
    const url = new URL(finalState.data.url);

    expect(url.origin + url.pathname).to.equal(
      'https://fake.esignet.com/authorize'
    );
    expect(url.searchParams.get('client_id')).to.equal('test-client-id');
    expect(url.searchParams.get('response_type')).to.equal('code');
    expect(url.searchParams.get('redirect_uri')).to.equal(
      configuration.redirectUri
    );
    expect(url.searchParams.get('scope')).to.equal('openid profile');
    expect(url.searchParams.get('state')).to.be.a('string').with.length.above(
      0
    );
    expect(url.searchParams.get('nonce')).to.be.a('string').with.length.above(
      0
    );
  });

  it('supports acr_values and claims overrides', async () => {
    const state = { configuration };

    const finalState = await getAuthorizationUrl({
      acrValues: 'mosip:idp:acr:generated-code',
      claims: { userinfo: { phone_number: { essential: true } } },
    })(state);
    const url = new URL(finalState.data.url);

    expect(url.searchParams.get('acr_values')).to.equal(
      'mosip:idp:acr:generated-code'
    );
    expect(JSON.parse(url.searchParams.get('claims'))).to.eql({
      userinfo: { phone_number: { essential: true } },
    });
  });
});

describe('getToken', () => {
  it('exchanges a code for tokens using a signed client assertion', async () => {
    let capturedBody;

    testServer
      .intercept({ path: '/oidc/token', method: 'POST' })
      .reply(200, req => {
        capturedBody = new URLSearchParams(req.body);
        return {
          access_token: 'fake-access-token',
          id_token: 'fake-id-token',
          token_type: 'Bearer',
          expires_in: 3600,
        };
      });

    const state = { configuration };
    const finalState = await getToken('test-auth-code')(state);

    expect(capturedBody.get('grant_type')).to.equal('authorization_code');
    expect(capturedBody.get('code')).to.equal('test-auth-code');
    expect(capturedBody.get('client_id')).to.equal('test-client-id');
    expect(capturedBody.get('redirect_uri')).to.equal(
      configuration.redirectUri
    );
    expect(capturedBody.get('client_assertion_type')).to.equal(
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
    );
    expect(isValidAssertion(capturedBody.get('client_assertion'))).to.equal(
      true
    );

    expect(finalState.data.access_token).to.equal('fake-access-token');
    expect(finalState.configuration.access_token).to.equal(
      'fake-access-token'
    );
  });

  it('throws with the error body when eSignet rejects the code', async () => {
    testServer
      .intercept({ path: '/oidc/token', method: 'POST' })
      .reply(400, {
        error: 'invalid_grant',
        error_description: 'Authorization code is invalid or expired',
      });

    const state = { configuration };

    let error;
    try {
      await getToken('bad-code')(state);
    } catch (e) {
      error = e;
    }

    expect(error.statusCode).to.equal(400);
    expect(error.body.error).to.equal('invalid_grant');
  });
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

  it('decodes claims using the access_token stashed by getToken', async () => {
    let capturedAuthHeader;

    testServer
      .intercept({ path: '/oidc/userinfo', method: 'GET' })
      .reply(
        200,
        req => {
          capturedAuthHeader = req.headers['Authorization'];
          return fakeUserInfoJwt;
        },
        { headers: { 'content-type': 'text/plain' } }
      );

    const state = {
      configuration: { ...configuration, access_token: 'stashed-token' },
    };
    const finalState = await getUserInfo()(state);

    expect(capturedAuthHeader).to.equal('Bearer stashed-token');
    expect(finalState.data).to.eql(claims);
  });

  it('accepts an explicit access token, overriding configuration', async () => {
    let capturedAuthHeader;

    testServer
      .intercept({ path: '/oidc/userinfo', method: 'GET' })
      .reply(
        200,
        req => {
          capturedAuthHeader = req.headers['Authorization'];
          return fakeUserInfoJwt;
        },
        { headers: { 'content-type': 'text/plain' } }
      );

    const state = {
      configuration: { ...configuration, access_token: 'stashed-token' },
    };
    const finalState = await getUserInfo('explicit-token')(state);

    expect(capturedAuthHeader).to.equal('Bearer explicit-token');
    expect(finalState.data).to.eql(claims);
  });
});
