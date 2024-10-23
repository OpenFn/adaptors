import nodepath from 'node:path';
import undici from 'undici';
import { throwError, expandReferences } from '@openfn/language-common/util';
import chain from 'stream-chain';
import parser from 'stream-json';
import Pick from 'stream-json/filters/Pick';
import streamArray from 'stream-json/streamers/StreamArray';

import { createServer } from './mock';

export { createServer as createMockServer };

let client;

const getClient = state => {
  if (!client) {
    const baseUrl =
      state.configuration?.collections_endpoint ?? 'https://app.openfn.org';
    client = new undici.client(baseUrl);
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
 * @property {string} updatedBefore - matches values that were updated before the start of the provided date
 * @property {string} updatedAfter - matches values that were updated after the end of the provided date*
 */

/**
 * Fetch one or more values from a collection.
 * For large datasets, we recommend using each(), which streams data.
 * You can pass a specific key as a string to only fetch one item, or pass a query
 * with a key-pattern or a date filter.
 * @public
 * @function
 * @param {string} name - The name of the collection to fetch from
 * @param {string|QueryOptions} query - A string key or key pattern (with wildcards '*') to fetch, or a query object
 * @state data - the downloaded values as an array unless a specific string was specified
 * @example <caption>Get a specific value from a collection</caption>
 * collections.get('my-collection', '556e0a62')
 * @example <caption>Get a range of values from a collection with a key pattern</caption>
 * collections.get('my-collection', '2024*')
 * @example <caption>Get all values created since the end of January 2024</caption>
 * collections.get('my-collection', { createdAfter: '202401')
 */
export function get(name, query = {}) {
  return async state => {
    const [resolvedName, resolvedQuery] = expandReferences(state, name, query);

    const { key, ...rest } = expandQuery(resolvedQuery);

    // TODO maybe add query options here
    // I haven't really given myself much space for this in the api
    const response = await request(
      state,
      getClient(state),
      `${resolvedName}/${key}`,
      { query: rest }
    );

    let data;
    if (!key.match(/\*/) || Object.keys(resolvedQuery).length === 0) {
      // If one specific item was requested, write it straight to state.data
      [data] = (await response.body.json()).results;
      console.log(`Fetched "${key}" from collection "${name}"`);
    } else {
      // build a response array
      data = [];
      console.log(`Downloading data from collection "${name}"...`);
      await streamResponse(response, item => {
        data.push(item);
      });
      console.log(`Fetched "${data.length}" values from collection "${name}"`);
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
 * @param keygen - a function which generates a key for each value. Pass a string to set a static key for a single item.
 * @param values - an array of values to set, or a single value.
 * @example <caption>Set a number of values using each value's id property as a key</caption>
 * collections.set('my-collection', (item) => item.id, $.data)
 * @example <caption>Set a number of values, generating an id from a string template</caption>
 * collections.set('my-collection', (item) => `${item.category}-${Date.now()}`, $.data)
 * @example <caption>Set a single value with a static key</caption>
 * collections.set('my-collection', 'city-codes', { NY: 'New York', LDN: 'London' }})
 */
export function set(name, keyGen, values) {
  return async state => {
    const [resolvedName, resolvedValues] = expandReferences(
      state,
      name,
      values
    );

    const dataArray = Array.isArray(resolvedValues)
      ? resolvedValues
      : [resolvedValues];

    const keyGenFn = typeof keyGen === 'string' ? () => keyGen : keyGen;

    const pairs = dataArray.map(value => ({ key: keyGenFn(value), value }));

    console.log(`Setting ${pairs.length} values in collection "${name}"`);

    const response = await request(state, getClient(state), resolvedName, {
      method: 'POST',
      body: JSON.stringify(pairs),
      heeaders: {
        'content-type': 'application/json',
      },
    });

    // TODO - check if the response contains errors
    // console.log(`Succesfully set ${res.count} values`);

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
 * collections.remove('my-collection', { createdAfter: '202401')
 */
export function remove(name, query = {}, options = {}) {
  return async state => {
    const [resolvedName, resolvedQuery] = expandReferences(state, name, query);

    const { key, ...rest } = expandQuery(resolvedQuery);

    // TODO maybe add query options here
    // I haven't really given myself much space for this in the api
    const response = await request(
      state,
      getClient(state),
      `${resolvedName}/${key}`,
      {
        method: 'DELETE',
        query: rest,
      }
    );

    return state;
  };
}

/**
 * Iterate over all values in a collection which match the provided query.
 * each() maintains a low memory footprint by streaming items individually.
 * You can pass a string key-pattern as a query, or pass a query object.
 * The callback function will be invoked for each value with three parameters:
 * `state`, `value` and `key`.
 * @public
 * @function
 * @param {string} name - The name of the collection to remove from
 * @param {string|QueryOptions} query - A string key or key pattern (with wildcards '*') to remove, or a query object
 * @param {function} callback - A callback invoked for each item `(state,  value, key) => void`
 * @example <caption>Iterate over a range of values with wildcards</caption>
 * collections.each('my-collection', 'record-2024*-appointment-*', (state, value, key) => {
 *   state.cumulativeCost += value.cost;
 * })
 * @example <caption>Iterate over a range of values with date filters</caption>
 * collections.each('my-collection', { updatedBefore: new Date().toString() }, (state, value, key) => {
 *   state.cumulativeCost += value.cost;
 * })
 */
export function each(name, query = {}, callback = {}) {
  return async state => {
    const [resolvedName, resolvedQuery] = expandReferences(state, name, query);

    const { key, ...rest } = expandQuery(resolvedQuery);

    // TODO maybe add query options here
    // I haven't really given myself much space for this in the api
    const response = await request(
      state,
      getClient(state),
      `${resolvedName}/${key}`,
      { query: rest }
    );

    await streamResponse(response, async ({ key, value }) => {
      await callback(state, value, key);
    });

    return state;
  };
}

export const streamResponse = async (response, onValue) => {
  const pipeline = chain([
    response.body,
    parser(),
    new Pick({ filter: 'results' }),
    new streamArray(),
  ]);

  for await (const { key, value } of pipeline) {
    await onValue(value);
  }
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
  updatedBefore: 'updated_before',
  updatedAfter: 'updated_after',
};

export const parseQuery = (options = {}) => {
  return Object.keys(options.query ?? {}).reduce((result, next) => {
    const key = queryMaps[next] ?? next;
    result[key] = options.query[next];
    return result;
  }, {});
};

export const request = (state, client, path, options = {}) => {
  if (!state.configuration.collections_token) {
    throwError('INVALID_AUTH', {
      description: 'No access key provided for collection request',
      fix: 'Ensure the "collections_token" value is set on state.configuration',
      path,
    });
  }

  const headers = {
    Authorization: `Bearer ${state.configuration.collections_token}`,
  };
  Object.assign(headers, options?.headers);

  const { headers: _h, query: _q, ...otherOptions } = options;
  const query = parseQuery(options.query);

  return client.request({
    path: nodepath.join('collections', path),
    headers,
    method: 'GET',
    query,
    ...otherOptions,
  });
};
