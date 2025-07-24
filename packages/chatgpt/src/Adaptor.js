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
 */

/**
 * Options provided to Chat Responses Create (https://platform.openai.com/docs/guides/deep-research)
 * @typedef {Object} DeepResearchOptions
 * @public
 * @property {string} model - Which mode to use, i.e., `o3-deep-research`.
 * @property {string} tools - An array of tools to use for the search. Default [{"type": "web_search_preview"}] See (https://platform.openai.com/docs/guides/deep-research#tools)
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
 * prompt(`Filter these emails and pick out the most urgent: ${JSON.stringify($.data)}`);
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
      messages: [{ role: 'user', content: resolvedMessage }],
      ...resolvedOpts,
    };

    const msg = await client.chat.completions.create(payload);
    console.log('√ Prompt operation completed');
    return composeNextState(state, msg);
  };
}

/**
 * Prompt GPT deep research interface
 * @example
 * deepResearch(
 *   `Evaluate if the following company qualifies as a sustainable fashion brand:
 *
 *   INPUT: ${JSON.stringify($.data)}
 *   Return JSON only with:
 *   - sustainabilityStatus: "Certified", "Likely", or "Unverified"
 *   - materialsUsed
 *   - certifications
 *   - confidenceLevel (0–5)
 *   - researchNotes`,
 *   {
 *     model: 'o3-deep-research',
 *     max_tool_calls: 1
 *   }
 * )
 * @public
 * @function
 * @param {string} message - The prompt
 * @param {DeepResearchOptions} options - Model, tools and other parameters (https://platform.openai.com/docs/guides/deep-research)
 * @returns {operation}
 */
export function deepResearch(message, opts) {
  return async state => {
    const [resolvedMessage, resolvedOpts] = expandReferences(
      state,
      message,
      opts
    );

    const payload = {
      model: 'o3-deep-research',
      input: resolvedMessage,
      tools: resolvedOpts?.tools || [{ type: 'web_search_preview' }],
      ...resolvedOpts,
    };

    console.log('Preparing deep search operation...');
    const msg = await client.responses.create(payload);
    console.log('√ Deep search operation completed');

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
