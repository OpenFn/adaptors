import { MockAgent } from 'undici';

const COLLECTION_NOT_FOUND = 'COLLECTION_NOT_FOUND';
const INVALID_AUTH = 'INVALID_AUTH';

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

  // internal dev only api
  const byKey = (name, key) => {
    return collections[name][key];
  };

  // TODO strictly speaking this should support patterns
  // but keeping it super simple in the mock for now
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
    byKey,
  };

  return api;
}

// naive little path parser
const parsePath = path => {
  let [_collections, name, key] = path.split('/');
  return { name, key };
};

const assertAuth = req => {
  const auth = req.headers.Authorization;
  if (!auth) {
    throw new Error(INVALID_AUTH);
  }
};

// This creates a mock lightning server
// It should present the same rest API as lightning, but can be implemented however we like
// TODO add mock auth here
// basically it needs to see if there is a jwt in the header for each request
export function createServer(url = 'https://app.openfn.org') {
  const agent = new MockAgent();
  agent.disableNetConnect();

  const mockPool = agent.get(url);

  const api = new API();

  const get = req => {
    try {
      assertAuth(req);
    } catch (e) {
      return { statusCode: 403 };
    }

    try {
      let { name, key } = parsePath(req.path);
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
    try {
      assertAuth(req);
    } catch (e) {
      return { statusCode: 403 };
    }

    try {
      const { name, key } = parsePath(req.path);
      const body = JSON.parse(req.body);

      for (const { key, value } of body) {
        // TODO error if key or value not set
        api.upsert(name, key, value);
      }

      // TODO return upserted summary and errors
      return { statusCode: 200 };
    } catch (e) {
      if (e.message === COLLECTION_NOT_FOUND) {
        return { statusCode: 404 };
      }
    }
  };

  const remove = req => {
    try {
      assertAuth(req);
    } catch (e) {
      return { statusCode: 403 };
    }

    try {
      const { name, key } = parsePath(req.path);

      api.remove(name, key);

      return { statusCode: 200 };
    } catch (e) {
      if (e.message === COLLECTION_NOT_FOUND) {
        return { statusCode: 404 };
      }
    }
  };

  mockPool
    .intercept({ method: 'get', path: /collections\/./ })
    .reply(get)
    .persist();
  mockPool
    .intercept({ method: 'post', path: /collections\/./ })
    .reply(post)
    .persist();
  mockPool
    .intercept({ method: 'delete', path: /collections\/./ })
    .reply(remove)
    .persist();

  return {
    api,
    // Util API for tests (roughly matches the unidici api)
    request: ({ method, path, data, ...rest }) => {
      const opts = {
        method,
        path,
        origin: url,
        headers: {
          // TODO this maybe needs to be base 64 encoded
          Authorization: `Bearer abc`,
        },
        ...rest,
      };
      if (data) {
        Object.assign(opts.headers, {
          'content-type': 'application/json',
        });
        opts.body = JSON.stringify(data);
      }
      return mockPool.request(opts);
    },
    // stream: (method, path) =>
    //   mockPool.stream({
    //     method,
    //     origin: url,
    //     path,
    //   }),
  };
}
