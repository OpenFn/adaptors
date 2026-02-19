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
  const client = s3ClientFromConfig(configuration);
  const cmd = new PutObjectCommand(params);
  return client.send(cmd);
};

export const getObject = async (configuration = {}, params = {}) => {
  const client = s3ClientFromConfig(configuration);
  const cmd = new GetObjectCommand(params);
  return client.send(cmd);
};

export const deleteObject = async (configuration = {}, params = {}) => {
  const client = s3ClientFromConfig(configuration);
  const cmd = new DeleteObjectCommand(params);
  return client.send(cmd);
};

export const listObjects = async (configuration = {}, params = {}) => {
  const client = s3ClientFromConfig(configuration);
  const cmd = new ListObjectsV2Command(params);
  return client.send(cmd);
};

export const streamToBuffer = async (stream) => {
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
 const buffer = await streamToBuffer(response.Body);
 try{
  return  JSON.parse(buffer.toString('utf8'));
 } catch (e){
  return buffer;
 }
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
