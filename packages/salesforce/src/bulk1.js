import { connection } from './Adaptor';
import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

/**
 * State object for Salesforce Bulk API 1.0 operations
 * @typedef {Object} Bulk1QueryState
 * @property {Array} data - The processed records or query results from the Bulk API operation
 * @property {Array} references - Array of previous state data objects used in the job
 * @private
 */

/**
 * @typedef {Object} Bulk1LoadState - State object for bulk load operations
 * @property {Object} data - The processed records or results from the bulk load operation
 * @property {Object} data.successfulResults - Array of successful results
 * @property {Object} data.failedResults - Array of failed results
 * @property {Object} data.unprocessedRecords - Array of unprocessed records
 * @property {Array} references - Array of previous state data objects used in the job
 * @private
 */

/**
 * Options for configuring Salesforce Bulk API 1.0 operations
 * @typedef {Object} Bulk1Options
 * @public
 * @property {string} [extIdField] - External id field. Required for upsert operations
 * @property {boolean} [allowNoOp=false] - Skipping bulk operation if no records
 * @property {boolean} [failOnError=false] - Fail the operation on error
 * @property {number} [pollTimeout=300000] - Polling timeout in milliseconds. Default: 300000 (30 seconds)
 * @property {number} [pollInterval=6000] - Polling interval in milliseconds. Default: 6000 (6 seconds)
 * @property {boolean} [concurrencyMode='Parallel'] - Concurrency mode: 'Parallel' or 'Serial'
 */

/**
 * Executes a bulk query using Salesforce Bulk API 1.0
 * @public
 * @example <caption>Query records</caption>
 * bulk1.query('SELECT Id, Name FROM Account');
 * @example <caption>Query with custom options</caption>
 * bulk1.query('SELECT Id, Name FROM Account', {
 *   pollInterval: 1000,
 *   pollTimeout: 24000
 * });
 * @function
 * @param {string} query - SOQL query string to execute
 * @state {Bulk1QueryState}
 * @returns {Operation}
 */
export function query(query) {
  return async state => {
    const [resolvedQuery] = expandReferences(state, query);

    console.log(`Executing bulk query: ${resolvedQuery}`);

    try {
      const stream = await connection.bulk.query(resolvedQuery);
      const records = await new Promise((resolve, reject) => {
        const recs = [];
        stream
          .on('record', rec => recs.push(rec))
          .on('error', reject)
          .on('finish', () => resolve(recs));
      });

      return composeNextState(state, records);
    } catch (error) {
      console.error('Bulk query error:', error);
      throw error;
    }
  };
}

/**
 * Helper function for bulk load operations (insert, update, upsert, delete)
 * @private
 * @param {string} operation - The bulk operation to perform
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to process
 * @param {Bulk1Options} options - Bulk operation options
 * @returns {Operation}
 */
const DEFAULT_POLL_INTERVAL = 6e3; // 6 seconds
const DEFAULT_POLL_TIMEOUT = 3e4; // 30 seconds
function bulk1Load(operation, sObject, records, options = {}) {
  return async state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);
    const {
      extIdField,
      failOnError = false,
      concurrencyMode = 'Parallel',
      pollInterval = DEFAULT_POLL_INTERVAL,
      pollTimeout = DEFAULT_POLL_TIMEOUT,
    } = resolvedOptions;

    connection.bulk.pollTimeout = pollTimeout;
    connection.bulk.pollInterval = pollInterval;
    if (!resolvedRecords || resolvedRecords.length === 0) {
      if (resolvedOptions.allowNoOp) {
        console.log(
          `No items in ${resolvedSObject} array. Skipping bulk ${operation} operation.`
        );
        return composeNextState(state, { message: 'No records to process' });
      }
      throw new Error(`No records provided for bulk ${operation} operation`);
    }

    console.log(
      `Creating bulk ${operation} job for ${resolvedSObject} with ${resolvedRecords.length} records`
    );

    try {
      const opts = {
        concurrencyMode,
        ...(operation === 'upsert' && { extIdField }),
      };

      const results = await connection.bulk.load(
        resolvedSObject,
        operation,
        opts,
        resolvedRecords
      );

      const successfulResults = results.filter(r => r.success);
      const failedResults = results.filter(r => !r.success);
      const unprocessedRecords = failedResults.map((r, i) => ({
        ...resolvedRecords[i],
        error: r.errors ? r.errors.join(', ') : 'Unknown error',
      }));

      const resultData = {
        successfulResults,
        failedResults,
        unprocessedRecords,
        totalProcessed: results.length,
        successCount: successfulResults.length,
        failureCount: failedResults.length,
      };

      if (failOnError && failedResults.length > 0) {
        throw new Error(
          `Bulk ${operation} failed with ${
            failedResults.length
          } errors: ${JSON.stringify(failedResults)}`
        );
      }

      return composeNextState(state, resultData);
    } catch (error) {
      console.error(`Bulk ${operation} error:`, error);
      throw error;
    }
  };
}

/**
 * Bulk inserts records using Salesforce Bulk API 1.0
 * @public
 * @example <caption>Insert multiple records</caption>
 * bulk1.insert('Account', [{ Name: 'Coco' }, { Name: 'Melon' }]);
 * @example <caption>Insert with custom options</caption>
 * bulk1.insert('Account', [{ Name: 'Coco' }, { Name: 'Melon' }], {
 *   pollInterval: 1000,
 *   failOnError: true
 * });
 * @function
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to insert
 * @param {Bulk1Options} [options] - Bulk insert options
 * @state {Bulk1LoadState}
 * @returns {Operation}
 */
export function insert(sObject, records, options = {}) {
  return bulk1Load('insert', sObject, records, options);
}

/**
 * Bulk updates records using Salesforce Bulk API 1.0
 * @public
 * @example <caption>Update multiple records</caption>
 * bulk1.update('Account', [{ Id: '001xx', Name: 'Updated Name' }]);
 * @example <caption>Update with custom options</caption>
 * bulk1.update('Account', [{ Id: '001xx', Name: 'Updated Name' }], {
 *   pollInterval: 1000,
 *   failOnError: true
 * });
 * @function
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to update
 * @param {Bulk1Options} [options] - Bulk update options
 * @state {Bulk1LoadState}
 * @returns {Operation}
 */
export function update(sObject, records, options = {}) {
  return bulk1Load('update', sObject, records, options);
}

/**
 * Bulk upserts records using Salesforce Bulk API 1.0
 * @public
 * @example <caption>Upsert multiple records</caption>
 * bulk1.upsert('Account', [{ External_Id__c: 'EXT001', Name: 'Upserted Name' }], { extIdField: 'External_Id__c' });
 * @example <caption>Upsert with custom options</caption>
 * bulk1.upsert('Account', [{ External_Id__c: 'EXT001', Name: 'Upserted Name' }], {
 *   extIdField: 'External_Id__c',
 *   pollInterval: 3000,
 *   failOnError: true
 * });
 * @function
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to upsert
 * @param {Bulk1Options} options - Bulk upsert options (extIdField is required)
 * @state {Bulk1LoadState}
 * @returns {Operation}
 */
export function upsert(sObject, records, options = {}) {
  if (!options.extIdField) {
    throw new Error('extIdField is required for upsert operations');
  }
  return bulk1Load('upsert', sObject, records, options);
}

/**
 * Bulk deletes records using Salesforce Bulk API 1.0
 * @public
 * @example <caption>Delete multiple records</caption>
 * bulk1.delete('Account', [{ Id: '001xx' }]);
 * @example <caption>Delete with custom options</caption>
 * bulk1.delete('Account', [{ Id: '001xx' }], {
 *   pollInterval: 3000,
 *   failOnError: true
 * });
 * @function
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to delete (must include Id field)
 * @param {Bulk1Options} [options] - Bulk delete options
 * @state {Bulk1LoadState}
 * @returns {Operation}
 */
export function destroy(sObject, records, options = {}) {
  return bulk1Load('delete', sObject, records, options);
}
