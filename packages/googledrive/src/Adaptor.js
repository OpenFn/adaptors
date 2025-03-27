import fs from 'fs';
import { logError } from './Utils';
import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';

import {
  normalizeOauthConfig,
  expandReferences,
} from '@openfn/language-common/util';

import { google } from 'googleapis';

let client = undefined;

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
 * Uploads a file to Google Drive with resumable upload support.
 * @public
 * @example
 * create({
 *   filePath: '/path/to/file.txt',
 *   fileName: 'custom-name.txt', // optional
 *   folderId: 'drive-folder-id' // optional
 * })
 * @param {Object} params - File upload parameters
 * @param {string} params.filePath - Local path to the file to upload
 * @param {string} [params.fileName] - Custom name for the uploaded file
 * @param {string} [params.folderId] - ID of the parent folder
 * @returns {Operation} An operation that uploads the file
 */
export function create(params) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);
    const { filePath, fileName, folderId } = resolvedParams;

    const fileMetadata = {
      name: fileName || filePath.split('/').pop(),
      parents: folderId ? [folderId] : [],
    };

    const media = {
      mimeType: 'application/octet-stream',
      body: fs.createReadStream(filePath),
    };

    return new Promise((resolve, reject) => {
      client.files.create(
        {
          requestBody: fileMetadata,
          media: media,
          fields: 'id,name,webViewLink,size,mimeType,createdTime',
          uploadType: 'resumable',
          supportsAllDrives: true, // Important for shared drives
        },
        (err, response) => {
          if (err) {
            logError(err);
            if (err.code === 404) {
              reject(new Error(`Parent folder not found (ID: ${folderId})`));
            } else if (err.code === 403) {
              reject(new Error('Permission denied for file creation'));
            } else {
              reject(err);
            }
          } else {
            console.log('ID:', response.data.id);
            console.log('Name:', response.data.name);
            console.log('URL:', response.data.webViewLink);
            resolve(composeNextState(state, response.data));
          }
        },
      );
    });
  };
}

/**
 * Downloads a file from Google Drive.
 * @public
 * @example
 * get({
 *   fileId: 'drive-file-id',
 *   outputPath: '/path/to/save.txt'
 * })
 * @param {Object} params - File download parameters
 * @param {string} params.fileId - ID of the file to download
 * @param {string} params.outputPath - Local path to save the file
 * @returns {Operation} An operation that downloads the file
 */
export function get(params) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);
    const { fileId, outputPath } = resolvedParams;
    const dest = fs.createWriteStream(outputPath);

    return new Promise((resolve, reject) => {
      client.files.get(
        { fileId, alt: 'media' },
        { responseType: 'stream' },
        (err, response) => {
          if (err) {
            logError(err);
            reject(err);
            return;
          }

          response.data
            .pipe(dest)
            .on('finish', () => {
              console.log(`Downloaded ${fileId} to ${outputPath}`);
              resolve(composeNextState(state, { fileId, outputPath }));
            })
            .on('error', err => {
              logError(err);
              reject(err);
            });
        },
      );
    });
  };
}

/**
 * Updates an existing file in Google Drive with resumable upload support.
 * @public
 * @example
 * update({
 *   fileId: 'existing-file-id',
 *   filePath: '/path/to/new-content.txt',
 *   fileName: 'updated-name.txt' // optional
 * })
 * @param {Object} params - File update parameters
 * @param {string} params.fileId - ID of the file to update
 * @param {string} params.filePath - Local path to the new content
 * @param {string} [params.fileName] - New name for the file
 * @returns {Operation} An operation that updates the file
 */
export function update(params) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);
    const { fileId, filePath, fileName } = resolvedParams;

    const fileMetadata = {
      name: fileName || filePath.split('/').pop(),
    };

    const media = {
      mimeType: 'application/octet-stream',
      body: fs.createReadStream(filePath),
    };

    return new Promise((resolve, reject) => {
      client.files.update(
        {
          fileId,
          requestBody: fileMetadata,
          media: media,
          fields: 'id,name,webViewLink,size',
          uploadType: 'resumable',
          supportsAllDrives: true, // Important for shared drives
        },
        (err, response) => {
          if (err) {
            logError(err);
            if (err.code === 404) {
              reject(new Error(`File not found (ID: ${fileId})`));
            } else if (err.code === 403) {
              reject(new Error('Permission denied for file update'));
            } else {
              reject(err);
            }
          } else {
            console.log('Successfully updated file:');
            console.log('ID:', response.data.id);
            console.log('Name:', response.data.name);
            console.log('URL:', response.data.webViewLink);
            resolve(composeNextState(state, response.data));
          }
        },
      );
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
} from '@openfn/language-common';
