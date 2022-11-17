import { execute as commonExecute, expandReferences } from 'language-common';
import { post } from './Client';
import { resolve as resolveUrl } from 'url';
var jsonSql = require('json-sql')();

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for cartodb.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null
  }

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state })
  };

}

/**
 * Execute an SQL statement
 * @example
 * execute(
 *   sql(sqlQuery)
 * )(state)
 * @constructor
 * @param {object} sqlQuery - Payload data for the message
 * @returns {Operation}
 */
export function sql(sqlQuery) {

  return state => {

    const body = sqlQuery(state);

    const { account, apiKey } = state.configuration;

    const url = 'https://'.concat(account, '.carto.com/api/v2/sql')

    console.log(url)
    console.log("Executing SQL query:");
    console.log(body)

    return post({ apiKey, body, account, url })
    .then((result) => {
      console.log("Success:", result);
      return { ...state, references: [ result, ...state.references ] }
    })

  }
}

/**
 * Add rows to a table
 * @example
 * execute(
 *   addRow(table, rowData)
 * )(state)
 * @constructor
 * @param {object} sqlQuery - Payload data for the message
 * @returns {Operation}
 */
export function addRow(table, rowData) {

  return state => {

    const dataObject = expandReferences(rowData)(state);

    const sql = jsonSql.build({
        type: 'insert',
        table: table,
        values: dataObject
    });

    const body = Object.keys(sql.values).reduce(
      function(query, valueKey) {
        return query.replace(`\$${valueKey}`, `'${sql.values[valueKey]}'`)
      },
      sql.query
    )

    const { account, apiKey } = state.configuration;

    const url = 'https://'.concat(account, '.carto.com/api/v2/sql')

    console.log(url)
    console.log("Executing SQL query:");
    console.log(body)

    return post({ apiKey, body, account, url })
    .then((result) => {
      console.log("Success:", result);
      return { ...state, references: [ result, ...state.references ] }
    })

  }
}

export {
  field, fields, sourceValue, each,
  merge, dataPath, dataValue, lastReferenceValue
} from 'language-common';
