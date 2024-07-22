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

import { execute as commonExecute, chunk } from '@openfn/language-common';

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
 * @param {Operation} operations - Operations
 * @returns {State}
 */
export function execute(...operations) {
  const initialState = {
    logger: {
      info: console.info.bind(console),
      debug: console.log.bind(console),
    },
    references: [],
    data: null,
    configuration: {},
  };

  return state => {
    // Note: we no longer need `steps` anymore since `commonExecute`
    // takes each operation as an argument.
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
 * @param {string} sObject - API name of the sObject.
 * @param {string} operation - The bulk operation to be performed.Eg "insert" | "update" | "upsert"
 * @param {array} records - an array of records, or a function which returns an array.
 * @param {object} options - Options passed to the bulk api.
 * @param {string} [options.extIdField] - External id field.
 * @param {boolean} [options.failOnError=false] - Fail the operation on error.
 * @param {integer} [options.pollInterval=6000] - Polling interval in milliseconds.
 * @param {integer} [options.pollTimeout=240000] - Polling timeout in milliseconds.
 * @returns {Operation}
 */
export function bulk(sObject, operation, records, options = {}) {
  return state => {
    const { connection } = state;

    const [
      resolvedSObject,
      resolvedOperation,
      resolvedRecords,
      resolvedOptions,
    ] = expandReferences(state, sObject, operation, records, options);

    const {
      failOnError = false,
      allowNoOp = false,
      pollTimeout = 240000,
      pollInterval = 6000,
    } = resolvedOptions;

    if (allowNoOp && resolvedRecords.length === 0) {
      console.info(
        `No items in ${resolvedSObject} array. Skipping bulk ${resolvedOperation} operation.`
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
              `Creating bulk ${resolvedOperation} job for ${resolvedSObject} with ${chunkedBatch.length} records`
            );

            const job = connection.bulk.createJob(
              resolvedSObject,
              resolvedOperation,
              options
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
                  err[`${options.extIdField}`] =
                    chunkedBatch[err.position - 1][options.extIdField];
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
    ).then(arrayOfResults => {
      console.log('Merging results arrays.');
      const merged = arrayOfResults.flat();
      return util.prepareNextState(state, merged);
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

    return util.prepareNextState(state, result);
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
 * @param {string} sObject - API name of the sObject.
 * @param {object} records - Field attributes for the new record.
 * @returns {Operation}
 */
export function create(sObject, records) {
  return state => {
    let { connection } = state;
    const [resolvedSObject, resolvedRecords] = expandReferences(
      state,
      sObject,
      records
    );
    console.info(`Creating ${resolvedSObject}`, resolvedRecords);

    return connection
      .create(resolvedSObject, resolvedRecords)
      .then(recordResult => {
        console.log('Result : ' + JSON.stringify(recordResult));
        return util.prepareNextState(state, recordResult);
      });
  };
}

/**
 * Prints an sObject metadata and pushes the result to state.references
 * @public
 * @example
 * describe('obj_name')
 * @function
 * @param {string} sObject - API name of the sObject.
 * @returns {Operation}
 */
export function describe(sObject) {
  return state => {
    const { connection } = state;

    const [resolvedSObject] = expandReferences(state, sObject);

    return connection
      .sobject(resolvedSObject)
      .describe()
      .then(result => {
        console.log('Label : ' + result.label);
        console.log('Num of Fields : ' + result.fields.length);

        return util.prepareNextState(state, result);
      });
  };
}

/**
 * Delete records of an object.
 * @public
 * @example
 * destroy('obj_name', [
 *  '0060n00000JQWHYAA5',
 *  '0090n00000JQEWHYAA5
 * ], { failOnError: true })
 * @function
 * @param {string} sObject - API name of the sObject.
 * @param {object} ids - Array of IDs of records to delete.
 * @param {object} options - Options for the destroy delete operation.
 * @returns {Operation}
 */
export function destroy(sObject, ids, options = {}) {
  return state => {
    const { connection } = state;
    const [resolvedSObject, resolvedIds, resolvedOptions] = expandReferences(
      state,
      sObject,
      ids,
      options
    );
    const { failOnError = false } = resolvedOptions;
    console.info(`Deleting ${sObject} records`);

    return connection
      .sobject(resolvedSObject)
      .del(resolvedIds)
      .then(function (result) {
        const successes = result.filter(r => r.success);
        console.log(
          'Sucessfully deleted: ',
          JSON.stringify(successes, null, 2)
        );

        const failures = result.filter(r => !r.success);
        if (failures.length > 0)
          console.log('Failed to delete: ', JSON.stringify(failures, null, 2));

        if (failOnError && result.some(r => !r.success))
          throw 'Some deletes failed; exiting with failure code.';

        return util.prepareNextState(state, result);
      });
  };
}

/**
 * Prints the total number of all available sObjects and pushes the result to `state.references`.
 * @public
 * @example
 * describeAll()
 * @function
 * @returns {Operation}
 */
export function describeAll() {
  return state => {
    const { connection } = state;

    return connection.describeGlobal().then(result => {
      const { sobjects } = result;
      console.log(`Retrieved ${sobjects.length} sObjects`);
      return util.prepareNextState(state, result, sobjects);
    });
  };
}
/**
 * Send a GET HTTP request using connected session information.
 * @example
 * get('/actions/custom/flow/POC_OpenFN_Test_Flow');
 * @param {string} url - Relative to request from
 * @param {object} options - Request query parameters
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

    return util.prepareNextState(state, result);
  };
}

/**
 * Alias for "create(sObject, attrs)".
 * @public
 * @example <caption> Single record creation</caption>
 * insert("Account", { Name: "My Account #1" });
 * @example <caption> Multiple records creation</caption>
 * insert("Account",[{ Name: "My Account #1" }, { Name: "My Account #2" }]);
 * @function
 * @param {string} sObject - API name of the sObject.
 * @param {object} records - Field attributes for the new record.
 * @returns {Operation}
 */
export function insert(sObject, records) {
  return create(sObject, records);
}

/**
 * Send a POST HTTP request using connected session information.
 *
 * @example
 * post('/actions/custom/flow/POC_OpenFN_Test_Flow', { inputs: [{}] });
 * @param {string} url - Relative to request from
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

    return util.prepareNextState(state, result);
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

    return util.prepareNextState(state, result, result?.records);
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
 * @param {string} sObject - API name of the sObject.
 * @magic sObject - $.children[?(!@.meta.system)].name
 * @param {string} externalId - The external ID of the sObject.
 * @magic externalId - $.children[?(@.name=="{{args.sObject}}")].children[?(@.meta.externalId)].name
 * @param {(object|object[])} records - Field attributes for the new object.
 * @magic attrs - $.children[?(@.name=="{{args.sObject}}")].children[?(!@.meta.externalId)]
 * @returns {Operation}
 */
export function upsert(sObject, externalId, records) {
  return state => {
    const { connection } = state;
    const [resolvedSObject, resolvedExternalId, resolvedRecords] =
      expandReferences(state, sObject, externalId, records);
    console.info(
      `Upserting ${resolvedSObject} with externalId`,
      resolvedExternalId,
      ':',
      resolvedRecords
    );

    return connection
      .upsert(resolvedSObject, resolvedRecords, resolvedExternalId)
      .then(function (result) {
        console.log('Result : ' + JSON.stringify(result));

        return util.prepareNextState(state, result);
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
 * @param {string} sObject - API name of the sObject.
 * @param {(object|object[])} records - Field attributes for the new object.
 * @returns {Operation}
 */
export function update(sObject, records) {
  return state => {
    let { connection } = state;
    const [resolvedSObject, resolvedRecords] = expandReferences(
      state,
      sObject,
      records
    );
    console.info(`Updating ${resolvedSObject}`, resolvedRecords);

    return connection
      .update(resolvedSObject, resolvedRecords)
      .then(function (result) {
        console.log('Result : ' + JSON.stringify(result));
        return util.prepareNextState(state, result);
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
 * @param {object} options - Request options
 * @param {string} [options.method=GET] - HTTP method to use. Defaults to GET
 * @param {object} [options.headers] - Object of request headers
 * @param {object} [options.json] - A JSON Object request body
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

    return util.prepareNextState(state, result);
  };
}

/**
 * Retrieves a Salesforce sObject(s).
 * @public
 * @example
 * retrieve('ContentVersion', '0684K0000020Au7QAE/VersionData');
 * @function
 * @param {string} sObject - The sObject to retrieve
 * @param {string} id - The id of the record
 * @returns {Operation}
 */
export function retrieve(sObject, id) {
  return state => {
    const { connection } = state;

    const [resolvedSObject, resolvedId] = expandReferences(state, sObject, id);

    console.log(
      `Retrieving data for sObject '${resolvedSObject}' with Id '${resolvedId}'`
    );
    return connection
      .sobject(resolvedSObject)
      .retrieve(resolvedId)
      .then(result => {
        return util.prepareNextState(state, result);
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
