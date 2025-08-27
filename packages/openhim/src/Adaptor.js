import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import * as util from './Util';

/**
 * State object
 * @typedef {Object} HttpState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the OpenHIM server, including headers, statusCode, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for openhim.
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
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Create an encounter
 * @example <caption>Create an encounter</caption>
 * createEncounter(encounterData)
 * @function
 * @param {object} encounterData - Payload data for the encounter
 * @returns {Operation}
 */
export function createEncounter(encounterData) {
  return async state => {
    const [body] = expandReferences(state, encounterData);

    const response = await util.request(
      state.configuration,
      'POST',
      '/chw/encounter',
      {
        body,
        parseAs: 'text',
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Get transactions query options
 * @typedef {Object} OpenHIMGetTransactionsOptions
 * @public
 * @property {string} transactionId - The ID of the transaction to retrieve. If provided, only this transaction will be returned.
 * @property {number} filterLimit - The maximum number of transactions to return. Defaults to 100.
 * @property {number} filterPage - The page to return (used in conjunction with filterLimit).
 * @property {object} filterRepresentation - Determines how much information for a transaction to return.
 * @property {object} filters - Advanced filters to apply to the transactions. This is a JSON object that can include properties like `response.status` or `properties.prop`.
 */

/**
 * Make a request to OpenHIM to get transactions
 * @example <caption>Get all transactions</caption>
 * getTransactions()
 * @example <caption>Get a specific transaction</caption>
 * getTransactions({transactionId:"686f56e070b851d7a21898f5"})
 * @example <caption>Get transactions with filters</caption>
 * getTransactions({
 *   filterLimit: 5,
 *   filterPage: 0,
 *   filterRepresentation: 'full',
 *   filters: '{"response.status":"200"}',
 * });
 * @function
 * @public
 * @param {OpenHIMGetTransactionsOptions} options - Optional request options. See [OpenHIM Transactions docs](https://openhim.org/docs/api/transactions/read/#read-all-transactions)
 * @returns {Operation}
 * @state {HttpState}
 */
export function getTransactions(options = {}) {
  return async state => {
    const [resolvedoptions] = expandReferences(state, options);

    const { transactionId } = resolvedoptions;
    delete resolvedoptions.transactionId;

    const response = await util.request(
      state.configuration,
      'GET',
      transactionId ? `/transactions/${transactionId}` : '/transactions',
      {
        query: {
          ...resolvedoptions,
        },
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a request to OpenHIM to get all registered client records
 * @example <caption>Get all clients</caption>
 * getClients()
 * @example <caption>Get a specific client</caption>
 * getClients('6823172670b851d7a222075a');
 * @function
 * @public
 * @param {string} clientId - Optional clientID to return a specific client.
 * @returns {Operation}
 * @state {HttpState}
 */

export function getClients(clientId) {
  return async state => {
    const [resolvedClientId] = expandReferences(state, clientId);
    const response = await util.request(
      state.configuration,
      'GET',
      resolvedClientId ? `/clients/${resolvedClientId}` : '/clients',
      {}
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a request to OpenHIM to create a new client record
 * @example <caption>Create a client record</caption>
 * createClient({
 *  roles: ['fhir'],
 *  clientID: 'fhir-server-7',
 *  name: 'FHIR Server',
 *  passwordAlgorithm: 'sha512',
 *  passwordSalt: '3e74a280c568f27241e48e938edf21bf',
 *  passwordHash:
 *    '9a5158dc87a25da9d8822d48ed831a88bb4ba7fa636ddb6d6a725f73688546052cb7f2c355758e4839f9416e6cc0e37e1e3070f597af2836d39768a5ecc050db',
 * });
 * @function
 * @public
 * @param {object} body - The client data to register.
 * @returns {Operation}
 * @state {HttpState}
 */

export function createClient(body) {
  return async state => {
    const [resolvedBody] = expandReferences(state, body);
    const response = await util.request(
      state.configuration,
      'POST',
      '/clients',
      {
        body: resolvedBody,
        parseAs: 'text',
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a request to OpenHIM to get all channel records
 * @example <caption>Get all channels</caption>
 * getChannels()
 * @example <caption>Get a specific channel</caption>
 * getChannels('67dac5fd70b851d7a26d1274');
 * @function
 * @public
 * @param {string} channelId - Optional channelId to return a specific channel.
 * @returns {Operation}
 * @state {HttpState}
 */

export function getChannels(channelId) {
  return async state => {
    const [resolvedChannelId] = expandReferences(state, channelId);
    const response = await util.request(
      state.configuration,
      'GET',
      resolvedChannelId ? `/channels/${resolvedChannelId}` : '/channels',
      {}
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a request to OpenHIM to create a new channel. See [OpenHIM Channels docs](https://openhim.org/docs/api/channels/create#create-channel)
 * @example <caption>Create a channel</caption>
 * createChannel({
 *   type: 'http',
 *   authType: 'public',
 *   status: 'enabled',
 *   routes: [
 *     {
 *       name: 'FHIR Server Testing',
 *       secured: false,
 *       host: 'localhost',
 *       port: '3447',
 *       primary: true,
 *     },
 *   ],
 *   requestBody: true,
 *   responseBody: true,
 *   name: 'FHIR Server Testing',
 *   urlPattern: '^/fhir/.*$',
 *   methods: [
 *     'GET',
 *     'POST',
 *   ],
 * });
 * @function
 * @public
 * @param {object} body - The channel data to create.
 * @returns {Operation}
 * @state {HttpState}
 */

export function createChannel(body) {
  return async state => {
    const [resolvedBody] = expandReferences(state, body);
    const response = await util.request(
      state.configuration,
      'POST',
      '/channels',
      {
        body: resolvedBody,
        parseAs: 'text',
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Get tasks query options
 * @typedef {Object} OpenHIMGetTasksOptions
 * @public
 * @property {string} taskId - The ID of the task to retrieve. If provided, only this task will be returned.
 * @property {number} filterLimit - The maximum number of tasks to return. Defaults to 100.
 * @property {number} filterPage - The page to return (used in conjunction with filterLimit).
 * @property {object} filters - Advanced filters to apply to the tasks. This is a JSON object that can include properties like `response.status` or `properties.prop`.
 */

/**
 * Make a request to OpenHIM to get all tasks
 * @example <caption>Get all tasks</caption>
 * getTasks()
 * @example <caption>Get all tasks with pagination options</caption>
 * getTasks({
 *   filterLimit: 10,
 *   filterPage: 0,
 *   filters: '{}',
 * });
 * @example <caption>Get a specific task</caption>
 * getTasks({
 *   taskId: '6870fbf470b851d7a22e9f05',
 *   filterLimit: 10,
 *   filterPage: 0,
 *   filters: '{}',
 * });
 * @function
 * @public
 * @param {OpenHIMGetTasksOptions} options - Required request options for each request. See [OpenHIM Tasks docs](https://openhim.org/docs/api/tasks/read/#read-all-tasks)
 * @returns {Operation}
 * @state {HttpState}
 */

export function getTasks(options) {
  return async state => {
    const [resolvedoptions] = expandReferences(state, options);

    const { taskId } = resolvedoptions;
    delete resolvedoptions.taskId;

    const response = await util.request(
      state.configuration,
      'GET',
      taskId ? `/tasks/${taskId}` : '/tasks',
      {
        query: resolvedoptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a request to OpenHIM to create a new task
 * @example <caption>Create a task record</caption>
 * createTask({
 *   tids: [
 *     '5bb777777bbb66cc5d4444ee',
 *     '5ceec0bb3ca344f9a30df633',
 *     '5af732d1cbf94ba88b8f0bc0',
 *   ],
 *   batchSize: 2,
 *   paused: true,
 * });
 * @function
 * @public
 * @param {object} body - The task data to create.
 * @returns {Operation}
 * @state {HttpState}
 */

export function createTask(body) {
  return async state => {
    const [resolvedBody] = expandReferences(state, body);
    const response = await util.request(state.configuration, 'POST', '/tasks', {
      body: resolvedBody,
      parseAs: 'text',
    });

    return util.prepareNextState(state, response);
  };
}

export {
  fnIf,
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
  as,
  map,
} from '@openfn/language-common';
