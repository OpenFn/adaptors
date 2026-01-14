import { setMockClient, mGetString, mSetString } from '../src/index.js';
import { expect } from 'chai';

let mockData = {};

const mockClient = {
  mSet: async (args) => {
    // args is expected to be flattened array ['key1', 'val1', 'key2', 'val2']
    if (Array.isArray(args)) {
      for (let i = 0; i < args.length; i += 2) {
        mockData[args[i]] = args[i + 1];
      }
    } else {
      Object.assign(mockData, args);
    }
    return 'OK';
  },
  mGet: async (keys) => {
    return keys.map(k => mockData[k] || null);
  },
  connect: async () => {},
  disconnect: async () => {},
  flushDb: async () => { mockData = {}; },
  isReady: true,
  on: () => mockClient // chainable
};

describe('mGetSetString', () => {
  before(async () => {
    setMockClient(mockClient);
  });

  beforeEach(() => {
    mockData = {};
  });

  it('mSetString and mGetString', async () => {
    await mSetString({ a: '1', b: '2' })({ configuration: {} });

    const state = await mGetString(['a', 'b'])({ configuration: {} });

    expect(state.data).to.deep.equal(['1', '2']);
  });
});