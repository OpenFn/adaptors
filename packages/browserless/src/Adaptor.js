import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';
import { request as lowLevelRequest } from './Utils.js';

/**
 * Create a PDF from HTML or URL.
 * @public
 * @param {string|object} input - HTML string, URL string, or { html } / { url }
 * @param {object} options - Optional request options
 * @returns {Operation} Returns state with { data: { pdf: '<base64>' } }
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
      { body: resolvedInput, ...(resolvedOptions || {}), parseAs: (resolvedOptions && resolvedOptions.parseAs) || 'base64' }
    );

    const { body, ...responseWithoutBody } = response;

    return {
      ...state,
      data: body,
      response: responseWithoutBody,
    };
  };
}

/**
 * Generic Browserless-authenticated HTTP request operation.
 * @public
 * @param {string} method - HTTP method
 * @param {string} path - URL or relative path
 * @param {object} options - Request options
 * @returns {Operation} Returns state with `data` and `response`
 */
export function request(method, path, options) {
  return async (state) => {
    const [resolvedMethod, resolvedPath, resolvedOptions] = expandReferences(
      state,
      method,
      path,
      options
    );

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );

    const { body, ...responseWithoutBody } = response;

    return {
      ...state,
      data: body,
      response: responseWithoutBody,
    };
  };
}

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
