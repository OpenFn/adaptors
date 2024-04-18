import { execute as commonExecute, dateFns } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request, prepareNextState, formDate } from './Utils';

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
 * @property {string} date - Form completion or submission date
 * @property {string} [format='json'] - Form response type, It can be in csv or json. Default to json
 * @property {string} [timestamp='milliseconds'] - Form date format. Default
 * @property {string} status - Form submission review status
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
  return async state => {
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

    const response = await request(
      state,
      'GET',
      `/forms/data/wide/${format}/${resovledFormId}`,
      {},
      {
        date: formDate(date, timestamp),
        r,
      }
    );

    console.log(`Retrieved: ${response.body.length} form submissions`);

    return prepareNextState(state, response, callback);
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
