import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import { parseMetadata, parseRecordsToReport } from './Utils';
import { parseRtmdCollectionToReports } from './RtmdUtils';
import { parseVaroEmsToReport } from './VaroEmsUtils';
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

/**
 * Read a collection of EMS-like data records and convert them to a standard EMS report/record format.
 * Systematically separates report properties from record properties.
 * @public
 * @function
 * @param {Array} records - Array of EMS-like JSON objects.
 * @state {Array} data - The converted, EMS-compliant report with records.
 * @returns {Operation}
 * @example <caption>Convert data to EMS-compliant data.</caption>
 * convertRecordsToReport(
 *   [
 *     { "ASER": "BJBC 08 30", "ABST": "20241205T004440Z", "TVC": 5.0 },
 *     { "ASER": "BJBC 08 30", "ABST": "20241205T005440Z", "TVC": 5.2 },
 *   ]
 * );
 *
 * state.data becomes:
 * {
 *   "ASER": "BJBC 08 30",
 *   records: [
 *     { "ABST": "20241205T004440Z", "TVC": 5.0 },
 *     { "ABST": "20241205T005440Z", "TVC": 5.2 },
 *   ],
 * }
 */
export function convertRecordsToReport(records) {
  return async state => {
    const [resolvedRecords] = expandReferences(state, records);

    //const report = parseRecordsToReport(resolvedRecords);
    const report = {};
    const reports = parseRtmdCollectionToReports(resolvedRecords);

    return { ...composeNextState(state, report) };
  };
}

/**
 * Converts an EMS-compliant report into Varo-compatible message components.
 *
 * @public
 * @function
 * @param {Object} report - EMS-compliant report object.
 * @param {string} [reportType='unknown'] - Optional. Source of the report, e.g., "ems" or "rtmd".
 * @returns {Function} An operation function that receives `state` and returns updated message content.
 *
 * @example
 * // Convert EMS-compliant record to Varo message components.
 * convertReportToMessageContent(emsReport, "ems");
 */
export function convertReportToMessageContent(report, reportType = 'unknown') {
  return async state => {
    const [resolvedReport, resolvedReportType] = expandReferences(
      state,
      report,
      reportType
    );

    resolvedReport['zReportType'] = reportType;
    resolvedReport['zGeneratedTimestamp'] = new Date().toISOString();

    const messageContent = {
      subject: `OpenFn | ${resolvedReportType.toUpperCase()}`,
      data: {
        filename: 'data.json',
        content: JSON.stringify(resolvedReport, null, 4),
      },
    };

    return { ...composeNextState(state, messageContent) };
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
