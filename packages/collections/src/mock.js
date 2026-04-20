import { MockAgent } from 'undici';

export const MULTIPLE_MATCHES = 'MULTIPLE_MATCHES_FOUND';
export const UNKNOWN_PROJECT = 'INVALID_PROJECT_ID';
export const COLLECTION_NOT_FOUND = 'COLLECTION_NOT_FOUND';
export const INVALID_AUTH = 'INVALID_AUTH';

// This is a simple collections API backend to handle the actual logic of a collection
// It is not designed to match lightning in any way
export function API() {
  let collectionsByProject = {};
  let collectionsByName = {};

  // To simulate lightning, a project MUST  be created with a project id
  const createCollection = (projectId, name, values = {}) => {
    (collectionsByProject[projectId] ??= {})[name] = values;
    (collectionsByName[name] ??= []).push(values);
  };

  // Find a collection by name or project id
  const getCollection = (projectId, name) => {
    if (projectId) {
      if (!(projectId in collectionsByProject)) {
        throw new Error(UNKNOWN_PROJECT);
      }
      if (!(name in collectionsByProject[projectId])) {
        throw new Error(COLLECTION_NOT_FOUND);
      }

      return collectionsByProject[projectId][name];
    } else {
      const results = collectionsByName[name] ?? [];
      if (results.length === 0) {
        throw new Error(COLLECTION_NOT_FOUND);
      }
      if (results.length > 1) {
        throw new Error(MULTIPLE_MATCHES);
      }
      return collectionsByName[name][0];
    }
  };

  const reset = () => {
    api.collectionsByProject = collectionsByProject = {};
    api.collectionsByName = collectionsByName = {};
  };

  // Note that is a string store: values are expected to be strings
  const upsert = (projectId, name, key, value) => {
    const col = getCollection(projectId, name);

    col[key] = value;
  };

  const fetch = (projectId, name, key, query = {}) => {
    const { cursor = 0, limit = Infinity } = query;

    const col = getCollection(projectId, name);

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

  const asJSON = (projectId, name, key) => {
    const col = getCollection(projectId, name);
    return JSON.parse(col[key]);
  };
  const count = (projectId, name) => {
    const col = getCollection(projectId, name);
    return Object.keys(col).length;
  };

  // TODO strictly speaking this should support patterns
  // but keeping it super simple in the mock for now
  const remove = (projectId, name, key) => {
    const col = getCollection(projectId, name);

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
    asJSON,
    collectionsByName,
    collectionsByProject,
    count,
    createCollection,
    fetch,
    getCollection,
    remove,
    reset,
    upsert,
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
      const projectId = req.query?.project_id ?? null;
      let body;
      let statusCode = 200;

      if (key) {
        const collection = api.getCollection(projectId, name);
        const result = collection[key];
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

        const { items, cursor: finalCursor } = api.fetch(projectId, name, key, {
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
      if (e.message === COLLECTION_NOT_FOUND || e.message === UNKNOWN_PROJECT) {
        return { statusCode: 404 };
      }
      if (e.message === MULTIPLE_MATCHES) {
        return { statusCode: 409 };
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
      const projectId = req.query?.project_id ?? null;

      for (const { key, value } of body.items) {
        // TODO error if key or value not set
        api.upsert(projectId, name, key, value);
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
      if (e.message === MULTIPLE_MATCHES) {
        return { statusCode: 409 };
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
      const projectId = req.query?.project_id ?? null;
      if (!key) {
        const params = new URLSearchParams(req.query || req.path.split('?')[1]);
        key = params.get('key') ?? '*';
      }

      const keys = api.remove(projectId, name, key);

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
      if (e.message === MULTIPLE_MATCHES) {
        return { statusCode: 409 };
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
