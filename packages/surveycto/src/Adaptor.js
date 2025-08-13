import {
  execute as commonExecute,
  cursor as commonCursor,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { convertDate, requestHelper } from './Utils';
import xlsx from 'xlsx';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Options provided to `fetchSubmissions()`
 * @typedef {Object} FetchSubmissionOptions
 * @public
 * @property {string} [date=0] - Fetch only submissions from this timestamp. Acccepts SuvreyCTO date strings, unix and epoch timestamps, and ISO dates. By default, all submissions will be retrieved.
 * @property {string} [format=json] - Format the submission data type as  `csv` or `json`.
 * @property {string} [status] - Review status. Can be either, `approved`, `rejected`, `pending` or combine eg `approved|rejected`.
 */

/**
 * Fetch form submissions.
 *
 * If a date filter is provided, it will be  converted internally to the surveyCTO `MMM dd, yyy h:mm:ss` format (in UTC time).
 * @example <caption>Fetch all form submissions</caption>
 * fetchSubmissions('test');
 * @example <caption> With SurveyCTO date format (UTC)</caption>
 * fetchSubmissions('test', { date: 'Apr 18, 2024 6:26:21 AM' });
 * @example <caption>Using a rolling cursor </caption>
 * cursor((state) => state.cursor, { defaultValue: 'today' });
 * fetchSubmissions('test', { date: (state) => state.cursor, format: 'csv' });
 * cursor('now');
 * @example <caption> Formatting the results to CSV String</caption>
 * fetchSubmissions('test', { format: 'csv' });
 * @example <caption> With reviewStatus filter</caption>
 * fetchSubmissions('test', { status: 'approved|rejected' });
 * @example <caption> With a callback function</caption>
 * fetchSubmissions(
 *   'test',
 *   {
 *     date: 'Apr 18, 2024 6:26:21 AM',
 *   },
 *   state => {
 *     console.log('Hello from the callback!');
 *     return state;
 *   }
 * );
 * @public
 * @function
 * @param {string} formId - Form id
 * @param {FetchSubmissionOptions} options - Form submission date, format, status parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function fetchSubmissions(formId, options = {}, callback = s => s) {
  return state => {
    const [resolvedFormId, resolvedOptions] = expandReferences(
      state,
      formId,
      options
    );

    let { date = 0, format = 'json', status } = resolvedOptions;

    if (date) {
      // Ensure the incoming date is in surveyCTO `MMM dd, yyy h:mm:ss a`
      date = convertDate(date);
    }

    const path =
      format === 'csv'
        ? `forms/data/csv/${resolvedFormId}`
        : `forms/data/wide/${format}/${resolvedFormId}`;

    const contentType =
      format === 'csv' ? 'text/plain;charset=UTF-8' : 'application/json';

    console.log(`Fetching '${resolvedFormId}' submissions for: ${date}`);

    return requestHelper(
      state,
      path,
      {
        headers: {
          'content-type': contentType,
        },
        query: {
          date,
          r: status,
        },
      },
      callback
    );
  };
}

/**
 * Options provided to request()
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} [headers] - An object of headers parameters.
 * @property {object} [body] - Body data to append to the request.
 * @property {object} [query] - An object of query parameters to be encoded into the URL.
 * @property {object} [contentType] - Set the content-type header to the appropriate format. Supported values: `json` and `form`
 * @property {string} [method = GET] - The HTTP method to use.
 */

/**
 * Make a HTTP request to the SurveyCTO API
 * @public
 * @example <caption>Post JSON data to SurveyCTO</caption>
 * request("/anEndpoint", {
 *   method: "POST",
 *    contentType: "json",
 *   body: { foo: "bar", a: 1 },
 * });
 * @example <caption>Upload a CSV blob to a dataset</caption>
 *   request('datasets/library/records/upload', {
 *     method: 'POST',
 *     contentType: 'form',
 *     body: {
 *       file: {
 *         blob: $.data,
 *         type: 'text/csv',
 *         filename: 'library.csv'
 *       }
 *     },
 *   });
 * @function
 * @param {string} path - Path to resource
 * @param {RequestOptions} params - Query, body and method parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function request(path, params, callback = s => s) {
  return state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    return requestHelper(state, resolvedPath, resolvedParams, callback);
  };
}

/**
 * Sets `state.cursor` to a SurveyCTO timestamp string (`MMM dd, yyy h:mm:ss a`).
 * This supports natural language dates like `now`, `today`, `yesterday`, `n hours ago`, `n days ago`, and `start`,
 * which will be converted into timestamp strings.
 * See the usage guide at {@link https://docs.openfn.org/documentation/jobs/job-writing-guide#using-cursors}
 * @public
 * @example <caption>Use a cursor from state if present, or else use the default value</caption>
 * cursor('today')
 * fetchSubmissions('test', { date: $.cursor });
 * @function
 * @param {any} value - the cursor value. Usually an ISO date, natural language date, or page number
 * @param {object} options - options to control the cursor.
 * @param {string} options.key - set the cursor key. Will persist through the whole run.
 * @param {any} options.defaultValue - the value to use if value is falsy
 * @param {Function} options.format - custom formatter for the final cursor value
 * @returns {Operation}
 */
export function cursor(value, options) {
  const opts = {
    format: convertDate,
    ...options,
  };
  return commonCursor(value, opts);
}

/**
 * Converts an array of objects to a CSV buffer.
 * @public
 * @example
 * jsonToCSVBuffer([
 *  {
 *     lastName: 'Rothfuss',
 *     firstName: 'Patrick',
 *     book: 'The Name of the Wind'
 *   },
 *  {
 *     lastName: 'Martin',
 *     firstName: 'George',
 *     book: 'A Game of Thrones'
 *   },
 * ])
 * @param {*} rows An array of JSON objects.
 * @returns {Operation}
 */
export function jsonToCSVBuffer(rows) {
  return state => {
    const [resolvedRows] = expandReferences(state, rows);

    const worksheet = xlsx.utils.json_to_sheet(resolvedRows);

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');

    const csvBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'csv' });

    return composeNextState(state, csvBuffer);
  };
}

export {
  fn,
  fnIf,
  chunk,
  merge,
  field,
  fields,
  dateFns,
  dataPath,
  parseCsv,
  dataValue,
  alterState,
  sourceValue,
  lastReferenceValue,
} from '@openfn/language-common';
