import nodepath from 'node:path';
import _ from 'lodash-es';

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
      logger.error(message);
      logger.error('response body: ');
      logger.error(response.body || '[no body]');
    } else {
      logger.log(message);
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
  const fullPath = nodepath.join(configuration.apiPath ?? '/fhir', path);
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
    .then()
    .catch(async e => {
      if (
        e.headers &&
        'content-type' in e.headers &&
        e.headers['content-type'].match(/fhir\+json/)
      ) {
        logValidationErrors(e);
      }
      throw e;
    });
};

// Util function to nicely print validation errors coming back from a fhir response
export function logValidationErrors(response, logger = console) {
  console.log(JSON.stringify(response));
  const error = JSON.parse(response.body);

  if (error.issue && error.issue.length) {
    delete response.body;

    logger.log();
    logger.error('FHIR server reports validation issues:');
    logger.log(error.issue);
    const errCount = error.issue.reduce(
      (count, e) => (e.severity === 'error' ? count + 1 : count),
      0,
    );
    if (errCount) {
      logger.error(` - ${errCount} Errors`);
    }

    const warnCount = error.issue.reduce(
      (count, e) => (e.severity === 'error' ? count + 1 : count),
      0,
    );
    if (warnCount) {
      logger.error(` - ${warnCount} Warnings`);
    }
    logger.log();

    // group by resource
    // How does this look for a bundle though?
    const groups = {};

    // const groups = _.groupBy(error.issue, e => e.path);
    // logger.log(groups);
    error.issue.forEach(issue => {
      try {
        // generate a useful location string
        // If this is a bundle, pull out the resource and UUID
        // else just show the first location item
        let id = issue.location[0];
        if (id.startsWith('Bundle')) {
          id = id.split('*').at(1);
        }
        groups[id] ??= {};
        groups[id][issue.severity] ??= [];
        groups[id][issue.severity].push(issue.diagnostics);
      } catch (e) {
        logger.log('error parsing issue at ', issue.location);
      }
    });

    // Now log everything
    for (const resource in groups) {
      logger.log(`${resource} issues:`);
      ['error', 'warning'].forEach(type => {
        logger.log(`  ${type}s:`.toUpperCase());

        for (const e of groups[resource][type]) {
          logger.log('    -', e);
        }
        logger.log();
      });
    }
    response.validationIssues = groups;
  } else {
    response.body = error;
  }

  return response;
}

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
