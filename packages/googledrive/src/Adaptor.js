import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import {
  normalizeOauthConfig,
  expandReferences,
} from '@openfn/language-common/util';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { getFileById, getFileByName } from './util.js';

let client;

/**
 * State object
 * @typedef {Object} DriveState
 * @property data - the parsed response body
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/
/**
 * @private
 * Creates a connection to Google Drive using OAuth2 authentication.
 * @param {Object} state - object containing the access token.
 * @returns {Object} state with Google Drive client initialized.
 */
function createConnection(state) {
  const { accessToken } = state.configuration;
  const auth = new google.auth.OAuth2();
  auth.credentials = { access_token: accessToken };
  client = google.drive({ version: 'v3', auth });
  return state;
}

/**
 * @private
 * Removes the Google Drive client connection.
 * @param {Object} state - object.
 * @returns {Object} state with client reset.
 */
function removeConnection(state) {
  client = undefined;
  return state;
}

/**
 * Execute a sequence of oper.
 * Wraps `language-common/execute`, and prepends initial state for http.
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

  return state => {
    return commonExecute(
      createConnection,
      ...operations,
      removeConnection,
    )({
      ...initialState,
      ...state,
      configuration: normalizeOauthConfig(state.configuration),
    });
  };
}

/**
 * Uploads a file to Google Drive.
 * @public
 * @example <caption>Upload a file to a root folder</caption>
 * create("SGVsbG8gV29ybGQ=", "hello-world.txt");
 * @example <caption>Upload a file to a specificfolder</caption>
 * create("SGVsbG8gV29ybGQ=", "hello-world.txt", {
 *   folderId: "15tLwRj0lmr4mGIslEm5QEAS8YJ1EAXep",
 * });
 * @param {string} content - Base64 encoded file content.
 * @param {string} fileName - Name for the uploaded file.
 * @param {Object} options - File upload parameters.
 * @param {string} [options.folderId] - ID of the parent folder.
 * @state {DriveState}
 * @returns {Operation}
 */
export function create(content, fileName, options = {}) {
  return state => {
    const [resolvedContent, resolvedFileName, resolvedOptions] =
      expandReferences(state, content, fileName, options);

    const fileMetadata = {
      name: resolvedFileName,
      parents: resolvedOptions.folderId ? [resolvedOptions.folderId] : [],
    };

    const media = {
      mimeType: 'application/octet-stream',
      body: Readable.from(Buffer.from(resolvedContent, 'base64')),
    };

    return client.files
      .create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id,name,webViewLink,size,mimeType,createdTime',
        uploadType: 'multipart',
        supportsAllDrives: true,
      })
      .then(response => {
        return composeNextState(state, response.data);
      });
  };
}

/**
 * Downloads a file from Google Drive.
 * @public
 * @example <caption>Download a file</caption>
 * get('1B1dHwY2uLgm_-U96LNl9zFsRYq8953jL')
 * @example <caption>Download a file by name</caption>
 * get('hello-world.txt')
 * @param {string} fileIdOrName - ID of the file or its name to download.
 * @state {DriveState}
 * @returns {Operation} An operation that retrieves the file as a base64 string.
 */
export function get(fileIdOrName) {
  return async state => {
    const [resolvedFileIdOrName] = expandReferences(state, fileIdOrName);

    const fileData = resolvedFileIdOrName.match(/^[a-zA-Z0-9_-]+$/)
      ? await getFileById(resolvedFileIdOrName, client)
      : await getFileByName(resolvedFileIdOrName, client);

    return composeNextState(state, fileData);
  };
}

/**
 * Lists files from a directory or root.
 * @public
 * @example <caption>List files of a directory</caption>
 * list({folderId: '<id-of-folder-here>'})
 * @example <caption>List files at the root of google drive</caption>
 * list()
 * @param {string} folderId - ID of the folder to list files from. If not provided, lists files from the root.
 * @param {Object} [options] - Options for listing files
 * @param {string} [options.fields] - Fields to return in the response. Defaults to 'files(id, name, mimeType, createdTime, modifiedTime)'.
 * @param {string} [options.query] - Custom query string for filtering files (see Google Drive API query syntax).
 * @param {number} [options.limit] - Maximum number of files to return
 * @param {string} [options.orderBy] - Order in which to sort the results. Defaults to 'modifiedTime desc'.
 * @state {DriveState}
 * @returns {Operation} An operation that retrieves a list of files.
 */
export function list(folderId, options) {
  return async state => {
    const [resolvedFolderId, resolvedOptions] = expandReferences(
      state,
      folderId,
      options || {},
    );
    const { fields, query, limit, orderBy, pageToken } = resolvedOptions;

    if (!resolvedFolderId || typeof resolvedFolderId !== 'string') {
      throw Error(
        'folderId is required: You need to provide the id of a folder to list from',
      );
    }

    let finalFields = ['id', 'name', 'mimeType', 'createdTime', 'modifiedTime'];
    if (Array.isArray(fields)) finalFields = fields;
    else if (typeof fields === 'string') {
      finalFields = fields.split(',').map(v => v.trim());
    }

    // generate final query
    const queries = [`'${resolvedFolderId}' in parents`];
    if (query) queries.push(query);

    const response = await client.files.list({
      q: queries.join(' and '),
      fields: `nextPageToken, incompleteSearch, kind, files(${finalFields.join(',')})`,
      pageSize: limit ?? undefined,
      orderBy: orderBy || 'modifiedTime desc',
      pageToken: pageToken ?? undefined,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    const files = response?.data?.files ?? [];
    state.response = { nextPageToken: response?.data?.nextPageToken };
    return composeNextState(state, files);
  };
}

/**
 * Updates an existing file in Google Drive.
 * @public
 * @example <caption>Update a file</caption>
 * update('1B1dHwY2uLgm_-U96LNl9zFsRYq8953jL', 'SGVsbG8gTWlrZQ==');
 * @param {string} fileId - ID of the file to update.
 * @param {string} content - Base64 encoded new content.
 * @state {DriveState}
 * @returns {Operation}
 */
export function update(fileId, content) {
  return state => {
    const [resolvedFileId, resolvedContent] = expandReferences(
      state,
      fileId,
      content,
    );

    const media = {
      mimeType: 'application/octet-stream',
      body: Readable.from(Buffer.from(resolvedContent, 'base64')),
    };

    return client.files
      .update({
        fileId: resolvedFileId,
        media: media,
        fields: 'id,name,webViewLink,size',
        uploadType: 'multipart',
        supportsAllDrives: true,
      })
      .then(response => {
        return composeNextState(state, response.data);
      });
  };
}

export {
  as,
  fn,
  fnIf,
  util,
  each,
  field,
  merge,
  chunk,
  fields,
  cursor,
  combine,
  dateFns,
  parseCsv,
  dataPath,
  dataValue,
  alterState,
  sourceValue,
  arrayToString,
  lastReferenceValue,
} from '@openfn/language-common';
