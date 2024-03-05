import { handleResponse, setUrl } from './utils';
import { expandReferences } from '@openfn/language-common/util';

// Default the callback here in the impl, so that unit tests
// can optionall exclude it
const noop = s => s;

// This is a totally normal js function
// It can be unit tested by passing a request function in
export const create = (state, request, resource, data, callback = noop) => {
  const [resolvedResource, resolvedData] = expandReferences(
    state,
    resource,
    data
  );

  const { accessToken, apiVersion } = state.configuration;

  const url = setUrl({ apiVersion, resolvedResource });

  const options = {
    accessToken,
    body: JSON.stringify(resolvedData),
    method: 'POST',
  };

  return request(url, options).then(response =>
    handleResponse(response, state, callback)
  ); 
}

export const get = (state, request, path, query) => {
  const { accessToken, apiVersion } = state.configuration;
  const [resolvedPath, resolvedQuery] = expandReferences(state, path, query);

  const url = setUrl(resolvedPath, apiVersion);

  return request(url, { query: resolvedQuery, accessToken }).then(response =>
    handleResponse(response, state, callback)
  );
}

export const getDrive = (state, request, specifier, name = 'default', callback = noop) => {
  const { accessToken, apiVersion } = state.configuration;
  const [resolvedSpecifier, resolvedName] = expandReferences(
    state,
    specifier,
    name
  );

  const { id, owner = 'drive' } = resolvedSpecifier;

  let resource;
  if (owner === 'drive') {
    resource = `drives/${id}`;
  } else {
    resource = `${owner}/${id}/drive`;
  }

  const url = setUrl(resource, apiVersion);

  return request(url, { accessToken }).then(response => {
    state.drives[resolvedName] = response;
    return callback(state);
  });
}

export const getFolder = (state, request, pathOrId, options, callback = noop) => {
  const defaultOptions = {
    driveName: 'default', // Named drive in state.drives
    metadata: false, // If false return folder files if true return folder metadata
    // $filter: '', // Eg: "file/mimeType eq \'application/vnd.ms-excel\'"
  };
  const { accessToken, apiVersion } = state.configuration;
  const [resolvedPathOrId, resolvedOptions] = expandReferences(
    state,
    pathOrId,
    options
  );

  const { driveName, metadata } = { ...defaultOptions, ...resolvedOptions };

  assertDrive(state, driveName);

  const { id: driveId } = state.drives[driveName];

  let resource;

  if (resolvedPathOrId.startsWith('/')) {
    resource = `drives/${driveId}/root:/${encodeURIComponent(
      resolvedPathOrId
    )}`;
  } else {
    resource = `drives/${driveId}/items/${resolvedPathOrId}`;
  }

  if (!metadata) {
    resource += resolvedPathOrId.startsWith('/') ? ':/children' : '/children';
  }

  const url = setUrl(resource, apiVersion);

  return request(url, { accessToken }).then(response =>
    handleResponse(response, state, callback)
  );
}

export const getFile = async (state, request, pathOrId, options, callback) => {
  const defaultOptions = {
    driveName: 'default', // named drive in state.drives
    metadata: false, // Returns file msgraph metadata
    // $filter: '', // Eg: "file/mimeType eq \'application/vnd.ms-excel\'"
    // select: '', // Eg: id,@microsoft.graph.downloadUrl
  };

  const { accessToken, apiVersion } = state.configuration;
  const [resolvedPathOrId, resolvedOptions] = expandReferences(
    state,
    pathOrId,
    options
  );

  const { driveName, metadata } = {
    ...defaultOptions,
    ...resolvedOptions,
  };

  assertDrive(state, driveName);

  const { id: driveId } = state.drives[driveName];

  let resource;

  if (resolvedPathOrId.startsWith('/')) {
    resource = `drives/${driveId}/root:/${encodeURIComponent(
      resolvedPathOrId
    )}`;
  } else {
    resource = `drives/${driveId}/items/${resolvedPathOrId}`;
  }

  if (!metadata) {
    resource += resolvedPathOrId.startsWith('/') ? ':/content' : '/content';
  }

  const url = setUrl(resource, apiVersion);

  const response = await request(url, {
    accessToken,
    parseAs: metadata ? 'json' : 'text',
  });

  return handleResponse(response, state, callback);
}

export const uploadFile = async (state, request, resource, data, callback) => {
  const defaultResource = {
    contentType: 'application/octet-stream',
    driveId: '',
    folderId: '',
    fileName: 'sheet.xls',
    onConflict: 'replace',
  };

  const { accessToken, apiVersion } = state.configuration;

  const [resolvedResource, resolvedData] = expandReferences(
    state,
    resource,
    data
  );

  const { contentType, driveId, siteId, folderId, onConflict, fileName } = {
    ...defaultResource,
    ...resolvedResource,
  };

  assertResources({ driveId, siteId, folderId });

  const path =
    (driveId &&
      `drives/${driveId}/items/${folderId}:/${fileName}:/createUploadSession`) ||
    (siteId &&
      `sites/${siteId}/drive/items/${folderId}:/${fileName}:/createUploadSession`);

  const uploadSession = await request(setUrl(path, apiVersion), {
    method: 'POST',
    accessToken,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      '@microsoft.graph.conflictBehavior': onConflict,
      name: fileName,
    }),
  });

  const uploadUrl = uploadSession.uploadUrl;

  console.log(`Uploading file...`);

  const response = await request(uploadUrl, {
    method: 'PUT',
    accessToken,
    headers: {
      'Content-Type': contentType,
      'Content-Length': `${resolvedData.length}`,
      'Content-Range': `bytes 0-${resolvedData.length - 1}/${
        resolvedData.length
      }`,
    },
    body: resolvedData,
  })
  
  return handleResponse(response, state, callback);
}