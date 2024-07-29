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
  expandReferences,
  composeNextState,
  field,
  chunk,
} from '@openfn/language-common';

import { expandReferences as newExpandReferences } from '@openfn/language-common/util';

import jsforce from 'jsforce';
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
 * Adds a lookup relation or 'dome insert' to a record.
 * @public
 * @example
 * Data Sourced Value:
 *  relationship("relationship_name__r", "externalID on related object", dataSource("path"))
 * Fixed Value:
 *  relationship("relationship_name__r", "externalID on related object", "hello world")
 * @function
 * @param {string} relationshipName - `__r` relationship field on the record.
 * @param {string} externalId - Salesforce ExternalID field.
 * @param {string} dataSource - resolvable source.
 * @returns {object}
 */
export function relationship(relationshipName, externalId, dataSource) {
  return field(relationshipName, state => {
    if (typeof dataSource == 'function') {
      return { [externalId]: dataSource(state) };
    }
    return { [externalId]: dataSource };
  });
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

      return {
        ...state,
        references: [sobjects, ...state.references],
      };
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

    const objectName = expandReferences(sObject)(state);

    return connection
      .sobject(objectName)
      .describe()
      .then(result => {
        console.log('Label : ' + result.label);
        console.log('Num of Fields : ' + result.fields.length);

        return {
          ...state,
          references: [result, ...state.references],
        };
      });
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
 * @param {function} callback - A callback to execute once the record is retrieved
 * @returns {Operation}
 */
export function retrieve(sObject, id, callback) {
  return state => {
    const { connection } = state;

    const finalId = expandReferences(id)(state);

    return connection
      .sobject(sObject)
      .retrieve(finalId)
      .then(result => {
        return {
          ...state,
          references: [result, ...state.references],
        };
      })
      .then(state => {
        if (callback) {
          return callback(state);
        }
        return state;
      });
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
 * @param {function} callback - A callback to execute once the record is retrieved
 * @returns {Operation}
 */
export function query(qs, options, callback = s => s) {
  return async state => {
    let done = false;
    let qResult = null;
    let result = [];

    const { connection } = state;
    const [resolvedQs, resolvedOptions] = newExpandReferences(
      state,
      qs,
      options
    );
    const { autoFetch } = { ...{ autoFetch: false }, ...resolvedOptions };

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

    console.log(
      'Results retrieved and pushed to position [0] of the references array.'
    );

    const nextState = {
      ...state,
      references: [result, ...state.references],
    };
    return callback(nextState);
  };
}

async function pollJobResult(conn, job, pollInterval, pollTimeout) {
  let attempt = 0;

  const maxPollingAttempts = Math.floor(pollTimeout / pollInterval);

  while (attempt < maxPollingAttempts) {
    // Make an HTTP GET request to check the job status
    const jobInfo = await conn
      .request({
        method: 'GET',
        url: `/services/data/v${conn.version}/jobs/query/${job.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch(error => {
        console.log('Failed to fetch job information', error);
      });

    if (jobInfo && jobInfo.state === 'JobComplete') {
      const response = await conn.request({
        method: 'GET',
        url: `/services/data/v${conn.version}/jobs/query/${job.id}/results`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Job result retrieved', response.length);
      return response;
    } else {
      // Handle maxPollingAttempts
      if (attempt + 1 === maxPollingAttempts) {
        console.error(
          'Maximum polling attempt reached, Please increase pollInterval and pollTimeout'
        );
        throw new Error(`Polling time out. Job Id = ${job.id}`);
      }
      console.log(
        `Attempt ${attempt + 1} - Job ${jobInfo.id} is still in ${
          jobInfo.state
        }:`
      );
    }

    // Wait for the polling interval before the next attempt
    await new Promise(resolve => setTimeout(resolve, pollInterval));
    attempt++;
  }
}

const defaultOptions = {
  pollTimeout: 90000, // in ms
  pollInterval: 3000, // in ms
};
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
 * @param {function} callback - A callback to execute once the record is retrieved
 * @returns {Operation}
 */
export function bulkQuery(qs, options, callback) {
  return async state => {
    const { connection } = state;
    const [resolvedQs, resolvedOptions] = newExpandReferences(
      state,
      qs,
      options
    );

    if (parseFloat(connection.version) < 47.0)
      throw new Error('bulkQuery requires API version 47.0 and later');

    const { pollTimeout, pollInterval } = {
      ...defaultOptions,
      ...resolvedOptions,
    };

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

    const result = await pollJobResult(
      connection,
      queryJob,
      pollInterval,
      pollTimeout
    );

    const nextState = {
      ...composeNextState(state, result),
      result,
    };
    if (callback) return callback(nextState);

    return nextState;
  };
}

/**
 * Create and execute a bulk job.
 * @public
 * @example <caption>Bulk insert</caption>
 * bulk(
 *   "Patient__c",
 *   "insert",
 *   { failOnError: true },
 *   (state) => state.someArray.map((x) => ({ Age__c: x.age, Name: x.name }))
 * );
 * @example <caption>Bulk upsert</caption>
 * bulk(
 *   "vera__Beneficiary__c",
 *   "upsert",
 *   { extIdField: "vera__Result_UID__c" },
 *   [
 *     {
 *       vera__Reporting_Period__c: 2023,
 *       vera__Geographic_Area__c: "Uganda",
 *       "vera__Indicator__r.vera__ExtId__c": 1001,
 *       vera__Result_UID__c: "1001_2023_Uganda",
 *     },
 *   ]
 * );
 * @function
 * @param {string} sObject - API name of the sObject.
 * @param {string} operation - The bulk operation to be performed.Eg "insert" | "update" | "upsert"
 * @param {object} options - Options passed to the bulk api.
 * @param {integer} [options.pollTimeout=240000] - Polling timeout in milliseconds.
 * @param {integer} [options.pollInterval=6000] - Polling interval in milliseconds.
 * @param {string} [options.extIdField] - External id field.
 * @param {boolean} [options.failOnError=false] - Fail the operation on error.
 * @param {array} records - an array of records, or a function which returns an array.
 * @returns {Operation}
 */
export function bulk(sObject, operation, options, records) {
  return state => {
    const { connection } = state;

    const [
      resolvedSObject,
      resolvedOperation,
      resolvedOptions,
      resolvedRecords,
    ] = newExpandReferences(state, sObject, operation, options, records);

    const {
      failOnError = false,
      allowNoOp = false,
      pollTimeout,
      pollInterval,
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
            const timeout = pollTimeout || 240000;
            const interval = pollInterval || 6000;

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
                batch.poll(interval, timeout);
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
      const merged = [].concat.apply([], arrayOfResults);
      return { ...state, references: [merged, ...state.references] };
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
 * @param {object} attrs - Array of IDs of records to delete.
 * @param {object} options - Options for the destroy delete operation.
 * @returns {Operation}
 */
export function destroy(sObject, attrs, options) {
  return state => {
    const { connection } = state;
    const finalAttrs = expandReferences(attrs)(state);
    const { failOnError } = options;
    console.info(`Deleting ${sObject} records`);

    return connection
      .sobject(sObject)
      .del(finalAttrs)
      .then(function (result) {
        const successes = result.filter(r => r.success);
        console.log(
          'Sucessfully deleted: ',
          JSON.stringify(successes, null, 2)
        );

        const failures = result.filter(r => !r.success);
        console.log('Failed to delete: ', JSON.stringify(failures, null, 2));

        if (failOnError && result.some(r => !r.success))
          throw 'Some deletes failed; exiting with failure code.';

        return {
          ...state,
          references: [result, ...state.references],
        };
      });
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
 * @param {object} attrs - Field attributes for the new record.
 * @returns {Operation}
 */
export function create(sObject, attrs) {
  return state => {
    let { connection } = state;
    const finalAttrs = expandReferences(attrs)(state);
    console.info(`Creating ${sObject}`, finalAttrs);

    return connection.create(sObject, finalAttrs).then(function (recordResult) {
      console.log('Result : ' + JSON.stringify(recordResult));
      return {
        ...state,
        references: [recordResult, ...state.references],
      };
    });
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
 * @param {object} attrs - Field attributes for the new record.
 * @returns {Operation}
 */
export function insert(sObject, attrs) {
  return create(sObject, attrs);
}

/**
 * Create a new sObject if conditions are met.
 *
 * **The `createIf()` function has been deprecated. Use `fnIf(condition,create())` instead.**
 * @public
 * @example
 * createIf(true, 'obj_name', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @function
 * @param {boolean} logical - a logical statement that will be evaluated.
 * @param {string} sObject - API name of the sObject.
 * @param {(object|object[])} attrs - Field attributes for the new object.
 * @returns {Operation}
 */
export function createIf(logical, sObject, attrs) {
  return state => {
    const resolvedLogical = expandReferences(logical)(state);

    console.warn(
      `The 'createIf()' function has been deprecated. Use 'fnIf(condition,create())' instead.`
    );

    if (resolvedLogical) {
      const { connection } = state;
      const finalAttrs = expandReferences(attrs)(state);
      console.info(`Creating ${sObject}`, finalAttrs);
      return connection
        .create(sObject, finalAttrs)
        .then(function (recordResult) {
          console.log('Result : ' + JSON.stringify(recordResult));
          return {
            ...state,
            references: [recordResult, ...state.references],
          };
        });
    } else {
      console.info(`Not creating ${sObject} because logical is false.`);
      return {
        ...state,
      };
    }
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
 * @param {(object|object[])} attrs - Field attributes for the new object.
 * @magic attrs - $.children[?(@.name=="{{args.sObject}}")].children[?(!@.meta.externalId)]
 * @returns {Operation}
 */
export function upsert(sObject, externalId, attrs) {
  return state => {
    const { connection } = state;
    const finalAttrs = expandReferences(attrs)(state);
    console.info(
      `Upserting ${sObject} with externalId`,
      externalId,
      ':',
      finalAttrs
    );

    return connection
      .upsert(sObject, finalAttrs, externalId)
      .then(function (recordResult) {
        console.log('Result : ' + JSON.stringify(recordResult));
        return {
          ...state,
          references: [recordResult, ...state.references],
        };
      });
  };
}

/**
 * Conditionally create a new sObject record, or updates it if it already exists
 *
 * **The `upsertIf()` function has been deprecated. Use `fnIf(condition,upsert())` instead.**
 * @public
 * @example
 * upsertIf(true, 'obj_name', 'ext_id', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @function
 * @param {boolean} logical - a logical statement that will be evaluated.
 * @param {string} sObject - API name of the sObject.
 * @param {string} externalId - ID.
 * @param {(object|object[])} attrs - Field attributes for the new object.
 * @returns {Operation}
 */
export function upsertIf(logical, sObject, externalId, attrs) {
  return state => {
    const resolvedLogical = expandReferences(logical)(state);

    console.warn(
      `The 'upsertIf()' function has been deprecated. Use 'fnIf(condition,upsert())' instead.`
    );

    if (resolvedLogical) {
      const { connection } = state;
      const finalAttrs = expandReferences(attrs)(state);
      console.info(
        `Upserting ${sObject} with externalId`,
        externalId,
        ':',
        finalAttrs
      );

      return connection
        .upsert(sObject, finalAttrs, externalId)
        .then(function (recordResult) {
          console.log('Result : ' + JSON.stringify(recordResult));
          return {
            ...state,
            references: [recordResult, ...state.references],
          };
        });
    } else {
      console.info(`Not upserting ${sObject} because logical is false.`);
      return {
        ...state,
      };
    }
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
 * @param {(object|object[])} attrs - Field attributes for the new object.
 * @returns {Operation}
 */
export function update(sObject, attrs) {
  return state => {
    let { connection } = state;
    const finalAttrs = expandReferences(attrs)(state);
    console.info(`Updating ${sObject}`, finalAttrs);

    return connection.update(sObject, finalAttrs).then(function (recordResult) {
      console.log('Result : ' + JSON.stringify(recordResult));
      return {
        ...state,
        references: [recordResult, ...state.references],
      };
    });
  };
}

/**
 * Get a reference ID by an index.
 * @public
 * @example
 * reference(0)
 * @function
 * @param {number} position - Position for references array.
 * @returns {State}
 */
export function reference(position) {
  return state => state.references[position].id;
}

function getConnection(state, options) {
  const { apiVersion } = state.configuration;

  const apiVersionRegex = /^\d{2}\.\d$/;

  if (apiVersion && apiVersionRegex.test(apiVersion)) {
    options.version = apiVersion;
  } else {
    options.version = '47.0';
  }
  console.log('Using Salesforce API version:', options.version);

  return new jsforce.Connection(options);
}

async function createBasicAuthConnection(state) {
  const { loginUrl, username, password, securityToken } = state.configuration;

  const connection = getConnection(state, { loginUrl });

  await connection
    .login(username, securityToken ? password + securityToken : password)
    .catch(e => {
      console.error(`Failed to connect to salesforce as ${username}`);
      throw e;
    });

  console.info(`Connected to salesforce as ${username}.`);

  return {
    ...state,
    connection,
  };
}

function createAccessTokenConnection(state) {
  const { instance_url, access_token } = state.configuration;

  const connection = getConnection(state, {
    instanceUrl: instance_url,
    accessToken: access_token,
  });

  console.log(`Connected with ${connection._sessionType} session type`);

  return {
    ...state,
    connection,
  };
}

/**
 * Creates a connection to Salesforce using Basic Auth or OAuth.
 * @function createConnection
 * @private
 * @param {State} state - Runtime state.
 * @returns {State}
 */
function createConnection(state) {
  if (state.connection) {
    return state;
  }

  const { access_token } = state.configuration;

  return access_token
    ? createAccessTokenConnection(state)
    : createBasicAuthConnection(state);
}

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
      createConnection,
      ...flatten(operations),
      cleanupState
    )({ ...initialState, ...state });
  };
}
/**
 * Removes unserializable keys from the state.
 * @example
 * cleanupState(state)
 * @function
 * @param {State} state
 * @returns {State}
 */
function cleanupState(state) {
  delete state.connection;
  return state;
}

/**
 * Flattens an array of operations.
 * @example
 * steps(
 *   createIf(params),
 *   update(params)
 * )
 * @function
 * @returns {array}
 */
export function steps(...operations) {
  return flatten(operations);
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
 * @param {string} url - Relative or absolute URL to request from
 * @param {object} options - Request options
 * @param {string} [options.method=GET] - HTTP method to use. Defaults to GET
 * @param {object} [options.headers] - Object of request headers
 * @param {object} [options.json] - A JSON Object request body
 * @param {string} [options.body] - HTTP body (in POST/PUT/PATCH methods)
 * @param {function} callback - A callback to execute once the request is complete
 * @returns {Operation}
 */

export function request(path, options, callback = s => s) {
  return async state => {
    const { connection } = state;
    const [resolvedPath, resolvedOptions] = newExpandReferences(
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

    const nextState = composeNextState(state, result);

    return callback(nextState);
  };
}
// Note that we expose the entire axios package to the user here.
import axios from 'axios';

export { axios };

export {
  alterState,
  arrayToString,
  beta,
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
