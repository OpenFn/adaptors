import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { post } from './Client';
import jsonSqlPkg from 'json-sql';

const jsonSql = jsonSqlPkg();

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for cartodb.
 * @private
 * @param {Array} ...operations - Operations to be performed.
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
 * Execute an SQL statement
 * @example <caption>A basic radius search query</caption>
 * sql("SELECT * FROM table WHERE ST_DWithin(geom,ST_Point(-73,40),1000)");
 * @function
 * @public
 * @param {object} sqlQuery - Payload data for the message
 * @returns {Operation}
 */
export function sql(sqlQuery) {
  return state => {
    const body = sqlQuery(state);

    const { account, apiKey } = state.configuration;

    const url = 'https://'.concat(account, '.carto.com/api/v2/sql');

    console.log(url);
    console.log('Executing SQL query:');
    console.log(body);

    return post({ apiKey, body, account, url }).then(result => {
      console.log('Success:', result);
      return { ...state, references: [result, ...state.references] };
    });
  };
}

/**
 * Add rows to a table
 * @example <caption>Add rows to a table</caption>
 * addRow('users', { name: 'Alice', age: 25, city: 'New York' })
 * @function
 * @public
 * @param {String} table - Table name
 * @param {object} rowData - data to add in the row
 * @returns {Operation}
 */
export function addRow(table, rowData) {
  return state => {
    const [dataObject] = expandReferences(state, rowData);

    const sql = jsonSql.build({
      type: 'insert',
      table: table,
      values: dataObject,
    });

    const body = Object.keys(sql.values).reduce(function (query, valueKey) {
      return query.replace(`\$${valueKey}`, `'${sql.values[valueKey]}'`);
    }, sql.query);

    const { account, apiKey } = state.configuration;

    const url = 'https://'.concat(account, '.carto.com/api/v2/sql');

    console.log(url);
    console.log('Executing SQL query:');
    console.log(body);

    return post({ apiKey, body, account, url }).then(result => {
      console.log('Success:', result);
      return { ...state, references: [result, ...state.references] };
    });
  };
}

export {
  fn,
  fnIf,
  field,
  fields,
  sourceValue,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
