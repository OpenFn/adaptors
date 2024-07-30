import { expandReferences } from '@openfn/language-common/util';
import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';

import { createClient } from 'redis';

let client = null;

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
 * If the key does not exist the special value nil is returned.
 * An error is returned if the value stored at key is not a string, because GET only handles string values.
 * @example
 * get("patient");
 * @function
 * @public
 * @param {string} key - Key
 * @returns {Operation}
 * @state {RedisState}
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
 * Set the string value of a key
 * @example
 * set("patient", "mtuchi");
 * @function
 * @public
 * @param {string} key - Key
 * @param {string} value - Value
 * @returns {Operation}
 * @state {RedisState}
 */
export function set(key, value) {
  return async state => {
    const [resolvedKey, resolvedValue] = expandReferences(state, key, value);
    console.log(`Setting '${resolvedValue}' value of '${resolvedKey}' key`);
    const result = await client.set(resolvedKey, resolvedValue);
    return composeNextState(state, result);
  };
}

/**
 * Set the string value of a key
 * @example
 * search("patient", "mtuchi");
 * @function
 * @public
 * @param {string} index - Key
 * @param {string} query - Value
 * @returns {Operation}
 * @state {RedisState}
 */
export function search(index, query) {
  return async state => {
    const [resolvedIndex, resolvedQuery] = expandReferences(
      state,
      index,
      query
    );

    const result = await client.ft.search(resolvedIndex, resolvedQuery);
    return composeNextState(state, result);
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
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
