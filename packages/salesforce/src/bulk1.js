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
    console.log('Executing bulk query:', resolvedQuery);

    try {
      console.log('Initiating bulk query connection...');
      const stream = await connection.bulk.query(resolvedQuery);
      console.log('Stream created successfully');

      const records = await new Promise((resolve, reject) => {
        const recs = [];
        console.log('Setting up stream listeners...');

        stream
          .on('record', rec => {
            recs.push(rec);
          })
          .on('error', error => {
            console.error('Stream error:', error);
            reject(error);
          })
          .on('end', () => {
            console.log('Stream ended, total records:', recs.length);
            // resolve(recs);
          })
          .on('close', () => {
            console.log('Stream closed');
            resolve(recs);
          });

        console.log('All listeners set up');
      });

      console.log('Query completed, records:', records.length);
      return composeNextState(state, records);
    } catch (error) {
      console.error('Query execution error:', error);
      throw error;
    }
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

    console.log('resolvedSObject:', resolvedSObject);
    const result = await connection.bulk.load(
      resolvedSObject,
      'insert',
      resolvedOptions,
      resolvedRecords
    );

    console.log('Bulk insert result:', result);
    return composeNextState(state, result);
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
  return async state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);
    console.log({ resolvedSObject, resolvedRecords, resolvedOptions });
    const [rets] = await Promise.all([
      new Promise((resolve, reject) => {
        batch.on('response', resolve);
        batch.on('error', reject);
      }),
      new Promise(resolve => {
        batch.job.on('close', resolve); // await job close
      }),
    ]);
    console.log('Bulk update result:', rets);

    return composeNextState(state, rets);
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
  return async state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);

    const result = await connection.bulk.load(
      resolvedSObject,
      'upsert',
      resolvedRecords,
      {
        ...resolvedOptions,
        extIdField,
      }
    );

    return composeNextState(state, result);
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
  return async state => {
    const [resolvedSObject, resolvedRecords, resolvedOptions] =
      expandReferences(state, sObject, records, options);

    const result = await connection.bulk.load(
      resolvedSObject,
      'delete',
      resolvedOptions,
      resolvedRecords
    );

    return composeNextState(state, result);
  };
}
