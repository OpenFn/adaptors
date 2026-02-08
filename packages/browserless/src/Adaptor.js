import { expandReferences } from "@openfn/language-common/util";
import * as util from './Utils.js';
import { request as httpRequest } from './http.js';
import {request as lowelLevelRequest} from './Utils.js';
import { OperationCanceledException } from "typescript";

/**
 * Create a PDF from HTML or URL.
 * Accepts a flat HTML string, a URL string, or an object `{html}` / `{url}`.
 * Normalizes PDF responses into `{ pdf: <base64 string> }` by default.
 * @public
 * @param {string|object} input - HTML string, URL string, or `{ html }` / `{url}` object.
 * @param {object} options - Optional request options.
 * @param {operation} Returns state with `{ data: { pdf: '<base64>' } }` .
 * 
 */

export function createPDF(input, options){
  return async state => {
    const maybeBody =
    typeof input === 'string'
    ? input.startsWith('http') ? { url: input } : { html: input}
  : input || {};
  
  const [resolvedInput, resolvedOptions] = expandReferences(state, maybeBody, options);

  const response = await httpRequest('POST', 'pdf', 
    { body: resolvedInput, ...(resolvedOptions || {}), forcePdfbase64: true } )(state);

  return {
    ...state,
    data: response.data,

  };  
  };
}


/**
 * Generic Browserless-authnticated HTTP request operation.
 * Use for arbitrary Browserless  endpoints (for example `/convert`).
 * @public
 * @function
 * @param {string} method - HTTP method (e.g. 'GET', 'POST').
 * @param {string} path - Path or URL to request (relative paths are joined to baseUrl).
 * @param {object} options - Optional request options.
 * @returns {Operation} Returns state with `data` and `response`.
 * 
 */

export function request(method, path, options){
  return lowelLevelRequest(undefined, method, path, options);
}

export{
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
} from '@openfn/language-common'



