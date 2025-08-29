import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { DateTime } from 'luxon';

import { parseMetadata, formatDeviceInfo, abbreviatedIsoToDate } from './Utils';
import {
  parseFlatRecordsToReports,
  parseRtmdCollectionToReports,
} from './StreamingUtils';
import { parseVaroEmsToReport, buildDeviceRtcwDateMaps } from './VaroEmsUtils';
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

    console.info('Incoming message contents', resolvedMessageContents.length);

    processFridgeTagContents(resolvedMessageContents, reports);

    processDataContents(resolvedMessageContents, reports);

    // Log any unprocessed content files.
    for (const content of resolvedMessageContents.filter(c => !c.zProcessed)) {
      console.error(
        `Insufficient content found for MessageID: ${content.messageId}`
      );
    }

    console.info('Converted message contents', reports.length);

    return { ...composeNextState(state, reports) };
  };
}

function processFridgeTagContents(contents, reports) {
  // Consider only content objects with a fridgeTag property.
  const fridgeTagContents = contents.filter(c => c.fridgeTag);

  for (const content of fridgeTagContents) {
    const metadata = parseMetadata(content);
    if (!metadata) continue;

    const fridgeTagNodes = parseFridgeTag(content.fridgeTag.content);
    const result = parseFridgeTagToReport(metadata, fridgeTagNodes);
    reports.push(result);

    content.zProcessed = true;
  }
}

function processDataContents(contents, reports) {
  // Consider only the content objects with a data property.
  const dataContents = contents.filter(c => c.data);

  // Build a map of RTCW/deviceDate for each file in this dataset.
  const deviceRtcwDateMaps = buildDeviceRtcwDateMaps(dataContents);

  for (const content of dataContents) {
    const metadata = parseMetadata(content);
    if (!metadata) continue;

    const data = content.data.content;

    // Get the RTCW/date mapping for this device.
    const rtcwMaps = deviceRtcwDateMaps.get(content.zDeviceId);

    // Generate EMS report from parsed Varo data.
    const result = parseVaroEmsToReport(metadata, data, rtcwMaps);
    reports.push(result);

    content.zProcessed = true;
  }
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

    for (const report of resolvedReports ?? []) {
      report['zReportType'] = resolvedReportType;
      report['zGeneratedTimestamp'] = new Date().toISOString();

      const serialNumber = report['ESER'] || report['LSER'] || report['ASER'];

      const messageContent = {
        subject: `OpenFn | ${resolvedReportType.toUpperCase()} | ${serialNumber}`,
        body: formatDeviceInfo(report),
        data: {
          filename: 'data.json',
          content: JSON.stringify(report, null, 4),
        },
      };

      messageContents.push(messageContent);
    }

    return { ...composeNextState(state, messageContents) };
  };
}

/**
 * @typedef {Object} UtcRange
 * @property {Date} wallClock - The current local datetime as it appears on the wall in the specified timezone.
 * @property {Date} startUtc - UTC start date range (inclusive).
 * @property {Date} endUtc - UTC end of date range (exclusive).
 * @property {Array} collectionKeys - Array of wildcard patterns to match UTC dates which correspond with date range (e.g. "*20250624*").
 */

/**
 * Computes the UTC datetime range that corresponds to a given IANA timezone.
 * @public
 * @function
 * @param {string} timeZone - An IANA time zone identifier (e.g. "America/Los_Angeles").
 * @param {string} startIso - Starting date in ISO format.
 * @param {string} endIso - Ending date range in ISO format.
 * @returns {UtcRange}
 */
export function parseUtcForDataRange(timeZone, startIso, endIso) {
  const localNow = DateTime.now().setZone(timeZone);
  const wallClock = new Date(
    localNow.year,
    localNow.month - 1,
    localNow.day,
    localNow.hour,
    localNow.minute,
    localNow.second,
    localNow.millisecond
  );

  const startLocal = DateTime.fromISO(startIso, { zone: timeZone });
  const endLocal = DateTime.fromISO(endIso, { zone: timeZone });

  const startUtc = startLocal.toUTC().toJSDate();
  const endUtc = endLocal.toUTC().toJSDate();

  const daysDiff = Math.floor(endLocal.diff(startLocal, 'days').days);
  const collectionKeyPattern = 'yyyyLLdd';
  const collectionKeys = [];

  for (let i = 0; i <= daysDiff; i++) {
    const currentDay = startLocal.plus({ days: i });
    collectionKeys.push(`*${currentDay.toFormat(collectionKeyPattern)}*`);
  }

  return {
    wallClock,
    startUtc,
    endUtc,
    collectionKeys,
  };
}

/**
 * Checks whether the timestamp embedded in a key falls within a UTC datetime range.
 *
 * @public
 * @function
 * @param {string} key - A string key containing a UTC timestamp in the format `YYYYMMDDTHHMMSS`, following a colon (e.g. "prefix:20250624T101530").
 * @param {Date} start - The inclusive lower bound of the UTC datetime range.
 * @param {Date} end - The exclusive upper bound of the UTC datetime range.
 * @returns {boolean} True if the parsed UTC timestamp is within the range, false otherwise.
 */
export function isKeyInRange(key, start, end) {
  console.error(
    'i changed this implementation and need to verify the scenarios.'
  );
  const iso = key?.split(':')[1];
  if (!iso || iso.length < 15) return false;

  const date = abbreviatedIsoToDate(iso);

  return date >= start && date < end;
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
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
