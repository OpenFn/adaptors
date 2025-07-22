import { connection } from './Adaptor';
import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

/**
 * Executes a bulk query using Salesforce Bulk API 1.0
 * @param {string} query - SOQL query string to execute
 * @returns {Function} - State modifier function that returns a Promise
 */
export function query(query) {
  return async state => {
    const [resolvedQuery] = expandReferences(state, query);

    const stream = await connection.bulk.query(resolvedQuery);
    const records = [];

    return new Promise((resolve, reject) => {
      stream.on('record', record => records.push(record));
      stream.on('end', () => resolve(composeNextState(state, records)));
      stream.on('error', err => reject(err));
    });
  };
}

/**
 * Bulk inserts records using Salesforce Bulk API 1.0
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to insert
 * @param {Object} options - Additional options for the bulk operation
 * @returns {Function} - State modifier function
 */
export function insert(sObject, records, options) {
  return async state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);

    const response = await connection.bulk.load(
      resolvedSObject,
      'insert',
      resolvedRecords,
      resolvedOptions
    );
    return composeNextState(state, response);
  };
}

/**
 * Bulk updates records using Salesforce Bulk API 1.0
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to update
 * @param {Object} options - Additional options for the bulk operation
 * @returns {Function} - State modifier function
 */
export function update(sObject, records, options) {
  return state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);

    return connection.bulk
      .load(resolvedSObject, 'update', resolvedRecords, resolvedOptions)
      .then(response => {
        return composeNextState(state, response);
      });
  };
}

/**
 * Bulk upserts records using Salesforce Bulk API 1.0
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to upsert
 * @param {string} extIdField - External ID field for upsert matching
 * @param {Object} options - Additional options for the bulk operation
 * @returns {Function} - State modifier function
 */
export function upsert(sObject, records, extIdField, options) {
  // jsforce expects extIdField as an option for upsert
  return state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);

    return connection.bulk
      .load(resolvedSObject, 'upsert', resolvedRecords, {
        ...resolvedOptions,
        extIdField,
      })
      .then(response => {
        return composeNextState(state, response);
      });
  };
}

/**
 * Bulk deletes records using Salesforce Bulk API 1.0
 * @param {string} sObject - The Salesforce object type
 * @param {Array} records - Array of records to delete
 * @param {Object} options - Additional options for the bulk operation
 * @returns {Function} - State modifier function
 */
export function destroy(sObject, records, options) {
  return state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);

    return connection.bulk
      .load(resolvedSObject, 'delete', resolvedRecords, resolvedOptions)
      .then(response => {
        return composeNextState(state, response);
      });
  };
}
