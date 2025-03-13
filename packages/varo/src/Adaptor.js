import { composeNextState } from '@openfn/language-common';

import { parseMetadata } from './Utils';
import { parseVaroEmsToEms } from './VaroEmsUtils';
import { parseFridgeTag, parseFridgeTagToEms } from './FridgeTagUtils';

/**
 * Processes EMS data from the provided state object.
 *
 * Iterates over messages in the state, validates their metadata and content,
 * parses the data, and transforms it into EMS-compatible results.
 *
 * @returns {Operation}
 */
export function getEmsData() {
  return async state => {
    const results = [];

    console.log('--- Incoming message count', state.data.length);

    for (const message of state.data) {
      if (message.fridgeTag?.content) {
        const metadata = parseMetadata(message);
        if (!metadata) continue;

        const fridgeTagNodes = parseFridgeTag(message.fridgeTag.content);
        const result = parseFridgeTagToEms(metadata, fridgeTagNodes);
        results.push(result);
        continue;
      }

      if (message.data?.content) {
        const metadata = parseMetadata(message);
        if (!metadata) continue;

        const data = JSON.parse(message.data.content);
        const dataPath = message.data.filename;
        const result = parseVaroEmsToEms(metadata, data, dataPath);
        results.push(result);
        continue;
      }

      console.error(
        `Insufficient content found for MessageID: ${message.messageId}`
      );
    }

    console.log('--- Converted message count', results.length);

    return { ...composeNextState(state, results) };
  };
}

export {
  alterState,
  combine,
  cursor,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  fn,
  fnIf,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
