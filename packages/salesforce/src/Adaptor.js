/**
 * @typedef {Object} State
 * @property {object} data JSON Data.
 * @property {Array<Reference>} references History of all previous operations.
 * @ignore
 */

/**
 * @typedef {Function} Operation
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

// use a dynamic import because any-ascii is pure ESM and doesn't play well with CJS
// Note that technically we should await this, but in practice the module will be loaded
// before execute is called
let anyAscii = undefined;
import('any-ascii').then(m => {
  anyAscii = m.default;
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
 * Outputs basic information about available sObjects.
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
 * Outputs basic information about an sObject to `STDOUT`.
 * @public
 * @example
 * describe('obj_name')
 * @function
 * @param {String} sObject - API name of the sObject.
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
 * @param {String} sObject - The sObject to retrieve
 * @param {String} id - The id of the record
 * @param {Function} callback - A callback to execute once the record is retrieved
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
 * @public
 * @example
 * query(`SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`);
 * @function
 * @param {String} qs - A query string.
 * @returns {Operation}
 */
export function query(qs) {
  return state => {
    const { connection } = state;
    const resolvedQs = expandReferences(qs)(state);
    console.log(`Executing query: ${resolvedQs}`);

    return connection.query(resolvedQs, function (err, result) {
      if (err) {
        const { message, errorCode } = err;
        console.error(`${errorCode}: ${message}`);
        throw err;
      }

      console.log(
        'Results retrieved and pushed to position [0] of the references array.'
      );

      return {
        ...state,
        references: [result, ...state.references],
      };
    });
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
 * Note that in an event of a query error,
 * error logs will be printed but the operation will not throw the error.
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
 * @param {String} qs - A query string.
 * @param {Object} options - Options passed to the bulk api.
 * @param {integer} [options.pollTimeout] - Polling timeout in milliseconds.
 * @param {integer} [options.pollInterval] - Polling interval in milliseconds.
 * @param {Function} callback - A callback to execute once the record is retrieved
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
    const apiVersion = connection.version;

    const { pollTimeout, pollInterval } = {
      ...defaultOptions,
      ...resolvedOptions,
    };

    console.log(`Executing query: ${resolvedQs}`);

    const queryJob = await connection.request({
      method: 'POST',
      url: `/services/data/v${apiVersion}/jobs/query`,
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
 * @example
 * bulk('Patient__c', 'insert', { failOnError: true, pollInterval: 3000, pollTimeout: 240000 }, state => {
 *   return state.data.someArray.map(x => {
 *     return { 'Age__c': x.age, 'Name': x.name }
 *   })
 * });
 * @function
 * @param {String} sObject - API name of the sObject.
 * @param {String} operation - The bulk operation to be performed
 * @param {Object} options - Options passed to the bulk api.
 * @param {Function} fun - A function which takes state and returns an array.
 * @returns {Operation}
 */
export function bulk(sObject, operation, options, fun) {
  return state => {
    const { connection } = state;
    const { failOnError, allowNoOp, pollTimeout, pollInterval } = options;
    const finalAttrs = fun(state);

    if (allowNoOp && finalAttrs.length === 0) {
      console.info(
        `No items in ${sObject} array. Skipping bulk ${operation} operation.`
      );
      return state;
    }

    if (finalAttrs.length > 10000)
      console.log('Your batch is bigger than 10,000 records; chunking...');

    const chunkedBatches = chunk(finalAttrs, 10000);

    return Promise.all(
      chunkedBatches.map(
        chunkedBatch =>
          new Promise((resolve, reject) => {
            const timeout = pollTimeout || 240000;
            const interval = pollInterval || 6000;

            console.info(
              `Creating bulk ${operation} job for ${sObject} with ${chunkedBatch.length} records`
            );

            const job = connection.bulk.createJob(sObject, operation, options);

            job.on('error', err => reject(err));

            console.info('Creating batch for job.');
            var batch = job.createBatch();

            console.info('Executing batch.');
            batch.execute(chunkedBatch);

            batch.on('error', function (err) {
              job.close();
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
              .then(res => {
                job.close();
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
 * @param {String} sObject - API name of the sObject.
 * @param {Object} attrs - Array of IDs of records to delete.
 * @param {Object} options - Options for the destroy delete operation.
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
 * Create a new object.
 * @public
 * @example
 * create('obj_name', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @function
 * @param {String} sObject - API name of the sObject.
 * @param {Object} attrs - Field attributes for the new object.
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
 * Create a new object if conditions are met.
 * @public
 * @example
 * createIf(true, 'obj_name', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @function
 * @param {boolean} logical - a logical statement that will be evaluated.
 * @param {String} sObject - API name of the sObject.
 * @param {Object} attrs - Field attributes for the new object.
 * @returns {Operation}
 */
export function createIf(logical, sObject, attrs) {
  return state => {
    const resolvedLogical = expandReferences(logical)(state);

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
 * Upsert an object.
 * @public
 * @example
 * upsert('obj_name', 'ext_id', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @function
 * @param {String} sObject - API name of the sObject.
 * @magic sObject - $.children[?(!@.meta.system)].name
 * @param {String} externalId - ID.
 * @magic externalId - $.children[?(@.name=="{{args.sObject}}")].children[?(@.meta.externalId)].name
 * @param {Object} attrs - Field attributes for the new object.
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
 * Upsert if conditions are met.
 * @public
 * @example
 * upsertIf(true, 'obj_name', 'ext_id', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @function
 * @param {boolean} logical - a logical statement that will be evaluated.
 * @param {String} sObject - API name of the sObject.
 * @param {String} externalId - ID.
 * @param {Object} attrs - Field attributes for the new object.
 * @returns {Operation}
 */
export function upsertIf(logical, sObject, externalId, attrs) {
  return state => {
    const resolvedLogical = expandReferences(logical)(state);

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
 * Update an object.
 * @public
 * @example
 * update('obj_name', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @function
 * @param {String} sObject - API name of the sObject.
 * @param {Object} attrs - Field attributes for the new object.
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
    console.log('Using Salesforce API version', apiVersion);
    options.version = apiVersion;
  } else {
    console.log('apiVersion is not defined');
    console.log('We recommend using Salesforce API version 52.0 or latest');
  }

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
  const { other_params, access_token } = state.configuration;
  const { instance_url } = other_params;

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
 * @returns {Array}
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
 * @returns {String} - ASCII representation of input string
 */
export function toUTF8(input) {
  return anyAscii(input);
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
  http,
  humanProper,
  index,
  join,
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
