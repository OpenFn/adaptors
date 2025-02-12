import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import hive from 'hive-driver';

const { TCLIService, TCLIService_types } = hive.thrift;
const utils = new hive.HiveUtils(TCLIService_types);

let client = null;
let session = null;
const hiveClient = new hive.HiveClient(TCLIService, TCLIService_types);
const connection = new hive.connections.TcpConnection();

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to make working with this API easier.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(
      connect,
      ...operations,
      disconnect
    )({
      ...initialState,
      ...state,
    });
  };
}

async function connect(state) {
  const { host, port, username, password } = state.configuration;

  const auth =
    username && password
      ? new hive.auth.PlainTcpAuthentication({
          username,
          password,
        })
      : new hive.auth.NoSaslAuthentication();

  client = await hiveClient.connect({ host, port }, connection, auth);

  session = await client.openSession({
    client_protocol:
      TCLIService_types.TProtocolVersion.HIVE_CLI_SERVICE_PROTOCOL_V10,
  });

  console.log('Connect client');
  return state;
}

async function disconnect(state) {
  console.log('Disconnect client');
  await session.close();
  await client.close();
  return state;
}

/**
 * Execute an SQL statement
 * @public
 * @example
 * <caption>Get patient count from hive database</caption>
 * query("select count(*) from patient");
 * @function
 * @param {string} qs - SQL statement
 * @param {object} options - (Optional) options for executing sql statement
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function query(qs, options, callback) {
  return async state => {
    const [resolvedQs, resolvedOptions] = expandReferences(state, qs, options);

    console.log(`Executing query: ${resolvedQs}`);

    const result = await execSql(resolvedQs, resolvedOptions);

    console.log('Success... ✔');
    console.log('Retrieved', result.length, 'items');

    const nextState = {
      ...composeNextState(state, result),
      result,
    };

    if (callback) callback(nextState);
    return nextState;
  };
}

const defaultOpts = {
  runAsync: true,
};

async function execSql(statement, options) {
  const opts = { ...defaultOpts, ...options };
  const operation = await session.executeStatement(statement, opts);
  await utils.waitUntilReady(operation, true);
  await utils.fetchAll(operation);
  const result = await utils.getResult(operation);

  await operation.close();

  return result.getValue();
}

export {
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  parseCsv,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
