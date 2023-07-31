import md5 from 'md5';
import axios from 'axios';
import client from '@mailchimp/mailchimp_marketing';
import { expandReferences } from '@openfn/language-common/util';
import { execute as commonExecute } from '@openfn/language-common';

import { handleResponse } from './Utils';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for http.
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
    return commonExecute(
      createClient,
      ...operations,
      cleanupState
    )({
      ...initialState,
      ...state,
    });
  };
}

function createClient(state) {
  const { apiKey, server } = state.configuration;
  // TODO: throws an error if apiKey not specified in configuration
  client.setConfig({ apiKey, server });
  return { ...state, client: client };
}

function cleanupState(state) {
  delete state.client;
  return state;
}
/**
 * Add members to a particular audience
 * @example
 * upsertMembers(params)
 * @function
 * @param {object} params - a listId, users, and options
 * @returns {Operation}
 */
export function upsertMembers(params) {
  return state => {
    // const { apiKey, server } = state.configuration;
    const [resolvedParams] = expandReferences(state, params);
    const { listId, users, options } = resolvedParams;

    // client.setConfig({ apiKey, server });

    return Promise.all(
      users.map(user =>
        state.client.lists
          .setListMember(listId, md5(user.email), {
            email_address: user.email,
            status_if_new: user.status,
            merge_fields: user.mergeFields,
          })
          .then(response => {
            state.references.push(response);
          })
      )
    ).then(() => {
      return state;
    });
  };
}

/**
 * Tag members with a particular tag
 * @example
 * tagMembers(params)
 * @function
 * @param {object} params - a tagId, members, and a list
 * @returns {Operation}
 */
export function tagMembers(params, callback = s => s) {
  return state => {
    // const { apiKey, server } = state.configuration;
    const [resolvedParams] = expandReferences(state, params);
    const { listId, tagId, members } = resolvedParams;
    // client.setConfig({ apiKey, server });

    return state.client.lists
      .batchSegmentMembers({ members_to_add: members }, listId, tagId)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * Start a batch with a list of operations.
 * @example
 * startBatch(params)
 * @function
 * @param {object} params - operations batch job
 * @returns {Operation}
 */
export function startBatch(params, callback = s => s) {
  return state => {
    // const { apiKey, server } = state.configuration;
    const [resolvedParams] = expandReferences(state, params);
    const { operations } = resolvedParams;
    // client.setConfig({ apiKey, server });

    return state.client.batches
      .start({ operations: [...operations] })
      .then(response => handleResponse(response, state, callback));
  };
}

export function listBatches(params, callback = s => s) {
  return state => {
    // const { apiKey, server } = state.configuration;
    // client.setConfig({ apiKey, server });
    const [resolvedParams] = expandReferences(state, params);

    return state.client.batches
      .list()
      .then(response => handleResponse(response, state, callback));
  };
}

// Note that we expose the entire axios package to the user here.
export { axios, md5 };

// What functions do you want from the common adaptor?
export {
  fn,
  alterState,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
