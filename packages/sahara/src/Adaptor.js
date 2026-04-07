import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';
import { validateUploadUrl } from './validateUrl.js';

/**
 * State object
 * @typedef {Object} SaharaState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * @typedef {Object} UploadOptions
 * @property {string} audio_file_name - Name for the uploaded file (required)
 * @property {string|{url: string}} audio_file_blob - URL or { url } (required). See Sahara docs for post-processing options.
 */

/**
 * Upload an audio file for transcription. audio_file_blob must be a URL (string or { url }).
 * @public
 * @function
 * @param {UploadOptions} uploadData - Upload options and any post-processing flags
 * @param {object} [options] - Retry options: maxRetries, retryDelay, retryOn429
 * @returns {Operation}
 * @state {SaharaState}
 */
export function uploadAudioFile(uploadData, options = {}) {
  return async state => {
    const [resolvedUploadData, resolvedOptions] = expandReferences(
      state,
      uploadData,
      options
    );

    const {
      audio_file_name,
      audio_file_blob,
      ...uploadOptions
    } = resolvedUploadData;

    if (!audio_file_name) {
      throw new Error('audio_file_name is required');
    }

    if (!audio_file_blob) {
      throw new Error('audio_file_blob is required');
    }

    // Normalize to URL string only (no file paths or Buffers — OpenFn/Lightning compatible)
    const urlString =
      typeof audio_file_blob === 'string'
        ? audio_file_blob
        : audio_file_blob && typeof audio_file_blob.url === 'string'
          ? audio_file_blob.url
          : null;

    if (
      !urlString ||
      (!urlString.startsWith('http://') && !urlString.startsWith('https://'))
    ) {
      throw new Error(
        'audio_file_blob must be a URL string (http:// or https://) or an object with a url property (e.g. { url: state.data.signedUrl }). File paths and Buffers are not supported.'
      );
    }

    if (state.configuration?.validateUploadUrl === true) {
      validateUploadUrl(urlString, state.configuration || {});
    }

    const urlPreview =
      urlString.slice(0, 60) + (urlString.length > 60 ? '...' : '');
    console.log(`Uploading audio file: ${audio_file_name} (blob: ${urlPreview})`);

    const formData = {
      audio_file_name,
      audio_file_blob: urlString,
      ...uploadOptions,
    };

    const retryOptions = {
      maxRetries: resolvedOptions.maxRetries,
      retryDelay: resolvedOptions.retryDelay,
      retryOn429: resolvedOptions.retryOn429,
    };

    const response = await util.uploadFile(
      state.configuration,
      '/file/v1/upload',
      formData,
      retryOptions
    );

    console.log(
      `File queued successfully. File ID: ${response.body?.data?.file_id}`
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Get transcription status and results for a file.
 * @public
 * @function
 * @param {string} fileId - File ID from upload response
 * @param {object} [options] - Optional query (e.g. get_structured_post_processing) and retry options
 * @returns {Operation}
 * @state {SaharaState}
 */
export function getFileStatus(fileId, options = {}) {
  return async state => {
    const [resolvedFileId, resolvedOptions] = expandReferences(
      state,
      fileId,
      options
    );

    if (!resolvedFileId) {
      throw new Error('fileId is required');
    }

    console.log(`Fetching status for file ID: ${resolvedFileId}`);

    const queryParams = {};
    if (resolvedOptions.get_structured_post_processing) {
      queryParams.get_structured_post_processing =
        resolvedOptions.get_structured_post_processing;
    }

    const response = await util.request(
      state.configuration,
      'GET',
      `/file/v1/status/${resolvedFileId}`,
      {
        query: queryParams,
      }
    );

    const processingStatus = response.body?.data?.processing_status;
    console.log(`File processing status: ${processingStatus}`);

    if (processingStatus === 'FILE_QUEUED') {
      console.log('⏳ File is queued for processing');
    } else if (processingStatus === 'FILE_PENDING') {
      console.log('⏳ File is pending processing');
    } else if (processingStatus === 'FILE_PROCESSING') {
      console.log('⏳ File is still being processed');
    } else if (processingStatus === 'FILE_TRANSCRIBED') {
      console.log('✓ Transcription completed successfully');
    } else if (processingStatus === 'FILE_INVALID') {
      console.log('✗ File is invalid');
    } else if (processingStatus === 'FILE_INVALID_SIZE') {
      console.log('✗ File size is invalid');
    } else if (processingStatus === 'FILE_INVALID_DURATION') {
      console.log('✗ File duration is invalid');
    } else if (processingStatus === 'FILE_PROCESSING_FAILED') {
      console.log('✗ File processing failed');
    } else if (processingStatus === 'FILE_PROCESSING_TIMEOUT') {
      console.log('✗ File processing timed out');
    } else if (processingStatus === 'FILE_PROCESSING_CANCELLED') {
      console.log('✗ File processing was cancelled');
    }

    return util.prepareNextState(state, response);
  };
}

/**
 * Upload and poll until transcription completes.
 * @public
 * @function
 * @param {UploadOptions} uploadData - Same as uploadAudioFile
 * @param {object} [waitOptions] - pollInterval (ms), maxAttempts
 * @returns {Operation}
 * @state {SaharaState}
 */
export function uploadAndWaitForTranscription(uploadData, waitOptions = {}) {
  return async state => {
    const { pollInterval = 3000, maxAttempts = 100 } = waitOptions;

    // First upload the file
    const uploadState = await uploadAudioFile(uploadData)(state);

    const fileId = uploadState.data?.data?.file_id || uploadState.data?.file_id;

    if (!fileId) {
      console.error('Upload state structure:', JSON.stringify(uploadState.data, null, 2));
      throw new Error('Failed to get file_id from upload response');
    }

    console.log(`Waiting for transcription to complete (polling every ${pollInterval}ms)...`);

    // Poll for completion
    let attempts = 0;
    let completed = false;
    let finalState = uploadState;

    while (!completed && attempts < maxAttempts) {
      attempts++;

      // Wait before polling
      await new Promise(resolve => setTimeout(resolve, pollInterval));

      // Check status
      const statusState = await getFileStatus(fileId)(finalState);
      const processingStatus =
        statusState.data?.data?.processing_status ??
        statusState.data?.processing_status;

      if (processingStatus === 'FILE_TRANSCRIBED') {
        console.log(`✓ Transcription completed after ${attempts} attempts`);
        completed = true;
        finalState = statusState;
      } else if (
        processingStatus === 'FILE_INVALID' ||
        processingStatus === 'FILE_INVALID_SIZE' ||
        processingStatus === 'FILE_INVALID_DURATION' ||
        processingStatus === 'FILE_PROCESSING_FAILED' ||
        processingStatus === 'FILE_PROCESSING_TIMEOUT' ||
        processingStatus === 'FILE_PROCESSING_CANCELLED'
      ) {
        throw new Error(`Transcription failed with status: ${processingStatus}`);
      } else {
        // Continue polling for any other status (FILE_QUEUED, FILE_PENDING, FILE_PROCESSING, or unknown)
        finalState = statusState;
        console.log(
          `Attempt ${attempts}/${maxAttempts}: Status is ${processingStatus || 'UNKNOWN'}`
        );
      }
    }

    if (!completed) {
      throw new Error(
        `Transcription did not complete within ${maxAttempts} attempts (${(maxAttempts * pollInterval) / 1000}s)`
      );
    }

    return finalState;
  };
}

/**
 * GET request to the API.
 * @public
 * @function
 * @param {string} path - Path to resource
 * @param {object} [options] - Optional request/retry options
 * @returns {Operation}
 * @state {SaharaState}
 */
export function get(path, options) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options
    );

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * POST request to the API.
 * @public
 * @function
 * @param {string} path - Path to resource
 * @param {object} body - Request body
 * @param {object} [options] - Optional request/retry options
 * @returns {Operation}
 * @state {SaharaState}
 */
export function post(path, body, options) {
  return async state => {
    const [resolvedPath, resolvedBody, resolvedOptions] = expandReferences(
      state,
      path,
      body,
      options
    );

    const response = await util.request(
      state.configuration,
      'POST',
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}

// Export common functions from language-common
export {
  as,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';
