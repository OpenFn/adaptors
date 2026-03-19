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
      options.headers,
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

function collectRefs(value: any): string[] {
  if (!value || typeof value !== 'object') return [];
  if (Array.isArray(value)) return value.flatMap(collectRefs);

  const refs: string[] = [];
  if (typeof value.reference === 'string') {
    refs.push(value.reference);
  }
  for (const v of Object.values(value)) {
    refs.push(...collectRefs(v));
  }
  return refs;
}

export function sortBundle(entries: any[]) {
  // Map "ResourceType/id" -> index in the entries array
  const indexByRef = new Map<string, number>();
  for (let i = 0; i < entries.length; i++) {
    const { resourceType, id } = entries[i].resource;
    if (resourceType && id) {
      indexByRef.set(`${resourceType}/${id}`, i);
    }
  }

  const n = entries.length;
  const inDegree = new Array(n).fill(0);
  // adj[j] = list of indices that depend on j (j must come before them)
  const adj: number[][] = Array.from({ length: n }, () => []);

  for (let i = 0; i < n; i++) {
    const deps = new Set<number>();
    for (const ref of collectRefs(entries[i].resource)) {
      const j = indexByRef.get(ref);
      if (j !== undefined && j !== i) deps.add(j);
    }
    for (const j of deps) {
      adj[j].push(i);
      inDegree[i]++;
    }
  }

  // Kahn's algorithm - queue seeded with zero-in-degree nodes in original order
  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const result: any[] = [];
  while (queue.length > 0) {
    const idx = queue.shift()!;
    result.push(entries[idx]);
    for (const dep of adj[idx]) {
      if (--inDegree[dep] === 0) {
        // Insert in original-index order to keep the sort stable
        let k = 0;
        while (k < queue.length && queue[k] < dep) k++;
        queue.splice(k, 0, dep);
      }
    }
  }

  // Append any remaining entries (e.g. circular deps) in original order
  for (let i = 0; i < n; i++) {
    if (inDegree[i] > 0) result.push(entries[i]);
  }

  return result;
}
