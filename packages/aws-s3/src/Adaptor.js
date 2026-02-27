import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';
import {PutObjectCommand, ListObjectsV2Command, GetObjectCommand} from '@aws-sdk/client-s3';

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
 * @param {S3Params} params - The S3 operation parameters (bucket. key, body, contentType, etc.)
 * @returns {Operation} - A function that takes the state and performs the put operation.
 */

export function put(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const awsParams = {
      Bucket: resolvedParams.bucket,
      Key: resolvedParams.key,
      Body: resolvedParams.body,
      ContentType: resolvedParams.contentType,
      ACL: resolvedParams.acl || resolvedParams.ACL,
      ServerSideEncryption: resolvedParams.serverSideEncryption,
    };
    
    const client = util.s3ClientFromConfig(state.configuration);
    const resp = await client.send(new PutObjectCommand(awsParams));

    // Only write the relevant S3 response to state.data
    const newData = {
      ...state.data,
      bucket: awsParams.Bucket,
      key: awsParams.Key,
      etag: resp.ETag,
    };
    return { ...state, data: newData };
  };
}
  


/**
 * List objects in a bucket (by prefix).
 *
 * @example
 * list({ bucket: 'my-bucket', prefix: 'path/to/' });
 *
 * @public
 * @param {S3Params} params - The S3 operation parameters (bucket, prefix, etc.)
 * @returns {Operation} - A function that takes the state and performs the list operation.
 * @state {Object} state - On success sets `state.data` to the list of objects and `state.response` to the raw S3 response metadata.
 */

export function list(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const awsParams = {
      Bucket: resolvedParams.bucket, 
      Prefix: resolvedParams.prefix ,
      MaxKeys: resolvedParams.maxKeys, 
      ContinuationToken: resolvedParams.continuationToken || resolvedParams.ContinuationToken,
    };
    const client = util.s3ClientFromConfig(state.configuration);
    const resp = await client.send(new ListObjectsV2Command(awsParams));
    return { ...state, data: resp.Contents || [] };
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
 * @param {S3Params} params - The S3 operation parameters (bucket, key).
 * @returns {Operation} - A function that takes the state and performs the get operation.
 * @state {Object} state - On success sets `state.data` to the parsed body (or `{ base64: '...' }`) and `state.response` to the raw response metadata.
 */
export function get(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    const awsParams = {
      Bucket: resolvedParams.bucket,
      Key: resolvedParams.key,
    };
    
    const client = util.s3ClientFromConfig(state.configuration);
    const resp = await client.send(new GetObjectCommand(awsParams));
    const buffer = await util.streamToBuffer(resp.Body);
    
    let data;
    
    try{
      data = JSON.parse(buffer.toString('utf8'));
    } catch (e){
      data = {
      base64: buffer.toString('base64'),
      contentType: resp.ContentType || '',
      contentLength: resp.ContentLength || buffer.length
    };
    }
    return util.prepareNextState(state, {body: data});
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
