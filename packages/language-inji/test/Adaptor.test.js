import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { verifyCredential } from '../src/Adaptor.js';

// Docs: ./wiki/unit-test-guide.md
const testServer = enableMockClient('https://fake.server.com');

const configuration = {
  baseUrl: 'https://fake.server.com/v1/verify',
};

const successBody = {
  allChecksSuccessful: true,
  schemaAndSignatureCheck: { valid: true, error: null },
  expiryCheck: { valid: true },
  statusCheck: [{ purpose: 'revocation', valid: true, error: null }],
  claims: {},
};

describe('verifyCredential', () => {
  it('posts a JSON-LD object as a string and writes the result to state.data', async () => {
    const credential = {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', 'AgeCredential'],
      issuer: 'did:web:example.com',
      credentialSubject: { id: 'did:example:123', age: 25 },
    };

    testServer
      .intercept({
        path: '/v1/verify/v2/vc-verification',
        method: 'POST',
        body: body => {
          const parsed = JSON.parse(body);
          return (
            parsed.verifiableCredential === JSON.stringify(credential) &&
            parsed.skipStatusChecks === false &&
            Array.isArray(parsed.statusCheckFilters) &&
            parsed.statusCheckFilters.length === 0 &&
            parsed.includeClaims === false
          );
        },
      })
      .reply(200, successBody);

    const state = {
      configuration,
      data: credential,
    };

    const finalState = await verifyCredential(state.data)(state);

    expect(finalState.data).to.eql(successBody);
    expect(finalState.response.statusCode).to.eql(200);
  });

  it('forwards an SD-JWT string without extra stringify', async () => {
    const sdJwt =
      'eyJhbGciOiJFZERTQSJ9.eyJpYXQiOiIwMjMxMTIzMTIzMTMiLCJ.signature';

    testServer
      .intercept({
        path: '/v1/verify/v2/vc-verification',
        method: 'POST',
        body: body => {
          const parsed = JSON.parse(body);
          return parsed.verifiableCredential === sdJwt;
        },
      })
      .reply(200, successBody);

    const state = { configuration };

    const finalState = await verifyCredential(sdJwt)(state);

    expect(finalState.data.allChecksSuccessful).to.eql(true);
  });

  it('sends skipStatusChecks, statusCheckFilters and includeClaims in the body', async () => {
    const credential = '{"type":["VerifiableCredential"]}';

    testServer
      .intercept({
        path: '/v1/verify/v2/vc-verification',
        method: 'POST',
        body: body => {
          const parsed = JSON.parse(body);
          return (
            parsed.verifiableCredential === credential &&
            parsed.skipStatusChecks === true &&
            parsed.statusCheckFilters[0] === 'revocation' &&
            parsed.includeClaims === true
          );
        },
      })
      .reply(200, {
        ...successBody,
        claims: { age: 25 },
      });

    const state = { configuration };

    const finalState = await verifyCredential(credential, {
      skipStatusChecks: true,
      statusCheckFilters: ['revocation'],
      includeClaims: true,
    })(state);

    expect(finalState.data.claims).to.eql({ age: 25 });
  });

  it('throws when the service returns 400', async () => {
    testServer
      .intercept({
        path: '/v1/verify/v2/vc-verification',
        method: 'POST',
      })
      .reply(400);

    const state = { configuration };

    const error = await verifyCredential('not-a-valid-vc')(state).catch(e => e);

    expect(error.statusCode).to.eql(400);
  });
});
