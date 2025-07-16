import { connection } from './Adaptor';
import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

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
