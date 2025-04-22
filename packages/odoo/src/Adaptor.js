import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import Odoo from 'odoo-await';

let odooConn = null;

/**
 * State object
 * @typedef {Object} OdooState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the Odoo server (excluding the body)
 * @property references - An array of all previous data objects used in the Job
 */

/**
 * Options object
 * @typedef {Object} CreateOptions
 * @property {number} externalId - An optional id to be used in the request
 * @property {boolean} downloadNewRecord - An option defaulted to `false` incase a user intends to receive the whole created resource in the response. The collective response will be written in `state.data`.
 */

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
    return commonExecute(login, ...operations)({ ...initialState, ...state });
  };
}

export function setMockClient(mock) {
  odooConn = mock;
}

/**
 * Logs in to OpenSpp, gets a session token.
 * @example
 *  login(state)
 * @private
 * @param {State} state - Runtime state.
 * @returns {State}
 */
async function login(state) {
  const { baseUrl, username, password, database } = state.configuration;
  odooConn = new Odoo({
    baseUrl: baseUrl,
    db: database,
    username: username,
    password: password,
  });
  try {
    await odooConn.connect();
  } catch (err) {
    console.log(`✗ Error: ${err}`);
    odooConn = null;
  }
  return state;
}
/**
 * Create a record in Odoo.
 * You can pass an external ID to the options object to create a record with a specific ID.
 * You can also pass a downloadNewRecord option to download the whole created resource in the response.
 * @public
 * @example <caption> Create a partner record with an external Id </caption>
 * create('res.partner', { name: 'Kool Keith' }, { externalId: 23 });
 * @example <caption> Create a partner record and download the whole record in the response </caption>
 * create('res.partner', { name: 'Kool Keith' }, { downloadNewRecord: true });
 * @function
 * @param {string} model - The specific record model i.e. "res.partner"
 * @param {object} data - The data to be created in JSON.
 * @param {CreateOptions} options - Options to send to the request.
 * @state {OdooState}
 * @returns {Operation}
 */
export function create(model, data, options = {}) {
  return async state => {
    const mergedOptions = { downloadNewRecord: false, ...options };

    const [resolvedModel, resolvedData, resolvedOptions] = expandReferences(
      state,
      model,
      data,
      mergedOptions
    );

    console.log(`Creating a ${resolvedModel} resource...`);
    try {
      let newRecordId = await odooConn.create(
        resolvedModel,
        resolvedData,
        resolvedOptions?.externalId
      );

      if (resolvedOptions.downloadNewRecord) {
        console.log(
          `Fetching ${resolvedModel} resource with id ${newRecordId}......`
        );
        const newRecord = await odooConn.read(resolvedModel, [newRecordId], []);
        return composeNextState(state, newRecord);
      } else {
        return composeNextState(state, newRecordId);
      }
    } catch (e) {
      console.error(`Error creating ${resolvedModel} resource: ${e}`);
      throw e;
    }
  };
}

/**
 * Get a record from Odoo. Returns all fields unless a field list is provided as a third argument
 * @public
 * @example <caption>Download records with select fields</caption>
 * read("res.partner", [1] , ['name']);
 * @example <caption>Download a single record with all fields</caption>
 * read("res.partner", $.recordIds);
 * @function
 * @param {string} model - The specific record model from i.e. "res.partner"
 * @param {number} recordId - An array of record IDs to read.
 * @param {string[]} fields - An optional array of field strings to read from the record.
 * @state {OdooState}
 * @returns {Operation}
 */
export function read(model, recordId, fields = []) {
  return async state => {
    const [resolvedModel, resolvedRecordId, resolvedFields] = expandReferences(
      state,
      model,
      recordId,
      fields
    );
    console.log(`Reading a ${resolvedModel} resource...`);
    const response = await odooConn.read(
      resolvedModel,
      resolvedRecordId,
      resolvedFields
    );
    return composeNextState(state, response);
  };
}

/**
 * Update a record in Odoo
 * @public
 * @example
 * update("res.partner", 54 , {name: 'Jane Doe'});
 * @function
 * @param {string} model - The specific record model i.e. "res.partner"
 * @param {number} recordId - The specific recordId to be updated.
 * @param {object} data - The data to be updated in JSON.
 * @state {OdooState}
 * @returns {Operation}
 */
export function update(model, recordId, data) {
  return async state => {
    const [resolvedModel, resolvedRecordId, resolvedData] = expandReferences(
      state,
      model,
      recordId,
      data
    );

    console.log(`Updating a ${resolvedModel} resource...`);
    const response = await odooConn.update(
      resolvedModel,
      resolvedRecordId,
      resolvedData
    );
    return composeNextState(state, response);
  };
}

/**
 * Delete a record from Odoo
 * @public
 * @example
 * deleteRecord("res.partner", 54 );
 * @function
 * @param {string} model - The specific record model i.e. "res.partner"
 * @param {number} recordId - The specific recordId to be deleted.
 * @state {OdooState}
 * @returns {Operation}
 */
export function deleteRecord(model, recordId) {
  return async state => {
    const [resolvedModel, resolvedRecordId] = expandReferences(
      state,
      model,
      recordId
    );

    console.log(`Deleting a ${resolvedModel} resource...`);

    const response = await odooConn.delete(resolvedModel, resolvedRecordId);
    return composeNextState(state, response);
  };
}

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
