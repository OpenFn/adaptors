import { composeNextState } from '@openfn/language-common';
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import nodepath from 'node:path';
import { Readable } from 'stream';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

// Build an S3 client using configuration or default credential chain
export const s3ClientFromConfig = (configuration = {}) => {
  const { accessKeyId, secretAccessKey, sessionToken, region } = configuration || {};
  const clientConfig = {};
  if (region) clientConfig.region = region;
  if (accessKeyId && secretAccessKey) {
    clientConfig.credentials = {
      accessKeyId,
      secretAccessKey,
      sessionToken,
    };
  }
  return new S3Client(clientConfig);
};

export const putObject = async (configuration = {}, params = {}) => {
  const { Bucket, Key, Body, ContentType, ACL, ServerSideEncryption } = params;
  const client = s3ClientFromConfig(configuration);
  const cmd = new PutObjectCommand({ Bucket, Key, Body, ContentType, ACL, ServerSideEncryption });
  return client.send(cmd);
};

export const getObject = async (configuration = {}, params = {}) => {
  const { Bucket, Key } = params;
  const client = s3ClientFromConfig(configuration);
  const cmd = new GetObjectCommand({ Bucket, Key });
  return client.send(cmd);
};

export const deleteObject = async (configuration = {}, params = {}) => {
  const { Bucket, Key } = params;
  const client = s3ClientFromConfig(configuration);
  const cmd = new DeleteObjectCommand({ Bucket, Key });
  return client.send(cmd);
};

export const listObjects = async (configuration = {}, params = {}) => {
  const { Bucket, Prefix, MaxKeys, ContinuationToken } = params;
  const client = s3ClientFromConfig(configuration);
  const cmd = new ListObjectsV2Command({ Bucket, Prefix, MaxKeys, ContinuationToken });
  return client.send(cmd);
};

// Helper to read stream body to Buffer
const streamToBuffer = async (stream) => {
  if (Buffer.isBuffer(stream)) return stream;
  if (typeof stream.arrayBuffer === 'function') {
    const ab = await stream.arrayBuffer();
    return Buffer.from(ab);
  }
  if (stream instanceof Readable) {
    const chunks = [];
    for await (const chunk of stream) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    return Buffer.concat(chunks);
  }
  return Buffer.from(String(stream));
};

export const prepareS3GetResponse = async (response) => {
  // response.Body can be a stream — convert to base64
  const bodyStream = response.Body;
  const buffer = await streamToBuffer(bodyStream);
  const base64 = buffer.toString('base64');
  return {
    body: {
      base64,
      contentType: response.ContentType,
      contentLength: response.ContentLength,
    },
    headers: response.$metadata || {},
    statusCode: 200,
  };
};

export const preparePutResponse = (response, Bucket, Key) => {
  return {
    body: {
      bucket: Bucket,
      key: Key,
      etag: response.ETag,
    },
    headers: response.$metadata || {},
    statusCode: 200,
  };
};

export default {
  s3ClientFromConfig,
  putObject,
  getObject,
  deleteObject,
  listObjects,
  prepareS3GetResponse,
  preparePutResponse,
  prepareNextState,
};
