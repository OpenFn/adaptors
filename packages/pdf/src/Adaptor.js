import { expandReferences, encode } from '@openfn/language-common/util';
import * as util from './Utils';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';

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
 * Generate a PDF from an HTML string.
 * @param {Function} htmlTemplateString - A HTML string to convert to PDF
 * @param {Object} [options] - Optional configuration for PDF generation
 * @param {string} [options.format] - The format to parse the pdf result, allows `base64` and `stream`. Defaults to `base64`.
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
 * @returns {Operation}
 */
export function generatePDF(
  htmlTemplateString,
  options = { format: 'base64' }
) {
  return async state => {
    const [resolvedhtmlTemplateString, resolvedOptions] = expandReferences(
      state,
      htmlTemplateString,
      options
    );

    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();

    await page.setContent(resolvedhtmlTemplateString, {
      waitUntil: 'networkidle0',
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
    });

    await browser.close();

    console.log('PDF generated successfully!');

    if (resolvedOptions.format === 'stream') {
      const stream = Readable.from([pdfBuffer]);
      return { ...state, data: stream };
    }

    const base64 = encode(pdfBuffer, { parseJson: false });

    return { ...state, data: base64 };
  };
}

/**
 * Make a POST request
 * @example
 * post('/9be7ffcc-919a-477b-8385-4c0cb2f996a2', $.data, {
 *   parseAs: 'text',
 * });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, body, options) {
  return request('POST', path, body, options);
}

/**
 * Make a general HTTP request
 * @example <caption>Make a request</caption>
 * request('POST', '/9be7ffcc-919a-477b-8385-4c0cb2f996a2', $.data)
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedoptions] =
      expandReferences(state, method, path, body, options);
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
