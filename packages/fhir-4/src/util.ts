import nodepath from 'node:path';

import { composeNextState } from '@openfn/language-common';
import {
  throwError,
  request as commonRequest,
  makeBasicAuthHeader,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export function assertValidResourceId(id: string) {
  if (!id.match('/')) {
    throwError('INVALID_RESOURCE_ID', {
      description: `${id} is not a valid resource identifier`,
      fix: `Make sure the type and id are present in the reference, ie, Patient/123`,
    });
  }
}
export function addAuth(options) {
  if (options?.headers?.Authorization) return;

  const { username, password, access_token } = options.configuration;

  if (access_token) {
    return { Authorization: `Bearer ${access_token}` };
  } else if (username && password) {
    return { ...makeBasicAuthHeader(username, password) };
  }
  return {};
}

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

// TODO need to do this for errors too
export const logResponse = (response, query) => {
  const { method, url, statusCode, duration } = response;
  if (method && url && duration && statusCode) {
    let urlWithQuery = url;
    if (query && Object.keys(query).length) {
      urlWithQuery += '?' + new URLSearchParams(query).toString();
    }
    const message = `${method} ${urlWithQuery} - ${statusCode} in ${duration}ms`;
    if (response instanceof Error) {
      console.error(message);
      console.error('response body: ');
      console.error(response.body || '[no body]');
    } else {
      console.log(message);
    }
  }
  return response;
};

type RequestOptions = {
  headers?: Record<string, string>;
  body?: any;
  configuration: {
    apiPath?: string;
    baseUrl?: string;
    username?: string;
    password?: string;
    access_token?: string;
  };
  query?: Record<string, string>;
};

export const request = (method, path, options: RequestOptions) => {
  assertRelativeUrl(path);

  const { configuration, ...otherOptions } = options;
  const fullPath = nodepath.join(configuration.apiPath ?? '', path);
  const headers = addAuth(options);
  const opts = {
    ...otherOptions,
    headers: Object.assign(
      headers,
      {
        accept: 'application/fhir+json',
        'content-type': 'application/fhir+json',
      },
      options.headers
    ),
    baseUrl: configuration.baseUrl,
    parseAs: 'json',
  };

  // TODO add common error handlers for 404, 401
  return commonRequest(method, fullPath, opts)
    .then(logResponse)
    .catch(async e => {
      if (
        e.headers &&
        'content-type' in e.headers &&
        e.headers['content-type'].match(/fhir\+json/)
      ) {
        const error = JSON.parse(e.body);
        e.body = error;
        if (error.issue && error.issue.length) {
          console.error('Error from FHIR server:');
          error.issue.forEach(issue => {
            console.error(issue.diagnostics);
          });
        }
      }
      throw e;
    });
};
