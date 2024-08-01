/**
 * @typedef {object} State
 * @property {object} data JSON Data.
 * @property {Array<Reference>} references History of all previous operations.
 * @ignore
 */

/**
 * @typedef {function} Operation
 * @param {State} state
 * @ignore
 */

import {
  execute as commonExecute,
  composeNextState,
  chunk,
} from '@openfn/language-common';

import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

import flatten from 'lodash/flatten';

let anyAscii = undefined;

// use a dynamic import because any-ascii is pure ESM and doesn't play well with CJS
// This promise MUST be resolved by execute before a connection is created
const loadAnyAscii = state =>
  import('any-ascii').then(m => {
    anyAscii = m.default;
    return state;
  });

/**
 * Executes an operation.
 * @function
 * @private
 * @param {Operation} operations - Operations
 * @returns {State}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
    configuration: {},
  };

  return state => {
    return commonExecute(
      loadAnyAscii,
      util.createConnection,
      ...flatten(operations),
      util.removeConnection
    )({ ...initialState, ...state });
  };
}

/**
 * Create and execute a bulk job.
 * @public
 * @example <caption>Bulk insert</caption>
 * bulk(
 *   "Patient__c",
 *   "insert",
 *   (state) => state.patients.map((x) => ({ Age__c: x.age, Name: x.name })),
 *   { failOnError: true }
 * );
 * @example <caption>Bulk upsert</caption>
 * bulk(
 *   "vera__Beneficiary__c",
 *   "upsert",
 *   [
 *     {
 *       vera__Reporting_Period__c: 2023,
 *       vera__Geographic_Area__c: "Uganda",
 *       "vera__Indicator__r.vera__ExtId__c": 1001,
 *       vera__Result_UID__c: "1001_2023_Uganda",
 *     },
 *   ],
 *   { extIdField: "vera__Result_UID__c" }
 * );
 * @function
 * @param {string} sObjectName - API name of the sObject.
 * @param {string} operation - The bulk operation to be performed.Eg "insert" | "update" | "upsert"
 * @param {array} records - an array of records, or a function which returns an array.
 * @param {object} options - Options passed to the bulk api.
 * @param {string} [options.extIdField] - External id field.
 * @param {boolean} [options.allowNoOp=false] - Skipping bulk operation if no records.
 * @param {boolean} [options.failOnError=false] - Fail the operation on error.
 * @param {integer} [options.pollInterval=6000] - Polling interval in milliseconds.
 * @param {integer} [options.pollTimeout=240000] - Polling timeout in milliseconds.
 * @returns {Operation}
 */
export function bulk(sObjectName, operation, records, options = {}) {
  return state => {
    const { connection } = state;

    const [
      resolvedSObjectName,
      resolvedOperation,
      resolvedRecords,
      resolvedOptions,
    ] = expandReferences(state, sObjectName, operation, records, options);

    const {
      failOnError = false,
      allowNoOp = false,
      pollTimeout = 240000,
      pollInterval = 6000,
    } = resolvedOptions;

    if (allowNoOp && resolvedRecords.length === 0) {
      console.info(
        `No items in ${resolvedSObjectName} array. Skipping bulk ${resolvedOperation} operation.`
      );
      return state;
    }

    if (resolvedRecords.length > 10000)
      console.log('Your batch is bigger than 10,000 records; chunking...');

    const chunkedBatches = chunk(resolvedRecords, 10000);

    return Promise.all(
      chunkedBatches.map(
        chunkedBatch =>
          new Promise((resolve, reject) => {
            console.info(
              `Creating bulk ${resolvedOperation} job for ${resolvedSObjectName} with ${chunkedBatch.length} records`
            );

            const job = connection.bulk.createJob(
              resolvedSObjectName,
              resolvedOperation,
              resolvedOptions
            );

            job.on('error', err => reject(err));

            console.info('Creating batch for job.');
            var batch = job.createBatch();

            console.info('Executing batch.');
            batch.execute(chunkedBatch);

            batch.on('error', async function (err) {
              await job.close();
              console.error('Request error:');
              reject(err);
            });

            return batch
              .on('queue', function (batchInfo) {
                console.info(batchInfo);
                const batchId = batchInfo.id;
                var batch = job.batch(batchId);
                batch.poll(pollInterval, pollTimeout);
              })
              .then(async res => {
                await job.close();
                const errors = res
                  .map((r, i) => ({ ...r, position: i + 1 }))
                  .filter(item => {
                    return !item.success;
                  });

                errors.forEach(err => {
                  err[`${resolvedOptions.extIdField}`] =
                    chunkedBatch[err.position - 1][resolvedOptions.extIdField];
                });

                if (failOnError && errors.length > 0) {
                  console.error('Errors detected:');
                  reject(JSON.stringify(errors, null, 2));
                } else {
                  console.log('Result : ' + JSON.stringify(res, null, 2));
                  resolve(res);
                }
              });
          })
      )
    ).then(results => {
      console.log('Merging results arrays.');
      return composeNextState(state, results.flat());
    });
  };
}
/**
 * Execute an SOQL Bulk Query.
 * This function uses bulk query to efficiently query large data sets and reduce the number of API requests.
 * `bulkQuery()` uses {@link https://sforce.co/4azgczz Bulk API v.2.0 Query} which is available in API version 47.0 and later.
 * This API is subject to {@link https://sforce.co/4b6kn6z rate limits}.
 * @public
 * @example
 * <caption>The results will be available on `state.data`</caption>
 * bulkQuery(state=> `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`);
 * @example
 * bulkQuery(
 *   (state) =>
 *     `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`,
 *   { pollTimeout: 10000, pollInterval: 6000 }
 * );
 * @function
 * @param {string} qs - A query string.
 * @param {object} options - Options passed to the bulk api.
 * @param {integer} [options.pollTimeout=90000] - Polling timeout in milliseconds.
 * @param {integer} [options.pollInterval=3000] - Polling interval in milliseconds.
 * @returns {Operation}
 */
export function bulkQuery(qs, options = {}) {
  return async state => {
    const { connection } = state;
    const [resolvedQs, resolvedOptions] = expandReferences(state, qs, options);

    if (parseFloat(connection.version) < 47.0)
      throw new Error('bulkQuery requires API version 47.0 and later');

    const { pollTimeout = 90000, pollInterval = 3000 } = resolvedOptions;

    console.log(`Executing query: ${resolvedQs}`);

    const queryJob = await connection.request({
      method: 'POST',
      url: `/services/data/v${connection.version}/jobs/query`,
      body: JSON.stringify({
        operation: 'query',
        query: resolvedQs,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await util.pollJobResult(
      connection,
      queryJob,
      pollInterval,
      pollTimeout
    );

    return composeNextState(state, result);
  };
}

/**
 * Create a new sObject record(s).
 * @public
 * @example <caption> Single record creation</caption>
 * create("Account", { Name: "My Account #1" });
 * @example <caption> Multiple records creation</caption>
 * create("Account",[{ Name: "My Account #1" }, { Name: "My Account #2" }]);
 * @function
 * @param {string} sObjectName - API name of the sObject.
 * @param {object} records - Field attributes for the new record.
 * @returns {Operation}
 */
export function create(sObjectName, records) {
  return state => {
    let { connection } = state;
    const [resolvedSObjectName, resolvedRecords] = expandReferences(
      state,
      sObjectName,
      records
    );
    console.info(`Creating ${resolvedSObjectName}`, resolvedRecords);

    return connection
      .create(resolvedSObjectName, resolvedRecords)
      .then(recordResult => {
        console.log('Result : ' + JSON.stringify(recordResult));
        return composeNextState(state, recordResult);
      });
  };
}

/**
 * Fetches and prints metadata for an sObject and pushes the result to `state.data`.
 * If `sObjectName` is not specified, it will print the total number of all available sObjects and push the result to `state.data`.
 * @public
 * @example <caption>Fetch metadata for all available sObjects</caption>
 * describe()
 * @example <caption>Fetch metadata for Account sObject</caption>
 * describe('Account')
 * @function
 * @param {string} [sObjectName] - The API name of the sObject. If omitted, fetches metadata for all sObjects.
 * @returns {Operation}
 */
export function describe(sObjectName) {
  return state => {
    const { connection } = state;

    const [resolvedSObjectName] = expandReferences(state, sObjectName);

    return resolvedSObjectName
      ? connection
          .sobject(resolvedSObjectName)
          .describe()
          .then(result => {
            console.log('Label : ' + result.label);
            console.log('Num of Fields : ' + result.fields.length);

            return composeNextState(state, result);
          })
      : connection.describeGlobal().then(result => {
          const { sobjects } = result;
          console.log(`Retrieved ${sobjects.length} sObjects`);
          return composeNextState(state, result);
        });
  };
}

/**
 * Delete records of an object.
 * @public
 * @example
 * destroy('obj_name', [
 *  '0060n00000JQWHYAA5',
 *  '0090n00000JQEWHYAA5'
 * ], { failOnError: true })
 * @function
 * @param {string} sObjectName - API name of the sObject.
 * @param {object} ids - Array of IDs of records to delete.
 * @param {object} options - Options for the destroy delete operation.
 * @returns {Operation}
 */
export function destroy(sObjectName, ids, options = {}) {
  return state => {
    const { connection } = state;
    const [resolvedSObjectName, resolvedIds, resolvedOptions] =
      expandReferences(state, sObjectName, ids, options);

    const { failOnError = false } = resolvedOptions;

    console.info(`Deleting ${resolvedSObjectName} records`);

    return connection
      .sobject(resolvedSObjectName)
      .del(resolvedIds)
      .then(function (result) {
        const successes = result.filter(r => r.success);
        const failures = result.filter(r => !r.success);

        console.log(
          'Sucessfully deleted: ',
          JSON.stringify(successes, null, 2)
        );

        if (failures.length > 0) {
          console.log('Failed to delete: ', JSON.stringify(failures, null, 2));

          if (failOnError)
            throw 'Some deletes failed; exiting with failure code.';
        }

        return composeNextState(state, result);
      });
  };
}

/**
 * Send a GET HTTP request using connected session information.
 * @example
 * get('/actions/custom/flow/POC_OpenFN_Test_Flow');
 * @param {string} path - The Salesforce API endpoint, Relative to request from
 * @param {object} options - Request query parameters and headers
 * @returns {Operation}
 */
export function get(path, options = {}) {
  return async state => {
    const { connection } = state;
    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options
    );
    const { headers, ...query } = resolvedOptions;
    console.log(`GET: ${resolvedPath}`);
    const requestOptions = {
      url: resolvedPath,
      method: 'GET',
      query,
      headers: { 'content-type': 'application/json', ...headers },
    };

    const result = await connection.request(requestOptions);

    return composeNextState(state, result);
  };
}
/**
 * Alias for "create(sObjectName, attrs)".
 * @public
 * @example <caption> Single record creation</caption>
 * insert("Account", { Name: "My Account #1" });
 * @example <caption> Multiple records creation</caption>
 * insert("Account",[{ Name: "My Account #1" }, { Name: "My Account #2" }]);
 * @function
 * @param {string} sObjectName - API name of the sObject.
 * @param {object} records - Field attributes for the new record.
 * @returns {Operation}
 */
export function insert(sObjectName, records) {
  return create(sObjectName, records);
}

/**
 * Send a POST HTTP request using connected session information.
 *
 * @example
 * post('/actions/custom/flow/POC_OpenFN_Test_Flow', { inputs: [{}] });
 * @param {string} path - The Salesforce API endpoint, Relative to request from
 * @param {object} data - A JSON Object request body
 * @param {object} options - Request options
 * @param {object} [options.headers] - Object of request headers
 * @param {object} [options.query] - A JSON Object request body
 * @returns {Operation}
 */
export function post(path, data, options = {}) {
  return async state => {
    const { connection } = state;
    const [resolvedPath, resolvedData, resolvedOptions] = expandReferences(
      state,
      path,
      data,
      options
    );
    const { query, headers } = resolvedOptions;

    console.log(`POST: ${resolvedPath}`);

    const requestOptions = {
      url: resolvedPath,
      method: 'POST',
      query,
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify(resolvedData),
    };

    const result = await connection.request(requestOptions);

    return composeNextState(state, result);
  };
}

/**
 * Execute an SOQL query.
 * Note that in an event of a query error,
 * error logs will be printed but the operation will not throw the error.
 *
 * The Salesforce query API is subject to rate limits, {@link https://sforce.co/3W9zyaQ See for more details}.
 * @public
 * @example
 * query(state=> `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`);
 * @example <caption>Query more records if next records are available</caption>
 * query(state=> `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`, { autoFetch: true });
 * @function
 * @param {string} qs - A query string. Must be less than `4000` characters in WHERE clause
 * @param {object} options - Options passed to the bulk api.
 * @param {boolean} [options.autoFetch=false] - Fetch next records if available.
 * @returns {Operation}
 */
export function query(qs, options = {}) {
  return async state => {
    let done = false;
    let qResult = null;
    let result = [];

    const { connection } = state;
    const [resolvedQs, resolvedOptions] = expandReferences(state, qs, options);
    const { autoFetch = false } = resolvedOptions;

    console.log(`Executing query: ${resolvedQs}`);
    try {
      qResult = await connection.query(resolvedQs);
    } catch (err) {
      const { message, errorCode } = err;
      console.log(`Error ${errorCode}: ${message}`);
      throw err;
    }

    if (qResult.totalSize > 0) {
      console.log('Total records', qResult.totalSize);

      while (!done) {
        result.push(qResult);

        if (qResult.done) {
          done = true;
        } else if (autoFetch) {
          console.log(
            'Fetched records so far',
            result.map(ref => ref.records).flat().length
          );
          console.log('Fetching next records...');
          try {
            qResult = await connection.request({ url: qResult.nextRecordsUrl });
          } catch (err) {
            const { message, errorCode } = err;
            console.log(`Error ${errorCode}: ${message}`);
            throw err;
          }
        } else {
          done = true;
        }
      }

      console.log(
        'Done ✔ retrieved records',
        result.map(ref => ref.records).flat().length
      );
    } else {
      result.push(qResult);
      console.log('No records found.');
    }

    return composeNextState(state, result, result?.records);
  };
}

/**
 * Create a new sObject record, or updates it if it already exists
 * External ID field name must be specified in second argument.
 * @public
 * @example <caption> Single record upsert </caption>
 * upsert("UpsertTable__c", "ExtId__c", { Name: "Record #1", ExtId__c : 'ID-0000001' });
 * @example <caption> Multiple record upsert </caption>
 * upsert("UpsertTable__c", "ExtId__c", [
 *   { Name: "Record #1", ExtId__c : 'ID-0000001' },
 *   { Name: "Record #2", ExtId__c : 'ID-0000002' },
 * ]);
 * @function
 * @param {string} sObjectName - API name of the sObject.
 * @magic sObjectName - $.children[?(!@.meta.system)].name
 * @param {string} externalId - The external ID of the sObject.
 * @magic externalId - $.children[?(@.name=="{{args.sObject}}")].children[?(@.meta.externalId)].name
 * @param {(object|object[])} records - Field attributes for the new object.
 * @magic records - $.children[?(@.name=="{{args.sObject}}")].children[?(!@.meta.externalId)]
 * @returns {Operation}
 */
export function upsert(sObjectName, externalId, records) {
  return state => {
    const { connection } = state;
    const [resolvedSObjectName, resolvedExternalId, resolvedRecords] =
      expandReferences(state, sObjectName, externalId, records);
    console.info(
      `Upserting ${resolvedSObjectName} with externalId`,
      resolvedExternalId,
      ':',
      resolvedRecords
    );

    return connection
      .upsert(resolvedSObjectName, resolvedRecords, resolvedExternalId)
      .then(function (result) {
        console.log('Result : ' + JSON.stringify(result));

        return composeNextState(state, result);
      });
  };
}

/**
 * Update an sObject record or records.
 * @public
 * @example <caption> Single record update</caption>
 * update("Account", {
 *   Id: "0010500000fxbcuAAA",
 *   Name: "Updated Account #1",
 * });
 * @example <caption> Multiple records update</caption>
 * update("Account", [
 *   { Id: "0010500000fxbcuAAA", Name: "Updated Account #1" },
 *   { Id: "0010500000fxbcvAAA", Name: "Updated Account #2" },
 * ]);
 * @function
 * @param {string} sObjectName - API name of the sObject.
 * @param {(object|object[])} records - Field attributes for the new object.
 * @returns {Operation}
 */
export function update(sObjectName, records) {
  return state => {
    let { connection } = state;
    const [resolvedSObjectName, resolvedRecords] = expandReferences(
      state,
      sObjectName,
      records
    );
    console.info(`Updating ${resolvedSObjectName}`, resolvedRecords);

    return connection
      .update(resolvedSObjectName, resolvedRecords)
      .then(function (result) {
        console.log('Result : ' + JSON.stringify(result));
        return composeNextState(state, result);
      });
  };
}

/**
 * Transliterates unicode characters to their best ASCII representation
 * @public
 * @example
 * fn((state) => {
 *   const s = toUTF8("άνθρωποι");
 *   console.log(s); // anthropoi
 *   return state;
 * });
 * @param {string} input - A string with unicode characters
 * @returns {string} - ASCII representation of input string
 */
export function toUTF8(input) {
  return anyAscii(input);
}

/**
 * Send a HTTP request using connected session information.
 *
 * @example
 * request('/actions/custom/flow/POC_OpenFN_Test_Flow', {
 *   method: 'POST',
 *   json: { inputs: [{}] },
 * });
 * @param {string} url - Relative to request from
 * @param {object} options - The options for the request.
 * @param {string} [options.method=GET] - HTTP method to use. Defaults to GET
 * @param {object} [options.headers] - Object of request headers
 * @param {object} [options.json] - A JSON object to send as the request body.
 * @param {string} [options.body] - HTTP body (in POST/PUT/PATCH methods)
 * @returns {Operation}
 */
export function request(path, options = {}) {
  return async state => {
    const { connection } = state;
    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options
    );
    const { method = 'GET', json, body, headers } = resolvedOptions;

    const requestOptions = {
      url: resolvedPath,
      method,
      headers: json
        ? { 'content-type': 'application/json', ...headers }
        : headers,
      body: json ? JSON.stringify(json) : body,
    };

    const result = await connection.request(requestOptions);

    return composeNextState(state, result);
  };
}

/**
 * Retrieves a Salesforce sObject(s).
 * @public
 * @example
 * retrieve('ContentVersion', '0684K0000020Au7QAE/VersionData');
 * @function
 * @param {string} sObjectName - The sObject to retrieve
 * @param {string} id - The id of the record
 * @returns {Operation}
 */
export function retrieve(sObjectName, id) {
  return state => {
    const { connection } = state;

    const [resolvedSObjectName, resolvedId] = expandReferences(
      state,
      sObjectName,
      id
    );

    console.log(
      `Retrieving data for sObject '${resolvedSObjectName}' with Id '${resolvedId}'`
    );
    return connection
      .sobject(resolvedSObjectName)
      .retrieve(resolvedId)
      .then(result => {
        return composeNextState(state, result);
      });
  };
}

export {
  alterState,
  arrayToString,
  chunk,
  combine,
  dataPath,
  dataValue,
  dateFns,
  each,
  expandReferences,
  field,
  fields,
  fn,
  fnIf,
  http,
  humanProper,
  index,
  join,
  group,
  jsonValue,
  lastReferenceValue,
  map,
  merge,
  referencePath,
  scrubEmojis,
  source,
  sourceValue,
  toArray,
} from '@openfn/language-common';
