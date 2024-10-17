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
      getClient(state),
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
 * @param keygen - a function which generates a key for each value. Pass a string to set a static key for a single item.
 * @param values - an array of values to set, or a single value.
 * @example <caption>Set a number of values using each value's id property as a key</caption>
 * set('my-collection', (item) => item.id, $.data)
 * @example <caption>Set a number of values, generating an id from a string template</caption>
 * set('my-collection', (item) => `${item.category}-${Date.now()}`, $.data)
 * @example <caption>Set a single value with a static key</caption>
 * set('my-collection', 'city-codes', { NY: 'New York', LDN: 'London' }})
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

    const response = await util.request(state, getClient(state), resolvedName, {
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
      getClient(state),
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
      getClient(state),
      `${resolvedName}/${key}`
    );
    await util.streamResponse(response, async ({ key, value }) => {
      await callback(state, key, value);
    });

    return state;
  };
}
