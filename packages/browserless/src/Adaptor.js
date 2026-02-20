import { expandReferences } from '@openfn/language-common/util';
import { request as lowLevelRequest } from './Utils.js';

/**
 * Create a PDF from HTML or URL.
 * @public
 * @param {string} input - HTML string or URL string
 * @param {object} options - Optional request options
 * @returns {Operation} Returns state with base64 string directly
 */

export function createPDF(input, options) {
  return async (state) => {
    const maybeBody =
      typeof input === 'string'
        ? input.startsWith('http') ? { url: input } : { html: input }
        : input || {};

    const [resolvedInput, resolvedOptions] = expandReferences(state, maybeBody, options);

    const response = await lowLevelRequest(
      state.configuration,
      'POST',
      'pdf',
      { body: resolvedInput, ...(resolvedOptions || {}), parseAs: 'buffer' }
    );

    const pdfData = response.body?.pdf ?? response.body;
    return {
      ...state,
      data: pdfData,
      response: { ...response, body: undefined },
    };
  };
};

export { request} from './http.js';



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
  source,
  sourceValue,
  util,
} from '@openfn/language-common';
