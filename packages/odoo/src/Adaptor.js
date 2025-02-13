import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { prepareNextState } from './Utils';

import pkg from 'odoo-await';
const Odoo = pkg;

let odooConn = null;

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
 * Create a record in Odoo
 * @public
 * @example
 * create("res.partner", { name: "Kool Keith" });
 * @function
 * @param {string} model - The specific record model i.e. "res.partner"
 * @param {object} data - The data to be created in JSON.
 * @param {string} externalId - Optional external ID for the record.
 * @returns {Operation}
 */
export function create(model, data, externalId) {
  return async state => {
    const [resolvedModel, resolvedData, resolvedExternalId] = expandReferences(
      state,
      model,
      data,
      externalId
    );

    console.log(resolvedModel, resolvedData, resolvedExternalId);
    const response = await odooConn.create(
      resolvedModel,
      resolvedData,
      resolvedExternalId
    );
    return prepareNextState(state, response);
  };
}

/**
 * Get a record from Odoo
 * @public
 * @example
 * read("res.partner", [1] , [name]);
 * @function
 * @param {string} model - The specific record model from i.e. "res.partner"
 * @param {number[]} recordId - An array of record IDs to read.
 * @param {string[]} fields - An array of fields to read from the record.
 * @returns {Operation}
 */
export function read(model, recordId, fields) {
  return async state => {
    const [resolvedModel, resolvedRecordId, resolvedFields] = expandReferences(
      state,
      model,
      recordId,
      fields
    );

    console.log(resolvedModel, resolvedRecordId, resolvedFields);
    const response = await odooConn.read(
      resolvedModel,
      resolvedRecordId,
      resolvedFields
    );
    return prepareNextState(state, response);
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

    console.log(resolvedModel, resolvedRecordId, resolvedData);
    const response = await odooConn.update(
      resolvedModel,
      resolvedRecordId,
      resolvedData
    );
    return prepareNextState(state, response);
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
 * @returns {Operation}
 */
export function deleteRecord(model, recordId) {
  return async state => {
    const [resolvedModel, resolvedRecordId] = expandReferences(
      state,
      model,
      recordId
    );

    console.log(resolvedModel, resolvedRecordId);
    const response = await odooConn.delete(resolvedModel, resolvedRecordId);
    return prepareNextState(state, response);
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
