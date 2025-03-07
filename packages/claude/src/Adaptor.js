import {
  composeNextState,
  execute as commonExecute,
} from '@openfn/language-common';
import Anthropic from '@anthropic-ai/sdk';

let client;

/**
 * Creates and Anthropic client
 * @param state
 * @returns {state}
 */
export function createClient(state) {
  const { apiKey } = state.configuration;

  client = new Anthropic({
    apiKey,
  });

  return state;
}

/**
 * Executes a series of operations.
 * It ensures the client is created first and assigned to the 'client' variable
 * @private
 * @param operations
 * @returns {operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(
      createClient,
      ...operations
    )({
      ...initialState,
      ...state,
    });
  };
}

export function setMockClient(mock) {
  client = mock;
}

/**
 * Prompt the Claude chat interface to respond
 * @public
 * @function
 * @example
 * prompt('Write a haiku about surfing.');
 * @param {string} message - The prompt
 * @param {string} model - The model (defaults to 'claude-3-7-sonnet-20250219')
 * @returns {operation}
 */
export function prompt(message, model = 'claude-3-7-sonnet-20250219') {
  return async state => {
    const msg = await client.messages.create({
      model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }],
    });
    return composeNextState(state, msg);
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
