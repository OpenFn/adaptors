import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import { request, getAuth, getUrl, handleResponse } from './Utils';

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
    const { drives, ...rest } = finalState;
    return rest;
  };

  return state => {
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    })
      .then(cleanup)
      .catch(cleanup);
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
export function create(resource, data, callback) {
  return state => {
    const [resolvedResource, resolvedData] = expandReferences(
      state,
      resource,
      data
    );

    const { accessToken, apiVersion } = state.configuration;

    const url = getUrl({ apiVersion, resolvedResource });
    const auth = getAuth(accessToken);

    const options = {
      auth,
      ...resolvedData,
    };

    return request(url, options, 'POST').then(response =>
      handleResponse(response, state, callback)
    );
  };
}

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
export function get(path, query, callback = false) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedPath, resolvedQuery] = expandReferences(state, path, query);

    const url = getUrl(resolvedPath, apiVersion);
    const auth = getAuth(accessToken);

    return request(url, { ...resolvedQuery, ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

/**
 * Get a Drive or SharePoint document library. The drive metadata will be written
 * to state.drives, where it can be used by other adaptor functions.
 * Pass { id } to get a drive by id or { id, owner } to get default drive for
 * some parent resource, like a group
 * @public
 * @example <caption>Get a drive by ID</caption>
 * getDrive({ id: 'YXzpkoLwR06bxC8tNdg71m' })
 * @example <caption>Get the default drive for a site</caption>
 * getDrive({ id: "openfn.sharepoint.com", owner: 'sites' })
 * @param specifier {Object} - A definition of the drive to retrieve
 *    - id {string} - The ID of the resource or owner.
 *    - owner {string} - The type of drive owner (e.g. sites, groups).
 * @param {string} name - The local name of the drive used to write to state.drives, ie, state.drives[name]
 * @param {function} [callback = s => s] (Optional) Callback function
 * @return {Operation}
 */
// TODO: pass a string drive id as the specifier
// TODO: how will we get a list of drives?
// TODO: can we use /me/drive to get the user's default drive?
export function getDrive(specifier, name = 'default', callback = s => s) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedSpecifier, resolvedName] = expandReferences(
      state,
      specifier,
      name
    );

    const { id, owner = 'drive' } = resolvedSpecifier;
    // TODO maybe error if no id

    let urlPath;
    if (owner === 'drive') {
      urlPath = `drives/${id}`;
    } else {
      urlPath = `${owner}/${id}/drive`;
    }

    const url = getUrl(urlPath, apiVersion);
    const auth = getAuth(accessToken);

    return request(url, { ...auth })
      .then(response => {
        state.drives[resolvedName] = response;
        return callback(state);
      })
      .catch(console.log);
  };
}

// return an array of folder contents
// We should safely URI encode the path
// Path must start with /, else will be treated as an id
// writes to state.data
// uses default drive
export function getFolder(pathOrId, options, callback = s => s) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedPathOrId, resolvedOptions] = expandReferences(
      state,
      pathOrId,
      options
    );

    const { name = 'default' } = resolvedOptions;
    const { id: driveId } = state.drives[name];

    let urlPath;

    if (resolvedPathOrId.startsWith('/')) {
      urlPath = `drives/${driveId}/root:/${encodeURIComponent(
        resolvedPathOrId
      )}`;
    } else {
      urlPath = `drives/${driveId}/items/${resolvedPathOrId}`;
    }

    const url = getUrl(urlPath, apiVersion);
    const auth = getAuth(accessToken);

    return request(url, { ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

export function getFile(pathOrId, options = {}, callback = s => s) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedPathOrId, resolvedOptions] = expandReferences(
      state,
      pathOrId,
      options
    );

    // TODO implement metadata (don't get file content, just metadata)
    // TODO implement filter (maps to $filter, must be URI encoded)
    const { name = 'default', metadata, filter } = resolvedOptions;
    const { id: driveId } = state.drives[name];

    let urlPath;
    if (resolvedPathOrId.startsWith('/')) {
      urlPath = `drives/${driveId}/root:/${encodeURIComponent(
        resolvedPathOrId
      )}`;
    } else {
      urlPath = `drives/${driveId}/items/${resolvedPathOrId}/content`;
    }

    const url = getUrl(urlPath, apiVersion);

    const auth = getAuth(accessToken);

    return request(url, { ...auth })
      .then(response =>
        // TODO if response is a single file, it needs to be nested in an array
        handleResponse(response, state, callback)
      )
      .catch(console.log);
  };
}

export { request } from './Utils';

export * from './Sharepoint';

export {
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
  parseCsv,
} from '@openfn/language-common';
