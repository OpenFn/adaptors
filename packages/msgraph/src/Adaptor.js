// TODO all this is deprecated now..
import { expandReferences } from '@openfn/language-common/util';

import {
  request,
  setUrl,
  handleResponse,
  assertDrive,
  assertResources,
} from './Utils';

// /**
//  * Execute a sequence of operations.
//  * Wraps `language-common/execute` to make working with this API easier.
//  * @example
//  * execute(
//  *   create('foo'),
//  *   delete('bar')
//  * )(state)
//  * @private
//  * @param {Operations} operations - Operations to be performed.
//  * @returns {Operation}
//  */
// export function execute(...operations) {
//   const initialState = {
//     references: [],
//     data: null,
//     drives: {},
//   };

//   const cleanup = finalState => {
//     if (finalState?.buffer) {
//       delete finalState.buffer;
//     }
//     if (finalState?.drives) {
//       delete finalState.drives;
//     }

//     return finalState;
//   };

//   return state => {
//     return commonExecute(...operations)({
//       ...initialState,
//       ...state,
//     })
//       .then(cleanup)
//       .catch(error => {
//         cleanup(state);
//         throw error;
//       });
//   };
// }

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

    const url = setUrl(resource, apiVersion);

    return request(url, { accessToken }).then(response =>
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

    const { driveName, metadata } = {
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

    const url = setUrl(resource, apiVersion);

    const response = await request(url, {
      accessToken,
      parseAs: metadata ? 'json' : 'text',
    });

    return handleResponse(response, state, callback);
  };
}

const defaultResource = {
  contentType: 'application/octet-stream',
  driveId: '',
  folderId: '',
  fileName: 'sheet.xls',
  onConflict: 'replace',
};

/**
 * Upload a file to a drive
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
export function uploadFile(resource, data, callback) {
  return async state => {
    const { accessToken, apiVersion } = state.configuration;

    const [resolvedResource, resolvedData] = expandReferences(
      state,
      resource,
      data
    );

    const { contentType, driveId, siteId, folderId, onConflict, fileName } = {
      ...defaultResource,
      ...resolvedResource,
    };

    assertResources({ driveId, siteId, folderId });

    const path =
      (driveId &&
        `drives/${driveId}/items/${folderId}:/${fileName}:/createUploadSession`) ||
      (siteId &&
        `sites/${siteId}/drive/items/${folderId}:/${fileName}:/createUploadSession`);

    const uploadSession = await request(setUrl(path, apiVersion), {
      method: 'POST',
      accessToken,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        '@microsoft.graph.conflictBehavior': onConflict,
        name: fileName,
      }),
    });

    const uploadUrl = uploadSession.uploadUrl;

    console.log(`Uploading file...`);

    return request(uploadUrl, {
      method: 'PUT',
      accessToken,
      headers: {
        'Content-Type': contentType,
        'Content-Length': `${resolvedData.length}`,
        'Content-Range': `bytes 0-${resolvedData.length - 1}/${
          resolvedData.length
        }`,
      },

      body: resolvedData,
    }).then(response => handleResponse(response, state, callback));
  };
}

export { request, sheetToBuffer } from './Utils';

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
