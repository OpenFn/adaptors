import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * S3 operation input params used by `put`, `get`, and `list`.
 * @typedef {Object} S3Params
 * @property {string} bucket - S3 bucket name (required).
 * @property {string} key - Object key for `put`/`get` (required for those ops).
 * @property {any} [body] - Body for `put` (string, Buffer, or stream).
 * @property {string} [contentType] - Optional content type for `put`.
 * @property {string} [prefix] - Prefix for `list` operation.
 * @property {number} [maxKeys] - Max keys for `list`.
 * @property {string} [continuationToken] - Continuation token for `list` pagination.
 */

/**
 * Put an object into S3.
 *
 * @example
 * put({ bucket: 'my-bucket', key: 'path/to/file.txt', body: 'hello' });
 *
 * @public
 * @param {S3Params} params
 * @returns {Operation}
 */
/**
 * Internal typing placeholder for editors. `params` is validated at runtime.
 * @param {object} params
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
 * List objects in a bucket (by prefix).
 *
 * @example
 * list({ bucket: 'my-bucket', prefix: 'path/to/' });
 *
 * @public
 * @param {S3Params} params
 * @returns {Operation}
 * @state {Object} state - On success sets `state.data` to the list of objects and `state.response` to the raw S3 response metadata.
 */


/**
 * @param {object} params 
 */

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
 * Get an object from S3.
 *
 * Attempts to parse JSON objects automatically into `state.data`. For binary
 * objects the adaptor returns base64 in `state.data.base64`.
 *
 * @example
 * get({ bucket: 'my-bucket', key: 'path/to/file.txt' });
 *
 * @public
 * @param {S3Params} params
 * @returns {Operation}
 * @state {Object} state - On success sets `state.data` to the parsed body (or `{ base64: '...' }`) and `state.response` to the raw response metadata.
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
