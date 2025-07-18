import { connection } from './Adaptor';
import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

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

export function insert(sObject, records, options) {
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

export function update(sObject, records, options) {
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
export function upsert(sObject, records, extIdField, options) {
  return async state => {
    const [
      resolvedSObject,
      resolvedRecords,
      resolvedExternalId,
      resolvedOptions,
    ] = expandReferences(state, sObject, extIdField, records, options);
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

export function destroy(sObject, records, options) {
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
