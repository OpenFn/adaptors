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
 * Put (upload) an object. Public API uses camelCase params.
 * @param {object} params - { bucket, key, body, contentType }
 */
export function put(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const awsParams = {
      Bucket: resolvedParams.bucket || resolvedParams.Bucket,
      Key: resolvedParams.key || resolvedParams.Key,
      Body: resolvedParams.body || resolvedParams.Body,
      ContentType: resolvedParams.contentType || resolvedParams.ContentType,
      ACL: resolvedParams.acl || resolvedParams.ACL,
      ServerSideEncryption: resolvedParams.serverSideEncryption || resolvedParams.ServerSideEncryption,
    };

    const resp = await util.putObject(state.configuration, awsParams);
    const formatted = util.preparePutResponse(resp, awsParams.Bucket, awsParams.Key);
    return util.prepareNextState(state, formatted);
  };
}

/**
 * @param {object} params 
 */
// `get` is the canonical read operation (see below)

/**
 * @param {object} params 
 */
// delete/remove operation intentionally omitted from the public API to keep the
// adaptor minimal. If needed, it can be added later.

/**
 * @param {object} params 
 */
export function list(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const awsParams = {
      Bucket: resolvedParams.bucket || resolvedParams.Bucket,
      Prefix: resolvedParams.prefix || resolvedParams.Prefix,
      MaxKeys: resolvedParams.maxKeys || resolvedParams.MaxKeys,
      ContinuationToken: resolvedParams.continuationToken || resolvedParams.ContinuationToken,
    };

    const resp = await util.listObjects(state.configuration, awsParams);
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
    const awsParams = {
      Bucket: resolvedParams.bucket || resolvedParams.Bucket,
      Key: resolvedParams.key || resolvedParams.Key,
    };

    const resp = await util.getObject(state.configuration, awsParams);
    const formatted = await util.prepareS3GetResponse(resp);
    return util.prepareNextState(state, formatted);
  };
}

/**
 * @param {object} params 
 */
// search/list variations intentionally omitted to maintain minimal API surface.

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
