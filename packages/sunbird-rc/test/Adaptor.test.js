import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, issueCredential, dataValue } from '../src/Adaptor.js';

// This creates a mock client which acts like a fake server.
// It enables pattern-matching on the request object and custom responses
// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
const testServer = enableMockClient('https://fake.server.com');

describe('request', () => {
  it('makes a post request to the right endpoint', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/patients',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      // Set the reply from this endpoint
      // The body will be returned to state.data
      .reply(200, { id: 7, fullName: 'Mamadou', gender: 'M' });

    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await request('POST', 'patients', {
      name: state.data.fullName,
      gender: state.data.gender,
    })(state);

    expect(finalState.data).to.eql({
      fullName: 'Mamadou',
      gender: 'M',
      id: 7,
    });
  });

  it('throws an error if the service returns 403', async () => {
    testServer
      .intercept({
        path: '/noAccess',
        method: 'POST',
      })
      .reply(403);

    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await request('POST', 'noAccess', { name: 'taylor' })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Forbidden');
  });
});

describe('issueCredential', () => {
  it('issues a verifiable credential successfully', async () => {
    const mockResponse = {
      credential: {
        id: 'did:rcw:cbf00119-096f-4e70-9cf3-d108a71ae77d',
        type: ['VerifiableCredential', 'ProofOfAcademicEvaluationCredential'],
        proof: {
          type: 'Ed25519Signature2020',
          created: '2025-11-02T08:07:32Z',
          proofValue: 'zqyhqEppCmVNWvC1M8gXFmfatykHVXvsqcD7Nr57jTi56A2uTrvhCnaTPGix9pYcuvG3dN2q6Srqmrbdm5oxgqzU',
          proofPurpose: 'assertionMethod',
          verificationMethod: 'did:web:example.com:identifier:9536bc3b-3f4b-4cec-8c48-f67c9c4d63fc#key-0',
        },
        issuer: 'did:web:example.com:identifier:9536bc3b-3f4b-4cec-8c48-f67c9c4d63fc',
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://littlemight.github.io/sunbird-demo-vc-context/demo-context.json',
          'https://w3id.org/security/suites/ed25519-2020/v1',
        ],
        issuanceDate: '2025-11-02T08:07:31.571Z',
        expirationDate: '2027-11-02T08:07:31.574Z',
        credentialSubject: {
          id: 'did:schema:7b2fc25c-b7f6-40b5-bee4-d95bb5924450',
          name: 'Taylor Test',
          type: 'ProofOfAcademicEvaluationCredential',
          grade: '9.56 / 10 (Distinction)',
          programme: 'AI Foundations',
          certifyingInstitute: 'YourSkillsFuture Council',
          evaluatingInstitute: 'Institute of Digital Learning, India',
        },
      },
      credentialSchemaId: 'did:schema:7b2fc25c-b7f6-40b5-bee4-d95bb5924450',
      createdAt: '2025-11-02T08:07:32.781Z',
      updatedAt: '2025-11-02T08:07:32.781Z',
      createdBy: '',
      updatedBy: '',
      tags: ['demo', 'education', 'cross-border'],
    };

    testServer
      .intercept({
        path: '/credentials/issue',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, mockResponse);

    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        normalized: {
          name: 'John Doe',
          grade: 'A',
          programme: 'Computer Science',
        },
      },
    };

    const credentialPayload = {
      credential: {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://littlemight.github.io/sunbird-demo-vc-context/demo-context.json',
        ],
        type: ['VerifiableCredential', 'ProofOfAcademicEvaluationCredential'],
        issuer: 'did:web:example.com:identifier:9536bc3b-3f4b-4cec-8c48-f67c9c4d63fc',
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: 'did:schema:7b2fc25c-b7f6-40b5-bee4-d95bb5924450',
          type: 'ProofOfAcademicEvaluationCredential',
          name: state.data.normalized.name,
          grade: state.data.normalized.grade,
          programme: state.data.normalized.programme,
        },
      },
      credentialSchemaId: 'did:schema:7b2fc25c-b7f6-40b5-bee4-d95bb5924450',
      credentialSchemaVersion: '1.0.0',
      tags: ['demo', 'education', 'cross-border'],
    };

    const finalState = await issueCredential(credentialPayload)(state);

    expect(finalState.data.credential).to.have.property('id');
    expect(finalState.data.credential.id).to.eql('did:rcw:cbf00119-096f-4e70-9cf3-d108a71ae77d');
    expect(finalState.data.credential).to.have.property('proof');
    expect(finalState.data.credentialSchemaId).to.eql('did:schema:7b2fc25c-b7f6-40b5-bee4-d95bb5924450');
    expect(finalState.data.tags).to.be.an('array').that.includes('demo');
  });
});
