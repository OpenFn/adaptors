import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request } from './Utils';

const hive = require('hive-driver');

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

  // TODO: Add session-based authentication here if your API needs it.
  return state => {
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Create some resource in some system
 * @public
 * @example
 * create("patient", {"name": "Bukayo"})
 * @function
 * @param {string} resource - The type of entity that will be created
 * @param {object} data - The data to create the new resource
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function doHive(sql, callback) {
  return state => {
    const [resolvedSql] = expandReferences(state, sql);
    const { host, port } = state.configuration;

    const { TCLIService, TCLIService_types } = hive.thrift;
    const client = new hive.HiveClient(TCLIService, TCLIService_types);

    return client
      .connect(
        {
          host: 'localhost',
          port: 10000,
        },
        new hive.connections.TcpConnection(),
        new hive.auth.NoSaslAuthentication()
      )
      .then(async client => {
        const session = await client.openSession({
          client_protocol:
            TCLIService_types.TProtocolVersion.HIVE_CLI_SERVICE_PROTOCOL_V10,
        });
        const response = await session.getInfo(
          TCLIService_types.TGetInfoType.CLI_DBMS_VER
        );

        console.log(response.getValue());

        await session.close();

        return state;
      })
      .catch(error => {
        console.log(error);
      });

    // return request(url, options).then(response => {
    //   const nextState = {
    //     ...composeNextState(state, response.data),
    //     response,
    //   };
    //   if (callback) return callback(nextState);
    //   return nextState;
    // });
  };
}

export { request } from './Utils';

// TODO: Decide which functions to publish from @openfn/language-common
export {
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
