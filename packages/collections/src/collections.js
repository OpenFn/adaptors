import undici from 'undici';
import { expandReferences } from '@openfn/language-common/util';
import * as util from './utils';

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
 * Get one more values from a collection. For large collections, use each.
 * options can be a string key name (including wildcards), or an object
 * { key, created_after, created_before, inserted_before, inserted_after }
 * Throws if created AND inserted are specified
 * If no wild card or query included, the value will be written to state.data (or throw if not found)
 * If a wild card or query is included, an array of values will be written to state.data
 */
// TOOD: logging
export function get(name, query = {}, options = {}) {
  return async state => {
    const [resolvedName, resolvedQuery] = expandReferences(state, name, query);

    const { key } = util.expandQuery(resolvedQuery);

    // TODO maybe add query options here
    // I haven't really given myself much space for this in the api
    const response = await util.request(
      state,
      getClient(),
      `${resolvedName}/${key}`
    );
    // if this is one item, just return it, nice and easy
    let data;
    if (!key.match(/\*/) || Object.keys(resolvedQuery).length === 0) {
      [data] = (await response.body.json()).results;
    } else {
      data = [];
      // otherwise build a response array
      await util.streamResponse(response, item => {
        data.push(item);
      });
    }

    state.data = data;
    return state;
  };
}

/**
 * Upserts one or more values, as a { key, value } pair, to the named collection
 * If any errors are returned by the server, this will be thrown
 */
// TOOD: logging
export function set(name, data) {
  return async state => {
    const [resolvedName, resolvedData] = expandReferences(state, name, data);

    const dataArray = Array.isArray(resolvedData)
      ? resolvedData
      : [resolvedData];

    const response = await util.request(state, getClient(), resolvedName, {
      method: 'POST',
      body: JSON.stringify(dataArray),
      heeaders: {
        'content-type': 'application/json',
      },
    });

    // TODO - check if the response contains errors

    return state;
  };
}

/**
 * Remove one or more values from the collection
 * Options can be a string key or a query object
 */
export function remove(name, query = {}, options = {}) {
  return async state => {
    const [resolvedName, resolvedQuery] = expandReferences(state, name, query);

    const { key } = util.expandQuery(resolvedQuery);

    // TODO maybe add query options here
    // I haven't really given myself much space for this in the api
    const response = await util.request(
      state,
      getClient(),
      `${resolvedName}/${key}`,
      {
        method: 'DELETE',
      }
    );

    return state;
  };
}

/**
 * Iterate over values in a collection which match the query
 * Query can be a wildcard string or object
 * The callback will be invoked with { key, value } on state.data
 * Or what if we do `(state, key, value)` ? because the first thing you need to do
 * is deconstruct anyway
 */
export function each(name, query = {}, callback = {}) {
  return async state => {
    const [resolvedName, resolvedQuery] = expandReferences(state, name, query);

    const { key } = util.expandQuery(resolvedQuery);

    // TODO maybe add query options here
    // I haven't really given myself much space for this in the api
    const response = await util.request(
      state,
      getClient(),
      `${resolvedName}/${key}`
    );

    await util.streamResponse(response, ({ key, value }) => {
      callback(state, key, value);
    });

    return state;
  };
}

export {
  dataPath,
  dataValue,
  dateFns,
  group,
  cursor,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
