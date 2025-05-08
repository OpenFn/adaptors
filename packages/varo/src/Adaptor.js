import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import { parseMetadata } from './Utils';
import {
  parseFlatRecordsToReports,
  parseRtmdCollectionToReports,
} from './StreamingUtils';
import { parseVaroEmsToReports } from './VaroEmsUtils';
import { parseFridgeTag, parseFridgeTagToReport } from './FridgeTagUtils';

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
    const reports = [];

    console.log('Incoming message contents', resolvedMessageContents.length);

    for (const content of resolvedMessageContents) {
      if (content.fridgeTag?.content) {
        const metadata = parseMetadata(content);
        if (!metadata) continue;

        const fridgeTagNodes = parseFridgeTag(content.fridgeTag.content);
        const result = parseFridgeTagToReport(metadata, fridgeTagNodes);
        reports.push(result);
        continue;
      }

      if (content.data?.content) {
        const metadata = parseMetadata(content);
        if (!metadata) continue;

        const data = JSON.parse(content.data.content);
        const dataPath = content.data.filename;
        const result = parseVaroEmsToReports(metadata, data, dataPath);
        reports.push(result);
        continue;
      }

      console.error(
        `Insufficient content found for MessageID: ${content.messageId}`
      );
    }

    console.log('Converted message contents', reports.length);

    return { ...composeNextState(state, reports) };
  };
}

/**
 * Read a collection of EMS-like data records and convert them to a standard EMS report/record format.
 * Systematically separates report properties from record properties.
 * @public
 * @function
 * @param {Array} items - Array of EMS-like JSON objects.
 * @param {string} [reportType='unknown'] - Optional. Source of the report, e.g., "ems" or "rtmd".
 * @state {Array} data - The converted, EMS-compliant report with records.
 * @returns {Operation}
 * @example <caption>Convert data to EMS-compliant data.</caption>
 * convertItemsToReport(
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
export function convertItemsToReports(items, reportType = 'unknown') {
  return async state => {
    const [resolvedRecords, resolvedReportType] = expandReferences(
      state,
      items,
      reportType
    );

    const reportParsers = {
      ems: parseFlatRecordsToReports,
      rtmd: parseRtmdCollectionToReports,
    };

    const parser = reportParsers[resolvedReportType];
    if (!parser) {
      throw new Error(`Report type not supported: ${resolvedReportType}`);
    }

    const reports = parser(resolvedRecords);

    // for (const report of reports) {
    //   report.records = '[redacted]';
    // }

    return { ...composeNextState(state, reports) };
  };
}

/**
 * Converts an EMS-compliant report into Varo-compatible message components.
 *
 * @public
 * @function
 * @param {Object} reports - EMS-compliant report objects.
 * @param {string} [reportType='unknown'] - Optional. Source of the report, e.g., "ems" or "rtmd".
 * @returns {Function} An operation function that receives `state` and returns updated message content.
 *
 * @example
 * // Convert EMS-compliant reports to Varo message components.
 * convertReportsToMessageContents(emsReports, "ems");
 */
export function convertReportsToMessageContents(
  reports,
  reportType = 'unknown'
) {
  return async state => {
    const [resolvedReports, resolvedReportType] = expandReferences(
      state,
      reports,
      reportType
    );

    const messageContents = [];

    for (const resolvedReport of resolvedReports) {
      resolvedReport['zReportType'] = resolvedReportType;
      resolvedReport['zGeneratedTimestamp'] = new Date().toISOString();

      const messageContent = {
        subject: `OpenFn | ${resolvedReportType.toUpperCase()}`,
        data: {
          filename: 'data.json',
          content: JSON.stringify(resolvedReport, null, 4),
        },
      };

      messageContents.push(messageContent);
    }

    return { ...composeNextState(state, messageContents) };
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
