// This file contains all the operations exported by the common adaptor
// ie, everything you can call from job code
import { JSONPath } from 'jsonpath-plus';

import { asData } from './Adaptor';
import { operation } from './util';

/**
 * Creates a custom step (or operation) for more flexible job writing.
 * @public
 * @example
 * fn(state => {
 *   // do some things to state
 *   return state;
 * });
 * @function
 * @param {Function} func is the function
 * @returns {Operation}
 */

export const fn = operation((state, func) => {
  return func(state);
})

/**
 * alias for "fn()"
 * @function
 * @param {Function} func is the function
 * @returns {Operation}
 */

export const alterState = fn;

// NOTE: docs shouldn't change, but I'd like to check that typings still work
// May need a little finessing
/**
 * Picks out a single value from source data.
 * If a JSONPath returns more than one value for the reference, the first
 * item will be returned.
 * @public
 * @example
 * sourceValue('$.key')
 * @function
 * @param {String} path - JSONPath referencing a point in `state`.
 * @returns {Operation}
 */
export const sourceValue = operation((state, path) => {
    return JSONPath({ path, json: state })[0];
})

/**
 * Picks out a value from source data.
 * Will return whatever JSONPath returns, which will always be an array.
 * If you need a single value use `sourceValue` instead.
 * @public
 * @example
 * source('$.key')
 * @function
 * @param {String} path - JSONPath referencing a point in `state`.
 * @returns {Array.<String|Object>}
 */
export const source = operation((state, path) => {
    return JSONPath({ path, json: state });
})

/**
 * Scopes an array of data based on a JSONPath.
 * Useful when the source data has `n` items you would like to map to
 * an operation.
 * The operation will receive a slice of the data based of each item
 * of the JSONPath provided.
 *
 * It also ensures the results of an operation make their way back into
 * the state's references.
 * @public
 * @example
 * each("$.[*]",
 *   create("SObject",
 *     field("FirstName", sourceValue("$.firstName"))
 *   )
 * )
 * @function
 * @param {DataSource} dataSource - JSONPath referencing a point in `state`.
 * @param {Operation} operation - The operation needed to be repeated.
 * @returns {Operation}
 */
export const each = operation((state, dataSource, fn) => {
  if (!dataSource) {
    throw new TypeError('dataSource argument for each fn is invalid.');
  }

  return asData(dataSource, state).reduce((state, data, index) => {
    if (state.then) {
      return state.then(state => {
        return fn({ ...state, data, index });
      });
    } else {
      return fn({ ...state, data, index });
    }
  }, state);
})