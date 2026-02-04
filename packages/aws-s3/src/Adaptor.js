import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

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
 * Make a GET request
 * @example
 * get("patients");
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
/**
 * @param {object} params - { Bucket, Key, Body, ContentType, ACL }
 */
export function upload(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const resp = await util.putObject(state.configuration, resolvedParams);
    const formatted = util.preparePutResponse(resp, resolvedParams.Bucket, resolvedParams.Key);
    return util.prepareNextState(state, formatted);
  };
}

/**
 * @param {object} params 
 */
export function download(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const resp = await util.getObject(state.configuration, resolvedParams);
    const formatted = await util.prepareS3GetResponse(resp);
    return util.prepareNextState(state, formatted);
  };
}

/**
 * @param {object} params 
 */
export function remove(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const resp = await util.deleteObject(state.configuration, resolvedParams);
    const formatted = {
      body: { bucket: resolvedParams.Bucket, key: resolvedParams.Key, result: resp },
      headers: resp.$metadata || {},
      statusCode: 200,
    };
    return util.prepareNextState(state, formatted);
  };
}

/**
 * @param {object} params 
 */
export function list(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const resp = await util.listObjects(state.configuration, resolvedParams);
    const formatted = {
      body: resp.Contents || [],
      headers: resp.$metadata || {},
      statusCode: 200,
    };
    return util.prepareNextState(state, formatted);
  };
}

/**
 * @param {object} params 
 */
export function get(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const resp = await util.getObject(state.configuration, resolvedParams);
    const formatted = await util.prepareS3GetResponse(resp);
    return util.prepareNextState(state, formatted);
  };
}

/**
 * @param {object} params 
 */
export function search(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const listResp = await util.listObjects(state.configuration, resolvedParams);
    const contents = listResp.Contents || [];

    if (resolvedParams.fetch) {
      const results = [];
      for (const item of contents) {
        const getResp = await util.getObject(state.configuration, { Bucket: resolvedParams.Bucket, Key: item.Key });
        const formatted = await util.prepareS3GetResponse(getResp);
        results.push(formatted.body);
      }
      return util.prepareNextState(state, { body: results, headers: listResp.$metadata || {}, statusCode: 200 });
    }

    return util.prepareNextState(state, { body: contents, headers: listResp.$metadata || {}, statusCode: 200 });
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
