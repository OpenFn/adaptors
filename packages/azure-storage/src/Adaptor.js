import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { expandReferences } from '@openfn/language-common/util';

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

  return state => {
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
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );
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
  } else if (
    state.configuration.containerName &&
    typeof state.configuration.containerName === 'string'
  ) {
    return state.configuration.containerName;
  } else {
    throw new Error(
      'Container name is not defined and is not present in state.configuration.containerName'
    );
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
 * @param {Object} [options={}] - Additional options for the upload process.
 * @param {boolean} [options.createContainer=false] - Whether to create the container if it doesn't exist.
 * @param {boolean} [options.overwrite=false] - Whether to overwrite an existing blob with the same name.
 * @param {string} [options.containerName] - Container name. Overrides state.configuration.
 * @returns {Operation}
 */
export function uploadBlob(blobName, content, uploadOptions, options = {}) {
  return async state => {
    const [
      resolvedBlobName,
      resolvedContent,
      resolvedUploadOptions,
      resolvedOptions,
    ] = expandReferences(state, blobName, content, uploadOptions, options);

    const {
      createContainer = false,
      overwrite = false,
      containerName,
    } = resolvedOptions;

    const container = resolveContainerName(state, containerName);
    const containerClient = client.getContainerClient(container);
    const blockBlobClient =
      containerClient.getBlockBlobClient(resolvedBlobName);

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
        throw new Error(
          `Blob '${resolvedBlobName}' already exists in container '${container}'.`
        );
      }
    }

    let finalContent = resolvedContent;
    if (typeof finalContent === 'object') {
      console.debug(`Converting '${resolvedBlobName}' content to string`);
      finalContent = JSON.stringify(finalContent);
    }

    console.debug(
      `Uploading blob '${resolvedBlobName}' to container '${container}'`
    );
    console.debug(
      `Content: '${finalContent}', length: '${finalContent.length}'`
    );
    const response = await blockBlobClient.upload(
      finalContent,
      finalContent.length,
      resolvedUploadOptions
    );
    console.log(`Blob '${resolvedBlobName}' successfully uploaded`);

    // blobName and containerName are not returned in the response
    response.blobName = resolvedBlobName;
    response.containerName = container;

    const nextState = composeNextState(state, response);
    return nextState;
  };
}

/**
 * Download a blob from Azure Blob Storage.
 * @public
 * @example
 * downloadBlob('mycontainer', 'myblob.txt', { downloadAs: 'string' })
 * @function
 * @param {string} blobName - Name of the blob to download.
 * @param {Object} [options={}] - Additional options for the download process.
 * @returns {Operation}
 */
export function downloadBlob(blobName, options = {}) {
  return async state => {
    const [resolvedBlobName, resolvedOptions] = expandReferences(
      state,
      blobName,
      options
    );

    const { downloadAs = 'string', containerName } = resolvedOptions;

    const container = resolveContainerName(state, containerName);
    const containerClient = client.getContainerClient(container);
    const blockBlobClient =
      containerClient.getBlockBlobClient(resolvedBlobName);
    console.debug(`Downloading ${resolvedBlobName} from ${container}`);
    const response = await blockBlobClient.downloadToBuffer();

    let content;
    if (downloadAs === 'string') {
      content = response.toString();
      console.log(`Downloaded ${resolvedBlobName} as string from ${container}`);
    } else if (downloadAs === 'json') {
      content = JSON.parse(response.toString());
      console.log(`Downloaded ${resolvedBlobName} as JSON from ${container}`);
    } else {
      throw new Error(`Unsupported download option: ${downloadAs}`);
    }

    // TODO: consider how to handle other options.downloadAs values (e.g., 'stream')

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
 * @param {string} options - Additional options for the getBlobProperties process.
 * @returns {Operation}
 */
export function getBlobProperties(blobName, options = {}) {
  return async state => {
    const [resolvedBlobName, resolvedOptions] = expandReferences(
      state,
      blobName,
      options
    );

    const { containerName } = resolvedOptions;

    const container = resolveContainerName(state, containerName);
    const containerClient = client.getContainerClient(container);
    const blockBlobClient =
      containerClient.getBlockBlobClient(resolvedBlobName);
    console.debug(
      `Fetching properties of ${resolvedBlobName} from ${container}`
    );
    const properties = await blockBlobClient.getProperties();
    console.log(
      `Successfully fetched properties of ${resolvedBlobName}:\n${properties}`
    );
    const nextState = composeNextState(state, { properties });
    return nextState;
  };
}

export {
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
