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

  // This is a string store: values are expected to be strings
  const upsert = (name, key, value) => {
    if (!(name in collections)) {
      throw new Error(COLLECTION_NOT_FOUND);
    }

    collections[name][key] = value;
  };

  const fetch = (name, key, query = {}) => {
    const { cursor = 0, limit = Infinity } = query;

    if (!(name in collections)) {
      throw new Error(COLLECTION_NOT_FOUND);
    }

    const col = collections[name];
    const items = [];

    let idx = 0;
    let count = 0;

    const regex = new RegExp(key.replace('*', '(.*)'));
    for (const key in col) {
      if (idx >= cursor) {
        if (regex.test(key)) {
          count++;
          items.push({
            key,
            value: col[key],
          });
        }
      }
      idx++;

      if (count >= limit) {
        break;
      }
    }

    const result = { items, count };

    // If there are more items, include a cursor
    // (this isn't super accurate because it doesn't take filters into account)
    if (idx < Object.keys(col).length) {
      result.cursor = idx;
    }
    return result;
  };

  // internal dev only api
  const byKey = (name, key) => {
    if (!(name in collections)) {
      throw new Error(COLLECTION_NOT_FOUND);
    }
    return collections[name][key];
  };
  const asJSON = (name, key) => {
    if (!(name in collections)) {
      throw new Error(COLLECTION_NOT_FOUND);
    }
    return JSON.parse(collections[name][key]);
  };
  const count = name => {
    if (!(name in collections)) {
      throw new Error(COLLECTION_NOT_FOUND);
    }
    return Object.keys(collections[name]).length;
  };

  // TODO strictly speaking this should support patterns
  // but keeping it super simple in the mock for now
  const remove = (name, key) => {
    if (!(name in collections)) {
      throw new Error(COLLECTION_NOT_FOUND);
    }
    const col = collections[name];

    const regex = new RegExp(key.replace('*', '(.*)'));
    const removed = [];
    for (const key in col) {
      if (regex.test(key)) {
        delete col[key];
        removed.push(key);
      }
    }

    return removed;
  };

  const api = {
    collections,
    createCollection,
    reset,
    upsert,
    fetch,
    remove,
    byKey,
    asJSON,
    count,
  };

  return api;
}

// naive little path parser
const parsePath = path => {
  if (!path.startsWith('/')) {
    // eslint-disable-next-line no-param-reassign
    path = `/${path}`;
  }
  // eslint-disable-next-line no-param-reassign
  path = path.split('?')[0];
  let [_, _collections, name, key] = path.split('/');
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

      let body;
      let statusCode = 200;

      if (key) {
        // get one
        const result = api.byKey(name, key);
        if (!result) {
          body = {};
          statusCode = 204;
        } else {
          body = {
            key,
            value: result,
          };
        }
      } else {
        // get many

        // TODO a little confused about undici's handling of query
        const params = new URLSearchParams(req.query || req.path.split('?')[1]);
        key = params.get('key') ?? '*';
        const limit = params.get('limit') ?? Infinity;
        const cursor = params.get('cursor') ?? 0;

        const { items, cursor: finalCursor } = api.fetch(name, key, {
          limit,
          cursor,
        });
        body = {
          cursor: (finalCursor && `${finalCursor}`) ?? null, // TODO maybe base64 encode?
          items,
        };
      }

      return {
        statusCode,
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

    let upserted = 0;
    const errors = [];

    try {
      const { name, key } = parsePath(req.path);
      const body = JSON.parse(req.body);

      for (const { key, value } of body.items) {
        // TODO error if key or value not set
        api.upsert(name, key, value);
        upserted++;
      }

      return {
        statusCode: 200,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: JSON.stringify({ upserted, errors }),
      };
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
      let { name, key } = parsePath(req.path);
      if (!key) {
        const params = new URLSearchParams(req.query || req.path.split('?')[1]);
        key = params.get('key') ?? '*';
      }

      const keys = api.remove(name, key);

      return {
        statusCode: 200,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: JSON.stringify({ deleted: keys.length, keys }),
      };
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
    // export the agent for use with setGlobalDispatcher()
    // (used in CLI tests)
    agent,
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
