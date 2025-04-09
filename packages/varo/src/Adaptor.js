import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import {
  parseMetadata,
  parseRecordsToReport,
  parseReportToFiles,
} from './Utils';
import { parseVaroEmsToEms } from './VaroEmsUtils';
import { parseFridgeTag, parseFridgeTagToEms } from './FridgeTagUtils';

/**
 * Processes EMS data from the provided list of message contents.
 * @public
 * @function
 * @param {Array} messageContents - Array of message content objects.
 * @state {Array} data - The converted, EMS-compliant version of each message contents.
 * @returns {Operation}
 * @example <caption>Convert data to EMS-compliant data.</caption>
 * convertToEms(
 *   [
 *     {
 *       metadata: { content: '', filename: '' },
 *       data: { content: '', filename: '' }
 *     }
 *   ]
 * );
 */
export function convertToEms(messageContents) {
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

export function convertRecordsToMessageContent(records, reportType) {
  return async state => {
    const [resolvedRecords, resolvedReportType] = expandReferences(
      state,
      records,
      reportType
    );

    const report = parseRecordsToReport(resolvedRecords, resolvedReportType);
    const subject = `OpenFn | ${reportType.toUpperCase()}`;
    const files = parseReportToFiles(report);

    return { ...composeNextState(state, { subject, files }) };
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
