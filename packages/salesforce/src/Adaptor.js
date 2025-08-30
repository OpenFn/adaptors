import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences, throwError } from '@openfn/language-common/util';
import { Connection } from '@jsforce/jsforce-node';
import * as util from './util';

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

/**
 * State object
 * @typedef {Object} SalesforceState
 * @property data - API response data. Can be either an object or array of objects
 * @property references - History of all previous states
 * @private
 **/

/**
 * State object
 * @typedef {Object} SalesforceResultState
 * @property data - Summary of the response from Salesforce
 * @property data.success - `true` if Salesforce reports no errors from the operation
 * @property data.completed - Array of ids for every successful completion
 * @property data.errors - Array of errors reported by Salesforce
 * @property references - History of all previous states
 **/

/**
 * Options provided to the Salesforce bulk API request
 * @typedef {Object} BulkOptions
 * @public
 * @property {string} extIdField - External id field. Required for upsert.
 * @property {boolean} [allowNoOp=false] - Skipping bulk operation if no records.
 * @property {boolean} [failOnError=false] - Fail the operation on error.
 * @property {integer} [pollTimeout=240000] - Polling timeout in milliseconds.
 * @property {integer} [pollInterval=6000] - Polling interval in milliseconds.
 */

/**
 * Options provided to the Salesforce bulk query API request
 * @typedef {Object} BulkQueryOptions
 * @public
 * @property {integer} [pollTimeout=90000] - Polling timeout in milliseconds.
 * @property {integer} [pollInterval=3000] - Polling interval in milliseconds.
 * */

let connection = null;

/**
 * Creates a connection to Salesforce using Basic Auth or OAuth.
 * @function connect
 * @private
 * @param {State} state - Runtime state.
 * @returns {State}
 */
const connect = async state => {
  if (connection) {
    return state;
  }

  const { configuration } = state;
  const { apiVersion: version } = configuration;

  if (configuration.access_token) {
    const { instance_url: instanceUrl, access_token: accessToken } =
      configuration;
    connection = new Connection({ instanceUrl, accessToken, version });
  } else {
    const { loginUrl, username, password, securityToken } = configuration;
    connection = new Connection({ loginUrl, version });

    console.info(`Attempting Salesforce connection for user: ${username}`);

    // Simple, direct login without extra Promise wrapping
    await connection
      .login(username, securityToken ? password + securityToken : password)
      .catch(error => {
        throwError('FAILED_AUTH', {
          fix: 'Check your username, password, and security token',
          message: `Failed to connect to salesforce as ${username}`,
          error,
        });
      });
  }

  if (!connection) {
    throwError('CONNECTION_ERROR', { message: 'No connection established' });
  }

  console.info(
    `Successfully connected to Salesforce with ${connection._sessionType} session type`
  );
  console.info(`API Version: ${connection.version}`);

  return state;
};

export function setMockConnection(mock) {
  connection = mock;
}

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
      connect,
      util.loadAnyAscii,
      ...operations
    )({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Create one or more new sObject records. Relationships in the record should be nested and not use dot-notation syntax
 * @public
 * @example <caption> Single record creation</caption>
 * create("Account", { Name: "My Account #1" });
 * @example <caption> Multiple records creation</caption>
 * create("Account",[{ Name: "My Account #1" }, { Name: "My Account #2" }]);
 * @example <caption> Create records from data on state</caption>
 * create("Account",
 *   $.data.map((account) => ({
 *     Name: account.label
 *   })
 * ));
 * @example <caption>Update a record with a relationship</caption>
 * create("Account", {
 *   Name: "My Account #1" ,
 *   "Project__r": {
 *     "Metrics_ID__c": "jfh5LAnxu1i4na"
 *   }
 * });
 * @function
 * @param {string} sObjectName - API name of the sObject.
 * @param {(Object|Object[])} records - Field attributes for the new record, or an array of field attributes.
 * @state {SalesforceResultState}
 * @returns {Operation}
 */
export function create(sObjectName, records) {
  return state => {
    const [resolvedSObjectName, resolvedRecords] = expandReferences(
      state,
      sObjectName,
      records
    );
    util.assertNoNesting(resolvedRecords);
    console.info(`Creating ${resolvedSObjectName}`, resolvedRecords);
    return connection
      .create(resolvedSObjectName, resolvedRecords)
      .then(response => {
        const result = util.formatResults(response);
        const { success, errors, completed } = result;
        console.log('Sucessfully created: ', completed.length, 'records');

        if (!success) {
          console.log('Failed to create: ', errors.length, 'records');
        }
        return composeNextState(state, result);
      });
  };
}

/**
 * Fetches and logs metadata for an sObject and pushes the result to `state.data`.
 * If `sObjectName` is not specified, it will print the total number of all available sObjects and push the result to `state.data`.
 * @public
 * @example <caption>Fetch metadata for all available sObjects</caption>
 * describe()
 * @example <caption>Fetch metadata for Account sObject</caption>
 * describe('Account')
 * @function
 * @param {string} sObjectName - The API name of the sObject. If omitted, fetches metadata for all sObjects.
 * @state {SalesforceState}
 * @returns {Operation}
 */
export function describe(sObjectName) {
  return state => {
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
 * Delete records of an sObject.
 * @public
 * @example <caption>Delete a single record</caption>
 * destroy("Account", "001XXXXXXXXXXXXXXX");
 * @example <caption>Allow operation to fail if any record fails to delete</caption>
 * destroy("Account", ["001XXXXXXXXXXXXXXX", "001YYYYYYYYYYYYYYY"], {
 *   failOnError: true,
 * });
 * @example <caption> Using a state variable</caption>
 *  fn((state) => {
 *   state.data = ["001XXXXXXXXXXXXXXX", "001YYYYYYYYYYYYYYY"];
 *   return state;
 * });
 * destroy("Account", $.data);
 * @function
 * @param {string} sObjectName - API name of the sObject.
 * @param {string|string[]} ids - ID or array of IDs of records to delete
 * @param {object} [options] - Options for the destroy delete operation.
 * @param {boolean} [options.failOnError=false] - If true, the operation will fail if any record fails to delete.
 * @state {SalesforceResultState}
 * @returns {Operation}
 */
export function destroy(sObjectName, ids, options = {}) {
  return state => {
    const [resolvedSObjectName, resolvedIds, resolvedOptions] =
      expandReferences(state, sObjectName, ids, options);

    const { failOnError = false } = resolvedOptions;

    console.info(`Deleting ${resolvedSObjectName} records`);

    return connection
      .sobject(resolvedSObjectName)
      .del(resolvedIds)
      .then(response => {
        const result = util.formatResults(response);
        const { success, errors, completed } = result;

        console.log('Sucessfully deleted: ', completed.length, 'records');

        if (!success) {
          console.log('Failed to delete: ', errors.length, 'records');

          if (failOnError) {
            throwError('FAILED_TO_DELETE_RECORDS', {
              description: 'Some deletes failed; exiting with failure code.',
            });
          }
        }

        return composeNextState(state, result);
      });
  };
}

/**
 * Alias for "create(sObjectName, records)".
 * @public
 * @example <caption> Single record creation</caption>
 * insert("Account", { Name: "My Account #1" });
 * @example <caption> Multiple records creation</caption>
 * insert("Account",[{ Name: "My Account #1" }, { Name: "My Account #2" }]);
 * @example <caption> Using a state variable</caption>
 * fn((state) => {
 *   state.data = [{ Name: "My Account #1" }, { Name: "My Account #2" }];
 *   return state;
 * });
 * insert("Account", $.data);
 * @function
 * @param {string} sObjectName - API name of the sObject.
 * @param {(Object|Object[])} records - Field attributes for the new record, or an array of field attributes.
 * @state {SalesforceState}
 * @returns {Operation}
 */
export function insert(sObjectName, records) {
  return create(sObjectName, records);
}

/**
 * Executes an SOQL (Salesforce Object Query Language) query to retrieve records from Salesforce.
 * Note that in an event of a query error, error logs will be printed but the operation will not throw the error.
 *
 * The Salesforce query API is subject to rate limits, {@link https://sforce.co/3W9zyaQ learn more here}.
 * @public
 * @example <caption>Run a query and download all matching records</caption>
 * query('SELECT Id FROM Patient__c', { limit: Infinity });
 * @example <caption>Run a query and limit records</caption>
 * query('SELECT Id From Account Limit 10');
 * @example <caption>Query patients by Health ID</caption>
 * query(state => `SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.healthId}'`);
 * @example <caption>Query patients by Health ID using a lazy state reference</caption>
 * query(`SELECT Id FROM Patient__c WHERE Health_ID__c = '${$.data.healthId}'`);
 * @function
 * @param {string} query - A SOQL query string. Must be less than 4000 characters in WHERE clause
 * @param {object} [options] - Query options
 * @param {number} [options.limit=10000] - Maximum number of records to fetch. If `limit: Infinity` is passed, all records will be fetched.
 * @state {SalesforceState}
 * @state {Array} data - Array of result objects
 * @state {Object} response - An object of result metadata.
 *                     <code>{ done, totalSize, nextRecordsUrl?: string }</code>
 *                     where nextRecordsUrl is only present when done is false
 * @returns {Operation}
 */

export function query(query, options) {
  return async state => {
    const maxRecords = 1e4;
    const [resolvedQuery, resolvedOptions = { limit: maxRecords }] =
      expandReferences(state, query, options);
    console.log(`Executing query: ${resolvedQuery}`);

    if (resolvedQuery.includes('LIMIT') || resolvedQuery.includes('limit')) {
      console.warn(
        'Warning: Query contains a LIMIT clause. We recommend using the `limit` option instead.'
      );
    }

    const { limit } = resolvedOptions;
    const { records, ...response } = await connection.query(resolvedQuery, {
      autoFetch: true,
      maxFetch: limit,
    });

    const fetchedRecords = records.length;

    if (!response.done && fetchedRecords === maxRecords) {
      console.warn(
        `Warning: The default maximum number of items has been reached (${maxRecords}), but more items are available on the server. 
         To download all available items, adjust limit to ${response.totalSize} or set limit to false`
      );
    }
    console.log('Fetched: ' + fetchedRecords);
    console.log('Total: ' + response.totalSize);

    return { ...composeNextState(state, records), response };
  };
}

/**
 * Create a new sObject record, or updates it if it already exists. Relationships in the record should be nested and not use dot-notation syntax
 * @public
 * @example <caption> Single record upsert </caption>
 * upsert("UpsertTable__c", "ExtId__c", { Name: "Record #1", ExtId__c : 'ID-0000001' });
 * @example <caption> Multiple record upsert </caption>
 * upsert("UpsertTable__c", "ExtId__c", [
 *   { Name: "Record #1", ExtId__c : 'ID-0000001' },
 *   { Name: "Record #2", ExtId__c : 'ID-0000002' },
 * ]);
 * @example <caption>Update a record with a relationship</caption>
 * upsert("UpsertTable__c", {
 *   Name: "Record #1",
 *   "Project__r": {
 *     "Metrics_ID__c": "jfh5LAnxu1i4na"
 *   }
 * });
 * @function
 * @param {string} sObjectName - API name of the sObject.
 * @magic sObjectName - $.children[?(!@.meta.system)].name
 * @param {string} externalId - The external ID of the sObject.
 * @magic externalId - $.children[?(@.name=="{{args.sObject}}")].children[?(@.meta.externalId)].name
 * @param {(Object|Object[])} records - Field attributes for the records to upsert, or an array of field attributes.
 * @magic records - $.children[?(@.name=="{{args.sObject}}")].children[?(!@.meta.externalId)]
 * @state {SalesforceState}
 * @returns {Operation}
 */
export function upsert(sObjectName, externalId, records) {
  return state => {
    const [resolvedSObjectName, resolvedExternalId, resolvedRecords] =
      expandReferences(state, sObjectName, externalId, records);

    util.assertNoNesting(resolvedRecords);
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
 * Update an sObject record or records. Relationships in the record should be nested and not use dot-notation syntax
 * @public
 * @function
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
 * @example <caption>Update a record with a relationship</caption>
 * update("Account", {
 *   Id: "0010500000fxbcuAAA",
 *   "Project__r": {
 *     "Metrics_ID__c": "jfh5LAnxu1i4na"
 *   }
 * });
 * @param {string} sObjectName - API name of the sObject.
 * @param {(object|object[])} records - Field attributes for the new object.
 * @state {SalesforceResultState}
 * @returns {Operation}
 */
export function update(sObjectName, records) {
  return state => {
    const [resolvedSObjectName, resolvedRecords] = expandReferences(
      state,
      sObjectName,
      records
    );
    util.assertNoNesting(resolvedRecords);
    console.info(`Updating ${resolvedSObjectName}`, resolvedRecords);

    return connection
      .update(resolvedSObjectName, resolvedRecords)
      .then(result => {
        const records = util.formatResults(result);
        const { success, errors, completed } = records;
        console.log('Sucessfully updated: ', completed.length, 'records');

        if (!success) {
          console.log('Failed to update: ', errors.length, 'records');
        }
        return composeNextState(state, records);
      });
  };
}

/**
 * Retrieves a Salesforce sObject(s).
 * @public
 * @example <caption>Retrieve a specific ContentVersion record</caption>
 * retrieve('ContentVersion', '0684K0000020Au7QAE/VersionData');
 * @function
 * @param {string} sObjectName - The sObject to retrieve
 * @param {string} id - The id of the record
 * @state {SalesforceState}
 * @returns {Operation}
 */
export function retrieve(sObjectName, id) {
  return state => {
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

// Privately expose the salesforce request function to utils & tests
export function sfRequest(httpRequest) {
  return connection.request(httpRequest);
}
export { connection };
export {
  alterState,
  arrayToString,
  as,
  chunk,
  combine,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
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
