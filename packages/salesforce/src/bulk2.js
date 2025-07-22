import { connection } from './Adaptor';
import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

/**
 * Executes a bulk query using Salesforce Bulk API 2.0
 * @param {string} query - SOQL query string to execute
 * @param {Object} options - Query options including polling settings
 * @returns {Function} - State modifier function
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
 * @returns {Function} - State modifier function
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
    return composeNextState(state, res);
  };
}

/**
 * Bulk updates records using Salesforce Bulk API 2.0
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to update
 * @param {Object} options - Options including pollInterval and pollTimeout
 * @returns {Function} - State modifier function
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
 * @returns {Function} - State modifier function
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
 * @returns {Function} - State modifier function
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
