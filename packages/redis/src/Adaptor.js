import { expandReferences } from '@openfn/language-common/util';
import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';

import { createClient } from 'redis';
import * as util from './Utils';

let client = null;

export const setMockClient = fakeClient => (client = fakeClient);

const connect = async state => {
  const {
    username,
    password,
    host,
    port = 16552,
    database,
  } = state.configuration;

  client = await createClient({
    username,
    password,
    database,
    socket: { host, port },
  })
    .on('error', err => {
      console.error('Redis Client Error', err);
      throw err;
    })
    .connect();

  if (client.isReady) console.log('Client is connected');

  return state;
};

const disconnect = async state => {
  await client.disconnect();
  if (!client.isReady) console.log('Client is disconnected');
  return state;
};

/**
 * Options provided to the scan function
 * @typedef {Object} ScanOptions
 * @public
 * @property {integer} [cursor=0] - A numeric value used to continue the iteration from where it left off. Initially, you start with 0.
 * @property {string} [type='hash'] - Limits the keys returned to those of a specified type (e.g., string, list, set, hash, etc.).
 * @property {integer} count - A hint to the server about how many elements to return in the call (default is 10).
 */

/**
 * State object
 * @typedef {Object} RedisState
 * @property data - the parsed response body
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, creates and disconnect client
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  return state => commonExecute(connect, ...operations, disconnect)(state);
}

/**
 * Get the string value of a key
 * If the key does not exist the special value null is returned.
 * An error is returned if the value stored at key is not a string, because GET only handles string values.
 * @example
 * get("patient");
 * @function
 * @public
 * @param {string} key - The name of the key
 * @state {RedisState}
 * @returns {Operation}
 */
export function get(key) {
  return async state => {
    const [resolvedKey] = expandReferences(state, key);
    console.log(`Fetching value of '${resolvedKey}' key`);
    const result = await client.get(resolvedKey);

    return composeNextState(state, result);
  };
}

/**
 * HGET return the value associated with a specific field in a hash stored at a specified key.
 * @example
 * hget("patient", "name");
 * @function
 * @public
 * @param {string} key - The name of the key
 * @param {string} field - Field
 * @state {RedisState}
 * @returns {Operation}
 */
export function hget(key, field) {
  return async state => {
    const [resolvedKey, resolvedField] = expandReferences(state, key, field);
    util.asserthGetArgs(resolvedKey, resolvedField);

    console.log(`Fetching value of '${resolvedKey}' key`);
    const result = await client.hGet(resolvedKey, resolvedField);
    console.log({ result });

    return composeNextState(state, result);
  };
}
/**
 * HGETALL returns all fields and values of the hash stored at a specified key.
 * In the returned value, every field name is followed by its value, so the length of the reply is twice the size of the hash.
 * @example
 * hGetAll("noderedis:animals:1");
 * @function
 * @public
 * @param {string} key - The name of the key
 * @state {RedisState}
 * @returns {Operation}
 */
export function hGetAll(key) {
  return async state => {
    const [resolvedKey] = expandReferences(state, key);

    console.log(`Fetching value of '${resolvedKey}' key`);
    const result = await client.hGetAll(resolvedKey);

    return composeNextState(state, result);
  };
}
/**
 * Set the string value of a key.
 * If the key already exists, its value is updated. If the key doesn't exist, a new key-value pair is created.
 * @example
 * set("patient", "mtuchi");
 * @function
 * @public
 * @param {string} key - The name of the key
 * @param {string} value - The value to set
 * @state {RedisState}
 * @returns {Operation}
 */
export function set(key, value) {
  return async state => {
    const [resolvedKey, resolvedValue] = expandReferences(state, key, value);
    util.assertSetArgs(resolvedKey, resolvedValue);

    console.log(`Setting '${resolvedValue}' value of '${resolvedKey}' key`);
    await client.set(resolvedKey, resolvedValue);
    console.log(`Set value for ${resolvedKey} key successfully`);

    return state;
  };
}

/**
 * Sets the specified fields to their respective values in the hash stored at key.
 * This function overwrites the values of specified fields that exist in the hash.
 * If key doesn't exist, a new key holding a hash is created.
 * @example
 * hset('patient', { name: 'mtuchi' });
 * @function
 * @public
 * @param {string} key - The name of the key
 * @param {object} value - The values to set
 * @state {RedisState}
 * @returns {Operation}
 */
export function hset(key, value) {
  return async state => {
    const [resolvedKey, resolvedValue] = expandReferences(state, key, value);
    util.asserthSetArgs(resolvedKey, resolvedValue);

    console.log(`Setting values of '${resolvedKey}' key`);
    await client.hSet(resolvedKey, resolvedValue);
    console.log(`Set values for '${resolvedKey}' successfully`);

    return state;
  };
}

/**
 * Incrementally iterating over a collection of keys in the currently selected database
 * @example
 * scan('*:20240524T172736Z*');
 * @function
 * @public
 * @param {string} pattern - A glob-style pattern
 * @param {ScanOptions} options - Scan options
 * @state {RedisState}
 * @state cursor - A numeric value used to continue the iteration from where it left off
 * @returns {Operation}
 */
export function scan(pattern, options = {}) {
  return async state => {
    const [resolvedPattern, resolvedOptions] = expandReferences(
      state,
      pattern,
      options
    );

    const { type = 'hash', cursor = 0, count } = resolvedOptions;

    const result = await client.scan(cursor, {
      MATCH: resolvedPattern,
      COUNT: count,
      TYPE: type,
    });

    return {
      ...composeNextState(state, result.keys),
      cursor: result.cursor,
    };
  };
}

export {
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
