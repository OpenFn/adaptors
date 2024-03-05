
// TODO this import maybe needs to be common/util
// if the main export only exports operations
import { operation, execute as commonExecute } from '@openfn/language-common'
import * as impl from './impl';
import { request } from './Utils';

let customHandler;

// TODO I'd quite like to exclude this from the  build?
export const setRequestHandler = (fn) => {
  customHandler = fn
}

// TODO need to work out the best pattern for this
const getRequestHandler = () => {
  return customHandler || request;
}

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
    drives: {},
  };

  const cleanup = finalState => {
    if (finalState?.buffer) {
      delete finalState.buffer;
    }
    if (finalState?.drives) {
      delete finalState.drives;
    }

    return finalState;
  };

  return state => {
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    })
      .then(cleanup)
      .catch(error => {
        cleanup(state);
        throw error;
      });
  };
}

/**
 * Create some resource in msgraph
 * @public
 * @example
 * create("applications", {"displayName": "My App"})
 * @function
 * @param {string} resource - The type of entity that will be created
 * @param {object} data - The data to create the new resource
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export const create = operation((state, resource, data, callback) => {
  return impl.create(state, getRequestHandler(), resource, data, callback)
})

/**
 * Make a GET request to msgraph resource
 * @public
 * @example
 *  get('sites/root/lists')
 * @function
 * @param {string} path - Path to resource
 * @param {object} query - Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function get(state, path, query, callback) {
  return impl.get(state, getRequestHandler(), path, query, callback)
}


/**
 * Get a Drive or SharePoint document library. The drive metadata will be written
 * to state.drives, where it can be used by other adaptor functions.
 * Pass { id } to get a drive by id or { id, owner } to get default drive for
 * some parent resource, like a group
 * @public
 * @example <caption>Get a drive by ID</caption>
 * getDrive({ id: "YXzpkoLwR06bxC8tNdg71m" })
 * @example <caption>Get the default drive for a site</caption>
 * getDrive({ id: "openfn.sharepoint.com", owner: "sites" })
 * @param specifier {Object} - A definition of the drive to retrieve
 *    - id {string} - The ID of the resource or owner.
 *    - owner {string} - The type of drive owner (e.g. sites, groups).
 * @param {string} name - The local name of the drive used to write to state.drives, ie, state.drives[name]
 * @param {function} [callback = s => s] (Optional) Callback function
 * @return {Operation}
 */
export const getDrive = operation((state, specifier, name, callback) => {
  return impl.getDrive(state, getRequestHandler(), specifier, name, callback)
})
