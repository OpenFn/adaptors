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

let client;

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
 * @example
 * create(
 *  'base64-encoded-file-content',
 *  'custom-name.txt',
 *  {
 *    folderId: 'drive-folder-id'
 *  }
 * )
 * @param {string} content - Base64 encoded file content.
 * @param {string} fileName - Name for the uploaded file.
 * @param {Object} options - File upload parameters.
 * @param {string} options.folderId - ID of the parent folder.
 * @returns {Function} An operation that uploads the file.
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
      })
      .catch(err => {
        throw err;
      });
  };
}

/**
 * Downloads a file from Google Drive.
 * @public
 * @example
 * get({ fileId: 'drive-file-id' })
 * @param {string} fileId - ID of the file to download.
 * @returns {Function} An operation that retrieves the file as a base64 string.
 */
export function get(fileId) {
  return state => {
    const [resolvedFileId] = expandReferences(state, fileId);

    return client.files
      .get(
        { fileId: resolvedFileId, alt: 'media' },
        { responseType: 'arraybuffer' },
      )
      .then(response => {
        const content = Buffer.from(response.data).toString('base64');
        return composeNextState(state, { fileId: resolvedFileId, content });
      })
      .catch(err => {
        throw err;
      });
  };
}

/**
 * Updates an existing file in Google Drive.
 * @public
 * @example
 * update({
 *   fileId: 'existing-file-id',
 *   fileString: 'base64-encoded-file-content',
 *   fileName: 'updated-name.txt'
 * })
 * @param {string} fileId - ID of the file to update.
 * @param {string} content - Base64 encoded new content.
 * @param {string} fileName - New name for the file.
 * @param {Object} options - File update options.
 * @returns {Function} An operation that updates the file.
 */
export function update(fileId, content, fileName) {
  return state => {
    const [resolvedFileId, resolvedContent, resolvedFileName] =
      expandReferences(state, fileId, content, fileName);

    const fileMetadata = { name: resolvedFileName };
    const media = {
      mimeType: 'application/octet-stream',
      body: Readable.from(Buffer.from(resolvedContent, 'base64')),
    };

    return client.files
      .update({
        fileId: resolvedFileId,
        requestBody: fileMetadata,
        media: media,
        fields: 'id,name,webViewLink,size',
        uploadType: 'multipart',
        supportsAllDrives: true,
      })
      .then(response => {
        return composeNextState(state, response.data);
      })
      .catch(err => {
        throw err;
      });
  };
}

export {
  alterState,
  combine,
  cursor,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  fn,
  fnIf,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
  util,
} from '@openfn/language-common';
