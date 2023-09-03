import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request } from './Utils';
import 'dotenv/config';

import OpenAI from 'openai';

/**
 * Prompt OpenAI model.
 * @public
 * @example
 * promptChatGpt("prompt")(state)
 * @function
 * @param {string} prompt - User textual prompt
 * @returns {Operation}
 */
export function promptChatGpt(prompt) {
  return async state => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_SECRET_KEY,
    });

    try {
      const output_text = await openai.chat.completions
        .create({
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-3.5-turbo',
        })
        .then(e => e.choices);

      return { ...state, output_text };
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
    }
  };
}

export { request } from './Utils';

// TODO: Decide which functions to publish from @openfn/language-common
export {
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
