import { expect } from 'chai';
import {
  MockAgent,
  getGlobalDispatcher,
  setGlobalDispatcher,
} from 'undici';
import { execute, prompt } from '../src/Adaptor.js';

const apiOrigin = 'https://api.anthropic.com';
const messageRequest = { path: '/v1/messages', method: 'POST' };
const state = { configuration: { apiKey: 'test-api-key' } };

const prematureClose = () =>
  Object.assign(new Error('Premature close'), {
    code: 'ERR_STREAM_PREMATURE_CLOSE',
  });

const messageResponse = {
  id: 'msg_test',
  type: 'message',
  role: 'assistant',
  model: 'claude-sonnet-4-6',
  content: [{ type: 'text', text: 'Recovered.' }],
  stop_reason: 'end_turn',
  stop_sequence: null,
  usage: { input_tokens: 1, output_tokens: 1 },
};

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

  it('recovers from a premature close using the SDK retry policy', async () => {
    pool.intercept(messageRequest).replyWithError(prematureClose());
    pool.intercept(messageRequest).reply(200, messageResponse, {
      headers: {
        'content-type': 'application/json',
        'request-id': 'req_test',
      },
    });

    const result = await execute(prompt('Reply briefly.'))(state);

    expect(result.data).to.deep.equal(messageResponse);
    expect(mockAgent.pendingInterceptors()).to.be.empty;
  });

  it('surfaces a premature close after the retry budget is exhausted', async () => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      pool.intercept(messageRequest).replyWithError(prematureClose());
    }

    let error;
    try {
      await execute(prompt('Reply briefly.'))(state);
    } catch (caught) {
      error = caught;
    }

    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal('Connection error.');
    expect(error.cause?.cause?.code).to.equal('ERR_STREAM_PREMATURE_CLOSE');
    expect(mockAgent.pendingInterceptors()).to.be.empty;
  });
});
