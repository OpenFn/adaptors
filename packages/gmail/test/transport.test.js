import { expect } from 'chai';
import {
  MockAgent,
  getGlobalDispatcher,
  setGlobalDispatcher,
} from 'undici';
import {
  execute,
  getContentsFromMessages,
  sendMessage,
} from '../src/Adaptor.js';

const apiOrigin = 'https://gmail.googleapis.com';
const listRequest = {
  path: /\/gmail\/v1\/users\/me\/messages/,
  method: 'GET',
};
const sendRequest = {
  path: /\/gmail\/v1\/users\/me\/messages\/send/,
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
    pool.intercept(listRequest).reply(200, { messages: [] }, {
      headers: { 'content-type': 'application/json' },
    });

    const result = await execute(
      getContentsFromMessages({ query: 'subject:test', contents: [] }),
    )(state);

    expect(result.data).to.deep.equal([]);
    expect(mockAgent.pendingInterceptors()).to.be.empty;
  });

  it('surfaces an error after the retry budget is exhausted', async () => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      pool.intercept(listRequest).replyWithError(prematureClose());
    }

    let error;
    try {
      await execute(
        getContentsFromMessages({ query: 'subject:test', contents: [] }),
      )(state);
    } catch (caught) {
      error = caught;
    }

    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.include('fetch failed');
    expect(mockAgent.pendingInterceptors()).to.be.empty;
  });

  it('does not replay sendMessage after an ambiguous transport failure', async () => {
    pool.intercept(sendRequest).replyWithError(prematureClose());
    pool.intercept(sendRequest).reply(200, { id: 'unexpected-retry' }, {
      headers: { 'content-type': 'application/json' },
    });

    let error;
    try {
      await execute(
        sendMessage({
          to: 'test@example.com',
          subject: 'Test',
          body: 'Test body',
        }),
      )(state);
    } catch (caught) {
      error = caught;
    }

    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.include('fetch failed');
    expect(mockAgent.pendingInterceptors()).to.have.lengthOf(1);
  });
});
