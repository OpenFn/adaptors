import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import { request, setAuth, setUrl, handleResponse } from './Utils';

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
    const [resolveResource, resolveData] = expandReferences(
      state,
      resource,
      data
    );

    const { accessToken, apiVersion } = state.configuration;

    const url = setUrl({ apiVersion, resolveResource });
    const auth = setAuth(accessToken);

    const options = {
      auth,
      ...resolveData,
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
    const [resolvePath, resolveQuery] = expandReferences(state, path, query);

    const url = setUrl({ apiVersion, resolvePath });
    const auth = setAuth(accessToken);

    return request(url, { ...resolveQuery, ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

/**
 * Get Drive in msgraph such as OneDrive or SharePoint document libraries.
 * @public
 * @example <caption>Get a current user drive</caption>
 * getDrive()
 * @example <caption>Get a drive by ID</caption>
 * getDrive('YXzpkoLwR06bxC8tNdg71m')
 * @example <caption>Get a drive for a site</caption>
 * getDrive({ resourceId: "openfn.sharepoint.com", resource: 'sites' })
 * @example <caption>Get a drive associated with a group</caption>
 * getDrive({ resourceId: 'b!YXzpkoLwR06bxC8tNdg71m', resource: 'groups' })
 * @param drive {string|Object} - The ID of the drive to get or an object describing the drive location (site/group/user).
 *    - If drive is a string, it represents the drive ID.
 *    - If drive is an object, it should have the following properties:
 *        - resource {string} - The type of resource (e.g. sites, groups).
 *        - resourceId {string} - The ID of the resource.
 * @param {function} [callback = s => s] (Optional) Callback function
 * @return {Operation}
 */
export function getDrive(drive, callback) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedDrive] = expandReferences(state, drive);

    let resolvePath = 'me/drive';

    if (typeof resolvedDrive === 'string') {
      resolvePath = `drives/${resolvedDrive}`;
    } else if (typeof resolvedDrive === 'object') {
      const { resourceId, resource } = resolvedDrive;

      if (!resourceId || !resource) {
        throw new Error('You must provide both resourceId and resource');
      }

      resolvePath = `${resource}/${resourceId}/drive`;
    }

    const url = setUrl({ apiVersion, resolvePath });
    const auth = setAuth(accessToken);

    return request(url, { ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

/**
 * Get Drive in msgraph such as OneDrive or SharePoint document libraries.
 * @public
 * @example <caption>Get a current user drives</caption>
 * listDrives()
 * @example <caption>Get site drives </caption>
 * listDrives({ resourceId: "openfn.sharepoint.com", resource: 'sites' })
 * @example <caption>Get a drive associated with a group</caption>
 * listDrives({ resourceId: 'b!YXzpkoLwR06bxC8tNdg71m', resource: 'groups' })
 * @param resource {Object} - An object describing the drive location (site/group/user).
 *  It should have the following properties:
 *   - resource {string} - The type of resource (e.g. sites, groups).
 *   - resourceId {string} - The ID of the resource.
 * @param {function} [callback = s => s] (Optional) Callback function
 * @return {Operation}
 */
export function listDrives(resource, callback) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedResource] = expandReferences(state, resource);

    let resolvePath = 'me/drives';

    if (typeof resolvedResource === 'object') {
      const { resourceId, resource } = resolvedResource;

      if (!resourceId || !resource) {
        throw new Error('You must provide both resourceId and resource');
      }

      resolvePath = `${resource}/${resourceId}/drives`;
    }

    const url = setUrl({ apiVersion, resolvePath });
    const auth = setAuth(accessToken);

    return request(url, { ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
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
