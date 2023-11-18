import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';


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
  state.client = new BlobServiceClient(blobStorageUrl, sharedKeyCredential);
  return state;
}

// Destroy client
function teardownClient(state) {
  if (state.client) {
    // Perform any other cleanup or disconnection logic if required
    delete state.client;
  }
  return state;
}

// A basic Azure BlobServiceClient client is attached to state.client
// but almost all operations require a ContainerClient. This function
// just keeps things a little DRYer.
function getContainerClient(state, containerName) {
  const { client } = state;
  return client.getContainerClient(containerName);
}

// DRY helper function, similar to getContainerClient, above,
// but returns a BlockBlobClient
function getBlockBlobClient(state, containerName, blobName) {
  const containerClient = getContainerClient(state, containerName);
  return containerClient.getBlockBlobClient(blobName);
}

/**
 * Create a new container in Azure Blob Storage.
 * @public
 * @example
 * createContainer('mycontainer')
 * @function
 * @param {string} containerName - Name of the container to create.
 * @returns {Operation}
 */
export function createContainer(containerName) {
  return async (state) => {
    const containerClient = getContainerClient(state, containerName);
    console.info(`Creating container '${containerName}'`);
    const response = await containerClient.create();
    console.debug(`Container '${containerName}' created successfully.`);
    const nextState = composeNextState(state, response);
    return nextState;
  };
}


/**
 * Check if a blob exists in Azure Blob Storage.
 * @public
 * @example
 * checkBlobExists('mycontainer', 'myblob.txt')
 * @function
 * @param {string} containerName - Name of the container containing the blob.
 * @param {string} blobName - Name of the blob to check.
 * @returns {Operation}
 */
export function checkBlobExists(containerName, blobName) {
  return async (state) => {
    const blockBlobClient = getBlockBlobClient(state, containerName, blobName);
    console.info(`Checking the existence of ${blobName} in container '${containerName}'`);
    const blobExists = await blockBlobClient.exists();
    let blobContainer = containerName; // renaming the property for consistency
    console.debug(`Blob '${blobName}' in container '${blobContainer}' exists: ${blobExists}`);
    const nextState = composeNextState(state, { blobName, blobContainer, blobExists });
    return nextState;
  };
}

/**
 * Upload content to Azure Blob Storage.
 * @public
 * @example
 * uploadBlob('mycontainer', 'myblob.txt', 'Hello, Azure Blob Storage!')
 * @function
 * @param {string} containerName - Name of the container where the blob will be uploaded.
 * @param {string} blobName - Name of the blob to create or replace.
 * @param {string} content - Content to upload.
 * @param {object} uploadOptions - See BlockBlobUploadOptions in Azure Blob Storage docs
 * @returns {Operation}
 */
export function uploadBlob(containerName, blobName, content, uploadOptions) {
  return async (state) => {    
    const blockBlobClient = getBlockBlobClient(state, containerName, blobName);
    console.info(`Uploading blob '${blobName}' to container '${containerName}'`);
    const response = await blockBlobClient.upload(content, content.length, uploadOptions);
    console.debug(`Blob '${blobName}' successfully uploaded`);
    const nextState = composeNextState(state, response);
    return nextState;
  };
}


/**
 * Download a blob from Azure Blob Storage as a string.
 * @public
 * @example
 * downloadBlobAsString('mycontainer', 'myblob.txt')
 * @function
 * @param {string} containerName - Name of the container containing the blob.
 * @param {string} blobName - Name of the blob to download.
 * @returns {Operation}
 */
export function downloadBlobAsString(containerName, blobName) {
  return async (state) => {
    const blockBlobClient = getBlockBlobClient(state, containerName, blobName);
    console.info(`Downloading ${blobName} from ${containerName}`);
    const response = await blockBlobClient.downloadToBuffer();
    const content = response.toString();
    console.debug(`Downloaded ${blobName} as string from ${containerName}`);
    const nextState = composeNextState(state, { content });
    return nextState;
  };
}


/**
 * Download a blob from Azure Blob Storage and parse it as JSON.
 * @public
 * @example
 * downloadBlobAsJSON('mycontainer', 'mydata.json')
 * @function
 * @param {string} containerName - Name of the container containing the blob.
 * @param {string} blobName - Name of the blob to download.
 * @returns {Operation}
 */
export async function downloadBlobAsJSON(containerName, blobName) {
  return async (state) => {
    const blockBlobClient = getBlockBlobClient(state, containerName, blobName);
    console.info(`Downloading ${blobName} from ${containerName}`);
    const response = await blockBlobClient.downloadToBuffer();
    const contentBuffer = response.readableStreamBody;
    const jsonContent = JSON.parse(contentBuffer.toString());
    console.debug(`Downloaded ${blobName} as JSON from ${containerName}`);
    const nextState = composeNextState(state, jsonContent);
    return nextState;
  };
}


/**
 * Get properties of a blob in Azure Blob Storage.
 * @public
 * @example
 * getBlobProperties('mycontainer', 'myblob.txt')
 * @function
 * @param {string} containerName - Name of the container containing the blob.
 * @param {string} blobName - Name of the blob to get properties for.
 * @returns {Operation}
 */
export function getBlobProperties(containerName, blobName) {
  return async (state) => {
    const blockBlobClient = getBlockBlobClient(state, containerName, blobName);
    console.info(`Fetching properties of ${blobName} from ${containerName}`);
    const properties = await blockBlobClient.getProperties();
    console.debug(`Successfully fetched properties of ${blobName}:\n${properties}`);
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
