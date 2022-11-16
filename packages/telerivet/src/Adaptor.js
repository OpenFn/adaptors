import {
  execute as commonExecute,
  expandReferences,
} from '@openfn/language-common';
import { post } from './Client';

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for telerivet.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Send a message
 * @example
 * execute(
 *   send(data)
 * )(state)
 * @constructor
 * @param {object} sendData - Payload data for the message
 * @returns {Operation}
 */
export function send(sendData) {
  return state => {
    const body = expandReferences(sendData)(state);

    const { projectId, apiKey } = state.configuration;

    const url = 'https://api.telerivet.com/v1/projects/'.concat(
      projectId,
      '/messages/send'
    );

    console.log(url);
    console.log('Posting message to send:');
    console.log(body);

    return post({ apiKey, body, url }).then(result => {
      console.log('Success:', result);
      return { ...state, references: [result, ...state.references] };
    });
  };
}

export {
  fn,
  alterState,
  field,
  fields,
  sourceValue,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
