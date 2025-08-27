import { expandReferences, encode } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} HttpState
 * @private
 * @property data - the parsed response body
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Fetch all forms
 * @example <caption>Get all forms without filter options</caption>
 * getForms();
 * @example <caption>Get all forms with filter options</caption>
 * getForms({
 *   public: true,
 *   page: 1,
 *   page_size: 5,
 * });
 * @function
 * @public
 * @param {object} options - Optional filter options. Some supported options are: `public`, `tags`, `page`, and `page_size`.
 * @returns {Operation}
 * @state {HttpState}
 */
export function getForms(options = {}) {
  return async state => {
    const [resolvedoptions] = expandReferences(state, options);

    const response = await util.request(state.configuration, 'GET', 'forms', {
      query: {
        ...resolvedoptions,
      },
    });

    return util.prepareNextState(state, response);
  };
}

/**
 * Get metadata or structural data for a single form
 * @example <caption> Get a single form </caption>
 * getForm('6225');
 * @example <caption> Get a single form structure </caption>
 * getForm('6225', {
 *   structureOnly: true,
 * });
 * @function
 * @public
 * @param {string} formId - Id of the form to be retrieved.
 * @param {object} options - Optional filter options.
 * @param {boolean} options.structureOnly - If true, only the form structure is returned in JSON format.
 * @returns {Operation}
 * @state {HttpState}
 */
export function getForm(formId, options = {}) {
  return async state => {
    const [resolvedFormId] = expandReferences(state, formId);
    const path = options?.structureOnly
      ? `forms/${resolvedFormId}/form.json`
      : `forms/${resolvedFormId}`;

    const response = await util.request(state.configuration, 'GET', path);

    return util.prepareNextState(state, response);
  };
}

/**
 * Get submission data of a single form
 * @example <caption>Get submissions without filter options</caption>
 * getSubmissions('6225');
 * @example <caption>Get submissions with filter options</caption>
 * getSubmissions('6225', {
 *   query: `{"_submission_time":{"$gte":"2024-11-05"}}`,
 *   limit: 1,
 * });
 * @function
 * @public
 * @param {string} formId - Id of the form's submissions to be retrieved.
 * @param {object} options - Optional filter options. Some supported options are: `query`, `limit`, `start`, `page`, and `page_size`.
 * @returns {Operation}
 * @state {HttpState}
 */
export function getSubmissions(formId, options = {}) {
  return async state => {
    const [resolvedFormId, resolvedOptions] = expandReferences(
      state,
      formId,
      options
    );

    const response = await util.request(
      state.configuration,
      'GET',
      `data/${resolvedFormId}`,
      {
        query: {
          ...resolvedOptions,
        },
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Get a single data submission for a single form
 * @example
 * getSubmission('6225', '7783155');
 * @function
 * @public
 * @param {string} formId - Id of the form's submissions to be retrieved.
 * @param {string} submissionId - Id of the submission to be retrieved.
 * @returns {Operation}
 * @state {HttpState}
 */
export function getSubmission(formId, submissionId) {
  return async state => {
    const [resolvedFormId, resolvedSubmissionId] = expandReferences(
      state,
      formId,
      submissionId
    );

    const response = await util.request(
      state.configuration,
      'GET',
      `data/${resolvedFormId}/${resolvedSubmissionId}`
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Fetch a single attachment's metadata
 * @example
 * getAttachmentMetadata('621985');
 * @function
 * @public
 * @param {string} attachmentId - Id of the attachment to be retrieved.
 * @returns {Operation}
 * @state {HttpState}
 */
export function getAttachmentMetadata(attachmentId) {
  return async state => {
    const [resolvedAttachmentId] = expandReferences(state, attachmentId);

    const response = await util.request(
      state.configuration,
      'GET',
      `media/${resolvedAttachmentId}`
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Download an attachment in binary or base64 format
 * @example <caption>Download an attachment</caption>
 * downloadAttachment('622038', {
 *   filename:
 *     'project/attachments/download_1.png',
 * });
 * @example <caption>Download an attachment in base64 format</caption>
 * downloadAttachment('622038', {
 *   filename:
 *     'project/attachments/download_1.png',
 *   parseAs: 'base64',
 * });
 * @function
 * @public
 * @param {string} attachmentId - Id of the attachment to be retrieved.
 * @param {object} options - Optional request options. Supported options are: `filename` for the specific attachment to be downloaded, and `parseAs` for either `stream` or `base64`. Defaults to `parseAs: stream`.
 * @returns {Operation}
 * @state {HttpState}
 */
export function downloadAttachment(attachmentId, options = {}) {
  return async state => {
    const [resolvedAttachmentId, resolvedOptions] = expandReferences(
      state,
      attachmentId,
      options
    );

    let response = await util.request(
      state.configuration,
      'GET',
      `files/${resolvedAttachmentId}`,
      {
        query: {
          filename: resolvedOptions?.filename,
        },
      }
    );

    const { headers } = response;

    // The below manual redirect handling is needed because the request redirects to a different
    // url which fails when using undici Client. Instead, we need to fetch the new url manually.
    const parseAs = resolvedOptions?.parseAs || 'stream';

    if (headers.location) {
      let result = await fetch(headers.location, {
        method: 'GET',
      });

      let parsedBody;

      const arrayBuffer = await result.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      if (parseAs === 'base64') {
        parsedBody = encode(arrayBuffer, { parseJson: false });
      } else {
        parsedBody = buffer;
      }
      response = {
        status: result.status,
        statusText: result.statusText,
        headers: result.headers,
        url: result.url,
        body: parsedBody,
      };
    }

    return util.prepareNextState(state, response);
  };
}

export {
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
  merge,
  scrubEmojis,
  sourceValue,
  util,
  as
} from '@openfn/language-common';
