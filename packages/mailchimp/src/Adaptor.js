
import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
} from '@openfn/language-common';
import axios from 'axios';
import client from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';
import { resolve } from 'path';

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
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
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
    const { apiKey, server } = state.configuration;
    const { listId, users, options } = expandReferences(params)(state);

    client.setConfig({ apiKey, server });

    return Promise.all(
      users.map(user =>
        client.lists
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
export function tagMembers(params) {
  return state => {
    const { apiKey, server } = state.configuration;
    const { listId, tagId, members } = expandReferences(params)(state);

    client.setConfig({ apiKey, server });

    return client.lists
      .batchSegmentMembers({ members_to_add: members }, listId, tagId)
      .then(response => {
        const nextState = composeNextState(state, response);
        return nextState;
      });
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
export function startBatch(params) {
  return state => {
    const { apiKey, server } = state.configuration;
    const { operations } = expandReferences(params)(state);

    client.setConfig({ apiKey, server });

    return client.batches
      .start({ operations: [...operations] })
      .then(response => {
        console.log(response);
        const nextState = composeNextState(state, response);
        return nextState;
      });
  };
}

export function listBatches(params) {
  return state => {
    const { apiKey, server } = state.configuration;

    client.setConfig({ apiKey, server });

    return client.batches.list().then(response => {
      console.log(response);
      const nextState = composeNextState(state, response);
      return nextState;
    });
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
