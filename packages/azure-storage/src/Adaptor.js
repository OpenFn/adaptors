import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

let client = undefined;

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

  return (state) => {
    return commonExecute(
      createClient,
      ...operations,
      teardownClient
    )({ ...initialState, ...state });
  };
}

// Create client for Azure Blob Storage
function createClient(state) {
  const { accountName, accountKey } = state.configuration;
  const blobStorageUrl = `https://${accountName}.blob.core.windows.net`;
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
  client = new BlobServiceClient(blobStorageUrl, sharedKeyCredential);
  return state;
}

function teardownClient(state) {
  client = undefined;
  return state;
}

function resolveContainerName(state, containerName) {
  if (containerName) {
    return containerName;
  } else if (state.configuration.containerName && typeof state.configuration.containerName === 'string') {
    return state.configuration.containerName;
  } else {
    throw new Error('Container name is not defined and is not present in state.configuration.containerName');
  }
}

/**
 * Upload content to Azure Blob Storage.
 * @public
 * @example
 * uploadBlob('mycontainer', 'myblob.txt', {foo:"bar"}, { blobHTTPHeaders: { blobContentType: 'application/json' } })
 * @function
 * @param {string} blobName - Name of the blob to create or replace.
 * @param {string} content - Content to upload.
 * @param {object} uploadOptions - See BlockBlobUploadOptions in Azure Blob Storage docs
 * @param {boolean} createContainer - Create the container if it does not exist.
 * @param {boolean} overwrite - Overwrite the blob if it already exists.
 * @param {string} containerName - Name of the container where the blob will be uploaded.
 * @returns {Operation}
 */
export function uploadBlob(blobName, content, uploadOptions, createContainer = false, overwrite = true, containerName = null) {
  return async (state) => {
    const container = resolveContainerName(state, containerName);
    const containerClient = client.getContainerClient(container);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    if (createContainer === true) {
      const containerExists = await containerClient.exists();
      if (containerExists === false) {
        console.debug(`Container '${container}' does not exist. Creating...`);
        await containerClient.create();
        console.log(`Container '${container}' created successfully.`);
      }
    }

    if (overwrite === false) {
      const blobExists = await blockBlobClient.exists();
      if (blobExists === true) {
        throw new Error(`Blob '${blobName}' already exists in container '${container}'.`);
      }
    }
    console.debug(`Uploading blob '${blobName}' to container '${container}'`);
    const response = await blockBlobClient.upload(content, content.length, uploadOptions);
    console.log(`Blob '${blobName}' successfully uploaded`);
    const nextState = composeNextState(state, response);
    return nextState;
  };
}


/**
 * Download a blob from Azure Blob Storage as a string.
 * @public
 * @example
 * downloadBlob('mycontainer', 'myblob.txt', { as: 'string' })
 * @function
 * @param {string} blobName - Name of the blob to download.
 * @param {object} options - Download options: `{as : 'string' | 'json'}`
 * @param {string} containerName - Name of the container containing the blob.
 * @returns {Operation}
 */
export function downloadBlob(blobName, options = { as: 'string' }, containerName = null) {
  return async (state) => {
    const container = resolveContainerName(state, containerName);
    const containerClient = client.getContainerClient(container);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.debug(`Downloading ${blobName} from ${container}`);
    const response = await blockBlobClient.downloadToBuffer();

    let content;
    if (options.as === 'string') {
      content = response.toString();
      console.log(`Downloaded ${blobName} as string from ${container}`);
    } else if (options.as === 'json') {
      content = JSON.parse(response.toString());
      console.log(`Downloaded ${blobName} as JSON from ${container}`);
    } else {
      throw new Error(`Unsupported download option: ${options.as}`);
    }

    // TODO: consider how to handle other options.as values (e.g., 'stream')

    const nextState = composeNextState(state, { content });
    return nextState;
  };
}


/**
 * Get properties of a blob in Azure Blob Storage.
 * @public
 * @example
 * getBlobProperties('mycontainer', 'myblob.txt')
 * @function
 * @param {string} blobName - Name of the blob to get properties for.
 * @param {string} containerName - Name of the container containing the blob.
 * @returns {Operation}
 */
export function getBlobProperties(blobName, containerName = null) {
  
  return async (state) => {
    const container = resolveContainerName(state, containerName);
    const containerClient = client.getContainerClient(container);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.debug(`Fetching properties of ${blobName} from ${container}`);
    const properties = await blockBlobClient.getProperties();
    console.log(`Successfully fetched properties of ${blobName}:\n${properties}`);
    const nextState = composeNextState(state, { properties });
    return nextState;
  };
}

// TODO: Decide which functions to publish from @openfn/language-common
export {
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
