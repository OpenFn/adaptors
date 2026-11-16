import { expandReferences } from '@openfn/language-common/util';
import { composeNextState } from '@openfn/language-common';
import xlsx from 'xlsx';

import {
  JSON_TO_SHEET_OPTIONS,
  SHEET_TO_CSV_OPTIONS,
  SHEET_TO_JSON_OPTIONS,
  buildWorkbook,
  readWorksheet,
  splitOptions,
  writeWorkbook,
} from './Utils.js';

/**
 * State object
 * @typedef {Object} SheetjsState
 * @property data - the result of the spreadsheet operation
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/

/**
 * File content to read. Accepts a Buffer, a base64 string, a base64 data
 * URL, or the raw text of a CSV file.
 * @typedef {Buffer|string} FileContent
 * @public
 **/

/**
 * Options for converting a worksheet to JSON. Accepts any
 * {@link https://docs.sheetjs.com/docs/api/utilities/array#array-output SheetJS array output option}
 * and any {@link https://docs.sheetjs.com/docs/api/parse-options#parsing-options SheetJS parse option}.
 * `raw` and `UTC` appear in both lists, and apply to the conversion.
 * @typedef {Object} SheetToJsonOptions
 * @public
 * @property {string} sheetName - Name of the sheet to convert. Defaults to the first sheet.
 * @property {number} sheetIndex - Zero-based index of the sheet to convert. Ignored if `sheetName` is set.
 */

/**
 * Options for converting a worksheet to CSV. Accepts any
 * {@link https://docs.sheetjs.com/docs/api/utilities/csv#delimiter-separated-output SheetJS CSV output option}
 * and any {@link https://docs.sheetjs.com/docs/api/parse-options#parsing-options SheetJS parse option}.
 * `FS` appears in both lists, and applies to the CSV output.
 * @typedef {Object} SheetToCsvOptions
 * @public
 * @property {string} sheetName - Name of the sheet to convert. Defaults to the first sheet.
 * @property {number} sheetIndex - Zero-based index of the sheet to convert. Ignored if `sheetName` is set.
 * @property {boolean} rawNumbers - Write numbers as raw values rather than formatted text.
 */

/**
 * Options for building a spreadsheet file from JSON. Accepts any
 * {@link https://docs.sheetjs.com/docs/api/utilities/array#array-of-objects-input SheetJS array of objects input option}
 * and any {@link https://docs.sheetjs.com/docs/api/write-options#writing-options SheetJS write option}
 * except `type` - use `output` instead.
 * `cellDates` appears in both lists, and applies to building the sheet.
 * @typedef {Object} JsonToSheetOptions
 * @public
 * @property {string} sheetName - Name of the worksheet. Default: `'Sheet1'`.
 * @property {'buffer'|'base64'} output - Return the file as a Buffer or a base64 string. Default: `'buffer'`.
 */

/**
 * Convert a worksheet into an array of objects, one per row, and write it to
 * `state.data`.
 *
 * Reads the first sheet unless `sheetName` or `sheetIndex` says otherwise.
 * The content type is detected automatically. Pass `type` to override it.
 * @public
 * @example <caption>Convert the first sheet of a file to JSON</caption>
 * sheetToJson($.data.fileContent);
 * @example <caption>Convert a named sheet</caption>
 * sheetToJson($.data.fileContent, { sheetName: 'Orders' });
 * @example <caption>Return dates as Date objects rather than Excel serial numbers</caption>
 * sheetToJson($.data.fileContent, { cellDates: true });
 * @function
 * @param {FileContent} content - The file content to convert
 * @param {SheetToJsonOptions} options - Optional conversion options
 * @state {SheetjsState}
 * @returns {Operation}
 */
export function sheetToJson(content, options = {}) {
  return state => {
    const [resolvedContent, resolvedOptions] = expandReferences(
      state,
      content,
      options
    );

    const { worksheet, outputOptions } = readWorksheet(
      resolvedContent,
      resolvedOptions,
      SHEET_TO_JSON_OPTIONS
    );

    const rows = xlsx.utils.sheet_to_json(worksheet, outputOptions);

    return composeNextState(state, rows);
  };
}

/**
 * Convert a worksheet into a CSV string and write it to `state.data`.
 *
 * Reads the first sheet unless `sheetName` or `sheetIndex` says otherwise.
 * The content type is detected automatically. Pass `type` to override it.
 * @public
 * @example <caption>Convert an uploaded xlsx file straight to CSV</caption>
 * sheetToCsv($.data.fileContent);
 * @example <caption>Convert a named sheet</caption>
 * sheetToCsv($.data.fileContent, { sheetName: 'Orders' });
 * @example <caption>Use a semi-colon as the field separator</caption>
 * sheetToCsv($.data.fileContent, { FS: ';' });
 * @function
 * @param {FileContent} content - The file content to convert
 * @param {SheetToCsvOptions} options - Optional conversion options
 * @state {SheetjsState}
 * @returns {Operation}
 */
export function sheetToCsv(content, options = {}) {
  return state => {
    const [resolvedContent, resolvedOptions] = expandReferences(
      state,
      content,
      options
    );

    const { worksheet, outputOptions } = readWorksheet(
      resolvedContent,
      resolvedOptions,
      SHEET_TO_CSV_OPTIONS
    );

    const csv = xlsx.utils.sheet_to_csv(worksheet, outputOptions);

    return composeNextState(state, csv);
  };
}

/**
 * Build a spreadsheet file from an array of objects.
 *
 * Writes `{ buffer, bookType, sheetName }` to `state.data`, or
 * `{ base64, bookType, sheetName }` with `output: 'base64'`.
 *
 * Column headers come from the keys of the data. Pass `header` to fix their
 * order.
 * @public
 * @example <caption>Build an xlsx buffer from records on state</caption>
 * jsonToSheet($.data.records, { sheetName: 'Export' });
 * @example <caption>Build a base64 xlsx file, ready to upload</caption>
 * jsonToSheet($.data.records, { sheetName: 'Export', output: 'base64' });
 * @example <caption>Write a CSV file with a fixed column order</caption>
 * jsonToSheet($.data.records, {
 *   bookType: 'csv',
 *   header: ['id', 'name', 'dateOfBirth'],
 * });
 * @function
 * @param {object[]} data - An array of objects, one per row
 * @param {JsonToSheetOptions} options - Optional write options
 * @state {SheetjsState}
 * @returns {Operation}
 */
export function jsonToSheet(data, options = {}) {
  return state => {
    const [resolvedData, resolvedOptions] = expandReferences(
      state,
      data,
      options
    );

    const {
      sheetName = 'Sheet1',
      bookType = 'xlsx',
      output = 'buffer',
      ...sheetjsOptions
    } = resolvedOptions;

    const [sheetOptions, writeOptions] = splitOptions(
      sheetjsOptions,
      JSON_TO_SHEET_OPTIONS
    );

    const outputWorkbook = buildWorkbook(resolvedData, {
      ...sheetOptions,
      sheetName,
    });

    const file = writeWorkbook(outputWorkbook, {
      ...writeOptions,
      bookType,
      output,
    });

    return composeNextState(state, {
      [output]: file,
      bookType,
      sheetName,
    });
  };
}

/**
 * The full {@link https://docs.sheetjs.com/docs/api SheetJS library}, for
 * anything the operations above don't cover. Its functions are not
 * operations, so call them inside `fn()`, not at the top level of a job.
 * @public
 * @example <caption>Read a workbook and convert a named sheet yourself</caption>
 * fn(state => {
 *   const workbook = xlsx.read(state.data.fileContent, { type: 'base64' });
 *   state.rows = xlsx.utils.sheet_to_json(workbook.Sheets['Sheet1'], {
 *     header: 1,
 *     raw: false,
 *   });
 *   return state;
 * });
 */
export * as xlsx from 'xlsx';

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
