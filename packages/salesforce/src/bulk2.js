import { connection } from './Adaptor';
import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

/**
 * Options for configuring Salesforce Bulk API 2.0 queries
 * @typedef {Object} QueryOptions
 * @public
 * @property {boolean} [scanAll=false] - Whether to scan through all records including deleted and archived ones
 * @property {number} [pollInterval=1000] - Polling interval in milliseconds. Default: 1000 (1 second)
 * @property {number} [pollTimeout=30000] - Polling timeout in milliseconds. Default: 30000 (30 seconds)
 */
/**
 * State object for Salesforce Bulk API 2.0 operations
 * @typedef {Object} Bulk2QueryState
 * @property {Array} data - The processed records or query results from the Bulk API operation
 * @property {Array} references - Array of previous state data objects used in the job
 * @private
 */
/**
 * Executes a bulk query using Salesforce Bulk API 2.0
 * @param {string} query - SOQL query string to execute
 * @param {QueryOptions} options - Query options
 * @example <caption>Query with scanAll enabled</caption>
 * bulk2.query('SELECT Id, Name FROM Account', { scanAll: true });
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

    const records = await (
      await connection.bulk2.query(resolvedQuery, resolvedOptions)
    ).toArray();

    return composeNextState(state, records);
  };
}

/**
 * Bulk inserts records using Salesforce Bulk API 2.0
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to insert
 * @param {Object} options - Options including pollInterval and pollTimeout
 * @returns {Operation}
 */
export function insert(sObject, records, options = {}) {
  return async state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);
    const { pollInterval = 1e3, pollTimeout = 3e3 } = resolvedOptions;

    connection.bulk2.pollTimeout = pollTimeout;
    connection.bulk2.pollInterval = pollInterval;

    const res = await connection.bulk2.loadAndWaitForResults({
      object: resolvedSObject,
      operation: 'insert',
      input: resolvedRecords,
    });
    for (const rec of res.successfulResults) {
      console.log(`id = ${rec.sf__Id}, loaded successfully`);
    }
    for (const rec of res.failedResults) {
      console.log(
        `id = ${rec.sf__Id}, failed to load due to: ${rec.sf__Error}`
      );
    }
    for (const rec of res.unprocessedRecords) {
      if (typeof rec === 'string') {
        console.log(`Bad record: ${rec}`);
      } else {
        console.log(`unprocessed record: ${rec}`);
      }
    }
    return composeNextState(state, res);
  };
}

/**
 * Bulk updates records using Salesforce Bulk API 2.0
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to update
 * @param {Object} options - Options including pollInterval and pollTimeout
 * @returns {Operation}
 */
export function update(sObject, records, options = {}) {
  return async state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);
    const { pollInterval = 1e3, pollTimeout = 3e3 } = resolvedOptions;

    connection.bulk2.pollTimeout = pollTimeout;
    connection.bulk2.pollInterval = pollInterval;

    const res = await connection.bulk2.loadAndWaitForResults({
      object: resolvedSObject,
      operation: 'update',
      input: resolvedRecords,
    });
    return composeNextState(state, res);
  };
}
/**
 * Bulk upserts records using Salesforce Bulk API 2.0
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to upsert
 * @param {string} extIdField - External ID field for upsert matching
 * @param {Object} options - Options including pollInterval and pollTimeout
 * @returns {Operation}
 */
export function upsert(sObject, records, extIdField, options = {}) {
  return async state => {
    const [
      resolvedSObject,
      resolvedRecords,
      resolvedExternalId,
      resolvedOptions,
    ] = expandReferences(state, sObject, records, extIdField, options);
    const { pollInterval = 1e3, pollTimeout = 3e3 } = resolvedOptions;

    connection.bulk2.pollTimeout = pollTimeout;
    connection.bulk2.pollInterval = pollInterval;
    const res = await conn.bulk2.loadAndWaitForResults({
      object: resolvedSObject,
      operation: 'upsert',
      externalIdFieldName: resolvedExternalId,
      input: resolvedRecords,
      //   columnDelimiter: 'BACKQUOTE',
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      //   lineEnding: require('node:os').platform() === 'win32' ? 'CRLF' : 'LF',
    });

    return composeNextState(state, res);
  };
}

/**
 * Bulk deletes records using Salesforce Bulk API 2.0
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to delete
 * @param {Object} options - Options including pollInterval and pollTimeout
 * @returns {Operation}
 */
export function destroy(sObject, records, options = {}) {
  return async state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);
    const { pollInterval = 1e3, pollTimeout = 3e3 } = resolvedOptions;

    connection.bulk2.pollTimeout = pollTimeout;
    connection.bulk2.pollInterval = pollInterval;

    const res = await connection.bulk2.loadAndWaitForResults({
      object: resolvedSObject,
      operation: 'delete',
      input: resolvedRecords,
    });
    return composeNextState(state, res);
  };
}
