import {
  composeNextState,
  execute as commonExecute,
} from '@openfn/language-common';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Creates and Anthropic client
 * @param state
 * @returns {state}
 */
function createClient(state) {
  const { apiKey } = state.configuration;

  const client = new Anthropic({
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

/**
 * Write a prompt
 * @public
 * @param {string} message - The prompt
 * @returns {operation}
 */
export function createPrompt(message) {
  return async state => {
    const msg = await client.messages.create({
      model: 'claude-3-7-sonnet-20250219',
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
