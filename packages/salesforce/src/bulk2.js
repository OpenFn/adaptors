import { connection } from './Adaptor';
import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

/**
 * State object for Salesforce Bulk API 2.0 operations
 * @typedef {Object} Bulk2QueryState
 * @property {Array} data - The processed records or query results from the Bulk API operation
 * @property {Array} references - Array of previous state data objects used in the job
 * @private
 */

/**
 * @typedef {Object} Bulk2LoadState - State object for bulk insert operations
 * @property {Object} data - The processed records or results from the bulk insert operation
 * @property {Object} data.successfulResults - Array of successful results
 * @property {Object} data.failedResults - Array of failed results
 * @property {Object} data.unprocessedRecords - Array of unprocessed records
 * @property {Array} references - Array of previous state data objects used in the job
 * @private
 */

/**
 * Options for configuring Salesforce Bulk API 2.0 queries
 * @typedef {Object} QueryOptions
 * @public
 * @property {boolean} [scanAll=false] - Whether to scan through all records including deleted and archived ones
 * @property {number} [pollInterval=1000] - Polling interval in milliseconds. Default: 1000 (1 second)
 * @property {number} [pollTimeout=30000] - Polling timeout in milliseconds. Default: 30000 (30 seconds)
 */

/**
 * @typedef {Object} Bulk2LoadOptions - Bulk insert options
 * @property {number} [pollInterval=1000] - Polling interval in milliseconds. Default: 1000 (1 second)
 * @property {number} [pollTimeout=30000] - Polling timeout in milliseconds. Default: 30000 (30 seconds)
 * @public
 */

/**
 * Executes a bulk query using Salesforce Bulk API 2.0
 * @public
 * @example <caption>Query records</caption>
 * bulk2.query('SELECT Id, Name FROM Account');
 * @example <caption>Query with `scanAll` enabled</caption>
 * bulk2.query('SELECT Id, Name FROM Account', { scanAll: true });
 * @example <caption>Query with custom options</caption>
 * bulk2.query(
 *   'SELECT Id, Name FROM Account',
 *   {
 *     scanAll: true,
 *     pollInterval: 1000,
 *     pollTimeout: 3000,
 *   }
 * );
 * @function
 * @param {string} query - SOQL query string to execute
 * @param {QueryOptions} options - Query options
 * @state {Bulk2QueryState}
 * @returns {Operation}
 */
export function query(query, options) {
  return async state => {
    const [resolvedQuery, resolvedOptions] = expandReferences(
      state,
      query,
      options
    );

    console.log(`Executing query: ${resolvedQuery}`);
    const records = await (
      await connection.bulk2.query(resolvedQuery, resolvedOptions)
    ).toArray();

    return composeNextState(state, records);
  };
}

/**
 * Bulk inserts records using Salesforce Bulk API 2.0
 * @public
 * @example <caption>Insert multiple records</caption>
 * bulk2.insert('Account', [{ Name: 'Coco' }, { Name: 'Melon' }]);
 * @example <caption>Insert with custom options</caption>
 * bulk2.insert('Account', [{ Name: 'Coco' }, { Name: 'Melon' }], {
 *   pollInterval: 1000,
 *   pollTimeout: 3000,
 * });
 * @function
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to insert
 * @param {Bulk2LoadOptions} [options] - Bulk insert options
 * @state {Bulk2LoadState}
 * @returns {Operation}
 */
export function insert(sObject, records, options = {}) {
  return bulk2Load('insert', sObject, records, options);
}

/**
 * Bulk updates records using Salesforce Bulk API 2.0
 * @public
 * @example <caption>Update records</caption>
 * bulk2.update("Account", [
 *   { Id: "0010500000fxbcuAAA", Name: "Updated Account #1" },
 *   { Id: "0010500000fxbcvAAA", Name: "Updated Account #2" },
 * ]);
 * @example <caption>Update records with custom options</caption>
 * bulk2.update(
 *   "Account",
 *   [
 *     { Id: "0010500000fxbcuAAA", Name: "Updated Account #1" },
 *     { Id: "0010500000fxbcvAAA", Name: "Updated Account #2" },
 *   ],
 *   {
 *     pollInterval: 1000,
 *     pollTimeout: 3000,
 *   }
 * );
 * @function
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to update
 * @param {Bulk2LoadOptions} [options] - Bulk update options
 * @state {Bulk2LoadState}
 * @returns {Operation}
 */
export function update(sObject, records, options = {}) {
  return bulk2Load('update', sObject, records, options);
}

/**
 * Bulk upserts records using Salesforce Bulk API 2.0
 * @public
 * @example <caption>Upsert records</caption>
 * bulk2.upsert("UpsertTable__c", "ExtId__c", [
 *   { Name: "Record #1", ExtId__c : 'ID-0000001' },
 *   { Name: "Record #2", ExtId__c : 'ID-0000002' },
 * ]);
 * @example <caption>Upsert records with custom options</caption>
 * bulk2.upsert(
 *   "UpsertTable__c",
 *   "ExtId__c",
 *   [
 *     { Name: "Record #1", ExtId__c : 'ID-0000001' },
 *     { Name: "Record #2", ExtId__c : 'ID-0000002' },
 *   ],
 *   {
 *     pollInterval: 1000,
 *     pollTimeout: 3000,
 *   }
 * );
 * @function
 * @param {string} sObject - The Salesforce object type
 * @param {string} externalIdFieldName - External ID field name for upsert matching
 * @param {Array} records - Array of records to upsert
 * @param {Bulk2LoadOptions} [options] - Bulk upsert options
 * @state {Bulk2LoadState}
 * @returns {Operation}
 */
export function upsert(sObject, externalIdFieldName, records, options = {}) {
  return bulk2Load('upsert', sObject, records, {
    ...options,
    externalIdFieldName,
  });
}

/**
 * Bulk deletes records using Salesforce Bulk API 2.0
 * @public
 * @example <caption>Delete records</caption>
 * bulk2.destroy("Account", [
 *   "0010500000fxbcuAAA",
 *   "0010500000fxbcvAAA",
 * ]);
 * @example <caption>Delete records with custom options</caption>
 * bulk2.destroy(
 *   "Account",
 *   [
 *     "0010500000fxbcuAAA",
 *     "0010500000fxbcvAAA",
 *   ],
 *   {
 *     pollInterval: 1000,
 *     pollTimeout: 3000,
 *   }
 * );
 * @function
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to delete
 * @param {Bulk2LoadOptions} [options] - Bulk delete options
 * @state {Bulk2LoadState}
 * @returns {Operation}
 */
export function destroy(sObject, records, options = {}) {
  return bulk2Load('delete', sObject, records, options);
}

const DEFAULT_POLL_INTERVAL = 1e3; // 1 second
const DEFAULT_POLL_TIMEOUT = 3e4; // 30 seconds
function bulk2Load(operation, sObject, records, options = {}) {
  return async state => {
    const [
      resolvedOperation,
      resolvedSObject,
      resolvedRecords,
      resolvedOptions,
    ] = expandReferences(state, operation, sObject, records, options);
    const {
      pollInterval = DEFAULT_POLL_INTERVAL,
      pollTimeout = DEFAULT_POLL_TIMEOUT,
      externalIdFieldName,
    } = resolvedOptions;

    connection.bulk2.pollTimeout = pollTimeout;
    connection.bulk2.pollInterval = pollInterval;

    console.log(
      `Loading ${resolvedRecords.length} records for ${resolvedOperation} on ${resolvedSObject}`
    );
    const res = await connection.bulk2.loadAndWaitForResults({
      object: resolvedSObject,
      operation: resolvedOperation,
      externalIdFieldName,
      input: resolvedRecords,
    });
    for (const rec of res.successfulResults) {
      console.log(`id = ${rec.sf__Id}, loaded successfully`);
    }
    for (const rec of res.failedResults) {
      console.warn(`Failed to load due to: ${rec.sf__Error}`);
    }
    for (const rec of res.unprocessedRecords) {
      if (typeof rec === 'string') {
        console.warn(`Bad record: ${rec}`);
      } else {
        console.warn(`unprocessed record: ${rec}`);
      }
    }
    return composeNextState(state, res);
  };
}
