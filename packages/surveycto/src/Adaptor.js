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
} from './Utils';

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
 * List datasets from the SurveyCTO API
 * @public
 * @example <caption>List all datasets</caption>
 * listDatasets();
 * @example <caption>List datasets with pagination options</caption>
 * listDatasets({
 *   limit: 2,
 * });
 * @function
 * @param {object} options - Optional request query options. [See the API docs for details](https://developer.surveycto.com/api-v2.html#getdatasets-parameters)
 * @property {number} options.limit - Maximum number of datasets to return. Defaults to 20. Maximum is 1000.
 * @property {string} options.cursor - Optional string to specify the starting point of the next page of results.
 * @returns {Operation}
 */
export function listDatasets(options = {}) {
  return async state => {
    const results = [];
    const [resolvedOptions] = expandReferences(state, options);

    const userLimit = resolvedOptions?.limit
      ? Number(resolvedOptions.limit)
      : undefined;

    let cursor = resolvedOptions?.cursor ? resolvedOptions.cursor : null;

    const baseQuery = { ...resolvedOptions };
    delete baseQuery.limit;
    delete baseQuery.cursor;

    const pageSize = 20; // when no limit is given get 20 at a time
    const maxFetchSize = 1000; // server max is 1000 per request

    const desiredFetchTotal = userLimit ?? Infinity;

    if (Number.isFinite(desiredFetchTotal) && desiredFetchTotal <= 0) {
      return prepareNextState(state, {
        data: [],
        total: 0,
        nextCursor: cursor,
      });
    }

    do {
      const remaining = desiredFetchTotal - results.length;
      const perPage = Number.isFinite(desiredFetchTotal)
        ? Math.min(remaining, maxFetchSize)
        : pageSize;

      const response = await requestHelper(state, '/datasets', {
        method: 'GET',
        query: {
          ...baseQuery,
          limit: perPage,
          ...(cursor ? { cursor } : {}),
        },
      });

      const body = response.body || {};
      const page = body.data ?? [];
      const next = body.nextCursor ?? null;

      results.push(...page);
      cursor = next;
    } while (cursor && results.length < desiredFetchTotal);

    const final = Number.isFinite(desiredFetchTotal)
      ? results.slice(0, desiredFetchTotal)
      : results;

    return composeNextState(state, {
      data: final,
      total: final.length,
      nextCursor: cursor,
    });
  };
}

/**
 *  Get a single dataset from SurveyCTO API
 * @public
 * @example <caption>List a dataset with id</caption>
 * getDataset('new_dataset')
 * @example <caption>List a dataset in csv format</caption>
 * getDataset('new_dataset', {
 *      asAttachment: true
 * })
 * @function
 * @param {string} datasetId - ID of the dataset to fetch
 * @param {object} options - Optional request options
 * @param {boolean} options.asAttachment - Set to true to download the dataset as a CSV file attachment. Defaults to false.
 * @returns {Operation}
 */
export function getDataset(datasetId, options = {}) {
  return async state => {
    const [resolvedDatasetId, resolvedOptions] = expandReferences(
      state,
      datasetId,
      options
    );
    const { asAttachment } = resolvedOptions || {};
    delete resolvedOptions?.asAttachment;

    const response = await requestHelper(
      state,
      asAttachment === true
        ? `datasets/data/csv/${resolvedDatasetId}`
        : `/datasets/${resolvedDatasetId}`,
      {
        method: 'GET',
        ...(asAttachment
          ? {
              headers: {
                Accept: 'text/csv',
              },
              query: { asAttachment },
            }
          : {}),
        ...resolvedOptions,
      }
    );
    return prepareNextState(state, response);
  };
}

/**
 *  Upsert a dataset. This will atomically update a dataset if it already exists, or otherwise create it
 * @public
 * @example <caption>Upsert a dataset</caption>
 * upsertDataset('enum_dataset', {
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
 * @param {string} datasetId - ID of the dataset supplied to the `get` and the `put` endpoints
 * @param {object} data - The dataset object to create or update
 * @returns {Operation}
 */
export function upsertDataset(datasetId, data) {
  return async state => {
    const [resolvedDatasetId, resolvedData] = expandReferences(
      state,
      datasetId,
      data
    );

    let exists = false;

    try {
      const results = await requestHelper(
        state,
        `/datasets/${resolvedDatasetId}`,
        {
          method: 'GET',
        }
      );

      exists = !!results && !!results.statusCode && results.statusCode === 200;
    } catch (error) {
      exists = false;
    }

    const url = exists ? `/datasets/${resolvedDatasetId}` : `/datasets`;
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
 * Delete a dataset from SurveyCTO API
 * @public
 * @example <caption>Delete a dataset</caption>
 * deleteDataset('enumeratorses_dataset');
 * @function
 * @param {string} datasetId - ID of the dataset to delete
 * @returns {Operation}
 */
export function deleteDataset(datasetId) {
  return async state => {
    const [resolvedDatasetId] = expandReferences(state, datasetId);

    const response = await requestHelper(
      state,
      `/datasets/${resolvedDatasetId}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    return prepareNextState(state, response);
  };
}

/**
 * Purge a dataset. This action removes all data records from the dataset while keeping the dataset structure intact
 * @public
 * @example <caption>Purge a dataset</caption>
 * purgeDataset('new_dataset')
 * @function
 * @param {string} datasetId - ID of the dataset to purge.
 * @returns {Operation}
 */
export function purgeDataset(datasetId) {
  return async state => {
    const [resolvedDatasetId] = expandReferences(state, datasetId);

    const response = await requestHelper(
      state,
      `/datasets/${resolvedDatasetId}/purge`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    return prepareNextState(state, response);
  };
}

/**
 * List dataset records from the SurveyCTO API
 * @public
 * @example <caption>List all records of a dataset </caption>
 * listRecords('new_dataset');
 * @example <caption>List datasets records with options</caption>
 * listRecords('new_dataset', {
 *   limit: 2,
 * });
 * @function
 * @param {string} datasetId - ID of the dataset to fetch records from
 * @param {object} options - Optional request query options. [See the API docs for details](https://developer.surveycto.com/api-v2.html#getallrecords-parameters)
 * @returns {Operation}
 */
export function listRecords(datasetId, options) {
  return async state => {
    const [resolvedDatasetId, resolvedOptions] = expandReferences(
      state,
      datasetId,
      options
    );

    const response = await requestHelper(
      state,
      `/datasets/${resolvedDatasetId}/records`,
      {
        method: 'GET',
        query: {
          ...resolvedOptions,
        },
      }
    );
    return prepareNextState(state, response);
  };
}

/**
 * Get a single dataset record from the SurveyCTO API
 * @public
 * @example <caption>Get a dataset record </caption>
 * getRecord('enumerators_dataset', 2);
 * @function
 * @param {string} datasetId - ID of the dataset to fetch records from
 * @param {string} recordId - ID of the record to be fetched
 * @returns {Operation}
 */
export function getRecord(datasetId, recordId) {
  return async state => {
    const [resolvedDatasetId, resolvedRecordId] = expandReferences(
      state,
      datasetId,
      recordId
    );

    const response = await requestHelper(
      state,
      `/datasets/${resolvedDatasetId}/record`,
      {
        method: 'GET',
        query: {
          recordId: resolvedRecordId,
        },
      }
    );
    return prepareNextState(state, response);
  };
}

/**
 *  Upsert a record. This will atomically update a record if it already exists, or otherwise create it
 * @public
 * @example <caption>Upsert a dataset record</caption>
 * upsertRecord('enumerators_dataset', 2, {
 *   id: '2',
 *   name: 'Trial update',
 *   users: 'All users',
 * });
 * @function
 * @param {string} datasetId - ID of the dataset
 * @param {string} recordId - ID of the record to be updated or created
 * @param {object} data - The record object to create or update
 * @returns {Operation}
 */
export function upsertRecord(datasetId, recordId, data) {
  return async state => {
    const [resolvedDatasetId, resolvedRecordId, resolvedData] =
      expandReferences(state, datasetId, recordId, data);

    const response = await requestHelper(
      state,
      `/datasets/${resolvedDatasetId}/record`,
      {
        method: 'PATCH',
        body: resolvedData,
        query: {
          recordId: resolvedRecordId,
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
 * Delete a record from a dataset in SurveyCTO API
 * @public
 * @example <caption>Delete a dataset record</caption>
 * deleteRecord('enumerators_dataset', 2);
 * @function
 * @param {string} datasetId - ID of the dataset
 * @param {string} recordId - ID of the record to be deleted
 * @returns {Operation}
 */
export function deleteRecord(datasetId, recordId) {
  return async state => {
    const [resolvedDatasetId, resolveRecordId] = expandReferences(
      state,
      datasetId,
      recordId
    );

    const response = await requestHelper(
      state,
      `/datasets/${resolvedDatasetId}/record`,
      {
        method: 'DELETE',
        query: {
          recordId: resolveRecordId,
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
 * @returns {Operation}
 */
export function request(path, params) {
  return async state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    const response = await requestHelper(state, resolvedPath, resolvedParams);
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
