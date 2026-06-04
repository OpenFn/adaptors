import { expandReferences } from '@openfn/language-common/util';
import { composeNextState } from '@openfn/language-common';
import { processImage, processImageJsquash } from './Utils.js';

function decodeBase64Image(base64ImgStr) {
  const raw = base64ImgStr.includes(',') ? base64ImgStr.split(',')[1] : base64ImgStr;
  return Buffer.from(raw, 'base64');
}

/**
 * State object
 * @typedef {Object} ImageState
 * @property data - the result of processing the image, including the output buffer, size, and quality
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/
/**
 * Resize, compress, and optionally embed an EXIF UserComment into an image
 * buffer. Existing EXIF metadata on the source image is discarded.
 * Writes `{ buffer, size, quality }` to `state.data`.
 * @example
 * process(state.data.buffer, {
 *   width: 1200,
 *   height: 1600,
 *   maxBytes: 700 * 1024,
 *   comment: 'patient-id=123',
 * });
 * @function
 * @param {string} base64ImgStr - Base64 encoded image string (e.g. "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...") or a reference to a previous state containing such a string
 * @param {object} [options={}]
 * @param {number} [options.width=1200] - Output width in pixels
 * @param {number} [options.height=1600] - Output height in pixels
 * @param {number} [options.maxBytes=716800] - Maximum output file size in bytes
 * @param {number} [options.minQuality=20] - JPEG quality floor (1–100); compression stops here even if maxBytes is not met
 * @param {string} [options.comment] - String to embed in the EXIF UserComment field
 * @state {ImageState}
 * @returns {Operation}
 */
export function process(base64ImgStr, options = {}) {
  return async state => {
    const [resolvedBase64ImgStr, resolvedOptions] = expandReferences(
      state,
      base64ImgStr,
      options,
    );

    const imageBuffer = decodeBase64Image(resolvedBase64ImgStr);
    const result = await processImage(imageBuffer, resolvedOptions);
    return composeNextState(state, result);
  };
}

/**
 * @jsquash/jpeg variant of `process`. Uses MozJPEG (WebAssembly) for
 * decode/encode and produces smaller files than jimp at the same quality.
 * Input must be a JPEG — PNG and other formats are not supported.
 * Writes `{ buffer, size, quality }` to `state.data`.
 * @example
 * processJsquash(state.data.base64, {
 *   width: 1200,
 *   height: 1600,
 *   maxBytes: 700 * 1024,
 *   comment: 'patient-id=123',
 * });
 * @function
 * @param {string} base64ImgStr - Base64 encoded JPEG string or data URL
 * @param {object} [options={}]
 * @param {number} [options.width=1200] - Output width in pixels
 * @param {number} [options.height=1600] - Output height in pixels
 * @param {number} [options.maxBytes=716800] - Maximum output file size in bytes
 * @param {number} [options.minQuality=20] - JPEG quality floor (1–100)
 * @param {string} [options.comment] - String to embed in the EXIF UserComment field
 * @state {ImageState}
 * @returns {Operation}
 */
export function processJsquash(base64ImgStr, options = {}) {
  return async state => {
    const [resolvedBase64ImgStr, resolvedOptions] = expandReferences(
      state,
      base64ImgStr,
      options,
    );
    const imageBuffer = decodeBase64Image(resolvedBase64ImgStr);
    const result = await processImageJsquash(imageBuffer, resolvedOptions);
    return composeNextState(state, result);
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
  http,
} from '@openfn/language-common';
