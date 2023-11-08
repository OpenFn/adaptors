import { handleResponse, setUrl } from './Utils';
import { expandReferences } from '@openfn/language-common/util';

// This is a totally normal js function
// It can be unit tested by passing a request function in
export const create = (state, request, resource, data, callback) => {
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

export const getDrive = (state, request, specifier, name = 'default', callback = s => s) => {
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