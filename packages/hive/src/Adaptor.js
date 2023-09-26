import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import hive from 'hive-driver';

const { TCLIService, TCLIService_types } = hive.thrift;
const utils = new hive.HiveUtils(TCLIService_types);

const logger = message => console.log(message);

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
      cleanupState
    )({
      ...initialState,
      ...state,
    });
  };
}

function connect(state) {
  //TODO @Mtuchi how to use the databse?
  const { host, port, username, password, database } = state.configuration;

  const client = new hive.HiveClient(TCLIService, TCLIService_types);

  const connection = new hive.connections.TcpConnection();
  const auth =
    username && password
      ? new hive.auth.PlainTcpAuthentication({
          username,
          password,
        })
      : new hive.auth.NoSaslAuthentication();

  const connect = client.connect({ host, port }, connection, auth);

  logger('Connect client');
  return { ...state, connect };
}

function disconnect(state) {
  return state.connect.then(async client => {
    logger('Disconnect client');
    await client.close();
  });
}
function cleanupState(state) {
  disconnect(state);
  delete state.connect;
  return state;
}
/**
 * Execute an SQL statement
 * @public
 * @example
 * <caption>Get patient count from hive database</caption>
 * query("select count(0) patient");
 * @function
 * @param {string} qs - SQL statement
 * @param {object} options - (Optional) options for executing sql statement
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function query(qs, options, callback) {
  return state => {
    const [resolvedQs, resolvedOptions] = expandReferences(state, qs, options);
    const { connect } = state;

    return connect
      .then(async client => {
        const session = await client.openSession({
          client_protocol:
            TCLIService_types.TProtocolVersion.HIVE_CLI_SERVICE_PROTOCOL_V10,
        });

        logger(`Executing query: ${resolvedQs}`);

        const result = await execSql(session, resolvedQs, resolvedOptions);

        logger('Success... ✔');
        logger(
          `Retrived ${result.length} result${result.length > 1 ? 's' : ''}`
        );

        await session.close();

        const nextState = {
          ...composeNextState(state, result),
          result,
        };

        if (callback) callback(nextState);
        return nextState;
      })
      .catch(error => {
        console.error(error);
        logger(error, 'debug');
        return { ...state, error };
      });
  };
}

const defaultOpts = {
  runAsync: true,
};

async function execSql(session, statement, options) {
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
  parseCsv,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
