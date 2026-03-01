
import { composeNextState } from '@openfn/language-common';
import { S3Client } from '@aws-sdk/client-s3';

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


