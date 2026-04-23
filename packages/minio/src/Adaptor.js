import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';
import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import * as Minio from 'minio';
let client = undefined;

export function setMockClient(mockClient) {
  client = mockClient;
}

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to make working with this API easier.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(
      createClient,
      ...operations,
    )({ ...initialState, ...state });
  };
}

function createClient(state) {
  const {
    accessKey,
    secretKey,
    port,
    endPoint,
    useSSL = true,
  } = state.configuration;
  const minioClient = new Minio.Client({
    endPoint: endPoint,
    port: port,
    useSSL: useSSL,
    accessKey: accessKey,
    secretKey: secretKey,
  });
  client = minioClient;
  return state;
}

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/


/**
 * Create a new bucket
 * @example <caption> Create a bucket</caption>
 * createBucket("my-new-bucket");
 * @function
 * @public
 * @param {string} bucketName - Name of the bucket to create
 * @param {string} [region="us-east-1"] - Bucket region
 * @param {object} [options={}] - Extra options passed to MinIO makeBucket
 * @returns {Operation}
 * @state {HttpState}
 */
export function createBucket(bucketName, region = 'us-east-1', options = {}) {
  return async state => {
    const [resolvedBucketName, resolvedRegion, resolvedOptions] =
      expandReferences(state, bucketName, region, options);
    let response;

    try {
      await client.makeBucket(
        resolvedBucketName,
        resolvedRegion,
        resolvedOptions,
      );
      response = `Bucket {${resolvedBucketName}} created successfully`;
    } catch (error) {
      throw new Error(
        `Error creating bucket:{${error.bucketname}}. ${error.message}`,
      );
    }

    const nextState = composeNextState(state, response);
    return nextState;

  };
}

/**
 * List objects in a bucket
 * @example <caption>List objects in a bucket</caption>
 * listObjects("my-bucket", { prefix: "openmrs/2025-04/", recursive: true });
 * @function
 * @public
 * @param {string} bucketName - Bucket to list objects from
 * @param {object} [options={}] - Optional list filters
 * @param {string} [options.prefix=""] - Prefix used to filter object names
 * @param {boolean} [options.recursive=true] - Whether to list objects recursively
 * @returns {Operation}
 * @state {HttpState}
 */
export function listObjects(bucketName, options = {}) {
  return async state => {
    const [resolvedBucketName, resolvedOptions] = expandReferences(
      state,
      bucketName,
      options,
    );
    const { prefix = '', recursive = true } = resolvedOptions;

    const data = await new Promise((resolve, reject) => {
      const objects = [];
      const stream = client.listObjects(resolvedBucketName, prefix, recursive);

      stream.on('data', function (obj) {
        objects.push(obj);
      });
      stream.on('end', function () {
        console.log(`Finished listing ${objects.length} objects in bucket {${resolvedBucketName}} with prefix {${prefix}}`);
        resolve(objects);
      });
      stream.on('error', function (err) {
        reject(err);
      });
    });

    return composeNextState(state, data);
  };
}


/**
 * Get an object from a bucket
 * @example <caption> Get an object and write to response</caption>
 * getObject("dlite",'f0dd6f01-a60c-5558-b53e-188eaf62a8de', { destination: 'response' });
 * @example <caption> Get an object and parse it as JSON</caption>
 * getObject("dlite",'f0dd6f01-a60c-5558-b53e-188eaf62a8de', { format: 'json' });
 * @function
 * @public
 * @param {string} bucketName - Bucket containing the object
 * @param {string} objectName - Name/path of the object to retrieve
 * @param {object} [options={}] - Optional MinIO getObject options
 * @param {string} [options.format="raw"] - Format to parse the object as. One of "raw", "json", "ndjson", or "csv". "raw" will return a Buffer, while the others will return the parsed result.
 * @param {string} [options.destination] - Path to write the parsed result to in the state object. If not provided, the parsed result will be written to `state.data`.
 * @returns {Operation}
 * @state {HttpState}
 */
export function getObject(bucketName, objectName, options = {}) {
  return async state => {
    const [resolvedBucketName, resolvedObjectName, resolvedOptions] =
      expandReferences(state, bucketName, objectName, options);
    const {
      format = 'raw',
      destination,
      ...getObjectOptions
    } = resolvedOptions;

    const data = await new Promise((resolve, reject) => {
      const chunks = [];

      client
        .getObject(resolvedBucketName, resolvedObjectName, getObjectOptions)
        .then(stream => {
          stream.on('data', chunk => {
            chunks.push(chunk);
          });
          stream.on('end', () => {
            resolve(Buffer.concat(chunks));
          });
          stream.on('error', err => {
            reject(err);
          });
        })
        .catch(err => {
          console.error(
            `Failed to get object "${resolvedObjectName}" from bucket "${resolvedBucketName}": [${err.code}] ${err.message}`,
          );
          reject(err);
        });
    });

    const parsedData = await util.parseByFormat(data, format, state);
    console.log(
      `Retrieved object "${resolvedObjectName}" from bucket "${resolvedBucketName}" (format: ${format}) and path ${destination ? `"${destination}"` : '"data"'} in state.`,
    );

    if (!destination) {
      return composeNextState(state, parsedData);
    }

    const nextState = composeNextState(state, state.data);

    return util.writeDestination(nextState, destination, parsedData);
  };
}

/**
 * Upload an object to a MinIO bucket
 * @example <caption>Upload a JSON object</caption>
 * putObject("my-bucket", "records/patient-001.json", state.data);
 * @example <caption>Upload CSV data with custom metadata</caption>
 * putObject("my-bucket", "exports/report.csv", state.rows, { format: "csv", metadata: { "x-amz-meta-source": "openmrs" } });
 * @function
 * @public
 * @param {string} bucketName - Destination bucket
 * @param {string} objectName - Name/path of the object to create or overwrite
 * @param {string|object|Buffer} data - Data to upload. Serialized according to `options.format`
 * @param {object} [options={}] - Upload options
 * @param {string} [options.format="json"] - Serialization format: "json", "ndjson", "csv", or "raw"
 * @param {string} [options.contentType] - MIME type. Auto-inferred from format if not provided
 * @param {object} [options.metadata={}] - User-defined metadata headers (e.g. `{ "x-amz-meta-source": "openmrs" }`)
 * @returns {Operation}
 * @state {HttpState}
 */
export function putObject(bucketName, objectName, data, options = {}) {
  return async state => {
    const [resolvedBucketName, resolvedObjectName, resolvedData, resolvedOptions] =
      expandReferences(state, bucketName, objectName, data, options);

    const { format = 'json', contentType, metadata = {} } = resolvedOptions;

    const buffer = util.serializeByFormat(resolvedData, format);
    const mimeType = contentType ?? util.inferContentType(format);
    const metaWithContentType = { 'Content-Type': mimeType, ...metadata };

    try {
      const result = await client.putObject(
        resolvedBucketName,
        resolvedObjectName,
        buffer,
        buffer.length,
        metaWithContentType,
      );
      console.log(
        `Uploaded object "${resolvedObjectName}" to bucket "${resolvedBucketName}" (format: ${format}, size: ${buffer.length} bytes)`,
      );
      return composeNextState(state, result);
    } catch (err) {
      console.error(
        `Failed to upload object "${resolvedObjectName}" to bucket "${resolvedBucketName}": [${err.code}] ${err.message}`,
      );
      throw err;
    }
  };
}

/**
 * Set tags on an existing object in a MinIO bucket
 * @example
 * setObjectTags("my-bucket", "records/patient-001.json", {
 *   source: "openmrs",
 *   status: "raw"
 * });
 * @example <caption>Target a specific version</caption>
 * setObjectTags("my-bucket", "records/patient-001.json", { status: "processed" }, { versionId: "my-version-id" });
 * @function
 * @public
 * @param {string} bucketName - Bucket containing the object
 * @param {string} objectName - Name/path of the object to tag
 * @param {object} tags - Key-value pairs to apply as tags. Overwrites any existing tags.
 * @param {object} [putOpts={}] - Extra put options (e.g. `{ versionId: "my-version-id" }`)
 * @returns {Operation}
 */
export function setObjectTags(bucketName, objectName, tags, putOpts = {}) {
  return async state => {
    const [resolvedBucketName, resolvedObjectName, resolvedTags, resolvedPutOpts] =
      expandReferences(state, bucketName, objectName, tags, putOpts);

    try {
      await client.setObjectTagging(
        resolvedBucketName,
        resolvedObjectName,
        resolvedTags,
        resolvedPutOpts,
      );
      console.log(
        `Tags set on "${resolvedObjectName}" in bucket "${resolvedBucketName}": ${JSON.stringify(resolvedTags)}`,
      );
    } catch (err) {
      console.error(
        `Failed to set tags on "${resolvedObjectName}" in bucket "${resolvedBucketName}": [${err.code}] ${err.message}`,
      );
      throw err;
    }

    return state;
  };
}

/**
 * Get tags on an existing object in a MinIO bucket
 * @example
 * getObjectTags("my-bucket", "records/patient-001.json");
 * @function
 * @public
 * @param {string} bucketName - Bucket containing the object
 * @param {string} objectName - Name/path of the object
 * @returns {Operation}
 * @state {HttpState}
 */
export function getObjectTags(bucketName, objectName) {
  return async state => {
    const [resolvedBucketName, resolvedObjectName] =
      expandReferences(state, bucketName, objectName);

    try {
      const tags = await client.getObjectTagging(
        resolvedBucketName,
        resolvedObjectName,
      );
      console.log(
        `Retrieved tags for "${resolvedObjectName}" in bucket "${resolvedBucketName}": ${JSON.stringify(tags)}`,
      );
      return composeNextState(state, tags);
    } catch (err) {
      console.error(
        `Failed to get tags for "${resolvedObjectName}" in bucket "${resolvedBucketName}": [${err.code}] ${err.message}`,
      );
      throw err;
    }
  };
}




export {
  as,
  combine,
  cursor,
  dataPath,
  dataValue,
  parseCsv,
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
