import { expect } from 'chai';
import {
  MockAgent,
  getGlobalDispatcher,
  setGlobalDispatcher,
} from 'undici';
import {
  appendValues,
  execute,
  getValues,
} from '../src/Adaptor.js';

const apiOrigin = 'https://sheets.googleapis.com';
const getRequest = {
  path: /\/v4\/spreadsheets\/sheet123\/values\//,
  method: 'GET',
};
const appendRequest = {
  path: /\/v4\/spreadsheets\/sheet123\/values\/.*:append/,
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
    pool.intercept(getRequest).replyWithError(prematureClose());
    pool.intercept(getRequest).reply(200, { values: [['recovered']] }, {
      headers: { 'content-type': 'application/json' },
    });

    const result = await execute(getValues('sheet123', 'Sheet1!A1'))(state);

    expect(result.data).to.deep.equal({ values: [['recovered']] });
    expect(mockAgent.pendingInterceptors()).to.be.empty;
  });

  it('surfaces a premature close after the retry budget is exhausted', async () => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      pool.intercept(getRequest).replyWithError(prematureClose());
    }

    let error;
    try {
      await execute(getValues('sheet123', 'Sheet1!A1'))(state);
    } catch (caught) {
      error = caught;
    }

    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal('fetch failed');
    expect(error.cause?.cause?.code).to.equal('ERR_STREAM_PREMATURE_CLOSE');
    expect(mockAgent.pendingInterceptors()).to.be.empty;
  });

  it('does not replay appendValues after an ambiguous transport failure', async () => {
    pool.intercept(appendRequest).replyWithError(prematureClose());
    pool.intercept(appendRequest).reply(200, { updates: {} }, {
      headers: { 'content-type': 'application/json' },
    });

    let error;
    try {
      await execute(
        appendValues('sheet123', 'Sheet1!A1:B1', [['a', 'b']]),
      )(state);
    } catch (caught) {
      error = caught;
    }

    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal('fetch failed');
    expect(mockAgent.pendingInterceptors()).to.have.lengthOf(1);
  });
});
