import {
  execute as commonExecute,
  cursor as commonCursor,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import {
  convertDate,
  requestHelper,
  convertJSONToCSV,
  prepareNextState,
  requestWithPagination,
} from './Utils.js';

/**
 * State object
 * @typedef {Object} SurveyCTOState
 * @property data - the parsed response body
 * @property response - the response from the SurveyCTO server, including headers, statusCode etc
 * @property references - an array of all previous data objects used in the Job.
 **/

/**
 * List State object
 * @typedef {Object} SurveyCTOListState
 * @property data - the parsed response body
 * @property response - the response from the server with `total` and `nextCursor`
 * @property references - an array of all previous data objects used in the Job.
 **/

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
 * @public
 * @function
 * @param {string} formId - Form id
 * @param {FetchSubmissionOptions} options - Form submission date, format, status parameters
 * @returns {Operation}
 * @state {SurveyCTOState}
 */
export function fetchSubmissions(formId, options = {}) {
  return async state => {
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

    const response = await requestHelper(state, path, {
      headers: {
        'content-type': contentType,
      },
      query: {
        date,
        r: status,
      },
    });

    return prepareNextState(state, response);
  };
}

/**
 * List resources from SurveyCTO
 * @public
 * @example <caption>List all dataset records</caption>
 * list(`datasets/${$.datasetId}/records`)
 * @example <caption>List all datasets</caption>
 * list('datasets')
 * @example <caption>List dataset records with pagination options</caption>
 * list(`datasets/${$.datasetId}/records`,{
 *   limit: 2,
 * });
 * @example <caption>List datasets with pagination options</caption>
 * list('datasets',{
 *   limit: 2,
 * });
 * @function
 * @param {string} resource - Resource to fetch
 * @param {object} options - Optional request query options. [See the API docs for details](https://developer.surveycto.com/api-v2.html#getdatasets-parameters)
 * @property {number} options.limit - Maximum number of items to return. Defaults to 20. Maximum is 1000.
 * @property {string} options.cursor - Optional string to specify the starting point of the next page of results.
 * @returns {Operation}
 * @state {SurveyCTOListState}
 */
export function list(resource, options = {}) {
  return async state => {
    const [resolvedResource, resolvedOptions] = expandReferences(
      state,
      resource,
      options
    );

    const result = await requestWithPagination(
      state,
      resolvedResource,
      resolvedOptions
    );
    return result;
  };
}

/**
 * Update (if exist) or create a dataset in SurveyCTO
 * @public
 * @example <caption>Upsert a dataset</caption>
 * upsertDataset({
 *   id: 'enum_dataset',
 *   title: 'Enum Dataset',
 *   discriminator: 'ENUMERATORS',
 *   locationContext: {
 *     parentGroupId: 1,
 *     siblingAbove: {
 *       id: 'new_dataset',
 *       itemClass: 'DATASET',
 *     },
 *   },
 *   allowOfflineUpdates: false,
 *   idFormatOptions: {
 *     prefix: 'enum',
 *     suffix: '',
 *     numberOfDigits: '8',
 *     allowCapitalLetters: true,
 *   },
 * });
 * @function
 * @param {object} data - The dataset object to create or update
 * @returns {Operation}
 * @state {SurveyCTOState}
 */
export function upsertDataset(data) {
  return async state => {
    const [resolvedData] = expandReferences(state, data);

    let exists = false;

    const datasetId = resolvedData?.id;

    try {
      const results = await requestHelper(state, `/datasets/${datasetId}`, {
        method: 'GET',
      });

      exists = !!results && !!results.statusCode && results.statusCode === 200;
    } catch (error) {
      exists = false;
    }

    const url = exists ? `/datasets/${datasetId}` : `/datasets`;
    const method = exists ? 'PUT' : 'POST';

    const response = await requestHelper(state, url, {
      method,
      body: resolvedData,
      headers: {
        'content-type': 'application/json',
      },
    });

    return prepareNextState(state, response);
  };
}

/**
 *  Update (if exist) or create a dataset record in SurveyCTO
 * @public
 * @example <caption>Upsert a dataset record</caption>
 * upsertRecord('enumerators_dataset', {
 *   id: '2',
 *   name: 'Trial update',
 *   users: 'All users',
 * });
 * @function
 * @param {string} datasetId - ID of the dataset
 * @param {object} data - The record object to create or update
 * @returns {Operation}
 * @state {SurveyCTOState}
 */
export function upsertRecord(datasetId, data) {
  return async state => {
    const [resolvedDatasetId, resolvedData] = expandReferences(
      state,
      datasetId,
      data
    );

    const resultId = resolvedData?.id;

    const response = await requestHelper(
      state,
      `/datasets/${resolvedDatasetId}/record`,
      {
        method: 'PATCH',
        body: resolvedData,
        query: {
          recordId: resultId,
        },
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    return prepareNextState(state, response);
  };
}

/**
 * Upload CSV dataset records
 * @public
 * @example <caption>Upload records</caption>
 * uploadCsvRecords('enumerators_dataset', [
 *   {
 *     id: '4',
 *     name: 'Trial update',
 *     users: 'All users',
 *   },
 *   {
 *     id: '5',
 *     name: 'Trials',
 *     users: 'All users here',
 *   },
 * ]);
 * @example <caption>Upload records with metadata</caption>
 * uploadCsvRecords(
 *   'enumerators_dataset',
 *   [
 *     {
 *       id: '4',
 *       name: 'Trial update',
 *       users: 'All users',
 *     },
 *     {
 *       id: '5',
 *       name: 'Trials',
 *       users: 'All users here',
 *     },
 *   ],
 *   {
 *     uploadMode: 'MERGE',
 *     joiningField: 'id',
 *   }
 * );
 * @function
 * @param {string} datasetId - ID of the dataset
 * @param {string} rows - An array of JSON objects to be uploaded as records. The data will be converted to CSV format before upload.
 * @param {object} metadata - Optional metadata for configuring how the uploaded data should be processed
 * @property {string} joiningField - Optional field name to use for merging records. Required when uploadMode is `MERGE`.
 * @property {string} uploadMode - Optional upload mode. One of `APPEND` (default), `MERGE` and `CLEAR`.
 * @returns {Operation}
 * @state {SurveyCTOState}
 */
export function uploadCsvRecords(datasetId, rows, metadata = {}) {
  return async state => {
    const [resolvedDatasetId, resolvedRows, resolvedMetadata] =
      expandReferences(state, datasetId, rows, metadata);

    const file = convertJSONToCSV(resolvedRows);

    const data = new FormData();
    data.append('file', new Blob([file], { type: 'text/csv' }), 'data.csv');

    if (Object.keys(resolvedMetadata).length) {
      data.append(
        'metadata',
        new Blob([JSON.stringify(resolvedMetadata)], {
          type: 'application/json',
        }),
        'metadata.json'
      );
    }

    const response = await requestHelper(
      state,
      `/datasets/${resolvedDatasetId}/records/upload`,
      {
        method: 'POST',
        body: data,
      }
    );

    return prepareNextState(state, response);
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

    const csvBuffer = convertJSONToCSV(resolvedRows);

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
