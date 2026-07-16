import { expect } from 'chai';
import {
  MockAgent,
  getGlobalDispatcher,
  setGlobalDispatcher,
} from 'undici';
import { create, execute, list } from '../src/Adaptor.js';

const apiOrigin = 'https://www.googleapis.com';
const listRequest = {
  path: /\/drive\/v3\/files/,
  method: 'GET',
};
const createRequest = {
  path: /\/upload\/drive\/v3\/files/,
  method: 'POST',
};
const state = { configuration: { access_token: 'test-access-token' } };

const prematureClose = () =>
  Object.assign(new Error('Premature close'), {
    code: 'ERR_STREAM_PREMATURE_CLOSE',
  });

describe('native fetch transport', () => {
  let mockAgent;
  let previousDispatcher;
  let pool;

  beforeEach(() => {
    previousDispatcher = getGlobalDispatcher();
    mockAgent = new MockAgent();
    mockAgent.disableNetConnect();
    setGlobalDispatcher(mockAgent);
    pool = mockAgent.get(apiOrigin);
  });

  afterEach(async () => {
    setGlobalDispatcher(previousDispatcher);
    await mockAgent.close();
  });

  it('retries a safe request after a premature close', async () => {
    pool.intercept(listRequest).replyWithError(prematureClose());
    pool.intercept(listRequest).reply(200, { files: [] }, {
      headers: { 'content-type': 'application/json' },
    });

    const result = await execute(list('folder123'))(state);

    expect(result.data).to.deep.equal([]);
    expect(mockAgent.pendingInterceptors()).to.be.empty;
  });

  it('surfaces a premature close after the retry budget is exhausted', async () => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      pool.intercept(listRequest).replyWithError(prematureClose());
    }

    let error;
    try {
      await execute(list('folder123'))(state);
    } catch (caught) {
      error = caught;
    }

    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal('fetch failed');
    expect(error.cause?.cause?.code).to.equal('ERR_STREAM_PREMATURE_CLOSE');
    expect(mockAgent.pendingInterceptors()).to.be.empty;
  });

  it('does not replay create after an ambiguous transport failure', async () => {
    pool.intercept(createRequest).replyWithError(prematureClose());
    pool.intercept(createRequest).reply(200, { id: 'unexpected-retry' }, {
      headers: { 'content-type': 'application/json' },
    });

    let error;
    try {
      await execute(create(Buffer.from('file').toString('base64'), 'file.txt'))(
        state,
      );
    } catch (caught) {
      error = caught;
    }

    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal('fetch failed');
    expect(mockAgent.pendingInterceptors()).to.have.lengthOf(1);
  });
});
