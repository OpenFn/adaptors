import {
  execute as commonExecute,
  cursor as commonCursor,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { convertDate, requestHelper } from './Utils';

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
 * @property {string} [date=0] - Fetches only submissions from this timestamp.
 * All values will be converted to surveyCTO `MMM dd, yyy h:mm:ss` format (in UTC time) in the request.
 * Unix and Epoch timestamps are supported, as well as ISO date representatons.
 * If set to 0, all submissions will be retrieved.
 * @property {string} [format=json] - Format the submission data type as  `csv` or `json`.
 * @property {string} [status] - Review status. Can be either, `approved`, `rejected`, `pending` or combine eg `approved|rejected`.
 */

/**
 * Fetch form submissions
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
export function fetchSubmissions(formId, options, callback = s => s) {
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
 * @property {object} [headers] - An object of headers parameters.
 * @property {object} [body] - Body data to append to the request.
 * @property {object} [query] - An object of query parameters to be encoded into the URL.
 * @property {string} [method = GET] - The HTTP method to use.
 */

/**
 * Make a request in SurveyCTO API
 * @public
 * @example
 * request("/anEndpoint", {
 *   method: "POST",
 *   query: { foo: "bar", a: 1 },
 * });
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
 * Sets `state.cursor` to a SurveyCTO `MMM dd, yyy h:mm:ss a` timestamp string.
 * Supports natural language dates like `now`, `today`, `yesterday`, `n hours ago`, `n days ago`, and `start`,
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

export {
  fn,
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
