import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import { request, getAuth, getUrl, handleResponse, assertDrive } from './Utils';

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
export function getDrive(specifier, name = 'default', callback = s => s) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedSpecifier, resolvedName] = expandReferences(
      state,
      specifier,
      name
    );

    const { id, owner = 'drive' } = resolvedSpecifier;

    let resource;
    if (owner === 'drive') {
      resource = `drives/${id}`;
    } else {
      resource = `${owner}/${id}/drive`;
    }

    const url = getUrl(resource, apiVersion);
    const auth = getAuth(accessToken);

    return request(url, { ...auth }).then(response => {
      state.drives[resolvedName] = response;
      return callback(state);
    });
  };
}

/**
 * Get the contents or metadata of a folder.
 * @public
 * @example <caption>Get a folder by ID</caption>
 * getFolder('01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3')
 * @example <caption>Get a folder for a named drive by id</caption>
 * getFolder("01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3",{ driveName: "mydrive"})
 * @param {string} pathOrId - A path to a folder or folder id
 * @param {object} options - (Optional) Query parameters
 * @param {function} [callback = s => s] (Optional) Callback function
 * @return {Operation}
 */
export function getFolder(pathOrId, options, callback = s => s) {
  return async state => {
    const defaultOptions = {
      driveName: 'default', // Named drive in state.drives
      metadata: false, // If false return folder files if true return folder metadata
      // $filter: '', // Eg: "file/mimeType eq \'application/vnd.ms-excel\'"
    };
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedPathOrId, resolvedOptions] = expandReferences(
      state,
      pathOrId,
      options
    );

    const { driveName, metadata } = { ...defaultOptions, ...resolvedOptions };

    assertDrive(state, driveName);

    const { id: driveId } = state.drives[driveName];

    let resource;

    if (resolvedPathOrId.startsWith('/')) {
      resource = `drives/${driveId}/root:/${encodeURIComponent(
        resolvedPathOrId
      )}`;
    } else {
      resource = `drives/${driveId}/items/${resolvedPathOrId}`;
    }

    if (!metadata) {
      resource += resolvedPathOrId.startsWith('/') ? ':/children' : '/children';
    }

    const url = getUrl(resource, apiVersion);
    const auth = getAuth(accessToken);

    return request(url, { ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

/**
 * Get file metadata or file content.
 * @public
 * @example <caption>Get a file by ID</caption>
 * getFile('01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW')
 * @example <caption>Get a file for a named drive by id</caption>
 * getFile("01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW",{ driveName: "mydrive"})
 * @param {string} pathOrId - A path to a file or file id
 * @param {object} options - (Optional) Query parameters
 * @param {function} [callback = s => s] (Optional) Callback function
 * @return {Operation}
 */
export function getFile(pathOrId, options, callback = s => s) {
  const defaultOptions = {
    driveName: 'default', // named drive in state.drives
    metadata: false, // Returns file msgraph metadata
    // $filter: '', // Eg: "file/mimeType eq \'application/vnd.ms-excel\'"
    // select: '', // Eg: id,@microsoft.graph.downloadUrl
  };
  return async state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedPathOrId, resolvedOptions] = expandReferences(
      state,
      pathOrId,
      options
    );

    const { driveName, metadata, parseAs } = {
      ...defaultOptions,
      ...resolvedOptions,
    };

    assertDrive(state, driveName);

    const { id: driveId } = state.drives[driveName];

    let resource;

    if (resolvedPathOrId.startsWith('/')) {
      resource = `drives/${driveId}/root:/${encodeURIComponent(
        resolvedPathOrId
      )}`;
    } else {
      resource = `drives/${driveId}/items/${resolvedPathOrId}`;
    }

    if (!metadata) {
      resource += resolvedPathOrId.startsWith('/') ? ':/content' : '/content';
    }

    const url = getUrl(resource, apiVersion);

    const auth = getAuth(accessToken);

    const response = await request(url, { ...auth, parseAs });

    return handleResponse(response, state, callback);
  };
}

export { request } from './Utils';

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
