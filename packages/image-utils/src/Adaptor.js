import { expandReferences } from '@openfn/language-common/util';
import { composeNextState } from '@openfn/language-common';
import {
  resizeImage,
  compressImage,
  stripImage,
  getImageMetadata,
  decodeBase64Image,
} from './Utils.js';

function resolveInput(raw) {
  return Buffer.isBuffer(raw) ? raw : decodeBase64Image(raw);
}

function applyParseAs(result, parseAs) {
  if (parseAs !== 'base64') return result;
  const { buffer, ...rest } = result;
  return { ...rest, base64: buffer.toString('base64') };
}

/**
 * State object
 * @typedef {Object} ImageState
 * @property data - the result of the image operation
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/

/**
 * Resize an image to the given dimensions.
 * Writes `{ buffer, width, height }` to `state.data`.
 * @example
 * resize(state.data.photoBase64, { width: 1200, height: 1600 })
 * @function
 * @param {string|Buffer|Function} base64ImgOrBuffer - Base64 string, data URL, Buffer, or resolver fn
 * @param {object} [options={}]
 * @param {number} [options.width=1200] - Output width in pixels
 * @param {number} [options.height=1600] - Output height in pixels
 * @param {'buffer'|'base64'} [options.parseAs='buffer'] - Return format: `'buffer'` (default) or `'base64'`
 * @state {ImageState}
 * @returns {Operation}
 */
export function resize(base64ImgOrBuffer, options = {}) {
  return async state => {
    const [resolvedImg, resolvedOptions] = expandReferences(
      state,
      base64ImgOrBuffer,
      options,
    );
    const result = await resizeImage(
      resolveInput(resolvedImg),
      resolvedOptions,
    );
    return composeNextState(
      state,
      applyParseAs(result, resolvedOptions.parseAs),
    );
  };
}

/**
 * Compress an image to fit within `maxBytes` using a quality loop.
 * Optionally embeds an EXIF UserComment.
 * Writes `{ buffer, size, quality }` to `state.data`.
 * @example
 * compress(state.data.buffer, { maxBytes: 700 * 1024, comment: 'patient-id=123' })
 * @function
 * @param {string|Buffer|Function} base64ImgOrBuffer - Base64 string, data URL, Buffer, or resolver fn
 * @param {object} [options={}]
 * @param {number} [options.maxBytes=716800] - Maximum output file size in bytes
 * @param {number} [options.minQuality=20] - JPEG quality floor (1–100); compression stops here even if maxBytes is not met
 * @param {string} [options.comment] - String to embed in the EXIF UserComment field
 * @param {'buffer'|'base64'} [options.parseAs='buffer'] - Return format: `'buffer'` (default) or `'base64'`
 * @state {ImageState}
 * @returns {Operation}
 */
export function compress(base64ImgOrBuffer, options = {}) {
  return async state => {
    const [resolvedImg, resolvedOptions] = expandReferences(
      state,
      base64ImgOrBuffer,
      options,
    );
    const result = await compressImage(
      resolveInput(resolvedImg),
      resolvedOptions,
    );
    return composeNextState(
      state,
      applyParseAs(result, resolvedOptions.parseAs),
    );
  };
}

/**
 * Strip all EXIF metadata from an image. Output is always a JPEG buffer.
 * Writes `{ buffer }` to `state.data`.
 * @example
 * strip(state.data.photoBase64)
 * @function
 * @param {string|Buffer|Function} base64ImgOrBuffer - Base64 string, data URL, Buffer, or resolver fn
 * @param {object} [options={}]
 * @param {'buffer'|'base64'} [options.parseAs='buffer'] - Return format: `'buffer'` (default) or `'base64'`
 * @state {ImageState}
 * @returns {Operation}
 */
export function strip(base64ImgOrBuffer, options = {}) {
  return async state => {
    const [resolvedImg, resolvedOptions] = expandReferences(
      state,
      base64ImgOrBuffer,
      options,
    );
    const result = await stripImage(resolveInput(resolvedImg));
    return composeNextState(
      state,
      applyParseAs(result, resolvedOptions.parseAs),
    );
  };
}

/**
 * Read image metadata without modifying the image. Useful for validation
 * with `if` statements in job code before deciding whether to resize or compress.
 * Writes `{ width, height, orientation, size }` to `state.data`.
 * @example
 * metadata(state.data.photoBase64)
 * fn(state => {
 *   if (state.data.size > 700 * 1024) { ... }
 *   return state;
 * })
 * @function
 * @param {string|Buffer|Function} base64ImgOrBuffer - Base64 string, data URL, Buffer, or resolver fn
 * @state {ImageState}
 * @returns {Operation}
 */
export function metadata(base64ImgOrBuffer) {
  return async state => {
    const [resolvedImg] = expandReferences(state, base64ImgOrBuffer);
    const result = await getImageMetadata(resolveInput(resolvedImg));
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
