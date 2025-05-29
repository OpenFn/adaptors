import {
  composeNextState,
  execute as commonExecute,
} from '@openfn/language-common';
import Anthropic from '@anthropic-ai/sdk';
import { expandReferences } from '@openfn/language-common/util';

/**
 * Options provided to Chat Completions Create (https://docs.anthropic.com/en/api/messages)
 * @typedef {Object} PromptOptions
 * @public
 * @property {string} model - Which mode to use, i.e., `claude-3-7-sonnet-20250219`.
 * @property {string} max_tokens - The maximum number of tokens to generate before stopping, i.e., `1024`
 * @property {number} temperature - Amount of randomness injected into the response. Ranges from 0.0 to 1.0. Use temperature closer to 0.0 for analytical / multiple choice, and closer to 1.0 for creative and generative tasks.
 */

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
 * prompt(`Filter these emails and pick out the most urgent: ${JSON.stringify($.data)}`);
 * @param {string} message - The prompt
 * @param {PromptOptions} opts - Model, Max Tokens, Temperature, and other options.
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
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 1024,
      messages: [{ role: 'user', content: resolvedMessage }],
      ...resolvedOpts,
    };

    const msg = await client.messages.create(payload);
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
