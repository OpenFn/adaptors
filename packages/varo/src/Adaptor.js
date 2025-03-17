import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import { parseMetadata } from './Utils';
import { parseVaroEmsToEms } from './VaroEmsUtils';
import { parseFridgeTag, parseFridgeTagToEms } from './FridgeTagUtils';

/**
 * Processes EMS data from the provided list of message contents.
 *
 * Iterates over message content, validates their metadata and content,
 * parses the data, and transforms it into EMS-compatible results.
 *
 * @returns {Operation}
 */
export function transformMessageContentsToEms(messageContents) {
  return async state => {
    const [resolvedMessageContents] = expandReferences(state, messageContents);
    const results = [];

    console.log('Incoming message contents', resolvedMessageContents.length);

    for (const content of resolvedMessageContents) {
      if (content.fridgeTag?.content) {
        const metadata = parseMetadata(content);
        if (!metadata) continue;

        const fridgeTagNodes = parseFridgeTag(content.fridgeTag.content);
        const result = parseFridgeTagToEms(metadata, fridgeTagNodes);
        results.push(result);
        continue;
      }

      if (content.data?.content) {
        const metadata = parseMetadata(content);
        if (!metadata) continue;

        const data = JSON.parse(content.data.content);
        const dataPath = content.data.filename;
        const result = parseVaroEmsToEms(metadata, data, dataPath);
        results.push(result);
        continue;
      }

      console.error(
        `Insufficient content found for MessageID: ${content.messageId}`
      );
    }

    console.log('Converted message contents', results.length);

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
