/** @module Adaptor */

/**
 * @typedef {Object} State
 * @property {object} data JSON Data.
 * @property {Array<Reference>} references History of all previous operations.
 */

/**
 * @typedef {Function} Operation
 * @param {State} state
 */

import {
  execute as commonExecute,
  expandReferences,
  field,
  sourceValue,
  chunk,
} from '@openfn/language-common';
import jsforce from 'jsforce';
import loadash from 'lodash-fp';

const { curry, flatten } = loadash;

/**
 * Adds a lookup relation or 'dome insert' to a record.
 * @public
 * @example
 * Data Sourced Value:
 *  relationship("relationship_name__r", "externalID on related object", dataSource("path"))
 * Fixed Value:
 *  relationship("relationship_name__r", "externalID on related object", "hello world")
 * @constructor
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
 * @constructor
 * @param {State} state - Runtime state.
 * @returns {State}
 */
export const describeAll = curry(function (state) {
  let { connection } = state;

  return connection.describeGlobal().then(result => {
    const { sobjects } = result;
    console.log(`Retrieved ${sobjects.length} sObjects`);

    return {
      ...state,
      references: [sobjects, ...state.references],
    };
  });
});

/**
 * Outputs basic information about an sObject to `STDOUT`.
 * @public
 * @example
 * describe('obj_name')
 * @constructor
 * @param {String} sObject - API name of the sObject.
 * @param {State} state - Runtime state.
 * @returns {State}
 */
export const describe = curry(function (sObject, state) {
  let { connection } = state;

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
});

/**
 * Retrieves a Salesforce sObject(s).
 * @public
 * @example
 * retrieve('ContentVersion', '0684K0000020Au7QAE/VersionData');
 * @constructor
 * @param {String} sObject - The sObject to retrieve
 * @param {String} id - The id of the record
 * @param {Function} callback - A callback to execute once the record is retrieved
 * @param {State} state - Runtime state
 * @returns {State}
 */
export const retrieve = curry(function (sObject, id, callback, state) {
  let { connection } = state;

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
});

/**
 * Execute an SOQL query.
 * Note that in an event of a query error,
 * error logs will be printed but the operation will not throw the error.
 * @public
 * @example
 * query(`SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`);
 * @constructor
 * @param {String} qs - A query string.
 * @param {State} state - Runtime state.
 * @returns {Operation}
 */
export const query = curry(function (qs, state) {
  let { connection } = state;
  qs = expandReferences(qs)(state);
  console.log(`Executing query: ${qs}`);

  return connection.query(qs, function (err, result) {
    if (err) {
      return console.error(err);
    }

    console.log(
      'Results retrieved and pushed to position [0] of the references array.'
    );

    return {
      ...state,
      references: [result, ...state.references],
    };
  });
});

/**
 * Create and execute a bulk job.
 * @public
 * @example
 * bulk('Patient__c', 'insert', { failOnError: true, pollInterval: 3000, pollTimeout: 240000 }, state => {
 *   return state.data.someArray.map(x => {
 *     return { 'Age__c': x.age, 'Name': x.name }
 *   })
 * });
 * @constructor
 * @param {String} sObject - API name of the sObject.
 * @param {String} operation - The bulk operation to be performed
 * @param {Object} options - Options passed to the bulk api.
 * @param {Function} fun - A function which takes state and returns an array.
 * @param {State} state - Runtime state.
 * @returns {Operation}
 */
export const bulk = curry(function (sObject, operation, options, fun, state) {
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
});

/**
 * Delete records of an object.
 * @public
 * @example
 * destroy('obj_name', [
 *  '0060n00000JQWHYAA5',
 *  '0090n00000JQEWHYAA5
 * ], { failOnError: true })
 * @constructor
 * @param {String} sObject - API name of the sObject.
 * @param {Object} attrs - Array of IDs of records to delete.
 * @param {Object} options - Options for the destroy delete operation.
 * @param {State} state - Runtime state.
 * @returns {Operation}
 */
export const destroy = curry(function (sObject, attrs, options, state) {
  let { connection } = state;
  const finalAttrs = expandReferences(attrs)(state);
  const { failOnError } = options;
  console.info(`Deleting ${sObject} records`);

  return connection
    .sobject(sObject)
    .del(finalAttrs)
    .then(function (result) {
      const successes = result.filter(r => r.success);
      console.log('Sucessfully deleted: ', JSON.stringify(successes, null, 2));

      const failures = result.filter(r => !r.success);
      console.log('Failed to delete: ', JSON.stringify(failures, null, 2));

      if (failOnError && result.some(r => !r.success))
        throw 'Some deletes failed; exiting with failure code.';

      return {
        ...state,
        references: [result, ...state.references],
      };
    });
});

/**
 * Create a new object.
 * @public
 * @example
 * create('obj_name', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @constructor
 * @param {String} sObject - API name of the sObject.
 * @param {Object} attrs - Field attributes for the new object.
 * @param {State} state - Runtime state.
 * @returns {Operation}
 */
export const create = curry(function (sObject, attrs, state) {
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
});

/**
 * Create a new object if conditions are met.
 * @public
 * @example
 * createIf(true, 'obj_name', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @constructor
 * @param {boolean} logical - a logical statement that will be evaluated.
 * @param {String} sObject - API name of the sObject.
 * @param {Object} attrs - Field attributes for the new object.
 * @param {State} state - Runtime state.
 * @returns {Operation}
 */
export const createIf = curry(function (logical, sObject, attrs, state) {
  let { connection } = state;
  logical = expandReferences(logical)(state);

  if (logical) {
    const finalAttrs = expandReferences(attrs)(state);
    console.info(`Creating ${sObject}`, finalAttrs);
    return connection.create(sObject, finalAttrs).then(function (recordResult) {
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
});

/**
 * Upsert an object.
 * @public
 * @example
 * upsert('obj_name', 'ext_id', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @param {String} sObject - API name of the sObject.
 * @paramlookup sObject - $.entities[?(@.type=="sobject" && !@.system)].name
 * @param {String} externalId - ID.
 * @paramlookup externalId - $.entities[?(@.name=="{{args.sObject}}")].entities[?(@.meta.externalId)].name
 * @param {Object} attrs - Field attributes for the new object.
 * @param {State} state - Runtime state.
 * @paramlookup attrs - $.entities[?(@.name=="{{args.sObject}}")].entities[?(!@.meta.externalId)]
 * @returns {Operation}
 */
export const upsert = curry(function (sObject, externalId, attrs, state) {
  let { connection } = state;
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
});

/**
 * Upsert if conditions are met.
 * @public
 * @example
 * upsertIf(true, 'obj_name', 'ext_id', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @constructor
 * @param {boolean} logical - a logical statement that will be evaluated.
 * @param {String} sObject - API name of the sObject.
 * @param {String} externalId - ID.
 * @param {Object} attrs - Field attributes for the new object.
 * @param {State} state - Runtime state.
 * @returns {Operation}
 */
export const upsertIf = curry(function (
  logical,
  sObject,
  externalId,
  attrs,
  state
) {
  let { connection } = state;
  logical = expandReferences(logical)(state);

  if (logical) {
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
});

/**
 * Update an object.
 * @public
 * @example
 * update('obj_name', {
 *   attr1: "foo",
 *   attr2: "bar"
 * })
 * @constructor
 * @param {String} sObject - API name of the sObject.
 * @param {Object} attrs - Field attributes for the new object.
 * @param {State} state - Runtime state.
 * @returns {Operation}
 */
export const update = curry(function (sObject, attrs, state) {
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
});

/**
 * Get a reference ID by an index.
 * @public
 * @example
 * reference(0)
 * @constructor
 * @param {number} position - Position for references array.
 * @param {State} state - Array of references.
 * @returns {State}
 */
export const reference = curry(function (position, state) {
  const { references } = state;
  return references[position].id;
});

/**
 * Creates a connection.
 * @example
 * createConnection(state)
 * @function
 * @param {State} state - Runtime state.
 * @returns {State}
 */
function createConnection(state) {
  const { loginUrl } = state.configuration;

  if (!loginUrl) {
    throw new Error('loginUrl missing from configuration.');
  }

  return { ...state, connection: new jsforce.Connection({ loginUrl }) };
}

/**
 * Performs a login.
 * @example
 * login(state)
 * @function
 * @param {State} state - Runtime state.
 * @returns {State}
 */
function login(state) {
  const { username, password, securityToken } = state.configuration;
  let { connection } = state;
  console.info(`Logging in as ${username}.`);

  return (
    connection
      .login(username, password + securityToken)
      // NOTE: Uncomment this to debug connection issues.
      // .then(response => {
      //   console.log(connection);
      //   console.log(response);
      //   return state;
      // })
      .then(() => state)
  );
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
      login,
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
