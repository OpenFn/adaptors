import { expandReferences } from '@openfn/language-common/util';
import { composeNextState } from '@openfn/language-common';
import xlsx from 'xlsx';

import {
  buildWorkbook,
  compact,
  getWorksheet,
  parseWorkbook,
  writeWorkbook,
} from './Utils.js';

let workbook = null;

export const setWorkbook = wb => (workbook = wb);

// The worksheet source: the content just given, or the workbook last parsed
const useWorkbook = (content, options) => {
  if (content) {
    workbook = parseWorkbook(content, options);
  }
  if (!workbook) {
    throw new Error(
      'sheetjs: no workbook to read. Pass file content, or call parse() first.'
    );
  }
  return workbook;
};

/**
 * State object
 * @typedef {Object} SheetjsState
 * @property data - the result of the spreadsheet operation
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/

/**
 * File content to read. Accepts a Buffer, a Uint8Array, a base64 string, a
 * base64 data URL, or the raw text of a CSV file.
 * @typedef {Buffer|Uint8Array|string} FileContent
 * @private
 **/

/**
 * Options for parsing a spreadsheet file.
 * See {@link https://docs.sheetjs.com/docs/api/parse-options SheetJS parse options}.
 * @typedef {Object} ParseOptions
 * @public
 * @property {'buffer'|'base64'|'string'|'binary'|'array'} type - How to interpret the content. Auto-detected if omitted.
 * @property {boolean} cellDates - Return dates as JS `Date` objects rather than Excel serial numbers. Default: `true`.
 * @property {number} sheetRows - Only parse the first N rows of each sheet.
 * @property {boolean} raw - Return raw, unformatted cell values.
 * @property {string} password - Password for an encrypted workbook.
 */

/**
 * Options for converting a worksheet to JSON.
 * See {@link https://docs.sheetjs.com/docs/api/utilities/array#array-output SheetJS array output}.
 * @typedef {Object} SheetToJsonOptions
 * @public
 * @property {string} sheetName - Name of the sheet to convert. Defaults to the first sheet.
 * @property {number} sheetIndex - Zero-based index of the sheet to convert. Ignored if `sheetName` is set.
 * @property {number|string[]} header - `1` for an array of arrays, or an array of column names to use as keys.
 * @property {string|number} range - Range to read, eg `'A2:D40'`, or a row number to start from.
 * @property {boolean} raw - Return raw cell values (numbers as numbers, dates as `Date`). Set `false` to get each cell's formatted text instead. Default: `true`.
 * @property {*} defval - Value to use for empty cells. Omitted from the row by default.
 * @property {string} dateNF - Date format to use when stringifying dates.
 * @property {boolean} blankrows - Include blank rows in the output.
 * @property {'buffer'|'base64'|'string'|'binary'|'array'} type - Content type, when passing raw file content.
 */

/**
 * Options for converting a worksheet to CSV.
 * See {@link https://docs.sheetjs.com/docs/api/utilities/csv#delimiter-separated-output SheetJS CSV output}.
 * @typedef {Object} SheetToCsvOptions
 * @public
 * @property {string} sheetName - Name of the sheet to convert. Defaults to the first sheet.
 * @property {number} sheetIndex - Zero-based index of the sheet to convert. Ignored if `sheetName` is set.
 * @property {string} FS - Field separator. Default: `','`.
 * @property {string} RS - Row separator. Default: `'\n'`.
 * @property {boolean} blankrows - Include blank rows in the output. Default: `true`.
 * @property {boolean} rawNumbers - Use raw numbers rather than formatted text.
 * @property {string} dateNF - Date format to use when stringifying dates.
 * @property {boolean} strip - Strip trailing field separators from each record.
 * @property {'buffer'|'base64'|'string'|'binary'|'array'} type - Content type, when passing raw file content.
 */

/**
 * Options for building a spreadsheet file from JSON.
 * See {@link https://docs.sheetjs.com/docs/api/write-options SheetJS write options}.
 * @typedef {Object} JsonToSheetOptions
 * @public
 * @property {string} sheetName - Name of the worksheet, max 31 characters. Default: `'Sheet1'`.
 * @property {string} bookType - Output file format, eg `'xlsx'`, `'xls'`, `'csv'`, `'ods'`. Default: `'xlsx'`. Note that `'csv'` output is prefixed with a UTF-8 BOM.
 * @property {'buffer'|'base64'} output - Return the file as a Buffer or a base64 string. Default: `'buffer'`.
 * @property {string[]} header - Column keys, in order. Controls which columns appear and in what order.
 * @property {boolean} skipHeader - Omit the header row.
 * @property {boolean} cellDates - Write `Date` values as date cells rather than serial numbers. Default: `true`.
 * @property {string} dateNF - Date format to use for date cells.
 */

/**
 * Parse spreadsheet file content into a workbook.
 *
 * Writes `{ sheetNames }` to `state.data`. The workbook itself is held in
 * memory for the rest of the job, so `sheetToJson()` and `sheetToCsv()` can
 * read it without re-parsing the file.
 *
 * Handles `.xlsx`, `.xls`, `.csv` and every other format SheetJS supports.
 * Buffers, base64 strings and data URLs are detected automatically - pass
 * `type` to override, eg for a single-column CSV that is also valid base64.
 * @public
 * @example <caption>Parse a base64 file fetched by a previous step</caption>
 * parse($.data.fileContent);
 * @example <caption>Declare the content type explicitly</caption>
 * parse($.data.fileContent, { type: 'base64' });
 * @example <caption>Keep Excel date serial numbers instead of Date objects</caption>
 * parse($.data.fileContent, { cellDates: false });
 * @function
 * @param {FileContent} content - The file content to parse
 * @param {ParseOptions} options - Optional parse options
 * @state {SheetjsState}
 * @returns {Operation}
 */
export function parse(content, options = {}) {
  return state => {
    const [resolvedContent, resolvedOptions] = expandReferences(
      state,
      content,
      options
    );

    workbook = parseWorkbook(resolvedContent, resolvedOptions);

    return composeNextState(state, { sheetNames: workbook.SheetNames });
  };
}

/**
 * Convert a worksheet into an array of objects, one per row, and write it to
 * `state.data`.
 *
 * Pass file content to convert it directly, or `null` to reuse the workbook
 * from an earlier `parse()` and skip re-parsing the file.
 *
 * Reads the first sheet unless `sheetName` or `sheetIndex` says otherwise.
 * @public
 * @example <caption>Convert the first sheet of a file to JSON</caption>
 * sheetToJson($.data.fileContent);
 * @example <caption>Convert a named sheet from an earlier parse()</caption>
 * parse($.data.fileContent);
 * sheetToJson(null, { sheetName: 'Sheet1', raw: false });
 * @example <caption>Return rows as arrays of cell values instead of objects</caption>
 * sheetToJson($.data.fileContent, { header: 1 });
 * @example <caption>Only read a fixed range, and fill empty cells</caption>
 * sheetToJson($.data.fileContent, { range: 'A2:D40', defval: null });
 * @function
 * @param {FileContent} content - File content to convert, or `null` to reuse an earlier `parse()`
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

    const {
      sheetName,
      sheetIndex,
      type,
      cellDates,
      sheetRows,
      header,
      range,
      raw,
      defval,
      dateNF,
      blankrows,
    } = resolvedOptions;

    const { worksheet } = getWorksheet(
      useWorkbook(resolvedContent, compact({ type, cellDates, sheetRows })),
      { sheetName, sheetIndex }
    );

    const rows = xlsx.utils.sheet_to_json(
      worksheet,
      compact({ header, range, raw, defval, dateNF, blankrows })
    );

    return composeNextState(state, rows);
  };
}

/**
 * Convert a worksheet into a CSV string and write it to `state.data`.
 *
 * Pass file content to convert it directly, or `null` to reuse the workbook
 * from an earlier `parse()`.
 *
 * Reads the first sheet unless `sheetName` or `sheetIndex` says otherwise.
 * @public
 * @example <caption>Convert an uploaded xlsx file straight to CSV</caption>
 * sheetToCsv($.data.fileContent);
 * @example <caption>Convert a named sheet from an earlier parse()</caption>
 * parse($.data.fileContent);
 * sheetToCsv(null, { sheetName: 'Orders' });
 * @example <caption>Use a semi-colon as the field separator</caption>
 * sheetToCsv($.data.fileContent, { FS: ';' });
 * @function
 * @param {FileContent} content - File content to convert, or `null` to reuse an earlier `parse()`
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

    const {
      sheetName,
      sheetIndex,
      type,
      cellDates,
      sheetRows,
      FS,
      RS,
      blankrows,
      rawNumbers,
      dateNF,
      strip,
    } = resolvedOptions;
    const { worksheet } = getWorksheet(
      useWorkbook(resolvedContent, compact({ type, cellDates, sheetRows })),
      { sheetName, sheetIndex }
    );

    const csv = xlsx.utils.sheet_to_csv(
      worksheet,
      compact({ FS, RS, blankrows, rawNumbers, dateNF, strip })
    );

    return composeNextState(state, csv);
  };
}

/**
 * Build a spreadsheet file from an array of objects.
 *
 * Writes `{ buffer, bookType, sheetName }` to `state.data` - or
 * `{ base64, ... }` with `output: 'base64'` - ready for an `http`, `sftp` or
 * `googledrive` step to upload.
 *
 * Column headers come from the keys of the data; pass `header` to fix their
 * order. Values are always written as text, never formulas, but CSV has no
 * cell types - sanitise untrusted data before writing a CSV someone will open
 * in a spreadsheet app.
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
      header,
      skipHeader,
      cellDates,
      dateNF,
      compression,
    } = resolvedOptions;

    // Named to avoid shadowing the module-level `workbook`: building a file
    // must not disturb the workbook cached by parse()
    const outputWorkbook = buildWorkbook(resolvedData, {
      sheetName,
      header,
      skipHeader,
      cellDates,
      dateNF,
    });

    const file = writeWorkbook(outputWorkbook, {
      bookType,
      output,
      compression,
    });

    return composeNextState(state, {
      [output]: file,
      bookType,
      sheetName,
    });
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
