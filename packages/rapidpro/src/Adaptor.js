import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { fetch } from 'undici';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state.
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
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Adds a new contact to RapidPro
 * @public
 * @example
 * addContact({
 *   name: "Mamadou",
 *   language: "ENG",
 *   urns: ["tel:+250788123123"]
 * });
 * @function
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function addContact(params, callback = s => s) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    const { host, apiVersion, token } = state.configuration;

    const url = `${host}/api/${apiVersion || 'v2'}/contacts.json`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resolvedParams),
    });

    const result = await response.json();

    console.log('Contact added with uuid:', result.uuid);

    return callback({
      ...composeNextState(state, result),
      response,
    });
  };
}

/**
 * Upserts a contact to RapidPro by URN
 * @public
 * @example
 * upsertContact({
 *   name: "Mamadou",
 *   language: "ENG",
 *   urns: ["tel:+250788123123"]
 * });
 * @function
 * @param {object} params - data to upsert a contact
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function upsertContact(params, callback = s => s) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    const { host, apiVersion, token } = state.configuration;

    const url = `${host}/api/${apiVersion || 'v2'}/contacts.json`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resolvedParams),
    });

    let result = await response.json();
    if (result && result.urns && Array.isArray(result.urns['0'])) {
      const newUrl = `${url}?urn=${resolvedParams.urns[0]}`;

      delete resolvedParams['urns'];
      result = await fetch(newUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(resolvedParams),
      });
      const res = await result.json();

      console.log('Contact updated with uuid:', res.uuid);
      return callback({
        ...composeNextState(state, res),
        response: {},
      });
    } else {
      console.log('Contact added with uuid:', result.uuid);
      return callback({
        ...composeNextState(state, result),
        response: {},
      });
    }
  };
}

/**
 * Start a RapidPro flow for a number of contacts
 * @public
 * @example
 * startFlow({
 *   flow: "f5901b62-ba76-4003-9c62-72fdacc1b7b7",
 *   restart_participants: false,
 *   contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
 * });
 * @function
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function startFlow(params, callback = s => s) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    const { host, apiVersion, token } = state.configuration;

    const url = `${host}/api/${apiVersion || 'v2'}/flow_starts.json`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resolvedParams),
    });

    const result = await response.json();
    console.log('Flow started:', result);
    return callback({
      ...composeNextState(state, result),
      response,
    });
  };
}

/**
 * Sends a message to a list of contacts and/or URNs
 * @public
 * @example
 * sendBroadcast({
 *   text: "Hello world",
 *   urns: ["twitter:sirmixalot"],
 *   contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
 * });
 * @function
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function sendBroadcast(params, callback = s => s) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    const { host, apiVersion, token } = state.configuration;

    const url = `${host}/api/${apiVersion || 'v2'}/broadcasts.json`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resolvedParams),
    });
    const result = await response.json();
    console.log('Broadcast queued:', result);
    return callback({
      ...composeNextState(state, result),
      response,
    });
  };
}

export {
  alterState,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
