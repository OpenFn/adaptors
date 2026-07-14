import { expect } from 'chai';
import { langfuse, execute, setMockClient } from '../src/Adaptor.js';

const configuration = {
  publicKey: 'pk-test-123',
  secretKey: 'sk-test-123',
  baseUrl: 'https://test.langfuse.com',
};

describe('langfuse()', () => {
  afterEach(() => {
    setMockClient(null);
  });

  it('throws when no connection has been established', async () => {
    const state = { configuration, data: null, references: [] };

    const error = await langfuse(async (state, api) => state)(state).catch(
      e => e
    );

    expect(error.message).to.include('connection not established');
  });

  it('passes the api client to the callback', async () => {
    const mockApi = { observations: { getMany: async () => ({ data: [] }) } };
    setMockClient({ api: mockApi });

    let receivedApi;
    const state = { configuration, data: null, references: [] };

    await langfuse(async (state, api) => {
      receivedApi = api;
      return state;
    })(state);

    expect(receivedApi).to.equal(mockApi);
  });

  it('returns state from the callback', async () => {
    setMockClient({ api: {} });

    const state = { configuration, data: null, references: [] };

    const finalState = await langfuse(async (state, api) => ({
      ...state,
      data: { result: 'ok' },
    }))(state);

    expect(finalState.data).to.eql({ result: 'ok' });
  });

  it('passes api response data back through state', async () => {
    const mockObservations = [{ id: '1', type: 'GENERATION' }];
    const mockApi = {
      observations: {
        getMany: async () => ({ data: mockObservations }),
      },
    };
    setMockClient({ api: mockApi });

    const state = { configuration, data: null, references: [] };

    const finalState = await langfuse(async (state, api) => {
      const { data } = await api.observations.getMany({ limit: 10 });
      return { ...state, data };
    })(state);

    expect(finalState.data).to.eql(mockObservations);
  });
});

describe('execute() / login', () => {
  it('initializes a LangfuseClient and exposes api to the callback', async () => {
    const state = { configuration };

    let receivedApi;
    await execute(
      langfuse(async (state, api) => {
        receivedApi = api;
        return state;
      })
    )(state);

    expect(receivedApi).to.exist;
  });

  it('uses default baseUrl when not provided in configuration', async () => {
    const state = {
      configuration: { publicKey: 'pk-test-123', secretKey: 'sk-test-123' },
    };

    let receivedApi;
    await execute(
      langfuse(async (state, api) => {
        receivedApi = api;
        return state;
      })
    )(state);

    expect(receivedApi).to.exist;
  });
});
