import nodepath from 'node:path';
import undici from 'undici';
import { throwError, expandReferences } from '@openfn/language-common/util';
import parser from 'stream-json';

import { createServer } from './mock';

export { createServer as createMockServer };

let client;

const getClient = state => {
  if (!client) {
    if (!state.configuration?.collections_endpoint) {
      throw new Error('ERROR: collections_endpoint not set');
    }

    const url = new URL(state.configuration.collections_endpoint);
    client = new undici.Client(url.origin);
  }
  return client;
};

export const setMockClient = mockClient => {
  client = mockClient;
};

/**
 * Query options. All dates should be parseable as ISO 8601 strings, see https://simple.wikipedia.org/wiki/ISO_8601
 * @typedef {Object} QueryOptions
 * @public
 * @property {string} key - key or key pattern to match against. Patterns support wildcards,  eg `2024-01*`
 * @property {string} createdBefore - matches values that were created before the start of the provided date
 * @property {string} createdAfter - matches values that were created after the end of the provided date
 * @property {number} limit - limit the maximum amount of results. If Infinity or unset, all items will be fetched. Default: Infnity.
 * @property {number} pageSize - specify the number of values downloaded per page (or chunk). Default 1000.
 * @property {string} cursor - set the cursor position to start searching from a specific index.
 */

/**
 * Fetch one or more values from a collection.
 * For large datasets, we recommend using each(), which streams data.
 * You can pass a specific key as a string to only fetch one item, or pass a query
 * with a key-pattern or a date filter.
 * If not all matching values are returned, the cursor position is written to state.data
 * @public
 * @function
 * @param {string} name - The name of the collection to fetch from
 * @param {string|QueryOptions} query - A string key or key pattern (with wildcards '*') to fetch, or a query object
 * @state data - the downloaded values as an array unless a specific key was specified, in which case state.data is the value
 * @example <caption>Get a specific value from a collection</caption>
 * collections.get('my-collection', '556e0a62')
 * @example <caption>Get a range of values from a collection with a key pattern</caption>
 * collections.get('my-collection', '2024*')
 * @example <caption>Get all values created since the end of January 2024</caption>
 * collections.get('my-collection', { createdAfter: '202401'})
 */
export function get(name, query = {}) {
  return async state => {
    let [resolvedName, resolvedQuery] = expandReferences(state, name, query);
    if (typeof resolvedQuery === 'string') {
      resolvedQuery = { key: resolvedQuery };
    }
    const {
      key = '*',
      limit,
      pageSize,
      ...userQuery
    } = expandQuery(resolvedQuery);

    console.log(`Collections: Downloading data from "${name}"...`);
    let data;

    // Request multiple mode if the query includes a wildcard or time filters
    if (key.match(/\*/) || Object.keys(userQuery).length) {
      data = [];

      // scope the state to preserve data
      const scopedState = {
        ...state,
        data: {},
      };

      await each(name, resolvedQuery, (state, value, key) => {
        data.push({ value, key });
      })(scopedState);

      console.log(
        `Collections: Fetched total of ${data.length} values from "${name}"`
      );

      data.cursor = scopedState.data.cursor;
    }
    // Otherwise request single mode
    else {
      const response = await request(
        state,
        getClient(state),
        `${resolvedName}/${key}`
      );

      if (response.statusCode === 204) {
        data = {};
        console.warn(`Collections: Key "${key}" not found in "${name}"`);
      } else {
        try {
          // write it straight to state.data
          const body = await response.body.json();
          data = JSON.parse(body.value);
        } catch (e) {
          console.error('Unexpected error parsing response data!');
          throw e;
        }
      }
    }
    state.data = data;
    return state;
  };
}

/**
 * Adds one or more values to a collection. If a key already exists, its value will
 * be replaced by the new value.
 * You can pass a string key and a single value, or a key generator function and an array of values.
 * The function will be called for each value, passing each value as the first argument, and should return
 * a string key.
 * @public
 * @function
 * @param {string} name - The name of the collection to fetch from
 * @param keygen - a function which generates a key for each value: (value, index) => key. Pass a string to set a static key for a single item.
 * @param values - an array of values to set, or a single value.
 * @example <caption>Set a number of values using each value's id property as a key</caption>
 * collections.set('my-collection', (item) => item.id, $.data)
 * @example <caption>Set a number of values, generating an id from a string template</caption>
 * collections.set('my-collection', (item) => `${item.category}-${Date.now()}`, $.data)
 * @example <caption>Set a single value with a static key</caption>
 * collections.set('my-collection', 'city-codes', { NY: 'New York', LDN: 'London' })
 */
export function set(name, keyGen, values) {
  let argCount = arguments.length;
  return async state => {
    if (argCount < 3) {
      const e = new Error('ILLEGAL_ARGUMENTS');
      e.description = 'Insufficient arguments passed to set()';
      e.fix =
        'Make sure to pass three arguments to: set(name, key/keygen, values)';
      e.args = {
        name,
        keyGen,
        values,
      };
      throw e;
    }

    const batchSize = 1000;

    const [resolvedName, resolvedValues] = expandReferences(
      state,
      name,
      values
    );

    let kvPairs;
    if (typeof keyGen === 'string' && Array.isArray(resolvedValues)) {
      // Special case where a single item with an array value is being set
      kvPairs = [{ key: keyGen, value: JSON.stringify(resolvedValues) }];
    } else {
      const dataArray = Array.isArray(resolvedValues)
        ? resolvedValues
        : [resolvedValues];

      const keyGenFn = typeof keyGen === 'string' ? () => keyGen : keyGen;

      // Otherwise we convert the incoming values into an array of key/value pairs
      // Note that we may need to serialize json to string
      // the hardest bit is knowing when to deserialize
      kvPairs = dataArray.map((value, index) => {
        const key = keyGenFn(value, state, index);
        if (typeof key !== 'string') {
          const e = new Error('KEYGEN_ERROR');
          e.description =
            'The key generator function returned a non-string value which is not a valid key';
          e.fix = `The second argument to set() is a key or key-generator function. If you pass a function, make sure the function returns a string (a key). Note that this function is NOT a state reference and does not support lazy state ($)`;
          throw e;
        }
        return {
          key,
          value: JSON.stringify(value),
        };
      });
    }

    while (kvPairs.length) {
      const batch = kvPairs.splice(0, batchSize);

      console.log(
        `Collections: uploading batch of ${batch.length} values to "${name}"...`
      );
      const response = await request(state, getClient(state), resolvedName, {
        method: 'POST',
        body: JSON.stringify({ items: batch }),
        headers: {
          'content-type': 'application/json',
        },
      });

      if (response.statusCode >= 400) {
        console.log(
          `Collections: Error setting ${batch.length} values in "${name}"`
        );
        const text = await response.body.text();
        const e = new Error('ERROR from collections server:' + 400);
        e.body = text;
        throw e;
      }

      const result = await response.body.json();
      console.log(`Collections: set ${result.upserted} values in "${name}"`);

      if (result.error) {
        console.log(`Collections: errors reported on set:`, result.error);
      }
    }

    return state;
  };
}

/**
 * Remove one or more values from a collection.
 * You can pass a specific key as a string to only fetch one item, or pass a query
 * with a key-pattern or a date filter.
 * @public
 * @function
 * @param {string} name - The name of the collection to remove from
 * @param {string|QueryOptions} query - A string key or key pattern (with wildcards '*') to remove, or a query object
 * @example <caption>Remove a specific value from a collection</caption>
 * collections.remove('my-collection', '556e0a62')
 * @example <caption>Remove a range of values from a collection with a key pattern</caption>
 * collections.remove('my-collection', '2024*')
 * @example <caption>Remove all values created since the end of January 2024</caption>
 * collections.remove('my-collection', { createdAfter: '202401'})
 */
export function remove(name, query = {}, options = {}) {
  return async state => {
    let [resolvedName, resolvedQuery] = expandReferences(state, name, query);
    if (typeof resolvedQuery === 'string') {
      resolvedQuery = { key: resolvedQuery };
    }
    const { key, ...rest } = expandQuery(resolvedQuery);

    let q;
    let path = resolvedName;
    if (key.match(/\*/) || Object.keys(rest).length) {
      // request many
      q = resolvedQuery;
    } else {
      // request one
      path = `${resolvedName}/${key}`;
    }
    const response = await request(state, getClient(state), path, {
      method: 'DELETE',
      query: q,
    });
    const result = await response.body.json();
    console.log(`Collections: Removed ${result.deleted} values in "${name}"`);

    return state;
  };
}

/**
 * Iterate over all values in a collection which match the provided query.
 * each() maintains a low memory footprint by streaming items individually.
 * You can pass a string key-pattern as a query, or pass a query object.
 * The callback function will be invoked for each value with three parameters:
 * `state`, `value` and `key`.
 * Changing the page size does not affect the callback function (only one item is
 * ever passed at a time).
 * @public
 * @function
 * @param {string} name - The name of the collection to remove from
 * @param {string|QueryOptions} query - A string key or key pattern (with wildcards '*') to remove, or a query object
 * @param {function} callback - A callback invoked for each item `(state,  value, key) => void`
 * @state data.cursor - if values are still left on the server, a cursor string will be written to state.data
 * @example <caption>Iterate over a range of values with wildcards</caption>
 * collections.each('my-collection', 'record-2024*-appointment-*', (state, value, key) => {
 *   state.cumulativeCost += value.cost;
 * })
 * @example <caption>Iterate over a range of values with date filters</caption>
 * collections.each('my-collection', { createdBefore: new Date().toString() }, (state, value, key) => {
 *   state.cumulativeCost += value.cost;
 * })
 */
export function each(name, query = {}, callback = () => {}) {
  return async state => {
    const [resolvedName, resolvedQuery] = expandReferences(state, name, query);

    let q;
    if (typeof resolvedQuery === 'string') {
      q = { key: resolvedQuery };
    } else {
      q = resolvedQuery;
    }

    const {
      key = '*',
      pageSize = 1000, // this is the backend default. Defaulting it means we can always respect the user limit
      limit = Infinity,
      ...finalQuery
    } = expandQuery(resolvedQuery);
    let { cursor } = resolvedQuery;

    let count = 0;
    do {
      let batchSize = 0;
      const q = {
        ...finalQuery,
        key,
        // Server-side limit is the number of items in a page
        limit:
          limit < Infinity
            ? // if the user requested a limit, ensure we don't get more than this
              Math.min(pageSize, limit - count)
            : // Otherwise the limit is the user-specified page size
              pageSize,
      };

      if (cursor) {
        q.cursor = cursor;
      }
      const response = await request(state, getClient(state), resolvedName, {
        query: q,
      });

      cursor = await streamResponse(response, async ({ key, value }) => {
        batchSize++;
        await callback(state, JSON.parse(value), key);
      });
      count += batchSize;

      console.log(
        `Collections: fetched chunk of ${batchSize} values from "${name}"`
      );
    } while (cursor && count < limit);

    state.data = {
      cursor,
    };

    return state;
  };
}

export const streamResponse = async (response, onValue) => {
  const pipeline = response.body.pipe(parser());

  let isInsideItems = false;
  let cursor;
  const it = pipeline.iterator();

  const waitFor = async (...names) => {
    while (true) {
      const next = await it.next();
      if (next.done) {
        return;
      }
      if (names.includes(next.value.name)) {
        return next;
      }
    }
  };

  for await (const token of it) {
    // This block finds the cursor key and extracts it
    if (!isInsideItems && token.name === 'startKey') {
      const next = await waitFor('keyValue');

      if (next.value.value === 'cursor') {
        const strValue = await waitFor('stringChunk', 'nullValue');
        if (strValue.name === 'nullValue') {
          cursor = null;
          continue;
        }
        cursor = strValue.value.value;
      }

      if (next.value.value === 'items') {
        isInsideItems = true;
        await waitFor('startArray');
      }
    }

    // Parse an item object
    // TODO can we leverage json-stream to just generically parse an object at this point?
    if (isInsideItems && token.name === 'startObject') {
      let key;
      let value;

      while (!key || !value) {
        const nextKey = await waitFor('keyValue');
        if (nextKey.value.value === 'key') {
          key = await waitFor('stringValue');
        }
        if (nextKey.value.value === 'value') {
          value = await waitFor('stringValue');
        }
      }

      await onValue({
        key: key.value.value,
        value: value.value.value,
      });

      await waitFor('endObject');
    }
    if (isInsideItems && token.name === 'endArray') {
      // This doesn't really matter but, just for the record, let's close out the array
      isInsideItems = false;
    }
  }

  return cursor;
};

export const expandQuery = query => {
  let key;

  if (typeof query === 'string') {
    key = query;
    return {
      key,
    };
  }

  return query;
};

const queryMaps = {
  createdBefore: 'created_before',
  createdAfter: 'created_after',
};

export const parseQuery = (options = {}) => {
  return Object.keys(options.query ?? {}).reduce((result, next) => {
    const key = queryMaps[next] ?? next;
    result[key] = options.query[next];
    return result;
  }, {});
};

export const request = async (state, client, path, options = {}) => {
  if (!state.configuration.collections_token) {
    throwError('INVALID_AUTH', {
      description: 'No access key provided for collection request',
      fix: 'Ensure the "collections_token" value is set on state.configuration',
      path,
    });
  }

  const basePath = new URL(state.configuration.collections_endpoint).pathname;

  const headers = {
    Authorization: `Bearer ${state.configuration.collections_token}`,
  };
  Object.assign(headers, options?.headers);

  const { headers: _h, query: _q, ...otherOptions } = options;
  const query = parseQuery(options);
  const args = {
    path: nodepath.join(basePath, path),
    headers,
    method: 'GET',
    query,
    ...otherOptions,
  };

  const response = await client.request(args);
  if (response.statusCode >= 400) {
    await handleError(response, path, state.configuration.collections_endpoint);
  }
  return response;
};

export const handleError = async (response, path, endpoint) => {
  if (response.statusCode === 404) {
    const [collection] = path.split('/');
    console.error(`Error! Collection ${collection} does not exist`);

    // 404 means the collection doesn't exist
    const e = new Error('COLLECTION_NOT_FOUND');
    e.code = 'COLLECTION_NOT_FOUND';
    e.description = `The collection "${collection}" does not exist`;
    e.collection = collection;
    e.endpoint = endpoint;
    e.fix =
      'Make sure the collection name is correct, and has been created by a system administrator';
    throw e;
  }
  // Otherwise throw a general error
  const e = new Error('COLLECTIONS_ERROR');
  e.code = response.statusCode;
  e.description = 'The server returned an error, see attached message';
  e.message = await response.body.text();
  throw e;
};
