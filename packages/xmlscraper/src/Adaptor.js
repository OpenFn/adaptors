import { execute as commonExecute, expandReferences, composeNextState } from 'language-common';
import request from 'request';
import cheerio from 'cheerio';
import cheerioTableparser from 'cheerio-tableparser';

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
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
 * Parse
 * @example
 *   parse(params)
 * @function
 * @param {object} params - data to write to the row
 * @param {function} script - callback function
 * @returns {Operation}
 */
export function parse(params, script) {

  return state => {

    // function assembleError({ response, error }) {
    //   if (response && ([200,201,202].indexOf(response.statusCode) > -1)) return false;
    //   if (error) return error;
    //   return new Error(`Server responded with ${response.statusCode}`)
    // }

    const { body } = expandReferences(params)(state);

    const $ = cheerio.load(body);
    cheerioTableparser($);

    if(script) {
      const result = script($)
      try {
        const r = JSON.parse(result);
        return composeNextState(state, r)
      } catch(e) {
        return composeNextState(state, {body: result})
      }
    } else {
      return composeNextState(state, {body: body})
    }
  }
}

export {
  field, fields, sourceValue, alterState, each,
  merge, dataPath, dataValue, lastReferenceValue
} from 'language-common';

export {
  get, post, put, patch, del
} from 'language-http';
