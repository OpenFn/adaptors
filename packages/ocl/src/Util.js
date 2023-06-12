import { composeNextState } from '@openfn/language-common';

export function buildUrl(configuration, options) {
  const {
    ownerId,
    ownerType,
    repository,
    repositoryId,
    version,
    expansions,
    expansionId,
    content,
    query,
    ...rest
  } = options;

  const { baseUrl } = configuration;

  const urlParts = [
    baseUrl,
    ownerType,
    ownerId,
    repository,
    repositoryId,
    version,
    expansions,
    expansionId,
    content,
  ].filter(urlPart => urlPart);
  const url = urlParts.join('/');

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

export function handleResponseError(response, method) {
  if (!response.ok) {
    const { status, statusText, body, url } = response;

    const errorString = [
      `Message: ${statusText}`,
      `Request: ${method} ${url}`,
      `Status: ${status}`,
      `Body: ${JSON.stringify(body, null, 2).replace(/\n/g, '\n\t  ')}`,
    ].join('\n\t∟ ');

    throw new Error(errorString);
  }
}

export const request = async (url, params = {}, method = 'GET') => {
  let options = {
    method,
    headers: { 'Content-Type': 'application/json' }, // Add nonce for WP REST API
  };

  if ('GET' === method) {
    url += '?' + new URLSearchParams(params).toString();
  } else {
    options.body = JSON.stringify(params);
  }

  try {
    const response = await fetch(url, options);

    handleResponseError(response, method);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
