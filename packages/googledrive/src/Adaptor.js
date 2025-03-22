import fs from 'fs';
import { execute as commonExecute } from '@openfn/language-common';
import { request as sendRequest } from '@openfn/language-http';
import { google } from 'googleapis';

let client = undefined;

function createConnection(state) {
  const { accessToken } = state.configuration;
  const auth = new google.auth.OAuth2();
  auth.credentials = { access_token: accessToken };
  client = google.drive({ version: 'v3', auth });
  return state;
}

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
    });
  };
}

/**
 * Uploads a file to Google Drive using streaming.
 * @param {Object} state - OpenFn state object.
 * @param {string} filePath - Path to the file to be uploaded.
 * @param {string|null} [folderId=null] - Optional folder ID to upload the file into.
 * @returns {Promise<Object>} Updated state including the uploaded file details.
 */
async function uploadFile(state, filePath, folderId = null) {
  const fileMetadata = {
    name: filePath.split('/').pop(),
    parents: folderId ? [folderId] : [],
  };

  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath),
  };

  try {
    const response = await client.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id, name',
    });
    console.log(`Uploaded File ID: ${response.data.id}`);
    return { ...state, data: response.data };
  } catch (err) {
    console.error('Upload error:', err);
    throw err;
  }
}

/**
 * Downloads a file from Google Drive using streaming.
 * @param {Object} state - OpenFn state object.
 * @param {string} fileId - ID of the file to download.
 * @param {string} outputPath - Path to save the downloaded file.
 * @returns {Promise<Object>} Updated state with file details.
 */
async function downloadFile(state, fileId, outputPath) {

  const dest = fs.createWriteStream(outputPath);

  try {
    const response = await client.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    return new Promise((resolve, reject) => {
      response.data
        .pipe(dest)
        .on('finish', () => {
          console.log('Download complete:', outputPath);
          resolve({ ...state, data: { fileId, outputPath } });
        })
        .on('error', err => {
          console.error('Download failed:', err);
          reject(err);
        });
    });
  } catch (err) {
    console.error('Download error:', err);
    throw err;
  }
}

/**
 * Transfers a file from Google Drive to another API endpoint via streaming.
 * @param {Object} state - OpenFn state object.
 * @param {string} fileId - ID of the file to transfer.
 * @param {string} targetUrl - The target API URL.
 * @returns {Promise<Object>} HTTP response from the target API.
 */
async function transferFile(state, fileId, targetUrl) {
  const response = await client.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  return sendRequest('POST', targetUrl, { body: response.data });
}

/**
 * Updates an existing file in Google Drive with new content.
 * @param {Object} state - OpenFn state object.
 * @param {string} fileId - ID of the file to update.
 * @param {string} filePath - Path to the new file content.
 * @returns {Promise<Object>} Updated state including the updated file details.
 */
async function updateFile(state, fileId, filePath) {

  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath),
  };

  try {
    const response = await client.files.update({
      fileId,
      media,
      fields: 'id, name',
    });
    console.log(`Updated File ID: ${response.data.id}`);
    return { ...state, data: response.data };
  } catch (err) {
    console.error('Update error:', err);
    throw err;
  }
}

export function put(fileId, filePath) {
  return state => updateFile(state, fileId, filePath);
}

export function post(filePath, folderId = null) {
  return state => uploadFile(state, filePath, folderId);
}

export function get(fileId, outputPath) {
  return state => downloadFile(state, fileId, outputPath);
}

export function transfer(fileId, targetUrl) {
  return state => transferFile(state, fileId, targetUrl);
}

export {
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';