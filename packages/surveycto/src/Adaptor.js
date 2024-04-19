import { execute as commonExecute, dateFns } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { requestHelper, prepareNextState, formDate } from './Utils';

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
 * @property {string} [timestamp='milliseconds'] - Form date format. Default to `milliseconds`
 * @property {string} status - (Opt)Review status. Can be either, `approved`, `rejected`, `pending` or combine eg `approved | rejected`.
 */

/**
 * Fetch form submissions
 * @example
 * fetchSubmissions('1234', { date: '2023-01-23'})
 * @function
 * @param {string} formId - Form id
 * @param {FormSubmissionOptions} options - Form submission date, timestamp, format, status parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function fetchSubmissions(formId, options, callback = s => s) {
  return state => {
    const [resovledFormId, resolvedOptions] = expandReferences(
      state,
      formId,
      options
    );

    const {
      date,
      format,
      timestamp,
      status: r,
    } = {
      ...{ date: 0, format: 'json', timestamp: 'milliseconds' },
      ...resolvedOptions,
    };

    console.log(`Fetching form submissions by formId: ${resovledFormId}`);

    return requestHelper(
      state,
      `/forms/data/wide/${format}/${resovledFormId}`,
      {
        query: {
          date: formDate(date, timestamp),
          r,
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
export function request(path, params, callback) {
  return state => {
    const [
      resolvedPath,
      { body = {}, query = {}, method = 'GET', headers = {} },
    ] = expandReferences(state, path, params);

    return requestHelper(
      state,
      resolvedPath,
      { method, body, query, headers },
      callback
    );
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
