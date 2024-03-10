import { execute as commonExecute } from '@openfn/language-common'
import { operation } from '@openfn/language-common/util'

import * as impl from './impl';
import { request } from './utils';
import { enable, mockRoute } from './mock/mock';

// TODO this may be deprecated now ?
// I don't think we need it for this adaptor, which is nice!
let customHandler;
const getRequestHandler = () => {
  return customHandler || request;
}

/** Alternative, standardised, mock handler */

// The runtime itself will call this to flick the whole thing into mock mode
export const enableMock = (state, routes) => {
  return enable(state, routes);
}
/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to make working with this API easier.
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
 * Create some resource in msgraph.
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
  // this pattern isn't so helpful for a http adaptor, the mock client
  // isn't needed
  // going to save it for now because I think it's still good for eg salesforce, postgres 
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
export const get = operation((state, path, query, callback) => {
  return impl.get(state, getRequestHandler(), path, query, callback)
})


/**
 * Get a Drive or SharePoint document library. The drive metadata will be written
 * to state.drives, where it can be used by other adaptor functions.
 * Pass { id } to get a drive by id or { id, owner } to get default drive for
 * some parent resource, like a group.
 * @public
 * @example <caption>Get a drive by ID</caption>
 * getDrive({ id: "YXzpkoLwR06bxC8tNdg71m" })
 * @example <caption>Get the default drive for a site</caption>
 * getDrive({ id: "openfn.sharepoint.com", owner: "sites" })
 * @param specifier {Object} - A definition of the drive to retrieve
 *    - id {string} - The ID{ defa} of the resource or owner.
 *    - owner {string} - The type of drive owner (e.g. sites, groups).
 * @param {string} name - The local name of the drive used to write to state.drives, ie, state.drives[name]
 * @param {function} [callback = s => s] (Optional) Callback function
 * @return {Operation}
 */
export const getDrive = operation((state, specifier, name, callback) => {
  return impl.getDrive(state, getRequestHandler(), specifier, name, callback)
})

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
export const getFolder = operation((state, pathOrId, options, callback) => {
  return impl.getFolder(state, getRequestHandler(), pathOrId, options, callback)
});


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
export const getFile = operation((state, pathOrId, options, callback) => {
  return impl.getFile(state, getRequestHandler(), pathOrId, options, callback)
});

/**
 * Upload a file to a drive.
 * @public
 * @example
 * <caption>Upload Excel file to a drive using `driveId` and `parantItemId`</caption>
 * uploadFile(
 *   state => ({
 *     driveId: state.driveId,
 *     folderId: state.folderId,
 *     fileName: `Tracker.xlsx`,
 *   }),
 *   state => state.buffer
 * );
 * @example
 * <caption>Upload Excel file to a SharePoint drive using `siteId` and `parantItemId`</caption>
 * uploadFile(
 *   state => ({
 *     siteId: state.siteId,
 *     folderId: state.folderId,
 *     fileName: `Report.xlsx`,
 *   }),
 *   state => state.buffer
 * );
 * @function
 * @param {Object} resource - Resource Object
 * @param {String} [resource.driveId] - Drive Id
 * @param {String} [resource.driveId] - Site Id
 * @param {String} [resource.folderId] - Parent folder id
 * @param {String} [resource.contentType] - Resource content-type
 * @param {String} [resource.onConflict] - Specify conflict behavior if file with the same name exists. Can be "rename | fail | replace"
 * @param {Object} data - A buffer containing the file.
 * @param {Function} callback - Optional callback function
 * @returns {Operation}
 */
export const uploadFile = operation((state, resource, data, callback) => {
  return impl.uploadFile(state, getRequestHandler(), pathOrId, options, callback)
});

export { request, sheetToBuffer } from './utils';

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

