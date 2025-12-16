import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';
import { logger } from './Utils.js';

/**
 * State object
 * @typedef {Object} SaharaState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options for file upload
 * @typedef {Object} UploadOptions
 * @public
 * @property {string} audio_file_name - Name for the uploaded audio file (required)
 * @property {object} audio_file_blob - The audio file to upload (required)
 * @property {string} use_category - Category of post-processing (file_category_general, file_category_telehealth, file_category_procedure, file_category_call_center, file_category_legal, file_category_meeting_notes)
 * @property {string} use_diarization - Enable speaker diarization ("TRUE" or "FALSE")
 * @property {string} use_template_id - Custom prompt template ID
 * @property {string} get_summary - Get summary of transcript ("TRUE" or "FALSE")
 * @property {string} get_soap_note - Get SOAP note (telehealth category only)
 * @property {string} get_entity_list - Get extracted entities
 * @property {string} get_treatment_plan - Get treatment plan
 * @property {string} get_clerking - Get clerking notes
 * @property {string} get_icd_codes - Get ICD/billing codes
 * @property {string} get_suggestions - Get suggestions
 * @property {string} get_differential_diagnosis - Get differential diagnosis
 * @property {string} get_followup_instructions - Get follow-up instructions
 * @property {string} get_practice_guidelines - Get practice guidelines
 * @property {string} get_op_note - Get operation note (procedure category only)
 * @property {string} get_call_center_results - Get call center results
 * @property {string} get_call_center_agent_score - Get agent score
 * @property {string} get_call_center_agent_score_category - Get agent score category
 * @property {string} get_call_center_product_info - Get product info
 * @property {string} get_call_center_product_insights - Get product insights
 * @property {string} get_call_center_compliance - Get compliance check
 * @property {string} get_call_center_feedback - Get feedback
 * @property {string} get_call_center_sentiment - Get sentiment analysis
 * @property {string} get_legal_court_hearing - Get court hearing format (legal category only)
 * @property {string} get_meeting_notes_participants - Get meeting participants
 * @property {string} get_meeting_notes_decisions - Get meeting decisions
 * @property {string} get_meeting_notes_action_items - Get action items
 * @property {string} get_meeting_notes_key_topics - Get key topics
 * @property {string} get_meeting_notes_next_steps - Get next steps
 */

/**
 * Upload an audio file for transcription
 * @public
 * @function
 * @example Upload a basic audio file
 * uploadAudioFile({ 
 *   audio_file_name: "patient_consultation_1",
 *   audio_file_blob: state.data.audioFile
 * });
 * @example Upload with telehealth category and post-processing
 * uploadAudioFile({ 
 *   audio_file_name: "doctor_visit",
 *   audio_file_blob: state.data.audioFile,
 *   use_category: "file_category_telehealth",
 *   get_soap_note: "TRUE",
 *   get_summary: "TRUE",
 *   get_icd_codes: "TRUE"
 * });
 * @param {UploadOptions} uploadData - The upload options including file and metadata
 * @param {object} options - Optional retry configuration (maxRetries, retryDelay, retryOn429)
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

    logger.log(state.configuration, `Uploading audio file: ${audio_file_name}`);

    const formData = {
      audio_file_name,
      audio_file_blob,
      ...uploadOptions,
    };

    // Allow users to pass retry options if needed
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

    logger.log(
      state.configuration,
      `File queued successfully. File ID: ${response.body?.data?.file_id}`
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Get the transcription status and results for a file
 * @public
 * @function
 * @example Get basic file status
 * getFileStatus("12a9760f-b165-4404-91d0-a65d4cdt78fs");
 * @example Get file status with structured output
 * getFileStatus("12a9760f-b165-4404-91d0-a65d4cdt78fs", { 
 *   get_structured_post_processing: "t" 
 * });
 * @param {string} fileId - The file ID returned from uploadAudioFile
 * @param {object} options - Optional query and retry parameters
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

    logger.log(state.configuration, `Fetching status for file ID: ${resolvedFileId}`);

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
    logger.log(state.configuration, `File processing status: ${processingStatus}`);

    if (processingStatus === 'FILE_QUEUED') {
      logger.log(state.configuration, '⏳ File is queued for processing');
    } else if (processingStatus === 'FILE_PENDING') {
      logger.log(state.configuration, '⏳ File is pending processing');
    } else if (processingStatus === 'FILE_PROCESSING') {
      logger.log(state.configuration, '⏳ File is still being processed');
    } else if (processingStatus === 'FILE_TRANSCRIBED') {
      logger.log(state.configuration, '✓ Transcription completed successfully');
    } else if (processingStatus === 'FILE_INVALID') {
      logger.log(state.configuration, '✗ File is invalid');
    } else if (processingStatus === 'FILE_INVALID_SIZE') {
      logger.log(state.configuration, '✗ File size is invalid');
    } else if (processingStatus === 'FILE_INVALID_DURATION') {
      logger.log(state.configuration, '✗ File duration is invalid');
    } else if (processingStatus === 'FILE_PROCESSING_FAILED') {
      logger.log(state.configuration, '✗ File processing failed');
    } else if (processingStatus === 'FILE_PROCESSING_TIMEOUT') {
      logger.log(state.configuration, '✗ File processing timed out');
    } else if (processingStatus === 'FILE_PROCESSING_CANCELLED') {
      logger.log(state.configuration, '✗ File processing was cancelled');
    }

    return util.prepareNextState(state, response);
  };
}

/**
 * Upload an audio file and wait for transcription to complete (polls until done)
 * @public
 * @function
 * @example Upload and wait for basic transcription
 * uploadAndWaitForTranscription({
 *   audio_file_name: "consultation",
 *   audio_file_blob: state.data.audioFile
 * });
 * @example Upload with telehealth options and wait
 * uploadAndWaitForTranscription({
 *   audio_file_name: "patient_visit",
 *   audio_file_blob: state.data.audioFile,
 *   use_category: "file_category_telehealth",
 *   get_soap_note: "TRUE",
 *   get_summary: "TRUE"
 * }, { pollInterval: 5000, maxAttempts: 60 });
 * @param {UploadOptions} uploadData - The upload options
 * @param {object} waitOptions - Polling configuration
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
      logger.error('Upload state structure:', JSON.stringify(uploadState.data, null, 2));
      throw new Error('Failed to get file_id from upload response');
    }

    logger.log(state.configuration, `Waiting for transcription to complete (polling every ${pollInterval}ms)...`);

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
        logger.log(state.configuration, `✓ Transcription completed after ${attempts} attempts`);
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
        logger.log(
          state.configuration,
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
 * Make a GET request to Sahara API
 * @public
 * @function
 * @example
 * get("/file/v1/status/file-id");
 * @param {string} path - Path to resource
 * @param {object} options - Optional request options
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
 * Make a POST request to Sahara API
 * @public
 * @function
 * @example
 * post("/file/v1/upload", { audio_file_name: "test" });
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {object} options - Optional request options
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
