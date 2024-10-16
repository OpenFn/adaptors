import { throwError } from '@openfn/language-common/util';
import nodepath from 'node:path';
import chain from 'stream-chain';
import parser from 'stream-json';
import Pick from 'stream-json/filters/Pick';
import streamArray from 'stream-json/streamers/StreamArray';

export const streamResponse = async (response, onValue) => {
  const pipeline = chain([
    response.body,
    parser(),
    new Pick({ filter: 'results' }),
    new streamArray(),
  ]);

  for await (const { key, value } of pipeline) {
    onValue(value);
  }
};

export const expandQuery = query => {
  let key;

  if (typeof query === 'string') {
    key = query;
    return {
      key,
    };
  }

  return query;
};

export const request = (state, client, path, options) => {
  if (!state.configuration.collections_token) {
    throwError('INVALID_AUTH', {
      description: 'No access key provided for collection request',
      fix: 'Ensure the "collections_token" value is set on state.configuration',
      path,
    });
  }

  const headers = {
    Authorization: `Bearer ${state.configuration.collections_token}`,
  };
  Object.assign(headers, options?.headers);

  return client.request({
    path: nodepath.join('collections', path),
    headers,
    method: 'GET',
    ...options,
  });
};
