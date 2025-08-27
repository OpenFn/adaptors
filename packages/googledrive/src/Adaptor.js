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
import { getFileById, getFileByName } from './util';

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
      removeConnection
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
      content
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
