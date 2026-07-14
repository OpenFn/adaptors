import {
  execute as commonExecute,
} from '@openfn/language-common';
import { LangfuseClient } from "@langfuse/client";

let langfuseConn = null;


/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to make working with this API easier.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(login, ...operations)({ ...initialState, ...state });
  };
}



async function login(state) {
  const { baseUrl ="https://cloud.langfuse.com", publicKey, secretKey } = state.configuration;

  langfuseConn = new LangfuseClient({
    publicKey,
    secretKey,
    baseUrl
  });

  return state;
}

/**
 * State object
 * @typedef {Object} LangfuseState
 * @property data - the parsed response from the Langfuse API
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * The auto-generated Langfuse REST API client, passed as `api` inside a {@link langfuse} callback.
 * Each property is a namespace exposing typed methods for that resource.
 * See the full API reference at {@link https://js.reference.langfuse.com/}.
 * @typedef {Object} LangfuseApiClient
 * @example <caption>Fetch recent observations</caption>
 * langfuse(async (state, api) => {
 *   const { data } = await api.observations.getMany({ limit: 10 });
 *   return { ...state, data };
 * });
 * @example <caption>List score configs</caption>
 * langfuse(async (state, api) => {
 *   const { data: configs } = await api.scoreConfigs.get({ limit: 100 });
 *   return { ...state, data: configs };
 * });
 * @example <caption>Query aggregate metrics</caption>
 * langfuse(async (state, api) => {
 *   const query = {
 *     view: 'observations',
 *     metrics: [{ measure: 'totalCost', aggregation: 'sum' }],
 *     fromTimestamp: '2025-01-01T00:00:00Z',
 *     toTimestamp: '2025-06-01T00:00:00Z',
 *   };
 *   const { data } = await api.metrics.metrics({ query: JSON.stringify(query) });
 *   return { ...state, data };
 * });
 * @function
 * @public
 * @param {function} func - Callback `(state, api) => state` receiving the {@link LangfuseApiClient} as `api`
 * @returns {Operation}
 * @state {LangfuseState}
 */
export function langfuse(func) {
  return async state => {
    if (!langfuseConn) {
      throw new Error('Langfuse connection not established. Please check your configuration.');
    }
    return func(state, langfuseConn.api);
  };
}

export function setMockClient(client) {
  langfuseConn = client;
}



export {
  as,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';
