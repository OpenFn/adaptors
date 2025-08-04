import { expandReferences, encode } from '@openfn/language-common/util';
import * as util from './Utils';
import fs from 'fs';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} form - Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 * @property {object} tls - TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
 */

/**
 * PDF Body Options object. See [PDFShift documentation](https://docs.pdfshift.io/#convert) for more details.
 * @typedef {Object} PDFBodyOptions
 * @property {boolean} sandbox - Generates PDF documents in dev mode that doesn't count in the credits.
 * @property {boolean} encode - Return the generated PDF in Base64 encoded format, instead of raw.
 */

/**
 * Generate a PDF from an HTML string.
 * @param {Function} htmlTemplateString - A HTML string to convert to PDF
 * @param {PDFBodyOptions} [options] - Optional configuration for PDF generation
 * @example <caption>Generate a PDF from a HTML string</caption>
 * generatePDF(
 * `<html>
 *   <body>
 *     <h1>Sales Report</h1>
 *     <p>Date: 2025-02-01</p>
 *     <p>Total Sales: $42</p>
 *   </body>
 * </html>
 * `);
 * @example <caption>Generate a PDF with options</caption>
 * generatePDF(
 * `<html>
 *   <body>
 *     <h1>Sales Report</h1>
 *     <p>Date: 2025-02-01</p>
 *     <p>Total Sales: $42</p>
 *   </body>
 * </html>
 * `, {
 *   sandbox: true,
 *   encode: true);
 * @returns {Operation}
 */
export function generatePDF(htmlTemplateString, options) {
  return async state => {
    const [resolvedhtmlTemplateString, resolvedOptions] = expandReferences(
      state,
      htmlTemplateString,
      options
    );

    const response = await util.request(
      state.configuration,
      'POST',
      '/convert/pdf',
      {
        body: {
          source: resolvedhtmlTemplateString,
          ...resolvedOptions,
        },
        parseAs: 'text',
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * PDF Body Options object. See [PDFShift documentation](https://docs.pdfshift.io/#convert) for more details.
 * @typedef {Object} BodyOptions
 * @property {string} source - The HTML string to convert to PDF.
 * @property {boolean} sandbox - Generates PDF documents in dev mode that doesn't count in the credits.
 * @property {boolean} encode - Return the generated PDF in Base64 encoded format, instead of raw.
 */

/**
 * Make a POST request to PDFShift
 * @example <caption> Convert a HTML string to PDF</caption>
 * post(
 *   '/convert/pdf',
 *   {
 *     source: `<html>
 *     <body style="font-family: Arial, sans-serif; font-size: 14px;">
 *       <h1>Sales Report</h1>
 *       <p>Date: 2025-02-01</p>
 *       <p>Total Sales: $42</p>
 *     </body>
 *   </html>`,
 *     sandbox: true,
 *     encode: true,
 *   },
 *   {
 *     parseAs: 'text',
 *   }
 * );
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {BodyOptions} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, body, options) {
  console.log('Preparing a POST request to PDFShift');
  return request('POST', path, body, options);
}

/**
 * Make a general HTTP request to PDFShift
 * @example <caption>Make a request to convert a HTML string to PDF</caption>
 * request(
 *   'POST',
 *   '/convert/pdf',
 *   {
 *     source: `<html>
 *       <body style="font-family: Arial, sans-serif; font-size: 14px;">
 *         <h1>Sales Report</h1>
 *         <p>Date: 2025-02-01</p>
 *         <p>Total Sales: $42</p>
 *       </body>
 *     </html>`,
 *     sandbox: true,
 *     encode: true,
 *   },
 *   {
 *     parseAs: 'text',
 *   }
 * );
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {BodyOptions} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedoptions] =
      expandReferences(state, method, path, body, options);
    console.log(`Preparing a ${resolvedMethod} request to PDFShift`);
    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedoptions,
      }
    );

    return util.prepareNextState(state, response);
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
  sourceValue,
  util,
} from '@openfn/language-common';
