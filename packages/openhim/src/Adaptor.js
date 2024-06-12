import {
  execute as commonExecute,
  expandReferences,
} from '@openfn/language-common';
import { post } from './Client';
import { resolve as resolveUrl } from 'url';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for openhim.
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
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Create an encounter
 * @example
 * execute(
 *   encounter(data)
 * )(state)
 * @function
 * @param {object} encounterData - Payload data for the encounter
 * @returns {Operation}
 */
export function encounter(encounterData) {
  return state => {
    const body = expandReferences(encounterData)(state);

    const { username, password, apiUrl } = state.configuration;

    const url = resolveUrl(apiUrl + '/', 'chw/encounter');

    console.log('Posting encounter:');
    console.log(JSON.stringify(body, null, 2));

    return post({ username, password, body, url }).then(result => {
      console.log('Success:', result);
      return { ...state, references: [result, ...state.references] };
    });
  };
}

export {
  fn,
  fnIf,
  field,
  fields,
  sourceValue,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
