import {
  composeNextState,
  execute as commonExecute,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import OpenAI from 'openai';

/**
 * Options provided to Chat Completions Create (https://platform.openai.com/docs/api-reference/chat/create)
 * @typedef {Object} PromptOptions
 * @public
 * @property {string} model - Which mode to use, i.e., `o3-mini-2025-01-31`.
 * @property {string} reasoning_effort - Use `low`, `medium`, or `high` to constrain effort on reasoning for some models.
 */

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
 * prompt('Write a haiku about surfing.');
 * @public
 * @function
 * @param {string} message - The prompt
 * @param {PromptOptions} options - Model, Reasoning Effort, Response Form and other parameters (https://platform.openai.com/docs/api-reference/chat/create)
 * @returns {operation}
 */
export function prompt(message, opts) {
  return async state => {
    const [resolvedMessage, resolvedOpts] = expandReferences(
      state,
      message,
      opts
    );

    const payload = {
      model: 'o3-mini-2025-01-31',
      reasoning_effort: 'low',
      messages: [{ role: 'user', content: resolvedMessage }],
      ...resolvedOpts,
    };

    const msg = await client.chat.completions.create(payload);
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
