import { composeNextState } from '@openfn/language-common';

export function buildMappingsUrl(urlParams) {
  const {
    baseUrl,
    ownerId,
    ownerType,
    repository,
    repositoryId,
    version,
    expansionId,
    content,
    query,
    ...rest
  } = urlParams;

  const expansions = expansionId && `expansions/${expansionId}`;
  const suffix = expansions ? `${expansions}/${content}` : content;
  const url = [
    baseUrl,
    ownerType,
    ownerId,
    repository,
    repositoryId,
    version,
    suffix,
  ].join('/');

  return { url, query: { ...query, ...rest } };
}

export function isEmpty(obj) {
  // Check if it's an array
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  // Check if it's an object
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).length === 0;
  }

  // Not an array or object
  return false;
}

export function handleResponse(response, state, callback) {
  const nextState = {
    ...composeNextState(state, response),
    response,
  };
  if (callback) return callback(nextState);
  return nextState;
}

export function handleResponseError(response, data, method) {
  const { status, statusText, url } = response;

  if (isEmpty(data)) {
    const responseString = [
      `Message: 0 results returned`,
      `Request: ${method} ${url}`,
      `Status: ${status}`,
    ].join('\n\t∟ ');

    console.log(`Info at ${new Date()}\n${responseString}`);
  }
  if (!response.ok) {
    const errorString = [
      `Message: ${statusText}`,
      `Request: ${method} ${url}`,
      `Status: ${status}`,
      `Body: ${JSON.stringify(data, null, 2).replace(/\n/g, '\n\t  ')}`,
    ].join('\n\t∟ ');
    throw new Error(errorString);
  }
}

export const request = async (url, params = {}, method = 'GET') => {
  const options = {
    method,
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' },
  };

  if (method == 'GET') delete options.body;

  const resolvedUrl =
    method == 'GET' ? `${url}?${new URLSearchParams(params).toString()}` : url;

  const response = await fetch(resolvedUrl, options);
  const data = await response.json();

  handleResponseError(response, data, method);

  return data;
};
