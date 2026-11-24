import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} ThauraState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * A chat message, in the OpenAI Chat Completions format.
 * @typedef {Object} ChatMessage
 * @public
 * @property {string} role - Who wrote the message, for example `system`, `user` or `assistant`.
 * @property {string|Array} content - The text of the message, or an array of content parts (see https://thaura.ai/api-platform).
 */

/**
 * Parameters passed to the Thaura Chat Completions API. Any other parameter
 * listed at https://thaura.ai/api-platform (like `response_format`, `seed` or
 * `stop`) is passed through as given.
 * @typedef {Object} ChatParams
 * @public
 * @property {string} [model=thaura] - The model to use. Thaura currently offers one chat model, `thaura`.
 * @property {number} [max_tokens] - The maximum number of tokens to generate (up to 32,000, which is also the default). The API holds the cost of this many tokens on your balance while it answers, and an answer must finish within about 5 minutes, so set a lower value for short answers.
 * @property {number} [temperature] - Accepted for compatibility (0 to 2). Thaura currently keeps the model's own sampling settings; use `seed` for repeatable answers.
 */

/**
 * Parameters for a single prompt. Takes every Chat Completions parameter, plus
 * an optional system prompt.
 * @typedef {Object} PromptParams
 * @public
 * @property {string} [system] - Instructions sent as a system message before the prompt, ie, `You are a helpful assistant for a health program.`
 * @property {string} [model=thaura] - The model to use. Thaura currently offers one chat model, `thaura`.
 * @property {number} [max_tokens] - The maximum number of tokens to generate (up to 32,000, which is also the default). The API holds the cost of this many tokens on your balance while it answers, and an answer must finish within about 5 minutes, so set a lower value for short answers.
 * @property {number} [temperature] - Accepted for compatibility (0 to 2). Thaura currently keeps the model's own sampling settings; use `seed` for repeatable answers.
 */

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. Defaults to json.
 * @property {number} timeout - Request timeout in ms. Default: 360 seconds.
 */

/**
 * Send a single prompt to Thaura and write the chat completion to
 * `state.data`. The answer's text is at `state.data.choices[0].message.content`.
 * @example <caption>Summarize a piece of text</caption>
 * prompt(`Summarize this feedback in one sentence: ${$.data.feedback}`);
 * @example <caption>Set a system prompt and limit the answer's length</caption>
 * prompt($.data.question, {
 *   system: 'You answer questions about our vaccination program in plain language.',
 *   max_tokens: 500,
 * });
 * @function
 * @public
 * @param {string} message - The prompt.
 * @param {PromptParams} [params] - A system prompt and Chat Completions parameters.
 * @returns {Operation}
 * @state {ThauraState}
 */
export function prompt(message, params = {}) {
  return async state => {
    const [resolvedMessage, resolvedParams] = expandReferences(
      state,
      message,
      params
    );

    if (typeof resolvedMessage !== 'string' || !resolvedMessage.trim()) {
      throw new Error('message must be a non-empty string.');
    }

    const { system, ...chatParams } = resolvedParams ?? {};

    const messages = [];
    if (system) {
      messages.push({ role: 'system', content: system });
    }
    messages.push({ role: 'user', content: resolvedMessage });

    const response = await util.createChatCompletion(
      state.configuration,
      messages,
      chatParams
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Send a conversation (a list of messages) to Thaura and write the chat
 * completion to `state.data`. The answer's text is at
 * `state.data.choices[0].message.content`.
 * @example <caption>Ask a follow-up question</caption>
 * chat([
 *   { role: 'system', content: 'You are a concise assistant.' },
 *   { role: 'user', content: $.data.question },
 *   { role: 'assistant', content: $.data.previousAnswer },
 *   { role: 'user', content: 'Can you explain that more simply?' },
 * ]);
 * @example <caption>Extract structured data as JSON</caption>
 * chat(
 *   [
 *     {
 *       role: 'user',
 *       content: `Extract the patient's name and age from: ${$.data.note}`,
 *     },
 *   ],
 *   { response_format: { type: 'json_object' } }
 * );
 * @function
 * @public
 * @param {Array<ChatMessage>} messages - The conversation, oldest message first.
 * @param {ChatParams} [params] - Chat Completions parameters.
 * @returns {Operation}
 * @state {ThauraState}
 */
export function chat(messages, params = {}) {
  return async state => {
    const [resolvedMessages, resolvedParams] = expandReferences(
      state,
      messages,
      params
    );

    const response = await util.createChatCompletion(
      state.configuration,
      resolvedMessages,
      resolvedParams ?? {}
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a request to any path of the Thaura API. The path is relative to the
 * configured `baseUrl`, and the API key is added for you.
 * @example <caption>List the available models</caption>
 * request('GET', 'models');
 * @function
 * @public
 * @param {string} method - HTTP method to use.
 * @param {string} path - Path to the resource, relative to the base URL.
 * @param {object} [body] - Object which will be sent as the JSON request body.
 * @param {RequestOptions} [options] - Optional request options.
 * @returns {Operation}
 * @state {ThauraState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedOptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}

export {
  as,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';
