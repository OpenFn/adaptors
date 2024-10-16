import { Client, MockAgent } from 'undici';

const COLLECTION_NOT_FOUND = 'COLLECTION_NOT_FOUND';

// This is a simple collections API backend to handle the actual logic of a collection
// It is not designed to match lightning in any way
export function API() {
  let collections = {};

  const createCollection = (name, values = {}) => {
    collections[name] = values;
  };

  const reset = () => {
    collections = api.collections = {};
  };

  const upsert = (name, key, value) => {
    if (!(name in collections)) {
      throw new Error(COLLECTION_NOT_FOUND);
    }

    collections[name][key] = value;
  };

  const fetch = (name, key, query) => {
    if (!(name in collections)) {
      throw new Error(COLLECTION_NOT_FOUND);
    }

    const col = collections[name];
    const results = [];

    const regex = new RegExp(key.replace('*', '(.*)'));
    for (const key in col) {
      if (regex.test(key)) {
        results.push({
          key,
          value: col[key],
        });
      }
    }

    return { results };
  };

  const remove = (name, key) => {
    if (!(name in collections)) {
      throw new Error(COLLECTION_NOT_FOUND);
    }
    const col = collections[name];

    delete col[key];
  };

  const api = {
    collections,
    createCollection,
    reset,
    upsert,
    fetch,
    remove,
  };

  return api;
}

// This creates a mock lightning server
// It should present the same rest API as lightning, but can be implemented however we like
export function createServer(url = 'https://app.openfn.org') {
  const agent = new MockAgent();
  agent.disableNetConnect();

  const mockPool = agent.get(url);

  const api = new API();

  // Get request handler
  const get = req => {
    try {
      let [_blank, _collections, name, key] = req.path.split('/');

      if (!key) {
        key = '*';
      }
      const body = api.fetch(name, key);
      return {
        statusCode: 200,
        data: JSON.stringify(body),
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
      };
    } catch (e) {
      if (e.message === COLLECTION_NOT_FOUND) {
        return { statusCode: 404 };
      }
    }
    return { statusCode: 500 };
  };

  const post = req => {
    const body = JSON.parse(req.body);
    return { statusCode: 200 };
  };

  mockPool
    .intercept({ method: 'get', path: /collections\/./ })
    .reply(get)
    .persist();
  mockPool
    .intercept({ method: 'post', path: /collections\/./ })
    .reply(post)
    .persist();

  return {
    api,
    // Util API for tests
    request: path =>
      mockPool.request({
        method: 'GET',
        origin: url,
        path,
      }),
    // stream: (method, path) =>
    //   mockPool.stream({
    //     method,
    //     origin: url,
    //     path,
    //   }),
  };
}
