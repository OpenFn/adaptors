import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request } from './Utils';

// TODO You can override the execute function to run code at the start
//      and end of job execution. This is useful for initialising and destroying
//      client objects. In this example we need it to create the references array.
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

// TODO this is example Opeartions which might create a resource on
//      on a fictional service. It demonstrates best practice for how
//      Operations should be written
/**
 * Create some resource in some system
 * @public
 * @example
 * create("patient", {"name": "Bukayo"})
 * @function
 * @param {string} resource - The type of entity that will be created
 * @param {object} data - The data to create the new resource from
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function create(resource, data, callback = s => s) {
  return async state => {
    // Parameters like resource and data might be passed as functions, which
    // allow us to lazily evaluate state references
    // The expand function will either return the provided values back to us,
    // or evaluate them first
    const [resolvedResource, resolvedData] = expandReferences(
      state,
      resource,
      data
    );

    // Make the request to the service
    // See src/Utils.js for the request implementation
    const response = await request(
      state,
      'POST',
      resolvedResource,
      resolvedData
    );

    // Write the result to state.data, update the references array,  and save response metadata
    const nextState = {
      ...composeNextState(state, response.body),
      response,
    };

    // Invoke the callback (if passed) before returning
    return callback(nextState);
  };
}

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
