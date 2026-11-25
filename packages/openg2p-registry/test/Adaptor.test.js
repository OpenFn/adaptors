import crypto from 'node:crypto';
import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request } from '../src/Adaptor.js';
import { canonicalize } from '../src/Utils.js';

const testServer = enableMockClient('https://fake.server.com');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const configuration = {
  baseUrl: 'https://fake.server.com',
  senderId: 'openfn',
  privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }),
  keyId: 'openfn-key-1',
};

describe('request', () => {
  it('signs the {header, message} envelope with a detached JWS', async () => {
    let sentBody;
    testServer
      .intercept({ path: '/dci/sync/search', method: 'POST' })
      .reply(200, ({ body }) => {
        sentBody = JSON.parse(body);
        return { header: { status: 'succ' }, message: {} };
      });

    const state = { configuration };

    const finalState = await request('POST', 'dci/sync/search', {
      header: { message_id: 'msg-1', action: 'search' },
      message: { transaction_id: 'txn-1', search_request: [] },
    })(state);

    expect(finalState.data.header.status).to.equal('succ');

    const { signature, ...payload } = sentBody;
    expect(payload.header.sender_id).to.equal('openfn');

    const [encodedHeader, detachedPayload, encodedSignature] =
      signature.split('.');
    expect(detachedPayload).to.equal('');
    expect(
      JSON.parse(Buffer.from(encodedHeader, 'base64url').toString())
    ).to.eql({ alg: 'RS256', typ: 'JWT', kid: 'openfn-key-1' });

    const signingInput = `${encodedHeader}.${Buffer.from(
      canonicalize(payload)
    ).toString('base64url')}`;
    const isValid = crypto.verify(
      'sha256',
      Buffer.from(signingInput),
      publicKey,
      Buffer.from(encodedSignature, 'base64url')
    );
    expect(isValid).to.be.true;
  });

  it('throws an error if the service returns 403', async () => {
    testServer
      .intercept({ path: '/partner/data_scopes', method: 'GET' })
      .reply(403);

    const error = await request('GET', 'partner/data_scopes')({
      configuration,
    }).catch(error => error);

    expect(error.statusMessage).to.eql('Forbidden');
  });
});
