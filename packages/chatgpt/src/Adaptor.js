import {
  composeNextState,
  execute as commonExecute,
} from '@openfn/language-common';
import OpenAI from 'openai';

let client;

/**
 * Creates and OpenAI client
 * @param state
 * @returns {state}
 */
export function createClient(state) {
  const { apiKey } = state.configuration;

  client = new OpenAI({
    apiKey,
  });

  return state;
}

export function setMockClient(mock) {
  client = mock;
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
 * Prompt the GPT chat interface to respond
 * @example
 * prompt('Write a haiku about surfing.' model='gpt-4o');
 * @public
 * @param {string} message - The prompt
 * @param {string} model - The model (defaults to 'gpt-4o)
 * @returns {operation}
 */
export function prompt(message, model = 'gpt-4o') {
  return async state => {
    const msg = await client.chat.completions.create({
      model,
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
