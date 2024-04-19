import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { requestHelper, makeSurveyCTODate } from './Utils';

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
 * Options provided to the HTTP request
 * @typedef {Object} FormSubmissionOptions
 * @property {string} [date=0] - Form completion or submission date. Default to `0` which will return all submission data
 * @property {string} [format='json'] - Form response type, It can be in `csv` or `json`. Default to `json`
 * @property {string} status - (Opt)Review status. Can be either, `approved`, `rejected`, `pending` or combine eg `approved|rejected`.
 */

/**
 * Fetch form submissions
 * @example <caption>Using state lazy load</caption>
 * fetchSubmissions($.formId || 'test', { date: '2024-04-18' });
 * @example <caption> With huma readable date</caption>
 * fetchSubmissions('test', { date: 'Apr 18, 2024 6:26:21 AM' });
 * @example <caption> Formatting the results to CSV String</caption>
 * fetchSubmissions('test', { date: '2024-04-20', format: 'csv' });
 * @example <caption> With reviewStatus filter</caption>
 * fetchSubmissions('test', {
 *   date: '2024-04-18',
 *   status: 'approved|rejected',
 * });
 * @example <caption> With access to the callback</caption>
 * fetchSubmissions(
 *   'test',
 *   {
 *     date: 'Apr 18, 2024 6:26:21 AM',
 *     status: 'approved|rejected',
 *   },
 *   state => {
 *     console.log('Hello from the callback!');
 *     return state;
 *   }
 * );
 * @function
 * @param {string} formId - Form id
 * @param {FormSubmissionOptions} options - Form submission date, timestamp, format, status parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function fetchSubmissions(
  formId,
  options = { date: 0, format: 'json' },
  callback = s => s
) {
  return state => {
    const [resovledFormId, { date, format, status }] = expandReferences(
      state,
      formId,
      options
    );

    const path =
      format === 'csv'
        ? `/forms/data/csv/${resovledFormId}`
        : `/forms/data/wide/${format}/${resovledFormId}`;

    const contentType =
      format === 'csv' ? 'text/plain;charset=UTF-8' : 'application/json';

    console.log(`Fetching '${resovledFormId}' submissions for: ${date}`);

    return requestHelper(
      state,
      path,
      {
        headers: {
          'content-type': contentType,
        },
        query: {
          date: makeSurveyCTODate(date),
          r: status,
        },
      },
      callback
    );
  };
}

/**
 * Options provided to the SurveyCTO API request
 * @typedef {Object} RequestOptions
 * @property {object} headers - An object of headers parameters.
 * @property {object} body - Body data to append to the request.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {string} [method = GET] - The HTTP method to use. Defaults to `GET`
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

export {
  fn,
  chunk,
  merge,
  field,
  fields,
  cursor,
  dataPath,
  parseCsv,
  dataValue,
  alterState,
  sourceValue,
  lastReferenceValue,
} from '@openfn/language-common';
