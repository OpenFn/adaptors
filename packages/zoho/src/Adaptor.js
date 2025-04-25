import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { post } from './Client';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for zoho.
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
 * To add a row data to a database table
 * @example
 * addRow(
 * 'testing_openfn',
 * 'Customers',
 * fields(field('Subject', dataValue('formId')), field('Status', 'Closed'))
 * );
 * @function
 * @param {string} db - Database
 * @param {string} table - Database table
 * @param {object} rowData - row data to be added into the database
 * @returns {Operation}
 */
export function addRow(db, table, rowData) {
  return state => {
    const action = 'ADDROW';
    const [body] = expandReferences(state, rowData);

    const { account, authToken, apiVersion } = state.configuration;

    const url = `https://reportsapi.zoho.com/api/`.concat(
      account,
      '/',
      db,
      '/',
      table
    );

    console.log('POST URL:');
    console.log(url);
    console.log('POST Parameters:');
    console.log(body);

    return post({ url, body, authToken, apiVersion, action }).then(result => {
      console.log('Success:', result);
      return { ...state, references: [result, ...state.references] };
    });
  };
}

export {
  fn,
  fnIf,
  alterState,
  field,
  fields,
  sourceValue,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
